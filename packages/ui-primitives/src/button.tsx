import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-display font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar-400 disabled:opacity-30 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        solar:   "bg-solar-400 text-void hover:bg-solar-300 shadow-aura-solar",
        outline: "border border-border text-ink-primary hover:bg-elevated hover:border-solar-400/30",
        ghost:   "text-ink-secondary hover:text-ink-primary hover:bg-elevated",
        danger:  "bg-aura-red/10 border border-aura-red/30 text-aura-red hover:bg-aura-red/20",
      },
      size: {
        sm: "h-8  px-3   text-xs",
        md: "h-10 px-4   text-sm",
        lg: "h-12 px-6   text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "solar",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";
