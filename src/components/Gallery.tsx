"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  tag: string;
  tagColor: string;
  tiltClass: string;
  spanClass: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    src: "/images/gallery-1.svg",
    alt: "Main Auditorium Keynote with 500+ VIIT student developers",
    caption: "DevFest Keynote · Main Auditorium",
    tag: "KEYNOTE",
    tagColor: "bg-g-yellow text-ink",
    tiltClass: "-rotate-[2deg]",
    spanClass: "sm:col-span-2 lg:col-span-6",
  },
  {
    id: "gal-2",
    src: "/images/gallery-2.svg",
    alt: "Midnight hackathon coding sprint in Lab 04 at VIIT",
    caption: "02:45 AM Sprint · Lab 04",
    tag: "HACKATHON",
    tagColor: "bg-g-blue text-white",
    tiltClass: "rotate-[1.8deg]",
    spanClass: "sm:col-span-1 lg:col-span-3",
  },
  {
    id: "gal-3",
    src: "/images/gallery-3.svg",
    alt: "Android Compose Camp workshop where students built 85 first Kotlin apps",
    caption: "Compose Camp · Kotlin Lab",
    tag: "ANDROID",
    tagColor: "bg-g-green text-ink",
    tiltClass: "-rotate-[1.5deg]",
    spanClass: "sm:col-span-1 lg:col-span-3",
  },
  {
    id: "gal-4",
    src: "/images/gallery-4.svg",
    alt: "GDG on Campus VIIT developer swag, badges, and laptop stickers table",
    caption: "Sticker & Badge Drop",
    tag: "SWAG",
    tagColor: "bg-g-red text-white",
    tiltClass: "rotate-[2deg]",
    spanClass: "sm:col-span-1 lg:col-span-4",
  },
  {
    id: "gal-5",
    src: "/images/gallery-5.svg",
    alt: "Build with AI hands-on workshop exploring Gemini API and Vertex AI",
    caption: "Build with AI · Gemini Lab",
    tag: "AI / ML",
    tagColor: "bg-g-yellow text-ink",
    tiltClass: "-rotate-[1.8deg]",
    spanClass: "sm:col-span-1 lg:col-span-4",
  },
  {
    id: "gal-6",
    src: "/images/gallery-6.svg",
    alt: "Open Source sprint celebrating 320+ merged student pull requests",
    caption: "Open Source Git Sprint",
    tag: "GIT PUSH",
    tagColor: "bg-g-blue text-white",
    tiltClass: "rotate-[1.4deg]",
    spanClass: "sm:col-span-2 lg:col-span-4",
  },
  {
    id: "gal-7",
    src: "/images/gallery-7.svg",
    alt: "Project Expo Demo Day finals pitch trophy and stage",
    caption: "Demo Day Finals · 25+ Shipped Projects",
    tag: "DEMO DAY",
    tagColor: "bg-g-green text-ink",
    tiltClass: "-rotate-[1.6deg]",
    spanClass: "sm:col-span-1 lg:col-span-5",
  },
  {
    id: "gal-8",
    src: "/images/gallery-8.svg",
    alt: "GDG on Campus VIIT community meetup group snapshot in Visakhapatnam",
    caption: "Annual Chapter Crew · VIIT Duvvada",
    tag: "COMMUNITY",
    tagColor: "bg-g-red text-white",
    tiltClass: "rotate-[1.8deg]",
    spanClass: "sm:col-span-1 lg:col-span-7",
  },
];

export default function Gallery() {
  const prefersReducedMotion = useReducedMotion();

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 500, damping: 28 } as const);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="py-16 sm:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-[4px] border-[3px] border-ink bg-g-green px-3 py-1 font-mono text-xs font-extrabold uppercase text-ink shadow-[3px_3px_0_#111]">
              <span>06 — &lt;gallery/&gt; moments</span>
            </div>
            <h2
              id="gallery-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] text-ink"
            >
              Proof of{" "}
              <span className="inline-block rounded-[4px] border-[3px] border-ink bg-g-red px-2.5 py-0.5 text-white shadow-[4px_4px_0_#111] rotate-1">
                work.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs sm:text-sm font-bold text-ink/80">
            {"// Snapshots from auditoria, lab floors, and 3 AM hackathon fuel runs across VIIT."}
          </p>
        </div>

        {/* Mixed-Size Masonry-Style Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-12">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.figure
              key={item.id}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 36 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                ...springConfig,
                delay: prefersReducedMotion ? 0 : idx * 0.05,
              }}
              className={`group relative flex flex-col justify-between rounded-[6px] border-[3px] border-ink bg-white p-3.5 shadow-[6px_6px_0_#111] transition-all duration-150 ease-out hover:rotate-0 hover:-translate-y-1 hover:shadow-[8px_8px_0_#111] ${item.tiltClass} ${item.spanClass}`}
            >
              <div className="relative overflow-hidden rounded-[4px] border-[3px] border-ink bg-cream">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={450}
                  className="h-auto w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <span
                  className={`absolute top-2.5 left-2.5 rounded-[4px] border-2 border-ink px-2.5 py-0.5 font-mono text-[11px] font-extrabold uppercase shadow-[2px_2px_0_#111] ${item.tagColor}`}
                >
                  {item.tag}
                </span>
              </div>

              <figcaption className="mt-3 flex items-center justify-between px-1 font-mono text-xs sm:text-sm font-extrabold text-ink">
                <span>{item.caption}</span>
                <span className="text-ink/60">0{idx + 1}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
