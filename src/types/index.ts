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
