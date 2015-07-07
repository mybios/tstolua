require('lua_libs');local __exports = {};local __export=nil
local Case = (function () 
    local Case = {}
    Case.constructor = function (this)
        this.name = '';
        print('aaa');
    end;
    Case.setUp = function (this)
    end;
    Case.run = function (this)
        this[this.name](this);
    end;
    Case.tearDown = function (this)
    end;
    return Case;
end)();
local Case2 = (function (_super) 
    local Case2 = {}
    __extends(Case2, _super);
    Case2.constructor = function (this, ...)
        _super.constructor(this, ...);
    end;
    return Case2;
end)(Case);
local arr = Array();
function test_function(cc)
    __new(cc);
end
test_function(Case);
arr:push(Case);
arr:push(Case2);
--# sourceMappingURL=test_t.lua.map