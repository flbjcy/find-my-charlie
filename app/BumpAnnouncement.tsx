'use client';
import {useEffect,useRef,useState} from 'react';
import {X} from 'lucide-react';
const SEEN_KEY='findmycharlie-bump-announcement-v2.1-r3';
export default function BumpAnnouncement({assetBase}:{assetBase:string}){
 const [visible,setVisible]=useState(false),[remaining,setRemaining]=useState(10);
 const panel=useRef<HTMLElement>(null);
 const [pointer,setPointer]=useState<{path:string;top:number}|null>(null);
 useEffect(()=>{try{if(localStorage.getItem(SEEN_KEY))return;localStorage.setItem(SEEN_KEY,'seen')}catch{}setVisible(true)},[]);
 useEffect(()=>{if(!visible)return;setRemaining(10);const countdown=setInterval(()=>setRemaining(n=>Math.max(0,n-1)),1000);const timer=setTimeout(()=>setVisible(false),10000);const escape=(event:KeyboardEvent)=>{if(event.key==='Escape')setVisible(false)};window.addEventListener('keydown',escape);return()=>{clearTimeout(timer);clearInterval(countdown);window.removeEventListener('keydown',escape)}},[visible]);
 useEffect(()=>{
  if(!visible)return;
  const button=document.querySelector('.my-reports-button'),header=document.querySelector('header');
  if(!button||!header)return;
  const update=()=>{if(!panel.current)return;const target=button.getBoundingClientRect(),box=panel.current.getBoundingClientRect();const top=Math.max(88,header.getBoundingClientRect().bottom+22);const endX=target.left+target.width/2,endY=target.bottom+5,startX=Math.max(box.left+24,Math.min(box.right-24,endX));setPointer({top,path:`M ${startX} ${top+2} C ${startX} ${top-25}, ${endX} ${endY+25}, ${endX} ${endY}`})};
  const frame=requestAnimationFrame(update),observer=new ResizeObserver(update);observer.observe(button);observer.observe(header);window.addEventListener('resize',update);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('resize',update)};
 },[visible]);
 if(!visible)return null;
 return <>{pointer&&<svg className="bump-pointer" aria-hidden="true" focusable="false"><defs><marker id="my-reports-pointer-head" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M 0 0 L 9 4.5 L 0 9 Z" fill="#887013"/></marker></defs><path d={pointer.path} fill="none" stroke="#887013" strokeWidth="2.25" strokeLinecap="round" markerEnd="url(#my-reports-pointer-head)"/></svg>}<aside ref={panel} style={pointer?{top:pointer.top,maxHeight:`calc(100dvh - ${pointer.top+24}px)`}:undefined} className="bump-announcement" role="dialog" aria-labelledby="bump-announcement-title" aria-describedby="bump-announcement-description"><div className="bump-close-controls"><span aria-hidden="true">{remaining}s</span><button type="button" className="bump-dismiss" aria-label="Dismiss Bump announcement" onClick={()=>setVisible(false)}><X size={20}/></button></div><h2 id="bump-announcement-title">V2.1 update</h2><ul id="bump-announcement-description" className="bump-feature-list"><li><strong>Bump:</strong> fill in a matching finding, check, and submit.</li><li><strong>My reports:</strong> view or remove your reports, left of + Report.</li></ul><img src={assetBase+'bump-demo.svg'} width="540" height="292" alt="Demo of Bump on a Boston Public Library report, with My reports to the left of + Report."/></aside></>;
}
