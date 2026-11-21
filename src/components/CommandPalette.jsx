import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Copy, FileText, Search, X } from 'lucide-react';
import { PROFILE, PROJECTS } from '../data/portfolioData';
import { scrollToSection } from '../utils/scrollHelper';

const SECTION_LINKS = [
  { id: 'hero', label: 'Jump to Hero' },
  { id: 'about', label: 'Jump to About' },
  { id: 'dual-persona', label: 'Jump to Mindset & Team Craft' },
  { id: 'experience', label: 'Jump to Experience' },
  { id: 'skills', label: 'Jump to Technical Ecosystem' },
  { id: 'projects', label: 'Jump to Selected Works' },
  { id: 'gallery', label: 'Jump to Visual Archive' },
  { id: 'beyond-code', label: 'Jump to Two Wheels & Visor' },
  { id: 'contact', label: 'Jump to Contact' },
];

const CommandPalette = ({ open, onClose, onSelectProject, onOpenResume }) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const actions = useMemo(() => {
    const list = [
      ...SECTION_LINKS.map((s) => ({
        key: `sec-${s.id}`,
        group: 'Navigate',
        label: s.label,
        run: () => {
          onClose();
          scrollToSection(s.id);
        },
      })),
      {
        key: 'act-resume',
        group: 'Actions',
        label: 'View & Download Resume',
        run: () => {
          onClose();
          onOpenResume();
        },
      },
      {
        key: 'act-copy-email',
        group: 'Actions',
        label: copied ? `Copied ${PROFILE.email}` : `Copy Email (${PROFILE.email})`,
        run: async () => {
          try {
            await navigator.clipboard.writeText(PROFILE.email);
            setCopied(true);
            setTimeout(() => onClose(), 700);
          } catch {
            onClose();
          }
        },
      },
      ...PROJECTS.map((p) => ({
        key: `proj-${p.id}`,
        group: 'Projects',
        label: `Open Case Study: ${p.title}`,
        run: () => {
          onClose();
          onSelectProject(p);
        },
      })),
    ];

    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (item) => item.label.toLowerCase().includes(q) || item.group.toLowerCase().includes(q)
    );
  }, [query, copied, onClose, onOpenResume, onSelectProject]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick navigation command palette"
      data-lenis-prevent
      className="fixed inset-0 z-[90] flex items-start justify-center pt-[12vh] px-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className="w-full max-w-xl rounded-2xl border border-white/15 bg-[#111115] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <Search className="w-4 h-4 text-[#71717A]" aria-hidden="true" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a section, project, or action..."
            aria-label="Search quick navigation commands"
            className="flex-1 bg-transparent text-sm text-[#FAFAF9] placeholder:text-[#71717A] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          data-lenis-prevent
          className="max-h-80 overflow-y-auto overscroll-contain p-2 space-y-1"
        >
          {actions.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#71717A]">No matching commands</p>
          ) : (
            actions.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={item.run}
                className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm text-[#D4D4D8] hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
              >
                <span className="truncate">{item.label}</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#71717A] shrink-0">
                  <span>{item.group}</span>
                  {item.key === 'act-resume' ? (
                    <FileText className="w-3.5 h-3.5 text-[#FB7185]" aria-hidden="true" />
                  ) : item.key === 'act-copy-email' ? (
                    <Copy className="w-3.5 h-3.5 text-[#FB7185]" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
