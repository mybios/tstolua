/// <reference path="checker.ts"/>
/// <reference path="declarationEmitter.ts"/>
//add by qjb
/* @internal */
module ts {
	let lua_stringMethods : { [index: string]: string } = {
		'length':'len()',
	};
	
	let lua_switch_var_name_id : number = 0;
	
	export function lua_changeNodeFlagInEmitCallExpression(node: CallExpression) { 
		if (node.expression.flags & NodeFlags.ParentIsClassObject){
			node.expression.flags = node.expression.flags | NodeFlags.IsClassObjectMethodCall; 
		}
	}
	
	export function lua_clearNodeFlagInEmitCallExpression(superCall: boolean, node: CallExpression) {
		if ( superCall ) {
			node.expression.flags = node.expression.flags & ~NodeFlags.IsClassObjectMethodCall;
		}
	}
	
	export function lua_setIngoreClassObjectMethodCall(node: CallExpression) { 
		node.expression.flags = node.expression.flags | NodeFlags.IngoreClassObjectMethodCall; 
	}
	
	export function lua_wirteCallDot(writer: EmitTextWriter, node: PropertyAccessExpression){
		if ( node.flags & NodeFlags.IsClassObjectMethodCall ){
			writer.write(":");
			return;
		}
		else if (node.flags & NodeFlags.IngoreClassObjectMethodCall) {
			return;
		}
		else if ( node.flags & NodeFlags.IsString ) {
			let name:string = node.name.text;
			if ( name == 'length' ) {
				writer.write(":");
				return;
			}
		}
		writer.write(".");
	}
	
	export function lua_wirteCallName(writer: EmitTextWriter, node: PropertyAccessExpression, callMethod:any) {
		if ( node.flags & NodeFlags.IsString ) {
			let name:string = node.name.text;
			let luaName = lua_stringMethods[name];
			if ( luaName ) {
				writer.write(lua_stringMethods[name]);
			}
		} 
		else {
			callMethod();
		}
	}
	
	function get_stringMethodName(node: CallExpression) : string {
		if ( node.expression.kind !== SyntaxKind.PropertyAccessExpression ) {
			return '';
		}
		
		let expr = <PropertyAccessExpression>node.expression;
		if ( !(expr.flags & NodeFlags.IsString) ) {
			return '';
		}
		
		return expr.name.text;
	}
	
	export function lua_wirteCallParams(writer: EmitTextWriter, node: CallExpression, emitNode:(node: Node)=>void, emitCommaList:()=>void) {
		emitCommaList();
	}
	
	function isGlobalStringMethod(name:string){
		return name == 'split' 
			|| name == 'slice' 
			|| name == 'charAt' 
			|| name == 'charCodeAt'
			|| name == 'localeCompare'
			|| name == 'indexOf'
			|| name == 'lastIndexOf'
			|| name == 'concat'
			|| name == 'replace'
			|| name == 'match'
			|| name == 'toLowerCase'
			|| name == 'toLocaleLowerCase'
			|| name == 'toUpperCase'
			|| name == 'toLocaleUpperCase'
			|| name == 'trim'
			|| name == 'toString'
			|| name == 'substr'
			|| name == 'substring'
			|| name == 'search';
	}
	
	export function lua_isSomeGlobalStringMethod(node: CallExpression) {
		let name:string = get_stringMethodName(node);
		return isGlobalStringMethod(name);
	}
	
	export function lua_writeSomeGlobalStringMethod(writer: EmitTextWriter, node: CallExpression ) {
		let name:string = get_stringMethodName(node);
		writer.write('String.' + name + '(');
	}
	
	export function lua_writeSomeGlobalStringMethodParams(writer: EmitTextWriter, node: CallExpression, emitNode:(node: Node)=>void, emitCommaList:()=>void) {
		let name:string = get_stringMethodName(node);
		
		if ( isGlobalStringMethod(name) ) {
			writer.write('');
			for ( var i=0, n=node.arguments.length; i<n; i++ ) {
				writer.write(',');
				emitNode(node.arguments[i]);
			}
			writer.write(')');
		}
	}
	
	export function lua_getVarDefineString(){
		return "local";
	}
	
	enum RegExpFlag {
		OpenBracketToken = 1
	}
	
	export function lua_regExpToLuaRegExp(node:Node, s:string){
		return s;
		/*
		let rs = '';
		let stack:Array<RegExpFlag> = [];
		for ( let i=0, n=s.length; i<n; i++ ) {
			let c = s.charAt(i);
			let nextC = (i+1<n) ? s.charAt(i+1) : '';
			if ( c == '\\' && (
					nextC == 'w'
					|| nextC == 'd'
					|| nextC == 's'
					|| nextC == 'W'
					|| nextC == 'D'
					|| nextC == 'S'
				)) {  
				c = '%';
			}
			else if ( c == '-' ) {
				if ( stack.length==0 || stack[stack.length-1] != RegExpFlag.OpenBracketToken ) {
					c = '%-';
				}
			}
			else if ( c == '[' ) {
				stack.push(RegExpFlag.OpenBracketToken);
			}
			else if ( c == ']' ) {
				stack.pop();
			}
			rs += c;
		}
		return rs;
		*/
	}

