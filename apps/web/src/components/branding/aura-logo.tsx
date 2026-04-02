import { SolarIcon } from "./solar-icon";
import { cn } from "@/lib/utils";

interface AuraLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function AuraLogo({ size = "md", showText = true, className }: AuraLogoProps) {
  const iconSize = { sm: 20, md: 28, lg: 40 }[size];
  const textSize = { sm: "text-base", md: "text-xl", lg: "text-3xl" }[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <SolarIcon size={iconSize} glowing />
      {showText && (
        <span className={cn("font-display font-bold tracking-tight text-ink-primary", textSize)}>
          Aura<span className="text-solar-400">State</span>
        </span>
      )}
    </div>
  );
}
