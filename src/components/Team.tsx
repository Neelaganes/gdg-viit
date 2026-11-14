"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

/* ------------------------------------------------------------------ */
/*  Role styling + back-of-card copy, shared by everyone in that role  */
/* ------------------------------------------------------------------ */

interface RoleStyle {
  roleBg: string;
  backBg: string;
  backText: string;
  focus: string;
  stack: string;
}

const ROLE_STYLES: Record<string, RoleStyle> = {
  Organiser: {
    roleBg: "bg-g-blue text-white",
    backBg: "bg-g-blue",
    backText: "text-white",
    focus: "Runs the chapter and keeps every event on track.",
    stack: "Planning · Community",
  },
  "Co-Lead": {
    roleBg: "bg-g-red text-white",
    backBg: "bg-g-red",
    backText: "text-white",
    focus: "Backs the organisers across every team.",
    stack: "Leadership · Ops",
  },
  "Web Dev Lead": {
    roleBg: "bg-g-blue text-white",
    backBg: "bg-g-blue",
    backText: "text-white",
    focus: "Leads web workshops and builds the chapter site.",
    stack: "Next.js · TypeScript",
  },
  "Cloud Lead": {
    roleBg: "bg-g-red text-white",
    backBg: "bg-g-red",
    backText: "text-white",
    focus: "Runs Cloud study jams and skill-badge drives.",
    stack: "Google Cloud · Docker",
  },
  "AI/ML Lead": {
    roleBg: "bg-g-yellow text-ink",
    backBg: "bg-g-yellow",
    backText: "text-ink",
    focus: "Leads Gemini and machine-learning sessions.",
    stack: "Gemini · Python",
  },
  "CP/DSA Lead": {
    roleBg: "bg-g-green text-ink",
    backBg: "bg-g-green",
    backText: "text-ink",
    focus: "Runs coding contests and DSA practice.",
    stack: "C++ · Algorithms",
  },
  "UI/UX Lead": {
    roleBg: "bg-g-yellow text-ink",
    backBg: "bg-g-yellow",
    backText: "text-ink",
    focus: "Designs the chapter's look, posters and UI.",
    stack: "Figma · Design",
  },
  "Events Lead": {
    roleBg: "bg-g-red text-white",
    backBg: "bg-g-red",
    backText: "text-white",
    focus: "Plans and runs workshops and hackathons.",
    stack: "Logistics · Ops",
  },
  "Content Lead": {
    roleBg: "bg-g-green text-ink",
    backBg: "bg-g-green",
    backText: "text-ink",
    focus: "Writes the posts, recaps and event copy.",
    stack: "Writing · Docs",
  },
  "Social Media Lead": {
    roleBg: "bg-g-blue text-white",
    backBg: "bg-g-blue",
    backText: "text-white",
    focus: "Runs the chapter's social channels.",
    stack: "Instagram · LinkedIn",
  },
};

/* ------------------------------------------------------------------ */
/*  Team members, in display order                                     */
/*                                                                     */
/*  To add a photo: put the image in /public/team/ and set `photo`,    */
/*  e.g.  photo: "/team/anshika.jpg"  (square images work best).       */
/*  Until then the card shows a photo slot with the person's initials. */
/* ------------------------------------------------------------------ */

interface TeamMember {
  id: string;
  name: string;
  role: keyof typeof ROLE_STYLES;
  branchYear: string;
  photo?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  // Organisers
  { id: "anshika", name: "Anshika Vishwakarma", role: "Organiser", branchYear: "CSE (AI) · IV Year", photo: "/team/Anshika.jpg" },
  { id: "deepanwitha", name: "Deepanwitha Gopisetty", role: "Organiser", branchYear: "CSE · III Year", photo: "/team/Deepanwitha Gopisetty.jpg" },
  { id: "manivarshith", name: "Manivarshith Rongali", role: "Organiser", branchYear: "CSE · III Year" },
  // Co-Lead
  { id: "danush", name: "Kaviti Danush", role: "Co-Lead", branchYear: "CSE (AI) · III Year", photo: "/team/Kaviti Danush.jpg" },
  // Technical leads
  { id: "neela-ganesh", name: "D. Neela Ganesh", role: "Web Dev Lead", branchYear: "CSE · III Year", photo: "/team/Neelaganesh D.jpg" },
  { id: "kousik", name: "Kousik Puppala", role: "Web Dev Lead", branchYear: "CSE · III Year", photo: "/team/kousik Puppala.png" },
  { id: "sahithi", name: "Sahithi", role: "Cloud Lead", branchYear: "CSE · III Year", photo: "/team/Sahithi.png" },
  { id: "siri-vennela", name: "Siri Vennela", role: "AI/ML Lead", branchYear: "CSE (AI) · III Year", photo: "/team/Siri Vennela.jpg" },
  { id: "sri-praneeth", name: "Chakka Sri Praneeth", role: "CP/DSA Lead", branchYear: "CSE · III Year", photo: "/team/Praneeth Chakka.png" },
  { id: "harshitha", name: "Channa Venkata Harshitha", role: "UI/UX Lead", branchYear: "CSE · III Year", photo: "/team/Harshitha Channa.jpg" },
  // Events, content & outreach
  { id: "ahamed-raza", name: "Md Ahamed Raza", role: "Events Lead", branchYear: "CSE · III Year", photo: "/team/Raza.jpeg" },
  { id: "jahnavi", name: "Yenneti Jahnavi", role: "Events Lead", branchYear: "CSE (AI) · III Year", photo: "/team/Yenneti JAHNAVI.jpg" },
  { id: "nishanth", name: "Nishanth Varma", role: "Content Lead", branchYear: "CSE · III Year", photo: "/team/nishanth-varma.jpg" },
  { id: "prasanna", name: "Prasanna Yerra", role: "Content Lead", branchYear: "CSE (AI) · III Year", photo: "/team/Prasanna Yerra.png" },
  { id: "srikanth", name: "Srikanth Kadiri", role: "Social Media Lead", branchYear: "CSE (AI) · II Year", photo: "/team/Srikanth.jpg" },
];

