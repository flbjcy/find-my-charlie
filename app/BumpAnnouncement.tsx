'use client';
import {useEffect,useState} from 'react';
import {X} from 'lucide-react';
const SEEN_KEY='findmycharlie-bump-announcement-v2.1';
export default function BumpAnnouncement({assetBase}:{assetBase:string}){
 const [visible,setVisible]=useState(false),[remaining,setRemaining]=useState(10);
 useEffect(()=>{try{if(localStorage.getItem(SEEN_KEY))return;localStorage.setItem(SEEN_KEY,'seen')}catch{}setVisible(true)},[]);
 useEffect(()=>{if(!visible)return;setRemaining(10);const countdown=setInterval(()=>setRemaining(n=>Math.max(0,n-1)),1000);const timer=setTimeout(()=>setVisible(false),10000);const escape=(event:KeyboardEvent)=>{if(event.key==='Escape')setVisible(false)};window.addEventListener('keydown',escape);return()=>{clearTimeout(timer);clearInterval(countdown);window.removeEventListener('keydown',escape)}},[visible]);
 if(!visible)return null;
 return <aside className="bump-announcement" role="dialog" aria-labelledby="bump-announcement-title" aria-describedby="bump-announcement-description"><div className="bump-close-controls"><span aria-hidden="true">{remaining}s</span><button type="button" className="bump-dismiss" aria-label="Dismiss Bump announcement" onClick={()=>setVisible(false)}><X size={20}/></button></div><h2 id="bump-announcement-title">V2.1 update: Bump a finding</h2><p id="bump-announcement-description">Found the same card? Tap <strong>Bump</strong>, check the details, and submit.</p><img src={assetBase+'bump-demo.svg'} width="540" height="244" alt="Boston Public Library card report with a green Bump button beside Report unavailable."/></aside>;
}
