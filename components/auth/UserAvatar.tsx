import Image from 'next/image';
import { toUserAvatarDisplay } from '@/services/auth.service';
import type { AuthUser, UserAvatarDisplay } from '@/types/auth';

type UserAvatarProps = {
  user?: AuthUser | null;
  display?: UserAvatarDisplay;
  compact?: boolean;
};

export function UserAvatar({ user = null, display, compact = false }: UserAvatarProps) {
  const avatar = display ?? toUserAvatarDisplay(user);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100">
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-arena-violet/40 font-black text-white">
        {avatar.avatarUrl ? <Image src={avatar.avatarUrl} alt={`${avatar.displayName} avatar`} width={48} height={48} className="h-full w-full object-cover" unoptimized /> : avatar.initials}
      </div>
      <div className="min-w-0">
        <p className="truncate font-bold">{avatar.displayName}</p>
        {!compact ? (
          <p className="text-xs text-slate-300">Level {avatar.level} · {avatar.xp.toLocaleString()} XP · {avatar.coins.toLocaleString()} coins</p>
        ) : null}
      </div>
    </div>
  );
}
