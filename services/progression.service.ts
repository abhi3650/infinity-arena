import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import type { EconomyConfig, Mission, PlayerMissionProgress, PlayerProgression, PlayerRank, PlayerStatistic, SeasonProgress, Unlock } from '@/types/progression';

const n = (v: unknown, d = 0) => Number(v ?? d);
const s = (v: unknown) => (v == null ? null : String(v));
const arr = (v: unknown) => (Array.isArray(v) ? v.map(String) : []);

const mapProgression = (r: Record<string, unknown>): PlayerProgression => ({ userId: String(r.user_id), level: n(r.level, 1), xp: n(r.xp), coins: n(r.coins), battlePassXp: n(r.battle_pass_xp), rankId: s(r.rank_id), seasonId: s(r.season_id), updatedAt: s(r.updated_at) ?? undefined });
const mapStat = (r: Record<string, unknown>): PlayerStatistic => ({ id: String(r.id), userId: String(r.user_id), key: String(r.key), value: n(r.value), seasonId: s(r.season_id), updatedAt: s(r.updated_at) ?? undefined });
const mapRank = (r: Record<string, unknown>): PlayerRank => ({ id: String(r.id), userId: String(r.user_id), rankId: String(r.rank_id), rating: n(r.rating), tier: s(r.tier), division: s(r.division), seasonId: s(r.season_id), updatedAt: s(r.updated_at) ?? undefined });
const mapMission = (r: Record<string, unknown>): Mission => ({ id: String(r.id), key: String(r.key), title: String(r.title), description: s(r.description), type: String(r.type), target: n(r.target), rewardTableId: s(r.reward_table_id), startsAt: s(r.starts_at), endsAt: s(r.ends_at), active: Boolean(r.active ?? true) });
const mapMissionProgress = (r: Record<string, unknown>): PlayerMissionProgress => ({ id: String(r.id), userId: String(r.user_id), missionId: String(r.mission_id), progress: n(r.progress), completedAt: s(r.completed_at), claimedAt: s(r.claimed_at), seasonId: s(r.season_id), updatedAt: s(r.updated_at) ?? undefined });
const mapSeason = (r: Record<string, unknown>): SeasonProgress => ({ id: String(r.id), userId: String(r.user_id), seasonId: String(r.season_id), level: n(r.level, 1), xp: n(r.xp), battlePassXp: n(r.battle_pass_xp), freeRewardsClaimed: arr(r.free_rewards_claimed), premiumRewardsClaimed: arr(r.premium_rewards_claimed), updatedAt: s(r.updated_at) ?? undefined });
const mapUnlock = (r: Record<string, unknown>): Unlock => ({ id: String(r.id), userId: String(r.user_id), unlockableType: String(r.unlockable_type), unlockableId: String(r.unlockable_id), source: s(r.source), unlockedAt: String(r.unlocked_at) });
const mapConfig = (r: Record<string, unknown>): EconomyConfig => ({ id: String(r.id), key: String(r.key), value: r.value, startsAt: s(r.starts_at), endsAt: s(r.ends_at), createdAt: s(r.created_at) ?? undefined, updatedAt: s(r.updated_at) ?? undefined });

export async function getPlayerProgression(userId: string, supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.from('player_progression').select('*').eq('user_id', userId).maybeSingle();
  if (error) throw error;
  return data ? mapProgression(data as Record<string, unknown>) : null;
}

export async function getEconomyConfig(supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.from('economy_config').select('*').order('key');
  if (error) throw error;
  return (data ?? []).map((row) => mapConfig(row as Record<string, unknown>));
}

export async function getPlayerStatistics(userId: string, seasonId?: string, supabase: SupabaseClient = createClient()) {
  let query = supabase.from('player_statistics').select('*').eq('user_id', userId);
  if (seasonId) query = query.eq('season_id', seasonId);
  const { data, error } = await query.order('key');
  if (error) throw error;
  return (data ?? []).map((row) => mapStat(row as Record<string, unknown>));
}

export async function getPlayerRanks(userId: string, seasonId?: string, supabase: SupabaseClient = createClient()) {
  let query = supabase.from('player_ranks').select('*').eq('user_id', userId);
  if (seasonId) query = query.eq('season_id', seasonId);
  const { data, error } = await query.order('updated_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => mapRank(row as Record<string, unknown>));
}

export async function getActiveMissions(supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.from('missions').select('*').eq('active', true).order('starts_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => mapMission(row as Record<string, unknown>));
}

export async function getMissionProgress(userId: string, seasonId?: string, supabase: SupabaseClient = createClient()) {
  let query = supabase.from('player_mission_progress').select('*').eq('user_id', userId);
  if (seasonId) query = query.eq('season_id', seasonId);
  const { data, error } = await query.order('updated_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => mapMissionProgress(row as Record<string, unknown>));
}

export async function getSeasonProgress(userId: string, seasonId: string, supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.from('season_progress').select('*').eq('user_id', userId).eq('season_id', seasonId).maybeSingle();
  if (error) throw error;
  return data ? mapSeason(data as Record<string, unknown>) : null;
}

export async function getUnlocks(userId: string, supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.from('player_unlocks').select('*').eq('user_id', userId).order('unlocked_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => mapUnlock(row as Record<string, unknown>));
}
