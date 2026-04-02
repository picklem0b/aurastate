import * as React from "react";
import { cn } from "./utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-mono text-ink-muted uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full bg-elevated border rounded-xl px-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted",
            "focus:outline-none focus:border-solar-400/50 transition-colors duration-150",
            error ? "border-aura-red/50" : "border-border",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-aura-red">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
