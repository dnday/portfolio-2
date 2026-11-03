import Link from "next/link";
import { siGithub, siReaddotcv, siX } from "simple-icons";
import { profile } from "../content";
import { CompassRose } from "./chart";
import { CvLink } from "./cvDialog";
import { BackToTop } from "./footerExtras";
import { DriftText, Magnetic } from "./fx";

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
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
            <div>
              <p className="font-serif text-2xl italic">{profile.name}</p>
              <p className="mt-2 max-w-[40ch]">
                Software engineer in {profile.place}, working on backends, data
                and the robots that use them.
              </p>
            </div>

            <nav aria-label="Footer">
              <Heading>Pages</Heading>
              <ul className="space-y-1.5">
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
              <ul className="space-y-1.5">
                {ELSEWHERE.map(({ label, href, icon, mono, hex }) => {
                  // The CV opens in the site's preview popup; the rest are other sites.
                  const Tag = href === profile.cv ? CvLink : "a";
                  return (
                    <li key={label}>
                      <Tag
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
                      </Tag>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* A chart's graduated border closes the page */}
        <div className="sheet mt-14 pb-8">
          <div className="scale-bar" aria-hidden="true" />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 font-sans text-sm">
            <p className="text-land-ink">
              © {year} Marcelinus Dinoglide Yoga Prakoso
            </p>
            <BackToTop>
              <CompassRose className="back-to-top-rose size-6 text-purple" />
              <span className="link-draw">Back to top</span>
            </BackToTop>
          </div>
        </div>
      </div>
    </footer>
  );
}
