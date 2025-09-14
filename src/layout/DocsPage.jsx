import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DocSidebar from "../components/doccomponents/DocSidebar";
import CodeBlock from "../components/doccomponents/CodeBlock";
import logo from "../assets/prime_logo_ctechalgo.png";
import Footer from "../components/Footer";
import { Button } from "../components/CradComponent";
function useActiveSection(ids) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]?.target?.id) {
                    setActive(visible[0].target.id);
                }
            },
            { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, [ids]);
    return active;
}

export default function DocsPage() {
    const sections = useMemo(
        () => [
            { id: "overview", title: "Overview" },
            { id: "getting-started", title: "Getting Started" },
            { id: "accounts-kyc", title: "Accounts & KYC" },
            { id: "plans-pricing", title: "Plans & Pricing" },
            { id: "strategies", title: "Strategies" },
            { id: "risk-compliance", title: "Risk & Compliance" },
            { id: "support", title: "Support & Contact" },
            { id: "faqs", title: "FAQs" },
        ],
        []
    );

    const activeId = useActiveSection(sections.map((s) => s.id));
    const [query, setQuery] = useState("");
    const matches = (text) =>
        query.trim().length === 0 ||
        text.toLowerCase().includes(query.trim().toLowerCase());

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-800/60">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 md:gap-3 min-w-0">
                        <img
                            src={logo}
                            alt="CTechAlgo"
                            className="h-14 md:h-16 w-auto object-contain shrink-0 select-none
                                filter brightness-[1.05] contrast-[1.05] saturate-[1.05]
                                [filter:drop-shadow(0_1px_8px_rgba(56,189,248,0.22))]"
                            draggable="false"
                        />
                    </Link>
                    <div className="flex items-center gap-3">                        
                        <a
                            href="https://wa.me/919876543210?text=Hello%20C-Tech%20Algo%20Team"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="rounded-2xl bg-emerald-500 text-white hover:bg-emerald-600">
                                Connect With Us
                            </Button>
                        </a>
                    </div>
                </div>
            </header>
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
                <div className="relative max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
                    >
                        C-Tech Documentation
                    </motion.h1>
                    <p className="mt-3 text-slate-300 max-w-2xl">
                        Learn how to set up your account, connect brokers, deploy strategies,
                        and manage risk — all within the C-Tech ecosystem.
                    </p>

                    {/* Search */}
                    <div className="mt-6 max-w-xl">
                        <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 px-3 py-2">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                className="text-slate-400"
                                fill="none"
                            >
                                <path
                                    d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search docs…"
                                className="w-full bg-transparent outline-none text-slate-200 placeholder-slate-500"
                            />
                            <span className="hidden sm:inline-block text-[11px] text-slate-500 border border-slate-700 rounded-md px-2 py-0.5">
                                /
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Body */}
            <main className="relative max-w-7xl mx-auto px-6 pb-16 md:pb-20">
                <div className="grid lg:grid-cols-[16rem_1fr] gap-8 md:gap-10">
                    {/* Sidebar */}
                    <DocSidebar sections={sections} activeId={activeId} />

                    {/* Content */}
                    <div className="space-y-12 md:space-y-16">
                        {/* Overview */}
                        <section id="overview" className="scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-bold text-white">Overview</h2>
                            <p className="mt-3 text-slate-300">
                                C-Tech provides a streamlined trading workspace —{" "}
                                <span className="text-slate-200">
                                    connect your broker, configure strategies, monitor positions,
                                </span>{" "}
                                and manage risk from a clean, fast interface.
                            </p>
                            <div className="mt-6 grid md:grid-cols-3 gap-4">
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="text-xs text-slate-400">Compliance First</div>
                                    <div className="text-slate-200 mt-1">
                                        SEBI-aligned controls, audit-friendly trails, encrypted keys.
                                    </div>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="text-xs text-slate-400">Automation</div>
                                    <div className="text-slate-200 mt-1">
                                        Entry/exit rules, position sizing, and alerts — automated.
                                    </div>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="text-xs text-slate-400">Visibility</div>
                                    <div className="text-slate-200 mt-1">
                                        Live P&amp;L, win-rate stats, and execution latency insights.
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Getting Started */}
                        {matches("getting started") && (
                            <section id="getting-started" className="scroll-mt-24">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">
                                    Getting Started
                                </h2>
                                <ol className="mt-3 list-decimal pl-5 text-slate-300 space-y-2">
                                    <li>Create your account and verify your email.</li>
                                    <li>Complete KYC with your PAN and basic details.</li>
                                    <li>Connect your broker account securely.</li>
                                    <li>Pick a strategy template or create your own rules.</li>
                                    <li>Paper trade to validate, then switch to live.</li>
                                </ol>

                                <div className="mt-6">
                                    <CodeBlock title="Strategy Rule (pseudo)">
                                        {`IF (RSI < 30 AND Price in Demand Zone) THEN
  ENTER LONG with 1R risk
  TAKE PROFIT at 2R
  STOP LOSS at recent swing low
ELSE
  WAIT`}
                                    </CodeBlock>
                                </div>
                            </section>
                        )}

                        {/* Accounts & KYC */}
                        {matches("kyc accounts pan") && (
                            <section id="accounts-kyc" className="scroll-mt-24">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">
                                    Accounts & KYC
                                </h2>
                                <p className="mt-3 text-slate-300">
                                    We follow a KYC-first flow. Use your email and PAN; ensure your
                                    name matches broker records. All sensitive data is encrypted in
                                    transit and at rest.
                                </p>
                                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                        <div className="text-xs text-slate-400">Requirements</div>
                                        <ul className="mt-2 text-slate-300 list-disc pl-4 space-y-1">
                                            <li>PAN & valid email</li>
                                            <li>Up-to-date broker account</li>
                                            <li>Mobile OTP for verification</li>
                                        </ul>
                                    </div>
                                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                        <div className="text-xs text-slate-400">Security</div>
                                        <ul className="mt-2 text-slate-300 list-disc pl-4 space-y-1">
                                            <li>OAuth flows where supported</li>
                                            <li>Key storage with strong encryption</li>
                                            <li>Role-based access in team plans</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Plans & Pricing */}
                        {matches("pricing plans") && (
                            <section id="plans-pricing" className="scroll-mt-24">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">
                                    Plans & Pricing
                                </h2>
                                <p className="mt-3 text-slate-300">
                                    Choose from Starter, Pro, or Enterprise — upgrade or downgrade
                                    anytime. Billing is monthly, with GST as applicable.
                                </p>
                                <div className="mt-6 grid md:grid-cols-3 gap-4">
                                    {[
                                        { name: "Starter", price: "₹0/mo", features: ["Paper trading", "Delayed data", "Community support"] },
                                        { name: "Pro", price: "₹1499/mo", features: ["Live data", "Strategy builder", "Priority support"] },
                                        { name: "Enterprise", price: "₹4999/mo", features: ["Dedicated cluster", "Custom risk", "SLA & onboarding"] },
                                    ].map((p) => (
                                        <div
                                            key={p.name}
                                            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="font-semibold text-slate-100">{p.name}</div>
                                                <div className="text-emerald-400 font-bold">{p.price}</div>
                                            </div>
                                            <ul className="mt-3 text-slate-300 list-disc pl-4 space-y-1">
                                                {p.features.map((f) => (
                                                    <li key={f}>{f}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Strategies */}
                        {matches("strategies rsi breakout trend") && (
                            <section id="strategies" className="scroll-mt-24">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">Strategies</h2>
                                <p className="mt-3 text-slate-300">
                                    Build from templates (Momentum, Breakout, Trend, Mean Reversion)
                                    or import your rules. Tune risk per trade, max exposure, and time
                                    windows.
                                </p>

                                <div className="mt-6 grid md:grid-cols-2 gap-4">
                                    <CodeBlock title="Breakout (pseudo)">
                                        {`IF (Price > Previous High AND Volume > 1.5 * AvgVolume)
  ENTER LONG
  TP = 2R, SL = 1R
ELSE
  WAIT`}
                                    </CodeBlock>
                                    <CodeBlock title="Trend (pseudo)">
                                        {`IF (Price > 200 EMA AND Pullback to 50 EMA AND RSI > 55)
  ENTER LONG
  TRAIL STOP with 20 EMA
ELSE
  WAIT`}
                                    </CodeBlock>
                                </div>
                            </section>
                        )}

                        {/* Risk & Compliance */}
                        {matches("risk sebi compliance") && (
                            <section id="risk-compliance" className="scroll-mt-24">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">
                                    Risk & Compliance
                                </h2>
                                <p className="mt-3 text-slate-300">
                                    C-Tech includes broker-level validations and guardrails aligned
                                    with Indian market practices. Always validate your risk before
                                    enabling live trading.
                                </p>
                                <ul className="mt-3 text-slate-300 list-disc pl-5 space-y-1">
                                    <li>Max loss per day & per strategy</li>
                                    <li>Exposure caps by instrument</li>
                                    <li>Session cut-off, circuit breaker handling</li>
                                </ul>
                            </section>
                        )}

                        {/* Support */}
                        {matches("support contact help refund cancellation privacy") && (
                            <section id="support" className="scroll-mt-24">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">
                                    Support & Contact
                                </h2>
                                <p className="mt-3 text-slate-300">
                                    Reach out for onboarding, billing questions, or technical help.
                                </p>
                                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                        <div className="text-xs text-slate-400">Email</div>
                                        <div className="text-slate-200 mt-1">support@ctechalgo.in</div>
                                    </div>
                                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                        <div className="text-xs text-slate-400">Hours</div>
                                        <div className="text-slate-200 mt-1">Mon–Sat, 9:00–18:00 IST</div>
                                    </div>
                                </div>
                                <div className="mt-4 text-sm text-slate-400">
                                    For refund/cancellation/privacy policies, see the policy pages on
                                    the website.
                                </div>
                            </section>
                        )}

                        {/* FAQs */}
                        {matches("faq frequently asked") && (
                            <section id="faqs" className="scroll-mt-24">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">FAQs</h2>
                                <div className="mt-4 space-y-4">
                                    {[
                                        {
                                            q: "Do I need a broker account to start?",
                                            a: "You can begin with paper trading. Live trading requires a supported broker connection.",
                                        },
                                        {
                                            q: "Is there a free trial?",
                                            a: "Starter is free for paper trading. Pro/Enterprise are billed monthly.",
                                        },
                                        {
                                            q: "Can I use my own strategy?",
                                            a: "Yes. Start from a template or define your custom entry/exit rules and risk.",
                                        },
                                    ].map((f, i) => (
                                        <details
                                            key={i}
                                            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
                                        >
                                            <summary className="cursor-pointer text-slate-200 font-medium">
                                                {f.q}
                                            </summary>
                                            <p className="mt-2 text-slate-300">{f.a}</p>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
