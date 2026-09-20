#!/usr/bin/env node
/**
 * المنحل — setup.js (نسخة عربية كاملة)
 * موقع ثابت لمنظمة Resala STEM Sub Branches — Season 7
 * استضافة: GitHub Pages فقط
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const files = {};
const file = (p, c) => {
  files[p] = c;
};

/* ==================================================================
 * 1. الإعدادات الجذرية
 * ================================================================== */

file(
  "package.json",
  `
{
  "name": "al-manhal",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "description": "المنحل — Resala STEM Sub Branches Season 7",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2"
  },
  "devDependencies": {
    "@types/node": "^22.7.4",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.2",
    "typescript": "^5.6.2",
    "vite": "^5.4.8"
  }
}
`
);

file(
  "tsconfig.json",
  `
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src"]
}
`
);

file(
  "vite.config.ts",
  `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: { outDir: 'dist', sourcemap: false, target: 'es2020' },
});
`
);

file(
  ".gitignore",
  `
node_modules
dist
dist-ssr
*.local
.DS_Store
.env
.env.*
!.env.example
*.tsbuildinfo
`
);

file(
  ".github/workflows/deploy.yml",
  `
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install --no-audit --no-fund

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`
);

file(
  "public/404.html",
  `
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>المنحل</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
`
);

file(
  "public/robots.txt",
  `
User-agent: *
Allow: /
`
);

file(
  "index.html",
  `
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#151A45" />
    <title>المنحل — Resala STEM Sub Branches · Season 7</title>
    <meta
      name="description"
      content="المنحل — المنصة الرسمية لفروع Resala STEM، الموسم السابع. الأعضاء، الفرق، الترتيب."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <script type="text/javascript">
      (function (l) {
        if (l.search[1] === '/') {
          var decoded = l.search
            .slice(1)
            .split('&')
            .map(function (s) { return s.replace(/~and~/g, '&'); })
            .join('?');
          window.history.replaceState(
            null, null, l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      })(window.location);
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/main.tsx"></script>
  </body>
</html>
`
);

file(
  "README.md",
  `
# المنحل

**Resala STEM Sub Branches — Season 7**

موقع ثابت عربي بالكامل. استضافة GitHub Pages فقط.

## تشغيل
\`\`\`
node setup.js
npm install
npm run dev
\`\`\`

## نشر
\`\`\`
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin <repo-url>
git push -u origin main
\`\`\`

ثم في GitHub: Settings → Pages → Source: GitHub Actions
`
);

/* ==================================================================
 * 2. الأنماط
 * ================================================================== */

file(
  "src/styles/tokens.css",
  `
:root {
  --c-navy:          #151A45;
  --c-navy-soft:     #1B2156;
  --c-navy-2:        #212868;
  --c-navy-3:        #2A3178;
  --c-border:        #2E3680;
  --c-border-soft:   #232A6E;

  --c-red:           #C1272D;
  --c-red-soft:      #A01F24;

  --c-text:          #FFFFFF;
  --c-text-soft:     #D5DAF0;
  --c-text-muted:    #8891BE;

  --font: 'Cairo', system-ui, -apple-system, 'Segoe UI', sans-serif;

  --radius-sm: 8px;
  --radius:    12px;
  --radius-lg: 16px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  --container: 1160px;
  --navbar-h: 64px;
}
`
);

