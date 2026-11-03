'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function AdminLogin(){
  const router=useRouter();const [busy,setBusy]=useState(false);const [error,setError]=useState('');
  async function login(event){
    event.preventDefault();setBusy(true);setError('');
    const data=Object.fromEntries(new FormData(event.currentTarget));
    try{
      const response=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      const result=await response.json();if(!response.ok)throw new Error(result.message);
      router.replace('/admin');router.refresh();
    }catch(error){setError(error.message||'Nie udało się zalogować.');setBusy(false);}
  }
  return <main className="admin-page admin-login"><div className="admin-login__card">
    <span className="admin-eyebrow">Nallipop · Twoja przestrzeń</span><h1>Dobrze Cię widzieć.</h1><p>Zaloguj się, aby zarządzać zdjęciami w galerii.</p>
    <form onSubmit={login}><label>Login<input name="username" autoComplete="username" required maxLength={100}/></label><label>Hasło<input type="password" name="password" autoComplete="current-password" required maxLength={256}/></label>
      {error&&<p className="admin-message is-error" role="alert">{error}</p>}<button className="admin-button" disabled={busy}>{busy?'Logowanie…':'Zaloguj się →'}</button>
    </form><Link href="/">← Wróć na stronę</Link>
  </div></main>;
}
