import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, RotateCcw } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

// 5x7 dot-matrix glyphs for "4", "0", "4" rendered cleanly on the interactive canvas
const DIGIT_4 = [
  '10010',
  '10010',
  '10010',
  '11111',
  '00010',
  '00010',
  '00010',
];

const DIGIT_0 = [
  '01110',
  '10001',
  '10011',
  '10101',
  '11001',
  '10001',
  '01110',
];

const GLYPHS = [DIGIT_4, DIGIT_0, DIGIT_4];

const INTERACTION_MODES = [
  { id: 'align', label: 'Align 404' },
  { id: 'scatter', label: 'Drift' },
  { id: 'ripple', label: 'Signal Pulse' },
];

const QUICK_ROUTES = [
  { to: '/', label: 'Portfolio Home', note: 'Main showcase & 3D core' },
  { to: '/projects', label: 'Selected Works', note: 'Case studies & live builds' },
  { to: '/about', label: 'About & Stack', note: 'Narrative, MERN & Next.js' },
  { to: '/resume', label: 'Resume', note: 'Preview & PDF download' },
];

function buildGridNodes(width, height) {
  const cols = width < 440 ? 22 : 28;
  const rows = width < 440 ? 13 : 15;
  const padX = width * 0.08;
  const padY = height * 0.14;
  const usableW = Math.max(120, width - padX * 2);
  const usableH = Math.max(100, height - padY * 2);

  // Compute target 404 glyph cells centered in the grid
  const glyphCols = 5;
  const glyphRows = 7;
  const gapCols = 2;
  const totalGlyphW = GLYPHS.length * glyphCols + (GLYPHS.length - 1) * gapCols; // 19 cols
  const startCol = Math.floor((cols - totalGlyphW) / 2);
  const startRow = Math.floor((rows - glyphRows) / 2);

  const glyphSet = new Set();
  GLYPHS.forEach((glyph, gIndex) => {
    const offsetC = startCol + gIndex * (glyphCols + gapCols);
    for (let r = 0; r < glyphRows; r += 1) {
      for (let c = 0; c < glyphCols; c += 1) {
        if (glyph[r][c] === '1') {
          glyphSet.add(`${startRow + r}:${offsetC + c}`);
        }
      }
    }
  });

  const nodes = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const gx = padX + (c / Math.max(1, cols - 1)) * usableW;
      const gy = padY + (r / Math.max(1, rows - 1)) * usableH;
      const isGlyph = glyphSet.has(`${r}:${c}`);

      // Deterministic scatter coordinates so layout starts sharp and avoids randomness flicker
      const seed = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453;
      const fracA = seed - Math.floor(seed);
      const seedB = Math.sin(r * 39.346 + c * 11.135) * 24634.6345;
      const fracB = seedB - Math.floor(seedB);

      nodes.push({
        baseX: gx,
        baseY: gy,
        x: gx,
        y: gy,
        vx: (fracA - 0.5) * 0.45,
        vy: (fracB - 0.5) * 0.45,
        driftX: padX + fracA * usableW,
        driftY: padY + fracB * usableH,
        isGlyph,
        phase: (r * 0.45 + c * 0.3) % (Math.PI * 2),
      });
    }
  }
  return nodes;
}

