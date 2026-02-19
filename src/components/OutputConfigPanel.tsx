"use client";

import { useState } from "react";
import type { OutputConfig, OutputSectionId } from "@/types";

interface OutputConfigPanelProps {
    config: OutputConfig;
    onToggle: (id: OutputSectionId) => void;
}

export function OutputConfigPanel({ config, onToggle }: OutputConfigPanelProps) {
    const [isOpen, setIsOpen] = useState(false);
    const enabledCount = config.filter((s) => s.enabled).length;

    return (
        <div className="output-config-wrap">
            <button
                className="output-config-trigger"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-controls="output-config-panel"
                id="output-config-btn"
            >
                <span className="output-config-icon">⚡</span>
                <span>출력 항목</span>
                <span className="output-config-count">{enabledCount}/{config.length}</span>
                <span className={`output-config-chevron ${isOpen ? "open" : ""}`}>▾</span>
            </button>

            {isOpen && (
                <div
                    className="output-config-panel anim-fade-in"
                    id="output-config-panel"
                    role="group"
                    aria-label="출력 항목 설정"
                >
                    <p className="output-config-hint">
                        검색 전에 원하는 항목을 켜고 꺼보세요. 설정은 자동 저장됩니다.
                    </p>
                    <div className="output-config-grid">
                        {config.map((section) => (
                            <button
                                key={section.id}
                                className={`output-section-chip ${section.enabled ? "enabled" : ""}`}
                                onClick={() => onToggle(section.id)}
                                aria-pressed={section.enabled}
                                title={section.description}
                            >
                                <span className="chip-emoji">{section.emoji}</span>
                                <span className="chip-label">{section.label}</span>
                                <span className="chip-toggle">
                                    {section.enabled ? "✓" : "+"}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
