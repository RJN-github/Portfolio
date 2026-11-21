/**
 * Pure filtering, search, and lookup helpers for the portfolio.
 * Kept framework-agnostic so they can be unit tested directly via node:test.
 */

export function filterProjects(projects, categoryId = 'all', query = '') {
  const normalizedQuery = String(query || '').trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory = categoryId === 'all' || project.category === categoryId;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const haystack = [
      project.title,
      project.subtitle,
      project.description,
      project.categoryLabel,
      ...(project.tech || []),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function splitFeaturedProjects(projects) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return { featured, rest };
}

export function filterSkillsByCategory(skills, categoryId = 'all') {
  if (categoryId === 'all') return skills;
  return skills.filter((skill) => skill.category === categoryId);
}

export function findProjectsForSkill(projects, skill) {
  if (!skill || !Array.isArray(skill.projects)) return [];
  const projectMap = new Map(projects.map((p) => [p.id, p]));
  return skill.projects.map((id) => projectMap.get(id)).filter(Boolean);
}

export function filterGalleryItems(items, category = 'All') {
  if (!category || category === 'All') return items;
  return items.filter((item) => item.category === category);
}

export function getNextIndex(currentIndex, total, direction = 1) {
  if (total <= 0) return 0;
  return (currentIndex + direction + total) % total;
}

export const VALID_PORTFOLIO_ROUTES = ['/', '/index.html', '/about', '/persona', '/projects', '/resume'];

export function normalizeRoutePath(pathname) {
  if (!pathname || typeof pathname !== 'string') return '/';
  const cleaned = pathname.trim().toLowerCase().replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned;
}

export function isValidPortfolioRoute(pathname) {
  const normalized = normalizeRoutePath(pathname);
  return VALID_PORTFOLIO_ROUTES.includes(normalized);
}
