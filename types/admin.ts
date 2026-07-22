export type AdminRole = 'admin' | 'moderator' | 'owner';

export type AdminProfile = {
  id: string;
  userId: string;
  email: string | null;
  displayName: string | null;
  username: string | null;
  role: AdminRole | null;
};

export type AdminSectionKey =
  | 'users'
  | 'reports'
  | 'matches'
  | 'events'
  | 'shop'
  | 'battle-pass'
  | 'rewards'
  | 'announcements'
  | 'leaderboards'
  | 'daily-rewards'
  | 'bans'
  | 'logs'
  | 'statistics'
  | 'realtime-monitoring';

export type AdminSection = {
  key: AdminSectionKey;
  label: string;
  description: string;
  status: 'Healthy' | 'Review' | 'Action needed';
  metric: string;
  trend: string;
};

export type AdminMetric = {
  label: string;
  value: string;
  delta: string;
  tone: 'cyan' | 'violet' | 'gold' | 'emerald' | 'rose';
};

export type AdminChartDatum = {
  label: string;
  value: number;
};

export type AdminTableColumn<T> = {
  key: keyof T;
  label: string;
};

export type AdminAuditRow = {
  id: string;
  area: string;
  actor: string;
  action: string;
  severity: 'Info' | 'Warning' | 'Critical';
  updatedAt: string;
};

export type AdminDashboardData = {
  profile: AdminProfile;
  metrics: AdminMetric[];
  activity: AdminChartDatum[];
  sections: AdminSection[];
  auditRows: AdminAuditRow[];
};
