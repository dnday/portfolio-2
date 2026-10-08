import Link from "next/link";
import { siGithub, siReaddotcv, siX } from "simple-icons";
import { profile } from "../content";
import { CompassRose } from "./chart";
import { BackToTop, LocalTime } from "./footerExtras";
import { DriftText, Magnetic } from "./fx";

// Rendered at build time, so this is the date the site was last published.
const edition = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
}).format(new Date());
const year = new Date().getFullYear();

const PAGES = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["Skills", "/skills"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

// LinkedIn isn't in Simple Icons, so it gets a plain "in" monogram.
const ELSEWHERE = [
  { label: "GitHub", href: profile.github, icon: siGithub },
  { label: "LinkedIn", href: profile.linkedin, mono: "in", hex: "0A66C2" },
  { label: "X", href: profile.x, icon: siX },
  { label: "CV (PDF)", href: profile.cv, icon: siReaddotcv },
];

function Heading({ children }) {
  return (
    <h2 className="mb-3 font-serif text-lg italic text-land-ink">{children}</h2>
  );
}

export default function Footer() {
  return (
    <footer className="mt-24">
      <svg
        viewBox="0 0 1000 20"
        preserveAspectRatio="none"
        className="block h-5 w-full"
        aria-hidden="true"
      >
        <path
          d="M0 20V11C80 7 150 13 240 9S400 4 480 10 640 15 730 8 900 5 1000 10V20Z"
          fill="var(--color-land)"
        />
        <path
          d="M0 11C80 7 150 13 240 9S400 4 480 10 640 15 730 8 900 5 1000 10"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="bg-land pt-14">
        {/* Call to action */}
        <div className="reveal sheet flex flex-wrap items-end justify-between gap-8">
          <p className="max-w-[16ch] font-serif text-[clamp(2.5rem,6vw,4.5rem)] italic leading-[1.02]">
            Got something to build?
          </p>
          <div className="flex flex-col items-start gap-3">
            <Magnetic>
              <Link href="/contact" className="btn-primary">
                <span className="roll">
                  <span data-text="Get in touch">Get in touch</span>
                </span>
              </Link>
            </Magnetic>
            <p className="font-sans text-sm text-land-ink">
              Or find me on <a href={profile.linkedin}>LinkedIn</a>.
            </p>
          </div>
        </div>

        <DriftText className="my-10 whitespace-nowrap font-serif text-[15vw] italic leading-[1.05] text-land-ink/25">
          Marcelinus Dinoglide
        </DriftText>

        <div className="reveal sheet">
          <div className="grid gap-10 border-t border-ink pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Heading>Position</Heading>
              <p className="font-serif text-lg italic">{profile.name}</p>
              <p className="mt-1 font-sans text-sm">{profile.place}</p>
              <p className="mt-1 font-sans text-sm text-land-ink">
                {profile.coords}, <LocalTime />
              </p>
            </div>

            <nav aria-label="Footer">
              <Heading>Pages</Heading>
              <ul className="space-y-1.5 font-sans text-sm">
                {PAGES.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="no-underline">
                      <span className="link-draw">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <Heading>Elsewhere</Heading>
              <ul className="space-y-1.5 font-sans text-sm">
                {ELSEWHERE.map(({ label, href, icon, mono, hex }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="social-link flex items-center gap-2.5 no-underline"
                      style={{ "--brand": `#${icon?.hex ?? hex}` }}
                      {...(href.startsWith("http") && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {icon ? (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d={icon.path} />
                        </svg>
                      ) : (
                        <span className="social-mono" aria-hidden="true">
                          {mono}
                        </span>
                      )}
                      <span className="link-draw">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Heading>Chart notes</Heading>
              <ul className="space-y-1.5 font-sans text-sm text-land-ink">
                <li>Edition of {edition}</li>
                <li>Built with Next.js, set in Newsreader and B612</li>
                <li className="max-sm:hidden">Press Ctrl K to search</li>
              </ul>
              <div className="mt-5">
                <BackToTop>
                  <CompassRose className="back-to-top-rose size-6 text-purple" />
                  <span className="link-draw">Back to top</span>
                </BackToTop>
              </div>
            </div>
          </div>
        </div>

        {/* A chart's graduated border, with the copyright where a chart prints its number */}
        <div className="sheet mt-12 pb-8">
          <div className="scale-bar" aria-hidden="true" />
          <div className="mt-3 flex flex-wrap justify-between gap-2 font-sans text-xs text-land-ink">
            <p>© {year} Marcelinus Dinoglide Yoga Prakoso</p>
            <p>Yogyakarta, {profile.coords}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
