"use client";

import { motion, useReducedMotion } from "motion/react";

interface BentoItem {
  index: string;
  title: string;
  description: string;
  spanClass: string;
  bgClass: string;
  textClass: string;
  badgeBgClass: string;
  icon: React.ReactNode;
}

const BENTO_ITEMS: BentoItem[] = [
  {
    index: "01",
    title: "Workshops",
    description:
      "Zero-fluff code labs where every student leaves with a live, deployed project repo on GitHub.",
    spanClass: "md:col-span-7",
    bgClass: "bg-g-blue",
    textClass: "text-white",
    badgeBgClass: "bg-cream text-ink",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-11 w-11 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="4"
          y="8"
          width="40"
          height="28"
          rx="3"
          fill="#FFF8E7"
          stroke="#111111"
          strokeWidth="3"
        />
        <path
          d="M16 18L11 22L16 26M32 18L37 22L32 26M26 16L22 28"
          stroke="#111111"
          strokeWidth="3"
          strokeLinecap="square"
        />
        <rect
          x="2"
          y="36"
          width="44"
          height="6"
          fill="#FBBC04"
          stroke="#111111"
          strokeWidth="3"
        />
      </svg>
    ),
  },
  {
    index: "02",
    title: "Hackathons",
    description:
      "High-voltage 24 to 36-hour campus build sprints solving real problems for Visakhapatnam and beyond.",
    spanClass: "md:col-span-5",
    bgClass: "bg-g-red",
    textClass: "text-white",
    badgeBgClass: "bg-g-yellow text-ink",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-11 w-11 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <polygon
          points="26,4 10,26 23,26 20,44 38,20 25,20"
          fill="#FBBC04"
          stroke="#111111"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    index: "03",
    title: "Study Jams",
    description:
      "Multi-week guided cohorts across GenAI, Google Cloud, Android, and Flutter with peer mentors.",
    spanClass: "md:col-span-4",
    bgClass: "bg-g-yellow",
    textClass: "text-ink",
    badgeBgClass: "bg-white text-ink",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-11 w-11 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="6"
          y="6"
          width="36"
          height="11"
          fill="#34A853"
          stroke="#111111"
          strokeWidth="3"
        />
        <rect
          x="6"
          y="19"
          width="36"
          height="11"
          fill="#4285F4"
          stroke="#111111"
          strokeWidth="3"
        />
        <rect
          x="6"
          y="32"
          width="36"
          height="11"
          fill="#FFF8E7"
          stroke="#111111"
          strokeWidth="3"
        />
      </svg>
    ),
  },
  {
    index: "04",
    title: "Tech Talks",
    description:
      "Fireside chats and architecture deep-dives with Google Developer Experts and industry engineers.",
    spanClass: "md:col-span-4",
    bgClass: "bg-white",
    textClass: "text-ink",
    badgeBgClass: "bg-g-green text-ink",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-11 w-11 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="16"
          y="6"
          width="16"
          height="24"
          rx="8"
          fill="#EA4335"
          stroke="#111111"
          strokeWidth="3"
        />
        <path
          d="M10 22C10 29.732 16.268 36 24 36C31.732 36 38 29.732 38 22"
          stroke="#111111"
          strokeWidth="3"
        />
        <line
          x1="24"
          y1="36"
          x2="24"
          y2="43"
          stroke="#111111"
          strokeWidth="3"
        />
        <line
          x1="15"
          y1="43"
          x2="33"
          y2="43"
          stroke="#111111"
          strokeWidth="3"
        />
      </svg>
    ),
  },
  {
    index: "05",
    title: "Open Source",
    description:
      "Collaborative campus tooling, Git clinics, and pull-request sprints where students build in public.",
    spanClass: "md:col-span-4",
    bgClass: "bg-g-green",
    textClass: "text-ink",
    badgeBgClass: "bg-cream text-ink",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-11 w-11 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <line
          x1="14"
          y1="12"
          x2="14"
          y2="36"
          stroke="#111111"
          strokeWidth="3"
        />
        <path
          d="M14 26C24 26 34 24 34 14"
          stroke="#111111"
          strokeWidth="3"
        />
        <circle
          cx="14"
          cy="12"
          r="5"
          fill="#FBBC04"
          stroke="#111111"
          strokeWidth="3"
        />
        <circle
          cx="14"
          cy="36"
          r="5"
          fill="#FFF8E7"
          stroke="#111111"
          strokeWidth="3"
        />
        <circle
          cx="34"
          cy="14"
          r="5"
          fill="#EA4335"
          stroke="#111111"
          strokeWidth="3"
        />
      </svg>
    ),
  },
  {
    index: "06",
    title: "Community",
    description:
      "A tight-knit network of 500+ builders across CSE, IT, AI&DS, ECE, and Mech at VIIT sharing referrals, code reviews, and demo days.",
    spanClass: "md:col-span-12",
    bgClass: "bg-cream",
    textClass: "text-ink",
    badgeBgClass: "bg-g-yellow text-ink",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-11 w-11 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="15"
          cy="16"
          r="7"
          fill="#4285F4"
          stroke="#111111"
          strokeWidth="3"
        />
        <circle
          cx="33"
          cy="16"
          r="7"
          fill="#EA4335"
          stroke="#111111"
          strokeWidth="3"
        />
        <path
          d="M4 39C4 32 9 28 15 28C21 28 26 32 26 39"
          fill="#FBBC04"
          stroke="#111111"
          strokeWidth="3"
        />
        <path
          d="M22 39C22 32 27 28 33 28C39 28 44 32 44 39"
          fill="#34A853"
          stroke="#111111"
          strokeWidth="3"
        />
      </svg>
    ),
  },
];

