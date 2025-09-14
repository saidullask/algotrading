// src/pages/policies/Pricing.jsx
import React from "react";
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Clock3,
  Check,
  BadgeIndianRupee,
  ChartCandlestick,
  Sparkles,
} from "lucide-react";

const LocalStyles = () => (
  <style>{`
    .pr-shell {
      --bg0: #0b1220;
      --bg1: #0a1222;
      --bd: rgba(51,65,85,.65);
      --glow: 0 20px 60px rgba(16,185,129,.08), inset 0 1px 0 rgba(255,255,255,.03);
    }
    .pr-hero {
      border: 1px solid var(--bd);
      border-radius: 22px;
      background:
        radial-gradient(900px 260px at 0% 0%, rgba(16,185,129,.12), transparent 60%),
        radial-gradient(900px 260px at 100% 0%, rgba(56,189,248,.10), transparent 60%),
        linear-gradient(180deg, #0a1324, #091020);
      box-shadow: var(--glow);
    }
    .pr-card {
      border: 1px solid var(--bd);
      border-radius: 20px;
      background:
        radial-gradient(800px 300px at 20% -10%, rgba(34,197,94,.10), transparent 55%),
        radial-gradient(700px 250px at 120% 10%, rgba(56,189,248,.10), transparent 55%),
        linear-gradient(180deg,#0d172b,#0a1222);
      box-shadow: var(--glow);
    }
    .pr-feature {
      border: 1px solid rgba(51,65,85,.55);
      background: linear-gradient(180deg,#0d172b,#0a1324);
      border-radius: 14px;
    }
    .chip {
      display:inline-flex; align-items:center; gap:.45rem;
      border-radius:999px; padding:.3rem .6rem;
      border:1px solid rgba(16,185,129,.32);
      background: rgba(16,185,129,.12);
      color:#86efac; font-weight:800; letter-spacing:.2px;
    }
  `}</style>
);

function LineItem({ children }) {
  return (
    <li className="flex items-start gap-2 text-[15px]">
      <Check className="mt-[2px] h-4.5 w-4.5 text-emerald-400 shrink-0" />
      <span className="text-slate-300">{children}</span>
    </li>
  );
}

export default function Pricing() {
  return (
    <div className="pr-shell min-h-screen bg-slate-950 text-slate-100">
      <LocalStyles />

      <div className="max-w-7xl mx-auto px-6 pt-10 pb-16">
        {/* Hero */}
        <div className="pr-hero relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="relative px-6 md:px-10 py-8 md:py-10">
            <div className="flex items-start gap-4">
              <div className="mt-1 hidden sm:block">
                <TrendingUp className="h-10 w-10 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl md:text-5xl font-extrabold">Pricing</h1>
                  <span className="chip">
                    <Sparkles className="h-4 w-4" /> Simple, transparent
                  </span>
                </div>
                <p className="mt-2 text-slate-300 max-w-3xl">
                  One clean plan designed for active index traders. Built-in hedging, live
                  adjustments, and risk controls—without hidden fees.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Plan */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main plan card */}
          <div className="lg:col-span-8">
            <div className="pr-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <ChartCandlestick className="h-6 w-6 text-cyan-300" />
                  <h2 className="text-2xl font-extrabold">Nifty-Bull</h2>
                </div>

                <div className="flex items-end gap-3">
                  <div className="flex items-center gap-1">
                    <BadgeIndianRupee className="h-7 w-7 text-emerald-400" />
                    <span className="text-4xl font-black tracking-tight">4,720</span>
                  </div>
                  <div className="pb-2 text-slate-300">
                    <div className="text-sm font-semibold">per lot</div>
                    <div className="text-xs opacity-80">per month</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="pr-feature p-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4.5 w-4.5 text-emerald-300" />
                    <div className="font-semibold">What you get</div>
                  </div>
                  <ul className="mt-3 space-y-2">
                    <LineItem>Automated weekly Nifty positioning with dynamic hedges</LineItem>
                    <LineItem>Auto-adjustments with market movement</LineItem>
                    <LineItem>Risk management & drawdown guardrails</LineItem>
                    <LineItem>Live signals / execution ready</LineItem>
                    <LineItem>Email / WhatsApp support</LineItem>
                  </ul>
                </div>

                <div className="pr-feature p-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-300" />
                    <div className="font-semibold">Good to know</div>
                  </div>
                  <ul className="mt-3 space-y-2">
                    <LineItem>NSE F&O account required</LineItem>
                    <LineItem>Cancel anytime—no lock-in</LineItem>
                    <LineItem>GST as applicable</LineItem>
                    <LineItem>Best for swing/positional index traders</LineItem>
                    <LineItem>No profit guarantee; market risk applies</LineItem>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                
                <a
                  href="https://wa.me/919876543210?text=Hello%20C-Tech%20Algo%20Team"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-5 py-2.5 text-slate-200 hover:text-white hover:border-slate-600 transition"
                >
                  Talk to us
                </a>
                <div className="text-xs text-slate-400">
                  *Prices shown in INR. Taxes extra as applicable.
                </div>
              </div>
            </div>
          </div>

          {/* Side highlights */}
          <div className="lg:col-span-4">
            <div className="pr-card p-5">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4.5 w-4.5 text-cyan-300" />
                <div className="font-semibold">Why traders choose us</div>
              </div>
              <ul className="mt-3 space-y-3 text-[15px] text-slate-300">
                <li className="flex gap-2">
                  <Check className="mt-[3px] h-4.5 w-4.5 text-emerald-400" />
                  Weekly expiry, rule-based workflow
                </li>
                <li className="flex gap-2">
                  <Check className="mt-[3px] h-4.5 w-4.5 text-emerald-400" />
                  Hedged structures for volatility
                </li>
                <li className="flex gap-2">
                  <Check className="mt-[3px] h-4.5 w-4.5 text-emerald-400" />
                  Transparent, single plan—no surprises
                </li>
                <li className="flex gap-2">
                  <Check className="mt-[3px] h-4.5 w-4.5 text-emerald-400" />
                  Built for long-term, disciplined execution
                </li>
              </ul>

              <div className="mt-5 rounded-xl border border-emerald-600/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
                <div className="font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Launch Offer
                </div>
                <div className="mt-1 opacity-90">
                  Early users get priority onboarding and strategy walkthrough.
                </div>
              </div>
            </div>

            <div className="mt-6 pr-card p-5">
              <div className="text-sm text-slate-300">
                <div className="font-semibold text-slate-200">
                  Risk Disclosure
                </div>
                Algorithmic trading involves market risk. There is no guarantee of profit.
                Please trade responsibly and only with risk capital.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
