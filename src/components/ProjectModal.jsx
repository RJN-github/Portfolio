import React, { useEffect, useState } from 'react';
import { ExternalLink, FileCode2, GitBranch, X } from 'lucide-react';
import ProjectBlueprintPreview from './ProjectBlueprintPreview';

const ProjectModal = ({ project, onClose }) => {
  const [activeShotIndex, setActiveShotIndex] = useState(0);

  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasShots = project.screenshots && project.screenshots.length > 0;
  const activeShot = hasShots ? project.screenshots[activeShotIndex] || project.screenshots[0] : null;
  const hasBlueprint = Boolean(
    project.previewType && project.previewType !== 'none' && project.previewType !== 'screenshot'
  );
  const showVisualShowcase = Boolean((hasShots && activeShot) || hasBlueprint);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      data-lenis-prevent
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-hidden"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        data-testid="project-modal-card"
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-white/15 bg-[#111115] text-[#FAFAF9] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="shrink-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#111115]/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] min-w-0">
            <span className="text-[#FB7185] tabular-nums">{project.index}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{project.year}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project case study"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 bg-[#18181D] text-[#FAFAF9] hover:border-white/35 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          data-lenis-prevent
          data-testid="project-modal-scroll"
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-8"
        >
          {/* Title & Subtitle */}
          <div>
            <h2
              id="project-modal-title"
              className="font-display text-2xl sm:text-4xl font-bold text-[#FAFAF9] leading-tight"
            >
              {project.title}
            </h2>
            <p className="mt-2 text-base sm:text-lg text-[#A1A1AA]">{project.subtitle}</p>
          </div>

          {/* Visual Showcase or Blueprint (omitted cleanly when none) */}
          {showVisualShowcase && (
            <div className="rounded-xl border border-white/10 bg-[#09090B] overflow-hidden">
              {hasShots && activeShot ? (
                <div>
                  <div
                    className={`aspect-[16/10] w-full overflow-hidden ${
                      activeShot.fit === 'contain' ? 'bg-[#060908] p-2 sm:p-3 flex items-center justify-center' : 'bg-[#09090B]'
                    }`}
                  >
                    <img
                      src={activeShot.src}
                      alt={activeShot.caption || project.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full ${
                        activeShot.fit === 'contain' ? 'object-contain' : 'object-cover object-top'
                      }`}
                    />
                  </div>
                  <div className="px-4 py-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#111115]">
                    <p className="text-xs font-mono text-[#A1A1AA]">{activeShot.caption}</p>
                    {project.screenshots.length > 1 && (
                      <div className="flex items-center gap-1.5">
                        {project.screenshots.map((shot, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveShotIndex(idx)}
                            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                              idx === activeShotIndex
                                ? 'bg-[#E11D48] text-white'
                                : 'bg-white/5 text-[#A1A1AA] hover:text-white'
                            }`}
                          >
                            0{idx + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <ProjectBlueprintPreview type={project.previewType} />
              )}
            </div>
          )}

          {/* Overview / Problem / Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-white/10 bg-[#15151A]">
              <h3 className="text-xs font-mono text-[#FB7185] mb-2">Problem Addressed</h3>
              <p className="text-sm sm:text-base text-[#D4D4D8] leading-relaxed">{project.problem}</p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-[#15151A]">
              <h3 className="text-xs font-mono text-[#FB7185] mb-2">Engineering Solution</h3>
              <p className="text-sm sm:text-base text-[#D4D4D8] leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Key Functionality */}
          <div>
            <h3 className="text-xs font-mono text-[#71717A] mb-3">Key Functionality</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-[#D4D4D8] p-3.5 rounded-xl border border-white/10 bg-[#0D0D11]"
                >
                  <span aria-hidden="true" className="text-[#E11D48] font-mono">
                    —
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack & Repository Files */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div>
              <h3 className="text-xs font-mono text-[#71717A] mb-2">Technology Stack</h3>
              <p className="text-sm font-medium text-[#FAFAF9]">{project.tech.join(' · ')}</p>
            </div>
            {project.repoFiles && project.repoFiles.length > 0 && (
              <div>
                <h3 className="text-xs font-mono text-[#71717A] mb-2 flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-[#FB7185]" aria-hidden="true" />
                  <span>Verified Repository Structure</span>
                </h3>
                <p className="text-xs font-mono text-[#A1A1AA]">{project.repoFiles.join(' · ')}</p>
              </div>
            )}
          </div>

          {/* Modal Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span>Open Live Demo</span>
              </a>
            )}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 hover:border-white/40 text-[#FAFAF9] text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <GitBranch className="w-4 h-4" aria-hidden="true" />
                <span>Inspect GitHub Repository</span>
              </a>
            ) : project.conceptStatus ? (
              <span className="text-xs font-mono text-[#A1A1AA] px-2">
                {project.conceptStatus}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
