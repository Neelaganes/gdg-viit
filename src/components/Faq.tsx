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
      "Any enrolled student at Vignan's Institute of Information Technology (VIIT), Duvvada — in CSE or an allied CSE branch (such as IT and AI&DS), from 1st through 4th year, is welcome to join.",
    accentBg: "bg-g-blue text-white",
  },
  {
    id: "faq-2",
    code: "Q_02",
    question: "Does it cost anything to join or attend events?",
    answer:
      "Zero rupees. Membership, weekly workshops, study jams, tech talks, and flagship campus hackathons are 100% free for students. Just bring your laptop, curiosity, and charger.",
    accentBg: "bg-g-green text-ink",
  },
  {
    id: "faq-3",
    code: "Q_03",
    question: "Do I need prior coding experience to participate?",
    answer:
      "Not at all! Our Study Jams and 101 workshops start from the ground up — setting up Git, writing your first Kotlin/TypeScript function, and deploying your first app with peer mentors beside you.",
    accentBg: "bg-g-yellow text-ink",
  },
  {
    id: "faq-4",
    code: "Q_04",
    question: "How can I become a Core Team member?",
    answer:
      "Core Team recruitments open at the start of every academic year across Technical, Design, Events, Community, and Content tracks. Active contributors who build projects, help peers at workshops, or ship open-source PRs are fast-tracked for interviews.",
    accentBg: "bg-g-red text-white",
  },
  {
    id: "faq-5",
    code: "Q_05",
    question: "How can companies or organizations partner or sponsor an event?",
    answer:
      "We love collaborating with developer-first companies, startups, and tech communities for DevFest VIIT and HackVIIT! Reach out via our chapter email or social links below to receive our sponsorship & mentorship deck.",
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
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 sm:py-24 border-t-[3px] border-ink"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-left sm:text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-[4px] border-[3px] border-ink bg-g-yellow px-3 py-1 font-mono text-xs font-extrabold uppercase text-ink shadow-[3px_3px_0_#111]">
            <span>07 — &lt;faq/&gt; manual</span>
          </div>
          <h2
            id="faq-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] text-ink"
          >
            Got{" "}
            <span className="inline-block rounded-[4px] border-[3px] border-ink bg-g-green px-2.5 py-0.5 text-ink shadow-[4px_4px_0_#111] -rotate-1">
              questions?
            </span>
          </h2>
          <p className="mt-3 font-mono text-xs sm:text-sm font-bold text-ink/80">
            {"// Everything you need to know before your first workshop at VIIT."}
          </p>
        </div>

        {/* Brutalist Accordion List */}
        <div className="flex flex-col gap-5">
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
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  ...springConfig,
                  delay: prefersReducedMotion ? 0 : idx * 0.06,
                }}
                className="rounded-[6px] bg-white brutal-card overflow-hidden"
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
                    className={`flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors duration-120 cursor-pointer ${
                      isOpen
                        ? "bg-g-yellow text-ink border-b-[3px] border-ink"
                        : "bg-white hover:bg-cream text-ink"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span
                        className={`shrink-0 rounded-[4px] border-2 border-ink px-2.5 py-1 font-mono text-xs font-extrabold shadow-[2px_2px_0_#111] ${item.accentBg}`}
                      >
                        {item.code}
                      </span>
                      <span className="font-display text-lg sm:text-2xl font-extrabold tracking-tight text-ink">
                        {item.question}
                      </span>
                    </div>

                    {/* Big + / × Mechanical Button */}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={springConfig}
                      aria-hidden="true"
                      className="inline-flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-[4px] border-[3px] border-ink bg-white font-mono text-2xl font-black leading-none text-ink shadow-[3px_3px_0_#111]"
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
                      exit={
                        prefersReducedMotion
                          ? { height: 0, opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={springConfig}
                      className="overflow-hidden bg-cream"
                    >
                      <div className="p-5 sm:p-6 text-base sm:text-lg font-medium leading-relaxed text-ink">
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
    </section>
  );
}
