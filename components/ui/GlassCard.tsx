import type { ReactNode } from 'react';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/[0.07] shadow-2xl shadow-primary/10 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}
