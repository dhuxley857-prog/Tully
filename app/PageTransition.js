'use client';
import {useEffect} from 'react';

export default function PageTransition(){
  useEffect(()=>{
    const links=[...document.querySelectorAll('a[href]')];
    const onClick=(e)=>{
      const a=e.currentTarget;
      const href=a.getAttribute('href');
      if(!href || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const switching =
        (location.pathname==='/' && href.startsWith('/residential')) ||
        (location.pathname.startsWith('/residential') && href.startsWith('/#top'));
      if(!switching) return;
      e.preventDefault();
      document.documentElement.classList.add('siteSwitching');
      setTimeout(()=>{ window.location.href=href; },280);
    };
    links.forEach(a=>a.addEventListener('click',onClick));
    requestAnimationFrame(()=>document.documentElement.classList.add('siteReady'));
    return ()=>links.forEach(a=>a.removeEventListener('click',onClick));
  },[]);
  return null;
}