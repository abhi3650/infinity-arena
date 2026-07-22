import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import type { LeaderboardRow, LeaderboardScope } from '@/types/leaderboard';

const s = (v: unknown) => (v == null ? null : String(v));
const meta = (v: unknown): Record<string, unknown> => (v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {});
export const mapLeaderboardRow = (r: Record<string, unknown>): LeaderboardRow => ({ id: String(r.id), userId: String(r.user_id), displayName: s(r.display_name), avatarUrl: s(r.avatar_url), score: Number(r.score ?? 0), rank: Number(r.rank ?? 0), scope: String(r.scope), seasonId: s(r.season_id), metadata: meta(r.metadata), updatedAt: s(r.updated_at) ?? undefined });

export async function getLeaderboardRows(scope: LeaderboardScope = 'global', options: { seasonId?: string; limit?: number } = {}, supabase: SupabaseClient = createClient()) {
  let query = supabase.from('leaderboard_rows').select('*').eq('scope', scope).order('rank').limit(options.limit ?? 100);
  if (options.seasonId) query = query.eq('season_id', options.seasonId);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map((row) => mapLeaderboardRow(row as Record<string, unknown>));
}

export async function getPlayerLeaderboardRow(userId: string, scope: LeaderboardScope = 'global', seasonId?: string, supabase: SupabaseClient = createClient()) {
  let query = supabase.from('leaderboard_rows').select('*').eq('user_id', userId).eq('scope', scope);
  if (seasonId) query = query.eq('season_id', seasonId);
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data ? mapLeaderboardRow(data as Record<string, unknown>) : null;
}

export function subscribeToLeaderboard(scope: LeaderboardScope, onChange: (row: LeaderboardRow) => void, supabase: SupabaseClient = createClient(), seasonId?: string): RealtimeChannel {
  return supabase.channel(`leaderboard:${scope}:${seasonId ?? 'all'}`).on('postgres_changes', { event: '*', schema: 'public', table: 'leaderboard_rows', filter: `scope=eq.${scope}` }, (payload) => {
    const row = mapLeaderboardRow(payload.new as Record<string, unknown>);
    if (!seasonId || row.seasonId === seasonId) onChange(row);
  }).subscribe();
}
