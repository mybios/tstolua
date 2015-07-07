require('lua_libs');local __exports = {};local __export=nil
local Root = (function (_super) 
    local Root = {}
    __extends(Root, _super);
    Root.constructor = function (this, ...)
        _super.constructor(this, ...);
    end;
    Root.main = function (this)
        this:init();
        this:start();
        this:run();
        this:destroy();
    end;
    Root.init = function (this)
    end;
    Root.reinit = function (this)
    end;
    Root.start = function (this)
    end;
    Root.run = function (this)
    end;
    Root.destroy = function (this)
    end;
    return Root;
end)(SModule);
__exports.Root = Root;
return __exports;
--# sourceMappingURL=root.lua.map