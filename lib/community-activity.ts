export type CommunityRow={id:string;status:string;createdAt:number;removedAt:number|null};
const day=(time:number)=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(time);
export function communityActivity(rows:CommunityRow[],excludedIds:string[],now=Date.now()){
 const removals=rows.filter(r=>r.status==='retracted'),dated=removals.filter(r=>r.removedAt!==null),todayDate=day(now);
 const daily=new Map<string,{day:string;submissions:number;removals:number;activity:number}>();
 const row=(date:string)=>{let r=daily.get(date);if(!r){r={day:date,submissions:0,removals:0,activity:0};daily.set(date,r)}return r};
 for(const r of rows){const d=row(day(r.createdAt));d.submissions++;d.activity++}
 for(const r of dated){const d=row(day(r.removedAt!));d.removals++;d.activity++}
 const retainedCount=rows.filter(r=>r.status!=='retracted'&&!excludedIds.includes(r.id)).length;
 return {submittedCount:rows.length,retractionCount:removals.length,activityCount:rows.length+removals.length,retainedCount,removedCount:rows.length-retainedCount,administrativeExclusionCount:rows.filter(r=>r.status!=='retracted'&&excludedIds.includes(r.id)).length,undatedRemovalCount:removals.length-dated.length,latestSubmittedAt:rows.length?Math.max(...rows.map(r=>r.createdAt)):null,latestActivityAt:rows.length?Math.max(...rows.map(r=>r.createdAt),...dated.map(r=>r.removedAt!)):null,today:daily.get(todayDate)||{day:todayDate,submissions:0,removals:0,activity:0},daily:[...daily.values()].sort((a,b)=>a.day.localeCompare(b.day))};
}
