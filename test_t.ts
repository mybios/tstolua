


class Case {
	private name:string = '';
    public constructor(){
		print ( 'aaa' )
	}
	
	public setUp(){
	}
	
	public run() {
		this[this.name](this);
	}
	
	public tearDown(){
	}
	
	
}

class Case2 extends Case{
}

var arr = Array<new(...args)=>Case>();

function test_function(cc:new()=>Case){
	new cc();
}

test_function(Case);

arr.push(Case);
arr.push(Case2);