file(
  "src/styles/global.css",
  `
*, *::before, *::after { box-sizing: border-box; }

html { scroll-behavior: smooth; }
html, body, #root { min-height: 100%; }

body {
  margin: 0;
  font-family: var(--font);
  font-size: 15px;
  line-height: 1.7;
  color: var(--c-text);
  background: var(--c-navy);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1, h2, h3, h4, h5 {
  font-family: var(--font);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0;
  margin: 0;
}

h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); }
h2 { font-size: clamp(1.3rem, 2.6vw, 1.7rem); }
h3 { font-size: 1.1rem; }

p { margin: 0; }
a { color: inherit; text-decoration: none; }
img, svg { display: block; max-width: 100%; }
button, input, select, textarea { font: inherit; color: inherit; }
::selection { background: var(--c-red); color: #fff; }

::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: var(--c-navy); }
::-webkit-scrollbar-thumb { background: var(--c-navy-3); border-radius: 999px; }

/* ---------- Shell ---------- */

.app-shell { display: flex; flex-direction: column; min-height: 100vh; }
.app-main { flex: 1; }

.container {
  width: 100%;
  max-width: var(--container);
  margin-inline: auto;
  padding-inline: var(--space-5);
}
@media (max-width: 640px) { .container { padding-inline: var(--space-4); } }

/* ---------- Navbar ---------- */

.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--navbar-h);
  display: flex;
  align-items: center;
  background: var(--c-navy);
  border-bottom: 1px solid var(--c-border-soft);
}

.navbar__inner {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  width: 100%;
}

.brand {
  font-weight: 800;
  font-size: 1.15rem;
  color: #fff;
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-inline-start: auto;
  overflow-x: auto;
  scrollbar-width: none;
}
.nav-links::-webkit-scrollbar { display: none; }

.nav-link {
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--c-text-muted);
  white-space: nowrap;
  transition: color 0.15s, background 0.15s;
}
.nav-link:hover { color: #fff; background: var(--c-navy-soft); }
.nav-link.is-active { color: #fff; background: var(--c-red); }

/* ---------- Sections ---------- */

.section { padding-block: var(--space-7); }
.section--tight { padding-block: var(--space-5); }

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
  flex-wrap: wrap;
}

.section-head__eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--c-red);
  margin-bottom: 4px;
}

.section-head__desc {
  color: var(--c-text-muted);
  font-size: 0.9rem;
  max-width: 62ch;
  margin-top: 6px;
}

/* ---------- Hero ---------- */

.hero { padding-block: var(--space-8) var(--space-6); }

.hero__title { max-width: 22ch; margin-top: var(--space-4); }
.hero__title em { font-style: normal; color: var(--c-red); }

.hero__desc {
  margin-top: var(--space-4);
  max-width: 62ch;
  color: var(--c-text-soft);
  font-size: 1.02rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

/* ---------- Buttons ---------- */

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.btn--primary { background: var(--c-red); color: #fff; }
.btn--primary:hover { background: var(--c-red-soft); }

.btn--ghost {
  background: transparent;
  border-color: var(--c-border);
  color: var(--c-text-soft);
}
.btn--ghost:hover { background: var(--c-navy-soft); color: #fff; border-color: var(--c-red); }

/* ---------- Cards ---------- */

.card {
  position: relative;
  display: block;
  background: var(--c-navy-soft);
  border: 1px solid var(--c-border-soft);
  border-radius: var(--radius);
  padding: var(--space-5);
  transition: border-color 0.15s;
}
a.card:hover { border-color: var(--c-red); }

.card__title { font-size: 1rem; font-weight: 700; }
.card__meta { font-size: 0.82rem; color: var(--c-text-muted); }
.card__body { margin-top: 8px; font-size: 0.9rem; color: var(--c-text-soft); }

/* ---------- Grid ---------- */

.grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
.grid--wide { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }

/* ---------- Avatar ---------- */

.avatar {
  display: inline-grid;
  place-items: center;
  border-radius: 50%;
  font-weight: 700;
  flex-shrink: 0;
  background: var(--c-navy-3);
  color: #fff;
  user-select: none;
  border: 1px solid var(--c-border);
}

/* ---------- Stats ---------- */

.stat-row {
  display: grid;
  gap: var(--space-3);
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
}

.stat {
  background: var(--c-navy-soft);
  border: 1px solid var(--c-border-soft);
  border-radius: var(--radius);
  padding: var(--space-4) var(--space-5);
  text-align: center;
}

.stat__value {
  font-size: 1.9rem;
  font-weight: 800;
  line-height: 1;
  color: var(--c-red);
}

.stat__label {
  margin-top: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--c-text-muted);
}

/* ---------- Member card ---------- */

.member-card {
  display: flex;
  gap: var(--space-4);
  align-items: center;
}
.member-card__body { min-width: 0; flex: 1; }
.member-card__name { font-size: 1rem; font-weight: 700; }
.member-card__role { font-size: 0.82rem; color: var(--c-text-muted); margin-top: 2px; }

.member-card__teams {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

/* ---------- Team card ---------- */

.team-card__head { display: flex; align-items: center; gap: 12px; }

.team-card__mono {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 0.85rem;
  background: var(--c-navy-3);
  color: #fff;
  flex-shrink: 0;
}

.team-card__stats {
  display: flex;
  gap: var(--space-5);
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--c-border-soft);
}
.team-card__stat-value { font-size: 1.15rem; font-weight: 800; color: var(--c-red); }
.team-card__stat-label { font-size: 0.72rem; color: var(--c-text-muted); font-weight: 600; }

/* ---------- Table ---------- */

.table-wrap {
  border: 1px solid var(--c-border-soft);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--c-navy-soft);
}

table.data { width: 100%; border-collapse: collapse; font-size: 0.9rem; }

table.data th {
  text-align: right;
  padding: 12px 16px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--c-text-muted);
  background: var(--c-navy-2);
  border-bottom: 1px solid var(--c-border-soft);
  white-space: nowrap;
}

table.data td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--c-border-soft);
  vertical-align: middle;
}
table.data tr:last-child td { border-bottom: none; }
table.data tbody tr:hover { background: var(--c-navy-2); }

.rank {
  font-weight: 800;
  color: var(--c-text-muted);
  width: 48px;
}
.rank--1 { color: var(--c-red); }
.rank--2 { color: #fff; }
.rank--3 { color: var(--c-text-soft); }

.points {
  font-weight: 800;
  color: var(--c-red);
}

/* ---------- Filters ---------- */

.toolbar {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: var(--space-5);
}

.input {
  background: var(--c-navy-soft);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  font-size: 0.9rem;
  outline: none;
  min-width: 240px;
  color: #fff;
}
.input::placeholder { color: var(--c-text-muted); }
.input:focus { border-color: var(--c-red); }

.chips { display: flex; gap: 6px; flex-wrap: wrap; }

.chip {
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid var(--c-border);
  background: transparent;
  color: var(--c-text-muted);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.chip:hover { color: #fff; border-color: var(--c-red); }
.chip.is-active { background: var(--c-red); border-color: var(--c-red); color: #fff; }

/* ---------- Badge ---------- */

.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  background: var(--c-navy-2);
  color: var(--c-text-soft);
  border: 1px solid var(--c-border-soft);
  white-space: nowrap;
}

/* ---------- Profile ---------- */

.profile {
  display: flex;
  gap: var(--space-6);
  align-items: flex-start;
  flex-wrap: wrap;
  padding: var(--space-6);
  border: 1px solid var(--c-border-soft);
  border-radius: var(--radius-lg);
  background: var(--c-navy-soft);
}

.profile__main { flex: 1; min-width: 260px; }
.profile__name { font-size: clamp(1.5rem, 3vw, 2rem); }
.profile__role { color: var(--c-red); font-weight: 700; margin-top: 6px; }
.profile__bio { margin-top: var(--space-4); color: var(--c-text-soft); max-width: 68ch; }

.profile__side { display: grid; gap: var(--space-4); min-width: 200px; }

.kv { display: flex; flex-direction: column; gap: 3px; }
.kv__k { font-size: 0.72rem; font-weight: 700; color: var(--c-text-muted); }
.kv__v { font-size: 0.95rem; font-weight: 600; }

/* ---------- Footer ---------- */

.footer {
  margin-top: var(--space-8);
  border-top: 1px solid var(--c-border-soft);
  padding-block: var(--space-6);
  background: var(--c-navy);
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  gap: var(--space-5);
  flex-wrap: wrap;
  align-items: center;
}

.footer__note { color: var(--c-text-muted); font-size: 0.85rem; }

/* ---------- Empty / 404 ---------- */

.empty {
  padding: var(--space-7) var(--space-5);
  text-align: center;
  border: 1px dashed var(--c-border);
  border-radius: var(--radius);
  color: var(--c-text-muted);
}

.notfound { display: grid; place-items: center; text-align: center; padding-block: var(--space-8); }
.notfound__code {
  font-size: clamp(4rem, 14vw, 8rem);
  font-weight: 800;
  line-height: 1;
  color: var(--c-red);
}

/* ---------- Utilities ---------- */

.muted { color: var(--c-text-muted); }
.soft { color: var(--c-text-soft); }
.small { font-size: 0.82rem; }
.nowrap { white-space: nowrap; }
.mt-2 { margin-top: var(--space-2); }
.mt-3 { margin-top: var(--space-3); }
.mt-4 { margin-top: var(--space-4); }
.mt-5 { margin-top: var(--space-5); }
.mt-6 { margin-top: var(--space-6); }

.stack { display: flex; flex-direction: column; gap: var(--space-4); }
.row { display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; }

@media (max-width: 720px) {
  .brand { font-size: 1rem; }
  .hero { padding-block: var(--space-7) var(--space-5); }
}
`
);

