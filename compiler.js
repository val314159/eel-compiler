// compiler.js
function Compiler(){}
var C=Compiler;
C._Macros={
    'if': function(a,b,c){return("("+C.Expr(a)+")?("+C.Expr(b)+"):("+C.Expr(c)+")");},
    'progn': function(){return C.Block([].slice.apply(arguments,[0]))}};
C.nul=function(x){return x.length===0};
C.atom=function(x){return typeof(x)!=='object'||typeof(x.length)!=='number'||x.length===0};
C.Symbol=function(x){return x.toString().slice(7,-1);}
C.String=function(x){return JSON.stringify(x);}
C.Expr=function(x){return C.atom(x)?C.Atom(x):C.List(x)};
C.Block=function(body){return "{"+body.map(C.Expr).join(";")+"}";};
C.Setq=function(name,value){return ""+C.Atom(name)+"="+C.Expr(value)+";";};
C.SoS=function(v){return typeof(v)==='symbol'?C.Symbol(v):v;};
C.Parms=function(args){return "("+args.map(C.SoS).join(',')+")"};
C.Atom=function(x){ return(C.nul(x)?"nil":
			   typeof(x)==='symbol'?C.Symbol(x):
			   typeof(x)==='string'?C.String(x):""+x)};
C.List=function(x){
    var mac,fn=x[0];
    if(typeof(fn)==='symbol') fn=C.Symbol(fn)
    if(mac=C.atom(fn) && C._Macros[fn])return mac.apply(null,x.slice(1))
    else if(fn[0]&&C.Symbol(fn[0])==='lambda')fn=C.Func.apply(null,fn)
    else if(typeof(fn)!=='string')
	print("MASSIVE ERROR THE CAR ISNT A SYMBOL/LAMBDA",fn, typeof(fn));
    return "_="+C.SoS(fn)+"("+x.slice(1).map(C.Expr).join(",")+")"}
C.File=function(body,useReturn){
    return "{"+body.map(function(v,n,a){
	return((n==a.length-1&&useReturn===true)?"return ":"")+C.Expr(v);
    }).join(";")+"}";};
C.Func=function(name,args){
    var body=Array.prototype.slice.apply(arguments,[2]);
    name=name||"";
    if(C.SoS(name)=='lambda')name="";
    return "(function "+name+C.Parms(args)+C.File(body,true)+")";};
try{module.exports=C;}catch(e){}
