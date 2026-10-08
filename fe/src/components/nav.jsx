import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.webp";
import CommandPalette from "./commandPalette";
import NavLinks from "./navLinks";
import ThemeAnchor from "./themeAnchor";

export default function Nav() {
  return (
    <header
      className="sheet flex flex-wrap items-center justify-between gap-x-10 gap-y-1 border-b border-ink pb-3 pt-5"
      style={{ viewTransitionName: "site-header" }}
    >
      <Link href="/" className="flex items-center gap-3 py-2 no-underline">
        <Image src={logo} alt="" width={32} height={32} preload className="logo-mark size-8" />
        <span className="font-serif text-2xl italic">Marcel</span>
      </Link>
      <NavLinks />
      <CommandPalette />
      <ThemeAnchor />
    </header>
  );
}
