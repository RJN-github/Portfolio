import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  filterProjects,
  splitFeaturedProjects,
  filterSkillsByCategory,
  findProjectsForSkill,
  filterGalleryItems,
  getNextIndex,
  normalizeRoutePath,
  isValidPortfolioRoute,
} from './portfolioLogic';

const sampleProjects = [
  {
    id: 'ratnatray-traders',
    title: 'Ratnatray Traders — Billing & Invoice App',
    subtitle: 'Offline-ready billing',
    description: 'Custom PHP/MySQL invoice system.',
    category: 'business',
    categoryLabel: 'Business & Full-Stack',
    featured: true,
    tech: ['PHP', 'MySQL', 'JavaScript'],
  },
  {
    id: 'axispole-studio',
    title: 'AxisPole Studio — 3D Pole Setup & Spatial CAD',
    subtitle: '3D rig configurator with AR room sync roadmap',
    description: 'Interactive 3D pole configurator.',
    category: 'realtime',
    categoryLabel: 'Real-Time & Spatial',
    featured: true,
    tech: ['React', 'Three.js', 'WebGL'],
  },
  {
    id: 'orion-ipo-tracker',
    title: 'Orion — Family IPO Portfolio Tracker',
    subtitle: 'IPO desk',
    description: 'HEM commission and allotment workspace.',
    category: 'frontend',
    categoryLabel: 'Finance & Utilities',
    featured: false,
    tech: ['React', 'Tailwind CSS'],
  },
];

const sampleSkills = [
  { id: 'react', name: 'React', category: 'frontend', projects: ['axispole-studio', 'orion-ipo-tracker'] },
  { id: 'laravel', name: 'Laravel', category: 'backend', projects: [] },
  { id: 'mysql', name: 'MySQL', category: 'databases', projects: ['ratnatray-traders'] },
];

test('filterProjects filters by category and search query accurately', () => {
  assert.equal(filterProjects(sampleProjects, 'all').length, 3);
  assert.equal(filterProjects(sampleProjects, 'business').length, 1);
  assert.equal(filterProjects(sampleProjects, 'all', 'three.js').length, 1);
  assert.equal(filterProjects(sampleProjects, 'frontend', 'three.js').length, 0);
  assert.equal(filterProjects(sampleProjects, 'all', 'ratnatray')[0].id, 'ratnatray-traders');
});

test('splitFeaturedProjects separates featured vs standard projects', () => {
  const { featured, rest } = splitFeaturedProjects(sampleProjects);
  assert.equal(featured.length, 2);
  assert.equal(rest.length, 1);
  assert.equal(rest[0].id, 'orion-ipo-tracker');
});

test('filterSkillsByCategory returns matching category skills', () => {
  assert.equal(filterSkillsByCategory(sampleSkills, 'all').length, 3);
  assert.equal(filterSkillsByCategory(sampleSkills, 'backend').length, 1);
  assert.equal(filterSkillsByCategory(sampleSkills, 'backend')[0].name, 'Laravel');
});

test('findProjectsForSkill resolves linked projects cleanly', () => {
  const reactProjects = findProjectsForSkill(sampleProjects, sampleSkills[0]);
  assert.equal(reactProjects.length, 2);
  assert.deepEqual(
    reactProjects.map((p) => p.id),
    ['axispole-studio', 'orion-ipo-tracker']
  );
  assert.equal(findProjectsForSkill(sampleProjects, sampleSkills[1]).length, 0);
});

test('filterGalleryItems and getNextIndex wrap cleanly', () => {
  const items = [
    { id: '1', category: 'Live Interfaces' },
    { id: '2', category: 'UI Previews' },
  ];
  assert.equal(filterGalleryItems(items, 'All').length, 2);
  assert.equal(filterGalleryItems(items, 'UI Previews').length, 1);
  assert.equal(getNextIndex(0, 3, -1), 2);
  assert.equal(getNextIndex(2, 3, 1), 0);
});

test('portfolioData includes AxisPole Studio, Orion, 5 Raider photos, Ratnatray part-time role, and excludes NullClass intern & Ratnatray preview', () => {
  const raw = readFileSync(new URL('../data/portfolioData.js', import.meta.url), 'utf8');
  assert.equal(raw.includes("id: 'axispole-studio'"), true);
  assert.equal(raw.includes("id: 'orion-ipo-tracker'"), true);
  assert.equal(raw.includes("id: 'plugsy'"), true);
  assert.equal(raw.includes("id: 'ratnatray-part-time'"), true);
  assert.equal(raw.includes("id: 'nullclass-internship'"), false);
  assert.equal(raw.includes('todo-list-v2'), false);
  assert.equal(raw.includes('orion-checklist'), false);
  assert.equal(raw.includes('blueprint-invoice'), false);
  assert.equal(raw.includes('gal-ratnatray-blueprint'), false);
  assert.equal(raw.includes('supporting: true'), true);
  assert.equal(raw.includes('/assets/aistudio/IMG20260523085337_1c563b32.jpg'), true);
  assert.equal(raw.includes('/assets/aistudio/IMG20260523111607_0e3bcce3.jpg'), true);
  assert.equal(raw.includes('/assets/aistudio/IMG20260524084818_ce810bfa.jpg'), true);
  assert.equal(raw.includes('/assets/aistudio/IMG20260524085319_00efdafd.jpg'), true);
  assert.equal(raw.includes('/assets/aistudio/IMG20260524191945_7574eade.jpg'), true);
});

test('normalizeRoutePath and isValidPortfolioRoute distinguish valid routes from 404 routes', () => {
  assert.equal(normalizeRoutePath('/'), '/');
  assert.equal(normalizeRoutePath('/Projects/'), '/projects');
  assert.equal(isValidPortfolioRoute('/'), true);
  assert.equal(isValidPortfolioRoute('/about/'), true);
  assert.equal(isValidPortfolioRoute('/persona'), true);
  assert.equal(isValidPortfolioRoute('/projects'), true);
  assert.equal(isValidPortfolioRoute('/resume'), true);
  assert.equal(isValidPortfolioRoute('/broken-route'), false);
  assert.equal(isValidPortfolioRoute('/projects/nonexistent'), false);
});
