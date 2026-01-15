export interface DailyTimelineRes {
    date: string;        // "2026-01-11"
    baseTime: string;    // "08:00"
    groups: TimelineGroup[];
}

export interface TimelineGroup {
    timeRange: string;   // "08:00-09:59"
    articles: TimelineArticle[];
}

export interface TimelineArticle {
    id: number;
    title: string;
    media: string;
    publishedAt: string;
    collectedAt: string;
    summary: string;
    originalUrl: string;
    likes: number;
    comments: number;
}
