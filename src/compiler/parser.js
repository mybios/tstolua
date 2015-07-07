/// <reference path="scanner.ts"/>
/// <reference path="utilities.ts"/>
local ts;
(function (ts) {
    local nodeConstructors = new Array(SyntaxKind.Count);
    /* @internal */ ts.parseTime = 0;
    function getNodeConstructor(kind)
        return nodeConstructors[kind] || (nodeConstructors[kind] = objectAllocator.getNodeConstructor(kind));
    end
    ts.getNodeConstructor = getNodeConstructor;
    function createNode(kind)
        return new (getNodeConstructor(kind))();
    end
    ts.createNode = createNode;
    function visitNode(cbNode, node)
        if (node) {
            return cbNode(node);
        end
    end
    function visitNodeArray(cbNodes, nodes)
        if (nodes) {
            return cbNodes(nodes);
        end
    end
    function visitEachNode(cbNode, nodes)
        if (nodes) {
            for (local _i = 0; _i < nodes.length; _i++) {
                local node = nodes[_i];
                local result = cbNode(node);
                if (result) {
                    return result;
                end
            }
        end
    end
    // Invokes a callback for each child of the given node. The 'cbNode' callback is invoked for all child nodes
    // stored in properties. If a 'cbNodes' callback is specified, it is invoked for embedded arrays; otherwise,
    // embedded arrays are flattened and the 'cbNode' callback is invoked for each element. If a callback returns
    // a truthy value, iteration stops and that value is returned. Otherwise, undefined is returned.
    function forEachChild(node, cbNode, cbNodeArray)
        if (!node) {
            return;
        end
        // The visitXXX functions could be written as local functions that close over the cbNode and cbNodeArray
        // callback parameters, but that causes a closure allocation for each invocation with noticeable effects
        // on performance.
        local visitNodes = cbNodeArray ? visitNodeArray : visitEachNode;
        local cbNodes = cbNodeArray || cbNode;
        switch (node.kind) {
            case SyntaxKind.QualifiedName:
                return visitNode(cbNode, node.left) ||
                    visitNode(cbNode, node.right);
            case SyntaxKind.TypeParameter:
                return visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.constraint) ||
                    visitNode(cbNode, node.expression);
            case SyntaxKind.Parameter:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.BindingElement:
                return visitNodes(cbNodes, node.decorators) ||
                    visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.propertyName) ||
                    visitNode(cbNode, node.dotDotDotToken) ||
                    visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.questionToken) ||
                    visitNode(cbNode, node.type) ||
                    visitNode(cbNode, node.initializer);
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
                return visitNodes(cbNodes, node.decorators) ||
                    visitNodes(cbNodes, node.modifiers) ||
                    visitNodes(cbNodes, node.typeParameters) ||
                    visitNodes(cbNodes, node.parameters) ||
                    visitNode(cbNode, node.type);
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ArrowFunction:
                return visitNodes(cbNodes, node.decorators) ||
                    visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.asteriskToken) ||
                    visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.questionToken) ||
                    visitNodes(cbNodes, node.typeParameters) ||
                    visitNodes(cbNodes, node.parameters) ||
                    visitNode(cbNode, node.type) ||
                    visitNode(cbNode, node.equalsGreaterThanToken) ||
                    visitNode(cbNode, node.body);
            case SyntaxKind.TypeReference:
                return visitNode(cbNode, node.typeName) ||
                    visitNodes(cbNodes, node.typeArguments);
            case SyntaxKind.TypeQuery:
                return visitNode(cbNode, node.exprName);
            case SyntaxKind.TypeLiteral:
                return visitNodes(cbNodes, node.members);
            case SyntaxKind.ArrayType:
                return visitNode(cbNode, node.elementType);
            case SyntaxKind.TupleType:
                return visitNodes(cbNodes, node.elementTypes);
            case SyntaxKind.UnionType:
                return visitNodes(cbNodes, node.types);
            case SyntaxKind.ParenthesizedType:
                return visitNode(cbNode, node.type);
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                return visitNodes(cbNodes, node.elements);
            case SyntaxKind.ArrayLiteralExpression:
                return visitNodes(cbNodes, node.elements);
            case SyntaxKind.ObjectLiteralExpression:
                return visitNodes(cbNodes, node.properties);
            case SyntaxKind.PropertyAccessExpression:
                return visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.dotToken) ||
                    visitNode(cbNode, node.name);
            case SyntaxKind.ElementAccessExpression:
                return visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.argumentExpression);
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
                return visitNode(cbNode, node.expression) ||
                    visitNodes(cbNodes, node.typeArguments) ||
                    visitNodes(cbNodes, node.arguments);
            case SyntaxKind.TaggedTemplateExpression:
                return visitNode(cbNode, node.tag) ||
                    visitNode(cbNode, node.template);
            case SyntaxKind.TypeAssertionExpression:
                return visitNode(cbNode, node.type) ||
                    visitNode(cbNode, node.expression);
            case SyntaxKind.ParenthesizedExpression:
                return visitNode(cbNode, node.expression);
            case SyntaxKind.DeleteExpression:
                return visitNode(cbNode, node.expression);
            case SyntaxKind.TypeOfExpression:
                return visitNode(cbNode, node.expression);
            case SyntaxKind.VoidExpression:
                return visitNode(cbNode, node.expression);
            case SyntaxKind.PrefixUnaryExpression:
                return visitNode(cbNode, node.operand);
            case SyntaxKind.YieldExpression:
                return visitNode(cbNode, node.asteriskToken) ||
                    visitNode(cbNode, node.expression);
            case SyntaxKind.PostfixUnaryExpression:
                return visitNode(cbNode, node.operand);
            case SyntaxKind.BinaryExpression:
                return visitNode(cbNode, node.left) ||
                    visitNode(cbNode, node.operatorToken) ||
                    visitNode(cbNode, node.right);
            case SyntaxKind.ConditionalExpression:
                return visitNode(cbNode, node.condition) ||
                    visitNode(cbNode, node.questionToken) ||
                    visitNode(cbNode, node.whenTrue) ||
                    visitNode(cbNode, node.colonToken) ||
                    visitNode(cbNode, node.whenFalse);
            case SyntaxKind.SpreadElementExpression:
                return visitNode(cbNode, node.expression);
            case SyntaxKind.Block:
            case SyntaxKind.ModuleBlock:
                return visitNodes(cbNodes, node.statements);
            case SyntaxKind.SourceFile:
                return visitNodes(cbNodes, node.statements) ||
                    visitNode(cbNode, node.endOfFileToken);
            case SyntaxKind.VariableStatement:
                return visitNodes(cbNodes, node.decorators) ||
                    visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.declarationList);
            case SyntaxKind.VariableDeclarationList:
                return visitNodes(cbNodes, node.declarations);
            case SyntaxKind.ExpressionStatement:
                return visitNode(cbNode, node.expression);
            case SyntaxKind.IfStatement:
                return visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.thenStatement) ||
                    visitNode(cbNode, node.elseStatement);
            case SyntaxKind.DoStatement:
                return visitNode(cbNode, node.statement) ||
                    visitNode(cbNode, node.expression);
            case SyntaxKind.WhileStatement:
                return visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.statement);
            case SyntaxKind.ForStatement:
                return visitNode(cbNode, node.initializer) ||
                    visitNode(cbNode, node.condition) ||
                    visitNode(cbNode, node.incrementor) ||
                    visitNode(cbNode, node.statement);
            case SyntaxKind.ForInStatement:
                return visitNode(cbNode, node.initializer) ||
                    visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.statement);
            case SyntaxKind.ForOfStatement:
                return visitNode(cbNode, node.initializer) ||
                    visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.statement);
            case SyntaxKind.ContinueStatement:
            case SyntaxKind.BreakStatement:
                return visitNode(cbNode, node.label);
            case SyntaxKind.ReturnStatement:
                return visitNode(cbNode, node.expression);
            case SyntaxKind.WithStatement:
                return visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.statement);
            case SyntaxKind.SwitchStatement:
                return visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.caseBlock);
            case SyntaxKind.CaseBlock:
                return visitNodes(cbNodes, node.clauses);
            case SyntaxKind.CaseClause:
                return visitNode(cbNode, node.expression) ||
                    visitNodes(cbNodes, node.statements);
            case SyntaxKind.DefaultClause:
                return visitNodes(cbNodes, node.statements);
            case SyntaxKind.LabeledStatement:
                return visitNode(cbNode, node.label) ||
                    visitNode(cbNode, node.statement);
            case SyntaxKind.ThrowStatement:
                return visitNode(cbNode, node.expression);
            case SyntaxKind.TryStatement:
                return visitNode(cbNode, node.tryBlock) ||
                    visitNode(cbNode, node.catchClause) ||
                    visitNode(cbNode, node.finallyBlock);
            case SyntaxKind.CatchClause:
                return visitNode(cbNode, node.variableDeclaration) ||
                    visitNode(cbNode, node.block);
            case SyntaxKind.Decorator:
                return visitNode(cbNode, node.expression);
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
                return visitNodes(cbNodes, node.decorators) ||
                    visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.name) ||
                    visitNodes(cbNodes, node.typeParameters) ||
                    visitNodes(cbNodes, node.heritageClauses) ||
                    visitNodes(cbNodes, node.members);
            case SyntaxKind.InterfaceDeclaration:
                return visitNodes(cbNodes, node.decorators) ||
                    visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.name) ||
                    visitNodes(cbNodes, node.typeParameters) ||
                    visitNodes(cbNodes, node.heritageClauses) ||
                    visitNodes(cbNodes, node.members);
            case SyntaxKind.TypeAliasDeclaration:
                return visitNodes(cbNodes, node.decorators) ||
                    visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.type);
            case SyntaxKind.EnumDeclaration:
                return visitNodes(cbNodes, node.decorators) ||
                    visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.name) ||
                    visitNodes(cbNodes, node.members);
            case SyntaxKind.EnumMember:
                return visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.initializer);
            case SyntaxKind.ModuleDeclaration:
                return visitNodes(cbNodes, node.decorators) ||
                    visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.body);
            case SyntaxKind.ImportEqualsDeclaration:
                return visitNodes(cbNodes, node.decorators) ||
                    visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.moduleReference);
            case SyntaxKind.ImportDeclaration:
                return visitNodes(cbNodes, node.decorators) ||
                    visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.importClause) ||
                    visitNode(cbNode, node.moduleSpecifier);
            case SyntaxKind.ImportClause:
                return visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.namedBindings);
            case SyntaxKind.NamespaceImport:
                return visitNode(cbNode, node.name);
            case SyntaxKind.NamedImports:
            case SyntaxKind.NamedExports:
                return visitNodes(cbNodes, node.elements);
            case SyntaxKind.ExportDeclaration:
                return visitNodes(cbNodes, node.decorators) ||
                    visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.exportClause) ||
                    visitNode(cbNode, node.moduleSpecifier);
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ExportSpecifier:
                return visitNode(cbNode, node.propertyName) ||
                    visitNode(cbNode, node.name);
            case SyntaxKind.ExportAssignment:
                return visitNodes(cbNodes, node.decorators) ||
                    visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.expression);
            case SyntaxKind.TemplateExpression:
                return visitNode(cbNode, node.head) || visitNodes(cbNodes, node.templateSpans);
            case SyntaxKind.TemplateSpan:
                return visitNode(cbNode, node.expression) || visitNode(cbNode, node.literal);
            case SyntaxKind.ComputedPropertyName:
                return visitNode(cbNode, node.expression);
            case SyntaxKind.HeritageClause:
                return visitNodes(cbNodes, node.types);
            case SyntaxKind.ExpressionWithTypeArguments:
                return visitNode(cbNode, node.expression) ||
                    visitNodes(cbNodes, node.typeArguments);
            case SyntaxKind.ExternalModuleReference:
                return visitNode(cbNode, node.expression);
            case SyntaxKind.MissingDeclaration:
                return visitNodes(cbNodes, node.decorators);
        end
    end
    ts.forEachChild = forEachChild;
    function createSourceFile(fileName, sourceText, languageVersion, setParentNodes)
        if (setParentNodes === void 0) { setParentNodes = false; }
        local start = new Date().getTime();
        local result = Parser.parseSourceFile(fileName, sourceText, languageVersion, undefined, setParentNodes);
        ts.parseTime += new Date().getTime() - start;
        return result;
    end
    ts.createSourceFile = createSourceFile;
    // Produces a new SourceFile for the 'newText' provided. The 'textChangeRange' parameter
    // indicates what changed between the 'text' that this SourceFile has and the 'newText'.
    // The SourceFile will be created with the compiler attempting to reuse as many nodes from
    // this file as possible.
    //
    // Note: this function mutates nodes from this SourceFile. That means any existing nodes
    // from this SourceFile that are being held onto may change as a result (including
    // becoming detached from any SourceFile).  It is recommended that this SourceFile not
    // be used once 'update' is called on it.
    function updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks)
        return IncrementalParser.updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks);
    end
    ts.updateSourceFile = updateSourceFile;
    // Implement the parser as a singleton module.  We do this for perf reasons because creating
    // parser instances can actually be expensive enough to impact us on projects with many source
    // files.
    local Parser;
    (function (Parser) {
        // Share a single scanner across all calls to parse a source file.  This helps speed things
        // up by avoiding the cost of creating/compiling scanners over and over again.
        local scanner = createScanner(ScriptTarget.Latest, true);
        local disallowInAndDecoratorContext = ParserContextFlags.DisallowIn | ParserContextFlags.Decorator;
        local sourceFile;
        local syntaxCursor;
        local token;
        local sourceText;
        local nodeCount;
        local identifiers;
        local identifierCount;
        local parsingContext;
        // Flags that dictate what parsing context we're in.  For example:
        // Whether or not we are in strict parsing mode.  All that changes in strict parsing mode is
        // that some tokens that would be considered identifiers may be considered keywords.
        //
        // When adding more parser context flags, consider which is the more common case that the
        // flag will be in.  This should be the 'false' state for that flag.  The reason for this is
        // that we don't store data in our nodes unless the value is in the *non-default* state.  So,
        // for example, more often than code 'allows-in' (or doesn't 'disallow-in').  We opt for
        // 'disallow-in' set to 'false'.  Otherwise, if we had 'allowsIn' set to 'true', then almost
        // all nodes would need extra state on them to store this info.
        //
        // Note:  'allowIn' and 'allowYield' track 1:1 with the [in] and [yield] concepts in the ES6
        // grammar specification.
        //
        // An important thing about these context concepts.  By default they are effectively inherited
        // while parsing through every grammar production.  i.e. if you don't change them, then when
        // you parse a sub-production, it will have the same context values as the parent production.
        // This is great most of the time.  After all, consider all the 'expression' grammar productions
        // and how nearly all of them pass along the 'in' and 'yield' context values:
        //
        // EqualityExpression[In, Yield] :
        //      RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] == RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] != RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] === RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] !== RelationalExpression[?In, ?Yield]
        //
        // Where you have to be careful is then understanding what the points are in the grammar
        // where the values are *not* passed along.  For example:
        //
        // SingleNameBinding[Yield,GeneratorParameter]
        //      [+GeneratorParameter]BindingIdentifier[Yield] Initializer[In]opt
        //      [~GeneratorParameter]BindingIdentifier[?Yield]Initializer[In, ?Yield]opt
        //
        // Here this is saying that if the GeneratorParameter context flag is set, that we should
        // explicitly set the 'yield' context flag to false before calling into the BindingIdentifier
        // and we should explicitly unset the 'yield' context flag before calling into the Initializer.
        // production.  Conversely, if the GeneratorParameter context flag is not set, then we
        // should leave the 'yield' context flag alone.
        //
        // Getting this all correct is tricky and requires careful reading of the grammar to
        // understand when these values should be changed versus when they should be inherited.
        //
        // Note: it should not be necessary to save/restore these flags during speculative/lookahead
        // parsing.  These context flags are naturally stored and restored through normal recursive
        // descent parsing and unwinding.
        local contextFlags = 0;
        // Whether or not we've had a parse error since creating the last AST node.  If we have
        // encountered an error, it will be stored on the next AST node we create.  Parse errors
        // can be broken down into three categories:
        //
        // 1) An error that occurred during scanning.  For example, an unterminated literal, or a
        //    character that was completely not understood.
        //
        // 2) A token was expected, but was not present.  This type of error is commonly produced
        //    by the 'parseExpected' function.
        //
        // 3) A token was present that no parsing function was able to consume.  This type of error
        //    only occurs in the 'abortParsingListOrMoveToNextToken' function when the parser
        //    decides to skip the token.
        //
        // In all of these cases, we want to mark the next node as having had an error before it.
        // With this mark, we can know in incremental settings if this node can be reused, or if
        // we have to reparse it.  If we don't keep this information around, we may just reuse the
        // node.  in that event we would then not produce the same errors as we did before, causing
        // significant confusion problems.
        //
        // Note: it is necessary that this value be saved/restored during speculative/lookahead
        // parsing.  During lookahead parsing, we will often create a node.  That node will have
        // this value attached, and then this value will be set back to 'false'.  If we decide to
        // rewind, we must get back to the same value we had prior to the lookahead.
        //
        // Note: any errors at the end of the file that do not precede a regular node, should get
        // attached to the EOF token.
        local parseErrorBeforeNextFinishedNode = false;
        function parseSourceFile(fileName, _sourceText, languageVersion, _syntaxCursor, setParentNodes)
            sourceText = _sourceText;
            syntaxCursor = _syntaxCursor;
            parsingContext = 0;
            identifiers = {};
            identifierCount = 0;
            nodeCount = 0;
            contextFlags = 0;
            parseErrorBeforeNextFinishedNode = false;
            createSourceFile(fileName, languageVersion);
            // Initialize and prime the scanner before parsing the source elements.
            scanner.setText(sourceText);
            scanner.setOnError(scanError);
            scanner.setScriptTarget(languageVersion);
            token = nextToken();
            processReferenceComments(sourceFile);
            sourceFile.statements = parseList(0 /* SourceElements */, true, parseSourceElement);
            Debug.assert(token === SyntaxKind.EndOfFileToken);
            sourceFile.endOfFileToken = parseTokenNode();
            setExternalModuleIndicator(sourceFile);
            sourceFile.nodeCount = nodeCount;
            sourceFile.identifierCount = identifierCount;
            sourceFile.identifiers = identifiers;
            if (setParentNodes) {
                fixupParentReferences(sourceFile);
            end
            syntaxCursor = undefined;
            // Clear out the text the scanner is pointing at, so it doesn't keep anything alive unnecessarily.
            scanner.setText("");
            scanner.setOnError(undefined);
            local result = sourceFile;
            // Clear any data.  We don't want to accidently hold onto it for too long.
            sourceFile = undefined;
            identifiers = undefined;
            syntaxCursor = undefined;
            sourceText = undefined;
            return result;
        end
        Parser.parseSourceFile = parseSourceFile;
        function fixupParentReferences(sourceFile)
            // normally parent references are set during binding. However, for clients that only need
            // a syntax tree, and no semantic features, then the binding process is an unnecessary
            // overhead.  This functions allows us to set all the parents, without all the expense of
            // binding.
            local parent = sourceFile;
            forEachChild(sourceFile, visitNode);
            return;
            function visitNode(n)
                // walk down setting parents that differ from the parent we think it should be.  This
                // allows us to quickly bail out of setting parents for subtrees during incremental
                // parsing
                if (n.parent !== parent) {
                    n.parent = parent;
                    local saveParent = parent;
                    parent = n;
                    forEachChild(n, visitNode);
                    parent = saveParent;
                end
            end
        end
        function createSourceFile(fileName, languageVersion)
            sourceFile = createNode(SyntaxKind.SourceFile, 0);
            sourceFile.pos = 0;
            sourceFile.;
        end
        sourceText.length;
        sourceFile.text = sourceText;
        sourceFile.parseDiagnostics = [];
        sourceFile.bindDiagnostics = [];
        sourceFile.languageVersion = languageVersion;
        sourceFile.fileName = normalizePath(fileName);
        sourceFile.flags = fileExtensionIs(sourceFile.fileName, ".d.ts") ? NodeFlags.DeclarationFile : 0;
    end)(Parser || (Parser = {}));
    function setContextFlag(val, flag)
        if (val) {
            contextFlags |= flag;
        end
        else {
            contextFlags &= ~flag;
        end
    end
    function setStrictModeContext(val)
        setContextFlag(val, ParserContextFlags.StrictMode);
    end
    function setDisallowInContext(val)
        setContextFlag(val, ParserContextFlags.DisallowIn);
    end
    function setYieldContext(val)
        setContextFlag(val, ParserContextFlags.Yield);
    end
    function setGeneratorParameterContext(val)
        setContextFlag(val, ParserContextFlags.GeneratorParameter);
    end
    function setDecoratorContext(val)
        setContextFlag(val, ParserContextFlags.Decorator);
    end
    function doOutsideOfContext(flags, func)
        local currentContextFlags = contextFlags & flags;
        if (currentContextFlags) {
            setContextFlag(false, currentContextFlags);
            local result = func();
            setContextFlag(true, currentContextFlags);
            return result;
        end
        // no need to do anything special as we are not in any of the requested contexts
        return func();
    end
    function allowInAnd(func)
        if (contextFlags & ParserContextFlags.DisallowIn) {
            setDisallowInContext(false);
            local result = func();
            setDisallowInContext(true);
            return result;
        end
        // no need to do anything special if 'in' is already allowed.
        return func();
    end
    function disallowInAnd(func)
        if (contextFlags & ParserContextFlags.DisallowIn) {
            // no need to do anything special if 'in' is already disallowed.
            return func();
        end
        setDisallowInContext(true);
        local result = func();
        setDisallowInContext(false);
        return result;
    end
    function doInYieldContext(func)
        if (contextFlags & ParserContextFlags.Yield) {
            // no need to do anything special if we're already in the [Yield] context.
            return func();
        end
        setYieldContext(true);
        local result = func();
        setYieldContext(false);
        return result;
    end
    function doOutsideOfYieldContext(func)
        if (contextFlags & ParserContextFlags.Yield) {
            setYieldContext(false);
            local result = func();
            setYieldContext(true);
            return result;
        end
        // no need to do anything special if we're not in the [Yield] context.
        return func();
    end
    function doInDecoratorContext(func)
        if (contextFlags & ParserContextFlags.Decorator) {
            // no need to do anything special if we're already in the [Decorator] context.
            return func();
        end
        setDecoratorContext(true);
        local result = func();
        setDecoratorContext(false);
        return result;
    end
    function inYieldContext()
        return (contextFlags & ParserContextFlags.Yield) !== 0;
    end
    function inStrictModeContext()
        return (contextFlags & ParserContextFlags.StrictMode) !== 0;
    end
    function inGeneratorParameterContext()
        return (contextFlags & ParserContextFlags.GeneratorParameter) !== 0;
    end
    function inDisallowInContext()
        return (contextFlags & ParserContextFlags.DisallowIn) !== 0;
    end
    function inDecoratorContext()
        return (contextFlags & ParserContextFlags.Decorator) !== 0;
    end
    function parseErrorAtCurrentToken(message, arg0)
        local start = scanner.getTokenPos();
        local length = scanner.getTextPos() - start;
        parseErrorAtPosition(start, length, message, arg0);
    end
    function parseErrorAtPosition(start, length, message, arg0)
        // Don't report another error if it would just be at the same position as the last error.
        local lastError = lastOrUndefined(sourceFile.parseDiagnostics);
        if (!lastError || start !== lastError.start) {
            sourceFile.parseDiagnostics.push(createFileDiagnostic(sourceFile, start, length, message, arg0));
        end
        // Mark that we've encountered an error.  We'll set an appropriate bit on the next
        // node we finish so that it can't be reused incrementally.
        parseErrorBeforeNextFinishedNode = true;
    end
    function scanError(message, length)
        local pos = scanner.getTextPos();
        parseErrorAtPosition(pos, length || 0, message);
    end
    function getNodePos()
        return scanner.getStartPos();
    end
    function getNodeEnd()
        return scanner.getStartPos();
    end
    function nextToken()
        return token = scanner.scan();
    end
    function getTokenPos(pos)
        return skipTrivia(sourceText, pos);
    end
    function reScanGreaterToken()
        return token = scanner.reScanGreaterToken();
    end
    function reScanSlashToken()
        return token = scanner.reScanSlashToken();
    end
    function reScanTemplateToken()
        return token = scanner.reScanTemplateToken();
    end
    function speculationHelper(callback, isLookAhead)
        // Keep track of the state we'll need to rollback to if lookahead fails (or if the
        // caller asked us to always reset our state).
        local saveToken = token;
        local saveParseDiagnosticsLength = sourceFile.parseDiagnostics.length;
        local saveParseErrorBeforeNextFinishedNode = parseErrorBeforeNextFinishedNode;
        // Note: it is not actually necessary to save/restore the context flags here.  That's
        // because the saving/restorating of these flags happens naturally through the recursive
        // descent nature of our parser.  However, we still store this here just so we can
        // assert that that invariant holds.
        local saveContextFlags = contextFlags;
        // If we're only looking ahead, then tell the scanner to only lookahead as well.
        // Otherwise, if we're actually speculatively parsing, then tell the scanner to do the
        // same.
        local result = isLookAhead
            ? scanner.lookAhead(callback)
            : scanner.tryScan(callback);
        Debug.assert(saveContextFlags === contextFlags);
        // If our callback returned something 'falsy' or we're just looking ahead,
        // then unconditionally restore us to where we were.
        if (!result || isLookAhead) {
            token = saveToken;
            sourceFile.parseDiagnostics.length = saveParseDiagnosticsLength;
            parseErrorBeforeNextFinishedNode = saveParseErrorBeforeNextFinishedNode;
        end
        return result;
    end
    // Invokes the provided callback then unconditionally restores the parser to the state it
    // was in immediately prior to invoking the callback.  The result of invoking the callback
    // is returned from this function.
    function lookAhead(callback)
        return speculationHelper(callback, true);
    end
    // Invokes the provided callback.  If the callback returns something falsy, then it restores
    // the parser to the state it was in immediately prior to invoking the callback.  If the
    // callback returns something truthy, then the parser state is not rolled back.  The result
    // of invoking the callback is returned from this function.
    function tryParse(callback)
        return speculationHelper(callback, false);
    end
    // Ignore strict mode flag because we will report an error in type checker instead.
    function isIdentifier()
        if (token === SyntaxKind.Identifier) {
            return true;
        end
        // If we have a 'yield' keyword, and we're in the [yield] context, then 'yield' is
        // considered a keyword and is not an identifier.
        if (token === SyntaxKind.YieldKeyword && inYieldContext()) {
            return false;
        end
        return token > SyntaxKind.LastReservedWord;
    end
    function parseExpected(kind, diagnosticMessage)
        if (token === kind) {
            nextToken();
            return true;
        end
        // Report specific message if provided with one.  Otherwise, report generic fallback message.
        if (diagnosticMessage) {
            parseErrorAtCurrentToken(diagnosticMessage);
        end
        else {
            parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(kind));
        end
        return false;
    end
    function parseOptional(t)
        if (token === t) {
            nextToken();
            return true;
        end
        return false;
    end
    function parseOptionalToken(t)
        if (token === t) {
            return parseTokenNode();
        end
        return undefined;
    end
    function parseExpectedToken(t, reportAtCurrentPosition, diagnosticMessage, arg0)
        return parseOptionalToken(t) ||
            createMissingNode(t, reportAtCurrentPosition, diagnosticMessage, arg0);
    end
    function parseTokenNode()
        local node = createNode(token);
        nextToken();
        return finishNode(node);
    end
    function canParseSemicolon()
        // If there's a real semicolon, then we can always parse it out.
        if (token === SyntaxKind.SemicolonToken) {
            return true;
        end
        // We can parse out an optional semicolon in ASI cases in the following cases.
        return token === SyntaxKind.CloseBraceToken || token === SyntaxKind.EndOfFileToken || scanner.hasPrecedingLineBreak();
    end
    function parseSemicolon()
        if (canParseSemicolon()) {
            if (token === SyntaxKind.SemicolonToken) {
                // consume the semicolon if it was explicitly provided.
                nextToken();
            end
            return true;
        end
        else {
            return parseExpected(SyntaxKind.SemicolonToken);
        end
    end
    function createNode(kind, pos)
        nodeCount++;
        local node = new (nodeConstructors[kind] || (nodeConstructors[kind] = objectAllocator.getNodeConstructor(kind)))();
        if (!(pos >= 0)) {
            pos = scanner.getStartPos();
        end
        node.pos = pos;
        node.;
    end
    pos;
    return node;
end)(ts || (ts = {}));
function finishNode(node)
    node.;
end
scanner.getStartPos();
if (contextFlags) {
    node.parserContextFlags = contextFlags;
end
// Keep track on the node if we encountered an error while parsing it.  If we did, then
// we cannot reuse the node incrementally.  Once we've marked this node, clear out the
// flag so that we don't mark any subsequent nodes.
if (parseErrorBeforeNextFinishedNode) {
    parseErrorBeforeNextFinishedNode = false;
    node.parserContextFlags |= ParserContextFlags.ThisNodeHasError;
end
return node;
function createMissingNode(kind, reportAtCurrentPosition, diagnosticMessage, arg0)
    if (reportAtCurrentPosition) {
        parseErrorAtPosition(scanner.getStartPos(), 0, diagnosticMessage, arg0);
    end
    else {
        parseErrorAtCurrentToken(diagnosticMessage, arg0);
    end
    local result = createNode(kind, scanner.getStartPos());
    result.text = "";
    return finishNode(result);
end
function internIdentifier(text)
    text = escapeIdentifier(text);
    return hasProperty(identifiers, text) ? identifiers[text] : (identifiers[text] = text);
end
// An identifier that starts with two underscores has an extra underscore character prepended to it to avoid issues
// with magic property names like '__proto__'. The 'identifiers' object is used to share a single string instance for
// each identifier in order to reduce memory consumption.
function createIdentifier(isIdentifier, diagnosticMessage)
    identifierCount++;
    if (isIdentifier) {
        local node = createNode(SyntaxKind.Identifier);
        // Store original token kind if it is not just an Identifier so we can report appropriate error later in type checker
        if (token !== SyntaxKind.Identifier) {
            node.originalKeywordKind = token;
        end
        node.text = internIdentifier(scanner.getTokenValue());
        nextToken();
        return finishNode(node);
    end
    return createMissingNode(SyntaxKind.Identifier, false, diagnosticMessage || Diagnostics.Identifier_expected);
end
function parseIdentifier(diagnosticMessage)
    return createIdentifier(isIdentifier(), diagnosticMessage);
end
function parseIdentifierName()
    return createIdentifier(isIdentifierOrKeyword());
end
function isLiteralPropertyName()
    return isIdentifierOrKeyword() ||
        token === SyntaxKind.StringLiteral ||
        token === SyntaxKind.NumericLiteral;
end
function parsePropertyName()
    if (token === SyntaxKind.StringLiteral || token === SyntaxKind.NumericLiteral) {
        return parseLiteralNode(true);
    end
    if (token === SyntaxKind.OpenBracketToken) {
        return parseComputedPropertyName();
    end
    return parseIdentifierName();
end
function parseComputedPropertyName()
    // PropertyName[Yield,GeneratorParameter] :
    //     LiteralPropertyName
    //     [+GeneratorParameter] ComputedPropertyName
    //     [~GeneratorParameter] ComputedPropertyName[?Yield]
    //
    // ComputedPropertyName[Yield] :
    //     [ AssignmentExpression[In, ?Yield] ]
    //
    local node = createNode(SyntaxKind.ComputedPropertyName);
    parseExpected(SyntaxKind.OpenBracketToken);
    // We parse any expression (including a comma expression). But the grammar
    // says that only an assignment expression is allowed, so the grammar checker
    // will error if it sees a comma expression.
    local yieldContext = inYieldContext();
    if (inGeneratorParameterContext()) {
        setYieldContext(false);
    end
    node.expression = allowInAnd(parseExpression);
    if (inGeneratorParameterContext()) {
        setYieldContext(yieldContext);
    end
    parseExpected(SyntaxKind.CloseBracketToken);
    return finishNode(node);
end
function parseContextualModifier(t)
    return token === t && tryParse(nextTokenCanFollowModifier);
end
function nextTokenCanFollowModifier()
    if (token === SyntaxKind.ConstKeyword) {
        // 'const' is only a modifier if followed by 'enum'.
        return nextToken() === SyntaxKind.EnumKeyword;
    end
    if (token === SyntaxKind.ExportKeyword) {
        nextToken();
        if (token === SyntaxKind.DefaultKeyword) {
            return lookAhead(nextTokenIsClassOrFunction);
        end
        return token !== SyntaxKind.AsteriskToken && token !== SyntaxKind.OpenBraceToken && canFollowModifier();
    end
    if (token === SyntaxKind.DefaultKeyword) {
        return nextTokenIsClassOrFunction();
    end
    nextToken();
    return canFollowModifier();
end
function parseAnyContextualModifier()
    return isModifier(token) && tryParse(nextTokenCanFollowModifier);
end
function canFollowModifier()
    return token === SyntaxKind.OpenBracketToken
        || token === SyntaxKind.OpenBraceToken
        || token === SyntaxKind.AsteriskToken
        || isLiteralPropertyName();
end
function nextTokenIsClassOrFunction()
    nextToken();
    return token === SyntaxKind.ClassKeyword || token === SyntaxKind.FunctionKeyword;
end
// True if positioned at the start of a list element
function isListElement(parsingContext, inErrorRecovery)
    local node = currentNode(parsingContext);
    if (node) {
        return true;
    end
    switch (parsingContext) {
        case 0 /* SourceElements */:
        case 1 /* ModuleElements */:
            return isSourceElement(inErrorRecovery);
        case 2 /* BlockStatements */:
        case 4 /* SwitchClauseStatements */:
            return isStartOfStatement(inErrorRecovery);
        case 3 /* SwitchClauses */:
            return token === SyntaxKind.CaseKeyword || token === SyntaxKind.DefaultKeyword;
        case 5 /* TypeMembers */:
            return isStartOfTypeMember();
        case 6 /* ClassMembers */:
            // We allow semicolons as class elements (as specified by ES6) as long as we're
            // not in error recovery.  If we're in error recovery, we don't want an errant
            // semicolon to be treated as a class member (since they're almost always used
            // for statements.
            return lookAhead(isClassMemberStart) || (token === SyntaxKind.SemicolonToken && !inErrorRecovery);
        case 7 /* EnumMembers */:
            // Include open bracket computed properties. This technically also lets in indexers,
            // which would be a candidate for improved error reporting.
            return token === SyntaxKind.OpenBracketToken || isLiteralPropertyName();
        case 13 /* ObjectLiteralMembers */:
            return token === SyntaxKind.OpenBracketToken || token === SyntaxKind.AsteriskToken || isLiteralPropertyName();
        case 10 /* ObjectBindingElements */:
            return isLiteralPropertyName();
        case 8 /* HeritageClauseElement */:
            // If we see { } then only consume it as an expression if it is followed by , or {
            // That way we won't consume the body of a class in its heritage clause.
            if (token === SyntaxKind.OpenBraceToken) {
                return lookAhead(isValidHeritageClauseObjectLiteral);
            end
            if (!inErrorRecovery) {
                return isStartOfLeftHandSideExpression() && !isHeritageClauseExtendsOrImplementsKeyword();
            end
            else {
                // If we're in error recovery we tighten up what we're willing to match.
                // That way we don't treat something like "this" as a valid heritage clause
                // element during recovery.
                return isIdentifier() && !isHeritageClauseExtendsOrImplementsKeyword();
            end
        case 9 /* VariableDeclarations */:
            return isIdentifierOrPattern();
        case 11 /* ArrayBindingElements */:
            return token === SyntaxKind.CommaToken || token === SyntaxKind.DotDotDotToken || isIdentifierOrPattern();
        case 16 /* TypeParameters */:
            return isIdentifier();
        case 12 /* ArgumentExpressions */:
        case 14 /* ArrayLiteralMembers */:
            return token === SyntaxKind.CommaToken || token === SyntaxKind.DotDotDotToken || isStartOfExpression();
        case 15 /* Parameters */:
            return isStartOfParameter();
        case 17 /* TypeArguments */:
        case 18 /* TupleElementTypes */:
            return token === SyntaxKind.CommaToken || isStartOfType();
        case 19 /* HeritageClauses */:
            return isHeritageClause();
        case 20 /* ImportOrExportSpecifiers */:
            return isIdentifierOrKeyword();
    end
    Debug.fail("Non-exhaustive case in 'isListElement'.");
end
function isValidHeritageClauseObjectLiteral()
    Debug.assert(token === SyntaxKind.OpenBraceToken);
    if (nextToken() === SyntaxKind.CloseBraceToken) {
        // if we see  "extends {}" then only treat the {} as what we're extending (and not
        // the class body) if we have:
        //
        //      extends {} { 
        //      extends {},
        //      extends {} extends
        //      extends {} implements
        local next = nextToken();
        return next === SyntaxKind.CommaToken || next === SyntaxKind.OpenBraceToken || next === SyntaxKind.ExtendsKeyword || next === SyntaxKind.ImplementsKeyword;
    end
    return true;
end
function nextTokenIsIdentifier()
    nextToken();
    return isIdentifier();
end
function isHeritageClauseExtendsOrImplementsKeyword()
    if (token === SyntaxKind.ImplementsKeyword ||
        token === SyntaxKind.ExtendsKeyword) {
        return lookAhead(nextTokenIsStartOfExpression);
    end
    return false;
end
function nextTokenIsStartOfExpression()
    nextToken();
    return isStartOfExpression();
end
// True if positioned at a list terminator
function isListTerminator(kind)
    if (token === SyntaxKind.EndOfFileToken) {
        // Being at the end of the file ends all lists.
        return true;
    end
    switch (kind) {
        case 1 /* ModuleElements */:
        case 2 /* BlockStatements */:
        case 3 /* SwitchClauses */:
        case 5 /* TypeMembers */:
        case 6 /* ClassMembers */:
        case 7 /* EnumMembers */:
        case 13 /* ObjectLiteralMembers */:
        case 10 /* ObjectBindingElements */:
        case 20 /* ImportOrExportSpecifiers */:
            return token === SyntaxKind.CloseBraceToken;
        case 4 /* SwitchClauseStatements */:
            return token === SyntaxKind.CloseBraceToken || token === SyntaxKind.CaseKeyword || token === SyntaxKind.DefaultKeyword;
        case 8 /* HeritageClauseElement */:
            return token === SyntaxKind.OpenBraceToken || token === SyntaxKind.ExtendsKeyword || token === SyntaxKind.ImplementsKeyword;
        case 9 /* VariableDeclarations */:
            return isVariableDeclaratorListTerminator();
        case 16 /* TypeParameters */:
            // Tokens other than '>' are here for better error recovery
            return token === SyntaxKind.GreaterThanToken || token === SyntaxKind.OpenParenToken || token === SyntaxKind.OpenBraceToken || token === SyntaxKind.ExtendsKeyword || token === SyntaxKind.ImplementsKeyword;
        case 12 /* ArgumentExpressions */:
            // Tokens other than ')' are here for better error recovery
            return token === SyntaxKind.CloseParenToken || token === SyntaxKind.SemicolonToken;
        case 14 /* ArrayLiteralMembers */:
        case 18 /* TupleElementTypes */:
        case 11 /* ArrayBindingElements */:
            return token === SyntaxKind.CloseBracketToken;
        case 15 /* Parameters */:
            // Tokens other than ')' and ']' (the latter for index signatures) are here for better error recovery
            return token === SyntaxKind.CloseParenToken || token === SyntaxKind.CloseBracketToken /*|| token === SyntaxKind.OpenBraceToken*/;
        case 17 /* TypeArguments */:
            // Tokens other than '>' are here for better error recovery
            return token === SyntaxKind.GreaterThanToken || token === SyntaxKind.OpenParenToken;
        case 19 /* HeritageClauses */:
            return token === SyntaxKind.OpenBraceToken || token === SyntaxKind.CloseBraceToken;
    end
end
function isVariableDeclaratorListTerminator()
    // If we can consume a semicolon (either explicitly, or with ASI), then consider us done
    // with parsing the list of  variable declarators.
    if (canParseSemicolon()) {
        return true;
    end
    // in the case where we're parsing the variable declarator of a 'for-in' statement, we
    // are done if we see an 'in' keyword in front of us. Same with for-of
    if (isInOrOfKeyword(token)) {
        return true;
    end
    // ERROR RECOVERY TWEAK:
    // For better error recovery, if we see an '=>' then we just stop immediately.  We've got an
    // arrow function here and it's going to be very unlikely that we'll resynchronize and get
    // another variable declaration.
    if (token === SyntaxKind.EqualsGreaterThanToken) {
        return true;
    end
    // Keep trying to parse out variable declarators.
    return false;
end
// True if positioned at element or terminator of the current list or any enclosing list
function isInSomeParsingContext()
    for (var kind = 0; kind < 21 /* Count */; kind++) {
        if (parsingContext & (1 << kind)) {
            if (isListElement(kind, true) || isListTerminator(kind)) {
                return true;
            end
        end
    end
    return false;
end
// Parses a list of elements
function parseList(kind, checkForStrictMode, parseElement)
    local saveParsingContext = parsingContext;
    parsingContext |= 1 << kind;
    local result = [];
    result.pos = getNodePos();
    local savedStrictModeContext = inStrictModeContext();
    while (!isListTerminator(kind)) {
        if (isListElement(kind, false)) {
            local element = parseListElement(kind, parseElement);
            result.push(element);
            // test elements only if we are not already in strict mode
            if (checkForStrictMode && !inStrictModeContext()) {
                if (isPrologueDirective(element)) {
                    if (isUseStrictPrologueDirective(sourceFile, element)) {
                        setStrictModeContext(true);
                        checkForStrictMode = false;
                    end
                end
                else {
                    checkForStrictMode = false;
                end
            end
            continue;
        end
        if (abortParsingListOrMoveToNextToken(kind)) {
            break;
        end
    end
    setStrictModeContext(savedStrictModeContext);
    result.;
end
getNodeEnd();
parsingContext = saveParsingContext;
return result;
/// Should be called only on prologue directives (isPrologueDirective(node) should be true)
function isUseStrictPrologueDirective(sourceFile, node)
    Debug.assert(isPrologueDirective(node));
    local nodeText = getSourceTextOfNodeFromSourceFile(sourceFile, node.expression);
    // Note: the node text must be exactly "use strict" or 'use strict'.  It is not ok for the
    // string to contain unicode escapes (as per ES5).
    return nodeText === '"use strict"' || nodeText === "'use strict'";
end
function parseListElement(parsingContext, parseElement)
    local node = currentNode(parsingContext);
    if (node) {
        return consumeNode(node);
    end
    return parseElement();
end
function currentNode(parsingContext)
    // If there is an outstanding parse error that we've encountered, but not attached to
    // some node, then we cannot get a node from the old source tree.  This is because we
    // want to mark the next node we encounter as being unusable.
    //
    // Note: This may be too conservative.  Perhaps we could reuse the node and set the bit
    // on it (or its leftmost child) as having the error.  For now though, being conservative
    // is nice and likely won't ever affect perf.
    if (parseErrorBeforeNextFinishedNode) {
        return undefined;
    end
    if (!syntaxCursor) {
        // if we don't have a cursor, we could never return a node from the old tree.
        return undefined;
    end
    local node = syntaxCursor.currentNode(scanner.getStartPos());
    // Can't reuse a missing node.
    if (nodeIsMissing(node)) {
        return undefined;
    end
    // Can't reuse a node that intersected the change range.
    if (node.intersectsChange) {
        return undefined;
    end
    // Can't reuse a node that contains a parse error.  This is necessary so that we
    // produce the same set of errors again.
    if (containsParseError(node)) {
        return undefined;
    end
    // We can only reuse a node if it was parsed under the same strict mode that we're
    // currently in.  i.e. if we originally parsed a node in non-strict mode, but then
    // the user added 'using strict' at the top of the file, then we can't use that node
    // again as the presense of strict mode may cause us to parse the tokens in the file
    // differetly.
    //
    // Note: we *can* reuse tokens when the strict mode changes.  That's because tokens
    // are unaffected by strict mode.  It's just the parser will decide what to do with it
    // differently depending on what mode it is in.
    //
    // This also applies to all our other context flags as well.
    local nodeContextFlags = node.parserContextFlags & ParserContextFlags.ParserGeneratedFlags;
    if (nodeContextFlags !== contextFlags) {
        return undefined;
    end
    // Ok, we have a node that looks like it could be reused.  Now verify that it is valid
    // in the currest list parsing context that we're currently at.
    if (!canReuseNode(node, parsingContext)) {
        return undefined;
    end
    return node;
end
function consumeNode(node)
    // Move the scanner so it is after the node we just consumed.
    scanner.setTextPos(node.);
end
;
nextToken();
return node;
function canReuseNode(node, parsingContext)
    switch (parsingContext) {
        case 1 /* ModuleElements */:
            return isReusableModuleElement(node);
        case 6 /* ClassMembers */:
            return isReusableClassMember(node);
        case 3 /* SwitchClauses */:
            return isReusableSwitchClause(node);
        case 2 /* BlockStatements */:
        case 4 /* SwitchClauseStatements */:
            return isReusableStatement(node);
        case 7 /* EnumMembers */:
            return isReusableEnumMember(node);
        case 5 /* TypeMembers */:
            return isReusableTypeMember(node);
        case 9 /* VariableDeclarations */:
            return isReusableVariableDeclaration(node);
        case 15 /* Parameters */:
            return isReusableParameter(node);
        // Any other lists we do not care about reusing nodes in.  But feel free to add if
        // you can do so safely.  Danger areas involve nodes that may involve speculative
        // parsing.  If speculative parsing is involved with the node, then the range the
        // parser reached while looking ahead might be in the edited range (see the example
        // in canReuseVariableDeclaratorNode for a good case of this).
        case 19 /* HeritageClauses */:
        // This would probably be safe to reuse.  There is no speculative parsing with
        // heritage clauses.
        case 16 /* TypeParameters */:
        // This would probably be safe to reuse.  There is no speculative parsing with
        // type parameters.  Note that that's because type *parameters* only occur in
        // unambiguous *type* contexts.  While type *arguments* occur in very ambiguous
        // *expression* contexts.
        case 18 /* TupleElementTypes */:
        // This would probably be safe to reuse.  There is no speculative parsing with
        // tuple types.
        // Technically, type argument list types are probably safe to reuse.  While
        // speculative parsing is involved with them (since type argument lists are only
        // produced from speculative parsing a < as a type argument list), we only have
        // the types because speculative parsing succeeded.  Thus, the lookahead never
        // went past the end of the list and rewound.
        case 17 /* TypeArguments */:
        // Note: these are almost certainly not safe to ever reuse.  Expressions commonly
        // need a large amount of lookahead, and we should not reuse them as they may
        // have actually intersected the edit.
        case 12 /* ArgumentExpressions */:
        // This is not safe to reuse for the same reason as the 'AssignmentExpression'
        // cases.  i.e. a property assignment may end with an expression, and thus might
        // have lookahead far beyond it's old node.
        case 13 /* ObjectLiteralMembers */:
        // This is probably not safe to reuse.  There can be speculative parsing with
        // type names in a heritage clause.  There can be generic names in the type
        // name list, and there can be left hand side expressions (which can have type
        // arguments.)
        case 8 /* HeritageClauseElement */:
    end
    return false;
end
function isReusableModuleElement(node)
    if (node) {
        switch (node.kind) {
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.ExportDeclaration:
            case SyntaxKind.ExportAssignment:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.EnumDeclaration:
                return true;
        end
        return isReusableStatement(node);
    end
    return false;
end
function isReusableClassMember(node)
    if (node) {
        switch (node.kind) {
            case SyntaxKind.Constructor:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.SemicolonClassElement:
                return true;
        end
    end
    return false;
end
function isReusableSwitchClause(node)
    if (node) {
        switch (node.kind) {
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
                return true;
        end
    end
    return false;
end
function isReusableStatement(node)
    if (node) {
        switch (node.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.VariableStatement:
            case SyntaxKind.Block:
            case SyntaxKind.IfStatement:
            case SyntaxKind.ExpressionStatement:
            case SyntaxKind.ThrowStatement:
            case SyntaxKind.ReturnStatement:
            case SyntaxKind.SwitchStatement:
            case SyntaxKind.BreakStatement:
            case SyntaxKind.ContinueStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.ForStatement:
            case SyntaxKind.WhileStatement:
            case SyntaxKind.WithStatement:
            case SyntaxKind.EmptyStatement:
            case SyntaxKind.TryStatement:
            case SyntaxKind.LabeledStatement:
            case SyntaxKind.DoStatement:
            case SyntaxKind.DebuggerStatement:
                return true;
        end
    end
    return false;
end
function isReusableEnumMember(node)
    return node.kind === SyntaxKind.EnumMember;
end
function isReusableTypeMember(node)
    if (node) {
        switch (node.kind) {
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.CallSignature:
                return true;
        end
    end
    return false;
end
function isReusableVariableDeclaration(node)
    if (node.kind !== SyntaxKind.VariableDeclaration) {
        return false;
    end
    // Very subtle incremental parsing bug.  Consider the following code:
    //
    //      let v = new List < A, B
    //
    // This is actually legal code.  It's a list of variable declarators "v = new List<A"
    // on one side and "B" on the other. If you then change that to:
    //
    //      let v = new List < A, B >()
    //
    // then we have a problem.  "v = new List<A" doesn't intersect the change range, so we
    // start reparsing at "B" and we completely fail to handle this properly.
    //
    // In order to prevent this, we do not allow a variable declarator to be reused if it
    // has an initializer.
    local variableDeclarator = node;
    return variableDeclarator.initializer === undefined;
end
function isReusableParameter(node)
    if (node.kind !== SyntaxKind.Parameter) {
        return false;
    end
    // See the comment in isReusableVariableDeclaration for why we do this.
    local parameter = node;
    return parameter.initializer === undefined;
end
// Returns true if we should abort parsing.
function abortParsingListOrMoveToNextToken(kind)
    parseErrorAtCurrentToken(parsingContextErrors(kind));
    if (isInSomeParsingContext()) {
        return true;
    end
    nextToken();
    return false;
end
function parsingContextErrors(context)
    switch (context) {
        case 0 /* SourceElements */: return Diagnostics.Declaration_or_statement_expected;
        case 1 /* ModuleElements */: return Diagnostics.Declaration_or_statement_expected;
        case 2 /* BlockStatements */: return Diagnostics.Statement_expected;
        case 3 /* SwitchClauses */: return Diagnostics.case_or_default_expected;
        case 4 /* SwitchClauseStatements */: return Diagnostics.Statement_expected;
        case 5 /* TypeMembers */: return Diagnostics.Property_or_signature_expected;
        case 6 /* ClassMembers */: return Diagnostics.Unexpected_token_A_constructor_method_accessor_or_property_was_expected;
        case 7 /* EnumMembers */: return Diagnostics.Enum_member_expected;
        case 8 /* HeritageClauseElement */: return Diagnostics.Expression_expected;
        case 9 /* VariableDeclarations */: return Diagnostics.Variable_declaration_expected;
        case 10 /* ObjectBindingElements */: return Diagnostics.Property_destructuring_pattern_expected;
        case 11 /* ArrayBindingElements */: return Diagnostics.Array_element_destructuring_pattern_expected;
        case 12 /* ArgumentExpressions */: return Diagnostics.Argument_expression_expected;
        case 13 /* ObjectLiteralMembers */: return Diagnostics.Property_assignment_expected;
        case 14 /* ArrayLiteralMembers */: return Diagnostics.Expression_or_comma_expected;
        case 15 /* Parameters */: return Diagnostics.Parameter_declaration_expected;
        case 16 /* TypeParameters */: return Diagnostics.Type_parameter_declaration_expected;
        case 17 /* TypeArguments */: return Diagnostics.Type_argument_expected;
        case 18 /* TupleElementTypes */: return Diagnostics.Type_expected;
        case 19 /* HeritageClauses */: return Diagnostics.Unexpected_token_expected;
        case 20 /* ImportOrExportSpecifiers */: return Diagnostics.Identifier_expected;
    end
end
;
// Parses a comma-delimited list of elements
function parseDelimitedList(kind, parseElement, considerSemicolonAsDelimeter)
    local saveParsingContext = parsingContext;
    parsingContext |= 1 << kind;
    local result = [];
    result.pos = getNodePos();
    local commaStart = -1; // Meaning the previous token was not a comma
    while (true) {
        if (isListElement(kind, false)) {
            result.push(parseListElement(kind, parseElement));
            commaStart = scanner.getTokenPos();
            if (parseOptional(SyntaxKind.CommaToken)) {
                continue;
            end
            commaStart = -1; // Back to the state where the last token was not a comma
            if (isListTerminator(kind)) {
                break;
            end
            // We didn't get a comma, and the list wasn't terminated, explicitly parse
            // out a comma so we give a good error message.
            parseExpected(SyntaxKind.CommaToken);
            // If the token was a semicolon, and the caller allows that, then skip it and
            // continue.  This ensures we get back on track and don't result in tons of
            // parse errors.  For example, this can happen when people do things like use
            // a semicolon to delimit object literal members.   Note: we'll have already
            // reported an error when we called parseExpected above.
            if (considerSemicolonAsDelimeter && token === SyntaxKind.SemicolonToken && !scanner.hasPrecedingLineBreak()) {
                nextToken();
            end
            continue;
        end
        if (isListTerminator(kind)) {
            break;
        end
        if (abortParsingListOrMoveToNextToken(kind)) {
            break;
        end
    end
    // Recording the trailing comma is deliberately done after the previous
    // loop, and not just if we see a list terminator. This is because the list
    // may have ended incorrectly, but it is still important to know if there
    // was a trailing comma.
    // Check if the last token was a comma.
    if (commaStart >= 0) {
        // Always preserve a trailing comma by marking it on the NodeArray
        result.hasTrailingComma = true;
    end
    result.;
end
getNodeEnd();
parsingContext = saveParsingContext;
return result;
function createMissingList()
    local pos = getNodePos();
    local result = [];
    result.pos = pos;
    result.;
end
pos;
return result;
function parseBracketedList(kind, parseElement, open, close)
    if (parseExpected(open)) {
        local result = parseDelimitedList(kind, parseElement);
        parseExpected(close);
        return result;
    end
    return createMissingList();
end
// The allowReservedWords parameter controls whether reserved words are permitted after the first dot
function parseEntityName(allowReservedWords, diagnosticMessage)
    local entity = parseIdentifier(diagnosticMessage);
    while (parseOptional(SyntaxKind.DotToken)) {
        local node = createNode(SyntaxKind.QualifiedName, entity.pos);
        node.left = entity;
        node.right = parseRightSideOfDot(allowReservedWords);
        entity = finishNode(node);
    end
    return entity;
end
function parseRightSideOfDot(allowIdentifierNames)
    // Technically a keyword is valid here as all keywords are identifier names.
    // However, often we'll encounter this in error situations when the keyword
    // is actually starting another valid construct.
    //
    // So, we check for the following specific case:
    //
    //      name.
    //      keyword identifierNameOrKeyword
    //
    // Note: the newlines are important here.  For example, if that above code
    // were rewritten into:
    //
    //      name.keyword
    //      identifierNameOrKeyword
    //
    // Then we would consider it valid.  That's because ASI would take effect and
    // the code would be implicitly: "name.keyword; identifierNameOrKeyword".
    // In the first case though, ASI will not take effect because there is not a
    // line terminator after the keyword.
    if (scanner.hasPrecedingLineBreak() && scanner.isReservedWord()) {
        local matchesPattern = lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine);
        if (matchesPattern) {
            // Report that we need an identifier.  However, report it right after the dot,
            // and not on the next token.  This is because the next token might actually
            // be an identifier and the error woudl be quite confusing.
            return createMissingNode(SyntaxKind.Identifier, true, Diagnostics.Identifier_expected);
        end
    end
    return allowIdentifierNames ? parseIdentifierName() : parseIdentifier();
end
function parseTemplateExpression()
    local template = createNode(SyntaxKind.TemplateExpression);
    template.head = parseLiteralNode();
    Debug.assert(template.head.kind === SyntaxKind.TemplateHead, "Template head has wrong token kind");
    local templateSpans = [];
    templateSpans.pos = getNodePos();
    do {
        templateSpans.push(parseTemplateSpan());
    end while (lastOrUndefined(templateSpans).literal.kind === SyntaxKind.TemplateMiddle);
    templateSpans.;
end
getNodeEnd();
template.templateSpans = templateSpans;
return finishNode(template);
function parseTemplateSpan()
    local span = createNode(SyntaxKind.TemplateSpan);
    span.expression = allowInAnd(parseExpression);
    local literal;
    if (token === SyntaxKind.CloseBraceToken) {
        reScanTemplateToken();
        literal = parseLiteralNode();
    end
    else {
        literal = parseExpectedToken(SyntaxKind.TemplateTail, false, Diagnostics._0_expected, tokenToString(SyntaxKind.CloseBraceToken));
    end
    span.literal = literal;
    return finishNode(span);
end
function parseLiteralNode(internName)
    local node = createNode(token);
    local text = scanner.getTokenValue();
    node.text = internName ? internIdentifier(text) : text;
    if (scanner.hasExtendedUnicodeEscape()) {
        node.hasExtendedUnicodeEscape = true;
    end
    if (scanner.isUnterminated()) {
        node.isUnterminated = true;
    end
    local tokenPos = scanner.getTokenPos();
    nextToken();
    finishNode(node);
    // Octal literals are not allowed in strict mode or ES5
    // Note that theoretically the following condition would hold true literals like 009,
    // which is not octal.But because of how the scanner separates the tokens, we would
    // never get a token like this. Instead, we would get 00 and 9 as two separate tokens.
    // We also do not need to check for negatives because any prefix operator would be part of a
    // parent unary expression.
    if (node.kind === SyntaxKind.NumericLiteral
        && sourceText.charCodeAt(tokenPos) === CharacterCodes._0
        && isOctalDigit(sourceText.charCodeAt(tokenPos + 1))) {
        node.flags |= NodeFlags.OctalLiteral;
    end
    return node;
end
// TYPES
function parseTypeReference()
    local node = createNode(SyntaxKind.TypeReference);
    node.typeName = parseEntityName(false, Diagnostics.Type_expected);
    if (!scanner.hasPrecedingLineBreak() && token === SyntaxKind.LessThanToken) {
        node.typeArguments = parseBracketedList(17 /* TypeArguments */, parseType, SyntaxKind.LessThanToken, SyntaxKind.GreaterThanToken);
    end
    return finishNode(node);
end
function parseTypeQuery()
    local node = createNode(SyntaxKind.TypeQuery);
    parseExpected(SyntaxKind.TypeOfKeyword);
    node.exprName = parseEntityName(true);
    return finishNode(node);
end
function parseTypeParameter()
    local node = createNode(SyntaxKind.TypeParameter);
    node.name = parseIdentifier();
    if (parseOptional(SyntaxKind.ExtendsKeyword)) {
        // It's not uncommon for people to write improper constraints to a generic.  If the
        // user writes a constraint that is an expression and not an actual type, then parse
        // it out as an expression (so we can recover well), but report that a type is needed
        // instead.
        if (isStartOfType() || !isStartOfExpression()) {
            node.constraint = parseType();
        end
        else {
            // It was not a type, and it looked like an expression.  Parse out an expression
            // here so we recover well.  Note: it is important that we call parseUnaryExpression
            // and not parseExpression here.  If the user has:
            //
            //      <T extends "">
            //
            // We do *not* want to consume the  >  as we're consuming the expression for "".
            node.expression = parseUnaryExpressionOrHigher();
        end
    end
    return finishNode(node);
end
function parseTypeParameters()
    if (token === SyntaxKind.LessThanToken) {
        return parseBracketedList(16 /* TypeParameters */, parseTypeParameter, SyntaxKind.LessThanToken, SyntaxKind.GreaterThanToken);
    end
end
function parseParameterType()
    if (parseOptional(SyntaxKind.ColonToken)) {
        return token === SyntaxKind.StringLiteral
            ? parseLiteralNode(true)
            : parseType();
    end
    return undefined;
end
function isStartOfParameter()
    return token === SyntaxKind.DotDotDotToken || isIdentifierOrPattern() || isModifier(token) || token === SyntaxKind.AtToken;
end
function setModifiers(node, modifiers)
    if (modifiers) {
        node.flags |= modifiers.flags;
        node.modifiers = modifiers;
    end
end
function parseParameter()
    local node = createNode(SyntaxKind.Parameter);
    node.decorators = parseDecorators();
    setModifiers(node, parseModifiers());
    node.dotDotDotToken = parseOptionalToken(SyntaxKind.DotDotDotToken);
    // SingleNameBinding[Yield,GeneratorParameter] : See 13.2.3
    //      [+GeneratorParameter]BindingIdentifier[Yield]Initializer[In]opt
    //      [~GeneratorParameter]BindingIdentifier[?Yield]Initializer[In, ?Yield]opt
    node.name = inGeneratorParameterContext() ? doInYieldContext(parseIdentifierOrPattern) : parseIdentifierOrPattern();
    if (getFullWidth(node.name) === 0 && node.flags === 0 && isModifier(token)) {
        // in cases like
        // 'use strict'
        // function foo(static)
        // isParameter('static') === true, because of isModifier('static')
        // however 'static' is not a legal identifier in a strict mode.
        // so result of this function will be ParameterDeclaration (flags = 0, name = missing, type = undefined, initializer = undefined)
        // and current token will not change => parsing of the enclosing parameter list will last till the end of time (or OOM)
        // to avoid this we'll advance cursor to the next token.
        nextToken();
    end
    node.questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
    node.type = parseParameterType();
    node.initializer = inGeneratorParameterContext() ? doOutsideOfYieldContext(parseParameterInitializer) : parseParameterInitializer();
    // Do not check for initializers in an ambient context for parameters. This is not
    // a grammar error because the grammar allows arbitrary call signatures in
    // an ambient context.
    // It is actually not necessary for this to be an error at all. The reason is that
    // function/constructor implementations are syntactically disallowed in ambient
    // contexts. In addition, parameter initializers are semantically disallowed in
    // overload signatures. So parameter initializers are transitively disallowed in
    // ambient contexts.
    return finishNode(node);
end
function parseParameterInitializer()
    return parseInitializer(true);
end
function fillSignature(returnToken, yieldAndGeneratorParameterContext, requireCompleteParameterList, signature)
    local returnTokenRequired = returnToken === SyntaxKind.EqualsGreaterThanToken;
    signature.typeParameters = parseTypeParameters();
    signature.parameters = parseParameterList(yieldAndGeneratorParameterContext, requireCompleteParameterList);
    if (returnTokenRequired) {
        parseExpected(returnToken);
        signature.type = parseType();
    end
    else if (parseOptional(returnToken)) {
        signature.type = parseType();
    end
end
// Note: after careful analysis of the grammar, it does not appear to be possible to
// have 'Yield' And 'GeneratorParameter' not in sync.  i.e. any production calling
// this FormalParameters production either always sets both to true, or always sets
// both to false.  As such we only have a single parameter to represent both.
function parseParameterList(yieldAndGeneratorParameterContext, requireCompleteParameterList)
    // FormalParameters[Yield,GeneratorParameter] :
    //      ...
    //
    // FormalParameter[Yield,GeneratorParameter] :
    //      BindingElement[?Yield, ?GeneratorParameter]
    //
    // BindingElement[Yield, GeneratorParameter ] : See 13.2.3
    //      SingleNameBinding[?Yield, ?GeneratorParameter]
    //      [+GeneratorParameter]BindingPattern[?Yield, GeneratorParameter]Initializer[In]opt
    //      [~GeneratorParameter]BindingPattern[?Yield]Initializer[In, ?Yield]opt
    //
    // SingleNameBinding[Yield, GeneratorParameter] : See 13.2.3
    //      [+GeneratorParameter]BindingIdentifier[Yield]Initializer[In]opt
    //      [~GeneratorParameter]BindingIdentifier[?Yield]Initializer[In, ?Yield]opt
    if (parseExpected(SyntaxKind.OpenParenToken)) {
        local savedYieldContext = inYieldContext();
        local savedGeneratorParameterContext = inGeneratorParameterContext();
        setYieldContext(yieldAndGeneratorParameterContext);
        setGeneratorParameterContext(yieldAndGeneratorParameterContext);
        local result = parseDelimitedList(15 /* Parameters */, parseParameter);
        setYieldContext(savedYieldContext);
        setGeneratorParameterContext(savedGeneratorParameterContext);
        if (!parseExpected(SyntaxKind.CloseParenToken) && requireCompleteParameterList) {
            // Caller insisted that we had to end with a )   We didn't.  So just return
            // undefined here.
            return undefined;
        end
        return result;
    end
    // We didn't even have an open paren.  If the caller requires a complete parameter list,
    // we definitely can't provide that.  However, if they're ok with an incomplete one,
    // then just return an empty set of parameters.
    return requireCompleteParameterList ? undefined : createMissingList();
end
function parseTypeMemberSemicolon()
    // We allow type members to be separated by commas or (possibly ASI) semicolons.
    // First check if it was a comma.  If so, we're done with the member.
    if (parseOptional(SyntaxKind.CommaToken)) {
        return;
    end
    // Didn't have a comma.  We must have a (possible ASI) semicolon.
    parseSemicolon();
end
function parseSignatureMember(kind)
    local node = createNode(kind);
    if (kind === SyntaxKind.ConstructSignature) {
        parseExpected(SyntaxKind.NewKeyword);
    end
    fillSignature(SyntaxKind.ColonToken, false, false, node);
    parseTypeMemberSemicolon();
    return finishNode(node);
end
function isIndexSignature()
    if (token !== SyntaxKind.OpenBracketToken) {
        return false;
    end
    return lookAhead(isUnambiguouslyIndexSignature);
end
function isUnambiguouslyIndexSignature()
    // The only allowed sequence is:
    //
    //   [id:
    //
    // However, for error recovery, we also check the following cases:
    //
    //   [...
    //   [id,
    //   [id?,
    //   [id?:
    //   [id?]
    //   [public id
    //   [private id
    //   [protected id
    //   []
    //
    nextToken();
    if (token === SyntaxKind.DotDotDotToken || token === SyntaxKind.CloseBracketToken) {
        return true;
    end
    if (isModifier(token)) {
        nextToken();
        if (isIdentifier()) {
            return true;
        end
    end
    else if (!isIdentifier()) {
        return false;
    end
    else {
        // Skip the identifier
        nextToken();
    end
    // A colon signifies a well formed indexer
    // A comma should be a badly formed indexer because comma expressions are not allowed
    // in computed properties.
    if (token === SyntaxKind.ColonToken || token === SyntaxKind.CommaToken) {
        return true;
    end
    // Question mark could be an indexer with an optional property,
    // or it could be a conditional expression in a computed property.
    if (token !== SyntaxKind.QuestionToken) {
        return false;
    end
    // If any of the following tokens are after the question mark, it cannot
    // be a conditional expression, so treat it as an indexer.
    nextToken();
    return token === SyntaxKind.ColonToken || token === SyntaxKind.CommaToken || token === SyntaxKind.CloseBracketToken;
end
function parseIndexSignatureDeclaration(fullStart, decorators, modifiers)
    local node = createNode(SyntaxKind.IndexSignature, fullStart);
    node.decorators = decorators;
    setModifiers(node, modifiers);
    node.parameters = parseBracketedList(15 /* Parameters */, parseParameter, SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken);
    node.type = parseTypeAnnotation();
    parseTypeMemberSemicolon();
    return finishNode(node);
end
function parsePropertyOrMethodSignature()
    local fullStart = scanner.getStartPos();
    local name = parsePropertyName();
    local questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
    if (token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
        local method = createNode(SyntaxKind.MethodSignature, fullStart);
        method.name = name;
        method.questionToken = questionToken;
        // Method signatues don't exist in expression contexts.  So they have neither
        // [Yield] nor [GeneratorParameter]
        fillSignature(SyntaxKind.ColonToken, false, false, method);
        parseTypeMemberSemicolon();
        return finishNode(method);
    end
    else {
        local property_1 = createNode(SyntaxKind.PropertySignature, fullStart);
        property_1.name = name;
        property_1.questionToken = questionToken;
        property_1.type = parseTypeAnnotation();
        parseTypeMemberSemicolon();
        return finishNode(property_1);
    end
end
function isStartOfTypeMember()
    switch (token) {
        case SyntaxKind.OpenParenToken:
        case SyntaxKind.LessThanToken:
        case SyntaxKind.OpenBracketToken:
            return true;
        default:
            if (isModifier(token)) {
                local result = lookAhead(isStartOfIndexSignatureDeclaration);
                if (result) {
                    return result;
                end
            end
            return isLiteralPropertyName() && lookAhead(isTypeMemberWithLiteralPropertyName);
    end
end
function isStartOfIndexSignatureDeclaration()
    while (isModifier(token)) {
        nextToken();
    end
    return isIndexSignature();
end
function isTypeMemberWithLiteralPropertyName()
    nextToken();
    return token === SyntaxKind.OpenParenToken ||
        token === SyntaxKind.LessThanToken ||
        token === SyntaxKind.QuestionToken ||
        token === SyntaxKind.ColonToken ||
        canParseSemicolon();
end
function parseTypeMember()
    switch (token) {
        case SyntaxKind.OpenParenToken:
        case SyntaxKind.LessThanToken:
            return parseSignatureMember(SyntaxKind.CallSignature);
        case SyntaxKind.OpenBracketToken:
            // Indexer or computed property
            return isIndexSignature()
                ? parseIndexSignatureDeclaration(scanner.getStartPos(), undefined, undefined)
                : parsePropertyOrMethodSignature();
        case SyntaxKind.NewKeyword:
            if (lookAhead(isStartOfConstructSignature)) {
                return parseSignatureMember(SyntaxKind.ConstructSignature);
            end
        // fall through.
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NumericLiteral:
            return parsePropertyOrMethodSignature();
        default:
            // Index declaration as allowed as a type member.  But as per the grammar,
            // they also allow modifiers. So we have to check for an index declaration
            // that might be following modifiers. This ensures that things work properly
            // when incrementally parsing as the parser will produce the Index declaration
            // if it has the same text regardless of whether it is inside a class or an
            // object type.
            if (isModifier(token)) {
                local result = tryParse(parseIndexSignatureWithModifiers);
                if (result) {
                    return result;
                end
            end
            if (isIdentifierOrKeyword()) {
                return parsePropertyOrMethodSignature();
            end
    end
end
function parseIndexSignatureWithModifiers()
    local fullStart = scanner.getStartPos();
    local decorators = parseDecorators();
    local modifiers = parseModifiers();
    return isIndexSignature()
        ? parseIndexSignatureDeclaration(fullStart, decorators, modifiers)
        : undefined;
end
function isStartOfConstructSignature()
    nextToken();
    return token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken;
end
function parseTypeLiteral()
    local node = createNode(SyntaxKind.TypeLiteral);
    node.members = parseObjectTypeMembers();
    return finishNode(node);
end
function parseObjectTypeMembers()
    local members;
    if (parseExpected(SyntaxKind.OpenBraceToken)) {
        members = parseList(5 /* TypeMembers */, false, parseTypeMember);
        parseExpected(SyntaxKind.CloseBraceToken);
    end
    else {
        members = createMissingList();
    end
    return members;
end
function parseTupleType()
    local node = createNode(SyntaxKind.TupleType);
    node.elementTypes = parseBracketedList(18 /* TupleElementTypes */, parseType, SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken);
    return finishNode(node);
end
function parseParenthesizedType()
    local node = createNode(SyntaxKind.ParenthesizedType);
    parseExpected(SyntaxKind.OpenParenToken);
    node.type = parseType();
    parseExpected(SyntaxKind.CloseParenToken);
    return finishNode(node);
end
function parseFunctionOrConstructorType(kind)
    local node = createNode(kind);
    if (kind === SyntaxKind.ConstructorType) {
        parseExpected(SyntaxKind.NewKeyword);
    end
    fillSignature(SyntaxKind.EqualsGreaterThanToken, false, false, node);
    return finishNode(node);
end
function parseKeywordAndNoDot()
    local node = parseTokenNode();
    return token === SyntaxKind.DotToken ? undefined : node;
end
function parseNonArrayType()
    switch (token) {
        case SyntaxKind.AnyKeyword:
        case SyntaxKind.StringKeyword:
        case SyntaxKind.NumberKeyword:
        case SyntaxKind.BooleanKeyword:
        case SyntaxKind.SymbolKeyword:
            // If these are followed by a dot, then parse these out as a dotted type reference instead.
            local node = tryParse(parseKeywordAndNoDot);
            return node || parseTypeReference();
        case SyntaxKind.VoidKeyword:
            return parseTokenNode();
        case SyntaxKind.TypeOfKeyword:
            return parseTypeQuery();
        case SyntaxKind.OpenBraceToken:
            return parseTypeLiteral();
        case SyntaxKind.OpenBracketToken:
            return parseTupleType();
        case SyntaxKind.OpenParenToken:
            return parseParenthesizedType();
        default:
            return parseTypeReference();
    end
end
function isStartOfType()
    switch (token) {
        case SyntaxKind.AnyKeyword:
        case SyntaxKind.StringKeyword:
        case SyntaxKind.NumberKeyword:
        case SyntaxKind.BooleanKeyword:
        case SyntaxKind.SymbolKeyword:
        case SyntaxKind.VoidKeyword:
        case SyntaxKind.TypeOfKeyword:
        case SyntaxKind.OpenBraceToken:
        case SyntaxKind.OpenBracketToken:
        case SyntaxKind.LessThanToken:
        case SyntaxKind.NewKeyword:
            return true;
        case SyntaxKind.OpenParenToken:
            // Only consider '(' the start of a type if followed by ')', '...', an identifier, a modifier,
            // or something that starts a type. We don't want to consider things like '(1)' a type.
            return lookAhead(isStartOfParenthesizedOrFunctionType);
        default:
            return isIdentifier();
    end
end
function isStartOfParenthesizedOrFunctionType()
    nextToken();
    return token === SyntaxKind.CloseParenToken || isStartOfParameter() || isStartOfType();
end
function parseArrayTypeOrHigher()
    local type = parseNonArrayType();
    while (!scanner.hasPrecedingLineBreak() && parseOptional(SyntaxKind.OpenBracketToken)) {
        parseExpected(SyntaxKind.CloseBracketToken);
        local node = createNode(SyntaxKind.ArrayType, type.pos);
        node.elementType = type;
        type = finishNode(node);
    end
    return type;
end
function parseUnionTypeOrHigher()
    local type = parseArrayTypeOrHigher();
    if (token === SyntaxKind.BarToken) {
        local types = [type];
        types.pos = type.pos;
        while (parseOptional(SyntaxKind.BarToken)) {
            types.push(parseArrayTypeOrHigher());
        end
        types.;
    end
    getNodeEnd();
    local node = createNode(SyntaxKind.UnionType, type.pos);
    node.types = types;
    type = finishNode(node);
end
return type;
function isStartOfFunctionType()
    if (token === SyntaxKind.LessThanToken) {
        return true;
    end
    return token === SyntaxKind.OpenParenToken && lookAhead(isUnambiguouslyStartOfFunctionType);
end
function isUnambiguouslyStartOfFunctionType()
    nextToken();
    if (token === SyntaxKind.CloseParenToken || token === SyntaxKind.DotDotDotToken) {
        // ( )
        // ( ...
        return true;
    end
    if (isIdentifier() || isModifier(token)) {
        nextToken();
        if (token === SyntaxKind.ColonToken || token === SyntaxKind.CommaToken ||
            token === SyntaxKind.QuestionToken || token === SyntaxKind.EqualsToken ||
            isIdentifier() || isModifier(token)) {
            // ( id :
            // ( id ,
            // ( id ?
            // ( id =
            // ( modifier id
            return true;
        end
        if (token === SyntaxKind.CloseParenToken) {
            nextToken();
            if (token === SyntaxKind.EqualsGreaterThanToken) {
                // ( id ) =>
                return true;
            end
        end
    end
    return false;
end
function parseType()
    // The rules about 'yield' only apply to actual code/expression contexts.  They don't
    // apply to 'type' contexts.  So we disable these parameters here before moving on.
    local savedYieldContext = inYieldContext();
    local savedGeneratorParameterContext = inGeneratorParameterContext();
    setYieldContext(false);
    setGeneratorParameterContext(false);
    local result = parseTypeWorker();
    setYieldContext(savedYieldContext);
    setGeneratorParameterContext(savedGeneratorParameterContext);
    return result;
end
function parseTypeWorker()
    if (isStartOfFunctionType()) {
        return parseFunctionOrConstructorType(SyntaxKind.FunctionType);
    end
    if (token === SyntaxKind.NewKeyword) {
        return parseFunctionOrConstructorType(SyntaxKind.ConstructorType);
    end
    return parseUnionTypeOrHigher();
end
function parseTypeAnnotation()
    return parseOptional(SyntaxKind.ColonToken) ? parseType() : undefined;
end
// EXPRESSIONS
function isStartOfLeftHandSideExpression()
    switch (token) {
        case SyntaxKind.ThisKeyword:
        case SyntaxKind.SuperKeyword:
        case SyntaxKind.NullKeyword:
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.FalseKeyword:
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.TemplateHead:
        case SyntaxKind.OpenParenToken:
        case SyntaxKind.OpenBracketToken:
        case SyntaxKind.OpenBraceToken:
        case SyntaxKind.FunctionKeyword:
        case SyntaxKind.ClassKeyword:
        case SyntaxKind.NewKeyword:
        case SyntaxKind.SlashToken:
        case SyntaxKind.SlashEqualsToken:
        case SyntaxKind.Identifier:
            return true;
        default:
            return isIdentifier();
    end
end
function isStartOfExpression()
    if (isStartOfLeftHandSideExpression()) {
        return true;
    end
    switch (token) {
        case SyntaxKind.PlusToken:
        case SyntaxKind.MinusToken:
        case SyntaxKind.TildeToken:
        case SyntaxKind.ExclamationToken:
        case SyntaxKind.DeleteKeyword:
        case SyntaxKind.TypeOfKeyword:
        case SyntaxKind.VoidKeyword:
        case SyntaxKind.PlusPlusToken:
        case SyntaxKind.MinusMinusToken:
        case SyntaxKind.LessThanToken:
        case SyntaxKind.YieldKeyword:
            // Yield always starts an expression.  Either it is an identifier (in which case
            // it is definitely an expression).  Or it's a keyword (either because we're in
            // a generator, or in strict mode (or both)) and it started a yield expression.
            return true;
        default:
            // Error tolerance.  If we see the start of some binary operator, we consider
            // that the start of an expression.  That way we'll parse out a missing identifier,
            // give a good message about an identifier being missing, and then consume the
            // rest of the binary expression.
            if (isBinaryOperator()) {
                return true;
            end
            return isIdentifier();
    end
end
function isStartOfExpressionStatement()
    // As per the grammar, none of '{' or 'function' or 'class' can start an expression statement.
    return token !== SyntaxKind.OpenBraceToken &&
        token !== SyntaxKind.FunctionKeyword &&
        token !== SyntaxKind.ClassKeyword &&
        token !== SyntaxKind.AtToken &&
        isStartOfExpression();
end
function parseExpression()
    // Expression[in]:
    //      AssignmentExpression[in]
    //      Expression[in] , AssignmentExpression[in]
    // clear the decorator context when parsing Expression, as it should be unambiguous when parsing a decorator
    local saveDecoratorContext = inDecoratorContext();
    if (saveDecoratorContext) {
        setDecoratorContext(false);
    end
    local expr = parseAssignmentExpressionOrHigher();
    local operatorToken;
    while ((operatorToken = parseOptionalToken(SyntaxKind.CommaToken))) {
        expr = makeBinaryExpression(expr, operatorToken, parseAssignmentExpressionOrHigher());
    end
    if (saveDecoratorContext) {
        setDecoratorContext(true);
    end
    return expr;
end
function parseInitializer(inParameter)
    if (token !== SyntaxKind.EqualsToken) {
        // It's not uncommon during typing for the user to miss writing the '=' token.  Check if
        // there is no newline after the last token and if we're on an expression.  If so, parse
        // this as an equals-value clause with a missing equals.
        // NOTE: There are two places where we allow equals-value clauses.  The first is in a
        // variable declarator.  The second is with a parameter.  For variable declarators
        // it's more likely that a { would be a allowed (as an object literal).  While this
        // is also allowed for parameters, the risk is that we consume the { as an object
        // literal when it really will be for the block following the parameter.
        if (scanner.hasPrecedingLineBreak() || (inParameter && token === SyntaxKind.OpenBraceToken) || !isStartOfExpression()) {
            // preceding line break, open brace in a parameter (likely a function body) or current token is not an expression -
            // do not try to parse initializer
            return undefined;
        end
    end
    // Initializer[In, Yield] :
    //     = AssignmentExpression[?In, ?Yield]
    parseExpected(SyntaxKind.EqualsToken);
    return parseAssignmentExpressionOrHigher();
end
function parseAssignmentExpressionOrHigher()
    //  AssignmentExpression[in,yield]:
    //      1) ConditionalExpression[?in,?yield]
    //      2) LeftHandSideExpression = AssignmentExpression[?in,?yield]
    //      3) LeftHandSideExpression AssignmentOperator AssignmentExpression[?in,?yield]
    //      4) ArrowFunctionExpression[?in,?yield]
    //      5) [+Yield] YieldExpression[?In]
    //
    // Note: for ease of implementation we treat productions '2' and '3' as the same thing.
    // (i.e. they're both BinaryExpressions with an assignment operator in it).
    // First, do the simple check if we have a YieldExpression (production '5').
    if (isYieldExpression()) {
        return parseYieldExpression();
    end
    // Then, check if we have an arrow function (production '4') that starts with a parenthesized
    // parameter list. If we do, we must *not* recurse for productions 1, 2 or 3. An ArrowFunction is
    // not a  LeftHandSideExpression, nor does it start a ConditionalExpression.  So we are done
    // with AssignmentExpression if we see one.
    local arrowExpression = tryParseParenthesizedArrowFunctionExpression();
    if (arrowExpression) {
        return arrowExpression;
    end
    // Now try to see if we're in production '1', '2' or '3'.  A conditional expression can
    // start with a LogicalOrExpression, while the assignment productions can only start with
    // LeftHandSideExpressions.
    //
    // So, first, we try to just parse out a BinaryExpression.  If we get something that is a
    // LeftHandSide or higher, then we can try to parse out the assignment expression part.
    // Otherwise, we try to parse out the conditional expression bit.  We want to allow any
    // binary expression here, so we pass in the 'lowest' precedence here so that it matches
    // and consumes anything.
    local expr = parseBinaryExpressionOrHigher(0);
    // To avoid a look-ahead, we did not handle the case of an arrow function with a single un-parenthesized
    // parameter ('x => ...') above. We handle it here by checking if the parsed expression was a single
    // identifier and the current token is an arrow.
    if (expr.kind === SyntaxKind.Identifier && token === SyntaxKind.EqualsGreaterThanToken) {
        return parseSimpleArrowFunctionExpression(expr);
    end
    // Now see if we might be in cases '2' or '3'.
    // If the expression was a LHS expression, and we have an assignment operator, then
    // we're in '2' or '3'. Consume the assignment and return.
    //
    // Note: we call reScanGreaterToken so that we get an appropriately merged token
    // for cases like > > =  becoming >>=
    if (isLeftHandSideExpression(expr) && isAssignmentOperator(reScanGreaterToken())) {
        return makeBinaryExpression(expr, parseTokenNode(), parseAssignmentExpressionOrHigher());
    end
    // It wasn't an assignment or a lambda.  This is a conditional expression:
    return parseConditionalExpressionRest(expr);
end
function isYieldExpression()
    if (token === SyntaxKind.YieldKeyword) {
        // If we have a 'yield' keyword, and htis is a context where yield expressions are
        // allowed, then definitely parse out a yield expression.
        if (inYieldContext()) {
            return true;
        end
        if (inStrictModeContext()) {
            // If we're in strict mode, then 'yield' is a keyword, could only ever start
            // a yield expression.
            return true;
        end
        // We're in a context where 'yield expr' is not allowed.  However, if we can
        // definitely tell that the user was trying to parse a 'yield expr' and not
        // just a normal expr that start with a 'yield' identifier, then parse out
        // a 'yield expr'.  We can then report an error later that they are only
        // allowed in generator expressions.
        //
        // for example, if we see 'yield(foo)', then we'll have to treat that as an
        // invocation expression of something called 'yield'.  However, if we have
        // 'yield foo' then that is not legal as a normal expression, so we can
        // definitely recognize this as a yield expression.
        //
        // for now we just check if the next token is an identifier.  More heuristics
        // can be added here later as necessary.  We just need to make sure that we
        // don't accidently consume something legal.
        return lookAhead(nextTokenIsIdentifierOnSameLine);
    end
    return false;
end
function nextTokenIsIdentifierOnSameLine()
    nextToken();
    return !scanner.hasPrecedingLineBreak() && isIdentifier();
end
function nextTokenIsIdentifierOrStartOfDestructuringOnTheSameLine()
    nextToken();
    return !scanner.hasPrecedingLineBreak() &&
        (isIdentifier() || token === SyntaxKind.OpenBraceToken || token === SyntaxKind.OpenBracketToken);
end
function parseYieldExpression()
    local node = createNode(SyntaxKind.YieldExpression);
    // YieldExpression[In] :
    //      yield
    //      yield [no LineTerminator here] [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
    //      yield [no LineTerminator here] * [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
    nextToken();
    if (!scanner.hasPrecedingLineBreak() &&
        (token === SyntaxKind.AsteriskToken || isStartOfExpression())) {
        node.asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
        node.expression = parseAssignmentExpressionOrHigher();
        return finishNode(node);
    end
    else {
        // if the next token is not on the same line as yield.  or we don't have an '*' or
        // the start of an expressin, then this is just a simple "yield" expression.
        return finishNode(node);
    end
end
function parseSimpleArrowFunctionExpression(identifier)
    Debug.assert(token === SyntaxKind.EqualsGreaterThanToken, "parseSimpleArrowFunctionExpression should only have been called if we had a =>");
    local node = createNode(SyntaxKind.ArrowFunction, identifier.pos);
    local parameter = createNode(SyntaxKind.Parameter, identifier.pos);
    parameter.name = identifier;
    finishNode(parameter);
    node.parameters = [parameter];
    node.parameters.pos = parameter.pos;
    node.parameters.;
end
parameter.;
;
node.equalsGreaterThanToken = parseExpectedToken(SyntaxKind.EqualsGreaterThanToken, false, Diagnostics._0_expected, "=>");
node.body = parseArrowFunctionExpressionBody();
return finishNode(node);
function tryParseParenthesizedArrowFunctionExpression()
    local triState = isParenthesizedArrowFunctionExpression();
    if (triState === 0 /* False */) {
        // It's definitely not a parenthesized arrow function expression.
        return undefined;
    end
    // If we definitely have an arrow function, then we can just parse one, not requiring a
    // following => or { token. Otherwise, we *might* have an arrow function.  Try to parse
    // it out, but don't allow any ambiguity, and return 'undefined' if this could be an
    // expression instead.
    local arrowFunction = triState === 1 /* True */
        ? parseParenthesizedArrowFunctionExpressionHead(true)
        : tryParse(parsePossibleParenthesizedArrowFunctionExpressionHead);
    if (!arrowFunction) {
        // Didn't appear to actually be a parenthesized arrow function.  Just bail out.
        return undefined;
    end
    // If we have an arrow, then try to parse the body. Even if not, try to parse if we
    // have an opening brace, just in case we're in an error state.
    local lastToken = token;
    arrowFunction.equalsGreaterThanToken = parseExpectedToken(SyntaxKind.EqualsGreaterThanToken, false, Diagnostics._0_expected, "=>");
    arrowFunction.body = (lastToken === SyntaxKind.EqualsGreaterThanToken || lastToken === SyntaxKind.OpenBraceToken)
        ? parseArrowFunctionExpressionBody()
        : parseIdentifier();
    return finishNode(arrowFunction);
end
//  True        -> We definitely expect a parenthesized arrow function here.
//  False       -> There *cannot* be a parenthesized arrow function here.
//  Unknown     -> There *might* be a parenthesized arrow function here.
//                 Speculatively look ahead to be sure, and rollback if not.
function isParenthesizedArrowFunctionExpression()
    if (token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
        return lookAhead(isParenthesizedArrowFunctionExpressionWorker);
    end
    if (token === SyntaxKind.EqualsGreaterThanToken) {
        // ERROR RECOVERY TWEAK:
        // If we see a standalone => try to parse it as an arrow function expression as that's
        // likely what the user intended to write.
        return 1 /* True */;
    end
    // Definitely not a parenthesized arrow function.
    return 0 /* False */;
end
function isParenthesizedArrowFunctionExpressionWorker()
    local first = token;
    local second = nextToken();
    if (first === SyntaxKind.OpenParenToken) {
        if (second === SyntaxKind.CloseParenToken) {
            // Simple cases: "() =>", "(): ", and  "() {".
            // This is an arrow function with no parameters.
            // The last one is not actually an arrow function,
            // but this is probably what the user intended.
            local third = nextToken();
            switch (third) {
                case SyntaxKind.EqualsGreaterThanToken:
                case SyntaxKind.ColonToken:
                case SyntaxKind.OpenBraceToken:
                    return 1 /* True */;
                default:
                    return 0 /* False */;
            end
        end
        // If encounter "([" or "({", this could be the start of a binding pattern.
        // Examples:
        //      ([ x ]) => { }
        //      ({ x }) => { }
        //      ([ x ])
        //      ({ x })
        if (second === SyntaxKind.OpenBracketToken || second === SyntaxKind.OpenBraceToken) {
            return 2 /* Unknown */;
        end
        // Simple case: "(..."
        // This is an arrow function with a rest parameter.
        if (second === SyntaxKind.DotDotDotToken) {
            return 1 /* True */;
        end
        // If we had "(" followed by something that's not an identifier,
        // then this definitely doesn't look like a lambda.
        // Note: we could be a little more lenient and allow
        // "(public" or "(private". These would not ever actually be allowed,
        // but we could provide a good error message instead of bailing out.
        if (!isIdentifier()) {
            return 0 /* False */;
        end
        // If we have something like "(a:", then we must have a
        // type-annotated parameter in an arrow function expression.
        if (nextToken() === SyntaxKind.ColonToken) {
            return 1 /* True */;
        end
        // This *could* be a parenthesized arrow function.
        // Return Unknown to let the caller know.
        return 2 /* Unknown */;
    end
    else {
        Debug.assert(first === SyntaxKind.LessThanToken);
        // If we have "<" not followed by an identifier,
        // then this definitely is not an arrow function.
        if (!isIdentifier()) {
            return 0 /* False */;
        end
        // This *could* be a parenthesized arrow function.
        return 2 /* Unknown */;
    end
end
function parsePossibleParenthesizedArrowFunctionExpressionHead()
    return parseParenthesizedArrowFunctionExpressionHead(false);
end
function parseParenthesizedArrowFunctionExpressionHead(allowAmbiguity)
    local node = createNode(SyntaxKind.ArrowFunction);
    // Arrow functions are never generators.
    //
    // If we're speculatively parsing a signature for a parenthesized arrow function, then
    // we have to have a complete parameter list.  Otherwise we might see something like
    // a => (b => c)
    // And think that "(b =>" was actually a parenthesized arrow function with a missing
    // close paren.
    fillSignature(SyntaxKind.ColonToken, false, !allowAmbiguity, node);
    // If we couldn't get parameters, we definitely could not parse out an arrow function.
    if (!node.parameters) {
        return undefined;
    end
    // Parsing a signature isn't enough.
    // Parenthesized arrow signatures often look like other valid expressions.
    // For instance:
    //  - "(x = 10)" is an assignment expression parsed as a signature with a default parameter value.
    //  - "(x,y)" is a comma expression parsed as a signature with two parameters.
    //  - "a ? (b): c" will have "(b):" parsed as a signature with a return type annotation.
    //
    // So we need just a bit of lookahead to ensure that it can only be a signature.
    if (!allowAmbiguity && token !== SyntaxKind.EqualsGreaterThanToken && token !== SyntaxKind.OpenBraceToken) {
        // Returning undefined here will cause our caller to rewind to where we started from.
        return undefined;
    end
    return node;
end
function parseArrowFunctionExpressionBody()
    if (token === SyntaxKind.OpenBraceToken) {
        return parseFunctionBlock(false, false);
    end
    if (isStartOfStatement(true) &&
        !isStartOfExpressionStatement() &&
        token !== SyntaxKind.FunctionKeyword &&
        token !== SyntaxKind.ClassKeyword) {
        // Check if we got a plain statement (i.e. no expression-statements, no function/class expressions/declarations)
        //
        // Here we try to recover from a potential error situation in the case where the
        // user meant to supply a block. For example, if the user wrote:
        //
        //  a =>
        //      let v = 0;
        //  }
        //
        // they may be missing an open brace.  Check to see if that's the case so we can
        // try to recover better.  If we don't do this, then the next close curly we see may end
        // up preemptively closing the containing construct.
        //
        // Note: even when 'ignoreMissingOpenBrace' is passed as true, parseBody will still error.
        return parseFunctionBlock(false, true);
    end
    return parseAssignmentExpressionOrHigher();
end
function parseConditionalExpressionRest(leftOperand)
    // Note: we are passed in an expression which was produced from parseBinaryExpressionOrHigher.
    local questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
    if (!questionToken) {
        return leftOperand;
    end
    // Note: we explicitly 'allowIn' in the whenTrue part of the condition expression, and
    // we do not that for the 'whenFalse' part.
    local node = createNode(SyntaxKind.ConditionalExpression, leftOperand.pos);
    node.condition = leftOperand;
    node.questionToken = questionToken;
    node.whenTrue = doOutsideOfContext(disallowInAndDecoratorContext, parseAssignmentExpressionOrHigher);
    node.colonToken = parseExpectedToken(SyntaxKind.ColonToken, false, Diagnostics._0_expected, tokenToString(SyntaxKind.ColonToken));
    node.whenFalse = parseAssignmentExpressionOrHigher();
    return finishNode(node);
end
function parseBinaryExpressionOrHigher(precedence)
    local leftOperand = parseUnaryExpressionOrHigher();
    return parseBinaryExpressionRest(precedence, leftOperand);
end
function isInOrOfKeyword(t)
    return t === SyntaxKind.InKeyword || t === SyntaxKind.OfKeyword;
end
function parseBinaryExpressionRest(precedence, leftOperand)
    while (true) {
        // We either have a binary operator here, or we're finished.  We call
        // reScanGreaterToken so that we merge token sequences like > and = into >=
        reScanGreaterToken();
        local newPrecedence = getBinaryOperatorPrecedence();
        // Check the precedence to see if we should "take" this operator
        if (newPrecedence <= precedence) {
            break;
        end
        if (token === SyntaxKind.InKeyword && inDisallowInContext()) {
            break;
        end
        leftOperand = makeBinaryExpression(leftOperand, parseTokenNode(), parseBinaryExpressionOrHigher(newPrecedence));
    end
    return leftOperand;
end
function isBinaryOperator()
    if (inDisallowInContext() && token === SyntaxKind.InKeyword) {
        return false;
    end
    return getBinaryOperatorPrecedence() > 0;
end
function getBinaryOperatorPrecedence()
    switch (token) {
        case SyntaxKind.BarBarToken:
            return 1;
        case SyntaxKind.AmpersandAmpersandToken:
            return 2;
        case SyntaxKind.BarToken:
            return 3;
        case SyntaxKind.CaretToken:
            return 4;
        case SyntaxKind.AmpersandToken:
            return 5;
        case SyntaxKind.EqualsEqualsToken:
        case SyntaxKind.ExclamationEqualsToken:
        case SyntaxKind.EqualsEqualsEqualsToken:
        case SyntaxKind.ExclamationEqualsEqualsToken:
            return 6;
        case SyntaxKind.LessThanToken:
        case SyntaxKind.GreaterThanToken:
        case SyntaxKind.LessThanEqualsToken:
        case SyntaxKind.GreaterThanEqualsToken:
        case SyntaxKind.InstanceOfKeyword:
        case SyntaxKind.InKeyword:
            return 7;
        case SyntaxKind.LessThanLessThanToken:
        case SyntaxKind.GreaterThanGreaterThanToken:
        case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
            return 8;
        case SyntaxKind.PlusToken:
        case SyntaxKind.MinusToken:
            return 9;
        case SyntaxKind.AsteriskToken:
        case SyntaxKind.SlashToken:
        case SyntaxKind.PercentToken:
            return 10;
    end
    // -1 is lower than all other precedences.  Returning it will cause binary expression
    // parsing to stop.
    return -1;
end
function makeBinaryExpression(left, operatorToken, right)
    local node = createNode(SyntaxKind.BinaryExpression, left.pos);
    node.left = left;
    node.operatorToken = operatorToken;
    node.right = right;
    return finishNode(node);
end
function parsePrefixUnaryExpression()
    local node = createNode(SyntaxKind.PrefixUnaryExpression);
    node.operator = token;
    nextToken();
    node.operand = parseUnaryExpressionOrHigher();
    return finishNode(node);
end
function parseDeleteExpression()
    local node = createNode(SyntaxKind.DeleteExpression);
    nextToken();
    node.expression = parseUnaryExpressionOrHigher();
    return finishNode(node);
end
function parseTypeOfExpression()
    local node = createNode(SyntaxKind.TypeOfExpression);
    nextToken();
    node.expression = parseUnaryExpressionOrHigher();
    return finishNode(node);
end
function parseVoidExpression()
    local node = createNode(SyntaxKind.VoidExpression);
    nextToken();
    node.expression = parseUnaryExpressionOrHigher();
    return finishNode(node);
end
function parseUnaryExpressionOrHigher()
    switch (token) {
        case SyntaxKind.PlusToken:
        case SyntaxKind.MinusToken:
        case SyntaxKind.TildeToken:
        case SyntaxKind.ExclamationToken:
        case SyntaxKind.PlusPlusToken:
        case SyntaxKind.MinusMinusToken:
            return parsePrefixUnaryExpression();
        case SyntaxKind.DeleteKeyword:
            return parseDeleteExpression();
        case SyntaxKind.TypeOfKeyword:
            return parseTypeOfExpression();
        case SyntaxKind.VoidKeyword:
            return parseVoidExpression();
        case SyntaxKind.LessThanToken:
            return parseTypeAssertion();
        default:
            return parsePostfixExpressionOrHigher();
    end
end
function parsePostfixExpressionOrHigher()
    local expression = parseLeftHandSideExpressionOrHigher();
    Debug.assert(isLeftHandSideExpression(expression));
    if ((token === SyntaxKind.PlusPlusToken || token === SyntaxKind.MinusMinusToken) && !scanner.hasPrecedingLineBreak()) {
        local node = createNode(SyntaxKind.PostfixUnaryExpression, expression.pos);
        node.operand = expression;
        node.operator = token;
        nextToken();
        return finishNode(node);
    end
    return expression;
end
function parseLeftHandSideExpressionOrHigher()
    // Original Ecma:
    // LeftHandSideExpression: See 11.2
    //      NewExpression
    //      CallExpression
    //
    // Our simplification:
    //
    // LeftHandSideExpression: See 11.2
    //      MemberExpression
    //      CallExpression
    //
    // See comment in parseMemberExpressionOrHigher on how we replaced NewExpression with
    // MemberExpression to make our lives easier.
    //
    // to best understand the below code, it's important to see how CallExpression expands
    // out into its own productions:
    //
    // CallExpression:
    //      MemberExpression Arguments
    //      CallExpression Arguments
    //      CallExpression[Expression]
    //      CallExpression.IdentifierName
    //      super   (   ArgumentListopt   )
    //      super.IdentifierName
    //
    // Because of the recursion in these calls, we need to bottom out first.  There are two
    // bottom out states we can run into.  Either we see 'super' which must start either of
    // the last two CallExpression productions.  Or we have a MemberExpression which either
    // completes the LeftHandSideExpression, or starts the beginning of the first four
    // CallExpression productions.
    local expression = token === SyntaxKind.SuperKeyword
        ? parseSuperExpression()
        : parseMemberExpressionOrHigher();
    // Now, we *may* be complete.  However, we might have consumed the start of a
    // CallExpression.  As such, we need to consume the rest of it here to be complete.
    return parseCallExpressionRest(expression);
end
function parseMemberExpressionOrHigher()
    // Note: to make our lives simpler, we decompose the the NewExpression productions and
    // place ObjectCreationExpression and FunctionExpression into PrimaryExpression.
    // like so:
    //
    //   PrimaryExpression : See 11.1
    //      this
    //      Identifier
    //      Literal
    //      ArrayLiteral
    //      ObjectLiteral
    //      (Expression)
    //      FunctionExpression
    //      new MemberExpression Arguments?
    //
    //   MemberExpression : See 11.2
    //      PrimaryExpression
    //      MemberExpression[Expression]
    //      MemberExpression.IdentifierName
    //
    //   CallExpression : See 11.2
    //      MemberExpression
    //      CallExpression Arguments
    //      CallExpression[Expression]
    //      CallExpression.IdentifierName
    //
    // Technically this is ambiguous.  i.e. CallExpression defines:
    //
    //   CallExpression:
    //      CallExpression Arguments
    //
    // If you see: "new Foo()"
    //
    // Then that could be treated as a single ObjectCreationExpression, or it could be
    // treated as the invocation of "new Foo".  We disambiguate that in code (to match
    // the original grammar) by making sure that if we see an ObjectCreationExpression
    // we always consume arguments if they are there. So we treat "new Foo()" as an
    // object creation only, and not at all as an invocation)  Another way to think
    // about this is that for every "new" that we see, we will consume an argument list if
    // it is there as part of the *associated* object creation node.  Any additional
    // argument lists we see, will become invocation expressions.
    //
    // Because there are no other places in the grammar now that refer to FunctionExpression
    // or ObjectCreationExpression, it is safe to push down into the PrimaryExpression
    // production.
    //
    // Because CallExpression and MemberExpression are left recursive, we need to bottom out
    // of the recursion immediately.  So we parse out a primary expression to start with.
    local expression = parsePrimaryExpression();
    return parseMemberExpressionRest(expression);
end
function parseSuperExpression()
    local expression = parseTokenNode();
    if (token === SyntaxKind.OpenParenToken || token === SyntaxKind.DotToken) {
        return expression;
    end
    // If we have seen "super" it must be followed by '(' or '.'.
    // If it wasn't then just try to parse out a '.' and report an error.
    local node = createNode(SyntaxKind.PropertyAccessExpression, expression.pos);
    node.expression = expression;
    node.dotToken = parseExpectedToken(SyntaxKind.DotToken, false, Diagnostics.super_must_be_followed_by_an_argument_list_or_member_access);
    node.name = parseRightSideOfDot(true);
    return finishNode(node);
end
function parseTypeAssertion()
    local node = createNode(SyntaxKind.TypeAssertionExpression);
    parseExpected(SyntaxKind.LessThanToken);
    node.type = parseType();
    parseExpected(SyntaxKind.GreaterThanToken);
    node.expression = parseUnaryExpressionOrHigher();
    return finishNode(node);
end
function parseMemberExpressionRest(expression)
    while (true) {
        local dotToken = parseOptionalToken(SyntaxKind.DotToken);
        if (dotToken) {
            local propertyAccess = createNode(SyntaxKind.PropertyAccessExpression, expression.pos);
            propertyAccess.expression = expression;
            propertyAccess.dotToken = dotToken;
            propertyAccess.name = parseRightSideOfDot(true);
            expression = finishNode(propertyAccess);
            continue;
        end
        // when in the [Decorator] context, we do not parse ElementAccess as it could be part of a ComputedPropertyName                
        if (!inDecoratorContext() && parseOptional(SyntaxKind.OpenBracketToken)) {
            local indexedAccess = createNode(SyntaxKind.ElementAccessExpression, expression.pos);
            indexedAccess.expression = expression;
            // It's not uncommon for a user to write: "new Type[]".
            // Check for that common pattern and report a better error message.
            if (token !== SyntaxKind.CloseBracketToken) {
                indexedAccess.argumentExpression = allowInAnd(parseExpression);
                if (indexedAccess.argumentExpression.kind === SyntaxKind.StringLiteral || indexedAccess.argumentExpression.kind === SyntaxKind.NumericLiteral) {
                    local literal = indexedAccess.argumentExpression;
                    literal.text = internIdentifier(literal.text);
                end
            end
            parseExpected(SyntaxKind.CloseBracketToken);
            expression = finishNode(indexedAccess);
            continue;
        end
        if (token === SyntaxKind.NoSubstitutionTemplateLiteral || token === SyntaxKind.TemplateHead) {
            local tagExpression = createNode(SyntaxKind.TaggedTemplateExpression, expression.pos);
            tagExpression.tag = expression;
            tagExpression.template = token === SyntaxKind.NoSubstitutionTemplateLiteral
                ? parseLiteralNode()
                : parseTemplateExpression();
            expression = finishNode(tagExpression);
            continue;
        end
        return expression;
    end
end
function parseCallExpressionRest(expression)
    while (true) {
        expression = parseMemberExpressionRest(expression);
        if (token === SyntaxKind.LessThanToken) {
            // See if this is the start of a generic invocation.  If so, consume it and
            // keep checking for postfix expressions.  Otherwise, it's just a '<' that's
            // part of an arithmetic expression.  Break out so we consume it higher in the
            // stack.
            local typeArguments = tryParse(parseTypeArgumentsInExpression);
            if (!typeArguments) {
                return expression;
            end
            local callExpr = createNode(SyntaxKind.CallExpression, expression.pos);
            callExpr.expression = expression;
            callExpr.typeArguments = typeArguments;
            callExpr.arguments = parseArgumentList();
            expression = finishNode(callExpr);
            continue;
        end
        else if (token === SyntaxKind.OpenParenToken) {
            local callExpr = createNode(SyntaxKind.CallExpression, expression.pos);
            callExpr.expression = expression;
            callExpr.arguments = parseArgumentList();
            expression = finishNode(callExpr);
            continue;
        end
        return expression;
    end
end
function parseArgumentList()
    parseExpected(SyntaxKind.OpenParenToken);
    local result = parseDelimitedList(12 /* ArgumentExpressions */, parseArgumentExpression);
    parseExpected(SyntaxKind.CloseParenToken);
    return result;
end
function parseTypeArgumentsInExpression()
    if (!parseOptional(SyntaxKind.LessThanToken)) {
        return undefined;
    end
    local typeArguments = parseDelimitedList(17 /* TypeArguments */, parseType);
    if (!parseExpected(SyntaxKind.GreaterThanToken)) {
        // If it doesn't have the closing >  then it's definitely not an type argument list.
        return undefined;
    end
    // If we have a '<', then only parse this as a arugment list if the type arguments
    // are complete and we have an open paren.  if we don't, rewind and return nothing.
    return typeArguments && canFollowTypeArgumentsInExpression()
        ? typeArguments
        : undefined;
end
function canFollowTypeArgumentsInExpression()
    switch (token) {
        case SyntaxKind.OpenParenToken: // foo<x>(
        // this case are the only case where this token can legally follow a type argument
        // list.  So we definitely want to treat this as a type arg list.
        case SyntaxKind.DotToken: // foo<x>.
        case SyntaxKind.CloseParenToken: // foo<x>)
        case SyntaxKind.CloseBracketToken: // foo<x>]
        case SyntaxKind.ColonToken: // foo<x>:
        case SyntaxKind.SemicolonToken: // foo<x>;
        case SyntaxKind.QuestionToken: // foo<x>?
        case SyntaxKind.EqualsEqualsToken: // foo<x> ==
        case SyntaxKind.EqualsEqualsEqualsToken: // foo<x> ===
        case SyntaxKind.ExclamationEqualsToken: // foo<x> !=
        case SyntaxKind.ExclamationEqualsEqualsToken: // foo<x> !==
        case SyntaxKind.AmpersandAmpersandToken: // foo<x> &&
        case SyntaxKind.BarBarToken: // foo<x> ||
        case SyntaxKind.CaretToken: // foo<x> ^
        case SyntaxKind.AmpersandToken: // foo<x> &
        case SyntaxKind.BarToken: // foo<x> |
        case SyntaxKind.CloseBraceToken: // foo<x> }
        case SyntaxKind.EndOfFileToken:
            // these cases can't legally follow a type arg list.  However, they're not legal
            // expressions either.  The user is probably in the middle of a generic type. So
            // treat it as such.
            return true;
        case SyntaxKind.CommaToken: // foo<x>,
        case SyntaxKind.OpenBraceToken: // foo<x> {
        // We don't want to treat these as type arguments.  Otherwise we'll parse this
        // as an invocation expression.  Instead, we want to parse out the expression 
        // in isolation from the type arguments.
        default:
            // Anything else treat as an expression.
            return false;
    end
end
function parsePrimaryExpression()
    switch (token) {
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
            return parseLiteralNode();
        case SyntaxKind.ThisKeyword:
        case SyntaxKind.SuperKeyword:
        case SyntaxKind.NullKeyword:
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.FalseKeyword:
            return parseTokenNode();
        case SyntaxKind.OpenParenToken:
            return parseParenthesizedExpression();
        case SyntaxKind.OpenBracketToken:
            return parseArrayLiteralExpression();
        case SyntaxKind.OpenBraceToken:
            return parseObjectLiteralExpression();
        case SyntaxKind.ClassKeyword:
            return parseClassExpression();
        case SyntaxKind.FunctionKeyword:
            return parseFunctionExpression();
        case SyntaxKind.NewKeyword:
            return parseNewExpression();
        case SyntaxKind.SlashToken:
        case SyntaxKind.SlashEqualsToken:
            if (reScanSlashToken() === SyntaxKind.RegularExpressionLiteral) {
                return parseLiteralNode();
            end
            break;
        case SyntaxKind.TemplateHead:
            return parseTemplateExpression();
    end
    return parseIdentifier(Diagnostics.Expression_expected);
end
function parseParenthesizedExpression()
    local node = createNode(SyntaxKind.ParenthesizedExpression);
    parseExpected(SyntaxKind.OpenParenToken);
    node.expression = allowInAnd(parseExpression);
    parseExpected(SyntaxKind.CloseParenToken);
    return finishNode(node);
end
function parseSpreadElement()
    local node = createNode(SyntaxKind.SpreadElementExpression);
    parseExpected(SyntaxKind.DotDotDotToken);
    node.expression = parseAssignmentExpressionOrHigher();
    return finishNode(node);
end
function parseArgumentOrArrayLiteralElement()
    return token === SyntaxKind.DotDotDotToken ? parseSpreadElement() :
        token === SyntaxKind.CommaToken ? createNode(SyntaxKind.OmittedExpression) :
            parseAssignmentExpressionOrHigher();
end
function parseArgumentExpression()
    return doOutsideOfContext(disallowInAndDecoratorContext, parseArgumentOrArrayLiteralElement);
end
function parseArrayLiteralExpression()
    local node = createNode(SyntaxKind.ArrayLiteralExpression);
    parseExpected(SyntaxKind.OpenBracketToken);
    if (scanner.hasPrecedingLineBreak())
        node.flags |= NodeFlags.MultiLine;
    node.elements = parseDelimitedList(14 /* ArrayLiteralMembers */, parseArgumentOrArrayLiteralElement);
    parseExpected(SyntaxKind.CloseBracketToken);
    return finishNode(node);
end
function tryParseAccessorDeclaration(fullStart, decorators, modifiers)
    if (parseContextualModifier(SyntaxKind.GetKeyword)) {
        return parseAccessorDeclaration(SyntaxKind.GetAccessor, fullStart, decorators, modifiers);
    end
    else if (parseContextualModifier(SyntaxKind.SetKeyword)) {
        return parseAccessorDeclaration(SyntaxKind.SetAccessor, fullStart, decorators, modifiers);
    end
    return undefined;
end
function parseObjectLiteralElement()
    local fullStart = scanner.getStartPos();
    local decorators = parseDecorators();
    local modifiers = parseModifiers();
    local accessor = tryParseAccessorDeclaration(fullStart, decorators, modifiers);
    if (accessor) {
        return accessor;
    end
    local asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
    local tokenIsIdentifier = isIdentifier();
    local nameToken = token;
    local propertyName = parsePropertyName();
    // Disallowing of optional property assignments happens in the grammar checker.
    local questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
    if (asteriskToken || token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
        return parseMethodDeclaration(fullStart, decorators, modifiers, asteriskToken, propertyName, questionToken);
    end
    // Parse to check if it is short-hand property assignment or normal property assignment
    if ((token === SyntaxKind.CommaToken || token === SyntaxKind.CloseBraceToken) && tokenIsIdentifier) {
        local shorthandDeclaration = createNode(SyntaxKind.ShorthandPropertyAssignment, fullStart);
        shorthandDeclaration.name = propertyName;
        shorthandDeclaration.questionToken = questionToken;
        return finishNode(shorthandDeclaration);
    end
    else {
        local propertyAssignment = createNode(SyntaxKind.PropertyAssignment, fullStart);
        propertyAssignment.name = propertyName;
        propertyAssignment.questionToken = questionToken;
        parseExpected(SyntaxKind.ColonToken);
        propertyAssignment.initializer = allowInAnd(parseAssignmentExpressionOrHigher);
        return finishNode(propertyAssignment);
    end
end
function parseObjectLiteralExpression()
    local node = createNode(SyntaxKind.ObjectLiteralExpression);
    parseExpected(SyntaxKind.OpenBraceToken);
    if (scanner.hasPrecedingLineBreak()) {
        node.flags |= NodeFlags.MultiLine;
    end
    node.properties = parseDelimitedList(13 /* ObjectLiteralMembers */, parseObjectLiteralElement, true);
    parseExpected(SyntaxKind.CloseBraceToken);
    return finishNode(node);
end
function parseFunctionExpression()
    // GeneratorExpression :
    //      function * BindingIdentifier[Yield]opt (FormalParameters[Yield, GeneratorParameter]) { GeneratorBody[Yield] }
    // FunctionExpression:
    //      function BindingIdentifieropt(FormalParameters) { FunctionBody }
    local saveDecoratorContext = inDecoratorContext();
    if (saveDecoratorContext) {
        setDecoratorContext(false);
    end
    local node = createNode(SyntaxKind.FunctionExpression);
    parseExpected(SyntaxKind.FunctionKeyword);
    node.asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
    node.name = node.asteriskToken ? doInYieldContext(parseOptionalIdentifier) : parseOptionalIdentifier();
    fillSignature(SyntaxKind.ColonToken, !!node.asteriskToken, false, node);
    node.body = parseFunctionBlock(!!node.asteriskToken, false);
    if (saveDecoratorContext) {
        setDecoratorContext(true);
    end
    return finishNode(node);
end
function parseOptionalIdentifier()
    return isIdentifier() ? parseIdentifier() : undefined;
end
function parseNewExpression()
    local node = createNode(SyntaxKind.NewExpression);
    parseExpected(SyntaxKind.NewKeyword);
    node.expression = parseMemberExpressionOrHigher();
    node.typeArguments = tryParse(parseTypeArgumentsInExpression);
    if (node.typeArguments || token === SyntaxKind.OpenParenToken) {
        node.arguments = parseArgumentList();
    end
    return finishNode(node);
end
// STATEMENTS
function parseBlock(ignoreMissingOpenBrace, checkForStrictMode, diagnosticMessage)
    local node = createNode(SyntaxKind.Block);
    if (parseExpected(SyntaxKind.OpenBraceToken, diagnosticMessage) || ignoreMissingOpenBrace) {
        node.statements = parseList(2 /* BlockStatements */, checkForStrictMode, parseStatement);
        parseExpected(SyntaxKind.CloseBraceToken);
    end
    else {
        node.statements = createMissingList();
    end
    return finishNode(node);
end
function parseFunctionBlock(allowYield, ignoreMissingOpenBrace, diagnosticMessage)
    local savedYieldContext = inYieldContext();
    setYieldContext(allowYield);
    // We may be in a [Decorator] context when parsing a function expression or 
    // arrow function. The body of the function is not in [Decorator] context.
    local saveDecoratorContext = inDecoratorContext();
    if (saveDecoratorContext) {
        setDecoratorContext(false);
    end
    local block = parseBlock(ignoreMissingOpenBrace, true, diagnosticMessage);
    if (saveDecoratorContext) {
        setDecoratorContext(true);
    end
    setYieldContext(savedYieldContext);
    return block;
end
function parseEmptyStatement()
    local node = createNode(SyntaxKind.EmptyStatement);
    parseExpected(SyntaxKind.SemicolonToken);
    return finishNode(node);
end
function parseIfStatement()
    local node = createNode(SyntaxKind.IfStatement);
    parseExpected(SyntaxKind.IfKeyword);
    parseExpected(SyntaxKind.OpenParenToken);
    node.expression = allowInAnd(parseExpression);
    parseExpected(SyntaxKind.CloseParenToken);
    node.thenStatement = parseStatement();
    node.elseStatement = parseOptional(SyntaxKind.ElseKeyword) ? parseStatement() : undefined;
    return finishNode(node);
end
function parseDoStatement()
    local node = createNode(SyntaxKind.DoStatement);
    parseExpected(SyntaxKind.DoKeyword);
    node.statement = parseStatement();
    parseExpected(SyntaxKind.WhileKeyword);
    parseExpected(SyntaxKind.OpenParenToken);
    node.expression = allowInAnd(parseExpression);
    parseExpected(SyntaxKind.CloseParenToken);
    // From: https://mail.mozilla.org/pipermail/es-discuss/2011-August/016188.html
    // 157 min --- All allen at wirfs-brock.com CONF --- "do{;}while(false)false" prohibited in
    // spec but allowed in consensus reality. Approved -- this is the de-facto standard whereby
    //  do;while(0)x will have a semicolon inserted before x.
    parseOptional(SyntaxKind.SemicolonToken);
    return finishNode(node);
end
function parseWhileStatement()
    local node = createNode(SyntaxKind.WhileStatement);
    parseExpected(SyntaxKind.WhileKeyword);
    parseExpected(SyntaxKind.OpenParenToken);
    node.expression = allowInAnd(parseExpression);
    parseExpected(SyntaxKind.CloseParenToken);
    node.statement = parseStatement();
    return finishNode(node);
end
function parseForOrForInOrForOfStatement()
    local pos = getNodePos();
    parseExpected(SyntaxKind.ForKeyword);
    parseExpected(SyntaxKind.OpenParenToken);
    local initializer = undefined;
    if (token !== SyntaxKind.SemicolonToken) {
        if (token === SyntaxKind.VarKeyword || token === SyntaxKind.LetKeyword || token === SyntaxKind.ConstKeyword) {
            initializer = parseVariableDeclarationList(true);
        end
        else {
            initializer = disallowInAnd(parseExpression);
        end
    end
    local forOrForInOrForOfStatement;
    if (parseOptional(SyntaxKind.InKeyword)) {
        local forInStatement = createNode(SyntaxKind.ForInStatement, pos);
        forInStatement.initializer = initializer;
        forInStatement.expression = allowInAnd(parseExpression);
        parseExpected(SyntaxKind.CloseParenToken);
        forOrForInOrForOfStatement = forInStatement;
    end
    else if (parseOptional(SyntaxKind.OfKeyword)) {
        local forOfStatement = createNode(SyntaxKind.ForOfStatement, pos);
        forOfStatement.initializer = initializer;
        forOfStatement.expression = allowInAnd(parseAssignmentExpressionOrHigher);
        parseExpected(SyntaxKind.CloseParenToken);
        forOrForInOrForOfStatement = forOfStatement;
    end
    else {
        local forStatement = createNode(SyntaxKind.ForStatement, pos);
        forStatement.initializer = initializer;
        parseExpected(SyntaxKind.SemicolonToken);
        if (token !== SyntaxKind.SemicolonToken && token !== SyntaxKind.CloseParenToken) {
            forStatement.condition = allowInAnd(parseExpression);
        end
        parseExpected(SyntaxKind.SemicolonToken);
        if (token !== SyntaxKind.CloseParenToken) {
            forStatement.incrementor = allowInAnd(parseExpression);
        end
        parseExpected(SyntaxKind.CloseParenToken);
        forOrForInOrForOfStatement = forStatement;
    end
    forOrForInOrForOfStatement.statement = parseStatement();
    return finishNode(forOrForInOrForOfStatement);
end
function parseBreakOrContinueStatement(kind)
    local node = createNode(kind);
    parseExpected(kind === SyntaxKind.BreakStatement ? SyntaxKind.BreakKeyword : SyntaxKind.ContinueKeyword);
    if (!canParseSemicolon()) {
        node.label = parseIdentifier();
    end
    parseSemicolon();
    return finishNode(node);
end
function parseReturnStatement()
    local node = createNode(SyntaxKind.ReturnStatement);
    parseExpected(SyntaxKind.ReturnKeyword);
    if (!canParseSemicolon()) {
        node.expression = allowInAnd(parseExpression);
    end
    parseSemicolon();
    return finishNode(node);
end
function parseWithStatement()
    local node = createNode(SyntaxKind.WithStatement);
    parseExpected(SyntaxKind.WithKeyword);
    parseExpected(SyntaxKind.OpenParenToken);
    node.expression = allowInAnd(parseExpression);
    parseExpected(SyntaxKind.CloseParenToken);
    node.statement = parseStatement();
    return finishNode(node);
end
function parseCaseClause()
    local node = createNode(SyntaxKind.CaseClause);
    parseExpected(SyntaxKind.CaseKeyword);
    node.expression = allowInAnd(parseExpression);
    parseExpected(SyntaxKind.ColonToken);
    node.statements = parseList(4 /* SwitchClauseStatements */, false, parseStatement);
    return finishNode(node);
end
function parseDefaultClause()
    local node = createNode(SyntaxKind.DefaultClause);
    parseExpected(SyntaxKind.DefaultKeyword);
    parseExpected(SyntaxKind.ColonToken);
    node.statements = parseList(4 /* SwitchClauseStatements */, false, parseStatement);
    return finishNode(node);
end
function parseCaseOrDefaultClause()
    return token === SyntaxKind.CaseKeyword ? parseCaseClause() : parseDefaultClause();
end
function parseSwitchStatement()
    local node = createNode(SyntaxKind.SwitchStatement);
    parseExpected(SyntaxKind.SwitchKeyword);
    parseExpected(SyntaxKind.OpenParenToken);
    node.expression = allowInAnd(parseExpression);
    parseExpected(SyntaxKind.CloseParenToken);
    local caseBlock = createNode(SyntaxKind.CaseBlock, scanner.getStartPos());
    parseExpected(SyntaxKind.OpenBraceToken);
    caseBlock.clauses = parseList(3 /* SwitchClauses */, false, parseCaseOrDefaultClause);
    parseExpected(SyntaxKind.CloseBraceToken);
    node.caseBlock = finishNode(caseBlock);
    return finishNode(node);
end
function parseThrowStatement()
    // ThrowStatement[Yield] :
    //      throw [no LineTerminator here]Expression[In, ?Yield];
    // Because of automatic semicolon insertion, we need to report error if this
    // throw could be terminated with a semicolon.  Note: we can't call 'parseExpression'
    // directly as that might consume an expression on the following line.
    // We just return 'undefined' in that case.  The actual error will be reported in the
    // grammar walker.
    local node = createNode(SyntaxKind.ThrowStatement);
    parseExpected(SyntaxKind.ThrowKeyword);
    node.expression = scanner.hasPrecedingLineBreak() ? undefined : allowInAnd(parseExpression);
    parseSemicolon();
    return finishNode(node);
end
// TODO: Review for error recovery
function parseTryStatement()
    local node = createNode(SyntaxKind.TryStatement);
    parseExpected(SyntaxKind.TryKeyword);
    node.tryBlock = parseBlock(false, false);
    node.catchClause = token === SyntaxKind.CatchKeyword ? parseCatchClause() : undefined;
    // If we don't have a catch clause, then we must have a finally clause.  Try to parse
    // one out no matter what.
    if (!node.catchClause || token === SyntaxKind.FinallyKeyword) {
        parseExpected(SyntaxKind.FinallyKeyword);
        node.finallyBlock = parseBlock(false, false);
    end
    return finishNode(node);
end
function parseCatchClause()
    local result = createNode(SyntaxKind.CatchClause);
    parseExpected(SyntaxKind.CatchKeyword);
    if (parseExpected(SyntaxKind.OpenParenToken)) {
        result.variableDeclaration = parseVariableDeclaration();
    end
    parseExpected(SyntaxKind.CloseParenToken);
    result.block = parseBlock(false, false);
    return finishNode(result);
end
function parseDebuggerStatement()
    local node = createNode(SyntaxKind.DebuggerStatement);
    parseExpected(SyntaxKind.DebuggerKeyword);
    parseSemicolon();
    return finishNode(node);
end
function parseExpressionOrLabeledStatement()
    // Avoiding having to do the lookahead for a labeled statement by just trying to parse
    // out an expression, seeing if it is identifier and then seeing if it is followed by
    // a colon.
    local fullStart = scanner.getStartPos();
    local expression = allowInAnd(parseExpression);
    if (expression.kind === SyntaxKind.Identifier && parseOptional(SyntaxKind.ColonToken)) {
        local labeledStatement = createNode(SyntaxKind.LabeledStatement, fullStart);
        labeledStatement.label = expression;
        labeledStatement.statement = parseStatement();
        return finishNode(labeledStatement);
    end
    else {
        local expressionStatement = createNode(SyntaxKind.ExpressionStatement, fullStart);
        expressionStatement.expression = expression;
        parseSemicolon();
        return finishNode(expressionStatement);
    end
end
function isStartOfStatement(inErrorRecovery)
    // Functions, variable statements and classes are allowed as a statement.  But as per
    // the grammar, they also allow modifiers.  So we have to check for those statements 
    // that might be following modifiers.This ensures that things work properly when
    // incrementally parsing as the parser will produce the same FunctionDeclaraiton, 
    // VariableStatement or ClassDeclaration, if it has the same text regardless of whether 
    // it is inside a block or not.
    if (isModifier(token)) {
        local result = lookAhead(parseVariableStatementOrFunctionDeclarationOrClassDeclarationWithDecoratorsOrModifiers);
        if (result) {
            return true;
        end
    end
    switch (token) {
        case SyntaxKind.SemicolonToken:
            // If we're in error recovery, then we don't want to treat ';' as an empty statement.
            // The problem is that ';' can show up in far too many contexts, and if we see one
            // and assume it's a statement, then we may bail out inappropriately from whatever
            // we're parsing.  For example, if we have a semicolon in the middle of a class, then
            // we really don't want to assume the class is over and we're on a statement in the
            // outer module.  We just want to consume and move on.
            return !inErrorRecovery;
        case SyntaxKind.OpenBraceToken:
        case SyntaxKind.VarKeyword:
        case SyntaxKind.LetKeyword:
        case SyntaxKind.FunctionKeyword:
        case SyntaxKind.ClassKeyword:
        case SyntaxKind.IfKeyword:
        case SyntaxKind.DoKeyword:
        case SyntaxKind.WhileKeyword:
        case SyntaxKind.ForKeyword:
        case SyntaxKind.ContinueKeyword:
        case SyntaxKind.BreakKeyword:
        case SyntaxKind.ReturnKeyword:
        case SyntaxKind.WithKeyword:
        case SyntaxKind.SwitchKeyword:
        case SyntaxKind.ThrowKeyword:
        case SyntaxKind.TryKeyword:
        case SyntaxKind.DebuggerKeyword:
        // 'catch' and 'finally' do not actually indicate that the code is part of a statement,
        // however, we say they are here so that we may gracefully parse them and error later.
        case SyntaxKind.CatchKeyword:
        case SyntaxKind.FinallyKeyword:
            return true;
        case SyntaxKind.ConstKeyword:
            // const keyword can precede enum keyword when defining constant enums
            // 'const enum' do not start statement.
            // In ES 6 'enum' is a future reserved keyword, so it should not be used as identifier
            local isConstEnum_1 = lookAhead(nextTokenIsEnumKeyword);
            return !isConstEnum_1;
        case SyntaxKind.InterfaceKeyword:
        case SyntaxKind.ModuleKeyword:
        case SyntaxKind.NamespaceKeyword:
        case SyntaxKind.EnumKeyword:
        case SyntaxKind.TypeKeyword:
            // When followed by an identifier, these do not start a statement but might
            // instead be following declarations
            if (isDeclarationStart()) {
                return false;
            end
        case SyntaxKind.PublicKeyword:
        case SyntaxKind.PrivateKeyword:
        case SyntaxKind.ProtectedKeyword:
        case SyntaxKind.StaticKeyword:
            // When followed by an identifier or keyword, these do not start a statement but
            // might instead be following type members
            if (lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine)) {
                return false;
            end
        default:
            return isStartOfExpression();
    end
end
function nextTokenIsEnumKeyword()
    nextToken();
    return token === SyntaxKind.EnumKeyword;
end
function nextTokenIsIdentifierOrKeywordOnSameLine()
    nextToken();
    return isIdentifierOrKeyword() && !scanner.hasPrecedingLineBreak();
end
function parseStatement()
    switch (token) {
        case SyntaxKind.OpenBraceToken:
            return parseBlock(false, false);
        case SyntaxKind.VarKeyword:
        case SyntaxKind.ConstKeyword:
            // const here should always be parsed as const declaration because of check in 'isStatement'
            return parseVariableStatement(scanner.getStartPos(), undefined, undefined);
        case SyntaxKind.FunctionKeyword:
            return parseFunctionDeclaration(scanner.getStartPos(), undefined, undefined);
        case SyntaxKind.ClassKeyword:
            return parseClassDeclaration(scanner.getStartPos(), undefined, undefined);
        case SyntaxKind.SemicolonToken:
            return parseEmptyStatement();
        case SyntaxKind.IfKeyword:
            return parseIfStatement();
        case SyntaxKind.DoKeyword:
            return parseDoStatement();
        case SyntaxKind.WhileKeyword:
            return parseWhileStatement();
        case SyntaxKind.ForKeyword:
            return parseForOrForInOrForOfStatement();
        case SyntaxKind.ContinueKeyword:
            return parseBreakOrContinueStatement(SyntaxKind.ContinueStatement);
        case SyntaxKind.BreakKeyword:
            return parseBreakOrContinueStatement(SyntaxKind.BreakStatement);
        case SyntaxKind.ReturnKeyword:
            return parseReturnStatement();
        case SyntaxKind.WithKeyword:
            return parseWithStatement();
        case SyntaxKind.SwitchKeyword:
            return parseSwitchStatement();
        case SyntaxKind.ThrowKeyword:
            return parseThrowStatement();
        case SyntaxKind.TryKeyword:
        // Include the next two for error recovery.
        case SyntaxKind.CatchKeyword:
        case SyntaxKind.FinallyKeyword:
            return parseTryStatement();
        case SyntaxKind.DebuggerKeyword:
            return parseDebuggerStatement();
        case SyntaxKind.LetKeyword:
            // If let follows identifier on the same line, it is declaration parse it as variable statement
            if (isLetDeclaration()) {
                return parseVariableStatement(scanner.getStartPos(), undefined, undefined);
            end
        // Else parse it like identifier - fall through
        default:
            // Functions and variable statements are allowed as a statement.  But as per
            // the grammar, they also allow modifiers.  So we have to check for those
            // statements that might be following modifiers.  This ensures that things
            // work properly when incrementally parsing as the parser will produce the
            // same FunctionDeclaraiton or VariableStatement if it has the same text
            // regardless of whether it is inside a block or not.
            // Even though variable statements and function declarations cannot have decorators, 
            // we parse them here to provide better error recovery.
            if (isModifier(token) || token === SyntaxKind.AtToken) {
                local result = tryParse(parseVariableStatementOrFunctionDeclarationOrClassDeclarationWithDecoratorsOrModifiers);
                if (result) {
                    return result;
                end
            end
            return parseExpressionOrLabeledStatement();
    end
end
function parseVariableStatementOrFunctionDeclarationOrClassDeclarationWithDecoratorsOrModifiers()
    local start = scanner.getStartPos();
    local decorators = parseDecorators();
    local modifiers = parseModifiers();
    switch (token) {
        case SyntaxKind.ConstKeyword:
            local nextTokenIsEnum = lookAhead(nextTokenIsEnumKeyword);
            if (nextTokenIsEnum) {
                return undefined;
            end
            return parseVariableStatement(start, decorators, modifiers);
        case SyntaxKind.LetKeyword:
            if (!isLetDeclaration()) {
                return undefined;
            end
            return parseVariableStatement(start, decorators, modifiers);
        case SyntaxKind.VarKeyword:
            return parseVariableStatement(start, decorators, modifiers);
        case SyntaxKind.FunctionKeyword:
            return parseFunctionDeclaration(start, decorators, modifiers);
        case SyntaxKind.ClassKeyword:
            return parseClassDeclaration(start, decorators, modifiers);
    end
    return undefined;
end
function parseFunctionBlockOrSemicolon(isGenerator, diagnosticMessage)
    if (token !== SyntaxKind.OpenBraceToken && canParseSemicolon()) {
        parseSemicolon();
        return;
    end
    return parseFunctionBlock(isGenerator, false, diagnosticMessage);
end
// DECLARATIONS
function parseArrayBindingElement()
    if (token === SyntaxKind.CommaToken) {
        return createNode(SyntaxKind.OmittedExpression);
    end
    local node = createNode(SyntaxKind.BindingElement);
    node.dotDotDotToken = parseOptionalToken(SyntaxKind.DotDotDotToken);
    node.name = parseIdentifierOrPattern();
    node.initializer = parseInitializer(false);
    return finishNode(node);
end
function parseObjectBindingElement()
    local node = createNode(SyntaxKind.BindingElement);
    // TODO(andersh): Handle computed properties
    local tokenIsIdentifier = isIdentifier();
    local propertyName = parsePropertyName();
    if (tokenIsIdentifier && token !== SyntaxKind.ColonToken) {
        node.name = propertyName;
    end
    else {
        parseExpected(SyntaxKind.ColonToken);
        node.propertyName = propertyName;
        node.name = parseIdentifierOrPattern();
    end
    node.initializer = parseInitializer(false);
    return finishNode(node);
end
function parseObjectBindingPattern()
    local node = createNode(SyntaxKind.ObjectBindingPattern);
    parseExpected(SyntaxKind.OpenBraceToken);
    node.elements = parseDelimitedList(10 /* ObjectBindingElements */, parseObjectBindingElement);
    parseExpected(SyntaxKind.CloseBraceToken);
    return finishNode(node);
end
function parseArrayBindingPattern()
    local node = createNode(SyntaxKind.ArrayBindingPattern);
    parseExpected(SyntaxKind.OpenBracketToken);
    node.elements = parseDelimitedList(11 /* ArrayBindingElements */, parseArrayBindingElement);
    parseExpected(SyntaxKind.CloseBracketToken);
    return finishNode(node);
end
function isIdentifierOrPattern()
    return token === SyntaxKind.OpenBraceToken || token === SyntaxKind.OpenBracketToken || isIdentifier();
end
function parseIdentifierOrPattern()
    if (token === SyntaxKind.OpenBracketToken) {
        return parseArrayBindingPattern();
    end
    if (token === SyntaxKind.OpenBraceToken) {
        return parseObjectBindingPattern();
    end
    return parseIdentifier();
end
function parseVariableDeclaration()
    local node = createNode(SyntaxKind.VariableDeclaration);
    node.name = parseIdentifierOrPattern();
    node.type = parseTypeAnnotation();
    if (!isInOrOfKeyword(token)) {
        node.initializer = parseInitializer(false);
    end
    return finishNode(node);
end
function parseVariableDeclarationList(inForStatementInitializer)
    local node = createNode(SyntaxKind.VariableDeclarationList);
    switch (token) {
        case SyntaxKind.VarKeyword:
            break;
        case SyntaxKind.LetKeyword:
            node.flags |= NodeFlags.Let;
            break;
        case SyntaxKind.ConstKeyword:
            node.flags |= NodeFlags.Const;
            break;
        default:
            Debug.fail();
    end
    nextToken();
    // The user may have written the following:
    //
    //    for (let of X) { }
    //
    // In this case, we want to parse an empty declaration list, and then parse 'of'
    // as a keyword. The reason this is not automatic is that 'of' is a valid identifier.
    // So we need to look ahead to determine if 'of' should be treated as a keyword in
    // this context.
    // The checker will then give an error that there is an empty declaration list.
    if (token === SyntaxKind.OfKeyword && lookAhead(canFollowContextualOfKeyword)) {
        node.declarations = createMissingList();
    end
    else {
        local savedDisallowIn = inDisallowInContext();
        setDisallowInContext(inForStatementInitializer);
        node.declarations = parseDelimitedList(9 /* VariableDeclarations */, parseVariableDeclaration);
        setDisallowInContext(savedDisallowIn);
    end
    return finishNode(node);
end
function canFollowContextualOfKeyword()
    return nextTokenIsIdentifier() && nextToken() === SyntaxKind.CloseParenToken;
end
function parseVariableStatement(fullStart, decorators, modifiers)
    local node = createNode(SyntaxKind.VariableStatement, fullStart);
    node.decorators = decorators;
    setModifiers(node, modifiers);
    node.declarationList = parseVariableDeclarationList(false);
    parseSemicolon();
    return finishNode(node);
end
function parseFunctionDeclaration(fullStart, decorators, modifiers)
    local node = createNode(SyntaxKind.FunctionDeclaration, fullStart);
    node.decorators = decorators;
    setModifiers(node, modifiers);
    parseExpected(SyntaxKind.FunctionKeyword);
    node.asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
    node.name = node.flags & NodeFlags.Default ? parseOptionalIdentifier() : parseIdentifier();
    fillSignature(SyntaxKind.ColonToken, !!node.asteriskToken, false, node);
    node.body = parseFunctionBlockOrSemicolon(!!node.asteriskToken, Diagnostics.or_expected);
    return finishNode(node);
end
function parseConstructorDeclaration(pos, decorators, modifiers)
    local node = createNode(SyntaxKind.Constructor, pos);
    node.decorators = decorators;
    setModifiers(node, modifiers);
    parseExpected(SyntaxKind.ConstructorKeyword);
    fillSignature(SyntaxKind.ColonToken, false, false, node);
    node.body = parseFunctionBlockOrSemicolon(false, Diagnostics.or_expected);
    return finishNode(node);
end
function parseMethodDeclaration(fullStart, decorators, modifiers, asteriskToken, name, questionToken, diagnosticMessage)
    local method = createNode(SyntaxKind.MethodDeclaration, fullStart);
    method.decorators = decorators;
    setModifiers(method, modifiers);
    method.asteriskToken = asteriskToken;
    method.name = name;
    method.questionToken = questionToken;
    fillSignature(SyntaxKind.ColonToken, !!asteriskToken, false, method);
    method.body = parseFunctionBlockOrSemicolon(!!asteriskToken, diagnosticMessage);
    return finishNode(method);
end
function parsePropertyDeclaration(fullStart, decorators, modifiers, name, questionToken)
    local property = createNode(SyntaxKind.PropertyDeclaration, fullStart);
    property.decorators = decorators;
    setModifiers(property, modifiers);
    property.name = name;
    property.questionToken = questionToken;
    property.type = parseTypeAnnotation();
    property.initializer = allowInAnd(parseNonParameterInitializer);
    parseSemicolon();
    return finishNode(property);
end
function parsePropertyOrMethodDeclaration(fullStart, decorators, modifiers)
    local asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
    local name = parsePropertyName();
    // Note: this is not legal as per the grammar.  But we allow it in the parser and
    // report an error in the grammar checker.
    local questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
    if (asteriskToken || token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
        return parseMethodDeclaration(fullStart, decorators, modifiers, asteriskToken, name, questionToken, Diagnostics.or_expected);
    end
    else {
        return parsePropertyDeclaration(fullStart, decorators, modifiers, name, questionToken);
    end
end
function parseNonParameterInitializer()
    return parseInitializer(false);
end
function parseAccessorDeclaration(kind, fullStart, decorators, modifiers)
    local node = createNode(kind, fullStart);
    node.decorators = decorators;
    setModifiers(node, modifiers);
    node.name = parsePropertyName();
    fillSignature(SyntaxKind.ColonToken, false, false, node);
    node.body = parseFunctionBlockOrSemicolon(false);
    return finishNode(node);
end
function isClassMemberModifier(idToken)
    switch (idToken) {
        case SyntaxKind.PublicKeyword:
        case SyntaxKind.PrivateKeyword:
        case SyntaxKind.ProtectedKeyword:
        case SyntaxKind.StaticKeyword:
            return true;
        default:
            return false;
    end
end
function isClassMemberStart()
    local idToken;
    if (token === SyntaxKind.AtToken) {
        return true;
    end
    // Eat up all modifiers, but hold on to the last one in case it is actually an identifier.
    while (isModifier(token)) {
        idToken = token;
        // If the idToken is a class modifier (protected, private, public, and static), it is
        // certain that we are starting to parse class member. This allows better error recovery
        // Example:
        //      public foo() ...     // true
        //      public @dec blah ... // true; we will then report an error later
        //      export public ...    // true; we will then report an error later
        if (isClassMemberModifier(idToken)) {
            return true;
        end
        nextToken();
    end
    if (token === SyntaxKind.AsteriskToken) {
        return true;
    end
    // Try to get the first property-like token following all modifiers.
    // This can either be an identifier or the 'get' or 'set' keywords.
    if (isLiteralPropertyName()) {
        idToken = token;
        nextToken();
    end
    // Index signatures and computed properties are class members; we can parse.
    if (token === SyntaxKind.OpenBracketToken) {
        return true;
    end
    // If we were able to get any potential identifier...
    if (idToken !== undefined) {
        // If we have a non-keyword identifier, or if we have an accessor, then it's safe to parse.
        if (!isKeyword(idToken) || idToken === SyntaxKind.SetKeyword || idToken === SyntaxKind.GetKeyword) {
            return true;
        end
        // If it *is* a keyword, but not an accessor, check a little farther along
        // to see if it should actually be parsed as a class member.
        switch (token) {
            case SyntaxKind.OpenParenToken: // Method declaration
            case SyntaxKind.LessThanToken: // Generic Method declaration
            case SyntaxKind.ColonToken: // Type Annotation for declaration
            case SyntaxKind.EqualsToken: // Initializer for declaration
            case SyntaxKind.QuestionToken:
                return true;
            default:
                // Covers
                //  - Semicolons     (declaration termination)
                //  - Closing braces (end-of-class, must be declaration)
                //  - End-of-files   (not valid, but permitted so that it gets caught later on)
                //  - Line-breaks    (enabling *automatic semicolon insertion*)
                return canParseSemicolon();
        end
    end
    return false;
end
function parseDecorators()
    local decorators;
    while (true) {
        local decoratorStart = getNodePos();
        if (!parseOptional(SyntaxKind.AtToken)) {
            break;
        end
        if (!decorators) {
            decorators = [];
            decorators.pos = scanner.getStartPos();
        end
        local decorator = createNode(SyntaxKind.Decorator, decoratorStart);
        decorator.expression = doInDecoratorContext(parseLeftHandSideExpressionOrHigher);
        decorators.push(finishNode(decorator));
    end
    if (decorators) {
        decorators.;
    end
    getNodeEnd();
end
return decorators;
function parseModifiers()
    local flags = 0;
    local modifiers;
    while (true) {
        local modifierStart = scanner.getStartPos();
        local modifierKind = token;
        if (!parseAnyContextualModifier()) {
            break;
        end
        if (!modifiers) {
            modifiers = [];
            modifiers.pos = modifierStart;
        end
        flags |= modifierToFlag(modifierKind);
        modifiers.push(finishNode(createNode(modifierKind, modifierStart)));
    end
    if (modifiers) {
        modifiers.flags = flags;
        modifiers.;
    end
    scanner.getStartPos();
end
return modifiers;
function parseClassElement()
    if (token === SyntaxKind.SemicolonToken) {
        local result = createNode(SyntaxKind.SemicolonClassElement);
        nextToken();
        return finishNode(result);
    end
    local fullStart = getNodePos();
    local decorators = parseDecorators();
    local modifiers = parseModifiers();
    local accessor = tryParseAccessorDeclaration(fullStart, decorators, modifiers);
    if (accessor) {
        return accessor;
    end
    if (token === SyntaxKind.ConstructorKeyword) {
        return parseConstructorDeclaration(fullStart, decorators, modifiers);
    end
    if (isIndexSignature()) {
        return parseIndexSignatureDeclaration(fullStart, decorators, modifiers);
    end
    // It is very important that we check this *after* checking indexers because
    // the [ token can start an index signature or a computed property name
    if (isIdentifierOrKeyword() ||
        token === SyntaxKind.StringLiteral ||
        token === SyntaxKind.NumericLiteral ||
        token === SyntaxKind.AsteriskToken ||
        token === SyntaxKind.OpenBracketToken) {
        return parsePropertyOrMethodDeclaration(fullStart, decorators, modifiers);
    end
    if (decorators) {
        // treat this as a property declaration with a missing name.
        local name_1 = createMissingNode(SyntaxKind.Identifier, true, Diagnostics.Declaration_expected);
        return parsePropertyDeclaration(fullStart, decorators, modifiers, name_1, undefined);
    end
    // 'isClassMemberStart' should have hinted not to attempt parsing.
    Debug.fail("Should not have attempted to parse class member declaration.");
end
function parseClassExpression()
    return parseClassDeclarationOrExpression(
    /*fullStart:*/ scanner.getStartPos(), 
    /*decorators:*/ undefined, 
    /*modifiers:*/ undefined, SyntaxKind.ClassExpression);
end
function parseClassDeclaration(fullStart, decorators, modifiers)
    return parseClassDeclarationOrExpression(fullStart, decorators, modifiers, SyntaxKind.ClassDeclaration);
end
function parseClassDeclarationOrExpression(fullStart, decorators, modifiers, kind)
    // In ES6 specification, All parts of a ClassDeclaration or a ClassExpression are strict mode code
    local savedStrictModeContext = inStrictModeContext();
    setStrictModeContext(true);
    local node = createNode(kind, fullStart);
    node.decorators = decorators;
    setModifiers(node, modifiers);
    parseExpected(SyntaxKind.ClassKeyword);
    node.name = parseOptionalIdentifier();
    node.typeParameters = parseTypeParameters();
    node.heritageClauses = parseHeritageClauses(true);
    if (parseExpected(SyntaxKind.OpenBraceToken)) {
        // ClassTail[Yield,GeneratorParameter] : See 14.5
        //      [~GeneratorParameter]ClassHeritage[?Yield]opt { ClassBody[?Yield]opt }
        //      [+GeneratorParameter] ClassHeritageopt { ClassBodyopt }
        node.members = inGeneratorParameterContext()
            ? doOutsideOfYieldContext(parseClassMembers)
            : parseClassMembers();
        parseExpected(SyntaxKind.CloseBraceToken);
    end
    else {
        node.members = createMissingList();
    end
    local finishedNode = finishNode(node);
    setStrictModeContext(savedStrictModeContext);
    return finishedNode;
end
function parseHeritageClauses(isClassHeritageClause)
    // ClassTail[Yield,GeneratorParameter] : See 14.5
    //      [~GeneratorParameter]ClassHeritage[?Yield]opt { ClassBody[?Yield]opt }
    //      [+GeneratorParameter] ClassHeritageopt { ClassBodyopt }
    if (isHeritageClause()) {
        return isClassHeritageClause && inGeneratorParameterContext()
            ? doOutsideOfYieldContext(parseHeritageClausesWorker)
            : parseHeritageClausesWorker();
    end
    return undefined;
end
function parseHeritageClausesWorker()
    return parseList(19 /* HeritageClauses */, false, parseHeritageClause);
end
function parseHeritageClause()
    if (token === SyntaxKind.ExtendsKeyword || token === SyntaxKind.ImplementsKeyword) {
        local node = createNode(SyntaxKind.HeritageClause);
        node.token = token;
        nextToken();
        node.types = parseDelimitedList(8 /* HeritageClauseElement */, parseExpressionWithTypeArguments);
        return finishNode(node);
    end
    return undefined;
end
function parseExpressionWithTypeArguments()
    local node = createNode(SyntaxKind.ExpressionWithTypeArguments);
    node.expression = parseLeftHandSideExpressionOrHigher();
    if (token === SyntaxKind.LessThanToken) {
        node.typeArguments = parseBracketedList(17 /* TypeArguments */, parseType, SyntaxKind.LessThanToken, SyntaxKind.GreaterThanToken);
    end
    return finishNode(node);
end
function isHeritageClause()
    return token === SyntaxKind.ExtendsKeyword || token === SyntaxKind.ImplementsKeyword;
end
function parseClassMembers()
    return parseList(6 /* ClassMembers */, false, parseClassElement);
end
function parseInterfaceDeclaration(fullStart, decorators, modifiers)
    local node = createNode(SyntaxKind.InterfaceDeclaration, fullStart);
    node.decorators = decorators;
    setModifiers(node, modifiers);
    parseExpected(SyntaxKind.InterfaceKeyword);
    node.name = parseIdentifier();
    node.typeParameters = parseTypeParameters();
    node.heritageClauses = parseHeritageClauses(false);
    node.members = parseObjectTypeMembers();
    return finishNode(node);
end
function parseTypeAliasDeclaration(fullStart, decorators, modifiers)
    local node = createNode(SyntaxKind.TypeAliasDeclaration, fullStart);
    node.decorators = decorators;
    setModifiers(node, modifiers);
    parseExpected(SyntaxKind.TypeKeyword);
    node.name = parseIdentifier();
    parseExpected(SyntaxKind.EqualsToken);
    node.type = parseType();
    parseSemicolon();
    return finishNode(node);
end
// In an ambient declaration, the grammar only allows integer literals as initializers.
// In a non-ambient declaration, the grammar allows uninitialized members only in a
// ConstantEnumMemberSection, which starts at the beginning of an enum declaration
// or any time an integer literal initializer is encountered.
function parseEnumMember()
    local node = createNode(SyntaxKind.EnumMember, scanner.getStartPos());
    node.name = parsePropertyName();
    node.initializer = allowInAnd(parseNonParameterInitializer);
    return finishNode(node);
end
function parseEnumDeclaration(fullStart, decorators, modifiers)
    local node = createNode(SyntaxKind.EnumDeclaration, fullStart);
    node.decorators = decorators;
    setModifiers(node, modifiers);
    parseExpected(SyntaxKind.EnumKeyword);
    node.name = parseIdentifier();
    if (parseExpected(SyntaxKind.OpenBraceToken)) {
        node.members = parseDelimitedList(7 /* EnumMembers */, parseEnumMember);
        parseExpected(SyntaxKind.CloseBraceToken);
    end
    else {
        node.members = createMissingList();
    end
    return finishNode(node);
end
function parseModuleBlock()
    local node = createNode(SyntaxKind.ModuleBlock, scanner.getStartPos());
    if (parseExpected(SyntaxKind.OpenBraceToken)) {
        node.statements = parseList(1 /* ModuleElements */, false, parseModuleElement);
        parseExpected(SyntaxKind.CloseBraceToken);
    end
    else {
        node.statements = createMissingList();
    end
    return finishNode(node);
end
function parseModuleOrNamespaceDeclaration(fullStart, decorators, modifiers, flags)
    local node = createNode(SyntaxKind.ModuleDeclaration, fullStart);
    node.decorators = decorators;
    setModifiers(node, modifiers);
    node.flags |= flags;
    node.name = parseIdentifier();
    node.body = parseOptional(SyntaxKind.DotToken)
        ? parseModuleOrNamespaceDeclaration(getNodePos(), undefined, undefined, NodeFlags.Export)
        : parseModuleBlock();
    return finishNode(node);
end
function parseAmbientExternalModuleDeclaration(fullStart, decorators, modifiers)
    local node = createNode(SyntaxKind.ModuleDeclaration, fullStart);
    node.decorators = decorators;
    setModifiers(node, modifiers);
    node.name = parseLiteralNode(true);
    node.body = parseModuleBlock();
    return finishNode(node);
end
function parseModuleDeclaration(fullStart, decorators, modifiers)
    local flags = modifiers ? modifiers.flags : 0;
    if (parseOptional(SyntaxKind.NamespaceKeyword)) {
        flags |= NodeFlags.Namespace;
    end
    else {
        parseExpected(SyntaxKind.ModuleKeyword);
        if (token === SyntaxKind.StringLiteral) {
            return parseAmbientExternalModuleDeclaration(fullStart, decorators, modifiers);
        end
    end
    return parseModuleOrNamespaceDeclaration(fullStart, decorators, modifiers, flags);
end
function isExternalModuleReference()
    return token === SyntaxKind.RequireKeyword &&
        lookAhead(nextTokenIsOpenParen);
end
function nextTokenIsOpenParen()
    return nextToken() === SyntaxKind.OpenParenToken;
end
function nextTokenIsCommaOrFromKeyword()
    nextToken();
    return token === SyntaxKind.CommaToken ||
        token === SyntaxKind.FromKeyword;
end
function parseImportDeclarationOrImportEqualsDeclaration(fullStart, decorators, modifiers)
    parseExpected(SyntaxKind.ImportKeyword);
    local afterImportPos = scanner.getStartPos();
    local identifier;
    if (isIdentifier()) {
        identifier = parseIdentifier();
        if (token !== SyntaxKind.CommaToken && token !== SyntaxKind.FromKeyword) {
            // ImportEquals declaration of type:
            // import x = require("mod"); or
            // import x = M.x;
            local importEqualsDeclaration = createNode(SyntaxKind.ImportEqualsDeclaration, fullStart);
            importEqualsDeclaration.decorators = decorators;
            setModifiers(importEqualsDeclaration, modifiers);
            importEqualsDeclaration.name = identifier;
            parseExpected(SyntaxKind.EqualsToken);
            importEqualsDeclaration.moduleReference = parseModuleReference();
            parseSemicolon();
            return finishNode(importEqualsDeclaration);
        end
    end
    // Import statement
    local importDeclaration = createNode(SyntaxKind.ImportDeclaration, fullStart);
    importDeclaration.decorators = decorators;
    setModifiers(importDeclaration, modifiers);
    // ImportDeclaration:
    //  import ImportClause from ModuleSpecifier ;
    //  import ModuleSpecifier;
    if (identifier ||
        token === SyntaxKind.AsteriskToken ||
        token === SyntaxKind.OpenBraceToken) {
        importDeclaration.importClause = parseImportClause(identifier, afterImportPos);
        parseExpected(SyntaxKind.FromKeyword);
    end
    importDeclaration.moduleSpecifier = parseModuleSpecifier();
    parseSemicolon();
    return finishNode(importDeclaration);
end
function parseImportClause(identifier, fullStart)
    //ImportClause:
    //  ImportedDefaultBinding
    //  NameSpaceImport
    //  NamedImports
    //  ImportedDefaultBinding, NameSpaceImport
    //  ImportedDefaultBinding, NamedImports
    local importClause = createNode(SyntaxKind.ImportClause, fullStart);
    if (identifier) {
        // ImportedDefaultBinding:
        //  ImportedBinding
        importClause.name = identifier;
    end
    // If there was no default import or if there is comma token after default import
    // parse namespace or named imports
    if (!importClause.name ||
        parseOptional(SyntaxKind.CommaToken)) {
        importClause.namedBindings = token === SyntaxKind.AsteriskToken ? parseNamespaceImport() : parseNamedImportsOrExports(SyntaxKind.NamedImports);
    end
    return finishNode(importClause);
end
function parseModuleReference()
    return isExternalModuleReference()
        ? parseExternalModuleReference()
        : parseEntityName(false);
end
function parseExternalModuleReference()
    local node = createNode(SyntaxKind.ExternalModuleReference);
    parseExpected(SyntaxKind.RequireKeyword);
    parseExpected(SyntaxKind.OpenParenToken);
    node.expression = parseModuleSpecifier();
    parseExpected(SyntaxKind.CloseParenToken);
    return finishNode(node);
end
function parseModuleSpecifier()
    // We allow arbitrary expressions here, even though the grammar only allows string
    // literals.  We check to ensure that it is only a string literal later in the grammar
    // walker.
    local result = parseExpression();
    // Ensure the string being required is in our 'identifier' table.  This will ensure
    // that features like 'find refs' will look inside this file when search for its name.
    if (result.kind === SyntaxKind.StringLiteral) {
        internIdentifier(result.text);
    end
    return result;
end
function parseNamespaceImport()
    // NameSpaceImport:
    //  * as ImportedBinding
    local namespaceImport = createNode(SyntaxKind.NamespaceImport);
    parseExpected(SyntaxKind.AsteriskToken);
    parseExpected(SyntaxKind.AsKeyword);
    namespaceImport.name = parseIdentifier();
    return finishNode(namespaceImport);
end
function parseNamedImportsOrExports(kind)
    local node = createNode(kind);
    // NamedImports:
    //  { }
    //  { ImportsList }
    //  { ImportsList, }
    // ImportsList:
    //  ImportSpecifier
    //  ImportsList, ImportSpecifier
    node.elements = parseBracketedList(20 /* ImportOrExportSpecifiers */, kind === SyntaxKind.NamedImports ? parseImportSpecifier : parseExportSpecifier, SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken);
    return finishNode(node);
end
function parseExportSpecifier()
    return parseImportOrExportSpecifier(SyntaxKind.ExportSpecifier);
end
function parseImportSpecifier()
    return parseImportOrExportSpecifier(SyntaxKind.ImportSpecifier);
end
function parseImportOrExportSpecifier(kind)
    local node = createNode(kind);
    // ImportSpecifier:
    //   BindingIdentifier
    //   IdentifierName as BindingIdentifier
    // ExportSpecififer:
    //   IdentifierName
    //   IdentifierName as IdentifierName
    local checkIdentifierIsKeyword = isKeyword(token) && !isIdentifier();
    local checkIdentifierStart = scanner.getTokenPos();
    local checkIdentifierEnd = scanner.getTextPos();
    local identifierName = parseIdentifierName();
    if (token === SyntaxKind.AsKeyword) {
        node.propertyName = identifierName;
        parseExpected(SyntaxKind.AsKeyword);
        checkIdentifierIsKeyword = isKeyword(token) && !isIdentifier();
        checkIdentifierStart = scanner.getTokenPos();
        checkIdentifierEnd = scanner.getTextPos();
        node.name = parseIdentifierName();
    end
    else {
        node.name = identifierName;
    end
    if (kind === SyntaxKind.ImportSpecifier && checkIdentifierIsKeyword) {
        // Report error identifier expected
        parseErrorAtPosition(checkIdentifierStart, checkIdentifierEnd - checkIdentifierStart, Diagnostics.Identifier_expected);
    end
    return finishNode(node);
end
function parseExportDeclaration(fullStart, decorators, modifiers)
    local node = createNode(SyntaxKind.ExportDeclaration, fullStart);
    node.decorators = decorators;
    setModifiers(node, modifiers);
    if (parseOptional(SyntaxKind.AsteriskToken)) {
        parseExpected(SyntaxKind.FromKeyword);
        node.moduleSpecifier = parseModuleSpecifier();
    end
    else {
        node.exportClause = parseNamedImportsOrExports(SyntaxKind.NamedExports);
        if (parseOptional(SyntaxKind.FromKeyword)) {
            node.moduleSpecifier = parseModuleSpecifier();
        end
    end
    parseSemicolon();
    return finishNode(node);
end
function parseExportAssignment(fullStart, decorators, modifiers)
    local node = createNode(SyntaxKind.ExportAssignment, fullStart);
    node.decorators = decorators;
    setModifiers(node, modifiers);
    if (parseOptional(SyntaxKind.EqualsToken)) {
        node.isExportEquals = true;
    end
    else {
        parseExpected(SyntaxKind.DefaultKeyword);
    end
    node.expression = parseAssignmentExpressionOrHigher();
    parseSemicolon();
    return finishNode(node);
end
function isLetDeclaration()
    // It is let declaration if in strict mode or next token is identifier\open bracket\open curly on same line.
    // otherwise it needs to be treated like identifier
    return inStrictModeContext() || lookAhead(nextTokenIsIdentifierOrStartOfDestructuringOnTheSameLine);
end
function isDeclarationStart(followsModifier)
    switch (token) {
        case SyntaxKind.VarKeyword:
        case SyntaxKind.ConstKeyword:
        case SyntaxKind.FunctionKeyword:
            return true;
        case SyntaxKind.LetKeyword:
            return isLetDeclaration();
        case SyntaxKind.ClassKeyword:
        case SyntaxKind.InterfaceKeyword:
        case SyntaxKind.EnumKeyword:
        case SyntaxKind.TypeKeyword:
            // Not true keywords so ensure an identifier follows
            return lookAhead(nextTokenIsIdentifierOrKeyword);
        case SyntaxKind.ImportKeyword:
            // Not true keywords so ensure an identifier follows or is string literal or asterisk or open brace
            return lookAhead(nextTokenCanFollowImportKeyword);
        case SyntaxKind.ModuleKeyword:
        case SyntaxKind.NamespaceKeyword:
            // Not a true keyword so ensure an identifier or string literal follows
            return lookAhead(nextTokenIsIdentifierOrKeywordOrStringLiteral);
        case SyntaxKind.ExportKeyword:
            // Check for export assignment or modifier on source element
            return lookAhead(nextTokenCanFollowExportKeyword);
        case SyntaxKind.DeclareKeyword:
        case SyntaxKind.PublicKeyword:
        case SyntaxKind.PrivateKeyword:
        case SyntaxKind.ProtectedKeyword:
        case SyntaxKind.StaticKeyword:
            // Check for modifier on source element
            return lookAhead(nextTokenIsDeclarationStart);
        case SyntaxKind.AtToken:
            // a lookahead here is too costly, and decorators are only valid on a declaration. 
            // We will assume we are parsing a declaration here and report an error later
            return !followsModifier;
    end
end
function isIdentifierOrKeyword()
    return token >= SyntaxKind.Identifier;
end
function nextTokenIsIdentifierOrKeyword()
    nextToken();
    return isIdentifierOrKeyword();
end
function nextTokenIsIdentifierOrKeywordOrStringLiteral()
    nextToken();
    return isIdentifierOrKeyword() || token === SyntaxKind.StringLiteral;
end
function nextTokenCanFollowImportKeyword()
    nextToken();
    return isIdentifierOrKeyword() || token === SyntaxKind.StringLiteral ||
        token === SyntaxKind.AsteriskToken || token === SyntaxKind.OpenBraceToken;
end
function nextTokenCanFollowExportKeyword()
    nextToken();
    return token === SyntaxKind.EqualsToken || token === SyntaxKind.AsteriskToken ||
        token === SyntaxKind.OpenBraceToken || token === SyntaxKind.DefaultKeyword || isDeclarationStart(true);
end
function nextTokenIsDeclarationStart()
    nextToken();
    return isDeclarationStart(true);
end
function nextTokenIsAsKeyword()
    return nextToken() === SyntaxKind.AsKeyword;
end
function parseDeclaration()
    local fullStart = getNodePos();
    local decorators = parseDecorators();
    local modifiers = parseModifiers();
    if (token === SyntaxKind.ExportKeyword) {
        nextToken();
        if (token === SyntaxKind.DefaultKeyword || token === SyntaxKind.EqualsToken) {
            return parseExportAssignment(fullStart, decorators, modifiers);
        end
        if (token === SyntaxKind.AsteriskToken || token === SyntaxKind.OpenBraceToken) {
            return parseExportDeclaration(fullStart, decorators, modifiers);
        end
    end
    switch (token) {
        case SyntaxKind.VarKeyword:
        case SyntaxKind.LetKeyword:
        case SyntaxKind.ConstKeyword:
            return parseVariableStatement(fullStart, decorators, modifiers);
        case SyntaxKind.FunctionKeyword:
            return parseFunctionDeclaration(fullStart, decorators, modifiers);
        case SyntaxKind.ClassKeyword:
            return parseClassDeclaration(fullStart, decorators, modifiers);
        case SyntaxKind.InterfaceKeyword:
            return parseInterfaceDeclaration(fullStart, decorators, modifiers);
        case SyntaxKind.TypeKeyword:
            return parseTypeAliasDeclaration(fullStart, decorators, modifiers);
        case SyntaxKind.EnumKeyword:
            return parseEnumDeclaration(fullStart, decorators, modifiers);
        case SyntaxKind.ModuleKeyword:
        case SyntaxKind.NamespaceKeyword:
            return parseModuleDeclaration(fullStart, decorators, modifiers);
        case SyntaxKind.ImportKeyword:
            return parseImportDeclarationOrImportEqualsDeclaration(fullStart, decorators, modifiers);
        default:
            if (decorators) {
                // We reached this point because we encountered an AtToken and assumed a declaration would
                // follow. For recovery and error reporting purposes, return an incomplete declaration.                        
                local node = createMissingNode(SyntaxKind.MissingDeclaration, true, Diagnostics.Declaration_expected);
                node.pos = fullStart;
                node.decorators = decorators;
                setModifiers(node, modifiers);
                return finishNode(node);
            end
            Debug.fail("Mismatch between isDeclarationStart and parseDeclaration");
    end
end
function isSourceElement(inErrorRecovery)
    return isDeclarationStart() || isStartOfStatement(inErrorRecovery);
end
function parseSourceElement()
    return parseSourceElementOrModuleElement();
end
function parseModuleElement()
    return parseSourceElementOrModuleElement();
end
function parseSourceElementOrModuleElement()
    return isDeclarationStart()
        ? parseDeclaration()
        : parseStatement();
end
function processReferenceComments(sourceFile)
    local triviaScanner = createScanner(sourceFile.languageVersion, false, sourceText);
    local referencedFiles = [];
    local amdDependencies = [];
    local amdModuleName;
    // Keep scanning all the leading trivia in the file until we get to something that
    // isn't trivia.  Any single line comment will be analyzed to see if it is a
    // reference comment.
    while (true) {
        local kind = triviaScanner.scan();
        if (kind === SyntaxKind.WhitespaceTrivia || kind === SyntaxKind.NewLineTrivia || kind === SyntaxKind.MultiLineCommentTrivia) {
            continue;
        end
        if (kind !== SyntaxKind.SingleLineCommentTrivia) {
            break;
        end
        local range = { pos: triviaScanner.getTokenPos() }, triviaScanner_1 = void 0, getTextPos = (), kind = ();
    end
    ;
    local comment = sourceText.substring(range.pos, range.);
end
;
local referencePathMatchResult = getFileReferenceFromReferencePath(comment, range);
if (referencePathMatchResult) {
    local fileReference = referencePathMatchResult.fileReference;
    sourceFile.hasNoDefaultLib = referencePathMatchResult.isNoDefaultLib;
    local diagnosticMessage = referencePathMatchResult.diagnosticMessage;
    if (fileReference) {
        referencedFiles.push(fileReference);
    end
    if (diagnosticMessage) {
        sourceFile.parseDiagnostics.push(createFileDiagnostic(sourceFile, range.pos, range.));
    end
    -range.pos, diagnosticMessage;
    ;
end
{
    local amdModuleNameRegEx = /^\/\/\/\s*<amd-module\s+name\s*=\s*('|")(.+?)\1/gim;
    local amdModuleNameMatchResult = amdModuleNameRegEx.exec(comment);
    if (amdModuleNameMatchResult) {
        if (amdModuleName) {
            sourceFile.parseDiagnostics.push(createFileDiagnostic(sourceFile, range.pos, range.));
        end
        -range.pos, Diagnostics.An_AMD_module_cannot_have_multiple_name_assignments;
        ;
    end
    amdModuleName = amdModuleNameMatchResult[2];
end
local amdDependencyRegEx = /^\/\/\/\s*<amd-dependency\s/gim;
local pathRegex = /\spath\s*=\s*('|")(.+?)\1/gim;
local nameRegex = /\sname\s*=\s*('|")(.+?)\1/gim;
local amdDependencyMatchResult = amdDependencyRegEx.exec(comment);
if (amdDependencyMatchResult) {
    local pathMatchResult = pathRegex.exec(comment);
    local nameMatchResult = nameRegex.exec(comment);
    if (pathMatchResult) {
        local amdDependency = { path: pathMatchResult[2], name: nameMatchResult ? nameMatchResult[2] : undefined };
        amdDependencies.push(amdDependency);
    end
end
sourceFile.referencedFiles = referencedFiles;
sourceFile.amdDependencies = amdDependencies;
sourceFile.amdModuleName = amdModuleName;
function setExternalModuleIndicator(sourceFile)
    sourceFile.externalModuleIndicator = forEach(sourceFile.statements, function (node) {
        return node.flags & NodeFlags.Export
            || node.kind === SyntaxKind.ImportEqualsDeclaration && node.moduleReference.kind === SyntaxKind.ExternalModuleReference
            || node.kind === SyntaxKind.ImportDeclaration
            || node.kind === SyntaxKind.ExportAssignment
            || node.kind === SyntaxKind.ExportDeclaration
            ? node
            : undefined;
    });
end
local ParsingContext;
(function (ParsingContext) {
    ParsingContext[ParsingContext["SourceElements"] = 0] = "SourceElements";
    ParsingContext[ParsingContext["ModuleElements"] = 1] = "ModuleElements";
    ParsingContext[ParsingContext["BlockStatements"] = 2] = "BlockStatements";
    ParsingContext[ParsingContext["SwitchClauses"] = 3] = "SwitchClauses";
    ParsingContext[ParsingContext["SwitchClauseStatements"] = 4] = "SwitchClauseStatements";
    ParsingContext[ParsingContext["TypeMembers"] = 5] = "TypeMembers";
    ParsingContext[ParsingContext["ClassMembers"] = 6] = "ClassMembers";
    ParsingContext[ParsingContext["EnumMembers"] = 7] = "EnumMembers";
    ParsingContext[ParsingContext["HeritageClauseElement"] = 8] = "HeritageClauseElement";
    ParsingContext[ParsingContext["VariableDeclarations"] = 9] = "VariableDeclarations";
    ParsingContext[ParsingContext["ObjectBindingElements"] = 10] = "ObjectBindingElements";
    ParsingContext[ParsingContext["ArrayBindingElements"] = 11] = "ArrayBindingElements";
    ParsingContext[ParsingContext["ArgumentExpressions"] = 12] = "ArgumentExpressions";
    ParsingContext[ParsingContext["ObjectLiteralMembers"] = 13] = "ObjectLiteralMembers";
    ParsingContext[ParsingContext["ArrayLiteralMembers"] = 14] = "ArrayLiteralMembers";
    ParsingContext[ParsingContext["Parameters"] = 15] = "Parameters";
    ParsingContext[ParsingContext["TypeParameters"] = 16] = "TypeParameters";
    ParsingContext[ParsingContext["TypeArguments"] = 17] = "TypeArguments";
    ParsingContext[ParsingContext["TupleElementTypes"] = 18] = "TupleElementTypes";
    ParsingContext[ParsingContext["HeritageClauses"] = 19] = "HeritageClauses";
    ParsingContext[ParsingContext["ImportOrExportSpecifiers"] = 20] = "ImportOrExportSpecifiers";
    ParsingContext[ParsingContext["Count"] = 21] = "Count"; // Number of parsing contexts
end)(ParsingContext || (ParsingContext = {}));
local Tristate;
(function (Tristate) {
    Tristate[Tristate["False"] = 0] = "False";
    Tristate[Tristate["True"] = 1] = "True";
    Tristate[Tristate["Unknown"] = 2] = "Unknown";
end)(Tristate || (Tristate = {}));
local IncrementalParser;
(function (IncrementalParser) {
    function updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks)
        aggressiveChecks = aggressiveChecks || Debug.shouldAssert(AssertionLevel.Aggressive);
        checkChangeRange(sourceFile, newText, textChangeRange, aggressiveChecks);
        if (textChangeRangeIsUnchanged(textChangeRange)) {
            // if the text didn't change, then we can just return our current source file as-is.
            return sourceFile;
        end
        if (sourceFile.statements.length === 0) {
            // If we don't have any statements in the current source file, then there's no real
            // way to incrementally parse.  So just do a full parse instead.
            return Parser.parseSourceFile(sourceFile.fileName, newText, sourceFile.languageVersion, undefined, true);
        end
        // Make sure we're not trying to incrementally update a source file more than once.  Once
        // we do an update the original source file is considered unusbale from that point onwards.
        //
        // This is because we do incremental parsing in-place.  i.e. we take nodes from the old
        // tree and give them new positions and parents.  From that point on, trusting the old
        // tree at all is not possible as far too much of it may violate invariants.
        local incrementalSourceFile = sourceFile;
        Debug.assert(!incrementalSourceFile.hasBeenIncrementallyParsed);
        incrementalSourceFile.hasBeenIncrementallyParsed = true;
        local oldText = sourceFile.text;
        local syntaxCursor = createSyntaxCursor(sourceFile);
        // Make the actual change larger so that we know to reparse anything whose lookahead
        // might have intersected the change.
        local changeRange = extendToAffectedRange(sourceFile, textChangeRange);
        checkChangeRange(sourceFile, newText, changeRange, aggressiveChecks);
        // Ensure that extending the affected range only moved the start of the change range
        // earlier in the file.
        Debug.assert(changeRange.span.start <= textChangeRange.span.start);
        Debug.assert(textSpanEnd(changeRange.span) === textSpanEnd(textChangeRange.span));
        Debug.assert(textSpanEnd(textChangeRangeNewSpan(changeRange)) === textSpanEnd(textChangeRangeNewSpan(textChangeRange)));
        // The is the amount the nodes after the edit range need to be adjusted.  It can be
        // positive (if the edit added characters), negative (if the edit deleted characters)
        // or zero (if this was a pure overwrite with nothing added/removed).
        local delta = textChangeRangeNewSpan(changeRange).length - changeRange.span.length;
        // If we added or removed characters during the edit, then we need to go and adjust all
        // the nodes after the edit.  Those nodes may move forward (if we inserted chars) or they
        // may move backward (if we deleted chars).
        //
        // Doing this helps us out in two ways.  First, it means that any nodes/tokens we want
        // to reuse are already at the appropriate position in the new text.  That way when we
        // reuse them, we don't have to figure out if they need to be adjusted.  Second, it makes
        // it very easy to determine if we can reuse a node.  If the node's position is at where
        // we are in the text, then we can reuse it.  Otherwise we can't.  If the node's position
        // is ahead of us, then we'll need to rescan tokens.  If the node's position is behind
        // us, then we'll need to skip it or crumble it as appropriate
        //
        // We will also adjust the positions of nodes that intersect the change range as well.
        // By doing this, we ensure that all the positions in the old tree are consistent, not
        // just the positions of nodes entirely before/after the change range.  By being
        // consistent, we can then easily map from positions to nodes in the old tree easily.
        //
        // Also, mark any syntax elements that intersect the changed span.  We know, up front,
        // that we cannot reuse these elements.
        updateTokenPositionsAndMarkElements(incrementalSourceFile, changeRange.span.start, textSpanEnd(changeRange.span), textSpanEnd(textChangeRangeNewSpan(changeRange)), delta, oldText, newText, aggressiveChecks);
        // Now that we've set up our internal incremental state just proceed and parse the
        // source file in the normal fashion.  When possible the parser will retrieve and
        // reuse nodes from the old tree.
        //
        // Note: passing in 'true' for setNodeParents is very important.  When incrementally
        // parsing, we will be reusing nodes from the old tree, and placing it into new
        // parents.  If we don't set the parents now, we'll end up with an observably
        // inconsistent tree.  Setting the parents on the new tree should be very fast.  We
        // will immediately bail out of walking any subtrees when we can see that their parents
        // are already correct.
        local result = Parser.parseSourceFile(sourceFile.fileName, newText, sourceFile.languageVersion, syntaxCursor, true);
        return result;
    end
    IncrementalParser.updateSourceFile = updateSourceFile;
    function moveElementEntirelyPastChangeRange(element, isArray, delta, oldText, newText, aggressiveChecks)
        if (isArray) {
            visitArray(element);
        end
        else {
            visitNode(element);
        end
        return;
        function visitNode(node)
            if (aggressiveChecks && shouldCheckNode(node)) {
                local text = oldText.substring(node.pos, node.);
            end
            ;
        end
        // Ditch any existing LS children we may have created.  This way we can avoid
        // moving them forward.
        node._children = undefined;
        node.pos += delta;
        node.;
    end
    delta;
    if (aggressiveChecks && shouldCheckNode(node)) {
        Debug.assert(text === newText.substring(node.pos, node.));
    end
    ;
end)(IncrementalParser || (IncrementalParser = {}));
forEachChild(node, visitNode, visitArray);
checkNodePositions(node, aggressiveChecks);
function visitArray(array)
    array._children = undefined;
    array.pos += delta;
    array.;
end
delta;
for (local _i = 0; _i < array.length; _i++) {
    local node = array[_i];
    visitNode(node);
}
function shouldCheckNode(node)
    switch (node.kind) {
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.Identifier:
            return true;
    end
    return false;
end
function adjustIntersectingElement(element, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta)
    Debug.assert(element.);
end
 >= changeStart, "Adjusting an element that was entirely before the change range";
;
Debug.assert(element.pos <= changeRangeOldEnd, "Adjusting an element that was entirely after the change range");
Debug.assert(element.pos <= element.);
// We have an element that intersects the change range in some way.  It may have its
// start, or its end (or both) in the changed range.  We want to adjust any part
// that intersects such that the final tree is in a consistent state.  i.e. all
// chlidren have spans within the span of their parent, and all siblings are ordered
// properly.
// We may need to update both the 'pos' and the 'end' of the element.
// If the 'pos' is before the start of the change, then we don't need to touch it.
// If it isn't, then the 'pos' must be inside the change.  How we update it will
// depend if delta is  positive or negative.  If delta is positive then we have
// something like:
//
//  -------------------AAA-----------------
//  -------------------BBBCCCCCCC-----------------
//
// In this case, we consider any node that started in the change range to still be
// starting at the same position.
//
// however, if the delta is negative, then we instead have something like this:
//
//  -------------------XXXYYYYYYY-----------------
//  -------------------ZZZ-----------------
//
// In this case, any element that started in the 'X' range will keep its position.
// However any element htat started after that will have their pos adjusted to be
// at the end of the new range.  i.e. any node that started in the 'Y' range will
// be adjusted to have their start at the end of the 'Z' range.
//
// The element will keep its position if possible.  Or Move backward to the new-end
// if it's in the 'Y' range.
element.pos = Math.min(element.pos, changeRangeNewEnd);
// If the 'end' is after the change range, then we always adjust it by the delta
// amount.  However, if the end is in the change range, then how we adjust it
// will depend on if delta is  positive or negative.  If delta is positive then we
// have something like:
//
//  -------------------AAA-----------------
//  -------------------BBBCCCCCCC-----------------
//
// In this case, we consider any node that ended inside the change range to keep its
// end position.
//
// however, if the delta is negative, then we instead have something like this:
//
//  -------------------XXXYYYYYYY-----------------
//  -------------------ZZZ-----------------
//
// In this case, any element that ended in the 'X' range will keep its position.
// However any element htat ended after that will have their pos adjusted to be
// at the end of the new range.  i.e. any node that ended in the 'Y' range will
// be adjusted to have their end at the end of the 'Z' range.
if (element.)
    ;
 >= changeRangeOldEnd;
{
    // Element ends after the change range.  Always adjust the end pos.
    element.;
end
delta;
{
    // Element ends in the change range.  The element will keep its position if
    // possible. Or Move backward to the new-end if it's in the 'Y' range.
    element.;
end
Math.min(element., , changeRangeNewEnd);
Debug.assert(element.pos <= element.);
if (element.parent) {
    Debug.assert(element.pos >= element.parent.pos);
    Debug.assert(element.);
end
 <= element.parent.;
;
function checkNodePositions(node, aggressiveChecks)
    if (aggressiveChecks) {
        local pos = node.pos;
        forEachChild(node, function (child)
            Debug.assert(child.pos >= pos);
            pos = child.;
        end);
    end
    ;
    Debug.assert(pos <= node.);
end
;
function updateTokenPositionsAndMarkElements(sourceFile, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta, oldText, newText, aggressiveChecks)
    visitNode(sourceFile);
    return;
    function visitNode(child)
        Debug.assert(child.pos <= child.);
    end
    ;
    if (child.pos > changeRangeOldEnd) {
        // Node is entirely past the change range.  We need to move both its pos and
        // end, forward or backward appropriately.
        moveElementEntirelyPastChangeRange(child, false, delta, oldText, newText, aggressiveChecks);
        return;
    end
    // Check if the element intersects the change range.  If it does, then it is not
    // reusable.  Also, we'll need to recurse to see what constituent portions we may
    // be able to use.
    local fullEnd = child.;
end
;
if (fullEnd >= changeStart) {
    child.intersectsChange = true;
    child._children = undefined;
    // Adjust the pos or end (or both) of the intersecting element accordingly.
    adjustIntersectingElement(child, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta);
    forEachChild(child, visitNode, visitArray);
    checkNodePositions(child, aggressiveChecks);
    return;
end
// Otherwise, the node is entirely before the change range.  No need to do anything with it.
Debug.assert(fullEnd < changeStart);
function visitArray(array)
    Debug.assert(array.pos <= array.);
end
;
if (array.pos > changeRangeOldEnd) {
    // Array is entirely after the change range.  We need to move it, and move any of
    // its children.
    moveElementEntirelyPastChangeRange(array, true, delta, oldText, newText, aggressiveChecks);
    return;
end
// Check if the element intersects the change range.  If it does, then it is not
// reusable.  Also, we'll need to recurse to see what constituent portions we may
// be able to use.
local fullEnd = array.;
;
if (fullEnd >= changeStart) {
    array.intersectsChange = true;
    array._children = undefined;
    // Adjust the pos or end (or both) of the intersecting array accordingly.
    adjustIntersectingElement(array, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta);
    for (local _a = 0; _a < array.length; _a++) {
        local node = array[_a];
        visitNode(node);
    }
    return;
end
// Otherwise, the array is entirely before the change range.  No need to do anything with it.
Debug.assert(fullEnd < changeStart);
function extendToAffectedRange(sourceFile, changeRange)
    // Consider the following code:
    //      void foo() { /; }
    //
    // If the text changes with an insertion of / just before the semicolon then we end up with:
    //      void foo() { //; }
    //
    // If we were to just use the changeRange a is, then we would not rescan the { token
    // (as it does not intersect the actual original change range).  Because an edit may
    // change the token touching it, we actually need to look back *at least* one token so
    // that the prior token sees that change.
    local maxLookahead = 1;
    local start = changeRange.span.start;
    // the first iteration aligns us with the change start. subsequent iteration move us to
    // the left by maxLookahead tokens.  We only need to do this as long as we're not at the
    // start of the tree.
    for (var i = 0; start > 0 && i <= maxLookahead; i++) {
        local nearestNode = findNearestNodeStartingBeforeOrAtPosition(sourceFile, start);
        Debug.assert(nearestNode.pos <= start);
        local position = nearestNode.pos;
        start = Math.max(0, position - 1);
    end
    local finalSpan = createTextSpanFromBounds(start, textSpanEnd(changeRange.span));
    local finalLength = changeRange.newLength + (changeRange.span.start - start);
    return createTextChangeRange(finalSpan, finalLength);
end
function findNearestNodeStartingBeforeOrAtPosition(sourceFile, position)
    local bestResult = sourceFile;
    local lastNodeEntirelyBeforePosition;
    forEachChild(sourceFile, visit);
    if (lastNodeEntirelyBeforePosition) {
        local lastChildOfLastEntireNodeBeforePosition = getLastChild(lastNodeEntirelyBeforePosition);
        if (lastChildOfLastEntireNodeBeforePosition.pos > bestResult.pos) {
            bestResult = lastChildOfLastEntireNodeBeforePosition;
        end
    end
    return bestResult;
    function getLastChild(node)
        while (true) {
            local lastChild = getLastChildWorker(node);
            if (lastChild) {
                node = lastChild;
            end
            else {
                return node;
            end
        end
    end
    function getLastChildWorker(node)
        local last = undefined;
        forEachChild(node, function (child)
            if (nodeIsPresent(child)) {
                last = child;
            end
        end);
        return last;
    end
    function visit(child)
        if (nodeIsMissing(child)) {
            // Missing nodes are effectively invisible to us.  We never even consider them
            // When trying to find the nearest node before us.
            return;
        end
        // If the child intersects this position, then this node is currently the nearest
        // node that starts before the position.
        if (child.pos <= position) {
            if (child.pos >= bestResult.pos) {
                // This node starts before the position, and is closer to the position than
                // the previous best node we found.  It is now the new best node.
                bestResult = child;
            end
            // Now, the node may overlap the position, or it may end entirely before the
            // position.  If it overlaps with the position, then either it, or one of its
            // children must be the nearest node before the position.  So we can just
            // recurse into this child to see if we can find something better.
            if (position < child.)
                ;
        end
        {
            // The nearest node is either this child, or one of the children inside
            // of it.  We've already marked this child as the best so far.  Recurse
            // in case one of the children is better.
            forEachChild(child, visit);
            // Once we look at the children of this node, then there's no need to
            // continue any further.
            return true;
        end
        {
            Debug.assert(child.);
        end
         <= position;
        ;
        // The child ends entirely before this position.  Say you have the following
        // (where $ is the position)
        //
        //      <complex expr 1> ? <complex expr 2> $ : <...> <...>
        //
        // We would want to find the nearest preceding node in "complex expr 2".
        // To support that, we keep track of this node, and once we're done searching
        // for a best node, we recurse down this node to see if we can find a good
        // result in it.
        //
        // This approach allows us to quickly skip over nodes that are entirely
        // before the position, while still allowing us to find any nodes in the
        // last one that might be what we want.
        lastNodeEntirelyBeforePosition = child;
    end
end
{
    Debug.assert(child.pos > position);
    // We're now at a node that is entirely past the position we're searching for.
    // This node (and all following nodes) could never contribute to the result,
    // so just skip them by returning 'true' here.
    return true;
end
function checkChangeRange(sourceFile, newText, textChangeRange, aggressiveChecks)
    local oldText = sourceFile.text;
    if (textChangeRange) {
        Debug.assert((oldText.length - textChangeRange.span.length + textChangeRange.newLength) === newText.length);
        if (aggressiveChecks || Debug.shouldAssert(AssertionLevel.VeryAggressive)) {
            local oldTextPrefix = oldText.substr(0, textChangeRange.span.start);
            local newTextPrefix = newText.substr(0, textChangeRange.span.start);
            Debug.assert(oldTextPrefix === newTextPrefix);
            local oldTextSuffix = oldText.substring(textSpanEnd(textChangeRange.span), oldText.length);
            local newTextSuffix = newText.substring(textSpanEnd(textChangeRangeNewSpan(textChangeRange)), newText.length);
            Debug.assert(oldTextSuffix === newTextSuffix);
        end
    end
end
function createSyntaxCursor(sourceFile)
    local currentArray = sourceFile.statements;
    local currentArrayIndex = 0;
    Debug.assert(currentArrayIndex < currentArray.length);
    local current = currentArray[currentArrayIndex];
    local lastQueriedPosition = -1 /* Value */;
    return {
        currentNode: function (position)
            // Only compute the current node if the position is different than the last time
            // we were asked.  The parser commonly asks for the node at the same position
            // twice.  Once to know if can read an appropriate list element at a certain point,
            // and then to actually read and consume the node.
            if (position !== lastQueriedPosition) {
                // Much of the time the parser will need the very next node in the array that
                // we just returned a node from.So just simply check for that case and move
                // forward in the array instead of searching for the node again.
                if (current && current.)
                    ;
            end
             === position && currentArrayIndex < (currentArray.length - 1);
            {
                currentArrayIndex++;
                current = currentArray[currentArrayIndex];
            end
            // If we don't have a node, or the node we have isn't in the right position,
            // then try to find a viable node at the position requested.
            if (!current || current.pos !== position) {
                findHighestListElementThatStartsAtPosition(position);
            end
        end,
        // Cache this query so that we don't do any extra work if the parser calls back
        // into us.  Note: this is very common as the parser will make pairs of calls like
        // 'isListElement -> parseListElement'.  If we were unable to find a node when
        // called with 'isListElement', we don't want to redo the work when parseListElement
        // is called immediately after.
        lastQueriedPosition:  = position,
        // Either we don'd have a node, or we have a node at the position being asked for.
        Debug: .assert(!current || current.pos === position),
        return: function () end, current: 
    };
end
;
// Finds the highest element in the tree we can find that starts at the provided position.
// The element must be a direct child of some node list in the tree.  This way after we
// return it, we can easily return its next sibling in the list.
function findHighestListElementThatStartsAtPosition(position)
    // Clear out any cached state about the last node we found.
    currentArray = undefined;
    currentArrayIndex = -1 /* Value */;
    current = undefined;
    // Recurse into the source file to find the highest node at this position.
    forEachChild(sourceFile, visitNode, visitArray);
    return;
    function visitNode(node)
        if (position >= node.pos && position < node.)
            ;
    end
    {
        // Position was within this node.  Keep searching deeper to find the node.
        forEachChild(node, visitNode, visitArray);
        // don't procede any futher in the search.
        return true;
    end
    // position wasn't in this node, have to keep searching.
    return false;
end
function visitArray(array)
    if (position >= array.pos && position < array.)
        ;
end
{
    // position was in this array.  Search through this array to see if we find a
    // viable element.
    for (var i = 0, n = array.length; i < n; i++) {
        local child = array[i];
        if (child) {
            if (child.pos === position) {
                // Found the right node.  We're done.
                currentArray = array;
                currentArrayIndex = i;
                current = child;
                return true;
            end
            else {
                if (child.pos < position && position < child.)
                    ;
            end
            {
                // Position in somewhere within this child.  Search in it and
                // stop searching in this array.
                forEachChild(child, visitNode, visitArray);
                return true;
            end
        end
    end
end
// position wasn't in this array, have to keep searching.
return false;
local InvalidPosition;
(function (InvalidPosition) {
    InvalidPosition[InvalidPosition["Value"] = -1] = "Value";
end)(InvalidPosition || (InvalidPosition = {}));
//# sourceMappingURL=file:///C:/Users/qujianbiao/Downloads/TypeScript-master/built/local/compiler/parser.js.map