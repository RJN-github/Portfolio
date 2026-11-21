import React, { useEffect, useState } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { scrollToSection } from '../utils/scrollHelper';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'dual-persona', label: 'Mindset' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const Navigation = ({ onOpenResume, onOpenPalette }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['hero', ...NAV_ITEMS.map((i) => i.id)];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.3, 0.6] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#09090B]/92 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="font-display text-lg font-bold tracking-tight text-[#FAFAF9] hover:text-[#FB7185] transition-colors whitespace-nowrap shrink-0"
        >
          {PROFILE.name}
        </a>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive ? 'text-[#FAFAF9]' : 'text-[#A1A1AA] hover:text-[#FAFAF9]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#E11D48] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#FAFAF9] bg-[#E11D48] hover:bg-[#BE123C] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            <span>Resume</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/15 bg-[#111115] text-[#FAFAF9] hover:border-white/30 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#09090B]/98 border-b border-white/10 px-4 py-5 space-y-2">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-white/10 text-[#FAFAF9]'
                    : 'text-[#A1A1AA] hover:text-[#FAFAF9] hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenResume();
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-[#E11D48] hover:bg-[#BE123C] rounded-lg transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>View Resume</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenPalette();
              }}
              className="inline-flex items-center justify-center px-4 py-3 text-sm font-mono text-[#A1A1AA] border border-white/15 rounded-lg hover:text-white transition-colors cursor-pointer"
            >
              Quick Jump
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
