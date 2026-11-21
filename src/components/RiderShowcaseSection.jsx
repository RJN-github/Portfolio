import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { RIDER_GALLERY } from '../data/portfolioData';
import { getNextIndex } from '../utils/portfolioLogic';

const LENS_MODES = [
  { id: 'clear-visor', label: 'Sharp Visor' },
  { id: 'fluid-glass', label: 'Fluid Glass' },
  { id: 'zoom-blur', label: 'Zoom Blur' },
];

const RiderShowcaseSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lensMode, setLensMode] = useState('clear-visor');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activePhoto = RIDER_GALLERY[activeIndex] || RIDER_GALLERY[0];

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => getNextIndex(prev, RIDER_GALLERY.length, 1));
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => getNextIndex(prev, RIDER_GALLERY.length, -1));
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  const handlePrev = () => {
    setActiveIndex((prev) => getNextIndex(prev, RIDER_GALLERY.length, -1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => getNextIndex(prev, RIDER_GALLERY.length, 1));
  };

  const lensImageClass =
    lensMode === 'zoom-blur'
      ? 'blur-[3px] scale-[1.05] group-hover:blur-0 group-hover:scale-100'
      : lensMode === 'fluid-glass'
        ? 'scale-[1.02] group-hover:scale-100 brightness-95 group-hover:brightness-100'
        : 'scale-100 blur-0';

  return (
    <section
      id="beyond-code"
      className="relative py-16 sm:py-24 border-b border-white/10 overflow-hidden bg-[#09090B]"
    >
      {/* Subtle Static Ambient Backdrop Bleed */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={activePhoto.src}
          alt=""
          className="w-full h-full object-cover opacity-15 blur-3xl scale-110 transition-opacity duration-500"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(640px circle at 60% 40%, rgba(225, 29, 72, 0.12), rgba(15, 15, 20, 0.55) 48%, rgba(9, 9, 11, 0.96) 80%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-transparent to-[#09090B]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Responsive Lens Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#FB7185] tracking-wider mb-3">
              07. Two Wheels &amp; Visor
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAF9]">
              TVS Raider 125 — Ghats, Coast &amp; Dusk Runs.
            </h2>
            <p className="mt-4 text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
              Off the keyboard—riding jacket, Vega visor, and coastal tarmac on my TVS Raider 125.
              Cycle through all five rides or toggle visor lens modes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
            <span
              data-testid="rider-slide-counter"
              className="self-start sm:self-auto text-xs font-mono text-[#A1A1AA] tabular-nums px-3 py-2 rounded-xl bg-[#111115]/80 border border-white/10"
            >
              {activePhoto.index} / 0{RIDER_GALLERY.length}
            </span>

            <div
              className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#111115]/80 backdrop-blur-md border border-white/10 w-full sm:w-auto"
              role="tablist"
              aria-label="Rider showcase glass lens effect"
            >
              {LENS_MODES.map((item) => {
                const active = lensMode === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setLensMode(item.id)}
                    className={`px-2.5 sm:px-3 py-2 text-xs font-medium rounded-lg transition-colors text-center truncate cursor-pointer ${
                      active
                        ? 'bg-[#E11D48] text-white'
                        : 'text-[#A1A1AA] hover:text-[#FAFAF9] hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Single Unified Responsive Slider (Zero Bottom Thumbnail Cards) */}
        <div
          className="group relative rounded-2xl border border-white/15 bg-[#0D0D12] overflow-hidden shadow-2xl"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
          }}
        >
          <div className="relative aspect-[4/3] sm:aspect-[16/9] max-h-[560px] w-full overflow-hidden bg-[#09090B]">
            <img
              key={activePhoto.id}
              src={activePhoto.src}
              alt={`${activePhoto.title} — ${activePhoto.kicker}`}
              style={{ objectPosition: activePhoto.objectPosition || '50% 50%' }}
              className={`w-full h-full object-cover transition-all duration-500 ease-out ${lensImageClass}`}
            />

            {/* Optional Fluid Glass Overlay Layer */}
            {lensMode === 'fluid-glass' && (
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-white/[0.06] via-transparent to-[#E11D48]/10 backdrop-blur-[1.5px] group-hover:backdrop-blur-0 transition-all duration-500 pointer-events-none"
              />
            )}

            {/* Subtle Top Gradient for Legibility */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 to-transparent pointer-events-none"
            />

            {/* Top Overlay Strip */}
            <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-10 flex items-center justify-between gap-2">
              <span className="px-2.5 py-1.5 rounded-lg border border-white/15 bg-[#09090B]/75 backdrop-blur-md text-[11px] sm:text-xs font-mono text-[#FB7185] truncate">
                {activePhoto.index} · {activePhoto.kicker}
              </span>

              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label={`Inspect ${activePhoto.title} fullscreen`}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/20 bg-[#09090B]/75 backdrop-blur-md hover:border-[#E11D48] text-[11px] sm:text-xs font-medium text-[#FAFAF9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Expand className="w-3.5 h-3.5 text-[#FB7185]" aria-hidden="true" />
                <span>Fullscreen</span>
              </button>
            </div>

            {/* Desktop Previous / Next Edge Navigation */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous ride photo"
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-xl border border-white/20 bg-[#09090B]/75 backdrop-blur-md text-white hover:border-[#E11D48] hover:bg-[#111115] items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next ride photo"
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-xl border border-white/20 bg-[#09090B]/75 backdrop-blur-md text-white hover:border-[#E11D48] hover:bg-[#111115] items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Caption + Responsive Slide Controls Bar */}
          <div className="px-4 py-4 sm:px-6 sm:py-5 border-t border-white/10 bg-[#111115]/95 backdrop-blur-xl flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h3
                  data-testid="rider-active-title"
                  className="font-display text-base sm:text-xl font-bold text-[#FAFAF9]"
                >
                  {activePhoto.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-3xl">
                  {activePhoto.caption}
                </p>
              </div>

              {/* Clean Responsive Stepper + Direct Slide Numbers (No Bottom Cards) */}
              <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous ride photo"
                  className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 bg-[#09090B] text-white hover:border-[#E11D48] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>

                <div
                  className="grid grid-cols-5 gap-1.5"
                  role="tablist"
                  aria-label="Select ride photo slide"
                >
                  {RIDER_GALLERY.map((photo, idx) => {
                    const active = idx === activeIndex;
                    return (
                      <button
                        key={photo.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        aria-label={`View ride photo ${photo.index}: ${photo.title}`}
                        onClick={() => setActiveIndex(idx)}
                        className={`px-2.5 py-2 sm:py-1.5 rounded-lg text-xs font-mono tabular-nums transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#E11D48] text-white font-semibold'
                            : 'bg-[#09090B] border border-white/10 text-[#A1A1AA] hover:text-white hover:border-white/30'
                        }`}
                      >
                        {photo.index}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next ride photo"
                  className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 bg-[#09090B] text-white hover:border-[#E11D48] cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Bike Photo Lightbox */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="rider-lightbox-title"
          data-lenis-prevent
          className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-8 bg-black/92 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            data-lenis-prevent
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-white/15 bg-[#111115] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shrink-0 flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
              <div className="min-w-0">
                <p className="text-xs font-mono text-[#FB7185]">
                  {activePhoto.index} / 0{RIDER_GALLERY.length} · {activePhoto.kicker}
                </p>
                <h3
                  id="rider-lightbox-title"
                  className="font-display text-lg sm:text-xl font-bold text-white truncate"
                >
                  {activePhoto.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous ride photo in lightbox"
                  className="w-9 h-9 rounded-lg border border-white/15 bg-[#18181D] text-white hover:border-white/35 flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next ride photo in lightbox"
                  className="w-9 h-9 rounded-lg border border-white/15 bg-[#18181D] text-white hover:border-white/35 flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close rider photo lightbox"
                  className="w-9 h-9 rounded-lg border border-white/15 bg-[#18181D] text-white hover:border-white/35 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 bg-[#09090B] flex items-center justify-center overflow-hidden p-2">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="w-full max-h-[68vh] object-contain"
              />
            </div>

            <div className="shrink-0 px-5 py-4 border-t border-white/10">
              <p className="text-sm text-[#A1A1AA]">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RiderShowcaseSection;
