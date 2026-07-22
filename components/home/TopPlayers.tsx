import { GlassCard } from '@/components/ui/GlassCard';
const players = [['NyxVortex','18,940'],['Kairo','18,120'],['FluxQueen','17,884'],['OrbitZero','17,402']];
export function TopPlayers(){return <GlassCard className="p-6"><h2 className="text-2xl font-black text-white">Top players</h2><div className="mt-4 space-y-3">{players.map(([name,score],i)=><div key={name} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3"><span className="font-bold text-white">#{i+1} {name}</span><span className="text-secondary">{score} RP</span></div>)}</div></GlassCard>}
