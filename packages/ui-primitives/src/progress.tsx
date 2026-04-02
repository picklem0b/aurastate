import * as React from "react";
import { cn } from "./utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;  // 0–100
  variant?: "solar" | "green" | "red" | "blue";
  size?: "xs" | "sm" | "md";
}

const TRACK_COLORS = {
  solar: "bg-solar-400",
  green: "bg-aura-green",
  red:   "bg-aura-red",
  blue:  "bg-aura-blue",
};

const SIZES = {
  xs: "h-0.5",
  sm: "h-1",
  md: "h-2",
};

export function Progress({
  value,
  variant = "solar",
  size = "sm",
  className,
  ...props
}: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("w-full bg-elevated rounded-full overflow-hidden", SIZES[size], className)}
      {...props}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", TRACK_COLORS[variant])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
