"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

export type ShapeKind = "sparkle" | "circle" | "triangle" | "squiggle" | "plus" | "half";

const INK = "#111111";

function ShapeSvg({ kind, color, size }: { kind: ShapeKind; color: string; size: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    style: { filter: `drop-shadow(3px 3px 0 ${INK})`, overflow: "visible" as const },
  };
  const stroke = { stroke: INK, strokeWidth: 3, vectorEffect: "non-scaling-stroke" as const, strokeLinejoin: "round" as const };

  switch (kind) {
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M50 2 C55 36 64 45 98 50 C64 55 55 64 50 98 C45 64 36 55 2 50 C36 45 45 36 50 2Z" fill={color} {...stroke} />
        </svg>
      );
    case "circle":
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="46" fill={color} {...stroke} />
          <circle cx="36" cy="36" r="9" fill="#FFF8E7" {...stroke} />
        </svg>
      );
    case "triangle":
      return (
        <svg {...common}>
          <polygon points="50,6 96,92 4,92" fill={color} {...stroke} />
        </svg>
      );
    case "squiggle":
      return (
        <svg {...common} viewBox="0 0 100 50" height={size / 2}>
          <path d="M6 25 Q 18 4 30 25 T 54 25 T 78 25 T 96 22" fill="none" stroke={INK} strokeWidth="17" strokeLinecap="round" />
          <path d="M6 25 Q 18 4 30 25 T 54 25 T 78 25 T 96 22" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M38 4 H62 V38 H96 V62 H62 V96 H38 V62 H4 V38 H38 Z" fill={color} {...stroke} />
        </svg>
      );
    case "half":
      return (
        <svg {...common}>
          <path d="M4 72 A46 46 0 0 1 96 72 Z" fill={color} {...stroke} />
        </svg>
      );
  }
}

/** A background shape that bobs idly (CSS) and drifts against the cursor (motion values). */
export function ParallaxShape({
  kind,
  color,
  size,
  depth,
  mx,
  my,
  className,
  bobDelay = 0,
  bobDuration = 5,
}: {
  kind: ShapeKind;
  color: string;
  size: number;
  depth: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  className: string;
  bobDelay?: number;
  bobDuration?: number;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);

  return (
    <motion.div aria-hidden="true" style={{ x, y }} className={`pointer-events-none absolute ${className}`}>
      <div className="hero-bob" style={{ animationDelay: `${bobDelay}s`, animationDuration: `${bobDuration}s` }}>
        <ShapeSvg kind={kind} color={color} size={size} />
      </div>
    </motion.div>
  );
}
