"use client";

import { useState } from "react";
import { profile } from "../content";

// The Go function in api/contact. Locally, run `vercel dev` or point NEXT_PUBLIC_API_URL elsewhere.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", spellCheck: false },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
];

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  // Set when the server or network failed (not a form mistake), to offer another way to reach me.
  const [failed, setFailed] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = Object.fromEntries([...new FormData(form)].map(([key, value]) => [key, String(value).trim()]));

    setSending(true);
    setNotice("");
    setFailed(false);
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        form.reset();
        setNotice("Message sent. I’ll reply to your email.");
      } else if (res.status < 500) {
        // Validation errors from the API are written for people, so show them as they are.
        setNotice((await res.text()).trim() || "Please check the form and try again.");
      } else {
        throw new Error(res.statusText);
      }
    } catch {
      setFailed(true);
      setNotice("The message couldn’t be sent right now.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-xl gap-7">
      {/* Honeypot: hidden from people and screen readers, so only bots fill it in (api/contact drops those) */}
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] size-px"
      />
      {FIELDS.map(({ label, ...field }, i) => (
        <label key={field.name} className="rise grid gap-1" style={{ "--d": `${0.3 + i * 0.08}s` }}>
          <span className="font-sans text-sm">{label}</span>
          <input {...field} required className="field" />
        </label>
      ))}
      <label className="rise grid gap-1" style={{ "--d": "0.54s" }}>
        <span className="font-sans text-sm">Message</span>
        <textarea name="message" required rows={6} className="field resize-y" />
      </label>
      <div className="rise flex flex-wrap items-center gap-x-5 gap-y-3" style={{ "--d": "0.62s" }}>
        <button type="submit" disabled={sending} className="btn-primary">
          {sending ? "Sending…" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className="font-sans text-sm">
          {notice}
          {failed && (
            <>
              {" "}
              Please reach me on <a href={profile.linkedin}>LinkedIn</a> instead.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
