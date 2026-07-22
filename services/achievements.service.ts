import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import type { Achievement, AchievementProgress } from '@/types/achievements';

const s = (v: unknown) => (v == null ? null : String(v));
const n = (v: unknown, d = 0) => Number(v ?? d);
const mapAchievement = (r: Record<string, unknown>): Achievement => ({ id: String(r.id), key: String(r.key), title: String(r.title), description: s(r.description), category: s(r.category), target: n(r.target), rewardTableId: s(r.reward_table_id), hidden: Boolean(r.hidden), active: Boolean(r.active ?? true) });
export const mapAchievementProgress = (r: Record<string, unknown>): AchievementProgress => ({ id: String(r.id), userId: String(r.user_id), achievementId: String(r.achievement_id), progress: n(r.progress), completedAt: s(r.completed_at), claimedAt: s(r.claimed_at), updatedAt: s(r.updated_at) ?? undefined });

export async function getAchievements(supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.from('achievements').select('*').eq('active', true).order('category').order('title');
  if (error) throw error;
  return (data ?? []).map((row) => mapAchievement(row as Record<string, unknown>));
}

export async function getAchievementProgress(userId: string, supabase: SupabaseClient = createClient()) {
  const { data, error } = await supabase.from('achievement_progress').select('*').eq('user_id', userId).order('updated_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => mapAchievementProgress(row as Record<string, unknown>));
}

export function subscribeToAchievementProgress(userId: string, onChange: (progress: AchievementProgress) => void, supabase: SupabaseClient = createClient()): RealtimeChannel {
  return supabase.channel(`achievement-progress:${userId}`).on('postgres_changes', { event: '*', schema: 'public', table: 'achievement_progress', filter: `user_id=eq.${userId}` }, (payload) => onChange(mapAchievementProgress(payload.new as Record<string, unknown>))).subscribe();
}
