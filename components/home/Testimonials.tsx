import { GlassCard } from '@/components/ui/GlassCard';
const quotes=[['“Every match feels like a final circle.”','Mira, pro captain'],['“The smoothest arena movement in years.”','Jax, creator'],['“Daily rewards actually keep my squad logging in.”','Sol, guild lead']];
export function Testimonials(){return <div className="grid gap-4 md:grid-cols-3">{quotes.map(([quote,name])=><GlassCard key={name} className="p-6"><p className="text-lg font-semibold text-white">{quote}</p><p className="mt-4 text-sm text-secondary">{name}</p></GlassCard>)}</div>}
