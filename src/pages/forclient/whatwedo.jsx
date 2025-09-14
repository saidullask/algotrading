// src/pages/whatwedo/WhatWeDo.jsx
import React from "react";
import {
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCcw,
  Activity,
} from "lucide-react";

function Badge({ tone = "emerald", label, value }) {
  const toneCls =
    tone === "emerald"
      ? "border-emerald-700/40 text-emerald-300"
      : tone === "cyan"
      ? "border-cyan-700/40 text-cyan-300"
      : "border-slate-700/40 text-slate-300";
  return (
    <div className={`rounded-xl border ${toneCls} bg-slate-900/50 px-3 py-2`}>
      <div className="text-[10px] uppercase tracking-wider text-slate-400">
        {label}
      </div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

function Card({ icon: Icon, title, children }) {
  return (
    <div className="relative rounded-2xl border border-slate-800/70 bg-slate-900/50 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-emerald-500/40 via-cyan-400/40 to-emerald-500/40" />
      <div className="flex items-start gap-3">
        {Icon ? (
          <div className="mt-0.5 text-emerald-400">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
        <div>
          {title ? (
            <h3 className="text-slate-100 font-semibold mb-1.5">{title}</h3>
          ) : null}
          <p className="text-slate-300/95 leading-7">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default function WhatWeDo() {
  return (
    <div className="space-y-6">
      {/* Header / Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="mt-1 hidden sm:block">
              <svg
                viewBox="0 0 48 48"
                className="h-10 w-10 text-emerald-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M6 36l8-10 6 6 8-14 8 10M6 42h36M6 6h36" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                What We Do
              </h1>
              <p className="mt-1 text-slate-400">
                A disciplined, hedged approach to participate in Nifty’s
                long-term trend while managing volatility.
              </p>
            </div>
          </div>

          {/* quick chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Badge label="Bias" value="Long-term Optimistic" tone="emerald" />
            <Badge label="Engine" value="Weekly Options" tone="cyan" />
            <Badge label="Risk" value="Hedged & Auto-Adjusted" />
          </div>
        </div>
      </div>

      {/* Core narrative + mini chart */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Card icon={TrendingUp}>
            Keeping a <b className="text-emerald-300">long-term optimistic view on the Nifty</b>, we create a{" "}
            <b className="text-slate-200">long position</b> on Nifty in{" "}
            <b className="text-slate-200">weekly expiry strikes</b>. However,
            keeping in mind the <b className="text-slate-200">volatile nature</b> of
            markets—and the short-term validity of weekly options—we{" "}
            <b className="text-slate-200">hedge</b> our exposure by creating{" "}
            <b className="text-slate-200">short positions</b>. These positions are{" "}
            <b className="text-emerald-300">automatically adjusted</b> with the
            movement of Nifty.
          </Card>
        </div>

        {/* Decorative chart card (theme-friendly, no external libs) */}
        <div className="lg:col-span-2">
          <div className="relative rounded-2xl border border-slate-800/70 bg-slate-900/50 p-4">
            <div className="text-sm text-slate-300/90 mb-2 flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-300" />
              Nifty Trend (Illustration)
            </div>
            <svg viewBox="0 0 340 160" className="w-full h-40 text-emerald-400">
              <defs>
                <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(16,185,129,.45)" />
                  <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                </linearGradient>
              </defs>
              {/* grid */}
              <g stroke="#1f2937" strokeWidth="1">
                {[...Array(5)].map((_, i) => (
                  <line key={i} x1="0" x2="340" y1={30 * (i + 1)} y2={30 * (i + 1)} />
                ))}
              </g>
              {/* line */}
              <polyline
                fill="url(#grad)"
                stroke="currentColor"
                strokeWidth="2"
                points="0,120 20,110 40,114 60,100 80,118 100,96 120,84 140,88 160,72 180,78 200,60 220,68 240,54 260,62 280,46 300,52 320,40 340,48 340,160 0,160"
              />
            </svg>
            <div className="mt-2 text-xs text-slate-400">
              Upward drift with hedged drawdown risk.
            </div>
          </div>
        </div>
      </div>

      {/* Approach tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <Card icon={ArrowUpRight} title="Build Core Longs">
          Express the long-term view via Nifty weekly options to capture trend
          continuation and compounding effects over time.
        </Card>
        <Card icon={ArrowDownRight} title="Hedge With Shorts">
          Use tactical short positions to offset adverse short-term moves and
          compress volatility without abandoning the core bias.
        </Card>
        <Card icon={ShieldCheck} title="Risk First">
          Position sizing, defined risk per leg, and guardrails on exposure help
          keep downside manageable during volatile sessions.
        </Card>
        <Card icon={RefreshCcw} title="Auto Adjustments">
          Systematically rebalance strikes and deltas as Nifty moves—no emotional
          decisions, just rules.
        </Card>
        <Card icon={Activity} title="Weekly Rhythm">
          Weekly expiries provide frequent calibration, efficient premium decay
          capture, and clean roll mechanics.
        </Card>
        <Card icon={TrendingUp} title="Stay In The Trend">
          Preserve participation in the structural India growth story while using
          hedges to smooth the ride.
        </Card>
      </div>

      {/* Note */}
      <div className="rounded-xl border border-slate-800/70 bg-slate-900/40 px-4 py-3 text-sm text-slate-300">
        <span className="text-emerald-300 font-semibold">Note:</span> This is a
        high-level overview of our process. Execution rules, risk parameters, and
        monitoring are handled by our internal engine.
      </div>
    </div>
  );
}
