import { Layout } from "./components/layout/Layout";
import { MoodCard } from "./components/mood/MoodCard";
import { TimeGroup } from "./components/news/TimeGroup";
import { NewsCard } from "./components/news/NewsCard";
import type { DayMood, SocialAnalysis, NewsItem } from "./types";

function App() {
  const today = new Date().toISOString().split('T')[0];
  
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
      { label: "긍정도", value: 25, delta: -8,level: "낮음", levelType: "mid" },
      { label: "안정도", value: 15, level: "매우 낮음", levelType: "low" },
    ],
  };

  const newsItems: NewsItem[] = Array(3)
    .fill({
      id: "1",
      press: "뉴스1",
      title: "달러 유입 빗장 푼다…외환 규제 완화",
      summary:
        "정부는 최근 환율 급등의 원인을 구조적인 외화 수급 불균형으로 판단하고, 외국계 은행 선물환 포지션 한도 확대 등 외환건전성 제도 조정을 발표했다. 이에 따라 은행권 달러 공급 여력이 확대되고 수출기업의 외화 조달 부담이 완화될 것으로 기대된다는 평가가 나온다.",
      likes: 12,
      time: "02:00",
      comments: [
        { id: "c1", author: "익명", content: "환율 진짜 심각하다" },
        { id: "c2", author: "익명", content: "단기 처방 같음" },
      ],
    })
    .map((item, i) => ({ ...item, id: `news-${i}` }));

  return (
    <Layout>
      <MoodCard data={moodData} />

      <TimeGroup time="02:00 – 02:59">
        <NewsCard data={newsItems[0]} />
        <br />
        <NewsCard data={newsItems[1]} />
      </TimeGroup>

      <TimeGroup time="01:00 – 01:59">
        <NewsCard data={newsItems[2]} />
        <br />
        <NewsCard data={newsItems[0]} />
      </TimeGroup>
    </Layout>
  );
}

export default App;
