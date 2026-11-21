import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_ITEMS, PROJECTS } from '../data/portfolioData';
import { filterGalleryItems, getNextIndex } from '../utils/portfolioLogic';
import ProjectBlueprintPreview from './ProjectBlueprintPreview';

const GALLERY_CATEGORIES = ['All', 'Live Interfaces', 'Biometrics & Systems'];

const GallerySection = ({ onSelectProject }) => {
  const [category, setCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visibleItems = useMemo(() => filterGalleryItems(GALLERY_ITEMS, category), [category]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => getNextIndex(prev ?? 0, visibleItems.length, 1));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => getNextIndex(prev ?? 0, visibleItems.length, -1));
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, visibleItems.length]);

  const activeLightboxItem = lightboxIndex !== null ? visibleItems[lightboxIndex] : null;
  const linkedProject = activeLightboxItem
    ? PROJECTS.find((p) => p.id === activeLightboxItem.projectId)
    : null;

  return (
    <section id="gallery" className="py-20 sm:py-28 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#FB7185] tracking-wider mb-3">
              06. Visual Archive
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAF9]">
              Interface snapshots &amp; system studies.
            </h2>
            <p className="mt-4 text-[#A1A1AA] text-base leading-relaxed">
              Genuine screenshots captured from live deployments and local biometric systems.
            </p>
          </div>

          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#111115] border border-white/10"
            role="tablist"
            aria-label="Gallery categories"
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setCategory(cat);
                    setLightboxIndex(null);
                  }}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#E11D48] text-white'
                      : 'text-[#A1A1AA] hover:text-[#FAFAF9] hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {visibleItems.map((item, idx) => {
            const isWide = item.aspect === 'wide';
            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl border border-white/10 bg-[#111115] overflow-hidden ${
                  isWide ? 'md:col-span-7' : 'md:col-span-5'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  data-cursor="Lightbox"
                  aria-label={`Inspect ${item.title} in lightbox`}
                  className="block w-full h-72 sm:h-80 text-left relative overflow-hidden cursor-pointer"
                >
                  {item.src ? (
                    <div
                      className={`w-full h-full ${
                        item.fit === 'contain' ? 'bg-[#060908] p-3 flex items-center justify-center' : ''
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
                          item.fit === 'contain' ? 'object-contain' : 'object-cover object-top'
                        }`}
                      />
                    </div>
                  ) : (
                    <ProjectBlueprintPreview type={item.previewType} />
                  )}

                  {/* Measured Contrast Scrim Overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"
                  />

                  <div className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-[#09090B]/85 border border-white/15 flex items-center justify-center text-[#FAFAF9] opacity-80 group-hover:opacity-100 transition-opacity">
                    <Expand className="w-4 h-4" aria-hidden="true" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <p className="text-[11px] font-mono text-[#FB7185]">
                      {item.kind} · {item.category}
                    </p>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D4D4D8] mt-1 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          data-lenis-prevent
          className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            data-lenis-prevent
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-white/15 bg-[#111115] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
              <div className="min-w-0">
                <p className="text-xs font-mono text-[#FB7185]">{activeLightboxItem.kind}</p>
                <h3
                  id="lightbox-title"
                  className="font-display text-lg sm:text-xl font-bold text-white truncate"
                >
                  {activeLightboxItem.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) => getNextIndex(prev ?? 0, visibleItems.length, -1))
                  }
                  aria-label="Previous gallery item"
                  className="w-9 h-9 rounded-lg border border-white/15 bg-[#18181D] text-white hover:border-white/35 flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) => getNextIndex(prev ?? 0, visibleItems.length, 1))
                  }
                  aria-label="Next gallery item"
                  className="w-9 h-9 rounded-lg border border-white/15 bg-[#18181D] text-white hover:border-white/35 flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close lightbox"
                  className="w-9 h-9 rounded-lg border border-white/15 bg-[#18181D] text-white hover:border-white/35 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-[#09090B] max-h-[68vh] overflow-hidden flex items-center justify-center">
              {activeLightboxItem.src ? (
                <img
                  src={activeLightboxItem.src}
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[68vh] object-contain"
                />
              ) : (
                <div className="w-full max-w-2xl p-6">
                  <ProjectBlueprintPreview type={activeLightboxItem.previewType} />
                </div>
              )}
            </div>

            <div className="px-5 py-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-[#A1A1AA]">{activeLightboxItem.caption}</p>
              {linkedProject && (
                <button
                  type="button"
                  onClick={() => {
                    setLightboxIndex(null);
                    onSelectProject(linkedProject);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Open Project Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
