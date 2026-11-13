"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { FlapWord } from "./hero/FlapWord";
import { TypeLine } from "./hero/TypeLine";
import { SpinBadge } from "./hero/SpinBadge";
import { ParallaxShape, type ShapeKind } from "./hero/Shapes";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const FLAP_WORDS = ["BREAK.", "DEBUG.", "LEARN.", "SCALE."];

const TERMINAL_LINES = [
  "gdg join --campus viit",
  "npm run hackathon -- --hours=36",
  "git push origin main  # shipped ✓",
  "flutter create study_jam",
  "gcloud run deploy demo-day",
];

const WIPE_COLORS = ["bg-g-blue", "bg-g-red", "bg-g-yellow", "bg-g-green"];

const SHAPES: {
  kind: ShapeKind;
  color: string;
  size: number;
  depth: number;
  className: string;
  bobDelay: number;
  bobDuration: number;
}[] = [
  { kind: "sparkle", color: "#FBBC04", size: 46, depth: 34, className: "left-[47%] top-[7%] hidden sm:block", bobDelay: 0, bobDuration: 5.2 },
  { kind: "circle", color: "#4285F4", size: 34, depth: -22, className: "right-[4%] top-[6%] hidden lg:block", bobDelay: 1.1, bobDuration: 6 },
  { kind: "triangle", color: "#EA4335", size: 36, depth: 26, className: "left-[44%] bottom-[16%] hidden lg:block", bobDelay: 0.6, bobDuration: 4.6 },
  { kind: "squiggle", color: "#34A853", size: 84, depth: -18, className: "right-[3%] bottom-[5%] hidden md:block", bobDelay: 1.8, bobDuration: 5.6 },
  { kind: "plus", color: "#FFFFFF", size: 26, depth: 40, className: "left-[2%] top-[3%] hidden xl:block", bobDelay: 0.3, bobDuration: 4.2 },
  { kind: "half", color: "#34A853", size: 40, depth: -30, className: "right-[7%] top-[9%] block sm:hidden", bobDelay: 0.9, bobDuration: 5 },
];

type BlockDef = {
  id: string;
  color: string;
  textDark: boolean;
  pos: string;
  rotate: number;
  from: { x: number; y: number; r: number };
  pulse: { x: number; y: number };
  scatter: { x: number; y: number; r: number };
};

const BLOCKS: BlockDef[] = [
  {
    id: "01",
    color: "bg-g-red",
    textDark: false,
    pos: "left-2 top-11 sm:left-3 sm:top-12",
    rotate: -34,
    from: { x: -260, y: -200, r: -150 },
    pulse: { x: -10, y: -7 },
    scatter: { x: -150, y: -110, r: -50 },
  },
  {
    id: "02",
    color: "bg-g-blue",
    textDark: false,
    pos: "left-2 bottom-11 sm:left-3 sm:bottom-12",
    rotate: 34,
    from: { x: -260, y: 220, r: 150 },
    pulse: { x: -10, y: 7 },
    scatter: { x: -130, y: 150, r: 60 },
  },
  {
    id: "03",
    color: "bg-g-green",
    textDark: true,
    pos: "right-2 top-11 sm:right-3 sm:top-12",
    rotate: 34,
    from: { x: 260, y: -220, r: 160 },
    pulse: { x: 10, y: -7 },
    scatter: { x: 150, y: -130, r: 55 },
  },
  {
    id: "04",
    color: "bg-g-yellow",
    textDark: true,
    pos: "right-2 bottom-11 sm:right-3 sm:bottom-12",
    rotate: -34,
    from: { x: 260, y: 200, r: -160 },
    pulse: { x: 10, y: 7 },
    scatter: { x: 140, y: 140, r: -55 },
  },
];

/* Deterministic per-letter tilt so server and client render identically. */
const letterTilt = (i: number) => ((i * 47) % 13) - 6;

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function DropLetters({ text, delay, reduced }: { text: string; delay: number; reduced: boolean }) {
  return (
    <>
      {text.split("").map((ch, i) => {
        const r = letterTilt(i);
        return (
          <motion.span
            key={i}
            className="inline-block origin-bottom"
            initial={reduced ? false : { y: "-130%", rotate: r * 4, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 520, damping: 17, delay: delay + i * 0.055 }}
            whileHover={
              reduced
                ? undefined
                : { y: "-14%", rotate: r * 1.6, transition: { type: "spring", stiffness: 700, damping: 11 } }
            }
          >
            {ch}
          </motion.span>
        );
      })}
    </>
  );
}

