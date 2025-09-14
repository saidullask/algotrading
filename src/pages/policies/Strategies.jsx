import React, { useMemo, useRef, Suspense } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button, Card, CardHeader, CardTitle, CardContent } from "../../components/CradComponent";
import Footer from "../../components/Footer";
import logo from "../../assets/prime_logo_ctechalgo.png";
import CTA from "../../components/CTA";
function FloatingPoints({ count = 260 }) {
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 2.2 + Math.random() * 2.4;
            const t = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 2;
            arr[i * 3 + 0] = Math.cos(t) * r;
            arr[i * 3 + 1] = y;
            arr[i * 3 + 2] = Math.sin(t) * r;
        }
        return arr;
    }, [count]);

    const ref = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ref.current) ref.current.rotation.y = t * 0.06;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#38bdf8" />
        </points>
    );
}

function TwistedRibbon() {
    const ref = useRef();
    useFrame((_, d) => {
        if (!ref.current) return;
        ref.current.rotation.y += d * 0.4;
        ref.current.rotation.x += d * 0.18;
    });
    return (
        <mesh ref={ref}>
            <torusKnotGeometry args={[1.2, 0.22, 320, 28, 2, 5]} />
            <meshStandardMaterial
                color="#10b981"
                metalness={0.55}
                roughness={0.25}
                emissive="#064e3b"
                emissiveIntensity={0.12}
            />
        </mesh>
    );
}

function Header3D() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
            <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <pointLight position={[2, 2, 3]} intensity={1.1} color="#22d3ee" />
                <pointLight position={[-3, -1, -3]} intensity={0.8} color="#10b981" />
                <Suspense fallback={null}>
                    <TwistedRibbon />
                    <FloatingPoints />
                    <OrbitControls enableZoom={false} enablePan={false} />
                </Suspense>
            </Canvas>
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-cyan-500/10 to-indigo-500/10" />
        </div>
    );
}

