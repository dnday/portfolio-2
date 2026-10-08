import Image from "next/image";
import { PageHead } from "../../components/chart";
import { projects } from "../../content";
import { Parallax, Reveal, Stack, Tilt } from "../../components/fx";
import PageTransition from "../../components/pageTransition";

export const metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
};

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function ProjectText({ project, heading: Heading = "h3" }) {
  return (
    <div>
      <Heading className="font-serif text-[1.75rem] italic leading-tight">
        {project.title}
      </Heading>
      {project.award && (
        <p className="mt-2 font-sans text-sm text-purple">{project.award}</p>
      )}
      <p className="mt-3 max-w-[56ch]">{project.summary}</p>
      <p className="mt-3 font-sans text-sm text-pencil">
        Built with {project.stack.join(", ")}
      </p>
      {(project.live || project.repo) && (
        <p className="mt-4 flex gap-6 font-sans text-sm">
          {project.live && (
            <ExternalLink href={project.live}>Live site</ExternalLink>
          )}
          {project.repo && (
            <ExternalLink href={project.repo}>Source code</ExternalLink>
          )}
        </p>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const shown = projects.filter((p) => p.shot);
  const rest = projects.filter((p) => !p.shot);

  return (
    <PageTransition>
      <PageHead
        title="Projects"
        intro="Things I’ve built for competitions, classes and research teams. Where there’s a live site or public code, it’s linked."
      />
      <section className="sheet" aria-label="Projects with screenshots">
        <Stack>
          {shown.map((project, i) => {
            // Alternate sides, and slide each half in from its own side.
            const flip = i % 2 === 1;
            return (
              <article
                key={project.title}
                className={`grid items-center gap-6 border border-ink bg-paper p-5 sm:p-8 lg:min-h-[440px] lg:gap-12 lg:p-10 ${flip ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" : "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"}`}
              >
                <Reveal
                  from={flip ? "right" : "left"}
                  className={flip ? "lg:order-2" : undefined}
                >
                  <Tilt>
                    <figure className="shot border border-ink bg-paper p-2">
                      <div className="overflow-hidden">
                        <Parallax range={24}>
                          <Image
                            src={project.shot}
                            alt={`Screenshot of ${project.title}`}
                            sizes="(min-width: 1024px) 600px, 100vw"
                            className="block h-auto w-full scale-120"
                          />
                        </Parallax>
                      </div>
                      <div className="scale-bar mt-2 w-1/3" />
                    </figure>
                  </Tilt>
                </Reveal>
                <Reveal from={flip ? "left" : "right"} delay={0.15}>
                  <ProjectText project={project} heading="h2" />
                </Reveal>
              </article>
            );
          })}
        </Stack>
      </section>
      <section
        className="sheet mt-20 border-t border-ink pt-12"
        aria-labelledby="more"
      >
        <Reveal
          as="h2"
          from="left"
          id="more"
          className="font-serif text-4xl italic"
        >
          More projects
        </Reveal>
        <ul className="mt-8 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal as="li" key={project.title} delay={(i % 2) * 0.12}>
              <ProjectText project={project} />
            </Reveal>
          ))}
        </ul>
      </section>
    </PageTransition>
  );
}
