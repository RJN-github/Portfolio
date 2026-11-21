import React from 'react';
import { PROFILE } from '../data/portfolioData';

const CRAFT_PILLARS = [
  {
    index: '01',
    title: 'Practical Business Systems',
    body: 'From offline-ready counter billing at Ratnatray Traders in Sangli to biometric college attendance in Roll Call Rally, I build software meant to run reliably in real environments.',
  },
  {
    index: '02',
    title: 'Full-Stack Versatility',
    body: 'Focused on React, Next.js, Node.js, Express.js, MongoDB, WordPress, and MySQL—with supporting production exposure to PHP, Astro, Laravel + Filament, and Blade.',
  },
  {
    index: '03',
    title: 'Real-Time Interactivity',
    body: 'Designing responsive WebSocket gameplay loops, browser webcam computer-vision flows, and fluid micro-interactions that feel immediate.',
  },
  {
    index: '04',
    title: 'Agentic AI Workflows',
    body: 'Integrating modern agentic AI-assisted coding workflows into daily engineering at Webster Solutions to iterate faster while maintaining clean code quality.',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 sm:py-28 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Editorial Story Left Column */}
          <div className="lg:col-span-5">
            <p className="text-xs font-mono text-[#FB7185] tracking-wider mb-3">01. Narrative</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAF9] leading-[1.1]">
              Built on curiosity, shipped with purpose.
            </h2>

            <div className="mt-6 space-y-4 text-[#A1A1AA] text-base leading-relaxed">
              <p>
                Based in <span className="text-[#FAFAF9] font-medium">Sangli, Maharashtra</span>, I
                started by dissecting HTML and CSS layouts before moving quickly into React
                applications, PHP/MySQL business software, and real-time Node.js architectures.
              </p>
              <p>
                Today, as an{' '}
                <span className="text-[#FAFAF9] font-medium">
                  Associate Web Developer at Webster Solutions
                </span>{' '}
                while completing my BCA at VPIMSR (Shivaji University Kolhapur), I focus on the MERN
                stack (MongoDB, Express.js, React, Node.js), Next.js, WordPress, and MySQL—with
                supporting experience across Astro, Laravel + Filament, Blade, and agentic AI workflows.
              </p>
            </div>

            {/* Clean Typographic Metadata List */}
            <dl className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="text-xs font-mono text-[#71717A]">Base</dt>
                <dd className="text-[#FAFAF9] font-medium mt-1">Sangli, Maharashtra</dd>
              </div>
              <div>
                <dt className="text-xs font-mono text-[#71717A]">Degree</dt>
                <dd className="text-[#FAFAF9] font-medium mt-1">BCA · VPIMSR (2026)</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs font-mono text-[#71717A]">Outside of Code</dt>
                <dd className="mt-2 grid grid-cols-2 gap-3">
                  {PROFILE.interests.map((item) => (
                    <div key={item.label} className="text-xs">
                      <span className="text-[#FAFAF9] font-medium">{item.label}</span>
                      <span className="block text-[#71717A] mt-0.5">{item.detail}</span>
                    </div>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Structured Editorial Pillars */}
          <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
            {CRAFT_PILLARS.map((pillar) => (
              <article
                key={pillar.index}
                className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline group"
              >
                <span className="sm:col-span-2 font-mono text-xs text-[#E11D48] tabular-nums">
                  {pillar.index}
                </span>
                <div className="sm:col-span-10">
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-[#FAFAF9] group-hover:text-[#FB7185] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
