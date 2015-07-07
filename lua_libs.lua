--https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?hl=en_US&pli=1&pli=1#heading=h.qz3o9nc69um5
null = nil
local re = require("lua_regex")
local __inner_errors = {
	array_filter_not_support_thisArg = 'LUA_Error_1002: array.filter not support thisArg param in lua!',
	array_map_not_support_thisArg = 'LUA_Error_1003: array.map not support thisArg param in lua!',
	array_forEach_not_support_thisArg = 'LUA_Error_1004: array.forEach not support thisArg param in lua!',
	array_some_not_support_thisArg = 'LUA_Error_1005: array.some not support thisArg param in lua!',
	array_every_not_support_thisArg = 'LUA_Error_1006: array.every not support thisArg param in lua!',
}

__extends = function(sub, base)
	setmetatable(sub, base)
	if base.__getters == nil then
		base.__index = base
	end
end;
__new = function(class, ...)
	local new={}
	__extends(new, class)
	if new.constructor ~= nil then
		new:constructor(...)
	end
	return new
end;

classof = function(object)
    return getmetatable(object)
end

typeof = function(x)
	local t = type(x)
	if t == 'table' then return 'object'
	else return t; end
end

__add_attrs_getters_setters = function(class)
	if class.__getters ~= nil then
		return
	end
	class.__getters = {}
	class.__setters = {}
	class.__index = function(this, index)
		local getter = class.__getters[index]
		if getter ~= nil then
			return getter(this)
		else
			return class[index]
		end
	end
	class.__newindex = function(this, index, value )
		local setter = class.__setters[index]
		if setter ~= nil then
			setter(this, value)
		else
			rawset(this, index, value)
		end
	end
end;

__switch_return_break = 1
__switch_return_return = 2
switch = function(t)
	t.case = function (self,x)
		local startfunid = self[x] or self.default
		if startfunid == nil then
			return
		end		
		local len = #self.__codesegments
		for fid=startfunid, len do
			local f = self.__codesegments[fid]
			if f ~= 0 then
				local rtflag, rt = f(x, self)
				if rtflag ~= nil then
					return rtflag, rt 
				end
			end
		end
	end;
	return t
end;
--[[ example
local a = switch{
	[1] = 1,
	[2] = 2,
	default = 3,
	__codesegments = {
		[1] = function(x) print('case:', 1); end,
		[2] = function(x) print('case:', 2); return __switch_return_break; end,
		[3] = function(x) print('default:', 0); return __switch_return_return, 'default'; end,
	},
}
local rtflag, rt = a:case(1)
if rtflag == __switch_return_return then
	print ( 'rt:', rt )
end
print ( '----' )
rtflag, rt = a:case(2)
if rtflag == __switch_return_return then
	print ( 'rt:', rt )
end
print ( '----' )
rtflag, rt = a:case(3)
if rtflag == __switch_return_return then
	print ( 'rt:', rt )
end
]]

