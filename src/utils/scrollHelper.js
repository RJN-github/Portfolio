let lenisInstance = null;

export function setLenisInstance(instance) {
  lenisInstance = instance;
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function scrollToSection(id, offset = -64) {
  const target = id === 'top' || id === 'hero' ? 0 : document.getElementById(id);
  const reduced = prefersReducedMotion();

  if (lenisInstance && !reduced) {
    lenisInstance.scrollTo(target ?? 0, {
      offset: target === 0 ? 0 : offset,
      duration: 1.15,
    });
    return;
  }

  if (target === 0) {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    return;
  }

  if (target && typeof target.scrollIntoView === 'function') {
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }
}
