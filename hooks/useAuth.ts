'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getCurrentProfile, loginAsGuest, loginWithEmail, loginWithGoogle, mapAuthUser, registerWithEmail, sendPasswordReset, signOut } from '@/services/auth.service';
import type { AuthState, LoginCredentials, RegisterCredentials } from '@/types/auth';

export function useAuth() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [state, setState] = useState<AuthState>({ user: null, session: null, profile: null, loading: true, error: null });

  const refreshUser = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: null }));
    const { data: sessionData } = await supabase.auth.getSession();
    const profile = await getCurrentProfile(supabase);
    const user = mapAuthUser(sessionData.session?.user ?? null, profile);
    setState({ user, session: sessionData.session, profile, loading: false, error: null });
    return user;
  }, [supabase]);

  useEffect(() => {
    void refreshUser();
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      void (async () => {
        const profile = session?.user ? await getCurrentProfile(supabase) : null;
        setState({ user: mapAuthUser(session?.user ?? null, profile), session, profile, loading: false, error: null });
      })();
    });

    return () => data.subscription.unsubscribe();
  }, [refreshUser, supabase]);

  const runAuthAction = useCallback(async <T>(action: () => Promise<T>) => {
    setState((current) => ({ ...current, loading: true, error: null }));
    try {
      const result = await action();
      await refreshUser();
      router.refresh();
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed.';
      setState((current) => ({ ...current, loading: false, error: message }));
      throw error;
    }
  }, [refreshUser, router]);

  return {
    ...state,
    isAuthenticated: Boolean(state.user),
    isVerified: Boolean(state.user?.emailVerified || state.user?.isAnonymous),
    refreshUser,
    login: (credentials: LoginCredentials) => runAuthAction(() => loginWithEmail(credentials, supabase)),
    register: (credentials: RegisterCredentials) => runAuthAction(() => registerWithEmail(credentials, supabase)),
    loginWithGoogle: (next?: string) => runAuthAction(() => loginWithGoogle(next, supabase)),
    loginAsGuest: () => runAuthAction(() => loginAsGuest(supabase)),
    forgotPassword: (email: string) => runAuthAction(() => sendPasswordReset(email, supabase)),
    signOut: () => runAuthAction(() => signOut(supabase)),
  };
}
