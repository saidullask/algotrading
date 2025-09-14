// src/pages/belief/Belief.jsx
import React from "react";
import { TrendingUp, Globe2, LineChart } from "lucide-react";

function Card({ children, icon: Icon }) {
  return (
    <div className="relative rounded-2xl border border-slate-800/70 bg-slate-900/50 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
      {/* subtle top accent */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-emerald-500/40 via-cyan-400/40 to-emerald-500/40" />
      {Icon ? (
        <div className="mb-3 inline-flex items-center gap-2 text-emerald-400">
          <Icon className="h-5 w-5" />
          <span className="text-xs uppercase tracking-wider text-emerald-300/80">
            Market Insight
          </span>
        </div>
      ) : null}
      <p className="text-slate-200 leading-7">
        {children}
      </p>
    </div>
  );
}

export default function Belief() {
  return (
    <div className="space-y-6">
      {/* Header / Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="mt-1 hidden sm:block">
              <svg viewBox="0 0 48 48" className="h-10 w-10 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M6 36l8-10 6 6 8-14 8 10M6 42h36M6 6h36" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Our Belief: India & Nifty 50 Outlook
              </h1>
              <p className="mt-1 text-slate-400">
                A long-term view aligned with macro strength, market depth, and structural growth.
              </p>
            </div>
          </div>

          {/* quick “trading” chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-emerald-700/40 bg-slate-900/50 px-3 py-2">
              <div className="text-[10px] uppercase tracking-wide text-slate-400">Theme</div>
              <div className="text-sm font-semibold text-emerald-300">Structural Growth</div>
            </div>
            <div className="rounded-xl border border-cyan-700/40 bg-slate-900/50 px-3 py-2">
              <div className="text-[10px] uppercase tracking-wide text-slate-400">Bias</div>
              <div className="text-sm font-semibold text-cyan-300">Long-term</div>
            </div>
            <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 px-3 py-2">
              <div className="text-[10px] uppercase tracking-wide text-slate-400">Focus</div>
              <div className="text-sm font-semibold text-slate-200">Nifty 50</div>
            </div>
          </div>
        </div>
      </div>

      {/* Belief Cards */}
      <div className="space-y-5">
        <Card icon={TrendingUp}>
          The Indian economy is one of the fastest-growing major economies in the world. With a young and expanding population, rising digitalization, and a rapidly growing middle class, India&apos;s growth prospects remain strong. The country’s GDP growth has shown resilience, and many economists project it to continue expanding in the coming years.
        </Card>

        <Card icon={Globe2}>
          With India&apos;s growing economic stature, the country has become a key player in global geopolitics, trade, and investment. This has led to stronger market sentiment, supporting the belief that Indian equities, including the Nifty, will continue to perform well.
        </Card>

        <Card icon={LineChart}>
          The Nifty 50, representing the top 50 companies on the National Stock Exchange (NSE), has shown solid performance in recent years. The index is a reflection of the overall market sentiment, and its resilience is attributed to the strength of India’s largest companies across sectors.
        </Card>

        <Card icon={TrendingUp}>
          With its favorable demographics, economic policies, and sectoral strengths, India’s economy and the Nifty 50 are likely to continue on an upward trajectory, making them attractive for long-term investors.
        </Card>
      </div>
    </div>
  );
}
