"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";

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
    backBg: "bg-g-green",
    backText: "text-ink",
    focus: "Leads web workshops and builds the chapter site.",
    stack: "Next.js · TypeScript",
  },
  "Cloud Lead": {
    roleBg: "bg-g-red text-white",
    backBg: "bg-g-green",
    backText: "text-ink",
    focus: "Runs Cloud study jams and skill-badge drives.",
    stack: "Google Cloud · Docker",
  },
  "AI/ML Lead": {
    roleBg: "bg-g-yellow text-ink",
    backBg: "bg-g-green",
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
    backBg: "bg-g-green",
    backText: "text-ink",
    focus: "Designs the chapter's look, posters and UI.",
    stack: "Figma · Design",
  },
  "Events Lead": {
    roleBg: "bg-g-red text-white",
    backBg: "bg-g-yellow",
    backText: "text-ink",
    focus: "Plans and runs workshops and hackathons.",
    stack: "Logistics · Ops",
  },
  "Content Lead": {
    roleBg: "bg-g-green text-ink",
    backBg: "bg-g-yellow",
    backText: "text-ink",
    focus: "Writes the posts, recaps and event copy.",
    stack: "Writing · Docs",
  },
  "Social Media Lead": {
    roleBg: "bg-g-blue text-white",
    backBg: "bg-g-yellow",
    backText: "text-ink",
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
  { id: "manivarshith", name: "Manivarshith Rongali", role: "Organiser", branchYear: "CSE · III Year", photo: "/team/Manivarshith.jpeg" },
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

/** Two tiers: core leadership (Organisers + Co-Lead) on top, domain leads below. */
const LEADERSHIP = TEAM_MEMBERS.filter((m) => m.role === "Organiser" || m.role === "Co-Lead");
const DOMAIN_LEADS = TEAM_MEMBERS.filter((m) => m.role !== "Organiser" && m.role !== "Co-Lead");

function initials(name: string) {
  const parts = name.replace(/\./g, " ").split(/\s+/).filter((p) => p.length > 1);
  const picked = parts.length > 1 ? [parts[0], parts[parts.length - 1]] : parts;
  return picked.map((p) => p[0]).join("").toUpperCase();
}

/** Photo slot: shows the photo when set, otherwise a dashed placeholder with initials. */
function PhotoSlot({ member }: { member: TeamMember }) {
  return (
    <div className="relative h-44 w-44 sm:h-32 sm:w-32 overflow-hidden rounded-[8px] border-[3px] border-ink bg-cream shadow-[4px_4px_0_#111]">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`Photo of ${member.name}, ${member.role}`}
          width={320}
          height={320}
          className="h-full w-full object-cover object-[center_25%]"
        />
      ) : (
        <div
          role="img"
          aria-label={`Photo placeholder for ${member.name}`}
          className="flex h-full w-full flex-col items-center justify-center gap-1 bg-halftone"
        >
          <div className="flex h-[78%] w-[78%] flex-col items-center justify-center rounded-[4px] border-2 border-dashed border-ink/60 bg-white/80">
            <span className="font-display text-4xl sm:text-3xl font-extrabold leading-none text-ink">
              {initials(member.name)}
            </span>
            <span className="mt-1 font-mono text-[9px] font-extrabold uppercase tracking-wider text-ink/60">
              Photo
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

const SOCIALS = [
  { label: "GH", title: "GitHub" },
  { label: "IN", title: "LinkedIn" },
];

interface IdCardProps {
  member: TeamMember;
  badgeNo: number;
  delay: number;
  isFlipped: boolean;
  onToggle: () => void;
  springConfig: { duration: number } | { type: "spring"; stiffness: number; damping: number };
  reducedMotion: boolean;
}

function IdCard({ member, badgeNo, delay, isFlipped, onToggle, springConfig, reducedMotion }: IdCardProps) {
  const style = ROLE_STYLES[member.role];
  const badgeCode = `VIIT-ID-${String(badgeNo).padStart(3, "0")}`;

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...springConfig, delay: reducedMotion ? 0 : delay }}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      role="button"
      aria-pressed={isFlipped}
      tabIndex={0}
      aria-label={`${member.role} ID card for ${member.name}. Tap, click or press Enter to flip.`}
      className={`group perspective-1000 h-[390px] w-[78vw] max-w-[300px] shrink-0 snap-center sm:h-[350px] sm:w-full sm:max-w-none cursor-pointer select-none ${
        isFlipped ? "is-flipped" : ""
      }`}
    >
      <div className="preserve-3d group-hover-flip relative h-full w-full">
        {/* FRONT OF ID BADGE */}
        <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-[10px] border-[3px] border-ink bg-white p-3 sm:p-4 shadow-[5px_5px_0_#111]">
          {/* Top Lanyard Slot Notch + Serial Header */}
          <div>
            <div className="mx-auto mb-2 flex flex-col items-center">
              <div className="h-2.5 w-5 border-x-[3px] border-t-[3px] border-ink bg-g-yellow" />
              <div
                aria-hidden="true"
                className="h-3.5 w-14 rounded-full border-[3px] border-ink bg-cream shadow-inner"
              />
            </div>

            <div className="flex items-center justify-between gap-1 border-b-[3px] border-ink pb-2">
              <span className="truncate font-mono text-[10px] sm:text-[11px] font-extrabold text-ink">
                {badgeCode}
              </span>
              <span className="shrink-0 rounded-[3px] border-2 border-ink bg-cream px-1.5 font-mono text-[10px] font-extrabold uppercase text-ink">
                ↻
              </span>
            </div>
          </div>

          {/* Photo slot */}
          <div className="my-2 flex justify-center">
            <PhotoSlot member={member} />
          </div>

          {/* Role, Name & Branch Footer */}
          <div className="border-t-[3px] border-ink pt-2">
            <span
              className={`inline-block max-w-full truncate rounded-[3px] border-2 border-ink px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-extrabold uppercase shadow-[2px_2px_0_#111] ${style.roleBg}`}
            >
              {member.role}
            </span>
            <h3 className="mt-2 line-clamp-2 font-display text-sm sm:text-lg font-extrabold uppercase tracking-tight leading-[1.05] text-ink">
              {member.name}
            </h3>
            <p className="mt-1 truncate font-mono text-[10px] sm:text-[11px] font-bold text-ink/75">
              {member.branchYear}
            </p>
          </div>
        </div>

        {/* BACK OF ID BADGE (3D rotateY 180deg) */}
        <div
          className={`backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-[10px] border-[3px] border-ink p-3.5 sm:p-5 shadow-[5px_5px_0_#111] ${style.backBg} ${style.backText}`}
        >
          {/* Lanyard Hole on Back */}
          <div>
            <div className="mx-auto mb-2 flex flex-col items-center">
              <div
                aria-hidden="true"
                className="h-3.5 w-14 rounded-full border-[3px] border-ink bg-cream"
              />
            </div>

            <div className="border-b-[3px] border-ink pb-2">
              <span className="inline-block max-w-full truncate rounded-[3px] border-2 border-ink bg-white px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-extrabold uppercase text-ink">
                {member.role}
              </span>
            </div>
          </div>

          {/* Focus & Stack */}
          <div className="my-auto rounded-[8px] border-[3px] border-ink bg-white p-2.5 sm:p-3.5 text-ink shadow-[4px_4px_0_#111]">
            <span className="inline-block rounded-[3px] border-2 border-ink bg-g-yellow px-1.5 font-mono text-[10px] font-extrabold uppercase text-ink">
              FOCUS
            </span>
            <p className="mt-1.5 text-[11px] sm:text-sm font-semibold leading-snug text-ink">
              {style.focus}
            </p>
            <div className="mt-2 border-t-2 border-ink/20 pt-1.5">
              <span className="block truncate font-mono text-[10px] sm:text-xs font-extrabold text-ink">
                {style.stack}
              </span>
            </div>
          </div>

          {/* Social Links & Barcode Strip */}
          <div>
            <div className="flex items-center justify-between gap-2">
              {SOCIALS.map((soc) => (
                <a
                  key={soc.label}
                  href="#team"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${member.name} (${member.role}) on ${soc.title}`}
                  className="flex-1 rounded-[4px] bg-cream py-1 text-center font-mono text-[10px] sm:text-xs font-extrabold text-ink brutal-btn"
                >
                  {soc.label}
                </a>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="mt-2.5 flex h-5 items-center justify-between overflow-hidden rounded-[3px] border-2 border-ink bg-white px-2 font-mono text-[10px] font-black tracking-[0.2em] text-ink"
            >
              <span className="truncate">|||||</span>
              <span className="shrink-0 tracking-[0.08em]">GDG ON CAMPUS · VIIT26</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TierLabel({ label, count, bg }: { label: string; count: number; bg: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        className={`shrink-0 rounded-[4px] border-[3px] border-ink px-2.5 py-1 font-mono text-[11px] font-extrabold uppercase shadow-[3px_3px_0_#111] ${bg}`}
      >
        {label}
      </span>
      <span aria-hidden="true" className="h-[3px] flex-1 bg-ink/15" />
      <span className="shrink-0 font-mono text-[11px] font-extrabold text-ink/60">
        {String(count).padStart(2, "0")} MEMBERS
      </span>
      {/* Mobile-only swipe hint */}
      <span
        aria-hidden="true"
        className="inline-flex shrink-0 items-center gap-1 rounded-[3px] border-2 border-ink bg-g-yellow px-1.5 py-0.5 font-mono text-[10px] font-extrabold uppercase text-ink sm:hidden"
      >
        Swipe <span className="animate-swipe-nudge inline-block">→</span>
      </span>
    </div>
  );
}

/**
 * Phones: one horizontal row that scrolls sideways, with the next card peeking in.
 * The first time the row comes into view it nudges sideways and back, so it's clear it swipes.
 * From `sm` up it becomes a normal grid (`gridClass`).
 */
function SwipeRow({
  children,
  gridClass,
  reducedMotion,
  label,
}: {
  children: ReactNode;
  gridClass: string;
  reducedMotion: boolean;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el || reducedMotion) return;
    if (!window.matchMedia("(max-width: 639px)").matches) return;
    if (el.scrollWidth <= el.clientWidth || el.scrollLeft > 0) return;
    // Slide the row left and back (a transform, so it works regardless of scroll-snap / smooth-scroll support).
    const anim = el.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-80px)", offset: 0.45 },
        { transform: "translateX(-80px)", offset: 0.6 },
        { transform: "translateX(0)" },
      ],
      { duration: 1300, delay: 400, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
    return () => anim.cancel();
  }, [inView, reducedMotion]);

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={`-mx-4 flex flex-row flex-nowrap gap-4 overflow-x-auto px-4 pb-4 pt-1 snap-x snap-mandatory scroll-px-4 sm:mx-0 sm:grid sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 ${gridClass}`}
    >
      {children}
    </div>
  );
}

