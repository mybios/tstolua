class Circle{
	private _r:number;
	public constructor(r:number){
		this._r = r;
	}
	
	public getR():number{
		return this._r;
	}
}

export = Circle