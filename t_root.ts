///<reference path="lua_common.d.ts"/>
import utest = require('lua_utest');
import root = require('root');

class RootCase extends utest.Case {
	public setUp() {
	}
	
	public tearDown() {
	}
	
	public test_first() {
		utest.assertEqual(1,2,'ok');
	}
	
	public test_sec() {
		utest.assertEqual(null,0,'failed');
	}
}

let suite = new utest.Suite();
suite.addCase(new RootCase());

let starttime = os.clock()
let result = suite.run();
let needtime = os.clock() - starttime;
print('--------------------------------------')
print(result.summary(), 'sec:' + needtime);
print('--------------------------------------')
