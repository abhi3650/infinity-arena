import type { Session, User } from '@supabase/supabase-js';

export type AuthProvider = 'email' | 'google' | 'guest';

export type PlayerProfile = {
  id: string;
  userId: string;
  username: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  level: number;
  xp: number;
  coins: number;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthUser = {
  id: string;
  email: string | null;
  isAnonymous: boolean;
  emailVerified: boolean;
  avatarUrl: string | null;
  displayName: string | null;
  level: number;
  xp: number;
  coins: number;
  profile: PlayerProfile | null;
};

export type AuthState = {
  user: AuthUser | null;
  session: Session | null;
  profile: PlayerProfile | null;
  loading: boolean;
  error: string | null;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = LoginCredentials & {
  displayName?: string;
};

export type AuthResult = {
  user: User | null;
  session: Session | null;
};

export type UserAvatarDisplay = {
  displayName: string;
  avatarUrl: string | null;
  level: number;
  xp: number;
  coins: number;
  initials: string;
};