function Chip({ children, tone = "emerald" }) {
    const tones = {
        emerald: "bg-emerald-600/15 text-emerald-300 border-emerald-600/30",
        cyan: "bg-cyan-600/15 text-cyan-300 border-cyan-600/30",
        indigo: "bg-indigo-600/15 text-indigo-300 border-indigo-600/30",
        slate: "bg-slate-700/20 text-slate-300 border-slate-600/40",
    };
    return (
        <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs ${tones[tone]}`}>
            {children}
        </span>
    );
}

function StrategyCard({ name, margin, fee, blurb }) {
    return (
        <Card className="bg-slate-900/60 border-slate-800 hover:border-slate-700 transition rounded-2xl">
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-white">{name}</CardTitle>
                <Chip tone="cyan">Live</Chip>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">{blurb}</p>
                <div className="flex flex-wrap gap-2">
                    <Chip tone="emerald">Margin: ₹{margin.toLocaleString("en-IN")}</Chip>
                    <Chip tone="indigo">Subscription: ₹{fee.toLocaleString("en-IN")}/mo (incl. tax per lot)</Chip>
                </div>
                <div className="pt-2 flex gap-3">
                    <Link to="/login" className="shrink-0">
                        <Button className="rounded-xl px-4 py-2">Subscribe</Button>
                    </Link>
                    <Link to="/documentation" className="shrink-0">
                        <Button variant="outline" className="rounded-xl px-4 py-2 border-slate-700 text-slate-200 hover:text-white">
                            View Docs
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

function GroupSection({ title, meta, strategies }) {
    return (
        <section className="max-w-7xl mx-auto px-6 py-10">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
                    <p className="mt-2 text-slate-300">{meta}</p>
                </div>
                <div className="flex gap-2">
                    <Chip tone="slate">SEBI-compliant</Chip>
                    <Chip tone="slate">Bank-grade security</Chip>
                    <Chip tone="slate">24×7 Support</Chip>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {strategies.map((s) => (
                    <StrategyCard key={s.name} {...s} />
                ))}
            </div>
        </section>
    );
}

export default function Strategies() {
    const fee4720 = 4720;
    const margin2L = 200000;
    const margin1L = 100000;

    const balancedEdge = [
        {
            name: "Nifty Max Buy",
            margin: margin2L,
            fee: fee4720,
            blurb:
                "Directional strategy focused on momentum bursts with defined risk per lot. Optimized for trending days with automated entries & exits.",
        },
        {
            name: "Nifty Bearish Premium Pro",
            margin: margin2L,
            fee: fee4720,
            blurb:
                "Premium-capturing bearish strategy that scales in during weakness and auto-manages risk using time-based and volatility stops.",
        },
        {
            name: "Nifty Theta Pro",
            margin: margin2L,
            fee: fee4720,
            blurb:
                "Income-oriented system that systematically collects theta with dynamic hedges. Targets steady returns in balanced market regimes.",
        },
    ];

    const rangersDuo = [
        {
            name: "Nifty Call Rangers",
            margin: margin1L,
            fee: fee4720,
            blurb:
                "Range-tracking strategy selling call-side premium around intraday resistance. Adaptive sizing and automated hedge placement.",
        },
        {
            name: "Nifty Put Rangers",
            margin: margin1L,
            fee: fee4720,
            blurb:
                "Mirror of Call Rangers for the downside—harvesting premium near support with strict risk controls and fast exit conditions.",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-800/60">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 md:gap-3 min-w-0">
                        <img
                            src={logo}
                            alt="C-Tech Algo"
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

            <section className="relative mx-auto max-w-7xl px-6 pt-10 md:pt-14 pb-8">
                <div className="relative rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 md:p-10 overflow-hidden">
                    <Header3D />
                    <div className="relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
                        >
                            Strategy Catalogue
                        </motion.h1>
                        <p className="mt-3 max-w-3xl text-slate-300">
                            Explore live, production-ready strategies engineered by C-Tech Algo. Each system is
                            fully automated with institutional-grade execution, guard-railed by strict risk rules,
                            and monitored 24×7.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link to="/documentation">
                                <Button className="rounded-2xl px-5 py-2.5">Read Docs</Button>
                            </Link>
                            <a href="#balanced">
                                <Button
                                    variant="outline"
                                    className="rounded-2xl border-slate-700 text-slate-300 hover:text-white px-5 py-2.5"
                                >
                                    Jump to Balanced Edge
                                </Button>
                            </a>
                            <a href="#rangers">
                                <Button
                                    variant="outline"
                                    className="rounded-2xl border-slate-700 text-slate-300 hover:text-white px-5 py-2.5"
                                >
                                    Jump to Rangers Duo
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Groups */}
            <div id="balanced">
                <GroupSection
                    title="Balanced Edge Strategies"
                    meta="Margin Requirement — ₹2,00,000 per lot • Subscription Fees — ₹4,720 / month (incl. taxes per lot)"
                    strategies={balancedEdge}
                />
            </div>

            <div id="rangers">
                <GroupSection
                    title="Rangers Duo"
                    meta="Margin Requirement — ₹1,00,000 per lot • Subscription Fees — ₹4,720 / month (incl. taxes per lot)"
                    strategies={rangersDuo}
                />
            </div>

            {/* Related content / notes */}
            <section className="max-w-7xl mx-auto px-6 pb-14">
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="bg-slate-900/60 border-slate-800 rounded-2xl">
                        <CardHeader><CardTitle className="text-white">Risk Management</CardTitle></CardHeader>
                        <CardContent className="text-slate-300 text-sm leading-relaxed">
                            Each strategy enforces max loss per lot, auto-hedge placement, volatility &amp; time-based
                            exits, and broker connectivity watchdogs. You can request custom limits for enterprise plans.
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/60 border-slate-800 rounded-2xl">
                        <CardHeader><CardTitle className="text-white">Connectivity & Execution</CardTitle></CardHeader>
                        <CardContent className="text-slate-300 text-sm leading-relaxed">
                            Low-latency order routing, exchange throttling compliance, and robust retry logic.
                            Supports multi-broker setups and hot-failover on request.
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/60 border-slate-800 rounded-2xl">
                        <CardHeader><CardTitle className="text-white">Onboarding</CardTitle></CardHeader>
                        <CardContent className="text-slate-300 text-sm leading-relaxed">
                            1) KYC &amp; broker linking • 2) Risk limits &amp; approvals • 3) Paper trade warm-up • 4) Go-live.
                            Typical go-live: 1–3 days after verification.
                        </CardContent>
                    </Card>
                </div>



                <div className="mt-8  fitems-center  gap-4 rounded-2xl border border-slate-800 ">
                    <CTA/>
                </div>
            </section>

            <Footer />
        </div>
    );
}
