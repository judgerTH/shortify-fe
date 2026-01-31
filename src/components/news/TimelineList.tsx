import { TimeGroup } from "./TimeGroup";
import { NewsCard } from "./NewsCard";
import type { DailyTimelineRes } from "../../api/domain/daily/dto/res/DailyTimelineRes";

interface TimelineListProps {
  data: DailyTimelineRes | null;
  isLoading: boolean;
}

export const TimelineList = ({ data, isLoading }: TimelineListProps) => {
  if (isLoading) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
        데이터 로딩 중...
      </div>
    );
  }

  if (!data || !data.groups || data.groups.length === 0) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center", color: "#666" }}>
        <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "bold" }}>
          조건에 해당하는 뉴스가 없습니다.
        </div>
        <div style={{ fontSize: "14px", color: "#999" }}>
          다른 시간대나 언론사를 선택해보세요.
        </div>
      </div>
    );
  }

  return (
    <>
      {data.groups.map((group, groupIndex) => (
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
                  time: article.publishedAt.substring(11, 16),
                  comments: [],
                  originalUrl: article.originalUrl,
                  publishedAt: article.publishedAt,
                }}
              />
            </div>
          ))}
        </TimeGroup>
      ))}
    </>
  );
};
