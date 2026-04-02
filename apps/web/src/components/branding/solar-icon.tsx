import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

interface SolarIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  glowing?: boolean;
}

/**
 * AuraState Solar Core Icon
 * The brand mark. A radiant solar geometry.
 */
export function SolarIcon({ size = 32, glowing = false, className, ...props }: SolarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(glowing && "drop-shadow-[0_0_12px_rgba(255,194,0,0.6)]", className)}
      {...props}
    >
      {/* Outer ring */}
      <circle cx="20" cy="20" r="18" stroke="#FFC200" strokeWidth="1.5" strokeDasharray="4 2" />
      {/* Core */}
      <circle cx="20" cy="20" r="8" fill="#FFC200" />
      {/* Solar rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="20"
          y1="20"
          x2={20 + 13 * Math.cos((deg * Math.PI) / 180)}
          y2={20 + 13 * Math.sin((deg * Math.PI) / 180)}
          stroke="#FFC200"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={deg % 90 === 0 ? 1 : 0.5}
        />
      ))}
    </svg>
  );
}
