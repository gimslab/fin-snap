import OpenAI from "openai";
import type { OutputConfig, StockSearchResult } from "@/types";
import { buildSystemPrompt, DEFAULT_OUTPUT_CONFIG } from "@/lib/output-sections";

const SYSTEM_PROMPT = `당신은 금융 정보 전문가입니다. 사용자가 주식 또는 ETF 종목명/티커를 입력하면,
아래 형식으로 핵심 투자 정보를 마크다운으로 요약해주세요.

## 📊 [종목명] ([티커]) 스냅샷

### 기본 정보
- **종목 유형**: 주식 / ETF / 기타
- **상장 거래소**: NASDAQ / NYSE / KRX / 기타
- **섹터/카테고리**: 예) 반도체, 성장 ETF, 배당 ETF

### 핵심 지표 (최신 기준 추정)
| 지표 | 값 |
|------|-----|
| 현재가 | $ / ₩ |
| 52주 최고 | |
| 52주 최저 | |
| PER (TTM) | |
| 배당수익률 | |
| 시가총액 | |

### 💡 한줄 요약
> 이 종목을 한 문장으로 설명하면?

### 📌 투자 포인트
- 포인트 1
- 포인트 2
- 포인트 3

### ⚠️ 리스크 요인
- 리스크 1
- 리스크 2

---
*이 정보는 AI가 학습 데이터를 기반으로 생성한 요약이며, 실시간 데이터가 아닐 수 있습니다. 투자 전 반드시 공식 정보를 확인하세요.*`;

export async function queryOpenAI(
    query: string,
    apiKey: string,
    outputConfig: OutputConfig = DEFAULT_OUTPUT_CONFIG
): Promise<StockSearchResult> {
    const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    const systemPrompt = buildSystemPrompt(outputConfig);

    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `종목 정보를 요약해주세요: ${query}` },
        ],
        temperature: 0.3,
    });

    const content = completion.choices[0]?.message?.content ?? "";

    return {
        query,
        provider: "openai",
        content,
        createdAt: new Date().toISOString(),
    };
}
