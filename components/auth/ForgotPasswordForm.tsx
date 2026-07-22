'use client';

import { useState, type FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function ForgotPasswordForm() {
  const { forgotPassword, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await forgotPassword(email);
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
      <label className="flex flex-col gap-2 text-sm text-slate-300">Email<input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
      {sent ? <p className="text-sm text-emerald-300">Password reset instructions are on the way.</p> : null}
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button className="rounded-xl bg-arena-cyan px-4 py-3 font-bold text-slate-950 disabled:opacity-60" disabled={loading} type="submit">Send reset link</button>
    </form>
  );
}
