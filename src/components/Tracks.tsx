"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    monoLabel: "// TRK_01 · MOBILE NATIVE",
    title: "Android",
    description:
      "Architect modern Android apps with Kotlin, Jetpack Compose, Material 3 expressive motion, and on-device Gemini Nano APIs.",
    topics: ["Kotlin", "Jetpack Compose", "Gemini Nano", "Material 3"],
    bgClass: "bg-g-green",
    textClass: "text-ink",
    accentBgClass: "bg-cream text-ink",
    btnClass: "bg-g-yellow text-ink",
  },
  {
    id: "web",
    monoLabel: "// TRK_02 · MODERN WEB PLATFORM",
    title: "Web",
    description:
      "Ship blazing-fast full-stack web apps with Next.js App Router, TypeScript, View Transitions, WebGPU, and Core Web Vitals.",
    topics: ["Next.js", "TypeScript", "Web APIs", "CWV"],
    bgClass: "bg-g-blue",
    textClass: "text-white",
    accentBgClass: "bg-g-yellow text-ink",
    btnClass: "bg-white text-ink",
  },
  {
    id: "cloud",
    monoLabel: "// TRK_03 · DISTRIBUTED INFRA",
    title: "Cloud",
    description:
      "Deploy resilient cloud-native workloads with Google Cloud Run, Kubernetes Engine (GKE), Docker containers, and IAM security.",
    topics: ["Google Cloud", "Cloud Run", "Docker & K8s", "Terraform"],
    bgClass: "bg-g-red",
    textClass: "text-white",
    accentBgClass: "bg-cream text-ink",
    btnClass: "bg-g-yellow text-ink",
  },
  {
    id: "ai-ml",
    monoLabel: "// TRK_04 · APPLIED INTELLIGENCE",
    title: "AI/ML",
    description:
      "Build multimodal agentic systems, grounded RAG pipelines, and fine-tuned models using the Gemini API, Vertex AI, and PyTorch.",
    topics: ["Gemini API", "Vertex AI", "Agentic RAG", "PyTorch"],
    bgClass: "bg-g-yellow",
    textClass: "text-ink",
    accentBgClass: "bg-white text-ink",
    btnClass: "bg-g-blue text-white",
  },
  {
    id: "flutter",
    monoLabel: "// TRK_05 · CROSS-PLATFORM UI",
    title: "Flutter",
    description:
      "Craft 120fps multi-platform experiences for Android, iOS, Web, and Desktop from a single Dart codebase with custom Impeller shaders.",
    topics: ["Dart", "Impeller", "Custom Painters", "Multi-platform"],
    bgClass: "bg-white",
    textClass: "text-ink",
    accentBgClass: "bg-g-blue text-white",
    btnClass: "bg-g-green text-ink",
  },
  {
    id: "firebase",
    monoLabel: "// TRK_06 · REALTIME BACKEND",
    title: "Firebase",
    description:
      "Go from prototype to production in hours with Cloud Firestore, Firebase Auth, Genkit AI flows, Security Rules, and App Hosting.",
    topics: ["Firestore", "Firebase Auth", "Genkit AI", "App Hosting"],
    bgClass: "bg-cream",
    textClass: "text-ink",
    accentBgClass: "bg-g-red text-white",
    btnClass: "bg-g-yellow text-ink",
  },
];

export default function Tracks() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);
  const trackRailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const rail = trackRailRef.current;
        const wrap = pinWrapRef.current;
        if (!rail || !wrap) return;

        const getScrollDistance = () =>
          Math.max(0, rail.scrollWidth - wrap.clientWidth + 64);

        gsap.to(rail, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top+=72",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 500, damping: 28 } as const);

  return (
    <section
      id="tracks"
      ref={sectionRef}
      aria-labelledby="tracks-heading"
      className="relative overflow-hidden py-16 sm:py-24 border-y-[3px] border-ink bg-white/60"
    >
      <div ref={pinWrapRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-[4px] border-[3px] border-ink bg-g-blue px-3 py-1 font-mono text-xs font-extrabold uppercase text-white shadow-[3px_3px_0_#111]">
              <span>03 — &lt;tracks/&gt;</span>
            </div>
            <h2
              id="tracks-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] text-ink"
            >
              Pick your{" "}
              <span className="inline-block rounded-[4px] border-[3px] border-ink bg-g-green px-2.5 py-0.5 text-ink shadow-[4px_4px_0_#111] -rotate-1">
                stack.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs sm:text-sm font-extrabold uppercase text-ink/80">
            <span className="hidden lg:inline-block rounded-[4px] border-2 border-ink bg-g-yellow px-3 py-1.5 text-ink shadow-[2px_2px_0_#111]">
              SCROLL TO PAN 6 TRACKS →
            </span>
            <span className="lg:hidden rounded-[4px] border-2 border-ink bg-g-yellow px-3 py-1.5 text-ink">
              6 TECHNICAL DOMAINS
            </span>
          </div>
        </div>

        {/* Horizontal Rail on Desktop (>=1024px) / Vertical Stack on Mobile (<1024px) */}
        <div
          ref={trackRailRef}
          className="flex flex-col gap-6 lg:flex-row lg:flex-nowrap lg:w-max lg:pr-8 pb-4"
        >
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
              className={`flex flex-col justify-between rounded-[8px] p-6 sm:p-8 brutal-card w-full lg:w-[430px] lg:min-h-[420px] shrink-0 ${track.bgClass} ${track.textClass}`}
            >
              {/* Top Mono Bar */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`rounded-[4px] border-2 border-ink px-3 py-1 font-mono text-xs font-extrabold uppercase shadow-[2px_2px_0_#111] ${track.accentBgClass}`}
                  >
                    {track.monoLabel}
                  </span>
                  <span className="font-mono text-sm font-extrabold opacity-80">
                    0{idx + 1}/06
                  </span>
                </div>

                {/* Huge Title */}
                <h3 className="mt-6 font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight leading-none">
                  {track.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-base sm:text-lg font-medium leading-relaxed opacity-95">
                  {track.description}
                </p>
              </div>

              {/* Topic Pills + CTA */}
              <div className="mt-8 pt-5 border-t-[3px] border-ink/30">
                <div className="mb-5 flex flex-wrap gap-2">
                  {track.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-[4px] border-2 border-ink bg-white px-2.5 py-1 font-mono text-xs font-extrabold text-ink"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>

                <a
                  href="#join"
                  className={`inline-flex w-full items-center justify-between rounded-[6px] px-5 py-3.5 font-mono text-sm font-extrabold uppercase tracking-tight brutal-btn ${track.btnClass}`}
                >
                  <span>Start learning</span>
                  <span aria-hidden="true" className="text-base leading-none">
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
