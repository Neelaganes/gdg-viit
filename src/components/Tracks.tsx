"use client";

import { motion, useReducedMotion } from "motion/react";

interface TrackItem {
  id: string;
  monoLabel: string;
  title: string;
  description: string;
  topics: string[];
  bgClass: string;
  textClass: string;
  accentBgClass: string;
  btnClass: string;
}

const TRACKS: TrackItem[] = [
  {
    id: "android",
    monoLabel: "TRK_01",
    title: "Android",
    description:
      "Kotlin, Compose and on-device Gemini Nano.",
    topics: ["Kotlin", "Compose", "Gemini Nano"],
    bgClass: "bg-g-green",
    textClass: "text-ink",
    accentBgClass: "bg-cream text-ink",
    btnClass: "bg-g-yellow text-ink",
  },
  {
    id: "web",
    monoLabel: "TRK_02",
    title: "Web",
    description:
      "Fast full-stack apps with Next.js & TypeScript.",
    topics: ["Next.js", "TypeScript", "WebGPU"],
    bgClass: "bg-g-blue",
    textClass: "text-white",
    accentBgClass: "bg-g-yellow text-ink",
    btnClass: "bg-white text-ink",
  },
  {
    id: "cloud",
    monoLabel: "TRK_03",
    title: "Cloud",
    description:
      "Cloud Run, GKE and containers, done right.",
    topics: ["Cloud Run", "K8s", "Terraform"],
    bgClass: "bg-g-red",
    textClass: "text-white",
    accentBgClass: "bg-cream text-ink",
    btnClass: "bg-g-yellow text-ink",
  },
  {
    id: "ai-ml",
    monoLabel: "TRK_04",
    title: "AI/ML",
    description:
      "Agents and RAG with Gemini & Vertex AI.",
    topics: ["Gemini", "Vertex AI", "RAG"],
    bgClass: "bg-g-yellow",
    textClass: "text-ink",
    accentBgClass: "bg-white text-ink",
    btnClass: "bg-g-blue text-white",
  },
  {
    id: "flutter",
    monoLabel: "TRK_05",
    title: "Flutter",
    description:
      "One Dart codebase, every platform.",
    topics: ["Dart", "Impeller", "Multi-platform"],
    bgClass: "bg-white",
    textClass: "text-ink",
    accentBgClass: "bg-g-blue text-white",
    btnClass: "bg-g-green text-ink",
  },
  {
    id: "firebase",
    monoLabel: "TRK_06",
    title: "Firebase",
    description:
      "Prototype to production in hours.",
    topics: ["Firestore", "Auth", "Genkit"],
    bgClass: "bg-cream",
    textClass: "text-ink",
    accentBgClass: "bg-g-red text-white",
    btnClass: "bg-g-yellow text-ink",
  },
];

export default function Tracks() {
  const prefersReducedMotion = useReducedMotion();

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 500, damping: 28 } as const);

  return (
    <section
      id="tracks"
      aria-labelledby="tracks-heading"
      className="relative overflow-hidden py-10 sm:py-12 border-y-[3px] border-ink bg-white/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-[4px] border-[3px] border-ink bg-g-blue px-3 py-1 font-mono text-xs font-extrabold uppercase text-white shadow-[3px_3px_0_#111]">
              <span>04 — &lt;tracks/&gt;</span>
            </div>
            <h2
              id="tracks-heading"
              className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-[0.95] text-ink"
            >
              Pick your{" "}
              <span className="inline-block rounded-[4px] border-[3px] border-ink bg-g-green px-2.5 py-0.5 text-ink shadow-[4px_4px_0_#111] -rotate-1">
                stack.
              </span>
            </h2>
          </div>

          <span className="self-start md:self-auto rounded-[4px] border-2 border-ink bg-g-yellow px-3 py-1.5 font-mono text-xs font-extrabold uppercase text-ink shadow-[2px_2px_0_#111]">
            6 TECHNICAL DOMAINS
          </span>
        </div>

        {/* Single flex row: all six tracks side by side; the section's height follows the row */}
        <div className="-mx-4 flex flex-row flex-nowrap items-stretch gap-4 overflow-x-auto px-4 pb-3 pt-1 snap-x snap-mandatory lg:mx-0 lg:overflow-visible lg:px-0 lg:snap-none">
          {TRACKS.map((track, idx) => (
            <motion.article
              key={track.id}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 36 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                ...springConfig,
                delay: prefersReducedMotion ? 0 : idx * 0.06,
              }}
              className={`flex w-[210px] shrink-0 snap-start flex-col justify-between rounded-[8px] p-3.5 brutal-card-interactive lg:w-auto lg:min-w-0 lg:flex-1 ${track.bgClass} ${track.textClass}`}
            >
              {/* Top Mono Bar */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`rounded-[4px] border-2 border-ink px-1.5 py-0.5 font-mono text-[10px] font-extrabold uppercase shadow-[2px_2px_0_#111] ${track.accentBgClass}`}
                  >
                    {track.monoLabel}
                  </span>
                  <span className="font-mono text-[10px] font-extrabold opacity-80">
                    0{idx + 1}/06
                  </span>
                </div>

                <h3 className="mt-3 font-display text-xl xl:text-2xl font-extrabold uppercase tracking-tight leading-none">
                  {track.title}
                </h3>

                <p className="mt-1.5 text-xs font-medium leading-snug opacity-95">
                  {track.description}
                </p>
              </div>

              {/* Topic Pills + CTA */}
              <div className="mt-3 pt-2.5 border-t-[3px] border-ink/30">
                <div className="mb-2.5 flex flex-wrap gap-1">
                  {track.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-[3px] border-2 border-ink bg-white px-1.5 py-0.5 font-mono text-[10px] font-extrabold text-ink"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>

                <a
                  href="#join"
                  className={`inline-flex w-full items-center justify-between rounded-[6px] px-3 py-1.5 font-mono text-[11px] font-extrabold uppercase tracking-tight brutal-btn ${track.btnClass}`}
                >
                  <span>Start</span>
                  <span aria-hidden="true" className="text-sm leading-none">
                    →
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
