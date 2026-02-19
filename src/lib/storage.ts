import type { ApiKeyConfig, AiProvider } from "@/types";
import { DEFAULT_OUTPUT_CONFIG, mergeWithDefaults } from "@/lib/output-sections";

const STORAGE_KEY = "fin-snap:api-keys";
const OUTPUT_CONFIG_KEY = "fin-snap:output-config";


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

/**
 * 출력 섹션 설정을 불러옵니다.
 */
export function loadOutputConfig() {
    if (typeof window === "undefined") return DEFAULT_OUTPUT_CONFIG;
    try {
        const raw = localStorage.getItem(OUTPUT_CONFIG_KEY);
        if (!raw) return DEFAULT_OUTPUT_CONFIG;
        return mergeWithDefaults(JSON.parse(raw));
    } catch {
        return DEFAULT_OUTPUT_CONFIG;
    }
}

/**
 * 출력 섹션 설정을 저장합니다. (id → enabled 맵만 저장)
 */
export function saveOutputConfig(config: typeof DEFAULT_OUTPUT_CONFIG): void {
    if (typeof window === "undefined") return;
    const slim = Object.fromEntries(config.map((s) => [s.id, s.enabled]));
    localStorage.setItem(OUTPUT_CONFIG_KEY, JSON.stringify(slim));
}

