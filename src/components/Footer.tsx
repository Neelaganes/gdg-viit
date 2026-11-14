import { BracketMarkSmall } from "./Navbar";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/gdgc_viit/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/gdg-oncampus-viit/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="8" y1="11" x2="8" y2="16" />
        <line x1="8" y1="8" x2="8" y2="8.01" />
        <path d="M12 16V11M12 13C12 11.5 13.5 11 14.5 11C15.5 11 16.5 11.8 16.5 13.5V16" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/gdg-viit",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
        aria-hidden="true"
      >
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:dscviit@gmail.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <polyline points="3,6 12,13 21,6" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Column 1: Brand + Campus Address */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-[4px] border-2 border-cream bg-cream px-1.5 py-0.5">
                <BracketMarkSmall />
              </div>
              <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-cream">
                GDG on Campus · VIIT
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm sm:text-base text-cream/85 leading-relaxed">
              Vignan&apos;s Institute of Information Technology (Autonomous),
              Beside VSEZ, Duvvada, Visakhapatnam, Andhra Pradesh 530049.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target={soc.href.startsWith("http") ? "_blank" : undefined}
                  rel={soc.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={soc.name}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border-2 border-cream bg-ink text-cream shadow-[3px_3px_0_#FBBC04] transition-transform duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-g-yellow hover:text-ink hover:border-ink"
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3">
            <h2 className="font-mono text-xs font-extrabold uppercase tracking-widest text-g-yellow">
              {"// Navigation"}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 font-mono text-sm font-bold">
              <li>
                <a href="#about" className="hover:text-g-yellow transition-colors">
                  01 — What We Do
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-g-yellow transition-colors">
                  02 — Upcoming Events
                </a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-g-yellow transition-colors">
                  03 — Learning Tracks
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-g-yellow transition-colors">
                  04 — Core Team
                </a>
              </li>
              <li>
                <a href="#upcoming" className="hover:text-g-yellow transition-colors">
                  05 — Event Queue
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-g-yellow transition-colors">
                  06 — FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com/Jd97wtBkfiO9ghDFb2rNKF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-g-yellow transition-colors text-g-yellow"
                >
                  07 — Join the Chapter ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Tracks */}
          <div className="md:col-span-4">
            <h2 className="font-mono text-xs font-extrabold uppercase tracking-widest text-g-green">
              {"// Technical Tracks"}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Android & Kotlin",
                "Modern Web",
                "Google Cloud",
                "Gemini & AI/ML",
                "Flutter",
                "Firebase",
              ].map((track) => (
                <a
                  key={track}
                  href="#tracks"
                  className="rounded-[4px] border-2 border-cream/40 px-3 py-1.5 font-mono text-xs font-bold text-cream hover:border-g-yellow hover:bg-g-yellow hover:text-ink transition-colors"
                >
                  {track}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Attribution */}
        <div className="mt-12 flex flex-col gap-3 border-t-2 border-cream/20 pt-8 sm:flex-row sm:items-center sm:justify-between font-mono text-xs text-cream/75">
          <p>
            Not an official Google website. GDG on Campus chapters are
            independent community groups.
          </p>
          <p className="font-extrabold text-g-yellow">
            Built by GDG Team VIIT
          </p>
        </div>
      </div>
    </footer>
  );
}
