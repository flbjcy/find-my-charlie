export type LabelInput={id:string;x:number;y:number;width:number;height:number};
type Box={left:number;top:number;width:number;height:number};
type Point={x:number;y:number};
type Positioned=LabelInput&Box&{endX:number;endY:number};
const gap=7;
const overlaps=(a:Box,b:Box)=>a.left<b.left+b.width+gap&&a.left+a.width+gap>b.left&&a.top<b.top+b.height+gap&&a.top+a.height+gap>b.top;
function position(p:LabelInput,box:Box):Positioned{
 const cx=box.left+box.width/2,cy=box.top+box.height/2,dx=p.x-cx,dy=p.y-cy;
 const t=Math.min(dx?Math.abs((box.width/2)/dx):Infinity,dy?Math.abs((box.height/2)/dy):Infinity,1);
 return {...p,...box,endX:cx+dx*t,endY:cy+dy*t};
}
function crosses(a:Point,b:Point,c:Point,d:Point){
 const turn=(p:Point,q:Point,r:Point)=>(q.x-p.x)*(r.y-p.y)-(q.y-p.y)*(r.x-p.x);
 return turn(a,b,c)*turn(a,b,d)<0&&turn(c,d,a)*turn(c,d,b)<0;
}
function throughBox(a:Point,b:Point,box:Box){
 const tl={x:box.left-3,y:box.top-3},tr={x:box.left+box.width+3,y:box.top-3},br={x:tr.x,y:box.top+box.height+3},bl={x:tl.x,y:br.y};
 return [[tl,tr],[tr,br],[br,bl],[bl,tl]].some(([c,d])=>crosses(a,b,c,d));
}
export function layoutLabels(inputs:LabelInput[],width:number,height:number){
 const placed:Positioned[]=[];
 const reserved:Box[]=[{left:0,top:0,width:Math.min(width-64,255),height:43},{left:width-52,top:height-120,width:52,height:120},{left:0,top:height-54,width:Math.min(width-60,310),height:54}];
 const ordered=[...inputs].sort((a,b)=>a.y-b.y||a.x-b.x||a.id.localeCompare(b.id));
 const candidates=(p:LabelInput)=>{
  const boxes:Positioned[]=[];
  for(let radius=0;radius<=Math.max(width,height);radius+=24)for(let direction=0;direction<16;direction++){
   const angle=-Math.PI/2+direction*Math.PI/8;
   const cx=p.x+Math.cos(angle)*(radius+p.width/2+10),cy=p.y+Math.sin(angle)*(radius+p.height/2+10);
   boxes.push(position(p,{left:Math.max(6,Math.min(width-p.width-6,cx-p.width/2)),top:Math.max(6,Math.min(height-p.height-6,cy-p.height/2)),width:p.width,height:p.height}));
  }
  return boxes;
 };
 const options=new Map(ordered.map(p=>[p.id,candidates(p)]));
 const score=(p:Positioned,others:Positioned[])=>{
  const cx=p.left+p.width/2,cy=p.top+p.height/2,end={x:p.endX,y:p.endY};
  let cost=(cx-p.x)**2*.04+(cy-p.y)**2*.12;
  for(const q of reserved){const ox=Math.max(0,Math.min(p.left+p.width,q.left+q.width)-Math.max(p.left,q.left)),oy=Math.max(0,Math.min(p.top+p.height,q.top+q.height)-Math.max(p.top,q.top));cost+=ox*oy*10000}
  for(const q of inputs)if(q.x>p.left-5&&q.x<p.left+p.width+5&&q.y>p.top-5&&q.y<p.top+p.height+5)cost+=50000;
  for(const q of others){
   const ox=Math.max(0,Math.min(p.left+p.width+5,q.left+q.width+5)-Math.max(p.left,q.left)),oy=Math.max(0,Math.min(p.top+p.height+5,q.top+q.height+5)-Math.max(p.top,q.top));
   cost+=ox*oy*10000;
   const qe={x:q.endX,y:q.endY};
   if(crosses(p,end,q,qe))cost+=30000;
   if(throughBox(p,end,q)||throughBox(q,qe,p))cost+=10000;
   const qcy=q.top+q.height/2;
   if(Math.abs(q.x-p.x)<200&&Math.abs(p.y-q.y)>24&&(p.y-q.y)*(cy-qcy)<0)cost+=8000+(cy-qcy)**2;
  }
  return cost;
 };
 const choose=(p:LabelInput,others:Positioned[])=>{let best=options.get(p.id)![0],bestScore=Infinity;for(const box of options.get(p.id)!){const cost=score(box,others);if(cost<bestScore){best=box;bestScore=cost}}return best};
 for(const p of ordered)placed.push(choose(p,placed));
 // Revisit the full layout so an early label cannot force later stations away.
 for(let pass=0;pass<2;pass++)for(let i=placed.length-1;i>=0;i--)placed[i]=choose(placed[i],placed.filter((_,j)=>j!==i));
 // Exchange whole label slots when that improves the shared geography/crossings.
 // Moving labels individually cannot escape a crowded set of occupied slots.
 for(let pass=0;pass<2;pass++)for(let i=0;i<placed.length;i++)for(let j=i+1;j<placed.length;j++){
  const a=placed[i],b=placed[j],others=placed.filter((_,k)=>k!==i&&k!==j);
  const at=(p:Positioned,q:Positioned)=>position(p,{left:Math.max(6,Math.min(width-p.width-6,q.left+(q.width-p.width)/2)),top:Math.max(6,Math.min(height-p.height-6,q.top+(q.height-p.height)/2)),width:p.width,height:p.height});
  const nextA=at(a,b),nextB=at(b,a);
  if(score(nextA,[...others,nextB])+score(nextB,[...others,nextA])+1<score(a,[...others,b])+score(b,[...others,a])){placed[i]=nextA;placed[j]=nextB}
 }
 return placed;
}
