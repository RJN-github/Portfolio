import React, { useState } from 'react';
import { Briefcase, GraduationCap, Code2 } from 'lucide-react';
import { EXPERIENCE_TIMELINE } from '../data/portfolioData';

const ROLE_ICONS = {
  'webster-solutions': Briefcase,
  'ratnatray-part-time': Code2,
  'vpimsr-bca': GraduationCap,
};

const ExperienceSection = () => {
  const [selectedId, setSelectedId] = useState(EXPERIENCE_TIMELINE[0].id);

  return (
    <section id="experience" className="py-20 sm:py-28 border-b border-white/10 bg-[#0D0D11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-xs font-mono text-[#FB7185] tracking-wider mb-3">03. Experience</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAF9]">
            Professional journey &amp; foundations.
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-base leading-relaxed">
            Shipping production web platforms at Webster Solutions alongside part-time billing
            system development at Ratnatray Traders and formal BCA studies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Role Selector Timeline */}
          <div className="lg:col-span-5 space-y-3" role="tablist" aria-label="Experience timeline">
            {EXPERIENCE_TIMELINE.map((item, idx) => {
              const Icon = ROLE_ICONS[item.id] || Briefcase;
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#17171D] border-[#E11D48]/60'
                      : 'bg-[#111115] border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <span
                        className={`mt-0.5 inline-flex items-center justify-center w-9 h-9 rounded-lg border ${
                          isSelected
                            ? 'bg-[#E11D48]/15 border-[#E11D48]/50 text-[#FB7185]'
                            : 'bg-white/5 border-white/10 text-[#A1A1AA]'
                        }`}
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-mono text-[#A1A1AA]">
                          0{idx + 1} · {item.type}
                        </p>
                        <h3 className="font-display text-lg font-semibold text-[#FAFAF9] mt-1">
                          {item.role}
                        </h3>
                        <p className="text-sm text-[#FB7185] font-medium">{item.organization}</p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Detailed Role View */}
          <div className="lg:col-span-7">
            {EXPERIENCE_TIMELINE.filter((item) => item.id === selectedId).map((active) => (
              <div
                key={active.id}
                role="tabpanel"
                className="p-6 sm:p-8 lg:p-10 rounded-2xl border border-white/10 bg-[#111115]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
                  <div>
                    <p className="text-xs font-mono text-[#FB7185]">{active.type}</p>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FAFAF9] mt-1">
                      {active.role}
                    </h3>
                    <p className="text-base text-[#A1A1AA] mt-0.5">{active.organization}</p>
                  </div>
                </div>

                <p className="mt-6 text-[#D4D4D8] text-base leading-relaxed">{active.summary}</p>

                <div className="mt-6">
                  <h4 className="text-xs font-mono text-[#71717A] mb-3">
                    Core Focus &amp; Technologies Applied
                  </h4>
                  <ul className="space-y-3">
                    {active.highlights.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#A1A1AA]">
                        <span aria-hidden="true" className="text-[#E11D48] font-mono mt-0.5">
                          —
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clean Unboxed Stack Metadata */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs font-mono text-[#71717A] mb-2">Environment &amp; Stack</p>
                  <p className="text-sm text-[#FAFAF9] font-medium leading-relaxed">
                    {active.stack.join(' · ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
