import React, { useState, useRef, Suspense, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button, Card, CardContent } from "../../components/CradComponent";
import logo from "../../assets/prime_logo_ctechalgo.png";
import Footer from "../../components/Footer";

function FloatingPoints({ count = 220 }) {
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 2.2 + Math.random() * 1.6;
            const t = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 1.6;
            arr[i * 3 + 0] = Math.cos(t) * r;
            arr[i * 3 + 1] = y;
            arr[i * 3 + 2] = Math.sin(t) * r;
        }
        return arr;
    }, [count]);

    const ref = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ref.current) ref.current.rotation.y = t * 0.05;
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
        ref.current.rotation.y += d * 0.35;
        ref.current.rotation.x += d * 0.18;
    });
    return (
        <mesh ref={ref}>
            <torusKnotGeometry args={[1.05, 0.22, 240, 24, 2, 5]} />
            <meshStandardMaterial
                color="#10b981"
                metalness={0.55}
                roughness={0.25}
                emissive="#064e3b"
                emissiveIntensity={0.15}
            />
        </mesh>
    );
}

function CardBackground3D() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
            <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <pointLight position={[2, 2, 3]} intensity={1.1} color="#22d3ee" />
                <pointLight position={[-3, -1, -3]} intensity={0.8} color="#10b981" />
                <Suspense fallback={null}>
                    <TwistedRibbon />
                    <FloatingPoints />
                    <OrbitControls enablePan={false} enableZoom={false} />
                </Suspense>
            </Canvas>
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-cyan-500/10 to-indigo-500/10" />
        </div>
    );
}

