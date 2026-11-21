import React, { useEffect, useState } from 'react';
import { Download, Maximize2, Minimize2, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const ResumeModal = ({ open, onClose }) => {
  const [fitToViewport, setFitToViewport] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      data-lenis-prevent
      className="fixed inset-0 z-[85] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-white/15 bg-[#111115] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-white/10">
          <div className="min-w-0">
            <p className="text-xs font-mono text-[#FB7185]">Curriculum Vitae</p>
            <h2 id="resume-modal-title" className="font-display text-base sm:text-lg font-bold text-[#FAFAF9]">
              {PROFILE.name} — Resume
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setFitToViewport((prev) => !prev)}
              aria-pressed={fitToViewport}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 bg-[#18181D] text-xs font-medium text-[#A1A1AA] hover:text-white hover:border-white/30 transition-colors whitespace-nowrap cursor-pointer"
            >
              {fitToViewport ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Readable Width</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Fit Full Page</span>
                </>
              )}
            </button>

            <a
              href={PROFILE.resume.pdfPath}
              download={PROFILE.resume.downloadFilename}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download PDF</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              className="w-9 h-9 rounded-lg border border-white/15 bg-[#18181D] text-[#FAFAF9] hover:border-white/35 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Block container (never direct flex child) prevents CSS flex align-stretch from squashing portrait A4 ratio */}
        <div
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 bg-[#09090B]"
        >
          <div className={fitToViewport ? 'mx-auto w-fit max-w-full' : 'mx-auto w-full max-w-[700px]'}>
            <img
              src={PROFILE.resume.previewImage}
              alt="Rishikesh Natu Resume"
              referrerPolicy="no-referrer"
              className={
                fitToViewport
                  ? 'block mx-auto max-h-[74vh] w-auto max-w-full h-auto rounded-lg border border-white/10 shadow-lg bg-white'
                  : 'block w-full h-auto rounded-lg border border-white/10 shadow-lg bg-white'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
