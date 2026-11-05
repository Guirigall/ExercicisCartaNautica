// Analitzador aritmètic local. No executa JavaScript ni utilitza eval.
export function calculate(expression){
 const source=String(expression).replace(/,/g,'.').trim();if(!source||source.length>500)throw Error('Escriu una expressió de fins a 500 caràcters.');
 const tokens=[];let at=0;
 while(at<source.length){const part=source.slice(at),m=part.match(/^\s+|^(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?|^[a-z]+|^[+*/^()\-]/i);if(!m)throw Error('Caràcter no admès.');at+=m[0].length;if(!/^\s/.test(m[0]))tokens.push(m[0].toLowerCase());if(tokens.length>200)throw Error('Expressió massa llarga.');}
 let i=0,depth=0;const rad=x=>x*Math.PI/180,deg=x=>x*180/Math.PI;
 const functions={sin:x=>Math.sin(rad(x)),cos:x=>Math.cos(rad(x)),tan:x=>Math.tan(rad(x)),asin:x=>deg(Math.asin(x)),acos:x=>deg(Math.acos(x)),atan:x=>deg(Math.atan(x)),sqrt:Math.sqrt,abs:Math.abs,ln:Math.log,log:Math.log10};
 function atom(){if(++depth>32)throw Error('Massa nivells de parèntesis.');let t=tokens[i++],n;if(t==='('){n=sum();if(tokens[i++]!==')')throw Error('Falta tancar un parèntesi.');}else if(t==='pi')n=Math.PI;else if(Object.hasOwn(functions,t)){if(tokens[i++]!=='(')throw Error('La funció necessita parèntesis.');n=functions[t](sum());if(tokens[i++]!==')')throw Error('Falta tancar la funció.');}else if(t&&/^(\d|\.)/.test(t))n=Number(t);else throw Error('Falta un nombre o una funció vàlida.');depth--;return n;}
 function power(){let n=atom();if(tokens[i]==='^'){i++;n=n**unary();}return n;}
 function unary(){if(tokens[i]==='+'){i++;return unary();}if(tokens[i]==='-'){i++;return -unary();}return power();}
 function product(){let n=unary();while(['*','/'].includes(tokens[i])){const op=tokens[i++],r=unary();n=op==='*'?n*r:n/r;}return n;}
 function sum(){let n=product();while(['+','-'].includes(tokens[i])){const op=tokens[i++],r=product();n=op==='+'?n+r:n-r;}return n;}
 const result=sum();if(i!==tokens.length)throw Error('Expressió incompleta o operador absent.');if(!Number.isFinite(result))throw Error('Resultat no finit: revisa divisió per zero o domini de les funcions.');return result;
}
