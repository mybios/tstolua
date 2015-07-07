--[[ ///<reference path="lua_common.d.ts"/> ]]
require('lua_libs');local __exports = {};local __export=nil
local SourceMap = (function () 
    local SourceMap = {}
    SourceMap.constructor = function (this)
        this._maps = {};
    end;
    SourceMap.getSourceLine = function (this, file, line)
        local map = this:getMap(file);
        if (not map.exist) then 
            return { file= file, line= -1 };
        end
        local lineSegments = map.maplines[line - 1 + 1];
        if (lineSegments == null) then 
            return { file= map.sources[0 + 1], line= -1 };
        end
        if (lineSegments[0 + 1] == null) then 
            return { file= map.sources[0 + 1], line= -1 };
        end
        return { file= map.sources[0 + 1], line= lineSegments[0 + 1][2 + 1] };
    end;
    SourceMap.getMap = function (this, file)
        local map_file = file .. '.map';
        local map = this._maps[map_file];
        if (map ~= null) then
            return map;
        end
        local f = io.open(map_file, 'r');
        if (f == null) then 
            this._maps[map_file] = this:getEmptyMap();
            return this._maps[map_file];
        end
        local s = f:read();
        f:close();
        this._maps[map_file] = this:getEmptyMap();
        map = this._maps[map_file];
        map.exist = true;
        map.version = this:getFieldByName(s, 'version');
        map.file = this:getFieldByName(s, 'file');
        map.sourceRoot = this:getFieldByName(s, 'sourceRoot');
        map.sources = this:getFieldsByName(s, 'sources');
        map.names = this:getFieldsByName(s, 'names');
        map.maplines = this:getMaplines(s, 'mappings');
        return map;
    end;
    SourceMap.getFieldByName = function (this, s, field)
        field = '\"' .. field .. '\":';
        local pos = String.indexOf(s,field);
        if (pos < 0) then 
            return '';
        end
        pos  = pos+( field:len());
        local startToken = String.charAt(s,pos);
        local endToken = '';
        if (startToken == '"') then 
            endToken = '"';
            pos = pos + 1;
        elseif (startToken == '[') then 
            endToken = ']';
            pos = pos + 1;
        else 
            endToken = ',';
        end
        local endPos = String.indexOf(s,endToken,pos);
        if (endPos < 0 and endToken == ',') then 
            endPos = String.indexOf(s,'}',pos);
        end
        if (endPos < 0) then 
            endPos = s:len();
        end
        return String.substring(s,pos,endPos);
    end;
    SourceMap.getFieldsByName = function (this, s, field)
        local value = this:getFieldByName(s, field);
        local arr = String.split(value,',');
        do
        local i = 0;local n = arr.length;
        while ( i < n)  do
            do
            if (String.charAt(arr[i + 1],0) == '"') then 
                arr[i + 1] = String.slice(arr[i + 1],1,-1);
            end
            end
            ::continue::
            i = i + 1
        end
        end
        return arr;
    end;
    SourceMap.getMaplines = function (this, s, field)
        local value = this:getFieldByName(s, field);
        local smapLine = __new(Array);
        local lines = String.split(value,';');
        for _, line in pairs(lines) do  
            do
            local tline = __new(Array);
            local segments = String.split(line,',');
            for _, field in pairs(segments) do  
                do
                local tfield = __new(Array);
                local columns = String.split(field,'|');
                for _, column in pairs(columns) do  
                    do
                    if (column == '') then
                        break;
                    end
                    tfield:push(tonumber(column));
                    end
                    ::continue::
                end
                tline:push(tfield);
                end
                ::continue::
            end
            smapLine:push(tline);
            end
            ::continue::
        end
        return smapLine;
    end;
    SourceMap.getEmptyMap = function (this)
        return { version= '3',
            exist= false,
            file= '',
            sourceRoot= '',
            sources= null,
            names= null,
            maplines= null
        };
    end;
    return SourceMap;
end)();
local __sm = __new(SourceMap);
__export = __sm;
return __export;
--# sourceMappingURL=lua_sourcemap.lua.map