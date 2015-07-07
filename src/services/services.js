/// <reference path="..\compiler\program.ts"/>
local __extends = function(sub, base)
	setmetatable(sub, base)
	base.__index = base
end;
local __new = function(class, ...)
	local new={}
	__extends(new, class)
	if new.constructor ~= nil then
		new:constructor(...)
	end
	return new
end;
var _this = this;local _this = this;
/// <reference path='breakpoints.ts' />
/// <reference path='outliningElementsCollector.ts' />
/// <reference path='navigateTo.ts' />
/// <reference path='navigationBar.ts' />
/// <reference path='patternMatcher.ts' />
/// <reference path='signatureHelp.ts' />
/// <reference path='utilities.ts' />
/// <reference path='formatting\formatting.ts' />
/// <reference path='formatting\smartIndenter.ts' />
local ts;
(function (ts) {
    /** The version of the language service API */
    ts.servicesVersion = "0.4";
    number;
    string;
    /** Gets the length of this script snapshot. */
    getLength();
    number;
    /**
     * Gets the TextChangeRange that describe how the text changed between this text and
     * an older version.  This information is used by the incremental parser to determine
     * what sections of the script need to be re-parsed.  'undefined' can be returned if the
     * change range cannot be determined.  However, in that case, incremental parsing will
     * not happen and the entire document will be re - parsed.
     */
    getChangeRange(oldSnapshot, IScriptSnapshot);
    TextChangeRange;
end)(ts || (ts = {}));
local ScriptSnapshot;
(function (ScriptSnapshot) {
    local StringScriptSnapshot = (function () 
        local StringScriptSnapshot = {}
        StringScriptSnapshot.constructor = function (this, text)
            this.text = text;
            this._lineStartPositions = undefined;
        end;
        return StringScriptSnapshot;
    end)();
    number;
    string;
    {
        return this.text.substring(start);
    end
    ;
end)(ScriptSnapshot = exports.ScriptSnapshot || (exports.ScriptSnapshot = {}));
getLength();
number;
{
    return this.text.length;
end
getChangeRange(oldSnapshot, IScriptSnapshot);
TextChangeRange;
{
    // Text-based snapshots do not support incremental parsing. Return undefined
    // to signal that to the caller.
    return undefined;
end
function fromString(text)
    return new StringScriptSnapshot(text);
end
exports.fromString = fromString;
local scanner = createScanner(ScriptTarget.Latest, true);
local emptyArray = [];
function createNode(kind, pos, number, flags, parent)
    local node = new (getNodeConstructor(kind))();
    node.pos = pos;
    node.;
end
;
node.flags = flags;
node.parent = parent;
return node;
local NodeObject = (function () 
    local NodeObject = {}
    NodeObject.constructor = function (this)
    end;
    return NodeObject;
end)();
number;
flags: NodeFlags;
parent: Node;
_children: Node[];
getSourceFile();
SourceFile;
{
    return getSourceFileOfNode(this);
end
getStart(sourceFile ?  : SourceFile);
number;
{
    return getTokenPosOfNode(this, sourceFile);
end
getFullStart();
number;
{
    return this.pos;
end
getEnd();
number;
{
    return this.;
end
;
getWidth(sourceFile ?  : SourceFile);
number;
{
    return this.getEnd() - this.getStart(sourceFile);
end
getFullWidth();
number;
{
    return this.;
end
-this.getFullStart();
getLeadingTriviaWidth(sourceFile ?  : SourceFile);
number;
{
    return this.getStart(sourceFile) - this.pos;
end
getFullText(sourceFile ?  : SourceFile);
string;
{
    return (sourceFile || this.getSourceFile()).text.substring(this.pos, this.);
end
;
getText(sourceFile ?  : SourceFile);
string;
{
    return (sourceFile || this.getSourceFile()).text.substring(this.getStart(), this.getEnd());
end
addSyntheticNodes(nodes, Node[], pos, number, number);
number;
{
    scanner.setTextPos(pos);
    while (pos < )
        ;
end
{
    local token = scanner.scan();
    local textPos = scanner.getTextPos();
    nodes.push(createNode(token, pos, textPos, NodeFlags.Synthetic, this));
    pos = textPos;
end
return pos;
createSyntaxList(nodes, NodeArray(), Node, {
    let: list = createNode(SyntaxKind.SyntaxList, nodes.pos, nodes.) }, NodeFlags.Synthetic, this);
list._children = [];
local pos = nodes.pos;
for (local _i = 0; _i < nodes.length; _i++) {
    local node_1 = nodes[_i];
    if (pos < node_1.pos) {
        pos = this.addSyntheticNodes(list._children, pos, node_1.pos);
    end
    list._children.push(node_1);
    pos = node_1.;
}
;
if (pos < nodes.)
    ;
{
    this.addSyntheticNodes(list._children, pos, nodes.);
end
;
return list;
createChildren(sourceFile ?  : SourceFile);
{
    local children;
    if (this.kind >= SyntaxKind.FirstNode) {
        scanner.setText((sourceFile || this.getSourceFile()).text);
        children = [];
        local pos_1 = this.pos;
        local processNode = function (node)
            if (pos_1 < node.pos) {
                pos_1 = _this.addSyntheticNodes(children, pos_1, node.pos);
            end
            children.push(node);
            pos_1 = node.;
        end;
    end
    ;
    local processNodes = function (nodes)
        if (pos < nodes.pos) {
            pos = _this.addSyntheticNodes(children, pos, nodes.pos);
        end
        children.push(_this.createSyntaxList(nodes));
        pos = nodes.;
    end;
end
;
forEachChild(this, processNode, processNodes);
if (pos < this.)
    ;
{
    this.addSyntheticNodes(children, pos, this.);
end
;
scanner.setText(undefined);
this._children = children || emptyArray;
getChildCount(sourceFile ?  : SourceFile);
number;
{
    if (!this._children)
        this.createChildren(sourceFile);
    return this._children.length;
end
getChildAt(index, number, sourceFile ?  : SourceFile);
Node;
{
    if (!this._children)
        this.createChildren(sourceFile);
    return this._children[index];
end
getChildren(sourceFile ?  : SourceFile);
Node[];
{
    if (!this._children)
        this.createChildren(sourceFile);
    return this._children;
end
getFirstToken(sourceFile ?  : SourceFile);
Node;
{
    local children = this.getChildren();
    for (local _a = 0; _a < children.length; _a++) {
        local child = children[_a];
        if (child.kind < SyntaxKind.FirstNode) {
            return child;
        end
        return child.getFirstToken(sourceFile);
    }
end
getLastToken(sourceFile ?  : SourceFile);
Node;
{
    local children = this.getChildren(sourceFile);
    for (var i = children.length - 1; i >= 0; i--) {
        local child = children[i];
        if (child.kind < SyntaxKind.FirstNode) {
            return child;
        end
        return child.getLastToken(sourceFile);
    end
end
local SymbolObject = (function () 
    local SymbolObject = {}
    SymbolObject.constructor = function (this, flags, name)
        this.flags = flags;
        this.name = name;
    end;
    SymbolObject.getFlags = function (this)
        return this.flags;
    end;
    SymbolObject.getName = function (this)
        return this.name;
    end;
    SymbolObject.getDeclarations = function (this)
        return this.declarations;
    end;
    SymbolObject.getDocumentationComment = function (this)
        if (this.documentationComment === undefined) {
            this.documentationComment = getJsDocCommentsFromDeclarations(this.declarations, this.name, !(this.flags & SymbolFlags.Property));
        end
        return this.documentationComment;
    end;
    return SymbolObject;
end)();
function getJsDocCommentsFromDeclarations(declarations, name, canUseParsedParamTagComments)
    local documentationComment = [];
    local docComments = getJsDocCommentsSeparatedByNewLines();
    ts.forEach(docComments, function (docComment)
        if (documentationComment.length) {
            documentationComment.push(lineBreakPart());
        end
        documentationComment.push(docComment);
    end);
    return documentationComment;
    function getJsDocCommentsSeparatedByNewLines()
        local paramTag = "@param";
        local jsDocCommentParts = [];
        ts.forEach(declarations, function (declaration, indexOfDeclaration)
            // Make sure we are collecting doc comment from declaration once,
            // In case of union property there might be same declaration multiple times 
            // which only varies in type parameter
            // Eg. let a: Array<string> | Array<number>; a.length
            // The property length will have two declarations of property length coming 
            // from Array<T> - Array<string> and Array<number>
            if (indexOf(declarations, declaration) === indexOfDeclaration) {
                local sourceFileOfDeclaration = getSourceFileOfNode(declaration);
                // If it is parameter - try and get the jsDoc comment with @param tag from function declaration's jsDoc comments
                if (canUseParsedParamTagComments && declaration.kind === SyntaxKind.Parameter) {
                    ts.forEach(getJsDocCommentTextRange(declaration.parent, sourceFileOfDeclaration), function (jsDocCommentTextRange)
                        local cleanedParamJsDocComment = getCleanedParamJsDocComment(jsDocCommentTextRange.pos, jsDocCommentTextRange.);
                    end, sourceFileOfDeclaration);
                    if (cleanedParamJsDocComment) {
                        jsDocCommentParts.push.apply(jsDocCommentParts, cleanedParamJsDocComment);
                    end
                end
            end
        end);
    end
    // If this is left side of dotted module declaration, there is no doc comments associated with this node
    if (declaration.kind === SyntaxKind.ModuleDeclaration && declaration.body.kind === SyntaxKind.ModuleDeclaration) {
        return;
    end
    // If this is dotted module name, get the doc comments from the parent
    while (declaration.kind === SyntaxKind.ModuleDeclaration && declaration.parent.kind === SyntaxKind.ModuleDeclaration) {
        declaration = declaration.parent;
    end
    // Get the cleaned js doc comment text from the declaration
    ts.forEach(getJsDocCommentTextRange(declaration.kind === SyntaxKind.VariableDeclaration ? declaration.parent.parent : declaration, sourceFileOfDeclaration), function (jsDocCommentTextRange)
        local cleanedJsDocComment = getCleanedJsDocComment(jsDocCommentTextRange.pos, jsDocCommentTextRange.);
    end, sourceFileOfDeclaration);
    if (cleanedJsDocComment) {
        jsDocCommentParts.push.apply(jsDocCommentParts, cleanedJsDocComment);
    end
end
;
;
return jsDocCommentParts;
function getJsDocCommentTextRange(node, sourceFile)
    return ts.map(getJsDocComments(node, sourceFile), function (jsDocComment)
        return {
            pos: jsDocComment.pos + "/*".length
        };
        jsDocComment.;
    end, -"*/".length); // Trim off comment end indicator 
end
;
;
function consumeWhiteSpacesOnTheLine(pos, number, sourceFile, maxSpacesToRemove)
    if (maxSpacesToRemove !== undefined) {
    end
    Math.min();
end
pos + maxSpacesToRemove;
;
for (; pos < ; )
    ;
;
pos++;
{
    local ch = sourceFile.text.charCodeAt(pos);
    if (!isWhiteSpace(ch) || isLineBreak(ch)) {
        // Either found lineBreak or non whiteSpace
        return pos;
    end
end
return;
;
function consumeLineBreaks(pos, number, sourceFile)
    while (pos < )
        ;
end
 && isLineBreak(sourceFile.text.charCodeAt(pos));
{
    pos++;
end
return pos;
function isName(pos, number, sourceFile, name)
    return pos + name.length < ;
end
 &&
    sourceFile.text.substr(pos, name.length) === name &&
    (isWhiteSpace(sourceFile.text.charCodeAt(pos + name.length)) ||
        isLineBreak(sourceFile.text.charCodeAt(pos + name.length)));
function isParamTag(pos, number, sourceFile)
    // If it is @param tag
    return isName(pos);
end
sourceFile, paramTag;
;
function pushDocCommentLineText(docComments, text, blankLineCount)
    // Add the empty lines in between texts
    while (blankLineCount--) {
        docComments.push(textPart(""));
    end
    docComments.push(textPart(text));
end
function getCleanedJsDocComment(pos, number, sourceFile)
    local spacesToRemoveAfterAsterisk;
    local docComments = [];
    local blankLineCount = 0;
    local isInParamTag = false;
    while (pos < )
        ;
end
{
    local docCommentTextOfLine = "";
    // First consume leading white space
    pos = consumeWhiteSpacesOnTheLine(pos);
end
sourceFile;
;
// If the comment starts with '*' consume the spaces on this line
if (pos < )
    ;
 && sourceFile.text.charCodeAt(pos) === CharacterCodes.asterisk;
{
    local lineStartPos = pos + 1;
    pos = consumeWhiteSpacesOnTheLine(pos + 1);
end
sourceFile, spacesToRemoveAfterAsterisk;
;
// Set the spaces to remove after asterisk as margin if not already set
if (spacesToRemoveAfterAsterisk === undefined && pos < )
    ;
 && !isLineBreak(sourceFile.text.charCodeAt(pos));
{
    spacesToRemoveAfterAsterisk = pos - lineStartPos;
end
if (spacesToRemoveAfterAsterisk === undefined) {
    spacesToRemoveAfterAsterisk = 0;
end
// Analyse text on this line
while (pos < )
    ;
 && !isLineBreak(sourceFile.text.charCodeAt(pos));
{
    local ch = sourceFile.text.charAt(pos);
    if (ch === "@") {
        // If it is @param tag
        if (isParamTag(pos))
            ;
    end
    sourceFile;
    {
        isInParamTag = true;
        pos += paramTag.length;
        continue;
    end
    {
        isInParamTag = false;
    end
end
// Add the ch to doc text if we arent in param tag
if (!isInParamTag) {
    docCommentTextOfLine += ch;
end
// Scan next character
pos++;
// Continue with next line
pos = consumeLineBreaks(pos, , sourceFile);
if (docCommentTextOfLine) {
    pushDocCommentLineText(docComments, docCommentTextOfLine, blankLineCount);
    blankLineCount = 0;
end
else if (!isInParamTag && docComments.length) {
    // This is blank line when there is text already parsed
    blankLineCount++;
end
return docComments;
function getCleanedParamJsDocComment(pos, number, sourceFile)
    local paramHelpStringMargin;
    local paramDocComments = [];
    while (pos < )
        ;
end
{
    if (isParamTag(pos))
        ;
end
sourceFile;
{
    local blankLineCount = 0;
    local recordedParamTag = false;
    // Consume leading spaces 
    pos = consumeWhiteSpaces(pos + paramTag.length);
    if (pos >= )
        ;
end
{
    break;
end
// Ignore type expression
if (sourceFile.text.charCodeAt(pos) === CharacterCodes.openBrace) {
    pos++;
    for (var curlies = 1; pos < ; )
        ;
end
;
pos++;
{
    local charCode = sourceFile.text.charCodeAt(pos);
    // { character means we need to find another } to match the found one
    if (charCode === CharacterCodes.openBrace) {
        curlies++;
        continue;
    end
    // } char
    if (charCode === CharacterCodes.closeBrace) {
        curlies--;
        if (curlies === 0) {
            // We do not have any more } to match the type expression is ignored completely
            pos++;
            break;
        end
        else {
            // there are more { to be matched with }
            continue;
        end
    end
    // Found start of another tag
    if (charCode === CharacterCodes.at) {
        break;
    end
end
// Consume white spaces
pos = consumeWhiteSpaces(pos);
if (pos >= )
    ;
{
    break;
end
// Parameter name
if (isName(pos, , sourceFile, name)) {
    // Found the parameter we are looking for consume white spaces
    pos = consumeWhiteSpaces(pos + name.length);
    if (pos >= )
        ;
end
{
    break;
end
local paramHelpString = "";
local firstLineParamHelpStringPos = pos;
while (pos < )
    ;
{
    local ch = sourceFile.text.charCodeAt(pos);
    // at line break, set this comment line text and go to next line 
    if (isLineBreak(ch)) {
        if (paramHelpString) {
            pushDocCommentLineText(paramDocComments, paramHelpString, blankLineCount);
            paramHelpString = "";
            blankLineCount = 0;
            recordedParamTag = true;
        end
        else if (recordedParamTag) {
            blankLineCount++;
        end
        // Get the pos after cleaning start of the line
        setPosForParamHelpStringOnNextLine(firstLineParamHelpStringPos);
        continue;
    end
    // Done scanning param help string - next tag found
    if (ch === CharacterCodes.at) {
        break;
    end
    paramHelpString += sourceFile.text.charAt(pos);
    // Go to next character
    pos++;
end
// If there is param help text, add it top the doc comments
if (paramHelpString) {
    pushDocCommentLineText(paramDocComments, paramHelpString, blankLineCount);
end
paramHelpStringMargin = undefined;
// If this is the start of another tag, continue with the loop in seach of param tag with symbol name
if (sourceFile.text.charCodeAt(pos) === CharacterCodes.at) {
    continue;
end
// Next character
pos++;
return paramDocComments;
function consumeWhiteSpaces(pos)
    while (pos < )
        ;
end
 && isWhiteSpace(sourceFile.text.charCodeAt(pos));
{
    pos++;
end
return pos;
function setPosForParamHelpStringOnNextLine(firstLineParamHelpStringPos)
    // Get the pos after consuming line breaks
    pos = consumeLineBreaks(pos);
end
sourceFile;
;
if (pos >= )
    ;
{
    return;
end
if (paramHelpStringMargin === undefined) {
    paramHelpStringMargin = sourceFile.getLineAndCharacterOfPosition(firstLineParamHelpStringPos).character;
end
// Now consume white spaces max 
local startOfLinePos = pos;
pos = consumeWhiteSpacesOnTheLine(pos, , sourceFile, paramHelpStringMargin);
if (pos >= )
    ;
{
    return;
end
local consumedSpaces = pos - startOfLinePos;
if (consumedSpaces < paramHelpStringMargin) {
    local ch = sourceFile.text.charCodeAt(pos);
    if (ch === CharacterCodes.asterisk) {
        // Consume more spaces after asterisk
        pos = consumeWhiteSpacesOnTheLine(pos + 1);
    end
    sourceFile, paramHelpStringMargin - consumedSpaces - 1;
    ;
end
local TypeObject = (function () 
    local TypeObject = {}
    TypeObject.constructor = function (this, checker, flags)
        this.checker = checker;
        this.flags = flags;
    end;
    TypeObject.getFlags = function (this)
        return this.flags;
    end;
    TypeObject.getSymbol = function (this)
        return this.symbol;
    end;
    TypeObject.getProperties = function (this)
        return this.checker.getPropertiesOfType(this);
    end;
    TypeObject.getProperty = function (this, propertyName)
        return this.checker.getPropertyOfType(this, propertyName);
    end;
    TypeObject.getApparentProperties = function (this)
        return this.checker.getAugmentedPropertiesOfType(this);
    end;
    TypeObject.getCallSignatures = function (this)
        return this.checker.getSignaturesOfType(this, SignatureKind.Call);
    end;
    TypeObject.getConstructSignatures = function (this)
        return this.checker.getSignaturesOfType(this, SignatureKind.Construct);
    end;
    TypeObject.getStringIndexType = function (this)
        return this.checker.getIndexTypeOfType(this, IndexKind.String);
    end;
    TypeObject.getNumberIndexType = function (this)
        return this.checker.getIndexTypeOfType(this, IndexKind.Number);
    end;
    return TypeObject;
end)();
local SignatureObject = (function () 
    local SignatureObject = {}
    SignatureObject.constructor = function (this, checker)
        this.checker = checker;
    end;
    SignatureObject.getDeclaration = function (this)
        return this.declaration;
    end;
    SignatureObject.getTypeParameters = function (this)
        return this.typeParameters;
    end;
    SignatureObject.getParameters = function (this)
        return this.parameters;
    end;
    SignatureObject.getReturnType = function (this)
        return this.checker.getReturnTypeOfSignature(this);
    end;
    SignatureObject.getDocumentationComment = function (this)
        if (this.documentationComment === undefined) {
            this.documentationComment = this.declaration ? getJsDocCommentsFromDeclarations([this.declaration], 
            /*name*/ undefined, 
            /*canUseParsedParamTagComments*/ false) : [];
        end
        return this.documentationComment;
    end;
    return SignatureObject;
end)();
local SourceFileObject = (function (_super) 
    local SourceFileObject = {}
    SourceFileObject.constructor = function (this)
        _super.apply(this, arguments);
    end;
    __extends(SourceFileObject, _super);
    SourceFileObject.update = function (this, newText, textChangeRange)
        return updateSourceFile(this, newText, textChangeRange);
    end;
    SourceFileObject.getLineAndCharacterOfPosition = function (this, position)
        return ts.getLineAndCharacterOfPosition(this, position);
    end;
    SourceFileObject.getLineStarts = function (this)
        return getLineStarts(this);
    end;
    SourceFileObject.getPositionOfLineAndCharacter = function (this, line, character)
        return ts.getPositionOfLineAndCharacter(this, line, character);
    end;
    SourceFileObject.getNamedDeclarations = function (this)
        if (!this.namedDeclarations) {
            this.namedDeclarations = this:computeNamedDeclarations();
        end
        return this.namedDeclarations;
    end;
    SourceFileObject.computeNamedDeclarations = function (this)
        local result = {};
        forEachChild(this, visit);
        return result;
        function addDeclaration(declaration)
            local name = getDeclarationName(declaration);
            if (name) {
                local declarations = getDeclarations(name);
                declarations.push(declaration);
            end
        end
        function getDeclarations(name)
            return getProperty(result, name) || (result[name] = []);
        end
        function getDeclarationName(declaration)
            if (declaration.name) {
                local result_1 = getTextOfIdentifierOrLiteral(declaration.name);
                if (result_1 !== undefined) {
                    return result_1;
                end
                if (declaration.name.kind === SyntaxKind.ComputedPropertyName) {
                    local expr = declaration.name.expression;
                    if (expr.kind === SyntaxKind.PropertyAccessExpression) {
                        return expr.name.text;
                    end
                    return getTextOfIdentifierOrLiteral(expr);
                end
            end
            return undefined;
        end
        function getTextOfIdentifierOrLiteral(node)
            if (node) {
                if (node.kind === SyntaxKind.Identifier ||
                    node.kind === SyntaxKind.StringLiteral ||
                    node.kind === SyntaxKind.NumericLiteral) {
                    return node.text;
                end
            end
            return undefined;
        end
        function visit(node)
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    local functionDeclaration = node;
                    local declarationName = getDeclarationName(functionDeclaration);
                    if (declarationName) {
                        local declarations = getDeclarations(declarationName);
                        local lastDeclaration = lastOrUndefined(declarations);
                        // Check whether this declaration belongs to an "overload group".
                        if (lastDeclaration && functionDeclaration.parent === lastDeclaration.parent && functionDeclaration.symbol === lastDeclaration.symbol) {
                            // Overwrite the last declaration if it was an overload
                            // and this one is an implementation.
                            if (functionDeclaration.body && !lastDeclaration.body) {
                                declarations[declarations.length - 1] = functionDeclaration;
                            end
                        end
                        else {
                            declarations.push(functionDeclaration);
                        end
                        forEachChild(node, visit);
                    end
                    break;
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.ExportSpecifier:
                case SyntaxKind.ImportSpecifier:
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.ImportClause:
                case SyntaxKind.NamespaceImport:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.TypeLiteral:
                    addDeclaration(node);
                // fall through
                case SyntaxKind.Constructor:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.VariableDeclarationList:
                case SyntaxKind.ObjectBindingPattern:
                case SyntaxKind.ArrayBindingPattern:
                case SyntaxKind.ModuleBlock:
                    forEachChild(node, visit);
                    break;
                case SyntaxKind.Block:
                    if (isFunctionBlock(node)) {
                        forEachChild(node, visit);
                    end
                    break;
                case SyntaxKind.Parameter:
                    // Only consider properties defined as constructor parameters
                    if (!(node.flags & NodeFlags.AccessibilityModifier)) {
                        break;
                    end
                // fall through
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.BindingElement:
                    if (isBindingPattern(node.name)) {
                        forEachChild(node.name, visit);
                        break;
                    end
                case SyntaxKind.EnumMember:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    addDeclaration(node);
                    break;
                case SyntaxKind.ExportDeclaration:
                    // Handle named exports case e.g.:
                    //    export {a, b as B} from "mod";
                    if (node.exportClause) {
                        forEach(node.exportClause.elements, visit);
                    end
                    break;
                case SyntaxKind.ImportDeclaration:
                    local importClause = node.importClause;
                    if (importClause) {
                        // Handle default import case e.g.:
                        //    import d from "mod";
                        if (importClause.name) {
                            addDeclaration(importClause);
                        end
                        // Handle named bindings in imports e.g.:
                        //    import * as NS from "mod";
                        //    import {a, b as B} from "mod";
                        if (importClause.namedBindings) {
                            if (importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
                                addDeclaration(importClause.namedBindings);
                            end
                            else {
                                forEach(importClause.namedBindings.elements, visit);
                            end
                        end
                    end
                    break;
            end
        end
    end;
    return SourceFileObject;
end)(NodeObject);
number, options;
FormatCodeOptions;
TextChange[];
getFormattingEditsForDocument(fileName, string, options, FormatCodeOptions);
TextChange[];
getFormattingEditsAfterKeystroke(fileName, string, position, number, key, string, options, FormatCodeOptions);
TextChange[];
getEmitOutput(fileName, string);
EmitOutput;
getProgram();
Program;
getSourceFile(fileName, string);
SourceFile;
dispose();
void ;
local TextChange = (function () 
    local TextChange = {}
    TextChange.constructor = function (this)
    end;
    return TextChange;
end)();
exports.TextChange = TextChange;
local HighlightSpanKind;
(function (HighlightSpanKind) {
    HighlightSpanKind.none = "none";
    HighlightSpanKind.definition = "definition";
    HighlightSpanKind.reference = "reference";
    HighlightSpanKind.writtenReference = "writtenReference";
end)(HighlightSpanKind = exports.HighlightSpanKind || (exports.HighlightSpanKind = {}));
(function (SymbolDisplayPartKind) {
    SymbolDisplayPartKind[SymbolDisplayPartKind["aliasName"] = 0] = "aliasName";
    SymbolDisplayPartKind[SymbolDisplayPartKind["className"] = 1] = "className";
    SymbolDisplayPartKind[SymbolDisplayPartKind["enumName"] = 2] = "enumName";
    SymbolDisplayPartKind[SymbolDisplayPartKind["fieldName"] = 3] = "fieldName";
    SymbolDisplayPartKind[SymbolDisplayPartKind["interfaceName"] = 4] = "interfaceName";
    SymbolDisplayPartKind[SymbolDisplayPartKind["keyword"] = 5] = "keyword";
    SymbolDisplayPartKind[SymbolDisplayPartKind["lineBreak"] = 6] = "lineBreak";
    SymbolDisplayPartKind[SymbolDisplayPartKind["numericLiteral"] = 7] = "numericLiteral";
    SymbolDisplayPartKind[SymbolDisplayPartKind["stringLiteral"] = 8] = "stringLiteral";
    SymbolDisplayPartKind[SymbolDisplayPartKind["localName"] = 9] = "localName";
    SymbolDisplayPartKind[SymbolDisplayPartKind["methodName"] = 10] = "methodName";
    SymbolDisplayPartKind[SymbolDisplayPartKind["moduleName"] = 11] = "moduleName";
    SymbolDisplayPartKind[SymbolDisplayPartKind["operator"] = 12] = "operator";
    SymbolDisplayPartKind[SymbolDisplayPartKind["parameterName"] = 13] = "parameterName";
    SymbolDisplayPartKind[SymbolDisplayPartKind["propertyName"] = 14] = "propertyName";
    SymbolDisplayPartKind[SymbolDisplayPartKind["punctuation"] = 15] = "punctuation";
    SymbolDisplayPartKind[SymbolDisplayPartKind["space"] = 16] = "space";
    SymbolDisplayPartKind[SymbolDisplayPartKind["text"] = 17] = "text";
    SymbolDisplayPartKind[SymbolDisplayPartKind["typeParameterName"] = 18] = "typeParameterName";
    SymbolDisplayPartKind[SymbolDisplayPartKind["enumMemberName"] = 19] = "enumMemberName";
    SymbolDisplayPartKind[SymbolDisplayPartKind["functionName"] = 20] = "functionName";
    SymbolDisplayPartKind[SymbolDisplayPartKind["regularExpressionLiteral"] = 21] = "regularExpressionLiteral";
end)(exports.SymbolDisplayPartKind || (exports.SymbolDisplayPartKind = {}));
local SymbolDisplayPartKind = exports.SymbolDisplayPartKind;
(function (OutputFileType) {
    OutputFileType[OutputFileType["JavaScript"] = 0] = "JavaScript";
    OutputFileType[OutputFileType["SourceMap"] = 1] = "SourceMap";
    OutputFileType[OutputFileType["Declaration"] = 2] = "Declaration";
end)(exports.OutputFileType || (exports.OutputFileType = {}));
local OutputFileType = exports.OutputFileType;
(function (EndOfLineState) {
    EndOfLineState[EndOfLineState["None"] = 0] = "None";
    EndOfLineState[EndOfLineState["InMultiLineCommentTrivia"] = 1] = "InMultiLineCommentTrivia";
    EndOfLineState[EndOfLineState["InSingleQuoteStringLiteral"] = 2] = "InSingleQuoteStringLiteral";
    EndOfLineState[EndOfLineState["InDoubleQuoteStringLiteral"] = 3] = "InDoubleQuoteStringLiteral";
    EndOfLineState[EndOfLineState["InTemplateHeadOrNoSubstitutionTemplate"] = 4] = "InTemplateHeadOrNoSubstitutionTemplate";
    EndOfLineState[EndOfLineState["InTemplateMiddleOrTail"] = 5] = "InTemplateMiddleOrTail";
    EndOfLineState[EndOfLineState["InTemplateSubstitutionPosition"] = 6] = "InTemplateSubstitutionPosition";
end)(exports.EndOfLineState || (exports.EndOfLineState = {}));
local EndOfLineState = exports.EndOfLineState;
(function (TokenClass) {
    TokenClass[TokenClass["Punctuation"] = 0] = "Punctuation";
    TokenClass[TokenClass["Keyword"] = 1] = "Keyword";
    TokenClass[TokenClass["Operator"] = 2] = "Operator";
    TokenClass[TokenClass["Comment"] = 3] = "Comment";
    TokenClass[TokenClass["Whitespace"] = 4] = "Whitespace";
    TokenClass[TokenClass["Identifier"] = 5] = "Identifier";
    TokenClass[TokenClass["NumberLiteral"] = 6] = "NumberLiteral";
    TokenClass[TokenClass["StringLiteral"] = 7] = "StringLiteral";
    TokenClass[TokenClass["RegExpLiteral"] = 8] = "RegExpLiteral";
end)(exports.TokenClass || (exports.TokenClass = {}));
local TokenClass = exports.TokenClass;
// TODO: move these to enums
local ScriptElementKind;
(function (ScriptElementKind) {
    ScriptElementKind.unknown = "";
    ScriptElementKind.warning = "warning";
    // predefined type (void) or keyword (class)
    ScriptElementKind.keyword = "keyword";
    // top level script node
    ScriptElementKind.scriptElement = "script";
    // module foo {}
    ScriptElementKind.moduleElement = "module";
    // class X {}
    ScriptElementKind.classElement = "class";
    // interface Y {}
    ScriptElementKind.interfaceElement = "interface";
    // type T = ...
    ScriptElementKind.typeElement = "type";
    // enum E
    ScriptElementKind.enumElement = "enum";
    // Inside module and script only
    // let v = ..
    ScriptElementKind.variableElement = "var";
    // Inside function
    ScriptElementKind.localVariableElement = "local var";
    // Inside module and script only
    // function f() { }
    ScriptElementKind.functionElement = "function";
    // Inside function
    ScriptElementKind.localFunctionElement = "local function";
    // class X { [public|private]* foo() {} }
    ScriptElementKind.memberFunctionElement = "method";
    // class X { [public|private]* [get|set] foo:number; }
    ScriptElementKind.memberGetAccessorElement = "getter";
    ScriptElementKind.memberSetAccessorElement = "setter";
    // class X { [public|private]* foo:number; }
    // interface Y { foo:number; }
    ScriptElementKind.memberVariableElement = "property";
    // class X { constructor() { } }
    ScriptElementKind.constructorImplementationElement = "constructor";
    // interface Y { ():number; }
    ScriptElementKind.callSignatureElement = "call";
    // interface Y { []:number; }
    ScriptElementKind.indexSignatureElement = "index";
    // interface Y { new():Y; }
    ScriptElementKind.constructSignatureElement = "construct";
    // function foo(*Y*: string)
    ScriptElementKind.parameterElement = "parameter";
    ScriptElementKind.typeParameterElement = "type parameter";
    ScriptElementKind.primitiveType = "primitive type";
    ScriptElementKind.label = "label";
    ScriptElementKind.alias = "alias";
    ScriptElementKind.constElement = "const";
    ScriptElementKind.letElement = "let";
end)(ScriptElementKind = exports.ScriptElementKind || (exports.ScriptElementKind = {}));
local ScriptElementKindModifier;
(function (ScriptElementKindModifier) {
    ScriptElementKindModifier.none = "";
    ScriptElementKindModifier.publicMemberModifier = "public";
    ScriptElementKindModifier.privateMemberModifier = "private";
    ScriptElementKindModifier.protectedMemberModifier = "protected";
    ScriptElementKindModifier.exportedModifier = "export";
    ScriptElementKindModifier.ambientModifier = "declare";
    ScriptElementKindModifier.staticModifier = "static";
end)(ScriptElementKindModifier = exports.ScriptElementKindModifier || (exports.ScriptElementKindModifier = {}));
local ClassificationTypeNames = (function () 
    local ClassificationTypeNames = {}
    ClassificationTypeNames.constructor = function (this)
    end;
    ClassificationTypeNames.comment = "comment";
    ClassificationTypeNames.identifier = "identifier";
    ClassificationTypeNames.keyword = "keyword";
    ClassificationTypeNames.numericLiteral = "number";
    ClassificationTypeNames.operator = "operator";
    ClassificationTypeNames.stringLiteral = "string";
    ClassificationTypeNames.whiteSpace = "whitespace";
    ClassificationTypeNames.text = "text";
    ClassificationTypeNames.punctuation = "punctuation";
    ClassificationTypeNames.className = "class name";
    ClassificationTypeNames.enumName = "enum name";
    ClassificationTypeNames.interfaceName = "interface name";
    ClassificationTypeNames.moduleName = "module name";
    ClassificationTypeNames.typeParameterName = "type parameter name";
    ClassificationTypeNames.typeAliasName = "type alias name";
    ClassificationTypeNames.parameterName = "parameter name";
    return ClassificationTypeNames;
end)();
exports.ClassificationTypeNames = ClassificationTypeNames;
(function (ClassificationType) {
    ClassificationType[ClassificationType["comment"] = 1] = "comment";
    ClassificationType[ClassificationType["identifier"] = 2] = "identifier";
    ClassificationType[ClassificationType["keyword"] = 3] = "keyword";
    ClassificationType[ClassificationType["numericLiteral"] = 4] = "numericLiteral";
    ClassificationType[ClassificationType["operator"] = 5] = "operator";
    ClassificationType[ClassificationType["stringLiteral"] = 6] = "stringLiteral";
    ClassificationType[ClassificationType["regularExpressionLiteral"] = 7] = "regularExpressionLiteral";
    ClassificationType[ClassificationType["whiteSpace"] = 8] = "whiteSpace";
    ClassificationType[ClassificationType["text"] = 9] = "text";
    ClassificationType[ClassificationType["punctuation"] = 10] = "punctuation";
    ClassificationType[ClassificationType["className"] = 11] = "className";
    ClassificationType[ClassificationType["enumName"] = 12] = "enumName";
    ClassificationType[ClassificationType["interfaceName"] = 13] = "interfaceName";
    ClassificationType[ClassificationType["moduleName"] = 14] = "moduleName";
    ClassificationType[ClassificationType["typeParameterName"] = 15] = "typeParameterName";
    ClassificationType[ClassificationType["typeAliasName"] = 16] = "typeAliasName";
    ClassificationType[ClassificationType["parameterName"] = 17] = "parameterName";
end)(exports.ClassificationType || (exports.ClassificationType = {}));
local ClassificationType = exports.ClassificationType;
function displayPartsToString(displayParts)
    if (displayParts) {
        return map(displayParts, function (displayPart) { return displayPart.text; }).join("");
    end
    return "";
end
exports.displayPartsToString = displayPartsToString;
function isLocalVariableOrFunction(symbol)
    if (symbol.parent) {
        return false; // This is exported symbol
    end
    return ts.forEach(symbol.declarations, function (declaration)
        // Function expressions are local
        if (declaration.kind === SyntaxKind.FunctionExpression) {
            return true;
        end
        if (declaration.kind !== SyntaxKind.VariableDeclaration && declaration.kind !== SyntaxKind.FunctionDeclaration) {
            return false;
        end
        // If the parent is not sourceFile or module block it is local variable
        for (var parent_1 = declaration.parent; !isFunctionBlock(parent_1); parent_1 = parent_1.parent) {
            // Reached source file or module block
            if (parent_1.kind === SyntaxKind.SourceFile || parent_1.kind === SyntaxKind.ModuleBlock) {
                return false;
            end
        end
        // parent is in function block
        return true;
    end);
end
function getDefaultCompilerOptions()
    // Always default to "ScriptTarget.ES5" for the language service
    return {
        target: ScriptTarget.ES5,
        module: ModuleKind.None
    };
end
exports.getDefaultCompilerOptions = getDefaultCompilerOptions;
local OperationCanceledException = (function () 
    local OperationCanceledException = {}
    OperationCanceledException.constructor = function (this)
    end;
    return OperationCanceledException;
end)();
exports.OperationCanceledException = OperationCanceledException;
local CancellationTokenObject = (function () 
    local CancellationTokenObject = {}
    CancellationTokenObject.constructor = function (this, cancellationToken)
        this.cancellationToken = cancellationToken;
    end;
    CancellationTokenObject.isCancellationRequested = function (this)
        return this.cancellationToken && this.cancellationToken.isCancellationRequested();
    end;
    CancellationTokenObject.throwIfCancellationRequested = function (this)
        if (this:isCancellationRequested()) {
            throw new OperationCanceledException();
        end
    end;
    CancellationTokenObject.None = new CancellationTokenObject(null);
    return CancellationTokenObject;
end)();
exports.CancellationTokenObject = CancellationTokenObject;
// Cache host information about scrip Should be refreshed 
// at each language service public entry point, since we don't know when 
// set of scripts handled by the host changes.
local HostCache = (function () 
    local HostCache = {}
    HostCache.constructor = function (this, host, getCanonicalFileName)
        this.host = host;
        this.getCanonicalFileName = getCanonicalFileName;
        // script id => script index
        this.fileNameToEntry = {};
        // Initialize the list with the root file names
        local rootFileNames = host.getScriptFileNames();
        for (local _i = 0; _i < rootFileNames.length; _i++) {
            local fileName = rootFileNames[_i];
            this:createEntry(fileName);
        }
        // store the compilation settings
        this._compilationSettings = host.getCompilationSettings() || getDefaultCompilerOptions();
    end;
    HostCache.compilationSettings = function (this)
        return this._compilationSettings;
    end;
    HostCache.normalizeFileName = function (this, fileName)
        return this:getCanonicalFileName(normalizeSlashes(fileName));
    end;
    HostCache.createEntry = function (this, fileName)
        local entry;
        local scriptSnapshot = this.host.getScriptSnapshot(fileName);
        if (scriptSnapshot) {
            entry = {
                hostFileName: fileName,
                version: this.host.getScriptVersion(fileName),
                scriptSnapshot: scriptSnapshot
            };
        end
        return this.fileNameToEntry[this:normalizeFileName(fileName)] = entry;
    end;
    HostCache.getEntry = function (this, fileName)
        return lookUp(this.fileNameToEntry, this:normalizeFileName(fileName));
    end;
    HostCache.contains = function (this, fileName)
        return hasProperty(this.fileNameToEntry, this:normalizeFileName(fileName));
    end;
    HostCache.getOrCreateEntry = function (this, fileName)
        if (this:contains(fileName)) {
            return this:getEntry(fileName);
        end
        return this:createEntry(fileName);
    end;
    HostCache.getRootFileNames = function (this)
        var _this = this;local _this = this;
        local fileNames = [];
        forEachKey(this.fileNameToEntry, function (key)
            local entry = _this:getEntry(key);
            if (entry) {
                fileNames.push(entry.hostFileName);
            end
        end);
        return fileNames;
    end;
    HostCache.getVersion = function (this, fileName)
        local file = this:getEntry(fileName);
        return file && file.version;
    end;
    HostCache.getScriptSnapshot = function (this, fileName)
        local file = this:getEntry(fileName);
        return file && file.scriptSnapshot;
    end;
    return HostCache;
end)();
local SyntaxTreeCache = (function () 
    local SyntaxTreeCache = {}
    SyntaxTreeCache.constructor = function (this, host)
        this.host = host;
    end;
    SyntaxTreeCache.getCurrentSourceFile = function (this, fileName)
        local scriptSnapshot = this.host.getScriptSnapshot(fileName);
        if (!scriptSnapshot) {
            // The host does not know about this file.
            throw new Error("Could not find file: '" + fileName + "'.");
        end
        local version = this.host.getScriptVersion(fileName);
        local sourceFile;
        if (this.currentFileName !== fileName) {
            // This is a new file, just parse it
            sourceFile = createLanguageServiceSourceFile(fileName, scriptSnapshot, ScriptTarget.Latest, version, true);
        end
        else if (this.currentFileVersion !== version) {
            // This is the same file, just a newer version. Incrementally parse the file.
            local editRange = scriptSnapshot.getChangeRange(this.currentFileScriptSnapshot);
            sourceFile = updateLanguageServiceSourceFile(this.currentSourceFile, scriptSnapshot, version, editRange);
        end
        if (sourceFile) {
            // All done, ensure state is up to date
            this.currentFileVersion = version;
            this.currentFileName = fileName;
            this.currentFileScriptSnapshot = scriptSnapshot;
            this.currentSourceFile = sourceFile;
        end
        return this.currentSourceFile;
    end;
    return SyntaxTreeCache;
end)();
function setSourceFileFields(sourceFile, scriptSnapshot, version)
    sourceFile.version = version;
    sourceFile.scriptSnapshot = scriptSnapshot;
end
/*
 * This function will compile source text from 'input' argument using specified compiler options.
 * If not options are provided - it will use a set of default compiler options.
 * Extra compiler options that will unconditionally be used bu this function are:
 * - separateCompilation = true
 * - allowNonTsExtensions = true
 */
function transpile(input, compilerOptions, fileName, diagnostics)
    local options = compilerOptions ? clone(compilerOptions) : getDefaultCompilerOptions();
    options.separateCompilation = true;
    // Filename can be non-ts file.
    options.allowNonTsExtensions = true;
    // Parse
    local inputFileName = fileName || "module.ts";
    local sourceFile = createSourceFile(inputFileName, input, options.target);
    // Store syntactic diagnostics
    if (diagnostics && sourceFile.parseDiagnostics) {
        diagnostics.push.apply(diagnostics, sourceFile.parseDiagnostics);
    end
    // Output
    local outputText;
    // Create a compilerHost object to allow the compiler to read and write files
    local compilerHost = {
        getSourceFile: function (fileName, target) { return fileName === inputFileName ? sourceFile : undefined; },
        writeFile: function (name, text, writeByteOrderMark)
            Debug.assert(outputText === undefined, "Unexpected multiple outputs for the file: " + name);
            outputText = text;
        end,
        getDefaultLibFileName: function () { return "lib.d.ts"; },
        useCaseSensitiveFileNames: function () { return false; },
        getCanonicalFileName: function (fileName) { return fileName; },
        getCurrentDirectory: function () { return ""; },
        getNewLine: function () { return (sys && sys.newLine) || "\r\n"; }
    };
    local program = createProgram([inputFileName], options, compilerHost);
    if (diagnostics) {
        diagnostics.push.apply(diagnostics, program.getGlobalDiagnostics());
    end
    // Emit
    program.emit();
    Debug.assert(outputText !== undefined, "Output generation failed");
    return outputText;
end
exports.transpile = transpile;
function createLanguageServiceSourceFile(fileName, scriptSnapshot, scriptTarget, version, setNodeParents)
    local sourceFile = createSourceFile(fileName, scriptSnapshot.getText(0, scriptSnapshot.getLength()), scriptTarget, setNodeParents);
    setSourceFileFields(sourceFile, scriptSnapshot, version);
    // after full parsing we can use table with interned strings as name table
    sourceFile.nameTable = sourceFile.identifiers;
    return sourceFile;
end
exports.createLanguageServiceSourceFile = createLanguageServiceSourceFile;
exports.disableIncrementalParsing = false;
function updateLanguageServiceSourceFile(sourceFile, scriptSnapshot, version, textChangeRange, aggressiveChecks)
    // If we were given a text change range, and our version or open-ness changed, then 
    // incrementally parse this file.
    if (textChangeRange) {
        if (version !== sourceFile.version) {
            // Once incremental parsing is ready, then just call into this function.
            if (!exports.disableIncrementalParsing) {
                local newText;
                // grab the fragment from the beginning of the original text to the beginning of the span
                local prefix = textChangeRange.span.start !== 0
                    ? sourceFile.text.substr(0, textChangeRange.span.start)
                    : "";
                // grab the fragment from the end of the span till the end of the original text
                local suffix = textSpanEnd(textChangeRange.span) !== sourceFile.text.length
                    ? sourceFile.text.substr(textSpanEnd(textChangeRange.span))
                    : "";
                if (textChangeRange.newLength === 0) {
                    // edit was a deletion - just combine prefix and suffix
                    newText = prefix && suffix ? prefix + suffix : prefix || suffix;
                end
                else {
                    // it was actual edit, fetch the fragment of new text that correspond to new span
                    local changedText = scriptSnapshot.getText(textChangeRange.span.start, textChangeRange.span.start + textChangeRange.newLength);
                    // combine prefix, changed text and suffix
                    newText = prefix && suffix
                        ? prefix + changedText + suffix
                        : prefix
                            ? (prefix + changedText)
                            : (changedText + suffix);
                end
                local newSourceFile = updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks);
                setSourceFileFields(newSourceFile, scriptSnapshot, version);
                // after incremental parsing nameTable might not be up-to-date
                // drop it so it can be lazily recreated later
                newSourceFile.nameTable = undefined;
                return newSourceFile;
            end
        end
    end
    // Otherwise, just create a new source file.
    return createLanguageServiceSourceFile(sourceFile.fileName, scriptSnapshot, sourceFile.languageVersion, version, true);
end
exports.updateLanguageServiceSourceFile = updateLanguageServiceSourceFile;
function createDocumentRegistry()
    // Maps from compiler setting target (ES3, ES5, etc.) to all the cached documents we have
    // for those settings.
    local buckets = {};
    function getKeyFromCompilationSettings(settings)
        return "_" + settings.target; //  + "|" + settings.propagateEnumConstantoString()
    end
    function getBucketForCompilationSettings(settings, createIfMissing)
        local key = getKeyFromCompilationSettings(settings);
        local bucket = lookUp(buckets, key);
        if (!bucket && createIfMissing) {
            buckets[key] = bucket = {};
        end
        return bucket;
    end
    function reportStats()
        local bucketInfoArray = Object.keys(buckets).filter(function (name) { return name && name.charAt(0) === '_'; }).map(function (name)
            local entries = lookUp(buckets, name);
            local sourceFiles = [];
            for (var i in entries) {
                local entry = entries[i];
                sourceFiles.push({
                    name: i,
                    refCount: entry.languageServiceRefCount,
                    references: entry.owners.slice(0)
                });
            end
            sourceFiles.sort(function (x, y) { return y.refCount - x.refCount; });
            return {
                bucket: name,
                sourceFiles: sourceFiles
            };
        end);
        return JSON.stringify(bucketInfoArray, null, 2);
    end
    function acquireDocument(fileName, compilationSettings, scriptSnapshot, version)
        return acquireOrUpdateDocument(fileName, compilationSettings, scriptSnapshot, version, true);
    end
    function updateDocument(fileName, compilationSettings, scriptSnapshot, version)
        return acquireOrUpdateDocument(fileName, compilationSettings, scriptSnapshot, version, false);
    end
    function acquireOrUpdateDocument(fileName, compilationSettings, scriptSnapshot, version, acquiring)
        local bucket = getBucketForCompilationSettings(compilationSettings, true);
        local entry = lookUp(bucket, fileName);
        if (!entry) {
            Debug.assert(acquiring, "How could we be trying to update a document that the registry doesn't have?");
            // Have never seen this file with these settings.  Create a new source file for it.
            local sourceFile_1 = createLanguageServiceSourceFile(fileName, scriptSnapshot, compilationSettings.target, version, false);
            bucket[fileName] = entry = {
                sourceFile: sourceFile_1,
                languageServiceRefCount: 0,
                owners: []
            };
        end
        else {
            // We have an entry for this file.  However, it may be for a different version of 
            // the script snapshot.  If so, update it appropriately.  Otherwise, we can just
            // return it as is.
            if (entry.sourceFile.version !== version) {
                entry.sourceFile = updateLanguageServiceSourceFile(entry.sourceFile, scriptSnapshot, version, scriptSnapshot.getChangeRange(entry.sourceFile.scriptSnapshot));
            end
        end
        // If we're acquiring, then this is the first time this LS is asking for this document.
        // Increase our ref count so we know there's another LS using the document.  If we're
        // not acquiring, then that means the LS is 'updating' the file instead, and that means
        // it has already acquired the document previously.  As such, we do not need to increase
        // the ref count.
        if (acquiring) {
            entry.languageServiceRefCount++;
        end
        return entry.sourceFile;
    end
    function releaseDocument(fileName, compilationSettings)
        local bucket = getBucketForCompilationSettings(compilationSettings, false);
        Debug.assert(bucket !== undefined);
        local entry = lookUp(bucket, fileName);
        entry.languageServiceRefCount--;
        Debug.assert(entry.languageServiceRefCount >= 0);
        if (entry.languageServiceRefCount === 0) {
            delete bucket[fileName];
        end
    end
    return {
        acquireDocument: acquireDocument,
        updateDocument: updateDocument,
        releaseDocument: releaseDocument,
        reportStats: reportStats
    };
end
exports.createDocumentRegistry = createDocumentRegistry;
function preProcessFile(sourceText, readImportFiles)
    if (readImportFiles === void 0) { readImportFiles = true; }
    local referencedFiles = [];
    local importedFiles = [];
    local isNoDefaultLib = false;
    function processTripleSlashDirectives()
        local commentRanges = getLeadingCommentRanges(sourceText, 0);
        forEach(commentRanges, function (commentRange)
            local comment = sourceText.substring(commentRange.pos, commentRange.);
        end);
        local referencePathMatchResult = getFileReferenceFromReferencePath(comment, commentRange);
        if (referencePathMatchResult) {
            isNoDefaultLib = referencePathMatchResult.isNoDefaultLib;
            local fileReference = referencePathMatchResult.fileReference;
            if (fileReference) {
                referencedFiles.push(fileReference);
            end
        end
    end
    ;
end
exports.preProcessFile = preProcessFile;
function recordModuleName()
    local importPath = scanner.getTokenValue();
    local pos = scanner.getTokenPos();
    importedFiles.push({
        fileName: importPath,
        pos: pos
    }, pos + importPath.length);
end
;
function processImport()
    scanner.setText(sourceText);
    local token = scanner.scan();
    // Look for:
    //    import "mod";
    //    import d from "mod"
    //    import {a as A } from "mod";
    //    import * as NS  from "mod"
    //    import d, {a, b as B} from "mod"
    //    import i = require("mod");
    //
    //    export * from "mod"
    //    export {a as b} from "mod"
    while (token !== SyntaxKind.EndOfFileToken) {
        if (token === SyntaxKind.ImportKeyword) {
            token = scanner.scan();
            if (token === SyntaxKind.StringLiteral) {
                // import "mod";
                recordModuleName();
                continue;
            end
            else {
                if (token === SyntaxKind.Identifier) {
                    token = scanner.scan();
                    if (token === SyntaxKind.FromKeyword) {
                        token = scanner.scan();
                        if (token === SyntaxKind.StringLiteral) {
                            // import d from "mod";
                            recordModuleName();
                            continue;
                        end
                    end
                    else if (token === SyntaxKind.EqualsToken) {
                        token = scanner.scan();
                        if (token === SyntaxKind.RequireKeyword) {
                            token = scanner.scan();
                            if (token === SyntaxKind.OpenParenToken) {
                                token = scanner.scan();
                                if (token === SyntaxKind.StringLiteral) {
                                    //  import i = require("mod");
                                    recordModuleName();
                                    continue;
                                end
                            end
                        end
                    end
                    else if (token === SyntaxKind.CommaToken) {
                        // consume comma and keep going
                        token = scanner.scan();
                    end
                    else {
                        // unknown syntax
                        continue;
                    end
                end
                if (token === SyntaxKind.OpenBraceToken) {
                    token = scanner.scan();
                    // consume "{ a as B, c, d as D}" clauses
                    while (token !== SyntaxKind.CloseBraceToken) {
                        token = scanner.scan();
                    end
                    if (token === SyntaxKind.CloseBraceToken) {
                        token = scanner.scan();
                        if (token === SyntaxKind.FromKeyword) {
                            token = scanner.scan();
                            if (token === SyntaxKind.StringLiteral) {
                                // import {a as A} from "mod";
                                // import d, {a, b as B} from "mod"
                                recordModuleName();
                            end
                        end
                    end
                end
                else if (token === SyntaxKind.AsteriskToken) {
                    token = scanner.scan();
                    if (token === SyntaxKind.AsKeyword) {
                        token = scanner.scan();
                        if (token === SyntaxKind.Identifier) {
                            token = scanner.scan();
                            if (token === SyntaxKind.FromKeyword) {
                                token = scanner.scan();
                                if (token === SyntaxKind.StringLiteral) {
                                    // import * as NS from "mod"
                                    // import d, * as NS from "mod"
                                    recordModuleName();
                                end
                            end
                        end
                    end
                end
            end
        end
        else if (token === SyntaxKind.ExportKeyword) {
            token = scanner.scan();
            if (token === SyntaxKind.OpenBraceToken) {
                token = scanner.scan();
                // consume "{ a as B, c, d as D}" clauses
                while (token !== SyntaxKind.CloseBraceToken) {
                    token = scanner.scan();
                end
                if (token === SyntaxKind.CloseBraceToken) {
                    token = scanner.scan();
                    if (token === SyntaxKind.FromKeyword) {
                        token = scanner.scan();
                        if (token === SyntaxKind.StringLiteral) {
                            // export {a as A} from "mod";
                            // export {a, b as B} from "mod"
                            recordModuleName();
                        end
                    end
                end
            end
            else if (token === SyntaxKind.AsteriskToken) {
                token = scanner.scan();
                if (token === SyntaxKind.FromKeyword) {
                    token = scanner.scan();
                    if (token === SyntaxKind.StringLiteral) {
                        // export * from "mod"
                        recordModuleName();
                    end
                end
            end
        end
        token = scanner.scan();
    end
    scanner.setText(undefined);
end
if (readImportFiles) {
    processImport();
end
processTripleSlashDirectives();
return { referencedFiles: referencedFiles, importedFiles: importedFiles, isLibFile: isNoDefaultLib };
/// Helpers
function getTargetLabel(referenceNode, labelName)
    while (referenceNode) {
        if (referenceNode.kind === SyntaxKind.LabeledStatement && referenceNode.label.text === labelName) {
            return referenceNode.label;
        end
        referenceNode = referenceNode.parent;
    end
    return undefined;
end
function isJumpStatementTarget(node)
    return node.kind === SyntaxKind.Identifier &&
        (node.parent.kind === SyntaxKind.BreakStatement || node.parent.kind === SyntaxKind.ContinueStatement) &&
        node.parent.label === node;
end
function isLabelOfLabeledStatement(node)
    return node.kind === SyntaxKind.Identifier &&
        node.parent.kind === SyntaxKind.LabeledStatement &&
        node.parent.label === node;
end
/**
 * Whether or not a 'node' is preceded by a label of the given string.
 * Note: 'node' cannot be a SourceFile.
 */
function isLabeledBy(node, labelName)
    for (var owner = node.parent; owner.kind === SyntaxKind.LabeledStatement; owner = owner.parent) {
        if (owner.label.text === labelName) {
            return true;
        end
    end
    return false;
end
function isLabelName(node)
    return isLabelOfLabeledStatement(node) || isJumpStatementTarget(node);
end
function isRightSideOfQualifiedName(node)
    return node.parent.kind === SyntaxKind.QualifiedName && node.parent.right === node;
end
function isRightSideOfPropertyAccess(node)
    return node && node.parent && node.parent.kind === SyntaxKind.PropertyAccessExpression && node.parent.name === node;
end
function isCallExpressionTarget(node)
    if (isRightSideOfPropertyAccess(node)) {
        node = node.parent;
    end
    return node && node.parent && node.parent.kind === SyntaxKind.CallExpression && node.parent.expression === node;
end
function isNewExpressionTarget(node)
    if (isRightSideOfPropertyAccess(node)) {
        node = node.parent;
    end
    return node && node.parent && node.parent.kind === SyntaxKind.NewExpression && node.parent.expression === node;
end
function isNameOfModuleDeclaration(node)
    return node.parent.kind === SyntaxKind.ModuleDeclaration && node.parent.name === node;
end
function isNameOfFunctionDeclaration(node)
    return node.kind === SyntaxKind.Identifier &&
        isFunctionLike(node.parent) && node.parent.name === node;
end
/** Returns true if node is a name of an object literal property, e.g. "a" in x = { "a": 1 } */
function isNameOfPropertyAssignment(node)
    return (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.StringLiteral || node.kind === SyntaxKind.NumericLiteral) &&
        (node.parent.kind === SyntaxKind.PropertyAssignment || node.parent.kind === SyntaxKind.ShorthandPropertyAssignment) && node.parent.name === node;
end
function isLiteralNameOfPropertyDeclarationOrIndexAccess(node)
    if (node.kind === SyntaxKind.StringLiteral || node.kind === SyntaxKind.NumericLiteral) {
        switch (node.parent.kind) {
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.EnumMember:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.ModuleDeclaration:
                return node.parent.name === node;
            case SyntaxKind.ElementAccessExpression:
                return node.parent.argumentExpression === node;
        end
    end
    return false;
end
function isNameOfExternalModuleImportOrDeclaration(node)
    if (node.kind === SyntaxKind.StringLiteral) {
        return isNameOfModuleDeclaration(node) ||
            (isExternalModuleImportEqualsDeclaration(node.parent.parent) && getExternalModuleImportEqualsDeclarationExpression(node.parent.parent) === node);
    end
    return false;
end
/** Returns true if the position is within a comment */
function isInsideComment(sourceFile, token, position)
    // The position has to be: 1. in the leading trivia (before token.getStart()), and 2. within a comment
    return position <= token.getStart(sourceFile) &&
        (isInsideCommentRange(getTrailingCommentRanges(sourceFile.text, token.getFullStart())) ||
            isInsideCommentRange(getLeadingCommentRanges(sourceFile.text, token.getFullStart())));
    function isInsideCommentRange(comments)
        return forEach(comments, function (comment)
            // either we are 1. completely inside the comment, or 2. at the end of the comment
            if (comment.pos < position && position < comment.)
                ;
        end);
        {
            return true;
        end
        if (position === comment.)
            ;
    end
    {
        local text = sourceFile.text;
        local width = comment.;
    end
    -comment.pos;
    // is single line comment or just /*
    if (width <= 2 || text.charCodeAt(comment.pos + 1) === CharacterCodes.slash) {
        return true;
    end
    else {
        // is unterminated multi-line comment
        return !(text.charCodeAt(comment.));
    end
    -1;
     === CharacterCodes.slash &&
        text.charCodeAt(comment.);
end
-2;
 === CharacterCodes.asterisk;
;
return false;
;
local SemanticMeaning;
(function (SemanticMeaning) {
    SemanticMeaning[SemanticMeaning["None"] = 0] = "None";
    SemanticMeaning[SemanticMeaning["Value"] = 1] = "Value";
    SemanticMeaning[SemanticMeaning["Type"] = 2] = "Type";
    SemanticMeaning[SemanticMeaning["Namespace"] = 4] = "Namespace";
    SemanticMeaning[SemanticMeaning["All"] = 7] = "All";
end)(SemanticMeaning || (SemanticMeaning = {}));
local BreakContinueSearchType;
(function (BreakContinueSearchType) {
    BreakContinueSearchType[BreakContinueSearchType["None"] = 0] = "None";
    BreakContinueSearchType[BreakContinueSearchType["Unlabeled"] = 1] = "Unlabeled";
    BreakContinueSearchType[BreakContinueSearchType["Labeled"] = 2] = "Labeled";
    BreakContinueSearchType[BreakContinueSearchType["All"] = 3] = "All";
end)(BreakContinueSearchType || (BreakContinueSearchType = {}));
// A cache of completion entries for keywords, these do not change between sessions
local keywordCompletions = [];
for (var i = SyntaxKind.FirstKeyword; i <= SyntaxKind.LastKeyword; i++) {
    keywordCompletions.push({
        name: tokenToString(i),
        kind: ScriptElementKind.keyword,
        kindModifiers: ScriptElementKindModifier.none,
        sortText: "0"
    });
end
/* @internal */ function getContainerNode(node)
    while (true) {
        node = node.parent;
        if (!node) {
            return undefined;
        end
        switch (node.kind) {
            case SyntaxKind.SourceFile:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.ModuleDeclaration:
                return node;
        end
    end
end
exports.getContainerNode = getContainerNode;
/* @internal */ function getNodeKind(node)
    switch (node.kind) {
        case SyntaxKind.ModuleDeclaration: return ScriptElementKind.moduleElement;
        case SyntaxKind.ClassDeclaration: return ScriptElementKind.classElement;
        case SyntaxKind.InterfaceDeclaration: return ScriptElementKind.interfaceElement;
        case SyntaxKind.TypeAliasDeclaration: return ScriptElementKind.typeElement;
        case SyntaxKind.EnumDeclaration: return ScriptElementKind.enumElement;
        case SyntaxKind.VariableDeclaration:
            return isConst(node)
                ? ScriptElementKind.constElement
                : isLet(node)
                    ? ScriptElementKind.letElement
                    : ScriptElementKind.variableElement;
        case SyntaxKind.FunctionDeclaration: return ScriptElementKind.functionElement;
        case SyntaxKind.GetAccessor: return ScriptElementKind.memberGetAccessorElement;
        case SyntaxKind.SetAccessor: return ScriptElementKind.memberSetAccessorElement;
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
            return ScriptElementKind.memberFunctionElement;
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
            return ScriptElementKind.memberVariableElement;
        case SyntaxKind.IndexSignature: return ScriptElementKind.indexSignatureElement;
        case SyntaxKind.ConstructSignature: return ScriptElementKind.constructSignatureElement;
        case SyntaxKind.CallSignature: return ScriptElementKind.callSignatureElement;
        case SyntaxKind.Constructor: return ScriptElementKind.constructorImplementationElement;
        case SyntaxKind.TypeParameter: return ScriptElementKind.typeParameterElement;
        case SyntaxKind.EnumMember: return ScriptElementKind.variableElement;
        case SyntaxKind.Parameter: return (node.flags & NodeFlags.AccessibilityModifier) ? ScriptElementKind.memberVariableElement : ScriptElementKind.parameterElement;
        case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.ImportSpecifier:
        case SyntaxKind.ImportClause:
        case SyntaxKind.ExportSpecifier:
        case SyntaxKind.NamespaceImport:
            return ScriptElementKind.alias;
    end
    return ScriptElementKind.unknown;
end
exports.getNodeKind = getNodeKind;
function createLanguageService(host, documentRegistry)
    if (documentRegistry === void 0) { documentRegistry = createDocumentRegistry(); }
    local syntaxTreeCache = new SyntaxTreeCache(host);
    local ruleProvider;
    local program;
    local lastProjectVersion;
    local useCaseSensitivefileNames = false;
    local cancellationToken = new CancellationTokenObject(host.getCancellationToken && host.getCancellationToken());
    // Check if the localized messages json is set, otherwise query the host for it
    if (!localizedDiagnosticMessages && host.getLocalizedDiagnosticMessages) {
        localizedDiagnosticMessages = host.getLocalizedDiagnosticMessages();
    end
    function log(message)
        if (host.log) {
            host.log(message);
        end
    end
    function getCanonicalFileName(fileName)
        return useCaseSensitivefileNames ? fileName : fileName.toLowerCase();
    end
    function getValidSourceFile(fileName)
        fileName = normalizeSlashes(fileName);
        local sourceFile = program.getSourceFile(getCanonicalFileName(fileName));
        if (!sourceFile) {
            throw new Error("Could not find file: '" + fileName + "'.");
        end
        return sourceFile;
    end
    function getRuleProvider(options)
        // Ensure rules are initialized and up to date wrt to formatting options
        if (!ruleProvider) {
            ruleProvider = new formatting.RulesProvider();
        end
        ruleProvider.ensureUpToDate(options);
        return ruleProvider;
    end
    function synchronizeHostData()
        // perform fast check if host supports it
        if (host.getProjectVersion) {
            local hostProjectVersion = host.getProjectVersion();
            if (hostProjectVersion) {
                if (lastProjectVersion === hostProjectVersion) {
                    return;
                end
                lastProjectVersion = hostProjectVersion;
            end
        end
        // Get a fresh cache of the host information
        local hostCache = new HostCache(host, getCanonicalFileName);
        // If the program is already up-to-date, we can reuse it
        if (programUpToDate()) {
            return;
        end
        // IMPORTANT - It is critical from this moment onward that we do not check 
        // cancellation tokens.  We are about to mutate source files from a previous program
        // instance.  If we cancel midway through, we may end up in an inconsistent state where
        // the program points to old source files that have been invalidated because of 
        // incremental parsing.
        local oldSettings = program && program.getCompilerOptions();
        local newSettings = hostCache:compilationSettings();
        local changesInCompilationSettingsAffectSyntax = oldSettings && oldSettings.target !== newSettings.target;
        // Now create a new compiler
        local newProgram = createProgram(hostCache:getRootFileNames(), newSettings, {
            getSourceFile: getOrCreateSourceFile,
            getCancellationToken: function () { return cancellationToken; },
            getCanonicalFileName: getCanonicalFileName,
            useCaseSensitiveFileNames: function () { return useCaseSensitivefileNames; },
            getNewLine: function () { return host.getNewLine ? host.getNewLine() : "\r\n"; },
            getDefaultLibFileName: function (options) { return host.getDefaultLibFileName(options); },
            writeFile: function (fileName, data, writeByteOrderMark) end,
            getCurrentDirectory: function () { return host.getCurrentDirectory(); }
        });
        // Release any files we have acquired in the old program but are 
        // not part of the new program.
        if (program) {
            local oldSourceFiles = program.getSourceFiles();
            for (local _i = 0; _i < oldSourceFiles.length; _i++) {
                local oldSourceFile = oldSourceFiles[_i];
                local fileName = oldSourceFile.fileName;
                if (!newProgram.getSourceFile(fileName) || changesInCompilationSettingsAffectSyntax) {
                    documentRegistry.releaseDocument(fileName, oldSettings);
                end
            }
        end
        program = newProgram;
        // Make sure all the nodes in the program are both bound, and have their parent 
        // pointers set property.
        program.getTypeChecker();
        return;
        function getOrCreateSourceFile(fileName)
            // The program is asking for this file, check first if the host can locate it.
            // If the host can not locate the file, then it does not exist. return undefined
            // to the program to allow reporting of errors for missing files.
            local hostFileInformation = hostCache:getOrCreateEntry(fileName);
            if (!hostFileInformation) {
                return undefined;
            end
            // Check if the language version has changed since we last created a program; if they are the same,
            // it is safe to reuse the souceFiles; if not, then the shape of the AST can change, and the oldSourceFile
            // can not be reused. we have to dump all syntax trees and create new ones.
            if (!changesInCompilationSettingsAffectSyntax) {
                // Check if the old program had this file already
                local oldSourceFile = program && program.getSourceFile(fileName);
                if (oldSourceFile) {
                    // We already had a source file for this file name.  Go to the registry to 
                    // ensure that we get the right up to date version of it.  We need this to
                    // address the following 'race'.  Specifically, say we have the following:
                    //
                    //      LS1
                    //          \
                    //           DocumentRegistry
                    //          /
                    //      LS2
                    //
                    // Each LS has a reference to file 'foo.ts' at version 1.  LS2 then updates
                    // it's version of 'foo.ts' to version 2.  This will cause LS2 and the 
                    // DocumentRegistry to have version 2 of the document.  HOwever, LS1 will 
                    // have version 1.  And *importantly* this source file will be *corrupt*.
                    // The act of creating version 2 of the file irrevocably damages the version
                    // 1 file.
                    //
                    // So, later when we call into LS1, we need to make sure that it doesn't use
                    // it's source file any more, and instead defers to DocumentRegistry to get
                    // either version 1, version 2 (or some other version) depending on what the 
                    // host says should be used.
                    return documentRegistry.updateDocument(fileName, newSettings, hostFileInformation.scriptSnapshot, hostFileInformation.version);
                end
            end
            // Could not find this file in the old program, create a new SourceFile for it.
            return documentRegistry.acquireDocument(fileName, newSettings, hostFileInformation.scriptSnapshot, hostFileInformation.version);
        end
        function sourceFileUpToDate(sourceFile)
            return sourceFile && sourceFile.version === hostCache:getVersion(sourceFile.fileName);
        end
        function programUpToDate()
            // If we haven't create a program yet, then it is not up-to-date
            if (!program) {
                return false;
            end
            // If number of files in the program do not match, it is not up-to-date
            local rootFileNames = hostCache:getRootFileNames();
            if (program.getSourceFiles().length !== rootFileNames.length) {
                return false;
            end
            // If any file is not up-to-date, then the whole program is not up-to-date
            for (local _i = 0; _i < rootFileNames.length; _i++) {
                local fileName = rootFileNames[_i];
                if (!sourceFileUpToDate(program.getSourceFile(fileName))) {
                    return false;
                end
            }
            // If the compilation settings do no match, then the program is not up-to-date
            return compareDataObjects(program.getCompilerOptions(), hostCache:compilationSettings());
        end
    end
    function getProgram()
        synchronizeHostData();
        return program;
    end
    function cleanupSemanticCache()
        // TODO: Should we jettison the program (or it's type checker) here?
    end
    function dispose()
        if (program) {
            forEach(program.getSourceFiles(), function (f) {
                return documentRegistry.releaseDocument(f.fileName, program.getCompilerOptions());
            });
        end
    end
    /// Diagnostics
    function getSyntacticDiagnostics(fileName)
        synchronizeHostData();
        return program.getSyntacticDiagnostics(getValidSourceFile(fileName));
    end
    /**
     * getSemanticDiagnostiscs return array of Diagnostics. If '-d' is not enabled, only report semantic errors
     * If '-d' enabled, report both semantic and emitter errors
     */
    function getSemanticDiagnostics(fileName)
        synchronizeHostData();
        local targetSourceFile = getValidSourceFile(fileName);
        // For JavaScript files, we don't want to report the normal typescript semantic errors.
        // Instead, we just report errors for using TypeScript-only constructs from within a 
        // JavaScript file.
        if (isJavaScript(fileName)) {
            return getJavaScriptSemanticDiagnostics(targetSourceFile);
        end
        // Only perform the action per file regardless of '-out' flag as LanguageServiceHost is expected to call this function per file.
        // Therefore only get diagnostics for given file.
        local semanticDiagnostics = program.getSemanticDiagnostics(targetSourceFile);
        if (!program.getCompilerOptions().declaration) {
            return semanticDiagnostics;
        end
        // If '-d' is enabled, check for emitter error. One example of emitter error is export class implements non-export interface
        local declarationDiagnostics = program.getDeclarationDiagnostics(targetSourceFile);
        return concatenate(semanticDiagnostics, declarationDiagnostics);
    end
    function getJavaScriptSemanticDiagnostics(sourceFile)
        local diagnostics = [];
        walk(sourceFile);
        return diagnostics;
        function walk(node)
            if (!node) {
                return false;
            end
            switch (node.kind) {
                case SyntaxKind.ImportEqualsDeclaration:
                    diagnostics.push(createDiagnosticForNode(node, Diagnostics.import_can_only_be_used_in_a_ts_file));
                    return true;
                case SyntaxKind.ExportAssignment:
                    diagnostics.push(createDiagnosticForNode(node, Diagnostics.export_can_only_be_used_in_a_ts_file));
                    return true;
                case SyntaxKind.ClassDeclaration:
                    local classDeclaration = node;
                    if (checkModifiers(classDeclaration.modifiers) ||
                        checkTypeParameters(classDeclaration.typeParameters)) {
                        return true;
                    end
                    break;
                case SyntaxKind.HeritageClause:
                    local heritageClause = node;
                    if (heritageClause.token === SyntaxKind.ImplementsKeyword) {
                        diagnostics.push(createDiagnosticForNode(node, Diagnostics.implements_clauses_can_only_be_used_in_a_ts_file));
                        return true;
                    end
                    break;
                case SyntaxKind.InterfaceDeclaration:
                    diagnostics.push(createDiagnosticForNode(node, Diagnostics.interface_declarations_can_only_be_used_in_a_ts_file));
                    return true;
                case SyntaxKind.ModuleDeclaration:
                    diagnostics.push(createDiagnosticForNode(node, Diagnostics.module_declarations_can_only_be_used_in_a_ts_file));
                    return true;
                case SyntaxKind.TypeAliasDeclaration:
                    diagnostics.push(createDiagnosticForNode(node, Diagnostics.type_aliases_can_only_be_used_in_a_ts_file));
                    return true;
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.FunctionDeclaration:
                    local functionDeclaration = node;
                    if (checkModifiers(functionDeclaration.modifiers) ||
                        checkTypeParameters(functionDeclaration.typeParameters) ||
                        checkTypeAnnotation(functionDeclaration.type)) {
                        return true;
                    end
                    break;
                case SyntaxKind.VariableStatement:
                    local variableStatement = node;
                    if (checkModifiers(variableStatement.modifiers)) {
                        return true;
                    end
                    break;
                case SyntaxKind.VariableDeclaration:
                    local variableDeclaration = node;
                    if (checkTypeAnnotation(variableDeclaration.type)) {
                        return true;
                    end
                    break;
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                    local expression = node;
                    if (expression.typeArguments && expression.typeArguments.length > 0) {
                        local start = expression.typeArguments.pos;
                        diagnostics.push(createFileDiagnostic(sourceFile, start, expression.typeArguments.));
                    end
                    -start,
                        Diagnostics.type_arguments_can_only_be_used_in_a_ts_file;
                    ;
                    return true;
            end
            break;
            SyntaxKind.Parameter;
            local parameter = node;
            if (parameter.modifiers) {
                local start = parameter.modifiers.pos;
                diagnostics.push(createFileDiagnostic(sourceFile, start, parameter.modifiers.));
            end
            -start,
                Diagnostics.parameter_modifiers_can_only_be_used_in_a_ts_file;
            ;
            return true;
        end
        if (parameter.questionToken) {
            diagnostics.push(createDiagnosticForNode(parameter.questionToken, Diagnostics.can_only_be_used_in_a_ts_file));
            return true;
        end
        if (parameter.type) {
            diagnostics.push(createDiagnosticForNode(parameter.type, Diagnostics.types_can_only_be_used_in_a_ts_file));
            return true;
        end
        break;
        SyntaxKind.PropertyDeclaration;
        diagnostics.push(createDiagnosticForNode(node, Diagnostics.property_declarations_can_only_be_used_in_a_ts_file));
        return true;
        SyntaxKind.EnumDeclaration;
        diagnostics.push(createDiagnosticForNode(node, Diagnostics.enum_declarations_can_only_be_used_in_a_ts_file));
        return true;
        SyntaxKind.TypeAssertionExpression;
        local typeAssertionExpression = node;
        diagnostics.push(createDiagnosticForNode(typeAssertionExpression.type, Diagnostics.type_assertion_expressions_can_only_be_used_in_a_ts_file));
        return true;
        SyntaxKind.Decorator;
        diagnostics.push(createDiagnosticForNode(node, Diagnostics.decorators_can_only_be_used_in_a_ts_file));
        return true;
    end
    return forEachChild(node, walk);
end
exports.createLanguageService = createLanguageService;
function checkTypeParameters(typeParameters)
    if (typeParameters) {
        local start = typeParameters.pos;
        diagnostics.push(createFileDiagnostic(sourceFile, start, typeParameters.));
    end
    -start, Diagnostics.type_parameter_declarations_can_only_be_used_in_a_ts_file;
    ;
    return true;
end
return false;
function checkTypeAnnotation(type)
    if (type) {
        diagnostics.push(createDiagnosticForNode(type, Diagnostics.types_can_only_be_used_in_a_ts_file));
        return true;
    end
    return false;
end
function checkModifiers(modifiers)
    if (modifiers) {
        for (local _i = 0; _i < modifiers.length; _i++) {
            local modifier = modifiers[_i];
            switch (modifier.kind) {
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.DeclareKeyword:
                    diagnostics.push(createDiagnosticForNode(modifier, Diagnostics._0_can_only_be_used_in_a_ts_file, tokenToString(modifier.kind)));
                    return true;
                // These are all legal modifiers.
                case SyntaxKind.StaticKeyword:
                case SyntaxKind.ExportKeyword:
                case SyntaxKind.ConstKeyword:
                case SyntaxKind.DefaultKeyword:
            end
        }
    end
    return false;
end
function getCompilerOptionsDiagnostics()
    synchronizeHostData();
    return program.getGlobalDiagnostics();
end
/// Completion
function getCompletionEntryDisplayNameForSymbol(symbol, target, performCharacterChecks)
    local displayName = symbol.getName();
    if (displayName) {
        // If this is the default export, get the name of the declaration if it exists
        if (displayName === "default") {
            local localSymbol = getLocalSymbolForExportDefault(symbol);
            if (localSymbol && localSymbol.name) {
                displayName = symbol.valueDeclaration.localSymbol.name;
            end
        end
        local firstCharCode = displayName.charCodeAt(0);
        // First check of the displayName is not external module; if it is an external module, it is not valid entry
        if ((symbol.flags & SymbolFlags.Namespace) && (firstCharCode === CharacterCodes.singleQuote || firstCharCode === CharacterCodes.doubleQuote)) {
            // If the symbol is external module, don't show it in the completion list
            // (i.e declare module "http" { let x; } | // <= request completion here, "http" should not be there)
            return undefined;
        end
    end
    return getCompletionEntryDisplayName(displayName, target, performCharacterChecks);
end
function getCompletionEntryDisplayName(displayName, target, performCharacterChecks)
    if (!displayName) {
        return undefined;
    end
    local firstCharCode = displayName.charCodeAt(0);
    if (displayName.length >= 2 &&
        firstCharCode === displayName.charCodeAt(displayName.length - 1) &&
        (firstCharCode === CharacterCodes.singleQuote || firstCharCode === CharacterCodes.doubleQuote)) {
        // If the user entered name for the symbol was quoted, removing the quotes is not enough, as the name could be an
        // invalid identifier name. We need to check if whatever was inside the quotes is actually a valid identifier name.
        displayName = displayName.substring(1, displayName.length - 1);
    end
    if (!displayName) {
        return undefined;
    end
    if (performCharacterChecks) {
        if (!isIdentifierStart(displayName.charCodeAt(0), target)) {
            return undefined;
        end
        for (var i = 1, n = displayName.length; i < n; i++) {
            if (!isIdentifierPart(displayName.charCodeAt(i), target)) {
                return undefined;
            end
        end
    end
    return unescapeIdentifier(displayName);
end
function getCompletionData(fileName, position)
    local typeChecker = program.getTypeChecker();
    local syntacticStart = new Date().getTime();
    local sourceFile = getValidSourceFile(fileName);
    local start = new Date().getTime();
    local currentToken = getTokenAtPosition(sourceFile, position);
    log("getCompletionData: Get current token: " + (new Date().getTime() - start));
    start = new Date().getTime();
    // Completion not allowed inside comments, bail out if this is the case
    local insideComment = isInsideComment(sourceFile, currentToken, position);
    log("getCompletionData: Is inside comment: " + (new Date().getTime() - start));
    if (insideComment) {
        log("Returning an empty list because completion was inside a comment.");
        return undefined;
    end
    start = new Date().getTime();
    local previousToken = findPrecedingToken(position, sourceFile);
    log("getCompletionData: Get previous token 1: " + (new Date().getTime() - start));
    // The decision to provide completion depends on the contextToken, which is determined through the previousToken.
    // Note: 'previousToken' (and thus 'contextToken') can be undefined if we are the beginning of the file
    local contextToken = previousToken;
    // Check if the caret is at the end of an identifier; this is a partial identifier that we want to complete: e.g. a.toS|
    // Skip this partial identifier and adjust the contextToken to the token that precedes it.
    if (contextToken && position <= contextToken.)
        ;
end
 && isWord(contextToken.kind);
{
    local start = new Date().getTime();
    contextToken = findPrecedingToken(contextToken.getFullStart(), sourceFile);
    log("getCompletionData: Get previous token 2: " + (new Date().getTime() - start));
end
// Check if this is a valid completion location
if (contextToken && isCompletionListBlocker(contextToken)) {
    log("Returning an empty list because completion was requested in an invalid position.");
    return undefined;
end
// Find the node where completion is requested on, in the case of a completion after 
// a dot, it is the member access expression other wise, it is a request for all 
// visible symbols in the scope, and the node is the current location.
local node = currentToken;
local isRightOfDot = false;
if (contextToken && contextToken.kind === SyntaxKind.DotToken && contextToken.parent.kind === SyntaxKind.PropertyAccessExpression) {
    node = contextToken.parent.expression;
    isRightOfDot = true;
end
else if (contextToken && contextToken.kind === SyntaxKind.DotToken && contextToken.parent.kind === SyntaxKind.QualifiedName) {
    node = contextToken.parent.left;
    isRightOfDot = true;
end
local location = getTouchingPropertyName(sourceFile, position);
local target = program.getCompilerOptions().target;
local semanticStart = new Date().getTime();
local isMemberCompletion;
local isNewIdentifierLocation;
local symbols = [];
if (isRightOfDot) {
    getTypeScriptMemberSymbols();
end
else {
    // For JavaScript or TypeScript, if we're not after a dot, then just try to get the
    // global symbols in scope.  These results should be valid for either language as
    // the set of symbols that can be referenced from this location.
    if (!tryGetGlobalSymbols()) {
        return undefined;
    end
end
log("getCompletionData: Semantic work: " + (new Date().getTime() - semanticStart));
return { symbols: symbols, isMemberCompletion: isMemberCompletion, isNewIdentifierLocation: isNewIdentifierLocation, location: location, isRightOfDot: isRightOfDot };
function getTypeScriptMemberSymbols()
    // Right of dot member completion list
    isMemberCompletion = true;
    isNewIdentifierLocation = false;
    if (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.QualifiedName || node.kind === SyntaxKind.PropertyAccessExpression) {
        local symbol_1 = typeChecker.getSymbolAtLocation(node);
        // This is an alias, follow what it aliases
        if (symbol_1 && symbol_1.flags & SymbolFlags.Alias) {
            symbol_1 = typeChecker.getAliasedSymbol(symbol_1);
        end
        if (symbol_1 && symbol_1.flags & SymbolFlags.HasExports) {
            // Extract module or enum members
            local exportedSymbols = typeChecker.getExportsOfModule(symbol_1);
            forEach(exportedSymbols, function (symbol)
                if (typeChecker.isValidPropertyAccess((node.parent), symbol.name)) {
                    symbols.push(symbol);
                end
            end);
        end
    end
    local type = typeChecker.getTypeAtLocation(node);
    if (type) {
        // Filter private properties
        forEach(type.getApparentProperties(), function (symbol)
            if (typeChecker.isValidPropertyAccess((node.parent), symbol.name)) {
                symbols.push(symbol);
            end
        end);
    end
end
function tryGetGlobalSymbols()
    local containingObjectLiteral = getContainingObjectLiteralApplicableForCompletion(contextToken);
    if (containingObjectLiteral) {
        // Object literal expression, look up possible property names from contextual type
        isMemberCompletion = true;
        isNewIdentifierLocation = true;
        local contextualType = typeChecker.getContextualType(containingObjectLiteral);
        if (!contextualType) {
            return false;
        end
        local contextualTypeMembers = typeChecker.getPropertiesOfType(contextualType);
        if (contextualTypeMembers && contextualTypeMembers.length > 0) {
            // Add filtered items to the completion list
            symbols = filterContextualMembersList(contextualTypeMembers, containingObjectLiteral.properties);
        end
    end
    else if (getAncestor(contextToken, SyntaxKind.ImportClause)) {
        // cursor is in import clause
        // try to show exported member for imported module
        isMemberCompletion = true;
        isNewIdentifierLocation = true;
        if (showCompletionsInImportsClause(contextToken)) {
            local importDeclaration = getAncestor(contextToken, SyntaxKind.ImportDeclaration);
            Debug.assert(importDeclaration !== undefined);
            local exports;
            if (importDeclaration.moduleSpecifier) {
                local moduleSpecifierSymbol = typeChecker.getSymbolAtLocation(importDeclaration.moduleSpecifier);
                if (moduleSpecifierSymbol) {
                    exports = typeChecker.getExportsOfModule(moduleSpecifierSymbol);
                end
            end
            //let exports = typeInfoResolver.getExportsOfImportDeclaration(importDeclaration);
            symbols = exports ? filterModuleExports(exports, importDeclaration) : emptyArray;
        end
    end
    else {
        // Get all entities in the current scope.
        isMemberCompletion = false;
        isNewIdentifierLocation = isNewIdentifierDefinitionLocation(contextToken);
        if (previousToken !== contextToken) {
            Debug.assert(!!previousToken, "Expected 'contextToken' to be defined when different from 'previousToken'.");
        end
        // We need to find the node that will give us an appropriate scope to begin
        // aggregating completion candidates. This is achieved in 'getScopeNode'
        // by finding the first node that encompasses a position, accounting for whether a node
        // is "complete" to decide whether a position belongs to the node.
        // 
        // However, at the end of an identifier, we are interested in the scope of the identifier
        // itself, but fall outside of the identifier. For instance:
        // 
        //      xyz => x$
        //
        // the cursor is outside of both the 'x' and the arrow function 'xyz => x',
        // so 'xyz' is not returned in our results.
        //
        // We define 'adjustedPosition' so that we may appropriately account for
        // being at the end of an identifier. The intention is that if requesting completion
        // at the end of an identifier, it should be effectively equivalent to requesting completion
        // anywhere inside/at the beginning of the identifier. So in the previous case, the
        // 'adjustedPosition' will work as if requesting completion in the following:
        //
        //      xyz => $x
        //
        // If previousToken !== contextToken, then
        //   - 'contextToken' was adjusted to the token prior to 'previousToken'
        //      because we were at the end of an identifier.
        //   - 'previousToken' is defined.
        local adjustedPosition = previousToken !== contextToken ?
            previousToken.getStart() :
            position;
        local scopeNode = getScopeNode(contextToken, adjustedPosition, sourceFile) || sourceFile;
        /// TODO filter meaning based on the current context
        local symbolMeanings = SymbolFlags.Type | SymbolFlags.Value | SymbolFlags.Namespace | SymbolFlags.Alias;
        symbols = typeChecker.getSymbolsInScope(scopeNode, symbolMeanings);
    end
    return true;
end
/**
 * Finds the first node that "embraces" the position, so that one may
 * accurately aggregate locals from the closest containing scope.
 */
function getScopeNode(initialToken, position, sourceFile)
    local scope = initialToken;
    while (scope && !positionBelongsToNode(scope, position, sourceFile)) {
        scope = scope.parent;
    end
    return scope;
end
function isCompletionListBlocker(previousToken)
    local start = new Date().getTime();
    local result = isInStringOrRegularExpressionOrTemplateLiteral(previousToken) ||
        isIdentifierDefinitionLocation(previousToken) ||
        isRightOfIllegalDot(previousToken);
    log("getCompletionsAtPosition: isCompletionListBlocker: " + (new Date().getTime() - start));
    return result;
end
function showCompletionsInImportsClause(node)
    if (node) {
        // import {| 
        // import {a,|
        if (node.kind === SyntaxKind.OpenBraceToken || node.kind === SyntaxKind.CommaToken) {
            return node.parent.kind === SyntaxKind.NamedImports;
        end
    end
    return false;
end
function isNewIdentifierDefinitionLocation(previousToken)
    if (previousToken) {
        local containingNodeKind = previousToken.parent.kind;
        switch (previousToken.kind) {
            case SyntaxKind.CommaToken:
                return containingNodeKind === SyntaxKind.CallExpression // func( a, |
                    || containingNodeKind === SyntaxKind.Constructor // constructor( a, |   public, protected, private keywords are allowed here, so show completion
                    || containingNodeKind === SyntaxKind.NewExpression // new C(a, |
                    || containingNodeKind === SyntaxKind.ArrayLiteralExpression // [a, |
                    || containingNodeKind === SyntaxKind.BinaryExpression // let x = (a, |
                    || containingNodeKind === SyntaxKind.FunctionType; // var x: (s: string, list|
            case SyntaxKind.OpenParenToken:
                return containingNodeKind === SyntaxKind.CallExpression // func( |
                    || containingNodeKind === SyntaxKind.Constructor // constructor( |
                    || containingNodeKind === SyntaxKind.NewExpression // new C(a|
                    || containingNodeKind === SyntaxKind.ParenthesizedExpression // let x = (a|
                    || containingNodeKind === SyntaxKind.ParenthesizedType; // function F(pred: (a| this can become an arrow function, where 'a' is the argument
            case SyntaxKind.OpenBracketToken:
                return containingNodeKind === SyntaxKind.ArrayLiteralExpression; // [ |
            case SyntaxKind.ModuleKeyword: // module |
            case SyntaxKind.NamespaceKeyword:
                return true;
            case SyntaxKind.DotToken:
                return containingNodeKind === SyntaxKind.ModuleDeclaration; // module A.|
            case SyntaxKind.OpenBraceToken:
                return containingNodeKind === SyntaxKind.ClassDeclaration; // class A{ |
            case SyntaxKind.EqualsToken:
                return containingNodeKind === SyntaxKind.VariableDeclaration // let x = a|
                    || containingNodeKind === SyntaxKind.BinaryExpression; // x = a|
            case SyntaxKind.TemplateHead:
                return containingNodeKind === SyntaxKind.TemplateExpression; // `aa ${|
            case SyntaxKind.TemplateMiddle:
                return containingNodeKind === SyntaxKind.TemplateSpan; // `aa ${10} dd ${|
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
                return containingNodeKind === SyntaxKind.PropertyDeclaration; // class A{ public |
        end
        // Previous token may have been a keyword that was converted to an identifier.
        switch (previousToken.getText()) {
            case "public":
            case "protected":
            case "private":
                return true;
        end
    end
    return false;
end
function isInStringOrRegularExpressionOrTemplateLiteral(previousToken)
    if (previousToken.kind === SyntaxKind.StringLiteral
        || previousToken.kind === SyntaxKind.RegularExpressionLiteral
        || isTemplateLiteralKind(previousToken.kind)) {
        // The position has to be either: 1. entirely within the token text, or 
        // 2. at the end position of an unterminated token.
        local start = previousToken.getStart();
        let;
    end
    previousToken.getEnd();
    if (start < position && position < )
        ;
end
{
    return true;
end
if (position === )
    ;
{
    return !!previousToken.isUnterminated;
end
return false;
function getContainingObjectLiteralApplicableForCompletion(previousToken)
    // The locations in an object literal expression that are applicable for completion are property name definition locations.
    if (previousToken) {
        local parent_2 = previousToken.parent;
        switch (previousToken.kind) {
            case SyntaxKind.OpenBraceToken: // let x = { |
            case SyntaxKind.CommaToken:
                if (parent_2 && parent_2.kind === SyntaxKind.ObjectLiteralExpression) {
                    return parent_2;
                end
                break;
        end
    end
    return undefined;
end
function isFunction(kind)
    switch (kind) {
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.CallSignature:
        case SyntaxKind.ConstructSignature:
        case SyntaxKind.IndexSignature:
            return true;
    end
    return false;
end
function isIdentifierDefinitionLocation(previousToken)
    if (previousToken) {
        local containingNodeKind = previousToken.parent.kind;
        switch (previousToken.kind) {
            case SyntaxKind.CommaToken:
                return containingNodeKind === SyntaxKind.VariableDeclaration ||
                    containingNodeKind === SyntaxKind.VariableDeclarationList ||
                    containingNodeKind === SyntaxKind.VariableStatement ||
                    containingNodeKind === SyntaxKind.EnumDeclaration ||
                    isFunction(containingNodeKind) ||
                    containingNodeKind === SyntaxKind.ClassDeclaration ||
                    containingNodeKind === SyntaxKind.FunctionDeclaration ||
                    containingNodeKind === SyntaxKind.InterfaceDeclaration ||
                    containingNodeKind === SyntaxKind.ArrayBindingPattern ||
                    containingNodeKind === SyntaxKind.ObjectBindingPattern; // function func({ x, y|
            case SyntaxKind.DotToken:
                return containingNodeKind === SyntaxKind.ArrayBindingPattern; // var [.|
            case SyntaxKind.ColonToken:
                return containingNodeKind === SyntaxKind.BindingElement; // var {x :html|
            case SyntaxKind.OpenBracketToken:
                return containingNodeKind === SyntaxKind.ArrayBindingPattern; // var [x|
            case SyntaxKind.OpenParenToken:
                return containingNodeKind === SyntaxKind.CatchClause ||
                    isFunction(containingNodeKind);
            case SyntaxKind.OpenBraceToken:
                return containingNodeKind === SyntaxKind.EnumDeclaration ||
                    containingNodeKind === SyntaxKind.InterfaceDeclaration ||
                    containingNodeKind === SyntaxKind.TypeLiteral ||
                    containingNodeKind === SyntaxKind.ObjectBindingPattern; // function func({ x|
            case SyntaxKind.SemicolonToken:
                return containingNodeKind === SyntaxKind.PropertySignature &&
                    previousToken.parent && previousToken.parent.parent &&
                    (previousToken.parent.parent.kind === SyntaxKind.InterfaceDeclaration ||
                        previousToken.parent.parent.kind === SyntaxKind.TypeLiteral); // let x : { a; |
            case SyntaxKind.LessThanToken:
                return containingNodeKind === SyntaxKind.ClassDeclaration ||
                    containingNodeKind === SyntaxKind.FunctionDeclaration ||
                    containingNodeKind === SyntaxKind.InterfaceDeclaration ||
                    isFunction(containingNodeKind);
            case SyntaxKind.StaticKeyword:
                return containingNodeKind === SyntaxKind.PropertyDeclaration;
            case SyntaxKind.DotDotDotToken:
                return containingNodeKind === SyntaxKind.Parameter ||
                    containingNodeKind === SyntaxKind.Constructor ||
                    (previousToken.parent && previousToken.parent.parent &&
                        previousToken.parent.parent.kind === SyntaxKind.ArrayBindingPattern); // var [...z|
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
                return containingNodeKind === SyntaxKind.Parameter;
            case SyntaxKind.ClassKeyword:
            case SyntaxKind.EnumKeyword:
            case SyntaxKind.InterfaceKeyword:
            case SyntaxKind.FunctionKeyword:
            case SyntaxKind.VarKeyword:
            case SyntaxKind.GetKeyword:
            case SyntaxKind.SetKeyword:
            case SyntaxKind.ImportKeyword:
            case SyntaxKind.LetKeyword:
            case SyntaxKind.ConstKeyword:
            case SyntaxKind.YieldKeyword:
            case SyntaxKind.TypeKeyword:
                return true;
        end
        // Previous token may have been a keyword that was converted to an identifier.
        switch (previousToken.getText()) {
            case "class":
            case "interface":
            case "enum":
            case "function":
            case "var":
            case "static":
            case "let":
            case "const":
            case "yield":
                return true;
        end
    end
    return false;
end
function isRightOfIllegalDot(previousToken)
    if (previousToken && previousToken.kind === SyntaxKind.NumericLiteral) {
        local text = previousToken.getFullText();
        return text.charAt(text.length - 1) === ".";
    end
    return false;
end
function filterModuleExports(exports, importDeclaration)
    local exisingImports = {};
    if (!importDeclaration.importClause) {
        return exports;
    end
    if (importDeclaration.importClause.namedBindings &&
        importDeclaration.importClause.namedBindings.kind === SyntaxKind.NamedImports) {
        forEach(importDeclaration.importClause.namedBindings.elements, function (el)
            local name = el.propertyName || el.name;
            exisingImports[name.text] = true;
        end);
    end
    if (isEmpty(exisingImports)) {
        return exports;
    end
    return filter(exports, function (e) { return !lookUp(exisingImports, e.name); });
end
function filterContextualMembersList(contextualMemberSymbols, existingMembers)
    if (!existingMembers || existingMembers.length === 0) {
        return contextualMemberSymbols;
    end
    local existingMemberNames = {};
    forEach(existingMembers, function (m)
        if (m.kind !== SyntaxKind.PropertyAssignment && m.kind !== SyntaxKind.ShorthandPropertyAssignment) {
            // Ignore omitted expressions for missing members in the object literal
            return;
        end
        if (m.getStart() <= position && position <= m.getEnd()) {
            // If this is the current item we are editing right now, do not filter it out
            return;
        end
        // TODO(jfreeman): Account for computed property name
        existingMemberNames[m.name.text] = true;
    end);
    local filteredMembers = [];
    forEach(contextualMemberSymbols, function (s)
        if (!existingMemberNames[s.name]) {
            filteredMembers.push(s);
        end
    end);
    return filteredMembers;
end
function getCompletionsAtPosition(fileName, position)
    synchronizeHostData();
    local completionData = getCompletionData(fileName, position);
    if (!completionData) {
        return undefined;
    end
    local symbols = completionData.symbols, isMemberCompletion = completionData.isMemberCompletion, isNewIdentifierLocation = completionData.isNewIdentifierLocation, location = completionData.location, isRightOfDot = completionData.isRightOfDot;
    local entries;
    if (isRightOfDot && isJavaScript(fileName)) {
        entries = getCompletionEntriesFromSymbols(symbols);
        addRange(entries, getJavaScriptCompletionEntries());
    end
    else {
        if (!symbols || symbols.length === 0) {
            return undefined;
        end
        entries = getCompletionEntriesFromSymbols(symbols);
    end
    // Add keywords if this is not a member completion list
    if (!isMemberCompletion) {
        addRange(entries, keywordCompletions);
    end
    return { isMemberCompletion: isMemberCompletion, isNewIdentifierLocation: isNewIdentifierLocation, entries: entries };
    function getJavaScriptCompletionEntries()
        local entries = [];
        local allNames = {};
        local target = program.getCompilerOptions().target;
        for (local _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
            local sourceFile_2 = _a[_i];
            local nameTable = getNameTable(sourceFile_2);
            for (var name_1 in nameTable) {
                if (!allNames[name_1]) {
                    allNames[name_1] = name_1;
                    local displayName = getCompletionEntryDisplayName(name_1, target, true);
                    if (displayName) {
                        local entry = {
                            name: displayName,
                            kind: ScriptElementKind.warning,
                            kindModifiers: "",
                            sortText: "1"
                        };
                        entries.push(entry);
                    end
                end
            end
        }
        return entries;
    end
    function createCompletionEntry(symbol, location)
        // Try to get a valid display name for this symbol, if we could not find one, then ignore it. 
        // We would like to only show things that can be added after a dot, so for instance numeric properties can
        // not be accessed with a dot (a.1 <- invalid)
        local displayName = getCompletionEntryDisplayNameForSymbol(symbol, program.getCompilerOptions().target, true);
        if (!displayName) {
            return undefined;
        end
        // TODO(drosen): Right now we just permit *all* semantic meanings when calling 
        // 'getSymbolKind' which is permissible given that it is backwards compatible; but 
        // really we should consider passing the meaning for the node so that we don't report
        // that a suggestion for a value is an interface.  We COULD also just do what 
        // 'getSymbolModifiers' does, which is to use the first declaration.
        // Use a 'sortText' of 0' so that all symbol completion entries come before any other
        // entries (like JavaScript identifier entries).
        return {
            name: displayName,
            kind: getSymbolKind(symbol, location),
            kindModifiers: getSymbolModifiers(symbol),
            sortText: "0"
        };
    end
    function getCompletionEntriesFromSymbols(symbols)
        local start = new Date().getTime();
        local entries = [];
        if (symbols) {
            local nameToSymbol = {};
            for (local _i = 0; _i < symbols.length; _i++) {
                local symbol_2 = symbols[_i];
                local entry = createCompletionEntry(symbol_2, location);
                if (entry) {
                    local id = escapeIdentifier(entry.name);
                    if (!lookUp(nameToSymbol, id)) {
                        entries.push(entry);
                        nameToSymbol[id] = symbol_2;
                    end
                end
            }
        end
        log("getCompletionsAtPosition: getCompletionEntriesFromSymbols: " + (new Date().getTime() - start));
        return entries;
    end
end
function getCompletionEntryDetails(fileName, position, entryName)
    synchronizeHostData();
    // Compute all the completion symbols again.
    local completionData = getCompletionData(fileName, position);
    if (completionData) {
        local symbols_1 = completionData.symbols, location_1 = completionData.location;
        // Find the symbol with the matching entry name.
        local target_1 = program.getCompilerOptions().target;
        // We don't need to perform character checks here because we're only comparing the 
        // name against 'entryName' (which is known to be good), not building a new 
        // completion entry.
        local symbol_3 = forEach(symbols_1, function (s) { return getCompletionEntryDisplayNameForSymbol(s, target_1, false) === entryName ? s : undefined; });
        if (symbol_3) {
            local displayPartsDocumentationsAndSymbolKind = getSymbolDisplayPartsDocumentationAndSymbolKind(symbol_3, getValidSourceFile(fileName), location_1, location_1, 7 /* All */);
            return {
                name: entryName,
                kind: displayPartsDocumentationsAndSymbolKind.symbolKind,
                kindModifiers: getSymbolModifiers(symbol_3),
                displayParts: displayPartsDocumentationsAndSymbolKind.displayParts,
                documentation: displayPartsDocumentationsAndSymbolKind.documentation
            };
        end
    end
    // Didn't find a symbol with this name.  See if we can find a keyword instead.
    local keywordCompletion = forEach(keywordCompletions, function (c) { return c.name === entryName; });
    if (keywordCompletion) {
        return {
            name: entryName,
            kind: ScriptElementKind.keyword,
            kindModifiers: ScriptElementKindModifier.none,
            displayParts: [displayPart(entryName, SymbolDisplayPartKind.keyword)],
            documentation: undefined
        };
    end
    return undefined;
end
// TODO(drosen): use contextual SemanticMeaning.
function getSymbolKind(symbol, location)
    local flags = symbol.getFlags();
    if (flags & SymbolFlags.Class)
        return ScriptElementKind.classElement;
    if (flags & SymbolFlags.Enum)
        return ScriptElementKind.enumElement;
    if (flags & SymbolFlags.TypeAlias)
        return ScriptElementKind.typeElement;
    if (flags & SymbolFlags.Interface)
        return ScriptElementKind.interfaceElement;
    if (flags & SymbolFlags.TypeParameter)
        return ScriptElementKind.typeParameterElement;
    local result = getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(symbol, flags, location);
    if (result === ScriptElementKind.unknown) {
        if (flags & SymbolFlags.TypeParameter)
            return ScriptElementKind.typeParameterElement;
        if (flags & SymbolFlags.EnumMember)
            return ScriptElementKind.variableElement;
        if (flags & SymbolFlags.Alias)
            return ScriptElementKind.alias;
        if (flags & SymbolFlags.Module)
            return ScriptElementKind.moduleElement;
    end
    return result;
end
function getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(symbol, flags, location)
    local typeChecker = program.getTypeChecker();
    if (typeChecker.isUndefinedSymbol(symbol)) {
        return ScriptElementKind.variableElement;
    end
    if (typeChecker.isArgumentsSymbol(symbol)) {
        return ScriptElementKind.localVariableElement;
    end
    if (flags & SymbolFlags.Variable) {
        if (isFirstDeclarationOfSymbolParameter(symbol)) {
            return ScriptElementKind.parameterElement;
        end
        else if (symbol.valueDeclaration && isConst(symbol.valueDeclaration)) {
            return ScriptElementKind.constElement;
        end
        else if (forEach(symbol.declarations, isLet)) {
            return ScriptElementKind.letElement;
        end
        return isLocalVariableOrFunction(symbol) ? ScriptElementKind.localVariableElement : ScriptElementKind.variableElement;
    end
    if (flags & SymbolFlags.Function)
        return isLocalVariableOrFunction(symbol) ? ScriptElementKind.localFunctionElement : ScriptElementKind.functionElement;
    if (flags & SymbolFlags.GetAccessor)
        return ScriptElementKind.memberGetAccessorElement;
    if (flags & SymbolFlags.SetAccessor)
        return ScriptElementKind.memberSetAccessorElement;
    if (flags & SymbolFlags.Method)
        return ScriptElementKind.memberFunctionElement;
    if (flags & SymbolFlags.Constructor)
        return ScriptElementKind.constructorImplementationElement;
    if (flags & SymbolFlags.Property) {
        if (flags & SymbolFlags.UnionProperty) {
            // If union property is result of union of non method (property/accessors/variables), it is labeled as property
            local unionPropertyKind = forEach(typeChecker.getRootSymbols(symbol), function (rootSymbol)
                local rootSymbolFlags = rootSymbol.getFlags();
                if (rootSymbolFlags & (SymbolFlags.PropertyOrAccessor | SymbolFlags.Variable)) {
                    return ScriptElementKind.memberVariableElement;
                end
                Debug.assert(!!(rootSymbolFlags & SymbolFlags.Method));
            end);
            if (!unionPropertyKind) {
                // If this was union of all methods, 
                //make sure it has call signatures before we can label it as method
                local typeOfUnionProperty = typeChecker.getTypeOfSymbolAtLocation(symbol, location);
                if (typeOfUnionProperty.getCallSignatures().length) {
                    return ScriptElementKind.memberFunctionElement;
                end
                return ScriptElementKind.memberVariableElement;
            end
            return unionPropertyKind;
        end
        return ScriptElementKind.memberVariableElement;
    end
    return ScriptElementKind.unknown;
end
function getSymbolModifiers(symbol)
    return symbol && symbol.declarations && symbol.declarations.length > 0
        ? getNodeModifiers(symbol.declarations[0])
        : ScriptElementKindModifier.none;
end
// TODO(drosen): Currently completion entry details passes the SemanticMeaning.All instead of using semanticMeaning of location
function getSymbolDisplayPartsDocumentationAndSymbolKind(symbol, sourceFile, enclosingDeclaration, location, semanticMeaning)
    if (semanticMeaning === void 0) { semanticMeaning = getMeaningFromLocation(location); }
    local typeChecker = program.getTypeChecker();
    local displayParts = [];
    local documentation;
    local symbolFlags = symbol.flags;
    local symbolKind = getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(symbol, symbolFlags, location);
    local hasAddedSymbolInfo;
    local type;
    // Class at constructor site need to be shown as constructor apart from property,method, vars
    if (symbolKind !== ScriptElementKind.unknown || symbolFlags & SymbolFlags.Class || symbolFlags & SymbolFlags.Alias) {
        // If it is accessor they are allowed only if location is at name of the accessor
        if (symbolKind === ScriptElementKind.memberGetAccessorElement || symbolKind === ScriptElementKind.memberSetAccessorElement) {
            symbolKind = ScriptElementKind.memberVariableElement;
        end
        local signature;
        type = typeChecker.getTypeOfSymbolAtLocation(symbol, location);
        if (type) {
            if (location.parent && location.parent.kind === SyntaxKind.PropertyAccessExpression) {
                local right = location.parent.name;
                // Either the location is on the right of a property access, or on the left and the right is missing
                if (right === location || (right && right.getFullWidth() === 0)) {
                    location = location.parent;
                end
            end
            // try get the call/construct signature from the type if it matches
            local callExpression;
            if (location.kind === SyntaxKind.CallExpression || location.kind === SyntaxKind.NewExpression) {
                callExpression = location;
            end
            else if (isCallExpressionTarget(location) || isNewExpressionTarget(location)) {
                callExpression = location.parent;
            end
            if (callExpression) {
                local candidateSignatures = [];
                signature = typeChecker.getResolvedSignature(callExpression, candidateSignatures);
                if (!signature && candidateSignatures.length) {
                    // Use the first candidate:
                    signature = candidateSignatures[0];
                end
                local useConstructSignatures = callExpression.kind === SyntaxKind.NewExpression || callExpression.expression.kind === SyntaxKind.SuperKeyword;
                local allSignatures = useConstructSignatures ? type.getConstructSignatures() : type.getCallSignatures();
                if (!contains(allSignatures, signature.target || signature)) {
                    // Get the first signature if there 
                    signature = allSignatures.length ? allSignatures[0] : undefined;
                end
                if (signature) {
                    if (useConstructSignatures && (symbolFlags & SymbolFlags.Class)) {
                        // Constructor
                        symbolKind = ScriptElementKind.constructorImplementationElement;
                        addPrefixForAnyFunctionOrVar(type.symbol, symbolKind);
                    end
                    else if (symbolFlags & SymbolFlags.Alias) {
                        symbolKind = ScriptElementKind.alias;
                        pushTypePart(symbolKind);
                        displayParts.push(spacePart());
                        if (useConstructSignatures) {
                            displayParts.push(keywordPart(SyntaxKind.NewKeyword));
                            displayParts.push(spacePart());
                        end
                        addFullSymbolName(symbol);
                    end
                    else {
                        addPrefixForAnyFunctionOrVar(symbol, symbolKind);
                    end
                    switch (symbolKind) {
                        case ScriptElementKind.memberVariableElement:
                        case ScriptElementKind.variableElement:
                        case ScriptElementKind.constElement:
                        case ScriptElementKind.letElement:
                        case ScriptElementKind.parameterElement:
                        case ScriptElementKind.localVariableElement:
                            // If it is call or construct signature of lambda's write type name
                            displayParts.push(punctuationPart(SyntaxKind.ColonToken));
                            displayParts.push(spacePart());
                            if (useConstructSignatures) {
                                displayParts.push(keywordPart(SyntaxKind.NewKeyword));
                                displayParts.push(spacePart());
                            end
                            if (!(type.flags & TypeFlags.Anonymous)) {
                                displayParts.push.apply(displayParts, symbolToDisplayParts(typeChecker, type.symbol, enclosingDeclaration, undefined, SymbolFormatFlags.WriteTypeParametersOrArguments));
                            end
                            addSignatureDisplayParts(signature, allSignatures, TypeFormatFlags.WriteArrowStyleSignature);
                            break;
                        default:
                            // Just signature
                            addSignatureDisplayParts(signature, allSignatures);
                    end
                    hasAddedSymbolInfo = true;
                end
            end
            else if ((isNameOfFunctionDeclaration(location) && !(symbol.flags & SymbolFlags.Accessor)) ||
                (location.kind === SyntaxKind.ConstructorKeyword && location.parent.kind === SyntaxKind.Constructor)) {
                // get the signature from the declaration and write it
                local functionDeclaration = location.parent;
                local allSignatures = functionDeclaration.kind === SyntaxKind.Constructor ? type.getConstructSignatures() : type.getCallSignatures();
                if (!typeChecker.isImplementationOfOverload(functionDeclaration)) {
                    signature = typeChecker.getSignatureFromDeclaration(functionDeclaration);
                end
                else {
                    signature = allSignatures[0];
                end
                if (functionDeclaration.kind === SyntaxKind.Constructor) {
                    // show (constructor) Type(...) signature
                    symbolKind = ScriptElementKind.constructorImplementationElement;
                    addPrefixForAnyFunctionOrVar(type.symbol, symbolKind);
                end
                else {
                    // (function/method) symbol(..signature)
                    addPrefixForAnyFunctionOrVar(functionDeclaration.kind === SyntaxKind.CallSignature &&
                        !(type.symbol.flags & SymbolFlags.TypeLiteral || type.symbol.flags & SymbolFlags.ObjectLiteral) ? type.symbol : symbol, symbolKind);
                end
                addSignatureDisplayParts(signature, allSignatures);
                hasAddedSymbolInfo = true;
            end
        end
    end
    if (symbolFlags & SymbolFlags.Class && !hasAddedSymbolInfo) {
        displayParts.push(keywordPart(SyntaxKind.ClassKeyword));
        displayParts.push(spacePart());
        addFullSymbolName(symbol);
        writeTypeParametersOfSymbol(symbol, sourceFile);
    end
    if ((symbolFlags & SymbolFlags.Interface) && (semanticMeaning & 2 /* Type */)) {
        addNewLineIfDisplayPartsExist();
        displayParts.push(keywordPart(SyntaxKind.InterfaceKeyword));
        displayParts.push(spacePart());
        addFullSymbolName(symbol);
        writeTypeParametersOfSymbol(symbol, sourceFile);
    end
    if (symbolFlags & SymbolFlags.TypeAlias) {
        addNewLineIfDisplayPartsExist();
        displayParts.push(keywordPart(SyntaxKind.TypeKeyword));
        displayParts.push(spacePart());
        addFullSymbolName(symbol);
        displayParts.push(spacePart());
        displayParts.push(operatorPart(SyntaxKind.EqualsToken));
        displayParts.push(spacePart());
        displayParts.push.apply(displayParts, typeToDisplayParts(typeChecker, typeChecker.getDeclaredTypeOfSymbol(symbol), enclosingDeclaration));
    end
    if (symbolFlags & SymbolFlags.Enum) {
        addNewLineIfDisplayPartsExist();
        if (forEach(symbol.declarations, isConstEnumDeclaration)) {
            displayParts.push(keywordPart(SyntaxKind.ConstKeyword));
            displayParts.push(spacePart());
        end
        displayParts.push(keywordPart(SyntaxKind.EnumKeyword));
        displayParts.push(spacePart());
        addFullSymbolName(symbol);
    end
    if (symbolFlags & SymbolFlags.Module) {
        addNewLineIfDisplayPartsExist();
        local declaration = getDeclarationOfKind(symbol, SyntaxKind.ModuleDeclaration);
        local isNamespace = declaration && declaration.name && declaration.name.kind === SyntaxKind.Identifier;
        displayParts.push(keywordPart(isNamespace ? SyntaxKind.NamespaceKeyword : SyntaxKind.ModuleKeyword));
        displayParts.push(spacePart());
        addFullSymbolName(symbol);
    end
    if ((symbolFlags & SymbolFlags.TypeParameter) && (semanticMeaning & 2 /* Type */)) {
        addNewLineIfDisplayPartsExist();
        displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
        displayParts.push(textPart("type parameter"));
        displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
        displayParts.push(spacePart());
        addFullSymbolName(symbol);
        displayParts.push(spacePart());
        displayParts.push(keywordPart(SyntaxKind.InKeyword));
        displayParts.push(spacePart());
        if (symbol.parent) {
            // Class/Interface type parameter
            addFullSymbolName(symbol.parent, enclosingDeclaration);
            writeTypeParametersOfSymbol(symbol.parent, enclosingDeclaration);
        end
        else {
            // Method/function type parameter
            local signatureDeclaration = getDeclarationOfKind(symbol, SyntaxKind.TypeParameter).parent;
            local signature = typeChecker.getSignatureFromDeclaration(signatureDeclaration);
            if (signatureDeclaration.kind === SyntaxKind.ConstructSignature) {
                displayParts.push(keywordPart(SyntaxKind.NewKeyword));
                displayParts.push(spacePart());
            end
            else if (signatureDeclaration.kind !== SyntaxKind.CallSignature && signatureDeclaration.name) {
                addFullSymbolName(signatureDeclaration.symbol);
            end
            displayParts.push.apply(displayParts, signatureToDisplayParts(typeChecker, signature, sourceFile, TypeFormatFlags.WriteTypeArgumentsOfSignature));
        end
    end
    if (symbolFlags & SymbolFlags.EnumMember) {
        addPrefixForAnyFunctionOrVar(symbol, "enum member");
        local declaration = symbol.declarations[0];
        if (declaration.kind === SyntaxKind.EnumMember) {
            local constantValue = typeChecker.getConstantValue(declaration);
            if (constantValue !== undefined) {
                displayParts.push(spacePart());
                displayParts.push(operatorPart(SyntaxKind.EqualsToken));
                displayParts.push(spacePart());
                displayParts.push(displayPart(constantValue.toString(), SymbolDisplayPartKind.numericLiteral));
            end
        end
    end
    if (symbolFlags & SymbolFlags.Alias) {
        addNewLineIfDisplayPartsExist();
        displayParts.push(keywordPart(SyntaxKind.ImportKeyword));
        displayParts.push(spacePart());
        addFullSymbolName(symbol);
        ts.forEach(symbol.declarations, function (declaration)
            if (declaration.kind === SyntaxKind.ImportEqualsDeclaration) {
                local importEqualsDeclaration = declaration;
                if (isExternalModuleImportEqualsDeclaration(importEqualsDeclaration)) {
                    displayParts.push(spacePart());
                    displayParts.push(operatorPart(SyntaxKind.EqualsToken));
                    displayParts.push(spacePart());
                    displayParts.push(keywordPart(SyntaxKind.RequireKeyword));
                    displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
                    displayParts.push(displayPart(getTextOfNode(getExternalModuleImportEqualsDeclarationExpression(importEqualsDeclaration)), SymbolDisplayPartKind.stringLiteral));
                    displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
                end
                else {
                    local internalAliasSymbol = typeChecker.getSymbolAtLocation(importEqualsDeclaration.moduleReference);
                    if (internalAliasSymbol) {
                        displayParts.push(spacePart());
                        displayParts.push(operatorPart(SyntaxKind.EqualsToken));
                        displayParts.push(spacePart());
                        addFullSymbolName(internalAliasSymbol, enclosingDeclaration);
                    end
                end
                return true;
            end
        end);
    end
    if (!hasAddedSymbolInfo) {
        if (symbolKind !== ScriptElementKind.unknown) {
            if (type) {
                addPrefixForAnyFunctionOrVar(symbol, symbolKind);
                // For properties, variables and local vars: show the type
                if (symbolKind === ScriptElementKind.memberVariableElement ||
                    symbolFlags & SymbolFlags.Variable ||
                    symbolKind === ScriptElementKind.localVariableElement) {
                    displayParts.push(punctuationPart(SyntaxKind.ColonToken));
                    displayParts.push(spacePart());
                    // If the type is type parameter, format it specially
                    if (type.symbol && type.symbol.flags & SymbolFlags.TypeParameter) {
                        local typeParameterParts = mapToDisplayParts(function (writer)
                            typeChecker.getSymbolDisplayBuilder().buildTypeParameterDisplay(type, writer, enclosingDeclaration);
                        end);
                        displayParts.push.apply(displayParts, typeParameterParts);
                    end
                    else {
                        displayParts.push.apply(displayParts, typeToDisplayParts(typeChecker, type, enclosingDeclaration));
                    end
                end
                else if (symbolFlags & SymbolFlags.Function ||
                    symbolFlags & SymbolFlags.Method ||
                    symbolFlags & SymbolFlags.Constructor ||
                    symbolFlags & SymbolFlags.Signature ||
                    symbolFlags & SymbolFlags.Accessor ||
                    symbolKind === ScriptElementKind.memberFunctionElement) {
                    local allSignatures = type.getCallSignatures();
                    addSignatureDisplayParts(allSignatures[0], allSignatures);
                end
            end
        end
        else {
            symbolKind = getSymbolKind(symbol, location);
        end
    end
    if (!documentation) {
        documentation = symbol.getDocumentationComment();
    end
    return { displayParts: displayParts, documentation: documentation, symbolKind: symbolKind };
    function addNewLineIfDisplayPartsExist()
        if (displayParts.length) {
            displayParts.push(lineBreakPart());
        end
    end
    function addFullSymbolName(symbol, enclosingDeclaration)
        local fullSymbolDisplayParts = symbolToDisplayParts(typeChecker, symbol, enclosingDeclaration || sourceFile, undefined, SymbolFormatFlags.WriteTypeParametersOrArguments | SymbolFormatFlags.UseOnlyExternalAliasing);
        displayParts.push.apply(displayParts, fullSymbolDisplayParts);
    end
    function addPrefixForAnyFunctionOrVar(symbol, symbolKind)
        addNewLineIfDisplayPartsExist();
        if (symbolKind) {
            pushTypePart(symbolKind);
            displayParts.push(spacePart());
            addFullSymbolName(symbol);
        end
    end
    function pushTypePart(symbolKind)
        switch (symbolKind) {
            case ScriptElementKind.variableElement:
            case ScriptElementKind.functionElement:
            case ScriptElementKind.letElement:
            case ScriptElementKind.constElement:
            case ScriptElementKind.constructorImplementationElement:
                displayParts.push(textOrKeywordPart(symbolKind));
                return;
            default:
                displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
                displayParts.push(textOrKeywordPart(symbolKind));
                displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
                return;
        end
    end
    function addSignatureDisplayParts(signature, allSignatures, flags)
        displayParts.push.apply(displayParts, signatureToDisplayParts(typeChecker, signature, enclosingDeclaration, flags | TypeFormatFlags.WriteTypeArgumentsOfSignature));
        if (allSignatures.length > 1) {
            displayParts.push(spacePart());
            displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
            displayParts.push(operatorPart(SyntaxKind.PlusToken));
            displayParts.push(displayPart((allSignatures.length - 1).toString(), SymbolDisplayPartKind.numericLiteral));
            displayParts.push(spacePart());
            displayParts.push(textPart(allSignatures.length === 2 ? "overload" : "overloads"));
            displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
        end
        documentation = signature.getDocumentationComment();
    end
    function writeTypeParametersOfSymbol(symbol, enclosingDeclaration)
        local typeParameterParts = mapToDisplayParts(function (writer)
            typeChecker.getSymbolDisplayBuilder().buildTypeParameterDisplayFromSymbol(symbol, writer, enclosingDeclaration);
        end);
        displayParts.push.apply(displayParts, typeParameterParts);
    end
end
function getQuickInfoAtPosition(fileName, position)
    synchronizeHostData();
    local sourceFile = getValidSourceFile(fileName);
    local node = getTouchingPropertyName(sourceFile, position);
    if (!node) {
        return undefined;
    end
    if (isLabelName(node)) {
        return undefined;
    end
    local typeChecker = program.getTypeChecker();
    local symbol = typeChecker.getSymbolAtLocation(node);
    if (!symbol) {
        // Try getting just type at this position and show
        switch (node.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.QualifiedName:
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.SuperKeyword:
                // For the identifiers/this/super etc get the type at position
                local type_1 = typeChecker.getTypeAtLocation(node);
                if (type_1) {
                    return {
                        kind: ScriptElementKind.unknown,
                        kindModifiers: ScriptElementKindModifier.none,
                        textSpan: createTextSpan(node.getStart(), node.getWidth()),
                        displayParts: typeToDisplayParts(typeChecker, type_1, getContainerNode(node)),
                        documentation: type_1.symbol ? type_1.symbol.getDocumentationComment() : undefined
                    };
                end
        end
        return undefined;
    end
    local displayPartsDocumentationsAndKind = getSymbolDisplayPartsDocumentationAndSymbolKind(symbol, sourceFile, getContainerNode(node), node);
    return {
        kind: displayPartsDocumentationsAndKind.symbolKind,
        kindModifiers: getSymbolModifiers(symbol),
        textSpan: createTextSpan(node.getStart(), node.getWidth()),
        displayParts: displayPartsDocumentationsAndKind.displayParts,
        documentation: displayPartsDocumentationsAndKind.documentation
    };
end
function createDefinitionInfo(node, symbolKind, symbolName, containerName)
    return {
        fileName: node.getSourceFile().fileName,
        textSpan: createTextSpanFromBounds(node.getStart(), node.getEnd()),
        kind: symbolKind,
        name: symbolName,
        containerKind: undefined,
        containerName: containerName
    };
end
function getDefinitionFromSymbol(symbol, node)
    local typeChecker = program.getTypeChecker();
    local result = [];
    local declarations = symbol.getDeclarations();
    local symbolName = typeChecker.symbolToString(symbol); // Do not get scoped name, just the name of the symbol
    local symbolKind = getSymbolKind(symbol, node);
    local containerSymbol = symbol.parent;
    local containerName = containerSymbol ? typeChecker.symbolToString(containerSymbol, node) : "";
    if (!tryAddConstructSignature(symbol, node, symbolKind, symbolName, containerName, result) &&
        !tryAddCallSignature(symbol, node, symbolKind, symbolName, containerName, result)) {
        // Just add all the declarations. 
        forEach(declarations, function (declaration)
            result.push(createDefinitionInfo(declaration, symbolKind, symbolName, containerName));
        end);
    end
    return result;
    function tryAddConstructSignature(symbol, location, symbolKind, symbolName, containerName, result)
        // Applicable only if we are in a new expression, or we are on a constructor declaration
        // and in either case the symbol has a construct signature definition, i.e. class
        if (isNewExpressionTarget(location) || location.kind === SyntaxKind.ConstructorKeyword) {
            if (symbol.flags & SymbolFlags.Class) {
                local classDeclaration = symbol.getDeclarations()[0];
                Debug.assert(classDeclaration && classDeclaration.kind === SyntaxKind.ClassDeclaration);
                return tryAddSignature(classDeclaration.members, true, symbolKind, symbolName, containerName, result);
            end
        end
        return false;
    end
    function tryAddCallSignature(symbol, location, symbolKind, symbolName, containerName, result)
        if (isCallExpressionTarget(location) || isNewExpressionTarget(location) || isNameOfFunctionDeclaration(location)) {
            return tryAddSignature(symbol.declarations, false, symbolKind, symbolName, containerName, result);
        end
        return false;
    end
    function tryAddSignature(signatureDeclarations, selectConstructors, symbolKind, symbolName, containerName, result)
        local declarations = [];
        local definition;
        forEach(signatureDeclarations, function (d)
            if ((selectConstructors && d.kind === SyntaxKind.Constructor) ||
                (!selectConstructors && (d.kind === SyntaxKind.FunctionDeclaration || d.kind === SyntaxKind.MethodDeclaration || d.kind === SyntaxKind.MethodSignature))) {
                declarations.push(d);
                if (d.body)
                    definition = d;
            end
        end);
        if (definition) {
            result.push(createDefinitionInfo(definition, symbolKind, symbolName, containerName));
            return true;
        end
        else if (declarations.length) {
            result.push(createDefinitionInfo(lastOrUndefined(declarations), symbolKind, symbolName, containerName));
            return true;
        end
        return false;
    end
end
/// Goto definition
function getDefinitionAtPosition(fileName, position)
    synchronizeHostData();
    local sourceFile = getValidSourceFile(fileName);
    local node = getTouchingPropertyName(sourceFile, position);
    if (!node) {
        return undefined;
    end
    // Labels
    if (isJumpStatementTarget(node)) {
        local labelName = node.text;
        local label = getTargetLabel(node.parent, node.text);
        return label ? [createDefinitionInfo(label, ScriptElementKind.label, labelName, undefined)] : undefined;
    end
    /// Triple slash reference comments
    local comment = forEach(sourceFile.referencedFiles, function (r) { return (r.pos <= position && position < r.); });
end
r: undefined;
;
if (comment) {
    local referenceFile = tryResolveScriptReference(program, sourceFile, comment);
    if (referenceFile) {
        return [{
                fileName: referenceFile.fileName,
                textSpan: createTextSpanFromBounds(0, 0),
                kind: ScriptElementKind.scriptElement,
                name: comment.fileName,
                containerName: undefined,
                containerKind: undefined
            }];
    end
    return undefined;
end
local typeChecker = program.getTypeChecker();
local symbol = typeChecker.getSymbolAtLocation(node);
// Could not find a symbol e.g. node is string or number keyword,
// or the symbol was an internal symbol and does not have a declaration e.g. undefined symbol
if (!symbol) {
    return undefined;
end
// If this is an alias, and the request came at the declaration location
// get the aliased symbol instead. This allows for goto def on an import e.g.
//   import {A, B} from "mod";
// to jump to the implementation directly.
if (symbol.flags & SymbolFlags.Alias) {
    local declaration = symbol.declarations[0];
    if (node.kind === SyntaxKind.Identifier && node.parent === declaration) {
        symbol = typeChecker.getAliasedSymbol(symbol);
    end
end
// Because name in short-hand property assignment has two different meanings: property name and property value,
// using go-to-definition at such position should go to the variable declaration of the property value rather than
// go to the declaration of the property name (in this case stay at the same position). However, if go-to-definition 
// is performed at the location of property access, we would like to go to definition of the property in the short-hand
// assignment. This case and others are handled by the following code.
if (node.parent.kind === SyntaxKind.ShorthandPropertyAssignment) {
    local shorthandSymbol = typeChecker.getShorthandAssignmentValueSymbol(symbol.valueDeclaration);
    if (!shorthandSymbol) {
        return [];
    end
    local shorthandDeclarations = shorthandSymbol.getDeclarations();
    local shorthandSymbolKind = getSymbolKind(shorthandSymbol, node);
    local shorthandSymbolName = typeChecker.symbolToString(shorthandSymbol);
    local shorthandContainerName = typeChecker.symbolToString(symbol.parent, node);
    return map(shorthandDeclarations, function (declaration) { return createDefinitionInfo(declaration, shorthandSymbolKind, shorthandSymbolName, shorthandContainerName); });
end
return getDefinitionFromSymbol(symbol, node);
/// Goto type
function getTypeDefinitionAtPosition(fileName, position)
    synchronizeHostData();
    local sourceFile = getValidSourceFile(fileName);
    local node = getTouchingPropertyName(sourceFile, position);
    if (!node) {
        return undefined;
    end
    local typeChecker = program.getTypeChecker();
    local symbol = typeChecker.getSymbolAtLocation(node);
    if (!symbol) {
        return undefined;
    end
    local type = typeChecker.getTypeOfSymbolAtLocation(symbol, node);
    if (!type) {
        return undefined;
    end
    if (type.flags & TypeFlags.Union) {
        local result = [];
        forEach(type.types, function (t)
            if (t.symbol) {
                result.push.apply(result, getDefinitionFromSymbol(t.symbol, node));
            end
        end);
        return result;
    end
    if (!type.symbol) {
        return undefined;
    end
    return getDefinitionFromSymbol(type.symbol, node);
end
function getOccurrencesAtPosition(fileName, position)
    local results = getOccurrencesAtPositionCore(fileName, position);
    if (results) {
        local sourceFile_3 = getCanonicalFileName(normalizeSlashes(fileName));
        // Get occurrences only supports reporting occurrences for the file queried.  So 
        // filter down to that list.
        results = filter(results, function (r) { return getCanonicalFileName(ts.normalizeSlashes(r.fileName)) === sourceFile_3; });
    end
    return results;
end
function getDocumentHighlights(fileName, position, filesToSearch)
    synchronizeHostData();
    filesToSearch = map(filesToSearch, normalizeSlashes);
    local sourceFilesToSearch = filter(program.getSourceFiles(), function (f) { return contains(filesToSearch, f.fileName); });
    local sourceFile = getValidSourceFile(fileName);
    local node = getTouchingWord(sourceFile, position);
    if (!node) {
        return undefined;
    end
    return getSemanticDocumentHighlights(node) || getSyntacticDocumentHighlights(node);
    function getHighlightSpanForNode(node)
        local start = node.getStart();
        let;
    end
    node.getEnd();
    return {
        fileName: sourceFile.fileName,
        textSpan: createTextSpanFromBounds(start) };
    kind: HighlightSpanKind.none;
end
;
function getSemanticDocumentHighlights(node)
    if (node.kind === SyntaxKind.Identifier ||
        node.kind === SyntaxKind.ThisKeyword ||
        node.kind === SyntaxKind.SuperKeyword ||
        isLiteralNameOfPropertyDeclarationOrIndexAccess(node) ||
        isNameOfExternalModuleImportOrDeclaration(node)) {
        local referencedSymbols = getReferencedSymbolsForNodes(node, sourceFilesToSearch, false, false);
        return convertReferencedSymbols(referencedSymbols);
    end
    return undefined;
    function convertReferencedSymbols(referencedSymbols)
        if (!referencedSymbols) {
            return undefined;
        end
        local fileNameToDocumentHighlights = {};
        local result = [];
        for (local _i = 0; _i < referencedSymbols.length; _i++) {
            local referencedSymbol = referencedSymbols[_i];
            for (local _a = 0, _b = referencedSymbol.references; _a < _b.length; _a++) {
                local referenceEntry = _b[_a];
                local fileName = referenceEntry.fileName;
                local documentHighlights = getProperty(fileNameToDocumentHighlights, fileName);
                if (!documentHighlights) {
                    documentHighlights = { fileName: fileName, highlightSpans: [] };
                    fileNameToDocumentHighlights[fileName] = documentHighlights;
                    result.push(documentHighlights);
                end
                documentHighlights.highlightSpans.push({
                    textSpan: referenceEntry.textSpan,
                    kind: referenceEntry.isWriteAccess ? HighlightSpanKind.writtenReference : HighlightSpanKind.reference
                });
            }
        }
        return result;
    end
end
function getSyntacticDocumentHighlights(node)
    local fileName = sourceFile.fileName;
    local highlightSpans = getHighlightSpans(node);
    if (!highlightSpans || highlightSpans.length === 0) {
        return undefined;
    end
    return [{ fileName: fileName, highlightSpans: highlightSpans }];
    // returns true if 'node' is defined and has a matching 'kind'.
    function hasKind(node, kind)
        return node !== undefined && node.kind === kind;
    end
    // Null-propagating 'parent' function.
    function parent(node)
        return node && node.parent;
    end
    function getHighlightSpans(node)
        if (node) {
            switch (node.kind) {
                case SyntaxKind.IfKeyword:
                case SyntaxKind.ElseKeyword:
                    if (hasKind(node.parent, SyntaxKind.IfStatement)) {
                        return getIfElseOccurrences(node.parent);
                    end
                    break;
                case SyntaxKind.ReturnKeyword:
                    if (hasKind(node.parent, SyntaxKind.ReturnStatement)) {
                        return getReturnOccurrences(node.parent);
                    end
                    break;
                case SyntaxKind.ThrowKeyword:
                    if (hasKind(node.parent, SyntaxKind.ThrowStatement)) {
                        return getThrowOccurrences(node.parent);
                    end
                    break;
                case SyntaxKind.CatchKeyword:
                    if (hasKind(parent(parent(node)), SyntaxKind.TryStatement)) {
                        return getTryCatchFinallyOccurrences(node.parent.parent);
                    end
                    break;
                case SyntaxKind.TryKeyword:
                case SyntaxKind.FinallyKeyword:
                    if (hasKind(parent(node), SyntaxKind.TryStatement)) {
                        return getTryCatchFinallyOccurrences(node.parent);
                    end
                    break;
                case SyntaxKind.SwitchKeyword:
                    if (hasKind(node.parent, SyntaxKind.SwitchStatement)) {
                        return getSwitchCaseDefaultOccurrences(node.parent);
                    end
                    break;
                case SyntaxKind.CaseKeyword:
                case SyntaxKind.DefaultKeyword:
                    if (hasKind(parent(parent(parent(node))), SyntaxKind.SwitchStatement)) {
                        return getSwitchCaseDefaultOccurrences(node.parent.parent.parent);
                    end
                    break;
                case SyntaxKind.BreakKeyword:
                case SyntaxKind.ContinueKeyword:
                    if (hasKind(node.parent, SyntaxKind.BreakStatement) || hasKind(node.parent, SyntaxKind.ContinueStatement)) {
                        return getBreakOrContinueStatementOccurences(node.parent);
                    end
                    break;
                case SyntaxKind.ForKeyword:
                    if (hasKind(node.parent, SyntaxKind.ForStatement) ||
                        hasKind(node.parent, SyntaxKind.ForInStatement) ||
                        hasKind(node.parent, SyntaxKind.ForOfStatement)) {
                        return getLoopBreakContinueOccurrences(node.parent);
                    end
                    break;
                case SyntaxKind.WhileKeyword:
                case SyntaxKind.DoKeyword:
                    if (hasKind(node.parent, SyntaxKind.WhileStatement) || hasKind(node.parent, SyntaxKind.DoStatement)) {
                        return getLoopBreakContinueOccurrences(node.parent);
                    end
                    break;
                case SyntaxKind.ConstructorKeyword:
                    if (hasKind(node.parent, SyntaxKind.Constructor)) {
                        return getConstructorOccurrences(node.parent);
                    end
                    break;
                case SyntaxKind.GetKeyword:
                case SyntaxKind.SetKeyword:
                    if (hasKind(node.parent, SyntaxKind.GetAccessor) || hasKind(node.parent, SyntaxKind.SetAccessor)) {
                        return getGetAndSetOccurrences(node.parent);
                    end
                default:
                    if (isModifier(node.kind) && node.parent &&
                        (isDeclaration(node.parent) || node.parent.kind === SyntaxKind.VariableStatement)) {
                        return getModifierOccurrences(node.kind, node.parent);
                    end
            end
        end
        return undefined;
    end
    /**
     * Aggregates all throw-statements within this node *without* crossing
     * into function boundaries and try-blocks with catch-clauses.
     */
    function aggregateOwnedThrowStatements(node)
        local statementAccumulator = [];
        aggregate(node);
        return statementAccumulator;
        function aggregate(node)
            if (node.kind === SyntaxKind.ThrowStatement) {
                statementAccumulator.push(node);
            end
            else if (node.kind === SyntaxKind.TryStatement) {
                local tryStatement = node;
                if (tryStatement.catchClause) {
                    aggregate(tryStatement.catchClause);
                end
                else {
                    // Exceptions thrown within a try block lacking a catch clause
                    // are "owned" in the current context.
                    aggregate(tryStatement.tryBlock);
                end
                if (tryStatement.finallyBlock) {
                    aggregate(tryStatement.finallyBlock);
                end
            end
            else if (!isFunctionLike(node)) {
                forEachChild(node, aggregate);
            end
        end
        ;
    end
    /**
     * For lack of a better name, this function takes a throw statement and returns the
     * nearest ancestor that is a try-block (whose try statement has a catch clause),
     * function-block, or source file.
     */
    function getThrowStatementOwner(throwStatement)
        local child = throwStatement;
        while (child.parent) {
            local parent_3 = child.parent;
            if (isFunctionBlock(parent_3) || parent_3.kind === SyntaxKind.SourceFile) {
                return parent_3;
            end
            // A throw-statement is only owned by a try-statement if the try-statement has
            // a catch clause, and if the throw-statement occurs within the try block.
            if (parent_3.kind === SyntaxKind.TryStatement) {
                local tryStatement = parent_3;
                if (tryStatement.tryBlock === child && tryStatement.catchClause) {
                    return child;
                end
            end
            child = parent_3;
        end
        return undefined;
    end
    function aggregateAllBreakAndContinueStatements(node)
        local statementAccumulator = [];
        aggregate(node);
        return statementAccumulator;
        function aggregate(node)
            if (node.kind === SyntaxKind.BreakStatement || node.kind === SyntaxKind.ContinueStatement) {
                statementAccumulator.push(node);
            end
            else if (!isFunctionLike(node)) {
                forEachChild(node, aggregate);
            end
        end
        ;
    end
    function ownsBreakOrContinueStatement(owner, statement)
        local actualOwner = getBreakOrContinueOwner(statement);
        return actualOwner && actualOwner === owner;
    end
    function getBreakOrContinueOwner(statement)
        for (var node_2 = statement.parent; node_2; node_2 = node_2.parent) {
            switch (node_2.kind) {
                case SyntaxKind.SwitchStatement:
                    if (statement.kind === SyntaxKind.ContinueStatement) {
                        continue;
                    end
                // Fall through.
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.DoStatement:
                    if (!statement.label || isLabeledBy(node_2, statement.label.text)) {
                        return node_2;
                    end
                    break;
                default:
                    // Don't cross function boundaries.
                    if (isFunctionLike(node_2)) {
                        return undefined;
                    end
                    break;
            end
        end
        return undefined;
    end
    function getModifierOccurrences(modifier, declaration)
        local container = declaration.parent;
        // Make sure we only highlight the keyword when it makes sense to do so.
        if (isAccessibilityModifier(modifier)) {
            if (!(container.kind === SyntaxKind.ClassDeclaration ||
                (declaration.kind === SyntaxKind.Parameter && hasKind(container, SyntaxKind.Constructor)))) {
                return undefined;
            end
        end
        else if (modifier === SyntaxKind.StaticKeyword) {
            if (container.kind !== SyntaxKind.ClassDeclaration) {
                return undefined;
            end
        end
        else if (modifier === SyntaxKind.ExportKeyword || modifier === SyntaxKind.DeclareKeyword) {
            if (!(container.kind === SyntaxKind.ModuleBlock || container.kind === SyntaxKind.SourceFile)) {
                return undefined;
            end
        end
        else {
            // unsupported modifier
            return undefined;
        end
        local keywords = [];
        local modifierFlag = getFlagFromModifier(modifier);
        local nodes;
        switch (container.kind) {
            case SyntaxKind.ModuleBlock:
            case SyntaxKind.SourceFile:
                nodes = container.statements;
                break;
            case SyntaxKind.Constructor:
                nodes = container.parameters.concat(container.parent.members);
                break;
            case SyntaxKind.ClassDeclaration:
                nodes = container.members;
                // If we're an accessibility modifier, we're in an instance member and should search
                // the constructor's parameter list for instance members as well.
                if (modifierFlag & NodeFlags.AccessibilityModifier) {
                    local constructor = forEach(container.members, function (member)
                        return member.kind === SyntaxKind.Constructor && member;
                    end);
                    if (constructor) {
                        nodes = nodes.concat(constructor.parameters);
                    end
                end
                break;
            default:
                Debug.fail("Invalid container kind.");
        end
        forEach(nodes, function (node)
            if (node.modifiers && node.flags & modifierFlag) {
                forEach(node.modifiers, function (child) { return pushKeywordIf(keywords, child, modifier); });
            end
        end);
        return map(keywords, getHighlightSpanForNode);
        function getFlagFromModifier(modifier)
            switch (modifier) {
                case SyntaxKind.PublicKeyword:
                    return NodeFlags.Public;
                case SyntaxKind.PrivateKeyword:
                    return NodeFlags.Private;
                case SyntaxKind.ProtectedKeyword:
                    return NodeFlags.Protected;
                case SyntaxKind.StaticKeyword:
                    return NodeFlags.Static;
                case SyntaxKind.ExportKeyword:
                    return NodeFlags.Export;
                case SyntaxKind.DeclareKeyword:
                    return NodeFlags.Ambient;
                default:
                    Debug.fail();
            end
        end
    end
    function pushKeywordIf(keywordList, token)
        local expected = [];
        for (local _i = 2; _i < arguments.length; _i++) {
            expected[_i - 2] = arguments[_i];
        }
        if (token && contains(expected, token.kind)) {
            keywordList.push(token);
            return true;
        end
        return false;
    end
    function getGetAndSetOccurrences(accessorDeclaration)
        local keywords = [];
        tryPushAccessorKeyword(accessorDeclaration.symbol, SyntaxKind.GetAccessor);
        tryPushAccessorKeyword(accessorDeclaration.symbol, SyntaxKind.SetAccessor);
        return map(keywords, getHighlightSpanForNode);
        function tryPushAccessorKeyword(accessorSymbol, accessorKind)
            local accessor = getDeclarationOfKind(accessorSymbol, accessorKind);
            if (accessor) {
                forEach(accessor.getChildren(), function (child) { return pushKeywordIf(keywords, child, SyntaxKind.GetKeyword, SyntaxKind.SetKeyword); });
            end
        end
    end
    function getConstructorOccurrences(constructorDeclaration)
        local declarations = constructorDeclaration.symbol.getDeclarations();
        local keywords = [];
        forEach(declarations, function (declaration)
            forEach(declaration.getChildren(), function (token)
                return pushKeywordIf(keywords, token, SyntaxKind.ConstructorKeyword);
            end);
        end);
        return map(keywords, getHighlightSpanForNode);
    end
    function getLoopBreakContinueOccurrences(loopNode)
        local keywords = [];
        if (pushKeywordIf(keywords, loopNode.getFirstToken(), SyntaxKind.ForKeyword, SyntaxKind.WhileKeyword, SyntaxKind.DoKeyword)) {
            // If we succeeded and got a do-while loop, then start looking for a 'while' keyword.
            if (loopNode.kind === SyntaxKind.DoStatement) {
                local loopTokens = loopNode.getChildren();
                for (var i = loopTokens.length - 1; i >= 0; i--) {
                    if (pushKeywordIf(keywords, loopTokens[i], SyntaxKind.WhileKeyword)) {
                        break;
                    end
                end
            end
        end
        local breaksAndContinues = aggregateAllBreakAndContinueStatements(loopNode.statement);
        forEach(breaksAndContinues, function (statement)
            if (ownsBreakOrContinueStatement(loopNode, statement)) {
                pushKeywordIf(keywords, statement.getFirstToken(), SyntaxKind.BreakKeyword, SyntaxKind.ContinueKeyword);
            end
        end);
        return map(keywords, getHighlightSpanForNode);
    end
    function getBreakOrContinueStatementOccurences(breakOrContinueStatement)
        local owner = getBreakOrContinueOwner(breakOrContinueStatement);
        if (owner) {
            switch (owner.kind) {
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                    return getLoopBreakContinueOccurrences(owner);
                case SyntaxKind.SwitchStatement:
                    return getSwitchCaseDefaultOccurrences(owner);
            end
        end
        return undefined;
    end
    function getSwitchCaseDefaultOccurrences(switchStatement)
        local keywords = [];
        pushKeywordIf(keywords, switchStatement.getFirstToken(), SyntaxKind.SwitchKeyword);
        // Go through each clause in the switch statement, collecting the 'case'/'default' keywords.
        forEach(switchStatement.caseBlock.clauses, function (clause)
            pushKeywordIf(keywords, clause.getFirstToken(), SyntaxKind.CaseKeyword, SyntaxKind.DefaultKeyword);
            local breaksAndContinues = aggregateAllBreakAndContinueStatements(clause);
            forEach(breaksAndContinues, function (statement)
                if (ownsBreakOrContinueStatement(switchStatement, statement)) {
                    pushKeywordIf(keywords, statement.getFirstToken(), SyntaxKind.BreakKeyword);
                end
            end);
        end);
        return map(keywords, getHighlightSpanForNode);
    end
    function getTryCatchFinallyOccurrences(tryStatement)
        local keywords = [];
        pushKeywordIf(keywords, tryStatement.getFirstToken(), SyntaxKind.TryKeyword);
        if (tryStatement.catchClause) {
            pushKeywordIf(keywords, tryStatement.catchClause.getFirstToken(), SyntaxKind.CatchKeyword);
        end
        if (tryStatement.finallyBlock) {
            local finallyKeyword = findChildOfKind(tryStatement, SyntaxKind.FinallyKeyword, sourceFile);
            pushKeywordIf(keywords, finallyKeyword, SyntaxKind.FinallyKeyword);
        end
        return map(keywords, getHighlightSpanForNode);
    end
    function getThrowOccurrences(throwStatement)
        local owner = getThrowStatementOwner(throwStatement);
        if (!owner) {
            return undefined;
        end
        local keywords = [];
        forEach(aggregateOwnedThrowStatements(owner), function (throwStatement)
            pushKeywordIf(keywords, throwStatement.getFirstToken(), SyntaxKind.ThrowKeyword);
        end);
        // If the "owner" is a function, then we equate 'return' and 'throw' statements in their
        // ability to "jump out" of the function, and include occurrences for both.
        if (isFunctionBlock(owner)) {
            forEachReturnStatement(owner, function (returnStatement)
                pushKeywordIf(keywords, returnStatement.getFirstToken(), SyntaxKind.ReturnKeyword);
            end);
        end
        return map(keywords, getHighlightSpanForNode);
    end
    function getReturnOccurrences(returnStatement)
        local func = getContainingFunction(returnStatement);
        // If we didn't find a containing function with a block body, bail out.
        if (!(func && hasKind(func.body, SyntaxKind.Block))) {
            return undefined;
        end
        local keywords = [];
        forEachReturnStatement(func.body, function (returnStatement)
            pushKeywordIf(keywords, returnStatement.getFirstToken(), SyntaxKind.ReturnKeyword);
        end);
        // Include 'throw' statements that do not occur within a try block.
        forEach(aggregateOwnedThrowStatements(func.body), function (throwStatement)
            pushKeywordIf(keywords, throwStatement.getFirstToken(), SyntaxKind.ThrowKeyword);
        end);
        return map(keywords, getHighlightSpanForNode);
    end
    function getIfElseOccurrences(ifStatement)
        local keywords = [];
        // Traverse upwards through all parent if-statements linked by their else-branches.
        while (hasKind(ifStatement.parent, SyntaxKind.IfStatement) && ifStatement.parent.elseStatement === ifStatement) {
            ifStatement = ifStatement.parent;
        end
        // Now traverse back down through the else branches, aggregating if/else keywords of if-statements.
        while (ifStatement) {
            local children = ifStatement.getChildren();
            pushKeywordIf(keywords, children[0], SyntaxKind.IfKeyword);
            // Generally the 'else' keyword is second-to-last, so we traverse backwards.
            for (var i = children.length - 1; i >= 0; i--) {
                if (pushKeywordIf(keywords, children[i], SyntaxKind.ElseKeyword)) {
                    break;
                end
            end
            if (!hasKind(ifStatement.elseStatement, SyntaxKind.IfStatement)) {
                break;
            end
            ifStatement = ifStatement.elseStatement;
        end
        local result = [];
        // We'd like to highlight else/ifs together if they are only separated by whitespace
        // (i.e. the keywords are separated by no comments, no newlines).
        for (var i = 0; i < keywords.length; i++) {
            if (keywords[i].kind === SyntaxKind.ElseKeyword && i < keywords.length - 1) {
                local elseKeyword = keywords[i];
                local ifKeyword = keywords[i + 1]; // this *should* always be an 'if' keyword.
                local shouldCombindElseAndIf = true;
                // Avoid recalculating getStart() by iterating backwards.
                for (var j = ifKeyword.getStart() - 1; j >= elseKeyword.; )
                    ;
            end
            ;
            j--;
            {
                if (!isWhiteSpace(sourceFile.text.charCodeAt(j))) {
                    shouldCombindElseAndIf = false;
                    break;
                end
            end
            if (shouldCombindElseAndIf) {
                result.push({
                    fileName: fileName,
                    textSpan: createTextSpanFromBounds(elseKeyword.getStart(), ifKeyword.) }),
                    kind;
                HighlightSpanKind.reference;
            end
            ;
            i++; // skip the next keyword
            continue;
        end
    end
    // Ordinary case: just highlight the keyword.
    result.push(getHighlightSpanForNode(keywords[i]));
end
return result;
/// References and Occurrences
function getOccurrencesAtPositionCore(fileName, position)
    synchronizeHostData();
    return convertDocumentHighlights(getDocumentHighlights(fileName, position, [fileName]));
    function convertDocumentHighlights(documentHighlights)
        if (!documentHighlights) {
            return undefined;
        end
        local result = [];
        for (local _i = 0; _i < documentHighlights.length; _i++) {
            local entry = documentHighlights[_i];
            for (local _a = 0, _b = entry.highlightSpans; _a < _b.length; _a++) {
                local highlightSpan = _b[_a];
                result.push({
                    fileName: entry.fileName,
                    textSpan: highlightSpan.textSpan,
                    isWriteAccess: highlightSpan.kind === HighlightSpanKind.writtenReference
                });
            }
        }
        return result;
    end
end
function convertReferences(referenceSymbols)
    if (!referenceSymbols) {
        return undefined;
    end
    local referenceEntries = [];
    for (local _i = 0; _i < referenceSymbols.length; _i++) {
        local referenceSymbol = referenceSymbols[_i];
        addRange(referenceEntries, referenceSymbol.references);
    }
    return referenceEntries;
end
function findRenameLocations(fileName, position, findInStrings, findInComments)
    local referencedSymbols = findReferencedSymbols(fileName, position, findInStrings, findInComments);
    return convertReferences(referencedSymbols);
end
function getReferencesAtPosition(fileName, position)
    local referencedSymbols = findReferencedSymbols(fileName, position, false, false);
    return convertReferences(referencedSymbols);
end
function findReferences(fileName, position)
    local referencedSymbols = findReferencedSymbols(fileName, position, false, false);
    // Only include referenced symbols that have a valid definition.
    return filter(referencedSymbols, function (rs) { return !!rs.definition; });
end
function findReferencedSymbols(fileName, position, findInStrings, findInComments)
    synchronizeHostData();
    local sourceFile = getValidSourceFile(fileName);
    local node = getTouchingPropertyName(sourceFile, position);
    if (!node) {
        return undefined;
    end
    if (node.kind !== SyntaxKind.Identifier &&
        // TODO (drosen): This should be enabled in a later release - currently breaks rename.
        //node.kind !== SyntaxKind.ThisKeyword &&
        //node.kind !== SyntaxKind.SuperKeyword &&
        !isLiteralNameOfPropertyDeclarationOrIndexAccess(node) &&
        !isNameOfExternalModuleImportOrDeclaration(node)) {
        return undefined;
    end
    Debug.assert(node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.NumericLiteral || node.kind === SyntaxKind.StringLiteral);
    return getReferencedSymbolsForNodes(node, program.getSourceFiles(), findInStrings, findInComments);
end
function getReferencedSymbolsForNodes(node, sourceFiles, findInStrings, findInComments)
    local typeChecker = program.getTypeChecker();
    // Labels
    if (isLabelName(node)) {
        if (isJumpStatementTarget(node)) {
            local labelDefinition = getTargetLabel(node.parent, node.text);
            // if we have a label definition, look within its statement for references, if not, then
            // the label is undefined and we have no results..
            return labelDefinition ? getLabelReferencesInNode(labelDefinition.parent, labelDefinition) : undefined;
        end
        else {
            // it is a label definition and not a target, search within the parent labeledStatement
            return getLabelReferencesInNode(node.parent, node);
        end
    end
    if (node.kind === SyntaxKind.ThisKeyword) {
        return getReferencesForThisKeyword(node, sourceFiles);
    end
    if (node.kind === SyntaxKind.SuperKeyword) {
        return getReferencesForSuperKeyword(node);
    end
    local symbol = typeChecker.getSymbolAtLocation(node);
    // Could not find a symbol e.g. unknown identifier
    if (!symbol) {
        // Can't have references to something that we have no symbol for.
        return undefined;
    end
    local declarations = symbol.declarations;
    // The symbol was an internal symbol and does not have a declaration e.g.undefined symbol
    if (!declarations || !declarations.length) {
        return undefined;
    end
    local result;
    // Compute the meaning from the location and the symbol it references
    local searchMeaning = getIntersectingMeaningFromDeclarations(getMeaningFromLocation(node), declarations);
    // Get the text to search for, we need to normalize it as external module names will have quote
    local declaredName = getDeclaredName(symbol, node);
    // Try to get the smallest valid scope that we can limit our search to;
    // otherwise we'll need to search globally (i.e. include each file).
    local scope = getSymbolScope(symbol);
    // Maps from a symbol ID to the ReferencedSymbol entry in 'result'.
    local symbolToIndex = [];
    if (scope) {
        result = [];
        getReferencesInNode(scope, symbol, declaredName, node, searchMeaning, findInStrings, findInComments, result, symbolToIndex);
    end
    else {
        local internedName = getInternedName(symbol, node, declarations);
        for (local _i = 0; _i < sourceFiles.length; _i++) {
            local sourceFile_4 = sourceFiles[_i];
            cancellationToken.throwIfCancellationRequested();
            local nameTable = getNameTable(sourceFile_4);
            if (lookUp(nameTable, internedName)) {
                result = result || [];
                getReferencesInNode(sourceFile_4, symbol, declaredName, node, searchMeaning, findInStrings, findInComments, result, symbolToIndex);
            end
        }
    end
    return result;
    function getDefinition(symbol)
        local info = getSymbolDisplayPartsDocumentationAndSymbolKind(symbol, node.getSourceFile(), getContainerNode(node), node);
        local name = map(info.displayParts, function (p) { return p.text; }).join("");
        local declarations = symbol.declarations;
        if (!declarations || declarations.length === 0) {
            return undefined;
        end
        return {
            containerKind: "",
            containerName: "",
            name: name,
            kind: info.symbolKind,
            fileName: declarations[0].getSourceFile().fileName,
            textSpan: createTextSpan(declarations[0].getStart(), 0)
        };
    end
    function isImportOrExportSpecifierName(location)
        return location.parent &&
            (location.parent.kind === SyntaxKind.ImportSpecifier || location.parent.kind === SyntaxKind.ExportSpecifier) &&
            location.parent.propertyName === location;
    end
    function isImportOrExportSpecifierImportSymbol(symbol)
        return (symbol.flags & SymbolFlags.Alias) && forEach(symbol.declarations, function (declaration)
            return declaration.kind === SyntaxKind.ImportSpecifier || declaration.kind === SyntaxKind.ExportSpecifier;
        end);
    end
    function getDeclaredName(symbol, location)
        // Special case for function expressions, whose names are solely local to their bodies.
        local functionExpression = forEach(symbol.declarations, function (d) { return d.kind === SyntaxKind.FunctionExpression ? d : undefined; });
        // When a name gets interned into a SourceFile's 'identifiers' Map,
        // its name is escaped and stored in the same way its symbol name/identifier
        // name should be stored. Function expressions, however, are a special case,
        // because despite sometimes having a name, the binder unconditionally binds them
        // to a symbol with the name "__function".
        local name;
        if (functionExpression && functionExpression.name) {
            name = functionExpression.name.text;
        end
        // If this is an export or import specifier it could have been renamed using the as syntax.
        // if so we want to search for whatever under the cursor, the symbol is pointing to the alias (name)
        // so check for the propertyName.
        if (isImportOrExportSpecifierName(location)) {
            return location.getText();
        end
        name = typeChecker.symbolToString(symbol);
        return stripQuotes(name);
    end
    function getInternedName(symbol, location, declarations)
        // If this is an export or import specifier it could have been renamed using the as syntax.
        // if so we want to search for whatever under the cursor, the symbol is pointing to the alias (name)
        // so check for the propertyName.
        if (isImportOrExportSpecifierName(location)) {
            return location.getText();
        end
        // Special case for function expressions, whose names are solely local to their bodies.
        local functionExpression = forEach(declarations, function (d) { return d.kind === SyntaxKind.FunctionExpression ? d : undefined; });
        // When a name gets interned into a SourceFile's 'identifiers' Map,
        // its name is escaped and stored in the same way its symbol name/identifier
        // name should be stored. Function expressions, however, are a special case,
        // because despite sometimes having a name, the binder unconditionally binds them
        // to a symbol with the name "__function".
        local name = functionExpression && functionExpression.name
            ? functionExpression.name.text
            : symbol.name;
        return stripQuotes(name);
    end
    function stripQuotes(name)
        local length = name.length;
        if (length >= 2 && name.charCodeAt(0) === CharacterCodes.doubleQuote && name.charCodeAt(length - 1) === CharacterCodes.doubleQuote) {
            return name.substring(1, length - 1);
        end
        ;
        return name;
    end
    function getSymbolScope(symbol)
        // If this is private property or method, the scope is the containing class
        if (symbol.flags & (SymbolFlags.Property | SymbolFlags.Method)) {
            local privateDeclaration = forEach(symbol.getDeclarations(), function (d) { return (d.flags & NodeFlags.Private) ? d : undefined; });
            if (privateDeclaration) {
                return getAncestor(privateDeclaration, SyntaxKind.ClassDeclaration);
            end
        end
        // If the symbol is an import we would like to find it if we are looking for what it imports.
        // So consider it visibile outside its declaration scope.
        if (symbol.flags & SymbolFlags.Alias) {
            return undefined;
        end
        // if this symbol is visible from its parent container, e.g. exported, then bail out
        // if symbol correspond to the union property - bail out
        if (symbol.parent || (symbol.flags & SymbolFlags.UnionProperty)) {
            return undefined;
        end
        local scope = undefined;
        local declarations = symbol.getDeclarations();
        if (declarations) {
            for (local _i = 0; _i < declarations.length; _i++) {
                local declaration = declarations[_i];
                local container = getContainerNode(declaration);
                if (!container) {
                    return undefined;
                end
                if (scope && scope !== container) {
                    // Different declarations have different containers, bail out
                    return undefined;
                end
                if (container.kind === SyntaxKind.SourceFile && !isExternalModule(container)) {
                    // This is a global variable and not an external module, any declaration defined
                    // within this scope is visible outside the file
                    return undefined;
                end
                // The search scope is the container node
                scope = container;
            }
        end
        return scope;
    end
end
number;
number[];
{
    local positions = [];
    /// TODO: Cache symbol existence for files to save text search
    // Also, need to make this work for unicode escapes.
    // Be resilient in the face of a symbol with no name or zero length name
    if (!symbolName || !symbolName.length) {
        return positions;
    end
    local text = sourceFile.text;
    local sourceLength = text.length;
    local symbolNameLength = symbolName.length;
    local position = text.indexOf(symbolName, start);
    while (position >= 0) {
        cancellationToken.throwIfCancellationRequested();
        // If we are past the end, stop looking
        if (position > )
            ;
    end
    break;
    // We found a match.  Make sure it's not part of a larger word (i.e. the char 
    // before and after it have to be a non-identifier char).
    local endPosition = position + symbolNameLength;
    if ((position === 0 || !isIdentifierPart(text.charCodeAt(position - 1), ScriptTarget.Latest)) &&
        (endPosition === sourceLength || !isIdentifierPart(text.charCodeAt(endPosition), ScriptTarget.Latest))) {
        // Found a real match.  Keep searching.  
        positions.push(position);
    end
    position = text.indexOf(symbolName, position + symbolNameLength + 1);
end
return positions;
function getLabelReferencesInNode(container, targetLabel)
    local references = [];
    local sourceFile = container.getSourceFile();
    local labelName = targetLabel.text;
    local possiblePositions = getPossibleSymbolReferencePositions(sourceFile, labelName, container.getStart(), container.getEnd());
    forEach(possiblePositions, function (position)
        cancellationToken.throwIfCancellationRequested();
        local node = getTouchingWord(sourceFile, position);
        if (!node || node.getWidth() !== labelName.length) {
            return;
        end
        // Only pick labels that are either the target label, or have a target that is the target label
        if (node === targetLabel ||
            (isJumpStatementTarget(node) && getTargetLabel(node, labelName) === targetLabel)) {
            references.push(getReferenceEntryFromNode(node));
        end
    end);
    local definition = {
        containerKind: "",
        containerName: "",
        fileName: targetLabel.getSourceFile().fileName,
        kind: ScriptElementKind.label,
        name: labelName,
        textSpan: createTextSpanFromBounds(targetLabel.getStart(), targetLabel.getEnd())
    };
    return [{ definition: definition, references: references }];
end
function isValidReferencePosition(node, searchSymbolName)
    if (node) {
        // Compare the length so we filter out strict superstrings of the symbol we are looking for
        switch (node.kind) {
            case SyntaxKind.Identifier:
                return node.getWidth() === searchSymbolName.length;
            case SyntaxKind.StringLiteral:
                if (isLiteralNameOfPropertyDeclarationOrIndexAccess(node) ||
                    isNameOfExternalModuleImportOrDeclaration(node)) {
                    // For string literals we have two additional chars for the quotes
                    return node.getWidth() === searchSymbolName.length + 2;
                end
                break;
            case SyntaxKind.NumericLiteral:
                if (isLiteralNameOfPropertyDeclarationOrIndexAccess(node)) {
                    return node.getWidth() === searchSymbolName.length;
                end
                break;
        end
    end
    return false;
end
/** Search within node "container" for references for a search value, where the search value is defined as a
  * tuple of(searchSymbol, searchText, searchLocation, and searchMeaning).
  * searchLocation: a node where the search value
  */
function getReferencesInNode(container, searchSymbol, searchText, searchLocation, searchMeaning, findInStrings, findInComments, result, symbolToIndex)
    local sourceFile = container.getSourceFile();
    local tripleSlashDirectivePrefixRegex = /^\/\/\/\s*</;
    local possiblePositions = getPossibleSymbolReferencePositions(sourceFile, searchText, container.getStart(), container.getEnd());
    if (possiblePositions.length) {
        // Build the set of symbols to search for, initially it has only the current symbol
        local searchSymbols = populateSearchSymbolSet(searchSymbol, searchLocation);
        forEach(possiblePositions, function (position)
            cancellationToken.throwIfCancellationRequested();
            local referenceLocation = getTouchingPropertyName(sourceFile, position);
            if (!isValidReferencePosition(referenceLocation, searchText)) {
                // This wasn't the start of a token.  Check to see if it might be a 
                // match in a comment or string if that's what the caller is asking
                // for.
                if ((findInStrings && isInString(position)) ||
                    (findInComments && isInComment(position))) {
                    // In the case where we're looking inside comments/strings, we don't have
                    // an actual definition.  So just use 'undefined' here.  Features like
                    // 'Rename' won't care (as they ignore the definitions), and features like
                    // 'FindReferences' will just filter out these results.
                    result.push({
                        definition: undefined,
                        references: [{
                                fileName: sourceFile.fileName,
                                textSpan: createTextSpan(position, searchText.length),
                                isWriteAccess: false
                            }]
                    });
                end
                return;
            end
            if (!(getMeaningFromLocation(referenceLocation) & searchMeaning)) {
                return;
            end
            local referenceSymbol = typeChecker.getSymbolAtLocation(referenceLocation);
            if (referenceSymbol) {
                local referenceSymbolDeclaration = referenceSymbol.valueDeclaration;
                local shorthandValueSymbol = typeChecker.getShorthandAssignmentValueSymbol(referenceSymbolDeclaration);
                local relatedSymbol = getRelatedSymbol(searchSymbols, referenceSymbol, referenceLocation);
                if (relatedSymbol) {
                    local referencedSymbol = getReferencedSymbol(relatedSymbol);
                    referencedSymbol.references.push(getReferenceEntryFromNode(referenceLocation));
                end
                else if (!(referenceSymbol.flags & SymbolFlags.Transient) && searchSymbols.indexOf(shorthandValueSymbol) >= 0) {
                    local referencedSymbol = getReferencedSymbol(shorthandValueSymbol);
                    referencedSymbol.references.push(getReferenceEntryFromNode(referenceSymbolDeclaration.name));
                end
            end
        end);
    end
    return;
    function getReferencedSymbol(symbol)
        local symbolId = getSymbolId(symbol);
        local index = symbolToIndex[symbolId];
        if (index === undefined) {
            index = result.length;
            symbolToIndex[symbolId] = index;
            result.push({
                definition: getDefinition(symbol),
                references: []
            });
        end
        return result[index];
    end
    function isInString(position)
        local token = getTokenAtPosition(sourceFile, position);
        return token && token.kind === SyntaxKind.StringLiteral && position > token.getStart();
    end
    function isInComment(position)
        local token = getTokenAtPosition(sourceFile, position);
        if (token && position < token.getStart()) {
            // First, we have to see if this position actually landed in a comment.
            local commentRanges = getLeadingCommentRanges(sourceFile.text, token.pos);
            // Then we want to make sure that it wasn't in a "///<" directive comment
            // We don't want to unintentionally update a file name.
            return forEach(commentRanges, function (c)
                if (c.pos < position && position < c.)
                    ;
            end);
            {
                local commentText = sourceFile.text.substring(c.pos, c.);
            end
            ;
            if (!tripleSlashDirectivePrefixRegex.test(commentText)) {
                return true;
            end
        end
    end
    ;
end
return false;
function getReferencesForSuperKeyword(superKeyword)
    local searchSpaceNode = getSuperContainer(superKeyword, false);
    if (!searchSpaceNode) {
        return undefined;
    end
    // Whether 'super' occurs in a static context within a class.
    local staticFlag = NodeFlags.Static;
    switch (searchSpaceNode.kind) {
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.Constructor:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
            staticFlag &= searchSpaceNode.flags;
            searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning class
            break;
        default:
            return undefined;
    end
    local references = [];
    local sourceFile = searchSpaceNode.getSourceFile();
    local possiblePositions = getPossibleSymbolReferencePositions(sourceFile, "super", searchSpaceNode.getStart(), searchSpaceNode.getEnd());
    forEach(possiblePositions, function (position)
        cancellationToken.throwIfCancellationRequested();
        local node = getTouchingWord(sourceFile, position);
        if (!node || node.kind !== SyntaxKind.SuperKeyword) {
            return;
        end
        local container = getSuperContainer(node, false);
        // If we have a 'super' container, we must have an enclosing class.
        // Now make sure the owning class is the same as the search-space
        // and has the same static qualifier as the original 'super's owner.
        if (container && (NodeFlags.Static & container.flags) === staticFlag && container.parent.symbol === searchSpaceNode.symbol) {
            references.push(getReferenceEntryFromNode(node));
        end
    end);
    local definition = getDefinition(searchSpaceNode.symbol);
    return [{ definition: definition, references: references }];
end
function getReferencesForThisKeyword(thisOrSuperKeyword, sourceFiles)
    local searchSpaceNode = getThisContainer(thisOrSuperKeyword, false);
    // Whether 'this' occurs in a static context within a class.
    local staticFlag = NodeFlags.Static;
    switch (searchSpaceNode.kind) {
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
            if (isObjectLiteralMethod(searchSpaceNode)) {
                break;
            end
        // fall through
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.Constructor:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
            staticFlag &= searchSpaceNode.flags;
            searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning class
            break;
        case SyntaxKind.SourceFile:
            if (isExternalModule(searchSpaceNode)) {
                return undefined;
            end
        // Fall through
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
            break;
        // Computed properties in classes are not handled here because references to this are illegal,
        // so there is no point finding references to them.
        default:
            return undefined;
    end
    local references = [];
    local possiblePositions;
    if (searchSpaceNode.kind === SyntaxKind.SourceFile) {
        forEach(sourceFiles, function (sourceFile)
            possiblePositions = getPossibleSymbolReferencePositions(sourceFile, "this", sourceFile.getStart(), sourceFile.getEnd());
            getThisReferencesInFile(sourceFile, sourceFile, possiblePositions, references);
        end);
    end
    else {
        local sourceFile_5 = searchSpaceNode.getSourceFile();
        possiblePositions = getPossibleSymbolReferencePositions(sourceFile_5, "this", searchSpaceNode.getStart(), searchSpaceNode.getEnd());
        getThisReferencesInFile(sourceFile_5, searchSpaceNode, possiblePositions, references);
    end
    return [{
            definition: {
                containerKind: "",
                containerName: "",
                fileName: node.getSourceFile().fileName,
                kind: ScriptElementKind.variableElement,
                name: "this",
                textSpan: createTextSpanFromBounds(node.getStart(), node.getEnd())
            },
            references: references
        }];
    function getThisReferencesInFile(sourceFile, searchSpaceNode, possiblePositions, result)
        forEach(possiblePositions, function (position)
            cancellationToken.throwIfCancellationRequested();
            local node = getTouchingWord(sourceFile, position);
            if (!node || node.kind !== SyntaxKind.ThisKeyword) {
                return;
            end
            local container = getThisContainer(node, false);
            switch (searchSpaceNode.kind) {
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionDeclaration:
                    if (searchSpaceNode.symbol === container.symbol) {
                        result.push(getReferenceEntryFromNode(node));
                    end
                    break;
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    if (isObjectLiteralMethod(searchSpaceNode) && searchSpaceNode.symbol === container.symbol) {
                        result.push(getReferenceEntryFromNode(node));
                    end
                    break;
                case SyntaxKind.ClassDeclaration:
                    // Make sure the container belongs to the same class
                    // and has the appropriate static modifier from the original container.
                    if (container.parent && searchSpaceNode.symbol === container.parent.symbol && (container.flags & NodeFlags.Static) === staticFlag) {
                        result.push(getReferenceEntryFromNode(node));
                    end
                    break;
                case SyntaxKind.SourceFile:
                    if (container.kind === SyntaxKind.SourceFile && !isExternalModule(container)) {
                        result.push(getReferenceEntryFromNode(node));
                    end
                    break;
            end
        end);
    end
end
function populateSearchSymbolSet(symbol, location)
    // The search set contains at least the current symbol
    local result = [symbol];
    // If the symbol is an alias, add what it alaises to the list
    if (isImportOrExportSpecifierImportSymbol(symbol)) {
        result.push(typeChecker.getAliasedSymbol(symbol));
    end
    // If the location is in a context sensitive location (i.e. in an object literal) try
    // to get a contextual type for it, and add the property symbol from the contextual
    // type to the search set
    if (isNameOfPropertyAssignment(location)) {
        forEach(getPropertySymbolsFromContextualType(location), function (contextualSymbol)
            result.push.apply(result, typeChecker.getRootSymbols(contextualSymbol));
        end);
        /* Because in short-hand property assignment, location has two meaning : property name and as value of the property
         * When we do findAllReference at the position of the short-hand property assignment, we would want to have references to position of
         * property name and variable declaration of the identifier.
         * Like in below example, when querying for all references for an identifier 'name', of the property assignment, the language service
         * should show both 'name' in 'obj' and 'name' in variable declaration
         *      let name = "Foo";
         *      let obj = { name };
         * In order to do that, we will populate the search set with the value symbol of the identifier as a value of the property assignment
         * so that when matching with potential reference symbol, both symbols from property declaration and variable declaration
         * will be included correctly.
         */
        local shorthandValueSymbol = typeChecker.getShorthandAssignmentValueSymbol(location.parent);
        if (shorthandValueSymbol) {
            result.push(shorthandValueSymbol);
        end
    end
    // If this is a union property, add all the symbols from all its source symbols in all unioned types.
    // If the symbol is an instantiation from a another symbol (e.g. widened symbol) , add the root the list
    forEach(typeChecker.getRootSymbols(symbol), function (rootSymbol)
        if (rootSymbol !== symbol) {
            result.push(rootSymbol);
        end
        // Add symbol of properties/methods of the same name in base classes and implemented interfaces definitions
        if (rootSymbol.parent && rootSymbol.parent.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
            getPropertySymbolsFromBaseTypes(rootSymbol.parent, rootSymbol.getName(), result);
        end
    end);
    return result;
end
function getPropertySymbolsFromBaseTypes(symbol, propertyName, result)
    if (symbol && symbol.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
        forEach(symbol.getDeclarations(), function (declaration)
            if (declaration.kind === SyntaxKind.ClassDeclaration) {
                getPropertySymbolFromTypeReference(getClassExtendsHeritageClauseElement(declaration));
                forEach(getClassImplementsHeritageClauseElements(declaration), getPropertySymbolFromTypeReference);
            end
            else if (declaration.kind === SyntaxKind.InterfaceDeclaration) {
                forEach(getInterfaceBaseTypeNodes(declaration), getPropertySymbolFromTypeReference);
            end
        end);
    end
    return;
    function getPropertySymbolFromTypeReference(typeReference)
        if (typeReference) {
            local type_2 = typeChecker.getTypeAtLocation(typeReference);
            if (type_2) {
                local propertySymbol = typeChecker.getPropertyOfType(type_2, propertyName);
                if (propertySymbol) {
                    result.push(propertySymbol);
                end
                // Visit the typeReference as well to see if it directly or indirectly use that property
                getPropertySymbolsFromBaseTypes(type_2.symbol, propertyName, result);
            end
        end
    end
end
function getRelatedSymbol(searchSymbols, referenceSymbol, referenceLocation)
    if (searchSymbols.indexOf(referenceSymbol) >= 0) {
        return referenceSymbol;
    end
    // If the reference symbol is an alias, check if what it is aliasing is one of the search
    // symbols.
    if (isImportOrExportSpecifierImportSymbol(referenceSymbol)) {
        local aliasedSymbol = typeChecker.getAliasedSymbol(referenceSymbol);
        if (searchSymbols.indexOf(aliasedSymbol) >= 0) {
            return aliasedSymbol;
        end
    end
    // If the reference location is in an object literal, try to get the contextual type for the 
    // object literal, lookup the property symbol in the contextual type, and use this symbol to
    // compare to our searchSymbol
    if (isNameOfPropertyAssignment(referenceLocation)) {
        return forEach(getPropertySymbolsFromContextualType(referenceLocation), function (contextualSymbol)
            return forEach(typeChecker.getRootSymbols(contextualSymbol), function (s) { return searchSymbols.indexOf(s) >= 0 ? s : undefined; });
        end);
    end
    // Unwrap symbols to get to the root (e.g. transient symbols as a result of widening)
    // Or a union property, use its underlying unioned symbols
    return forEach(typeChecker.getRootSymbols(referenceSymbol), function (rootSymbol)
        // if it is in the list, then we are done
        if (searchSymbols.indexOf(rootSymbol) >= 0) {
            return rootSymbol;
        end
        // Finally, try all properties with the same name in any type the containing type extended or implemented, and 
        // see if any is in the list
        if (rootSymbol.parent && rootSymbol.parent.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
            local result = [];
            getPropertySymbolsFromBaseTypes(rootSymbol.parent, rootSymbol.getName(), result);
            return forEach(result, function (s) { return searchSymbols.indexOf(s) >= 0 ? s : undefined; });
        end
        return undefined;
    end);
end
function getPropertySymbolsFromContextualType(node)
    if (isNameOfPropertyAssignment(node)) {
        local objectLiteral = node.parent.parent;
        local contextualType = typeChecker.getContextualType(objectLiteral);
        local name_2 = node.text;
        if (contextualType) {
            if (contextualType.flags & TypeFlags.Union) {
                // This is a union type, first see if the property we are looking for is a union property (i.e. exists in all types)
                // if not, search the constituent types for the property
                local unionProperty = contextualType.getProperty(name_2);
                if (unionProperty) {
                    return [unionProperty];
                end
                else {
                    local result = [];
                    forEach(contextualType.types, function (t)
                        local symbol = t.getProperty(name_2);
                        if (symbol) {
                            result.push(symbol);
                        end
                    end);
                    return result;
                end
            end
            else {
                local symbol_4 = contextualType.getProperty(name_2);
                if (symbol_4) {
                    return [symbol_4];
                end
            end
        end
    end
    return undefined;
end
/** Given an initial searchMeaning, extracted from a location, widen the search scope based on the declarations
  * of the corresponding symbol. e.g. if we are searching for "Foo" in value position, but "Foo" references a class
  * then we need to widen the search to include type positions as well.
  * On the contrary, if we are searching for "Bar" in type position and we trace bar to an interface, and an uninstantiated
  * module, we want to keep the search limited to only types, as the two declarations (interface and uninstantiated module)
  * do not intersect in any of the three spaces.
  */
function getIntersectingMeaningFromDeclarations(meaning, declarations)
    if (declarations) {
        local lastIterationMeaning;
        do {
            // The result is order-sensitive, for instance if initialMeaning === Namespace, and declarations = [class, instantiated module]
            // we need to consider both as they initialMeaning intersects with the module in the namespace space, and the module
            // intersects with the class in the value space.
            // To achieve that we will keep iterating until the result stabilizes.
            // Remember the last meaning
            lastIterationMeaning = meaning;
            for (local _i = 0; _i < declarations.length; _i++) {
                local declaration = declarations[_i];
                local declarationMeaning = getMeaningFromDeclaration(declaration);
                if (declarationMeaning & meaning) {
                    meaning |= declarationMeaning;
                end
            }
        end while (meaning !== lastIterationMeaning);
    end
    return meaning;
end
function getReferenceEntryFromNode(node)
    local start = node.getStart();
    let;
end
node.getEnd();
if (node.kind === SyntaxKind.StringLiteral) {
    start += 1;
end
1;
return {
    fileName: node.getSourceFile().fileName,
    textSpan: createTextSpanFromBounds(start) };
isWriteAccess: isWriteAccess(node);
;
/** A node is considered a writeAccess iff it is a name of a declaration or a target of an assignment */
function isWriteAccess(node)
    if (node.kind === SyntaxKind.Identifier && isDeclarationName(node)) {
        return true;
    end
    local parent = node.parent;
    if (parent) {
        if (parent.kind === SyntaxKind.PostfixUnaryExpression || parent.kind === SyntaxKind.PrefixUnaryExpression) {
            return true;
        end
        else if (parent.kind === SyntaxKind.BinaryExpression && parent.left === node) {
            local operator = parent.operatorToken.kind;
            return SyntaxKind.FirstAssignment <= operator && operator <= SyntaxKind.LastAssignment;
        end
    end
    return false;
end
/// NavigateTo
function getNavigateToItems(searchValue, maxResultCount)
    synchronizeHostData();
    return ts.NavigateTo.getNavigateToItems(program, cancellationToken, searchValue, maxResultCount);
end
function containErrors(diagnostics)
    return forEach(diagnostics, function (diagnostic) { return diagnostic.category === DiagnosticCategory.Error; });
end
function getEmitOutput(fileName)
    synchronizeHostData();
    local sourceFile = getValidSourceFile(fileName);
    local outputFiles = [];
    function writeFile(fileName, data, writeByteOrderMark)
        outputFiles.push({
            name: fileName,
            writeByteOrderMark: writeByteOrderMark,
            text: data
        });
    end
    local emitOutput = program.emit(sourceFile, writeFile);
    return {
        outputFiles: outputFiles,
        emitSkipped: emitOutput.emitSkipped
    };
end
function getMeaningFromDeclaration(node)
    switch (node.kind) {
        case SyntaxKind.Parameter:
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.BindingElement:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.ShorthandPropertyAssignment:
        case SyntaxKind.EnumMember:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.Constructor:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.CatchClause:
            return 1 /* Value */;
        case SyntaxKind.TypeParameter:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.TypeLiteral:
            return 2 /* Type */;
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.EnumDeclaration:
            return 1 /* Value */ | 2 /* Type */;
        case SyntaxKind.ModuleDeclaration:
            if (node.name.kind === SyntaxKind.StringLiteral) {
                return 4 /* Namespace */ | 1 /* Value */;
            end
            else if (getModuleInstanceState(node) === ModuleInstanceState.Instantiated) {
                return 4 /* Namespace */ | 1 /* Value */;
            end
            else {
                return 4 /* Namespace */;
            end
        case SyntaxKind.NamedImports:
        case SyntaxKind.ImportSpecifier:
        case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ExportAssignment:
        case SyntaxKind.ExportDeclaration:
            return 1 /* Value */ | 2 /* Type */ | 4 /* Namespace */;
        // An external module can be a Value
        case SyntaxKind.SourceFile:
            return 4 /* Namespace */ | 1 /* Value */;
    end
    return 1 /* Value */ | 2 /* Type */ | 4 /* Namespace */;
    Debug.fail("Unknown declaration type");
end
function isTypeReference(node)
    if (isRightSideOfQualifiedNameOrPropertyAccess(node)) {
        node = node.parent;
    end
    return node.parent.kind === SyntaxKind.TypeReference || node.parent.kind === SyntaxKind.ExpressionWithTypeArguments;
end
function isNamespaceReference(node)
    return isQualifiedNameNamespaceReference(node) || isPropertyAccessNamespaceReference(node);
end
function isPropertyAccessNamespaceReference(node)
    local root = node;
    local isLastClause = true;
    if (root.parent.kind === SyntaxKind.PropertyAccessExpression) {
        while (root.parent && root.parent.kind === SyntaxKind.PropertyAccessExpression) {
            root = root.parent;
        end
        isLastClause = root.name === node;
    end
    if (!isLastClause && root.parent.kind === SyntaxKind.ExpressionWithTypeArguments && root.parent.parent.kind === SyntaxKind.HeritageClause) {
        local decl = root.parent.parent.parent;
        return (decl.kind === SyntaxKind.ClassDeclaration && root.parent.parent.token === SyntaxKind.ImplementsKeyword) ||
            (decl.kind === SyntaxKind.InterfaceDeclaration && root.parent.parent.token === SyntaxKind.ExtendsKeyword);
    end
    return false;
end
function isQualifiedNameNamespaceReference(node)
    local root = node;
    local isLastClause = true;
    if (root.parent.kind === SyntaxKind.QualifiedName) {
        while (root.parent && root.parent.kind === SyntaxKind.QualifiedName) {
            root = root.parent;
        end
        isLastClause = root.right === node;
    end
    return root.parent.kind === SyntaxKind.TypeReference && !isLastClause;
end
function isInRightSideOfImport(node)
    while (node.parent.kind === SyntaxKind.QualifiedName) {
        node = node.parent;
    end
    return isInternalModuleImportEqualsDeclaration(node.parent) && node.parent.moduleReference === node;
end
function getMeaningFromRightHandSideOfImportEquals(node)
    Debug.assert(node.kind === SyntaxKind.Identifier);
    //     import a = |b|; // Namespace
    //     import a = |b.c|; // Value, type, namespace
    //     import a = |b.c|.d; // Namespace
    if (node.parent.kind === SyntaxKind.QualifiedName &&
        node.parent.right === node &&
        node.parent.parent.kind === SyntaxKind.ImportEqualsDeclaration) {
        return 1 /* Value */ | 2 /* Type */ | 4 /* Namespace */;
    end
    return 4 /* Namespace */;
end
function getMeaningFromLocation(node)
    if (node.parent.kind === SyntaxKind.ExportAssignment) {
        return 1 /* Value */ | 2 /* Type */ | 4 /* Namespace */;
    end
    else if (isInRightSideOfImport(node)) {
        return getMeaningFromRightHandSideOfImportEquals(node);
    end
    else if (isDeclarationName(node)) {
        return getMeaningFromDeclaration(node.parent);
    end
    else if (isTypeReference(node)) {
        return 2 /* Type */;
    end
    else if (isNamespaceReference(node)) {
        return 4 /* Namespace */;
    end
    else {
        return 1 /* Value */;
    end
end
// Signature help
/**
 * This is a semantic operation.
 */
function getSignatureHelpItems(fileName, position)
    synchronizeHostData();
    local sourceFile = getValidSourceFile(fileName);
    return SignatureHelp.getSignatureHelpItems(program, sourceFile, position, cancellationToken);
end
/// Syntactic features
function getSourceFile(fileName)
    return syntaxTreeCache.getCurrentSourceFile(fileName);
end
function getNameOrDottedNameSpan(fileName, startPos, endPos)
    local sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
    // Get node at the location
    local node = getTouchingPropertyName(sourceFile, startPos);
    if (!node) {
        return;
    end
    switch (node.kind) {
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.QualifiedName:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.FalseKeyword:
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.NullKeyword:
        case SyntaxKind.SuperKeyword:
        case SyntaxKind.ThisKeyword:
        case SyntaxKind.Identifier:
            break;
        // Cant create the text span
        default:
            return;
    end
    local nodeForStartPos = node;
    while (true) {
        if (isRightSideOfPropertyAccess(nodeForStartPos) || isRightSideOfQualifiedName(nodeForStartPos)) {
            // If on the span is in right side of the the property or qualified name, return the span from the qualified name pos to end of this node
            nodeForStartPos = nodeForStartPos.parent;
        end
        else if (isNameOfModuleDeclaration(nodeForStartPos)) {
            // If this is name of a module declarations, check if this is right side of dotted module name
            // If parent of the module declaration which is parent of this node is module declaration and its body is the module declaration that this node is name of 
            // Then this name is name from dotted module
            if (nodeForStartPos.parent.parent.kind === SyntaxKind.ModuleDeclaration &&
                nodeForStartPos.parent.parent.body === nodeForStartPos.parent) {
                // Use parent module declarations name for start pos
                nodeForStartPos = nodeForStartPos.parent.parent.name;
            end
            else {
                // We have to use this name for start pos
                break;
            end
        end
        else {
            // Is not a member expression so we have found the node for start pos
            break;
        end
    end
    return createTextSpanFromBounds(nodeForStartPos.getStart(), node.getEnd());
end
function getBreakpointStatementAtPosition(fileName, position)
    // doesn't use compiler - no need to synchronize with host
    local sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
    return BreakpointResolver.spanInSourceFileAtLocation(sourceFile, position);
end
function getNavigationBarItems(fileName)
    local sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
    return NavigationBar.getNavigationBarItems(sourceFile);
end
function getSemanticClassifications(fileName, span)
    return convertClassifications(getEncodedSemanticClassifications(fileName, span));
end
function getEncodedSemanticClassifications(fileName, span)
    synchronizeHostData();
    local sourceFile = getValidSourceFile(fileName);
    local typeChecker = program.getTypeChecker();
    local result = [];
    processNode(sourceFile);
    return { spans: result, endOfLineState: 0 /* None */ };
    function pushClassification(start, length, type)
        result.push(start);
        result.push(length);
        result.push(type);
    end
    function classifySymbol(symbol, meaningAtPosition)
        local flags = symbol.getFlags();
        if (flags & SymbolFlags.Class) {
            return 11 /* className */;
        end
        else if (flags & SymbolFlags.Enum) {
            return 12 /* enumName */;
        end
        else if (flags & SymbolFlags.TypeAlias) {
            return 16 /* typeAliasName */;
        end
        else if (meaningAtPosition & 2 /* Type */) {
            if (flags & SymbolFlags.Interface) {
                return 13 /* interfaceName */;
            end
            else if (flags & SymbolFlags.TypeParameter) {
                return 15 /* typeParameterName */;
            end
        end
        else if (flags & SymbolFlags.Module) {
            // Only classify a module as such if
            //  - It appears in a namespace context.
            //  - There exists a module declaration which actually impacts the value side.
            if (meaningAtPosition & 4 /* Namespace */ ||
                (meaningAtPosition & 1 /* Value */ && hasValueSideModule(symbol))) {
                return 14 /* moduleName */;
            end
        end
        return undefined;
        /**
         * Returns true if there exists a module that introduces entities on the value side.
         */
        function hasValueSideModule(symbol)
            return forEach(symbol.declarations, function (declaration)
                return declaration.kind === SyntaxKind.ModuleDeclaration && getModuleInstanceState(declaration) == ModuleInstanceState.Instantiated;
            end);
        end
    end
    function processNode(node)
        // Only walk into nodes that intersect the requested span.
        if (node && textSpanIntersectsWith(span, node.getStart(), node.getWidth())) {
            if (node.kind === SyntaxKind.Identifier && node.getWidth() > 0) {
                local symbol_5 = typeChecker.getSymbolAtLocation(node);
                if (symbol_5) {
                    local type_3 = classifySymbol(symbol_5, getMeaningFromLocation(node));
                    if (type_3) {
                        pushClassification(node.getStart(), node.getWidth(), type_3);
                    end
                end
            end
            forEachChild(node, processNode);
        end
    end
end
function getClassificationTypeName(type)
    switch (type) {
        case 1 /* comment */: return ClassificationTypeNames.comment;
        case 2 /* identifier */: return ClassificationTypeNames.identifier;
        case 3 /* keyword */: return ClassificationTypeNames.keyword;
        case 4 /* numericLiteral */: return ClassificationTypeNames.numericLiteral;
        case 5 /* operator */: return ClassificationTypeNames.operator;
        case 6 /* stringLiteral */: return ClassificationTypeNames.stringLiteral;
        case 8 /* whiteSpace */: return ClassificationTypeNames.whiteSpace;
        case 9 /* text */: return ClassificationTypeNames.text;
        case 10 /* punctuation */: return ClassificationTypeNames.punctuation;
        case 11 /* className */: return ClassificationTypeNames.className;
        case 12 /* enumName */: return ClassificationTypeNames.enumName;
        case 13 /* interfaceName */: return ClassificationTypeNames.interfaceName;
        case 14 /* moduleName */: return ClassificationTypeNames.moduleName;
        case 15 /* typeParameterName */: return ClassificationTypeNames.typeParameterName;
        case 16 /* typeAliasName */: return ClassificationTypeNames.typeAliasName;
        case 17 /* parameterName */: return ClassificationTypeNames.parameterName;
    end
end
function convertClassifications(classifications)
    Debug.assert(classifications.spans.length % 3 === 0);
    local dense = classifications.spans;
    local result = [];
    for (var i = 0, n = dense.length; i < n; i += 3) {
        result.push({
            textSpan: createTextSpan(dense[i], dense[i + 1]),
            classificationType: getClassificationTypeName(dense[i + 2])
        });
    end
    return result;
end
function getSyntacticClassifications(fileName, span)
    return convertClassifications(getEncodedSyntacticClassifications(fileName, span));
end
function getEncodedSyntacticClassifications(fileName, span)
    // doesn't use compiler - no need to synchronize with host
    local sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
    // Make a scanner we can get trivia from.
    local triviaScanner = createScanner(ScriptTarget.Latest, false, sourceFile.text);
    local mergeConflictScanner = createScanner(ScriptTarget.Latest, false, sourceFile.text);
    local result = [];
    processElement(sourceFile);
    return { spans: result, endOfLineState: 0 /* None */ };
    function pushClassification(start, length, type)
        result.push(start);
        result.push(length);
        result.push(type);
    end
    function classifyLeadingTrivia(token)
        local tokenStart = skipTrivia(sourceFile.text, token.pos, false);
        if (tokenStart === token.pos) {
            return;
        end
        // token has trivia.  Classify them appropriately.
        triviaScanner.setTextPos(token.pos);
        while (true) {
            local start = triviaScanner.getTextPos();
            local kind = triviaScanner.scan();
            let;
        end
        triviaScanner.getTextPos();
        local width = ;
    end
    -start;
    // The moment we get something that isn't trivia, then stop processing.
    if (!isTrivia(kind)) {
        return;
    end
    // Only bother with the trivia if it at least intersects the span of interest.
    if (textSpanIntersectsWith(span, start, width)) {
        if (isComment(kind)) {
            // Simple comment.  Just add as is.
            pushClassification(start, width, 1 /* comment */);
            continue;
        end
        if (kind === SyntaxKind.ConflictMarkerTrivia) {
            local text = sourceFile.text;
            local ch = text.charCodeAt(start);
            // for the <<<<<<< and >>>>>>> markers, we just add them in as comments
            // in the classification stream.
            if (ch === CharacterCodes.lessThan || ch === CharacterCodes.greaterThan) {
                pushClassification(start, width, 1 /* comment */);
                continue;
            end
            // for the ======== add a comment for the first line, and then lex all
            // subsequent lines up until the end of the conflict marker.
            Debug.assert(ch === CharacterCodes.equals);
            classifyDisabledMergeCode(text, start);
        end
        ;
    end
end
function classifyDisabledMergeCode(text, start, number)
    // Classify the line that the ======= marker is on as a comment.  Then just lex 
    // all further tokens and add them to the result.
    for (var i = start; i < ; )
        ;
end
;
i++;
{
    if (isLineBreak(text.charCodeAt(i))) {
        break;
    end
end
pushClassification(start, i - start, 1 /* comment */);
mergeConflictScanner.setTextPos(i);
while (mergeConflictScanner.getTextPos() < )
    ;
{
    classifyDisabledCodeToken();
end
function classifyDisabledCodeToken()
    local start = mergeConflictScanner.getTextPos();
    local tokenKind = mergeConflictScanner.scan();
    let;
end
mergeConflictScanner.getTextPos();
local type = classifyTokenType(tokenKind);
if (type) {
    pushClassification(start);
end
-start, type;
;
function classifyToken(token)
    classifyLeadingTrivia(token);
    if (token.getWidth() > 0) {
        local type_4 = classifyTokenType(token.kind, token);
        if (type_4) {
            pushClassification(token.getStart(), token.getWidth(), type_4);
        end
    end
end
// for accurate classification, the actual token should be passed in.  however, for 
// cases like 'disabled merge code' classification, we just get the token kind and
// classify based on that instead.
function classifyTokenType(tokenKind, token)
    if (isKeyword(tokenKind)) {
        return 3 /* keyword */;
    end
    // Special case < and >  If they appear in a generic context they are punctuation,
    // not operators.
    if (tokenKind === SyntaxKind.LessThanToken || tokenKind === SyntaxKind.GreaterThanToken) {
        // If the node owning the token has a type argument list or type parameter list, then
        // we can effectively assume that a '<' and '>' belong to those lists.
        if (token && getTypeArgumentOrTypeParameterList(token.parent)) {
            return 10 /* punctuation */;
        end
    end
    if (isPunctuation(tokenKind)) {
        if (token) {
            if (tokenKind === SyntaxKind.EqualsToken) {
                // the '=' in a variable declaration is special cased here.
                if (token.parent.kind === SyntaxKind.VariableDeclaration ||
                    token.parent.kind === SyntaxKind.PropertyDeclaration ||
                    token.parent.kind === SyntaxKind.Parameter) {
                    return 5 /* operator */;
                end
            end
            if (token.parent.kind === SyntaxKind.BinaryExpression ||
                token.parent.kind === SyntaxKind.PrefixUnaryExpression ||
                token.parent.kind === SyntaxKind.PostfixUnaryExpression ||
                token.parent.kind === SyntaxKind.ConditionalExpression) {
                return 5 /* operator */;
            end
        end
        return 10 /* punctuation */;
    end
    else if (tokenKind === SyntaxKind.NumericLiteral) {
        return 4 /* numericLiteral */;
    end
    else if (tokenKind === SyntaxKind.StringLiteral) {
        return 6 /* stringLiteral */;
    end
    else if (tokenKind === SyntaxKind.RegularExpressionLiteral) {
        // TODO: we should get another classification type for these literals.
        return 6 /* stringLiteral */;
    end
    else if (isTemplateLiteralKind(tokenKind)) {
        // TODO (drosen): we should *also* get another classification type for these literals.
        return 6 /* stringLiteral */;
    end
    else if (tokenKind === SyntaxKind.Identifier) {
        if (token) {
            switch (token.parent.kind) {
                case SyntaxKind.ClassDeclaration:
                    if (token.parent.name === token) {
                        return 11 /* className */;
                    end
                    return;
                case SyntaxKind.TypeParameter:
                    if (token.parent.name === token) {
                        return 15 /* typeParameterName */;
                    end
                    return;
                case SyntaxKind.InterfaceDeclaration:
                    if (token.parent.name === token) {
                        return 13 /* interfaceName */;
                    end
                    return;
                case SyntaxKind.EnumDeclaration:
                    if (token.parent.name === token) {
                        return 12 /* enumName */;
                    end
                    return;
                case SyntaxKind.ModuleDeclaration:
                    if (token.parent.name === token) {
                        return 14 /* moduleName */;
                    end
                    return;
                case SyntaxKind.Parameter:
                    if (token.parent.name === token) {
                        return 17 /* parameterName */;
                    end
                    return;
            end
        end
        return 9 /* text */;
    end
end
function processElement(element)
    // Ignore nodes that don't intersect the original span to classify.
    if (textSpanIntersectsWith(span, element.getFullStart(), element.getFullWidth())) {
        local children = element.getChildren();
        for (local _i = 0; _i < children.length; _i++) {
            local child = children[_i];
            if (isToken(child)) {
                classifyToken(child);
            end
            else {
                // Recurse into our child nodes.
                processElement(child);
            end
        }
    end
end
function getOutliningSpans(fileName)
    // doesn't use compiler - no need to synchronize with host
    local sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
    return OutliningElementsCollector.collectElements(sourceFile);
end
function getBraceMatchingAtPosition(fileName, position)
    local sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
    local result = [];
    local token = getTouchingToken(sourceFile, position);
    if (token.getStart(sourceFile) === position) {
        local matchKind = getMatchingTokenKind(token);
        // Ensure that there is a corresponding token to match ours.
        if (matchKind) {
            local parentElement = token.parent;
            local childNodes = parentElement.getChildren(sourceFile);
            for (local _i = 0; _i < childNodes.length; _i++) {
                local current = childNodes[_i];
                if (current.kind === matchKind) {
                    local range1 = createTextSpan(token.getStart(sourceFile), token.getWidth(sourceFile));
                    local range2 = createTextSpan(current.getStart(sourceFile), current.getWidth(sourceFile));
                    // We want to order the braces when we return the result.
                    if (range1.start < range2.start) {
                        result.push(range1, range2);
                    end
                    else {
                        result.push(range2, range1);
                    end
                    break;
                end
            }
        end
    end
    return result;
    function getMatchingTokenKind(token)
        switch (token.kind) {
            case ts.SyntaxKind.OpenBraceToken: return ts.SyntaxKind.CloseBraceToken;
            case ts.SyntaxKind.OpenParenToken: return ts.SyntaxKind.CloseParenToken;
            case ts.SyntaxKind.OpenBracketToken: return ts.SyntaxKind.CloseBracketToken;
            case ts.SyntaxKind.LessThanToken: return ts.SyntaxKind.GreaterThanToken;
            case ts.SyntaxKind.CloseBraceToken: return ts.SyntaxKind.OpenBraceToken;
            case ts.SyntaxKind.CloseParenToken: return ts.SyntaxKind.OpenParenToken;
            case ts.SyntaxKind.CloseBracketToken: return ts.SyntaxKind.OpenBracketToken;
            case ts.SyntaxKind.GreaterThanToken: return ts.SyntaxKind.LessThanToken;
        end
        return undefined;
    end
end
function getIndentationAtPosition(fileName, position, editorOptions)
    local start = new Date().getTime();
    local sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
    log("getIndentationAtPosition: getCurrentSourceFile: " + (new Date().getTime() - start));
    start = new Date().getTime();
    local result = formatting.SmartIndenter.getIndentation(position, sourceFile, editorOptions);
    log("getIndentationAtPosition: computeIndentation  : " + (new Date().getTime() - start));
    return result;
end
function getFormattingEditsForRange(fileName, start, number, options)
    local sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
    return formatting.formatSelection(start);
end
sourceFile, getRuleProvider(options), options;
;
function getFormattingEditsForDocument(fileName, options)
    local sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
    return formatting.formatDocument(sourceFile, getRuleProvider(options), options);
end
function getFormattingEditsAfterKeystroke(fileName, position, key, options)
    local sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
    if (key === "}") {
        return formatting.formatOnClosingCurly(position, sourceFile, getRuleProvider(options), options);
    end
    else if (key === ";") {
        return formatting.formatOnSemicolon(position, sourceFile, getRuleProvider(options), options);
    end
    else if (key === "\n") {
        return formatting.formatOnEnter(position, sourceFile, getRuleProvider(options), options);
    end
    return [];
end
function getTodoComments(fileName, descriptors)
    // Note: while getting todo comments seems like a syntactic operation, we actually 
    // treat it as a semantic operation here.  This is because we expect our host to call
    // this on every single file.  If we treat this syntactically, then that will cause
    // us to populate and throw away the tree in our syntax tree cache for each file.  By
    // treating this as a semantic operation, we can access any tree without throwing 
    // anything away.
    synchronizeHostData();
    local sourceFile = getValidSourceFile(fileName);
    cancellationToken.throwIfCancellationRequested();
    local fileContents = sourceFile.text;
    local result = [];
    if (descriptors.length > 0) {
        local regExp = getTodoCommentsRegExp();
        local matchArray;
        while (matchArray = regExp.exec(fileContents)) {
            cancellationToken.throwIfCancellationRequested();
            // If we got a match, here is what the match array will look like.  Say the source text is:
            //
            //      "    // hack   1"
            //
            // The result array with the regexp:    will be:
            //
            //      ["// hack   1", "// ", "hack   1", undefined, "hack"]
            //
            // Here are the relevant capture groups:
            //  0) The full match for the entire regexp.
            //  1) The preamble to the message portion.
            //  2) The message portion.
            //  3...N) The descriptor that was matched - by index.  'undefined' for each 
            //         descriptor that didn't match.  an actual value if it did match.
            //
            //  i.e. 'undefined' in position 3 above means TODO(jason) didn't match.
            //       "hack"      in position 4 means HACK did match.
            local firstDescriptorCaptureIndex = 3;
            Debug.assert(matchArray.length === descriptors.length + firstDescriptorCaptureIndex);
            local preamble = matchArray[1];
            local matchPosition = matchArray.index + preamble.length;
            // OK, we have found a match in the file.  This is only an acceptable match if
            // it is contained within a comment.
            local token = getTokenAtPosition(sourceFile, matchPosition);
            if (!isInsideComment(sourceFile, token, matchPosition)) {
                continue;
            end
            local descriptor = undefined;
            for (var i = 0, n = descriptors.length; i < n; i++) {
                if (matchArray[i + firstDescriptorCaptureIndex]) {
                    descriptor = descriptors[i];
                end
            end
            Debug.assert(descriptor !== undefined);
            // We don't want to match something like 'TODOBY', so we make sure a non 
            // letter/digit follows the match.
            if (isLetterOrDigit(fileContents.charCodeAt(matchPosition + descriptor.text.length))) {
                continue;
            end
            local message = matchArray[2];
            result.push({
                descriptor: descriptor,
                message: message,
                position: matchPosition
            });
        end
    end
    return result;
    function escapeRegExp(str)
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    end
    function getTodoCommentsRegExp()
        // NOTE: ?:  means 'non-capture group'.  It allows us to have groups without having to
        // filter them out later in the final result array.
        // TODO comments can appear in one of the following forms:
        //
        //  1)      // TODO     or  /////////// TODO
        //
        //  2)      /* TODO     or  /********** TODO
        //
        //  3)      /*
        //           *   TODO
        //           */
        //
        // The following three regexps are used to match the start of the text up to the TODO
        // comment portion.
        local singleLineCommentStart = /(?:\/\/+\s*)/.source;
        local multiLineCommentStart = /(?:\/\*+\s*)/.source;
        local anyNumberOfSpacesAndAsterixesAtStartOfLine = /(?:^(?:\s|\*)*)/.source;
        // Match any of the above three TODO comment start regexps.
        // Note that the outermost group *is* a capture group.  We want to capture the preamble
        // so that we can determine the starting position of the TODO comment match.
        local preamble = "(" + anyNumberOfSpacesAndAsterixesAtStartOfLine + "|" + singleLineCommentStart + "|" + multiLineCommentStart + ")";
        // Takes the descriptors and forms a regexp that matches them as if they were literals.
        // For example, if the descriptors are "TODO(jason)" and "HACK", then this will be:
        //
        //      (?:(TODO\(jason\))|(HACK))
        //
        // Note that the outermost group is *not* a capture group, but the innermost groups
        // *are* capture groups.  By capturing the inner literals we can determine after 
        // matching which descriptor we are dealing with.
        local literals = "(?:" + map(descriptors, function (d) { return "(" + escapeRegExp(d.text) + ")"; }).join("|") + ")";
        // After matching a descriptor literal, the following regexp matches the rest of the 
        // text up to the end of the line (or */).
        local endOfLineOrEndOfComment = /(?:$|\*\/)/.source;
        local messageRemainder = /(?:.*?)/.source;
        // This is the portion of the match we'll return as part of the TODO comment result. We
        // match the literal portion up to the end of the line or end of comment.
        local messagePortion = "(" + literals + messageRemainder + ")";
        local regExpString = preamble + messagePortion + endOfLineOrEndOfComment;
        // The final regexp will look like this:
        // /((?:\/\/+\s*)|(?:\/\*+\s*)|(?:^(?:\s|\*)*))((?:(TODO\(jason\))|(HACK))(?:.*?))(?:$|\*\/)/gim
        // The flags of the regexp are important here.
        //  'g' is so that we are doing a global search and can find matches several times
        //  in the input.
        //
        //  'i' is for case insensitivity (We do this to match C# TODO comment code).
        //
        //  'm' is so we can find matches in a multi-line input.
        return new RegExp(regExpString, "gim");
    end
    function isLetterOrDigit(char)
        return (char >= CharacterCodes.a && char <= CharacterCodes.z) ||
            (char >= CharacterCodes.A && char <= CharacterCodes.Z) ||
            (char >= CharacterCodes._0 && char <= CharacterCodes._9);
    end
end
function getRenameInfo(fileName, position)
    synchronizeHostData();
    local sourceFile = getValidSourceFile(fileName);
    local typeChecker = program.getTypeChecker();
    local node = getTouchingWord(sourceFile, position);
    // Can only rename an identifier.
    if (node && node.kind === SyntaxKind.Identifier) {
        local symbol_6 = typeChecker.getSymbolAtLocation(node);
        // Only allow a symbol to be renamed if it actually has at least one declaration.
        if (symbol_6) {
            local declarations = symbol_6.getDeclarations();
            if (declarations && declarations.length > 0) {
                // Disallow rename for elements that are defined in the standard TypeScript library.
                local defaultLibFileName = host.getDefaultLibFileName(host.getCompilationSettings());
                if (defaultLibFileName) {
                    for (local _i = 0; _i < declarations.length; _i++) {
                        local current = declarations[_i];
                        local sourceFile_6 = current.getSourceFile();
                        if (sourceFile_6 && getCanonicalFileName(ts.normalizePath(sourceFile_6.fileName)) === getCanonicalFileName(ts.normalizePath(defaultLibFileName))) {
                            return getRenameInfoError(getLocaleSpecificMessage(Diagnostics.You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library.key));
                        end
                    }
                end
                local kind = getSymbolKind(symbol_6, node);
                if (kind) {
                    return {
                        canRename: true,
                        localizedErrorMessage: undefined,
                        displayName: symbol_6.name,
                        fullDisplayName: typeChecker.getFullyQualifiedName(symbol_6),
                        kind: kind,
                        kindModifiers: getSymbolModifiers(symbol_6),
                        triggerSpan: createTextSpan(node.getStart(), node.getWidth())
                    };
                end
            end
        end
    end
    return getRenameInfoError(getLocaleSpecificMessage(Diagnostics.You_cannot_rename_this_element.key));
    function getRenameInfoError(localizedErrorMessage)
        return {
            canRename: false,
            localizedErrorMessage: localizedErrorMessage,
            displayName: undefined,
            fullDisplayName: undefined,
            kind: undefined,
            kindModifiers: undefined,
            triggerSpan: undefined
        };
    end
end
return {
    dispose: dispose,
    cleanupSemanticCache: cleanupSemanticCache,
    getSyntacticDiagnostics: getSyntacticDiagnostics,
    getSemanticDiagnostics: getSemanticDiagnostics,
    getCompilerOptionsDiagnostics: getCompilerOptionsDiagnostics,
    getSyntacticClassifications: getSyntacticClassifications,
    getSemanticClassifications: getSemanticClassifications,
    getEncodedSyntacticClassifications: getEncodedSyntacticClassifications,
    getEncodedSemanticClassifications: getEncodedSemanticClassifications,
    getCompletionsAtPosition: getCompletionsAtPosition,
    getCompletionEntryDetails: getCompletionEntryDetails,
    getSignatureHelpItems: getSignatureHelpItems,
    getQuickInfoAtPosition: getQuickInfoAtPosition,
    getDefinitionAtPosition: getDefinitionAtPosition,
    getTypeDefinitionAtPosition: getTypeDefinitionAtPosition,
    getReferencesAtPosition: getReferencesAtPosition,
    findReferences: findReferences,
    getOccurrencesAtPosition: getOccurrencesAtPosition,
    getDocumentHighlights: getDocumentHighlights,
    getNameOrDottedNameSpan: getNameOrDottedNameSpan,
    getBreakpointStatementAtPosition: getBreakpointStatementAtPosition,
    getNavigateToItems: getNavigateToItems,
    getRenameInfo: getRenameInfo,
    findRenameLocations: findRenameLocations,
    getNavigationBarItems: getNavigationBarItems,
    getOutliningSpans: getOutliningSpans,
    getTodoComments: getTodoComments,
    getBraceMatchingAtPosition: getBraceMatchingAtPosition,
    getIndentationAtPosition: getIndentationAtPosition,
    getFormattingEditsForRange: getFormattingEditsForRange,
    getFormattingEditsForDocument: getFormattingEditsForDocument,
    getFormattingEditsAfterKeystroke: getFormattingEditsAfterKeystroke,
    getEmitOutput: getEmitOutput,
    getSourceFile: getSourceFile,
    getProgram: getProgram
};
/* @internal */
function getNameTable(sourceFile)
    if (!sourceFile.nameTable) {
        initializeNameTable(sourceFile);
    end
    return sourceFile.nameTable;
end
exports.getNameTable = getNameTable;
function initializeNameTable(sourceFile)
    local nameTable = {};
    walk(sourceFile);
    sourceFile.nameTable = nameTable;
    function walk(node)
        switch (node.kind) {
            case SyntaxKind.Identifier:
                nameTable[node.text] = node.text;
                break;
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
                // We want to store any numbers/strings if they were a name that could be
                // related to a declaration.  So, if we have 'import x = require("something")'
                // then we want 'something' to be in the name table.  Similarly, if we have
                // "a['propname']" then we want to store "propname" in the name table.
                if (isDeclarationName(node) ||
                    node.parent.kind === SyntaxKind.ExternalModuleReference ||
                    isArgumentOfElementAccessExpression(node)) {
                    nameTable[node.text] = node.text;
                end
                break;
            default:
                forEachChild(node, walk);
        end
    end
end
function isArgumentOfElementAccessExpression(node)
    return node &&
        node.parent &&
        node.parent.kind === SyntaxKind.ElementAccessExpression &&
        node.parent.argumentExpression === node;
end
/// Classifier
function createClassifier()
    local scanner = createScanner(ScriptTarget.Latest, false);
    /// We do not have a full parser support to know when we should parse a regex or not
    /// If we consider every slash token to be a regex, we could be missing cases like "1/2/3", where
    /// we have a series of divide operator. this list allows us to be more accurate by ruling out 
    /// locations where a regexp cannot exist.
    local noRegexTable = [];
    noRegexTable[SyntaxKind.Identifier] = true;
    noRegexTable[SyntaxKind.StringLiteral] = true;
    noRegexTable[SyntaxKind.NumericLiteral] = true;
    noRegexTable[SyntaxKind.RegularExpressionLiteral] = true;
    noRegexTable[SyntaxKind.ThisKeyword] = true;
    noRegexTable[SyntaxKind.PlusPlusToken] = true;
    noRegexTable[SyntaxKind.MinusMinusToken] = true;
    noRegexTable[SyntaxKind.CloseParenToken] = true;
    noRegexTable[SyntaxKind.CloseBracketToken] = true;
    noRegexTable[SyntaxKind.CloseBraceToken] = true;
    noRegexTable[SyntaxKind.TrueKeyword] = true;
    noRegexTable[SyntaxKind.FalseKeyword] = true;
    // Just a stack of TemplateHeads and OpenCurlyBraces, used to perform rudimentary (inexact)
    // classification on template strings. Because of the context free nature of templates,
    // the only precise way to classify a template portion would be by propagating the stack across
    // lines, just as we do with the end-of-line state. However, this is a burden for implementers,
    // and the behavior is entirely subsumed by the syntactic classifier anyway, so we instead
    // flatten any nesting when the template stack is non-empty and encode it in the end-of-line state.
    // Situations in which this fails are
    //  1) When template strings are nested across different lines:
    //          `hello ${ `world
    //          ` }`
    //
    //     Where on the second line, you will get the closing of a template,
    //     a closing curly, and a new template.
    //
    //  2) When substitution expressions have curly braces and the curly brace falls on the next line:
    //          `hello ${ () => {
    //          return "world" } } `
    //
    //     Where on the second line, you will get the 'return' keyword,
    //     a string literal, and a template end consisting of '} } `'.
    local templateStack = [];
    /** Returns true if 'keyword2' can legally follow 'keyword1' in any language construct. */
    function canFollow(keyword1, keyword2)
        if (isAccessibilityModifier(keyword1)) {
            if (keyword2 === SyntaxKind.GetKeyword ||
                keyword2 === SyntaxKind.SetKeyword ||
                keyword2 === SyntaxKind.ConstructorKeyword ||
                keyword2 === SyntaxKind.StaticKeyword) {
                // Allow things like "public get", "public constructor" and "public static".  
                // These are all legal.
                return true;
            end
            // Any other keyword following "public" is actually an identifier an not a real
            // keyword.
            return false;
        end
        // Assume any other keyword combination is legal.  This can be refined in the future
        // if there are more cases we want the classifier to be better at.
        return true;
    end
    function convertClassifications(classifications, text)
        local entries = [];
        local dense = classifications.spans;
        local lastEnd = 0;
        for (var i = 0, n = dense.length; i < n; i += 3) {
            local start = dense[i];
            local length_1 = dense[i + 1];
            local type_5 = dense[i + 2];
            // Make a whitespace entry between the last item and this one.
            if (lastEnd >= 0) {
                local whitespaceLength_1 = start - lastEnd;
                if (whitespaceLength_1 > 0) {
                    entries.push({ length: whitespaceLength_1, classification: TokenClass.Whitespace });
                end
            end
            entries.push({ length: length_1, classification: convertClassification(type_5) });
            lastEnd = start + length_1;
        end
        local whitespaceLength = text.length - lastEnd;
        if (whitespaceLength > 0) {
            entries.push({ length: whitespaceLength, classification: TokenClass.Whitespace });
        end
        return { entries: entries, finalLexState: classifications.endOfLineState };
    end
    function convertClassification(type)
        switch (type) {
            case 1 /* comment */: return TokenClass.Comment;
            case 3 /* keyword */: return TokenClass.Keyword;
            case 4 /* numericLiteral */: return TokenClass.NumberLiteral;
            case 5 /* operator */: return TokenClass.Operator;
            case 6 /* stringLiteral */: return TokenClass.StringLiteral;
            case 8 /* whiteSpace */: return TokenClass.Whitespace;
            case 10 /* punctuation */: return TokenClass.Punctuation;
            case 2 /* identifier */:
            case 11 /* className */:
            case 12 /* enumName */:
            case 13 /* interfaceName */:
            case 14 /* moduleName */:
            case 15 /* typeParameterName */:
            case 16 /* typeAliasName */:
            case 9 /* text */:
            case 17 /* parameterName */:
            default:
                return TokenClass.Identifier;
        end
    end
    function getClassificationsForLine(text, lexState, syntacticClassifierAbsent)
        return convertClassifications(getEncodedLexicalClassifications(text, lexState, syntacticClassifierAbsent), text);
    end
    // If there is a syntactic classifier ('syntacticClassifierAbsent' is false),
    // we will be more conservative in order to avoid conflicting with the syntactic classifier.
    function getEncodedLexicalClassifications(text, lexState, syntacticClassifierAbsent)
        local offset = 0;
        local token = SyntaxKind.Unknown;
        local lastNonTriviaToken = SyntaxKind.Unknown;
        // Empty out the template stack for reuse.
        while (templateStack.length > 0) {
            templateStack.pop();
        end
        // If we're in a string literal, then prepend: "\
        // (and a newline).  That way when we lex we'll think we're still in a string literal.
        //
        // If we're in a multiline comment, then prepend: /*
        // (and a newline).  That way when we lex we'll think we're still in a multiline comment.
        switch (lexState) {
            case 3 /* InDoubleQuoteStringLiteral */:
                text = '"\\\n' + text;
                offset = 3;
                break;
            case 2 /* InSingleQuoteStringLiteral */:
                text = "'\\\n" + text;
                offset = 3;
                break;
            case 1 /* InMultiLineCommentTrivia */:
                text = "/*\n" + text;
                offset = 3;
                break;
            case 4 /* InTemplateHeadOrNoSubstitutionTemplate */:
                text = "`\n" + text;
                offset = 2;
                break;
            case 5 /* InTemplateMiddleOrTail */:
                text = "}\n" + text;
                offset = 2;
            // fallthrough
            case 6 /* InTemplateSubstitutionPosition */:
                templateStack.push(SyntaxKind.TemplateHead);
                break;
        end
        scanner.setText(text);
        local result = {
            endOfLineState: 0 /* None */,
            spans: []
        };
        // We can run into an unfortunate interaction between the lexical and syntactic classifier
        // when the user is typing something generic.  Consider the case where the user types:
        //
        //      Foo<number
        //
        // From the lexical classifier's perspective, 'number' is a keyword, and so the word will
        // be classified as such.  However, from the syntactic classifier's tree-based perspective
        // this is simply an expression with the identifier 'number' on the RHS of the less than
        // token.  So the classification will go back to being an identifier.  The moment the user
        // types again, number will become a keyword, then an identifier, etc. etc.
        //
        // To try to avoid this problem, we avoid classifying contextual keywords as keywords 
        // when the user is potentially typing something generic.  We just can't do a good enough
        // job at the lexical level, and so well leave it up to the syntactic classifier to make
        // the determination.
        //
        // In order to determine if the user is potentially typing something generic, we use a 
        // weak heuristic where we track < and > tokens.  It's a weak heuristic, but should
        // work well enough in practice.
        local angleBracketStack = 0;
        do {
            token = scanner.scan();
            if (!isTrivia(token)) {
                if ((token === SyntaxKind.SlashToken || token === SyntaxKind.SlashEqualsToken) && !noRegexTable[lastNonTriviaToken]) {
                    if (scanner.reScanSlashToken() === SyntaxKind.RegularExpressionLiteral) {
                        token = SyntaxKind.RegularExpressionLiteral;
                    end
                end
                else if (lastNonTriviaToken === SyntaxKind.DotToken && isKeyword(token)) {
                    token = SyntaxKind.Identifier;
                end
                else if (isKeyword(lastNonTriviaToken) && isKeyword(token) && !canFollow(lastNonTriviaToken, token)) {
                    // We have two keywords in a row.  Only treat the second as a keyword if 
                    // it's a sequence that could legally occur in the language.  Otherwise
                    // treat it as an identifier.  This way, if someone writes "private var"
                    // we recognize that 'var' is actually an identifier here.
                    token = SyntaxKind.Identifier;
                end
                else if (lastNonTriviaToken === SyntaxKind.Identifier &&
                    token === SyntaxKind.LessThanToken) {
                    // Could be the start of something generic.  Keep track of that by bumping 
                    // up the current count of generic contexts we may be in.
                    angleBracketStack++;
                end
                else if (token === SyntaxKind.GreaterThanToken && angleBracketStack > 0) {
                    // If we think we're currently in something generic, then mark that that
                    // generic entity is complete.
                    angleBracketStack--;
                end
                else if (token === SyntaxKind.AnyKeyword ||
                    token === SyntaxKind.StringKeyword ||
                    token === SyntaxKind.NumberKeyword ||
                    token === SyntaxKind.BooleanKeyword ||
                    token === SyntaxKind.SymbolKeyword) {
                    if (angleBracketStack > 0 && !syntacticClassifierAbsent) {
                        // If it looks like we're could be in something generic, don't classify this 
                        // as a keyword.  We may just get overwritten by the syntactic classifier,
                        // causing a noisy experience for the user.
                        token = SyntaxKind.Identifier;
                    end
                end
                else if (token === SyntaxKind.TemplateHead) {
                    templateStack.push(token);
                end
                else if (token === SyntaxKind.OpenBraceToken) {
                    // If we don't have anything on the template stack,
                    // then we aren't trying to keep track of a previously scanned template head.
                    if (templateStack.length > 0) {
                        templateStack.push(token);
                    end
                end
                else if (token === SyntaxKind.CloseBraceToken) {
                    // If we don't have anything on the template stack,
                    // then we aren't trying to keep track of a previously scanned template head.
                    if (templateStack.length > 0) {
                        local lastTemplateStackToken = lastOrUndefined(templateStack);
                        if (lastTemplateStackToken === SyntaxKind.TemplateHead) {
                            token = scanner.reScanTemplateToken();
                            // Only pop on a TemplateTail; a TemplateMiddle indicates there is more for us.
                            if (token === SyntaxKind.TemplateTail) {
                                templateStack.pop();
                            end
                            else {
                                Debug.assert(token === SyntaxKind.TemplateMiddle, "Should have been a template middle. Was " + token);
                            end
                        end
                        else {
                            Debug.assert(lastTemplateStackToken === SyntaxKind.OpenBraceToken, "Should have been an open brace. Was: " + token);
                            templateStack.pop();
                        end
                    end
                end
                lastNonTriviaToken = token;
            end
            processToken();
        end while (token !== SyntaxKind.EndOfFileToken);
        return result;
        function processToken()
            local start = scanner.getTokenPos();
            let;
        end
        scanner.getTextPos();
        addResult(start);
    end
    classFromKind(token);
    ;
    if ()
        ;
end
exports.createClassifier = createClassifier;
 >= text.length;
{
    if (token === SyntaxKind.StringLiteral) {
        // Check to see if we finished up on a multiline string literal.
        local tokenText = scanner.getTokenText();
        if (scanner.isUnterminated()) {
            local lastCharIndex = tokenText.length - 1;
            local numBackslashes = 0;
            while (tokenText.charCodeAt(lastCharIndex - numBackslashes) === CharacterCodes.backslash) {
                numBackslashes++;
            end
            // If we have an odd number of backslashes, then the multiline string is unclosed
            if (numBackslashes & 1) {
                local quoteChar = tokenText.charCodeAt(0);
                result.endOfLineState = quoteChar === CharacterCodes.doubleQuote
                    ? 3 /* InDoubleQuoteStringLiteral */
                    : 2 /* InSingleQuoteStringLiteral */;
            end
        end
    end
    else if (token === SyntaxKind.MultiLineCommentTrivia) {
        // Check to see if the multiline comment was unclosed.
        if (scanner.isUnterminated()) {
            result.endOfLineState = 1 /* InMultiLineCommentTrivia */;
        end
    end
    else if (isTemplateLiteralKind(token)) {
        if (scanner.isUnterminated()) {
            if (token === SyntaxKind.TemplateTail) {
                result.endOfLineState = 5 /* InTemplateMiddleOrTail */;
            end
            else if (token === SyntaxKind.NoSubstitutionTemplateLiteral) {
                result.endOfLineState = 4 /* InTemplateHeadOrNoSubstitutionTemplate */;
            end
            else {
                Debug.fail("Only 'NoSubstitutionTemplateLiteral's and 'TemplateTail's can be unterminated; got SyntaxKind #" + token);
            end
        end
    end
    else if (templateStack.length > 0 && lastOrUndefined(templateStack) === SyntaxKind.TemplateHead) {
        result.endOfLineState = 6 /* InTemplateSubstitutionPosition */;
    end
end
function addResult(start, number, classification)
    if (classification === 8 /* whiteSpace */) {
        // Don't bother with whitespace classifications.  They're not needed.
        return;
    end
    if (start === 0 && offset > 0) {
        // We're classifying the first token, and this was a case where we prepended 
        // text.  We should consider the start of this token to be at the start of 
        // the original text.
        start += offset;
    end
    // All our tokens are in relation to the augmented text.  Move them back to be
    // relative to the original text.
    start -= offset;
end
offset;
local length = ;
-start;
if (length > 0) {
    result.spans.push(start);
    result.spans.push(length);
    result.spans.push(classification);
end
function isBinaryExpressionOperatorToken(token)
    switch (token) {
        case SyntaxKind.AsteriskToken:
        case SyntaxKind.SlashToken:
        case SyntaxKind.PercentToken:
        case SyntaxKind.PlusToken:
        case SyntaxKind.MinusToken:
        case SyntaxKind.LessThanLessThanToken:
        case SyntaxKind.GreaterThanGreaterThanToken:
        case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
        case SyntaxKind.LessThanToken:
        case SyntaxKind.GreaterThanToken:
        case SyntaxKind.LessThanEqualsToken:
        case SyntaxKind.GreaterThanEqualsToken:
        case SyntaxKind.InstanceOfKeyword:
        case SyntaxKind.InKeyword:
        case SyntaxKind.EqualsEqualsToken:
        case SyntaxKind.ExclamationEqualsToken:
        case SyntaxKind.EqualsEqualsEqualsToken:
        case SyntaxKind.ExclamationEqualsEqualsToken:
        case SyntaxKind.AmpersandToken:
        case SyntaxKind.CaretToken:
        case SyntaxKind.BarToken:
        case SyntaxKind.AmpersandAmpersandToken:
        case SyntaxKind.BarBarToken:
        case SyntaxKind.BarEqualsToken:
        case SyntaxKind.AmpersandEqualsToken:
        case SyntaxKind.CaretEqualsToken:
        case SyntaxKind.LessThanLessThanEqualsToken:
        case SyntaxKind.GreaterThanGreaterThanEqualsToken:
        case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
        case SyntaxKind.PlusEqualsToken:
        case SyntaxKind.MinusEqualsToken:
        case SyntaxKind.AsteriskEqualsToken:
        case SyntaxKind.SlashEqualsToken:
        case SyntaxKind.PercentEqualsToken:
        case SyntaxKind.EqualsToken:
        case SyntaxKind.CommaToken:
            return true;
        default:
            return false;
    end
end
function isPrefixUnaryExpressionOperatorToken(token)
    switch (token) {
        case SyntaxKind.PlusToken:
        case SyntaxKind.MinusToken:
        case SyntaxKind.TildeToken:
        case SyntaxKind.ExclamationToken:
        case SyntaxKind.PlusPlusToken:
        case SyntaxKind.MinusMinusToken:
            return true;
        default:
            return false;
    end
end
function isKeyword(token)
    return token >= SyntaxKind.FirstKeyword && token <= SyntaxKind.LastKeyword;
end
function classFromKind(token)
    if (isKeyword(token)) {
        return 3 /* keyword */;
    end
    else if (isBinaryExpressionOperatorToken(token) || isPrefixUnaryExpressionOperatorToken(token)) {
        return 5 /* operator */;
    end
    else if (token >= SyntaxKind.FirstPunctuation && token <= SyntaxKind.LastPunctuation) {
        return 10 /* punctuation */;
    end
    switch (token) {
        case SyntaxKind.NumericLiteral:
            return 4 /* numericLiteral */;
        case SyntaxKind.StringLiteral:
            return 6 /* stringLiteral */;
        case SyntaxKind.RegularExpressionLiteral:
            return 7 /* regularExpressionLiteral */;
        case SyntaxKind.ConflictMarkerTrivia:
        case SyntaxKind.MultiLineCommentTrivia:
        case SyntaxKind.SingleLineCommentTrivia:
            return 1 /* comment */;
        case SyntaxKind.WhitespaceTrivia:
        case SyntaxKind.NewLineTrivia:
            return 8 /* whiteSpace */;
        case SyntaxKind.Identifier:
        default:
            if (isTemplateLiteralKind(token)) {
                return 6 /* stringLiteral */;
            end
            return 2 /* identifier */;
    end
end
return {
    getClassificationsForLine: getClassificationsForLine,
    getEncodedLexicalClassifications: getEncodedLexicalClassifications
};
/**
  * Get the path of the default library file (lib.d.ts) as distributed with the typescript
  * node package.
  * The functionality is not supported if the ts module is consumed outside of a node module.
  */
function getDefaultLibFilePath(options)
    // Check __dirname is defined and that we are on a node.js system.
    if (typeof __dirname !== "undefined") {
        return __dirname + directorySeparator + getDefaultLibFileName(options);
    end
    throw new Error("getDefaultLibFilePath is only supported when consumed as a node module. ");
end
exports.getDefaultLibFilePath = getDefaultLibFilePath;
function initializeServices()
    objectAllocator = {
        getNodeConstructor: function (kind)
            function Node()
            end
            local proto = kind === SyntaxKind.SourceFile ? new SourceFileObject() : new NodeObject();
            proto.kind = kind;
            proto.pos = 0;
            proto.;
        end, 0: ,
        proto: .flags = 0,
        proto: .parent = undefined,
        Node: .prototype = proto,
        return: function () end, Node: 
    },
        getSymbolConstructor;
    function () { return SymbolObject; },
        getTypeConstructor;
    function () { return TypeObject; },
        getSignatureConstructor;
    function () { return SignatureObject; },
    ;
end
;
initializeServices();
//# sourceMappingURL=file:///C:/Users/qujianbiao/Downloads/TypeScript-master/built/local/services/services.js.map