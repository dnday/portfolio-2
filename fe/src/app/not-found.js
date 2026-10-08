import Link from "next/link";
import { Words } from "../components/chart";
import PageTransition from "../components/pageTransition";

export default function NotFound() {
  return (
    <PageTransition>
      <section className="sheet py-20 lg:py-28">
        <h1 className="font-serif text-[clamp(2.75rem,7vw,4.75rem)] italic leading-none tracking-tight">
          <Words text="Uncharted waters" />
        </h1>
        <p className="rise mt-6 max-w-[48ch] text-xl" style={{ "--d": "0.2s" }}>
          This page isn’t on the chart. It may have moved, or the link has a typo.
        </p>
        <p className="rise mt-10" style={{ "--d": "0.3s" }}>
          <Link href="/" className="btn-primary">
            Back to the home page
          </Link>
        </p>
      </section>
    </PageTransition>
  );
}