/* ==================================================================
 * 3. الأنواع
 * ================================================================== */

file(
  "src/types/index.ts",
  `
export type TeamId =
  | 'helpers'
  | 'heroes'
  | 'coders'
  | 'enviros'
  | 'messages'
  | 'masar'
  | 'rstc';

export interface Team {
  id: TeamId;
  name: string;        // دائماً بالإنجليزية
  description: string; // بالعربي
}

export interface Member {
  id: string;
  name: string;        // الاسم بالعربي
  role: string;        // الدور بالعربي
  teamIds: TeamId[];
  joinedSeason: number;
  points: number;
  bio?: string;
  email?: string;
}

export interface Season {
  id: number;
  label: string;
  theme: string;
  start: string;
  end: string;
  isActive: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  organization: string;
  season: string;
  email: string;
}
`
);

file(
  "src/vite-env.d.ts",
  `
/// <reference types="vite/client" />
`
);

/* ==================================================================
 * 4. البيانات
 * ================================================================== */

file(
  "src/data/site.ts",
  `
import type { SiteConfig, Season } from '@/types';

export const site: SiteConfig = {
  name: 'المنحل',
  tagline: 'Resala STEM Sub Branches — الموسم السابع',
  description:
    'المنصة الرسمية لفروع Resala STEM. فريق واحد، سبع مجموعات، موسم كامل من العمل والتعليم والعطاء.',
  organization: 'Resala STEM',
  season: 'الموسم السابع',
  email: 'hello@resala-stem.org',
};

export const seasons: Season[] = [
  { id: 7, label: 'الموسم السابع', theme: 'نبني. نُعلّم. نعطي.', start: '2025-09-01', end: '2026-06-30', isActive: true },
  { id: 6, label: 'الموسم السادس', theme: 'نصل أبعد.', start: '2024-09-01', end: '2025-06-30', isActive: false },
];

export const activeSeason: Season = seasons.find((s) => s.isActive) ?? seasons[0];
`
);

file(
  "src/data/teams.ts",
  `
/* أسماء الفرق بالإنجليزية دائماً */
import type { Team } from '@/types';

export const teams: Team[] = [
  { id: 'helpers',  name: 'Helpers',  description: 'العمود الفقري لكل فرع. يتولى المساعدون اللوجستيات والإرشاد والتأهيل والعمليات اليومية التي تُبقي المنظومة تعمل.' },
  { id: 'heroes',   name: 'Heroes',   description: 'يقود الأبطال الأنشطة الميدانية والتوعية المجتمعية وحملات التطوع الكبرى.' },
  { id: 'coders',   name: 'Coders',   description: 'يصمم المبرمجون ويبنون الأدوات والمنصات والأتمتة التي تستخدمها المنظمة.' },
  { id: 'enviros',  name: 'Enviros',  description: 'ينفذ فريق البيئة برامج الاستدامة: حملات إعادة التدوير، زراعة الأشجار، والتوعية البيئية.' },
  { id: 'messages', name: 'Messages', description: 'يصوغ فريق الرسائل السرد — المحتوى والإعلام والتوثيق والاتصال.' },
  { id: 'masar',    name: 'Masar',    description: 'يدعم مسار الطلاب بالتوجيه والمسارات المهنية وبرامج الإرشاد.' },
  { id: 'rstc',     name: 'RSTC',     description: 'يضع مركز تدريب Resala STEM المناهج ويدرب المدربين ويضمن جودة كل برنامج.' },
];
`
);

