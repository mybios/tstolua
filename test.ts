declare function print(msg:any, msg2?:any);
declare function assert(con:boolean, msg?:string);

class TestPrint{
	private _s:string = ''
	public clear(){
		this._s = '';
	}
	
	public put(s:string){
		this._s += s;
		this._s += '\n';
	}
	
	public putinline(s:string){
		this._s += s;
	}
	
	public get():string{
		return this._s;
	}
	
	public getAndClear():string{
		let s = this.get();
		this.clear();
		return s;
	}
}
let tprint = new TestPrint()


//------------------------------------
class Demo{
	protected _id : number = 0;
	public static getType():string{
		return 'demo type';
	}
	
	public getId():number{
		return this._getId();
	}
	
	private _getId():number{
		++this._id;
		--this._id;
		return this._id;
	}
}

class Game extends Demo{
	public constructor(id:number){
		super()
		this._id = id;
	}
	
	public getId():number{
		return super.getId()*10;
	}
	
	public setSome(...args){
	}
	
	public setSome2(it, ...args){
	}
}

class JumpGame extends Game{
	public getId():number{
		return super.getId();
	}
	
	public setId(id:number){
		this._id = id;
	}
}

function test_class(){
	print ( '----- test class ----- ')
	assert ( Demo.getType() == "demo type" );
	let demo = new Demo();
	assert ( demo.getId() == 0);

	let game = new Game(1);
	assert ( game.getId() == 1*10 );

	let jumpGame = new JumpGame(10);
	assert ( jumpGame.getId() == 100);
	jumpGame.setId(20);
	assert ( jumpGame.getId() == 200);
	print("ok");
}

function test_continue_for(){
	print ( '----- test for, continue ----- ')
	tprint.clear();
	for ( let i:number=0, j:number=1, c1:number; i<5; i++ ) {
		if ( i == 1 ) continue;
		else if ( i == 4 ) break;
		let c = i;
		tprint.putinline('' + c + ';[');
		for ( let j=0; j<3; j++) {
			if ( j == 2 ) continue;
			let jjj = j;
			tprint.putinline('' + jjj + ',');
		}
		tprint.putinline(']');
	}
	assert ( tprint.getAndClear() == "0;[0,1,]2;[0,1,]3;[0,1,]" );
	print ("ok");
}
	
function test_continue_for_in(){
	print ( '----- test for in, continue ----- ')
	tprint.clear();
	let array2 = new Array<number>(1,2,3,4);
	for (let arr in array2) {
		if (array2[arr] == 4) continue;
		tprint.putinline('' + arr + ':' + array2[arr] + ',');
	}
	assert ( tprint.getAndClear() == "0:1,1:2,2:3," );

	var dict: { [s: string]: string; } = {};
	dict['a'] = 'a like';
	dict['b'] = 'b like';
	dict['c'] = 'c like';
	for (let d in dict) {
		if ( d == 'c' ) continue;
		tprint.putinline('' + d + ':' + dict[d] + ',');
	}
	assert ( tprint.getAndClear() == "b:b like,a:a like," );
	
	let expr = Array(1,2,3);
	for (let v of expr) {
		tprint.putinline ( v+';' );
	}
	assert ( tprint.getAndClear() == "1;2;3;" );

	print ("ok");
}

function test_continue_for_of(){
	print ( '----- test for of, continue ----- ')
	let expr = Array(1,2,3);
	for (let v of expr) {
		tprint.putinline ( v+';' );
	}
	assert ( tprint.getAndClear() == "1;2;3;" );
	print ("ok");
}

function test_while(){
	print ( '----- test while ----- ')
	let w_i = 0;
	while (w_i < 10){
		if ( w_i == 7 ) {
			++w_i
			continue;
		}
		tprint.putinline('' + w_i + ',');
		++w_i;
	}
	assert ( tprint.getAndClear() == "0,1,2,3,4,5,6,8,9," );
	print ( "ok" );
}

function test_do_while(){
	print ( '----- test do while ----- ')
	let w_i = 0;
	do {
		++w_i
		if ( w_i == 5 ) continue;
		tprint.putinline('' + w_i + ',');
	} while(w_i<10)
	assert ( tprint.getAndClear() == "1,2,3,4,6,7,8,9,10," );
	print ( 'ok' );
}

function test_if(){
	print ( '----- test if ----- ')
	let flag = true;
	let checkifStatement:number = 0;
	if ( flag ) {
		checkifStatement = 1;
	}
	assert(checkifStatement == 1 );

	flag = false;
	if ( flag ) {
		tprint.putinline('')
	}
	else {
		tprint.putinline('false')
	}
	assert ( tprint.getAndClear() == "false" );

	let a:number = 2;
	if ( a == 0 ) {
		tprint.putinline('a==0')
	} 
	else if (a == 1) {
		tprint.putinline('a==1')
	}
	else {
		tprint.putinline('a==2')
	}
	assert(tprint.getAndClear() == 'a==2');
	print("ok");
}

function test_prefixUnaryExpressionAndPostfixUnaryExpression(){
	print ( '----- i++; ++i; i--; --i; ----- ')
	let pi = 0;
	++pi;
	assert ( pi == 1);

	let pi1 = ++pi;
	assert ( pi == 2);
	assert ( pi1 == 2);
	pi1 = ++pi;
	assert ( pi == 3);
	assert ( pi1 == 3);
	assert ( pi++ + 1 == 4);
	assert ( (pi++) + 1 == 5);
	assert ( (++pi) + 1 == 7);
	--pi
	--pi
	--pi

	--pi;
	assert ( pi == 2);
	pi1 = --pi;
	assert ( pi == 1);
	assert ( pi1 == 1);

	pi++;
	assert ( pi == 2);
	pi1 = pi++;
	assert ( pi1 == 2);
	assert ( pi == 3);

	pi--;
	assert ( pi == 2);
	pi1 = pi--;
	assert ( pi1 == 2);
	assert ( pi == 1);
	print('ok');

	print ( '----- && || ----- ')
	assert ( true && true || true);
	print('ok');
}

