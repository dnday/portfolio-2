import { PageHead } from "../../components/chart";
import { certificates, skills, spokenLanguages } from "../../content";
import {
  siCplusplus,
  siDocker,
  siEspressif,
  siFastapi,
  siFirebase,
  siGithubactions,
  siGo,
  siGooglecloud,
  siGooglegemini,
  siHaskell,
  siIntel,
  siJavascript,
  siLinux,
  siMongodb,
  siMqtt,
  siNestjs,
  siNextdotjs,
  siNginx,
  siOpencv,
  siPostgresql,
  siPython,
  siReact,
  siRos,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siUltralytics,
  siVercel,
} from "simple-icons";
import { LogoGrid, Reveal } from "../../components/fx";
import PageTransition from "../../components/pageTransition";

export const metadata = {
  title: "Skills",
  alternates: { canonical: "/skills" },
};

// Logos from Simple Icons, keyed by the names in content.js. SQL has no logo and shows its name.
// YOLOv8 uses its maker Ultralytics, OpenVINO its maker Intel.
const LOGOS = {
  Python: siPython,
  Go: siGo,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "C++": siCplusplus,
  FastAPI: siFastapi,
  NestJS: siNestjs,
  "Next.js": siNextdotjs,
  React: siReact,
  "Tailwind CSS": siTailwindcss,
  PostgreSQL: siPostgresql,
  Supabase: siSupabase,
  MongoDB: siMongodb,
  Firebase: siFirebase,
  Docker: siDocker,
  Nginx: siNginx,
  Linux: siLinux,
  "GitHub Actions": siGithubactions,
  Vercel: siVercel,
  YOLOv8: siUltralytics,
  OpenVINO: siIntel,
  OpenCV: siOpencv,
  "Gemini API": siGooglegemini,
  "ROS 2": siRos,
  ESP32: siEspressif,
  MQTT: siMqtt,
};
const CERT_LOGOS = {
  "Google Cloud skill badges": siGooglecloud,
  "Getting Started with Haskell": siHaskell,
};

// Brand colors too dark to read on the night chart.
function isDark(hex) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b < 70;
}

const tile = (name) => {
  const icon = LOGOS[name];
  const hex = icon?.hex ?? "9C3B8E";
  return { name, path: icon?.path, hex, dim: isDark(hex) };
};

export default function SkillsPage() {
  return (
    <PageTransition>
      <PageHead
        title="Skills"
        intro="What I use most, from backend and web to robotics."
      />
      <section className="sheet">
        <table className="w-full border-collapse">
          <caption className="sr-only">Technical skills by group</caption>
          <tbody>
            {skills.map(({ group, items }) => (
              <tr
                key={group}
                className="reveal skill-row block border-t border-ink py-6 sm:table-row sm:py-0"
              >
                <th
                  scope="row"
                  className="block pb-2 text-left align-top font-serif text-2xl font-normal italic sm:table-cell sm:w-1/4 sm:py-6 sm:pr-8"
                >
                  {group}
                </th>
                <td className="block align-top sm:table-cell sm:py-6">
                  <LogoGrid items={items.map(tile)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="reveal border-t border-ink pt-6">
          Spoken: {spokenLanguages}
        </p>
      </section>
      <section className="sheet mt-20" aria-labelledby="certificates">
        <Reveal
          as="h2"
          from="left"
          id="certificates"
          className="font-serif text-4xl italic"
        >
          Certificates
        </Reveal>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {certificates.map((cert) => (
            <li key={cert.title} className="reveal">
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="skill-tile flex-row! items-center! gap-4! p-5! text-left! no-underline"
                style={{
                  "--brand": `#${CERT_LOGOS[cert.title]?.hex ?? "9C3B8E"}`,
                }}
              >
                {CERT_LOGOS[cert.title] && (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={CERT_LOGOS[cert.title].path} />
                  </svg>
                )}
                <span>
                  <span className="block font-serif text-lg">{cert.title}</span>
                  <span className="text-pencil">{cert.where}</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </PageTransition>
  );
}
