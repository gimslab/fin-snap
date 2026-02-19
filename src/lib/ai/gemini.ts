import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GroundingSource, OutputConfig, StockSearchResult } from "@/types";
import { buildSystemPrompt, DEFAULT_OUTPUT_CONFIG } from "@/lib/output-sections";

export async function queryGemini(
    query: string,
    apiKey: string,
    outputConfig: OutputConfig = DEFAULT_OUTPUT_CONFIG
): Promise<StockSearchResult> {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        // SDK 타입은 googleSearchRetrieval이지만, gemini-2.5-flash는 googleSearch를 요구함
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tools: [{ googleSearch: {} } as any],
    });

    const systemPrompt = buildSystemPrompt(outputConfig);

    const result = await model.generateContent({
        contents: [
            {
                role: "user",
                parts: [{ text: `종목 정보를 요약해주세요: ${query}` }],
            },
        ],
        systemInstruction: systemPrompt,
    });

    const content = result.response.text();

    // Search Grounding 출처 추출
    const groundingMetadata = result.response.candidates?.[0]?.groundingMetadata;
    const sources: GroundingSource[] =
        groundingMetadata?.groundingChunks
            ?.map((chunk) => ({
                title: chunk.web?.title ?? "",
                url: chunk.web?.uri ?? "",
            }))
            .filter((s) => s.url) ?? [];

    return {
        query,
        provider: "gemini",
        content,
        createdAt: new Date().toISOString(),
        sources: sources.length > 0 ? sources : undefined,
    };
}