function test_binaryExpression(){
	print ( '----- === == !== != ! ----- ')
	let xxx = 1
	assert ( xxx !== 2 )
	assert ( xxx != 2 )
	assert ( xxx === 1 )
	assert ( xxx == 1 )
	let notflag = false
	assert( (!notflag) == true );
	print('ok');
}

function test_bitBinaryExpression(){
	print ( '----- | & >> >>> << ~ ^ ----- ') // lua5.3已经支持
	let bit_flag = 0x80;
	assert( (bit_flag&0x0) == 0x00 );
	assert( (bit_flag&0x80) == 0x80 );
	assert( (bit_flag&0x80|0x88) == 0x88 );
	assert( (bit_flag>>2) == 0x20 );
	assert( (bit_flag>>>2) == 0x20 );
	assert( (bit_flag>>8) == 0 );
	bit_flag = 0x40;
	assert( (bit_flag<<1) == 0x80 );
	assert( (0x33^0x24) == 0x17 );
	assert( (~0x33) == -52 );
	print('ok');
}

function test_threeElemBinaryExpression(){
	print ( '----- += -= *= /= %= ----- ')
	let i = 1;
	i += 2;
	assert ( i == 3 );
	i -= 1;
	assert ( i == 2 );
	i *= 2 + 3;
	assert ( i == 10 );
	i /= 2 + 3;
	assert ( i == 2 );
	i = 7;
	i %= 3;
	assert ( i == 1 );
	let sss = 'abc'
	sss += 1;
	assert(sss == 'abc1')
	print('ok');
}

function test_threeElemBitBinaryExpression(){
	print ( '----- <<= >>= >>>= &= |= ^= ----- ')
	let i2 = 0x1;
	i2 <<= 2;
	assert ( i2 == 0x4 );
	i2 >>= 1;
	assert ( i2 == 0x2 );
	i2 = 0x80;
	i2 >>>= 1;
	assert ( i2 == 0x40 );
	i2 = 0x88;
	i2 &= 0x80;
	assert ( i2 == 0x80 );
	i2 = 0x80;
	i2 |= 0x08;
	assert ( i2 == 0x88 );
	i2 = 0x33;
	i2 ^= 0x24;
	assert ( i2 == 0x17 );
	print('ok');
}

function test_conditional(){
	print ( '----- ? : ----- ')
	let i3 = 10;
	assert ( (i3 < 10 ? 1 : 0) == 0 );
	assert ( (i3 == 10 ? 1 : 0) == 1 );
	assert ( (i3 < 10 ? 0 : null) == null );
	assert ( (i3 == 10 ? 0 : null) == 0 );
	print('ok');
}

class Employee {
	private _fullName: string = '';
	private _shortName: string = '';
	private _age:number = 10;
	get fullName(): string {
		return this._fullName;
	}
	set fullName(newName: string) {
		tprint.putinline('you can not rename fullname!')
	}
	
	get shortName(): string {
		return this._shortName;
	}
	set shortName(newName: string) {
		this._shortName = newName
	}
	
	get age(): number {
		return this._age;
	}
}
function test_get_set(){
	print ( '----- get set ----- ')
	let empl = new Employee()
	assert ( tprint.getAndClear() == '')
	empl.fullName = 'qujianbiao'
	assert ( tprint.getAndClear() == 'you can not rename fullname!')
	assert ( empl.fullName === '' )
	assert ( empl.shortName === '' )
	empl.shortName = 'qjb'
	assert ( empl.shortName === 'qjb' )
	assert ( empl.age === 10 )
	empl.age = 20
	assert ( empl.age === 10 )
	print ('ok')
}

function test_switch() {
	print ( '----- switch ----- ')
	let s_c = '2'
	function switch_test1(x) {
		switch(x) {
		case 1:
			tprint.put('1');
			break;
		case s_c:
			tprint.put('2');
			break;
		case '3':
			tprint.put('3');
			break;		
		default:
			tprint.put('default');
		}
	}
	switch_test1(1);
	assert ( tprint.getAndClear() == '1\n' )
	switch_test1(2);
	assert ( tprint.getAndClear() == 'default\n' )
	switch_test1('2');
	assert ( tprint.getAndClear() == '2\n' )
	switch_test1('3');
	assert ( tprint.getAndClear() == '3\n' )

	function switch_test2(x) {
		switch(x) {
		default:
			tprint.put('default');
		case 1:
			tprint.put('1');
		case 2:
			tprint.put('2');
			break;
		case 3:
			tprint.put('3');
			break;
		}
	}
	switch_test2(10);
	assert ( tprint.getAndClear() == 'default\n1\n2\n' )
	switch_test2(1);
	assert ( tprint.getAndClear() == '1\n2\n' )
	switch_test2(2);
	assert ( tprint.getAndClear() == '2\n' )

	function switch_test3(x) {
		switch(x) {
		case 1,2:
			tprint.put('2');
			break;
		case 'c':
			tprint.put('c');
			break;
		case 3:
			tprint.put('3');
			for ( let i=0; i<10; ++i ) {
				if ( i == 0 ) break;
				if ( i == 1 ) continue;
				return;
			}
			return -1;
		case 4:
		case 5,6,'g', 5+5, 5*10:
		case 7:
			tprint.putinline('<4567>')
			return;
		}
		tprint.put('switch_test3 end!');
	}

	assert ( switch_test3(3) === -1 )
	assert ( tprint.getAndClear() == '3\n' )
	assert ( switch_test3('c') == null )
	assert ( tprint.getAndClear() == 'c\nswitch_test3 end!\n' )
	switch_test3(4)
	assert ( tprint.getAndClear() == '<4567>' )
	switch_test3(5)
	assert ( tprint.getAndClear() == '<4567>' )
	switch_test3(6)
	assert ( tprint.getAndClear() == '<4567>' )
	switch_test3(7)
	assert ( tprint.getAndClear() == '<4567>' )
	switch_test3('g')
	assert ( tprint.getAndClear() == '<4567>' )
	switch_test3(5+5)
	assert ( tprint.getAndClear() == '<4567>' )
	switch_test3(5*10)
	assert ( tprint.getAndClear() == '<4567>' )
	print ('ok')
}

