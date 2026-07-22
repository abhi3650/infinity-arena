export type Cosmetic = {
  id: string;
  key: string;
  name: string;
  description: string | null;
  type: string;
  rarity: string | null;
  assetUrl: string | null;
  active: boolean;
};

export type InventoryItem = {
  id: string;
  userId: string;
  itemType: string;
  itemId: string;
  quantity: number;
  acquiredAt: string;
  metadata: Record<string, unknown>;
};

export type ShopOffer = {
  id: string;
  key: string;
  title: string;
  description: string | null;
  priceCurrency: string;
  priceAmount: number;
  rewardTableId: string | null;
  startsAt: string | null;
  endsAt: string | null;
  active: boolean;
};

export type PurchaseHistoryItem = {
  id: string;
  userId: string;
  offerId: string | null;
  currency: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded' | string;
  metadata: Record<string, unknown>;
  createdAt: string;
};
