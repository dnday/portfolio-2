import Link from "next/link";
import { CompassRose } from "./chart";
import NavLinks from "./navLinks";

export default function Nav() {
  return (
    <header
      className="sheet flex flex-wrap items-center justify-between gap-x-10 gap-y-1 border-b border-ink pb-3 pt-5"
      style={{ viewTransitionName: "site-header" }}
    >
      <Link href="/" className="flex items-center gap-3 py-2 no-underline">
        <CompassRose className="logo-rose size-8 text-purple" />
        <span className="font-serif text-2xl italic">Marcel</span>
      </Link>
      <NavLinks />
    </header>
  );
}
