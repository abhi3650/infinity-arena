import { PageShell } from '@/components/page-shell';
import { findRouteByHref } from '@/lib/routes';

export default function Page() {
  return <PageShell route={findRouteByHref('/admin')} />;
}
