import type { OutputConfig, OutputSection } from "@/types";

/** 사용 가능한 모든 출력 섹션 (기본값 포함) */
export const DEFAULT_OUTPUT_CONFIG: OutputConfig = [
    {
        id: "basic_info",
        label: "기본 정보",
        emoji: "📋",
        description: "종목 유형, 상장 거래소, 섹터",
        enabled: true,
    },
    {
        id: "key_metrics",
        label: "핵심 지표",
        emoji: "📊",
        description: "현재가, PER, 배당수익률, 시가총액",
        enabled: true,
    },
    {
        id: "summary",
        label: "한줄 요약",
        emoji: "💡",
        description: "이 종목을 한 문장으로",
        enabled: true,
    },
    {
        id: "investment_points",
        label: "투자 포인트",
        emoji: "📌",
        description: "핵심 투자 이유",
        enabled: true,
    },
    {
        id: "risk_factors",
        label: "리스크 요인",
        emoji: "⚠️",
        description: "주요 투자 위험",
        enabled: true,
    },
    {
        id: "dividend_detail",
        label: "배당 상세",
        emoji: "💰",
        description: "배당 이력, 성장률, 지급 빈도",
        enabled: false,
    },
    {
        id: "financials",
        label: "재무 요약",
        emoji: "🏦",
        description: "최근 5년 분기별 재무 추세 그래프",
        enabled: false,
    },
];

/** 섹션 설정을 기반으로 시스템 프롬프트를 동적으로 생성합니다 */
export function buildSystemPrompt(config: OutputConfig): string {
    const enabled = config.filter((s) => s.enabled);

    const sectionBlocks: string[] = [];

    for (const section of enabled) {
        switch (section.id) {
            case "basic_info":
                sectionBlocks.push(`### 기본 정보
- **종목 유형**: 주식 / ETF / 기타
- **상장 거래소**: NASDAQ / NYSE / KRX / 기타
- **섹터/카테고리**: 예) 반도체, 성장 ETF, 배당 ETF`);
                break;

            case "key_metrics":
                sectionBlocks.push(`### 📊 핵심 지표 (실시간 검색 기반)
| 지표 | 값 |
|------|-----|
| 현재가 | $ / ₩ |
| PER (TTM) | |
| 배당수익률 | |
| 시가총액 | |`);
                break;

            case "summary":
                sectionBlocks.push(`### 💡 한줄 요약
> 이 종목을 한 문장으로 설명하면?`);
                break;

            case "investment_points":
                sectionBlocks.push(`### 📌 투자 포인트
- 포인트 1
- 포인트 2
- 포인트 3`);
                break;

            case "risk_factors":
                sectionBlocks.push(`### ⚠️ 리스크 요인
- 리스크 1
- 리스크 2`);
                break;

            case "dividend_detail":
                sectionBlocks.push(`### 💰 배당 상세
| 항목 | 값 |
|------|-----|
| 연간 배당금 | |
| 배당 성장률 (5년) | |
| 지급 빈도 | 분기 / 월 / 반기 / 연 |
| 최근 배당락일 | |
| 배당 지속 연수 | |`);
                break;

            case "financials":
                sectionBlocks.push(`### 🏦 재무 요약 (최근 분기별 추세, 최대 5년 20분기)
반드시 다음 형식의 JSON 코드블록 안에 데이터를 작성해야 합니다. 과거 5년간(최소 12~20개 분기)의 지표를 "모두" 빠짐없이 배열에 담아주세요. 단 1~2개의 분기점만 반환해서는 안 됩니다.
\`\`\`json
[
  { "quarter": "22Q1", "revenue": 1000, "opIncome": 100, "netIncome": 80, "debtRatio": 120, "roe": 15 },
  { "quarter": "22Q2", "revenue": 1100, "opIncome": 110, "netIncome": 85, "debtRatio": 118, "roe": 15.5 },
  // ... 최소 10개 이상의 과거 분기 데이터를 반드시 추가하세요! ...
]
\`\`\`
단위는 생략하고 순수 숫자만 값으로 넣으세요. 데이터가 없는 구간은 0 또는 근사치로 기입하며, 오래된 과거 분기부터 가장 최근 분기순(과거->현재)으로 배열이 끝나야 합니다.`);
                break;

        }
    }

    return `당신은 금융 정보 전문가입니다. 사용자가 주식 또는 ETF 종목명/티커를 입력하면,
Google 검색을 통해 수집한 최신 정보를 바탕으로 아래 형식으로 핵심 투자 정보를 마크다운으로 요약해주세요.

## 📊 [종목명] ([티커]) 스냅샷

${sectionBlocks.join("\n\n")}

---
*이 정보는 Google 검색을 통해 수집한 최신 데이터를 기반으로 AI가 요약한 것입니다. 투자 전 반드시 공식 정보를 확인하세요.*`;
}

/** 저장된 ID 목록을 기반으로 설정을 복원합니다 */
export function mergeWithDefaults(
    saved: Partial<Record<string, boolean>>
): OutputConfig {
    return DEFAULT_OUTPUT_CONFIG.map((section) => ({
        ...section,
        enabled: saved[section.id] ?? section.enabled,
    }));
}
