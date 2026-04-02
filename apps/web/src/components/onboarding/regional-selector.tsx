"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SUPPORTED_REGIONS, type RegionCode } from "@/lib/regions";
import { cn } from "@/lib/utils";

interface RegionalSelectorProps {
  onComplete: (data: { region: RegionCode; province: string }) => void;
}

/**
 * Regional Selector — Onboarding Card 2
 * Drives curriculum lock logic for the rest of onboarding.
 * Selecting South Africa exposes province picker with ZA_WC / ZA_GP etc.
 */
export function RegionalSelector({ onComplete }: RegionalSelectorProps) {
  const [country, setCountry] = useState<string>("");
  const [province, setProvince] = useState<string>("");

  const selectedCountry = SUPPORTED_REGIONS.find((r) => r.code === country);

  const handleSubmit = () => {
    if (!country) return;
    onComplete({
      region: `${country}_${province || "DEFAULT"}` as RegionCode,
      province,
    });
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 space-y-6 shadow-panel">
      <div>
        <p className="text-xs font-mono text-solar-400 uppercase tracking-widest">Card 2 · Region</p>
        <h2 className="mt-2 font-display text-xl font-bold text-ink-primary">
          Where are you studying?
        </h2>
        <p className="text-sm text-ink-secondary mt-1">
          This locks your curriculum to the correct standards.
        </p>
      </div>

      <div className="space-y-3">
        {/* Country */}
        <div className="relative">
          <select
            value={country}
            onChange={(e) => { setCountry(e.target.value); setProvince(""); }}
            className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-ink-primary appearance-none focus:outline-none focus:border-solar-400/50 transition-colors"
          >
            <option value="">Select country…</option>
            {SUPPORTED_REGIONS.map((r) => (
              <option key={r.code} value={r.code}>{r.flag} {r.name}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
        </div>

        {/* Province / State (if applicable) */}
        {selectedCountry?.provinces && selectedCountry.provinces.length > 0 && (
          <div className="relative">
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-ink-primary appearance-none focus:outline-none focus:border-solar-400/50 transition-colors"
            >
              <option value="">Select province…</option>
              {selectedCountry.provinces.map((p) => (
                <option key={p.code} value={p.code}>{p.name}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          </div>
        )}

        {/* Curriculum preview */}
        {country === "ZA" && province && (
          <div className="px-4 py-3 rounded-xl bg-aura-blue/5 border border-aura-blue/20 text-xs text-ink-secondary space-y-1">
            <p className="font-mono text-aura-blue uppercase tracking-widest text-[10px] mb-2">
              Curriculum Preview
            </p>
            <p>Board: CAPS / IEB</p>
            <p>4 Mandatory subjects locked</p>
            <p>3 Elective slots available</p>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!country}
        className="w-full py-3 rounded-xl bg-solar-400 text-void font-display font-semibold text-sm hover:bg-solar-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Confirm Region →
      </button>
    </div>
  );
}
