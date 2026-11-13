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
      "Deployed 3 campus web tools during exam week and still made the 8:30 AM lecture.",
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
      "Has 42 custom Neovim keymaps and debugs Kubernetes YAML files for fun.",
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
      "Can spot a 1px alignment error from across the VIIT Seminar Hall.",
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
      "Orchestrated a 36-hour hackathon for 200+ students powered by filter coffee.",
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
      "Onboarded 180+ first-year students to their very first open-source pull request.",
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
      "Turns complex system design architectures into 60-second visual breakdowns.",
    stack: "Astro · MDX · Vertex AI",
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
      className="py-16 sm:py-24 border-t-[3px] border-ink bg-white/50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-[4px] border-[3px] border-ink bg-g-yellow px-3 py-1 font-mono text-xs font-extrabold uppercase text-ink shadow-[3px_3px_0_#111]">
              <span>05 — &lt;team/&gt; core crew</span>
            </div>
            <h2
              id="team-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] text-ink"
            >
              Meet the{" "}
              <span className="inline-block rounded-[4px] border-[3px] border-ink bg-g-blue px-2.5 py-0.5 text-white shadow-[4px_4px_0_#111] -rotate-1">
                organizers.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs sm:text-sm font-bold text-ink/80">
            {"// Hover or tap any campus ID badge to flip it over for fun facts, favorite stack, and socials."}
          </p>
        </div>

        {/* 6 ID-Card Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                className={`group perspective-1000 h-[430px] cursor-pointer select-none ${
                  isFlipped ? "is-flipped" : ""
                }`}
              >
                <div className="preserve-3d group-hover-flip relative h-full w-full">
                  {/* FRONT OF ID BADGE */}
                  <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-[8px] border-[3px] border-ink bg-white p-5 shadow-[6px_6px_0_#111]">
                    {/* Top Lanyard Slot Notch + Serial Header */}
                    <div>
                      <div className="mx-auto mb-3 flex flex-col items-center">
                        <div className="h-3 w-4 border-x-[3px] border-t-[3px] border-ink bg-g-yellow" />
                        <div
                          aria-hidden="true"
                          className="h-3.5 w-16 rounded-full border-[3px] border-ink bg-cream shadow-inner"
                        />
                      </div>

                      <div className="flex items-center justify-between border-b-[3px] border-ink pb-2.5">
                        <span className="font-mono text-xs font-extrabold text-ink">
                          {member.badgeCode}
                        </span>
                        <span
                          className={`rounded-[4px] border-2 border-ink px-2.5 py-0.5 font-mono text-xs font-extrabold uppercase shadow-[2px_2px_0_#111] ${member.roleBg}`}
                        >
                          {member.role}
                        </span>
                      </div>
                    </div>

                    {/* Avatar Image with 3px Solid Ink Border */}
                    <div className="my-3 flex justify-center">
                      <div className="relative h-44 w-44 overflow-hidden rounded-[6px] border-[3px] border-ink bg-cream shadow-[4px_4px_0_#111]">
                        <Image
                          src={member.avatar}
                          alt={`Geometric portrait avatar for ${member.role} (${member.name})`}
                          width={400}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Member Name & ID Footer */}
                    <div className="border-t-[3px] border-ink pt-3 flex items-end justify-between">
                      <div>
                        <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight leading-none text-ink">
                          {member.name}
                        </h3>
                        <p className="mt-1 font-mono text-xs font-bold text-ink/75">
                          {member.branchYear}
                        </p>
                      </div>
                      <span className="rounded-[4px] border-2 border-ink bg-cream px-2 py-1 font-mono text-[10px] font-extrabold uppercase text-ink">
                        FLIP ↻
                      </span>
                    </div>
                  </div>

                  {/* BACK OF ID BADGE (3D rotateY 180deg) */}
                  <div
                    className={`backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-[8px] border-[3px] border-ink p-5 shadow-[6px_6px_0_#111] ${member.backBg} ${member.backText}`}
                  >
                    {/* Lanyard Hole on Back */}
                    <div>
                      <div className="mx-auto mb-3 flex flex-col items-center">
                        <div
                          aria-hidden="true"
                          className="h-3.5 w-16 rounded-full border-[3px] border-ink bg-cream"
                        />
                      </div>

                      <div className="flex items-center justify-between border-b-[3px] border-ink pb-2.5">
                        <span className="rounded-[4px] border-2 border-ink bg-white px-2.5 py-0.5 font-mono text-xs font-extrabold uppercase text-ink">
                          {member.role}
                        </span>
                        <span className="font-mono text-xs font-extrabold uppercase">
                          {"// CLEARANCE: CORE"}
                        </span>
                      </div>
                    </div>

                    {/* Fun Fact & Stack */}
                    <div className="my-auto rounded-[6px] border-[3px] border-ink bg-white p-4 text-ink shadow-[4px_4px_0_#111]">
                      <span className="inline-block rounded-[3px] border-2 border-ink bg-g-yellow px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase text-ink">
                        FUN FACT
                      </span>
                      <p className="mt-2 text-sm font-semibold leading-snug text-ink">
                        &ldquo;{member.funFact}&rdquo;
                      </p>
                      <div className="mt-3 border-t-2 border-ink/20 pt-2">
                        <span className="block font-mono text-[10px] font-bold uppercase text-ink/70">
                          FAVORITE STACK
                        </span>
                        <span className="font-mono text-xs font-extrabold text-ink">
                          {member.stack}
                        </span>
                      </div>
                    </div>

                    {/* Social Links & Barcode Strip */}
                    <div>
                      <div className="flex items-center justify-between gap-2">
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
                            className="flex-1 rounded-[4px] bg-cream py-2 text-center font-mono text-xs font-extrabold text-ink brutal-btn"
                          >
                            {soc.label} ↗
                          </a>
                        ))}
                      </div>
                      <div
                        aria-hidden="true"
                        className="mt-3 flex h-5 items-center justify-between rounded-[3px] border-2 border-ink bg-white px-2 font-mono text-[10px] font-black tracking-[0.25em] text-ink"
                      >
                        <span>||| || |||| | ||| ||||</span>
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
