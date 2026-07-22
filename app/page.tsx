import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { AnimatedGradient } from '@/components/ui/AnimatedGradient';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { AnimatedStats } from '@/components/home/AnimatedStats';
import { BattlePassPreview } from '@/components/home/BattlePassPreview';
import { DailyRewardPreview } from '@/components/home/DailyRewardPreview';
import { FeaturedEvent } from '@/components/home/FeaturedEvent';
import { HeroSection } from '@/components/home/HeroSection';
import { LatestNews } from '@/components/home/LatestNews';
import { ParticlesBackground } from '@/components/home/ParticlesBackground';
import { Testimonials } from '@/components/home/Testimonials';
import { TopPlayers } from '@/components/home/TopPlayers';

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070A13] text-slate-100">
      <AnimatedGradient />
      <ParticlesBackground />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-20">
          <SectionReveal id="play" className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <FeaturedEvent />
            <TopPlayers />
          </SectionReveal>
          <SectionReveal id="leaderboard">
            <AnimatedStats />
          </SectionReveal>
          <SectionReveal id="events">
            <LatestNews />
          </SectionReveal>
          <SectionReveal id="battle-pass" className="grid gap-6 lg:grid-cols-2">
            <DailyRewardPreview />
            <BattlePassPreview />
          </SectionReveal>
          <SectionReveal>
            <Testimonials />
          </SectionReveal>
        </div>
        <Footer />
      </div>
    </main>
  );
}
