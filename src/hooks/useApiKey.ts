"use client";

import { useState, useCallback } from "react";
import type { AiProvider, ApiKeyConfig } from "@/types";
import { loadApiKeyConfig, saveApiKeyConfig, clearApiKeyConfig } from "@/lib/storage";

/**
 * API Key를 브라우저 LocalStorage와 동기화하여 관리하는 커스텀 Hook.
 *
 * @example
 * const { config, setKey, setProvider, clear } = useApiKey();
 */
export function useApiKey() {
    const [config, setConfig] = useState<ApiKeyConfig>(() => loadApiKeyConfig());

    const setKey = useCallback((provider: AiProvider, key: string) => {
        setConfig((prev) => {
            const updated = { ...prev, [provider]: key };
            saveApiKeyConfig(updated);
            return updated;
        });
    }, []);

    const setProvider = useCallback((provider: AiProvider) => {
        setConfig((prev) => {
            const updated = { ...prev, activeProvider: provider };
            saveApiKeyConfig(updated);
            return updated;
        });
    }, []);

    const clear = useCallback(() => {
        clearApiKeyConfig();
        setConfig({ activeProvider: "gemini" });
    }, []);

    const hasKey = useCallback(
        (provider?: AiProvider) => {
            const target = provider ?? config.activeProvider;
            return Boolean(config[target]);
        },
        [config]
    );

    return { config, setKey, setProvider, clear, hasKey };
}
