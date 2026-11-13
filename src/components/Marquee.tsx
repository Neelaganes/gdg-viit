"use client";

import { useReducedMotion } from "motion/react";

const MARQUEE_ITEMS = [
  "BUILD",
  "LEARN",
  "CONNECT",
  "ANDROID",
  "WEB",
  "CLOUD",
  "AI/ML",
  "FLUTTER",
];

function MarqueeStrip({
  direction,
  bgClass,
  textClass,
  starClass,
  rotateClass,
  paused,
}: {
  direction: "left" | "right";
  bgClass: string;
  textClass: string;
  starClass: string;
  rotateClass: string;
  paused: boolean;
}) {
  const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className={`relative -mx-4 w-[calc(100%+2rem)] border-y-[3px] border-ink py-3 sm:py-3.5 shadow-[0_6px_0_#111] ${bgClass} ${rotateClass}`}
    >
      <div
        className={
          paused
            ? "flex flex-wrap justify-center gap-6 px-4"
            : direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right"
        }
      >
        {[0, 1].map((groupIdx) => (
          <div
            key={groupIdx}
            aria-hidden={groupIdx === 1 ? "true" : undefined}
            className="flex shrink-0 items-center"
          >
            {repeated.map((word, idx) => (
              <span
                key={`${groupIdx}-${idx}`}
                className={`inline-flex items-center font-display text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight ${textClass}`}
              >
                <span className="px-4 sm:px-5">{word}</span>
                <span
                  aria-hidden="true"
                  className={`font-mono text-lg sm:text-xl ${starClass}`}
                >
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Chapter Pillars and Technologies Ticker"
      className="relative overflow-hidden py-8 sm:py-12 select-none"
    >
      <div className="flex flex-col gap-3 sm:gap-4">
        <MarqueeStrip
          direction="left"
          bgClass="bg-g-yellow"
          textClass="text-ink"
          starClass="text-g-red"
          rotateClass="-rotate-[2deg] z-10"
          paused={Boolean(prefersReducedMotion)}
        />
        <MarqueeStrip
          direction="right"
          bgClass="bg-g-blue"
          textClass="text-white"
          starClass="text-g-yellow"
          rotateClass="rotate-[1.5deg]"
          paused={Boolean(prefersReducedMotion)}
        />
      </div>
    </section>
  );
}