	export function lua_checkRegular(error:(location: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any)=>void, node:LiteralExpression){
		return;
		/*
		let s = node.text;
		for ( let i=0, n=s.length; i<n; i++ ) {
			let c = s.charAt(i);
			let nextC = (i+1<n) ? s.charAt(i+1) : '';
			if ( c == '\\' && nextC == 'b' ) {
				error(node, Diagnostics.regex_not_support_b);
			}
			else if ( c == '\\' && nextC == 'B' ) {
				error(node, Diagnostics.regex_not_support_B);
			}
			else if ( c == '\\' && nextC == 'u' ) {
				error(node, Diagnostics.regex_not_support_u);
			}
			else if ( c != '%' && ( nextC == '{' || nextC == '}' ) ) {
				error(node, Diagnostics.Decorators_are_not_valid_here);
			}
		}
		*/
	}	
	
	export function lua_getSwitchVarName():string{
		lua_switch_var_name_id++;
		return '__switch_var_' + lua_switch_var_name_id;
	}
	
	function lua_writeMuiltCase(node:BinaryExpression, writer: EmitTextWriter, emit:(node: Node)=>void, codesegmentIdx:number) {
		if ( node.left.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>node.left).operatorToken.kind === SyntaxKind.CommaToken ) {
			lua_writeMuiltCase(<BinaryExpression>node.left, writer, emit, codesegmentIdx);
		}
		else {
			writer.write('[');
			emit(node.left);
			writer.write('] = ' + codesegmentIdx + ',');
		}
		
		if ( node.right.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>node.right).operatorToken.kind === SyntaxKind.CommaToken ) {
			lua_writeMuiltCase(<BinaryExpression>node.right, writer, emit, codesegmentIdx);
		}
		else {
			writer.write('[');
			emit(node.right);
			writer.write('] = ' + codesegmentIdx + ',');
		}
	}
	
	export function lua_emitCaseBlock(writer: EmitTextWriter, writeLine:()=>void, increaseIndent:()=>void, decreaseIndent:()=>void, emitLines:(nodes: Node[])=>void, emit:(node: Node)=>void, block:CaseBlock){
		writeLine();
		increaseIndent();
		writer.write('__codesegments = {');
		let codesegmentIdx = 1;
		let caseRefs = {};
		for ( let clauseIdx=0, n=block.clauses.length; clauseIdx<n; clauseIdx++ ) {
			let clause = block.clauses[clauseIdx];
			
			writeLine();
			increaseIndent();
			if ( clause.statements.length == 0 ) {
				writer.write('[' + codesegmentIdx + '] = 0, -- nil');
			}
			else {
				writer.write('[' + codesegmentIdx + '] = function()');
				increaseIndent();
				writeLine();
				emitLines(clause.statements);
				writeLine();
				decreaseIndent();
				writer.write('end,');
			}
			decreaseIndent();
			codesegmentIdx++;
		}

		writeLine();
		writer.write('},');
		
		writeLine();
		codesegmentIdx = 1;
		for ( let clauseIdx=0, n=block.clauses.length; clauseIdx<n; clauseIdx++ ) {
			writeLine();
			let clause = block.clauses[clauseIdx];
			if ( clause.kind === SyntaxKind.CaseClause ) {
				let casec = <CaseClause>clause;
				if ( casec.expression.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>casec.expression).operatorToken.kind === SyntaxKind.CommaToken ) {
					lua_writeMuiltCase(<BinaryExpression>casec.expression, writer, emit, codesegmentIdx);
				}
				else {
					writer.write('[');
					emit(casec.expression);
					writer.write('] = ' + codesegmentIdx + ',');
				}
			}
			else { // default
				writer.write('["default"] = ' + codesegmentIdx + ',');
			}
			codesegmentIdx++;
		}
		
		decreaseIndent();
		writeLine();

	}
	
	let __blockTypes = new Array<string>();
	export function lua_pushBlockType(type:string, writer: EmitTextWriter){
		__blockTypes.push(type);
	}
	
	export function lua_popBlockType(writer: EmitTextWriter){
		__blockTypes.pop();
	}	
	
	export function lua_isSwitchType(){
		if ( __blockTypes.length == 0 ) {
			return false;
		}
		return __blockTypes[__blockTypes.length - 1] === 'switch';
	}
	
	export function lua_extendsHelper(){
		return `
require('lua_libs');local __exports = {};local __export=nil`;
	}
}
