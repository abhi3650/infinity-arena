import type { AppRoute } from '@/types/navigation';

export const appRoutes = [
  { href: '/', label: 'Home', description: 'Enter Infinity Arena and review the live operations hub.' },
  { href: '/play', label: 'Play', description: 'Matchmaking, queues, and arena launch controls.' },
  { href: '/profile', label: 'Profile', description: 'Player identity, stats, loadouts, and progression.' },
  { href: '/leaderboard', label: 'Leaderboard', description: 'Global, seasonal, clan, and friend rankings.' },
  { href: '/achievements', label: 'Achievements', description: 'Milestones, badges, and mastery objectives.' },
  { href: '/daily-rewards', label: 'Daily Rewards', description: 'Login streaks, claims, and rotating reward calendars.' },
  { href: '/battle-pass', label: 'Battle Pass', description: 'Season tiers, premium rewards, and challenge progress.' },
  { href: '/shop', label: 'Shop', description: 'Featured cosmetics, bundles, currencies, and offers.' },
  { href: '/settings', label: 'Settings', description: 'Gameplay, accessibility, account, and notification preferences.' },
  { href: '/friends', label: 'Friends', description: 'Social graph, invites, parties, and presence.' },
  { href: '/clan', label: 'Clan', description: 'Guild roster, clan quests, donations, and events.' },
  { href: '/notifications', label: 'Notifications', description: 'Inbox, announcements, rewards, and system messages.' },
  { href: '/admin', label: 'Admin', description: 'Operational controls for trusted arena administrators.' },
] as const satisfies readonly AppRoute[];

export const findRouteByHref = (href: string): AppRoute => {
  return appRoutes.find((route) => route.href === href) ?? appRoutes[0];
};
