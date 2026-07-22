import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import type { PlayerRewardGrant, Reward, RewardTable } from '@/types/rewards';

const s = (v: unknown) => (v == null ? null : String(v));
const meta = (v: unknown): Record<string, unknown> => (v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {});
export const mapReward = (r: Record<string, unknown>): Reward => ({ id: String(r.id), type: String(r.type), amount: r.amount == null ? null : Number(r.amount), itemId: s(r.item_id), metadata: meta(r.metadata) });
const mapTable = (r: Record<string, unknown>): RewardTable => ({ id: String(r.id), key: String(r.key), name: String(r.name), rewards: Array.isArray(r.rewards) ? r.rewards.map((x) => mapReward(x as Record<string, unknown>)) : [], active: Boolean(r.active ?? true), startsAt: s(r.starts_at), endsAt: s(r.ends_at), updatedAt: s(r.updated_at) ?? undefined });
const mapGrant = (r: Record<string, unknown>): PlayerRewardGrant => ({ id: String(r.id), userId: String(r.user_id), rewardTableId: s(r.reward_table_id), reward: mapReward(meta(r.reward)), source: s(r.source), claimedAt: s(r.claimed_at), createdAt: String(r.created_at) });

export async function getRewardTables(supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.from('reward_tables').select('*, rewards:reward_table_rewards(*)').eq('active', true).order('key');
  if (error) throw error;
  return (data ?? []).map((row) => mapTable(row as Record<string, unknown>));
}

export async function getRewardTableByKey(key: string, supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.from('reward_tables').select('*, rewards:reward_table_rewards(*)').eq('key', key).maybeSingle();
  if (error) throw error;
  return data ? mapTable(data as Record<string, unknown>) : null;
}

export async function getPlayerRewardGrants(userId: string, supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.from('player_reward_grants').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => mapGrant(row as Record<string, unknown>));
}
