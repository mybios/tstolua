require('lua_libs');local __exports = {};local __export=nil
local TestPrint = (function () 
    local TestPrint = {}
    TestPrint.constructor = function (this)
        this._s = '';
    end;
    TestPrint.clear = function (this)
        this._s = '';
    end;
    TestPrint.put = function (this, s)
        this._s  = this._s .. ( s);
        this._s  = this._s .. ( '\n');
    end;
    TestPrint.putinline = function (this, s)
        this._s  = this._s .. ( s);
    end;
    TestPrint.get = function (this)
        return this._s;
    end;
    TestPrint.getAndClear = function (this)
        local s = this:get();
        this:clear();
        return s;
    end;
    return TestPrint;
end)();
local tprint = __new(TestPrint);
--[[ //------------------------------------ ]]
local Demo = (function () 
    local Demo = {}
    Demo.constructor = function (this)
        this._id = 0;
    end;
    Demo.getType = function ()
        return 'demo type';
    end;
    Demo.getId = function (this)
        return this:_getId();
    end;
    Demo._getId = function (this)
        this._id = this._id + 1;
        this._id = this._id - 1;
        return this._id;
    end;
    return Demo;
end)();
local Game = (function (_super) 
    local Game = {}
    __extends(Game, _super);
    Game.constructor = function (this, id)
        _super.constructor(this);
        this._id = id;
    end;
    Game.getId = function (this)
        return _super.getId(this) * 10;
    end;
    Game.setSome = function (this, ...)
        local args = __new(Array); local __restP = {...}
        for _, p in ipairs(__restP) do
            args:push(p)
        end
    end;
    Game.setSome2 = function (this, it,...)
        local args = __new(Array); local __restP = {...}
        for _, p in ipairs(__restP) do
            args:push(p)
        end
    end;
    return Game;
end)(Demo);
local JumpGame = (function (_super) 
    local JumpGame = {}
    __extends(JumpGame, _super);
    JumpGame.constructor = function (this, ...)
        _super.constructor(this, ...);
    end;
    JumpGame.getId = function (this)
        return _super.getId(this);
    end;
    JumpGame.setId = function (this, id)
        this._id = id;
    end;
    return JumpGame;
end)(Game);
function test_class()
    print('----- test class ----- ');
    assert(Demo.getType() == "demo type");
    local demo = __new(Demo);
    assert(demo:getId() == 0);
    local game = __new(Game, 1);
    assert(game:getId() == 1 * 10);
    local jumpGame = __new(JumpGame, 10);
    assert(jumpGame:getId() == 100);
    jumpGame:setId(20);
    assert(jumpGame:getId() == 200);
    print("ok");
end
function test_continue_for()
    print('----- test for, continue ----- ');
    tprint:clear();
    do
    local i = 0;local j = 1;local c1;
    while ( i < 5)  do
        do
        if (i == 1) then
            goto continue
        elseif (i == 4) then
            break;
        end
        local c = i;
        tprint:putinline('' .. c .. ';[');
        do
        local j_1 = 0;
        while ( j_1 < 3)  do
            do
            if (j_1 == 2) then
                goto continue
            end
            local jjj = j_1;
            tprint:putinline('' .. jjj .. ',');
            end
            ::continue::
            j_1 = j_1 + 1
        end
        end
        tprint:putinline(']');
        end
        ::continue::
        i = i + 1
    end
    end
    assert(tprint:getAndClear() == "0;[0,1,]2;[0,1,]3;[0,1,]");
    print("ok");
end
function test_continue_for_in()
    print('----- test for in, continue ----- ');
    tprint:clear();
    local array2 = __new(Array, 1, 2, 3, 4);
    for arr,_ in ipairs(array2) do arr = arr - 1 
        do
        if (array2[arr + 1] == 4) then
            goto continue
        end
        tprint:putinline('' .. arr .. ':' .. array2[arr + 1] .. ',');
        end
        ::continue::
    end
    assert(tprint:getAndClear() == "0:1,1:2,2:3,");
    local dict = {};
    dict['a'] = 'a like';
    dict['b'] = 'b like';
    dict['c'] = 'c like';
    for d,_ in pairs(dict) do  
        do
        if (d == 'c') then
            goto continue
        end
        tprint:putinline('' .. d .. ':' .. dict[d] .. ',');
        end
        ::continue::
    end
    assert(tprint:getAndClear() == "b:b like,a:a like,");
    local expr = Array(1, 2, 3);
    for _, v in pairs(expr) do  
        do
        tprint:putinline(v .. ';');
        end
        ::continue::
    end
    assert(tprint:getAndClear() == "1;2;3;");
    print("ok");
end
function test_continue_for_of()
    print('----- test for of, continue ----- ');
    local expr = Array(1, 2, 3);
    for _, v in pairs(expr) do  
        do
        tprint:putinline(v .. ';');
        end
        ::continue::
    end
    assert(tprint:getAndClear() == "1;2;3;");
    print("ok");
end
function test_while()
    print('----- test while ----- ');
    local w_i = 0;
    while (w_i < 10)  do
        do
        if (w_i == 7) then 
            w_i = w_i + 1;
            goto continue
        end
        tprint:putinline('' .. w_i .. ',');
        w_i = w_i + 1;
        end
        ::continue::
    end
    assert(tprint:getAndClear() == "0,1,2,3,4,5,6,8,9,");
    print("ok");
end
function test_do_while()
    print('----- test do while ----- ');
    local w_i = 0;
    repeat 
        do
        w_i = w_i + 1;
        if (w_i == 5) then
            goto continue
        end
        tprint:putinline('' .. w_i .. ',');
        end
        ::continue::
    until not (w_i < 10)
    assert(tprint:getAndClear() == "1,2,3,4,6,7,8,9,10,");
    print('ok');
end
function test_if()
    print('----- test if ----- ');
    local flag = true;
    local checkifStatement = 0;
    if (flag) then 
        checkifStatement = 1;
    end
    assert(checkifStatement == 1);
    flag = false;
    if (flag) then 
        tprint:putinline('');
    else 
        tprint:putinline('false');
    end
    assert(tprint:getAndClear() == "false");
    local a = 2;
    if (a == 0) then 
        tprint:putinline('a==0');
    elseif (a == 1) then 
        tprint:putinline('a==1');
    else 
        tprint:putinline('a==2');
    end
    assert(tprint:getAndClear() == 'a==2');
    print("ok");
end
function test_prefixUnaryExpressionAndPostfixUnaryExpression()
    print('----- i++; ++i; i--; --i; ----- ');
    local pi = 0;
    pi = pi + 1;
    assert(pi == 1);
    local pi1 = (function() pi = pi + 1; return pi; end)();
    assert(pi == 2);
    assert(pi1 == 2);
    pi1 = (function() pi = pi + 1; return pi; end)();
    assert(pi == 3);
    assert(pi1 == 3);
    assert((function() local _i=pi; pi = pi + 1; return _i; end)() + 1 == 4);
    assert(((function() local _i=pi; pi = pi + 1; return _i; end)()) + 1 == 5);
    assert(((function() pi = pi + 1; return pi; end)()) + 1 == 7);
    pi = pi - 1;
    pi = pi - 1;
    pi = pi - 1;
    pi = pi - 1;
    assert(pi == 2);
    pi1 = (function() pi = pi - 1; return pi; end)();
    assert(pi == 1);
    assert(pi1 == 1);
    pi = pi + 1;
    assert(pi == 2);
    pi1 = (function() local _i=pi; pi = pi + 1; return _i; end)();
    assert(pi1 == 2);
    assert(pi == 3);
    pi = pi - 1;
    assert(pi == 2);
    pi1 = (function() local _i=pi; pi = pi - 1; return _i; end)();
    assert(pi1 == 2);
    assert(pi == 1);
    print('ok');
    print('----- && || ----- ');
    assert(true and true or true);
    print('ok');
end
function test_binaryExpression()
    print('----- === == !== != ! ----- ');
    local xxx = 1;
    assert(xxx ~= 2);
    assert(xxx ~= 2);
    assert(xxx == 1);
    assert(xxx == 1);
    local notflag = false;
    assert((not notflag) == true);
    print('ok');
end
function test_bitBinaryExpression()
    print('----- | & >> >>> << ~ ^ ----- '); --[[ // lua5.3�Ѿ�֧�� ]]
    local bit_flag = 0x80;
    assert(( bit.band(bit_flag, 0x0)) == 0x00);
    assert(( bit.band(bit_flag, 0x80)) == 0x80);
    assert(( bit.bor( bit.band(bit_flag, 0x80), 0x88)) == 0x88);
    assert(( bit.rshift(bit_flag, 2)) == 0x20);
    assert(( bit.arshift(bit_flag, 2)) == 0x20);
    assert(( bit.rshift(bit_flag, 8)) == 0);
    bit_flag = 0x40;
    assert(( bit.lshift(bit_flag, 1)) == 0x80);
    assert(( bit.bxor(0x33, 0x24)) == 0x17);
    assert((bit.bnot(0x33)) == -52);
    print('ok');
end
function test_threeElemBinaryExpression()
    print('----- += -= *= /= %= ----- ');
    local i = 1;
    i  = i+( 2);
    assert(i == 3);
    i  = i-( 1);
    assert(i == 2);
    i  = i*( 2 + 3);
    assert(i == 10);
    i  = i/( 2 + 3);
    assert(i == 2);
    i = 7;
    i  = i%( 3);
    assert(i == 1);
    local sss = 'abc';
    sss  = sss .. ( 1);
    assert(sss == 'abc1');
    print('ok');
end
function test_threeElemBitBinaryExpression()
    print('----- <<= >>= >>>= &= |= ^= ----- ');
    local i2 = 0x1;
    i2  = bit.lshift(i2, 2);
    assert(i2 == 0x4);
    i2  = bit.rshift(i2, 1);
    assert(i2 == 0x2);
    i2 = 0x80;
    i2  = bit.arshift(i2, 1);
    assert(i2 == 0x40);
    i2 = 0x88;
    i2  = bit.band(i2, 0x80);
    assert(i2 == 0x80);
    i2 = 0x80;
    i2  = bit.bor(i2, 0x08);
    assert(i2 == 0x88);
    i2 = 0x33;
    i2  = bit.bxor(i2, 0x24);
    assert(i2 == 0x17);
    print('ok');
end
function test_conditional()
    print('----- ? : ----- ');
    local i3 = 10;
    assert((i3 < 10 and 1 or 0) == 0);
    assert((i3 == 10 and 1 or 0) == 1);
    assert((i3 < 10 and 0 or null) == null);
    assert((i3 == 10 and 0 or null) == 0);
    print('ok');
end
local Employee = (function () 
    local Employee = {}
    Employee.constructor = function (this)
        this._fullName = '';
        this._shortName = '';
        this._age = 10;
    end;
    __add_attrs_getters_setters(Employee)
    Employee.__getters.fullName = function (this)
        return this._fullName;
    end;
    Employee.__setters.fullName = function (this, newName)
        tprint:putinline('you can not rename fullname!');
    end;
    __add_attrs_getters_setters(Employee)
    Employee.__getters.shortName = function (this)
        return this._shortName;
    end;
    Employee.__setters.shortName = function (this, newName)
        this._shortName = newName;
    end;
    __add_attrs_getters_setters(Employee)
    Employee.__getters.age = function (this)
        return this._age;
    end;
    Employee.__setters.age = function (this, value)
    end;
    return Employee;
end)();
function test_get_set()
    print('----- get set ----- ');
    local empl = __new(Employee);
    assert(tprint:getAndClear() == '');
    empl.fullName = 'qujianbiao';
    assert(tprint:getAndClear() == 'you can not rename fullname!');
    assert(empl.fullName == '');
    assert(empl.shortName == '');
    empl.shortName = 'qjb';
    assert(empl.shortName == 'qjb');
    assert(empl.age == 10);
    empl.age = 20;
    assert(empl.age == 10);
    print('ok');
end
function test_switch()
    print('----- switch ----- ');
    local s_c = '2';
    function switch_test1(x)
        local __switch_var_1 = switch{
            __codesegments = {
                [1] = function()
                    tprint:put('1');
                    return __switch_return_break
                end,
                [2] = function()
                    tprint:put('2');
                    return __switch_return_break
                end,
                [3] = function()
                    tprint:put('3');
                    return __switch_return_break
                end,
                [4] = function()
                    tprint:put('default');
                end,
            },
            [1] = 1,
            [s_c] = 2,
            ['3'] = 3,
            ["default"] = 4,
        }
        local __switch_rtflag, __switch_rt = __switch_var_1:case(x)
        if __switch_rtflag == __switch_return_return then return __switch_rt end
    end
    switch_test1(1);
    assert(tprint:getAndClear() == '1\n');
    switch_test1(2);
    assert(tprint:getAndClear() == 'default\n');
    switch_test1('2');
    assert(tprint:getAndClear() == '2\n');
    switch_test1('3');
    assert(tprint:getAndClear() == '3\n');
    function switch_test2(x)
        local __switch_var_2 = switch{
            __codesegments = {
                [1] = function()
                    tprint:put('default');
                end,
                [2] = function()
                    tprint:put('1');
                end,
                [3] = function()
                    tprint:put('2');
                    return __switch_return_break
                end,
                [4] = function()
                    tprint:put('3');
                    return __switch_return_break
                end,
            },
            ["default"] = 1,
            [1] = 2,
            [2] = 3,
            [3] = 4,
        }
        local __switch_rtflag, __switch_rt = __switch_var_2:case(x)
        if __switch_rtflag == __switch_return_return then return __switch_rt end
    end
    switch_test2(10);
    assert(tprint:getAndClear() == 'default\n1\n2\n');
    switch_test2(1);
    assert(tprint:getAndClear() == '1\n2\n');
    switch_test2(2);
    assert(tprint:getAndClear() == '2\n');
    function switch_test3(x)
        local __switch_var_3 = switch{
            __codesegments = {
                [1] = function()
                    tprint:put('2');
                    return __switch_return_break
                end,
                [2] = function()
                    tprint:put('c');
                    return __switch_return_break
                end,
                [3] = function()
                    tprint:put('3');
                    do
                    local i = 0;
                    while ( i < 10)  do
                        do
                        if (i == 0) then
                            break;
                        end
                        if (i == 1) then
                            goto continue
                        end
                        return;
                        end
                        ::continue::
                        i = i + 1
                    end
                    end
                    return __switch_return_return,-1
                end,
                [4] = 0, -- nil
                [5] = 0, -- nil
                [6] = function()
                    tprint:putinline('<4567>');
                    return __switch_return_return
                end,
            },
            [1] = 1,[2] = 1,
            ['c'] = 2,
            [3] = 3,
            [4] = 4,
            [5] = 5,[6] = 5,['g'] = 5,[5 + 5] = 5,[5 * 10] = 5,
            [7] = 6,
        }
        local __switch_rtflag, __switch_rt = __switch_var_3:case(x)
        if __switch_rtflag == __switch_return_return then return __switch_rt end
        tprint:put('switch_test3 end!');
    end
    assert(switch_test3(3) == -1);
    assert(tprint:getAndClear() == '3\n');
    assert(switch_test3('c') == null);
    assert(tprint:getAndClear() == 'c\nswitch_test3 end!\n');
    switch_test3(4);
    assert(tprint:getAndClear() == '<4567>');
    switch_test3(5);
    assert(tprint:getAndClear() == '<4567>');
    switch_test3(6);
    assert(tprint:getAndClear() == '<4567>');
    switch_test3(7);
    assert(tprint:getAndClear() == '<4567>');
    switch_test3('g');
    assert(tprint:getAndClear() == '<4567>');
    switch_test3(5 + 5);
    assert(tprint:getAndClear() == '<4567>');
    switch_test3(5 * 10);
    assert(tprint:getAndClear() == '<4567>');
    print('ok');
end
function test_rawString()
    print('----- string length ������ RegExp ----- ');
    local s0 = 'Hello world';
    assert(String.replace(s0,'Hello','Hi, hello') == 'Hi, hello world');
    assert(String.toLowerCase(s0) == 'hello world');
    assert(String.toUpperCase(s0) == 'HELLO WORLD');
    assert(String.toLocaleLowerCase(s0) == 'hello world');
    assert(String.toLocaleUpperCase(s0) == 'HELLO WORLD');
    local s1 = ' hello ';
    assert(String.trim(s1) == 'hello');
    local s2 = '123456';
    assert(String.substr(s2,0,3) == '123');
    assert(String.substring(s2,2,4) == '34');
    assert(String.toString(s2) == '123456');
    assert(String.slice(s2,2,4) == '34');
    assert(String.slice(s2,0) == '123456');
    assert(String.slice(s2,1) == '23456');
    assert(String.slice(s2,-1) == '6');
    assert(String.slice(s2,-1,-2) == '');
    assert(String.slice(s2,-1,-1) == '');
    assert(String.slice(s2,-3,3) == '');
    assert(String.slice(s2,-3,4) == '4');
    assert(String.slice(s2,-3,-1) == '45');
    local s22 = String.slice(s2);
    assert(s22 == '123456');
    local s3 = '1,2,3,4';
    local s3_split = String.split(s3,',');
    assert(s3_split.length == 4);
    assert(s3_split[0 + 1] == '1');
    assert(s3_split[1 + 1] == '2');
    assert(s3_split[2 + 1] == '3');
    assert(s3_split[3 + 1] == '4');
    s3_split = String.split(s3,',',3);
    assert(s3_split[0 + 1] == '1');
    assert(s3_split[1 + 1] == '2');
    assert(s3_split[2 + 1] == '3');
    assert(s3_split[3 + 1] == null);
    local s3_1 = '1 -Hello 1 - word. Sentence 2 -number 2.';
    local s3_1_split = String.split(s3_1,__new(RegExp, [[/\d -/]], "", true));
    assert(s3_1_split[0 + 1] == '');
    assert(s3_1_split[1 + 1] == 'Hello ');
    assert(s3_1_split[2 + 1] == ' word. Sentence ');
    assert(s3_1_split[3 + 1] == 'number 2.');
    local s3_2_split = String.split(s3_1,__new(RegExp, [[/(\d) (-)/]], "", true));
    assert(s3_2_split[0 + 1] == '');
    assert(s3_2_split[1 + 1] == '1');
    assert(s3_2_split[2 + 1] == '-');
    assert(s3_2_split[3 + 1] == 'Hello ');
    assert(s3_2_split[4 + 1] == '1');
    assert(s3_2_split[5 + 1] == '-');
    assert(s3_2_split[6 + 1] == ' word. Sentence ');
    assert(s3_2_split[7 + 1] == '2');
    assert(s3_2_split[8 + 1] == '-');
    assert(s3_2_split[9 + 1] == 'number 2.');
    local s3_3 = '1234';
    local s3_3_split = String.split(s3_3,'');
    assert(s3_3_split.length == 4);
    assert(s3_3_split[0 + 1] == '1');
    assert(s3_3_split[1 + 1] == '2');
    assert(s3_3_split[2 + 1] == '3');
    assert(s3_3_split[3 + 1] == '4');
    local s4 = '123456';
    assert(String.charAt(s4,0) == '1');
    assert(String.charAt(s4,1) == '2');
    assert(String.charAt(s4,5) == '6');
    local s5 = '123456';
    assert(String.charCodeAt(s5,0) == 49);
    assert(String.charCodeAt(s5,1) == 50);
    local s6 = '1';
    assert(String.concat(s6,'2') == '12');
    local s7 = '123456';
    assert(s7:len() == 6);
    --[[ //s7.length = 1 ]]
    local s8 = '123';
    assert(String.localeCompare(s8,'112') == 1);
    assert(String.localeCompare(s8,'123') == 0);
    assert(String.localeCompare(s8,'124') == -1);
    local s9 = '123456123';
    assert(String.indexOf(s9,'23') == 1);
    assert(String.indexOf(s9,'23',1) == 1);
    assert(String.indexOf(s9,'23',2) == 7);
    assert(String.indexOf(s9,'231') == -1);
    assert(String.lastIndexOf(s9,'23') == 7);
    assert(String.lastIndexOf(s9,'23',1) == 1);
    assert(String.lastIndexOf(s9,'23',7) == 7);
    assert(String.lastIndexOf(s9,'23',6) == 1);
    assert(String.lastIndexOf(s9,'231') == -1);
    local s9_1 = '12 ab 12 cd 12';
    assert(String.lastIndexOf(s9_1,'12',9) == 6);
    local s10 = 'Visit W3School!';
    assert(String.search(s10,__new(RegExp, [[/w3school/]], "", true)) == -1);
    assert(String.search(s10,__new(RegExp, [[/W3School/]], "", true)) == 6);
    assert(String.search(s10,'W3School') == 6);
    local s10_1 = 'First second\nthird fourth\nfifth sixth';
    assert(String.search(s10_1,__new(RegExp, [[/(\w+)$/]], "", true)) == 32);
    assert(String.search(s10_1,__new(RegExp, [[/(\w+)$/]], "m", true)) == 6);
    assert(String.search(s10_1,__new(RegExp, [[/(\w+)$/]], "gm", true)) == 6);
    local s11_1 = "Visit Microsoft Microsoft!";
    assert(String.replace(s11_1,__new(RegExp, [[/Microsoft/]], "", true),"W3School") == 'Visit W3School Microsoft!');
    local s11_2 = "Welcome to Microsoft! ";
    s11_2  = s11_2 .. ( "We are proud to announce that Microsoft has ");
    s11_2  = s11_2 .. ( "one of the largest Web Developers sites in the world.");
    assert(String.replace(s11_2,__new(RegExp, [[/Microsoft/]], "g", true),"W3School") == 'Welcome to W3School! We are proud to announce that W3School has one of the largest Web Developers sites in the world.');
    local s11_3 = "Javascript Tutorial";
    assert(String.replace(s11_3,__new(RegExp, [[/javascript/]], "i", true),"JavaScript") == 'JavaScript Tutorial');
    local s11_4 = "Doe, John";
    assert(String.replace(s11_4,__new(RegExp, [[/(\w+)\s*, \s*(\w+)/]], "", true),"$2 $1") == 'John Doe');
    local s11_5 = '"a", "b"';
    assert(String.replace(s11_5,__new(RegExp, [[/"([^"]*)"/]], "g", true),"'$1'") == "'a', 'b'");
    local s11_6 = 'aaa bbb ccc';
    assert(String.replace(s11_6,__new(RegExp, [[/(\w+)/]], "g", true),function (word) return String.toUpperCase(String.substring(word,0,1)) .. String.substring(word,1); end) == "Aaa Bbb Ccc");
    --[[ //���д��� ]]
    local s11_7 = 'First second\nthird fourth\nfifth sixth';
    assert(String.replace(s11_7,__new(RegExp, [[/(\w+)$/]], "", true),"xxx") == "First second\nthird fourth\nfifth xxx");
    assert(String.replace(s11_7,__new(RegExp, [[/(\w+)$/]], "g", true),"xxx") == "First second\nthird fourth\nfifth xxx");
    assert(String.replace(s11_7,__new(RegExp, [[/(\w+)$/]], "m", true),"xxx") == "First xxx\nthird fourth\nfifth sixth");
    assert(String.replace(s11_7,__new(RegExp, [[/(\w+)$/]], "mg", true),"xxx") == "First xxx\nthird xxx\nfifth xxx");
    local s12_1 = 'Hello world!';
    assert(String.match(s12_1,'world')[0 + 1] == 'world');
    assert(String.match(s12_1,'world').index == 6);
    assert(String.match(s12_1,'world').input == s12_1);
    assert(String.match(s12_1,'World') == null);
    local s12_2 = '1 plus 2 equal 3';
    assert(String.match(s12_2,__new(RegExp, [[/\d+/]], "g", true)).length == 3);
    assert(String.match(s12_2,__new(RegExp, [[/\d+/]], "g", true))[0 + 1] == '1');
    assert(String.match(s12_2,__new(RegExp, [[/\d+/]], "g", true))[1 + 1] == '2');
    assert(String.match(s12_2,__new(RegExp, [[/\d+/]], "g", true))[2 + 1] == '3');
    assert(String.match(s12_2,__new(RegExp, [[/\d+ /]], "g", true)).length == 2);
    assert(String.match(s12_2,__new(RegExp, [[/\d+ /]], "g", true))[0 + 1] == '1 ');
    assert(String.match(s12_2,__new(RegExp, [[/\d+ /]], "g", true))[1 + 1] == '2 ');
    assert(String.match(s12_2,__new(RegExp, [[/(\d+)( )/]], "g", true)).length == 2);
    assert(String.match(s12_2,__new(RegExp, [[/(\d+)( )/]], "g", true))[0 + 1] == '1 ');
    assert(String.match(s12_2,__new(RegExp, [[/(\d+)( )/]], "g", true))[1 + 1] == '2 ');
    local s12_3 = 'First second\nthird fourth\nfifth sixth';
    assert(String.match(s12_3,__new(RegExp, [[/(\w+)$/]], "", true)).length == 1);
    assert(String.match(s12_3,__new(RegExp, [[/(\w+)$/]], "", true))[0 + 1] == 'sixth');
    assert(String.match(s12_3,__new(RegExp, [[/(\w+)$/]], "m", true)).length == 1);
    assert(String.match(s12_3,__new(RegExp, [[/(\w+)$/]], "m", true))[0 + 1] == 'second');
    assert(String.match(s12_3,__new(RegExp, [[/(\w+)$/]], "m", true)).index == 6);
    assert(String.match(s12_3,__new(RegExp, [[/(\w+)$/]], "mg", true)).length == 3);
    assert(String.match(s12_3,__new(RegExp, [[/(\w+)$/]], "mg", true))[0 + 1] == 'second');
    assert(String.match(s12_3,__new(RegExp, [[/(\w+)$/]], "mg", true))[1 + 1] == 'fourth');
    assert(String.match(s12_3,__new(RegExp, [[/(\w+)$/]], "mg", true))[2 + 1] == 'sixth');
    --[[ //---- ]]
    local s13 = 'w;b;a';
    local a13 = String.split(s13,__new(RegExp, [[/;/]], "", true));
    assert(a13[0 + 1] == 'w');
    assert(a13[1 + 1] == 'b');
    assert(a13[2 + 1] == 'a');
    assert(a13.length == 3);
    s13 = ';w;b;a';
    a13 = String.split(s13,__new(RegExp, [[/;/]], "", true));
    assert(a13[0 + 1] == '');
    assert(a13[1 + 1] == 'w');
    assert(a13[2 + 1] == 'b');
    assert(a13[3 + 1] == 'a');
    assert(a13.length == 4);
    s13 = ';w;b;a;';
    a13 = String.split(s13,__new(RegExp, [[/;/]], "", true));
    assert(a13[0 + 1] == '');
    assert(a13[1 + 1] == 'w');
    assert(a13[2 + 1] == 'b');
    assert(a13[3 + 1] == 'a');
    assert(a13[4 + 1] == '');
    assert(a13.length == 5);
    --[[ //---- ]]
    s13 = 'w;b;a';
    a13 = String.split(s13,';');
    assert(a13[0 + 1] == 'w');
    assert(a13[1 + 1] == 'b');
    assert(a13[2 + 1] == 'a');
    assert(a13.length == 3);
    s13 = ';w;b;a';
    a13 = String.split(s13,';');
    assert(a13[0 + 1] == '');
    assert(a13[1 + 1] == 'w');
    assert(a13[2 + 1] == 'b');
    assert(a13[3 + 1] == 'a');
    assert(a13.length == 4);
    s13 = ';w;b;a;';
    a13 = String.split(s13,';');
    assert(a13[0 + 1] == '');
    assert(a13[1 + 1] == 'w');
    assert(a13[2 + 1] == 'b');
    assert(a13[3 + 1] == 'a');
    assert(a13[4 + 1] == '');
    assert(a13.length == 5);
    print('ok');
end
function test_string()
    print('----- String -----');
    local s = __new(String, 'abc ');
    assert(s['0'] == 'a');
    assert(s['1'] == 'b');
    assert(s['2'] == 'c');
    assert(s['3'] == ' ');
    assert(String(s) == 'abc ');
    assert(String.trim(s) == 'abc');
    s  = s .. ( '123');
    assert(s == 'abc 123');
    assert(String.toString(s) == 'abc 123');
    s = __new(String, 'Abc');
    assert(String.toLowerCase(s) == 'abc');
    assert(String.toLocaleLowerCase(s) == 'abc');
    assert(String.toUpperCase(s) == 'ABC');
    assert(String.toLocaleUpperCase(s) == 'ABC');
    s = __new(String, ' Abc ');
    assert(String.trim(s) == 'Abc');
    assert(String.substring(s,1,2) == 'A');
    assert(String.substr(s,1,1) == 'A');
    s = __new(String, '1,2,3');
    assert(String.split(s,',').length == 3);
    assert(String.slice(s,0,1) == '1');
    assert(s:len() == 5);
    assert(String.charAt(s,0) == '1');
    assert(String.charCodeAt(s,0) == 49);
    assert(String.concat(s,'123') == '1,2,3123');
    assert(String.localeCompare(s,'1,1,1') == 1);
    assert(String.indexOf(s,',') == 1);
    assert(String.lastIndexOf(s,',') == 3);
    assert(String.search(s,',') == 1);
    assert(String.replace(s,__new(RegExp, [[/,/]], "g", true),'.') == '1.2.3');
    assert(String.match(s,'1')[0 + 1] == '1');
    print('ok');
end
function test_regExp()
    print('----- RegExp -----');
    local patt = __new(RegExp, '[0-9].', 'gim');
    assert(patt.source == '[0-9].');
    patt.source = '';
    assert(patt.source == '[0-9].');
    assert(patt.lastIndex == 0);
    patt.lastIndex = 1;
    assert(patt.lastIndex == 1);
    assert(patt.global == true);
    patt.global = false;
    assert(patt.global == true);
    assert(patt.ignoreCase == true);
    patt.ignoreCase = false;
    assert(patt.ignoreCase == true);
    assert(patt.multiline == true);
    patt.multiline = false;
    assert(patt.multiline == true);
    local patt2 = __new(RegExp, [[/[0-9]./]], "gim", true);
    assert(patt2.source == '[0-9].');
    local patt3 = patt2:compile();
    assert(patt3.source == '[0-9].');
    assert(patt3.ignoreCase == true);
    assert(patt3.multiline == true);
    assert(patt3.global == true);
    local str_1_1 = "aAbc12456def41246ghi";
    local patt4 = __new(RegExp, [[/12/]], "", true);
    assert(patt4:exec(str_1_1).length == 1);
    assert(patt4:exec(str_1_1)[0 + 1] == '12');
    assert(patt4:exec(str_1_1).index == 4);
    assert(patt4.lastIndex == 0);
    patt4.lastIndex = 10;
    assert(patt4:exec(str_1_1)[0 + 1] == '12');
    assert(patt4:exec(str_1_1).index == 4);
    patt4 = __new(RegExp, [[/12/]], "g", true);
    local patt4_rt = patt4:exec(str_1_1);
    assert(patt4_rt.length == 1);
    assert(patt4_rt[0 + 1] == '12');
    assert(patt4_rt.index == 4);
    assert(patt4.lastIndex == 6);
    patt4_rt = patt4:exec(str_1_1);
    assert(patt4_rt[0 + 1] == '12');
    assert(patt4_rt.index == 13);
    assert(patt4.lastIndex == 15);
    patt4_rt = patt4:exec(str_1_1);
    assert(patt4_rt == null);
    assert(patt4.lastIndex == 0);
    patt4 = __new(RegExp, [[/12/]], "", true);
    assert(patt4:test(str_1_1) == true);
    assert(patt4.lastIndex == 0);
    assert(patt4:test(str_1_1) == true);
    assert(patt4.lastIndex == 0);
    assert(patt4:test(str_1_1) == true);
    assert(patt4.lastIndex == 0);
    patt4 = __new(RegExp, [[/12/]], "g", true);
    assert(patt4:test(str_1_1) == true);
    assert(patt4.lastIndex == 6);
    assert(patt4:test(str_1_1) == true);
    assert(patt4.lastIndex == 15);
    assert(patt4:test(str_1_1) == false);
    assert(patt4.lastIndex == 0);
    patt4 = __new(RegExp, [[/(\w+)$/]], "gm", true);
    str_1_1 = 'First second\nthird fourth\nfifth sixth';
    assert(patt4:test(str_1_1) == true);
    assert(patt4.lastIndex == 12);
    assert(patt4:test(str_1_1) == true);
    assert(patt4.lastIndex == 25);
    assert(patt4:test(str_1_1) == true);
    assert(patt4.lastIndex == 37);
    assert(patt4:test(str_1_1) == false);
    assert(patt4.lastIndex == 0);
    patt4 = __new(RegExp, [[/[0-9A-z- ]/]], "", true);
    assert(patt4:test('***9') == true);
    assert(patt4:test('***c') == true);
    assert(patt4:test('** **') == true);
    assert(patt4:test('**-**') == true);
    assert(patt4:test('****') == false);
    print('ok');
end
function test_array()
    print('----- Array ----- ');
    local array = __new(Array, 1, 2, 3, 4);
    assert(array[0 + 1] == 1);
    assert(array[1 + 1] == 2);
    assert(array[2 + 1] == 3);
    assert(array[3 + 1] == 4);
    local index = 1;
    assert(array[index + 1] == 2);
    array[1 + 1] = 10;
    assert(array[1 + 1] == 10);
    local c = __new(Array, '1', '2', '3');
    assert(c[0 + 1] == '1');
    local myArray;
    myArray = __new(Array, 'Bob', 'Fred');
    assert(myArray[0 + 1] == "Bob");
    assert(myArray[1 + 1] == "Fred");
    for a,_ in ipairs(myArray) do a = a - 1 
        do
        tprint:putinline('<' .. a .. '>:' .. myArray[a + 1] .. ',');
        end
        ::continue::
    end
    assert(tprint:getAndClear() == '<0>:Bob,<1>:Fred,');
    local myArray2 = {};
    myArray2[0 + 1] = 'a';
    myArray2[1 + 1] = 'b';
    assert(myArray2[0 + 1] == 'a');
    assert(myArray2[1 + 1] == 'b');
    for a,_ in ipairs(myArray2) do a = a - 1 
        do
        tprint:putinline('<' .. a .. '>:' .. myArray2[a + 1] .. ',');
        end
        ::continue::
    end
    assert(tprint:getAndClear() == '<0>:a,<1>:b,');
    local myArray3;
    myArray3 = {};
    myArray3['a'] = 'a boy';
    myArray3['b'] = 'b boy';
    assert(myArray3['a'] == 'a boy');
    assert(myArray3['b'] == 'b boy');
    for a,_ in pairs(myArray3) do  
        do
        tprint:putinline('<' .. a .. '>:' .. myArray3[a] .. ',');
        end
        ::continue::
    end
    assert(tprint:getAndClear() == '<a>:a boy,<b>:b boy,');
    myArray = {};
    myArray[0 + 1] = "Bob";
    myArray[1 + 1] = "Fred";
    myArray[2 + 1] = "Tree";
    assert(myArray[0 + 1] == "Bob");
    assert(myArray[1 + 1] == "Fred");
    assert(myArray[2 + 1] == "Tree");
    local myTuple = __new(Array, 3, "three");
    assert(myTuple[0 + 1] == 3);
    assert(myTuple[1 + 1] == "three");
    local arr2 = __new(Array, 1, 2, 3, 4);
    assert(arr2.length == 4);
    local arr3 = __new(Array, 4);
    assert(arr3.length == 4);
    assert(arr3[0 + 1] == 0);
    assert(arr3[1 + 1] == 0);
    assert(arr3[3 + 1] == 0);
    local arr4 = __new(Array, '4');
    assert(arr4.length == 1);
    local arr5 = __new(Array, 10, 20, 30, 40);
    local rt = arr5:reduceRight(function (previousValue, currentValue, currentIndex, array)
        tprint:putinline('pv:' .. previousValue .. ';');
        tprint:putinline('cv:' .. currentValue .. ';');
        tprint:putinline('idx:' .. currentIndex .. ';|');
        assert(array[currentIndex + 1] == currentValue);
        return 100;
    end);
    assert(tprint:getAndClear() == 'pv:40;cv:30;idx:2;|pv:100;cv:20;idx:1;|pv:100;cv:10;idx:0;|');
    assert(rt == 100);
    rt = arr5:reduce(function (previousValue, currentValue, currentIndex, array)
        tprint:putinline('pv:' .. previousValue .. ';');
        tprint:putinline('cv:' .. currentValue .. ';');
        tprint:putinline('idx:' .. currentIndex .. ';|');
        assert(array[currentIndex + 1] == currentValue);
        return 100;
    end);
    assert(tprint:getAndClear() == 'pv:10;cv:20;idx:1;|pv:100;cv:30;idx:2;|pv:100;cv:40;idx:3;|');
    assert(rt == 100);
    local f = __new(Array, 20, 40);
    local rt2 = arr5:filter(function (currentValue, currentIndex, array)
        assert(array[currentIndex + 1] == currentValue);
        return (currentValue ~= f[0 + 1] and currentValue ~= f[1 + 1]);
    end);
    assert(rt2.length == 2);
    assert(rt2[0 + 1] == 10);
    assert(rt2[1 + 1] == 30);
    local rt3 = arr5:map(function (currentValue, currentIndex, array)
        assert(array[currentIndex + 1] == currentValue);
        return currentValue * currentValue;
    end);
    assert(rt3.length == 4);
    assert(rt3[0 + 1] == 10 * 10);
    assert(rt3[1 + 1] == 20 * 20);
    assert(rt3[2 + 1] == 30 * 30);
    assert(rt3[3 + 1] == 40 * 40);
    local sum = 0;
    arr5:forEach(function (currentValue, currentIndex, array)
        assert(array[currentIndex + 1] == currentValue);
        sum  = sum+( currentValue);
    end);
    assert(sum == 10 + 20 + 30 + 40);
    local rt4 = arr5:some(function (currentValue, currentIndex, array)
        assert(array[currentIndex + 1] == currentValue);
        if (currentValue == 30) then
            return true;
        end
        return false;
    end);
    assert(rt4 == true);
    local rt5 = arr5:some(function (currentValue, currentIndex, array)
        return false;
    end);
    assert(rt5 == false);
    local rt6 = arr5:every(function (currentValue, currentIndex, array)
        assert(array[currentIndex + 1] == currentValue);
        if (currentValue == 30) then
            return true;
        end
        return false;
    end);
    assert(rt6 == false);
    local rt7 = arr5:every(function (currentValue, currentIndex, array)
        assert(array[currentIndex + 1] == currentValue);
        return true;
    end);
    assert(rt7 == true);
    local arr8 = __new(Array, "Banana", "Orange", "Apple", "Mango", "Banana", "Orange", "Apple");
    local rt8 = arr8:lastIndexOf("Apple");
    assert(rt8 == 6);
    rt8 = arr8:lastIndexOf("Apple", 4);
    assert(rt8 == 2);
    rt8 = arr8:lastIndexOf("Apple", 2);
    assert(rt8 == 2);
    rt8 = arr8:lastIndexOf("Apple", 1);
    assert(rt8 == -1);
    rt8 = arr8:lastIndexOf("Apple", 0);
    assert(rt8 == -1);
    rt8 = arr8:indexOf("Apple");
    assert(rt8 == 2);
    rt8 = arr8:indexOf("Apple", 1);
    assert(rt8 == 2);
    rt8 = arr8:indexOf("Apple", 2);
    assert(rt8 == 2);
    rt8 = arr8:indexOf("Apple", 3);
    assert(rt8 == 6);
    rt8 = arr8:indexOf("Apple", 9);
    assert(rt8 == -1);
    local arr9 = __new(Array, "Banana");
    arr9:unshift("Lemon", "Pineapple");
    assert(arr9.length == 3);
    assert(arr9[0 + 1] == 'Lemon');
    assert(arr9[1 + 1] == 'Pineapple');
    assert(arr9[2 + 1] == 'Banana');
    local arr10 = __new(Array, "Banana", "Orange", "Apple", "Mango");
    arr10:splice(2, 1, "Lemon", "Kiwi");
    assert(arr10.length == 5);
    assert(arr10[0 + 1] == 'Banana');
    assert(arr10[1 + 1] == 'Orange');
    assert(arr10[2 + 1] == 'Lemon');
    assert(arr10[3 + 1] == 'Kiwi');
    assert(arr10[4 + 1] == 'Mango');
    arr10 = __new(Array, "Banana", "Orange", "Apple", "Mango");
    arr10:splice(2, 2);
    assert(arr10.length == 2);
    assert(arr10[0 + 1] == 'Banana');
    assert(arr10[1 + 1] == 'Orange');
    local arr11 = __new(Array, 1, 3, 2, 5);
    arr11:sort(function (a1, a2)
        return a1 - a2;
    end);
    assert(arr11[0 + 1] == 1);
    assert(arr11[1 + 1] == 2);
    assert(arr11[2 + 1] == 3);
    assert(arr11[3 + 1] == 5);
    arr11 = __new(Array, 1, 3, 2, 5);
    arr11:sort(function (a1, a2)
        return a2 - a1;
    end);
    assert(arr11[0 + 1] == 5);
    assert(arr11[1 + 1] == 3);
    assert(arr11[2 + 1] == 2);
    assert(arr11[3 + 1] == 1);
    local arr12 = __new(Array, 1, 2, 3, 4);
    local rt12 = arr12:slice();
    assert(rt12.length == 4);
    assert(rt12[0 + 1] == 1);
    assert(rt12[1 + 1] == 2);
    assert(rt12[2 + 1] == 3);
    assert(rt12[3 + 1] == 4);
    rt12[3 + 1] = 10;
    assert(arr12[3 + 1] == 4);
    rt12 = arr12:slice(-2, -1);
    assert(rt12.length == 1);
    assert(rt12[0 + 1] == 3);
    rt12 = arr12:slice(-2);
    assert(rt12.length == 2);
    assert(rt12[0 + 1] == 3);
    assert(rt12[1 + 1] == 4);
    rt12 = arr12:slice(2);
    assert(rt12.length == 2);
    assert(rt12[0 + 1] == 3);
    assert(rt12[1 + 1] == 4);
    rt12 = arr12:slice(-2, -2);
    assert(rt12.length == 0);
    rt12 = arr12:slice(1, 2);
    assert(rt12.length == 1);
    assert(rt12[0 + 1] == 2);
    rt12 = arr12:slice(1, 7);
    assert(rt12.length == 3);
    assert(rt12[0 + 1] == 2);
    assert(rt12[1 + 1] == 3);
    assert(rt12[2 + 1] == 4);
    rt12 = arr12:slice(-100, 7);
    assert(rt12.length == 4);
    assert(rt12[0 + 1] == 1);
    assert(rt12[1 + 1] == 2);
    assert(rt12[2 + 1] == 3);
    assert(rt12[3 + 1] == 4);
    rt12 = arr12:slice(-100, -99);
    assert(rt12.length == 0);
    local arr13 = __new(Array, 1, 2, 3, 4);
    assert(arr13:shift() == 1);
    assert(arr13.length == 3);
    assert(arr13:shift() == 2);
    assert(arr13.length == 2);
    assert(arr13:shift() == 3);
    assert(arr13.length == 1);
    assert(arr13:shift() == 4);
    assert(arr13.length == 0);
    assert(arr13:shift() == null);
    assert(arr13.length == 0);
    assert(arr13:shift() == undefined);
    local arr14 = __new(Array, 1, 3, 2);
    arr14:reverse();
    assert(arr14[0 + 1] == 2);
    assert(arr14[1 + 1] == 3);
    assert(arr14[2 + 1] == 1);
    arr14 = __new(Array, 1, 3, 2, 5);
    arr14:reverse();
    assert(arr14[0 + 1] == 5);
    assert(arr14[1 + 1] == 2);
    assert(arr14[2 + 1] == 3);
    assert(arr14[3 + 1] == 1);
    local arr15 = __new(Array, "George", "John", "Thomas");
    assert(arr15:join() == "George,John,Thomas");
    assert(arr15:join(".") == "George.John.Thomas");
    local arr16 = __new(Array, 3);
    arr16[0 + 1] = "George";
    arr16[1 + 1] = "John";
    arr16[2 + 1] = "Thomas";
    local arr16_1 = __new(Array, 3);
    arr16_1[0 + 1] = "James";
    arr16_1[1 + 1] = "Adrew";
    arr16_1[2 + 1] = "Martin";
    local arr16_2 = __new(Array, 2);
    arr16_2[0 + 1] = "William";
    arr16_2[1 + 1] = "Franklin";
    local rt16 = arr16:concat();
    assert(rt16[0 + 1] == 'George');
    assert(rt16[1 + 1] == 'John');
    assert(rt16[2 + 1] == 'Thomas');
    rt16[0 + 1] = 'qjb';
    assert(arr16[0 + 1] == 'George');
    rt16 = arr16:concat('qjb', arr16_1, 2, arr16_2);
    assert(rt16.length == 10);
    assert(rt16[0 + 1] == 'George');
    assert(rt16[1 + 1] == 'John');
    assert(rt16[2 + 1] == 'Thomas');
    assert(rt16[3 + 1] == 'qjb');
    assert(rt16[4 + 1] == 'James');
    assert(rt16[5 + 1] == 'Adrew');
    assert(rt16[6 + 1] == 'Martin');
    assert(rt16[7 + 1] == 2);
    assert(rt16[8 + 1] == 'William');
    assert(rt16[9 + 1] == 'Franklin');
    local arr17 = __new(Array, 1, 2, 3, 4);
    assert(arr17:pop() == 4);
    assert(arr17.length == 3);
    assert(arr17:pop() == 3);
    assert(arr17.length == 2);
    assert(arr17:pop() == 2);
    assert(arr17.length == 1);
    assert(arr17:pop() == 1);
    assert(arr17.length == 0);
    assert(arr17:pop() == null);
    assert(arr17.length == 0);
    assert(arr17:pop() == undefined);
    local arr18 = __new(Array, 1, 2);
    arr18:push(3);
    arr18:push(4, 5);
    assert(arr18[0 + 1] == 1);
    assert(arr18[1 + 1] == 2);
    assert(arr18[2 + 1] == 3);
    assert(arr18[3 + 1] == 4);
    assert(arr18[4 + 1] == 5);
    local arr19 = __new(Array, 1, 2, '3');
    assert(arr19:toString() == '1,2,3');
    assert(arr19:toLocaleString() == '1,2,3');
    print('ok');
end
function test_function()
    function buildName(firstName, lastName)
        if (lastName == nil) then lastName = "Smith"; end
        return firstName .. " " .. lastName;
    end
    assert(buildName("Bob") == 'Bob Smith');
    assert(buildName("Bob", "Adams") == 'Bob Adams');
    function buildName2(firstName, ...)
        local restOfName = __new(Array); local __restP = {...}
        for _, p in ipairs(__restP) do
            restOfName:push(p)
        end
        return firstName .. " " .. restOfName:join(" ");
    end
    local employeeName = buildName2("Joseph", "Samuel", "Lucas", "MacKinzie");
    assert(employeeName == 'Joseph Samuel Lucas MacKinzie');
    --[[ /** not support
    var deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function() {
            // Notice: the line below is now a lambda, allowing us to capture 'this' earlier
            return () => {
                var pickedCard = Math.floor(Math.random() * 52);
                var pickedSuit = Math.floor(pickedCard / 13);
                
                return {suit: this.suits[pickedSuit], card: pickedCard % 13};  // not support this
            }
        }
    }

    var cardPicker = deck.createCardPicker();
    var pickedCard = cardPicker();

    alert("card: " + pickedCard.card + " of " + pickedCard.suit);
    */ ]]
end
function test_lambda()
    print('----- (x)=> x*x ----- ');
    local a = function (x) return x * x; end;
    assert(a(10) == 100);
    print('ok');
end
local CustomError = (function () 
    local CustomError = {}
    CustomError.constructor = function (this)
        this.code = 100;
    end;
    return CustomError;
end)();
function test_tryStatement()
    print('----- ThrowStatement, TryStatement, CatchClause -----');
    xpcall(function() -- try
        tprint:putinline('try;');
    end,function (err) -- catch 
        tprint:putinline('catch;');
    end)
    do -- finally
        tprint:putinline('finally;');
    end
    assert(tprint:getAndClear() == 'try;finally;');
    xpcall(function() -- try
        tprint:putinline('try;');
        error (__new(CustomError));
        tprint:putinline('try2;');
    end,function (err) -- catch 
        tprint:putinline('catch;');
        tprint:putinline(err.code .. ';');
    end)
    do -- finally
        tprint:putinline('finally;');
    end
    assert(tprint:getAndClear() == 'try;catch;100;finally;');
    print('ok');
end
local Color;
Color = Color or {}
(function (Color)
    Color[0] = "Red";Color["Red"] = 0;
    Color[1] = "Green";Color["Green"] = 1;
    Color[2] = "Blue";Color["Blue"] = 2;
end)(Color)
;
local Color2;
Color2 = Color2 or {}
(function (Color2)
    Color2[0] = "Red";Color2["Red"] = 0;
    Color2[3] = "Green";Color2["Green"] = 3;
    Color2[4] = "Blue";Color2["Blue"] = 4;
end)(Color2)
function test_enum()
    print('----- enum ----- ');
    assert(Color.Red == 0);
    assert(Color.Green == 1);
    assert(Color.Blue == 2);
    assert(Color2.Red == 0);
    assert(Color2.Green == 3);
    assert(Color2.Blue == 4);
    print('ok');
end
function test_dict()
    print('----- dict ----- ');
    function createSquare(config)
        local newSquare = { color= "white", area= 100 };
        if (config.color) then 
            newSquare.color = config.color;
        end
        if (config.width) then 
            newSquare.area = config.width * config.width;
        end
        return newSquare;
    end
    local mySquare = createSquare({ color= "black", width= 20 });
    assert(mySquare.area == 400);
    assert(mySquare.color == 'black');
    print('ok');
end
local Validation=Validation or {};
(function (Validation) 
    local lettersRegexp = __new(RegExp, [[/^[A-Za-z]+$/]], "", true);
    local numberRegexp = __new(RegExp, [[/^[0-9]+$/]], "", true);
    local LettersOnlyValidator = (function () 
        local LettersOnlyValidator = {}
        LettersOnlyValidator.constructor = function (this)
        end;
        LettersOnlyValidator.isAcceptable = function (this, s)
            return lettersRegexp:test(s);
        end;
        return LettersOnlyValidator;
    end)();
    Validation.LettersOnlyValidator = LettersOnlyValidator;
    local ZipCodeValidator = (function () 
        local ZipCodeValidator = {}
        ZipCodeValidator.constructor = function (this)
        end;
        ZipCodeValidator.isAcceptable = function (this, s)
            return s:len() == 5 and numberRegexp:test(s);
        end;
        return ZipCodeValidator;
    end)();
    Validation.ZipCodeValidator = ZipCodeValidator;
end)(Validation);
local demo = require('./test_going_external')
local Circle = require('./test_export_one')
local Shapes=Shapes or {};
(function (Shapes) 
    Shapes.Polygons=Shapes.Polygons or {};
    (function (Polygons) 
        local Triangle = (function () 
            local Triangle = {}
            Triangle.constructor = function (this)
            end;
            return Triangle;
        end)();
        Polygons.Triangle = Triangle;
        local Square = (function () 
            local Square = {}
            Square.constructor = function (this, r)
                this._r = 0;
                this._r = r;
            end;
            Square.getR = function (this)
                return this._r;
            end;
            return Square;
        end)();
        Polygons.Square = Square;
    end)(Shapes.Polygons);
end)(Shapes);
local polygons = Shapes.Polygons;
function test_export_module_require()
    print('----- export module require ----- ');
    --[[ // Some samples to try ]]
    local strings = __new(Array, 'Hello', '98052', '101');
    --[[ // Validators to use ]]
    local validators = {};
    validators['ZIP code'] = __new(Validation.ZipCodeValidator);
    validators['Letters only'] = __new(Validation.LettersOnlyValidator);
    --[[ // Show whether each string passed each validator ]]
    strings:forEach(function (s)
        for name,_ in pairs(validators) do  
            do
            tprint:put('"' .. s .. '" ' .. (validators[name]:isAcceptable(s) and ' matches ' or ' does not match ') .. name);
            end
            ::continue::
        end
    end);
    assert(tprint:getAndClear() == '"Hello"  does not match ZIP code\n"Hello"  matches Letters only\n"98052"  matches ZIP code\n"98052"  does not match Letters only\n"101"  does not match ZIP code\n"101"  does not match Letters only\n');
    assert((__new(demo.Persion, 'qjb')):getName() == 'qjb');
    assert((__new(demo.Rect, 10)):getArea() == 10 * 10);
    assert((__new(Circle, 10)):getR() == 10);
    local sq = __new(polygons.Square, 10);
    assert(sq:getR() == 10);
    --[[ /** not support
    function buildLabel(name: string): string {
        return buildLabel.prefix + name + buildLabel.suffix;
    }
    module buildLabel {
        export var suffix = "";
        export var prefix = "Hello, ";
    }
    print(buildLabel("Sam Smith"));
    */ ]]
    print('ok');
end
function test_math()
    print('----- Math lib ----- ');
    assert(Math:max(1, 3, 2, 4, 1) == 4);
    assert(Math:min(1, 3, 2, 4, 1) == 1);
    assert(Math:round(0.5) == 1);
    assert(Math:round(0.99999) == 1);
    assert(Math:round(0.49999) == 0);
    assert(Math:pow(2, 8) == 256);
    print('ok');
end
--[[ //------------------------------- ]]
function test_all()
    test_class();
    test_continue_for();
    test_continue_for_in();
    test_continue_for_of();
    test_while();
    test_do_while();
    test_if();
    test_prefixUnaryExpressionAndPostfixUnaryExpression();
    test_binaryExpression();
    test_bitBinaryExpression();
    test_threeElemBinaryExpression();
    test_threeElemBitBinaryExpression();
    test_conditional();
    test_get_set();
    test_switch();
    test_rawString();
    test_string();
    test_regExp();
    test_array();
    test_function();
    test_lambda();
    test_tryStatement();
    test_enum();
    test_dict();
    test_export_module_require();
    test_math();
    --[[ //test_withStatement() ]]
    print('[all test ok!]');
end
test_all();
--# sourceMappingURL=test.lua.map