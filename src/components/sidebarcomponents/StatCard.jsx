import React from "react";

export default function StatCard({ title, value, note, tone = "emerald" }) {
  const tones = {
    emerald: "text-emerald-400",
    cyan: "text-cyan-400",
    rose: "text-rose-400",
    indigo: "text-indigo-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="text-sm text-slate-400">{title}</div>
      <div className={`mt-1 text-2xl font-semibold ${tones[tone] || tones.emerald}`}>
        {value}
      </div>
      {note && <div className="mt-2 text-xs text-slate-500">{note}</div>}
    </div>
  );
}
