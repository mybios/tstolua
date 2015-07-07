require('lua_libs');
local SourceMap = (function ()
    local SourceMap = {}
    SourceMap.constructor = function (this)
		this._maps = {}
    end;
	
	SourceMap.getSourceLine = function(this, file, line)
		local map = this:getMap(file)
		if map.exist == false then
			return file, line
		end
		
		local lineSegments = map.maplines[line]
		if lineSegments == nil then
			return map.sources[1], nil
		end
		
		if lineSegments[1] == nil then
			return map.sources[1], nil
		end
		
		return lineSegments[1][3]
	end;
	
	SourceMap.getMap = function(this, file)
		local map_file = file .. '.map'
		local map = this._maps[map_file]
		if map ~= nil then return map end
		
		local f = io.open(map_file, 'r')
		if f == nil then
			this._maps[map_file] = {exist=false}
			return this._maps[map_file]
		end
		s = f:read()
		f:close()
		
		s = s:gsub('\"(%w+)\"(:)', function(w, eq)
			return w .. '='
		end)
		s = s:gsub('%[', '{')
		s = s:gsub('%]', '}')
		local map = loadstring("return " .. s)() 
		map.exist = true
		map.maplines = {}
		local lastSourceLine = 0
		local lastSourceIndex = 0
		local lines = String.split(map.mappings, ';')
		for lineno, line in ipairs(lines) do
			local tline = {}
			local segments = String.split(line, ',')
			for fieldno, field in ipairs(segments) do
				local tfield = {}
				local columns = String.split(field, '|')
				for columnno, column in ipairs(columns) do
					if column == '' then
						break
					end
					table.insert(tfield, column)
				end
				table.insert(tline, tfield)
			end
			table.insert(map.maplines, tline)
		end
		
		this._maps[map_file] = map;
		return map
	end;
	
    return SourceMap;
end)();

return __new(SourceMap)