function initials(name: string) {
  const parts = name.replace(/\./g, " ").split(/\s+/).filter((p) => p.length > 1);
  const picked = parts.length > 1 ? [parts[0], parts[parts.length - 1]] : parts;
  return picked.map((p) => p[0]).join("").toUpperCase();
}

/** Photo slot: shows the photo when set, otherwise a dashed placeholder with initials. */
function PhotoSlot({ member }: { member: TeamMember }) {
  return (
    <div className="relative h-24 w-24 overflow-hidden rounded-[6px] border-[3px] border-ink bg-cream shadow-[3px_3px_0_#111]">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`Photo of ${member.name}, ${member.role}`}
          width={240}
          height={240}
          className="h-full w-full object-cover object-[center_25%]"
        />
      ) : (
        <div
          role="img"
          aria-label={`Photo placeholder for ${member.name}`}
          className="flex h-full w-full flex-col items-center justify-center gap-1 bg-halftone"
        >
          <div className="flex h-[78%] w-[78%] flex-col items-center justify-center rounded-[4px] border-2 border-dashed border-ink/60 bg-white/80">
            <span className="font-display text-2xl font-extrabold leading-none text-ink">
              {initials(member.name)}
            </span>
            <span className="mt-1 font-mono text-[8px] font-extrabold uppercase tracking-wider text-ink/60">
              Photo
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

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

        {/* 15 ID-Cards in a wrapping flex row: 5 per row on desktop */}
        <div className="flex flex-row flex-wrap justify-center gap-4">
          {TEAM_MEMBERS.map((member, idx) => {
            const isFlipped = Boolean(flippedIds[member.id]);
            const style = ROLE_STYLES[member.role];
            const badgeCode = `VIIT-ID-${String(idx + 1).padStart(3, "0")}`;
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
                  delay: prefersReducedMotion ? 0 : (idx % 5) * 0.065,
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
                aria-label={`${member.role} ID card for ${member.name}. Activate or hover to flip for more.`}
                className={`group perspective-1000 h-[275px] basis-[calc((100%-1rem)/2)] sm:basis-[calc((100%-2rem)/3)] lg:basis-[calc((100%-4rem)/5)] cursor-pointer select-none ${
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
                          {badgeCode}
                        </span>
                        <span className="shrink-0 rounded-[3px] border-2 border-ink bg-cream px-1 font-mono text-[9px] font-extrabold uppercase text-ink">
                          ↻
                        </span>
                      </div>
                    </div>

                    {/* Photo slot */}
                    <div className="my-1.5 flex justify-center">
                      <PhotoSlot member={member} />
                    </div>

                    {/* Role, Name & Branch Footer */}
                    <div className="border-t-[3px] border-ink pt-1.5">
                      <span
                        className={`inline-block max-w-full truncate rounded-[3px] border-2 border-ink px-1.5 py-0.5 font-mono text-[9px] font-extrabold uppercase shadow-[2px_2px_0_#111] ${style.roleBg}`}
                      >
                        {member.role}
                      </span>
                      <h3 className="mt-1.5 line-clamp-2 font-display text-sm sm:text-[15px] font-extrabold uppercase tracking-tight leading-[1.05] text-ink">
                        {member.name}
                      </h3>
                      <p className="mt-0.5 truncate font-mono text-[9px] font-bold text-ink/75">
                        {member.branchYear}
                      </p>
                    </div>
                  </div>

                  {/* BACK OF ID BADGE (3D rotateY 180deg) */}
                  <div
                    className={`backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-[8px] border-[3px] border-ink p-2.5 shadow-[4px_4px_0_#111] ${style.backBg} ${style.backText}`}
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

                    {/* Focus & Stack */}
                    <div className="my-auto rounded-[6px] border-[3px] border-ink bg-white p-2 text-ink shadow-[3px_3px_0_#111]">
                      <span className="inline-block rounded-[3px] border-2 border-ink bg-g-yellow px-1 font-mono text-[9px] font-extrabold uppercase text-ink">
                        FOCUS
                      </span>
                      <p className="mt-1 text-[11px] font-semibold leading-snug text-ink">
                        {style.focus}
                      </p>
                      <div className="mt-1.5 border-t-2 border-ink/20 pt-1">
                        <span className="block truncate font-mono text-[10px] font-extrabold text-ink">
                          {style.stack}
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
