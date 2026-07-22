import type { Reward } from './rewards';

export type Achievement = {
  id: string;
  key: string;
  title: string;
  description: string | null;
  category: string | null;
  target: number;
  rewardTableId: string | null;
  rewards?: Reward[];
  hidden: boolean;
  active: boolean;
};

export type AchievementProgress = {
  id: string;
  userId: string;
  achievementId: string;
  progress: number;
  completedAt: string | null;
  claimedAt: string | null;
  updatedAt?: string;
};
