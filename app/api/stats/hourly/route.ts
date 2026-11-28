import {getDb} from '../../../../db';
import {reports,traffic} from '../../../../db/schema';
import {eq,gte} from 'drizzle-orm';
import retractedReports from '../../../../lib/retracted-reports.json';
import {cors} from '../../../../lib/cors';

export async function GET(req:Request){
 try{
  const db=getDb(),cutoff=Date.now()-90*86400000;
  const [views,community]=await Promise.all([
   db.select({createdAt:traffic.createdAt,visit:traffic.visit}).from(traffic).where(gte(traffic.createdAt,cutoff)),
   db.select({id:reports.id,status:reports.status,createdAt:reports.createdAt}).from(reports).where(eq(reports.source,'community'))
  ]);
  const retainedCount=community.filter(r=>r.status!=='retracted'&&!retractedReports.includes(r.id)).length;
  const communitySummary={submittedCount:community.length,retainedCount,removedCount:community.length-retainedCount,latestSubmittedAt:community.length?Math.max(...community.map(r=>r.createdAt)):null};
  const byHour=new Map<number,{hour:number;views:number;visits:number;communityReports:number}>();
  const row=(time:number)=>{const hour=Math.floor(time/3600000)*3600000;let x=byHour.get(hour);if(!x){x={hour,views:0,visits:0,communityReports:0};byHour.set(hour,x)}return x};
  for(const item of views){const x=row(item.createdAt);x.views++;x.visits+=item.visit}
  for(const item of community)row(item.createdAt).communityReports++;
  if(byHour.size){const first=Math.min(...byHour.keys()),last=Math.floor(Date.now()/3600000)*3600000;for(let hour=first;hour<=last;hour+=3600000)row(hour)}
  return cors(req,Response.json({generatedAt:new Date().toISOString(),community:communitySummary,hours:[...byHour.values()].sort((a,b)=>a.hour-b.hour),coverage:{traffic:'Recorded page views only, within the last 90 days; privacy opt-outs and known bots excluded.',community:'Community submissions grouped by submission time, including historical, unavailable, removed and retracted submissions.'}},{headers:{'Cache-Control':'no-store'}}));
 }catch{return cors(req,Response.json({error:'Hourly statistics are temporarily unavailable.'},{status:503}));}
}