function test_rawString(){
	print ( '----- string length 函数等 RegExp ----- ')
	let s0 = 'Hello world'
	assert ( s0.replace('Hello', 'Hi, hello') === 'Hi, hello world');
	assert ( s0.toLowerCase() === 'hello world' )
	assert ( s0.toUpperCase() === 'HELLO WORLD' )
	assert ( s0.toLocaleLowerCase() === 'hello world' )
	assert ( s0.toLocaleUpperCase() === 'HELLO WORLD' )
	let s1 = ' hello '
	assert ( s1.trim() === 'hello' )
	let s2 = '123456'
	assert ( s2.substr(0,3) === '123' )
	assert ( s2.substring(2,4) === '34' )
	assert ( s2.toString() === '123456' )
	assert ( s2.slice(2,4) === '34' )
	assert ( s2.slice(0) === '123456' )
	assert ( s2.slice(1) === '23456' )
	assert ( s2.slice(-1) === '6' )
	assert ( s2.slice(-1, -2) === '' )
	assert ( s2.slice(-1, -1) === '' )
	assert ( s2.slice(-3, 3) === '' )
	assert ( s2.slice(-3, 4) === '4' )
	assert ( s2.slice(-3, -1) === '45' )
	let s22 = s2.slice()
	assert ( s22 === '123456' )

	let s3 = '1,2,3,4'
	let s3_split = s3.split(',')
	assert( s3_split.length === 4 );
	assert( s3_split[0] == '1' );
	assert( s3_split[1] == '2' );
	assert( s3_split[2] == '3' );
	assert( s3_split[3] == '4' );
	s3_split = s3.split(',', 3)
	assert( s3_split[0] == '1' );
	assert( s3_split[1] == '2' );
	assert( s3_split[2] == '3' );
	assert( s3_split[3] == null );

	let s3_1 = '1 -Hello 1 - word. Sentence 2 -number 2.';
	let s3_1_split = s3_1.split(/\d -/)
	assert ( s3_1_split[0] === '')
	assert ( s3_1_split[1] === 'Hello ')
	assert ( s3_1_split[2] === ' word. Sentence ')
	assert ( s3_1_split[3] === 'number 2.')

	let s3_2_split = s3_1.split(/(\d) (-)/)
	assert ( s3_2_split[0] === '')
	assert ( s3_2_split[1] === '1')
	assert ( s3_2_split[2] === '-')
	assert ( s3_2_split[3] === 'Hello ')
	assert ( s3_2_split[4] === '1')
	assert ( s3_2_split[5] === '-')
	assert ( s3_2_split[6] === ' word. Sentence ')
	assert ( s3_2_split[7] === '2')
	assert ( s3_2_split[8] === '-')
	assert ( s3_2_split[9] === 'number 2.')

	let s3_3 = '1234';
	let s3_3_split = s3_3.split('');
	assert ( s3_3_split.length == 4 )
	assert ( s3_3_split[0] == '1' )
	assert ( s3_3_split[1] == '2' )
	assert ( s3_3_split[2] == '3' )
	assert ( s3_3_split[3] == '4' )


	let s4 = '123456'
	assert ( s4.charAt(0) === '1' )
	assert ( s4.charAt(1) === '2' )
	assert ( s4.charAt(5) === '6' )

	let s5 = '123456'
	assert ( s5.charCodeAt(0) === 49 )
	assert ( s5.charCodeAt(1) === 50 )

	let s6 = '1'
	assert ( s6.concat('2') == '12' )

	let s7 = '123456'
	assert ( s7.length == 6 )
	//s7.length = 1

	let s8 = '123'
	assert ( s8.localeCompare('112') == 1 )
	assert ( s8.localeCompare('123') == 0 )
	assert ( s8.localeCompare('124') == -1 )

	let s9 = '123456123'
	assert(s9.indexOf('23') == 1)
	assert(s9.indexOf('23', 1) == 1)
	assert(s9.indexOf('23', 2) == 7)
	assert(s9.indexOf('231') == -1)
	assert(s9.lastIndexOf('23') == 7)
	assert(s9.lastIndexOf('23',1) == 1)
	assert(s9.lastIndexOf('23',7) == 7)
	assert(s9.lastIndexOf('23',6) == 1)
	assert(s9.lastIndexOf('231') == -1)
	
	var s9_1 = '12 ab 12 cd 12'
	assert ( s9_1.lastIndexOf('12', 9) == 6 )

	let s10 = 'Visit W3School!'
	assert(s10.search(/w3school/) == -1 )
	assert(s10.search(/W3School/) == 6 )
	assert(s10.search('W3School') == 6 )
	let s10_1 = 'First second\nthird fourth\nfifth sixth'
	assert(s10_1.search(/(\w+)$/) == 32 )
	assert(s10_1.search(/(\w+)$/m) == 6 )
	assert(s10_1.search(/(\w+)$/gm) == 6 )

	let s11_1="Visit Microsoft Microsoft!"
	assert(s11_1.replace(/Microsoft/, "W3School") == 'Visit W3School Microsoft!')
	let s11_2="Welcome to Microsoft! "
	s11_2 += "We are proud to announce that Microsoft has "
	s11_2 += "one of the largest Web Developers sites in the world."
	assert(s11_2.replace(/Microsoft/g, "W3School") == 'Welcome to W3School! We are proud to announce that W3School has one of the largest Web Developers sites in the world.')
	let s11_3="Javascript Tutorial"
	assert(s11_3.replace(/javascript/i, "JavaScript") == 'JavaScript Tutorial')
	let s11_4="Doe, John"
	assert(s11_4.replace(/(\w+)\s*, \s*(\w+)/, "$2 $1") == 'John Doe')
	let s11_5='"a", "b"'
	assert(s11_5.replace(/"([^"]*)"/g, "'$1'") == "'a', 'b'")
	let s11_6='aaa bbb ccc'
	assert(s11_6.replace(/(\w+)/g, function(word:string){return word.substring(0,1).toUpperCase()+word.substring(1);}) == "Aaa Bbb Ccc")
	//多行处理
	let s11_7='First second\nthird fourth\nfifth sixth'
	assert(s11_7.replace(/(\w+)$/, "xxx") == "First second\nthird fourth\nfifth xxx")
	assert(s11_7.replace(/(\w+)$/g, "xxx") == "First second\nthird fourth\nfifth xxx")
	assert(s11_7.replace(/(\w+)$/m, "xxx") == "First xxx\nthird fourth\nfifth sixth")
	assert(s11_7.replace(/(\w+)$/mg, "xxx") == "First xxx\nthird xxx\nfifth xxx")

	let s12_1 = 'Hello world!'
	assert(s12_1.match('world')[0] == 'world')
	assert(s12_1.match('world').index == 6)
	assert(s12_1.match('world').input == s12_1)
	assert(s12_1.match('World') == null)
	let s12_2 = '1 plus 2 equal 3';
	assert(s12_2.match(/\d+/g).length == 3)
	assert(s12_2.match(/\d+/g)[0] == '1')
	assert(s12_2.match(/\d+/g)[1] == '2')
	assert(s12_2.match(/\d+/g)[2] == '3')
	assert(s12_2.match(/\d+ /g).length == 2)
	assert(s12_2.match(/\d+ /g)[0] == '1 ')
	assert(s12_2.match(/\d+ /g)[1] == '2 ')
	assert(s12_2.match(/(\d+)( )/g).length == 2 )
	assert(s12_2.match(/(\d+)( )/g)[0] == '1 ')
	assert(s12_2.match(/(\d+)( )/g)[1] == '2 ')
	let s12_3 = 'First second\nthird fourth\nfifth sixth';
	assert(s12_3.match(/(\w+)$/).length == 1 )
	assert(s12_3.match(/(\w+)$/)[0] == 'sixth' )
	assert(s12_3.match(/(\w+)$/m).length == 1 )
	assert(s12_3.match(/(\w+)$/m)[0] == 'second' )
	assert(s12_3.match(/(\w+)$/m).index == 6 )
	assert(s12_3.match(/(\w+)$/mg).length == 3 )
	assert(s12_3.match(/(\w+)$/mg)[0] == 'second' )
	assert(s12_3.match(/(\w+)$/mg)[1] == 'fourth' )
	assert(s12_3.match(/(\w+)$/mg)[2] == 'sixth' )
	
	//----
	let s13 = 'w;b;a'
	let a13 = s13.split(/;/)
	assert ( a13[0] == 'w' )
	assert ( a13[1] == 'b' )
	assert ( a13[2] == 'a' )
	assert ( a13.length == 3 )
	
	s13 = ';w;b;a'
	a13 = s13.split(/;/)
	assert ( a13[0] == '' )
	assert ( a13[1] == 'w' )
	assert ( a13[2] == 'b' )
	assert ( a13[3] == 'a' )
	assert ( a13.length == 4 )
	
	s13 = ';w;b;a;'
	a13 = s13.split(/;/)
	assert ( a13[0] == '' )
	assert ( a13[1] == 'w' )
	assert ( a13[2] == 'b' )
	assert ( a13[3] == 'a' )
	assert ( a13[4] == '' )
	assert ( a13.length == 5 )
	
	//----
	s13 = 'w;b;a'
	a13 = s13.split(';')
	assert ( a13[0] == 'w' )
	assert ( a13[1] == 'b' )
	assert ( a13[2] == 'a' )
	assert ( a13.length == 3 )
	
	s13 = ';w;b;a'
	a13 = s13.split(';')
	assert ( a13[0] == '' )
	assert ( a13[1] == 'w' )
	assert ( a13[2] == 'b' )
	assert ( a13[3] == 'a' )
	assert ( a13.length == 4 )
	
	s13 = ';w;b;a;'
	a13 = s13.split(';')
	assert ( a13[0] == '' )
	assert ( a13[1] == 'w' )
	assert ( a13[2] == 'b' )
	assert ( a13[3] == 'a' )
	assert ( a13[4] == '' )
	assert ( a13.length == 5 )

	print ( 'ok' );
}

