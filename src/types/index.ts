export interface Project {
  id: number;
  name: string;
  type: 'feature' | 'bugfix' | 'milestone' | 'release';
  startDate: string;
  endDate: string;
  description?: string;
  color?: string;
}

export interface TimeUnit {
  start: Date;
  end: Date;
  label: string;
}

export type ViewMode = 'day' | 'week' | 'month';

export interface ProjectStats {
  total: number;
  planned: number;
  unplanned: number;
}

export interface ExportData {
  id: number;
  name: string;
  start: string;
  end: string;
}

export type Language = 'en' | 'zh';

export type Theme = 'light' | 'dark' | 'blue' | 'green' | 'purple';

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}