function BracketBlock({
  block,
  index,
  reduced,
  progress,
}: {
  block: BlockDef;
  index: number;
  reduced: boolean;
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, [0, 1], [0, block.scatter.x]);
  const y = useTransform(progress, [0, 1], [0, block.scatter.y]);
  const rotate = useTransform(progress, [0, 1], [0, block.scatter.r]);

  return (
    // layer 1: scroll-driven scatter
    <motion.div style={reduced ? undefined : { x, y, rotate }} className={`absolute ${block.pos}`}>
      {/* layer 2: drag + spring home */}
      <motion.div
        drag
        dragSnapToOrigin
        dragElastic={0.6}
        dragTransition={{ bounceStiffness: 520, bounceDamping: 13 }}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.14 }}
        className="relative cursor-grab touch-none active:cursor-grabbing"
      >
        {/* layer 3: "compile" heartbeat — all four punch outward together */}
        <motion.div
          animate={reduced ? undefined : { x: [0, block.pulse.x, 0], y: [0, block.pulse.y, 0] }}
          transition={{ duration: 0.38, ease: "easeOut", repeat: Infinity, repeatDelay: 3.6, delay: 2.4 }}
        >
          {/* layer 4: fly-in entry */}
          <motion.div
            initial={
              reduced
                ? { rotate: block.rotate }
                : { x: block.from.x, y: block.from.y, rotate: block.from.r, opacity: 0 }
            }
            animate={{ x: 0, y: 0, rotate: block.rotate, opacity: 1 }}
            transition={
              reduced ? { duration: 0 } : { type: "spring", stiffness: 340, damping: 16, delay: 0.6 + index * 0.09 }
            }
            className={`flex h-11 w-28 items-center justify-between rounded-[6px] border-[3px] border-ink px-2.5 shadow-[6px_6px_0_#111] sm:h-12 sm:w-32 ${block.color}`}
          >
            {block.textDark ? (
              <>
                <span className="font-mono text-[10px] font-extrabold tracking-wider text-ink">BLK_{block.id}</span>
                <span className="h-2.5 w-2.5 rounded-full border-2 border-ink bg-cream" />
              </>
            ) : (
              <>
                <span className="h-2.5 w-2.5 rounded-full border-2 border-ink bg-cream" />
                <span className="font-mono text-[10px] font-extrabold tracking-wider text-white">BLK_{block.id}</span>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Sticker({
  children,
  className,
  rotate,
  delay,
  reduced,
  constraints,
}: {
  children: ReactNode;
  className: string;
  rotate: number;
  delay: number;
  reduced: boolean;
  constraints: RefObject<HTMLElement | null>;
}) {
  return (
    <motion.div
      drag
      dragConstraints={constraints}
      dragElastic={0.15}
      initial={reduced ? false : { scale: 1.6, rotate: rotate * 4, opacity: 0 }}
      animate={{ scale: 1, rotate, opacity: 1 }}
      transition={{ type: "spring", stiffness: 560, damping: 20, delay }}
      whileHover={{ scale: 1.06, rotate: 0 }}
      whileDrag={{ scale: 1.12, rotate: 0, boxShadow: "9px 9px 0 #111" }}
      className={`absolute z-30 cursor-grab touch-none select-none rounded-[4px] font-mono text-xs font-extrabold uppercase tracking-tight brutal-sticker active:cursor-grabbing sm:text-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const reduced = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLElement | null>(null);

  // failsafe: unmount the intro wipe even if CSS animations are throttled/paused
  const [wipeDone, setWipeDone] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setWipeDone(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  // cursor parallax (mouse only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 110, damping: 18, mass: 0.5 });
  const smy = useSpring(my, { stiffness: 110, damping: 18, mass: 0.5 });
  const tiltY = useTransform(smx, [-1, 1], [-9, 9]);
  const tiltX = useTransform(smy, [-1, 1], [7, -7]);

  // scroll: hero exit progress + page scroll velocity
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const line1X = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const line3X = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const enter = (delay: number) => ({
    initial: reduced ? false : ({ opacity: 0, y: 26 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring" as const, stiffness: 480, damping: 28, delay },
  });

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden pb-20 pt-8 sm:pb-24 sm:pt-12 lg:flex lg:min-h-[calc(100svh-5rem)] lg:items-center lg:py-16"
    >
      {/* intro wipe: four brand bars lift off the stage (pure CSS so it runs before hydration) */}
      {!wipeDone && (
        <div aria-hidden="true" className="hero-wipe pointer-events-none absolute inset-0 z-50 flex">
          {WIPE_COLORS.map((c, i) => (
            <div
              key={c}
              className={`hero-wipe-bar h-full flex-1 border-b-[3px] border-r-[3px] border-ink last:border-r-0 ${c}`}
              style={{ animationDelay: `${0.05 + i * 0.07}s` }}
            />
          ))}
        </div>
      )}

      {/* parallax background shapes */}
      {SHAPES.map((s) => (
        <ParallaxShape key={s.kind + s.className} {...s} mx={smx} my={smy} />
      ))}

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* ---------------- Left: copy ---------------- */}
          <div className="flex flex-col items-start lg:col-span-7">
            <motion.div
              {...enter(0.35)}
              className="mb-6 inline-flex items-center gap-2.5 rounded-[4px] border-[3px] border-ink bg-white px-3.5 py-1.5 font-mono text-xs font-extrabold tracking-tight text-ink shadow-[4px_4px_0_#111] sm:text-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-g-green opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-ink bg-g-green" />
              </span>
              <span>{"// google developer groups on campus"}</span>
            </motion.div>

            <h1
              id="hero-heading"
              className="select-none font-display text-[3.4rem] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-ink sm:text-7xl md:text-8xl xl:text-[6.4rem]"
            >
              <span className="sr-only">Build. Break. Ship.</span>
              <span aria-hidden="true" className="block">
                <motion.span style={reduced ? undefined : { x: line1X }} className="block whitespace-nowrap">
                  <DropLetters text="BUILD." delay={0.4} reduced={reduced} />
                </motion.span>
                <span className="my-2 block sm:my-3">
                  <FlapWord words={FLAP_WORDS} reduced={reduced} delay={0.7} hold={2800} />
                </span>
                <motion.span
                  style={reduced ? undefined : { x: line3X }}
                  className="flex items-center gap-[0.12em] whitespace-nowrap"
                >
                  <span>
                    <DropLetters text="SHIP." delay={1.05} reduced={reduced} />
                  </span>
                  <motion.span
                    initial={reduced ? false : { scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 14, delay: 1.45 }}
                    className="inline-block"
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="hero-spin h-[0.5em] w-[0.5em]"
                      style={{ filter: "drop-shadow(3px 3px 0 #111)", overflow: "visible" }}
                    >
                      <path
                        d="M50 2 C55 36 64 45 98 50 C64 55 55 64 50 98 C45 64 36 55 2 50 C36 45 45 36 50 2Z"
                        fill="#EA4335"
                        stroke="#111"
                        strokeWidth="3"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </motion.span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              {...enter(1.15)}
              className="mt-7 max-w-xl text-base font-medium leading-relaxed text-ink/90 sm:text-lg md:text-xl"
            >
              The student developer community at{" "}
              <strong className="font-extrabold underline decoration-g-red decoration-[3px] underline-offset-4">
                Vignan&apos;s Institute of Information Technology
              </strong>
              , Duvvada. Workshops, 36-hour hackathons, study jams and open-source sprints, run by students for
              students.
            </motion.p>

            <motion.div {...enter(1.25)} className="mt-8 flex w-full flex-wrap items-center gap-4 sm:w-auto">
              <a
                href="#events"
                className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-[6px] bg-g-blue px-6 py-4 font-mono text-sm font-extrabold uppercase tracking-tight text-white brutal-btn sm:flex-initial sm:text-base"
              >
                <span>Upcoming events</span>
                <span aria-hidden="true" className="text-lg leading-none transition-transform group-hover:translate-y-1">
                  ↓
                </span>
              </a>
              <a
                href="#join"
                className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-[6px] bg-white px-6 py-4 font-mono text-sm font-extrabold uppercase tracking-tight text-ink brutal-btn sm:flex-initial sm:text-base"
              >
                <span>Become a member</span>
                <span aria-hidden="true" className="text-lg leading-none transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>

            <motion.div
              {...enter(1.35)}
              className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs font-bold text-ink/80"
            >
              <span className="rounded-[4px] border-2 border-ink bg-white px-2.5 py-1">17.71° N · 83.17° E</span>
              <span className="rounded-[4px] border-2 border-dashed border-ink px-2.5 py-1">
                ✋ drag the blocks · peel the stickers
              </span>
            </motion.div>
          </div>

          {/* ---------------- Right: the rig ---------------- */}
          <motion.div
            style={reduced ? undefined : { y: stageY }}
            className="relative flex items-center justify-center lg:col-span-5"
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.45 }}
              style={reduced ? undefined : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1100 }}
              className="relative aspect-square w-full max-w-[460px] rounded-[8px] border-[3px] border-ink bg-white shadow-[10px_10px_0_#111]"
            >
              {/* window chrome */}
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between rounded-t-[5px] border-b-[3px] border-ink bg-cream px-3.5 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full border-2 border-ink bg-g-red" />
                  <span className="h-3 w-3 rounded-full border-2 border-ink bg-g-yellow" />
                  <span className="h-3 w-3 rounded-full border-2 border-ink bg-g-green" />
                </div>
                <span className="font-mono text-[11px] font-extrabold tracking-wide text-ink sm:text-xs">
                  ~/gdg-viit/rig.tsx
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] font-extrabold text-g-red">
                  <span className="hero-caret inline-block h-2 w-2 rounded-full bg-g-red" />
                  LIVE
                </span>
              </div>

              {/* stage body */}
              <div className="absolute inset-x-0 bottom-9 top-10 overflow-hidden">
                {/* dot grid */}
                <div className="bg-halftone absolute inset-0 opacity-60" />
                {/* orbit rings */}
                <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
                  <div className="hero-orbit relative aspect-square w-[82%] rounded-full border-[3px] border-dashed border-ink/25">
                    <span className="absolute -top-[10px] left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-ink bg-g-blue" />
                    <span className="absolute -bottom-[9px] left-[30%] h-3.5 w-3.5 rotate-45 border-[3px] border-ink bg-g-yellow" />
                  </div>
                </div>
                <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
                  <div className="hero-orbit-rev relative aspect-square w-[58%] rounded-full border-2 border-ink/20">
                    <span className="absolute -right-[8px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-[3px] border-[3px] border-ink bg-g-red" />
                    <span className="absolute -left-[7px] top-[30%] h-3 w-3 rounded-full border-[3px] border-ink bg-g-green" />
                  </div>
                </div>

                {/* the bracket */}
                <div className="absolute inset-0 grid place-items-center">
                  <div
                    role="img"
                    aria-label="GDG on Campus emblem built from four coloured blocks"
                    className="relative h-56 w-72 sm:h-64 sm:w-80"
                  >
                    {BLOCKS.map((b, i) => (
                      <BracketBlock key={b.id} block={b} index={i} reduced={reduced} progress={scrollYProgress} />
                    ))}
                    {/* caret between the brackets: < _ > */}
                    <motion.span
                      initial={reduced ? false : { scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 18, delay: 1.1 }}
                      className="absolute left-1/2 top-1/2 block h-14 w-5 -translate-x-1/2 -translate-y-1/2 sm:h-16 sm:w-6"
                    >
                      <span className="hero-caret block h-full w-full rounded-[3px] bg-ink" />
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* terminal strip */}
              <div className="absolute inset-x-0 bottom-0 flex h-9 items-center gap-2 rounded-b-[5px] border-t-[3px] border-ink bg-ink pl-24 pr-3.5 font-mono text-[11px] font-bold text-cream sm:pl-28 sm:text-xs">
                <span className="text-g-green">❯</span>
                <TypeLine lines={TERMINAL_LINES} reduced={reduced} />
              </div>
            </motion.div>

            {/* spinning badge — spins up with scroll speed */}
            <motion.div
              initial={reduced ? false : { scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 15, delay: 1.3 }}
              className="absolute -bottom-12 -left-1 z-20 sm:-bottom-14 sm:-left-8"
            >
              <SpinBadge reduced={reduced} velocity={scrollVelocity} className="w-24 sm:w-32" />
            </motion.div>

            {/* peelable stickers */}
            <Sticker
              constraints={heroRef}
              reduced={reduced}
              rotate={-5}
              delay={1.5}
              className="-left-1 top-[18%] bg-g-yellow px-3.5 py-1.5 text-ink sm:-left-10"
            >
              ✦ est. on campus
            </Sticker>
            <Sticker
              constraints={heroRef}
              reduced={reduced}
              rotate={4}
              delay={1.6}
              className="-right-1 -top-4 bg-g-green px-3.5 py-1.5 text-ink sm:-right-5"
            >
              free to join
            </Sticker>
            <Sticker
              constraints={heroRef}
              reduced={reduced}
              rotate={-3}
              delay={1.7}
              className="-bottom-6 right-3 bg-g-red px-4 py-2 text-white sm:right-6"
            >
              ⚡ all branches welcome
            </Sticker>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
