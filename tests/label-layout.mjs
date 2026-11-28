import assert from 'node:assert/strict';
import {layoutLabels} from '../lib/label-layout.ts';

// Downtown station points measured in a 661 x 705 map viewport with 13 active stations.
const stations=[
 ['place-north',373,297,112,88],['place-tumnl',365,360,112,64],
 ['place-pktrm',370,333,112,64],['place-state',384,323,112,64],
 ['place-harsq',205,267,112,64],['place-haecl',382,307,112,64],
 ['place-mlmnl',336,56,112,64],['place-bbsta',331,369,112,64],
 ['place-forhl',220,553,112,64],['place-aqucl',401,320,112,64],
 ['place-coecl',326,359,112,64],['place-aport',463,263,112,64],
 ['place-ogmnl',344,17,112,64],
].map(([id,x,y,width,height])=>({id,x,y,width,height}));
const placed=layoutLabels(stations,661,705);
const aquarium=placed.find(p=>p.id==='place-aqucl');
const tufts=placed.find(p=>p.id==='place-tumnl');
if(aquarium&&tufts)assert(aquarium.left>tufts.left,'Aquarium label should be east of Tufts');
assert.equal(placed.length,stations.length,'Every station must retain a visible card label');
assert(placed.length>=5,'Overview should still show useful card labels');
assert.deepEqual(layoutLabels([...stations].reverse(),661,705),placed,'Layout must be stable regardless of feed order');
const spread=stations.map(p=>({...p,x:p.x*8,y:p.y*8}));
assert.equal(layoutLabels(spread,661*8,705*8).length,stations.length,'Zooming in should reveal all separated station labels');
const turn=(p,q,r)=>(q.x-p.x)*(r.y-p.y)-(q.y-p.y)*(r.x-p.x);
const crosses=(a,b)=>{
 const p={x:a.x,y:a.y},q={x:a.endX,y:a.endY},r={x:b.x,y:b.y},s={x:b.endX,y:b.endY};
 return turn(p,q,r)*turn(p,q,s)<0&&turn(r,s,p)*turn(r,s,q)<0;
};
for(let i=0;i<placed.length;i++){
 const a=placed[i];
 
 assert(a.left>=6&&a.top>=6&&a.left+a.width<=655&&a.top+a.height<=699,'Labels stay inside the viewport');
 assert(Math.abs(a.endX-a.left)<.01||Math.abs(a.endX-a.left-a.width)<.01||Math.abs(a.endY-a.top)<.01||Math.abs(a.endY-a.top-a.height)<.01,`${a.id} pointer must end at its label edge`);
 for(let j=i+1;j<placed.length;j++){
  const b=placed[j];
  assert(!crosses(a,b),`${a.id} and ${b.id} pointers cross`);
  const overlapX=Math.max(0,Math.min(a.left+a.width,b.left+b.width)-Math.max(a.left,b.left));
  const overlapY=Math.max(0,Math.min(a.top+a.height,b.top+b.height)-Math.max(a.top,b.top));
  assert.equal(overlapX*overlapY,0,`${a.id} and ${b.id} labels overlap`);
 }
}
console.log('Passed: every station visible, separated labels, stable placement and pointer geometry.');