file(
  "src/data/members.ts",
  `
import type { Member } from '@/types';

export const members: Member[] = [
  { id: 'm-01', name: 'ياسين عبد الرحمن',  role: 'قائد الموسم السابع',   teamIds: ['helpers', 'rstc'], joinedSeason: 5, points: 320, bio: 'يقود منظومة الموسم السابع في جميع الفروع.', email: 'yassin@resala-stem.org' },
  { id: 'm-02', name: 'ملك هشام',           role: 'قائدة Coders',         teamIds: ['coders'],          joinedSeason: 5, points: 295, bio: 'مهندسة برمجيات متكاملة. تبني الأدوات الداخلية والمنصة العامة.' },
  { id: 'm-03', name: 'عمر خالد',           role: 'قائد Heroes',          teamIds: ['heroes'],          joinedSeason: 6, points: 270, bio: 'ينظم الحملات الميدانية والتوعية المجتمعية.' },
  { id: 'm-04', name: 'نور السيد',          role: 'قائدة Enviros',        teamIds: ['enviros'],         joinedSeason: 6, points: 260, bio: 'خريجة علوم بيئية. تدير برامج إعادة التدوير وزراعة الأشجار.' },
  { id: 'm-05', name: 'هنا مصطفى',          role: 'قائدة Messages',       teamIds: ['messages'],        joinedSeason: 6, points: 245, bio: 'استراتيجية محتوى. توثق الموسم وتشكل صوت المنظمة.' },
  { id: 'm-06', name: 'علي جمال',           role: 'قائد Masar',           teamIds: ['masar'],           joinedSeason: 7, points: 230, bio: 'مسارات إرشاد وتوجيه مهني لطلاب الثانوية.' },
  { id: 'm-07', name: 'سلمى عادل',          role: 'منسقة RSTC',           teamIds: ['rstc'],            joinedSeason: 5, points: 240, bio: 'تصمم المناهج التدريبية وتعتمد المدربين.' },
  { id: 'm-08', name: 'زياد طارق',          role: 'مساعد أول',             teamIds: ['helpers'],         joinedSeason: 7, points: 210, bio: 'التأهيل واللوجستيات وكل ما لا يريد أحد فعله.' },
  { id: 'm-09', name: 'فريدة نبيل',         role: 'مطورة واجهات',          teamIds: ['coders'],          joinedSeason: 7, points: 205, bio: 'تبني الواجهات ومكتبة المكونات.' },
  { id: 'm-10', name: 'يوسف أشرف',          role: 'بطل ميداني',            teamIds: ['heroes', 'enviros'], joinedSeason: 7, points: 195, bio: 'يقود حملات التطوع في المنصورة.' },
  { id: 'm-11', name: 'جنى محمود',          role: 'مسؤولة الاستدامة',      teamIds: ['enviros'],         joinedSeason: 7, points: 185, bio: 'تقيس وتُبلغ عن الأثر البيئي لكل برنامج.' },
  { id: 'm-12', name: 'كريم سمير',          role: 'مرشد Masar',           teamIds: ['masar', 'rstc'],   joinedSeason: 7, points: 175, bio: 'يرشد الطلاب في المسارات الدراسية والمهارات التقنية.' },
  { id: 'm-13', name: 'ليلى إبراهيم',       role: 'إعلام وتوثيق',          teamIds: ['messages'],        joinedSeason: 7, points: 165, bio: 'صورة وفيديو وأرشيف. لا شيء حدث إن لم يُوثَّق.' },
  { id: 'm-14', name: 'أحمد فؤاد',          role: 'مساعد عمليات',          teamIds: ['helpers', 'rstc'], joinedSeason: 7, points: 155, bio: 'ينسق بين الفروع ويحافظ على الجدول الزمني.' },
];
`
);

file(
  "src/data/index.ts",
  `
export { site, seasons, activeSeason } from './site';
export { teams } from './teams';
export { members } from './members';
`
);

/* ==================================================================
 * 5. المنطق
 * ================================================================== */

file(
  "src/lib/format.ts",
  `
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('ar-EG', { day: '2-digit', month: 'long', year: 'numeric' });
}

export function initials(name: string): string {
  const parts = name.trim().split(/\\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2);
  return (parts[0][0] + ' ' + parts[parts.length - 1][0]).trim();
}
`
);

file(
  "src/lib/derive.ts",
  `
/* طبقة الحسابات الآلية — كل الأرقام تُحسب من البيانات */

import type { Member, Team, TeamId } from '@/types';
import { members } from '@/data/members';
import { teams } from '@/data/teams';

export function getTeamById(id: TeamId): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function getMemberById(id: string): Member | undefined {
  return members.find((m) => m.id === id);
}

export function getMembersByTeam(teamId: TeamId): Member[] {
  return members.filter((m) => m.teamIds.includes(teamId));
}

export function getTeamPoints(teamId: TeamId): number {
  return getMembersByTeam(teamId).reduce((sum, m) => sum + m.points, 0);
}

/* ---------- الليج العام ---------- */

export interface LeaderboardEntry {
  member: Member;
  rank: number;
  points: number;
  teams: Team[];
}

export function getLeaderboard(): LeaderboardEntry[] {
  const sorted = [...members].sort((a, b) => b.points - a.points);
  return sorted.map((member, index) => ({
    member,
    rank: index + 1,
    points: member.points,
    teams: member.teamIds
      .map((id) => getTeamById(id))
      .filter((t): t is Team => Boolean(t)),
  }));
}

/* ---------- ليج الفريق ---------- */

export function getTeamLeaderboard(teamId: TeamId): LeaderboardEntry[] {
  const teamMembers = getMembersByTeam(teamId);
  const sorted = [...teamMembers].sort((a, b) => b.points - a.points);
  return sorted.map((member, index) => ({
    member,
    rank: index + 1,
    points: member.points,
    teams: member.teamIds
      .map((id) => getTeamById(id))
      .filter((t): t is Team => Boolean(t)),
  }));
}

/* ---------- ترتيب الفرق ---------- */

export interface TeamRank {
  team: Team;
  memberCount: number;
  totalPoints: number;
  avgPoints: number;
  rank: number;
}

export function getTeamRanking(): TeamRank[] {
  const rows = teams.map((team) => {
    const teamMembers = getMembersByTeam(team.id);
    const totalPoints = teamMembers.reduce((sum, m) => sum + m.points, 0);
    const avgPoints =
      teamMembers.length === 0 ? 0 : Math.round(totalPoints / teamMembers.length);
    return { team, memberCount: teamMembers.length, totalPoints, avgPoints, rank: 0 };
  });

  rows.sort((a, b) => b.totalPoints - a.totalPoints);
  rows.forEach((r, i) => { r.rank = i + 1; });
  return rows;
}

/* ---------- إحصائيات عامة ---------- */

export interface OrgStats {
  members: number;
  teams: number;
  totalPoints: number;
  avgPoints: number;
}

export function getOrgStats(): OrgStats {
  const totalPoints = members.reduce((sum, m) => sum + m.points, 0);
  const avgPoints = members.length === 0 ? 0 : Math.round(totalPoints / members.length);
  return {
    members: members.length,
    teams: teams.length,
    totalPoints,
    avgPoints,
  };
}

/* ---------- عضو ---------- */

export function getMemberRank(memberId: string): number {
  const board = getLeaderboard();
  const entry = board.find((e) => e.member.id === memberId);
  return entry ? entry.rank : 0;
}

export function getMemberTeamRank(memberId: string, teamId: TeamId): number {
  const board = getTeamLeaderboard(teamId);
  const entry = board.find((e) => e.member.id === memberId);
  return entry ? entry.rank : 0;
}
`
);

