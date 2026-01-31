/**
 * 필터 관련 타입 정의
 */

export type TimeFilterType = 'recent-2h' | 'recent-4h' | 'recent-8h' | 'today';

export interface TimelineFilter {
    timeFilter: TimeFilterType;
    mediaName: string | null; // null이면 '전체 언론사'
}
