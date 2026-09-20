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
