"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile, projects, slugify } from "../content";
import { switchTheme } from "./themeAnchor";

// Ctrl+K / Cmd+K (or the Search button): jump to a page or project, or run a quick action.
const go = (href) => (router) => router.push(href);
const open = (href) => () => window.open(href, "_blank", "noopener,noreferrer");

const ITEMS = [
  ...[
    ["Home", "/"],
    ["Projects", "/projects"],
    ["Skills", "/skills"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ].map(([label, href]) => ({ group: "Pages", label, run: go(href) })),
  ...projects.map((p) => ({
    group: "Projects",
    label: p.title,
    hint: p.stack.join(", "),
    run: go(`/projects#${slugify(p.title)}`),
  })),
  {
    group: "Actions",
    label: "Switch between light and dark",
    run: () => switchTheme({ x: innerWidth / 2, y: innerHeight / 2 }),
  },
  {
    group: "Actions",
    label: "Copy the link to this page",
    run: (_, notify) => navigator.clipboard.writeText(location.href).then(() => notify("Link copied")),
  },
  { group: "Actions", label: "Download my CV (PDF)", run: open(profile.cv) },
  { group: "Actions", label: "Send me a message", run: go("/contact") },
  { group: "Actions", label: "Open GitHub", hint: "github.com/dnday", run: open(profile.github) },
  { group: "Actions", label: "Open LinkedIn", run: open(profile.linkedin) },
];

function search(query) {
  const q = query.trim().toLowerCase();
  if (!q) return ITEMS;
  return ITEMS.filter((item) => `${item.label} ${item.hint ?? ""} ${item.group}`.toLowerCase().includes(q));
}

export default function CommandPalette() {
  const router = useRouter();
  const dialog = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const results = search(query);

  function show() {
    setQuery("");
    setActive(0);
    dialog.current.showModal();
  }

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialog.current.open) dialog.current.close();
        else {
          setQuery("");
          setActive(0);
          dialog.current.showModal();
        }
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  function notify(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  }

  function run(item) {
    dialog.current.close();
    item.run(router, notify);
  }

  function move(step) {
    const next = (active + step + results.length) % results.length;
    setActive(next);
    document.getElementById(`cmd-${next}`)?.scrollIntoView({ block: "nearest" });
  }

  function onKeyDown(e) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={show}
        className="order-2 flex items-center gap-2 py-2 font-sans text-sm text-pencil hover:text-purple sm:order-3"
      >
        Search
        <kbd className="hidden border border-current px-1.5 py-0.5 text-xs sm:inline">Ctrl K</kbd>
      </button>

      <dialog
        ref={dialog}
        className="cmdk"
        aria-label="Search the site"
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search pages, projects and actions"
          aria-label="Search pages, projects and actions"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={results.length ? `cmd-${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
          className="w-full border-b border-ink bg-transparent px-5 py-4 font-serif text-xl italic outline-none"
        />
        <ul id="cmd-list" role="listbox" className="max-h-[50vh] overflow-y-auto py-2" data-lenis-prevent>
          {results.map((item, i) => (
            <li
              key={`${item.group}-${item.label}`}
              id={`cmd-${i}`}
              role="option"
              aria-selected={i === active}
              onPointerMove={() => setActive(i)}
              onClick={() => run(item)}
              className="flex cursor-pointer items-baseline justify-between gap-6 px-5 py-2.5 aria-selected:bg-sea"
            >
              <span>
                {(i === 0 || results[i - 1].group !== item.group) && (
                  <span className="mb-1 block font-sans text-xs text-pencil">{item.group}</span>
                )}
                {item.label}
              </span>
              {item.hint && <span className="truncate font-sans text-xs text-pencil">{item.hint}</span>}
            </li>
          ))}
          {!results.length && <li className="px-5 py-4 text-pencil">Nothing on the chart for “{query}”.</li>}
        </ul>
        <p className="border-t border-ink/20 px-5 py-2 font-sans text-xs text-pencil">
          ↑ ↓ to move, Enter to open, Esc to close
        </p>
      </dialog>

      <p role="status" aria-live="polite" className={toast ? "toast" : "sr-only"}>
        {toast}
      </p>
    </>
  );
}
