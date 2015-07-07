///<reference path="lua_common.d.ts"/>

interface SMap {
	version:string,
	exist:boolean,
	file:string,
	sourceRoot:string,
	sources:Array<string>,
	names:Array<string>,
	maplines:Array<Array<Array<number> > >,
}

class SourceMap {
	private _maps:{[index: string]: SMap;} = {};

	public getSourceLine(file:string, line:number):{file:string, line:number}{
		let map = this.getMap(file)
		if ( !map.exist ) {
			return {file:file, line:-1};
		}
		
		let lineSegments = map.maplines[line-1];
		if (lineSegments == null) {
			return {file:map.sources[0], line:-1};
		}
		
		if (lineSegments[0] == null) {
			return {file:map.sources[0], line:-1};
		}
		
		return {file:map.sources[0], line:lineSegments[0][2]}; 
	}
	
	public getMap(file:string):SMap{
		let map_file = file + '.map'
		let map = this._maps[map_file]
		if (map != null) return map;
		
		let f = io.open(map_file, 'r');
		if ( f == null ) {
			this._maps[map_file] = this.getEmptyMap()
			return this._maps[map_file]
		}
		
		let s = f.read();
		f.close();

		this._maps[map_file] = this.getEmptyMap()
		map = this._maps[map_file];
		map.exist = true;
		map.version = this.getFieldByName(s, 'version');
		map.file = this.getFieldByName(s, 'file');
		map.sourceRoot = this.getFieldByName(s, 'sourceRoot');
		map.sources = this.getFieldsByName(s, 'sources');
		map.names = this.getFieldsByName(s, 'names');
		map.maplines = this.getMaplines(s, 'mappings');
		
		return map;
	}
	
	private getFieldByName(s:string, field:string):string{
		field = '\"' + field + '\":';
		let pos = s.indexOf(field);
		if ( pos < 0 ) {
			return '';
		}
		
		pos += field.length;
		let startToken = s.charAt(pos);
		let endToken = '';
		if ( startToken == '"' ) {
			endToken = '"';
			pos++;
		} 
		else if ( startToken == '[' ) {
			endToken = ']';
			pos++;
		}
		else {
			endToken = ',';
		}
		
		let endPos = s.indexOf(endToken, pos);
		if ( endPos < 0 && endToken == ',' ) {
			endPos = s.indexOf('}', pos);
		}
		if ( endPos < 0 ) {
			endPos = s.length;
		}
		return s.substring(pos, endPos);
	}
	
	private getFieldsByName(s:string, field:string):Array<string>{
		let value = this.getFieldByName(s, field);
		let arr = value.split(',');
		for ( var i=0, n=arr.length; i<n; i++ ) {
			if ( arr[i].charAt(0) == '"' ) {
				arr[i] = arr[i].slice(1, -1);
			}
		}
		return arr;
	}
	
	private getMaplines(s:string, field:string):Array<Array<Array<number> > >{
		let value = this.getFieldByName(s, field);
		let smapLine:Array<Array<Array<number> > > = [];
		
		let lines = value.split(';');
		for ( let line of lines ) {
			let tline:Array<Array<number> > = [];
			let segments = line.split(',');
			for ( let field of segments ) {
				let tfield:Array<number> = [];
				let columns = field.split('|');
				for ( let column of columns) {
					if (column == '') break;
					tfield.push(tonumber(column));
				}
				tline.push(tfield);
			}
			smapLine.push(tline);
		}
		
		return smapLine;
	}
	
	private getEmptyMap():SMap{
		return { version:'3',
			exist:false,
			file:'',
			sourceRoot:'',
			sources:null,
			names:null,
			maplines:null,
		};
	}
}

let __sm = new SourceMap();
export = __sm;
