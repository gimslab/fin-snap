"use client";

import { useState, useCallback } from "react";
import type { OutputConfig, OutputSectionId } from "@/types";
import { loadOutputConfig, saveOutputConfig } from "@/lib/storage";

/**
 * 출력 섹션 ON/OFF 설정을 LocalStorage와 동기화하여 관리하는 훅.
 */
export function useOutputConfig() {
    const [config, setConfig] = useState<OutputConfig>(() => loadOutputConfig());

    const toggle = useCallback((id: OutputSectionId) => {
        setConfig((prev) => {
            const updated = prev.map((s) =>
                s.id === id ? { ...s, enabled: !s.enabled } : s
            );
            saveOutputConfig(updated);
            return updated;
        });
    }, []);

    const enabledCount = config.filter((s) => s.enabled).length;

    return { config, toggle, enabledCount };
}
