print=console.log.bind(console);
var C=require('./compiler.js');
print(C.Expr(Symbol("XX1")));
print(C.Expr("XX2"));
print(C.Expr(112));
print(C.Expr([Symbol("XXF1")]));
print(C.Expr([Symbol("XXF"),1,2,3]));
print(C.Expr([Symbol("XX"),1,2,"xx","yy",Symbol("wut")]));
print(C.Block([[Symbol("XX1"),1,"xxy"],
		      [Symbol("XX2"),12,"xxz"],
		      [Symbol("XX3"),44,"xxg"]]));
print(C.Func("eep",["a","b","c"],
	     [Symbol('print'),'x'],
	     [Symbol('print'),'x'],
	     [Symbol('print'),'x']));
print(C.Setq(Symbol("eep"),[Symbol("list"),"a","b","c"]));
