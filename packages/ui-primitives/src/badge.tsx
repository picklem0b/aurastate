import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg px-2 py-0.5 text-xs font-mono tracking-wider transition-colors",
  {
    variants: {
      variant: {
        solar:  "bg-solar-400/10 border border-solar-400/30 text-solar-400",
        green:  "bg-aura-green/10 border border-aura-green/30 text-aura-green",
        red:    "bg-aura-red/10 border border-aura-red/30 text-aura-red",
        blue:   "bg-aura-blue/10 border border-aura-blue/30 text-aura-blue",
        muted:  "bg-elevated border border-border text-ink-muted",
      },
    },
    defaultVariants: { variant: "muted" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
