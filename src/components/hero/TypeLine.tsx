"use client";

import { useEffect, useState } from "react";

/** Terminal line that types, holds, deletes, and moves to the next command. */
export function TypeLine({ lines, reduced }: { lines: string[]; reduced: boolean }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (reduced) return;
    let line = 0;
    let i = 0;
    let deleting = false;
    let timer: number;

    const step = () => {
      const full = lines[line];
      if (!deleting) {
        i += 1;
        setText(full.slice(0, i));
        if (i >= full.length) {
          deleting = true;
          timer = window.setTimeout(step, 1700);
          return;
        }
        timer = window.setTimeout(step, 34 + Math.random() * 46);
      } else {
        i = Math.max(0, i - 2);
        setText(full.slice(0, i));
        if (i === 0) {
          deleting = false;
          line = (line + 1) % lines.length;
          timer = window.setTimeout(step, 320);
          return;
        }
        timer = window.setTimeout(step, 16);
      }
    };

    timer = window.setTimeout(step, 1100);
    return () => window.clearTimeout(timer);
  }, [lines, reduced]);

  return (
    <span className="flex min-w-0 items-center">
      <span className="truncate">{reduced ? lines[0] : text}</span>
      <span aria-hidden="true" className="hero-caret ml-0.5 inline-block h-[1.15em] w-[0.6em] shrink-0 bg-g-yellow" />
    </span>
  );
}
