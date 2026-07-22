import { redirect } from 'next/navigation';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import type { AdminDashboardData, AdminProfile, AdminRole } from '@/types/admin';

const ADMIN_ROLES = new Set<AdminRole>(['admin', 'moderator', 'owner']);

type ProfileRow = {
  id?: string;
  user_id?: string;
  email?: string | null;
  display_name?: string | null;
  username?: string | null;
  role?: string | null;
};

function toAdminRole(role: string | null | undefined): AdminRole | null {
  return role && ADMIN_ROLES.has(role as AdminRole) ? (role as AdminRole) : null;
}

function mapAdminProfile(user: User, row: ProfileRow | null): AdminProfile {
  const metadata = user.user_metadata ?? {};

  return {
    id: row?.id ?? user.id,
    userId: row?.user_id ?? user.id,
    email: row?.email ?? user.email ?? null,
    displayName: row?.display_name ?? (metadata.display_name as string | null) ?? (metadata.full_name as string | null) ?? null,
    username: row?.username ?? null,
    role: toAdminRole(row?.role),
  };
}

export async function getAdminProfile(supabase: SupabaseClient = createClient()): Promise<AdminProfile | null> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return null;

  const { data: profile } = await supabase.from('profiles').select('id,user_id,email,display_name,username,role').eq('user_id', userData.user.id).maybeSingle();
  const adminProfile = mapAdminProfile(userData.user, (profile as ProfileRow | null) ?? null);

  return adminProfile.role ? adminProfile : null;
}

export async function requireAdminProfile() {
  const adminProfile = await getAdminProfile();

  if (!adminProfile) {
    redirect('/login?next=/admin');
  }

  return adminProfile;
}

export async function getAdminDashboardData(profile: AdminProfile): Promise<AdminDashboardData> {
  return {
    profile,
    metrics: [
      { label: 'Online players', value: '18.4K', delta: '+12.8%', tone: 'cyan' },
      { label: 'Open reports', value: '247', delta: '-6.2%', tone: 'rose' },
      { label: 'Match health', value: '99.97%', delta: '+0.4%', tone: 'emerald' },
      { label: 'Shop revenue', value: '$92K', delta: '+18.1%', tone: 'gold' },
    ],
    activity: [
      { label: '00:00', value: 48 },
      { label: '04:00', value: 32 },
      { label: '08:00', value: 76 },
      { label: '12:00', value: 118 },
      { label: '16:00', value: 141 },
      { label: '20:00', value: 164 },
    ],
    auditRows: [
      { id: 'log-1', area: 'Bans', actor: 'mod.ember', action: 'Escalated cheat cluster', severity: 'Critical', updatedAt: '2m ago' },
      { id: 'log-2', area: 'Shop', actor: 'ops.neon', action: 'Published cyber bundle', severity: 'Info', updatedAt: '18m ago' },
      { id: 'log-3', area: 'Events', actor: 'admin.orbit', action: 'Adjusted tournament bracket', severity: 'Warning', updatedAt: '41m ago' },
      { id: 'log-4', area: 'Rewards', actor: 'system', action: 'Granted make-good crates', severity: 'Info', updatedAt: '1h ago' },
    ],
    sections: [
      { key: 'users', label: 'Users', description: 'Search accounts, review profile roles, progression, wallet balances, and support state.', status: 'Healthy', metric: '2.4M', trend: '+8.7% registrations' },
      { key: 'reports', label: 'Reports', description: 'Triage player reports, toxicity flags, suspicious behavior, and content appeals.', status: 'Review', metric: '247', trend: '42 high priority' },
      { key: 'matches', label: 'Matches', description: 'Inspect live and historical matches, disconnects, MMR changes, and server routing.', status: 'Healthy', metric: '38K', trend: '99.97% complete' },
      { key: 'events', label: 'Events', description: 'Schedule tournaments, limited-time modes, drop windows, and seasonal beats.', status: 'Healthy', metric: '12', trend: '3 launching today' },
      { key: 'shop', label: 'Shop', description: 'Manage offers, bundles, pricing, featuring, inventory limits, and purchase telemetry.', status: 'Healthy', metric: '$92K', trend: '+18.1% daily net' },
      { key: 'battle-pass', label: 'Battle Pass', description: 'Tune tiers, challenges, premium rewards, XP boosts, and season rollover state.', status: 'Review', metric: 'S09', trend: 'Tier 80 spike' },
      { key: 'rewards', label: 'Rewards', description: 'Grant make-goods, configure loot tables, validate claims, and monitor rarity payouts.', status: 'Healthy', metric: '1.8M', trend: '0.03% failures' },
      { key: 'announcements', label: 'Announcements', description: 'Compose broadcasts for patch notes, live incidents, esports, and inbox messages.', status: 'Healthy', metric: '6', trend: '2 scheduled' },
      { key: 'leaderboards', label: 'Leaderboards', description: 'Moderate rankings, freeze seasons, recalculate divisions, and verify anti-cheat holds.', status: 'Action needed', metric: '14', trend: 'Integrity review' },
      { key: 'daily-rewards', label: 'Daily Rewards', description: 'Adjust streak calendars, comeback bonuses, claim windows, and retention experiments.', status: 'Healthy', metric: '71%', trend: '+4.2% claims' },
      { key: 'bans', label: 'Bans', description: 'Review ban waves, sanctions, appeals, device links, and enforcement confidence.', status: 'Review', metric: '89', trend: '12 appeals open' },
      { key: 'logs', label: 'Logs', description: 'Audit privileged actions, economy edits, moderation events, and service jobs.', status: 'Healthy', metric: '9.1K', trend: 'No gaps' },
      { key: 'statistics', label: 'Statistics', description: 'Track retention, conversion, matchmaking quality, economy health, and live KPIs.', status: 'Healthy', metric: '156', trend: '+6 KPIs green' },
      { key: 'realtime-monitoring', label: 'Realtime Monitoring', description: 'Observe socket presence, shard load, latency, incidents, and queue pressure.', status: 'Action needed', metric: 'P95 88ms', trend: 'US-East saturated' },
    ],
  };
}
