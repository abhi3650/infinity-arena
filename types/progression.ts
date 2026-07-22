export type CurrencyCode = 'coins' | 'premium' | string;

export type EconomyConfig = {
  id: string;
  key: string;
  value: unknown;
  startsAt?: string | null;
  endsAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type PlayerProgression = {
  userId: string;
  level: number;
  xp: number;
  coins: number;
  battlePassXp: number;
  rankId: string | null;
  seasonId: string | null;
  updatedAt?: string;
};

export type PlayerStatistic = {
  id: string;
  userId: string;
  key: string;
  value: number;
  seasonId?: string | null;
  updatedAt?: string;
};

export type PlayerRank = {
  id: string;
  userId: string;
  rankId: string;
  rating: number;
  tier: string | null;
  division: string | null;
  seasonId?: string | null;
  updatedAt?: string;
};

export type Mission = {
  id: string;
  key: string;
  title: string;
  description: string | null;
  type: 'daily' | 'weekly' | 'seasonal' | 'event' | string;
  target: number;
  rewardTableId: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
  active: boolean;
};

export type PlayerMissionProgress = {
  id: string;
  userId: string;
  missionId: string;
  progress: number;
  completedAt: string | null;
  claimedAt: string | null;
  seasonId?: string | null;
  updatedAt?: string;
};

export type SeasonProgress = {
  id: string;
  userId: string;
  seasonId: string;
  level: number;
  xp: number;
  battlePassXp: number;
  freeRewardsClaimed: string[];
  premiumRewardsClaimed: string[];
  updatedAt?: string;
};

export type Unlock = {
  id: string;
  userId: string;
  unlockableType: string;
  unlockableId: string;
  source: string | null;
  unlockedAt: string;
};
