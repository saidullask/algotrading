// src/components/DocSidebar.jsx
import React from "react";

export default function DocSidebar({ sections = [], activeId }) {
  return (
    <aside
      className="
        sticky top-20
        hidden lg:block
        w-64 shrink-0
      "
    >
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">
          Documentation
        </div>
        <nav className="space-y-1">
          {sections.map((s) => {
            const isActive = s.id === activeId;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`block rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-emerald-500/10 border border-emerald-600/30 text-emerald-300"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {s.title}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">
          Need help?
        </div>
        <p className="text-sm text-slate-300">
          Can’t find what you’re looking for?{" "}
          <a className="text-cyan-400 hover:underline" href="#support">
            Contact support
          </a>
          .
        </p>
      </div>
    </aside>
  );
}
