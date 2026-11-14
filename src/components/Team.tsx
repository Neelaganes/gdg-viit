"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface TeamMember {
  id: string;
  badgeCode: string;
  role: string;
  name: string;
  branchYear: string;
  avatar: string;
  roleBg: string;
  backBg: string;
  backText: string;
  funFact: string;
  stack: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "organizer",
    badgeCode: "VIIT-ID-001",
    role: "Organizer",
    name: "Your Name",
    branchYear: "B.Tech CSE · IV Year",
    avatar: "/images/team-1.svg",
    roleBg: "bg-g-blue text-white",
    backBg: "bg-g-blue",
    backText: "text-white",
    funFact:
      "Shipped 3 campus tools during exam week.",
    stack: "Go · Next.js · Cloud Run",
  },
  {
    id: "tech-lead",
    badgeCode: "VIIT-ID-002",
    role: "Tech Lead",
    name: "Your Name",
    branchYear: "B.Tech AI & DS · III Year",
    avatar: "/images/team-2.svg",
    roleBg: "bg-g-green text-ink",
    backBg: "bg-g-green",
    backText: "text-ink",
    funFact:
      "Debugs Kubernetes YAML for fun.",
    stack: "Kotlin · Gemini API · Rust",
  },
  {
    id: "design-lead",
    badgeCode: "VIIT-ID-003",
    role: "Design Lead",
    name: "Your Name",
    branchYear: "B.Tech IT · III Year",
    avatar: "/images/team-3.svg",
    roleBg: "bg-g-yellow text-ink",
    backBg: "bg-g-yellow",
    backText: "text-ink",
    funFact:
      "Spots a 1px misalignment from across the hall.",
    stack: "Figma · CSS Shaders · Motion",
  },
  {
    id: "events-lead",
    badgeCode: "VIIT-ID-004",
    role: "Events Lead",
    name: "Your Name",
    branchYear: "B.Tech ECE · III Year",
    avatar: "/images/team-4.svg",
    roleBg: "bg-g-red text-white",
    backBg: "bg-g-red",
    backText: "text-white",
    funFact:
      "Ran a 36h hackathon on filter coffee.",
    stack: "Firebase · Flutter · Ops",
  },
  {
    id: "community-lead",
    badgeCode: "VIIT-ID-005",
    role: "Community Lead",
    name: "Your Name",
    branchYear: "B.Tech CSE · III Year",
    avatar: "/images/team-5.svg",
    roleBg: "bg-g-blue text-white",
    backBg: "bg-g-blue",
    backText: "text-white",
    funFact:
      "Onboarded 180+ freshers to their first PR.",
    stack: "TypeScript · Git · Discord",
  },
  {
    id: "content-lead",
    badgeCode: "VIIT-ID-006",
    role: "Content Lead",
    name: "Your Name",
    branchYear: "B.Tech IT · II Year",
    avatar: "/images/team-6.svg",
    roleBg: "bg-g-green text-ink",
    backBg: "bg-g-green",
    backText: "text-ink",
    funFact:
      "Explains system design in 60 seconds.",
    stack: "Astro · MDX · Vertex AI",
  },
  {
    id: "android-lead",
    badgeCode: "VIIT-ID-007",
    role: "Android Lead",
    name: "Your Name",
    branchYear: "B.Tech CSE · III Year",
    avatar: "/images/team-1.svg",
    roleBg: "bg-g-green text-ink",
    backBg: "bg-g-green",
    backText: "text-ink",
    funFact: "Has a Compose preview for everything.",
    stack: "Kotlin · Compose",
  },
  {
    id: "web-lead",
    badgeCode: "VIIT-ID-008",
    role: "Web Lead",
    name: "Your Name",
    branchYear: "B.Tech IT · III Year",
    avatar: "/images/team-2.svg",
    roleBg: "bg-g-blue text-white",
    backBg: "bg-g-blue",
    backText: "text-white",
    funFact: "Chases 100 Lighthouse scores for fun.",
    stack: "Next.js · TypeScript",
  },
  {
    id: "cloud-lead",
    badgeCode: "VIIT-ID-009",
    role: "Cloud Lead",
    name: "Your Name",
    branchYear: "B.Tech CSE · III Year",
    avatar: "/images/team-3.svg",
    roleBg: "bg-g-red text-white",
    backBg: "bg-g-red",
    backText: "text-white",
    funFact: "Keeps the cloud bill at zero rupees.",
    stack: "Cloud Run · Terraform",
  },
  {
    id: "ai-lead",
    badgeCode: "VIIT-ID-010",
    role: "AI/ML Lead",
    name: "Your Name",
    branchYear: "B.Tech AI & DS · III Year",
    avatar: "/images/team-4.svg",
    roleBg: "bg-g-yellow text-ink",
    backBg: "bg-g-yellow",
    backText: "text-ink",
    funFact: "Fine-tunes models between lectures.",
    stack: "Gemini · PyTorch",
  },
  {
    id: "marketing-lead",
    badgeCode: "VIIT-ID-011",
    role: "Marketing Lead",
    name: "Your Name",
    branchYear: "B.Tech ECE · II Year",
    avatar: "/images/team-5.svg",
    roleBg: "bg-g-blue text-white",
    backBg: "bg-g-blue",
    backText: "text-white",
    funFact: "Wrote every poster pun on campus.",
    stack: "Canva · Instagram",
  },
];

