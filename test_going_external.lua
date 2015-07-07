require('lua_libs');local __exports = {};local __export=nil
local Persion = (function () 
    local Persion = {}
    Persion.constructor = function (this, name)
        this._name = name;
    end;
    Persion.getName = function (this)
        return this._name;
    end;
    return Persion;
end)();
__exports.Persion = Persion;
local Rect = (function () 
    local Rect = {}
    Rect.constructor = function (this, w)
        this._w = w;
    end;
    Rect.getArea = function (this)
        return this._w * this._w;
    end;
    return Rect;
end)();
__exports.Rect = Rect;
return __exports;
--# sourceMappingURL=test_going_external.lua.map