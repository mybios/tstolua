//// [es5ExportDefaultClassDeclaration.ts]

export default class C {
    method() { }
}


//// [es5ExportDefaultClassDeclaration.js]
var C = (function () {
    function C() {
    }
    C.prototype.method = function () { };
    return C;
})();
exports.default = C;


//// [es5ExportDefaultClassDeclaration.d.ts]
export default class C {
    method(): void;
}
