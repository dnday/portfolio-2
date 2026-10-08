import { profile } from "../content";
import { DriftText } from "./fx";

// Rendered at build time, so this is the date the site was last published.
const edition = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date());

export default function Footer() {
  return (
    <footer className="mt-24">
      <svg viewBox="0 0 1000 20" preserveAspectRatio="none" className="block h-5 w-full" aria-hidden="true">
        <path d="M0 20V11C80 7 150 13 240 9S400 4 480 10 640 15 730 8 900 5 1000 10V20Z" fill="var(--color-land)" />
        <path
          d="M0 11C80 7 150 13 240 9S400 4 480 10 640 15 730 8 900 5 1000 10"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="bg-land pb-10 pt-4">
        <DriftText className="mb-8 whitespace-nowrap font-serif text-[15vw] italic leading-[1.05] text-land-ink/25">
          Marcelinus Dinoglide
        </DriftText>
        <div className="reveal sheet grid gap-8 font-sans text-sm sm:grid-cols-3">
          <div>
            <p className="font-serif text-lg italic">{profile.name}</p>
            <p className="text-land-ink">{profile.place}</p>
          </div>
          <ul className="space-y-1">
            <li>
              <a href={profile.github}>GitHub</a>
            </li>
            <li>
              <a href={profile.linkedin}>LinkedIn</a>
            </li>
            <li>
              <a href={profile.x}>X</a>
            </li>
            <li>
              <a href={profile.cv}>CV (PDF)</a>
            </li>
          </ul>
          <p className="text-land-ink">Edition of {edition}</p>
        </div>
      </div>
    </footer>
  );
}
