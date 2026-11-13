"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface StatItem {
  code: string;
  target: number;
  suffix: string;
  label: string;
  sublabel: string;
  bgClass: string;
  textClass: string;
  pillClass: string;
}

const STATS: StatItem[] = [
  {
    code: "STAT_01",
    target: 500,
    suffix: "+",
    label: "Members",
    sublabel: "Active student developers",
    bgClass: "bg-g-blue",
    textClass: "text-white",
    pillClass: "bg-cream text-ink",
  },
  {
    code: "STAT_02",
    target: 40,
    suffix: "+",
    label: "Events",
    sublabel: "Workshops, talks & study jams",
    bgClass: "bg-g-yellow",
    textClass: "text-ink",
    pillClass: "bg-white text-ink",
  },
  {
    code: "STAT_03",
    target: 12,
    suffix: "",
    label: "Hackathons",
    sublabel: "Campus & regional build sprints",
    bgClass: "bg-g-red",
    textClass: "text-white",
    pillClass: "bg-g-yellow text-ink",
  },
  {
    code: "STAT_04",
    target: 25,
    suffix: "+",
    label: "Projects",
    sublabel: "Open-source & community builds",
    bgClass: "bg-g-green",
    textClass: "text-ink",
    pillClass: "bg-cream text-ink",
  },
];

function OdometerDigits({
  target,
  suffix,
  inView,
  reducedMotion,
}: {
  target: number;
  suffix: string;
  inView: boolean;
  reducedMotion: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      const immediate = window.setTimeout(() => setCurrent(target), 0);
      return () => window.clearTimeout(immediate);
    }

    const duration = 1100;
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Stiff mechanical ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [inView, target, reducedMotion]);

  const chars = `${current}${suffix}`.split("");

  return (
    <div
      aria-label={`${target}${suffix}`}
      className="inline-flex items-center gap-1 rounded-[6px] border-[3px] border-ink bg-white px-2.5 py-1.5 text-ink shadow-[4px_4px_0_#111]"
    >
      {chars.map((char, idx) => (
        <span
          key={`${idx}-${char}`}
          className="inline-flex h-11 sm:h-13 min-w-[1.9rem] sm:min-w-[2.3rem] items-center justify-center rounded-[3px] border-2 border-ink bg-cream px-1 font-mono text-3xl sm:text-4xl font-extrabold leading-none tabular-nums"
        >
          {char}
        </span>
      ))}
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 500, damping: 28 } as const);

  return (
    <section
      ref={sectionRef}
      aria-label="Chapter Impact Statistics"
      className="py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.code}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 36 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                ...springConfig,
                delay: prefersReducedMotion ? 0 : idx * 0.07,
              }}
              className={`flex flex-col justify-between rounded-[6px] p-6 brutal-card ${stat.bgClass} ${stat.textClass}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-[4px] border-2 border-ink px-2.5 py-0.5 font-mono text-xs font-extrabold ${stat.pillClass}`}
                >
                  {stat.code}
                </span>
                <span className="font-mono text-xs font-extrabold uppercase opacity-80">
                  {"// VIIT METRIC"}
                </span>
              </div>

              <div className="my-6">
                <OdometerDigits
                  target={stat.target}
                  suffix={stat.suffix}
                  inView={inView}
                  reducedMotion={Boolean(prefersReducedMotion)}
                />
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight leading-none">
                  {stat.label}
                </h3>
                <p className="mt-1.5 font-mono text-xs font-bold opacity-90">
                  {stat.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