Array = (function () 
    local Array = {}
    Array.constructor = function (this, ...)
		local params = {...}
		if #params == 1 then
			local p = params[1]
			if type(p) == 'number' then
				for i=1, p do
					table.insert(this, 0)
				end
			else
				table.insert(this, p)
			end
		else
			for _,v in ipairs(params) do
				table.insert(this, v)
			end
		end
    end;
	
    Array.toString = function(this)
		return this:join()
	end;
	
	Array.toLocaleString = function(this)
		return this:join()
	end;
	
	Array.push = function(this, ...)
		for _,v in ipairs({...}) do
			table.insert(this, v)
		end
	end;
	
	Array.pop = function(this)
		local len = #this
		local back = this[len]
		table.remove(this, len)
		return back
	end;
	
	Array.concat = function(this, ...)
		local arr = __new(Array);
		for _, a in ipairs(this) do
			arr:push(a)
		end
		
		local ts = {...}
		for _, v in pairs(ts) do
			if classof(v) == Array then
				for _, a in ipairs(v) do
					arr:push(a)
				end
			else
				arr:push(v)
			end
		end
		return arr
	end;
	
	Array.join = function(this, separator)
		separator = separator or ','
		local s = ''
		local len = #this
		if len >= 1 then
			s = s .. this[1]
		end
		for i=2, len do
			s = s .. separator
			s = s .. this[i]
		end
		return s
	end;
	
	Array.reverse = function(this)
		local cnt = #this
		local partcnt = math.floor(cnt/2)
		for i=1, partcnt do
			local t = this[i]
			this[i] = this[cnt-i+1]
			this[cnt-i+1] = t
		end
		return this	
	end;
	
	Array.shift = function(this)
		local front = this[1];
		table.remove(this, 1);
		return front;
	end;
	
	Array.slice = function(this, start, send)
		local len = #this
	
		start = start or 0
		start = (start < 0) and (start + len) or start
		start = (start < 0) and 0 or start
		
		send = send or len
		send = (send < 0) and (send + len) or send
		send = (send < 0) and 0 or send
		send = (send > len) and len or send
		send = send - 1
		
		local arr = __new(Array);
		for i=start, send do
			arr:push(this[i+1])
		end
		return arr;
	end;
	
	Array.sort = function(this, compfun)
		table.sort(this, function(a, b)
			return compfun(a,b) < 0
		end);
	end;
	
	Array.splice = function(this, from, removeCount, ...)
		local addArgs = {...}
		cnt = #this
		if from == nil then from = 0 end
		if from < 0 then from = 0 end
		if from > cnt then return end
		if removeCount == nil then removeCount = 0 end
		if removeCount + from > cnt then
			removeCount = cnt - from
		end
		from = from + 1
		
		for pos=from, from+removeCount-1 do
			table.remove(this, from)
		end
		for pos, a in ipairs(addArgs) do
			table.insert(this, from+pos-1, a)
		end
	end;
	
	Array.unshift = function(this, ...)
		local addArgs = {...}
		for i, a in ipairs(addArgs) do
			table.insert(this, i, a)
		end
	end;
	
	Array.indexOf = function(this, val, from)
		from = from or 0
		cnt = #this
		for i=from+1, cnt do
			if this[i] == val then
				return i-1
			end
		end
		return -1
	end;
	
	Array.lastIndexOf = function(this, val, from)
		from = from or #this-1
		for i=from+1, 1, -1 do
			if this[i] == val then
				return i-1
			end
		end
		return -1
	end;

	Array.every = function(this, fun, thisArg)
		assert(thisArg==nil, __inner_errors.array_every_not_support_thisArg)
		local len = this.length
		for i=1, len do
			if fun(this[i], i-1, this) == false then
				return false
			end
		end
		return true
	end;
	
	Array.some = function(this, fun, thisArg)
		assert(thisArg==nil, __inner_errors.array_some_not_support_thisArg)
		local len = this.length
		for i=1, len do
			if fun(this[i], i-1, this) == true then
				return true
			end
		end
		return false
	end;
	
	Array.forEach = function(this, fun, thisArg)
		assert(thisArg==nil, __inner_errors.array_forEach_not_support_thisArg)
		local len = this.length
		for i=1, len do
			fun(this[i], i-1, this)
		end
	end;
	
	Array.map = function(this, fun, thisArg)
		assert(thisArg==nil, __inner_errors.array_map_not_support_thisArg)
		local arr = __new(Array)
		local len = this.length
		for i=1, len do
			arr:push(fun(this[i], i-1, this))
		end
		return arr
	end;
	
	Array.filter = function(this, fun, thisArg)
		assert(thisArg==nil, __inner_errors.array_filter_not_support_thisArg)
		local arr = __new(Array)
		local len = this.length
		for i=1, len do
			if ( fun(this[i], i-1, this) ) then
				arr:push(this[i])
			end
		end
		return arr
	end;
	
	Array.reduce = function(this, fun, initial)
		local len = this.length
		if len == 0 and initial == null then
		  return null
		end
		
		if initial == null then
			initial = this[1]
		end
		
		for i=2, len do
			initial = fun(initial, this[i], i-1, this)
		end
		
		return initial
	end;
	
	Array.reduceRight = function(this, fun, initial)
		local len = this.length
		if len == 0 and initial == null then
		  return null
		end
		
		if initial == null then
			initial = this[len]
		end
		
		for i=len-1, 1, -1 do
			initial = fun(initial, this[i], i-1, this)
		end
		
		return initial
	end;
	
	__add_attrs_getters_setters(Array)
	Array.__getters.length = function(this)
		return #this
	end;
	
	Array.__setters.length = function(this, length)
		local lastLen = #this
		if ( length > lastLen ) then
			local addLen = length - lastLen
			for i=1, addLen do
				this:push(0)
			end
		elseif length < lastLen and length >= 0 then
			local removeLen = lastLen - length
			this:splice(length, removeLen)
		end
	end;
	
    return Array;
end)();
local __Array_m = {
	__call = function(t, ...)
		return __new(Array, ...)
	end,
}
setmetatable(Array, __Array_m)

