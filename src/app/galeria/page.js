/* Images are already resized and cached by /api/gallery-image. */
/* eslint-disable @next/next/no-img-element */
'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import PageDecorations from '@/components/PageDecorations';

export default function GaleriaPage(){
  const [images,setImages]=useState([]);const [categories,setCategories]=useState([]);const [category,setCategory]=useState('');const [status,setStatus]=useState('loading');const [total,setTotal]=useState(0);const [hasMore,setHasMore]=useState(false);const [activeImage,setActiveImage]=useState(null);
  const dialogRef=useRef(null);const requestRef=useRef(null);
  const load=useCallback(async(offset=0)=>{
    requestRef.current?.abort();const controller=new AbortController();requestRef.current=controller;
    setStatus(offset?'more':'loading');
    try{
      const response=await fetch(`/api/gallery-media?limit=24&offset=${offset}&category=${encodeURIComponent(category)}`,{signal:controller.signal});
      const data=await response.json();if(!response.ok)throw new Error(data.message);
      setImages(current=>offset?[...current,...data.media]:data.media);setCategories(data.categories);setTotal(data.total);setHasMore(data.hasMore);setStatus(data.total?'ready':'empty');
    }catch(error){if(error.name!=='AbortError')setStatus(offset?'more-error':'error');}
  },[category]);
  useEffect(()=>{load();return()=>requestRef.current?.abort();},[load]);
  useEffect(()=>{if(activeImage&&!dialogRef.current.open)dialogRef.current.showModal();},[activeImage]);
  const preview=images.find(item=>item.type==='image');
  return <main className="gallery-page decorated-page"><PageDecorations variant="gallery"/>
    <section className="gallery-hero"><div className="container gallery-hero__grid"><div className="gallery-hero__copy"><nav className="offer-breadcrumb" aria-label="Okruszki nawigacji"><Link href="/">Strona główna</Link><span aria-hidden="true">›</span><span>Galeria</span></nav><h1>Zobacz, jak bawimy się z <span>Nallipop</span></h1><p>Zdjęcia i filmy z urodzin, warsztatów, festynów i rodzinnych wydarzeń. Zajrzyj do naszych wspomnień!</p></div><div className="gallery-hero__preview"><span className="image-fill"><img src={preview?.thumbnail||'/images/hero-kids.webp'} alt={preview?.alt||'Zabawa z Nallipop'} decoding="async"/></span><strong>Chwile pełne uśmiechu</strong></div></div></section>
    <section className="gallery-browser"><div className="container"><div className="section-heading"><h2>Galeria zdjęć</h2></div>
      {!!categories.length&&<div className="gallery-filters" aria-label="Kategorie galerii">{['',...categories].map(value=><button type="button" key={value} className={category===value?'is-active':''} aria-pressed={category===value} onClick={()=>{if(category!==value){setImages([]);setCategory(value);}}}>{value||'Wszystkie'}</button>)}</div>}
      {status==='loading'&&<p className="gallery-page__status" role="status">Ładuję zdjęcia…</p>}
      {status==='empty'&&<p className="gallery-page__status">Nowe wspomnienia pojawią się tutaj wkrótce.</p>}
      {status==='error'&&<div className="gallery-page__status" role="alert">Galeria jest chwilowo niedostępna. <button type="button" className="button button--light" onClick={()=>load()}>Spróbuj ponownie</button></div>}
      <div className="gallery-masonry-page">{images.map((item,index)=><button className={`gallery-photo gallery-photo--${(index%7)+1}`} key={item.id} type="button" onClick={()=>setActiveImage(item)} aria-label={`${item.type==='video'?'Odtwórz film':'Powiększ zdjęcie'}: ${item.title}`}>
        {item.type==='video'?<span className="gallery-video-placeholder"><b aria-hidden="true">▶</b><span>{item.title}</span><small>Odtwórz film</small></span>:<span className="image-fill"><img src={item.thumbnail||item.src} alt={item.alt} loading="lazy" decoding="async"/></span>}
      </button>)}</div>
      {hasMore&&<div className="gallery-load-more"><p>Wyświetlono {images.length} z {total}</p>{status==='more-error'&&<p role="alert">Nie udało się pobrać kolejnych zdjęć. Spróbuj ponownie.</p>}<button type="button" className="button button--primary" disabled={status==='more'} onClick={()=>load(images.length)}>{status==='more'?'Ładowanie…':'Pokaż kolejne zdjęcia'}</button></div>}
    </div></section>
    <dialog className="gallery-dialog" ref={dialogRef} onClose={()=>setActiveImage(null)} onClick={event=>{if(event.target===dialogRef.current)dialogRef.current.close();}}>{activeImage&&<><button className="gallery-lightbox__close" type="button" aria-label="Zamknij podgląd" onClick={()=>dialogRef.current.close()}>×</button>{activeImage.type==='video'?<video src={activeImage.src} controls autoPlay playsInline/>:<img src={activeImage.src} alt={activeImage.alt}/>}<p>{activeImage.title}</p></>}</dialog>
  </main>;
}
