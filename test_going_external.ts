export class Persion {
	private _name:string;
	public constructor(name:string){
		this._name = name;
	}
	
	public getName():string{
		return this._name;
	}
}

export class Rect{
	private _w:number;
	public constructor(w:number){
		this._w = w;
	}
	
	public getArea():number{
		return this._w*this._w;
	}
}