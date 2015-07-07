//// [strictModeReservedWordInClassDeclaration.ts]
interface public { }

class Foo {
    constructor(private, public, static) {
        private = public = static;
    }
    public banana(x: public) { }
}

class C {
    constructor(public public, let) {
    }
    foo1(private, static, public) {
        function let() { }
        var z = function let() { };
    }

    public pulbic() { } // No Error;
}

class D<public, private>{ }

class E implements public { }

class F implements public.private.B { }
class F1 implements public.private.implements { }
class G extends package { }
class H extends package.A { }

//// [strictModeReservedWordInClassDeclaration.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Foo = (function () {
    function Foo(private, public, static) {
        private = public = static;
    }
    Foo.prototype.banana = function (x) { };
    return Foo;
})();
var C = (function () {
    function C(public, let) {
        this.public = public;
    }
    C.prototype.foo1 = function (private, static, public) {
        function let() { }
        var z = function let() { };
    };
    C.prototype.pulbic = function () { }; // No Error;
    return C;
})();
var D = (function () {
    function D() {
    }
    return D;
})();
var E = (function () {
    function E() {
    }
    return E;
})();
var F = (function () {
    function F() {
    }
    return F;
})();
var F1 = (function () {
    function F1() {
    }
    return F1;
})();
var G = (function (_super) {
    __extends(G, _super);
    function G() {
        _super.apply(this, arguments);
    }
    return G;
})(package);
var H = (function (_super) {
    __extends(H, _super);
    function H() {
        _super.apply(this, arguments);
    }
    return H;
})(package.A);