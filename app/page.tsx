import { PageShell } from '@/components/page-shell';
import { findRouteByHref } from '@/lib/routes';

export default function HomePage() {
  return <PageShell route={findRouteByHref('/')} />;
}
