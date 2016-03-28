print=console.log.bind(console);
var C=require('./compiler.js');
print(C.compileExpr(Symbol("XX1")));
print(C.compileExpr("XX2"));
print(C.compileExpr(112));
print(C.compileExpr([Symbol("XXF")]));
print(C.compileExpr([Symbol("XXF"),1,2,3]));
print(C.compileExpr([Symbol("XX"),1,2,"xx","yy",Symbol("wut")]));
print(C.compileBlock([[Symbol("XX1"),1,"xxy"],
		      [Symbol("XX2"),12,"xxz"],
		      [Symbol("XX3"),44,"xxg"]]));
print(C.compileFunc("eep",["a","b","c"],
		    [[Symbol('print'),'x'],
		     [Symbol('print'),'x'],
		     [Symbol('print'),'x']]));
print(C.compileSetq(Symbol("eep"),[Symbol("list"),"a","b","c"]));
