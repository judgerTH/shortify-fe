import { useState, useEffect } from "react";
import { fetchTimelineByFilter } from "../services/timelineService";
import type { TimelineFilter, TimeFilterType } from "../types/filter";
import type { DailyTimelineRes } from "../api/domain/daily/dto/res/DailyTimelineRes";

export const useTimeline = () => {
  const [data, setData] = useState<DailyTimelineRes | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState<TimelineFilter>({
    timeFilter: 'recent-8h',
    mediaName: null
  });

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await fetchTimelineByFilter(filter);
        setData(res);
      } catch (e) {
        console.error(e);
        setData(null);
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

  const refresh = () => {
    setFilter((prev) => ({ ...prev }));
  };

  return {
    timelineData: data,
    isLoading,
    filter,
    onTimeFilterChange: handleTimeFilterChange,
    onMediaFilterChange: handleMediaFilterChange,
    refresh
  };
};
