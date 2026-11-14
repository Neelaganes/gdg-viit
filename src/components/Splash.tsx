import type { CSSProperties } from "react";

/**
 * First-visit splash: four Google dots bounce, stretch into the GDG < > mark,
 * then a four-colour ripple opens onto the page.
 *
 * Pure CSS (see "Splash" in globals.css) so it plays before hydration. It only
 * renders when the inline gate script in layout.tsx sets
 * <html data-splash="on"> (first visit per session, motion allowed, JS on).
 */

// Geometry in px from the logo centre. `d` = dot position, `p` = first cap of
// the bracket stroke, `r` = stroke angle. Every stroke is 22px thick and
// 72px long (cap centre to cap centre ≈ 50px).
const STROKES = [
  { color: "var(--g-blue)", d: [-39, 0], p: [-58, 4], r: 43.36 }, // left, lower
  { color: "var(--g-red)", d: [-13, 0], p: [-58, -4], r: -43.36 }, // left, upper
  { color: "var(--g-yellow)", d: [13, 0], p: [58, 4], r: 136.64 }, // right, lower
  { color: "var(--g-green)", d: [39, 0], p: [58, -4], r: -136.64 }, // right, upper
] as const;

const RINGS = ["var(--g-blue)", "var(--g-red)", "var(--g-yellow)", "var(--g-green)"];

export const SPLASH_GATE_SCRIPT = `(function(){try{
var d=document.documentElement;
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if(sessionStorage.getItem("gdg-splash"))return;
sessionStorage.setItem("gdg-splash","1");
d.setAttribute("data-splash","on");
var done=function(){d.setAttribute("data-splash","done")};
setTimeout(done,3400);
addEventListener("pointerdown",done,{once:true});
addEventListener("keydown",done,{once:true});
}catch(e){}})()`;

export default function Splash() {
  return (
    <div className="gdg-splash" aria-hidden="true">
      <div className="gdg-splash__logo">
        {STROKES.map((s, i) => (
          <span
            key={s.color}
            className="gdg-splash__pos"
            style={
              {
                "--i": i,
                "--dx": `${s.d[0]}px`,
                "--dy": `${s.d[1]}px`,
                "--px": `${s.p[0]}px`,
                "--py": `${s.p[1]}px`,
              } as CSSProperties
            }
          >
            <span className="gdg-splash__hop">
              <span
                className="gdg-splash__stroke"
                style={{ "--r": `${s.r}deg`, background: s.color } as CSSProperties}
              />
            </span>
          </span>
        ))}
      </div>

      <div className="gdg-splash__mark">
        <span className="block font-sans text-sm font-medium text-[#5f6368] sm:text-base">
          Google Developer Groups
        </span>
        <span className="mt-0.5 block font-display text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">
          On Campus · <span className="text-g-blue">VIIT</span>
        </span>
      </div>

      {RINGS.map((c, i) => (
        <span
          key={c}
          className="gdg-splash__ring"
          style={{ "--i": i, background: c } as CSSProperties}
        />
      ))}
    </div>
  );
}

/** Seconds the hero should hold its entrance while the splash plays. */
export const SPLASH_HANDOFF_S = 2.45;

/** Client-only: delay offset for entrance animations (0 when no splash). */
export function introOffset(): number {
  if (typeof document === "undefined") return 0;
  return document.documentElement.dataset.splash === "on" ? SPLASH_HANDOFF_S : 0;
}
