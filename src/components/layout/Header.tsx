import styles from "./Header.module.css";
import { MEDIA_LIST } from "../../constants/media";
import type { TimeFilterType } from "../../types/filter";
import { UI_STATE } from "../../hooks/useTimelineStatus";

interface HeaderProps {
  onTimeFilterChange: (timeFilter: TimeFilterType) => void;
  onMediaFilterChange: (mediaName: string | null) => void;
  uiStatus: string;
}

export const Header = ({
  onTimeFilterChange,
  onMediaFilterChange,
  uiStatus,
}: HeaderProps) => {
  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as TimeFilterType;
    onTimeFilterChange(value);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onMediaFilterChange(value === "all" ? null : value);
  };

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.brand}>세상읽기.</div>
        <div className={styles.controls}>
          <select
            className={styles.select}
            onChange={handleTimeChange}
            defaultValue="recent-8h"
          >
            <option value="today">오늘</option>
            <option value="recent-2h">최근 2시간</option>
            <option value="recent-4h">최근 4시간</option>
            <option value="recent-8h">최근 8시간</option>
          </select>
          <select
            className={styles.select}
            onChange={handleMediaChange}
            defaultValue="all"
          >
            <option value="all">전체 언론사</option>
            {MEDIA_LIST.map((media) => (
              <option key={media.code} value={media.name}>
                {media.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.onair}>
        <span className={uiStatus === UI_STATE.IDLE ? styles.active : ""}>
          ● 기사 수집중
        </span>
        <span className={uiStatus === UI_STATE.COLLECTING ? styles.active : ""}>
          ● AI 요약중
        </span>
        <span className={uiStatus === UI_STATE.DEPLOYED ? styles.active : ""}>
          ● 기사 배포
        </span>
      </div>
    </header>
  );
};
