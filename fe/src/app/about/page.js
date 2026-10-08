import Image from "next/image";
import heroPic from "../../assets/self2.jpg";
import { PageHead } from "../../components/chart";
import { awards, education, experience, organizations } from "../../content";
import PageTransition from "../../components/pageTransition";

export const metadata = { title: "About", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHead title="About" />
      <section className="sheet grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="max-w-[62ch] space-y-5 text-xl">
          <p>
            I’m Marcel. I study Information Engineering at Universitas Gadjah Mada in Yogyakarta and plan to graduate
            in 2028.
          </p>
          <p>
            Most of my time goes to two teams: Gamantaray, where I work on the software for an autonomous boat, and
            OstoSense, a medical wearable funded by PKM-KC. I also run workshops with KMTETI, and I’ve helped organize
            competitions like FindIT! and Technocorner.
          </p>
        </div>
        <figure className="w-48 self-start border border-ink p-1.5 lg:w-full">
          <Image src={heroPic} alt="Portrait of Marcel" sizes="240px" className="block h-auto w-full" />
          <div className="scale-bar mt-1.5" />
        </figure>
      </section>

      <section className="sheet mt-20" aria-labelledby="education">
        <h2 id="education" className="font-serif text-3xl italic">
          Education
        </h2>
        <div className="mt-6 border-t border-ink pt-5">
          <p className="font-sans text-sm text-pencil">{education.period}</p>
          <h3 className="mt-1 text-xl font-semibold">{education.school}</h3>
          <p>{education.degree}</p>
        </div>
      </section>

      <section className="sheet mt-20" aria-labelledby="experience">
        <h2 id="experience" className="font-serif text-3xl italic">
          Experience
        </h2>
        <div className="relative mt-8">
          <span className="track-line" aria-hidden="true" />
          <ol className="space-y-12">
            {experience.map((job) => (
              <li key={job.org} className="track-item relative pl-12">
                <span className="fix" aria-hidden="true" />
                <p className="font-sans text-sm text-pencil">{job.period}</p>
                <h3 className="mt-1 font-serif text-2xl italic">{job.role}</h3>
                <p className="font-sans text-sm">
                  {job.org}, {job.team}
                </p>
                <ul className="mt-4 max-w-[68ch] list-disc space-y-2 pl-5 marker:text-pencil">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sheet mt-20" aria-labelledby="organizations">
        <h2 id="organizations" className="font-serif text-3xl italic">
          Organizations
        </h2>
        <ul className="mt-6">
          {organizations.map((item) => (
            <li
              key={`${item.org}-${item.role}`}
              className="grid gap-1 border-t border-ink/20 py-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)] sm:gap-6"
            >
              <span>{item.role}</span>
              <span>{item.org}</span>
              <span className="font-sans text-sm text-pencil sm:text-right">{item.period}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="sheet mt-20" aria-labelledby="awards">
        <h2 id="awards" className="font-serif text-3xl italic">
          Awards
        </h2>
        <ul className="mt-6">
          {awards.map((award) => (
            <li key={award.title} className="grid gap-1 border-t border-ink/20 py-4 sm:grid-cols-2 sm:gap-8">
              <span>{award.title}</span>
              <span className="text-pencil">{award.detail}</span>
            </li>
          ))}
        </ul>
      </section>
    </PageTransition>
  );
}