const NotFoundPage = () => {
  const location = useLocation();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const pointerRef = useRef({ active: false, x: 0, y: 0 });
  const ripplesRef = useRef([]);
  const modeRef = useRef('align');

  const [mode, setMode] = useState('align');
  const [coords, setCoords] = useState({ x: 404, y: 0 });
  const [pulseCount, setPulseCount] = useState(0);
  const [resetTick, setResetTick] = useState(0);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedMotionQuery.matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes = [];
    let rafId = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(280, Math.floor(rect.width));
      height = Math.max(240, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = buildGridNodes(width, height);
    };

    resize();

    const drawFrame = (timeMs) => {
      const t = timeMs * 0.001;
      const currentMode = modeRef.current;
      const pointer = pointerRef.current;

      ctx.clearRect(0, 0, width, height);

      // Clean architectural coordinate crosshairs at card center
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width / 2, 16);
      ctx.lineTo(width / 2, height - 16);
      ctx.moveTo(16, height / 2);
      ctx.lineTo(width - 16, height / 2);
      ctx.stroke();

      // Advance & draw active tap ripples
      const nextRipples = [];
      for (const rip of ripplesRef.current) {
        const age = (timeMs - rip.born) / 1000;
        if (age < 1.15) {
          nextRipples.push(rip);
          const radius = age * 210;
          const alpha = Math.max(0, (1 - age / 1.15) * 0.6);
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(225, 29, 72, ${alpha})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      }
      ripplesRef.current = nextRipples;

      // Subtle hairline edges connecting nearby glyph vertices when aligned
      if (currentMode !== 'scatter') {
        ctx.strokeStyle = 'rgba(225, 29, 72, 0.14)';
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i += 1) {
          const a = nodes[i];
          if (!a.isGlyph) continue;
          for (let j = i + 1; j < nodes.length; j += 1) {
            const b = nodes[j];
            if (!b.isGlyph) continue;
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 1150) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // Physics update + point render
      for (const node of nodes) {
        let targetX = node.baseX;
        let targetY = node.baseY;

        if (currentMode === 'scatter' && !reducedMotion) {
          targetX = node.driftX + Math.sin(t * 0.9 + node.phase) * 14;
          targetY = node.driftY + Math.cos(t * 0.8 + node.phase) * 12;
        } else if (currentMode === 'ripple' && !reducedMotion) {
          const centerDist = Math.hypot(node.baseX - width / 2, node.baseY - height / 2);
          const wave = Math.sin(centerDist * 0.045 - t * 3.2);
          targetX = node.baseX + wave * (node.isGlyph ? 2.5 : 5.5);
          targetY = node.baseY + Math.cos(centerDist * 0.04 - t * 2.8) * (node.isGlyph ? 2.5 : 5.5);
        }

        // Pointer magnetic deflection
        if (pointer.active && !reducedMotion) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          const radius = 92;
          if (dist > 0.5 && dist < radius) {
            const strength = (1 - dist / radius) * (node.isGlyph ? 18 : 26);
            targetX += (dx / dist) * strength;
            targetY += (dy / dist) * strength;
          }
        }

        // Tap ripple impulse
        if (!reducedMotion) {
          for (const rip of ripplesRef.current) {
            const age = (timeMs - rip.born) / 1000;
            const ringR = age * 210;
            const dx = node.x - rip.x;
            const dy = node.y - rip.y;
            const dist = Math.hypot(dx, dy);
            const band = Math.abs(dist - ringR);
            if (dist > 0.5 && band < 32) {
              const push = (1 - band / 32) * 14 * (1 - age / 1.15);
              targetX += (dx / dist) * push;
              targetY += (dy / dist) * push;
            }
          }
        }

        node.x += (targetX - node.x) * (reducedMotion ? 1 : 0.16);
        node.y += (targetY - node.y) * (reducedMotion ? 1 : 0.16);

        let highlight = 0;
        if (pointer.active) {
          const pDist = Math.hypot(node.x - pointer.x, node.y - pointer.y);
          if (pDist < 88) {
            highlight = 1 - pDist / 88;
          }
        }

        if (node.isGlyph) {
          const r = 2.6 + highlight * 1.6;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fillStyle = highlight > 0.25 ? '#FB7185' : '#E11D48';
          ctx.fill();
        } else {
          const r = 1.15 + highlight * 1.25;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fillStyle =
            highlight > 0.2
              ? `rgba(250, 250, 249, ${0.28 + highlight * 0.55})`
              : 'rgba(161, 161, 170, 0.24)';
          ctx.fill();
        }
      }

      if (!reducedMotion) {
        rafId = requestAnimationFrame(drawFrame);
      }
    };

    const startLoop = () => {
      if (rafId) cancelAnimationFrame(rafId);
      drawFrame(performance.now());
    };

    startLoop();

    const onMotionChange = () => {
      reducedMotion = reducedMotionQuery.matches;
      startLoop();
    };
    const ro = new ResizeObserver(() => {
      resize();
      if (reducedMotion) drawFrame(performance.now());
    });
    ro.observe(container);
    reducedMotionQuery.addEventListener('change', onMotionChange);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      reducedMotionQuery.removeEventListener('change', onMotionChange);
    };
  }, [resetTick]);

  const handlePointerMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pointerRef.current = { active: true, x, y };
    setCoords({
      x: Math.round((x / Math.max(1, rect.width)) * 100),
      y: Math.round((y / Math.max(1, rect.height)) * 100),
    });
  };

  const handlePointerLeave = () => {
    pointerRef.current = { active: false, x: 0, y: 0 };
  };

  const handlePointerDown = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pointerRef.current = { active: true, x, y };
    ripplesRef.current.push({ x, y, born: performance.now() });
    setPulseCount((prev) => prev + 1);
    setCoords({
      x: Math.round((x / Math.max(1, rect.width)) * 100),
      y: Math.round((y / Math.max(1, rect.height)) * 100),
    });
  };

  const handleReset = () => {
    ripplesRef.current = [];
    setMode('align');
    setPulseCount(0);
    setCoords({ x: 50, y: 50 });
    setResetTick((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAF9] bg-architectural-grid">
      {/* Clean 3-zone Brand Header */}
      <header className="border-b border-white/10 bg-[#09090B]/92 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <Link
            to="/"
            className="font-display text-lg font-bold tracking-tight text-[#FAFAF9] hover:text-[#FB7185] transition-colors whitespace-nowrap shrink-0"
          >
            {PROFILE.name}
          </Link>

          <nav aria-label="Fallback navigation" className="hidden md:flex items-center gap-7">
            <Link
              to="/about"
              className="text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAF9] transition-colors whitespace-nowrap shrink-0"
            >
              About
            </Link>
            <Link
              to="/persona"
              className="text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAF9] transition-colors whitespace-nowrap shrink-0"
            >
              Mindset
            </Link>
            <Link
              to="/projects"
              className="text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAF9] transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </Link>
            <Link
              to="/resume"
              className="text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAF9] transition-colors whitespace-nowrap shrink-0"
            >
              Resume
            </Link>
          </nav>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#FAFAF9] bg-[#E11D48] hover:bg-[#BE123C] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Split-Column 404 Experience */}
      <main className="flex-1 flex items-center py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Clear Typography, Broken Route Readout & Primary CTA */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#FB7185] tracking-wider">
                  <span>HTTP 404</span>
                  <span aria-hidden="true" className="text-[#71717A]">
                    ·
                  </span>
                  <span className="text-[#A1A1AA]">Route Not Found</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06] text-[#FAFAF9]">
                  That path wandered{' '}
                  <span className="text-[#E11D48]">off the grid.</span>
                </h1>

                <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-xl">
                  The requested route{' '}
                  <code className="text-sm font-mono text-[#FAFAF9] bg-[#111115] border border-white/10 px-2 py-0.5 rounded">
                    {location.pathname || '/'}
                  </code>{' '}
                  does not point to an active portfolio page. Use the interactive matrix beside
                  this panel, or head directly back to the main showcase.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    to="/"
                    data-testid="back-to-home-cta"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#E11D48] hover:bg-[#BE123C] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    <span>Back to Home</span>
                  </Link>

                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#FAFAF9] bg-[#111115] border border-white/15 hover:border-white/30 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>Explore Projects</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Clean Hairline-Divided Route Directory */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-xs font-mono text-[#71717A] mb-3">Available Destinations</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {QUICK_ROUTES.map((route) => (
                    <Link
                      key={route.to}
                      to={route.to}
                      className="group flex items-center justify-between gap-3 p-3 rounded-xl border border-white/10 bg-[#111115]/70 hover:border-[#E11D48]/50 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#FAFAF9] group-hover:text-[#FB7185] transition-colors">
                          {route.label}
                        </p>
                        <p className="text-xs text-[#71717A] truncate">{route.note}</p>
                      </div>
                      <ArrowUpRight
                        className="w-4 h-4 text-[#71717A] group-hover:text-[#FB7185] shrink-0 transition-colors"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Coordinate Matrix & 404 Point Sculpture */}
            <div className="lg:col-span-6 flex flex-col rounded-2xl border border-white/10 bg-[#111115] overflow-hidden">
              <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs font-mono text-[#A1A1AA]">
                  Interactive 404 Matrix · Move cursor or tap to pulse
                </div>
                <div className="text-xs font-mono text-[#71717A] tabular-nums">
                  X:{String(coords.x).padStart(2, '0')} Y:{String(coords.y).padStart(2, '0')} ·{' '}
                  {pulseCount} {pulseCount === 1 ? 'pulse' : 'pulses'}
                </div>
              </div>

              <div
                ref={containerRef}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onPointerDown={handlePointerDown}
                className="relative flex-1 min-h-[280px] sm:min-h-[340px] cursor-crosshair select-none touch-none"
              >
                <canvas
                  ref={canvasRef}
                  data-testid="not-found-canvas"
                  aria-label="Interactive 404 dot-matrix field — move cursor or click to emit signal ripples"
                  className="block w-full h-full"
                />
              </div>

              <div className="px-4 sm:px-5 py-3 border-t border-white/10 bg-[#0B0B0F] flex flex-wrap items-center justify-between gap-3">
                <div
                  role="tablist"
                  aria-label="404 matrix formation mode"
                  className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-[#111115] border border-white/10 flex-1 sm:flex-none"
                >
                  {INTERACTION_MODES.map((item) => {
                    const active = mode === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setMode(item.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                          active
                            ? 'bg-[#E11D48] text-white'
                            : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#A1A1AA] hover:text-white border border-white/10 hover:border-white/25 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Quiet Minimal Footer */}
      <footer className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#71717A]">
          <p>{PROFILE.name} · Sangli, Maharashtra, India</p>
          <p className="font-mono tabular-nums">Status 404 · Broken Route Fallback</p>
        </div>
      </footer>
    </div>
  );
};

export default NotFoundPage;
