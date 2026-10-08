"use client";
/* eslint-disable @next/next/no-img-element -- remote Last.fm album art; static export can't optimize it */

import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;
const USER = process.env.NEXT_PUBLIC_LASTFM_USERNAME;

export default function NowPlaying() {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    if (!API_KEY || !USER) return;
    const load = () =>
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USER}&api_key=${API_KEY}&format=json&limit=1`,
      )
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          const latest = [].concat(data?.recenttracks?.track ?? [])[0];
          if (latest) setTrack(latest);
        })
        .catch(() => {});
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  if (!track) return null;

  const artist = track.artist?.["#text"] ?? "";
  const art = track.image?.find((img) => img.size === "medium")?.["#text"];
  const live = track["@attr"]?.nowplaying === "true";

  return (
    <a
      href={`https://open.spotify.com/search/${encodeURIComponent(`${track.name} ${artist}`)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-12 z-30 hidden max-w-72 items-center gap-3 border border-ink bg-paper p-2 pr-4 no-underline hover:bg-sea md:flex"
    >
      {art && <img src={art} alt="" width="40" height="40" className="size-10 shrink-0" />}
      <span className="min-w-0 font-sans text-xs leading-snug">
        <span className="flex items-center gap-1.5 text-pencil">
          {live && (
            <span className="eq" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          )}
          {live ? "Listening now" : "Last played"}
        </span>
        <span className="block truncate">{track.name}</span>
        <span className="block truncate text-pencil">{artist}</span>
        <span className="sr-only">(search on Spotify, opens in a new tab)</span>
      </span>
    </a>
  );
}
