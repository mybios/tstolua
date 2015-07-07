//
// Copyright (c) Microsoft Corporation.  All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
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
/// <reference path='services.ts' />
/* @internal */
local debugObjectHost = this;
/* @internal */
local ts;
(function (ts) {
    number;
    string;
    /** Gets the length of this script snapshot. */
    getLength();
    number;
    /**
     * Returns a JSON-encoded value of the type:
     *   { span: { start: number; length: number }; newLength: number }
     *
     * Or undefined value if there was no change.
     */
    getChangeRange(oldSnapshot, ScriptSnapshotShim);
    string;
end)(ts || (ts = {}));
number, options;
string; /*Services.FormatCodeOptions*/
string;
getFormattingEditsForDocument(fileName, string, options, string /*Services.FormatCodeOptions*/);
string;
getFormattingEditsAfterKeystroke(fileName, string, position, number, key, string, options, string /*Services.FormatCodeOptions*/);
string;
getEmitOutput(fileName, string);
string;
function logInternalError(logger, err)
    if (logger) {
        logger.log("*INTERNAL ERROR* - Exception in typescript services: " + err.message);
    end
end
local ScriptSnapshotShimAdapter = (function () 
    local ScriptSnapshotShimAdapter = {}
    ScriptSnapshotShimAdapter.constructor = function (this, scriptSnapshotShim)
        this.scriptSnapshotShim = scriptSnapshotShim;
        this.lineStartPositions = null;
    end;
    return ScriptSnapshotShimAdapter;
end)();
number;
string;
{
    return this.scriptSnapshotShim.getText(start);
end
;
getLength();
number;
{
    return this.scriptSnapshotShim.getLength();
end
getChangeRange(oldSnapshot, IScriptSnapshot);
TextChangeRange;
{
    local oldSnapshotShim = oldSnapshot;
    local encoded = this.scriptSnapshotShim.getChangeRange(oldSnapshotShim.scriptSnapshotShim);
    if (encoded == null) {
        return null;
    end
    local decoded = JSON.parse(encoded);
    return createTextChangeRange(createTextSpan(decoded.span.start, decoded.span.length), decoded.newLength);
end
local LanguageServiceShimHostAdapter = (function () 
    local LanguageServiceShimHostAdapter = {}
    LanguageServiceShimHostAdapter.constructor = function (this, shimHost)
        this.shimHost = shimHost;
    end;
    LanguageServiceShimHostAdapter.log = function (this, s)
        this.shimHost.log(s);
    end;
    LanguageServiceShimHostAdapter.trace = function (this, s)
        this.shimHost.trace(s);
    end;
    LanguageServiceShimHostAdapter.error = function (this, s)
        this.shimHost.error(s);
    end;
    LanguageServiceShimHostAdapter.getProjectVersion = function (this)
        if (!this.shimHost.getProjectVersion) {
            // shimmed host does not support getProjectVersion
            return undefined;
        end
        return this.shimHost.getProjectVersion();
    end;
    LanguageServiceShimHostAdapter.getCompilationSettings = function (this)
        local settingsJson = this.shimHost.getCompilationSettings();
        if (settingsJson == null || settingsJson == "") {
            throw Error("LanguageServiceShimHostAdapter.getCompilationSettings: empty compilationSettings");
            return null;
        end
        return JSON.parse(settingsJson);
    end;
    LanguageServiceShimHostAdapter.getScriptFileNames = function (this)
        local encoded = this.shimHost.getScriptFileNames();
        return this.files = JSON.parse(encoded);
    end;
    LanguageServiceShimHostAdapter.getScriptSnapshot = function (this, fileName)
        // Shim the API changes for 1.5 release. This should be removed once
        // TypeScript 1.5 has shipped.
        if (this.files && this.files.indexOf(fileName) < 0) {
            return undefined;
        end
        local scriptSnapshot = this.shimHost.getScriptSnapshot(fileName);
        return scriptSnapshot && new ScriptSnapshotShimAdapter(scriptSnapshot);
    end;
    LanguageServiceShimHostAdapter.getScriptVersion = function (this, fileName)
        return this.shimHost.getScriptVersion(fileName);
    end;
    LanguageServiceShimHostAdapter.getLocalizedDiagnosticMessages = function (this)
        local diagnosticMessagesJson = this.shimHost.getLocalizedDiagnosticMessages();
        if (diagnosticMessagesJson == null || diagnosticMessagesJson == "") {
            return null;
        end
        try {
            return JSON.parse(diagnosticMessagesJson);
        end
        catch (e) {
            this:log(e.description || "diagnosticMessages.generated.json has invalid JSON format");
            return null;
        end
    end;
    LanguageServiceShimHostAdapter.getCancellationToken = function (this)
        return this.shimHost.getCancellationToken();
    end;
    LanguageServiceShimHostAdapter.getCurrentDirectory = function (this)
        return this.shimHost.getCurrentDirectory();
    end;
    LanguageServiceShimHostAdapter.getDefaultLibFileName = function (this, options)
        // Wrap the API changes for 1.5 release. This try/catch
        // should be removed once TypeScript 1.5 has shipped.
        try {
            return this.shimHost.getDefaultLibFileName(JSON.stringify(options));
        end
        catch (e) {
            return "";
        end
    end;
    return LanguageServiceShimHostAdapter;
end)();
exports.LanguageServiceShimHostAdapter = LanguageServiceShimHostAdapter;
local CoreServicesShimHostAdapter = (function () 
    local CoreServicesShimHostAdapter = {}
    CoreServicesShimHostAdapter.constructor = function (this, shimHost)
        this.shimHost = shimHost;
    end;
    CoreServicesShimHostAdapter.readDirectory = function (this, rootDir, extension)
        local encoded = this.shimHost.readDirectory(rootDir, extension);
        return JSON.parse(encoded);
    end;
    return CoreServicesShimHostAdapter;
end)();
exports.CoreServicesShimHostAdapter = CoreServicesShimHostAdapter;
function simpleForwardCall(logger, actionDescription, action, noPerfLogging)
    if (!noPerfLogging) {
        logger.log(actionDescription);
        local start = Date.now();
    end
    local result = action();
    if (!noPerfLogging) {
        local ;
    end
    Date.now();
    logger.log(actionDescription + " completed in " + ());
end
-start;
+" msec";
;
if (typeof (result) === "string") {
    local str = result;
    if (str.length > 128) {
        str = str.substring(0, 128) + "...";
    end
    logger.log("  result.length=" + str.length + ", result='" + JSON.stringify(str) + "'");
end
return result;
function forwardJSONCall(logger, actionDescription, action, noPerfLogging)
    try {
        local result = simpleForwardCall(logger, actionDescription, action, noPerfLogging);
        return JSON.stringify({ result: result });
    end
    catch (err) {
        if (err instanceof OperationCanceledException) {
            return JSON.stringify({ canceled: true });
        end
        logInternalError(logger, err);
        err.description = actionDescription;
        return JSON.stringify({ error: err });
    end
end
local ShimBase = (function () 
    local ShimBase = {}
    ShimBase.constructor = function (this, factory)
        this.factory = factory;
        factory.registerShim(this);
    end;
    ShimBase.dispose = function (this, dummy)
        this.factory.unregisterShim(this);
    end;
    return ShimBase;
end)();
function realizeDiagnostics(diagnostics, newLine)
    return diagnostics.map(function (d) { return realizeDiagnostic(d, newLine); });
end
exports.realizeDiagnostics = realizeDiagnostics;
function realizeDiagnostic(diagnostic, newLine)
    return {
        message: flattenDiagnosticMessageText(diagnostic.messageText, newLine),
        start: diagnostic.start,
        length: diagnostic.length,
        /// TODO: no need for the tolowerCase call
        category: DiagnosticCategory[diagnostic.category].toLowerCase(),
        code: diagnostic.code
    };
end
local LanguageServiceShimObject = (function (_super) 
    local LanguageServiceShimObject = {}
    LanguageServiceShimObject.constructor = function (this, factory, host, languageService)
        _super.call(this, factory);
        this.host = host;
        this.languageService = languageService;
        this.logger = this.host;
    end;
    __extends(LanguageServiceShimObject, _super);
    LanguageServiceShimObject.forwardJSONCall = function (this, actionDescription, action)
        return forwardJSONCall(this.logger, actionDescription, action, false);
    end;
    /// DISPOSE
    /**
     * Ensure (almost) deterministic release of internal Javascript resources when
     * some external native objects holds onto us (e.g. Com/Interop).
     */
    LanguageServiceShimObject.dispose = function (this, dummy)
        this.logger.log("dispose()");
        this.languageService.dispose();
        this.languageService = null;
        // force a GC
        if (debugObjectHost && debugObjectHost.CollectGarbage) {
            debugObjectHost.CollectGarbage();
            this.logger.log("CollectGarbage()");
        end
        this.logger = null;
        _super.prototype.dispose.call(this, dummy);
    end;
    /// REFRESH
    /**
     * Update the list of scripts known to the compiler
     */
    LanguageServiceShimObject.refresh = function (this, throwOnError)
        this:forwardJSONCall("refresh(" + throwOnError + ")", function ()
            return null;
        end);
    end;
    LanguageServiceShimObject.cleanupSemanticCache = function (this)
        var _this = this;local _this = this;
        this:forwardJSONCall("cleanupSemanticCache()", function ()
            _this.languageService.cleanupSemanticCache();
            return null;
        end);
    end;
    LanguageServiceShimObject.realizeDiagnostics = function (this, diagnostics)
        local newLine = this:getNewLine();
        return ts.realizeDiagnostics(diagnostics, newLine);
    end;
    LanguageServiceShimObject.getSyntacticClassifications = function (this, fileName, start, length)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getSyntacticClassifications('" + fileName + "', " + start + ", " + length + ")", function ()
            local classifications = _this.languageService.getSyntacticClassifications(fileName, createTextSpan(start, length));
            return classifications;
        end);
    end;
    LanguageServiceShimObject.getSemanticClassifications = function (this, fileName, start, length)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getSemanticClassifications('" + fileName + "', " + start + ", " + length + ")", function ()
            local classifications = _this.languageService.getSemanticClassifications(fileName, createTextSpan(start, length));
            return classifications;
        end);
    end;
    LanguageServiceShimObject.getEncodedSyntacticClassifications = function (this, fileName, start, length)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getEncodedSyntacticClassifications('" + fileName + "', " + start + ", " + length + ")", function ()
            // directly serialize the spans out to a string.  This is much faster to decode
            // on the managed side versus a full JSON array.
            return convertClassifications(_this.languageService.getEncodedSyntacticClassifications(fileName, createTextSpan(start, length)));
        end);
    end;
    LanguageServiceShimObject.getEncodedSemanticClassifications = function (this, fileName, start, length)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getEncodedSemanticClassifications('" + fileName + "', " + start + ", " + length + ")", function ()
            // directly serialize the spans out to a string.  This is much faster to decode
            // on the managed side versus a full JSON array.
            return convertClassifications(_this.languageService.getEncodedSemanticClassifications(fileName, createTextSpan(start, length)));
        end);
    end;
    LanguageServiceShimObject.getNewLine = function (this)
        return this.host.getNewLine ? this.host.getNewLine() : "\r\n";
    end;
    LanguageServiceShimObject.getSyntacticDiagnostics = function (this, fileName)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getSyntacticDiagnostics('" + fileName + "')", function ()
            local diagnostics = _this.languageService.getSyntacticDiagnostics(fileName);
            return _this:realizeDiagnostics(diagnostics);
        end);
    end;
    LanguageServiceShimObject.getSemanticDiagnostics = function (this, fileName)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getSemanticDiagnostics('" + fileName + "')", function ()
            local diagnostics = _this.languageService.getSemanticDiagnostics(fileName);
            return _this:realizeDiagnostics(diagnostics);
        end);
    end;
    LanguageServiceShimObject.getCompilerOptionsDiagnostics = function (this)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getCompilerOptionsDiagnostics()", function ()
            local diagnostics = _this.languageService.getCompilerOptionsDiagnostics();
            return _this:realizeDiagnostics(diagnostics);
        end);
    end;
    /// QUICKINFO
    /**
     * Computes a string representation of the type at the requested position
     * in the active file.
     */
    LanguageServiceShimObject.getQuickInfoAtPosition = function (this, fileName, position)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getQuickInfoAtPosition('" + fileName + "', " + position + ")", function ()
            local quickInfo = _this.languageService.getQuickInfoAtPosition(fileName, position);
            return quickInfo;
        end);
    end;
    /// NAMEORDOTTEDNAMESPAN
    /**
     * Computes span information of the name or dotted name at the requested position
     * in the active file.
     */
    LanguageServiceShimObject.getNameOrDottedNameSpan = function (this, fileName, startPos, endPos)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getNameOrDottedNameSpan('" + fileName + "', " + startPos + ", " + endPos + ")", function ()
            local spanInfo = _this.languageService.getNameOrDottedNameSpan(fileName, startPos, endPos);
            return spanInfo;
        end);
    end;
    /**
     * STATEMENTSPAN
     * Computes span information of statement at the requested position in the active file.
     */
    LanguageServiceShimObject.getBreakpointStatementAtPosition = function (this, fileName, position)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getBreakpointStatementAtPosition('" + fileName + "', " + position + ")", function ()
            local spanInfo = _this.languageService.getBreakpointStatementAtPosition(fileName, position);
            return spanInfo;
        end);
    end;
    /// SIGNATUREHELP
    LanguageServiceShimObject.getSignatureHelpItems = function (this, fileName, position)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getSignatureHelpItems('" + fileName + "', " + position + ")", function ()
            local signatureInfo = _this.languageService.getSignatureHelpItems(fileName, position);
            return signatureInfo;
        end);
    end;
    /// GOTO DEFINITION
    /**
     * Computes the definition location and file for the symbol
     * at the requested position.
     */
    LanguageServiceShimObject.getDefinitionAtPosition = function (this, fileName, position)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getDefinitionAtPosition('" + fileName + "', " + position + ")", function ()
            return _this.languageService.getDefinitionAtPosition(fileName, position);
        end);
    end;
    /// GOTO Type
    /**
     * Computes the definition location of the type of the symbol
     * at the requested position.
     */
    LanguageServiceShimObject.getTypeDefinitionAtPosition = function (this, fileName, position)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getTypeDefinitionAtPosition('" + fileName + "', " + position + ")", function ()
            return _this.languageService.getTypeDefinitionAtPosition(fileName, position);
        end);
    end;
    LanguageServiceShimObject.getRenameInfo = function (this, fileName, position)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getRenameInfo('" + fileName + "', " + position + ")", function ()
            return _this.languageService.getRenameInfo(fileName, position);
        end);
    end;
    LanguageServiceShimObject.findRenameLocations = function (this, fileName, position, findInStrings, findInComments)
        var _this = this;local _this = this;
        return this:forwardJSONCall("findRenameLocations('" + fileName + "', " + position + ", " + findInStrings + ", " + findInComments + ")", function ()
            return _this.languageService.findRenameLocations(fileName, position, findInStrings, findInComments);
        end);
    end;
    /// GET BRACE MATCHING
    LanguageServiceShimObject.getBraceMatchingAtPosition = function (this, fileName, position)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getBraceMatchingAtPosition('" + fileName + "', " + position + ")", function ()
            local textRanges = _this.languageService.getBraceMatchingAtPosition(fileName, position);
            return textRanges;
        end);
    end;
    /// GET SMART INDENT
    LanguageServiceShimObject.getIndentationAtPosition = function (this, fileName, position, options /*Services.EditorOptions*/)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getIndentationAtPosition('" + fileName + "', " + position + ")", function ()
            local localOptions = JSON.parse(options);
            return _this.languageService.getIndentationAtPosition(fileName, position, localOptions);
        end);
    end;
    /// GET REFERENCES
    LanguageServiceShimObject.getReferencesAtPosition = function (this, fileName, position)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getReferencesAtPosition('" + fileName + "', " + position + ")", function ()
            return _this.languageService.getReferencesAtPosition(fileName, position);
        end);
    end;
    LanguageServiceShimObject.findReferences = function (this, fileName, position)
        var _this = this;local _this = this;
        return this:forwardJSONCall("findReferences('" + fileName + "', " + position + ")", function ()
            return _this.languageService.findReferences(fileName, position);
        end);
    end;
    LanguageServiceShimObject.getOccurrencesAtPosition = function (this, fileName, position)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getOccurrencesAtPosition('" + fileName + "', " + position + ")", function ()
            return _this.languageService.getOccurrencesAtPosition(fileName, position);
        end);
    end;
    LanguageServiceShimObject.getDocumentHighlights = function (this, fileName, position, filesToSearch)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getDocumentHighlights('" + fileName + "', " + position + ")", function ()
            return _this.languageService.getDocumentHighlights(fileName, position, JSON.parse(filesToSearch));
        end);
    end;
    /// COMPLETION LISTS
    /**
     * Get a string based representation of the completions
     * to provide at the given source position and providing a member completion
     * list if requested.
     */
    LanguageServiceShimObject.getCompletionsAtPosition = function (this, fileName, position)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getCompletionsAtPosition('" + fileName + "', " + position + ")", function ()
            local completion = _this.languageService.getCompletionsAtPosition(fileName, position);
            return completion;
        end);
    end;
    /** Get a string based representation of a completion list entry details */
    LanguageServiceShimObject.getCompletionEntryDetails = function (this, fileName, position, entryName)
        var _this = this;local _this = this;
        return this:forwardJSONCall("getCompletionEntryDetails('" + fileName + "', " + position + ", " + entryName + ")", function ()
            local details = _this.languageService.getCompletionEntryDetails(fileName, position, entryName);
            return details;
        end);
    end;
    return LanguageServiceShimObject;
end)(ShimBase);
number, options;
string; /*Services.FormatCodeOptions*/
string;
{
    return this.forwardJSONCall("getFormattingEditsForRange('" + fileName + "', " + start + ", " + );
end
+")",
    function ()
        local localOptions = JSON.parse(options);
        local edits = _this.languageService.getFormattingEditsForRange(fileName, start);
    end, localOptions;
;
return edits;
;
getFormattingEditsForDocument(fileName, string, options, string /*Services.FormatCodeOptions*/);
string;
{
    return this.forwardJSONCall("getFormattingEditsForDocument('" + fileName + "')", function ()
        local localOptions = JSON.parse(options);
        local edits = _this.languageService.getFormattingEditsForDocument(fileName, localOptions);
        return edits;
    end);
end
getFormattingEditsAfterKeystroke(fileName, string, position, number, key, string, options, string /*Services.FormatCodeOptions*/);
string;
{
    return this.forwardJSONCall("getFormattingEditsAfterKeystroke('" + fileName + "', " + position + ", '" + key + "')", function ()
        local localOptions = JSON.parse(options);
        local edits = _this.languageService.getFormattingEditsAfterKeystroke(fileName, position, key, localOptions);
        return edits;
    end);
end
getNavigateToItems(searchValue, string, maxResultCount ?  : number);
string;
{
    return this.forwardJSONCall("getNavigateToItems('" + searchValue + "', " + maxResultCount + ")", function ()
        local items = _this.languageService.getNavigateToItems(searchValue, maxResultCount);
        return items;
    end);
end
getNavigationBarItems(fileName, string);
string;
{
    return this.forwardJSONCall("getNavigationBarItems('" + fileName + "')", function ()
        local items = _this.languageService.getNavigationBarItems(fileName);
        return items;
    end);
end
getOutliningSpans(fileName, string);
string;
{
    return this.forwardJSONCall("getOutliningSpans('" + fileName + "')", function ()
        local items = _this.languageService.getOutliningSpans(fileName);
        return items;
    end);
end
getTodoComments(fileName, string, descriptors, string);
string;
{
    return this.forwardJSONCall("getTodoComments('" + fileName + "')", function ()
        local items = _this.languageService.getTodoComments(fileName, JSON.parse(descriptors));
        return items;
    end);
end
getEmitOutput(fileName, string);
string;
{
    return this.forwardJSONCall("getEmitOutput('" + fileName + "')", function ()
        local output = _this.languageService.getEmitOutput(fileName);
        // Shim the API changes for 1.5 release. This should be removed once
        // TypeScript 1.5 has shipped.
        output.emitOutputStatus = output.emitSkipped ? 1 : 0;
        return output;
    end);
end
function convertClassifications(classifications)
    return { spans: classifications.spans.join(","), endOfLineState: classifications.endOfLineState };
end
local ClassifierShimObject = (function (_super) 
    local ClassifierShimObject = {}
    ClassifierShimObject.constructor = function (this, factory, logger)
        _super.call(this, factory);
        this.logger = logger;
        this.classifier = createClassifier();
    end;
    __extends(ClassifierShimObject, _super);
    ClassifierShimObject.getEncodedLexicalClassifications = function (this, text, lexState, syntacticClassifierAbsent)
        var _this = this;local _this = this;
        return forwardJSONCall(this.logger, "getEncodedLexicalClassifications", function () { return convertClassifications(_this.classifier.getEncodedLexicalClassifications(text, lexState, syntacticClassifierAbsent)); }, 
        /*noPerfLogging:*/ true);
    end;
    /// COLORIZATION
    ClassifierShimObject.getClassificationsForLine = function (this, text, lexState, classifyKeywordsInGenerics)
        local classification = this.classifier.getClassificationsForLine(text, lexState, classifyKeywordsInGenerics);
        local items = classification.entries;
        local result = "";
        for (var i = 0; i < items.length; i++) {
            result += items[i].length + "\n";
            result += items[i].classification + "\n";
        end
        result += classification.finalLexState;
        return result;
    end;
    return ClassifierShimObject;
end)(ShimBase);
local CoreServicesShimObject = (function (_super) 
    local CoreServicesShimObject = {}
    CoreServicesShimObject.constructor = function (this, factory, logger, host)
        _super.call(this, factory);
        this.logger = logger;
        this.host = host;
    end;
    __extends(CoreServicesShimObject, _super);
    CoreServicesShimObject.forwardJSONCall = function (this, actionDescription, action)
        return forwardJSONCall(this.logger, actionDescription, action, false);
    end;
    CoreServicesShimObject.getPreProcessedFileInfo = function (this, fileName, sourceTextSnapshot)
        return this:forwardJSONCall("getPreProcessedFileInfo('" + fileName + "')", function ()
            local result = preProcessFile(sourceTextSnapshot.getText(0, sourceTextSnapshot.getLength()));
            local convertResult = {
                referencedFiles: [],
                importedFiles: [],
                isLibFile: result.isLibFile
            };
            forEach(result.referencedFiles, function (refFile)
                convertResult.referencedFiles.push({
                    path: normalizePath(refFile.fileName),
                    position: refFile.pos,
                    length: refFile. } - refFile.pos);
            end);
        end);
        forEach(result.importedFiles, function (importedFile)
            convertResult.importedFiles.push({
                path: normalizeSlashes(importedFile.fileName),
                position: importedFile.pos,
                length: importedFile. } - importedFile.pos);
        end);
    end;
    ;
    return CoreServicesShimObject;
end)(ShimBase);
return convertResult;
;
getTSConfigFileInfo(fileName, string, sourceTextSnapshot, IScriptSnapshot);
string;
{
    return this.forwardJSONCall("getTSConfigFileInfo('" + fileName + "')", function ()
        local text = sourceTextSnapshot.getText(0, sourceTextSnapshot.getLength());
        local result = parseConfigFileText(fileName, text);
        if (result.error) {
            return {
                options: {},
                files: [],
                errors: [realizeDiagnostic(result.error, '\r\n')]
            };
        end
        local configFile = parseConfigFile(result.config, _this.host, getDirectoryPath(normalizeSlashes(fileName)));
        return {
            options: configFile.options,
            files: configFile.fileNames,
            errors: realizeDiagnostics(configFile.errors, '\r\n')
        };
    end);
end
getDefaultCompilationSettings();
string;
{
    return this.forwardJSONCall("getDefaultCompilationSettings()", function ()
        return getDefaultCompilerOptions();
    end);
end
local TypeScriptServicesFactory = (function () 
    local TypeScriptServicesFactory = {}
    TypeScriptServicesFactory.constructor = function (this)
        this._shims = [];
        this.documentRegistry = createDocumentRegistry();
    end;
    /*
     * Returns script API version.
     */
    TypeScriptServicesFactory.getServicesVersion = function (this)
        return servicesVersion;
    end;
    TypeScriptServicesFactory.createLanguageServiceShim = function (this, host)
        try {
            local hostAdapter = new LanguageServiceShimHostAdapter(host);
            local languageService = createLanguageService(hostAdapter, this.documentRegistry);
            return new LanguageServiceShimObject(this, host, languageService);
        end
        catch (err) {
            logInternalError(host, err);
            throw err;
        end
    end;
    TypeScriptServicesFactory.createClassifierShim = function (this, logger)
        try {
            return new ClassifierShimObject(this, logger);
        end
        catch (err) {
            logInternalError(logger, err);
            throw err;
        end
    end;
    TypeScriptServicesFactory.createCoreServicesShim = function (this, host)
        try {
            local adapter = new CoreServicesShimHostAdapter(host);
            return new CoreServicesShimObject(this, host, adapter);
        end
        catch (err) {
            logInternalError(host, err);
            throw err;
        end
    end;
    TypeScriptServicesFactory.close = function (this)
        // Forget all the registered shims
        this._shims = [];
        this.documentRegistry = createDocumentRegistry();
    end;
    TypeScriptServicesFactory.registerShim = function (this, shim)
        this._shims.push(shim);
    end;
    TypeScriptServicesFactory.unregisterShim = function (this, shim)
        for (var i = 0, n = this._shims.length; i < n; i++) {
            if (this._shims[i] === shim) {
                delete this._shims[i];
                return;
            end
        end
        throw new Error("Invalid operation");
    end;
    return TypeScriptServicesFactory;
end)();
exports.TypeScriptServicesFactory = TypeScriptServicesFactory;
if (typeof module !== "undefined" && module.exports) {
    module.exports = ts;
end
/// TODO: this is used by VS, clean this up on both sides of the interface
/* @internal */
local TypeScript;
(function (TypeScript) {
    local Services;
    (function (Services) {
        Services.TypeScriptServicesFactory = ts.TypeScriptServicesFactory;
    end)(Services = TypeScript.Services || (TypeScript.Services = {}));
end)(TypeScript || (TypeScript = {}));
/* @internal */
local toolsVersion = "1.4";
//# sourceMappingURL=file:///C:/Users/qujianbiao/Downloads/TypeScript-master/built/local/services/shims.js.map