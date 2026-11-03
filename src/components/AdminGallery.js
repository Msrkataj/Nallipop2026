/* Thumbnails are already optimized WebP images served by our authenticated media endpoint. */
/* eslint-disable @next/next/no-img-element */
'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminGallery({username}){
  const router=useRouter();const [media,setMedia]=useState([]);const [total,setTotal]=useState(0);const [trash,setTrash]=useState(false);const [loading,setLoading]=useState(true);const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');const [error,setError]=useState('');const [editing,setEditing]=useState(null);const [files,setFiles]=useState([]);const [search,setSearch]=useState('');
  const dialogRef=useRef(null);const uploadRef=useRef(null);const loadGeneration=useRef(0);
  const request=useCallback(async(url,options={})=>{
    const response=await fetch(url,{cache:'no-store',...options});
    const result=await response.json();
    if(response.status===401){router.replace('/admin/login');throw new Error('Sesja wygasła. Zaloguj się ponownie.');}
    if(!response.ok)throw new Error(result.message||'Nie udało się wykonać operacji.');
    return result;
  },[router]);
  const load=useCallback(async(offset=0)=>{
    const generation=++loadGeneration.current;setLoading(true);
    try{
      const data=await request(`/api/admin/gallery?trash=${trash?1:0}&offset=${offset}`);
      if(generation!==loadGeneration.current)return;
      setMedia(current=>offset?[...current,...data.media]:data.media);setTotal(data.total);
    }catch(error){if(generation===loadGeneration.current)setError(error.message);}
    finally{if(generation===loadGeneration.current)setLoading(false);}
  },[request,trash]);
  const invalidateLoad=useCallback(()=>{loadGeneration.current++;},[]);
  useEffect(()=>{load();return invalidateLoad;},[load,invalidateLoad]);
  useEffect(()=>{if(editing&&!dialogRef.current.open)dialogRef.current.showModal();},[editing]);
  function closeEditor(){dialogRef.current.close();setEditing(null);}
  async function action(item,action,extra={}){
    setBusy(true);setError('');setMessage('');
    try{
      await request(`/api/admin/gallery/${item.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,revision:item.revision,...extra})});
      setMessage(action==='trash'?'Zdjęcie przeniesiono do kosza. Możesz je przywrócić.':action==='restore'?'Zdjęcie przywrócono.':'Widoczność zaktualizowana.');
      await load();
    }catch(error){setError(error.message);}finally{setBusy(false);}
  }
  async function upload(event){
    event.preventDefault();setError('');setMessage('');if(!files.length){setError('Wybierz co najmniej jedno zdjęcie.');return;}
    const selected=files;const fields=new FormData(event.currentTarget);setBusy(true);let done=0;
    try{
      for(const file of selected){
        if(file.size>12*1024*1024)throw new Error(`${file.name}: plik przekracza 12 MB.`);
        setMessage(`Dodawanie i zmniejszanie zdjęć: ${done+1} z ${selected.length}…`);
        const form=new FormData();form.set('file',file);form.set('category',fields.get('category')||'Nallipop');form.set('title',selected.length===1&&fields.get('title')?fields.get('title'):file.name.replace(/\.[^.]+$/,'').replace(/[_-]+/g,' ').slice(0,160));
        await request('/api/admin/gallery',{method:'POST',body:form});done++;
      }
      setFiles([]);uploadRef.current.reset();setMessage(`Dodano ${done} zdjęć. Są już dostępne na stronie.`);await load();
    }catch(error){setError(error.message);setFiles(selected.slice(done));setMessage(done?`Dodano ${done} zdjęć. Pozostałe możesz wysłać ponownie.`:'');await load();}finally{setBusy(false);}
  }
  async function save(event){
    event.preventDefault();setBusy(true);setError('');setMessage('');
    const data=new FormData(event.currentTarget);
    try{
      let revision=editing.revision;const file=data.get('replacement');
      if(file?.size){
        const form=new FormData();form.set('file',file);form.set('revision',revision);
        const result=await request(`/api/admin/gallery/${editing.id}`,{method:'POST',body:form});
        revision=result.media.revision;
      }
      await request(`/api/admin/gallery/${editing.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'edit',revision,title:data.get('title'),alt:data.get('alt'),category:data.get('category')})});
      closeEditor();setMessage('Zmiany zapisane. Galeria na stronie jest zaktualizowana.');await load();
    }catch(error){setError(error.message);}finally{setBusy(false);}
  }
  async function sync(){
    setBusy(true);setError('');setMessage('Sprawdzam dotychczasowe foldery galerii…');
    try{const result=await request('/api/admin/gallery/sync',{method:'POST'});setMessage(`Dodano z dotychczasowych folderów: ${result.imported}. ${result.warnings.join(' ')}`);await load();}
    catch(error){setError(error.message);setMessage('');}finally{setBusy(false);}
  }
  async function logout(){setBusy(true);try{await request('/api/admin/logout',{method:'POST'});router.replace('/admin/login');router.refresh();}catch(error){setError(error.message);setBusy(false);}}
  const filtered=media.filter(item=>`${item.title} ${item.category}`.toLocaleLowerCase('pl').includes(search.toLocaleLowerCase('pl')));
  return <main className="admin-page"><div className="admin-shell">
    <header className="admin-heading"><div><span className="admin-eyebrow">Nallipop · Panel administratora</span><h1>Twoja galeria.</h1><p>Dodawaj wspomnienia, zmieniaj opisy i wybieraj, co zobaczą goście.</p></div><div className="admin-heading__actions"><Link href="/galeria" target="_blank" className="admin-button is-secondary">Zobacz galerię ↗</Link><button onClick={logout} disabled={busy} className="admin-button is-quiet">Wyloguj ({username})</button></div></header>
    {message&&<p className="admin-message" role="status">{message}</p>}{error&&!editing&&<p className="admin-message is-error" role="alert">{error}</p>}
    <section className="admin-upload" aria-labelledby="upload-title"><div><span className="admin-step">01</span><h2 id="upload-title">Dodaj nowe zdjęcia</h2><p>Wybierz jedno lub kilka zdjęć. Przygotujemy lżejsze wersje do szybkiego wyświetlania.</p><small>JPG, PNG, WebP, AVIF · do 12 MB na zdjęcie</small></div>
      <form onSubmit={upload} ref={uploadRef}><label className="admin-file">Wybierz zdjęcia<input type="file" name="photos" accept="image/jpeg,image/png,image/webp,image/avif" multiple disabled={busy} onChange={event=>setFiles(Array.from(event.target.files||[]))}/><span>{files.length?`Wybrano: ${files.length} ${files.length===1?'zdjęcie':'zdjęć'}`:'Możesz zaznaczyć kilka plików jednocześnie'}</span></label><div className="admin-upload__fields"><label>Kategoria<input name="category" defaultValue="Nallipop" list="gallery-categories" maxLength={60} required disabled={busy}/></label><label>Tytuł {files.length>1?'(nazwy plików)':'(opcjonalnie)'}<input name="title" placeholder="np. Kolorowe warsztaty" maxLength={160} disabled={busy||files.length>1}/></label></div><button className="admin-button" disabled={busy||!files.length}>{busy?'Trwa zapisywanie…':'Dodaj do galerii'}</button></form>
    </section>
    <datalist id="gallery-categories">{['Nallipop','Urodziny','Warsztaty','Festyny','Dmuchańce','Święta'].map(category=><option key={category} value={category}/>)}</datalist>
    <section className="admin-library" aria-labelledby="library-title"><div className="admin-library__bar"><div><span className="admin-step">02</span><h2 id="library-title">{trash?'Kosz':'Zdjęcia i filmy'} <small>{total}</small></h2></div><div className="admin-tabs"><button className={!trash?'is-active':''} aria-pressed={!trash} disabled={busy} onClick={()=>{setTrash(false);setSearch('');}}>Galeria</button><button className={trash?'is-active':''} aria-pressed={trash} disabled={busy} onClick={()=>{setTrash(true);setSearch('');}}>Kosz</button></div></div>
      <div className="admin-library__tools"><label>Szukaj w załadowanych zdjęciach<input type="search" value={search} onChange={event=>setSearch(event.target.value)} placeholder="Tytuł lub kategoria"/></label><button className="admin-button is-secondary" onClick={sync} disabled={busy||loading}>Sprawdź dotychczasowe foldery</button></div>
      {loading&&!media.length&&<p role="status">Ładowanie zdjęć…</p>}
      {!loading&&!filtered.length&&<div className="admin-empty">{search?'Brak zdjęć pasujących do wyszukiwania.':trash?'Kosz jest pusty.':'Dodaj pierwsze zdjęcie do galerii.'}</div>}
      <div className="admin-grid">{filtered.map(item=><article key={item.id} className={`admin-photo${item.hidden?' is-hidden':''}`}>
        <div className="admin-photo__image">{item.type==='video'?<span className="admin-video">▶<small>Film</small></span>:<img src={item.thumbnail||item.src} alt={item.alt} loading="lazy" decoding="async"/>}<span className="admin-photo__badge">{trash?'W koszu':item.hidden?'Ukryte':'Widoczne'}</span></div>
        <div className="admin-photo__body"><span>{item.category}</span><h3>{item.title}</h3><div className="admin-photo__actions">{trash?<button onClick={()=>action(item,'restore')} disabled={busy}>Przywróć</button>:<><button onClick={()=>{setError('');setEditing(item);}} disabled={busy}>Edytuj</button><button onClick={()=>action(item,'visibility',{hidden:!item.hidden})} disabled={busy}>{item.hidden?'Pokaż':'Ukryj'}</button><button onClick={()=>action(item,'trash')} disabled={busy}>Do kosza</button></>}</div></div>
      </article>)}</div>
      {media.length<total&&<button className="admin-button is-secondary admin-more" disabled={loading||busy} onClick={()=>load(media.length)}>{loading?'Ładowanie…':'Pokaż kolejne'}</button>}
    </section>
    <dialog className="admin-editor" ref={dialogRef} onCancel={event=>{if(busy)event.preventDefault();}} onClose={()=>setEditing(null)}>{editing&&<form key={editing.id} onSubmit={save}><div className="admin-editor__heading"><h2>Edytuj {editing.type==='video'?'film':'zdjęcie'}</h2><button type="button" aria-label="Zamknij edycję" disabled={busy} onClick={closeEditor}>×</button></div>
      {editing.type==='image'&&<img className="admin-editor__preview" src={editing.thumbnail||editing.src} alt={editing.alt}/>}
      <label>Tytuł<input name="title" defaultValue={editing.title} maxLength={160} required disabled={busy}/></label><label>Kategoria<input name="category" defaultValue={editing.category} list="gallery-categories" maxLength={60} required disabled={busy}/></label><label>Opis zdjęcia dla osób korzystających z czytnika ekranu<textarea name="alt" defaultValue={editing.alt} maxLength={240} rows={2} disabled={busy}/></label>
      {editing.type==='image'&&<label>Podmień zdjęcie (opcjonalnie)<input type="file" name="replacement" accept="image/jpeg,image/png,image/webp,image/avif" disabled={busy}/><small>Nowy plik zastąpi zdjęcie po zapisaniu zmian.</small></label>}
      {error&&<p className="admin-message is-error" role="alert">{error}</p>}<div className="admin-editor__actions"><button className="admin-button" disabled={busy}>{busy?'Zapisywanie…':'Zapisz zmiany'}</button><button type="button" className="admin-button is-secondary" disabled={busy} onClick={closeEditor}>Anuluj</button></div>
    </form>}</dialog>
  </div></main>;
}
