export type RewardType = 'xp' | 'coins' | 'battle_pass_xp' | 'cosmetic' | 'item' | 'currency' | string;

export type Reward = {
  id: string;
  type: RewardType;
  amount: number | null;
  itemId: string | null;
  metadata: Record<string, unknown>;
};

export type RewardTable = {
  id: string;
  key: string;
  name: string;
  rewards: Reward[];
  active: boolean;
  startsAt?: string | null;
  endsAt?: string | null;
  updatedAt?: string;
};

export type PlayerRewardGrant = {
  id: string;
  userId: string;
  rewardTableId: string | null;
  reward: Reward;
  source: string | null;
  claimedAt: string | null;
  createdAt: string;
};
