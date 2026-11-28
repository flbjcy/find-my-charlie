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
 // Short local callouts preserve geography. Crowded dots remain interactive;
 // additional labels naturally fit as stations spread apart when zooming in.
 const ordered=[...inputs].sort((a,b)=>a.y-b.y||a.x-b.x||a.id.localeCompare(b.id));
 for(const p of ordered){
  let best:Positioned|undefined,score=Infinity;
  for(const distance of [12,28,44,60,76])for(let direction=0;direction<16;direction++){
   const angle=-Math.PI/2+direction*Math.PI/8,dx=Math.cos(angle),dy=Math.sin(angle);
   const cx=p.x+dx*(distance+p.width/2),cy=p.y+dy*(distance+p.height/2);
   const box={left:cx-p.width/2,top:cy-p.height/2,width:p.width,height:p.height};
   if(box.left<8||box.top<8||box.left+p.width>width-8||box.top+p.height>height-8)continue;
   if(placed.some(q=>overlaps(box,q)))continue;
   if(inputs.some(q=>q.x>box.left-8&&q.x<box.left+p.width+8&&q.y>box.top-8&&q.y<box.top+p.height+8))continue;
   const c=position(p,box),end={x:c.endX,y:c.endY};
   const length=Math.hypot(end.x-p.x,end.y-p.y);if(length>80)continue;
   if(placed.some(q=>crosses(p,end,q,{x:q.endX,y:q.endY})||throughBox(p,end,q)||throughBox(q,{x:q.endX,y:q.endY},box)))continue;
   // Nearby labels follow north/south order rather than swapping stations.
   if(placed.some(q=>Math.abs(q.x-p.x)<180&&p.y-q.y>24&&cy<q.top+q.height/2))continue;
   const cost=length+Math.abs(cy-p.y)*.12+direction*.01;
   if(cost<score){score=cost;best=c}
  }
  if(best)placed.push(best);
 }
 return placed;
}
