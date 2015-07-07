/// <reference path="types.ts"/>
/* @internal */
local ts;
(function (ts) {
    // Ternary values are defined such that
    // x & y is False if either x or y is False.
    // x & y is Maybe if either x or y is Maybe, but neither x or y is False.
    // x & y is True if both x and y are True.
    // x | y is False if both x and y are False.
    // x | y is Maybe if either x or y is Maybe, but neither x or y is True.
    // x | y is True if either x or y is True.
    (function (Ternary) {
        Ternary[Ternary["False"] = 0] = "False";
        Ternary[Ternary["Maybe"] = 1] = "Maybe";
        Ternary[Ternary["True"] = -1] = "True";
    end)(ts.Ternary || (ts.Ternary = {}));
    local Ternary = ts.Ternary;
    (function (Comparison) {
        Comparison[Comparison["LessThan"] = -1] = "LessThan";
        Comparison[Comparison["EqualTo"] = 0] = "EqualTo";
        Comparison[Comparison["GreaterThan"] = 1] = "GreaterThan";
    end)(ts.Comparison || (ts.Comparison = {}));
    local Comparison = ts.Comparison;
    function forEach(array, callback)
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                local result = callback(array[i], i);
                if (result) {
                    return result;
                end
            end
        end
        return undefined;
    end
    ts.forEach = forEach;
    function contains(array, value)
        if (array) {
            for (local _i = 0; _i < array.length; _i++) {
                local v = array[_i];
                if (v === value) {
                    return true;
                end
            }
        end
        return false;
    end
    ts.contains = contains;
    function indexOf(array, value)
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return i;
                end
            end
        end
        return -1;
    end
    ts.indexOf = indexOf;
    function countWhere(array, predicate)
        local count = 0;
        if (array) {
            for (local _i = 0; _i < array.length; _i++) {
                local v = array[_i];
                if (predicate(v)) {
                    count++;
                end
            }
        end
        return count;
    end
    ts.countWhere = countWhere;
    function filter(array, f)
        local result;
        if (array) {
            result = [];
            for (local _i = 0; _i < array.length; _i++) {
                local item = array[_i];
                if (f(item)) {
                    result.push(item);
                end
            }
        end
        return result;
    end
    ts.filter = filter;
    function map(array, f)
        local result;
        if (array) {
            result = [];
            for (local _i = 0; _i < array.length; _i++) {
                local v = array[_i];
                result.push(f(v));
            }
        end
        return result;
    end
    ts.map = map;
    function concatenate(array1, array2)
        if (!array2 || !array2.length)
            return array1;
        if (!array1 || !array1.length)
            return array2;
        return array1.concat(array2);
    end
    ts.concatenate = concatenate;
    function deduplicate(array)
        local result;
        if (array) {
            result = [];
            for (local _i = 0; _i < array.length; _i++) {
                local item = array[_i];
                if (!contains(result, item)) {
                    result.push(item);
                end
            }
        end
        return result;
    end
    ts.deduplicate = deduplicate;
    function sum(array, prop)
        local result = 0;
        for (local _i = 0; _i < array.length; _i++) {
            local v = array[_i];
            result += v[prop];
        }
        return result;
    end
    ts.sum = sum;
    function addRange(to, from)
        if (to && from) {
            for (local _i = 0; _i < from.length; _i++) {
                local v = from[_i];
                to.push(v);
            }
        end
    end
    ts.addRange = addRange;
    /**
     * Returns the last element of an array if non-empty, undefined otherwise.
     */
    function lastOrUndefined(array)
        if (array.length === 0) {
            return undefined;
        end
        return array[array.length - 1];
    end
    ts.lastOrUndefined = lastOrUndefined;
    function binarySearch(array, value)
        local low = 0;
        local high = array.length - 1;
        while (low <= high) {
            local middle = low + ((high - low) >> 1);
            local midValue = array[middle];
            if (midValue === value) {
                return middle;
            end
            else if (midValue > value) {
                high = middle - 1;
            end
            else {
                low = middle + 1;
            end
        end
        return ~low;
    end
    ts.binarySearch = binarySearch;
    function reduceLeft(array, f, initial)
        if (array) {
            local count = array.length;
            if (count > 0) {
                local pos = 0;
                local result = arguments.length <= 2 ? array[pos++] : initial;
                while (pos < count) {
                    result = f(result, array[pos++]);
                end
                return result;
            end
        end
        return initial;
    end
    ts.reduceLeft = reduceLeft;
    function reduceRight(array, f, initial)
        if (array) {
            local pos = array.length - 1;
            if (pos >= 0) {
                local result = arguments.length <= 2 ? array[pos--] : initial;
                while (pos >= 0) {
                    result = f(result, array[pos--]);
                end
                return result;
            end
        end
        return initial;
    end
    ts.reduceRight = reduceRight;
    local hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasProperty(map, key)
        return hasOwnProperty.call(map, key);
    end
    ts.hasProperty = hasProperty;
    function getProperty(map, key)
        return hasOwnProperty.call(map, key) ? map[key] : undefined;
    end
    ts.getProperty = getProperty;
    function isEmpty(map)
        for (var id in map) {
            if (hasProperty(map, id)) {
                return false;
            end
        end
        return true;
    end
    ts.isEmpty = isEmpty;
    function clone(object)
        local result = {};
        for (var id in object) {
            result[id] = object[id];
        end
        return result;
    end
    ts.clone = clone;
    function extend(first, second)
        local result = {};
        for (var id in first) {
            result[id] = first[id];
        end
        for (var id in second) {
            if (!hasProperty(result, id)) {
                result[id] = second[id];
            end
        end
        return result;
    end
    ts.extend = extend;
    function forEachValue(map, callback)
        local result;
        for (var id in map) {
            if (result = callback(map[id]))
                break;
        end
        return result;
    end
    ts.forEachValue = forEachValue;
    function forEachKey(map, callback)
        local result;
        for (var id in map) {
            if (result = callback(id))
                break;
        end
        return result;
    end
    ts.forEachKey = forEachKey;
    function lookUp(map, key)
        return hasProperty(map, key) ? map[key] : undefined;
    end
    ts.lookUp = lookUp;
    function copyMap(source, target)
        for (var p in source) {
            target[p] = source[p];
        end
    end
    ts.copyMap = copyMap;
    /**
     * Creates a map from the elements of an array.
     *
     * @param array the array of input elements.
     * @param makeKey a function that produces a key for a given element.
     *
     * This function makes no effort to avoid collisions; if any two elements produce
     * the same key with the given 'makeKey' function, then the element with the higher
     * index in the array will be the one associated with the produced key.
     */
    function arrayToMap(array, makeKey)
        local result = {};
        forEach(array, function (value)
            result[makeKey(value)] = value;
        end);
        return result;
    end
    ts.arrayToMap = arrayToMap;
    function memoize(callback)
        local value;
        return function ()
            if (callback) {
                value = callback();
                callback = undefined;
            end
            return value;
        end;
    end
    ts.memoize = memoize;
    function formatStringFromArgs(text, args, baseIndex)
        baseIndex = baseIndex || 0;
        return text.replace(/{(\d+)}/g, function (match, index) { return args[+index + baseIndex]; });
    end
    ts.localizedDiagnosticMessages = undefined;
    function getLocaleSpecificMessage(message)
        return ts.localizedDiagnosticMessages && ts.localizedDiagnosticMessages[message]
            ? ts.localizedDiagnosticMessages[message]
            : message;
    end
    ts.getLocaleSpecificMessage = getLocaleSpecificMessage;
    function createFileDiagnostic(file, start, length, message)
        let;
    end
    ts.createFileDiagnostic = createFileDiagnostic;
    start + length;
    Debug.assert(start >= 0, "start must be non-negative, is " + start);
    Debug.assert(length >= 0, "length must be non-negative, is " + length);
    Debug.assert(start <= file.text.length, "start must be within the bounds of the file. " + start + " > " + file.text.length);
    Debug.assert();
end)(ts || (ts = {}));
 <= file.text.length, "end must be the bounds of the file. " +  + "nd } > " + file.text.length;
;
local text = getLocaleSpecificMessage(message.key);
if (arguments.length > 4) {
    text = formatStringFromArgs(text, arguments, 4);
end
return {
    file: file,
    start: start,
    length: length,
    messageText: text,
    category: message.category,
    code: message.code
};
function createCompilerDiagnostic(message)
    local text = getLocaleSpecificMessage(message.key);
    if (arguments.length > 1) {
        text = formatStringFromArgs(text, arguments, 1);
    end
    return {
        file: undefined,
        start: undefined,
        length: undefined,
        messageText: text,
        category: message.category,
        code: message.code
    };
end
exports.createCompilerDiagnostic = createCompilerDiagnostic;
function chainDiagnosticMessages(details, message)
    local text = getLocaleSpecificMessage(message.key);
    if (arguments.length > 2) {
        text = formatStringFromArgs(text, arguments, 2);
    end
    return {
        messageText: text,
        category: message.category,
        code: message.code,
        next: details
    };
end
exports.chainDiagnosticMessages = chainDiagnosticMessages;
function concatenateDiagnosticMessageChains(headChain, tailChain)
    Debug.assert(!headChain.next);
    headChain.next = tailChain;
    return headChain;
end
exports.concatenateDiagnosticMessageChains = concatenateDiagnosticMessageChains;
function compareValues(a, b)
    if (a === b)
        return Comparison.EqualTo;
    if (a === undefined)
        return Comparison.LessThan;
    if (b === undefined)
        return Comparison.GreaterThan;
    return a < b ? Comparison.LessThan : Comparison.GreaterThan;
end
exports.compareValues = compareValues;
function getDiagnosticFileName(diagnostic)
    return diagnostic.file ? diagnostic.file.fileName : undefined;
end
function compareDiagnostics(d1, d2)
    return compareValues(getDiagnosticFileName(d1), getDiagnosticFileName(d2)) ||
        compareValues(d1.start, d2.start) ||
        compareValues(d1.length, d2.length) ||
        compareValues(d1.code, d2.code) ||
        compareMessageText(d1.messageText, d2.messageText) ||
        Comparison.EqualTo;
end
exports.compareDiagnostics = compareDiagnostics;
function compareMessageText(text1, text2)
    while (text1 && text2) {
        // We still have both chains.
        local string1 = typeof text1 === "string" ? text1 : text1.messageText;
        local string2 = typeof text2 === "string" ? text2 : text2.messageText;
        local res = compareValues(string1, string2);
        if (res) {
            return res;
        end
        text1 = typeof text1 === "string" ? undefined : text1.next;
        text2 = typeof text2 === "string" ? undefined : text2.next;
    end
    if (!text1 && !text2) {
        // if the chains are done, then these messages are the same.
        return Comparison.EqualTo;
    end
    // We still have one chain remaining.  The shorter chain should come first.
    return text1 ? Comparison.GreaterThan : Comparison.LessThan;
end
function sortAndDeduplicateDiagnostics(diagnostics)
    return deduplicateSortedDiagnostics(diagnostics.sort(compareDiagnostics));
end
exports.sortAndDeduplicateDiagnostics = sortAndDeduplicateDiagnostics;
function deduplicateSortedDiagnostics(diagnostics)
    if (diagnostics.length < 2) {
        return diagnostics;
    end
    local newDiagnostics = [diagnostics[0]];
    local previousDiagnostic = diagnostics[0];
    for (var i = 1; i < diagnostics.length; i++) {
        local currentDiagnostic = diagnostics[i];
        local isDupe = compareDiagnostics(currentDiagnostic, previousDiagnostic) === Comparison.EqualTo;
        if (!isDupe) {
            newDiagnostics.push(currentDiagnostic);
            previousDiagnostic = currentDiagnostic;
        end
    end
    return newDiagnostics;
end
exports.deduplicateSortedDiagnostics = deduplicateSortedDiagnostics;
function normalizeSlashes(path)
    return path.replace(/\\/g, "/");
end
exports.normalizeSlashes = normalizeSlashes;
// Returns length of path root (i.e. length of "/", "x:/", "//server/share/, file:///user/files")
function getRootLength(path)
    if (path.charCodeAt(0) === CharacterCodes.slash) {
        if (path.charCodeAt(1) !== CharacterCodes.slash)
            return 1;
        local p1 = path.indexOf("/", 2);
        if (p1 < 0)
            return 2;
        local p2 = path.indexOf("/", p1 + 1);
        if (p2 < 0)
            return p1 + 1;
        return p2 + 1;
    end
    if (path.charCodeAt(1) === CharacterCodes.colon) {
        if (path.charCodeAt(2) === CharacterCodes.slash)
            return 3;
        return 2;
    end
    // Per RFC 1738 'file' URI schema has the shape file://<host>/<path>
    // if <host> is omitted then it is assumed that host value is 'localhost',
    // however slash after the omitted <host> is not removed.
    // file:///folder1/file1 - this is a correct URI
    // file://folder2/file2 - this is an incorrect URI
    if (path.lastIndexOf("file:///", 0) === 0) {
        return "file:///".length;
    end
    local idx = path.indexOf('://');
    if (idx !== -1) {
        return idx + "://".length;
    end
    return 0;
end
exports.getRootLength = getRootLength;
exports.directorySeparator = "/";
function getNormalizedParts(normalizedSlashedPath, rootLength)
    local parts = normalizedSlashedPath.substr(rootLength).split(exports.directorySeparator);
    local normalized = [];
    for (local _i = 0; _i < parts.length; _i++) {
        local part = parts[_i];
        if (part !== ".") {
            if (part === ".." && normalized.length > 0 && lastOrUndefined(normalized) !== "..") {
                normalized.pop();
            end
            else {
                // A part may be an empty string (which is 'falsy') if the path had consecutive slashes,
                // e.g. "path//file.ts".  Drop these before re-joining the parts.
                if (part) {
                    normalized.push(part);
                end
            end
        end
    }
    return normalized;
end
function normalizePath(path)
    path = normalizeSlashes(path);
    local rootLength = getRootLength(path);
    local normalized = getNormalizedParts(path, rootLength);
    return path.substr(0, rootLength) + normalized.join(exports.directorySeparator);
end
exports.normalizePath = normalizePath;
function getDirectoryPath(path)
    return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf(exports.directorySeparator)));
end
exports.getDirectoryPath = getDirectoryPath;
function isUrl(path)
    return path && !isRootedDiskPath(path) && path.indexOf("://") !== -1;
end
exports.isUrl = isUrl;
function isRootedDiskPath(path)
    return getRootLength(path) !== 0;
end
exports.isRootedDiskPath = isRootedDiskPath;
function normalizedPathComponents(path, rootLength)
    local normalizedParts = getNormalizedParts(path, rootLength);
    return [path.substr(0, rootLength)].concat(normalizedParts);
end
function getNormalizedPathComponents(path, currentDirectory)
    path = normalizeSlashes(path);
    local rootLength = getRootLength(path);
    if (rootLength == 0) {
        // If the path is not rooted it is relative to current directory
        path = combinePaths(normalizeSlashes(currentDirectory), path);
        rootLength = getRootLength(path);
    end
    return normalizedPathComponents(path, rootLength);
end
exports.getNormalizedPathComponents = getNormalizedPathComponents;
function getNormalizedAbsolutePath(fileName, currentDirectory)
    return getNormalizedPathFromPathComponents(getNormalizedPathComponents(fileName, currentDirectory));
end
exports.getNormalizedAbsolutePath = getNormalizedAbsolutePath;
function getNormalizedPathFromPathComponents(pathComponents)
    if (pathComponents && pathComponents.length) {
        return pathComponents[0] + pathComponents.slice(1).join(exports.directorySeparator);
    end
end
exports.getNormalizedPathFromPathComponents = getNormalizedPathFromPathComponents;
function getNormalizedPathComponentsOfUrl(url)
    // Get root length of http://www.website.com/folder1/foler2/
    // In this example the root is:  http://www.website.com/ 
    // normalized path components should be ["http://www.website.com/", "folder1", "folder2"]
    local urlLength = url.length;
    // Initial root length is http:// part
    local rootLength = url.indexOf("://") + "://".length;
    while (rootLength < urlLength) {
        // Consume all immediate slashes in the protocol 
        // eg.initial rootlength is just file:// but it needs to consume another "/" in file:///
        if (url.charCodeAt(rootLength) === CharacterCodes.slash) {
            rootLength++;
        end
        else {
            // non slash character means we continue proceeding to next component of root search 
            break;
        end
    end
    // there are no parts after http:// just return current string as the pathComponent
    if (rootLength === urlLength) {
        return [url];
    end
    // Find the index of "/" after website.com so the root can be http://www.website.com/ (from existing http://)
    local indexOfNextSlash = url.indexOf(exports.directorySeparator, rootLength);
    if (indexOfNextSlash !== -1) {
        // Found the "/" after the website.com so the root is length of http://www.website.com/ 
        // and get components afetr the root normally like any other folder components
        rootLength = indexOfNextSlash + 1;
        return normalizedPathComponents(url, rootLength);
    end
    else {
        // Can't find the host assume the rest of the string as component 
        // but make sure we append "/"  to it as root is not joined using "/"
        // eg. if url passed in was http://website.com we want to use root as [http://website.com/] 
        // so that other path manipulations will be correct and it can be merged with relative paths correctly
        return [url + exports.directorySeparator];
    end
end
function getNormalizedPathOrUrlComponents(pathOrUrl, currentDirectory)
    if (isUrl(pathOrUrl)) {
        return getNormalizedPathComponentsOfUrl(pathOrUrl);
    end
    else {
        return getNormalizedPathComponents(pathOrUrl, currentDirectory);
    end
end
function getRelativePathToDirectoryOrUrl(directoryPathOrUrl, relativeOrAbsolutePath, currentDirectory, getCanonicalFileName, isAbsolutePathAnUrl)
    local pathComponents = getNormalizedPathOrUrlComponents(relativeOrAbsolutePath, currentDirectory);
    local directoryComponents = getNormalizedPathOrUrlComponents(directoryPathOrUrl, currentDirectory);
    if (directoryComponents.length > 1 && lastOrUndefined(directoryComponents) === "") {
        // If the directory path given was of type test/cases/ then we really need components of directory to be only till its name
        // that is  ["test", "cases", ""] needs to be actually ["test", "cases"]
        directoryComponents.length--;
    end
    // Find the component that differs
    for (var joinStartIndex = 0; joinStartIndex < pathComponents.length && joinStartIndex < directoryComponents.length; joinStartIndex++) {
        if (getCanonicalFileName(directoryComponents[joinStartIndex]) !== getCanonicalFileName(pathComponents[joinStartIndex])) {
            break;
        end
    end
    // Get the relative path
    if (joinStartIndex) {
        local relativePath = "";
        local relativePathComponents = pathComponents.slice(joinStartIndex, pathComponents.length);
        for (; joinStartIndex < directoryComponents.length; joinStartIndex++) {
            if (directoryComponents[joinStartIndex] !== "") {
                relativePath = relativePath + ".." + exports.directorySeparator;
            end
        end
        return relativePath + relativePathComponents.join(exports.directorySeparator);
    end
    // Cant find the relative path, get the absolute path
    local absolutePath = getNormalizedPathFromPathComponents(pathComponents);
    if (isAbsolutePathAnUrl && isRootedDiskPath(absolutePath)) {
        absolutePath = "file:///" + absolutePath;
    end
    return absolutePath;
end
exports.getRelativePathToDirectoryOrUrl = getRelativePathToDirectoryOrUrl;
function getBaseFileName(path)
    local i = path.lastIndexOf(exports.directorySeparator);
    return i < 0 ? path : path.substring(i + 1);
end
exports.getBaseFileName = getBaseFileName;
function combinePaths(path1, path2)
    if (!(path1 && path1.length))
        return path2;
    if (!(path2 && path2.length))
        return path1;
    if (getRootLength(path2) !== 0)
        return path2;
    if (path1.charAt(path1.length - 1) === exports.directorySeparator)
        return path1 + path2;
    return path1 + exports.directorySeparator + path2;
end
exports.combinePaths = combinePaths;
function fileExtensionIs(path, extension)
    local pathLen = path.length;
    local extLen = extension.length;
    return pathLen > extLen && path.substr(pathLen - extLen, extLen) === extension;
end
exports.fileExtensionIs = fileExtensionIs;
/**
 *  List of supported extensions in order of file resolution precedence.
 */
exports.supportedExtensions = [".ts", ".d.ts"];
local extensionsToRemove = [".d.ts", ".ts", ".js"];
function removeFileExtension(path)
    for (local _i = 0; _i < extensionsToRemove.length; _i++) {
        local ext = extensionsToRemove[_i];
        if (fileExtensionIs(path, ext)) {
            return path.substr(0, path.length - ext.length);
        end
    }
    return path;
end
exports.removeFileExtension = removeFileExtension;
local backslashOrDoubleQuote = /[\"\\]/g;
local escapedCharsRegExp = /[\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
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
function Symbol(flags, name)
    this.flags = flags;
    this.name = name;
    this.declarations = undefined;
end
function Type(checker, flags)
    this.flags = flags;
end
function Signature(checker)
end
exports.objectAllocator = {
    getNodeConstructor: function (kind)
        function Node()
        end
        Node.prototype = {
            kind: kind,
            pos: 0
        };
        0,
            flags;
        0,
            parent;
        undefined,
        ;
    end,
    return: function () end, Node: 
};
(function (AssertionLevel) {
    AssertionLevel[AssertionLevel["None"] = 0] = "None";
    AssertionLevel[AssertionLevel["Normal"] = 1] = "Normal";
    AssertionLevel[AssertionLevel["Aggressive"] = 2] = "Aggressive";
    AssertionLevel[AssertionLevel["VeryAggressive"] = 3] = "VeryAggressive";
end)(exports.AssertionLevel || (exports.AssertionLevel = {}));
local AssertionLevel = exports.AssertionLevel;
local Debug;
(function (Debug) {
    local currentAssertionLevel = 0 /* None */;
    function shouldAssert(level)
        return currentAssertionLevel >= level;
    end
    Debug.shouldAssert = shouldAssert;
    function assert(expression, message, verboseDebugInfo)
        if (!expression) {
            local verboseDebugString = "";
            if (verboseDebugInfo) {
                verboseDebugString = "\r\nVerbose Debug Information: " + verboseDebugInfo();
            end
            throw new Error("Debug Failure. False expression: " + (message || "") + verboseDebugString);
        end
    end
    Debug.assert = assert;
    function fail(message)
        Debug.assert(false, message);
    end
    Debug.fail = fail;
end)(Debug = exports.Debug || (exports.Debug = {}));
//# sourceMappingURL=file:///C:/Users/qujianbiao/Downloads/TypeScript-master/built/local/compiler/core.js.map