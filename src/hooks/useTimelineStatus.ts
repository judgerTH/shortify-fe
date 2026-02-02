import { useState, useEffect, useRef } from "react";

export const UI_STATE = {
  IDLE: "수집중", // 평상시 (수집중)
  COLLECTING: "요약중", // COLLECTING 수신 후
  DEPLOYED: "배포", // DEPLOYED 수신 후 (10분간 유지)
} as const;

export type UiStatusType = (typeof UI_STATE)[keyof typeof UI_STATE];

const SERVER_EVENT = {
  COLLECTING: "COLLECTING",
  DEPLOYED: "DEPLOYED",
};

export const useTimelineStatus = (fetchTimeline: () => void) => {
  // 초기값: 수집중
  const [uiStatus, setUiStatus] = useState<UiStatusType>(UI_STATE.IDLE);

  // 타이머 참조 변수
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 초기 한번만 실행되도록
  useEffect(() => {
    // SSE 연결 설정
    const eventSource = new EventSource("/v1/daily/timeline/sse");

    eventSource.onmessage = (event) => {
      try {
        const { phase } = JSON.parse(event.data);
        console.log(phase);
        if (phase === SERVER_EVENT.COLLECTING) {
          setUiStatus(UI_STATE.COLLECTING);

          // 타이머가 돌고 있었다면 제거
          if (timerRef.current) clearTimeout(timerRef.current);
        } else if (phase === SERVER_EVENT.DEPLOYED) {
          setUiStatus(UI_STATE.DEPLOYED);
          fetchTimeline();

          // [규칙] 10분(600,000ms) 후 다시 수집중으로 변경하는 타이머 설정
          if (timerRef.current) clearTimeout(timerRef.current); // 이전 타이머 초기화
          timerRef.current = setTimeout(() => {
            setUiStatus(UI_STATE.IDLE);
            console.log("10분이 경과하여 '수집중' 상태로 복귀합니다.");
          }, 10 * 60 * 1000);
        }
      } catch (e) {
        console.error("Failed to parse SSE message", e);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE 연결 오류:", error);
      eventSource.close();
    };

    // 컴포넌트 언마운트 시 정리
    return () => {
      eventSource.close();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [fetchTimeline]);

  return uiStatus;
};
