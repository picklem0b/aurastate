"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SettingsNode {
  id: string;
  label: string;
  description?: string;
  type: "group" | "toggle" | "slider" | "select";
  children?: SettingsNode[];
  value?: boolean | number | string;
  options?: string[];
  onChange?: (value: boolean | number | string) => void;
}

interface SettingsTreeProps {
  nodes: SettingsNode[];
  depth?: number;
}

/**
 * Settings Tree — Recursive nested settings renderer
 * Supports groups, toggles, sliders, and selects.
 */
export function SettingsTree({ nodes, depth = 0 }: SettingsTreeProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setExpanded((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <div className={cn("space-y-px", depth > 0 && "ml-4 border-l border-border pl-4")}>
      {nodes.map((node) => (
        <div key={node.id}>
          <div
            className={cn(
              "flex items-center justify-between px-3 py-3 rounded-xl hover:bg-elevated transition-colors",
              node.type === "group" && "cursor-pointer"
            )}
            onClick={() => node.type === "group" && toggle(node.id)}
            role={node.type === "group" ? "button" : undefined}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-display font-medium text-ink-primary">{node.label}</p>
              {node.description && (
                <p className="text-xs text-ink-muted mt-0.5">{node.description}</p>
              )}
            </div>

            {node.type === "group" && (
              <ChevronRight
                size={14}
                className={cn(
                  "text-ink-muted transition-transform duration-200",
                  expanded.has(node.id) && "rotate-90"
                )}
              />
            )}

            {node.type === "toggle" && (
              <button
                onClick={(e) => { e.stopPropagation(); node.onChange?.(!node.value); }}
                className={cn(
                  "relative w-10 h-5.5 rounded-full border transition-all duration-200 flex-shrink-0",
                  node.value
                    ? "bg-solar-400 border-solar-400"
                    : "bg-elevated border-border"
                )}
                aria-checked={!!node.value}
                role="switch"
              >
                <span
                  className={cn(
                    "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200",
                    node.value ? "left-5.5" : "left-0.5"
                  )}
                />
              </button>
            )}

            {node.type === "slider" && (
              <input
                type="range"
                min={0}
                max={100}
                value={node.value as number}
                onChange={(e) => node.onChange?.(Number(e.target.value))}
                onClick={(e) => e.stopPropagation()}
                className="w-24 accent-solar-400 flex-shrink-0"
              />
            )}
          </div>

          {node.type === "group" && expanded.has(node.id) && node.children && (
            <SettingsTree nodes={node.children} depth={depth + 1} />
          )}
        </div>
      ))}
    </div>
  );
}
