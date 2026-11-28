'use client';
import {useEffect,useState} from 'react';
import {X} from 'lucide-react';
const SEEN_KEY='findmycharlie-bump-announcement-v2.2';
export default function BumpAnnouncement({assetBase}:{assetBase:string}){
 const [visible,setVisible]=useState(false),[remaining,setRemaining]=useState(10);
 useEffect(()=>{try{if(localStorage.getItem(SEEN_KEY))return;localStorage.setItem(SEEN_KEY,'seen')}catch{}setVisible(true)},[]);
 useEffect(()=>{if(!visible)return;setRemaining(10);const countdown=setInterval(()=>setRemaining(n=>Math.max(0,n-1)),1000);const timer=setTimeout(()=>setVisible(false),10000);const escape=(event:KeyboardEvent)=>{if(event.key==='Escape')setVisible(false)};window.addEventListener('keydown',escape);return()=>{clearTimeout(timer);clearInterval(countdown);window.removeEventListener('keydown',escape)}},[visible]);
 if(!visible)return null;
 return <aside className="bump-announcement" role="dialog" aria-labelledby="bump-announcement-title" aria-describedby="bump-announcement-description"><div className="bump-close-controls"><span aria-hidden="true">{remaining}s</span><button type="button" className="bump-dismiss" aria-label="Dismiss Bump announcement" onClick={()=>setVisible(false)}><X size={20}/></button></div><h2 id="bump-announcement-title">V2.2 update</h2><p id="bump-announcement-description"><strong>Bump</strong> fills in a matching finding. <strong>My reports</strong>, beside + Report, lets you view or remove reports from this browser.</p><img src={assetBase+'bump-demo.svg'} width="540" height="292" alt="Demo of Bump on a Boston Public Library report and the blue My reports button immediately beside + Report."/></aside>;
}