function test_string(){
	print ( '----- String -----' )
	var s = new String('abc ');
	assert ( s['0'] == 'a' )
	assert ( s['1'] == 'b' )
	assert ( s['2'] == 'c' )
	assert ( s['3'] == ' ' )
	assert ( String(s) == 'abc ' )
	assert ( s.trim() == 'abc' )
	s += '123';
	assert ( s == 'abc 123' )
	assert ( s.toString() == 'abc 123' )
	s = new String('Abc');
	assert ( s.toLowerCase() == 'abc' )
	assert ( s.toLocaleLowerCase() == 'abc' )
	assert ( s.toUpperCase() == 'ABC' )
	assert ( s.toLocaleUpperCase() == 'ABC' )
	s = new String(' Abc ');
	assert ( s.trim() == 'Abc' )
	assert ( s.substring(1,2) == 'A' )
	assert ( s.substr(1,1) == 'A' )
	s = new String('1,2,3');
	assert ( s.split(',').length == 3 )
	assert ( s.slice(0,1) == '1' )
	assert ( s.length == 5 )
	assert ( s.charAt(0) == '1' )
	assert ( s.charCodeAt(0) == 49 )
	assert ( s.concat('123') == '1,2,3123' )
	assert ( s.localeCompare('1,1,1') == 1 )
	assert ( s.indexOf(',') == 1 )
	assert ( s.lastIndexOf(',') == 3 )
	assert ( s.search(',') == 1 )
	assert ( s.replace(/,/g, '.') == '1.2.3' )
	assert ( s.match('1')[0] == '1' )
	print ('ok')
}

