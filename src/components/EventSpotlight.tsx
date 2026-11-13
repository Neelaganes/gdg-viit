"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const INITIAL_COUNTDOWN: CountdownTime = {
  days: 22,
  hours: 14,
  minutes: 38,
  seconds: 45,
};

function computeCountdown(): CountdownTime {
  const now = Date.now();
  const fixedTarget = new Date("2026-12-05T09:00:00+05:30").getTime();
  let diff = fixedTarget - now;

  if (diff <= 0) {
    // Fallback rolling window so the live countdown always ticks actively
    const cycleMs = 24 * 24 * 60 * 60 * 1000;
    diff = cycleMs - (Math.abs(diff) % cycleMs);
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function CountdownBox({
  value,
  label,
  accentClass,
  reducedMotion,
}: {
  value: number;
  label: string;
  accentClass: string;
  reducedMotion: boolean;
}) {
  const formatted = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center rounded-[6px] border-[3px] border-ink bg-cream p-2.5 sm:p-3 shadow-[4px_4px_0_#111]">
      <div className="relative flex h-11 sm:h-14 w-full items-center justify-center overflow-hidden rounded-[4px] border-2 border-ink bg-white px-2">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            initial={
              reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              reducedMotion ? { opacity: 0 } : { opacity: 0, y: -24 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 520, damping: 30 }
            }
            className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tight text-ink tabular-nums"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className={`mt-2 w-full rounded-[3px] border-2 border-ink py-0.5 text-center font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-ink ${accentClass}`}
      >
        {label}
      </span>
    </div>
  );
}

export default function EventSpotlight() {
  const prefersReducedMotion = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(INITIAL_COUNTDOWN);

  useEffect(() => {
    const update = () => {
      setTimeLeft(computeCountdown());
    };
    const initialTimer = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 1000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, []);

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 500, damping: 28 } as const);

  const stampSpring = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 550, damping: 24 } as const);

  return (
    <section
      id="events"
      aria-labelledby="spotlight-heading"
      className="py-12 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Kicker */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 rounded-[4px] border-[3px] border-ink bg-g-yellow px-3 py-1 font-mono text-xs font-extrabold uppercase text-ink shadow-[3px_3px_0_#111]">
            <span>02 — // upcoming spotlight</span>
          </div>
          <span className="font-mono text-xs font-bold uppercase text-ink/75">
            REGISTRATION OPEN · FREE CAMPUS PASS
          </span>
        </div>

        {/* Big Spotlight Brutalist Card */}
        <motion.div
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={springConfig}
          className="relative rounded-[8px] border-[3px] border-ink bg-white p-5 sm:p-8 lg:p-10 shadow-[8px_8px_0_#111]"
        >
          {/* Floating Stamp Sticker */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { scale: 1, rotate: 3, opacity: 1 }
                : { scale: 1.4, rotate: 14, opacity: 0 }
            }
            whileInView={{ scale: 1, rotate: 3, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...stampSpring, delay: prefersReducedMotion ? 0 : 0.15 }}
            className="absolute -top-4 right-4 sm:right-8 z-10 rounded-[4px] bg-g-red px-4 py-1.5 font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white brutal-sticker"
          >
            ★ NEXT UP
          </motion.div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Left Side: Demo Image */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[6px] border-[3px] border-ink bg-cream shadow-[6px_6px_0_#111]">
                <Image
                  src="/images/event-devfest.svg"
                  alt="DevFest VIIT 2026 neo-brutalist event poster showing code terminal, speaker stage, and 600+ builders"
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover"
                  priority
                />
                <div className="flex items-center justify-between border-t-[3px] border-ink bg-g-yellow px-4 py-2 font-mono text-xs font-extrabold text-ink">
                  <span>EVT_ID // DEVFEST-VIIT-2026</span>
                  <span>IN-PERSON · 2 DAYS</span>
                </div>
              </div>
            </div>

            {/* Right Side: Event Info + Live Countdown + RSVP */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 rounded-[4px] border-2 border-ink bg-g-green px-3 py-1 font-mono text-xs font-extrabold uppercase text-ink">
                <span>FLAGSHIP ANNUAL CONFERENCE</span>
              </div>

              <h2
                id="spotlight-heading"
                className="mt-4 font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight leading-none text-ink"
              >
                DevFest VIIT 2026
              </h2>

              <p className="mt-3 text-base sm:text-lg font-medium text-ink/85">
                Two full days of keynotes, hands-on Gemini &amp; Cloud code
                labs, live debugging arenas, and project showcases with builders
                across Visakhapatnam.
              </p>

              {/* Date & Venue Metadata */}
              <div className="mt-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-[6px] border-[3px] border-ink bg-cream p-3 shadow-[3px_3px_0_#111]">
                  <span className="block font-mono text-[11px] font-bold uppercase text-ink/70">
                    {"// DATE & TIME"}
                  </span>
                  <span className="mt-0.5 block font-mono text-sm font-extrabold text-ink">
                    DEC 05–06, 2026 · 09:00 AM
                  </span>
                </div>

                <div className="rounded-[6px] border-[3px] border-ink bg-cream p-3 shadow-[3px_3px_0_#111]">
                  <span className="block font-mono text-[11px] font-bold uppercase text-ink/70">
                    {"// VENUE"}
                  </span>
                  <span className="mt-0.5 block font-mono text-sm font-extrabold text-ink">
                    VIIT Campus, Duvvada, Visakhapatnam
                  </span>
                </div>
              </div>

              {/* Live Flip/Slide Countdown */}
              <div className="mt-6 w-full">
                <div className="mb-2 flex items-center justify-between font-mono text-xs font-extrabold uppercase text-ink/80">
                  <span>{"// T-MINUS COUNTDOWN"}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-g-red animate-ping" />
                    <span>LIVE CLOCK</span>
                  </span>
                </div>
                <div
                  role="timer"
                  aria-label="Countdown to DevFest VIIT 2026"
                  className="grid grid-cols-4 gap-2.5 sm:gap-3.5"
                >
                  <CountdownBox
                    value={timeLeft.days}
                    label="Days"
                    accentClass="bg-g-blue text-white"
                    reducedMotion={Boolean(prefersReducedMotion)}
                  />
                  <CountdownBox
                    value={timeLeft.hours}
                    label="Hrs"
                    accentClass="bg-g-red text-white"
                    reducedMotion={Boolean(prefersReducedMotion)}
                  />
                  <CountdownBox
                    value={timeLeft.minutes}
                    label="Min"
                    accentClass="bg-g-yellow text-ink"
                    reducedMotion={Boolean(prefersReducedMotion)}
                  />
                  <CountdownBox
                    value={timeLeft.seconds}
                    label="Sec"
                    accentClass="bg-g-green text-ink"
                    reducedMotion={Boolean(prefersReducedMotion)}
                  />
                </div>
              </div>

              {/* RSVP Button */}
              <div className="mt-7 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <a
                  href="#"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-[6px] bg-g-yellow px-7 py-4 font-mono text-sm sm:text-base font-extrabold uppercase tracking-tight text-ink brutal-btn"
                >
                  <span>RSVP on GDG Community</span>
                  <span aria-hidden="true" className="text-lg leading-none">
                    ↗
                  </span>
                </a>
                <span className="font-mono text-xs font-bold text-ink/75">
                  ⚡ 140/600 seats remaining
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
