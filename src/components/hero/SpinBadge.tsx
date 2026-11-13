"use client";

import { motion, useAnimationFrame, useMotionValue, type MotionValue } from "motion/react";

const RING_TEXT = "GDG ON CAMPUS ✦ VIIT ✦ BUILD ✦ BREAK ✦ SHIP ✦ ";

/**
 * Circular text badge that idles slowly and spins up with scroll velocity,
 * then winds back down — like a turntable getting nudged.
 */
export function SpinBadge({
  reduced,
  velocity,
  className = "",
}: {
  reduced: boolean;
  velocity: MotionValue<number>;
  className?: string;
}) {
  const rotate = useMotionValue(0);
  const speed = useMotionValue(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const target = 1 + Math.min(Math.abs(velocity.get()) / 180, 14);
    // ease the current speed toward target so it winds down smoothly
    const s = speed.get() + (target - speed.get()) * 0.08;
    speed.set(s);
    rotate.set((rotate.get() + delta * 0.018 * s) % 360);
  });

  return (
    <div
      aria-hidden="true"
      className={`relative aspect-square rounded-full border-[3px] border-ink bg-ink shadow-[5px_5px_0_#111] ${className}`}
    >
      <motion.svg style={{ rotate }} viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <path id="hero-badge-ring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text
          fill="#FFF8E7"
          fontSize="15"
          fontWeight={800}
          style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
        >
          <textPath href="#hero-badge-ring" textLength="462" lengthAdjust="spacing">
            {RING_TEXT}
          </textPath>
        </text>
      </motion.svg>

      {/* centre: mini four-block bracket */}
      <div className="absolute inset-[29%] grid place-items-center rounded-full border-[3px] border-ink bg-cream">
        <span className="relative block h-[46%] w-[64%]">
          <i className="absolute left-0 top-[8%] h-[30%] w-[48%] -rotate-[34deg] rounded-[2px] border-2 border-ink bg-g-red" />
          <i className="absolute bottom-[8%] left-0 h-[30%] w-[48%] rotate-[34deg] rounded-[2px] border-2 border-ink bg-g-blue" />
          <i className="absolute right-0 top-[8%] h-[30%] w-[48%] rotate-[34deg] rounded-[2px] border-2 border-ink bg-g-green" />
          <i className="absolute bottom-[8%] right-0 h-[30%] w-[48%] -rotate-[34deg] rounded-[2px] border-2 border-ink bg-g-yellow" />
        </span>
      </div>
    </div>
  );
}
