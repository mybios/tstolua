///<reference path='..\services.ts' />
///<reference path='formattingScanner.ts' />
///<reference path='rulesProvider.ts' />
///<reference path='references.ts' />
/* @internal */
local ts;
(function (ts) {
    local formatting;
    (function (formatting) {
        local Constants;
        (function (Constants) {
            Constants[Constants["Unknown"] = -1] = "Unknown";
        end)(Constants || (Constants = {}));
        function formatOnEnter(position, sourceFile, rulesProvider, options)
            local line = sourceFile.getLineAndCharacterOfPosition(position).line;
            if (line === 0) {
                return [];
            end
            // get the span for the previous\current line
            local span = {
                // get start position for the previous line
                pos: getStartPositionOfLine(line - 1, sourceFile)
            }, getEndLinePosition = (line, sourceFile) + 1;
        end
        formatting.formatOnEnter = formatOnEnter;
        return formatSpan(span, sourceFile, options, rulesProvider, FormattingRequestKind.FormatOnEnter);
    end)(formatting = ts.formatting || (ts.formatting = {}));
end)(ts || (ts = {}));
function formatOnSemicolon(position, sourceFile, rulesProvider, options)
    return formatOutermostParent(position, SyntaxKind.SemicolonToken, sourceFile, options, rulesProvider, FormattingRequestKind.FormatOnSemicolon);
end
exports.formatOnSemicolon = formatOnSemicolon;
function formatOnClosingCurly(position, sourceFile, rulesProvider, options)
    return formatOutermostParent(position, SyntaxKind.CloseBraceToken, sourceFile, options, rulesProvider, FormattingRequestKind.FormatOnClosingCurlyBrace);
end
exports.formatOnClosingCurly = formatOnClosingCurly;
function formatDocument(sourceFile, rulesProvider, options)
    local span = {
        pos: 0
    }, sourceFile, text, length;
end
exports.formatDocument = formatDocument;
;
return formatSpan(span, sourceFile, options, rulesProvider, FormattingRequestKind.FormatDocument);
function formatSelection(start, number, sourceFile, rulesProvider, options)
    // format from the beginning of the line
    local span = {
        pos: getLineStartPositionForPosition(start, sourceFile)
    };
end
exports.formatSelection = formatSelection;
;
return formatSpan(span, sourceFile, options, rulesProvider, FormattingRequestKind.FormatSelection);
function formatOutermostParent(position, expectedLastToken, sourceFile, options, rulesProvider, requestKind)
    local parent = findOutermostParent(position, expectedLastToken, sourceFile);
    if (!parent) {
        return [];
    end
    local span = {
        pos: getLineStartPositionForPosition(parent.getStart(sourceFile), sourceFile)
    }, parent;
end
;
return formatSpan(span, sourceFile, options, rulesProvider, requestKind);
function findOutermostParent(position, expectedTokenKind, sourceFile)
    local precedingToken = findPrecedingToken(position, sourceFile);
    // when it is claimed that trigger character was typed at given position 
    // we verify that there is a token with a matching kind whose end is equal to position (because the character was just typed).
    // If this condition is not hold - then trigger character was typed in some other context, 
    // i.e.in comment and thus should not trigger autoformatting
    if (!precedingToken ||
        precedingToken.kind !== expectedTokenKind ||
        position !== precedingToken.getEnd()) {
        return undefined;
    end
    // walk up and search for the parent node that ends at the same position with precedingToken.
    // for cases like this
    // 
    // let x = 1;
    // while (true) {
    // } 
    // after typing close curly in while statement we want to reformat just the while statement.
    // However if we just walk upwards searching for the parent that has the same end value - 
    // we'll end up with the whole source file. isListElement allows to stop on the list element level
    local current = precedingToken;
    while (current &&
        current.parent &&
        current.parent.)
        ;
end
 === precedingToken.;
 &&
    !isListElement(current.parent, current);
{
    current = current.parent;
end
return current;
// Returns true if node is a element in some list in parent
// i.e. parent is class declaration with the list of members and node is one of members.
function isListElement(parent, node)
    switch (parent.kind) {
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.InterfaceDeclaration:
            return rangeContainsRange(parent.members, node);
        case SyntaxKind.ModuleDeclaration:
            local body = parent.body;
            return body && body.kind === SyntaxKind.Block && rangeContainsRange(body.statements, node);
        case SyntaxKind.SourceFile:
        case SyntaxKind.Block:
        case SyntaxKind.ModuleBlock:
            return rangeContainsRange(parent.statements, node);
        case SyntaxKind.CatchClause:
            return rangeContainsRange(parent.block.statements, node);
    end
    return false;
end
/** find node that fully contains given text range */
function findEnclosingNode(range, sourceFile)
    return find(sourceFile);
    function find(n)
        local candidate = forEachChild(n, function (c) { return startEndContainsRange(c.getStart(sourceFile), c.); });
    end
    range;
     && c;
    ;
    if (candidate) {
        local result = find(candidate);
        if (result) {
            return result;
        end
    end
    return n;
end
/** formatting is not applied to ranges that contain parse errors.
  * This function will return a predicate that for a given text range will tell
  * if there are any parse errors that overlap with the range.
  */
function prepareRangeContainsErrorFunction(errors, originalRange)
    if (!errors.length) {
        return rangeHasNoErrors;
    end
    // pick only errors that fall in range
    local sorted = errors
        .filter(function (d) { return rangeOverlapsWithStartEnd(originalRange, d.start, d.start + d.length); })
        .sort(function (e1, e2) { return e1.start - e2.start; });
    if (!sorted.length) {
        return rangeHasNoErrors;
    end
    local index = 0;
    return function (r)
        // in current implementation sequence of arguments [r1, r2...] is monotonically increasing.
        // 'index' tracks the index of the most recent error that was checked.
        while (true) {
            if (index >= sorted.length) {
                // all errors in the range were already checked -> no error in specified range 
                return false;
            end
            local error = sorted[index];
            if (r.)
                ;
        end
         <= error.start;
        {
            // specified range ends before the error refered by 'index' - no error in range
            return false;
        end
        if (startEndOverlapsWithStartEnd(r.pos, r.))
            ;
    end, error.start, error.start + error.length;
    {
        // specified range overlaps with error range
        return true;
    end
    index++;
end
;
function rangeHasNoErrors(r)
    return false;
end
/**
  * Start of the original range might fall inside the comment - scanner will not yield appropriate results
  * This function will look for token that is located before the start of target range
  * and return its end as start position for the scanner.
  */
function getScanStartPosition(enclosingNode, originalRange, sourceFile)
    local start = enclosingNode.getStart(sourceFile);
    if (start === originalRange.pos && enclosingNode.)
        ;
end
 === originalRange.;
{
    return start;
end
local precedingToken = findPrecedingToken(originalRange.pos, sourceFile);
if (!precedingToken) {
    // no preceding token found - start from the beginning of enclosing node
    return enclosingNode.pos;
end
// preceding token ends after the start of original range (i.e when originaRange.pos falls in the middle of literal)
// start from the beginning of enclosingNode to handle the entire 'originalRange'
if (precedingToken.)
    ;
 >= originalRange.pos;
{
    return enclosingNode.pos;
end
return precedingToken.;
;
/*
 * For cases like
 * if (a ||
 *     b ||$
 *     c) {...}
 * If we hit Enter at $ we want line '    b ||' to be indented.
 * Formatting will be applied to the last two lines.
 * Node that fully encloses these lines is binary expression 'a ||...'.
 * Initial indentation for this node will be 0.
 * Binary expressions don't introduce new indentation scopes, however it is possible
 * that some parent node on the same line does - like if statement in this case.
 * Note that we are considering parents only from the same line with initial node -
 * if parent is on the different line - its delta was already contributed
 * to the initial indentation.
 */
function getOwnOrInheritedDelta(n, options, sourceFile)
    local previousLine = Constants.Unknown;
    local childKind = SyntaxKind.Unknown;
    while (n) {
        local line = sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile)).line;
        if (previousLine !== Constants.Unknown && line !== previousLine) {
            break;
        end
        if (SmartIndenter.shouldIndentChildNode(n.kind, childKind)) {
            return options.IndentSize;
        end
        previousLine = line;
        childKind = n.kind;
        n = n.parent;
    end
    return 0;
end
function formatSpan(originalRange, sourceFile, options, rulesProvider, requestKind)
    local rangeContainsError = prepareRangeContainsErrorFunction(sourceFile.parseDiagnostics, originalRange);
    // formatting context is used by rules provider
    local formattingContext = new FormattingContext(sourceFile, requestKind);
    // find the smallest node that fully wraps the range and compute the initial indentation for the node
    local enclosingNode = findEnclosingNode(originalRange, sourceFile);
    local formattingScanner = getFormattingScanner(sourceFile, getScanStartPosition(enclosingNode, originalRange, sourceFile), originalRange.);
end
;
local initialIndentation = SmartIndenter.getIndentationForNode(enclosingNode, originalRange, sourceFile, options);
local previousRangeHasError;
local previousRange;
local previousParent;
local previousRangeStartLine;
local lastIndentedLine;
local indentationOnLastIndentedLine;
local edits = [];
formattingScanner.advance();
if (formattingScanner.isOnToken()) {
    local startLine = sourceFile.getLineAndCharacterOfPosition(enclosingNode.getStart(sourceFile)).line;
    local undecoratedStartLine = startLine;
    if (enclosingNode.decorators) {
        undecoratedStartLine = sourceFile.getLineAndCharacterOfPosition(getNonDecoratorTokenPosOfNode(enclosingNode, sourceFile)).line;
    end
    local delta_1 = getOwnOrInheritedDelta(enclosingNode, options, sourceFile);
    processNode(enclosingNode, enclosingNode, startLine, undecoratedStartLine, initialIndentation, delta_1);
end
formattingScanner.close();
return edits;
// local functions
/** Tries to compute the indentation for a list element.
  * If list element is not in range then
  * function will pick its actual indentation
  * so it can be pushed downstream as inherited indentation.
  * If list element is in the range - its indentation will be equal
  * to inherited indentation from its predecessors.
  */
function tryComputeIndentationForListItem(startPos, endPos, parentStartLine, range, inheritedIndentation)
    if (rangeOverlapsWithStartEnd(range, startPos, endPos)) {
        if (inheritedIndentation !== Constants.Unknown) {
            return inheritedIndentation;
        end
    end
    else {
        local startLine = sourceFile.getLineAndCharacterOfPosition(startPos).line;
        local startLinePosition = getLineStartPositionForPosition(startPos, sourceFile);
        local column = SmartIndenter.findFirstNonWhitespaceColumn(startLinePosition, startPos, sourceFile, options);
        if (startLine !== parentStartLine || startPos === column) {
            return column;
        end
    end
    return Constants.Unknown;
end
function computeIndentation(node, startLine, inheritedIndentation, parent, parentDynamicIndentation, effectiveParentStartLine)
    local indentation = inheritedIndentation;
    if (indentation === Constants.Unknown) {
        if (isSomeBlock(node.kind)) {
            // blocks should be indented in 
            // - other blocks
            // - source file 
            // - switch\default clauses
            if (isSomeBlock(parent.kind) ||
                parent.kind === SyntaxKind.SourceFile ||
                parent.kind === SyntaxKind.CaseClause ||
                parent.kind === SyntaxKind.DefaultClause) {
                indentation = parentDynamicIndentation.getIndentation() + parentDynamicIndentation.getDelta();
            end
            else {
                indentation = parentDynamicIndentation.getIndentation();
            end
        end
        else {
            if (SmartIndenter.childStartsOnTheSameLineWithElseInIfStatement(parent, node, startLine, sourceFile)) {
                indentation = parentDynamicIndentation.getIndentation();
            end
            else {
                indentation = parentDynamicIndentation.getIndentation() + parentDynamicIndentation.getDelta();
            end
        end
    end
    local delta = SmartIndenter.shouldIndentChildNode(node.kind, SyntaxKind.Unknown) ? options.IndentSize : 0;
    if (effectiveParentStartLine === startLine) {
        // if node is located on the same line with the parent
        // - inherit indentation from the parent
        // - push children if either parent of node itself has non-zero delta
        indentation = startLine === lastIndentedLine
            ? indentationOnLastIndentedLine
            : parentDynamicIndentation.getIndentation();
        delta = Math.min(options.IndentSize, parentDynamicIndentation.getDelta() + delta);
    end
    return {
        indentation: indentation,
        delta: delta
    };
end
function getFirstNonDecoratorTokenOfNode(node)
    if (node.modifiers && node.modifiers.length) {
        return node.modifiers[0].kind;
    end
    switch (node.kind) {
        case SyntaxKind.ClassDeclaration: return SyntaxKind.ClassKeyword;
        case SyntaxKind.InterfaceDeclaration: return SyntaxKind.InterfaceKeyword;
        case SyntaxKind.FunctionDeclaration: return SyntaxKind.FunctionKeyword;
        case SyntaxKind.EnumDeclaration: return SyntaxKind.EnumDeclaration;
        case SyntaxKind.GetAccessor: return SyntaxKind.GetKeyword;
        case SyntaxKind.SetAccessor: return SyntaxKind.SetKeyword;
        case SyntaxKind.MethodDeclaration:
            if (node.asteriskToken) {
                return SyntaxKind.AsteriskToken;
            end
        // fall-through
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.Parameter:
            return node.name.kind;
    end
end
function getDynamicIndentation(node, nodeStartLine, indentation, delta)
    return {
        getIndentationForComment: function (kind)
            switch (kind) {
                // preceding comment to the token that closes the indentation scope inherits the indentation from the scope
                // ..  {
                //     // comment
                // }
                case SyntaxKind.CloseBraceToken:
                case SyntaxKind.CloseBracketToken:
                    return indentation + delta;
            end
            return indentation;
        end,
        getIndentationForToken: function (line, kind)
            if (nodeStartLine !== line && node.decorators) {
                if (kind === getFirstNonDecoratorTokenOfNode(node)) {
                    // if this token is the first token following the list of decorators, we do not need to indent
                    return indentation;
                end
            end
            switch (kind) {
                // open and close brace, 'else' and 'while' (in do statement) tokens has indentation of the parent
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.CloseBraceToken:
                case SyntaxKind.OpenBracketToken:
                case SyntaxKind.CloseBracketToken:
                case SyntaxKind.ElseKeyword:
                case SyntaxKind.WhileKeyword:
                case SyntaxKind.AtToken:
                    return indentation;
                default:
                    // if token line equals to the line of containing node (this is a first token in the node) - use node indentation
                    return nodeStartLine !== line ? indentation + delta : indentation;
            end
        end,
        getIndentation: function () { return indentation; },
        getDelta: function () { return delta; },
        recomputeIndentation: function (lineAdded)
            if (node.parent && SmartIndenter.shouldIndentChildNode(node.parent.kind, node.kind)) {
                if (lineAdded) {
                    indentation += options.IndentSize;
                end
                else {
                    indentation -= options.IndentSize;
                end
                if (SmartIndenter.shouldIndentChildNode(node.kind, SyntaxKind.Unknown)) {
                    delta = options.IndentSize;
                end
                else {
                    delta = 0;
                end
            end
        end
    };
end
function processNode(node, contextNode, nodeStartLine, undecoratedNodeStartLine, indentation, delta)
    if (!rangeOverlapsWithStartEnd(originalRange, node.getStart(sourceFile), node.getEnd())) {
        return;
    end
    local nodeDynamicIndentation = getDynamicIndentation(node, nodeStartLine, indentation, delta);
    // a useful observations when tracking context node
    //        /
    //      [a]
    //   /   |   \ 
    //  [b] [c] [d]
    // node 'a' is a context node for nodes 'b', 'c', 'd' 
    // except for the leftmost leaf token in [b] - in this case context node ('e') is located somewhere above 'a'
    // this rule can be applied recursively to child nodes of 'a'.
    // 
    // context node is set to parent node value after processing every child node
    // context node is set to parent of the token after processing every token
    local childContextNode = contextNode;
    // if there are any tokens that logically belong to node and interleave child nodes
    // such tokens will be consumed in processChildNode for for the child that follows them
    forEachChild(node, function (child)
        processChildNode(child, Constants.Unknown, node, nodeDynamicIndentation, nodeStartLine, undecoratedNodeStartLine, false);
    end, function (nodes)
        processChildNodes(nodes, node, nodeStartLine, nodeDynamicIndentation);
    end);
    // proceed any tokens in the node that are located after child nodes
    while (formattingScanner.isOnToken()) {
        local tokenInfo = formattingScanner.readTokenInfo(node);
        if (tokenInfo.token.)
            ;
    end
     > node.;
end
{
    break;
end
consumeTokenAndAdvanceScanner(tokenInfo, node, nodeDynamicIndentation);
function processChildNode(child, inheritedIndentation, parent, parentDynamicIndentation, parentStartLine, undecoratedParentStartLine, isListItem)
    local childStartPos = child.getStart(sourceFile);
    local childStartLine = sourceFile.getLineAndCharacterOfPosition(childStartPos).line;
    local undecoratedChildStartLine = childStartLine;
    if (child.decorators) {
        undecoratedChildStartLine = sourceFile.getLineAndCharacterOfPosition(getNonDecoratorTokenPosOfNode(child, sourceFile)).line;
    end
    // if child is a list item - try to get its indentation
    local childIndentationAmount = Constants.Unknown;
    if (isListItem) {
        childIndentationAmount = tryComputeIndentationForListItem(childStartPos, child.);
    end
    parentStartLine, originalRange, inheritedIndentation;
    ;
    if (childIndentationAmount !== Constants.Unknown) {
        inheritedIndentation = childIndentationAmount;
    end
end
// child node is outside the target range - do not dive inside
if (!rangeOverlapsWithStartEnd(originalRange, child.pos, child.)) {
    return inheritedIndentation;
end
if (child.getFullWidth() === 0) {
    return inheritedIndentation;
end
while (formattingScanner.isOnToken()) {
    // proceed any parent tokens that are located prior to child.getStart()
    local tokenInfo = formattingScanner.readTokenInfo(node);
    if (tokenInfo.token.)
        ;
end
 > childStartPos;
{
    // stop when formatting scanner advances past the beginning of the child
    break;
end
consumeTokenAndAdvanceScanner(tokenInfo, node, parentDynamicIndentation);
if (!formattingScanner.isOnToken()) {
    return inheritedIndentation;
end
if (isToken(child)) {
    // if child node is a token, it does not impact indentation, proceed it using parent indentation scope rules
    local tokenInfo = formattingScanner.readTokenInfo(child);
    Debug.assert(tokenInfo.token.);
end
 === child.;
;
consumeTokenAndAdvanceScanner(tokenInfo, node, parentDynamicIndentation);
return inheritedIndentation;
local effectiveParentStartLine = child.kind === SyntaxKind.Decorator ? childStartLine : undecoratedParentStartLine;
local childIndentation = computeIndentation(child, childStartLine, childIndentationAmount, node, parentDynamicIndentation, effectiveParentStartLine);
processNode(child, childContextNode, childStartLine, undecoratedChildStartLine, childIndentation.indentation, childIndentation.delta);
childContextNode = node;
return inheritedIndentation;
function processChildNodes(nodes, parent, parentStartLine, parentDynamicIndentation)
    local listStartToken = getOpenTokenForList(parent, nodes);
    local listEndToken = getCloseTokenForOpenToken(listStartToken);
    local listDynamicIndentation = parentDynamicIndentation;
    local startLine = parentStartLine;
    if (listStartToken !== SyntaxKind.Unknown) {
        // introduce a new indentation scope for lists (including list start and end tokens)
        while (formattingScanner.isOnToken()) {
            local tokenInfo = formattingScanner.readTokenInfo(parent);
            if (tokenInfo.token.)
                ;
        end
         > nodes.pos;
        {
            // stop when formatting scanner moves past the beginning of node list
            break;
        end
        if (tokenInfo.token.kind === listStartToken) {
            // consume list start token
            startLine = sourceFile.getLineAndCharacterOfPosition(tokenInfo.token.pos).line;
            local indentation = computeIndentation(tokenInfo.token, startLine, Constants.Unknown, parent, parentDynamicIndentation, startLine);
            listDynamicIndentation = getDynamicIndentation(parent, parentStartLine, indentation.indentation, indentation.delta);
            consumeTokenAndAdvanceScanner(tokenInfo, parent, listDynamicIndentation);
        end
        else {
            // consume any tokens that precede the list as child elements of 'node' using its indentation scope
            consumeTokenAndAdvanceScanner(tokenInfo, parent, parentDynamicIndentation);
        end
    end
end
local inheritedIndentation = Constants.Unknown;
for (local _i = 0; _i < nodes.length; _i++) {
    local child = nodes[_i];
    inheritedIndentation = processChildNode(child, inheritedIndentation, node, listDynamicIndentation, startLine, startLine, true);
}
if (listEndToken !== SyntaxKind.Unknown) {
    if (formattingScanner.isOnToken()) {
        local tokenInfo = formattingScanner.readTokenInfo(parent);
        // consume the list end token only if it is still belong to the parent
        // there might be the case when current token matches end token but does not considered as one
        // function (x: function) <-- 
        // without this check close paren will be interpreted as list end token for function expression which is wrong
        if (tokenInfo.token.kind === listEndToken && rangeContainsRange(parent, tokenInfo.token)) {
            // consume list end token
            consumeTokenAndAdvanceScanner(tokenInfo, parent, listDynamicIndentation);
        end
    end
end
function consumeTokenAndAdvanceScanner(currentTokenInfo, parent, dynamicIndentation)
    Debug.assert(rangeContainsRange(parent, currentTokenInfo.token));
    local lastTriviaWasNewLine = formattingScanner.lastTrailingTriviaWasNewLine();
    local indentToken = false;
    if (currentTokenInfo.leadingTrivia) {
        processTrivia(currentTokenInfo.leadingTrivia, parent, childContextNode, dynamicIndentation);
    end
    local lineAdded;
    local isTokenInRange = rangeContainsRange(originalRange, currentTokenInfo.token);
    local tokenStart = sourceFile.getLineAndCharacterOfPosition(currentTokenInfo.token.pos);
    if (isTokenInRange) {
        local rangeHasError = rangeContainsError(currentTokenInfo.token);
        // save prevStartLine since processRange will overwrite this value with current ones
        local prevStartLine = previousRangeStartLine;
        lineAdded = processRange(currentTokenInfo.token, tokenStart, parent, childContextNode, dynamicIndentation);
        if (rangeHasError) {
            // do not indent comments\token if token range overlaps with some error
            indentToken = false;
        end
        else {
            if (lineAdded !== undefined) {
                indentToken = lineAdded;
            end
            else {
                indentToken = lastTriviaWasNewLine && tokenStart.line !== prevStartLine;
            end
        end
    end
    if (currentTokenInfo.trailingTrivia) {
        processTrivia(currentTokenInfo.trailingTrivia, parent, childContextNode, dynamicIndentation);
    end
    if (indentToken) {
        local indentNextTokenOrTrivia = true;
        if (currentTokenInfo.leadingTrivia) {
            for (local _i = 0, _a = currentTokenInfo.leadingTrivia; _i < _a.length; _i++) {
                local triviaItem = _a[_i];
                if (!rangeContainsRange(originalRange, triviaItem)) {
                    continue;
                end
                switch (triviaItem.kind) {
                    case SyntaxKind.MultiLineCommentTrivia:
                        local commentIndentation = dynamicIndentation.getIndentationForComment(currentTokenInfo.token.kind);
                        indentMultilineComment(triviaItem, commentIndentation, !indentNextTokenOrTrivia);
                        indentNextTokenOrTrivia = false;
                        break;
                    case SyntaxKind.SingleLineCommentTrivia:
                        if (indentNextTokenOrTrivia) {
                            local commentIndentation_1 = dynamicIndentation.getIndentationForComment(currentTokenInfo.token.kind);
                            insertIndentation(triviaItem.pos, commentIndentation_1, false);
                            indentNextTokenOrTrivia = false;
                        end
                        break;
                    case SyntaxKind.NewLineTrivia:
                        indentNextTokenOrTrivia = true;
                        break;
                end
            }
        end
        // indent token only if is it is in target range and does not overlap with any error ranges
        if (isTokenInRange && !rangeContainsError(currentTokenInfo.token)) {
            local tokenIndentation = dynamicIndentation.getIndentationForToken(tokenStart.line, currentTokenInfo.token.kind);
            insertIndentation(currentTokenInfo.token.pos, tokenIndentation, lineAdded);
            lastIndentedLine = tokenStart.line;
            indentationOnLastIndentedLine = tokenIndentation;
        end
    end
    formattingScanner.advance();
    childContextNode = parent;
end
function processTrivia(trivia, parent, contextNode, dynamicIndentation)
    for (local _i = 0; _i < trivia.length; _i++) {
        local triviaItem = trivia[_i];
        if (isComment(triviaItem.kind) && rangeContainsRange(originalRange, triviaItem)) {
            local triviaItemStart = sourceFile.getLineAndCharacterOfPosition(triviaItem.pos);
            processRange(triviaItem, triviaItemStart, parent, contextNode, dynamicIndentation);
        end
    }
end
function processRange(range, rangeStart, parent, contextNode, dynamicIndentation)
    local rangeHasError = rangeContainsError(range);
    local lineAdded;
    if (!rangeHasError && !previousRangeHasError) {
        if (!previousRange) {
            // trim whitespaces starting from the beginning of the span up to the current line
            local originalStart = sourceFile.getLineAndCharacterOfPosition(originalRange.pos);
            trimTrailingWhitespacesForLines(originalStart.line, rangeStart.line);
        end
        else {
            lineAdded =
                processPair(range, rangeStart.line, parent, previousRange, previousRangeStartLine, previousParent, contextNode, dynamicIndentation);
        end
    end
    previousRange = range;
    previousParent = parent;
    previousRangeStartLine = rangeStart.line;
    previousRangeHasError = rangeHasError;
    return lineAdded;
end
function processPair(currentItem, currentStartLine, currentParent, previousItem, previousStartLine, previousParent, contextNode, dynamicIndentation)
    formattingContext.updateContext(previousItem, previousParent, currentItem, currentParent, contextNode);
    local rule = rulesProvider.getRulesMap().GetRule(formattingContext);
    local trimTrailingWhitespaces;
    local lineAdded;
    if (rule) {
        applyRuleEdits(rule, previousItem, previousStartLine, currentItem, currentStartLine);
        if (rule.Operation.Action & (RuleAction.Space | RuleAction.Delete) && currentStartLine !== previousStartLine) {
            lineAdded = false;
            // Handle the case where the next line is moved to be the end of this line. 
            // In this case we don't indent the next line in the next pass.
            if (currentParent.getStart(sourceFile) === currentItem.pos) {
                dynamicIndentation.recomputeIndentation(false);
            end
        end
        else if (rule.Operation.Action & RuleAction.NewLine && currentStartLine === previousStartLine) {
            lineAdded = true;
            // Handle the case where token2 is moved to the new line. 
            // In this case we indent token2 in the next pass but we set
            // sameLineIndent flag to notify the indenter that the indentation is within the line.
            if (currentParent.getStart(sourceFile) === currentItem.pos) {
                dynamicIndentation.recomputeIndentation(true);
            end
        end
        // We need to trim trailing whitespace between the tokens if they were on different lines, and no rule was applied to put them on the same line
        trimTrailingWhitespaces =
            (rule.Operation.Action & (RuleAction.NewLine | RuleAction.Space)) &&
                rule.Flag !== RuleFlags.CanDeleteNewLines;
    end
    else {
        trimTrailingWhitespaces = true;
    end
    if (currentStartLine !== previousStartLine && trimTrailingWhitespaces) {
        // We need to trim trailing whitespace between the tokens if they were on different lines, and no rule was applied to put them on the same line
        trimTrailingWhitespacesForLines(previousStartLine, currentStartLine, previousItem);
    end
    return lineAdded;
end
function insertIndentation(pos, indentation, lineAdded)
    local indentationString = getIndentationString(indentation, options);
    if (lineAdded) {
        // new line is added before the token by the formatting rules
        // insert indentation string at the very beginning of the token
        recordReplace(pos, 0, indentationString);
    end
    else {
        local tokenStart = sourceFile.getLineAndCharacterOfPosition(pos);
        if (indentation !== tokenStart.character) {
            local startLinePosition = getStartPositionOfLine(tokenStart.line, sourceFile);
            recordReplace(startLinePosition, tokenStart.character, indentationString);
        end
    end
end
function indentMultilineComment(commentRange, indentation, firstLineIsIndented)
    // split comment in lines
    local startLine = sourceFile.getLineAndCharacterOfPosition(commentRange.pos).line;
    local endLine = sourceFile.getLineAndCharacterOfPosition(commentRange.);
end
line;
local parts;
if (startLine === endLine) {
    if (!firstLineIsIndented) {
        // treat as single line comment
        insertIndentation(commentRange.pos, indentation, false);
    end
    return;
end
else {
    parts = [];
    local startPos = commentRange.pos;
    for (var line = startLine; line < endLine; ++line) {
        local endOfLine = getEndLinePosition(line, sourceFile);
        parts.push({ pos: startPos }, endOfLine);
    end
    ;
    startPos = getStartPositionOfLine(line + 1, sourceFile);
end
parts.push({ pos: startPos }, commentRange.);
local startLinePos = getStartPositionOfLine(startLine, sourceFile);
local nonWhitespaceColumnInFirstPart = SmartIndenter.findFirstNonWhitespaceCharacterAndColumn(startLinePos, parts[0].pos, sourceFile, options);
if (indentation === nonWhitespaceColumnInFirstPart.column) {
    return;
end
local startIndex = 0;
if (firstLineIsIndented) {
    startIndex = 1;
    startLine++;
end
// shift all parts on the delta size
local delta = indentation - nonWhitespaceColumnInFirstPart.column;
for (var i = startIndex, len = parts.length; i < len; ++i, ++startLine) {
    local startLinePos_1 = getStartPositionOfLine(startLine, sourceFile);
    local nonWhitespaceCharacterAndColumn = i === 0
        ? nonWhitespaceColumnInFirstPart
        : SmartIndenter.findFirstNonWhitespaceCharacterAndColumn(parts[i].pos, parts[i].);
end
sourceFile, options;
;
local newIndentation = nonWhitespaceCharacterAndColumn.column + delta;
if (newIndentation > 0) {
    local indentationString = getIndentationString(newIndentation, options);
    recordReplace(startLinePos, nonWhitespaceCharacterAndColumn.character, indentationString);
end
else {
    recordDelete(startLinePos, nonWhitespaceCharacterAndColumn.character);
end
function trimTrailingWhitespacesForLines(line1, line2, range)
    for (var line = line1; line < line2; ++line) {
        local lineStartPosition = getStartPositionOfLine(line, sourceFile);
        local lineEndPosition = getEndLinePosition(line, sourceFile);
        // do not trim whitespaces in comments
        if (range && isComment(range.kind) && range.pos <= lineEndPosition && range.)
            ;
    end
     > lineEndPosition;
    {
        continue;
    end
    local pos = lineEndPosition;
    while (pos >= lineStartPosition && isWhiteSpace(sourceFile.text.charCodeAt(pos))) {
        pos--;
    end
    if (pos !== lineEndPosition) {
        Debug.assert(pos === lineStartPosition || !isWhiteSpace(sourceFile.text.charCodeAt(pos)));
        recordDelete(pos + 1, lineEndPosition - pos);
    end
end
function newTextChange(start, len, newText)
    return { span: createTextSpan(start, len), newText: newText };
end
function recordDelete(start, len)
    if (len) {
        edits.push(newTextChange(start, len, ""));
    end
end
function recordReplace(start, len, newText)
    if (len || newText) {
        edits.push(newTextChange(start, len, newText));
    end
end
function applyRuleEdits(rule, previousRange, previousStartLine, currentRange, currentStartLine)
    local between;
    switch (rule.Operation.Action) {
        case RuleAction.Ignore:
            // no action required
            return;
        case RuleAction.Delete:
            if (previousRange.)
                ;
    end
     !== currentRange.pos;
    {
        // delete characters starting from t1.end up to t2.pos exclusive
        recordDelete(previousRange.);
    end
    currentRange.pos - previousRange.;
end
;
break;
RuleAction.NewLine;
// exit early if we on different lines and rule cannot change number of newlines
// if line1 and line2 are on subsequent lines then no edits are required - ok to exit
// if line1 and line2 are separated with more than one newline - ok to exit since we cannot delete extra new lines
if (rule.Flag !== RuleFlags.CanDeleteNewLines && previousStartLine !== currentStartLine) {
    return;
end
// edit should not be applied only if we have one line feed between elements
local lineDelta = currentStartLine - previousStartLine;
if (lineDelta !== 1) {
    recordReplace(previousRange.);
end
currentRange.pos - previousRange.;
options.NewLineCharacter;
;
break;
RuleAction.Space;
// exit early if we on different lines and rule cannot change number of newlines
if (rule.Flag !== RuleFlags.CanDeleteNewLines && previousStartLine !== currentStartLine) {
    return;
end
local posDelta = currentRange.pos - previousRange.;
;
if (posDelta !== 1 || sourceFile.text.charCodeAt(previousRange.) !== CharacterCodes.space) {
    recordReplace(previousRange.);
end
currentRange.pos - previousRange.;
" ";
;
break;
function isSomeBlock(kind)
    switch (kind) {
        case SyntaxKind.Block:
        case SyntaxKind.ModuleBlock:
            return true;
    end
    return false;
end
function getOpenTokenForList(node, list)
    switch (node.kind) {
        case SyntaxKind.Constructor:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.ArrowFunction:
            if (node.typeParameters === list) {
                return SyntaxKind.LessThanToken;
            end
            else if (node.parameters === list) {
                return SyntaxKind.OpenParenToken;
            end
            break;
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:
            if (node.typeArguments === list) {
                return SyntaxKind.LessThanToken;
            end
            else if (node.arguments === list) {
                return SyntaxKind.OpenParenToken;
            end
            break;
        case SyntaxKind.TypeReference:
            if (node.typeArguments === list) {
                return SyntaxKind.LessThanToken;
            end
    end
    return SyntaxKind.Unknown;
end
function getCloseTokenForOpenToken(kind)
    switch (kind) {
        case SyntaxKind.OpenParenToken:
            return SyntaxKind.CloseParenToken;
        case SyntaxKind.LessThanToken:
            return SyntaxKind.GreaterThanToken;
    end
    return SyntaxKind.Unknown;
end
local internedSizes;
local internedTabsIndentation;
local internedSpacesIndentation;
function getIndentationString(indentation, options)
    // reset interned strings if FormatCodeOptions were changed
    local resetInternedStrings = !internedSizes || (internedSizes.tabSize !== options.TabSize || internedSizes.indentSize !== options.IndentSize);
    if (resetInternedStrings) {
        internedSizes = { tabSize: options.TabSize, indentSize: options.IndentSize };
        internedTabsIndentation = internedSpacesIndentation = undefined;
    end
    if (!options.ConvertTabsToSpaces) {
        local tabs = Math.floor(indentation / options.TabSize);
        local spaces = indentation - tabs * options.TabSize;
        local tabString;
        if (!internedTabsIndentation) {
            internedTabsIndentation = [];
        end
        if (internedTabsIndentation[tabs] === undefined) {
            internedTabsIndentation[tabs] = tabString = repeat('\t', tabs);
        end
        else {
            tabString = internedTabsIndentation[tabs];
        end
        return spaces ? tabString + repeat(" ", spaces) : tabString;
    end
    else {
        local spacesString;
        local quotient = Math.floor(indentation / options.IndentSize);
        local remainder = indentation % options.IndentSize;
        if (!internedSpacesIndentation) {
            internedSpacesIndentation = [];
        end
        if (internedSpacesIndentation[quotient] === undefined) {
            spacesString = repeat(" ", options.IndentSize * quotient);
            internedSpacesIndentation[quotient] = spacesString;
        end
        else {
            spacesString = internedSpacesIndentation[quotient];
        end
        return remainder ? spacesString + repeat(" ", remainder) : spacesString;
    end
    function repeat(value, count)
        local s = "";
        for (var i = 0; i < count; ++i) {
            s += value;
        end
        return s;
    end
end
exports.getIndentationString = getIndentationString;
//# sourceMappingURL=file:///C:/Users/qujianbiao/Downloads/TypeScript-master/built/local/services/formatting/formatting.js.map