export default function AboutBento() {
  const prefersReducedMotion = useReducedMotion();

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 500, damping: 28 } as const);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-[4px] border-[3px] border-ink bg-g-green px-3 py-1 font-mono text-xs font-extrabold uppercase text-ink shadow-[3px_3px_0_#111]">
              <span>01 — &lt;what-we-do/&gt;</span>
            </div>
            <h2
              id="about-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] text-ink"
            >
              Not another club.{" "}
              <span className="inline-block rounded-[4px] border-[3px] border-ink bg-g-yellow px-2.5 py-0.5 shadow-[4px_4px_0_#111] rotate-1">
                A build floor.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs sm:text-sm font-bold text-ink/80">
            {"// Six ways we turn lecture-hall theory into production software on the VIIT Duvvada campus."}
          </p>
        </div>

        {/* Asymmetric 6-Tile Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {BENTO_ITEMS.map((tile, idx) => (
            <motion.article
              key={tile.index}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 36 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                ...springConfig,
                delay: prefersReducedMotion ? 0 : idx * 0.065,
              }}
              tabIndex={0}
              className={`group relative flex flex-col justify-between rounded-[6px] p-6 sm:p-8 brutal-card-interactive cursor-pointer ${tile.spanClass} ${tile.bgClass} ${tile.textClass}`}
            >
              {/* Top Row: Mono Index + Geometric Icon */}
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`inline-flex items-center rounded-[4px] border-[3px] border-ink px-3 py-1 font-mono text-sm font-extrabold shadow-[3px_3px_0_#111] ${tile.badgeBgClass}`}
                >
                  {tile.index} —
                </span>
                <div className="rounded-[6px] border-[3px] border-ink bg-white p-2 shadow-[4px_4px_0_#111] transition-transform duration-150 group-hover:rotate-6">
                  {tile.icon}
                </div>
              </div>

              {/* Bottom Content */}
              <div className="mt-8">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                  {tile.title}
                </h3>
                <p className="mt-2 text-base sm:text-lg font-medium leading-snug opacity-95">
                  {tile.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
