import type { DayMood } from "../types";

const today = new Date().toISOString().split("T")[0];

export const MOCK_MOOD_DATA: DayMood = {
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