export default function Team() {
  const prefersReducedMotion = useReducedMotion();
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 500, damping: 28 } as const);

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="py-10 sm:py-12 border-t-[3px] border-ink bg-white/50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-[4px] border-[3px] border-ink bg-g-yellow px-3 py-1 font-mono text-xs font-extrabold uppercase text-ink shadow-[3px_3px_0_#111]">
              <span>05 — &lt;team/&gt; core crew</span>
            </div>
            <h2
              id="team-heading"
              className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-[0.95] text-ink"
            >
              Meet the{" "}
              <span className="inline-block rounded-[4px] border-[3px] border-ink bg-g-blue px-2.5 py-0.5 text-white shadow-[4px_4px_0_#111] -rotate-1">
                organizers.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs sm:text-sm font-bold text-ink/80">
            {"// Hover or tap a badge to flip it."}
          </p>
        </div>

        {/* 11 ID-Cards in a wrapping flex row: 6 + 5 across two rows on desktop */}
        <div className="flex flex-row flex-wrap justify-center gap-4">
          {TEAM_MEMBERS.map((member, idx) => {
            const isFlipped = Boolean(flippedIds[member.id]);
            return (
              <motion.div
                key={member.id}
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
                onClick={() => toggleFlip(member.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFlip(member.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${member.role} ID card for ${member.name}. Activate or hover to flip for fun fact and socials.`}
                className={`group perspective-1000 h-[250px] basis-[calc((100%-1rem)/2)] sm:basis-[calc((100%-3rem)/4)] lg:basis-[calc((100%-5rem)/6)] cursor-pointer select-none ${
                  isFlipped ? "is-flipped" : ""
                }`}
              >
                <div className="preserve-3d group-hover-flip relative h-full w-full">
                  {/* FRONT OF ID BADGE */}
                  <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-[8px] border-[3px] border-ink bg-white p-2.5 shadow-[4px_4px_0_#111]">
                    {/* Top Lanyard Slot Notch + Serial Header */}
                    <div>
                      <div className="mx-auto mb-1.5 flex flex-col items-center">
                        <div className="h-2 w-4 border-x-[3px] border-t-[3px] border-ink bg-g-yellow" />
                        <div
                          aria-hidden="true"
                          className="h-3 w-12 rounded-full border-[3px] border-ink bg-cream shadow-inner"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-1 border-b-[3px] border-ink pb-1.5">
                        <span className="truncate font-mono text-[9px] font-extrabold text-ink">
                          {member.badgeCode}
                        </span>
                        <span className="shrink-0 rounded-[3px] border-2 border-ink bg-cream px-1 font-mono text-[9px] font-extrabold uppercase text-ink">
                          ↻
                        </span>
                      </div>
                    </div>

                    {/* Avatar Image with 3px Solid Ink Border */}
                    <div className="my-1.5 flex justify-center">
                      <div className="relative h-16 w-16 xl:h-20 xl:w-20 overflow-hidden rounded-[6px] border-[3px] border-ink bg-cream shadow-[3px_3px_0_#111]">
                        <Image
                          src={member.avatar}
                          alt={`Geometric portrait avatar for ${member.role} (${member.name})`}
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Role, Name & Branch Footer */}
                    <div className="border-t-[3px] border-ink pt-1.5">
                      <span
                        className={`inline-block max-w-full truncate rounded-[3px] border-2 border-ink px-1.5 py-0.5 font-mono text-[9px] font-extrabold uppercase shadow-[2px_2px_0_#111] ${member.roleBg}`}
                      >
                        {member.role}
                      </span>
                      <h3 className="mt-1.5 truncate font-display text-base font-extrabold uppercase tracking-tight leading-none text-ink">
                        {member.name}
                      </h3>
                      <p className="mt-0.5 truncate font-mono text-[9px] font-bold text-ink/75">
                        {member.branchYear}
                      </p>
                    </div>
                  </div>

                  {/* BACK OF ID BADGE (3D rotateY 180deg) */}
                  <div
                    className={`backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-[8px] border-[3px] border-ink p-2.5 shadow-[4px_4px_0_#111] ${member.backBg} ${member.backText}`}
                  >
                    {/* Lanyard Hole on Back */}
                    <div>
                      <div className="mx-auto mb-1.5 flex flex-col items-center">
                        <div
                          aria-hidden="true"
                          className="h-3 w-12 rounded-full border-[3px] border-ink bg-cream"
                        />
                      </div>

                      <div className="border-b-[3px] border-ink pb-1.5">
                        <span className="inline-block max-w-full truncate rounded-[3px] border-2 border-ink bg-white px-1.5 py-0.5 font-mono text-[9px] font-extrabold uppercase text-ink">
                          {member.role}
                        </span>
                      </div>
                    </div>

                    {/* Fun Fact & Stack */}
                    <div className="my-auto rounded-[6px] border-[3px] border-ink bg-white p-2 text-ink shadow-[3px_3px_0_#111]">
                      <span className="inline-block rounded-[3px] border-2 border-ink bg-g-yellow px-1 font-mono text-[9px] font-extrabold uppercase text-ink">
                        FUN FACT
                      </span>
                      <p className="mt-1 text-[11px] font-semibold leading-snug text-ink">
                        &ldquo;{member.funFact}&rdquo;
                      </p>
                      <div className="mt-1.5 border-t-2 border-ink/20 pt-1">
                        <span className="block truncate font-mono text-[10px] font-extrabold text-ink">
                          {member.stack}
                        </span>
                      </div>
                    </div>

                    {/* Social Links & Barcode Strip */}
                    <div>
                      <div className="flex items-center justify-between gap-1.5">
                        {[
                          { label: "GH", title: "GitHub" },
                          { label: "IN", title: "LinkedIn" },
                          { label: "X", title: "X / Twitter" },
                        ].map((soc) => (
                          <a
                            key={soc.label}
                            href="#team"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${member.name} (${member.role}) on ${soc.title}`}
                            className="flex-1 rounded-[4px] bg-cream py-0.5 text-center font-mono text-[10px] font-extrabold text-ink brutal-btn"
                          >
                            {soc.label}
                          </a>
                        ))}
                      </div>
                      <div
                        aria-hidden="true"
                        className="mt-2 flex h-4 items-center justify-between overflow-hidden rounded-[3px] border-2 border-ink bg-white px-1.5 font-mono text-[9px] font-black tracking-[0.2em] text-ink"
                      >
                        <span className="truncate">||| || ||||</span>
                        <span>VIIT26</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
