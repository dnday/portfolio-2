"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["/projects", "Projects"],
  ["/skills", "Skills"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="flex gap-5 font-sans text-sm sm:gap-7 sm:text-[0.9375rem]">
        {LINKS.map(([href, label]) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`block py-3 underline-offset-8 ${active ? "text-purple underline decoration-2" : "no-underline hover:underline"}`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
