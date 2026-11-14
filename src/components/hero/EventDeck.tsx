"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { animate } from "motion/react";

/* ------------------------------------------------------------------ */
/* Event polaroid deck                                                 */
/* A tossed stack of real event photos. Fling (or tap) the top card    */
/* and it flies off and slides to the back. Auto-advances until the    */
/* visitor touches it.                                                 */
/* ------------------------------------------------------------------ */

type EventShot = {
  src: string;
  alt: string;
  caption: string;
  event: string;
  date: string;
  tape: string;
};

// Photos: GDG on Campus VIIT LinkedIn posts (linkedin.com/company/gdg-oncampus-viit)
// and the SusHacks 3.0 gallery (sushacks.in/gallery).
const SHOTS: EventShot[] = [
  {
    src: "/images/events/sushacks-the-crew.webp",
    alt: "The SusHacks 3.0 organising crew in matching black tees lined up in the lab, one holding a 'No sleep!' sign",
    caption: "The crew. No sleep.",
    event: "SusHacks 3.0 · 24-hr hackathon",
    date: "4–5 APR 2026",
    tape: "bg-g-red",
  },
  {
    src: "/images/events/study-jam-swags.webp",
    alt: "A student receiving a Google Cloud Study Jam swag kit from a faculty member on stage",
    caption: "110 swags, earned",
    event: "Google Cloud Study Jam",
    date: "MAR 2026",
    tape: "bg-g-yellow",
  },
  {
    src: "/images/events/code-blitz-finals.webp",
    alt: "A computer lab full of students competing in the Code Blitz final round",
    caption: "Top 50, one lab",
    event: "Code Blitz × AlgoZenith",
    date: "07 FEB 2026",
    tape: "bg-g-blue",
  },
  {
    src: "/images/events/ai-frontier-talk.webp",
    alt: "A student speaker with a microphone presenting to a seminar hall at The New AI Frontier info session",
    caption: "The New AI Frontier",
    event: "Info session",
    date: "18 DEC 2025",
    tape: "bg-g-green",
  },
  {
    src: "/images/events/sushacks-final-demos.webp",
    alt: "A team presenting their project on a large screen to the judges at SusHacks 3.0",
    caption: "Final demos",
    event: "SusHacks 3.0 · 24-hr hackathon",
    date: "4–5 APR 2026",
    tape: "bg-g-green",
  },
  {
    src: "/images/events/code-blitz-podium.webp",
    alt: "Code Blitz winners holding their prizes with faculty mentors",
    caption: "Code Blitz podium",
    event: "Code Blitz × AlgoZenith",
    date: "07 FEB 2026",
    tape: "bg-g-red",
  },
];

// Deterministic "tossed" angle per card so SSR and client agree.
const TOSS = [-4, 5, -7, 3, -2, 6];
const VISIBLE = 4;

const SPRING = { type: "spring", stiffness: 380, damping: 26 } as const;
const FLING = { duration: 0.32, ease: [0.5, 0, 0.75, 0] } as const;

const rest = (card: number, depth: number) => ({
  x: Math.min(depth, VISIBLE - 1) * 8,
  y: Math.min(depth, VISIBLE - 1) * -7,
  rotate: depth === 0 ? TOSS[card] * 0.5 : TOSS[card],
  scale: 1 - Math.min(depth, VISIBLE - 1) * 0.03,
  opacity: depth < VISIBLE ? 1 : 0,
});

const restCss = (card: number, depth: number) => {
  const r = rest(card, depth);
  return `translateX(${r.x}px) translateY(${r.y}px) rotate(${r.rotate}deg) scale(${r.scale})`;
};

