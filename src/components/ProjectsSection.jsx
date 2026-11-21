import React, { useMemo, useState } from 'react';
import { ArrowUpRight, ExternalLink, GitBranch, Search, X } from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/portfolioData';
import { filterProjects, splitFeaturedProjects } from '../utils/portfolioLogic';
import ProjectBlueprintPreview from './ProjectBlueprintPreview';

const hasProjectVisual = (project) =>
  Boolean(
    (project.screenshots && project.screenshots.length > 0) ||
      (project.previewType && project.previewType !== 'none' && project.previewType !== 'screenshot')
  );

const ProjectMedia = ({ project, compact = false }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (project.screenshots && project.screenshots.length > 0 && !imgFailed) {
    const cover = project.screenshots[0];
    const isContain = cover.fit === 'contain';
    return (
      <div className={`relative w-full h-full overflow-hidden ${isContain ? 'bg-[#060908] p-2 sm:p-3 flex items-center justify-center' : 'bg-[#0E0E12]'}`}>
        <img
          src={cover.src}
          alt={cover.caption || project.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgFailed(true)}
          className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
            isContain ? 'object-contain' : 'object-cover object-top'
          }`}
        />
        {!isContain && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none"
          />
        )}
      </div>
    );
  }

  if (project.previewType && project.previewType !== 'none' && project.previewType !== 'screenshot') {
    return <ProjectBlueprintPreview type={project.previewType} compact={compact} />;
  }

  return null;
};

const ProjectsSection = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(
    () => filterProjects(PROJECTS, activeCategory, searchQuery),
    [activeCategory, searchQuery]
  );

  const { featured, rest } = useMemo(() => splitFeaturedProjects(filtered), [filtered]);
  const showSplitLayout = activeCategory === 'all' && !searchQuery.trim();

  return (
    <section id="projects" className="py-20 sm:py-28 border-b border-white/10 bg-[#0D0D11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#FB7185] tracking-wider mb-3">
              05. Selected Works
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAF9]">
              Products engineered from scratch.
            </h2>
            <p className="mt-4 text-[#A1A1AA] text-base leading-relaxed">
              Practical business software, real-time multiplayer systems, biometric attendance, and
              focused web utilities—verified directly against public repositories.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <label htmlFor="project-search" className="sr-only">
              Filter projects by name or technology
            </label>
            <Search
              className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="project-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack or project..."
              className="w-full pl-10 pr-9 py-2.5 rounded-lg bg-[#111115] border border-white/15 text-sm text-[#FAFAF9] placeholder:text-[#71717A] focus:border-[#E11D48] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear project search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#A1A1AA] hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Interactive Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#111115] border border-white/10"
            role="tablist"
            aria-label="Project categories"
          >
            {PROJECT_CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#E11D48] text-white'
                      : 'text-[#A1A1AA] hover:text-[#FAFAF9] hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <p className="text-xs font-mono text-[#71717A] tabular-nums" data-testid="projects-count">
            Showing {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 px-6 rounded-2xl border border-white/10 bg-[#111115] text-center">
            <p className="font-display text-xl font-semibold text-[#FAFAF9]">
              No matching projects found
            </p>
            <p className="text-sm text-[#A1A1AA] mt-2">
              Try clearing your search filter or switching back to All Work.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-5 px-4 py-2 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-medium transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Flagship Featured Showcase (Asymmetrical Large Spreads) */}
            {(showSplitLayout ? featured : filtered.slice(0, 2)).map((project, idx) => {
              const reverse = idx % 2 === 1;
              const withVisual = hasProjectVisual(project);

              if (!withVisual) {
                return (
                  <article
                    key={project.id}
                    className="group grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-white/10 bg-[#111115] overflow-hidden hover:border-white/25 transition-colors"
                  >
                    <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA]">
                          <span className="text-[#FB7185] tabular-nums">{project.index}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{project.year}</span>
                        </div>

                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FAFAF9] mt-3 leading-tight">
                          {project.title}
                        </h3>
                        <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                          {project.description}
                        </p>

                        <p className="mt-5 text-xs font-mono text-[#D4D4D8] leading-relaxed">
                          {project.tech.join(' · ')}
                        </p>
                      </div>

                      <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>View Case Study</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </button>

                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-white/15 hover:border-white/35 text-xs sm:text-sm font-medium text-[#FAFAF9] transition-colors whitespace-nowrap shrink-0"
                          >
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Live Demo</span>
                          </a>
                        )}

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} GitHub repository`}
                            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors whitespace-nowrap shrink-0"
                          >
                            <GitBranch className="w-4 h-4" aria-hidden="true" />
                            <span>Source</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-[#0B0B0F] flex flex-col justify-between gap-6">
                      <div>
                        <p className="text-xs font-mono text-[#FB7185] mb-4">
                          Architecture &amp; Capabilities
                        </p>
                        <ul className="space-y-3">
                          {project.features.map((feat, fIdx) => (
                            <li
                              key={fIdx}
                              className="flex items-start gap-2.5 text-sm text-[#D4D4D8] leading-relaxed"
                            >
                              <span aria-hidden="true" className="text-[#E11D48] font-mono">
                                —
                              </span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {project.repoFiles && project.repoFiles.length > 0 && (
                        <div className="pt-4 border-t border-white/10">
                          <p className="text-[11px] font-mono text-[#71717A] mb-1.5">
                            Repository Entrypoints
                          </p>
                          <p className="text-xs font-mono text-[#A1A1AA] leading-relaxed">
                            {project.repoFiles.join(' · ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </article>
                );
              }

              return (
                <article
                  key={project.id}
                  className="group grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-white/10 bg-[#111115] overflow-hidden hover:border-white/25 transition-colors"
                >
                  <div
                    className={`lg:col-span-7 min-h-[260px] sm:min-h-[340px] lg:min-h-[380px] border-b lg:border-b-0 ${
                      reverse ? 'lg:order-2 lg:border-l border-white/10' : 'lg:border-r border-white/10'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      data-cursor="Case Study"
                      aria-label={`Inspect ${project.title}`}
                      className="block w-full h-full text-left cursor-pointer"
                    >
                      <ProjectMedia project={project} />
                    </button>
                  </div>

                  <div
                    className={`lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${
                      reverse ? 'lg:order-1' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA]">
                        <span className="text-[#FB7185] tabular-nums">{project.index}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{project.year}</span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FAFAF9] mt-3 leading-tight">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                        {project.description}
                      </p>

                      {/* Unboxed Metadata Tech Line */}
                      <p className="mt-5 text-xs font-mono text-[#D4D4D8] leading-relaxed">
                        {project.tech.join(' · ')}
                      </p>
                    </div>

                    <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </button>

                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-white/15 hover:border-white/35 text-xs sm:text-sm font-medium text-[#FAFAF9] transition-colors whitespace-nowrap shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Live Demo</span>
                        </a>
                      )}

                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub repository`}
                          className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors whitespace-nowrap shrink-0"
                        >
                          <GitBranch className="w-4 h-4" aria-hidden="true" />
                          <span>Source</span>
                        </a>
                      ) : project.conceptStatus ? (
                        <span className="text-xs font-mono text-[#71717A] px-2">
                          {project.conceptStatus}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Supporting Editorial Showcase Grid */}
            {(showSplitLayout ? rest : filtered.slice(2)).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {(showSplitLayout ? rest : filtered.slice(2)).map((project) => {
                  const withVisual = hasProjectVisual(project);
                  return (
                  <article
                    key={project.id}
                    className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111115] overflow-hidden hover:border-white/25 transition-colors"
                  >
                    <div>
                      {withVisual && (
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          data-cursor="Inspect"
                          aria-label={`Open ${project.title} details`}
                          className="block w-full h-52 border-b border-white/10 text-left overflow-hidden cursor-pointer"
                        >
                          <ProjectMedia project={project} compact />
                        </button>
                      )}

                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA]">
                          <span className="text-[#FB7185] tabular-nums">{project.index}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.categoryLabel}</span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-[#FAFAF9] mt-2.5 leading-snug">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#A1A1AA] leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-4 border-t border-white/10 space-y-4">
                      <p className="text-xs font-mono text-[#D4D4D8] truncate">
                        {project.tech.join(' · ')}
                      </p>

                      <div className="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FAFAF9] hover:text-[#FB7185] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </button>

                        <div className="flex items-center gap-3">
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-[#A1A1AA] hover:text-white transition-colors whitespace-nowrap shrink-0"
                            >
                              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Live</span>
                            </a>
                          )}
                          {project.github ? (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-[#A1A1AA] hover:text-white transition-colors whitespace-nowrap shrink-0"
                            >
                              <GitBranch className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>GitHub</span>
                            </a>
                          ) : project.conceptStatus ? (
                            <span className="text-[11px] font-mono text-[#71717A] whitespace-nowrap">
                              {project.conceptStatus}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
