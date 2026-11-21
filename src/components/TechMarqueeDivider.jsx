import React from 'react';

const DEFAULT_ITEMS = [
  'MERN Stack',
  'React',
  'Next.js',
  'MongoDB',
  'Express.js',
  'Node.js',
  'WordPress',
  'MySQL',
  'TypeScript',
  'Socket.IO',
  'Agentic AI Workflows',
  'Astro',
  'Laravel · Filament · Blade',
];

const CRAFT_ITEMS = [
  'Practical Business Software',
  'Peer-to-Peer Marketplaces',
  'Multiplayer WebSockets',
  'Browser Computer Vision',
  'Clean Architecture',
  'Leaflet Maps & UI',
  'A5 Print Engineering',
  'Lenis Motion',
  'Three.js Spatial Craft',
];

const TechMarqueeDivider = ({ variant = 'stack', label }) => {
  const items = variant === 'craft' ? CRAFT_ITEMS : DEFAULT_ITEMS;

  return (
    <div
      aria-label={label || (variant === 'craft' ? 'Engineering themes marquee' : 'Core technologies marquee')}
      className="relative border-y border-white/10 bg-[#0D0D11]/90 overflow-hidden py-3.5 select-none"
    >
      {/* Edge fade masks for subtle editorial framing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-14 sm:w-24 z-10 bg-gradient-to-r from-[#09090B] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-14 sm:w-24 z-10 bg-gradient-to-l from-[#09090B] to-transparent"
      />

      <div className="animate-marquee flex items-center gap-8 text-xs font-mono text-[#A1A1AA]">
        {[...items, ...items].map((item, idx) => (
          <span key={`${item}-${idx}`} className="inline-flex items-center gap-8 whitespace-nowrap">
            <span className="tracking-wide hover:text-[#FAFAF9] transition-colors">{item}</span>
            <span aria-hidden="true" className="text-[#E11D48]">
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechMarqueeDivider;
