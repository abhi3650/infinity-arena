import { AdminShell } from '@/components/admin/AdminShell';
import { getAdminDashboardData, requireAdminProfile } from '@/services/admin.service';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const profile = await requireAdminProfile();
  const data = await getAdminDashboardData(profile);

  return <AdminShell data={data} />;
}