function test_regExp(){
	print ( '----- RegExp -----' )
	let patt=new RegExp('[0-9].', 'gim')
	assert ( patt.source == '[0-9].' )
	patt.source = ''
	assert ( patt.source == '[0-9].' )
	assert ( patt.lastIndex == 0 )
	patt.lastIndex = 1
	assert ( patt.lastIndex == 1 )
	assert ( patt.global == true ) 
	patt.global = false
	assert ( patt.global == true ) 
	assert ( patt.ignoreCase == true ) 
	patt.ignoreCase = false
	assert ( patt.ignoreCase == true ) 
	assert ( patt.multiline == true ) 
	patt.multiline = false
	assert ( patt.multiline == true ) 

	let patt2 = /[0-9]./gim
	assert ( patt2.source == '[0-9].' )

	let patt3 = patt2.compile()
	assert ( patt3.source == '[0-9].' )
	assert ( patt3.ignoreCase == true ) 
	assert ( patt3.multiline == true ) 
	assert ( patt3.global == true ) 


	let str_1_1 = "aAbc12456def41246ghi";
	let patt4 = /12/
	assert ( patt4.exec(str_1_1).length == 1 )
	assert ( patt4.exec(str_1_1)[0] == '12' )
	assert ( patt4.exec(str_1_1).index == 4 )
	assert ( patt4.lastIndex == 0 )
	patt4.lastIndex = 10
	assert ( patt4.exec(str_1_1)[0] == '12' )
	assert ( patt4.exec(str_1_1).index == 4 )

	patt4 = /12/g
	let patt4_rt = patt4.exec(str_1_1);
	assert ( patt4_rt.length == 1 )
	assert ( patt4_rt[0] == '12' )
	assert ( patt4_rt.index == 4 )
	assert ( patt4.lastIndex == 6 )

	patt4_rt = patt4.exec(str_1_1);
	assert ( patt4_rt[0] == '12' )
	assert ( patt4_rt.index == 13 )
	assert ( patt4.lastIndex == 15 )

	patt4_rt = patt4.exec(str_1_1);
	assert ( patt4_rt == null )
	assert ( patt4.lastIndex == 0 )

	patt4 = /12/
	assert ( patt4.test(str_1_1) == true )
	assert ( patt4.lastIndex == 0 )
	assert ( patt4.test(str_1_1) == true )
	assert ( patt4.lastIndex == 0 )
	assert ( patt4.test(str_1_1) == true )
	assert ( patt4.lastIndex == 0 )

	patt4 = /12/g
	assert ( patt4.test(str_1_1) == true )
	assert ( patt4.lastIndex == 6 )
	assert ( patt4.test(str_1_1) == true )
	assert ( patt4.lastIndex == 15 )
	assert ( patt4.test(str_1_1) == false )
	assert ( patt4.lastIndex == 0 )

	patt4 = /(\w+)$/gm
	str_1_1 = 'First second\nthird fourth\nfifth sixth'
	assert ( patt4.test(str_1_1) == true )
	assert ( patt4.lastIndex == 12 )
	assert ( patt4.test(str_1_1) == true )
	assert ( patt4.lastIndex == 25 )
	assert ( patt4.test(str_1_1) == true )
	assert ( patt4.lastIndex == 37 )
	assert ( patt4.test(str_1_1) == false )
	assert ( patt4.lastIndex == 0 )

	patt4 = /[0-9A-z- ]/
	assert ( patt4.test('***9') == true )
	assert ( patt4.test('***c') == true )
	assert ( patt4.test('** **') == true )
	assert ( patt4.test('**-**') == true )
	assert ( patt4.test('****') == false )
	print ('ok')
}

