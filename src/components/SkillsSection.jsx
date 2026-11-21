import React, { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SKILLS, SKILL_CATEGORIES, PROJECTS } from '../data/portfolioData';
import { filterSkillsByCategory, findProjectsForSkill } from '../utils/portfolioLogic';

const SkillsSection = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkillId, setSelectedSkillId] = useState('react');

  const visibleSkills = useMemo(
    () => filterSkillsByCategory(SKILLS, activeCategory),
    [activeCategory]
  );

  const activeSkill = useMemo(() => {
    const foundInVisible = visibleSkills.find((s) => s.id === selectedSkillId);
    if (foundInVisible) return foundInVisible;
    return visibleSkills[0] || SKILLS[0];
  }, [visibleSkills, selectedSkillId]);

  const linkedProjects = useMemo(
    () => findProjectsForSkill(PROJECTS, activeSkill),
    [activeSkill]
  );

  const activeCatMeta = SKILL_CATEGORIES.find((c) => c.id === activeSkill.category);

  return (
    <section id="skills" className="py-20 sm:py-28 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#FB7185] tracking-wider mb-3">
              04. Technical Ecosystem
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAF9]">
              Connected stack, zero vanity scores.
            </h2>
            <p className="mt-4 text-[#A1A1AA] text-base leading-relaxed">
              Spotlighted on the MERN stack, React, Next.js, WordPress, and MySQL—with supporting
              exposure to Astro, Laravel + Filament, and Blade noted alongside.
            </p>
          </div>
        </div>

        {/* Category Segmented Controls */}
        <div
          className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#111115] border border-white/10 mb-8"
          role="tablist"
          aria-label="Technology categories"
        >
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveCategory(cat.id);
                  const next = filterSkillsByCategory(SKILLS, cat.id);
                  if (next.length > 0 && !next.some((s) => s.id === selectedSkillId)) {
                    setSelectedSkillId(next[0].id);
                  }
                }}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#E11D48] text-white'
                    : 'text-[#A1A1AA] hover:text-[#FAFAF9] hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Matrix + Live Inspector Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Node Constellation Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 content-start">
            {visibleSkills.map((skill, idx) => {
              const isSelected = activeSkill.id === skill.id;
              const catLabel =
                SKILL_CATEGORIES.find((c) => c.id === skill.category)?.label || skill.category;
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => setSelectedSkillId(skill.id)}
                  aria-pressed={isSelected}
                  className={`group text-left p-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#191920] border-[#E11D48] shadow-sm'
                      : 'bg-[#111115] border-white/10 hover:border-white/25 hover:bg-[#15151A]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#71717A] mb-2">
                    <span className="tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                    {skill.projects.length > 0 ? (
                      <span className="text-[#FB7185] tabular-nums">
                        {skill.projects.length} {skill.projects.length === 1 ? 'project' : 'projects'}
                      </span>
                    ) : skill.supporting ? (
                      <span className="text-[#71717A]">Supporting</span>
                    ) : null}
                  </div>
                  <p className="font-display text-base sm:text-lg font-semibold text-[#FAFAF9] group-hover:text-white">
                    {skill.name}
                  </p>
                  <p className="text-xs text-[#71717A] mt-1 truncate">
                    {skill.supporting ? `${catLabel} · Subtitle` : catLabel}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Technology Detail Inspector */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#111115]">
            <div>
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div>
                  <p className="text-xs font-mono text-[#FB7185]">
                    {activeCatMeta?.label || 'Technology'}
                    {activeSkill.supporting ? ' · Supporting Exposure' : ''}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FAFAF9] mt-1">
                    {activeSkill.name}
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#71717A]">Stack Inspector</span>
              </div>

              <p className="mt-6 text-[#D4D4D8] text-base leading-relaxed">{activeSkill.role}</p>

              <div className="mt-8">
                <h4 className="text-xs font-mono text-[#71717A] mb-3">
                  Verified Applications in Portfolio
                </h4>
                {linkedProjects.length > 0 ? (
                  <div className="space-y-2.5">
                    {linkedProjects.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="w-full flex items-center justify-between gap-4 p-3.5 rounded-xl border border-white/10 bg-[#17171D] hover:border-[#E11D48]/60 text-left transition-colors cursor-pointer"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#FAFAF9] truncate">
                            {project.title}
                          </p>
                          <p className="text-xs text-[#A1A1AA] truncate mt-0.5">
                            {project.categoryLabel} · {project.tech.slice(0, 3).join(' · ')}
                          </p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#FB7185] shrink-0" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#A1A1AA] p-4 rounded-xl border border-white/10 bg-[#0D0D11]">
                    Applied directly in production web development and client platforms at{' '}
                    <span className="text-[#FAFAF9] font-medium">Webster Solutions</span>.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 text-xs text-[#71717A] font-mono">
              Showing {visibleSkills.length} of {SKILLS.length} verified technologies
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