RegExp = (function () 
    local RegExp = {}
    RegExp.constructor = function (this, pattern, attributes, hasMark)
		this._lastIndex = 0
		this._global = attributes:find('g') ~= nil
		this._ignoreCase = attributes:find('i') ~= nil
		this._multiline = attributes:find('m') ~= nil
		if hasMark then
			pattern = pattern:sub(2, -2)
		end
		this._source = this._ignoreCase and RegExp.caseInsensitivePattern(pattern) or pattern
		
		local flags = 0
		if this._global then
			flags = bit.bor(flags, 0x01)
		end
		if this._ignoreCase then
			flags = bit.bor(flags, 0x02)
		end
		if this._multiline then
			flags = bit.bor(flags, 0x04)
		end		
		this._regex = re.compile(this._source, flags)
    end;
	
 	__add_attrs_getters_setters(RegExp)
	RegExp.__getters.lastIndex = function(this)
		return this._lastIndex
	end;
	RegExp.__setters.lastIndex = function(this, value)
		this._lastIndex = value
	end;
	RegExp.__getters.global = function(this)
		return this._global
	end;
	RegExp.__setters.global = function(this, value)
	end;
	RegExp.__getters.ignoreCase = function(this)
		return this._ignoreCase
	end;
	RegExp.__setters.ignoreCase = function(this, value)
	end;
	RegExp.__getters.multiline = function(this)
		return this._multiline
	end;
	RegExp.__setters.multiline = function(this, value)
	end;
	RegExp.__getters.source = function(this)
		return this._source
	end;
	RegExp.__setters.source = function(this, value)
	end;
	
	RegExp.compile = function(this)
		local reg = __new(RegExp, '', '')
		reg._lastIndex = 0
		reg._global = this._global
		reg._ignoreCase = this._ignoreCase
		reg._multiline = this._multiline
		reg._source = this._source
		reg._regex = this._regex
		return reg
	end;
	
	RegExp.exec = function(this, str)
		local lastIndex = this._global and this._lastIndex or 0
		local global_save = this._global
		this._global = false
		local arr = String.match(str, this, lastIndex)
		this._global = global_save
		if this._global then
			if arr ~= null then
				this._lastIndex = arr.lastIndex
			else
				this._lastIndex = 0
			end
		end
		return arr
	end;
	
	RegExp.test = function(this, str)
		return this:exec(str) ~= null
	end;
	
	RegExp.caseInsensitivePattern = function(pattern)
	  local p = pattern:gsub([[(\?)(.)]], function(percent, letter)
		if percent ~= "" or not letter:match("%a") then
		  -- if the '\' matched, or `letter` is not a letter, return "as is"
		  return percent .. letter
		else
		  -- else, return a case-insensitive character class of the matched letter
		  return string.format("[%s%s]", letter:lower(), letter:upper())
		end
	  end)
	  return p
	end;
	
	RegExp.getInnerObject = function(this)
		return this._regex
	end;

    return RegExp;
end)();

