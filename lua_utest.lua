require('lua_libs');local __exports = {};local __export=nil
--[[ ///<reference path="lua_common.d.ts"/> ]]
local sm = require('lua_sourcemap')
local __err_tag = '<<<unit_assert>>>';
local __errorhdr = function (err)
    local stacks = String.split(debug.traceback(),'\n');
    local err_tag_pos = String.indexOf(err,__err_tag);
    if (err_tag_pos >= 0 and stacks.length > 5) then 
        local line = String.trim(stacks[5 + 1]);
        local arr = String.split(line,':');
        local filename = arr[0 + 1];
        local lineno = arr[1 + 1];
        local rt = sm:getSourceLine(filename, tonumber(lineno));
        line = rt.file .. ':' .. rt.line .. ': ';
        print(line .. String.slice(err,err_tag_pos + __err_tag:len()));
    else 
        print(err);
        for _, st in pairs(stacks) do  
            do
            print(String.trim(st));
            end
            ::continue::
        end
    end
end;
function assertEqual(a, b, msg)
    if (msg) then 
        msg = __err_tag .. msg;
    else 
        msg = __err_tag .. 'assertion failed!';
    end
    assert(a == b, msg);
end
__exports.assertEqual = assertEqual;
local Result = (function () 
    local Result = {}
    Result.constructor = function (this)
        this.runCount = 0;
        this.failedCount = 0;
    end;
    Result.testStarted = function (this)
        this.runCount = this.runCount + 1;
    end;
    Result.testFailed = function (this)
        this.failedCount = this.failedCount + 1;
    end;
    Result.summary = function (this)
        return this.runCount .. ' run, ' .. this.failedCount .. ' failed';
    end;
    return Result;
end)();
__exports.Result = Result;
local Case = (function () 
    local Case = {}
    Case.constructor = function (this)
    end;
    Case.setUp = function (this)
    end;
    Case.run = function (this, result)
        result = result or __new(Result);
        local caseClass = classof(this);
        for fieldName,_ in pairs(caseClass) do  
            do
            if (typeof(fieldName) ~= 'string') then
                goto continue
            end
            local sname = fieldName;
            if ((String.indexOf(sname,'test') == 0) and typeof(caseClass[sname]) == 'function') then 
                this:innerRun(result, sname);
            end
            end
            ::continue::
        end
    end;
    Case.innerRun = function (this, result, name)
        result = result or __new(Result);
        this:setUpRun(result, name);
        this:testRun(result, name);
        this:tearDownRun(result, name);
    end;
    Case.setUpRun = function (this, result, name)
        result:testStarted();
        xpcall(function() -- try
            this:setUp();
        end,function (err) -- catch 
            __errorhdr(err);
            result:testFailed();
            print('  [case]: ' .. name);
        end)
    end;
    Case.testRun = function (this, result, name)
        xpcall(function() -- try
            this[name](this);
        end,function (err) -- catch 
            __errorhdr(err);
            result:testFailed();
            print('  [case]: ' .. name);
        end)
    end;
    Case.tearDownRun = function (this, result, name)
        xpcall(function() -- try
            this:tearDown();
        end,function (err) -- catch 
            __errorhdr(err);
            result:testFailed();
            print('  [case]: ' .. name);
        end)
    end;
    Case.tearDown = function (this)
    end;
    return Case;
end)();
__exports.Case = Case;
local Suite = (function () 
    local Suite = {}
    Suite.constructor = function (this)
        this._cases = __new(Array);
    end;
    Suite.addCase = function (this, caseObject)
        this._cases:push(caseObject);
    end;
    Suite.run = function (this, result, needcases)
        result = result or __new(Result);
        for _, caseObject in pairs(this._cases) do  
            do
            if (this:isNeedRun(caseObject, needcases)) then 
                caseObject:run(result);
            end
            end
            ::continue::
        end
        return result;
    end;
    Suite.isNeedRun = function (this, caseObject, needcases)
        if (needcases == null or needcases.length == 0) then
            return true;
        end
        for _, caseClass in pairs(needcases) do  
            do
            if (classof(caseObject) == caseClass) then 
                return true;
            end
            end
            ::continue::
        end
        return false;
    end;
    return Suite;
end)();
__exports.Suite = Suite;
return __exports;
--# sourceMappingURL=lua_utest.lua.map