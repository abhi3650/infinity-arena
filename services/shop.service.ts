import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import type { Cosmetic, InventoryItem, PurchaseHistoryItem, ShopOffer } from '@/types/shop';

const s = (v: unknown) => (v == null ? null : String(v));
const meta = (v: unknown): Record<string, unknown> => (v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {});
const mapCosmetic = (r: Record<string, unknown>): Cosmetic => ({ id: String(r.id), key: String(r.key), name: String(r.name), description: s(r.description), type: String(r.type), rarity: s(r.rarity), assetUrl: s(r.asset_url), active: Boolean(r.active ?? true) });
const mapOffer = (r: Record<string, unknown>): ShopOffer => ({ id: String(r.id), key: String(r.key), title: String(r.title), description: s(r.description), priceCurrency: String(r.price_currency), priceAmount: Number(r.price_amount ?? 0), rewardTableId: s(r.reward_table_id), startsAt: s(r.starts_at), endsAt: s(r.ends_at), active: Boolean(r.active ?? true) });
const mapInventory = (r: Record<string, unknown>): InventoryItem => ({ id: String(r.id), userId: String(r.user_id), itemType: String(r.item_type), itemId: String(r.item_id), quantity: Number(r.quantity ?? 1), acquiredAt: String(r.acquired_at), metadata: meta(r.metadata) });
const mapPurchase = (r: Record<string, unknown>): PurchaseHistoryItem => ({ id: String(r.id), userId: String(r.user_id), offerId: s(r.offer_id), currency: String(r.currency), amount: Number(r.amount ?? 0), status: String(r.status), metadata: meta(r.metadata), createdAt: String(r.created_at) });

export async function getCosmetics(supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.from('cosmetics').select('*').eq('active', true).order('rarity').order('name');
  if (error) throw error;
  return (data ?? []).map((row) => mapCosmetic(row as Record<string, unknown>));
}

export async function getShopOffers(supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.from('shop_offers').select('*').eq('active', true).order('starts_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => mapOffer(row as Record<string, unknown>));
}

export async function getInventory(userId: string, supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.from('player_inventory').select('*').eq('user_id', userId).order('acquired_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => mapInventory(row as Record<string, unknown>));
}

export async function getPurchaseHistory(userId: string, supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.from('purchase_history').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => mapPurchase(row as Record<string, unknown>));
}
