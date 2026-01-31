import { useState, Children, type ReactNode } from "react";
import styles from "./TimeGroup.module.css";

interface TimeGroupProps {
  time: string;
  children: ReactNode;
}

export const TimeGroup = ({ time, children }: TimeGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const items = Children.toArray(children);
  
  // 5개 이상이면 처음엔 5개만 보여줌
  const visibleItems = isExpanded || items.length <= 5 
    ? items 
    : items.slice(0, 5);

  return (
    <section className={styles.group}>
      <div className={styles.title}>{time}</div>
      {visibleItems}
      
      {!isExpanded && items.length > 5 && (
        <button 
          className={styles.moreBtn} 
          onClick={() => setIsExpanded(true)}
        >
          더보기 ({items.length - 5}개)
        </button>
      )}
    </section>
  );
};
