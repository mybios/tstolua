///<reference path="lua_common.d.ts"/>
import sm = require('lua_sourcemap');

var __err_tag:string = '<<<unit_assert>>>'
var __errorhdr = function(err:string){
 	let stacks = debug.traceback().split('\n');
	let err_tag_pos = err.indexOf(__err_tag);
	if (err_tag_pos >= 0 && stacks.length > 5 ) {
		let line = stacks[5].trim();
		let arr = line.split(':');
		let filename = arr[0];
		let lineno = arr[1];
		let rt = sm.getSourceLine(filename, tonumber(lineno));
		line = rt.file + ':' + rt.line + ': ';
		print( line + err.slice(err_tag_pos+__err_tag.length) )
	}
	else {
		print ( err );
		for ( var st of stacks ) {
			print( st.trim() );
		}
	}
}

export function assertEqual(a:any, b:any, msg?:string){
	if (msg) {
		msg = __err_tag + msg;
	} 
	else {
		msg = __err_tag + 'assertion failed!';
	}
	assert(a===b, msg);
}

export class Result {
	private runCount:number = 0;
	private failedCount:number = 0;
	public testStarted(){
		this.runCount++;
	}
	
	public testFailed(){
		this.failedCount++;
	}
	
	public summary():string{
		return this.runCount + ' run, ' + this.failedCount + ' failed';
	}
}

export class Case {
	public setUp(){
	}
	
	public run(result:Result){
		result = result || new Result();
		let caseClass = classof(this);
		for (var fieldName in caseClass) {
			if (typeof fieldName != 'string') continue;
			var sname = <string>fieldName;
			if ( (sname.indexOf('test') == 0) && typeof caseClass[sname] == 'function' ) {
				this.innerRun(result, sname);
			}
		}
	}
	
	private innerRun(result:Result, name:string) {
		result = result || new Result();
		this.setUpRun(result, name);
		this.testRun(result, name);
		this.tearDownRun(result, name);
	}
	
	private setUpRun(result:Result, name:string) {
		result.testStarted();
		try {
			this.setUp();
		}
		catch(err) {
			__errorhdr(err);
			result.testFailed();
			print('  [case]: ' + name);
		}
	}
	
	private testRun(result:Result, name:string) {
		try {
			this[name](this);
		}
		catch(err) {
			__errorhdr(err);
			result.testFailed();
			print('  [case]: ' + name);
		}		
	}
	
	private tearDownRun(result:Result, name:string) {
		try {
			this.tearDown();
		}
		catch(err) {
			__errorhdr(err);
			result.testFailed();
			print('  [case]: ' + name);
		}
	}
	
	public tearDown(){
	}
}

export class Suite {
	private _cases:Array<Case> = new Array<Case>();

	public addCase(caseObject:Case) {
		this._cases.push(caseObject);
	}
	
	public run(result?:Result, needcases?:Array<new(...args)=>Case>):Result {
		result = result || new Result();
		for (var caseObject of this._cases ) {
			if (this.isNeedRun(caseObject, needcases)) {
				caseObject.run(result);
			}
		}
		return result;
	}
	
	private isNeedRun(caseObject:Case, needcases?:Array<new(...args)=>Case>) {
		if (needcases == null || needcases.length == 0 ) return true;
		
		for ( var caseClass of needcases ) {
			if ( classof(caseObject) === caseClass ) {
				return true;
			}
		}
		return false;
	}
}