export default function Team() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 500, damping: 28 } as const);

  const renderTier = (members: TeamMember[], offset: number) =>
    members.map((member, i) => (
      <IdCard
        key={member.id}
        member={member}
        badgeNo={offset + i + 1}
        delay={(i % 4) * 0.06}
        isFlipped={Boolean(flippedIds[member.id])}
        onToggle={() => toggleFlip(member.id)}
        springConfig={springConfig}
        reducedMotion={prefersReducedMotion}
      />
    ));

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="overflow-x-clip py-10 sm:py-12 border-t-[3px] border-ink bg-white/50"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
            {"// Hover or tap a badge to flip it. Tap again to flip back."}
          </p>
        </div>

        {/* Tier 1: Core leadership — 3 Organisers + Co-Lead, one full row of 4 */}
        <TierLabel label="Core leadership" count={LEADERSHIP.length} bg="bg-g-blue text-white" />
        <SwipeRow label="Core leadership" gridClass="sm:grid-cols-2 lg:grid-cols-4" reducedMotion={prefersReducedMotion}>
          {renderTier(LEADERSHIP, 0)}
        </SwipeRow>

        {/* Tier 2: Domain leads — 4-column grid below a divider */}
        <div className="mt-8 sm:mt-10 border-t-[3px] border-dashed border-ink/25 pt-6 sm:pt-8">
          <TierLabel label="Domain leads" count={DOMAIN_LEADS.length} bg="bg-g-green text-ink" />
          <SwipeRow label="Domain leads" gridClass="sm:grid-cols-3 lg:grid-cols-4" reducedMotion={prefersReducedMotion}>
            {renderTier(DOMAIN_LEADS, LEADERSHIP.length)}
          </SwipeRow>
        </div>
      </div>
    </section>
  );
}