interface StringArray {
  [index: number]: string;
}
interface StringArray2 {
  [index: string]: string;
}
function test_array(){
	print ( '----- Array ----- ')
	let array = new Array<number>(1,2,3,4);
	assert ( array[0] == 1 );
	assert ( array[1] == 2 );
	assert ( array[2] == 3 );
	assert ( array[3] == 4 );
	let index = 1;
	assert ( array[index] == 2 );
	array[1] = 10;
	assert ( array[1] == 10 );
	let c:string[] = ['1','2','3'];
	assert ( c[0] == '1' );

	let myArray: StringArray;
	myArray = ['Bob', 'Fred'];
	assert ( myArray[0] == "Bob" )
	assert ( myArray[1] == "Fred" )

	for ( let a in myArray ) {
		tprint.putinline('<' + a + '>:' + myArray[a] + ',')
	}
	assert ( tprint.getAndClear() == '<0>:Bob,<1>:Fred,' )

	let myArray2: StringArray={};
	myArray2[0] = 'a';
	myArray2[1] = 'b';
	assert ( myArray2[0] === 'a' );
	assert ( myArray2[1] === 'b' );
	for ( let a in myArray2 ) {
		tprint.putinline('<' + a + '>:' + myArray2[a] + ',')
	}
	assert ( tprint.getAndClear() == '<0>:a,<1>:b,' )

	let myArray3: StringArray2;
	myArray3 = {};
	myArray3['a'] = 'a boy';
	myArray3['b'] = 'b boy';
	assert ( myArray3['a'] === 'a boy' );
	assert ( myArray3['b'] === 'b boy' );
	for ( let a in myArray3 ) {
		tprint.putinline('<' + a + '>:' + myArray3[a] + ',')
	}
	assert ( tprint.getAndClear() == '<a>:a boy,<b>:b boy,' )

	myArray = {};
	myArray[0] = "Bob";
	myArray[1] = "Fred";
	myArray[2] = "Tree";
	assert ( myArray[0] == "Bob" );
	assert ( myArray[1] == "Fred" );
	assert ( myArray[2] == "Tree" );

	var myTuple: [number, string] = [3, "three"]; 
	assert ( myTuple[0] == 3 );
	assert ( myTuple[1] == "three" );
	
	let arr2:Array<number> = new Array<number>(1,2,3,4);
	assert ( arr2.length == 4 )
	let arr3:Array<number> = new Array<number>(4);
	assert ( arr3.length == 4 )
	assert ( arr3[0] == 0 )
	assert ( arr3[1] == 0 )
	assert ( arr3[3] == 0 )
	let arr4:Array<string> = new Array<string>('4');
	assert ( arr4.length == 1 )
	
	let arr5 = new Array<number>(10,20,30,40);
	let rt = arr5.reduceRight(function(previousValue, currentValue, currentIndex, array){
		tprint.putinline('pv:' + previousValue + ';');
		tprint.putinline('cv:' + currentValue + ';');
		tprint.putinline('idx:' + currentIndex + ';|');
		assert ( array[currentIndex] == currentValue );
		return 100;
	})
	assert ( tprint.getAndClear() == 'pv:40;cv:30;idx:2;|pv:100;cv:20;idx:1;|pv:100;cv:10;idx:0;|' );
	assert ( rt == 100 )
	
	rt = arr5.reduce(function(previousValue, currentValue, currentIndex, array){
		tprint.putinline('pv:' + previousValue + ';');
		tprint.putinline('cv:' + currentValue + ';');
		tprint.putinline('idx:' + currentIndex + ';|');
		assert ( array[currentIndex] == currentValue );
		return 100;
	})
	assert ( tprint.getAndClear() == 'pv:10;cv:20;idx:1;|pv:100;cv:30;idx:2;|pv:100;cv:40;idx:3;|' );
	assert ( rt == 100 )
	
	let f = [20,40];
	let rt2 = arr5.filter(function(currentValue, currentIndex, array){
		assert ( array[currentIndex] == currentValue );
		return ( currentValue != f[0] && currentValue != f[1] );
	});
	assert ( rt2.length == 2 );
	assert ( rt2[0] == 10 );
	assert ( rt2[1] == 30 );
	
	let rt3 = arr5.map(function(currentValue, currentIndex, array){
		assert ( array[currentIndex] == currentValue );
		return currentValue*currentValue;
	});
	assert ( rt3.length == 4 );
	assert ( rt3[0] == 10*10 );
	assert ( rt3[1] == 20*20 );
	assert ( rt3[2] == 30*30 );
	assert ( rt3[3] == 40*40 );
	
	
	let sum = 0
	arr5.forEach(function(currentValue, currentIndex, array){
		assert ( array[currentIndex] == currentValue );
		sum += currentValue
	});
	assert ( sum == 10+20+30+40 )	
	
	let rt4 = arr5.some(function(currentValue, currentIndex, array){
		assert ( array[currentIndex] == currentValue );
		if ( currentValue == 30 ) return true;
		return false;
	});
	assert ( rt4 == true )
	
	let rt5 = arr5.some(function(currentValue, currentIndex, array){
		return false;
	});
	assert ( rt5 == false )
	
	let rt6 = arr5.every(function(currentValue, currentIndex, array){
		assert ( array[currentIndex] == currentValue );
		if ( currentValue == 30 ) return true;
		return false;
	});
	assert ( rt6 == false )
	
	let rt7 = arr5.every(function(currentValue, currentIndex, array){
		assert ( array[currentIndex] == currentValue );
		return true;
	});
	assert ( rt7 == true )
	
	let arr8 = ["Banana", "Orange", "Apple", "Mango", "Banana", "Orange", "Apple"];
	let rt8 = arr8.lastIndexOf("Apple");
	assert ( rt8 == 6 );
	rt8 = arr8.lastIndexOf("Apple", 4);
	assert ( rt8 == 2 );
	rt8 = arr8.lastIndexOf("Apple", 2);
	assert ( rt8 == 2 );
	rt8 = arr8.lastIndexOf("Apple", 1);
	assert ( rt8 == -1 );
	rt8 = arr8.lastIndexOf("Apple", 0);
	assert ( rt8 == -1 );
	
	rt8 = arr8.indexOf("Apple");
	assert ( rt8 == 2 );
	rt8 = arr8.indexOf("Apple", 1);
	assert ( rt8 == 2 );
	rt8 = arr8.indexOf("Apple", 2);
	assert ( rt8 == 2 );
	rt8 = arr8.indexOf("Apple", 3);
	assert ( rt8 == 6 );
	rt8 = arr8.indexOf("Apple", 9);
	assert ( rt8 == -1 );
	
	let arr9 = ["Banana"];
	arr9.unshift("Lemon","Pineapple");
	assert ( arr9.length == 3 )
	assert ( arr9[0] == 'Lemon' )
	assert ( arr9[1] == 'Pineapple' )
	assert ( arr9[2] == 'Banana' )
	
	var arr10 = ["Banana", "Orange", "Apple", "Mango"];
	arr10.splice(2, 1, "Lemon", "Kiwi");
	assert ( arr10.length == 5 )
	assert ( arr10[0] == 'Banana' )
	assert ( arr10[1] == 'Orange' )
	assert ( arr10[2] == 'Lemon' )
	assert ( arr10[3] == 'Kiwi' )
	assert ( arr10[4] == 'Mango' )
	
	arr10 = ["Banana", "Orange", "Apple", "Mango"];
	arr10.splice(2, 2);
	assert ( arr10.length == 2 )
	assert ( arr10[0] == 'Banana' )
	assert ( arr10[1] == 'Orange' )
	
	let arr11 = [1,3,2,5];
	arr11.sort(function(a1, a2){
		return a1 - a2;
	});
	assert(arr11[0] == 1 );
	assert(arr11[1] == 2 );
	assert(arr11[2] == 3 );
	assert(arr11[3] == 5 );
	
	arr11 = [1,3,2,5];
	arr11.sort(function(a1, a2){
		return a2 - a1;
	});
	assert(arr11[0] == 5 );
	assert(arr11[1] == 3 );
	assert(arr11[2] == 2 );
	assert(arr11[3] == 1 );
	
	let arr12 = [1,2,3,4];
	let rt12 = arr12.slice();
	assert ( rt12.length == 4 );
	assert ( rt12[0] == 1 );
	assert ( rt12[1] == 2 );
	assert ( rt12[2] == 3 );
	assert ( rt12[3] == 4 );
	rt12[3] = 10;
	assert ( arr12[3] == 4 );
	
	rt12 = arr12.slice(-2, -1);
	assert ( rt12.length == 1 );
	assert ( rt12[0] == 3 );
	
	rt12 = arr12.slice(-2);
	assert ( rt12.length == 2 );
	assert ( rt12[0] == 3 );
	assert ( rt12[1] == 4 );
	
	rt12 = arr12.slice(2);
	assert ( rt12.length == 2 );
	assert ( rt12[0] == 3 );
	assert ( rt12[1] == 4 );
	
	rt12 = arr12.slice(-2, -2);
	assert ( rt12.length == 0 );
	
	rt12 = arr12.slice(1, 2);
	assert ( rt12.length == 1 );
	assert ( rt12[0] == 2 );
	
	rt12 = arr12.slice(1, 7);
	assert ( rt12.length == 3 );
	assert ( rt12[0] == 2 );
	assert ( rt12[1] == 3 );
	assert ( rt12[2] == 4 );
	
	rt12 = arr12.slice(-100, 7);
	assert ( rt12.length == 4 );
	assert ( rt12[0] == 1 );
	assert ( rt12[1] == 2 );
	assert ( rt12[2] == 3 );
	assert ( rt12[3] == 4 );
	
	rt12 = arr12.slice(-100, -99);
	assert ( rt12.length == 0 );
	
	let arr13 = [1,2,3,4];
	assert ( arr13.shift() == 1 );
	assert ( arr13.length == 3 );
	assert ( arr13.shift() == 2 );
	assert ( arr13.length == 2 );
	assert ( arr13.shift() == 3 );
	assert ( arr13.length == 1 );
	assert ( arr13.shift() == 4 );
	assert ( arr13.length == 0 );
	assert ( arr13.shift() == null );
	assert ( arr13.length == 0 );
	assert ( arr13.shift() == undefined );
	
	
	let arr14 = [1,3,2];
	arr14.reverse();
	assert ( arr14[0] == 2 );
	assert ( arr14[1] == 3 );
	assert ( arr14[2] == 1 );
	
	arr14 = [1,3,2,5];
	arr14.reverse();
	assert ( arr14[0] == 5 );
	assert ( arr14[1] == 2 );
	assert ( arr14[2] == 3 );
	assert ( arr14[3] == 1 );
	
	let arr15 = new Array("George", "John", "Thomas");
	assert ( arr15.join() == "George,John,Thomas" );
	assert ( arr15.join(".") == "George.John.Thomas" );
	
	let arr16 = new Array(3)
	arr16[0] = "George"
	arr16[1] = "John"
	arr16[2] = "Thomas"
	let arr16_1 = new Array(3)
	arr16_1[0] = "James"
	arr16_1[1] = "Adrew"
	arr16_1[2] = "Martin"
	let arr16_2 = new Array(2)
	arr16_2[0] = "William"
	arr16_2[1] = "Franklin"
	let rt16 = arr16.concat();
	assert ( rt16[0] == 'George' )
	assert ( rt16[1] == 'John' )
	assert ( rt16[2] == 'Thomas' )
	rt16[0] = 'qjb'
	assert ( arr16[0] == 'George' )
	rt16 = arr16.concat('qjb', arr16_1, 2, arr16_2)
	assert ( rt16.length == 10 )
	assert ( rt16[0] == 'George' )
	assert ( rt16[1] == 'John' )
	assert ( rt16[2] == 'Thomas' )
	assert ( rt16[3] == 'qjb' )
	assert ( rt16[4] == 'James' )
	assert ( rt16[5] == 'Adrew' )
	assert ( rt16[6] == 'Martin' )
	assert ( rt16[7] == 2 )
	assert ( rt16[8] == 'William' )
	assert ( rt16[9] == 'Franklin' )
	
	let arr17 = [1,2,3,4];
	assert ( arr17.pop() == 4 );
	assert ( arr17.length == 3 );
	assert ( arr17.pop() == 3 );
	assert ( arr17.length == 2 );
	assert ( arr17.pop() == 2 );
	assert ( arr17.length == 1 );
	assert ( arr17.pop() == 1 );
	assert ( arr17.length == 0 );
	assert ( arr17.pop() == null );
	assert ( arr17.length == 0 );
	assert ( arr17.pop() == undefined );
	
	let arr18 = [1,2];
	arr18.push(3);
	arr18.push(4,5);
	assert ( arr18[0] == 1 );
	assert ( arr18[1] == 2 );
	assert ( arr18[2] == 3 );
	assert ( arr18[3] == 4 );
	assert ( arr18[4] == 5 );
	
	let arr19 = [1,2,'3'];
	assert ( arr19.toString() == '1,2,3' )
	assert ( arr19.toLocaleString() == '1,2,3' )

	print('ok')
}

