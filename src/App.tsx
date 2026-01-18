import { useState, useEffect } from "react";
import { Layout } from "./components/layout/Layout";
import { MoodCard } from "./components/mood/MoodCard";
import { TimeGroup } from "./components/news/TimeGroup";
import { NewsCard } from "./components/news/NewsCard";
import type { DayMood, NewsItem } from "./types";
import { DailyTimelineAPI } from "./api/domain/daily/API";
import type { DailyTimelineRes } from "./api/domain/daily/dto/res/DailyTimelineRes";

function App() {
  const today = new Date().toISOString().split("T")[0];

  const [timelineData, setTimelineData] = useState<DailyTimelineRes | null>(
    null
  );

  // 컴포넌트 마운트 시 자동 실행
  useEffect(() => {
    const fetchTimeline = async () => {
      const res = await DailyTimelineAPI.getInitTimeline();

      if (!res.result) {
        console.error("API 실패", res.reason);
        return;
      }

      console.log("API 성공", res.data);
      if (res.data) {
        setTimelineData(res.data);
      }
    };

    fetchTimeline();
  }, []);

  const moodData: DayMood = {
    date: today,
    summary: "현재 사회 분위기는 정치·환율 이슈 중심의 높은 긴장 국면입니다.",
    analysis:
      "정치권 사법 이슈와 환율 급등에 따른 정부 대응이 동시에 보도되며 전반적으로 긴장도는 높고 안정성은 낮은 흐름이 이어지고 있습니다.",
    scores: [
      {
        label: "긴장도",
        value: 90,
        delta: 12,
        level: "매우 높음",
        levelType: "high",
      },
      {
        label: "긍정도",
        value: 25,
        delta: -8,
        level: "낮음",
        levelType: "mid",
      },
      { label: "안정도", value: 15, level: "매우 낮음", levelType: "low" },
    ],
  };

  return (
    <Layout>
      <MoodCard data={moodData} />

      {timelineData && Array.isArray(timelineData.groups) ? (
        timelineData.groups.map((group, groupIndex) => (
          <TimeGroup key={groupIndex} time={group.timeRange}>
            {group.articles.map((article) => (
              <div key={article.id} style={{ marginBottom: "16px" }}>
                <NewsCard
                  data={{
                    id: String(article.id),
                    media: article.media,
                    title: article.title,
                    summary: article.summary,
                    likes: article.likes,
                    time: article.publishedAt.substring(11, 16), // "00:00"
                    comments: [], //아직없음
                    originalUrl: article.originalUrl,
                  }}
                />
              </div>
            ))}
          </TimeGroup>
        ))
      ) : (
        <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
          {timelineData ? "표시할 뉴스가 없습니다." : "데이터 로딩 중..."}
        </div>
      )}
    </Layout>
  );
}

export default App;
