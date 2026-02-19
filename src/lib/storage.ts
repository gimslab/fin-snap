import type { ApiKeyConfig, AiProvider } from "@/types";

const STORAGE_KEY = "fin-snap:api-keys";

const DEFAULT_CONFIG: ApiKeyConfig = {
    activeProvider: "gemini",
};

/**
 * 브라우저 LocalStorage에서 API Key 설정을 불러옵니다.
 * SSR 환경(서버)에서는 기본값을 반환합니다.
 */
export function loadApiKeyConfig(): ApiKeyConfig {
    if (typeof window === "undefined") return DEFAULT_CONFIG;

    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return DEFAULT_CONFIG;
        return { ...DEFAULT_CONFIG, ...JSON.parse(raw) } as ApiKeyConfig;
    } catch {
        return DEFAULT_CONFIG;
    }
}

/**
 * API Key 설정을 브라우저 LocalStorage에 저장합니다.
 */
export function saveApiKeyConfig(config: Partial<ApiKeyConfig>): void {
    if (typeof window === "undefined") return;

    const current = loadApiKeyConfig();
    const updated = { ...current, ...config };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/**
 * 특정 공급자의 API Key를 반환합니다.
 */
export function getApiKey(provider: AiProvider): string | undefined {
    return loadApiKeyConfig()[provider];
}

/**
 * 저장된 API Key 설정을 모두 삭제합니다.
 */
export function clearApiKeyConfig(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
}
