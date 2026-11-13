"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface PastEventItem {
  id: string;
  dateSticker: string;
  stickerColor: string;
  stickerRotate: string;
  title: string;
  recap: string;
  attendees: string;
  image: string;
  alt: string;
}

const PAST_EVENTS: PastEventItem[] = [
  {
    id: "hack-viit",
    dateSticker: "OCT 2026",
    stickerColor: "bg-g-yellow text-ink",
    stickerRotate: "-rotate-3",
    title: "HackVIIT: 36-Hour Solutions Sprint",
    recap:
      "48 student teams built civic-tech, coastal resilience, and campus automation prototypes non-stop with industry mentors.",
    attendees: "190+ Builders",
    image: "/images/past-1.svg",
    alt: "HackVIIT 36-hour sprint poster with code laptop and solution challenge badge",
  },
  {
    id: "cloud-study-jam",
    dateSticker: "SEP 2026",
    stickerColor: "bg-g-green text-ink",
    stickerRotate: "rotate-2",
    title: "Google Cloud & GenAI Study Jam",
    recap:
      "Over 210 VIIT students completed hands-on Vertex AI, Prompt Design, and Cloud Run labs to earn verified skill badges.",
    attendees: "210+ Badges",
    image: "/images/past-2.svg",
    alt: "Google Cloud and GenAI Study Jam neo-brutalist poster showing cloud stack",
  },
  {
    id: "compose-camp",
    dateSticker: "AUG 2026",
    stickerColor: "bg-g-red text-white",
    stickerRotate: "-rotate-2",
    title: "Android Compose & Gemini Nano Talk",
    recap:
      "Live coding session in the VIIT Main Auditorium exploring declarative Kotlin UIs and on-device AI inference.",
    attendees: "320+ Attendees",
    image: "/images/past-3.svg",
    alt: "Android and Gemini Nano Tech Talk poster with brutalist stage microphone",
  },
];

export default function PastEvents() {
  const prefersReducedMotion = useReducedMotion();

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 500, damping: 28 } as const);

  return (
    <section aria-labelledby="past-events-heading" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-[4px] border-[3px] border-ink bg-g-red px-3 py-1 font-mono text-xs font-extrabold uppercase text-white shadow-[3px_3px_0_#111]">
              <span>04 — &lt;events/&gt; archive</span>
            </div>
            <h2
              id="past-events-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] text-ink"
            >
              Shipped on{" "}
              <span className="inline-block rounded-[4px] border-[3px] border-ink bg-g-yellow px-2.5 py-0.5 text-ink shadow-[4px_4px_0_#111] rotate-1">
                campus.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs sm:text-sm font-bold text-ink/80">
            {"// Hover each dispatch to develop the film — every session is documented with slides, repos, and photos."}
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PAST_EVENTS.map((event, idx) => (
            <motion.article
              key={event.id}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 36 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                ...springConfig,
                delay: prefersReducedMotion ? 0 : idx * 0.075,
              }}
              className="group relative flex flex-col justify-between rounded-[6px] bg-white p-5 brutal-card-interactive"
            >
              {/* Rotated Date Sticker */}
              <div
                className={`absolute -top-3.5 right-4 z-10 rounded-[4px] px-3 py-1 font-mono text-xs font-extrabold uppercase brutal-sticker ${event.stickerColor} ${event.stickerRotate}`}
              >
                {event.dateSticker}
              </div>

              <div>
                {/* Image Wrapper with Grayscale -> Color + Slight Rotate on Hover */}
                <div className="relative overflow-hidden rounded-[4px] border-[3px] border-ink bg-cream p-1.5">
                  <div className="overflow-hidden rounded-[2px] border-2 border-ink">
                    <Image
                      src={event.image}
                      alt={event.alt}
                      width={640}
                      height={440}
                      className="h-auto w-full object-cover grayscale transition-all duration-200 ease-out group-hover:grayscale-0 group-hover:rotate-[1.5deg] group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Title & Short Recap */}
                <div className="mt-5">
                  <span className="inline-block rounded-[3px] border-2 border-ink bg-cream px-2 py-0.5 font-mono text-[11px] font-extrabold uppercase text-ink">
                    {event.attendees}
                  </span>
                  <h3 className="mt-2.5 font-display text-2xl font-extrabold uppercase tracking-tight leading-tight text-ink">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base font-medium leading-relaxed text-ink/85">
                    {event.recap}
                  </p>
                </div>
              </div>

              {/* Footer Link */}
              <div className="mt-6 flex items-center justify-between border-t-[3px] border-ink pt-3 font-mono text-xs font-extrabold uppercase text-ink">
                <span>RECAP &amp; SLIDES</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-[4px] border-2 border-ink bg-g-yellow transition-transform duration-120 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
