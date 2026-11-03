import Image from "next/image";
import Link from "next/link";
import heroPic from "../assets/self2.jpg";
import { HeroChart, Words } from "../components/chart";
import { Depth, Drift, Magnetic, Marquee, Reveal } from "../components/fx";
import {
  awards,
  experience,
  profile,
  projects,
  skills,
  slugify,
} from "../content";
import PageTransition from "../components/pageTransition";

export default function HomePage() {
  const current = experience.filter((job) => job.period.endsWith("present"));
  const work = projects.filter((project) => project.shot).slice(0, 3);

  return (
    <PageTransition>
      <section className="sheet pb-16 pt-10 lg:pt-14">
        {/* The name runs the full width: at most two lines at every size */}
        <Depth x={-10} y={-6}>
          <div className="cartouche frame-in">
            <h1 className="font-serif text-[clamp(2rem,7.4vw,6.75rem)] italic leading-[0.95] tracking-tight">
              <Words text={profile.name} delay={0.1} />
            </h1>
            <p
              className="rise mt-6 max-w-[46ch] text-xl sm:text-2xl"
              style={{ "--d": "0.45s" }}
            >
              {profile.role} Based in {profile.place}.
            </p>
          </div>
        </Depth>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
          <div className="lg:pt-6">
            <p
              className="rise max-w-[56ch] text-lg sm:text-xl"
              style={{ "--d": "0.6s" }}
            >
              {profile.intro}
            </p>
            <div
              className="rise mt-8 flex flex-wrap gap-3"
              style={{ "--d": "0.7s" }}
            >
              <Magnetic>
                <Link href="/projects" className="btn-primary">
                  <span className="roll">
                    <span data-text="See projects">See projects</span>
                  </span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/contact" className="btn-secondary">
                  <span className="roll">
                    <span data-text="Get in touch">Get in touch</span>
                  </span>
                </Link>
              </Magnetic>
            </div>
          </div>

          <Drift speed={0.12} className="max-lg:transform-none!">
            <Depth x={22} y={16} tilt={5}>
              <HeroChart>
                <Depth
                  x={50}
                  y={36}
                  className="absolute right-[5%] top-[4%] w-[33%]"
                >
                  <figure className="inset-settle bg-paper p-1.5">
                    <Image
                      src={heroPic}
                      alt="Portrait of Marcel"
                      preload
                      sizes="(min-width: 1024px) 190px, 33vw"
                      className="block h-auto w-full"
                    />
                    <div className="scale-bar mt-1.5" />
                  </figure>
                </Depth>
              </HeroChart>
            </Depth>
          </Drift>
        </div>
      </section>

      <div className="font-serif text-[clamp(2.5rem,6vw,5rem)] italic leading-none">
        <Marquee items={skills.flatMap((group) => group.items)} />
      </div>

      {/* Real screenshots of the work, so the first page shows what I build */}
      <section className="sheet pt-24" aria-labelledby="work">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal
            as="h2"
            from="left"
            id="work"
            className="font-serif text-4xl italic sm:text-5xl"
          >
            Selected work
          </Reveal>
          <p className="reveal font-sans text-sm">
            <Link href="/projects">All projects</Link>
          </p>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          {work.map((project, i) => (
            <Reveal
              as="li"
              key={project.title}
              delay={i * 0.1}
              className={i === 0 ? "lg:row-span-2" : undefined}
            >
              <Link
                href={`/projects#${slugify(project.title)}`}
                className="work-card block no-underline"
              >
                <div className="overflow-hidden bg-sea p-2 sm:p-3">
                  <Image
                    src={project.shot}
                    alt={`Screenshot of ${project.title}`}
                    sizes={
                      i === 0
                        ? "(min-width: 1024px) 600px, 100vw"
                        : "(min-width: 1024px) 400px, 100vw"
                    }
                    className="block h-auto w-full"
                  />
                </div>
                <h3
                  className={`mt-5 font-serif italic leading-tight ${i === 0 ? "text-3xl" : "text-2xl"}`}
                >
                  {project.title}
                </h3>
                <p className="mt-2 max-w-[52ch]">{project.summary}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="sheet pt-28" aria-labelledby="now">
        <Reveal
          as="h2"
          from="left"
          id="now"
          className="font-serif text-4xl italic"
        >
          Current position
        </Reveal>
        <ul className="mt-8 grid gap-10 md:grid-cols-2">
          {current.map((job, i) => (
            <Reveal
              as="li"
              key={job.org}
              from={i % 2 ? "right" : "left"}
              delay={0.1}
            >
              <p className="font-sans text-sm text-pencil">
                Since {job.period.split(" – ")[0]}
              </p>
              <h3 className="mt-1 text-xl font-semibold">
                {job.role}, {job.org}
              </h3>
              <p className="mt-2 max-w-[56ch]">{job.summary}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="sheet pt-28" aria-labelledby="results">
        <Reveal
          as="h2"
          from="left"
          id="results"
          className="font-serif text-4xl italic"
        >
          Recent results
        </Reveal>
        <ul className="mt-8 grid gap-2">
          {awards.slice(0, 4).map((award) => (
            <li
              key={award.title}
              className="reveal row tone grid gap-1 px-4 py-4 sm:grid-cols-2 sm:gap-8 sm:px-6"
            >
              <span>{award.title}</span>
              <span className="text-pencil">{award.detail}</span>
            </li>
          ))}
        </ul>
        <p className="reveal mt-8 font-sans text-sm">
          <Link href="/about">Full experience and awards</Link>
        </p>
      </section>
    </PageTransition>
  );
}
