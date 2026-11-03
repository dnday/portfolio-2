import { PageHead } from "../../components/chart";
import ContactForm from "../../components/contactForm";
import { profile } from "../../content";
import PageTransition from "../../components/pageTransition";

export const metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHead title="Contact" intro="Send a message and I’ll reply by email." />
      <section className="sheet grid gap-14 lg:grid-cols-[minmax(0,1fr)_260px]">
        <ContactForm />
        <ul className="rise space-y-3 self-start bg-sea p-6 font-sans text-sm" style={{ "--d": "0.6s" }}>
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
            <a href={profile.cv}>Download my CV (PDF)</a>
          </li>
        </ul>
      </section>
    </PageTransition>
  );
}
