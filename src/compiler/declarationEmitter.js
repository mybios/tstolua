/// <reference path="checker.ts"/>
/* @internal */
local ts;
(function (ts) {
    function getDeclarationDiagnostics(host, resolver, targetSourceFile)
        local diagnostics = [];
        local jsFilePath = getOwnEmitOutputFilePath(targetSourceFile, host, ".js");
        emitDeclarations(host, resolver, diagnostics, jsFilePath, targetSourceFile);
        return diagnostics;
    end
    ts.getDeclarationDiagnostics = getDeclarationDiagnostics;
    function emitDeclarations(host, resolver, diagnostics, jsFilePath, root)
        local newLine = host.getNewLine();
        local compilerOptions = host.getCompilerOptions();
        local languageVersion = compilerOptions.target || ScriptTarget.ES3;
        local write;
        local writeLine;
        local increaseIndent;
        local decreaseIndent;
        local writeTextOfNode;
        local writer = createAndSetNewTextWriterWithSymbolWriter();
        local enclosingDeclaration;
        local currentSourceFile;
        local reportedDeclarationError = false;
        local emitJsDocComments = compilerOptions.removeComments ? function (declaration) end : writeJsDocComments;
        local emit = compilerOptions.stripInternal ? stripInternal : emitNode;
        local moduleElementDeclarationEmitInfo = [];
        local asynchronousSubModuleDeclarationEmitInfo;
        // Contains the reference paths that needs to go in the declaration file.
        // Collecting this separately because reference paths need to be first thing in the declaration file
        // and we could be collecting these paths from multiple files into single one with --out option
        local referencePathsOutput = "";
        if (root) {
            // Emitting just a single file, so emit references in this file only
            if (!compilerOptions.noResolve) {
                local addedGlobalFileReference = false;
                forEach(root.referencedFiles, function (fileReference)
                    local referencedFile = tryResolveScriptReference(host, root, fileReference);
                    // All the references that are not going to be part of same file
                    if (referencedFile && ((referencedFile.flags & NodeFlags.DeclarationFile) ||
                        shouldEmitToOwnFile(referencedFile, compilerOptions) ||
                        !addedGlobalFileReference)) {
                        writeReferencePath(referencedFile);
                        if (!isExternalModuleOrDeclarationFile(referencedFile)) {
                            addedGlobalFileReference = true;
                        end
                    end
                end);
            end
            emitSourceFile(root);
            // create asynchronous output for the importDeclarations
            if (moduleElementDeclarationEmitInfo.length) {
                local oldWriter = writer;
                forEach(moduleElementDeclarationEmitInfo, function (aliasEmitInfo)
                    if (aliasEmitInfo.isVisible) {
                        Debug.assert(aliasEmitInfo.node.kind === SyntaxKind.ImportDeclaration);
                        createAndSetNewTextWriterWithSymbolWriter();
                        Debug.assert(aliasEmitInfo.indent === 0);
                        writeImportDeclaration(aliasEmitInfo.node);
                        aliasEmitInfo.asynchronousOutput = writer.getText();
                    end
                end);
                setWriter(oldWriter);
            end
        end
        else {
            // Emit references corresponding to this file
            local emittedReferencedFiles = [];
            forEach(host.getSourceFiles(), function (sourceFile)
                if (!isExternalModuleOrDeclarationFile(sourceFile)) {
                    // Check what references need to be added
                    if (!compilerOptions.noResolve) {
                        forEach(sourceFile.referencedFiles, function (fileReference)
                            local referencedFile = tryResolveScriptReference(host, sourceFile, fileReference);
                            // If the reference file is a declaration file or an external module, emit that reference
                            if (referencedFile && (isExternalModuleOrDeclarationFile(referencedFile) &&
                                !contains(emittedReferencedFiles, referencedFile))) {
                                writeReferencePath(referencedFile);
                                emittedReferencedFiles.push(referencedFile);
                            end
                        end);
                    end
                    emitSourceFile(sourceFile);
                end
            end);
        end
        return {
            reportedDeclarationError: reportedDeclarationError,
            moduleElementDeclarationEmitInfo: moduleElementDeclarationEmitInfo,
            synchronousDeclarationOutput: writer.getText(),
            referencePathsOutput: referencePathsOutput
        };
        function hasInternalAnnotation(range)
            local text = currentSourceFile.text;
            local comment = text.substring(range.pos, range.);
        end
        ;
        return comment.indexOf("@internal") >= 0;
    end
    function stripInternal(node)
        if (node) {
            local leadingCommentRanges = getLeadingCommentRanges(currentSourceFile.text, node.pos);
            if (forEach(leadingCommentRanges, hasInternalAnnotation)) {
                return;
            end
            emitNode(node);
        end
    end
    function createAndSetNewTextWriterWithSymbolWriter()
        local writer = createTextWriter(newLine);
        writer.trackSymbol = trackSymbol;
        writer.writeKeyword = writer.write;
        writer.writeOperator = writer.write;
        writer.writePunctuation = writer.write;
        writer.writeSpace = writer.write;
        writer.writeStringLiteral = writer.writeLiteral;
        writer.writeParameter = writer.write;
        writer.writeSymbol = writer.write;
        setWriter(writer);
        return writer;
    end
    function setWriter(newWriter)
        writer = newWriter;
        write = newWriter.write;
        writeTextOfNode = newWriter.writeTextOfNode;
        writeLine = newWriter.writeLine;
        increaseIndent = newWriter.increaseIndent;
        decreaseIndent = newWriter.decreaseIndent;
    end
    function writeAsynchronousModuleElements(nodes)
        local oldWriter = writer;
        forEach(nodes, function (declaration)
            local nodeToCheck;
            if (declaration.kind === SyntaxKind.VariableDeclaration) {
                nodeToCheck = declaration.parent.parent;
            end
            else if (declaration.kind === SyntaxKind.NamedImports || declaration.kind === SyntaxKind.ImportSpecifier || declaration.kind === SyntaxKind.ImportClause) {
                Debug.fail("We should be getting ImportDeclaration instead to write");
            end
            else {
                nodeToCheck = declaration;
            end
            local moduleElementEmitInfo = forEach(moduleElementDeclarationEmitInfo, function (declEmitInfo) { return declEmitInfo.node === nodeToCheck ? declEmitInfo : undefined; });
            if (!moduleElementEmitInfo && asynchronousSubModuleDeclarationEmitInfo) {
                moduleElementEmitInfo = forEach(asynchronousSubModuleDeclarationEmitInfo, function (declEmitInfo) { return declEmitInfo.node === nodeToCheck ? declEmitInfo : undefined; });
            end
            // If the alias was marked as not visible when we saw its declaration, we would have saved the aliasEmitInfo, but if we haven't yet visited the alias declaration
            // then we don't need to write it at this point. We will write it when we actually see its declaration
            // Eg.
            // export function bar(a: foo.Foo) { }
            // import foo = require("foo");
            // Writing of function bar would mark alias declaration foo as visible but we haven't yet visited that declaration so do nothing,
            // we would write alias foo declaration when we visit it since it would now be marked as visible
            if (moduleElementEmitInfo) {
                if (moduleElementEmitInfo.node.kind === SyntaxKind.ImportDeclaration) {
                    // we have to create asynchronous output only after we have collected complete information 
                    // because it is possible to enable multiple bindings as asynchronously visible
                    moduleElementEmitInfo.isVisible = true;
                end
                else {
                    createAndSetNewTextWriterWithSymbolWriter();
                    for (var declarationIndent = moduleElementEmitInfo.indent; declarationIndent; declarationIndent--) {
                        increaseIndent();
                    end
                    if (nodeToCheck.kind === SyntaxKind.ModuleDeclaration) {
                        Debug.assert(asynchronousSubModuleDeclarationEmitInfo === undefined);
                        asynchronousSubModuleDeclarationEmitInfo = [];
                    end
                    writeModuleElement(nodeToCheck);
                    if (nodeToCheck.kind === SyntaxKind.ModuleDeclaration) {
                        moduleElementEmitInfo.subModuleElementDeclarationEmitInfo = asynchronousSubModuleDeclarationEmitInfo;
                        asynchronousSubModuleDeclarationEmitInfo = undefined;
                    end
                    moduleElementEmitInfo.asynchronousOutput = writer.getText();
                end
            end
        end);
        setWriter(oldWriter);
    end
    function handleSymbolAccessibilityError(symbolAccesibilityResult)
        if (symbolAccesibilityResult.accessibility === SymbolAccessibility.Accessible) {
            // write the aliases
            if (symbolAccesibilityResult && symbolAccesibilityResult.aliasesToMakeVisible) {
                writeAsynchronousModuleElements(symbolAccesibilityResult.aliasesToMakeVisible);
            end
        end
        else {
            // Report error
            reportedDeclarationError = true;
            local errorInfo = writer.getSymbolAccessibilityDiagnostic(symbolAccesibilityResult);
            if (errorInfo) {
                if (errorInfo.typeName) {
                    diagnostics.push(createDiagnosticForNode(symbolAccesibilityResult.errorNode || errorInfo.errorNode, errorInfo.diagnosticMessage, getSourceTextOfNodeFromSourceFile(currentSourceFile, errorInfo.typeName), symbolAccesibilityResult.errorSymbolName, symbolAccesibilityResult.errorModuleName));
                end
                else {
                    diagnostics.push(createDiagnosticForNode(symbolAccesibilityResult.errorNode || errorInfo.errorNode, errorInfo.diagnosticMessage, symbolAccesibilityResult.errorSymbolName, symbolAccesibilityResult.errorModuleName));
                end
            end
        end
    end
    function trackSymbol(symbol, enclosingDeclaration, meaning)
        handleSymbolAccessibilityError(resolver.isSymbolAccessible(symbol, enclosingDeclaration, meaning));
    end
    function writeTypeOfDeclaration(declaration, type, getSymbolAccessibilityDiagnostic)
        writer.getSymbolAccessibilityDiagnostic = getSymbolAccessibilityDiagnostic;
        write(": ");
        if (type) {
            // Write the type
            emitType(type);
        end
        else {
            resolver.writeTypeOfDeclaration(declaration, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
        end
    end
    function writeReturnTypeAtSignature(signature, getSymbolAccessibilityDiagnostic)
        writer.getSymbolAccessibilityDiagnostic = getSymbolAccessibilityDiagnostic;
        write(": ");
        if (signature.type) {
            // Write the type
            emitType(signature.type);
        end
        else {
            resolver.writeReturnTypeOfSignatureDeclaration(signature, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
        end
    end
    function emitLines(nodes)
        for (local _i = 0; _i < nodes.length; _i++) {
            local node = nodes[_i];
            emit(node);
        }
    end
    function emitSeparatedList(nodes, separator, eachNodeEmitFn, canEmitFn)
        local currentWriterPos = writer.getTextPos();
        for (local _i = 0; _i < nodes.length; _i++) {
            local node = nodes[_i];
            if (!canEmitFn || canEmitFn(node)) {
                if (currentWriterPos !== writer.getTextPos()) {
                    write(separator);
                end
                currentWriterPos = writer.getTextPos();
                eachNodeEmitFn(node);
            end
        }
    end
    function emitCommaList(nodes, eachNodeEmitFn, canEmitFn)
        emitSeparatedList(nodes, ", ", eachNodeEmitFn, canEmitFn);
    end
    function writeJsDocComments(declaration)
        if (declaration) {
            local jsDocComments = getJsDocComments(declaration, currentSourceFile);
            emitNewLineBeforeLeadingComments(currentSourceFile, writer, declaration, jsDocComments);
            // jsDoc comments are emitted at /*leading comment1 */space/*leading comment*/space
            emitComments(currentSourceFile, writer, jsDocComments, true, newLine, writeCommentRange);
        end
    end
    function emitTypeWithNewGetSymbolAccessibilityDiagnostic(type, getSymbolAccessibilityDiagnostic)
        writer.getSymbolAccessibilityDiagnostic = getSymbolAccessibilityDiagnostic;
        emitType(type);
    end
    function emitType(type)
        switch (type.kind) {
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.StringLiteral:
                return writeTextOfNode(currentSourceFile, type);
            case SyntaxKind.ExpressionWithTypeArguments:
                return emitExpressionWithTypeArguments(type);
            case SyntaxKind.TypeReference:
                return emitTypeReference(type);
            case SyntaxKind.TypeQuery:
                return emitTypeQuery(type);
            case SyntaxKind.ArrayType:
                return emitArrayType(type);
            case SyntaxKind.TupleType:
                return emitTupleType(type);
            case SyntaxKind.UnionType:
                return emitUnionType(type);
            case SyntaxKind.ParenthesizedType:
                return emitParenType(type);
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
                return emitSignatureDeclarationWithJsDocComments(type);
            case SyntaxKind.TypeLiteral:
                return emitTypeLiteral(type);
            case SyntaxKind.Identifier:
                return emitEntityName(type);
            case SyntaxKind.QualifiedName:
                return emitEntityName(type);
        end
        function emitEntityName(entityName)
            local visibilityResult = resolver.isEntityNameVisible(entityName, 
            // Aliases can be written asynchronously so use correct enclosing declaration
            entityName.parent.kind === SyntaxKind.ImportEqualsDeclaration ? entityName.parent : enclosingDeclaration);
            handleSymbolAccessibilityError(visibilityResult);
            writeEntityName(entityName);
            function writeEntityName(entityName)
                if (entityName.kind === SyntaxKind.Identifier) {
                    writeTextOfNode(currentSourceFile, entityName);
                end
                else {
                    local left = entityName.kind === SyntaxKind.QualifiedName ? entityName.left : entityName.expression;
                    local right = entityName.kind === SyntaxKind.QualifiedName ? entityName.right : entityName.name;
                    writeEntityName(left);
                    write(".");
                    writeTextOfNode(currentSourceFile, right);
                end
            end
        end
        function emitExpressionWithTypeArguments(node)
            if (isSupportedExpressionWithTypeArguments(node)) {
                Debug.assert(node.expression.kind === SyntaxKind.Identifier || node.expression.kind === SyntaxKind.PropertyAccessExpression);
                emitEntityName(node.expression);
                if (node.typeArguments) {
                    write("<");
                    emitCommaList(node.typeArguments, emitType);
                    write(">");
                end
            end
        end
        function emitTypeReference(type)
            emitEntityName(type.typeName);
            if (type.typeArguments) {
                write("<");
                emitCommaList(type.typeArguments, emitType);
                write(">");
            end
        end
        function emitTypeQuery(type)
            write("typeof ");
            emitEntityName(type.exprName);
        end
        function emitArrayType(type)
            emitType(type.elementType);
            write("[]");
        end
        function emitTupleType(type)
            write("[");
            emitCommaList(type.elementTypes, emitType);
            write("]");
        end
        function emitUnionType(type)
            emitSeparatedList(type.types, " | ", emitType);
        end
        function emitParenType(type)
            write("(");
            emitType(type.type);
            write(")");
        end
        function emitTypeLiteral(type)
            write("{");
            if (type.members.length) {
                writeLine();
                increaseIndent();
                // write members
                emitLines(type.members);
                decreaseIndent();
            end
            write("}");
        end
    end
    function emitSourceFile(node)
        currentSourceFile = node;
        enclosingDeclaration = node;
        emitLines(node.statements);
    end
    // Return a temp variable name to be used in `export default` statements.
    // The temp name will be of the form _default_counter.
    // Note that export default is only allowed at most once in a module, so we
    // do not need to keep track of created temp names.
    function getExportDefaultTempVariableName()
        local baseName = "_default";
        if (!hasProperty(currentSourceFile.identifiers, baseName)) {
            return baseName;
        end
        local count = 0;
        while (true) {
            local name_1 = baseName + "_" + (++count);
            if (!hasProperty(currentSourceFile.identifiers, name_1)) {
                return name_1;
            end
        end
    end
    function emitExportAssignment(node)
        if (node.expression.kind === SyntaxKind.Identifier) {
            write(node.isExportEquals ? "export = " : "export default ");
            writeTextOfNode(currentSourceFile, node.expression);
        end
        else {
            // Expression
            local tempVarName = getExportDefaultTempVariableName();
            write("declare var ");
            write(tempVarName);
            write(": ");
            writer.getSymbolAccessibilityDiagnostic = getDefaultExportAccessibilityDiagnostic;
            resolver.writeTypeOfExpression(node.expression, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
            write(";");
            writeLine();
            write(node.isExportEquals ? "export = " : "export default ");
            write(tempVarName);
        end
        write(";");
        writeLine();
        // Make all the declarations visible for the export name
        if (node.expression.kind === SyntaxKind.Identifier) {
            local nodes = resolver.collectLinkedAliases(node.expression);
            // write each of these declarations asynchronously
            writeAsynchronousModuleElements(nodes);
        end
        function getDefaultExportAccessibilityDiagnostic(diagnostic)
            return {
                diagnosticMessage: Diagnostics.Default_export_of_the_module_has_or_is_using_private_name_0,
                errorNode: node
            };
        end
    end
    function isModuleElementVisible(node)
        return resolver.isDeclarationVisible(node);
    end
    function emitModuleElement(node, isModuleElementVisible)
        if (isModuleElementVisible) {
            writeModuleElement(node);
        end
        else if (node.kind === SyntaxKind.ImportEqualsDeclaration ||
            (node.parent.kind === SyntaxKind.SourceFile && isExternalModule(currentSourceFile))) {
            local isVisible;
            if (asynchronousSubModuleDeclarationEmitInfo && node.parent.kind !== SyntaxKind.SourceFile) {
                // Import declaration of another module that is visited async so lets put it in right spot
                asynchronousSubModuleDeclarationEmitInfo.push({
                    node: node,
                    outputPos: writer.getTextPos(),
                    indent: writer.getIndent(),
                    isVisible: isVisible
                });
            end
            else {
                if (node.kind === SyntaxKind.ImportDeclaration) {
                    local importDeclaration = node;
                    if (importDeclaration.importClause) {
                        isVisible = (importDeclaration.importClause.name && resolver.isDeclarationVisible(importDeclaration.importClause)) ||
                            isVisibleNamedBinding(importDeclaration.importClause.namedBindings);
                    end
                end
                moduleElementDeclarationEmitInfo.push({
                    node: node,
                    outputPos: writer.getTextPos(),
                    indent: writer.getIndent(),
                    isVisible: isVisible
                });
            end
        end
    end
    function writeModuleElement(node)
        switch (node.kind) {
            case SyntaxKind.FunctionDeclaration:
                return writeFunctionDeclaration(node);
            case SyntaxKind.VariableStatement:
                return writeVariableStatement(node);
            case SyntaxKind.InterfaceDeclaration:
                return writeInterfaceDeclaration(node);
            case SyntaxKind.ClassDeclaration:
                return writeClassDeclaration(node);
            case SyntaxKind.TypeAliasDeclaration:
                return writeTypeAliasDeclaration(node);
            case SyntaxKind.EnumDeclaration:
                return writeEnumDeclaration(node);
            case SyntaxKind.ModuleDeclaration:
                return writeModuleDeclaration(node);
            case SyntaxKind.ImportEqualsDeclaration:
                return writeImportEqualsDeclaration(node);
            case SyntaxKind.ImportDeclaration:
                return writeImportDeclaration(node);
            default:
                Debug.fail("Unknown symbol kind");
        end
    end
    function emitModuleElementDeclarationFlags(node)
        // If the node is parented in the current source file we need to emit export declare or just export
        if (node.parent === currentSourceFile) {
            // If the node is exported
            if (node.flags & NodeFlags.Export) {
                write("export ");
            end
            if (node.flags & NodeFlags.Default) {
                write("default ");
            end
            else if (node.kind !== SyntaxKind.InterfaceDeclaration) {
                write("declare ");
            end
        end
    end
    function emitClassMemberDeclarationFlags(node)
        if (node.flags & NodeFlags.Private) {
            write("private ");
        end
        else if (node.flags & NodeFlags.Protected) {
            write("protected ");
        end
        if (node.flags & NodeFlags.Static) {
            write("static ");
        end
    end
    function writeImportEqualsDeclaration(node)
        // note usage of writer. methods instead of aliases created, just to make sure we are using 
        // correct writer especially to handle asynchronous alias writing
        emitJsDocComments(node);
        if (node.flags & NodeFlags.Export) {
            write("export ");
        end
        write("import ");
        writeTextOfNode(currentSourceFile, node.name);
        write(" = ");
        if (isInternalModuleImportEqualsDeclaration(node)) {
            emitTypeWithNewGetSymbolAccessibilityDiagnostic(node.moduleReference, getImportEntityNameVisibilityError);
            write(";");
        end
        else {
            write("require(");
            writeTextOfNode(currentSourceFile, getExternalModuleImportEqualsDeclarationExpression(node));
            write(");");
        end
        writer.writeLine();
        function getImportEntityNameVisibilityError(symbolAccesibilityResult)
            return {
                diagnosticMessage: Diagnostics.Import_declaration_0_is_using_private_name_1,
                errorNode: node,
                typeName: node.name
            };
        end
    end
    function isVisibleNamedBinding(namedBindings)
        if (namedBindings) {
            if (namedBindings.kind === SyntaxKind.NamespaceImport) {
                return resolver.isDeclarationVisible(namedBindings);
            end
            else {
                return forEach(namedBindings.elements, function (namedImport) { return resolver.isDeclarationVisible(namedImport); });
            end
        end
    end
    function writeImportDeclaration(node)
        if (!node.importClause && !(node.flags & NodeFlags.Export)) {
            // do not write non-exported import declarations that don't have import clauses 
            return;
        end
        emitJsDocComments(node);
        if (node.flags & NodeFlags.Export) {
            write("export ");
        end
        write("import ");
        if (node.importClause) {
            local currentWriterPos = writer.getTextPos();
            if (node.importClause.name && resolver.isDeclarationVisible(node.importClause)) {
                writeTextOfNode(currentSourceFile, node.importClause.name);
            end
            if (node.importClause.namedBindings && isVisibleNamedBinding(node.importClause.namedBindings)) {
                if (currentWriterPos !== writer.getTextPos()) {
                    // If the default binding was emitted, write the separated
                    write(", ");
                end
                if (node.importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
                    write("* as ");
                    writeTextOfNode(currentSourceFile, node.importClause.namedBindings.name);
                end
                else {
                    write("{ ");
                    emitCommaList(node.importClause.namedBindings.elements, emitImportOrExportSpecifier, resolver.isDeclarationVisible);
                    write(" }");
                end
            end
            write(" from ");
        end
        writeTextOfNode(currentSourceFile, node.moduleSpecifier);
        write(";");
        writer.writeLine();
    end
    function emitImportOrExportSpecifier(node)
        if (node.propertyName) {
            writeTextOfNode(currentSourceFile, node.propertyName);
            write(" as ");
        end
        writeTextOfNode(currentSourceFile, node.name);
    end
    function emitExportSpecifier(node)
        emitImportOrExportSpecifier(node);
        // Make all the declarations visible for the export name
        local nodes = resolver.collectLinkedAliases(node.propertyName || node.name);
        // write each of these declarations asynchronously
        writeAsynchronousModuleElements(nodes);
    end
    function emitExportDeclaration(node)
        emitJsDocComments(node);
        write("export ");
        if (node.exportClause) {
            write("{ ");
            emitCommaList(node.exportClause.elements, emitExportSpecifier);
            write(" }");
        end
        else {
            write("*");
        end
        if (node.moduleSpecifier) {
            write(" from ");
            writeTextOfNode(currentSourceFile, node.moduleSpecifier);
        end
        write(";");
        writer.writeLine();
    end
    function writeModuleDeclaration(node)
        emitJsDocComments(node);
        emitModuleElementDeclarationFlags(node);
        write("module ");
        writeTextOfNode(currentSourceFile, node.name);
        while (node.body.kind !== SyntaxKind.ModuleBlock) {
            node = node.body;
            write(".");
            writeTextOfNode(currentSourceFile, node.name);
        end
        local prevEnclosingDeclaration = enclosingDeclaration;
        enclosingDeclaration = node;
        write(" {");
        writeLine();
        increaseIndent();
        emitLines(node.body.statements);
        decreaseIndent();
        write("}");
        writeLine();
        enclosingDeclaration = prevEnclosingDeclaration;
    end
    function writeTypeAliasDeclaration(node)
        emitJsDocComments(node);
        emitModuleElementDeclarationFlags(node);
        write("type ");
        writeTextOfNode(currentSourceFile, node.name);
        write(" = ");
        emitTypeWithNewGetSymbolAccessibilityDiagnostic(node.type, getTypeAliasDeclarationVisibilityError);
        write(";");
        writeLine();
        function getTypeAliasDeclarationVisibilityError(symbolAccesibilityResult)
            return {
                diagnosticMessage: Diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1,
                errorNode: node.type,
                typeName: node.name
            };
        end
    end
    function writeEnumDeclaration(node)
        emitJsDocComments(node);
        emitModuleElementDeclarationFlags(node);
        if (isConst(node)) {
            write("const ");
        end
        write("enum ");
        writeTextOfNode(currentSourceFile, node.name);
        write(" {");
        writeLine();
        increaseIndent();
        emitLines(node.members);
        decreaseIndent();
        write("}");
        writeLine();
    end
    function emitEnumMemberDeclaration(node)
        emitJsDocComments(node);
        writeTextOfNode(currentSourceFile, node.name);
        local enumMemberValue = resolver.getConstantValue(node);
        if (enumMemberValue !== undefined) {
            write(" = ");
            write(enumMemberValue.toString());
        end
        write(",");
        writeLine();
    end
    function isPrivateMethodTypeParameter(node)
        return node.parent.kind === SyntaxKind.MethodDeclaration && (node.parent.flags & NodeFlags.Private);
    end
    function emitTypeParameters(typeParameters)
        function emitTypeParameter(node)
            increaseIndent();
            emitJsDocComments(node);
            decreaseIndent();
            writeTextOfNode(currentSourceFile, node.name);
            // If there is constraint present and this is not a type parameter of the private method emit the constraint
            if (node.constraint && !isPrivateMethodTypeParameter(node)) {
                write(" extends ");
                if (node.parent.kind === SyntaxKind.FunctionType ||
                    node.parent.kind === SyntaxKind.ConstructorType ||
                    (node.parent.parent && node.parent.parent.kind === SyntaxKind.TypeLiteral)) {
                    Debug.assert(node.parent.kind === SyntaxKind.MethodDeclaration ||
                        node.parent.kind === SyntaxKind.MethodSignature ||
                        node.parent.kind === SyntaxKind.FunctionType ||
                        node.parent.kind === SyntaxKind.ConstructorType ||
                        node.parent.kind === SyntaxKind.CallSignature ||
                        node.parent.kind === SyntaxKind.ConstructSignature);
                    emitType(node.constraint);
                end
                else {
                    emitTypeWithNewGetSymbolAccessibilityDiagnostic(node.constraint, getTypeParameterConstraintVisibilityError);
                end
            end
            function getTypeParameterConstraintVisibilityError(symbolAccesibilityResult)
                // Type parameter constraints are named by user so we should always be able to name it
                local diagnosticMessage;
                switch (node.parent.kind) {
                    case SyntaxKind.ClassDeclaration:
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_class_has_or_is_using_private_name_1;
                        break;
                    case SyntaxKind.InterfaceDeclaration:
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1;
                        break;
                    case SyntaxKind.ConstructSignature:
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;
                        break;
                    case SyntaxKind.CallSignature:
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;
                        break;
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                        if (node.parent.flags & NodeFlags.Static) {
                            diagnosticMessage = Diagnostics.Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
                        end
                        else if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
                            diagnosticMessage = Diagnostics.Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
                        end
                        else {
                            diagnosticMessage = Diagnostics.Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
                        end
                        break;
                    case SyntaxKind.FunctionDeclaration:
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_function_has_or_is_using_private_name_1;
                        break;
                    default:
                        Debug.fail("This is unknown parent for type parameter: " + node.parent.kind);
                end
                return {
                    diagnosticMessage: diagnosticMessage,
                    errorNode: node,
                    typeName: node.name
                };
            end
        end
        if (typeParameters) {
            write("<");
            emitCommaList(typeParameters, emitTypeParameter);
            write(">");
        end
    end
    function emitHeritageClause(typeReferences, isImplementsList)
        if (typeReferences) {
            write(isImplementsList ? " implements " : " extends ");
            emitCommaList(typeReferences, emitTypeOfTypeReference);
        end
        function emitTypeOfTypeReference(node)
            if (isSupportedExpressionWithTypeArguments(node)) {
                emitTypeWithNewGetSymbolAccessibilityDiagnostic(node, getHeritageClauseVisibilityError);
            end
            function getHeritageClauseVisibilityError(symbolAccesibilityResult)
                local diagnosticMessage;
                // Heritage clause is written by user so it can always be named
                if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
                    // Class or Interface implemented/extended is inaccessible
                    diagnosticMessage = isImplementsList ?
                        Diagnostics.Implements_clause_of_exported_class_0_has_or_is_using_private_name_1 :
                        Diagnostics.Extends_clause_of_exported_class_0_has_or_is_using_private_name_1;
                end
                else {
                    // interface is inaccessible
                    diagnosticMessage = Diagnostics.Extends_clause_of_exported_interface_0_has_or_is_using_private_name_1;
                end
                return {
                    diagnosticMessage: diagnosticMessage,
                    errorNode: node,
                    typeName: node.parent.parent.name
                };
            end
        end
    end
    function writeClassDeclaration(node)
        function emitParameterProperties(constructorDeclaration)
            if (constructorDeclaration) {
                forEach(constructorDeclaration.parameters, function (param)
                    if (param.flags & NodeFlags.AccessibilityModifier) {
                        emitPropertyDeclaration(param);
                    end
                end);
            end
        end
        emitJsDocComments(node);
        emitModuleElementDeclarationFlags(node);
        write("class ");
        writeTextOfNode(currentSourceFile, node.name);
        local prevEnclosingDeclaration = enclosingDeclaration;
        enclosingDeclaration = node;
        emitTypeParameters(node.typeParameters);
        local baseTypeNode = getClassExtendsHeritageClauseElement(node);
        if (baseTypeNode) {
            emitHeritageClause([baseTypeNode], false);
        end
        emitHeritageClause(getClassImplementsHeritageClauseElements(node), true);
        write(" {");
        writeLine();
        increaseIndent();
        emitParameterProperties(getFirstConstructorWithBody(node));
        emitLines(node.members);
        decreaseIndent();
        write("}");
        writeLine();
        enclosingDeclaration = prevEnclosingDeclaration;
    end
    function writeInterfaceDeclaration(node)
        emitJsDocComments(node);
        emitModuleElementDeclarationFlags(node);
        write("interface ");
        writeTextOfNode(currentSourceFile, node.name);
        local prevEnclosingDeclaration = enclosingDeclaration;
        enclosingDeclaration = node;
        emitTypeParameters(node.typeParameters);
        emitHeritageClause(getInterfaceBaseTypeNodes(node), false);
        write(" {");
        writeLine();
        increaseIndent();
        emitLines(node.members);
        decreaseIndent();
        write("}");
        writeLine();
        enclosingDeclaration = prevEnclosingDeclaration;
    end
    function emitPropertyDeclaration(node)
        if (hasDynamicName(node)) {
            return;
        end
        emitJsDocComments(node);
        emitClassMemberDeclarationFlags(node);
        emitVariableDeclaration(node);
        write(";");
        writeLine();
    end
    function emitVariableDeclaration(node)
        // If we are emitting property it isn't moduleElement and hence we already know it needs to be emitted
        // so there is no check needed to see if declaration is visible
        if (node.kind !== SyntaxKind.VariableDeclaration || resolver.isDeclarationVisible(node)) {
            if (isBindingPattern(node.name)) {
                emitBindingPattern(node.name);
            end
            else {
                // If this node is a computed name, it can only be a symbol, because we've already skipped
                // it if it's not a well known symbol. In that case, the text of the name will be exactly
                // what we want, namely the name expression enclosed in brackets.
                writeTextOfNode(currentSourceFile, node.name);
                // If optional property emit ?
                if ((node.kind === SyntaxKind.PropertyDeclaration || node.kind === SyntaxKind.PropertySignature) && hasQuestionToken(node)) {
                    write("?");
                end
                if ((node.kind === SyntaxKind.PropertyDeclaration || node.kind === SyntaxKind.PropertySignature) && node.parent.kind === SyntaxKind.TypeLiteral) {
                    emitTypeOfVariableDeclarationFromTypeLiteral(node);
                end
                else if (!(node.flags & NodeFlags.Private)) {
                    writeTypeOfDeclaration(node, node.type, getVariableDeclarationTypeVisibilityError);
                end
            end
        end
        function getVariableDeclarationTypeVisibilityDiagnosticMessage(symbolAccesibilityResult)
            if (node.kind === SyntaxKind.VariableDeclaration) {
                return symbolAccesibilityResult.errorModuleName ?
                    symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                        Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                        Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_private_module_2 :
                    Diagnostics.Exported_variable_0_has_or_is_using_private_name_1;
            end
            else if (node.kind === SyntaxKind.PropertyDeclaration || node.kind === SyntaxKind.PropertySignature) {
                // TODO(jfreeman): Deal with computed properties in error reporting.
                if (node.flags & NodeFlags.Static) {
                    return symbolAccesibilityResult.errorModuleName ?
                        symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1;
                end
                else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                    return symbolAccesibilityResult.errorModuleName ?
                        symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1;
                end
                else {
                    // Interfaces cannot have types that cannot be named
                    return symbolAccesibilityResult.errorModuleName ?
                        Diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1;
                end
            end
        end
        function getVariableDeclarationTypeVisibilityError(symbolAccesibilityResult)
            local diagnosticMessage = getVariableDeclarationTypeVisibilityDiagnosticMessage(symbolAccesibilityResult);
            return diagnosticMessage !== undefined ? {
                diagnosticMessage: diagnosticMessage,
                errorNode: node,
                typeName: node.name
            } : undefined;
        end
        function emitBindingPattern(bindingPattern)
            // Only select non-omitted expression from the bindingPattern's elements.
            // We have to do this to avoid emitting trailing commas.
            // For example:
            //      original: var [, c,,] = [ 2,3,4]
            //      emitted: declare var c: number; // instead of declare var c:number, ;
            local elements = [];
            for (local _i = 0, _a = bindingPattern.elements; _i < _a.length; _i++) {
                local element = _a[_i];
                if (element.kind !== SyntaxKind.OmittedExpression) {
                    elements.push(element);
                end
            }
            emitCommaList(elements, emitBindingElement);
        end
        function emitBindingElement(bindingElement)
            function getBindingElementTypeVisibilityError(symbolAccesibilityResult)
                local diagnosticMessage = getVariableDeclarationTypeVisibilityDiagnosticMessage(symbolAccesibilityResult);
                return diagnosticMessage !== undefined ? {
                    diagnosticMessage: diagnosticMessage,
                    errorNode: bindingElement,
                    typeName: bindingElement.name
                } : undefined;
            end
            if (bindingElement.name) {
                if (isBindingPattern(bindingElement.name)) {
                    emitBindingPattern(bindingElement.name);
                end
                else {
                    writeTextOfNode(currentSourceFile, bindingElement.name);
                    writeTypeOfDeclaration(bindingElement, undefined, getBindingElementTypeVisibilityError);
                end
            end
        end
    end
    function emitTypeOfVariableDeclarationFromTypeLiteral(node)
        // if this is property of type literal,
        // or is parameter of method/call/construct/index signature of type literal
        // emit only if type is specified
        if (node.type) {
            write(": ");
            emitType(node.type);
        end
    end
    function isVariableStatementVisible(node)
        return forEach(node.declarationList.declarations, function (varDeclaration) { return resolver.isDeclarationVisible(varDeclaration); });
    end
    function writeVariableStatement(node)
        emitJsDocComments(node);
        emitModuleElementDeclarationFlags(node);
        if (isLet(node.declarationList)) {
            write("let ");
        end
        else if (isConst(node.declarationList)) {
            write("const ");
        end
        else {
            write("var ");
        end
        emitCommaList(node.declarationList.declarations, emitVariableDeclaration, resolver.isDeclarationVisible);
        write(";");
        writeLine();
    end
    function emitAccessorDeclaration(node)
        if (hasDynamicName(node)) {
            return;
        end
        local accessors = getAllAccessorDeclarations(node.parent.members, node);
        local accessorWithTypeAnnotation;
        if (node === accessors.firstAccessor) {
            emitJsDocComments(accessors.getAccessor);
            emitJsDocComments(accessors.setAccessor);
            emitClassMemberDeclarationFlags(node);
            writeTextOfNode(currentSourceFile, node.name);
            if (!(node.flags & NodeFlags.Private)) {
                accessorWithTypeAnnotation = node;
                local type = getTypeAnnotationFromAccessor(node);
                if (!type) {
                    // couldn't get type for the first accessor, try the another one
                    local anotherAccessor = node.kind === SyntaxKind.GetAccessor ? accessors.setAccessor : accessors.getAccessor;
                    type = getTypeAnnotationFromAccessor(anotherAccessor);
                    if (type) {
                        accessorWithTypeAnnotation = anotherAccessor;
                    end
                end
                writeTypeOfDeclaration(node, type, getAccessorDeclarationTypeVisibilityError);
            end
            write(";");
            writeLine();
        end
        function getTypeAnnotationFromAccessor(accessor)
            if (accessor) {
                return accessor.kind === SyntaxKind.GetAccessor
                    ? accessor.type // Getter - return type
                    : accessor.parameters.length > 0
                        ? accessor.parameters[0].type // Setter parameter type
                        : undefined;
            end
        end
        function getAccessorDeclarationTypeVisibilityError(symbolAccesibilityResult)
            local diagnosticMessage;
            if (accessorWithTypeAnnotation.kind === SyntaxKind.SetAccessor) {
                // Setters have to have type named and cannot infer it so, the type should always be named
                if (accessorWithTypeAnnotation.parent.flags & NodeFlags.Static) {
                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                        Diagnostics.Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_private_name_1;
                end
                else {
                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                        Diagnostics.Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_private_name_1;
                end
                return {
                    diagnosticMessage: diagnosticMessage,
                    errorNode: accessorWithTypeAnnotation.parameters[0],
                    // TODO(jfreeman): Investigate why we are passing node.name instead of node.parameters[0].name
                    typeName: accessorWithTypeAnnotation.name
                };
            end
            else {
                if (accessorWithTypeAnnotation.flags & NodeFlags.Static) {
                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                        symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                            Diagnostics.Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1 :
                        Diagnostics.Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_private_name_0;
                end
                else {
                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                        symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                            Diagnostics.Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1 :
                        Diagnostics.Return_type_of_public_property_getter_from_exported_class_has_or_is_using_private_name_0;
                end
                return {
                    diagnosticMessage: diagnosticMessage,
                    errorNode: accessorWithTypeAnnotation.name,
                    typeName: undefined
                };
            end
        end
    end
    function writeFunctionDeclaration(node)
        if (hasDynamicName(node)) {
            return;
        end
        // If we are emitting Method/Constructor it isn't moduleElement and hence already determined to be emitting
        // so no need to verify if the declaration is visible
        if (!resolver.isImplementationOfOverload(node)) {
            emitJsDocComments(node);
            if (node.kind === SyntaxKind.FunctionDeclaration) {
                emitModuleElementDeclarationFlags(node);
            end
            else if (node.kind === SyntaxKind.MethodDeclaration) {
                emitClassMemberDeclarationFlags(node);
            end
            if (node.kind === SyntaxKind.FunctionDeclaration) {
                write("function ");
                writeTextOfNode(currentSourceFile, node.name);
            end
            else if (node.kind === SyntaxKind.Constructor) {
                write("constructor");
            end
            else {
                writeTextOfNode(currentSourceFile, node.name);
                if (hasQuestionToken(node)) {
                    write("?");
                end
            end
            emitSignatureDeclaration(node);
        end
    end
    function emitSignatureDeclarationWithJsDocComments(node)
        emitJsDocComments(node);
        emitSignatureDeclaration(node);
    end
    function emitSignatureDeclaration(node)
        // Construct signature or constructor type write new Signature
        if (node.kind === SyntaxKind.ConstructSignature || node.kind === SyntaxKind.ConstructorType) {
            write("new ");
        end
        emitTypeParameters(node.typeParameters);
        if (node.kind === SyntaxKind.IndexSignature) {
            write("[");
        end
        else {
            write("(");
        end
        local prevEnclosingDeclaration = enclosingDeclaration;
        enclosingDeclaration = node;
        // Parameters
        emitCommaList(node.parameters, emitParameterDeclaration);
        if (node.kind === SyntaxKind.IndexSignature) {
            write("]");
        end
        else {
            write(")");
        end
        // If this is not a constructor and is not private, emit the return type
        local isFunctionTypeOrConstructorType = node.kind === SyntaxKind.FunctionType || node.kind === SyntaxKind.ConstructorType;
        if (isFunctionTypeOrConstructorType || node.parent.kind === SyntaxKind.TypeLiteral) {
            // Emit type literal signature return type only if specified
            if (node.type) {
                write(isFunctionTypeOrConstructorType ? " => " : ": ");
                emitType(node.type);
            end
        end
        else if (node.kind !== SyntaxKind.Constructor && !(node.flags & NodeFlags.Private)) {
            writeReturnTypeAtSignature(node, getReturnTypeVisibilityError);
        end
        enclosingDeclaration = prevEnclosingDeclaration;
        if (!isFunctionTypeOrConstructorType) {
            write(";");
            writeLine();
        end
        function getReturnTypeVisibilityError(symbolAccesibilityResult)
            local diagnosticMessage;
            switch (node.kind) {
                case SyntaxKind.ConstructSignature:
                    // Interfaces cannot have return types that cannot be named
                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                        Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                        Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0;
                    break;
                case SyntaxKind.CallSignature:
                    // Interfaces cannot have return types that cannot be named
                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                        Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                        Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0;
                    break;
                case SyntaxKind.IndexSignature:
                    // Interfaces cannot have return types that cannot be named
                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                        Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                        Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0;
                    break;
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    if (node.flags & NodeFlags.Static) {
                        diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                                Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0;
                    end
                    else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                        diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                                Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0;
                    end
                    else {
                        // Interfaces cannot have return types that cannot be named
                        diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0;
                    end
                    break;
                case SyntaxKind.FunctionDeclaration:
                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                        symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                            Diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1 :
                        Diagnostics.Return_type_of_exported_function_has_or_is_using_private_name_0;
                    break;
                default:
                    Debug.fail("This is unknown kind for signature: " + node.kind);
            end
            return {
                diagnosticMessage: diagnosticMessage,
                errorNode: node.name || node
            };
        end
    end
    function emitParameterDeclaration(node)
        increaseIndent();
        emitJsDocComments(node);
        if (node.dotDotDotToken) {
            write("...");
        end
        if (isBindingPattern(node.name)) {
            // For bindingPattern, we can't simply writeTextOfNode from the source file
            // because we want to omit the initializer and using writeTextOfNode will result in initializer get emitted.
            // Therefore, we will have to recursively emit each element in the bindingPattern.
            emitBindingPattern(node.name);
        end
        else {
            writeTextOfNode(currentSourceFile, node.name);
        end
        if (node.initializer || hasQuestionToken(node)) {
            write("?");
        end
        decreaseIndent();
        if (node.parent.kind === SyntaxKind.FunctionType ||
            node.parent.kind === SyntaxKind.ConstructorType ||
            node.parent.parent.kind === SyntaxKind.TypeLiteral) {
            emitTypeOfVariableDeclarationFromTypeLiteral(node);
        end
        else if (!(node.parent.flags & NodeFlags.Private)) {
            writeTypeOfDeclaration(node, node.type, getParameterDeclarationTypeVisibilityError);
        end
        function getParameterDeclarationTypeVisibilityError(symbolAccesibilityResult)
            local diagnosticMessage = getParameterDeclarationTypeVisibilityDiagnosticMessage(symbolAccesibilityResult);
            return diagnosticMessage !== undefined ? {
                diagnosticMessage: diagnosticMessage,
                errorNode: node,
                typeName: node.name
            } : undefined;
        end
        function getParameterDeclarationTypeVisibilityDiagnosticMessage(symbolAccesibilityResult)
            switch (node.parent.kind) {
                case SyntaxKind.Constructor:
                    return symbolAccesibilityResult.errorModuleName ?
                        symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1;
                case SyntaxKind.ConstructSignature:
                    // Interfaces cannot have parameter types that cannot be named
                    return symbolAccesibilityResult.errorModuleName ?
                        Diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;
                case SyntaxKind.CallSignature:
                    // Interfaces cannot have parameter types that cannot be named
                    return symbolAccesibilityResult.errorModuleName ?
                        Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    if (node.parent.flags & NodeFlags.Static) {
                        return symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
                    end
                    else if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
                        return symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
                    end
                    else {
                        // Interfaces cannot have parameter types that cannot be named
                        return symbolAccesibilityResult.errorModuleName ?
                            Diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
                    end
                case SyntaxKind.FunctionDeclaration:
                    return symbolAccesibilityResult.errorModuleName ?
                        symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Parameter_0_of_exported_function_has_or_is_using_private_name_1;
                default:
                    Debug.fail("This is unknown parent for parameter: " + node.parent.kind);
            end
        end
        function emitBindingPattern(bindingPattern)
            // We have to explicitly emit square bracket and bracket because these tokens are not store inside the node.
            if (bindingPattern.kind === SyntaxKind.ObjectBindingPattern) {
                write("{");
                emitCommaList(bindingPattern.elements, emitBindingElement);
                write("}");
            end
            else if (bindingPattern.kind === SyntaxKind.ArrayBindingPattern) {
                write("[");
                local elements = bindingPattern.elements;
                emitCommaList(elements, emitBindingElement);
                if (elements && elements.hasTrailingComma) {
                    write(", ");
                end
                write("]");
            end
        end
        function emitBindingElement(bindingElement)
            function getBindingElementTypeVisibilityError(symbolAccesibilityResult)
                local diagnosticMessage = getParameterDeclarationTypeVisibilityDiagnosticMessage(symbolAccesibilityResult);
                return diagnosticMessage !== undefined ? {
                    diagnosticMessage: diagnosticMessage,
                    errorNode: bindingElement,
                    typeName: bindingElement.name
                } : undefined;
            end
            if (bindingElement.kind === SyntaxKind.OmittedExpression) {
                // If bindingElement is an omittedExpression (i.e. containing elision),
                // we will emit blank space (although this may differ from users' original code,
                // it allows emitSeparatedList to write separator appropriately)
                // Example:
                //      original: function foo([, x, ,]) {}
                //      emit    : function foo([ , x,  , ]) {}
                write(" ");
            end
            else if (bindingElement.kind === SyntaxKind.BindingElement) {
                if (bindingElement.propertyName) {
                    // bindingElement has propertyName property in the following case:
                    //      { y: [a,b,c] ...} -> bindingPattern will have a property called propertyName for "y"
                    // We have to explicitly emit the propertyName before descending into its binding elements.
                    // Example:
                    //      original: function foo({y: [a,b,c]}) {}
                    //      emit    : declare function foo({y: [a, b, c]}: { y: [any, any, any] }) void;
                    writeTextOfNode(currentSourceFile, bindingElement.propertyName);
                    write(": ");
                    // If bindingElement has propertyName property, then its name must be another bindingPattern of SyntaxKind.ObjectBindingPattern
                    emitBindingPattern(bindingElement.name);
                end
                else if (bindingElement.name) {
                    if (isBindingPattern(bindingElement.name)) {
                        // If it is a nested binding pattern, we will recursively descend into each element and emit each one separately.
                        // In the case of rest element, we will omit rest element.
                        // Example:
                        //      original: function foo([a, [[b]], c] = [1,[["string"]], 3]) {}
                        //      emit    : declare function foo([a, [[b]], c]: [number, [[string]], number]): void;
                        //      original with rest: function foo([a, ...c]) {}
                        //      emit              : declare function foo([a, ...c]): void;
                        emitBindingPattern(bindingElement.name);
                    end
                    else {
                        Debug.assert(bindingElement.name.kind === SyntaxKind.Identifier);
                        // If the node is just an identifier, we will simply emit the text associated with the node's name
                        // Example:
                        //      original: function foo({y = 10, x}) {}
                        //      emit    : declare function foo({y, x}: {number, any}): void;
                        if (bindingElement.dotDotDotToken) {
                            write("...");
                        end
                        writeTextOfNode(currentSourceFile, bindingElement.name);
                    end
                end
            end
        end
    end
    function emitNode(node)
        switch (node.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.EnumDeclaration:
                return emitModuleElement(node, isModuleElementVisible(node));
            case SyntaxKind.VariableStatement:
                return emitModuleElement(node, isVariableStatementVisible(node));
            case SyntaxKind.ImportDeclaration:
                // Import declaration without import clause is visible, otherwise it is not visible
                return emitModuleElement(node, !node.importClause);
            case SyntaxKind.ExportDeclaration:
                return emitExportDeclaration(node);
            case SyntaxKind.Constructor:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
                return writeFunctionDeclaration(node);
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.IndexSignature:
                return emitSignatureDeclarationWithJsDocComments(node);
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return emitAccessorDeclaration(node);
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
                return emitPropertyDeclaration(node);
            case SyntaxKind.EnumMember:
                return emitEnumMemberDeclaration(node);
            case SyntaxKind.ExportAssignment:
                return emitExportAssignment(node);
            case SyntaxKind.SourceFile:
                return emitSourceFile(node);
        end
    end
    function writeReferencePath(referencedFile)
        local declFileName = referencedFile.flags & NodeFlags.DeclarationFile
            ? referencedFile.fileName // Declaration file, use declaration file name
            : shouldEmitToOwnFile(referencedFile, compilerOptions)
                ? getOwnEmitOutputFilePath(referencedFile, host, ".d.ts") // Own output file so get the .d.ts file
                : removeFileExtension(compilerOptions.out) + ".d.ts"; // Global out file
        declFileName = getRelativePathToDirectoryOrUrl(getDirectoryPath(normalizeSlashes(jsFilePath)), declFileName, host.getCurrentDirectory(), host.getCanonicalFileName, 
        /*isAbsolutePathAnUrl*/ false);
        referencePathsOutput += "/// <reference path=\"" + declFileName + "\" />" + newLine;
    end
end)(ts || (ts = {}));
/* @internal */
function writeDeclarationFile(jsFilePath, sourceFile, host, resolver, diagnostics)
    local emitDeclarationResult = emitDeclarations(host, resolver, diagnostics, jsFilePath, sourceFile);
    // TODO(shkamat): Should we not write any declaration file if any of them can produce error,
    // or should we just not write this file like we are doing now
    if (!emitDeclarationResult.reportedDeclarationError) {
        local declarationOutput = emitDeclarationResult.referencePathsOutput
            + getDeclarationOutput(emitDeclarationResult.synchronousDeclarationOutput, emitDeclarationResult.moduleElementDeclarationEmitInfo);
        writeFile(host, diagnostics, removeFileExtension(jsFilePath) + ".d.ts", declarationOutput, host.getCompilerOptions().emitBOM);
    end
    function getDeclarationOutput(synchronousDeclarationOutput, moduleElementDeclarationEmitInfo)
        local appliedSyncOutputPos = 0;
        local declarationOutput = "";
        // apply asynchronous additions to the synchronous output
        forEach(moduleElementDeclarationEmitInfo, function (aliasEmitInfo)
            if (aliasEmitInfo.asynchronousOutput) {
                declarationOutput += synchronousDeclarationOutput.substring(appliedSyncOutputPos, aliasEmitInfo.outputPos);
                declarationOutput += getDeclarationOutput(aliasEmitInfo.asynchronousOutput, aliasEmitInfo.subModuleElementDeclarationEmitInfo);
                appliedSyncOutputPos = aliasEmitInfo.outputPos;
            end
        end);
        declarationOutput += synchronousDeclarationOutput.substring(appliedSyncOutputPos);
        return declarationOutput;
    end
end
exports.writeDeclarationFile = writeDeclarationFile;
//# sourceMappingURL=file:///C:/Users/qujianbiao/Downloads/TypeScript-master/built/local/compiler/declarationEmitter.js.map