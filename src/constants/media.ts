/**
 * 언론사 정보
 */
export interface MediaInfo {
  code: string;
  name: string;
}

/**
 * 지원하는 언론사 목록
 */
export const MEDIA_LIST: MediaInfo[] = [
  { code: "056", name: "KBS" },
  { code: "214", name: "MBC" },
  { code: "001", name: "연합뉴스" },
  { code: "005", name: "국민일보" },
  { code: "011", name: "서울경제" },
  { code: "015", name: "한국경제" },
  { code: "020", name: "동아일보" },
  { code: "021", name: "문화일보" },
  { code: "022", name: "세계일보" },
  { code: "023", name: "조선일보" },
  { code: "025", name: "중앙일보" },
  { code: "448", name: "SBS" },
  { code: "079", name: "노컷뉴스" },
  { code: "138", name: "디지털데일리" },
  { code: "277", name: "아시아경제" },
  { code: "009", name: "매일경제" },
  { code: "469", name: "한국일보" },
];

/**
 * 언론사 코드로 이름 찾기
 */
export const getMediaNameByCode = (code: string): string | undefined => {
  return MEDIA_LIST.find((media) => media.code === code)?.name;
};

/**
 * 언론사 이름으로 코드 찾기
 */
export const getMediaCodeByName = (name: string): string | undefined => {
  return MEDIA_LIST.find((media) => media.name === name)?.code;
};
