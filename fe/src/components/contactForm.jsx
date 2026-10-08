"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", spellCheck: false },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
];

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = Object.fromEntries([...new FormData(form)].map(([key, value]) => [key, String(value).trim()]));

    setSending(true);
    setNotice("");
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error((await res.text()).trim());
      form.reset();
      setNotice("Message sent. I’ll reply to your email.");
    } catch (err) {
      setNotice(err.message || "The message wasn’t sent. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-xl gap-7">
      {FIELDS.map(({ label, ...field }) => (
        <label key={field.name} className="grid gap-1">
          <span className="font-sans text-sm">{label}</span>
          <input {...field} required className="field" />
        </label>
      ))}
      <label className="grid gap-1">
        <span className="font-sans text-sm">Message</span>
        <textarea name="message" required rows={6} className="field resize-y" />
      </label>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" disabled={sending} className="btn-primary">
          {sending ? "Sending…" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className="font-sans text-sm">
          {notice}
        </p>
      </div>
    </form>
  );
}
