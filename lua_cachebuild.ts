///<reference path="lua_common.d.ts"/>
class CacheBuild {
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

