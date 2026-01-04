export interface MoodScore {
  label: string;
  value: number; // 0-100
  delta?: number;
  level?: string;
  levelType?: 'high' | 'mid' | 'low';
}

export interface DayMood {
  date: string;
  scores: MoodScore[];
  summary?: string;
  analysis?: string; // Content from AnalysisCard
}

export interface SocialAnalysis {
  title: string;
  content: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
}

export interface NewsItem {
  id: string;
  press: string;
  title: string;
  summary: string;
  likes: number;
  comments: Comment[];
  time: string; // HH:mm
}
