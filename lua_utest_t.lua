require('lua_libs');local __exports = {};
local __unit_test_assert_tag = '<<<unit_assert>>>'
local __mapfiles = {}

local Print = function(...)
	print(...)
end;

local __map_to_source_file = function(s)
	return s
end;

local __xpcall_errorhdr = function(err)
 	local stacks = String.split(debug.traceback(), '\n')
	local _, endpos = string.find(err, __unit_test_assert_tag)
	if endpos ~= nil and table.getn(stacks) >= 5 then
		local line = String.trim(stacks[5])
		line, _ = string.gsub(line, '(.*:%d+:).*', '%1 ')
		Print( line..string.sub(err, endpos + 1) )
	else
		Print(err)
		for i=1, table.getn(stacks), 1 do
			Print( __map_to_source_file(String.trim(stacks[i])) )
		end
	end
end;

local assertEqual = function(a,b,msg)
	if msg == nil then 	
		msg = __unit_test_assert_tag .. 'assertion failed!'
	else
		msg = __unit_test_assert_tag .. msg
	end
	assert(a==b, msg)
end

local Result = (function ()
    local Result = {}
    Result.constructor = function (this)
		this.runCount = 0
		this.failedCount = 0
    end;
	
	Result.testStarted = function(this)
		this.runCount = this.runCount + 1
	end;
	
	Result.testFailed = function(this)
		this.failedCount = this.failedCount + 1
	end;
	
	Result.summary = function(this)
		return string.format('%d run, %d failed', this.runCount, this.failedCount)
	end;
	
    return Result;
end)();

local Case = (function () 
    local Case = {}
    Case.constructor = function (this, name, classname)
		this.name = name
		this.classname = classname
    end;
	
	Case.getClassName = function(this)
		return this.classname
	end;
	
	Case.setUp = function(this)
	end;
	
	Case.run = function(this, result)
		result = result or __new(Result)
		result:testStarted()
		local status, _ = xpcall( function()  this:setUp()  end,  __xpcall_errorhdr)
		if not status then
			result:testFailed()
			return result
		end
		
		status, _ = xpcall( function() this[this.name](this) end, __xpcall_errorhdr)
		if not status then
			result:testFailed()
			Print('    [casename]: '..this.name)
			this:tearDown()
			return result
		end
		
		status, _ = xpcall( function() this:tearDown() end, __xpcall_errorhdr)
		if not status then
			result:testFailed()
		end
		return result
	end;
	
	Case.tearDown = function(this)
	end;	
	
    return Case;
end)();

local Suite = (function () 
    local Suite = {}
    Suite.constructor = function (this)
		this.cases = {}
    end;
	
	Suite.addCase = function(this, case, classname)
		classname = classname or ''
		for k, f in pairs(case) do
			local p, _ = string.find(k,'test')
			if p == 1 and type(f) == 'function' then
				this:add(__new(case, k, classname))
			end
		end
	end;
	
	Suite.run = function(this, result, needcases)
		result = result or __new(Result)
		for i, t in ipairs(this.cases) do
			if this:isNeedRun(t, needcases) then
				t:run(result)
			end
		end
		return result
	end;
	
	Suite.add = function(this, case)
		table.insert(this.cases, case)
	end;	
	
	Suite.isNeedRun = function(this, curcase, needcases)
		if needcases == nil or #needcases == 0 then
			return true
		end
		
		for _, needTestName in ipairs(needcases) do
			if curcase:getClassName() == needTestName then 
				return true
			end
		end
		return false
	end;
	
    return Suite;
end)();

__exports.assertEqual = assertEqual
__exports.Print = Print
__exports.Result = Result
__exports.Case = Case
__exports.Suite = Suite
return __exports
