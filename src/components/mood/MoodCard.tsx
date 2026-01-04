import { useState } from "react";
import type { DayMood } from "../../types";
import styles from "./MoodCard.module.css";

interface MoodCardProps {
  data: DayMood;
}

export const MoodCard = ({ data }: MoodCardProps) => {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{data.date}</h2>
        <div className={styles.infoBtn} onClick={() => setInfoOpen(!infoOpen)}>
          ⓘ
        </div>
      </div>
      <div className={styles.scoreList}>
        {data.scores.map((score) => (
          <div key={score.label} className={styles.scoreItem}>
            <div className={styles.scoreLabel}>
              <span>
                {score.label} {score.value}%
                {score.delta !== undefined && (
                  <span className={`${styles.delta} ${score.delta > 0 ? styles.up : styles.down}`}>
                    ({score.delta > 0 ? "+" : ""}
                    {score.delta})
                  </span>
                )}
              </span>
            </div>
            <div className={styles.bar}>
              <span style={{ width: `${score.value}%` }}></span>
            </div>
          </div>
        ))}
      </div>

      {data.summary && (
        <div className={styles.summary}>
            <strong>요약: </strong>
            <span dangerouslySetInnerHTML={{ __html: data.summary }}></span>
            
            {data.analysis && (
                <div className={styles.analysisContent}>
                    {data.analysis}
                </div>
            )}
        </div>
      )}

      <div className={`${styles.moodInfo} ${infoOpen ? styles.open : ""}`}>
        <strong>사회 분위기 지표란?</strong>
        <br />
        <br />
        최근 2시간 동안 수집된 뉴스 제목과 요약을 AI가 분석해 사회 전반의 흐름을
        수치로 표현한 참고 지표입니다.
        <br />
        <br />
        <strong>· 긴장도</strong>
        <br />
        정치·사법·외교·안보 등 갈등성 이슈가 많을수록 높아집니다.
        <br />
        <br />
        <strong>· 긍정도</strong>
        <br />
        성과, 개선, 회복, 안정 관련 보도가 많을수록 높아집니다.
        <br />
        <br />
        <strong>· 안정도</strong>
        <br />
        사건·위기 보도보다 일상·정책·중립 기사 비중이 높을수록 올라갑니다.
        <br />
        <br />※ 특정 사실이나 여론을 단정하지 않으며 뉴스 흐름을 이해하기 위한
        참고용 지표입니다.
      </div>
    </section>
  );
};
