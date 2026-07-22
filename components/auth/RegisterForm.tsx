'use client';

import { useState, type FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function RegisterForm() {
  const { register, loading, error } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await register({ email, password, displayName });
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
      <label className="flex flex-col gap-2 text-sm text-slate-300">Display name<input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" value={displayName} onChange={(event) => setDisplayName(event.target.value)} /></label>
      <label className="flex flex-col gap-2 text-sm text-slate-300">Email<input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
      <label className="flex flex-col gap-2 text-sm text-slate-300">Password<input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" type="password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
      {sent ? <p className="text-sm text-emerald-300">Check your email to verify your account.</p> : null}
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button className="rounded-xl bg-arena-cyan px-4 py-3 font-bold text-slate-950 disabled:opacity-60" disabled={loading} type="submit">Create account</button>
    </form>
  );
}
