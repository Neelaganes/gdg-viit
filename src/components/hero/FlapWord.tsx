"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/#*_";

/** Deterministic tilt per tile so SSR and client agree. */
const tilt = (i: number) => (((i * 53) % 7) - 3) * 0.7;

type Props = {
  words: string[];
  reduced: boolean;
  /** ms each word stays on the board */
  hold?: number;
  /** entry delay in seconds */
  delay?: number;
};

/**
 * Split-flap departure-board word. Each tile scrambles through glyphs and
 * settles left-to-right, then the board holds and flips to the next word.
 */
export function FlapWord({ words, reduced, hold = 2600, delay = 0 }: Props) {
  const len = Math.max(...words.map((w) => w.length));
  const [chars, setChars] = useState(() => words[0].padEnd(len, " ").split(""));

  useEffect(() => {
    if (reduced || words.length < 2) return;
    let index = 0;
    let tick: number | undefined;

    const cycle = window.setInterval(() => {
      index = (index + 1) % words.length;
      const target = words[index].padEnd(len, " ").split("");
      const start = performance.now();
      window.clearInterval(tick);
      tick = window.setInterval(() => {
        const t = performance.now() - start;
        let settled = true;
        setChars(
          target.map((c, i) => {
            if (t >= 200 + i * 85) return c;
            settled = false;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }),
        );
        if (settled) window.clearInterval(tick);
      }, 55);
    }, hold);

    return () => {
      window.clearInterval(cycle);
      window.clearInterval(tick);
    };
  }, [words, len, hold, reduced]);

  return (
    <span className="inline-flex gap-[0.07em]">
      {chars.map((c, i) => (
        <motion.span
          key={i}
          initial={reduced ? false : { scale: 1.45, opacity: 0, rotate: tilt(i) * 6 }}
          animate={{ scale: 1, opacity: 1, rotate: tilt(i) }}
          transition={{ type: "spring", stiffness: 560, damping: 20, delay: delay + i * 0.06 }}
          className="relative inline-grid h-[1em] w-[0.76em] place-items-center overflow-hidden rounded-[0.09em] border-[3px] border-ink bg-g-yellow shadow-[4px_4px_0_#111] sm:shadow-[6px_6px_0_#111]"
        >
          {/* upper flap highlight */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-white/20" />
          {/* invisible sizer keeps the tile's box stable while glyphs swap */}
          <span aria-hidden="true" className="invisible text-[0.86em] leading-none">
            W
          </span>
          <AnimatePresence initial={false}>
            <motion.span
              key={c}
              initial={{ y: "-60%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "60%", opacity: 0 }}
              transition={{ duration: 0.06, ease: "linear" }}
              className="absolute inset-0 grid place-items-center text-[0.86em] leading-none"
            >
              {c === " " ? " " : c}
            </motion.span>
          </AnimatePresence>
          {/* flap seam */}
          <span className="pointer-events-none absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-ink/25" />
        </motion.span>
      ))}
    </span>
  );
}