function test_function(){
	function buildName(firstName: string, lastName: string = "Smith") {
		return firstName + " " + lastName;
	}

	assert ( buildName("Bob") =='Bob Smith' )
	assert ( buildName("Bob", "Adams") ==  'Bob Adams' )
	
	
	function buildName2(firstName: string, ...restOfName: string[]) {
		return firstName + " " + restOfName.join(" ");
	}
	var employeeName = buildName2("Joseph", "Samuel", "Lucas", "MacKinzie");
	assert ( employeeName == 'Joseph Samuel Lucas MacKinzie' );
	
	/** not support
	var deck = {
		suits: ["hearts", "spades", "clubs", "diamonds"],
		cards: Array(52),
		createCardPicker: function() {
			// Notice: the line below is now a lambda, allowing us to capture 'this' earlier
			return () => {
				var pickedCard = Math.floor(Math.random() * 52);
				var pickedSuit = Math.floor(pickedCard / 13);
				
				return {suit: this.suits[pickedSuit], card: pickedCard % 13};  // not support this
			}
		}
	}

	var cardPicker = deck.createCardPicker();
	var pickedCard = cardPicker();

	alert("card: " + pickedCard.card + " of " + pickedCard.suit);
	*/
}
	
function test_lambda(){
	print ( '----- (x)=> x*x ----- ')
	let a = (x) => x*x
	assert ( a(10) == 100 )
	print ('ok')
}

