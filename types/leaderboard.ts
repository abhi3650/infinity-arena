export type LeaderboardScope = 'global' | 'seasonal' | 'friends' | 'clan' | string;

export type LeaderboardRow = {
  id: string;
  userId: string;
  displayName: string | null;
  avatarUrl: string | null;
  score: number;
  rank: number;
  scope: LeaderboardScope;
  seasonId?: string | null;
  metadata: Record<string, unknown>;
  updatedAt?: string;
};
