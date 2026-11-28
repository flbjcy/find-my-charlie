'use client';
import {useEffect,useState} from 'react';
import {X} from 'lucide-react';
const SEEN_KEY='findmycharlie-bump-announcement-v1';
export default function BumpAnnouncement({assetBase}:{assetBase:string}){
 const [visible,setVisible]=useState(false);
 useEffect(()=>{try{if(localStorage.getItem(SEEN_KEY))return;localStorage.setItem(SEEN_KEY,'seen')}catch{}setVisible(true)},[]);
 useEffect(()=>{if(!visible)return;const timer=setTimeout(()=>setVisible(false),10000);const escape=(event:KeyboardEvent)=>{if(event.key==='Escape')setVisible(false)};window.addEventListener('keydown',escape);return()=>{clearTimeout(timer);window.removeEventListener('keydown',escape)}},[visible]);
 if(!visible)return null;
 return <aside className="bump-announcement" role="dialog" aria-labelledby="bump-announcement-title" aria-describedby="bump-announcement-description"><button type="button" className="bump-dismiss" aria-label="Dismiss Bump announcement" onClick={()=>setVisible(false)}><X size={20}/></button><span className="eyebrow">A QUICKER WAY TO HELP</span><h2 id="bump-announcement-title">New: Bump a finding</h2><p id="bump-announcement-description">Found the same card at the same machine? Tap the green <strong>Bump</strong>, review the filled-in details, then submit your fresh confirmation.</p><img src={assetBase+'bump-demo.svg'} width="640" height="350" alt="Demo: tap the green Bump button beside Report unavailable, review the copied station, card and machine with a new check time, then choose Submit bump."/><small>Closes automatically after 10 seconds. Shown once per browser.</small></aside>;
}
