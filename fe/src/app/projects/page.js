import Image from "next/image";
import { PageHead } from "../../components/chart";
import { projects, slugify } from "../../content";
import { Parallax, Reveal, Stack, Tilt } from "../../components/fx";
import PageTransition from "../../components/pageTransition";
import { logo } from "../../logos";

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

// Technologies as small logo chips; the logos take their brand colors while the project is hovered.
function StackChips({ stack }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Built with">
      {stack.map(logo).map(({ name, path, hex, dim }) => (
        <li
          key={name}
          className="stack-chip"
          style={{ "--brand": `#${hex}` }}
          data-dim={dim || undefined}
        >
          {path && (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={path} />
            </svg>
          )}
          {name}
        </li>
      ))}
    </ul>
  );
}

function ProjectText({ project, heading: Heading = "h3", card = false }) {
  return (
    <div className={card ? "project-card" : undefined}>
      <Heading className="font-serif text-[1.75rem] italic leading-tight">
        {project.title}
      </Heading>
      {project.award && (
        <p className="mt-2 font-sans text-sm text-purple">{project.award}</p>
      )}
      <p className="mt-3 max-w-[56ch]">{project.summary}</p>
      <StackChips stack={project.stack} />
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

// The Logbook: public repos, their languages and the latest pushes, read from GitHub when the site
// is built. If GitHub can't be reached, the section is left out. Set GITHUB_TOKEN to lift the rate limit.
async function readGithub() {
  try {
    const res = await fetch(
      "https://api.github.com/users/dnday/repos?per_page=100&sort=pushed",
      {
        cache: "force-cache",
        headers: process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {},
      },
    );
    if (!res.ok) return null;
    const repos = (await res.json()).filter((repo) => !repo.fork);
    const counts = {};
    for (const repo of repos)
      if (repo.language)
        counts[repo.language] = (counts[repo.language] ?? 0) + 1;
    const counted = Object.values(counts).reduce((a, b) => a + b, 0);
    const languages = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({
        ...logo(name),
        count,
        share: count / counted,
      }));
    const recent = repos.slice(0, 6).map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      language: repo.language,
      pushed: new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(repo.pushed_at)),
    }));
    return { total: repos.length, languages, recent };
  } catch {
    return null;
  }
}

function Logbook({ data }) {
  return (
    <section
      className="sheet mt-24 border-t border-ink pt-12"
      aria-labelledby="logbook"
    >
      <Reveal
        as="h2"
        from="left"
        id="logbook"
        className="font-serif text-4xl italic"
      >
        Logbook
      </Reveal>
      <p className="reveal mt-4 max-w-[60ch]">
        Straight from{" "}
        <ExternalLink href="https://github.com/dnday">my GitHub</ExternalLink>:{" "}
        {data.total} public repositories, the languages they’re written in, and
        what I pushed most recently.
      </p>

      <div className="reveal mt-10">
        <div className="flex h-3 border border-ink" aria-hidden="true">
          {data.languages.map((lang, i) => (
            <span
              key={lang.name}
              className="logbook-bar"
              style={{
                width: `${lang.share * 100}%`,
                background: `#${lang.hex}`,
                animationDelay: `${0.2 + i * 0.12}s`,
              }}
            />
          ))}
        </div>
        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 font-sans text-sm">
          {data.languages.map((lang) => (
            <li key={lang.name} className="flex items-center gap-2">
              <span
                className="size-2.5"
                style={{ background: `#${lang.hex}` }}
                aria-hidden="true"
              />
              {lang.name}
              <span className="text-pencil">
                {lang.count} {lang.count === 1 ? "repo" : "repos"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="reveal mt-12 font-sans text-sm text-pencil">
        Latest pushes
      </h3>
      <ul className="mt-3">
        {data.recent.map((repo) => (
          <li
            key={repo.name}
            className="reveal row grid gap-1 border-t border-ink/20 py-3 sm:grid-cols-[9rem_minmax(0,1fr)_10rem] sm:gap-6"
          >
            <span className="font-sans text-sm text-pencil">{repo.pushed}</span>
            <span>
              <ExternalLink href={repo.url}>{repo.name}</ExternalLink>
            </span>
            <span className="font-sans text-sm text-pencil sm:text-right">
              {repo.language ?? "Notes"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ProjectsPage() {
  const github = await readGithub();
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
                id={slugify(project.title)}
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
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal
              as="li"
              key={project.title}
              id={slugify(project.title)}
              delay={(i % 2) * 0.12}
              className="h-full"
            >
              <ProjectText project={project} card />
            </Reveal>
          ))}
        </ul>
      </section>
      {github && <Logbook data={github} />}
    </PageTransition>
  );
}
