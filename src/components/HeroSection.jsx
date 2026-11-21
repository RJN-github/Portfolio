import React from 'react';
import { ArrowDownRight, ArrowUpRight, FileText } from 'lucide-react';
import HeroSculpture3D from './HeroSculpture3D';
import TechMarqueeDivider from './TechMarqueeDivider';
import { PROFILE } from '../data/portfolioData';
import { scrollToSection } from '../utils/scrollHelper';

const HeroSection = ({ onOpenResume }) => {
  return (
    <section id="hero" className="relative pt-20 sm:pt-28 lg:pt-32 bg-architectural-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Typographic Composition */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <p className="text-sm font-medium text-[#FB7185] tracking-wide mb-5">
                {PROFILE.role} · {PROFILE.organization} · {PROFILE.location}
              </p>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-[#FAFAF9] max-w-2xl">
                Engineering digital products that{' '}
                <span className="text-[#E11D48]">refuse</span> to be ordinary.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-[#A1A1AA] max-w-xl leading-relaxed">
                I&apos;m <strong className="text-[#FAFAF9] font-semibold">Rishikesh Natu</strong>—building
                practical business systems, real-time multiplayer interfaces, and full-stack web
                applications with the MERN stack, React, Next.js, WordPress, and MySQL—alongside
                supporting work in Astro, Laravel + Filament, Blade, and Agentic AI workflows.
              </p>

              {/* Primary CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  data-cursor="Explore"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Explore My Work</span>
                  <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 bg-[#111115] hover:border-white/40 text-[#FAFAF9] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowUpRight className="w-4 h-4 text-[#A1A1AA]" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAF9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>View Resume</span>
                </button>
              </div>
            </div>

            {/* Bottom Identity Strip */}
            <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-[#71717A] font-mono">Current Position</p>
                <p className="text-sm font-semibold text-[#FAFAF9] mt-1">{PROFILE.role}</p>
                <p className="text-xs text-[#A1A1AA]">{PROFILE.organization}</p>
              </div>
              <div>
                <p className="text-xs text-[#71717A] font-mono">Core Stack</p>
                <p className="text-sm font-semibold text-[#FAFAF9] mt-1">
                  MERN · React · Next.js
                </p>
                <p className="text-xs text-[#A1A1AA]">
                  WordPress · MySQL · Astro · Laravel (Filament / Blade)
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs text-[#71717A] font-mono">Education</p>
                <p className="text-sm font-semibold text-[#FAFAF9] mt-1">BCA · VPIMSR</p>
                <p className="text-xs text-[#A1A1AA]">Shivaji University · 2026</p>
              </div>
            </div>
          </div>

          {/* Right Interactive 3D Viewport */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <HeroSculpture3D />
          </div>
        </div>
      </div>

      {/* Dedicated Tech Marquee Section Divider */}
      <TechMarqueeDivider variant="stack" />
    </section>
  );
};

export default HeroSection;
