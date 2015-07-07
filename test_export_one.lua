require('lua_libs');local __exports = {};local __export=nil
local Circle = (function () 
    local Circle = {}
    Circle.constructor = function (this, r)
        this._r = r;
    end;
    Circle.getR = function (this)
        return this._r;
    end;
    return Circle;
end)();
__export = Circle;
return __export;
--# sourceMappingURL=test_export_one.lua.map