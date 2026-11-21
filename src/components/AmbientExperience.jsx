import React, { useEffect, useRef, useState } from 'react';

const AmbientExperience = () => {
  const progressRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorRef = useRef(null);
  const [cursorLabel, setCursorLabel] = useState('');
  const [pointerActive, setPointerActive] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      if (!progressRef.current) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      progressRef.current.style.transform = `scaleX(${ratio})`;
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;

    const handleMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!pointerActive) setPointerActive(true);

      const interactiveEl = e.target instanceof Element ? e.target.closest('[data-cursor]') : null;
      const nextLabel = interactiveEl ? interactiveEl.getAttribute('data-cursor') || '' : '';
      setCursorLabel((prev) => (prev === nextLabel ? prev : nextLabel));

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${targetX - 320}px, ${targetY - 320}px, 0)`;
      }
    };

    const handleLeave = () => setPointerActive(false);

    const animateCursor = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    rafId = requestAnimationFrame(animateCursor);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [pointerActive]);

  return (
    <>
      {/* Top Scroll Progress Hairline */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-white/5"
      >
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-gradient-to-r from-[#E11D48] via-[#FB7185] to-[#FAFAF9] will-change-transform"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Desktop Pointer-Reactive Ambient Radial Spotlight */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="hidden md:block fixed top-0 left-0 w-[640px] h-[640px] rounded-full pointer-events-none z-0 transition-opacity duration-300"
        style={{
          opacity: pointerActive ? 1 : 0,
          background:
            'radial-gradient(circle, rgba(225, 29, 72, 0.08) 0%, rgba(225, 29, 72, 0.02) 38%, transparent 70%)',
        }}
      />

      {/* Desktop Contextual Cursor Ring */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="hidden lg:flex fixed top-0 left-0 pointer-events-none z-[70] -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-opacity duration-200"
        style={{ opacity: pointerActive ? 1 : 0 }}
      >
        <div
          className={`flex items-center justify-center rounded-full border transition-all duration-150 ${
            cursorLabel
              ? 'px-3 py-1 bg-[#09090B]/90 border-[#E11D48] text-[11px] font-mono tracking-wide text-white shadow-lg'
              : 'w-5 h-5 border-white/35 bg-transparent'
          }`}
        >
          {cursorLabel || null}
        </div>
      </div>
    </>
  );
};

export default AmbientExperience;
