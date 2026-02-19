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

/** Search Grounding에서 반환된 출처 정보 */
export interface GroundingSource {
    title: string;
    url: string;
}

/** AI가 반환하는 종목 정보 응답 */
export interface StockSearchResult {
    query: string;
    provider: AiProvider;
    content: string; // 마크다운 형식의 AI 응답 텍스트
    createdAt: string; // ISO 8601
    sources?: GroundingSource[]; // Search Grounding 출처 (있을 경우)
}

/** 검색 상태 */
export type SearchStatus = "idle" | "loading" | "success" | "error";

/** 출력 섹션 ID */
export type OutputSectionId =
    | "basic_info"
    | "key_metrics"
    | "summary"
    | "investment_points"
    | "risk_factors"
    | "dividend_detail"
    | "financials"
    | "technical";

/** 출력 섹션 하나 */
export interface OutputSection {
    id: OutputSectionId;
    label: string;
    emoji: string;
    description: string;
    enabled: boolean;
}

/** 전체 출력 설정 */
export type OutputConfig = OutputSection[];

