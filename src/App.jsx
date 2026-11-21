import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import AmbientExperience from './components/AmbientExperience';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import DualPersonaSection from './components/DualPersonaSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import TechMarqueeDivider from './components/TechMarqueeDivider';
import ProjectsSection from './components/ProjectsSection';
import GallerySection from './components/GallerySection';
import RiderShowcaseSection from './components/RiderShowcaseSection';
import ContactFooter from './components/ContactFooter';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import CommandPalette from './components/CommandPalette';
import NotFoundPage from './components/NotFoundPage';
import { normalizeRoutePath } from './utils/portfolioLogic';
import { scrollToSection, setLenisInstance } from './utils/scrollHelper';

const PortfolioExperience = () => {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [lenisRefState, setLenisRefState] = useState(null);

  // Initialize Lenis smooth scroll globally while respecting prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis = null;
    let rafId = 0;

    const destroyLenis = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      setLenisInstance(null);
      setLenisRefState(null);
    };

    const startLenis = () => {
      destroyLenis();
      if (mediaQuery.matches) return;

      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      setLenisInstance(lenis);
      setLenisRefState(lenis);

      const raf = (time) => {
        if (!lenis) return;
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    startLenis();

    const onMotionChange = () => startLenis();
    mediaQuery.addEventListener('change', onMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', onMotionChange);
      destroyLenis();
    };
  }, []);

  // Pause Lenis scrolling when modal dialogs lock the viewport
  useEffect(() => {
    if (!lenisRefState) return;
    if (selectedProject || resumeOpen || paletteOpen) {
      lenisRefState.stop();
    } else {
      lenisRefState.start();
    }
  }, [lenisRefState, selectedProject, resumeOpen, paletteOpen]);

  // Support root and legacy section routes (/about, /persona, /projects, /resume) cleanly
  useEffect(() => {
    const path = normalizeRoutePath(location.pathname);
    if (path === '/' || path === '/index.html') {
      window.scrollTo(0, 0);
    } else if (path === '/about') {
      scrollToSection('about');
    } else if (path === '/persona') {
      scrollToSection('dual-persona');
    } else if (path === '/projects') {
      scrollToSection('projects');
    } else if (path === '/resume') {
      queueMicrotask(() => setResumeOpen(true));
    }
  }, [location.pathname]);

  // Global Cmd+K / Ctrl+K shortcut for developer command palette
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#09090B] text-[#FAFAF9]">
      <AmbientExperience />

      <Navigation
        onOpenResume={() => setResumeOpen(true)}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main className="relative z-10">
        <HeroSection onOpenResume={() => setResumeOpen(true)} />
        <AboutSection />
        <DualPersonaSection />
        <ExperienceSection />
        <SkillsSection onSelectProject={(proj) => setSelectedProject(proj)} />
        <TechMarqueeDivider variant="craft" />
        <ProjectsSection onSelectProject={(proj) => setSelectedProject(proj)} />
        <GallerySection onSelectProject={(proj) => setSelectedProject(proj)} />
        <RiderShowcaseSection />
      </main>

      <ContactFooter
        onOpenResume={() => setResumeOpen(true)}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      {selectedProject && (
        <ProjectModal
          key={selectedProject.id}
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      {paletteOpen && (
        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenResume={() => setResumeOpen(true)}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioExperience />} />
        <Route path="/index.html" element={<PortfolioExperience />} />
        <Route path="/about" element={<PortfolioExperience />} />
        <Route path="/persona" element={<PortfolioExperience />} />
        <Route path="/projects" element={<PortfolioExperience />} />
        <Route path="/resume" element={<PortfolioExperience />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;