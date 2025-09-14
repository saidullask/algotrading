import React, { useState } from "react";
import { Card } from "./CradComponent";

export default function YouTubeCard({
  videoId = "dQw4w9WgXcQ", // replace with your video id
  title = "C-Tech Algo — quick tour",
  className = "",
}) {
  const [play, setPlay] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <Card
      className={`relative w-full rounded-3xl border-slate-800/60 bg-slate-900/40 backdrop-blur-sm shadow-2xl overflow-hidden h-full ${className}`}
    >
      {/* Maintain aspect on mobile; stretch on md+ to fill column height */}
      <div className="relative h-[220px] sm:h-[260px] md:h-full">
        {!play ? (
          <button
            type="button"
            onClick={() => setPlay(true)}
            className="group relative w-full h-full"
            aria-label="Play video"
          >
            <img
              src={thumb}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/20 to-slate-950/50" />
            {/* play button */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-full border border-emerald-400/60 bg-slate-900/70 p-4 transition group-hover:scale-105">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7L8 5z" fill="#34d399" />
                </svg>
              </div>
            </div>
            {/* caption */}
            <span className="absolute bottom-3 left-3 text-xs px-2 py-1 rounded-md bg-slate-900/70 border border-slate-700 text-slate-200">
              {title} — click to play
            </span>
          </button>
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={src}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>
    </Card>
  );
}
