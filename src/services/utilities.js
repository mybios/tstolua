// These utilities are common to multiple language service features.
/* @internal */
local ts;
(function (ts) {
    function getEndLinePosition(line, sourceFile)
        Debug.assert(line >= 0);
        local lineStarts = sourceFile.getLineStarts();
        local lineIndex = line;
        if (lineIndex + 1 === lineStarts.length) {
            // last line - return EOF
            return sourceFile.text.length - 1;
        end
        else {
            // current line start
            local start = lineStarts[lineIndex];
            // take the start position of the next line -1 = it should be some line break
            local pos = lineStarts[lineIndex + 1] - 1;
            Debug.assert(isLineBreak(sourceFile.text.charCodeAt(pos)));
            // walk backwards skipping line breaks, stop the the beginning of current line.
            // i.e:
            // <some text>
            // $ <- end of line for this position should match the start position
            while (start <= pos && isLineBreak(sourceFile.text.charCodeAt(pos))) {
                pos--;
            end
            return pos;
        end
    end
    ts.getEndLinePosition = getEndLinePosition;
    function getLineStartPositionForPosition(position, sourceFile)
        local lineStarts = sourceFile.getLineStarts();
        local line = sourceFile.getLineAndCharacterOfPosition(position).line;
        return lineStarts[line];
    end
    ts.getLineStartPositionForPosition = getLineStartPositionForPosition;
    function rangeContainsRange(r1, r2)
        return startEndContainsRange(r1.pos, r1.);
    end
    ts.rangeContainsRange = rangeContainsRange;
    r2;
    ;
end)(ts || (ts = {}));
function startEndContainsRange(start, number, range)
    return start <= range.pos && ;
end
exports.startEndContainsRange = startEndContainsRange;
 >= range.;
;
function rangeContainsStartEnd(range, start, number)
    return range.pos <= start && range.;
end
exports.rangeContainsStartEnd = rangeContainsStartEnd;
 >= ;
;
function rangeOverlapsWithStartEnd(r1, start, number)
    return startEndOverlapsWithStartEnd(r1.pos, r1.);
end
exports.rangeOverlapsWithStartEnd = rangeOverlapsWithStartEnd;
start, ;
;
function startEndOverlapsWithStartEnd(start1, end1, start2, end2)
    local start = Math.max(start1, start2);
    let;
end
exports.startEndOverlapsWithStartEnd = startEndOverlapsWithStartEnd;
Math.min(end1, end2);
return start < ;
;
function positionBelongsToNode(candidate, position, sourceFile)
    return candidate.;
end
exports.positionBelongsToNode = positionBelongsToNode;
 > position || !isCompletedNode(candidate, sourceFile);
function isCompletedNode(n, sourceFile)
    if (nodeIsMissing(n)) {
        return false;
    end
    switch (n.kind) {
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.ObjectBindingPattern:
        case SyntaxKind.TypeLiteral:
        case SyntaxKind.Block:
        case SyntaxKind.ModuleBlock:
        case SyntaxKind.CaseBlock:
            return nodeEndsWith(n, SyntaxKind.CloseBraceToken, sourceFile);
        case SyntaxKind.CatchClause:
            return isCompletedNode(n.block, sourceFile);
        case SyntaxKind.NewExpression:
            if (!n.arguments) {
                return true;
            end
        // fall through
        case SyntaxKind.CallExpression:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.ParenthesizedType:
            return nodeEndsWith(n, SyntaxKind.CloseParenToken, sourceFile);
        case SyntaxKind.FunctionType:
        case SyntaxKind.ConstructorType:
            return isCompletedNode(n.type, sourceFile);
        case SyntaxKind.Constructor:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.ConstructSignature:
        case SyntaxKind.CallSignature:
        case SyntaxKind.ArrowFunction:
            if (n.body) {
                return isCompletedNode(n.body, sourceFile);
            end
            if (n.type) {
                return isCompletedNode(n.type, sourceFile);
            end
            // Even though type parameters can be unclosed, we can get away with
            // having at least a closing paren.
            return hasChildOfKind(n, SyntaxKind.CloseParenToken, sourceFile);
        case SyntaxKind.ModuleDeclaration:
            return n.body && isCompletedNode(n.body, sourceFile);
        case SyntaxKind.IfStatement:
            if (n.elseStatement) {
                return isCompletedNode(n.elseStatement, sourceFile);
            end
            return isCompletedNode(n.thenStatement, sourceFile);
        case SyntaxKind.ExpressionStatement:
            return isCompletedNode(n.expression, sourceFile);
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.ArrayBindingPattern:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.ComputedPropertyName:
        case SyntaxKind.TupleType:
            return nodeEndsWith(n, SyntaxKind.CloseBracketToken, sourceFile);
        case SyntaxKind.IndexSignature:
            if (n.type) {
                return isCompletedNode(n.type, sourceFile);
            end
            return hasChildOfKind(n, SyntaxKind.CloseBracketToken, sourceFile);
        case SyntaxKind.CaseClause:
        case SyntaxKind.DefaultClause:
            // there is no such thing as terminator token for CaseClause/DefaultClause so for simplicitly always consider them non-completed
            return false;
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
        case SyntaxKind.WhileStatement:
            return isCompletedNode(n.statement, sourceFile);
        case SyntaxKind.DoStatement:
            // rough approximation: if DoStatement has While keyword - then if node is completed is checking the presence of ')';
            local hasWhileKeyword = findChildOfKind(n, SyntaxKind.WhileKeyword, sourceFile);
            if (hasWhileKeyword) {
                return nodeEndsWith(n, SyntaxKind.CloseParenToken, sourceFile);
            end
            return isCompletedNode(n.statement, sourceFile);
        case SyntaxKind.TypeQuery:
            return isCompletedNode(n.exprName, sourceFile);
        case SyntaxKind.TypeOfExpression:
        case SyntaxKind.DeleteExpression:
        case SyntaxKind.VoidExpression:
        case SyntaxKind.YieldExpression:
        case SyntaxKind.SpreadElementExpression:
            local unaryWordExpression = n;
            return isCompletedNode(unaryWordExpression.expression, sourceFile);
        case SyntaxKind.TaggedTemplateExpression:
            return isCompletedNode(n.template, sourceFile);
        case SyntaxKind.TemplateExpression:
            local lastSpan = lastOrUndefined(n.templateSpans);
            return isCompletedNode(lastSpan, sourceFile);
        case SyntaxKind.TemplateSpan:
            return nodeIsPresent(n.literal);
        case SyntaxKind.PrefixUnaryExpression:
            return isCompletedNode(n.operand, sourceFile);
        case SyntaxKind.BinaryExpression:
            return isCompletedNode(n.right, sourceFile);
        case SyntaxKind.ConditionalExpression:
            return isCompletedNode(n.whenFalse, sourceFile);
        default:
            return true;
    end
end
exports.isCompletedNode = isCompletedNode;
/*
 * Checks if node ends with 'expectedLastToken'.
 * If child at position 'length - 1' is 'SemicolonToken' it is skipped and 'expectedLastToken' is compared with child at position 'length - 2'.
 */
function nodeEndsWith(n, expectedLastToken, sourceFile)
    local children = n.getChildren(sourceFile);
    if (children.length) {
        local last = lastOrUndefined(children);
        if (last.kind === expectedLastToken) {
            return true;
        end
        else if (last.kind === SyntaxKind.SemicolonToken && children.length !== 1) {
            return children[children.length - 2].kind === expectedLastToken;
        end
    end
    return false;
end
function findListItemInfo(node)
    local list = findContainingList(node);
    // It is possible at this point for syntaxList to be undefined, either if
    // node.parent had no list child, or if none of its list children contained
    // the span of node. If this happens, return undefined. The caller should
    // handle this case.
    if (!list) {
        return undefined;
    end
    local children = list.getChildren();
    local listItemIndex = indexOf(children, node);
    return {
        listItemIndex: listItemIndex,
        list: list
    };
end
exports.findListItemInfo = findListItemInfo;
function hasChildOfKind(n, kind, sourceFile)
    return !!findChildOfKind(n, kind, sourceFile);
end
exports.hasChildOfKind = hasChildOfKind;
function findChildOfKind(n, kind, sourceFile)
    return forEach(n.getChildren(sourceFile), function (c) { return c.kind === kind && c; });
end
exports.findChildOfKind = findChildOfKind;
function findContainingList(node)
    // The node might be a list element (nonsynthetic) or a comma (synthetic). Either way, it will
    // be parented by the container of the SyntaxList, not the SyntaxList itself.
    // In order to find the list item index, we first need to locate SyntaxList itself and then search
    // for the position of the relevant node (or comma).
    local syntaxList = forEach(node.parent.getChildren(), function (c)
        // find syntax list that covers the span of the node
        if (c.kind === SyntaxKind.SyntaxList && c.pos <= node.pos && c.)
            ;
    end,  >= node.);
end
exports.findContainingList = findContainingList;
{
    return c;
end
;
// Either we didn't find an appropriate list, or the list must contain us.
Debug.assert(!syntaxList || contains(syntaxList.getChildren(), node));
return syntaxList;
/* Gets the token whose text has range [start, end) and
 * position >= start and (position < end or (position === end && token is keyword or identifier))
 */
function getTouchingWord(sourceFile, position)
    return getTouchingToken(sourceFile, position, function (n) { return isWord(n.kind); });
end
exports.getTouchingWord = getTouchingWord;
/* Gets the token whose text has range [start, end) and position >= start
 * and (position < end or (position === end && token is keyword or identifier or numeric\string litera))
 */
function getTouchingPropertyName(sourceFile, position)
    return getTouchingToken(sourceFile, position, function (n) { return isPropertyName(n.kind); });
end
exports.getTouchingPropertyName = getTouchingPropertyName;
/** Returns the token if position is in [start, end) or if position === end and includeItemAtEndPosition(token) === true */
function getTouchingToken(sourceFile, position, includeItemAtEndPosition)
    return getTokenAtPositionWorker(sourceFile, position, false, includeItemAtEndPosition);
end
exports.getTouchingToken = getTouchingToken;
/** Returns a token if position is in [start-of-leading-trivia, end) */
function getTokenAtPosition(sourceFile, position)
    return getTokenAtPositionWorker(sourceFile, position, true, undefined);
end
exports.getTokenAtPosition = getTokenAtPosition;
/** Get the token whose text contains the position */
function getTokenAtPositionWorker(sourceFile, position, allowPositionInLeadingTrivia, includeItemAtEndPosition)
    local current = sourceFile;
    outer: while (true) {
        if (isToken(current)) {
            // exit early
            return current;
        end
        // find the child that contains 'position'
        for (var i = 0, n = current.getChildCount(sourceFile); i < n; i++) {
            local child = current.getChildAt(i);
            local start = allowPositionInLeadingTrivia ? child.getFullStart() : child.getStart(sourceFile);
            if (start <= position) {
                let;
            end
            child.getEnd();
            if (position < )
                ;
        end
         || (position === );
    end
     && child.kind === SyntaxKind.EndOfFileToken;
    {
        current = child;
        continue outer;
    end
    if (includeItemAtEndPosition && )
        ;
end
 === position;
{
    local previousToken = findPrecedingToken(position, sourceFile, child);
    if (previousToken && includeItemAtEndPosition(previousToken)) {
        return previousToken;
    end
end
return current;
/**
  * The token on the left of the position is the token that strictly includes the position
  * or sits to the left of the cursor if it is on a boundary. For example
  *
  *   fo|o               -> will return foo
  *   foo <comment> |bar -> will return foo
  *
  */
function findTokenOnLeftOfPosition(file, position)
    // Ideally, getTokenAtPosition should return a token. However, it is currently
    // broken, so we do a check to make sure the result was indeed a token.
    local tokenAtPosition = getTokenAtPosition(file, position);
    if (isToken(tokenAtPosition) && position > tokenAtPosition.getStart(file) && position < tokenAtPosition.getEnd()) {
        return tokenAtPosition;
    end
    return findPrecedingToken(position, file);
end
exports.findTokenOnLeftOfPosition = findTokenOnLeftOfPosition;
function findNextToken(previousToken, parent)
    return find(parent);
    function find(n)
        if (isToken(n) && n.pos === previousToken.)
            ;
    end
    {
        // this is token that starts at the end of previous token - return it
        return n;
    end
    local children = n.getChildren();
    for (local _i = 0; _i < children.length; _i++) {
        local child = children[_i];
        local shouldDiveInChildNode = 
        // previous token is enclosed somewhere in the child
        (child.pos <= previousToken.pos && child.);
    }
     > previousToken.;
end
exports.findNextToken = findNextToken;
 ||
    // previous token ends exactly at the beginning of child
    (child.pos === previousToken.);
;
if (shouldDiveInChildNode && nodeHasTokens(child)) {
    return find(child);
end
return undefined;
function findPrecedingToken(position, sourceFile, startNode)
    return find(startNode || sourceFile);
    function findRightmostToken(n)
        if (isToken(n)) {
            return n;
        end
        local children = n.getChildren();
        local candidate = findRightmostChildNodeWithTokens(children, children.length);
        return candidate && findRightmostToken(candidate);
    end
    function find(n)
        if (isToken(n)) {
            return n;
        end
        local children = n.getChildren();
        for (var i = 0, len = children.length; i < len; i++) {
            local child = children[i];
            if (nodeHasTokens(child)) {
                if (position <= child.)
                    ;
            end
            {
                if (child.getStart(sourceFile) >= position) {
                    // actual start of the node is past the position - previous token should be at the end of previous child
                    local candidate = findRightmostChildNodeWithTokens(children, i);
                    return candidate && findRightmostToken(candidate);
                end
                else {
                    // candidate should be in this node
                    return find(child);
                end
            end
        end
    end
    Debug.assert(startNode !== undefined || n.kind === SyntaxKind.SourceFile);
    // Here we know that none of child token nodes embrace the position, 
    // the only known case is when position is at the end of the file.
    // Try to find the rightmost token in the file without filtering.
    // Namely we are skipping the check: 'position < node.end'
    if (children.length) {
        local candidate = findRightmostChildNodeWithTokens(children, children.length);
        return candidate && findRightmostToken(candidate);
    end
end
exports.findPrecedingToken = findPrecedingToken;
/// finds last node that is considered as candidate for search (isCandidate(node) === true) starting from 'exclusiveStartPosition'
function findRightmostChildNodeWithTokens(children, exclusiveStartPosition)
    for (var i = exclusiveStartPosition - 1; i >= 0; --i) {
        if (nodeHasTokens(children[i])) {
            return children[i];
        end
    end
end
function nodeHasTokens(n)
    // If we have a token or node that has a non-zero width, it must have tokens.
    // Note, that getWidth() does not take trivia into account.
    return n.getWidth() !== 0;
end
function getNodeModifiers(node)
    local flags = getCombinedNodeFlags(node);
    local result = [];
    if (flags & NodeFlags.Private)
        result.push(ScriptElementKindModifier.privateMemberModifier);
    if (flags & NodeFlags.Protected)
        result.push(ScriptElementKindModifier.protectedMemberModifier);
    if (flags & NodeFlags.Public)
        result.push(ScriptElementKindModifier.publicMemberModifier);
    if (flags & NodeFlags.Static)
        result.push(ScriptElementKindModifier.staticModifier);
    if (flags & NodeFlags.Export)
        result.push(ScriptElementKindModifier.exportedModifier);
    if (isInAmbientContext(node))
        result.push(ScriptElementKindModifier.ambientModifier);
    return result.length > 0 ? result.join(',') : ScriptElementKindModifier.none;
end
exports.getNodeModifiers = getNodeModifiers;
function getTypeArgumentOrTypeParameterList(node)
    if (node.kind === SyntaxKind.TypeReference || node.kind === SyntaxKind.CallExpression) {
        return node.typeArguments;
    end
    if (isFunctionLike(node) || node.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.InterfaceDeclaration) {
        return node.typeParameters;
    end
    return undefined;
end
exports.getTypeArgumentOrTypeParameterList = getTypeArgumentOrTypeParameterList;
function isToken(n)
    return n.kind >= SyntaxKind.FirstToken && n.kind <= SyntaxKind.LastToken;
end
exports.isToken = isToken;
function isWord(kind)
    return kind === SyntaxKind.Identifier || isKeyword(kind);
end
exports.isWord = isWord;
function isPropertyName(kind)
    return kind === SyntaxKind.StringLiteral || kind === SyntaxKind.NumericLiteral || isWord(kind);
end
function isComment(kind)
    return kind === SyntaxKind.SingleLineCommentTrivia || kind === SyntaxKind.MultiLineCommentTrivia;
end
exports.isComment = isComment;
function isPunctuation(kind)
    return SyntaxKind.FirstPunctuation <= kind && kind <= SyntaxKind.LastPunctuation;
end
exports.isPunctuation = isPunctuation;
function isInsideTemplateLiteral(node, position)
    return isTemplateLiteralKind(node.kind)
        && (node.getStart() < position && position < node.getEnd()) || (!!node.isUnterminated && position === node.getEnd());
end
exports.isInsideTemplateLiteral = isInsideTemplateLiteral;
function isAccessibilityModifier(kind)
    switch (kind) {
        case SyntaxKind.PublicKeyword:
        case SyntaxKind.PrivateKeyword:
        case SyntaxKind.ProtectedKeyword:
            return true;
    end
    return false;
end
exports.isAccessibilityModifier = isAccessibilityModifier;
function compareDataObjects(dst, src)
    for (var e in dst) {
        if (typeof dst[e] === "object") {
            if (!compareDataObjects(dst[e], src[e])) {
                return false;
            end
        end
        else if (typeof dst[e] !== "function") {
            if (dst[e] !== src[e]) {
                return false;
            end
        end
    end
    return true;
end
exports.compareDataObjects = compareDataObjects;
// Display-part writer helpers
/* @internal */
local ts;
(function (ts) {
    function isFirstDeclarationOfSymbolParameter(symbol)
        return symbol.declarations && symbol.declarations.length > 0 && symbol.declarations[0].kind === SyntaxKind.Parameter;
    end
    ts.isFirstDeclarationOfSymbolParameter = isFirstDeclarationOfSymbolParameter;
    local displayPartWriter = getDisplayPartWriter();
    function getDisplayPartWriter()
        local displayParts;
        local lineStart;
        local indent;
        resetWriter();
        return {
            displayParts: function () { return displayParts; },
            writeKeyword: function (text) { return writeKind(text, SymbolDisplayPartKind.keyword); },
            writeOperator: function (text) { return writeKind(text, SymbolDisplayPartKind.operator); },
            writePunctuation: function (text) { return writeKind(text, SymbolDisplayPartKind.punctuation); },
            writeSpace: function (text) { return writeKind(text, SymbolDisplayPartKind.space); },
            writeStringLiteral: function (text) { return writeKind(text, SymbolDisplayPartKind.stringLiteral); },
            writeParameter: function (text) { return writeKind(text, SymbolDisplayPartKind.parameterName); },
            writeSymbol: writeSymbol,
            writeLine: writeLine,
            increaseIndent: function () indent++; end,
            decreaseIndent: function () indent--; end,
            clear: resetWriter,
            trackSymbol: function () end
        };
        function writeIndent()
            if (lineStart) {
                local indentString = getIndentString(indent);
                if (indentString) {
                    displayParts.push(displayPart(indentString, SymbolDisplayPartKind.space));
                end
                lineStart = false;
            end
        end
        function writeKind(text, kind)
            writeIndent();
            displayParts.push(displayPart(text, kind));
        end
        function writeSymbol(text, symbol)
            writeIndent();
            displayParts.push(symbolPart(text, symbol));
        end
        function writeLine()
            displayParts.push(lineBreakPart());
            lineStart = true;
        end
        function resetWriter()
            displayParts = [];
            lineStart = true;
            indent = 0;
        end
    end
    function symbolPart(text, symbol)
        return displayPart(text, displayPartKind(symbol), symbol);
        function displayPartKind(symbol)
            local flags = symbol.flags;
            if (flags & SymbolFlags.Variable) {
                return isFirstDeclarationOfSymbolParameter(symbol) ? SymbolDisplayPartKind.parameterName : SymbolDisplayPartKind.localName;
            end
            else if (flags & SymbolFlags.Property) {
                return SymbolDisplayPartKind.propertyName;
            end
            else if (flags & SymbolFlags.GetAccessor) {
                return SymbolDisplayPartKind.propertyName;
            end
            else if (flags & SymbolFlags.SetAccessor) {
                return SymbolDisplayPartKind.propertyName;
            end
            else if (flags & SymbolFlags.EnumMember) {
                return SymbolDisplayPartKind.enumMemberName;
            end
            else if (flags & SymbolFlags.Function) {
                return SymbolDisplayPartKind.functionName;
            end
            else if (flags & SymbolFlags.Class) {
                return SymbolDisplayPartKind.className;
            end
            else if (flags & SymbolFlags.Interface) {
                return SymbolDisplayPartKind.interfaceName;
            end
            else if (flags & SymbolFlags.Enum) {
                return SymbolDisplayPartKind.enumName;
            end
            else if (flags & SymbolFlags.Module) {
                return SymbolDisplayPartKind.moduleName;
            end
            else if (flags & SymbolFlags.Method) {
                return SymbolDisplayPartKind.methodName;
            end
            else if (flags & SymbolFlags.TypeParameter) {
                return SymbolDisplayPartKind.typeParameterName;
            end
            else if (flags & SymbolFlags.TypeAlias) {
                return SymbolDisplayPartKind.aliasName;
            end
            else if (flags & SymbolFlags.Alias) {
                return SymbolDisplayPartKind.aliasName;
            end
            return SymbolDisplayPartKind.text;
        end
    end
    ts.symbolPart = symbolPart;
    function displayPart(text, kind, symbol)
        return {
            text: text,
            kind: SymbolDisplayPartKind[kind]
        };
    end
    ts.displayPart = displayPart;
    function spacePart()
        return displayPart(" ", SymbolDisplayPartKind.space);
    end
    ts.spacePart = spacePart;
    function keywordPart(kind)
        return displayPart(tokenToString(kind), SymbolDisplayPartKind.keyword);
    end
    ts.keywordPart = keywordPart;
    function punctuationPart(kind)
        return displayPart(tokenToString(kind), SymbolDisplayPartKind.punctuation);
    end
    ts.punctuationPart = punctuationPart;
    function operatorPart(kind)
        return displayPart(tokenToString(kind), SymbolDisplayPartKind.operator);
    end
    ts.operatorPart = operatorPart;
    function textOrKeywordPart(text)
        local kind = stringToToken(text);
        return kind === undefined
            ? textPart(text)
            : keywordPart(kind);
    end
    ts.textOrKeywordPart = textOrKeywordPart;
    function textPart(text)
        return displayPart(text, SymbolDisplayPartKind.text);
    end
    ts.textPart = textPart;
    function lineBreakPart()
        return displayPart("\n", SymbolDisplayPartKind.lineBreak);
    end
    ts.lineBreakPart = lineBreakPart;
    function mapToDisplayParts(writeDisplayParts)
        writeDisplayParts(displayPartWriter);
        local result = displayPartWriter.displayParts();
        displayPartWriter.clear();
        return result;
    end
    ts.mapToDisplayParts = mapToDisplayParts;
    function typeToDisplayParts(typechecker, type, enclosingDeclaration, flags)
        return mapToDisplayParts(function (writer)
            typechecker.getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);
        end);
    end
    ts.typeToDisplayParts = typeToDisplayParts;
    function symbolToDisplayParts(typeChecker, symbol, enclosingDeclaration, meaning, flags)
        return mapToDisplayParts(function (writer)
            typeChecker.getSymbolDisplayBuilder().buildSymbolDisplay(symbol, writer, enclosingDeclaration, meaning, flags);
        end);
    end
    ts.symbolToDisplayParts = symbolToDisplayParts;
    function signatureToDisplayParts(typechecker, signature, enclosingDeclaration, flags)
        return mapToDisplayParts(function (writer)
            typechecker.getSymbolDisplayBuilder().buildSignatureDisplay(signature, writer, enclosingDeclaration, flags);
        end);
    end
    ts.signatureToDisplayParts = signatureToDisplayParts;
    function isJavaScript(fileName)
        return fileExtensionIs(fileName, ".js");
    end
    ts.isJavaScript = isJavaScript;
end)(ts || (ts = {}));
//# sourceMappingURL=file:///C:/Users/qujianbiao/Downloads/TypeScript-master/built/local/services/utilities.js.map