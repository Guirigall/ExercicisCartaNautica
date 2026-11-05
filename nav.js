// Navegació loxodròmica en esfera: R = 60*180/pi milles nàutiques.
export const rad=d=>d*Math.PI/180, deg=r=>r*180/Math.PI;
export const norm=d=>{const n=(d%360+360)%360;return n<1e-10||360-n<1e-10?0:n;};
export const merc=lat=>Math.log(Math.tan(Math.PI/4+rad(lat)/2));
const R=60*180/Math.PI;
export function point(lat,lon){if(!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>=85||Math.abs(lon)>180)throw Error('Coordenades fora de rang (latitud entre −85° i 85°, longitud entre −180° i 180°).');return {lat,lon};}
export function vector(course,speed){return {e:speed*Math.sin(rad(course)),n:speed*Math.cos(rad(course))};}
export function polar(v){return {course:norm(deg(Math.atan2(v.e,v.n))),speed:Math.hypot(v.e,v.n)};}
export function forward(p,course,distance){
 if(!Number.isFinite(distance)||distance<0)throw Error('La distància ha de ser positiva.');
 const phi=rad(p.lat),theta=rad(norm(course)),dp=distance/R*Math.cos(theta),phi2=phi+dp;
 if(Math.abs(phi2)>=rad(85))throw Error('Trajecte fora del domini de càlcul.');
 const dm=merc(deg(phi2))-merc(p.lat),q=Math.abs(dm)>1e-12?dp/dm:Math.cos(phi);
 const dl=distance/R*Math.sin(theta)/q;
 return point(deg(phi2),norm(p.lon+deg(dl)+180)-180);
}
export function inverse(a,b){
 const dp=rad(b.lat-a.lat),dm=merc(b.lat)-merc(a.lat);
 let dl=rad(b.lon-a.lon);if(Math.abs(dl)>Math.PI)dl-=Math.sign(dl)*2*Math.PI;
 const q=Math.abs(dm)>1e-12?dp/dm:Math.cos(rad(a.lat));
 return {course:norm(deg(Math.atan2(dl,dm))),distance:Math.hypot(dp,q*dl)*R};
}
export function estimate(p,ra,dm,dev,leeway,speed,hours){
 if(![ra,dm,dev,leeway,speed,hours].every(Number.isFinite)||speed<0||hours<=0)throw Error('Velocitat no negativa, durada superior a zero i dades numèriques finites.');
 const rv=norm(ra+dm+dev),rs=norm(rv+leeway),distance=speed*hours,end=forward(p,rs,distance);
 return {rv,rs,end,water:end,ground:{course:speed>0?rs:null,speed},distance};
}
export function fix(a,da,b,db){
 // Les demores loxodròmiques són rectes en coordenades de Mercator.
 const va={x:Math.sin(rad(da)),y:Math.cos(rad(da))},vb={x:Math.sin(rad(db)),y:Math.cos(rad(db))};
 const ax=rad(a.lon),ay=merc(a.lat),bx=rad(b.lon),by=merc(b.lat),det=va.x*vb.y-va.y*vb.x;
 if(Math.abs(det)<Math.sin(rad(5)))throw Error('Demores paral·leles o angle de tall inferior a 5°: situació inestable.');
 const t=((bx-ax)*vb.y-(by-ay)*vb.x)/det,x=ax+t*va.x,y=ay+t*va.y;
 const p=point(deg(2*Math.atan(Math.exp(y))-Math.PI/2),deg(x));
 const error=(x,y)=>Math.abs(((x-y+540)%360)-180);
 if(error(inverse(p,a).course,da)>1||error(inverse(p,b).course,db)>1)throw Error('La intersecció queda darrere d’una de les visuals: revisa el sentit de les demores (vaixell → referència).');
 return p;
}
export function coord(value,latitude=true){
 const s=String(value).trim().replace(/−/g,'-').replace(/,/g,'.').toUpperCase();
 if(!s)throw Error('Falta una coordenada.');
 const nums=s.match(/[-+]?\d+(?:\.\d+)?/g);
 if(!nums||nums.length>3||/[A-CF-MP-RT-VX-Z]/.test(s.replace(/[NSEWO]/g,'')))throw Error('Coordenada no reconeguda: usa graus decimals o 36° 05,2 N.');
 const [d,m='0',sec='0']=nums.map(Number);if(m<0||m>=60||sec<0||sec>=60)throw Error('Minuts i segons han de ser entre 0 i 60.');
 if(latitude&&/[EWO]/.test(s)||!latitude&&/[NS]/.test(s))throw Error('Hemisferi incompatible amb la coordenada.');
 const neg=d<0||/[SWO]/.test(s),v=(Math.abs(d)+m/60+sec/3600)*(neg?-1:1);
 if(Math.abs(v)>(latitude?85:180))throw Error('Coordenada fora de rang.');return v;
}
export function formatCoord(v,latitude=true){let d=Math.floor(Math.abs(v)),m=+(60*(Math.abs(v)-d)).toFixed(3);if(m>=60){d++;m=0;}return `${d}° ${m.toFixed(3).padStart(6,'0')}′ ${latitude?(v>=0?'N':'S'):(v>=0?'E':'W')}`;}
const cleanAngle=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/−/g,'-').replace(/,/g,'.').trim();
export function correction(value){const s=cleanAngle(value),m=s.match(/^([-+]?\d+(?:\.\d+)?)\s*[°º]?\s*(NW|NE|W|O|E)?$/);if(!m)throw Error('Correcció no reconeguda. Usa −4, 4° NW o 2° NE.');return m[2]?Math.abs(Number(m[1]))*(['NW','W','O'].includes(m[2])?-1:1):Number(m[1]);}
export function marking(value){const m=cleanAngle(value).match(/^([-+]?\d+(?:\.\d+)?)\s*[°º]?\s*(ER\.?|BR\.?|STBD|STARBOARD|PORT|TRIBORD|ESTRIBOR[D]?|BABOR[D]?|BABORD)?$/);if(!m)throw Error('Marcació no reconeguda. Usa 20 Er, 20 Br o graus circulars.');const n=Number(m[1]);if(Math.abs(n)>360)throw Error('La marcació ha de ser entre −360° i 360°.');return m[2]?Math.abs(n)*((m[2].startsWith('B')||m[2]==='PORT')?-1:1):n;}
export function heading(value){const s=cleanAngle(value).replace(/\s*\/\s*V$/,'');const cardinals={N:0,NE:45,E:90,SE:135,S:180,SW:225,SO:225,W:270,O:270,NW:315,NO:315,NORD:0,NORTE:0,NORTH:0,EST:90,ESTE:90,EAST:90,LLEVANT:90,LEVANTE:90,SUD:180,SUR:180,SOUTH:180,OEST:270,OESTE:270,OUEST:270,WEST:270,PONENT:270,PONIENTE:270};if(Object.hasOwn(cardinals,s))return cardinals[s];const m=s.match(/^([-+]?\d+(?:\.\d+)?)\s*[°º]?$/);if(!m)throw Error('Direcció no reconeguda. Usa graus, N/v, S/v, E/v, W/v o llevant/ponent.');return norm(Number(m[1]));}
export function surfaceCourse(rv,windFrom,abatement){if(![rv,windFrom,abatement].every(Number.isFinite)||abatement<0||abatement>=90)throw Error('Abatiment entre 0° i 90°, sense signe.');const cross=Math.sin(rad(windFrom+180-rv));if(abatement>0&&Math.abs(cross)<1e-10)throw Error('Vent per proa o popa: no es pot deduir el costat d’un abatiment no nul.');const signed=abatement===0?0:Math.sign(cross)*abatement;return {signed,rs:norm(rv+signed),side:signed>0?'estribord':signed<0?'babord':'sense abatiment'};}
