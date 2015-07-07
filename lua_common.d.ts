declare function tonumber(s:string):number;
declare function tostring(s:number):string;
declare function print(...args);
declare function classof(c);
declare function assert(...args);
declare module io { 
	export class File{
		read():string;
		close();
	}
	export function open(file:string, mod:string): File; 
}
declare module os { 
	export function clock():number;
}
declare module debug { 
	export function traceback(): string; 
}
