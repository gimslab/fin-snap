import type { AiProvider, OutputConfig, StockSearchResult } from "@/types";
import { DEFAULT_OUTPUT_CONFIG } from "@/lib/output-sections";
import { queryGemini } from "./gemini";
import { queryOpenAI } from "./openai";

export async function queryAi(
    query: string,
    provider: AiProvider,
    apiKey: string,
    outputConfig: OutputConfig = DEFAULT_OUTPUT_CONFIG
): Promise<StockSearchResult> {
    if (provider === "gemini") {
        return queryGemini(query, apiKey, outputConfig);
    } else {
        return queryOpenAI(query, apiKey, outputConfig);
    }
}
