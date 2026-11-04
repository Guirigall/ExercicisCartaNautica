import {norm,deg,forward} from './nav.js';
export function arcPoints(center,radius,start,sweep){
 const count=Math.max(1,Math.ceil(Math.abs(sweep)/2));
 return Array.from({length:count+1},(_,i)=>forward(center,start+sweep*i/count,radius));
}
export function extendedLine(a,b,width,height){
 const dx=b.x-a.x,dy=b.y-a.y;if(Math.hypot(dx,dy)<1e-9)return null;
 let lo=-Infinity,hi=Infinity;
 for(const [v,d,max]of [[a.x,dx,width],[a.y,dy,height]]){
  if(Math.abs(d)<1e-12){if(v<0||v>max)return null;continue;}
  const t0=-v/d,t1=(max-v)/d;lo=Math.max(lo,Math.min(t0,t1));hi=Math.min(hi,Math.max(t0,t1));
 }
 return lo<=hi?{a:{x:a.x+lo*dx,y:a.y+lo*dy},b:{x:a.x+hi*dx,y:a.y+hi*dy}}:null;
}
// Angle de carta des del nord en sentit horari; y creix cap avall.
export function screenBearing(a,b){return norm(deg(Math.atan2(b.x-a.x,a.y-b.y)));}
export function squareRay(degrees,halfSize){
 const a=degrees*Math.PI/180,x=Math.sin(a),y=-Math.cos(a),scale=halfSize/Math.max(Math.abs(x),Math.abs(y));
 return {x:x*scale,y:y*scale};
}
export function hinge(a,b,minHeight=20){
 const dx=b.x-a.x,dy=b.y-a.y,length=Math.hypot(dx,dy),height=Math.max(minHeight,length*.65);
 const nx=length?dy/length:0,ny=length?-dx/length:-1;
 return {x:(a.x+b.x)/2+nx*height,y:(a.y+b.y)/2+ny*height};
}
export function translatePair(a,b,dx,dy){return {a:{x:a.x+dx,y:a.y+dy},b:{x:b.x+dx,y:b.y+dy}};}
