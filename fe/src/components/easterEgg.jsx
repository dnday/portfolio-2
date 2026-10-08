"use client";

import { useEffect, useRef, useState } from "react";

// Type "sos" for a Morse distress call, or the Konami code for the ship's horn. Either way the
// page rocks on a swell for a moment (.rocking and .swell in globals.css). Sound is made with
// Web Audio, so there are no files to load.
const KONAMI = "ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a";
const SOS = "...---...";
const UNIT = 0.09; // seconds per Morse unit

function morse(ctx) {
  let t = ctx.currentTime + 0.05;
  for (const symbol of SOS) {
    const length = symbol === "." ? UNIT : UNIT * 3;
    const tone = ctx.createOscillator();
    const gain = ctx.createGain();
    tone.frequency.value = 640;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.15, t + 0.01);
    gain.gain.setValueAtTime(0.15, t + length - 0.01);
    gain.gain.linearRampToValueAtTime(0, t + length);
    tone.connect(gain).connect(ctx.destination);
    tone.start(t);
    tone.stop(t + length);
    t += length + UNIT;
  }
  return t - ctx.currentTime;
}

function horn(ctx) {
  const t = ctx.currentTime;
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  filter.type = "lowpass";
  filter.frequency.value = 650;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.16, t + 0.15);
  gain.gain.setValueAtTime(0.16, t + 1.5);
  gain.gain.linearRampToValueAtTime(0, t + 2);
  filter.connect(gain).connect(ctx.destination);
  // A low chord, slightly detuned, like a real ship's whistle.
  for (const freq of [98, 123.5, 147]) {
    const tone = ctx.createOscillator();
    tone.type = "sawtooth";
    tone.frequency.value = freq;
    tone.detune.value = Math.random() * 8 - 4;
    tone.connect(filter);
    tone.start(t);
    tone.stop(t + 2.05);
  }
  return 2.1;
}

export default function EasterEgg() {
  const keys = useRef([]);
  const [effect, setEffect] = useState(null);

  useEffect(() => {
    function trigger(kind) {
      const ctx = new AudioContext();
      const seconds = kind === "sos" ? morse(ctx) : horn(ctx);
      setTimeout(() => ctx.close(), (seconds + 0.5) * 1000);
      setEffect({ kind, id: Date.now() });
      document.documentElement.classList.add("rocking");
      setTimeout(() => {
        document.documentElement.classList.remove("rocking");
        setEffect(null);
      }, 3200);
    }

    function onKey(e) {
      if (e.ctrlKey || e.metaKey || e.altKey || e.target.closest?.("input, textarea, [contenteditable]")) return;
      const buffer = [...keys.current, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-10);
      keys.current = buffer;
      if (buffer.join(" ").endsWith(KONAMI)) {
        keys.current = [];
        trigger("horn");
      } else if (buffer.slice(-3).join("") === "sos") {
        keys.current = [];
        trigger("sos");
      }
    }

    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  if (!effect) return null;

  return (
    <>
      <svg key={effect.id} className="swell" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60C150 20 300 100 450 60S750 20 900 60 1050 100 1200 60V200H0Z" fill="var(--color-shallow)" />
        <path d="M0 100C150 70 300 130 450 100S750 70 900 100 1050 130 1200 100V200H0Z" fill="var(--color-shoal)" />
      </svg>
      <p role="status" className="toast">
        {effect.kind === "sos" ? "··· ––– ···  Distress call received. Help is on the way." : "Ahoy! You found the ship's horn."}
      </p>
    </>
  );
}
