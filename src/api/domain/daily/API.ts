import { CommonAPI } from "../../common/CommonAPI";
import type { API_RESPONSE } from "../../common/API_RESPONSE";
import type { DailyTimelineReq } from "./dto/req/DailyTimelineReq";
import type { DailyTimelineRes } from "./dto/res/DailyTimelineRes";

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
     * - 최신 요약 기사 기준
     * - 인피니티 스크롤 대응
     */
    getTimeline(
        req?: DailyTimelineReq
    ): Promise<API_RESPONSE<DailyTimelineRes>> {
        return this.get<DailyTimelineRes>("/timeline", {
            params: {
                page: req?.page ?? 0,
                size: req?.size ?? 100,
            },
        });
    }
}

export const DailyTimelineAPI = DailyAPI.getInstance();
