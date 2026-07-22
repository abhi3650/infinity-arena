'use client';

import { useEffect, type ReactNode } from 'react';
import type { Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

type AuthGuardProps = {
  children: ReactNode;
  fallback?: ReactNode;
  requireVerifiedEmail?: boolean;
};

export function AuthGuard({ children, fallback = null, requireVerifiedEmail = false }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, isVerified } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}` as Route);
    }
  }, [loading, pathname, router, user]);

  if (loading || !user) return fallback;

  if (requireVerifiedEmail && !isVerified) {
    return <p className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4 text-yellow-100">Please verify your email before continuing.</p>;
  }

  return children;
}