String = (function () 
    local String = {}
    String.constructor = function (this, s)
		this._s = s
		local arr = String.split(s, '')
		for i, a in ipairs(arr) do
			this[tostring(i-1)] = a;
		end
    end;
	
    String.toString = function(s)
		return s
	end;
	
    String.toLowerCase = function(s)
		s = String._getStr(s)
		return s:lower()
	end;
	
    String.toLocaleLowerCase = function(s)
		s = String._getStr(s)
		return s:lower()
	end;
	
    String.toUpperCase = function(s)
		s = String._getStr(s)
		return s:upper()
	end;
	
    String.toLocaleUpperCase = function(s)
		s = String._getStr(s)
		return s:upper()
	end;
	
    String.trim = function(s)
		s = String._getStr(s)
		return s:gsub('^%s*(.-)%s*$', '%1')
	end;
	
    String.substring = function(s, start, send)
		s = String._getStr(s)
		start = (start == nil) and 1 or (start + 1)
		send = (send == nil) and -1 or send
		return s:sub(start, send)
	end;
	
    String.substr = function(s, from, length)
		s = String._getStr(s)
		local start = (from == nil) and 1 or (from + 1)
		local send = (length == nil) and -1 or ( start + length - 1)
		return s:sub(start, send)
	end;	
	
	String.slice = function(s, start, send)
		s = String._getStr(s)
		if start == nil then
			return s
		end
		
		if send == nil then
			if  start < 0 then
				return s:sub(start)
			else
				return s:sub(start+1)
			end
		end
		
		if start >= send and send >= 0 then
			return ''
		end
		
		if start >= 0 then
			start = start + 1
		end
		
		if send < 0 then
			send = send - 1
		end
		
		return s:sub(start, send)
	end;
	
	String.charAt = function(s, index)
		s = String._getStr(s)
		return string.char(s:byte(index+1, index+1))
	end;
	
	String.charCodeAt = function(s, index)
		s = String._getStr(s)
		return s:byte(index+1, index+1)
	end;
	
	String.concat = function(s, concat_s)
		s = String._getStr(s)
		return s..concat_s
	end;
	
	String.localeCompare = function(s, target)
		s = String._getStr(s)
		if s > target then
			return 1
		elseif s == target then
			return 0
		else
			return -1
		end
	end;
	
	String.indexOf = function(s, subs, fromIndex)
		s = String._getStr(s)
		fromIndex = (fromIndex == nil) and 0 or fromIndex
		local i = s:find(subs, fromIndex+1)
		return (i==nil) and -1 or (i-1)
	end;
	
	String.lastIndexOf = function(s, subs, fromIndex)
		s = String._getStr(s)
		fromIndex = fromIndex or s:len()
		local i = -1
		local j, answer
		while true do
			answer = i
			i, j = string.find(s, subs, i + 1, true)
			if i == nil then break end
			if i > (fromIndex+1) then break end
		end
		return (answer<0) and answer or (answer-1)
	end;
	
	--
	String.split = function(s, p, maxCount)
		s = String._getStr(s)
		maxCount = maxCount ~= nil and maxCount or 0x7ffffff
		local isRegex = type(p) ~= 'string'
		local sp = (type(p) == 'string') and p or p.source
		if sp == '' then
			return String._split_by_empty(s, maxCount)
		end
		if isRegex then
			return String._split_by_p(s, p, maxCount)
		else
			return String._split_by_string(s, sp, maxCount)
		end
	end;	
	
	String._split_by_empty = function(s, maxCount)
		local arr = __new(Array)
		local pos = 1
		local len = s:len()
		local cnt = 0
		while ( pos <= len ) do
			if ( cnt == maxCount ) then
				break
			end
			arr:push( s:sub(pos, pos) )
			cnt = cnt + 1
			pos = pos + 1
		end
		return arr
	end;
	
	String._split_by_p = function(s, p, maxCount)
		local arr = __new(Array)
		local regex = p:getInnerObject()
		local pos = 1
		local cnt = 0
		
		while true do
			if cnt == maxCount then
				break
			end
			
			local match = regex:search(s, pos)
			if match == nil then
				break
			end
			
			local finds, finde = match:span(0)
			arr:push( s:sub(pos, finds-1) )
			cnt = cnt + 1
			
			local groupIdx = 1
			while cnt < maxCount do
				local g = match:group(groupIdx)
				if g == nil or g == '' then
					break
				end		
				arr:push( g )
				groupIdx = groupIdx + 1
				cnt = cnt + 1
			end
			pos = finde
		end
		
		if cnt == maxCount then
			return arr
		end
		
		if pos <= s:len() then
			arr:push( s:sub(pos, -1) )
		else
			arr:push( '' )
		end
		
		return arr		
	end;
	
	String._split_by_string = function(s, p, maxCount)
		local arr = __new(Array)
		local pos = 1
		local cnt = 0
		
		while true do
			if cnt == maxCount then
				break
			end
			
			local finds, finde = s:find(p, pos)
			if finds == nil then
				break
			end
			
			arr:push( s:sub(pos, finds-1) )
			cnt = cnt + 1
			pos = finde + 1
		end
		
		if cnt == maxCount then
			return arr
		end
		
		if pos <= s:len() then
			arr:push( s:sub(pos, -1) )
		else
			arr:push( '' )
		end
		
		return arr
	end;
	
	String.search = function(s, p)
		s = String._getStr(s)
		local isRegex = type(p) ~= 'string'
		if isRegex then
			return String._search_by_p(s, p)
		else
			return String._search_by_string(s, p)
		end
	end;
	
	String._search_by_p = function(s, p)
		local regex = p:getInnerObject()
		local match = regex:search(s)
		if match == nil then return -1 end
		local pos = match:span(0)
		return pos - 1
	end;
	
	String._search_by_string = function(s, p)
		local rt = s:find(p)
		return (rt == nil) and -1 or (rt-1)
	end;
	
	String.replace = function(s, p, r)
		s = String._getStr(s)
		local isRegex = type(p) ~= 'string'
		if isRegex then
			return String._replace_by_p(s, p, r)
		else
			return String._replace_by_string(s, p, r)
		end
	end;
	
	String._replace_by_p = function(s, p, r)
		local regex = p:getInnerObject()
		r = String._replaceGroups(r)
		if p.global then
			return regex:sub_js(r, s)
		else
			return regex:sub_js(r, s, 1)
		end
	end;
	
	String._replace_by_string = function(s, p, r)
		return s:gsub(p, r, 1)
		--[[
		local pstr, isglobal, ismultiline = String._getPattenSrcAndGlobalMultiLine(p)
		r = String._replaceGroups(r)
		
		if not ismultiline then
			if isglobal then
				return s:gsub(pstr, r)
			else
				return s:gsub(pstr, r, 1)	
			end
		end
		
		local ss = String.split(s, __new(RegExp, '(\n)', "", false))
		local rs = ''
		local onematched = false
		for _, ps in ipairs(ss) do
			if isglobal then
				rs = rs .. ps:gsub(pstr, r)
			elseif not onematched then
				rs = rs .. ps:gsub(pstr, r, 1)
				onematched = true
			else
				rs = rs .. ps
			end
		end
		return rs
		]]
	end;
	
	String.match = function(s, p, lastIndex--[[inner param]])
		s = String._getStr(s)
		lastIndex = lastIndex or 0
		local isRegex = type(p) ~= 'string'
		if isRegex then
			return String._match_by_p(s, p, lastIndex)
		else
			return String._match_by_string(s, p)
		end
	end;
	
	String._match_by_p = function(s, p, lastIndex)
		local regex = p:getInnerObject()
		local arr = __new(Array)
		local index = 0
		while true do
			local match = regex:search(s, lastIndex+1)
			if match == nil then break end
			arr:push(match:group(0))
			index, lastIndex = match:span(0)
			index = index - 1
			lastIndex = lastIndex - 1
			arr.index = index
			arr.lastIndex = lastIndex
			if not p.global then break end
		end
		arr.input = s
		if arr.length == 0 then return nil; else return arr; end
	end;
	
	String._match_by_string = function(s, p)
		local arr = __new(Array)
		local i, j = s:find(p)
		if i == nil then
			return null
		end
		
		arr:push(s:sub(i,j))
		arr.input = s
		arr.index = i-1
		if arr.length == 0 then return nil; else return arr; end
	end;
	--
	
	String.len = function(s)
		s = String._getStr(s)
		return s:len()
	end;

	-- static private
	String._getPattenSrcAndGlobalMultiLine = function(p)
		local isglobal = false 
		local ismultiline = false 
		local pstr = p
		if type(p) ~= 'string' then
			pstr = p.source
			isglobal = p.global
			ismultiline = p.multiline
		end
		return pstr, isglobal, ismultiline
	end;
	
	-- static private
	String._replaceGroups = function(r)
		if type(r) ~= 'string' then
			return r
		end
		
		r = r:gsub("(%$)(%d+)", function(flag, groupIdx)
			return '\\' .. groupIdx
		  end)
		return r
	end;
	
	-- static 
	String._removeGroupsInPatten = function(p)
		p = p:gsub("([^%%]?)([%)%(]+)", function(preWord, groupFlag)
			return preWord
		  end)
		return p
	end;
	
	String._getStr = function(s)
		return (type(s) == 'string') and s or s._s
	end;
	
	String.__add = function(a, b)
		return String._getStr(a) .. String._getStr(b)
	end;
	
	String.__concat = function(a, b)
		return String._getStr(a) .. String._getStr(b)
	end;
	
	return String
end)();
local __String_m = {
	__call = function(t, s)
		return String._getStr(s)
	end,
}
setmetatable(String, __String_m)

