"use client";

import { useState, useCallback } from "react";
import type { OutputConfig, SearchStatus, StockSearchResult, AiProvider } from "@/types";
import { DEFAULT_OUTPUT_CONFIG } from "@/lib/output-sections";
import { queryAi } from "@/lib/ai";

/**
 * 종목 검색 상태를 관리하는 커스텀 Hook.
 */
export function useSearch() {
    const [status, setStatus] = useState<SearchStatus>("idle");
    const [result, setResult] = useState<StockSearchResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const search = useCallback(
        async (
            query: string,
            provider: AiProvider,
            apiKey: string,
            outputConfig: OutputConfig = DEFAULT_OUTPUT_CONFIG
        ) => {
            if (!query.trim()) return;

            setStatus("loading");
            setError(null);
            setResult(null);

            try {
                const data = await queryAi(query, provider, apiKey, outputConfig);
                setResult(data);
                setStatus("success");
            } catch (err) {
                setStatus("error");
                const msg = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
                setError(msg);
            }
        },
        []
    );

    const reset = useCallback(() => {
        setStatus("idle");
        setResult(null);
        setError(null);
    }, []);

    return { status, result, error, search, reset };
}
