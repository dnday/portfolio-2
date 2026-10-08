import Link from "next/link";
import PageTransition from "../components/pageTransition";

export default function NotFound() {
  return (
    <PageTransition>
      <section className="sheet py-20 lg:py-28">
        <h1 className="font-serif text-[clamp(2.75rem,7vw,4.75rem)] italic leading-none tracking-tight">
          Uncharted waters
        </h1>
        <p className="mt-6 max-w-[48ch] text-xl">
          This page isn’t on the chart. It may have moved, or the link has a typo.
        </p>
        <p className="mt-10">
          <Link href="/" className="btn-primary">
            Back to the home page
          </Link>
        </p>
      </section>
    </PageTransition>
  );
}
