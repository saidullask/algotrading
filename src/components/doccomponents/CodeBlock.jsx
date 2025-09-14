// src/components/CodeBlock.jsx
import React from "react";

export default function CodeBlock({ title = "Example", children }) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/70">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 bg-slate-900/60">
        <span className="text-xs uppercase tracking-widest text-slate-400">
          {title}
        </span>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        </div>
      </div>
      <pre className="overflow-auto text-sm leading-relaxed p-4 text-slate-200">
        <code>{children}</code>
      </pre>
    </div>
  );
}
