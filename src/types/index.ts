/**
 * Fin-Snap 공통 타입 정의
 */

/** 지원하는 AI 공급자 */
export type AiProvider = "gemini" | "openai";

/** 사용자가 브라우저에 저장하는 API Key 설정 */
export interface ApiKeyConfig {
    gemini?: string;
    openai?: string;
    activeProvider: AiProvider;
}

/** 종목 정보 조회 요청 */
export interface StockSearchRequest {
    query: string; // 사용자가 입력한 종목명 또는 티커
    provider: AiProvider;
}

/** AI가 반환하는 종목 정보 응답 */
export interface StockSearchResult {
    query: string;
    provider: AiProvider;
    content: string; // 마크다운 형식의 AI 응답 텍스트
    createdAt: string; // ISO 8601
}

/** 검색 상태 */
export type SearchStatus = "idle" | "loading" | "success" | "error";
