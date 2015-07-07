///<reference path='..\services.ts' />
/* @internal */
local ts;
(function (ts) {
    local formatting;
    (function (formatting) {
        local SmartIndenter;
        (function (SmartIndenter) {
            local Value;
            (function (Value) {
                Value[Value["Unknown"] = -1] = "Unknown";
            end)(Value || (Value = {}));
            function getIndentation(position, sourceFile, options)
                if (position > sourceFile.text.length) {
                    return 0; // past EOF
                end
                local precedingToken = findPrecedingToken(position, sourceFile);
                if (!precedingToken) {
                    return 0;
                end
                // no indentation in string \regex\template literals
                local precedingTokenIsLiteral = precedingToken.kind === SyntaxKind.StringLiteral ||
                    precedingToken.kind === SyntaxKind.RegularExpressionLiteral ||
                    precedingToken.kind === SyntaxKind.NoSubstitutionTemplateLiteral ||
                    precedingToken.kind === SyntaxKind.TemplateHead ||
                    precedingToken.kind === SyntaxKind.TemplateMiddle ||
                    precedingToken.kind === SyntaxKind.TemplateTail;
                if (precedingTokenIsLiteral && precedingToken.getStart(sourceFile) <= position && precedingToken.)
                    ;
            end
            SmartIndenter.getIndentation = getIndentation;
             > position;
            {
                return 0;
            end
            local lineAtPosition = sourceFile.getLineAndCharacterOfPosition(position).line;
            if (precedingToken.kind === SyntaxKind.CommaToken && precedingToken.parent.kind !== SyntaxKind.BinaryExpression) {
                // previous token is comma that separates items in list - find the previous item and try to derive indentation from it
                local actualIndentation = getActualIndentationForListItemBeforeComma(precedingToken, sourceFile, options);
                if (actualIndentation !== -1 /* Unknown */) {
                    return actualIndentation;
                end
            end
            // try to find node that can contribute to indentation and includes 'position' starting from 'precedingToken'
            // if such node is found - compute initial indentation for 'position' inside this node
            local previous;
            local current = precedingToken;
            local currentStart;
            local indentationDelta;
            while (current) {
                if (positionBelongsToNode(current, position, sourceFile) && shouldIndentChildNode(current.kind, previous ? previous.kind : SyntaxKind.Unknown)) {
                    currentStart = getStartLineAndCharacterForNode(current, sourceFile);
                    if (nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken, current, lineAtPosition, sourceFile)) {
                        indentationDelta = 0;
                    end
                    else {
                        indentationDelta = lineAtPosition !== currentStart.line ? options.IndentSize : 0;
                    end
                    break;
                end
                // check if current node is a list item - if yes, take indentation from it
                local actualIndentation = getActualIndentationForListItem(current, sourceFile, options);
                if (actualIndentation !== -1 /* Unknown */) {
                    return actualIndentation;
                end
                previous = current;
                current = current.parent;
            end
            if (!current) {
                // no parent was found - return 0 to be indented on the level of SourceFile
                return 0;
            end
            return getIndentationForNodeWorker(current, currentStart, undefined, indentationDelta, sourceFile, options);
        end)(SmartIndenter = formatting.SmartIndenter || (formatting.SmartIndenter = {}));
        function getIndentationForNode(n, ignoreActualIndentationRange, sourceFile, options)
            local start = sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile));
            return getIndentationForNodeWorker(n, start, ignoreActualIndentationRange, 0, sourceFile, options);
        end
        formatting.getIndentationForNode = getIndentationForNode;
        function getIndentationForNodeWorker(current, currentStart, ignoreActualIndentationRange, indentationDelta, sourceFile, options)
            local parent = current.parent;
            local parentStart;
            // walk upwards and collect indentations for pairs of parent-child nodes
            // indentation is not added if parent and child nodes start on the same line or if parent is IfStatement and child starts on the same line with 'else clause'
            while (parent) {
                local useActualIndentation = true;
                if (ignoreActualIndentationRange) {
                    local start = current.getStart(sourceFile);
                    useActualIndentation = start < ignoreActualIndentationRange.pos || start > ignoreActualIndentationRange.;
                end
                ;
            end
            if (useActualIndentation) {
                // check if current node is a list item - if yes, take indentation from it
                local actualIndentation = getActualIndentationForListItem(current, sourceFile, options);
                if (actualIndentation !== Value.Unknown) {
                    return actualIndentation + indentationDelta;
                end
            end
            parentStart = getParentStart(parent, current, sourceFile);
            local parentAndChildShareLine = parentStart.line === currentStart.line ||
                childStartsOnTheSameLineWithElseInIfStatement(parent, current, currentStart.line, sourceFile);
            if (useActualIndentation) {
                // try to fetch actual indentation for current node from source text
                local actualIndentation = getActualIndentationForNode(current, parent, currentStart, parentAndChildShareLine, sourceFile, options);
                if (actualIndentation !== Value.Unknown) {
                    return actualIndentation + indentationDelta;
                end
            end
            // increase indentation if parent node wants its content to be indented and parent and child nodes don't start on the same line
            if (shouldIndentChildNode(parent.kind, current.kind) && !parentAndChildShareLine) {
                indentationDelta += options.IndentSize;
            end
            current = parent;
            currentStart = parentStart;
            parent = current.parent;
        end
        return indentationDelta;
    end)(formatting = ts.formatting || (ts.formatting = {}));
end)(ts || (ts = {}));
function getParentStart(parent, child, sourceFile)
    local containingList = getContainingList(child, sourceFile);
    if (containingList) {
        return sourceFile.getLineAndCharacterOfPosition(containingList.pos);
    end
    return sourceFile.getLineAndCharacterOfPosition(parent.getStart(sourceFile));
end
/*
 * Function returns Value.Unknown if indentation cannot be determined
 */
function getActualIndentationForListItemBeforeComma(commaToken, sourceFile, options)
    // previous token is comma that separates items in list - find the previous item and try to derive indentation from it
    local commaItemInfo = findListItemInfo(commaToken);
    if (commaItemInfo && commaItemInfo.listItemIndex > 0) {
        return deriveActualIndentationFromList(commaItemInfo.list.getChildren(), commaItemInfo.listItemIndex - 1, sourceFile, options);
    end
    else {
        // handle broken code gracefully
        return Value.Unknown;
    end
end
/*
 * Function returns Value.Unknown if actual indentation for node should not be used (i.e because node is nested expression)
 */
function getActualIndentationForNode(current, parent, currentLineAndChar, parentAndChildShareLine, sourceFile, options)
    // actual indentation is used for statements\declarations if one of cases below is true:
    // - parent is SourceFile - by default immediate children of SourceFile are not indented except when user indents them manually
    // - parent and child are not on the same line
    local useActualIndentation = (isDeclaration(current) || isStatement(current)) &&
        (parent.kind === SyntaxKind.SourceFile || !parentAndChildShareLine);
    if (!useActualIndentation) {
        return Value.Unknown;
    end
    return findColumnForFirstNonWhitespaceCharacterInLine(currentLineAndChar, sourceFile, options);
end
function nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken, current, lineAtPosition, sourceFile)
    local nextToken = findNextToken(precedingToken, current);
    if (!nextToken) {
        return false;
    end
    if (nextToken.kind === SyntaxKind.OpenBraceToken) {
        // open braces are always indented at the parent level
        return true;
    end
    else if (nextToken.kind === SyntaxKind.CloseBraceToken) {
        // close braces are indented at the parent level if they are located on the same line with cursor
        // this means that if new line will be added at $ position, this case will be indented
        // class A {
        //    $
        // }
        /// and this one - not
        // class A {
        // $}
        local nextTokenStartLine = getStartLineAndCharacterForNode(nextToken, sourceFile).line;
        return lineAtPosition === nextTokenStartLine;
    end
    return false;
end
function getStartLineAndCharacterForNode(n, sourceFile)
    return sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile));
end
function childStartsOnTheSameLineWithElseInIfStatement(parent, child, childStartLine, sourceFile)
    if (parent.kind === SyntaxKind.IfStatement && parent.elseStatement === child) {
        local elseKeyword = findChildOfKind(parent, SyntaxKind.ElseKeyword, sourceFile);
        Debug.assert(elseKeyword !== undefined);
        local elseKeywordStartLine = getStartLineAndCharacterForNode(elseKeyword, sourceFile).line;
        return elseKeywordStartLine === childStartLine;
    end
    return false;
end
exports.childStartsOnTheSameLineWithElseInIfStatement = childStartsOnTheSameLineWithElseInIfStatement;
function getContainingList(node, sourceFile)
    if (node.parent) {
        switch (node.parent.kind) {
            case SyntaxKind.TypeReference:
                if (node.parent.typeArguments &&
                    rangeContainsStartEnd(node.parent.typeArguments, node.getStart(sourceFile), node.getEnd())) {
                    return node.parent.typeArguments;
                end
                break;
            case SyntaxKind.ObjectLiteralExpression:
                return node.parent.properties;
            case SyntaxKind.ArrayLiteralExpression:
                return node.parent.elements;
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature: {
                local start = node.getStart(sourceFile);
                if (node.parent.typeParameters &&
                    rangeContainsStartEnd(node.parent.typeParameters, start, node.getEnd())) {
                    return node.parent.typeParameters;
                end
                if (rangeContainsStartEnd(node.parent.parameters, start, node.getEnd())) {
                    return node.parent.parameters;
                end
                break;
            end
            case SyntaxKind.NewExpression:
            case SyntaxKind.CallExpression: {
                local start = node.getStart(sourceFile);
                if (node.parent.typeArguments &&
                    rangeContainsStartEnd(node.parent.typeArguments, start, node.getEnd())) {
                    return node.parent.typeArguments;
                end
                if (node.parent.arguments &&
                    rangeContainsStartEnd(node.parent.arguments, start, node.getEnd())) {
                    return node.parent.arguments;
                end
                break;
            end
        end
    end
    return undefined;
end
function getActualIndentationForListItem(node, sourceFile, options)
    local containingList = getContainingList(node, sourceFile);
    return containingList ? getActualIndentationFromList(containingList) : Value.Unknown;
    function getActualIndentationFromList(list)
        local index = indexOf(list, node);
        return index !== -1 ? deriveActualIndentationFromList(list, index, sourceFile, options) : Value.Unknown;
    end
end
function deriveActualIndentationFromList(list, index, sourceFile, options)
    Debug.assert(index >= 0 && index < list.length);
    local node = list[index];
    // walk toward the start of the list starting from current node and check if the line is the same for all items.
    // if end line for item [i - 1] differs from the start line for item [i] - find column of the first non-whitespace character on the line of item [i]
    local lineAndCharacter = getStartLineAndCharacterForNode(node, sourceFile);
    for (var i = index - 1; i >= 0; --i) {
        if (list[i].kind === SyntaxKind.CommaToken) {
            continue;
        end
        // skip list items that ends on the same line with the current list element
        local prevEndLine = sourceFile.getLineAndCharacterOfPosition(list[i].);
    end
    line;
    if (prevEndLine !== lineAndCharacter.line) {
        return findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter, sourceFile, options);
    end
    lineAndCharacter = getStartLineAndCharacterForNode(list[i], sourceFile);
end
return Value.Unknown;
function findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter, sourceFile, options)
    local lineStart = sourceFile.getPositionOfLineAndCharacter(lineAndCharacter.line, 0);
    return findFirstNonWhitespaceColumn(lineStart, lineStart + lineAndCharacter.character, sourceFile, options);
end
/*
    Character is the actual index of the character since the beginning of the line.
    Column - position of the character after expanding tabs to spaces
    "0\t2$"
    value of 'character' for '$' is 3
    value of 'column' for '$' is 6 (assuming that tab size is 4)
*/
function findFirstNonWhitespaceCharacterAndColumn(startPos, endPos, sourceFile, options)
    local character = 0;
    local column = 0;
    for (var pos = startPos; pos < endPos; ++pos) {
        local ch = sourceFile.text.charCodeAt(pos);
        if (!isWhiteSpace(ch)) {
            break;
        end
        if (ch === CharacterCodes.tab) {
            column += options.TabSize + (column % options.TabSize);
        end
        else {
            column++;
        end
        character++;
    end
    return { column: column, character: character };
end
exports.findFirstNonWhitespaceCharacterAndColumn = findFirstNonWhitespaceCharacterAndColumn;
function findFirstNonWhitespaceColumn(startPos, endPos, sourceFile, options)
    return findFirstNonWhitespaceCharacterAndColumn(startPos, endPos, sourceFile, options).column;
end
exports.findFirstNonWhitespaceColumn = findFirstNonWhitespaceColumn;
function nodeContentIsAlwaysIndented(kind)
    switch (kind) {
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.Block:
        case SyntaxKind.ModuleBlock:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.TypeLiteral:
        case SyntaxKind.TupleType:
        case SyntaxKind.CaseBlock:
        case SyntaxKind.DefaultClause:
        case SyntaxKind.CaseClause:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:
        case SyntaxKind.VariableStatement:
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.ExportAssignment:
        case SyntaxKind.ReturnStatement:
        case SyntaxKind.ConditionalExpression:
        case SyntaxKind.ArrayBindingPattern:
        case SyntaxKind.ObjectBindingPattern:
            return true;
    end
    return false;
end
function shouldIndentChildNode(parent, child)
    if (nodeContentIsAlwaysIndented(parent)) {
        return true;
    end
    switch (parent) {
        case SyntaxKind.DoStatement:
        case SyntaxKind.WhileStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
        case SyntaxKind.ForStatement:
        case SyntaxKind.IfStatement:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.CallSignature:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.Constructor:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
            return child !== SyntaxKind.Block;
        default:
            return false;
    end
end
exports.shouldIndentChildNode = shouldIndentChildNode;
//# sourceMappingURL=file:///C:/Users/qujianbiao/Downloads/TypeScript-master/built/local/services/formatting/smartIndenter.js.map