/* ==================================================================
 * 6. مكونات عامة
 * ================================================================== */

file(
  "src/components/ui/Avatar.tsx",
  `
import { cx, initials } from '@/lib/format';

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export function Avatar({ name, size = 52, className }: AvatarProps) {
  const style = {
    width: size,
    height: size,
    fontSize: Math.max(11, Math.round(size * 0.34)),
  };
  return (
    <span className={cx('avatar', className)} style={style} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
`
);

file(
  "src/components/ui/Stat.tsx",
  `
import type { ReactNode } from 'react';

interface StatProps { value: number | string; label: string; }

export function Stat({ value, label }: StatProps) {
  return (
    <div className="stat">
      <div className="stat__value">{value}</div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

export function StatRow({ children }: { children: ReactNode }) {
  return <div className="stat-row">{children}</div>;
}
`
);

file(
  "src/components/ui/SectionHeader.tsx",
  `
import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeader({ eyebrow, title, description, action }: Props) {
  return (
    <div className="section-head">
      <div>
        {eyebrow ? <div className="section-head__eyebrow">{eyebrow}</div> : null}
        <h2>{title}</h2>
        {description ? <p className="section-head__desc">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
`
);

file(
  "src/components/ui/EmptyState.tsx",
  `
export function EmptyState({ message }: { message: string }) {
  return <div className="empty">{message}</div>;
}
`
);

file(
  "src/components/ui/PageHeader.tsx",
  `
import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, children }: Props) {
  return (
    <header className="section section--tight">
      {eyebrow ? <div className="section-head__eyebrow">{eyebrow}</div> : null}
      <h1>{title}</h1>
      {description ? (
        <p className="hero__desc" style={{ marginTop: '12px' }}>{description}</p>
      ) : null}
      {children}
    </header>
  );
}
`
);

/* ==================================================================
 * 7. مكونات النطاق
 * ================================================================== */

file(
  "src/components/member/MemberCard.tsx",
  `
import { Link } from 'react-router-dom';
import type { Member } from '@/types';
import { getTeamById } from '@/lib/derive';
import { Avatar } from '@/components/ui/Avatar';

export function MemberCard({ member }: { member: Member }) {
  return (
    <Link to={'/members/' + member.id} className="card member-card">
      <Avatar name={member.name} />
      <div className="member-card__body">
        <div className="member-card__name">{member.name}</div>
        <div className="member-card__role">{member.role}</div>
        <div className="member-card__teams">
          {member.teamIds.map((id) => {
            const team = getTeamById(id);
            if (!team) return null;
            return <span key={id} className="badge">{team.name}</span>;
          })}
        </div>
      </div>
    </Link>
  );
}
`
);

file(
  "src/components/team/TeamCard.tsx",
  `
import { Link } from 'react-router-dom';
import type { TeamRank } from '@/lib/derive';

export function TeamCard({ row }: { row: TeamRank }) {
  const monogram = row.team.name.slice(0, 2).toUpperCase();

  return (
    <Link to={'/teams/' + row.team.id} className="card">
      <div className="team-card__head">
        <span className="team-card__mono" aria-hidden="true">{monogram}</span>
        <div>
          <div className="card__title">{row.team.name}</div>
          <div className="card__meta">المركز #{row.rank}</div>
        </div>
      </div>

      <p className="card__body">{row.team.description}</p>

      <div className="team-card__stats">
        <div>
          <div className="team-card__stat-value">{row.memberCount}</div>
          <div className="team-card__stat-label">أعضاء</div>
        </div>
        <div>
          <div className="team-card__stat-value">{row.totalPoints}</div>
          <div className="team-card__stat-label">نقاط</div>
        </div>
        <div>
          <div className="team-card__stat-value">{row.avgPoints}</div>
          <div className="team-card__stat-label">متوسط</div>
        </div>
      </div>
    </Link>
  );
}
`
);

/* ==================================================================
 * 8. التخطيط
 * ================================================================== */

file(
  "src/components/layout/Navbar.tsx",
  `
import { NavLink } from 'react-router-dom';
import { site } from '@/data';
import { cx } from '@/lib/format';

const LINKS = [
  { to: '/', label: 'الرئيسية', end: true },
  { to: '/members', label: 'الأعضاء' },
  { to: '/teams', label: 'الفرق' },
  { to: '/league', label: 'الترتيب العام' },
  { to: '/about', label: 'عن المنحل' },
];

export function Navbar() {
  return (
    <header className="navbar">
      <nav className="container navbar__inner" aria-label="القائمة الرئيسية">
        <NavLink to="/" className="brand">{site.name}</NavLink>
        <div className="nav-links">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => cx('nav-link', isActive && 'is-active')}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
`
);

file(
  "src/components/layout/Footer.tsx",
  `
import { site } from '@/data';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="brand">{site.name}</div>
        <div className="footer__note">
          {site.organization} — {site.season} · جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
`
);

file(
  "src/components/layout/Layout.tsx",
  `
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main"><Outlet /></main>
      <Footer />
    </div>
  );
}
`
);

/* ==================================================================
 * 9. الصفحات
 * ================================================================== */

