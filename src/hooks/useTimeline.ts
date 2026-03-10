import { useState, useEffect, useCallback } from "react";
import { fetchTimelineByFilter, fetchNewsInsight } from "../services/timelineService";
import type { TimelineFilter, TimeFilterType } from "../types/filter";
import type { DailyTimelineRes } from "../api/domain/daily/dto/res/DailyTimelineRes";
import type { NewsInsightRes } from "../api/domain/daily/dto/res/NewsInsightRes";

export const useTimeline = () => {
  const [data, setData] = useState<DailyTimelineRes | null>(null);
  const [newsInsight, setNewsInsight] = useState<NewsInsightRes | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState<TimelineFilter>({
    timeFilter: 'recent-8h',
    mediaName: null
  });

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [timelineRes, insightRes] = await Promise.all([
          fetchTimelineByFilter(filter),
          fetchNewsInsight()
        ]);
        setData(timelineRes);
        setNewsInsight(insightRes);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [filter]);

  const handleTimeFilterChange = (timeFilter: TimeFilterType) => {
    setFilter((prev) => ({ ...prev, timeFilter }));
  };

  const handleMediaFilterChange = (mediaName: string | null) => {
    setFilter((prev) => ({ ...prev, mediaName }));
  };

  // 새로고침 함수 메모이제이션하여 불필요한 useEffect 실행 방지
  const refresh = useCallback(() => {
    setFilter((prev) => ({ ...prev }));
  }, []);

  return {
    timelineData: data,
    newsInsight,
    isLoading,
    filter,
    onTimeFilterChange: handleTimeFilterChange,
    onMediaFilterChange: handleMediaFilterChange,
    refresh
  };
};
