import type { SupabaseClient, User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import type { AuthResult, AuthUser, LoginCredentials, PlayerProfile, RegisterCredentials, UserAvatarDisplay } from '@/types/auth';

const PROFILE_TABLE = 'profiles';
const DEFAULT_REDIRECT_PATH = '/';

function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
}

function mapProfile(row: Record<string, unknown> | null): PlayerProfile | null {
  if (!row) return null;

  return {
    id: String(row.id),
    userId: String(row.user_id ?? row.userId ?? row.id),
    username: (row.username as string | null) ?? null,
    displayName: (row.display_name as string | null) ?? (row.displayName as string | null) ?? null,
    avatarUrl: (row.avatar_url as string | null) ?? (row.avatarUrl as string | null) ?? null,
    level: Number(row.level ?? 1),
    xp: Number(row.xp ?? 0),
    coins: Number(row.coins ?? 0),
    createdAt: (row.created_at as string | undefined) ?? (row.createdAt as string | undefined),
    updatedAt: (row.updated_at as string | undefined) ?? (row.updatedAt as string | undefined),
  };
}

export function mapAuthUser(user: User | null, profile: PlayerProfile | null): AuthUser | null {
  if (!user) return null;

  const metadata = user.user_metadata ?? {};
  const identities = user.identities ?? [];
  const avatarUrl = profile?.avatarUrl ?? (metadata.avatar_url as string | null) ?? (metadata.picture as string | null) ?? null;
  const displayName = profile?.displayName ?? (metadata.full_name as string | null) ?? (metadata.name as string | null) ?? user.email ?? 'Guest Player';

  return {
    id: user.id,
    email: user.email ?? null,
    isAnonymous: identities.length === 0 || Boolean(user.is_anonymous),
    emailVerified: Boolean(user.email_confirmed_at),
    avatarUrl,
    displayName,
    level: profile?.level ?? 1,
    xp: profile?.xp ?? 0,
    coins: profile?.coins ?? 0,
    profile,
  };
}

export function toUserAvatarDisplay(user: AuthUser | null): UserAvatarDisplay {
  const displayName = user?.displayName ?? 'Guest Player';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'IA';

  return {
    displayName,
    avatarUrl: user?.avatarUrl ?? null,
    level: user?.level ?? 1,
    xp: user?.xp ?? 0,
    coins: user?.coins ?? 0,
    initials,
  };
}

export async function getCurrentProfile(supabase: SupabaseClient = createClient()): Promise<PlayerProfile | null> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return null;

  const { data, error } = await supabase.from(PROFILE_TABLE).select('*').eq('user_id', userData.user.id).maybeSingle();
  if (error) return null;

  return mapProfile(data as Record<string, unknown> | null);
}

export async function getCurrentUser(supabase: SupabaseClient = createClient()): Promise<AuthUser | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const profile = await getCurrentProfile(supabase);
  return mapAuthUser(data.user, profile);
}

export async function loginWithEmail({ email, password }: LoginCredentials, supabase: SupabaseClient = createClient()): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function registerWithEmail({ email, password, displayName }: RegisterCredentials, supabase: SupabaseClient = createClient()): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getAppUrl()}/auth/callback`,
      data: { display_name: displayName },
    },
  });
  if (error) throw error;
  return data;
}

export async function loginWithGoogle(next = DEFAULT_REDIRECT_PATH, supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${getAppUrl()}/auth/callback?next=${encodeURIComponent(next)}`,
      queryParams: { access_type: 'offline', prompt: 'consent' },
    },
  });
  if (error) throw error;
  return data;
}

export async function loginAsGuest(supabase: SupabaseClient = createClient()): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return data;
}

export async function sendPasswordReset(email: string, supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getAppUrl()}/auth/callback?next=/settings`,
  });
  if (error) throw error;
  return data;
}

export async function updatePassword(password: string, supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
  return data;
}

export async function signOut(supabase: SupabaseClient = createClient()) {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
