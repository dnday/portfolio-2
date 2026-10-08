import { PageHead } from "../../components/chart";
import { certificates, skills, spokenLanguages } from "../../content";
import PageTransition from "../../components/pageTransition";

export const metadata = { title: "Skills", alternates: { canonical: "/skills" } };

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
              <tr key={group} className="reveal skill-row block border-t border-ink py-6 sm:table-row sm:py-0">
                <th
                  scope="row"
                  className="block pb-2 text-left align-top font-serif text-2xl font-normal italic sm:table-cell sm:w-1/4 sm:py-6 sm:pr-8"
                >
                  {group}
                </th>
                <td className="block align-top sm:table-cell sm:py-6">
                  <ul className="flex flex-wrap gap-x-6 gap-y-1">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="reveal border-t border-ink pt-6">Spoken: {spokenLanguages}</p>
      </section>
      <section className="sheet mt-20" aria-labelledby="certificates">
        <h2 id="certificates" className="reveal font-serif text-3xl italic">
          Certificates
        </h2>
        <ul className="mt-6 space-y-3">
          {certificates.map((cert) => (
            <li key={cert.title} className="reveal">
              <a href={cert.url} target="_blank" rel="noopener noreferrer">
                {cert.title}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <span className="text-pencil">, {cert.where}</span>
            </li>
          ))}
        </ul>
      </section>
    </PageTransition>
  );
}
