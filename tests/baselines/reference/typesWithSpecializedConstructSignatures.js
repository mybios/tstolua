//// [typesWithSpecializedConstructSignatures.ts]
// basic uses of specialized signatures without errors

class Base { foo: string }
class Derived1 extends Base { bar: string }
class Derived2 extends Base { baz: string }

class C {
    constructor(x: 'hi');
    constructor(x: 'bye');
    constructor(x: string);
    constructor(x) {
        return x;
    }
}
var c = new C('a');

interface I {
    new(x: 'hi'): Derived1;
    new(x: 'bye'): Derived2;
    new(x: string): Base;
}
var i: I;

var a: {
    new(x: 'hi'): Derived1;
    new(x: 'bye'): Derived2;
    new(x: string): Base;
};

c = i;
c = a;

i = a;

a = i;

var r1 = new C('hi');
var r2: Derived2 = new i('bye');
var r3: Base = new a('hm');

//// [typesWithSpecializedConstructSignatures.js]
// basic uses of specialized signatures without errors
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base() {
    }
    return Base;
})();
var Derived1 = (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        _super.apply(this, arguments);
    }
    return Derived1;
})(Base);
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        _super.apply(this, arguments);
    }
    return Derived2;
})(Base);
var C = (function () {
    function C(x) {
        return x;
    }
    return C;
})();
var c = new C('a');
var i;
var a;
c = i;
c = a;
i = a;
a = i;
var r1 = new C('hi');
var r2 = new i('bye');
var r3 = new a('hm');
