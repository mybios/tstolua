/// <reference path="binder.ts" />
/* @internal */
local ts;
(function (ts) {
    function getDeclarationOfKind(symbol, kind)
        local declarations = symbol.declarations;
        for (local _i = 0; _i < declarations.length; _i++) {
            local declaration = declarations[_i];
            if (declaration.kind === kind) {
                return declaration;
            end
        }
        return undefined;
    end
    ts.getDeclarationOfKind = getDeclarationOfKind;
    // Pool writers to avoid needing to allocate them for every symbol we write.
    local stringWriters = [];
    function getSingleLineStringWriter()
        if (stringWriters.length == 0) {
            local str = "";
            local writeText = function (text) { return str += text; };
            return {
                string: function () { return str; },
                writeKeyword: writeText,
                writeOperator: writeText,
                writePunctuation: writeText,
                writeSpace: writeText,
                writeStringLiteral: writeText,
                writeParameter: writeText,
                writeSymbol: writeText,
                // Completely ignore indentation for string writers.  And map newlines to
                // a single space.
                writeLine: function () { return str += " "; },
                increaseIndent: function () end,
                decreaseIndent: function () end,
                clear: function () { return str = ""; },
                trackSymbol: function () end
            };
        end
        return stringWriters.pop();
    end
    ts.getSingleLineStringWriter = getSingleLineStringWriter;
    function releaseStringWriter(writer)
        writer.clear();
        stringWriters.push(writer);
    end
    ts.releaseStringWriter = releaseStringWriter;
    function getFullWidth(node)
        return node.;
    end
    ts.getFullWidth = getFullWidth;
    -node.pos;
end)(ts || (ts = {}));
// Returns true if this node contains a parse error anywhere underneath it.
function containsParseError(node)
    aggregateChildData(node);
    return (node.parserContextFlags & ParserContextFlags.ThisNodeOrAnySubNodesHasError) !== 0;
end
exports.containsParseError = containsParseError;
function aggregateChildData(node)
    if (!(node.parserContextFlags & ParserContextFlags.HasAggregatedChildData)) {
        // A node is considered to contain a parse error if:
        //  a) the parser explicitly marked that it had an error
        //  b) any of it's children reported that it had an error.
        local thisNodeOrAnySubNodesHasError = ((node.parserContextFlags & ParserContextFlags.ThisNodeHasError) !== 0) ||
            forEachChild(node, containsParseError);
        // If so, mark ourselves accordingly. 
        if (thisNodeOrAnySubNodesHasError) {
            node.parserContextFlags |= ParserContextFlags.ThisNodeOrAnySubNodesHasError;
        end
        // Also mark that we've propogated the child information to this node.  This way we can
        // always consult the bit directly on this node without needing to check its children
        // again.
        node.parserContextFlags |= ParserContextFlags.HasAggregatedChildData;
    end
end
function getSourceFileOfNode(node)
    while (node && node.kind !== SyntaxKind.SourceFile) {
        node = node.parent;
    end
    return node;
end
exports.getSourceFileOfNode = getSourceFileOfNode;
function getStartPositionOfLine(line, sourceFile)
    Debug.assert(line >= 0);
    return getLineStarts(sourceFile)[line];
end
exports.getStartPositionOfLine = getStartPositionOfLine;
// This is a useful function for debugging purposes.
function nodePosToString(node)
    local file = getSourceFileOfNode(node);
    local loc = getLineAndCharacterOfPosition(file, node.pos);
    return file.fileName + "(" + (loc.line + 1) + "," + (loc.character + 1) + ")";
end
exports.nodePosToString = nodePosToString;
function getStartPosOfNode(node)
    return node.pos;
end
exports.getStartPosOfNode = getStartPosOfNode;
// Returns true if this node is missing from the actual source code.  'missing' is different
// from 'undefined/defined'.  When a node is undefined (which can happen for optional nodes
// in the tree), it is definitel missing.  HOwever, a node may be defined, but still be 
// missing.  This happens whenever the parser knows it needs to parse something, but can't
// get anything in the source code that it expects at that location.  For example:
//
//          let a: ;
//
// Here, the Type in the Type-Annotation is not-optional (as there is a colon in the source 
// code).  So the parser will attempt to parse out a type, and will create an actual node.
// However, this node will be 'missing' in the sense that no actual source-code/tokens are
// contained within it.
function nodeIsMissing(node)
    if (!node) {
        return true;
    end
    return node.pos === node.;
end
exports.nodeIsMissing = nodeIsMissing;
 && node.kind !== SyntaxKind.EndOfFileToken;
function nodeIsPresent(node)
    return !nodeIsMissing(node);
end
exports.nodeIsPresent = nodeIsPresent;
function getTokenPosOfNode(node, sourceFile)
    // With nodes that have no width (i.e. 'Missing' nodes), we actually *don't*
    // want to skip trivia because this will launch us forward to the next token.
    if (nodeIsMissing(node)) {
        return node.pos;
    end
    return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos);
end
exports.getTokenPosOfNode = getTokenPosOfNode;
function getNonDecoratorTokenPosOfNode(node, sourceFile)
    if (nodeIsMissing(node) || !node.decorators) {
        return getTokenPosOfNode(node, sourceFile);
    end
    return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.decorators.);
end
exports.getNonDecoratorTokenPosOfNode = getNonDecoratorTokenPosOfNode;
;
function getSourceTextOfNodeFromSourceFile(sourceFile, node)
    if (nodeIsMissing(node)) {
        return "";
    end
    local text = sourceFile.text;
    return text.substring(skipTrivia(text, node.pos), node.);
end
exports.getSourceTextOfNodeFromSourceFile = getSourceTextOfNodeFromSourceFile;
;
function getTextOfNodeFromSourceText(sourceText, node)
    if (nodeIsMissing(node)) {
        return "";
    end
    return sourceText.substring(skipTrivia(sourceText, node.pos), node.);
end
exports.getTextOfNodeFromSourceText = getTextOfNodeFromSourceText;
;
function getTextOfNode(node)
    return getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node);
end
exports.getTextOfNode = getTextOfNode;
// Add an extra underscore to identifiers that start with two underscores to avoid issues with magic names like '__proto__'
function escapeIdentifier(identifier)
    return identifier.length >= 2 && identifier.charCodeAt(0) === CharacterCodes._ && identifier.charCodeAt(1) === CharacterCodes._ ? "_" + identifier : identifier;
end
exports.escapeIdentifier = escapeIdentifier;
// Remove extra underscore from escaped identifier
function unescapeIdentifier(identifier)
    return identifier.length >= 3 && identifier.charCodeAt(0) === CharacterCodes._ && identifier.charCodeAt(1) === CharacterCodes._ && identifier.charCodeAt(2) === CharacterCodes._ ? identifier.substr(1) : identifier;
end
exports.unescapeIdentifier = unescapeIdentifier;
// Make an identifier from an external module name by extracting the string after the last "/" and replacing
// all non-alphanumeric characters with underscores
function makeIdentifierFromModuleName(moduleName)
    return getBaseFileName(moduleName).replace(/\W/g, "_");
end
exports.makeIdentifierFromModuleName = makeIdentifierFromModuleName;
function isBlockOrCatchScoped(declaration)
    return (getCombinedNodeFlags(declaration) & NodeFlags.BlockScoped) !== 0 ||
        isCatchClauseVariableDeclaration(declaration);
end
exports.isBlockOrCatchScoped = isBlockOrCatchScoped;
// Gets the nearest enclosing block scope container that has the provided node 
// as a descendant, that is not the provided node.
function getEnclosingBlockScopeContainer(node)
    local current = node.parent;
    while (current) {
        if (isFunctionLike(current)) {
            return current;
        end
        switch (current.kind) {
            case SyntaxKind.SourceFile:
            case SyntaxKind.CaseBlock:
            case SyntaxKind.CatchClause:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
                return current;
            case SyntaxKind.Block:
                // function block is not considered block-scope container
                // see comment in binder.ts: bind(...), case for SyntaxKind.Block
                if (!isFunctionLike(current.parent)) {
                    return current;
                end
        end
        current = current.parent;
    end
end
exports.getEnclosingBlockScopeContainer = getEnclosingBlockScopeContainer;
function isCatchClauseVariableDeclaration(declaration)
    return declaration &&
        declaration.kind === SyntaxKind.VariableDeclaration &&
        declaration.parent &&
        declaration.parent.kind === SyntaxKind.CatchClause;
end
exports.isCatchClauseVariableDeclaration = isCatchClauseVariableDeclaration;
// Return display name of an identifier
// Computed property names will just be emitted as "[<expr>]", where <expr> is the source
// text of the expression in the computed property.
function declarationNameToString(name)
    return getFullWidth(name) === 0 ? "(Missing)" : getTextOfNode(name);
end
exports.declarationNameToString = declarationNameToString;
function createDiagnosticForNode(node, message, arg0, arg1, arg2)
    local sourceFile = getSourceFileOfNode(node);
    local span = getErrorSpanForNode(sourceFile, node);
    return createFileDiagnostic(sourceFile, span.start, span.length, message, arg0, arg1, arg2);
end
exports.createDiagnosticForNode = createDiagnosticForNode;
function createDiagnosticForNodeFromMessageChain(node, messageChain)
    local sourceFile = getSourceFileOfNode(node);
    local span = getErrorSpanForNode(sourceFile, node);
    return {
        file: sourceFile,
        start: span.start,
        length: span.length,
        code: messageChain.code,
        category: messageChain.category,
        messageText: messageChain.next ? messageChain : messageChain.messageText
    };
end
exports.createDiagnosticForNodeFromMessageChain = createDiagnosticForNodeFromMessageChain;
function getSpanOfTokenAtPosition(sourceFile, pos)
    local scanner = createScanner(sourceFile.languageVersion, true, sourceFile.text, undefined, pos);
    scanner.scan();
    local start = scanner.getTokenPos();
    return createTextSpanFromBounds(start, scanner.getTextPos());
end
exports.getSpanOfTokenAtPosition = getSpanOfTokenAtPosition;
function getErrorSpanForNode(sourceFile, node)
    local errorNode = node;
    switch (node.kind) {
        case SyntaxKind.SourceFile:
            local pos_1 = skipTrivia(sourceFile.text, 0, false);
            if (pos_1 === sourceFile.text.length) {
                // file is empty - return span for the beginning of the file
                return createTextSpan(0, 0);
            end
            return getSpanOfTokenAtPosition(sourceFile, pos_1);
        // This list is a work in progress. Add missing node kinds to improve their error
        // spans.
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.BindingElement:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.EnumMember:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
            errorNode = node.name;
            break;
    end
    if (errorNode === undefined) {
        // If we don't have a better node, then just set the error on the first token of 
        // construct.
        return getSpanOfTokenAtPosition(sourceFile, node.pos);
    end
    local pos = nodeIsMissing(errorNode)
        ? errorNode.pos
        : skipTrivia(sourceFile.text, errorNode.pos);
    return createTextSpanFromBounds(pos, errorNode.);
end
exports.getErrorSpanForNode = getErrorSpanForNode;
;
function isExternalModule(file)
    return file.externalModuleIndicator !== undefined;
end
exports.isExternalModule = isExternalModule;
function isDeclarationFile(file)
    return (file.flags & NodeFlags.DeclarationFile) !== 0;
end
exports.isDeclarationFile = isDeclarationFile;
function isConstEnumDeclaration(node)
    return node.kind === SyntaxKind.EnumDeclaration && isConst(node);
end
exports.isConstEnumDeclaration = isConstEnumDeclaration;
function walkUpBindingElementsAndPatterns(node)
    while (node && (node.kind === SyntaxKind.BindingElement || isBindingPattern(node))) {
        node = node.parent;
    end
    return node;
end
// Returns the node flags for this node and all relevant parent nodes.  This is done so that 
// nodes like variable declarations and binding elements can returned a view of their flags
// that includes the modifiers from their container.  i.e. flags like export/declare aren't
// stored on the variable declaration directly, but on the containing variable statement 
// (if it has one).  Similarly, flags for let/const are store on the variable declaration
// list.  By calling this function, all those flags are combined so that the client can treat
// the node as if it actually had those flags.
function getCombinedNodeFlags(node)
    node = walkUpBindingElementsAndPatterns(node);
    local flags = node.flags;
    if (node.kind === SyntaxKind.VariableDeclaration) {
        node = node.parent;
    end
    if (node && node.kind === SyntaxKind.VariableDeclarationList) {
        flags |= node.flags;
        node = node.parent;
    end
    if (node && node.kind === SyntaxKind.VariableStatement) {
        flags |= node.flags;
    end
    return flags;
end
exports.getCombinedNodeFlags = getCombinedNodeFlags;
function isConst(node)
    return !!(getCombinedNodeFlags(node) & NodeFlags.Const);
end
exports.isConst = isConst;
function isLet(node)
    return !!(getCombinedNodeFlags(node) & NodeFlags.Let);
end
exports.isLet = isLet;
function isPrologueDirective(node)
    return node.kind === SyntaxKind.ExpressionStatement && node.expression.kind === SyntaxKind.StringLiteral;
end
exports.isPrologueDirective = isPrologueDirective;
function getLeadingCommentRangesOfNode(node, sourceFileOfNode)
    // If parameter/type parameter, the prev token trailing comments are part of this node too
    if (node.kind === SyntaxKind.Parameter || node.kind === SyntaxKind.TypeParameter) {
        // e.g.   (/** blah */ a, /** blah */ b);
        // e.g.:     (
        //            /** blah */ a,
        //            /** blah */ b);
        return concatenate(getTrailingCommentRanges(sourceFileOfNode.text, node.pos), getLeadingCommentRanges(sourceFileOfNode.text, node.pos));
    end
    else {
        return getLeadingCommentRanges(sourceFileOfNode.text, node.pos);
    end
end
exports.getLeadingCommentRangesOfNode = getLeadingCommentRangesOfNode;
function getJsDocComments(node, sourceFileOfNode)
    return filter(getLeadingCommentRangesOfNode(node, sourceFileOfNode), isJsDocComment);
    function isJsDocComment(comment)
        // True if the comment starts with '/**' but not if it is '/**/'
        return sourceFileOfNode.text.charCodeAt(comment.pos + 1) === CharacterCodes.asterisk &&
            sourceFileOfNode.text.charCodeAt(comment.pos + 2) === CharacterCodes.asterisk &&
            sourceFileOfNode.text.charCodeAt(comment.pos + 3) !== CharacterCodes.slash;
    end
end
exports.getJsDocComments = getJsDocComments;
exports.fullTripleSlashReferencePathRegEx = /^(\/\/\/\s*<reference\s+path\s*=\s*)('|")(.+?)\2.*?\/>/;
// Warning: This has the same semantics as the forEach family of functions,
//          in that traversal terminates in the event that 'visitor' supplies a truthy value.
function forEachReturnStatement(body, visitor)
    return traverse(body);
    function traverse(node)
        switch (node.kind) {
            case SyntaxKind.ReturnStatement:
                return visitor(node);
            case SyntaxKind.CaseBlock:
            case SyntaxKind.Block:
            case SyntaxKind.IfStatement:
            case SyntaxKind.DoStatement:
            case SyntaxKind.WhileStatement:
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.WithStatement:
            case SyntaxKind.SwitchStatement:
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
            case SyntaxKind.LabeledStatement:
            case SyntaxKind.TryStatement:
            case SyntaxKind.CatchClause:
                return forEachChild(node, traverse);
        end
    end
end
exports.forEachReturnStatement = forEachReturnStatement;
function isVariableLike(node)
    if (node) {
        switch (node.kind) {
            case SyntaxKind.BindingElement:
            case SyntaxKind.EnumMember:
            case SyntaxKind.Parameter:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.VariableDeclaration:
                return true;
        end
    end
    return false;
end
exports.isVariableLike = isVariableLike;
function isAccessor(node)
    if (node) {
        switch (node.kind) {
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return true;
        end
    end
    return false;
end
exports.isAccessor = isAccessor;
function isFunctionLike(node)
    if (node) {
        switch (node.kind) {
            case SyntaxKind.Constructor:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
                return true;
        end
    end
    return false;
end
exports.isFunctionLike = isFunctionLike;
function isFunctionBlock(node)
    return node && node.kind === SyntaxKind.Block && isFunctionLike(node.parent);
end
exports.isFunctionBlock = isFunctionBlock;
function isObjectLiteralMethod(node)
    return node && node.kind === SyntaxKind.MethodDeclaration && node.parent.kind === SyntaxKind.ObjectLiteralExpression;
end
exports.isObjectLiteralMethod = isObjectLiteralMethod;
function getContainingFunction(node)
    while (true) {
        node = node.parent;
        if (!node || isFunctionLike(node)) {
            return node;
        end
    end
end
exports.getContainingFunction = getContainingFunction;
function getThisContainer(node, includeArrowFunctions)
    while (true) {
        node = node.parent;
        if (!node) {
            return undefined;
        end
        switch (node.kind) {
            case SyntaxKind.ComputedPropertyName:
                // If the grandparent node is an object literal (as opposed to a class),
                // then the computed property is not a 'this' container.
                // A computed property name in a class needs to be a this container
                // so that we can error on it.
                if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
                    return node;
                end
                // If this is a computed property, then the parent should not
                // make it a this container. The parent might be a property
                // in an object literal, like a method or accessor. But in order for
                // such a parent to be a this container, the reference must be in
                // the *body* of the container.
                node = node.parent;
                break;
            case SyntaxKind.Decorator:
                // Decorators are always applied outside of the body of a class or method. 
                if (node.parent.kind === SyntaxKind.Parameter && isClassElement(node.parent.parent)) {
                    // If the decorator's parent is a Parameter, we resolve the this container from
                    // the grandparent class declaration.
                    node = node.parent.parent;
                end
                else if (isClassElement(node.parent)) {
                    // If the decorator's parent is a class element, we resolve the 'this' container
                    // from the parent class declaration.
                    node = node.parent;
                end
                break;
            case SyntaxKind.ArrowFunction:
                if (!includeArrowFunctions) {
                    continue;
                end
            // Fall through
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.SourceFile:
                return node;
        end
    end
end
exports.getThisContainer = getThisContainer;
function getSuperContainer(node, includeFunctions)
    while (true) {
        node = node.parent;
        if (!node)
            return node;
        switch (node.kind) {
            case SyntaxKind.ComputedPropertyName:
                // If the grandparent node is an object literal (as opposed to a class),
                // then the computed property is not a 'super' container.
                // A computed property name in a class needs to be a super container
                // so that we can error on it.
                if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
                    return node;
                end
                // If this is a computed property, then the parent should not
                // make it a super container. The parent might be a property
                // in an object literal, like a method or accessor. But in order for
                // such a parent to be a super container, the reference must be in
                // the *body* of the container.
                node = node.parent;
                break;
            case SyntaxKind.Decorator:
                // Decorators are always applied outside of the body of a class or method. 
                if (node.parent.kind === SyntaxKind.Parameter && isClassElement(node.parent.parent)) {
                    // If the decorator's parent is a Parameter, we resolve the this container from
                    // the grandparent class declaration.
                    node = node.parent.parent;
                end
                else if (isClassElement(node.parent)) {
                    // If the decorator's parent is a class element, we resolve the 'this' container
                    // from the parent class declaration.
                    node = node.parent;
                end
                break;
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                if (!includeFunctions) {
                    continue;
                end
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return node;
        end
    end
end
exports.getSuperContainer = getSuperContainer;
function getInvokedExpression(node)
    if (node.kind === SyntaxKind.TaggedTemplateExpression) {
        return node.tag;
    end
    // Will either be a CallExpression or NewExpression.
    return node.expression;
end
exports.getInvokedExpression = getInvokedExpression;
function nodeCanBeDecorated(node)
    switch (node.kind) {
        case SyntaxKind.ClassDeclaration:
            // classes are valid targets
            return true;
        case SyntaxKind.PropertyDeclaration:
            // property declarations are valid if their parent is a class declaration.
            return node.parent.kind === SyntaxKind.ClassDeclaration;
        case SyntaxKind.Parameter:
            // if the parameter's parent has a body and its grandparent is a class declaration, this is a valid target;
            return node.parent.body && node.parent.parent.kind === SyntaxKind.ClassDeclaration;
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.MethodDeclaration:
            // if this method has a body and its parent is a class declaration, this is a valid target.
            return node.body && node.parent.kind === SyntaxKind.ClassDeclaration;
    end
    return false;
end
exports.nodeCanBeDecorated = nodeCanBeDecorated;
function nodeIsDecorated(node)
    switch (node.kind) {
        case SyntaxKind.ClassDeclaration:
            if (node.decorators) {
                return true;
            end
            return false;
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.Parameter:
            if (node.decorators) {
                return true;
            end
            return false;
        case SyntaxKind.GetAccessor:
            if (node.body && node.decorators) {
                return true;
            end
            return false;
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.SetAccessor:
            if (node.body && node.decorators) {
                return true;
            end
            return false;
    end
    return false;
end
exports.nodeIsDecorated = nodeIsDecorated;
function childIsDecorated(node)
    switch (node.kind) {
        case SyntaxKind.ClassDeclaration:
            return forEach(node.members, nodeOrChildIsDecorated);
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.SetAccessor:
            return forEach(node.parameters, nodeIsDecorated);
    end
    return false;
end
exports.childIsDecorated = childIsDecorated;
function nodeOrChildIsDecorated(node)
    return nodeIsDecorated(node) || childIsDecorated(node);
end
exports.nodeOrChildIsDecorated = nodeOrChildIsDecorated;
function isExpression(node)
    switch (node.kind) {
        case SyntaxKind.ThisKeyword:
        case SyntaxKind.SuperKeyword:
        case SyntaxKind.NullKeyword:
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.FalseKeyword:
        case SyntaxKind.RegularExpressionLiteral:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:
        case SyntaxKind.TaggedTemplateExpression:
        case SyntaxKind.TypeAssertionExpression:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.VoidExpression:
        case SyntaxKind.DeleteExpression:
        case SyntaxKind.TypeOfExpression:
        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.PostfixUnaryExpression:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.ConditionalExpression:
        case SyntaxKind.SpreadElementExpression:
        case SyntaxKind.TemplateExpression:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.OmittedExpression:
            return true;
        case SyntaxKind.QualifiedName:
            while (node.parent.kind === SyntaxKind.QualifiedName) {
                node = node.parent;
            end
            return node.parent.kind === SyntaxKind.TypeQuery;
        case SyntaxKind.Identifier:
            if (node.parent.kind === SyntaxKind.TypeQuery) {
                return true;
            end
        // fall through
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.StringLiteral:
            local parent_1 = node.parent;
            switch (parent_1.kind) {
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.Parameter:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.EnumMember:
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.BindingElement:
                    return parent_1.initializer === node;
                case SyntaxKind.ExpressionStatement:
                case SyntaxKind.IfStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.WithStatement:
                case SyntaxKind.SwitchStatement:
                case SyntaxKind.CaseClause:
                case SyntaxKind.ThrowStatement:
                case SyntaxKind.SwitchStatement:
                    return parent_1.expression === node;
                case SyntaxKind.ForStatement:
                    local forStatement = parent_1;
                    return (forStatement.initializer === node && forStatement.initializer.kind !== SyntaxKind.VariableDeclarationList) ||
                        forStatement.condition === node ||
                        forStatement.incrementor === node;
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                    local forInStatement = parent_1;
                    return (forInStatement.initializer === node && forInStatement.initializer.kind !== SyntaxKind.VariableDeclarationList) ||
                        forInStatement.expression === node;
                case SyntaxKind.TypeAssertionExpression:
                    return node === parent_1.expression;
                case SyntaxKind.TemplateSpan:
                    return node === parent_1.expression;
                case SyntaxKind.ComputedPropertyName:
                    return node === parent_1.expression;
                case SyntaxKind.Decorator:
                    return true;
                default:
                    if (isExpression(parent_1)) {
                        return true;
                    end
            end
    end
    return false;
end
exports.isExpression = isExpression;
function isInstantiatedModule(node, preserveConstEnums)
    local moduleState = getModuleInstanceState(node);
    return moduleState === ModuleInstanceState.Instantiated ||
        (preserveConstEnums && moduleState === ModuleInstanceState.ConstEnumOnly);
end
exports.isInstantiatedModule = isInstantiatedModule;
function isExternalModuleImportEqualsDeclaration(node)
    return node.kind === SyntaxKind.ImportEqualsDeclaration && node.moduleReference.kind === SyntaxKind.ExternalModuleReference;
end
exports.isExternalModuleImportEqualsDeclaration = isExternalModuleImportEqualsDeclaration;
function getExternalModuleImportEqualsDeclarationExpression(node)
    Debug.assert(isExternalModuleImportEqualsDeclaration(node));
    return node.moduleReference.expression;
end
exports.getExternalModuleImportEqualsDeclarationExpression = getExternalModuleImportEqualsDeclarationExpression;
function isInternalModuleImportEqualsDeclaration(node)
    return node.kind === SyntaxKind.ImportEqualsDeclaration && node.moduleReference.kind !== SyntaxKind.ExternalModuleReference;
end
exports.isInternalModuleImportEqualsDeclaration = isInternalModuleImportEqualsDeclaration;
function getExternalModuleName(node)
    if (node.kind === SyntaxKind.ImportDeclaration) {
        return node.moduleSpecifier;
    end
    if (node.kind === SyntaxKind.ImportEqualsDeclaration) {
        local reference = node.moduleReference;
        if (reference.kind === SyntaxKind.ExternalModuleReference) {
            return reference.expression;
        end
    end
    if (node.kind === SyntaxKind.ExportDeclaration) {
        return node.moduleSpecifier;
    end
end
exports.getExternalModuleName = getExternalModuleName;
function hasDotDotDotToken(node)
    return node && node.kind === SyntaxKind.Parameter && node.dotDotDotToken !== undefined;
end
exports.hasDotDotDotToken = hasDotDotDotToken;
function hasQuestionToken(node)
    if (node) {
        switch (node.kind) {
            case SyntaxKind.Parameter:
                return node.questionToken !== undefined;
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
                return node.questionToken !== undefined;
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
                return node.questionToken !== undefined;
        end
    end
    return false;
end
exports.hasQuestionToken = hasQuestionToken;
function hasRestParameters(s)
    return s.parameters.length > 0 && lastOrUndefined(s.parameters).dotDotDotToken !== undefined;
end
exports.hasRestParameters = hasRestParameters;
function isLiteralKind(kind)
    return SyntaxKind.FirstLiteralToken <= kind && kind <= SyntaxKind.LastLiteralToken;
end
exports.isLiteralKind = isLiteralKind;
function isTextualLiteralKind(kind)
    return kind === SyntaxKind.StringLiteral || kind === SyntaxKind.NoSubstitutionTemplateLiteral;
end
exports.isTextualLiteralKind = isTextualLiteralKind;
function isTemplateLiteralKind(kind)
    return SyntaxKind.FirstTemplateToken <= kind && kind <= SyntaxKind.LastTemplateToken;
end
exports.isTemplateLiteralKind = isTemplateLiteralKind;
function isBindingPattern(node)
    return !!node && (node.kind === SyntaxKind.ArrayBindingPattern || node.kind === SyntaxKind.ObjectBindingPattern);
end
exports.isBindingPattern = isBindingPattern;
function isInAmbientContext(node)
    while (node) {
        if (node.flags & (NodeFlags.Ambient | NodeFlags.DeclarationFile)) {
            return true;
        end
        node = node.parent;
    end
    return false;
end
exports.isInAmbientContext = isInAmbientContext;
function isDeclaration(node)
    switch (node.kind) {
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.BindingElement:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.Constructor:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.EnumMember:
        case SyntaxKind.ExportSpecifier:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.ImportClause:
        case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.ImportSpecifier:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.NamespaceImport:
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.ShorthandPropertyAssignment:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.TypeParameter:
        case SyntaxKind.VariableDeclaration:
            return true;
    end
    return false;
end
exports.isDeclaration = isDeclaration;
function isStatement(n)
    switch (n.kind) {
        case SyntaxKind.BreakStatement:
        case SyntaxKind.ContinueStatement:
        case SyntaxKind.DebuggerStatement:
        case SyntaxKind.DoStatement:
        case SyntaxKind.ExpressionStatement:
        case SyntaxKind.EmptyStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
        case SyntaxKind.ForStatement:
        case SyntaxKind.IfStatement:
        case SyntaxKind.LabeledStatement:
        case SyntaxKind.ReturnStatement:
        case SyntaxKind.SwitchStatement:
        case SyntaxKind.ThrowKeyword:
        case SyntaxKind.TryStatement:
        case SyntaxKind.VariableStatement:
        case SyntaxKind.WhileStatement:
        case SyntaxKind.WithStatement:
        case SyntaxKind.ExportAssignment:
            return true;
        default:
            return false;
    end
end
exports.isStatement = isStatement;
function isClassElement(n)
    switch (n.kind) {
        case SyntaxKind.Constructor:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.IndexSignature:
            return true;
        default:
            return false;
    end
end
exports.isClassElement = isClassElement;
// True if the given identifier, string literal, or number literal is the name of a declaration node
function isDeclarationName(name)
    if (name.kind !== SyntaxKind.Identifier && name.kind !== SyntaxKind.StringLiteral && name.kind !== SyntaxKind.NumericLiteral) {
        return false;
    end
    local parent = name.parent;
    if (parent.kind === SyntaxKind.ImportSpecifier || parent.kind === SyntaxKind.ExportSpecifier) {
        if (parent.propertyName) {
            return true;
        end
    end
    if (isDeclaration(parent)) {
        return parent.name === name;
    end
    return false;
end
exports.isDeclarationName = isDeclarationName;
// An alias symbol is created by one of the following declarations:
// import <symbol> = ...
// import <symbol> from ...
// import * as <symbol> from ...
// import { x as <symbol> } from ...
// export { x as <symbol> } from ...
// export = ...
// export default ...
function isAliasSymbolDeclaration(node)
    return node.kind === SyntaxKind.ImportEqualsDeclaration ||
        node.kind === SyntaxKind.ImportClause && !!node.name ||
        node.kind === SyntaxKind.NamespaceImport ||
        node.kind === SyntaxKind.ImportSpecifier ||
        node.kind === SyntaxKind.ExportSpecifier ||
        node.kind === SyntaxKind.ExportAssignment && node.expression.kind === SyntaxKind.Identifier;
end
exports.isAliasSymbolDeclaration = isAliasSymbolDeclaration;
function getClassExtendsHeritageClauseElement(node)
    local heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ExtendsKeyword);
    return heritageClause && heritageClause.types.length > 0 ? heritageClause.types[0] : undefined;
end
exports.getClassExtendsHeritageClauseElement = getClassExtendsHeritageClauseElement;
function getClassImplementsHeritageClauseElements(node)
    local heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ImplementsKeyword);
    return heritageClause ? heritageClause.types : undefined;
end
exports.getClassImplementsHeritageClauseElements = getClassImplementsHeritageClauseElements;
function getInterfaceBaseTypeNodes(node)
    local heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ExtendsKeyword);
    return heritageClause ? heritageClause.types : undefined;
end
exports.getInterfaceBaseTypeNodes = getInterfaceBaseTypeNodes;
function getHeritageClause(clauses, kind)
    if (clauses) {
        for (local _i = 0; _i < clauses.length; _i++) {
            local clause = clauses[_i];
            if (clause.token === kind) {
                return clause;
            end
        }
    end
    return undefined;
end
exports.getHeritageClause = getHeritageClause;
function tryResolveScriptReference(host, sourceFile, reference)
    if (!host.getCompilerOptions().noResolve) {
        local referenceFileName = isRootedDiskPath(reference.fileName) ? reference.fileName : combinePaths(getDirectoryPath(sourceFile.fileName), reference.fileName);
        referenceFileName = getNormalizedAbsolutePath(referenceFileName, host.getCurrentDirectory());
        return host.getSourceFile(referenceFileName);
    end
end
exports.tryResolveScriptReference = tryResolveScriptReference;
function getAncestor(node, kind)
    while (node) {
        if (node.kind === kind) {
            return node;
        end
        node = node.parent;
    end
    return undefined;
end
exports.getAncestor = getAncestor;
function getFileReferenceFromReferencePath(comment, commentRange)
    local simpleReferenceRegEx = /^\/\/\/\s*<reference\s+/gim;
    local isNoDefaultLibRegEx = /^(\/\/\/\s*<reference\s+no-default-lib\s*=\s*)('|")(.+?)\2\s*\/>/gim;
    if (simpleReferenceRegEx.exec(comment)) {
        if (isNoDefaultLibRegEx.exec(comment)) {
            return {
                isNoDefaultLib: true
            };
        end
        else {
            local matchResult = exports.fullTripleSlashReferencePathRegEx.exec(comment);
            if (matchResult) {
                local start = commentRange.pos;
                let;
            end
            commentRange.;
        end
        ;
        return {
            fileReference: {
                pos: start
            } },
            fileName;
        matchResult[3];
    end
    isNoDefaultLib: false;
end
exports.getFileReferenceFromReferencePath = getFileReferenceFromReferencePath;
;
{
    return {
        diagnosticMessage: Diagnostics.Invalid_reference_directive_syntax,
        isNoDefaultLib: false
    };
end
return undefined;
function isKeyword(token)
    return SyntaxKind.FirstKeyword <= token && token <= SyntaxKind.LastKeyword;
end
exports.isKeyword = isKeyword;
function isTrivia(token)
    return SyntaxKind.FirstTriviaToken <= token && token <= SyntaxKind.LastTriviaToken;
end
exports.isTrivia = isTrivia;
/**
 * A declaration has a dynamic name if both of the following are true:
 *   1. The declaration has a computed property name
 *   2. The computed name is *not* expressed as Symbol.<name>, where name
 *      is a property of the Symbol constructor that denotes a built in
 *      Symbol.
 */
function hasDynamicName(declaration)
    return declaration.name &&
        declaration.name.kind === SyntaxKind.ComputedPropertyName &&
        !isWellKnownSymbolSyntactically(declaration.name.expression);
end
exports.hasDynamicName = hasDynamicName;
/**
 * Checks if the expression is of the form:
 *    Symbol.name
 * where Symbol is literally the word "Symbol", and name is any identifierName
 */
function isWellKnownSymbolSyntactically(node)
    return node.kind === SyntaxKind.PropertyAccessExpression && isESSymbolIdentifier(node.expression);
end
exports.isWellKnownSymbolSyntactically = isWellKnownSymbolSyntactically;
function getPropertyNameForPropertyNameNode(name)
    if (name.kind === SyntaxKind.Identifier || name.kind === SyntaxKind.StringLiteral || name.kind === SyntaxKind.NumericLiteral) {
        return name.text;
    end
    if (name.kind === SyntaxKind.ComputedPropertyName) {
        local nameExpression = name.expression;
        if (isWellKnownSymbolSyntactically(nameExpression)) {
            local rightHandSideName = nameExpression.name.text;
            return getPropertyNameForKnownSymbolName(rightHandSideName);
        end
    end
    return undefined;
end
exports.getPropertyNameForPropertyNameNode = getPropertyNameForPropertyNameNode;
function getPropertyNameForKnownSymbolName(symbolName)
    return "__@" + symbolName;
end
exports.getPropertyNameForKnownSymbolName = getPropertyNameForKnownSymbolName;
/**
 * Includes the word "Symbol" with unicode escapes
 */
function isESSymbolIdentifier(node)
    return node.kind === SyntaxKind.Identifier && node.text === "Symbol";
end
exports.isESSymbolIdentifier = isESSymbolIdentifier;
function isModifier(token)
    switch (token) {
        case SyntaxKind.PublicKeyword:
        case SyntaxKind.PrivateKeyword:
        case SyntaxKind.ProtectedKeyword:
        case SyntaxKind.StaticKeyword:
        case SyntaxKind.ExportKeyword:
        case SyntaxKind.DeclareKeyword:
        case SyntaxKind.ConstKeyword:
        case SyntaxKind.DefaultKeyword:
            return true;
    end
    return false;
end
exports.isModifier = isModifier;
function isParameterDeclaration(node)
    local root = getRootDeclaration(node);
    return root.kind === SyntaxKind.Parameter;
end
exports.isParameterDeclaration = isParameterDeclaration;
function getRootDeclaration(node)
    while (node.kind === SyntaxKind.BindingElement) {
        node = node.parent.parent;
    end
    return node;
end
exports.getRootDeclaration = getRootDeclaration;
function nodeStartsNewLexicalEnvironment(n)
    return isFunctionLike(n) || n.kind === SyntaxKind.ModuleDeclaration || n.kind === SyntaxKind.SourceFile;
end
exports.nodeStartsNewLexicalEnvironment = nodeStartsNewLexicalEnvironment;
function nodeIsSynthesized(node)
    return node.pos === -1;
end
exports.nodeIsSynthesized = nodeIsSynthesized;
function createSynthesizedNode(kind, startsOnNewLine)
    local node = createNode(kind);
    node.pos = -1;
    node.;
end
exports.createSynthesizedNode = createSynthesizedNode;
-1;
node.startsOnNewLine = startsOnNewLine;
return node;
function createSynthesizedNodeArray()
    local array = [];
    array.pos = -1;
    array.;
end
exports.createSynthesizedNodeArray = createSynthesizedNodeArray;
-1;
return array;
function createDiagnosticCollection()
    local nonFileDiagnostics = [];
    local fileDiagnostics = {};
    local diagnosticsModified = false;
    local modificationCount = 0;
    return {
        add: add,
        getGlobalDiagnostics: getGlobalDiagnostics,
        getDiagnostics: getDiagnostics,
        getModificationCount: getModificationCount
    };
    function getModificationCount()
        return modificationCount;
    end
    function add(diagnostic)
        local diagnostics;
        if (diagnostic.file) {
            diagnostics = fileDiagnostics[diagnostic.file.fileName];
            if (!diagnostics) {
                diagnostics = [];
                fileDiagnostics[diagnostic.file.fileName] = diagnostics;
            end
        end
        else {
            diagnostics = nonFileDiagnostics;
        end
        diagnostics.push(diagnostic);
        diagnosticsModified = true;
        modificationCount++;
    end
    function getGlobalDiagnostics()
        sortAndDeduplicate();
        return nonFileDiagnostics;
    end
    function getDiagnostics(fileName)
        sortAndDeduplicate();
        if (fileName) {
            return fileDiagnostics[fileName] || [];
        end
        local allDiagnostics = [];
        function pushDiagnostic(d)
            allDiagnostics.push(d);
        end
        forEach(nonFileDiagnostics, pushDiagnostic);
        for (var key in fileDiagnostics) {
            if (hasProperty(fileDiagnostics, key)) {
                forEach(fileDiagnostics[key], pushDiagnostic);
            end
        end
        return sortAndDeduplicateDiagnostics(allDiagnostics);
    end
    function sortAndDeduplicate()
        if (!diagnosticsModified) {
            return;
        end
        diagnosticsModified = false;
        nonFileDiagnostics = sortAndDeduplicateDiagnostics(nonFileDiagnostics);
        for (var key in fileDiagnostics) {
            if (hasProperty(fileDiagnostics, key)) {
                fileDiagnostics[key] = sortAndDeduplicateDiagnostics(fileDiagnostics[key]);
            end
        end
    end
end
exports.createDiagnosticCollection = createDiagnosticCollection;
// This consists of the first 19 unprintable ASCII characters, canonical escapes, lineSeparator,
// paragraphSeparator, and nextLine. The latter three are just desirable to suppress new lines in
// the language service. These characters should be escaped when printing, and if any characters are added,
// the map below must be updated. Note that this regexp *does not* include the 'delete' character.
// There is no reason for this other than that JSON.stringify does not handle it either.
local escapedCharsRegExp = /[\\\"\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
local escapedCharsMap = {
    "\0": "\\0",
    "\t": "\\t",
    "\v": "\\v",
    "\f": "\\f",
    "\b": "\\b",
    "\r": "\\r",
    "\n": "\\n",
    "\\": "\\\\",
    "\"": "\\\"",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029",
    "\u0085": "\\u0085" // nextLine
};
/**
 * Based heavily on the abstract 'Quote'/'QuoteJSONString' operation from ECMA-262 (24.3.2.2),
 * but augmented for a few select characters (e.g. lineSeparator, paragraphSeparator, nextLine)
 * Note that this doesn't actually wrap the input in double quotes.
 */
function escapeString(s)
    s = escapedCharsRegExp.test(s) ? s.replace(escapedCharsRegExp, getReplacement) : s;
    return s;
    function getReplacement(c)
        return escapedCharsMap[c] || get16BitUnicodeEscapeSequence(c.charCodeAt(0));
    end
end
exports.escapeString = escapeString;
function get16BitUnicodeEscapeSequence(charCode)
    local hexCharCode = charCode.toString(16).toUpperCase();
    local paddedHexCode = ("0000" + hexCharCode).slice(-4);
    return "\\u" + paddedHexCode;
end
local nonAsciiCharacters = /[^\u0000-\u007F]/g;
function escapeNonAsciiCharacters(s)
    // Replace non-ASCII characters with '\uNNNN' escapes if any exist.
    // Otherwise just return the original string.
    return nonAsciiCharacters.test(s) ?
        s.replace(nonAsciiCharacters, function (c) { return get16BitUnicodeEscapeSequence(c.charCodeAt(0)); }) :
        s;
end
exports.escapeNonAsciiCharacters = escapeNonAsciiCharacters;
local indentStrings = ["", "    "];
function getIndentString(level)
    if (indentStrings[level] === undefined) {
        indentStrings[level] = getIndentString(level - 1) + indentStrings[1];
    end
    return indentStrings[level];
end
exports.getIndentString = getIndentString;
function getIndentSize()
    return indentStrings[1].length;
end
exports.getIndentSize = getIndentSize;
function createTextWriter(newLine)
    local output = "";
    local indent = 0;
    local lineStart = true;
    local lineCount = 0;
    local linePos = 0;
    function write(s)
        if (s && s.length) {
            if (lineStart) {
                output += getIndentString(indent);
                lineStart = false;
            end
            output += s;
        end
    end
    function rawWrite(s)
        if (s !== undefined) {
            if (lineStart) {
                lineStart = false;
            end
            output += s;
        end
    end
    function writeLiteral(s)
        if (s && s.length) {
            write(s);
            local lineStartsOfS = computeLineStarts(s);
            if (lineStartsOfS.length > 1) {
                lineCount = lineCount + lineStartsOfS.length - 1;
                linePos = output.length - s.length + lastOrUndefined(lineStartsOfS);
            end
        end
    end
    function writeLine()
        if (!lineStart) {
            output += newLine;
            lineCount++;
            linePos = output.length;
            lineStart = true;
        end
    end
    function writeTextOfNode(sourceFile, node)
        write(getSourceTextOfNodeFromSourceFile(sourceFile, node));
    end
    return {
        write: write,
        rawWrite: rawWrite,
        writeTextOfNode: writeTextOfNode,
        writeLiteral: writeLiteral,
        writeLine: writeLine,
        increaseIndent: function () { return indent++; },
        decreaseIndent: function () { return indent--; },
        getIndent: function () { return indent; },
        getTextPos: function () { return output.length; },
        getLine: function () { return lineCount + 1; },
        getColumn: function () { return lineStart ? indent * getIndentSize() + 1 : output.length - linePos + 1; },
        getText: function () { return output; }
    };
end
exports.createTextWriter = createTextWriter;
function getOwnEmitOutputFilePath(sourceFile, host, extension)
    local compilerOptions = host.getCompilerOptions();
    local emitOutputFilePathWithoutExtension;
    if (compilerOptions.outDir) {
        emitOutputFilePathWithoutExtension = removeFileExtension(getSourceFilePathInNewDir(sourceFile, host, compilerOptions.outDir));
    end
    else {
        emitOutputFilePathWithoutExtension = removeFileExtension(sourceFile.fileName);
    end
    return emitOutputFilePathWithoutExtension + extension;
end
exports.getOwnEmitOutputFilePath = getOwnEmitOutputFilePath;
function getSourceFilePathInNewDir(sourceFile, host, newDirPath)
    local sourceFilePath = getNormalizedAbsolutePath(sourceFile.fileName, host.getCurrentDirectory());
    sourceFilePath = sourceFilePath.replace(host.getCommonSourceDirectory(), "");
    return combinePaths(newDirPath, sourceFilePath);
end
exports.getSourceFilePathInNewDir = getSourceFilePathInNewDir;
function writeFile(host, diagnostics, fileName, data, writeByteOrderMark)
    host.writeFile(fileName, data, writeByteOrderMark, function (hostErrorMessage)
        diagnostics.push(createCompilerDiagnostic(Diagnostics.Could_not_write_file_0_Colon_1, fileName, hostErrorMessage));
    end);
end
exports.writeFile = writeFile;
function getLineOfLocalPosition(currentSourceFile, pos)
    return getLineAndCharacterOfPosition(currentSourceFile, pos).line;
end
exports.getLineOfLocalPosition = getLineOfLocalPosition;
function getFirstConstructorWithBody(node)
    return forEach(node.members, function (member)
        if (member.kind === SyntaxKind.Constructor && nodeIsPresent(member.body)) {
            return member;
        end
    end);
end
exports.getFirstConstructorWithBody = getFirstConstructorWithBody;
function shouldEmitToOwnFile(sourceFile, compilerOptions)
    if (!isDeclarationFile(sourceFile)) {
        if ((isExternalModule(sourceFile) || !compilerOptions.out)) {
            // 1. in-browser single file compilation scenario
            // 2. non .js file
            return compilerOptions.separateCompilation || !fileExtensionIs(sourceFile.fileName, ".js");
        end
        return false;
    end
    return false;
end
exports.shouldEmitToOwnFile = shouldEmitToOwnFile;
function getAllAccessorDeclarations(declarations, accessor)
    local firstAccessor;
    local secondAccessor;
    local getAccessor;
    local setAccessor;
    if (hasDynamicName(accessor)) {
        firstAccessor = accessor;
        if (accessor.kind === SyntaxKind.GetAccessor) {
            getAccessor = accessor;
        end
        else if (accessor.kind === SyntaxKind.SetAccessor) {
            setAccessor = accessor;
        end
        else {
            Debug.fail("Accessor has wrong kind");
        end
    end
    else {
        forEach(declarations, function (member)
            if ((member.kind === SyntaxKind.GetAccessor || member.kind === SyntaxKind.SetAccessor)
                && (member.flags & NodeFlags.Static) === (accessor.flags & NodeFlags.Static)) {
                local memberName = getPropertyNameForPropertyNameNode(member.name);
                local accessorName = getPropertyNameForPropertyNameNode(accessor.name);
                if (memberName === accessorName) {
                    if (!firstAccessor) {
                        firstAccessor = member;
                    end
                    else if (!secondAccessor) {
                        secondAccessor = member;
                    end
                    if (member.kind === SyntaxKind.GetAccessor && !getAccessor) {
                        getAccessor = member;
                    end
                    if (member.kind === SyntaxKind.SetAccessor && !setAccessor) {
                        setAccessor = member;
                    end
                end
            end
        end);
    end
    return {
        firstAccessor: firstAccessor,
        secondAccessor: secondAccessor,
        getAccessor: getAccessor,
        setAccessor: setAccessor
    };
end
exports.getAllAccessorDeclarations = getAllAccessorDeclarations;
function emitNewLineBeforeLeadingComments(currentSourceFile, writer, node, leadingComments)
    // If the leading comments start on different line than the start of node, write new line
    if (leadingComments && leadingComments.length && node.pos !== leadingComments[0].pos &&
        getLineOfLocalPosition(currentSourceFile, node.pos) !== getLineOfLocalPosition(currentSourceFile, leadingComments[0].pos)) {
        writer.writeLine();
    end
end
exports.emitNewLineBeforeLeadingComments = emitNewLineBeforeLeadingComments;
function emitComments(currentSourceFile, writer, comments, trailingSeparator, newLine, writeComment)
    local emitLeadingSpace = !trailingSeparator;
    forEach(comments, function (comment)
        if (emitLeadingSpace) {
            writer.write(" ");
            emitLeadingSpace = false;
        end
        writeComment(currentSourceFile, writer, comment, newLine);
        if (comment.hasTrailingNewLine) {
            writer.writeLine();
        end
        else if (trailingSeparator) {
            writer.write(" ");
        end
        else {
            // Emit leading space to separate comment during next comment emit
            emitLeadingSpace = true;
        end
    end);
end
exports.emitComments = emitComments;
function writeCommentRange(currentSourceFile, writer, comment, newLine)
    if (currentSourceFile.text.charCodeAt(comment.pos + 1) === CharacterCodes.asterisk) {
        local firstCommentLineAndCharacter = getLineAndCharacterOfPosition(currentSourceFile, comment.pos);
        local lineCount = getLineStarts(currentSourceFile).length;
        local firstCommentLineIndent;
        for (var pos = comment.pos, currentLine = firstCommentLineAndCharacter.line; pos < comment.; )
            ;
    end
    ;
    currentLine++;
    {
        local nextLineStart = (currentLine + 1) === lineCount
            ? currentSourceFile.text.length + 1
            : getStartPositionOfLine(currentLine + 1, currentSourceFile);
        if (pos !== comment.pos) {
            // If we are not emitting first line, we need to write the spaces to adjust the alignment
            if (firstCommentLineIndent === undefined) {
                firstCommentLineIndent = calculateIndent(getStartPositionOfLine(firstCommentLineAndCharacter.line, currentSourceFile), comment.pos);
            end
            // These are number of spaces writer is going to write at current indent
            local currentWriterIndentSpacing = writer.getIndent() * getIndentSize();
            // Number of spaces we want to be writing
            // eg: Assume writer indent
            // module m {
            //         /* starts at character 9 this is line 1
            //    * starts at character pos 4 line                        --1  = 8 - 8 + 3
            //   More left indented comment */                            --2  = 8 - 8 + 2
            //     class c { }
            // }
            // module m {
            //     /* this is line 1 -- Assume current writer indent 8
            //      * line                                                --3 = 8 - 4 + 5
            //            More right indented comment */                  --4 = 8 - 4 + 11
            //     class c { }
            // }
            local spacesToEmit = currentWriterIndentSpacing - firstCommentLineIndent + calculateIndent(pos, nextLineStart);
            if (spacesToEmit > 0) {
                local numberOfSingleSpacesToEmit = spacesToEmit % getIndentSize();
                local indentSizeSpaceString = getIndentString((spacesToEmit - numberOfSingleSpacesToEmit) / getIndentSize());
                // Write indent size string ( in eg 1: = "", 2: "" , 3: string with 8 spaces 4: string with 12 spaces
                writer.rawWrite(indentSizeSpaceString);
                // Emit the single spaces (in eg: 1: 3 spaces, 2: 2 spaces, 3: 1 space, 4: 3 spaces)
                while (numberOfSingleSpacesToEmit) {
                    writer.rawWrite(" ");
                    numberOfSingleSpacesToEmit--;
                end
            end
            else {
                // No spaces to emit write empty string
                writer.rawWrite("");
            end
        end
        // Write the comment line text
        writeTrimmedCurrentLine(pos, nextLineStart);
        pos = nextLineStart;
    end
end
exports.writeCommentRange = writeCommentRange;
{
    // Single line comment of style //....
    writer.write(currentSourceFile.text.substring(comment.pos, comment.));
end
;
function writeTrimmedCurrentLine(pos, nextLineStart)
    let;
end
Math.min(comment., , nextLineStart - 1);
local currentLineText = currentSourceFile.text.substring(pos);
replace(/^\s+|\s+$/g, '');
if (currentLineText) {
    // trimmed forward and ending spaces text
    writer.write(currentLineText);
    if ()
        ;
end
 !== comment.;
{
    writer.writeLine();
end
{
    // Empty string - make sure we write empty line
    writer.writeLiteral(newLine);
end
function calculateIndent(pos, number)
    local currentLineIndent = 0;
    for (; pos < ; )
        ;
end
 && isWhiteSpace(currentSourceFile.text.charCodeAt(pos));
pos++;
{
    if (currentSourceFile.text.charCodeAt(pos) === CharacterCodes.tab) {
        // Tabs = TabSize = indent size and go to next tabStop
        currentLineIndent += getIndentSize() - (currentLineIndent % getIndentSize());
    end
    else {
        // Single space
        currentLineIndent++;
    end
end
return currentLineIndent;
function modifierToFlag(token)
    switch (token) {
        case SyntaxKind.StaticKeyword: return NodeFlags.Static;
        case SyntaxKind.PublicKeyword: return NodeFlags.Public;
        case SyntaxKind.ProtectedKeyword: return NodeFlags.Protected;
        case SyntaxKind.PrivateKeyword: return NodeFlags.Private;
        case SyntaxKind.ExportKeyword: return NodeFlags.Export;
        case SyntaxKind.DeclareKeyword: return NodeFlags.Ambient;
        case SyntaxKind.ConstKeyword: return NodeFlags.Const;
        case SyntaxKind.DefaultKeyword: return NodeFlags.Default;
    end
    return 0;
end
exports.modifierToFlag = modifierToFlag;
function isLeftHandSideExpression(expr)
    if (expr) {
        switch (expr.kind) {
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
            case SyntaxKind.NewExpression:
            case SyntaxKind.CallExpression:
            case SyntaxKind.TaggedTemplateExpression:
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.Identifier:
            case SyntaxKind.RegularExpressionLiteral:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.TemplateExpression:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.NullKeyword:
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.SuperKeyword:
                return true;
        end
    end
    return false;
end
exports.isLeftHandSideExpression = isLeftHandSideExpression;
function isAssignmentOperator(token)
    return token >= SyntaxKind.FirstAssignment && token <= SyntaxKind.LastAssignment;
end
exports.isAssignmentOperator = isAssignmentOperator;
// Returns false if this heritage clause element's expression contains something unsupported
// (i.e. not a name or dotted name).
function isSupportedExpressionWithTypeArguments(node)
    return isSupportedExpressionWithTypeArgumentsRest(node.expression);
end
exports.isSupportedExpressionWithTypeArguments = isSupportedExpressionWithTypeArguments;
function isSupportedExpressionWithTypeArgumentsRest(node)
    if (node.kind === SyntaxKind.Identifier) {
        return true;
    end
    else if (node.kind === SyntaxKind.PropertyAccessExpression) {
        return isSupportedExpressionWithTypeArgumentsRest(node.expression);
    end
    else {
        return false;
    end
end
function isRightSideOfQualifiedNameOrPropertyAccess(node)
    return (node.parent.kind === SyntaxKind.QualifiedName && node.parent.right === node) ||
        (node.parent.kind === SyntaxKind.PropertyAccessExpression && node.parent.name === node);
end
exports.isRightSideOfQualifiedNameOrPropertyAccess = isRightSideOfQualifiedNameOrPropertyAccess;
function getLocalSymbolForExportDefault(symbol)
    return symbol && symbol.valueDeclaration && (symbol.valueDeclaration.flags & NodeFlags.Default) ? symbol.valueDeclaration.localSymbol : undefined;
end
exports.getLocalSymbolForExportDefault = getLocalSymbolForExportDefault;
/**
 * Replace each instance of non-ascii characters by one, two, three, or four escape sequences
 * representing the UTF-8 encoding of the character, and return the expanded char code list.
 */
function getExpandedCharCodes(input)
    local output = [];
    local length = input.length;
    local leadSurrogate = undefined;
    for (var i = 0; i < length; i++) {
        local charCode = input.charCodeAt(i);
        // handel utf8
        if (charCode < 0x80) {
            output.push(charCode);
        end
        else if (charCode < 0x800) {
            output.push((charCode >> 6) | 192);
            output.push((charCode & 63) | 128);
        end
        else if (charCode < 0x10000) {
            output.push((charCode >> 12) | 224);
            output.push(((charCode >> 6) & 63) | 128);
            output.push((charCode & 63) | 128);
        end
        else if (charCode < 0x20000) {
            output.push((charCode >> 18) | 240);
            output.push(((charCode >> 12) & 63) | 128);
            output.push(((charCode >> 6) & 63) | 128);
            output.push((charCode & 63) | 128);
        end
        else {
            Debug.assert(false, "Unexpected code point");
        end
    end
    return output;
end
local base64Digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
/**
 * Converts a string to a base-64 encoded ASCII string.
 */
function convertToBase64(input)
    local result = "";
    local charCodes = getExpandedCharCodes(input);
    local i = 0;
    local length = charCodes.length;
    local byte1, byte2, byte3, byte4;
    while (i < length) {
        // Convert every 6-bits in the input 3 character points
        // into a base64 digit
        byte1 = charCodes[i] >> 2;
        byte2 = (charCodes[i] & 3) << 4 | charCodes[i + 1] >> 4;
        byte3 = (charCodes[i + 1] & 15) << 2 | charCodes[i + 2] >> 6;
        byte4 = charCodes[i + 2] & 63;
        // We are out of characters in the input, set the extra
        // digits to 64 (padding character).
        if (i + 1 >= length) {
            byte3 = byte4 = 64;
        end
        else if (i + 2 >= length) {
            byte4 = 64;
        end
        // Write to the ouput
        result += base64Digits.charAt(byte1) + base64Digits.charAt(byte2) + base64Digits.charAt(byte3) + base64Digits.charAt(byte4);
        i += 3;
    end
    return result;
end
exports.convertToBase64 = convertToBase64;
local ts;
(function (ts) {
    function getDefaultLibFileName(options)
        return options.target === ScriptTarget.ES6 ? "lib.es6.d.ts" : "lib.d.ts";
    end
    ts.getDefaultLibFileName = getDefaultLibFileName;
    function textSpanEnd(span)
        return span.start + span.length;
    end
    ts.textSpanEnd = textSpanEnd;
    function textSpanIsEmpty(span)
        return span.length === 0;
    end
    ts.textSpanIsEmpty = textSpanIsEmpty;
    function textSpanContainsPosition(span, position)
        return position >= span.start && position < textSpanEnd(span);
    end
    ts.textSpanContainsPosition = textSpanContainsPosition;
    // Returns true if 'span' contains 'other'.
    function textSpanContainsTextSpan(span, other)
        return other.start >= span.start && textSpanEnd(other) <= textSpanEnd(span);
    end
    ts.textSpanContainsTextSpan = textSpanContainsTextSpan;
    function textSpanOverlapsWith(span, other)
        local overlapStart = Math.max(span.start, other.start);
        local overlapEnd = Math.min(textSpanEnd(span), textSpanEnd(other));
        return overlapStart < overlapEnd;
    end
    ts.textSpanOverlapsWith = textSpanOverlapsWith;
    function textSpanOverlap(span1, span2)
        local overlapStart = Math.max(span1.start, span2.start);
        local overlapEnd = Math.min(textSpanEnd(span1), textSpanEnd(span2));
        if (overlapStart < overlapEnd) {
            return createTextSpanFromBounds(overlapStart, overlapEnd);
        end
        return undefined;
    end
    ts.textSpanOverlap = textSpanOverlap;
    function textSpanIntersectsWithTextSpan(span, other)
        return other.start <= textSpanEnd(span) && textSpanEnd(other) >= span.start;
    end
    ts.textSpanIntersectsWithTextSpan = textSpanIntersectsWithTextSpan;
    function textSpanIntersectsWith(span, start, length)
        let;
    end
    ts.textSpanIntersectsWith = textSpanIntersectsWith;
    start + length;
    return start <= textSpanEnd(span) && ;
end)(ts || (ts = {}));
 >= span.start;
function textSpanIntersectsWithPosition(span, position)
    return position <= textSpanEnd(span) && position >= span.start;
end
exports.textSpanIntersectsWithPosition = textSpanIntersectsWithPosition;
function textSpanIntersection(span1, span2)
    local intersectStart = Math.max(span1.start, span2.start);
    local intersectEnd = Math.min(textSpanEnd(span1), textSpanEnd(span2));
    if (intersectStart <= intersectEnd) {
        return createTextSpanFromBounds(intersectStart, intersectEnd);
    end
    return undefined;
end
exports.textSpanIntersection = textSpanIntersection;
function createTextSpan(start, length)
    if (start < 0) {
        throw new Error("start < 0");
    end
    if (length < 0) {
        throw new Error("length < 0");
    end
    return { start: start, length: length };
end
exports.createTextSpan = createTextSpan;
function createTextSpanFromBounds(start, number)
    return createTextSpan(start);
end
exports.createTextSpanFromBounds = createTextSpanFromBounds;
-start;
;
function textChangeRangeNewSpan(range)
    return createTextSpan(range.span.start, range.newLength);
end
exports.textChangeRangeNewSpan = textChangeRangeNewSpan;
function textChangeRangeIsUnchanged(range)
    return textSpanIsEmpty(range.span) && range.newLength === 0;
end
exports.textChangeRangeIsUnchanged = textChangeRangeIsUnchanged;
function createTextChangeRange(span, newLength)
    if (newLength < 0) {
        throw new Error("newLength < 0");
    end
    return { span: span, newLength: newLength };
end
exports.createTextChangeRange = createTextChangeRange;
exports.unchangedTextChangeRange = createTextChangeRange(createTextSpan(0, 0), 0);
/**
 * Called to merge all the changes that occurred across several versions of a script snapshot
 * into a single change.  i.e. if a user keeps making successive edits to a script we will
 * have a text change from V1 to V2, V2 to V3, ..., Vn.
 *
 * This function will then merge those changes into a single change range valid between V1 and
 * Vn.
 */
function collapseTextChangeRangesAcrossMultipleVersions(changes)
    if (changes.length === 0) {
        return exports.unchangedTextChangeRange;
    end
    if (changes.length === 1) {
        return changes[0];
    end
    // We change from talking about { { oldStart, oldLength }, newLength } to { oldStart, oldEnd, newEnd }
    // as it makes things much easier to reason about.
    local change0 = changes[0];
    local oldStartN = change0.span.start;
    local oldEndN = textSpanEnd(change0.span);
    local newEndN = oldStartN + change0.newLength;
    for (var i = 1; i < changes.length; i++) {
        local nextChange = changes[i];
        // Consider the following case:
        // i.e. two edits.  The first represents the text change range { { 10, 50 }, 30 }.  i.e. The span starting
        // at 10, with length 50 is reduced to length 30.  The second represents the text change range { { 30, 30 }, 40 }.
        // i.e. the span starting at 30 with length 30 is increased to length 40.
        //
        //      0         10        20        30        40        50        60        70        80        90        100
        //      -------------------------------------------------------------------------------------------------------
        //                |                                                 /                                          
        //                |                                            /----                                           
        //  T1            |                                       /----                                                
        //                |                                  /----                                                     
        //                |                             /----                                                          
        //      -------------------------------------------------------------------------------------------------------
        //                                     |                            \                                          
        //                                     |                               \                                       
        //   T2                                |                                 \                                     
        //                                     |                                   \                                   
        //                                     |                                      \                                
        //      -------------------------------------------------------------------------------------------------------
        //
        // Merging these turns out to not be too difficult.  First, determining the new start of the change is trivial
        // it's just the min of the old and new starts.  i.e.:
        //
        //      0         10        20        30        40        50        60        70        80        90        100
        //      ------------------------------------------------------------*------------------------------------------
        //                |                                                 /                                          
        //                |                                            /----                                           
        //  T1            |                                       /----                                                
        //                |                                  /----                                                     
        //                |                             /----                                                          
        //      ----------------------------------------$-------------------$------------------------------------------
        //                .                    |                            \                                          
        //                .                    |                               \                                       
        //   T2           .                    |                                 \                                     
        //                .                    |                                   \                                   
        //                .                    |                                      \                                
        //      ----------------------------------------------------------------------*--------------------------------
        //
        // (Note the dots represent the newly inferrred start.
        // Determining the new and old end is also pretty simple.  Basically it boils down to paying attention to the
        // absolute positions at the asterixes, and the relative change between the dollar signs. Basically, we see
        // which if the two $'s precedes the other, and we move that one forward until they line up.  in this case that
        // means:
        //
        //      0         10        20        30        40        50        60        70        80        90        100
        //      --------------------------------------------------------------------------------*----------------------
        //                |                                                                     /                      
        //                |                                                                /----                       
        //  T1            |                                                           /----                            
        //                |                                                      /----                                 
        //                |                                                 /----                                      
        //      ------------------------------------------------------------$------------------------------------------
        //                .                    |                            \                                          
        //                .                    |                               \                                       
        //   T2           .                    |                                 \                                     
        //                .                    |                                   \                                   
        //                .                    |                                      \                                
        //      ----------------------------------------------------------------------*--------------------------------
        //
        // In other words (in this case), we're recognizing that the second edit happened after where the first edit
        // ended with a delta of 20 characters (60 - 40).  Thus, if we go back in time to where the first edit started
        // that's the same as if we started at char 80 instead of 60.  
        //
        // As it so happens, the same logic applies if the second edit precedes the first edit.  In that case rahter
        // than pusing the first edit forward to match the second, we'll push the second edit forward to match the
        // first.
        //
        // In this case that means we have { oldStart: 10, oldEnd: 80, newEnd: 70 } or, in TextChangeRange
        // semantics: { { start: 10, length: 70 }, newLength: 60 }
        //
        // The math then works out as follows.
        // If we have { oldStart1, oldEnd1, newEnd1 } and { oldStart2, oldEnd2, newEnd2 } then we can compute the 
        // final result like so:
        //
        // {
        //      oldStart3: Min(oldStart1, oldStart2),
        //      oldEnd3  : Max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1)),
        //      newEnd3  : Max(newEnd2, newEnd2 + (newEnd1 - oldEnd2))
        // }
        local oldStart1 = oldStartN;
        local oldEnd1 = oldEndN;
        local newEnd1 = newEndN;
        local oldStart2 = nextChange.span.start;
        local oldEnd2 = textSpanEnd(nextChange.span);
        local newEnd2 = oldStart2 + nextChange.newLength;
        oldStartN = Math.min(oldStart1, oldStart2);
        oldEndN = Math.max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1));
        newEndN = Math.max(newEnd2, newEnd2 + (newEnd1 - oldEnd2));
    end
    return createTextChangeRange(createTextSpanFromBounds(oldStartN, oldEndN), newEndN - oldStartN);
end
exports.collapseTextChangeRangesAcrossMultipleVersions = collapseTextChangeRangesAcrossMultipleVersions;
//# sourceMappingURL=file:///C:/Users/qujianbiao/Downloads/TypeScript-master/built/local/compiler/utilities.js.map