file(
  "src/pages/HomePage.tsx",
  `
import { Link } from 'react-router-dom';
import { site, activeSeason } from '@/data';
import { getOrgStats, getTeamRanking, getTopMembers } from '@/lib/derive';
import { Stat, StatRow } from '@/components/ui/Stat';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TeamCard } from '@/components/team/TeamCard';
import { Avatar } from '@/components/ui/Avatar';

export function HomePage() {
  const stats = getOrgStats();
  const teamRanking = getTeamRanking();
  const topMembers = getTopMembers(5);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="section-head__eyebrow">{activeSeason.label} · {activeSeason.theme}</div>
          <h1 className="hero__title">فريق واحد. <em>سبع مجموعات.</em> موسم كامل من البناء.</h1>
          <p className="hero__desc">{site.description}</p>
          <div className="hero__actions">
            <Link to="/members" className="btn btn--primary">تصفح الأعضاء</Link>
            <Link to="/league" className="btn btn--ghost">الترتيب العام</Link>
          </div>
        </div>
      </section>

      <section className="container section--tight">
        <StatRow>
          <Stat value={stats.members} label="الأعضاء" />
          <Stat value={stats.teams} label="الفرق" />
          <Stat value={stats.totalPoints} label="مجموع النقاط" />
          <Stat value={stats.avgPoints} label="متوسط النقاط" />
        </StatRow>
      </section>

      <section className="container section">
        <SectionHeader
          eyebrow="ترتيب الفرق"
          title="الفرق حسب النقاط"
          description="مجموع نقاط الأعضاء في كل فريق."
          action={<Link to="/teams" className="btn btn--ghost">كل الفرق</Link>}
        />
        <div className="grid">
          {teamRanking.map((row) => <TeamCard key={row.team.id} row={row} />)}
        </div>
      </section>

      <section className="container section">
        <SectionHeader
          eyebrow="الترتيب العام"
          title="أعلى الأعضاء"
          action={<Link to="/league" className="btn btn--ghost">الترتيب الكامل</Link>}
        />
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>#</th>
                <th>العضو</th>
                <th>الدور</th>
                <th>الفرق</th>
                <th>النقاط</th>
              </tr>
            </thead>
            <tbody>
              {topMembers.map((e) => (
                <tr key={e.member.id}>
                  <td className={'rank rank--' + (e.rank <= 3 ? e.rank : '')}>{e.rank}</td>
                  <td>
                    <Link to={'/members/' + e.member.id} className="row">
                      <Avatar name={e.member.name} size={32} />
                      <span>{e.member.name}</span>
                    </Link>
                  </td>
                  <td className="muted small">{e.member.role}</td>
                  <td>
                    <div className="row" style={{ gap: 6 }}>
                      {e.teams.map((t) => <span key={t.id} className="badge">{t.name}</span>)}
                    </div>
                  </td>
                  <td className="points">{e.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
`
);

file(
  "src/pages/MembersPage.tsx",
  `
import { useMemo, useState } from 'react';
import { members } from '@/data/members';
import { teams } from '@/data/teams';
import type { TeamId } from '@/types';
import { MemberCard } from '@/components/member/MemberCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { cx } from '@/lib/format';

export function MembersPage() {
  const [query, setQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState<TeamId | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.trim();
    return members.filter((m) => {
      const matchesTeam = teamFilter === 'all' || m.teamIds.includes(teamFilter);
      const matchesQuery = q.length === 0 || m.name.includes(q) || m.role.includes(q);
      return matchesTeam && matchesQuery;
    });
  }, [query, teamFilter]);

  return (
    <div className="container">
      <PageHeader
        eyebrow="الأعضاء"
        title="جميع الأعضاء"
        description="كل عضو في فروع Resala STEM، الموسم السابع."
      />

      <div className="toolbar">
        <input
          className="input"
          type="search"
          placeholder="ابحث بالاسم أو الدور…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="chips">
          <button
            type="button"
            className={cx('chip', teamFilter === 'all' && 'is-active')}
            onClick={() => setTeamFilter('all')}
          >الكل</button>
          {teams.map((t) => (
            <button
              key={t.id}
              type="button"
              className={cx('chip', teamFilter === t.id && 'is-active')}
              onClick={() => setTeamFilter(t.id)}
            >{t.name}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="لا يوجد أعضاء مطابقون للبحث." />
      ) : (
        <div className="grid grid--wide">
          {filtered.map((m) => <MemberCard key={m.id} member={m} />)}
        </div>
      )}
    </div>
  );
}
`
);

file(
  "src/pages/MemberProfilePage.tsx",
  `
import { Link, useParams } from 'react-router-dom';
import {
  getMemberById,
  getMemberRank,
  getMemberTeamRank,
  getTeamById,
} from '@/lib/derive';
import { Avatar } from '@/components/ui/Avatar';
import { Stat, StatRow } from '@/components/ui/Stat';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { NotFoundPage } from './NotFoundPage';

export function MemberProfilePage() {
  const { memberId } = useParams<{ memberId: string }>();
  const member = memberId ? getMemberById(memberId) : undefined;
  if (!member) return <NotFoundPage />;

  const rank = getMemberRank(member.id);

  return (
    <div className="container section--tight">
      <div className="profile">
        <Avatar name={member.name} size={96} />
        <div className="profile__main">
          <h1 className="profile__name">{member.name}</h1>
          <div className="profile__role">{member.role}</div>
          {member.bio ? <p className="profile__bio">{member.bio}</p> : null}
          <div className="row mt-5">
            {member.teamIds.map((id) => {
              const team = getTeamById(id);
              if (!team) return null;
              return (
                <Link key={id} to={'/teams/' + team.id}>
                  <span className="badge">{team.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="profile__side">
          <div className="kv">
            <span className="kv__k">الترتيب العام</span>
            <span className="kv__v">#{rank}</span>
          </div>
          <div className="kv">
            <span className="kv__k">النقاط</span>
            <span className="kv__v" style={{ color: 'var(--c-red)' }}>{member.points}</span>
          </div>
          <div className="kv">
            <span className="kv__k">الانضمام</span>
            <span className="kv__v">الموسم {member.joinedSeason}</span>
          </div>
          {member.email ? (
            <div className="kv">
              <span className="kv__k">التواصل</span>
              <a className="kv__v" href={'mailto:' + member.email}>{member.email}</a>
            </div>
          ) : null}
        </div>
      </div>

      <section className="section">
        <StatRow>
          <Stat value={member.points} label="النقاط" />
          <Stat value={rank} label="الترتيب العام" />
          <Stat value={member.teamIds.length} label="عدد الفرق" />
        </StatRow>
      </section>

      {member.teamIds.map((teamId) => {
        const team = getTeamById(teamId);
        if (!team) return null;
        const teamRank = getMemberTeamRank(member.id, teamId);
        return (
          <section key={teamId} className="section">
            <SectionHeader
              eyebrow={'ترتيب داخل ' + team.name}
              title={'المركز #' + teamRank}
              action={<Link to={'/teams/' + team.id} className="btn btn--ghost">صفحة الفريق</Link>}
            />
          </section>
        );
      })}
    </div>
  );
}
`
);