export function EventDeck({ reduced, delay = 0 }: { reduced: boolean; /** seconds */ delay?: number }) {
  const [order, setOrder] = useState(() => SHOTS.map((_, i) => i));
  const orderRef = useRef(order);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const started = useRef(reduced);
  const touched = useRef(false);
  const busy = useRef(false);
  const drag = useRef({ on: false, x0: 0, y0: 0, dx: 0, dy: 0, t0: 0 });

  // keep every card at its resting spot whenever the order changes
  useEffect(() => {
    const prevTop = orderRef.current[0];
    orderRef.current = order;
    if (!started.current) return;
    order.forEach((card, depth) => {
      const el = cardRefs.current[card];
      if (!el) return;
      // a card that was just flung off jumps straight to the back of the
      // stack (hidden behind the others) instead of springing back across
      const flungToBack = card === prevTop && depth === order.length - 1;
      animate(el, rest(card, depth), reduced || flungToBack ? { duration: 0 } : SPRING);
    });
  }, [order, reduced]);

  // entrance: deal the stack in from below, back card first
  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => {
      started.current = true;
      const o = orderRef.current;
      [...o].reverse().forEach((card, k) => {
        const el = cardRefs.current[card];
        if (!el) return;
        const r = rest(card, o.indexOf(card));
        animate(
          el,
          { x: [r.x, r.x], y: [260, r.y], rotate: [TOSS[card] * 4, r.rotate], scale: [r.scale, r.scale], opacity: [0, r.opacity] },
          { ...SPRING, delay: k * 0.08 },
        );
      });
    }, delay * 1000);
    return () => window.clearTimeout(t);
  }, [reduced, delay]);

  const stageWidth = () => stageRef.current?.clientWidth ?? 480;

  const next = (dir = 1, dy = 0) => {
    const o = orderRef.current;
    const top = cardRefs.current[o[0]];
    if (!top || busy.current) return;
    busy.current = true;
    const done = () => {
      busy.current = false;
      setOrder((cur) => [...cur.slice(1), cur[0]]);
    };
    if (reduced) return done();
    animate(top, { x: dir * stageWidth() * 1.1, y: dy * 2.5, rotate: dir * 26 }, FLING).then(done);
  };

  const prev = () => {
    const o = orderRef.current;
    const card = o[o.length - 1];
    const el = cardRefs.current[card];
    if (!el || busy.current) return;
    // park it off to the left on top, then the order effect springs it in
    if (!reduced) animate(el, { x: -stageWidth() * 1.1, y: 0, rotate: -26, opacity: 1 }, { duration: 0 });
    setOrder((cur) => [cur[cur.length - 1], ...cur.slice(0, -1)]);
  };

  // auto-advance until the visitor interacts; paused off screen / in background
  useEffect(() => {
    if (reduced) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (stageRef.current) io.observe(stageRef.current);
    const id = window.setInterval(() => {
      if (started.current && visible && !touched.current && !drag.current.on && !document.hidden) next();
    }, 3600);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
    // next() only reads refs, so it is safe to capture once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  /* ---------------- dragging the top card ---------------- */

  const onDown = (card: number) => (e: PointerEvent<HTMLDivElement>) => {
    if (card !== orderRef.current[0] || busy.current) return;
    touched.current = true;
    drag.current = { on: true, x0: e.clientX, y0: e.clientY, dx: 0, dy: 0, t0: performance.now() };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onMove = (card: number) => (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.on) return;
    d.dx = e.clientX - d.x0;
    d.dy = e.clientY - d.y0;
    const el = cardRefs.current[card];
    if (el && !reduced) {
      animate(el, { x: d.dx, y: d.dy * 0.35, rotate: TOSS[card] * 0.5 + d.dx * 0.07 }, { duration: 0 });
    }
  };

  const onUp = (card: number) => () => {
    const d = drag.current;
    if (!d.on) return;
    d.on = false;
    const dist = Math.hypot(d.dx, d.dy);
    const speed = Math.abs(d.dx) / Math.max(1, performance.now() - d.t0);
    if (dist < 6) return next(1); // tap = next
    if (Math.abs(d.dx) > 110 || speed > 0.6) return next(Math.sign(d.dx) || 1, d.dy);
    const el = cardRefs.current[card];
    if (el) animate(el, rest(card, 0), SPRING); // not far enough: snap back
  };

  const top = order[0];

  return (
    <div className="flex w-full max-w-[460px] flex-col items-center gap-6">
      <div
        ref={stageRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Photos from GDG on Campus VIIT events"
        className="grid h-[370px] w-full place-items-center sm:h-[400px]"
      >
        {SHOTS.map((shot, card) => {
          const depth = order.indexOf(card);
          return (
            <div
              key={shot.src}
              ref={(el) => {
                cardRefs.current[card] = el;
              }}
              aria-hidden={depth !== 0}
              onPointerDown={onDown(card)}
              onPointerMove={onMove(card)}
              onPointerUp={onUp(card)}
              onPointerCancel={onUp(card)}
              style={{
                zIndex: SHOTS.length - depth,
                transform: restCss(card, depth),
                opacity: reduced ? rest(card, depth).opacity : 0,
              }}
              className={`relative w-[270px] select-none rounded-[4px] border-[3px] border-ink bg-white p-3 pb-4 shadow-[6px_6px_0_#111] [grid-area:1/1] sm:w-[310px] ${
                depth === 0 ? "cursor-grab touch-pan-y active:cursor-grabbing" : "pointer-events-none"
              }`}
            >
              {/* tape */}
              <span
                aria-hidden="true"
                className={`absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 border-2 border-ink opacity-90 ${shot.tape}`}
              />
              <div className="relative aspect-[3/2] overflow-hidden border-[3px] border-ink bg-cream">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 640px) 290px, 250px"
                  draggable={false}
                  priority={card === 0}
                  quality={85}
                  className="pointer-events-none object-cover"
                />
                <span className="absolute left-2 top-2 bg-ink px-1.5 py-0.5 font-mono text-[10px] font-extrabold text-cream">
                  {shot.date}
                </span>
              </div>
              <p className="mt-3 font-display text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-ink">
                {shot.caption}
              </p>
              <p className="mt-0.5 font-mono text-[11px] font-bold uppercase text-ink/70">
                {shot.event}
              </p>
            </div>
          );
        })}
      </div>

      {/* controls */}
      <div className="relative z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            touched.current = true;
            prev();
          }}
          aria-label="Previous photo"
          className="brutal-btn grid h-10 w-10 place-items-center rounded-[4px] bg-white font-mono text-lg font-extrabold text-ink"
        >
          ←
        </button>
        <span aria-live="polite" className="min-w-[9.5rem] text-center font-mono text-xs font-extrabold text-ink">
          {String(top + 1).padStart(2, "0")} / {String(SHOTS.length).padStart(2, "0")} · {SHOTS[top].caption}
        </span>
        <button
          type="button"
          onClick={() => {
            touched.current = true;
            next(1);
          }}
          aria-label="Next photo"
          className="brutal-btn grid h-10 w-10 place-items-center rounded-[4px] bg-g-yellow font-mono text-lg font-extrabold text-ink"
        >
          →
        </button>
      </div>
    </div>
  );
}
