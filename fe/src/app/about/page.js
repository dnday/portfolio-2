import Image from "next/image";
import heroPic from "../../assets/self2.jpg";
import { PageHead } from "../../components/chart";
import { awards, education, experience, organizations } from "../../content";
import { Reveal } from "../../components/fx";
import PageTransition from "../../components/pageTransition";

export const metadata = { title: "About", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHead title="About" />
      <section className="sheet grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div
          className="rise max-w-[62ch] space-y-5 text-xl"
          style={{ "--d": "0.25s" }}
        >
          <p>
            I’m Marcel. I study Information Engineering at Universitas Gadjah
            Mada in Yogyakarta and plan to graduate in 2028.
          </p>
          <p>
            Most of my time goes to two teams: Gamantaray, where I work on the
            software for an autonomous boat, and OstoSense, a medical wearable
            funded by PKM-KC. I also run workshops with KMTETI, and I’ve helped
            organize competitions like FindIT! and Technocorner.
          </p>
        </div>
        <figure
          className="shot rise w-48 self-start bg-sea p-2 lg:w-full"
          style={{ "--d": "0.4s" }}
        >
          <div className="overflow-hidden">
            <Image
              src={heroPic}
              alt="Portrait of Marcel"
              sizes="240px"
              className="block h-auto w-full"
            />
          </div>
          <div className="scale-bar mt-1.5" />
        </figure>
      </section>

      <section className="sheet mt-20" aria-labelledby="education">
        <Reveal
          as="h2"
          from="left"
          id="education"
          className="font-serif text-4xl italic"
        >
          Education
        </Reveal>
        <div className="reveal tone mt-6 px-6 py-5">
          <p className="font-sans text-sm text-pencil">{education.period}</p>
          <h3 className="mt-1 text-xl font-semibold">{education.school}</h3>
          <p>{education.degree}</p>
        </div>
      </section>

      <section className="sheet mt-20" aria-labelledby="experience">
        <Reveal
          as="h2"
          from="left"
          id="experience"
          className="font-serif text-4xl italic"
        >
          Experience
        </Reveal>
        {/* One block per role: a single figure as proof, then the story in prose */}
        <ol className="mt-10 grid gap-6">
          {experience.map((job) => (
            <Reveal
              as="li"
              key={job.org}
              className="role grid gap-6 p-6 sm:p-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14"
            >
              <p>
                <span
                  className={`block whitespace-nowrap font-serif leading-none tracking-tight text-purple ${
                    job.figure.value.length > 4
                      ? "text-[clamp(3rem,6vw,5rem)]"
                      : "text-[clamp(3.5rem,8vw,6.5rem)]"
                  }`}
                >
                  {job.figure.value}
                </span>
                <span className="mt-3 block max-w-[24ch]">
                  {job.figure.label}
                </span>
              </p>
              <div>
                <h3 className="font-serif text-3xl leading-tight sm:text-4xl">
                  {job.org}
                </h3>
                <p className="mt-2 font-sans text-sm text-pencil">
                  {job.role}, {job.period}
                </p>
                <p className="mt-5 max-w-[60ch] text-lg">{job.story}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="sheet mt-20" aria-labelledby="organizations">
        <Reveal
          as="h2"
          from="left"
          id="organizations"
          className="font-serif text-4xl italic"
        >
          Organizations
        </Reveal>
        <ul className="mt-6 grid gap-2">
          {organizations.map((item) => (
            <li
              key={`${item.org}-${item.role}`}
              className="reveal row tone grid gap-1 px-4 py-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)] sm:gap-6 sm:px-6"
            >
              <span>{item.role}</span>
              <span>{item.org}</span>
              <span className="font-sans text-sm text-pencil sm:text-right">
                {item.period}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="sheet mt-20" aria-labelledby="awards">
        <Reveal
          as="h2"
          from="left"
          id="awards"
          className="font-serif text-4xl italic"
        >
          Awards
        </Reveal>
        <ul className="mt-6 grid gap-2">
          {awards.map((award) => (
            <li
              key={award.title}
              className="reveal row tone grid gap-1 px-4 py-4 sm:grid-cols-2 sm:gap-8 sm:px-6"
            >
              <span>{award.title}</span>
              <span className="text-pencil">{award.detail}</span>
            </li>
          ))}
        </ul>
      </section>
    </PageTransition>
  );
}