file(
  "src/pages/TeamsPage.tsx",
  `
import { getOrgStats, getTeamRanking } from '@/lib/derive';
import { TeamCard } from '@/components/team/TeamCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Stat, StatRow } from '@/components/ui/Stat';

export function TeamsPage() {
  const ranking = getTeamRanking();
  const stats = getOrgStats();

  return (
    <div className="container">
      <PageHeader
        eyebrow="الهيكل"
        title="الفرق"
        description="سبع مجموعات متخصصة. كل فريق له مجال واحد ونتيجة واحدة قابلة للقياس."
      />

      <section className="section--tight">
        <StatRow>
          <Stat value={stats.teams} label="الفرق" />
          <Stat value={stats.members} label="الأعضاء" />
          <Stat value={stats.totalPoints} label="مجموع النقاط" />
        </StatRow>
      </section>

      <section className="section">
        <div className="grid grid--wide">
          {ranking.map((row) => <TeamCard key={row.team.id} row={row} />)}
        </div>
      </section>
    </div>
  );
}
`
);

file(
  "src/pages/TeamDetailPage.tsx",
  `
import { Link, useParams } from 'react-router-dom';
import type { TeamId } from '@/types';
import {
  getMembersByTeam,
  getTeamById,
  getTeamLeaderboard,
  getTeamPoints,
} from '@/lib/derive';
import { MemberCard } from '@/components/member/MemberCard';
import { Stat, StatRow } from '@/components/ui/Stat';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Avatar } from '@/components/ui/Avatar';
import { NotFoundPage } from './NotFoundPage';

export function TeamDetailPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const team = teamId ? getTeamById(teamId as TeamId) : undefined;
  if (!team) return <NotFoundPage />;

  const teamMembers = getMembersByTeam(team.id);
  const teamPoints = getTeamPoints(team.id);
  const board = getTeamLeaderboard(team.id);
  const avg = teamMembers.length === 0 ? 0 : Math.round(teamPoints / teamMembers.length);

  return (
    <div className="container section--tight">
      <div className="profile">
        <span className="team-card__mono" style={{ width: 80, height: 80, fontSize: '1.4rem', borderRadius: 16 }} aria-hidden="true">
          {team.name.slice(0, 2).toUpperCase()}
        </span>
        <div className="profile__main">
          <h1 className="profile__name">{team.name}</h1>
          <p className="profile__bio">{team.description}</p>
        </div>
      </div>

      <section className="section">
        <StatRow>
          <Stat value={teamMembers.length} label="الأعضاء" />
          <Stat value={teamPoints} label="مجموع النقاط" />
          <Stat value={avg} label="متوسط النقاط" />
        </StatRow>
      </section>

      <section className="section">
        <SectionHeader eyebrow="الأعضاء" title="أعضاء الفريق" />
        {teamMembers.length === 0 ? (
          <EmptyState message="لا يوجد أعضاء في هذا الفريق بعد." />
        ) : (
          <div className="grid grid--wide">
            {teamMembers.map((m) => <MemberCard key={m.id} member={m} />)}
          </div>
        )}
      </section>

      <section className="section">
        <SectionHeader eyebrow="ترتيب الفريق" title={'ليج ' + team.name} />
        {board.length === 0 ? (
          <EmptyState message="لا توجد نقاط مسجلة." />
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>#</th>
                  <th>العضو</th>
                  <th>الدور</th>
                  <th>النقاط</th>
                </tr>
              </thead>
              <tbody>
                {board.map((e) => (
                  <tr key={e.member.id}>
                    <td className={'rank rank--' + (e.rank <= 3 ? e.rank : '')}>{e.rank}</td>
                    <td>
                      <Link to={'/members/' + e.member.id} className="row">
                        <Avatar name={e.member.name} size={30} />
                        <span>{e.member.name}</span>
                      </Link>
                    </td>
                    <td className="muted small">{e.member.role}</td>
                    <td className="points">{e.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
`
);

