"use client";

import { useState, useCallback } from "react";
import type { SearchStatus, StockSearchResult, AiProvider } from "@/types";

/**
 * 종목 검색 상태를 관리하는 커스텀 Hook.
 * AI 서비스 연동 후 실제 fetch 로직이 추가될 예정입니다.
 *
 * @example
 * const { status, result, search, reset } = useSearch();
 */
export function useSearch() {
    const [status, setStatus] = useState<SearchStatus>("idle");
    const [result, setResult] = useState<StockSearchResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const search = useCallback(
        async (query: string, provider: AiProvider, apiKey: string) => {
            if (!query.trim()) return;

            setStatus("loading");
            setError(null);
            setResult(null);

            try {
                // TODO: AI 서비스 연동 후 실제 API 호출로 교체
                // const response = await callAiService({ query, provider, apiKey });
                console.log("search called:", { query, provider, apiKey: apiKey ? "***" : "none" });

                // 임시 플레이스홀더
                await new Promise((r) => setTimeout(r, 500));
                throw new Error("AI 서비스가 아직 연동되지 않았습니다.");
            } catch (err) {
                setStatus("error");
                setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
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
