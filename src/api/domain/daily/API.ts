import { CommonAPI } from "../../common/CommonAPI";
import type { API_RESPONSE } from "../../common/API_RESPONSE";
import type { DailyTimelineRes } from "./dto/res/DailyTimelineRes";
import type { TimelineRangePressReq } from "./dto/req/TimelineRangeReq";
import type { TimelineRangeReq } from "./dto/req/TimelineRangeReq";

class DailyAPI extends CommonAPI {
  private static instance?: DailyAPI;

  private constructor() {
    super("/api/v1/daily");
  }

  static getInstance(): DailyAPI {
    if (!this.instance) {
      this.instance = new DailyAPI();
    }
    return this.instance;
  }

  /**
   * 초기 타임라인 조회
   * - 현재 시점 기준
   * - 최신 기사 100건
   * - 파라미터 없음
   */
  getInitTimeline(): Promise<API_RESPONSE<DailyTimelineRes>> {
    return this.get<DailyTimelineRes>("/timeline/init");
  }

  /**
   * 시간 범위별 타임라인 조회
   */
  getTimelineRange(
    req: TimelineRangeReq
  ): Promise<API_RESPONSE<DailyTimelineRes>> {
    return this.get<DailyTimelineRes>("/timeline/range", {
      params: req,
    });
  }

  /**
   * 특정 언론사 시간대별 타임라인 조회
   */
  getTimelineRangeByPress(
    req: TimelineRangePressReq
  ): Promise<API_RESPONSE<DailyTimelineRes>> {
    return this.get<DailyTimelineRes>("/timeline/range/press", {
      params: req,
    });
  }
}

export const DailyTimelineAPI = DailyAPI.getInstance();
