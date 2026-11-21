import React, { useState } from 'react';
import { Compass, Crosshair, ShieldCheck, Target, Trophy, Users } from 'lucide-react';

const DEV_MODES = [
  {
    id: 'mern-nextjs',
    label: 'MERN & Next.js',
    headline: 'Full-stack JavaScript delivery built for clarity and speed.',
    summary:
      'Focused on React, Next.js, Node.js, Express.js, and MongoDB—shipping real-time rooms, EV charging workflows, and responsive product UIs.',
    primaryStack: ['MERN Stack', 'React', 'Next.js', 'Node.js', 'Express.js', 'MongoDB'],
    subtitleExposure: 'Supporting stack: Astro · Laravel + Filament · Blade',
  },
  {
    id: 'wp-mysql',
    label: 'WordPress & MySQL',
    headline: 'Dependable client sites and relational business systems.',
    summary:
      'Managing production WordPress platforms alongside MySQL-backed billing, customer ledgers, and biometric attendance software.',
    primaryStack: ['WordPress', 'MySQL', 'PHP', 'JavaScript', 'HTML5 / CSS3'],
    subtitleExposure: 'Supporting stack: Astro · Laravel + Filament · Blade',
  },
  {
    id: 'ai-spatial',
    label: 'Agentic AI & 3D',
    headline: 'Structured spatial tooling paired with disciplined AI verification.',
    summary:
      'Combining WebGL configurators like AxisPole Studio with agentic AI coding and browser verification workflows.',
    primaryStack: ['React', 'Three.js', 'WebGL', 'Tailwind CSS', 'Agentic AI'],
    subtitleExposure: 'Supporting stack: Next.js · Astro · Laravel + Filament',
  },
];

const TEAM_QUALITIES = [
  {
    title: 'Team Spirit & Team Building',
    source: 'Football · Cricket · Volleyball',
    icon: Users,
    detail:
      'Building shared trust on the pitch and court—keeping morale steady, lifting teammates, and syncing roles around a common goal.',
  },
  {
    title: 'Working in Coordination',
    source: 'Valorant · Doubles Badminton',
    icon: Crosshair,
    detail:
      'Crisp callouts, split-second utility timing, and smooth handoffs that translate directly into collaborative pull requests and sprint work.',
  },
  {
    title: 'Strategic Planning',
    source: 'Valorant · Cricket Field Tactics',
    icon: Compass,
    detail:
      'Reading momentum shifts early, adjusting game plans mid-match, and breaking down edge cases before writing code.',
  },
  {
    title: 'Leadership & Responsibility',
    source: 'Team Sport Ownership',
    icon: ShieldCheck,
    detail:
      'Stepping up under pressure, owning outcomes without shifting blame, and keeping group execution organized.',
  },
  {
    title: 'Composure & Winning Mentality',
    source: 'Competitive Play · Match Situations',
    icon: Target,
    detail:
      'Staying calm in tight clutch rounds and last-over finishes—applying the same steady mindset to production debugging.',
  },
  {
    title: 'Consistent Match Tempo',
    source: 'Football · Badminton Stamina',
    icon: Trophy,
    detail:
      'Balancing quick tactical bursts with sustained focus across long builds and iterative product launches.',
  },
];

const DualPersonaSection = () => {
  const [devModeId, setDevModeId] = useState('mern-nextjs');
  const activeDev = DEV_MODES.find((d) => d.id === devModeId) || DEV_MODES[0];

  return (
    <section
      id="dual-persona"
      className="py-14 sm:py-18 border-b border-white/10 bg-[#0B0B0F]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Understated Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <p className="text-xs font-mono text-[#A1A1AA] tracking-wider mb-2">
            02. Mindset &amp; Team Craft
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#FAFAF9] leading-snug">
            Team spirit, strategic planning, and calm execution.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            Competitive play in <span className="text-[#D4D4D8]">Valorant</span> and team sports—
            <span className="text-[#D4D4D8]">Football, Cricket, Volleyball, and Badminton</span>—shapes
            how I collaborate, take responsibility, and keep teams aligned under pressure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Compact Engineering Stack Context */}
          <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#111115]/80">
            <div>
              <div className="flex flex-col gap-3 pb-4 border-b border-white/10">
                <p className="text-xs font-mono text-[#71717A]">Core Focus</p>
                <div
                  role="tablist"
                  aria-label="Core stack focus"
                  className="flex flex-wrap sm:grid sm:grid-cols-3 gap-1 p-1 rounded-lg bg-[#09090B] border border-white/10"
                >
                  {DEV_MODES.map((m) => {
                    const active = devModeId === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setDevModeId(m.id)}
                        className={`flex-1 sm:flex-none px-2.5 py-1.5 text-[11px] sm:text-xs font-medium rounded-md transition-colors text-center whitespace-nowrap cursor-pointer ${
                          active
                            ? 'bg-[#E11D48] text-white'
                            : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-[#FAFAF9] leading-snug">
                  {activeDev.headline}
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{activeDev.summary}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-1.5">
              <p className="text-xs font-mono text-[#FAFAF9] leading-relaxed">
                {activeDev.primaryStack.join(' · ')}
              </p>
              <p className="text-[11px] font-mono text-[#71717A]">{activeDev.subtitleExposure}</p>
            </div>
          </div>

          {/* Right Compact Character & Team Qualities Grid (No 3D Pane, No Explore Works Button) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#111115]/60">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
              <p className="text-xs font-mono text-[#FB7185]">
                Sports &amp; Competitive Qualities
              </p>
              <p className="text-[11px] font-mono text-[#71717A]">
                Valorant · Football · Cricket · Volleyball · Badminton
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TEAM_QUALITIES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-xl border border-white/10 bg-[#0B0B0F]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-sm font-semibold text-[#FAFAF9]">
                        {item.title}
                      </h3>
                      <Icon className="w-3.5 h-3.5 text-[#FB7185] shrink-0" aria-hidden="true" />
                    </div>
                    <p className="text-[11px] font-mono text-[#71717A] mt-0.5 leading-snug">
                      {item.source}
                    </p>
                    <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualPersonaSection;
