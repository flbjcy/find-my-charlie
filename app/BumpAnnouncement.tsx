'use client';
import {useEffect,useRef,useState} from 'react';
import {X} from 'lucide-react';
const SEEN_KEY='findmycharlie-bump-announcement-v2.1-r5';
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
  const update=()=>{if(!panel.current)return;const target=button.getBoundingClientRect(),box=panel.current.getBoundingClientRect();const top=Math.max(106,header.getBoundingClientRect().bottom+42);const endX=target.left+target.width/2,endY=target.bottom+5,startX=Math.max(box.left+24,Math.min(box.right-24,endX-44));setPointer({top,path:`M ${startX} ${top+2} C ${startX} ${top-28}, ${endX} ${endY+26}, ${endX} ${endY}`})};
  const frame=requestAnimationFrame(update),observer=new ResizeObserver(update);observer.observe(button);observer.observe(header);window.addEventListener('resize',update);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('resize',update)};
 },[visible]);
 if(!visible)return null;
 return <>{pointer&&<svg className="bump-pointer" aria-hidden="true" focusable="false"><defs><filter id="my-reports-yellow-glow" x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB"><feDropShadow dx="0" dy="0" stdDeviation="2.4" floodColor="#ffdf00" floodOpacity=".95"/><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ffe600" floodOpacity=".65"/></filter><marker id="my-reports-pointer-head" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto" markerUnits="userSpaceOnUse"><path d="M 2 2 L 8 6 L 2 10" fill="none" stroke="#ffeb3b" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></marker></defs><g filter="url(#my-reports-yellow-glow)"><path d={pointer.path} fill="none" stroke="#ad8715" strokeWidth="5.5" strokeOpacity=".65" strokeLinecap="round"/><path d={pointer.path} fill="none" stroke="#ffeb3b" strokeWidth="3.5" strokeLinecap="round" markerEnd="url(#my-reports-pointer-head)"/></g></svg>}<aside ref={panel} style={pointer?{top:pointer.top,maxHeight:`calc(100dvh - ${pointer.top+24}px)`}:undefined} className="bump-announcement" role="dialog" aria-labelledby="bump-announcement-title" aria-describedby="bump-announcement-description"><div className="bump-close-controls"><span aria-hidden="true">{remaining}s</span><button type="button" className="bump-dismiss" aria-label="Dismiss Bump announcement" onClick={()=>setVisible(false)}><X size={20}/></button></div><h2 id="bump-announcement-title">V2.1 update</h2><ul id="bump-announcement-description" className="bump-feature-list"><li><strong>Bump:</strong> fill in a matching finding, check, and submit.</li><li><strong>My reports:</strong> view or remove your reports, left of + Report.</li></ul><img src={assetBase+'bump-demo.svg'} width="540" height="292" alt="Demo of Bump on a Boston Public Library report, with My reports to the left of + Report."/></aside></>;
}
