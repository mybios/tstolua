export interface SModule {
	init();
	reinit();
	start();
	run();
	destroy();
}

export class Root extends SModule{
	public main() {
		this.init();
		this.start();
		this.run();
		this.destroy();
	}
	
	public init(){
	}
	
	public reinit(){
	}
	
	public start(){
	}
	
	public run(){
	}
	
	public destroy(){
	}
}
