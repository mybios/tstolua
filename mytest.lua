require('lua_libs');local __exports = {};local __export=nil
--[[ ///<reference path="lua_common.d.ts"/> ]]
local utest = require('lua_utest')
local MyTestCase = (function (_super) 
    local MyTestCase = {}
    __extends(MyTestCase, _super);
    MyTestCase.constructor = function (this, ...)
        _super.constructor(this, ...);
    end;
    MyTestCase.setUp = function (this)
    end;
    MyTestCase.tearDown = function (this)
    end;
    MyTestCase.test_first = function (this)
        utest.assertEqual(1, 2, 'ok');
    end;
    MyTestCase.test_sec = function (this)
        utest.assertEqual(null, 0, 'failed');
    end;
    return MyTestCase;
end)(utest.Case);
local suite = __new(utest.Suite);
suite:addCase(__new(MyTestCase));
local starttime = os.clock();
local result = suite:run();
local needtime = os.clock() - starttime;
print('--------------------------------------');
print(result:summary(), 'sec:' .. needtime);
print('--------------------------------------');
--# sourceMappingURL=mytest.lua.map