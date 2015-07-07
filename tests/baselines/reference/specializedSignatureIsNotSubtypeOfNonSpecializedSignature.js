//// [specializedSignatureIsNotSubtypeOfNonSpecializedSignature.ts]
// Specialized signatures must be a subtype of a non-specialized signature
// All the below should be errors

function foo(x: 'a');
function foo(x: number) { }

class C {
    foo(x: 'a');
    foo(x: number);
    foo(x: any) { }
}

class C2<T> {
    foo(x: 'a');
    foo(x: T);
    foo(x: any) { }
}

class C3<T extends String> {
    foo(x: 'a');
    foo(x: T);
    foo(x: any) { }
}

interface I {
    (x: 'a');
    (x: number);
    foo(x: 'a');
    foo(x: number);
}

interface I2<T> {
    (x: 'a');
    (x: T);
    foo(x: 'a');
    foo(x: T);
}

interface I3<T extends String> {
    (x: 'a');
    (x: T);
    foo(x: 'a');
    foo(x: T);
}

var a: {
    (x: 'a');
    (x: number);
    foo(x: 'a');
    foo(x: number);
}

var a2: {
    (x: 'a');
    <T>(x: T);
    foo(x: 'a');
    foo<T>(x: T);
}

var a3: {
    (x: 'a');
    <T>(x: T);
    foo(x: 'a');
    foo<T extends String>(x: T);
}


//// [specializedSignatureIsNotSubtypeOfNonSpecializedSignature.js]
// Specialized signatures must be a subtype of a non-specialized signature
// All the below should be errors
function foo(x) { }
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x) { };
    return C;
})();
var C2 = (function () {
    function C2() {
    }
    C2.prototype.foo = function (x) { };
    return C2;
})();
var C3 = (function () {
    function C3() {
    }
    C3.prototype.foo = function (x) { };
    return C3;
})();
var a;
var a2;
var a3;