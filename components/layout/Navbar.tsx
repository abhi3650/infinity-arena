import Link from 'next/link';

const navItems = ['Play', 'Leaderboard', 'Events', 'Battle Pass'];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070A13]/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 font-black tracking-tight text-white">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary shadow-glow">∞</span>
          <span>Infinity Arena</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} className="text-sm font-medium text-slate-300 transition hover:text-secondary">
              {item}
            </a>
          ))}
        </div>
        <Link href="/play" className="rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-secondary hover:text-white">
          Enter Arena
        </Link>
      </nav>
    </header>
  );
}
