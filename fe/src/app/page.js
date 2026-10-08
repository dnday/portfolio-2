import Image from "next/image";
import Link from "next/link";
import heroPic from "../assets/self2.jpg";
import { HeroChart } from "../components/chart";
import { awards, experience, profile } from "../content";
import PageTransition from "../components/pageTransition";

export default function HomePage() {
  const current = experience.filter((job) => job.period.endsWith("present"));

  return (
    <PageTransition>
      <section className="sheet grid items-start gap-12 pb-16 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:pt-14">
        <div>
          <div className="cartouche max-w-xl">
            <h1 className="font-serif text-[clamp(2.75rem,6.5vw,4.75rem)] italic leading-[0.95] tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-5 text-xl">{profile.role}</p>
            <p className="mt-4 font-sans text-sm text-pencil">
              {profile.place}
              <br />
              {profile.coords}
            </p>
          </div>
          <p className="mt-10 max-w-[60ch]">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="btn-primary">
              See projects
            </Link>
            <Link href="/contact" className="btn-secondary">
              Get in touch
            </Link>
          </div>
        </div>

        <HeroChart>
          <figure className="absolute right-[5%] top-[4%] w-[33%] border border-ink bg-paper p-1.5">
            <Image
              src={heroPic}
              alt="Portrait of Marcel"
              preload
              sizes="(min-width: 1024px) 170px, 33vw"
              className="block h-auto w-full"
            />
            <div className="scale-bar mt-1.5" />
          </figure>
        </HeroChart>
      </section>

      <section className="sheet border-t border-ink py-14" aria-labelledby="now">
        <h2 id="now" className="font-serif text-3xl italic">
          Current position
        </h2>
        <ul className="mt-8 grid gap-10 md:grid-cols-2">
          {current.map((job) => (
            <li key={job.org}>
              <p className="font-sans text-sm text-pencil">Since {job.period.split(" – ")[0]}</p>
              <h3 className="mt-1 text-xl font-semibold">
                {job.role}, {job.org}
              </h3>
              <p className="mt-2 max-w-[56ch]">{job.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="sheet border-t border-ink py-14" aria-labelledby="results">
        <h2 id="results" className="font-serif text-3xl italic">
          Recent results
        </h2>
        <ul className="mt-8">
          {awards.slice(0, 4).map((award) => (
            <li key={award.title} className="grid gap-1 border-t border-ink/20 py-4 sm:grid-cols-2 sm:gap-8">
              <span>{award.title}</span>
              <span className="text-pencil">{award.detail}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-sans text-sm">
          <Link href="/about">Full experience and awards</Link>
        </p>
      </section>
    </PageTransition>
  );
}