export default function Registration() {
    const navigate = useNavigate();
    const [step, setStep] = useState("code");
    const [error, setError] = useState("");

    const [clientCode, setClientCode] = useState("");

    const [adminForm, setAdminForm] = useState({
        code: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
    });

    const [finalForm, setFinalForm] = useState({
        name: "",
        emailOrPan: "",
    });

    const isValidClientCode = (code) => /^[A-Za-z0-9]{6,10}$/.test(code);

    const handleCheckCode = (e) => {
        e.preventDefault();
        setError("");
        if (!clientCode) {
            setError("Please enter your Client Code.");
            return;
        }
        if (isValidClientCode(clientCode)) {
            setStep("valid");
            setFinalForm({ name: "", emailOrPan: "" });
        } else {
            setStep("admin");
            setAdminForm((f) => ({ ...f, code: clientCode }));
        }
    };

    const handleNoCode = (e) => {
        e.preventDefault();
        setError("");
        setStep("admin");
        setAdminForm({ code: "", fullName: "", email: "", phone: "", address: "" });
    };

    const submitAdmin = async (e) => {
        e.preventDefault();
        setError("");
        const { fullName, email, phone, address } = adminForm;
        if (!fullName || !email || !phone || !address) {
            setError("Please complete all required fields.");
            return;
        }
        await new Promise((r) => setTimeout(r, 600));
        navigate("/login");
    };

    const submitFinal = async (e) => {
        e.preventDefault();
        setError("");
        if (!finalForm.name || !finalForm.emailOrPan) {
            setError("Please complete all required fields.");
            return;
        }
        await new Promise((r) => setTimeout(r, 600));
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <style>{`
                    input:-webkit-autofill,
                    input:-webkit-autofill:hover,
                    input:-webkit-autofill:focus {
                    -webkit-text-fill-color: #e2e8f0;
                    transition: background-color 9999s ease-in-out 0s;
                    box-shadow: 0 0 0px 1000px rgba(15, 23, 42, 0.85) inset;
                    border: 1px solid rgba(51, 65, 85, 1);
                    }
                    input:autofill {
                    background: rgba(15,23,42,.85) !important;
                    color: #e2e8f0 !important;
                    }
                `}</style>

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

            <main className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
                <section className="relative max-w-xl mx-auto px-6 py-10 md:py-16">
                    <Card className="relative border-slate-800/70 rounded-2xl bg-slate-900/40 overflow-hidden">
                        <div className="absolute inset-0 -z-0 opacity-60">
                            <CardBackground3D />
                        </div>
                        <div className="absolute inset-0 pointer-events-none -z- bg-gradient-to-br from-slate-950/40 via-slate-900/30 to-slate-950/40" />

                        <CardContent className="relative p-6 md:p-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                className="text-2xl md:text-3xl font-bold"
                            >
                                Authenticate
                            </motion.h1>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="rounded-xl bg-emerald-700/30 border border-emerald-500/40 px-3 py-1.5 text-sm font-medium">
                                    Registration
                                </div>
                                <div className="text-sm text-slate-400">
                                    Already registered?{" "}
                                    <Link to="/login" className="text-emerald-400 hover:underline">
                                        Log in
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-6">
                                <AnimatePresence mode="wait">
                                    {step === "code" && (
                                        <motion.form
                                            key="step-code"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                            onSubmit={handleCheckCode}
                                            className="space-y-5"
                                        >
                                            <div>
                                                <label className="block text-sm text-slate-300 mb-1.5">
                                                    Client Code <span className="text-rose-400">*</span>
                                                </label>
                                                <input
                                                    value={clientCode}
                                                    onChange={(e) => setClientCode(e.target.value.trim())}
                                                    autoComplete="off"
                                                    placeholder="Enter Client Code"
                                                    className="w-full rounded-xl bg-slate-900/70 text-slate-200 border border-slate-700 placeholder-slate-400 px-4 py-2.5 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400"
                                                />
                                            </div>
                                            {error && (
                                                <div className="rounded-lg border border-rose-700/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                                                    {error}
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between">
                                                <button
                                                    type="button"
                                                    onClick={handleNoCode}
                                                    className="text-emerald-400 hover:underline text-sm"
                                                >
                                                    I do not have Client Code.
                                                </button>
                                                <Button className="rounded-2xl px-6">Proceed</Button>
                                            </div>
                                        </motion.form>
                                    )}

                                    {step === "admin" && (
                                        <motion.form
                                            key="step-admin"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                            onSubmit={submitAdmin}
                                            className="space-y-4"
                                        >
                                            <div className="rounded-lg bg-emerald-700/25 border border-emerald-500/40 text-center py-2 font-medium">
                                                Request User To Admin
                                            </div>
                                            <div>
                                                <label className="block text-sm text-slate-300 mb-1.5">Client Code</label>
                                                <input
                                                    value={adminForm.code}
                                                    onChange={(e) => setAdminForm((f) => ({ ...f, code: e.target.value }))}
                                                    placeholder="Enter Client Code"
                                                    className="w-full rounded-xl bg-slate-900/70 text-slate-200 border border-slate-700 placeholder-slate-400 px-4 py-2.5 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-slate-300 mb-1.5">
                                                    Full Name <span className="text-rose-400">*</span>
                                                </label>
                                                <input
                                                    value={adminForm.fullName}
                                                    onChange={(e) => setAdminForm((f) => ({ ...f, fullName: e.target.value }))}
                                                    placeholder="Enter Full Name"
                                                    className="w-full rounded-xl bg-slate-900/70 text-slate-200 border border-slate-700 placeholder-slate-400 px-4 py-2.5 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-slate-300 mb-1.5">
                                                    Email <span className="text-rose-400">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    value={adminForm.email}
                                                    onChange={(e) => setAdminForm((f) => ({ ...f, email: e.target.value }))}
                                                    placeholder="Enter Email"
                                                    className="w-full rounded-xl bg-slate-900/70 text-slate-200 border border-slate-700 placeholder-slate-400 px-4 py-2.5 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-slate-300 mb-1.5">
                                                    Phone Number <span className="text-rose-400">*</span>
                                                </label>
                                                <input
                                                    value={adminForm.phone}
                                                    onChange={(e) => setAdminForm((f) => ({ ...f, phone: e.target.value }))}
                                                    placeholder="Enter Phone Number"
                                                    className="w-full rounded-xl bg-slate-900/70 text-slate-200 border border-slate-700 placeholder-slate-400 px-4 py-2.5 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-slate-300 mb-1.5">
                                                    Address <span className="text-rose-400">*</span>
                                                </label>
                                                <input
                                                    value={adminForm.address}
                                                    onChange={(e) => setAdminForm((f) => ({ ...f, address: e.target.value }))}
                                                    placeholder="Enter Address"
                                                    className="w-full rounded-xl bg-slate-900/70 text-slate-200 border border-slate-700 placeholder-slate-400 px-4 py-2.5 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
                                                />
                                            </div>
                                            {error && (
                                                <div className="rounded-lg border border-rose-700/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                                                    {error}
                                                </div>
                                            )}
                                            <div className="flex items-center justify-end">
                                                <Button className="rounded-2xl px-6">Proceed</Button>
                                            </div>
                                        </motion.form>
                                    )}

                                    {step === "valid" && (
                                        <motion.form
                                            key="step-valid"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                            onSubmit={submitFinal}
                                            className="space-y-5"
                                        >
                                            <div className="rounded-lg bg-emerald-700/25 border border-emerald-500/40 text-center py-2 font-medium">
                                                Registration
                                            </div>
                                            <div>
                                                <label className="block text-sm text-slate-300 mb-1.5">
                                                    Email / PAN <span className="text-rose-400">*</span>
                                                </label>
                                                <input
                                                    value={finalForm.emailOrPan}
                                                    onChange={(e) => setFinalForm((f) => ({ ...f, emailOrPan: e.target.value }))}
                                                    placeholder="Enter Email or PAN"
                                                    className="w-full rounded-xl bg-slate-900/70 text-slate-200 border border-slate-700 placeholder-slate-400 px-4 py-2.5 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-slate-300 mb-1.5">
                                                    Name <span className="text-rose-400">*</span>
                                                </label>
                                                <input
                                                    value={finalForm.name}
                                                    onChange={(e) => setFinalForm((f) => ({ ...f, name: e.target.value }))}
                                                    placeholder="Enter Name"
                                                    className="w-full rounded-xl bg-slate-900/70 text-slate-200 border border-slate-700 placeholder-slate-400 px-4 py-2.5 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400"
                                                />
                                            </div>
                                            {error && (
                                                <div className="rounded-lg border border-rose-700/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                                                    {error}
                                                </div>
                                            )}
                                            <div className="flex items-center justify-end">
                                                <Button className="rounded-2xl px-6">Proceed</Button>
                                            </div>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </main>
            <Footer />
        </div>
    );
}
