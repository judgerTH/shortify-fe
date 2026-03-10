import { Layout } from "./components/layout/Layout";
import { Header } from "./components/layout/Header";
import { MoodCard } from "./components/mood/MoodCard";
import { TimelineList } from "./components/news/TimelineList";
import { useTimeline } from "./hooks/useTimeline";
import { useTimelineStatus } from "./hooks/useTimelineStatus";
import { MOCK_MOOD_DATA } from "./mocks/mood";

function App() {
  const { 
    timelineData, 
    newsInsight,
    isLoading, 
    onTimeFilterChange, 
    onMediaFilterChange,
    refresh
  } = useTimeline();

  const uiStatus = useTimelineStatus(refresh);

  // API 데이터를 MoodCard 형식으로 변환
  const moodData = newsInsight ? {
    date: newsInsight.createdAt.split('T')[0],
    summary: newsInsight.summary,
    scores: [
      { label: "긴장도", value: newsInsight.tension, delta: newsInsight.tensionDiff },
      { label: "긍정도", value: newsInsight.positivity, delta: newsInsight.positivityDiff },
      { label: "안정도", value: newsInsight.stability, delta: newsInsight.stabilityDiff },
    ]
  } : MOCK_MOOD_DATA;

  return (
    <Layout 
      header={
        <Header 
          onTimeFilterChange={onTimeFilterChange}
          onMediaFilterChange={onMediaFilterChange}
          uiStatus={uiStatus}
        />
      }
    >
      <MoodCard data={moodData as any} />
      <TimelineList data={timelineData} isLoading={isLoading} />
    </Layout>
  );
}

export default App;
