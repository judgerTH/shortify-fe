import { Layout } from "./components/layout/Layout";
import { Header } from "./components/layout/Header";
import { MoodCard } from "./components/mood/MoodCard";
import { TimelineList } from "./components/news/TimelineList";
import { useTimeline } from "./hooks/useTimeline";
import { MOCK_MOOD_DATA } from "./mocks/mood";

function App() {
  const { 
    timelineData, 
    isLoading, 
    onTimeFilterChange, 
    onMediaFilterChange 
  } = useTimeline();

  return (
    <Layout 
      header={
        <Header 
          onTimeFilterChange={onTimeFilterChange}
          onMediaFilterChange={onMediaFilterChange}
        />
      }
    >
      <MoodCard data={MOCK_MOOD_DATA} />
      <TimelineList data={timelineData} isLoading={isLoading} />
    </Layout>
  );
}

export default App;
