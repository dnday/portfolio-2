import Image from "next/image";
import { PageHead } from "../../components/chart";
import { projects } from "../../content";
import PageTransition from "../../components/pageTransition";

export const metadata = { title: "Projects", alternates: { canonical: "/projects" } };

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function ProjectText({ project, as: Tag = "div", heading: Heading = "h3", className }) {
  return (
    <Tag className={className}>
      <Heading className="font-serif text-[1.75rem] italic leading-tight">{project.title}</Heading>
      {project.award && <p className="mt-2 font-sans text-sm text-purple">{project.award}</p>}
      <p className="mt-3 max-w-[56ch]">{project.summary}</p>
      <p className="mt-3 font-sans text-sm text-pencil">Built with {project.stack.join(", ")}</p>
      {(project.live || project.repo) && (
        <p className="mt-4 flex gap-6 font-sans text-sm">
          {project.live && <ExternalLink href={project.live}>Live site</ExternalLink>}
          {project.repo && <ExternalLink href={project.repo}>Source code</ExternalLink>}
        </p>
      )}
    </Tag>
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
      <section className="sheet grid gap-16" aria-label="Projects with screenshots">
        {shown.map((project) => (
          <article
            key={project.title}
            className="reveal grid items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12"
          >
            <figure className="shot border border-ink p-2">
              <div className="overflow-hidden">
                <Image
                  src={project.shot}
                  alt={`Screenshot of ${project.title}`}
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="block h-auto w-full"
                />
              </div>
              <div className="scale-bar mt-2 w-1/3" />
            </figure>
            <ProjectText project={project} heading="h2" />
          </article>
        ))}
      </section>
      <section className="sheet mt-20 border-t border-ink pt-12" aria-labelledby="more">
        <h2 id="more" className="reveal font-serif text-3xl italic">
          More projects
        </h2>
        <ul className="mt-8 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {rest.map((project) => (
            <ProjectText key={project.title} project={project} as="li" className="reveal" />
          ))}
        </ul>
      </section>
    </PageTransition>
  );
}