Math = (function () 
    local Math = {}
	Math.E = 2.718281828459045
	Math.LN2 = 0.6931471805599453
	Math.LN10 = 2.302585092994046
	Math.LOG2E = 1.4426950408889634
	Math.LOG10E = 0.4342944819032518
	Math.PI = 3.141592653589793
	Math.SQRT1_2 = 0.7071067811865476
	Math.SQRT2 = 1.4142135623730951
	
    Math.abs = function(this,x)
		return math.abs(x)
	end;
	
	Math.acos = function(this,x)
		return math.acos(x)
	end;
	
	Math.asin = function(this,x)
		return math.asin(x)
	end;
	
	Math.atan = function(this,x)
		return math.atan(x)
	end;
	
	Math.atan2 = function(this,x,y)
		return math.atan2(x)
	end;
	
	Math.ceil = function(this,x)
		return math.ceil(x)
	end;
	
	Math.cos = function(this,x)
		return math.cos(x)
	end;
	
	Math.exp = function(this,x)
		return math.exp(x)
	end;
	
	Math.floor = function(this,x)
		return math.floor(x)
	end;
	
	Math.log = function(this,x)
		return math.log(x)
	end;
	
	Math.max = function(this,...)
		return math.max(...)
	end;
	
	Math.min = function(this,...)	
		return math.min(...)
	end;
	
	Math.pow = function(this,x,y)
		return math.pow(x, y)
	end;
	
	Math.random = function(this)
		return math.random()
	end;
	
	Math.round = function(this, x)
		return math.floor(x+0.5)
	end;
	
	Math.sin = function(this, x)
		return math.sin(x)
	end;
	
	Math.sqrt = function(this, x)
		return math.sqrt(x)
	end;
	
	Math.tan = function(this, x)
		return math.tan(x)
	end;
	
	Math.toSource = function(this)
		return '[object Math]'
	end;
	
	Math.valueOf = function(this)
		return {}
	end;

    return Math;
end)();

