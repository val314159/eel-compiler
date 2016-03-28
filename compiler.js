function atom(x){return(typeof(x)!=='object'||typeof(x.length)!=='number')}
function Compiler(){}
var C=module.exports=Compiler;
C.compileSymbol=function(x){return String(x).slice(7,-1);}
C.compileString=function(x){return JSON.stringify(x);}
C.compileAtom=function(x){
    if(typeof(x)==='symbol')	return C.compileSymbol(x);
    if(typeof(x)==='string')	return C.compileString(x);
    return ""+x;
};
C.compileList=function(x){
    var fn=x[0];
    if(typeof(fn)!=='symbol') print("MASSIVE ERROR THE CAR ISNT A SYMBOL");
    fn = C.compileSymbol(fn);
    var args=[];
    for(var n=1;n<x.length;n++){
	var v=x[n];
	args.push( C.compileExpr(v) );
    }
    return fn+"("+args.join(",")+")";
};
C.compileExpr=function(x){
    return atom(x)?C.compileAtom(x):C.compileList(x)};
C.compileBlock=function(body){
    var arr=[];
    for(var n=0;n<body.length;n++){
	var v=body[n];
	arr.push( C.compileExpr(v) );
    }
    return "{"+arr.join(";")+"}";
};
C.compileParms=function(args){
    var arr=[];
    for(var n=0;n<args.length;n++){
	var v=args[n];
	arr.push(typeof(v)==='symbol'?C.compileSymbol(v):v);    
    }
    return "("+arr.join(',')+")";
};
C.compileFunc=function(name,args,body){
    name = name || "";
    var a = C.compileParms(args);
    var b = C.compileBlock(body);
    return "(function "+name+a+b+")";
};
C.compileSetq=function(name,value){
    return ""+C.compileAtom(name)+"="+C.compileExpr(value)+";";
};
