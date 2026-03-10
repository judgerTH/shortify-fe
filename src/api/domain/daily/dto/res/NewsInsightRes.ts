export interface NewsInsightRes {
    id: number;
    positivity: number;
    stability: number;
    tension: number;
    summary: string;
    positivityDiff: number;
    stabilityDiff: number;
    tensionDiff: number;
    createdAt: string;
}
