/**
 * 시간 범위 계산 유틸리티
 *
 * 시간은 2시간 단위로 구분:
 * 00:00~02:00, 02:00~04:00, ..., 22:00~00:00
 */

export interface TimeRange {
  date: string;
  from: string;
  to: string;
}

/**
 * 현재 시간 기준으로 이전 N시간의 범위를 계산합니다.
 */
export function getTimeRange(hoursAgo: number): TimeRange {
  const now = new Date();
  const currentHour = now.getHours();

  // 현재 구간의 시작 시간 (2시간 단위로 내림)
  const currentSlotStart = Math.floor(currentHour / 2) * 2;

  // 종료 시간
  const toDate = new Date(now);
  toDate.setHours(currentSlotStart, 0, 0, 0); //정시 세팅

  // 시작 시간
  const fromDate = new Date(toDate);
  fromDate.setHours(fromDate.getHours() - hoursAgo);

  const formatDateStr = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTimeStr = (d: Date) => {
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  };

  return {
    date: formatDateStr(toDate), //날짜 : 종료 날짜
    from: formatTimeStr(fromDate),
    to: formatTimeStr(toDate),
  };
}

/**
 * 오늘 전체 - 오늘 + 언론사 선택 시 사용
 */
export function getTodayRange(): TimeRange {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const date = `${year}-${month}-${day}`;

  return {
    date,
    from: "00:00",
    to: "23:59",
  };
}