class CustomError {
	public code:number = 100;
}

function test_tryStatement(){
	print ( '----- ThrowStatement, TryStatement, CatchClause -----' )
	try {
		tprint.putinline('try;')
	} 
	catch(err) {
		tprint.putinline('catch;')
	}
	finally {
		tprint.putinline('finally;')
	}
	assert ( tprint.getAndClear() == 'try;finally;' )
	
	try {
		tprint.putinline('try;')
		throw(new CustomError);
		tprint.putinline('try2;')
	} 
	catch(err) {
		tprint.putinline('catch;')
		tprint.putinline(err.code+';');
	}
	finally {
		tprint.putinline('finally;')
	}
	assert ( tprint.getAndClear() == 'try;catch;100;finally;' )
	
	print ('ok')
}

enum Color {
	Red, 
	Green, 
	Blue
};
enum Color2 {
	Red, 
	Green=3, 
	Blue
}
function test_enum(){
	print ( '----- enum ----- ')
	assert ( Color.Red == 0 )
	assert ( Color.Green == 1 )
	assert ( Color.Blue == 2 )
	assert ( Color2.Red == 0 )
	assert ( Color2.Green == 3 )
	assert ( Color2.Blue == 4 )	
	print ('ok')
}

interface SquareConfig {
	color?: string;
	width?: number;
}
function test_dict(){
	print ( '----- dict ----- ')
	function createSquare(config: SquareConfig): {color: string; area: number} {
		var newSquare = {color: "white", area: 100};
		if (config.color) {
			newSquare.color = config.color;
		}
		if (config.width) {
			newSquare.area = config.width * config.width;
		}
		return newSquare;
	}
	var mySquare = createSquare({color: "black", width:20});
	assert ( mySquare.area == 400 )
	assert ( mySquare.color == 'black' )
	print ('ok')
}

module Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    var lettersRegexp = /^[A-Za-z]+$/;
    var numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

import demo = require('./test_going_external');
import Circle = require('./test_export_one');

module Shapes {
    export module Polygons {
        export class Triangle { 
		}
        export class Square {
			private _r:number = 0;
			public constructor(r:number){
				this._r = r;
			}
			
			public getR():number{
				return this._r;
			}
		}
    }
}
import polygons = Shapes.Polygons;

function test_export_module_require(){
	print ( '----- export module require ----- ')
	// Some samples to try
	var strings = ['Hello', '98052', '101'];
	// Validators to use
	var validators: { [s: string]: Validation.StringValidator; } = {};
	validators['ZIP code'] = new Validation.ZipCodeValidator();
	validators['Letters only'] = new Validation.LettersOnlyValidator();
	// Show whether each string passed each validator
	strings.forEach(s => {
		for (var name in validators) {
			tprint.put('"' + s + '" ' + (validators[name].isAcceptable(s) ? ' matches ' : ' does not match ') + name);
		}
	});
	assert ( tprint.getAndClear() == '"Hello"  does not match ZIP code\n"Hello"  matches Letters only\n"98052"  matches ZIP code\n"98052"  does not match Letters only\n"101"  does not match ZIP code\n"101"  does not match Letters only\n' )
	
	assert ( (new demo.Persion('qjb')).getName() === 'qjb' );
	assert ( (new demo.Rect(10)).getArea() === 10*10 );
	assert ( (new Circle(10)).getR() == 10 )
	
	var sq = new polygons.Square(10);
	assert ( sq.getR() == 10 );
	
	/** not support
	function buildLabel(name: string): string {
		return buildLabel.prefix + name + buildLabel.suffix;
	}
	module buildLabel {
		export var suffix = "";
		export var prefix = "Hello, ";
	}
	print(buildLabel("Sam Smith"));
	*/
	
	print ( 'ok' )
}

function test_math(){
	print ( '----- Math lib ----- ')
	assert ( Math.max(1,3,2,4,1) == 4 )
	assert ( Math.min(1,3,2,4,1) == 1 )
	assert ( Math.round(0.5) == 1 )
	assert ( Math.round(0.99999) == 1 )
	assert ( Math.round(0.49999) == 0 )
	assert ( Math.pow(2, 8) == 256 )
	print ( 'ok' )
}

//-------------------------------
function test_all(){
	test_class();
	test_continue_for()
	test_continue_for_in()
	test_continue_for_of()
	test_while()
	test_do_while()
	test_if();
	test_prefixUnaryExpressionAndPostfixUnaryExpression();
	test_binaryExpression()
	test_bitBinaryExpression()
	test_threeElemBinaryExpression();
	test_threeElemBitBinaryExpression();
	test_conditional()
	test_get_set();
	test_switch()
	test_rawString();
	test_string()
	test_regExp()
	test_array()
	test_function()
	test_lambda()
	test_tryStatement()
	test_enum()
	test_dict()
	test_export_module_require()
	test_math()
	//test_withStatement()
	print ( '[all test ok!]' )
}
test_all();
