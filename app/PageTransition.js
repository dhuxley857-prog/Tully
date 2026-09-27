'use client';
import {useEffect,useState} from 'react';

export default function PageTransition(){
  const [intro,setIntro]=useState(true);
  useEffect(()=>{
    const seen=sessionStorage.getItem('tsIntroSeen');
    if(seen){setIntro(false)} else {
      sessionStorage.setItem('tsIntroSeen','1');
      const t=setTimeout(()=>setIntro(false),2400);
      return ()=>clearTimeout(t);
    }
  },[]);
  useEffect(()=>{
    if(intro) return;
    const links=[...document.querySelectorAll('a[href]')];
    const onClick=(e)=>{
      const a=e.currentTarget, href=a.getAttribute('href');
      if(!href || e.metaKey||e.ctrlKey||e.shiftKey||e.altKey) return;
      const isLower=href.startsWith('#') && href!=='#top';
      const switching=(location.pathname==='/'&&href.startsWith('/residential'))||(location.pathname.startsWith('/residential')&&href.startsWith('/#top'));
      if(isLower){
        e.preventDefault();
        const el=document.querySelector(href);
        if(!el)return;
        document.documentElement.classList.add('sectionSwitching');
        setTimeout(()=>{el.scrollIntoView({behavior:'auto',block:'start'});document.documentElement.classList.remove('sectionSwitching')},180);
      } else if(switching){
        e.preventDefault();document.documentElement.classList.add('siteSwitching');
        setTimeout(()=>window.location.href=href,280);
      }
    };
    links.forEach(a=>a.addEventListener('click',onClick));
    requestAnimationFrame(()=>document.documentElement.classList.add('siteReady'));
    return ()=>links.forEach(a=>a.removeEventListener('click',onClick));
  },[intro]);
  return <>
    {intro&&<div className="siteIntro" aria-hidden="true">
      <div className="introBrand">
        <div className="introName">TULLY <span>&amp;</span> SMITHS</div>
        <div className="introDivisions"><span>COMMERCIAL</span><span>RESIDENTIAL</span></div>
      </div>
    </div>}
    <div className="sectionCurtain" aria-hidden="true"><div className="curtainMark">TULLY <span>&amp;</span> SMITHS</div></div>
  </>;
}