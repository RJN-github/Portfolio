import React, { useState } from 'react';
import { ArrowUp, ArrowUpRight, Check, Command, Copy, Download, Mail, Phone } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { scrollToSection } from '../utils/scrollHelper';

const ContactFooter = ({ onOpenResume, onOpenPalette }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const scrollToTop = () => {
    scrollToSection('top');
  };

  return (
    <footer id="contact" className="pt-20 sm:pt-28 pb-12 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Oversized Editorial Closing Composition */}
        <div className="pb-16 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="text-xs font-mono text-[#FB7185] tracking-wider mb-4">08. Next Chapter</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAFAF9] leading-[1.05]">
              Let&apos;s build something memorable.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#A1A1AA] max-w-2xl leading-relaxed">
              Open to impactful web engineering collaborations, product builds, and conversations
              around full-stack architecture and modern AI-assisted development.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Send an Email</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-white/20 bg-[#111115] hover:border-white/40 text-sm font-mono text-[#FAFAF9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#FB7185]" aria-hidden="true" />
                    <span>Copied {PROFILE.email}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#A1A1AA]" aria-hidden="true" />
                    <span>{PROFILE.email}</span>
                  </>
                )}
              </button>

              <a
                href={PROFILE.resume.pdfPath}
                download={PROFILE.resume.downloadFilename}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-white/10 hover:border-white/30 text-sm font-medium text-[#D4D4D8] hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-5 p-6 rounded-2xl border border-white/10 bg-[#111115]">
            <div>
              <p className="text-xs font-mono text-[#71717A]">Direct Contact</p>
              <a
                href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                className="mt-1.5 inline-flex items-center gap-2 text-sm font-medium text-[#FAFAF9] hover:text-[#FB7185] transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#E11D48]" aria-hidden="true" />
                <span>{PROFILE.phone}</span>
              </a>
              <p className="text-xs text-[#A1A1AA] mt-1">{PROFILE.location}</p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-mono text-[#71717A] mb-2.5">Verified Profiles</p>
              <div className="space-y-2">
                {PROFILE.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-sm text-[#D4D4D8] hover:text-[#FB7185] transition-colors"
                  >
                    <span>
                      {social.name}{' '}
                      <span className="text-xs font-mono text-[#71717A]">· {social.handle}</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Editorial Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>
            Designed &amp; engineered by <span className="text-[#FAFAF9]">{PROFILE.name}</span> ·{' '}
            {PROFILE.role} at {PROFILE.organization}
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenResume}
              className="hover:text-[#FAFAF9] transition-colors cursor-pointer"
            >
              Resume
            </button>

            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Open quick navigation command palette"
              className="inline-flex items-center gap-1.5 font-mono hover:text-[#FAFAF9] transition-colors cursor-pointer"
            >
              <Command className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Ctrl/⌘K</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 text-[#FAFAF9] hover:border-white/35 transition-colors cursor-pointer"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
