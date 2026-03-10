import { DailyTimelineAPI } from "../api/domain/daily/API";
import type { DailyTimelineRes } from "../api/domain/daily/dto/res/DailyTimelineRes";
import type { NewsInsightRes } from "../api/domain/daily/dto/res/NewsInsightRes";
import type { TimelineFilter } from "../types/filter";
import { getTimeRange, getTodayRange } from "../utils/time";

/**
 * 초기 접속 (기본값 - 8h, 전체 언론사)
 * 시간 범위 선택 시(2h, 4h, 8h): GET /api/v1/daily/timeline/range
 * 오늘 선택 시 : GET /api/v1/daily/timeline/init
 * 언론사 선택: GET /api/v1/daily/timeline/range/press
 */
export async function fetchTimelineByFilter(
  filter: TimelineFilter
): Promise<DailyTimelineRes | null> {
  try {
    if (filter.timeFilter === "today" && !filter.mediaName) {
      const res = await DailyTimelineAPI.getInitTimeline();
      //console.log("오늘 API 호출:", res.data);
      if (!res.result) {
        console.error("API 실패:", res.reason);
        return null;
      }
      return res.data ?? null;
    }

    // 시간 범위 계산
    let timeRange;
    switch (filter.timeFilter) {
      case "recent-2h":
        timeRange = getTimeRange(2);
        break;
      case "recent-4h":
        timeRange = getTimeRange(4);
        break;
      case "recent-8h":
        timeRange = getTimeRange(8);
        break;
      case "today":
        timeRange = getTodayRange();
        break;
      default:
        return null;
    }

    // 언론사 선택: /timeline/range/press
    if (filter.mediaName) {
      const params = {
        date: timeRange.date,
        from: timeRange.from,
        to: timeRange.to,
        press: filter.mediaName,
      };
      //console.log("언론사 필터 API 호출 파라미터:", params);
      const res = await DailyTimelineAPI.getTimelineRangeByPress(params);
      //console.log("언론사 필터 API 호출:", res.data);
      if (!res.result) {
        console.error("API 실패:", res.reason);
        return null;
      }
      return res.data ?? null;
    }

    // 시간만 선택 + 언론사 전체: /timeline/range
    const params = {
      date: timeRange.date,
      from: timeRange.from,
      to: timeRange.to,
    };
    //console.log("시간 필터 API 호출 파라미터:", params);
    const res = await DailyTimelineAPI.getTimelineRange(params);
    //console.log("시간 필터 API 호출:", res.data);
    if (!res.result) {
      console.error("API 실패:", res.reason);
      return null;
    }
    return res.data ?? null;
  } catch (error) {
    console.error("타임라인 조회 중 오류:", error);
    return null;
  }
}

/**
 * 오늘의 뉴스 분석 인사이트 조회
 */
export async function fetchNewsInsight(): Promise<NewsInsightRes | null> {
  try {
    const res = await DailyTimelineAPI.getNewsInsight();
    if (!res.result) {
      console.error("인사이트 조회 실패:", res.reason);
      return null;
    }
    return res.data ?? null;
  } catch (error) {
    console.error("인사이트 조회 중 오류:", error);
    return null;
  }
}