file(
  "src/pages/LeaguePage.tsx",
  `
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { teams } from '@/data/teams';
import type { TeamId } from '@/types';
import { getLeaderboard, getOrgStats, getTeamLeaderboard } from '@/lib/derive';
import { Avatar } from '@/components/ui/Avatar';
import { PageHeader } from '@/components/ui/PageHeader';
import { Stat, StatRow } from '@/components/ui/Stat';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cx } from '@/lib/format';

export function LeaguePage() {
  const [filter, setFilter] = useState<TeamId | 'all'>('all');
  const stats = getOrgStats();

  const board = filter === 'all' ? getLeaderboard() : getTeamLeaderboard(filter);

  const subtitle =
    filter === 'all'
      ? 'الترتيب العام لجميع الأعضاء حسب النقاط.'
      : 'ترتيب أعضاء فريق ' + (teams.find((t) => t.id === filter)?.name ?? '') + ' حسب النقاط.';

  return (
    <div className="container">
      <PageHeader eyebrow="الترتيب" title="الليج" description={subtitle} />

      <section className="section--tight">
        <StatRow>
          <Stat value={stats.members} label="الأعضاء" />
          <Stat value={stats.totalPoints} label="مجموع النقاط" />
          <Stat value={stats.avgPoints} label="المتوسط" />
        </StatRow>
      </section>

      <div className="toolbar mt-6">
        <div className="chips">
          <button
            type="button"
            className={cx('chip', filter === 'all' && 'is-active')}
            onClick={() => setFilter('all')}
          >عام</button>
          {teams.map((t) => (
            <button
              key={t.id}
              type="button"
              className={cx('chip', filter === t.id && 'is-active')}
              onClick={() => setFilter(t.id)}
            >{t.name}</button>
          ))}
        </div>
      </div>

      <section className="section">
        <SectionHeader
          eyebrow={filter === 'all' ? 'كل الأعضاء' : 'داخل الفريق'}
          title={filter === 'all' ? 'الترتيب العام' : 'ترتيب الفريق'}
        />
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>#</th>
                <th>العضو</th>
                <th>الدور</th>
                <th>الفرق</th>
                <th>النقاط</th>
              </tr>
            </thead>
            <tbody>
              {board.map((e) => (
                <tr key={e.member.id}>
                  <td className={'rank rank--' + (e.rank <= 3 ? e.rank : '')}>{e.rank}</td>
                  <td>
                    <Link to={'/members/' + e.member.id} className="row">
                      <Avatar name={e.member.name} size={32} />
                      <span>{e.member.name}</span>
                    </Link>
                  </td>
                  <td className="muted small">{e.member.role}</td>
                  <td>
                    <div className="row" style={{ gap: 6 }}>
                      {e.teams.map((t) => <span key={t.id} className="badge">{t.name}</span>)}
                    </div>
                  </td>
                  <td className="points">{e.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
`
);

file(
  "src/pages/AboutPage.tsx",
  `
import { site, activeSeason, seasons } from '@/data';
import { getOrgStats } from '@/lib/derive';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Stat, StatRow } from '@/components/ui/Stat';
import { formatDate } from '@/lib/format';

export function AboutPage() {
  const stats = getOrgStats();

  return (
    <div className="container">
      <PageHeader eyebrow="عن المنحل" title={site.name} description={site.description} />

      <section className="section--tight">
        <StatRow>
          <Stat value={stats.members} label="الأعضاء" />
          <Stat value={stats.teams} label="الفرق" />
          <Stat value={stats.totalPoints} label="مجموع النقاط" />
        </StatRow>
      </section>

      <section className="section">
        <SectionHeader eyebrow="الموسم الحالي" title={activeSeason.label} description={activeSeason.theme} />
        <div className="grid grid--wide">
          <div className="card">
            <div className="kv">
              <span className="kv__k">الموسم</span>
              <span className="kv__v">{activeSeason.label}</span>
            </div>
            <div className="kv mt-4">
              <span className="kv__k">البداية</span>
              <span className="kv__v">{formatDate(activeSeason.start)}</span>
            </div>
            <div className="kv mt-4">
              <span className="kv__k">النهاية</span>
              <span className="kv__v">{formatDate(activeSeason.end)}</span>
            </div>
          </div>
          <div className="card">
            <div className="card__title">المواسم السابقة</div>
            <div className="stack mt-4">
              {seasons.map((s) => (
                <div key={s.id} className="row" style={{ justifyContent: 'space-between' }}>
                  <span>{s.label}</span>
                  <span className="muted small">{s.theme}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow="تواصل" title="البريد الإلكتروني" />
        <div className="card">
          <a className="kv__v" href={'mailto:' + site.email}>{site.email}</a>
        </div>
      </section>
    </div>
  );
}
`
);

file(
  "src/pages/NotFoundPage.tsx",
  `
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="container notfound">
      <div className="notfound__code">404</div>
      <h2 className="mt-4">هذه الخلية فارغة</h2>
      <p className="muted mt-3">الصفحة التي تبحث عنها غير موجودة.</p>
      <Link to="/" className="btn btn--primary mt-6">العودة إلى الرئيسية</Link>
    </div>
  );
}
`
);

/* ==================================================================
 * 10. App + main
 * ================================================================== */

file(
  "src/App.tsx",
  `
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { MembersPage } from '@/pages/MembersPage';
import { MemberProfilePage } from '@/pages/MemberProfilePage';
import { TeamsPage } from '@/pages/TeamsPage';
import { TeamDetailPage } from '@/pages/TeamDetailPage';
import { LeaguePage } from '@/pages/LeaguePage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/members/:memberId" element={<MemberProfilePage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/teams/:teamId" element={<TeamDetailPage />} />
          <Route path="/league" element={<LeaguePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
`
);

file(
  "src/main.tsx",
  `
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tokens.css';
import './styles/global.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root was not found');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`
);

/* ==================================================================
 * الكتابة
 * ================================================================== */

function write() {
  const entries = Object.entries(files);
  let written = 0;

  for (const [relative, raw] of entries) {
    const absolute = path.join(ROOT, relative);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, raw.replace(/^\n/, ""), "utf8");
    written += 1;
  }

  console.log("");
  console.log("  ⬢  المنحل — تم إنشاء المشروع بنجاح");
  console.log("  ─────────────────────────────────────");
  console.log("  عدد الملفات: " + written);
  console.log("");
  console.log("  الخطوات التالية:");
  console.log("    1)  npm install");
  console.log("    2)  npm run dev");
  console.log("    3)  افتح http://localhost:5173");
  console.log("");
}

write();
