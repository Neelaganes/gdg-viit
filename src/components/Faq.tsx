"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface FaqItem {
  id: string;
  code: string;
  question: string;
  answer: string;
  accentBg: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    code: "Q_01",
    question: "Who can join GDG on Campus VIIT?",
    answer:
      "Any VIIT student, from any branch and any year.",
    accentBg: "bg-g-blue text-white",
  },
  {
    id: "faq-2",
    code: "Q_02",
    question: "Does it cost anything?",
    answer:
      "Nothing. Every event is free. Just bring your laptop.",
    accentBg: "bg-g-green text-ink",
  },
  {
    id: "faq-3",
    code: "Q_03",
    question: "Do I need coding experience?",
    answer:
      "No. Our 101 workshops start from zero, with mentors beside you.",
    accentBg: "bg-g-yellow text-ink",
  },
  {
    id: "faq-4",
    code: "Q_04",
    question: "How do I join the Core Team?",
    answer:
      "Recruitment opens every academic year. Active contributors get fast-tracked.",
    accentBg: "bg-g-red text-white",
  },
  {
    id: "faq-5",
    code: "Q_05",
    question: "How can companies sponsor an event?",
    answer:
      "Reach out via the links below for our sponsorship deck.",
    accentBg: "bg-g-blue text-white",
  },
];

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const prefersReducedMotion = useReducedMotion();

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 500, damping: 28 } as const);

  return (
    <div
      id="faq"
      aria-labelledby="faq-heading"
      role="region"
      className="scroll-mt-24 rounded-[8px] border-[3px] border-ink bg-cream p-3 sm:p-4 shadow-[6px_6px_0_#111]"
    >
      {/* Compact Header */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2
          id="faq-heading"
          className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-tight leading-none text-ink"
        >
          Got{" "}
          <span className="inline-block rounded-[3px] border-2 border-ink bg-g-green px-1.5 text-ink shadow-[2px_2px_0_#111] -rotate-1">
            questions?
          </span>
        </h2>
        <span className="rounded-[3px] border-2 border-ink bg-g-yellow px-1.5 py-0.5 font-mono text-[10px] font-extrabold uppercase text-ink">
          &lt;faq/&gt;
        </span>
      </div>

      {/* Brutalist Accordion List */}
      <div className="flex flex-col gap-2">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openId === item.id;
          const panelId = `${item.id}-panel`;
          const buttonId = `${item.id}-button`;

          return (
            <motion.div
              key={item.id}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 28 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                ...springConfig,
                delay: prefersReducedMotion ? 0 : idx * 0.06,
              }}
              className="overflow-hidden rounded-[6px] border-[3px] border-ink bg-white shadow-[3px_3px_0_#111]"
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenId((prev) => (prev === item.id ? null : item.id))
                  }
                  className={`flex w-full items-center justify-between gap-2 px-2.5 py-2 text-left transition-colors duration-120 cursor-pointer ${
                    isOpen
                      ? "bg-g-yellow text-ink border-b-[3px] border-ink"
                      : "bg-white hover:bg-cream text-ink"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`shrink-0 rounded-[3px] border-2 border-ink px-1 font-mono text-[9px] font-extrabold ${item.accentBg}`}
                    >
                      {item.code}
                    </span>
                    <span className="font-display text-sm font-extrabold tracking-tight text-ink">
                      {item.question}
                    </span>
                  </div>

                  {/* + / × Mechanical Button */}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={springConfig}
                    aria-hidden="true"
                    className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border-2 border-ink bg-white font-mono text-base font-black leading-none text-ink shadow-[2px_2px_0_#111]"
                  >
                    +
                  </motion.span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={
                      prefersReducedMotion
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={springConfig}
                    className="overflow-hidden bg-cream"
                  >
                    <div className="px-2.5 py-2 text-xs sm:text-sm font-medium leading-snug text-ink">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
