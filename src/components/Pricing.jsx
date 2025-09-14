import { Suspense, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button, Card, CardHeader, CardTitle, CardContent } from "./CradComponent";
import { Link } from "react-router-dom";

function FloatingOrbs({ count = 14 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const r = 2.5 + Math.random() * 2.5;
      const t = (i / count) * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2.2;
      return [Math.cos(t) * r, y, Math.sin(t) * r];
    });
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.15;
  });

  return (
    <group ref={ref}>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshStandardMaterial
            color={i % 2 ? "#10b981" : "#06b6d4"}
            metalness={0.4}
            roughness={0.25}
            emissive={i % 2 ? "#064e3b" : "#0e7490"}
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

function ProductsBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.55} />
        <pointLight position={[4, 3, 5]} intensity={1.2} color={"#22d3ee"} />
        <pointLight position={[-4, -2, -5]} intensity={0.9} color={"#10b981"} />
        <Suspense fallback={null}>
          <FloatingOrbs />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-cyan-500/10 to-indigo-500/10" />
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-10 md:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          Our Algo Products
        </motion.h2>
        <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
          Professionally developed, ready-to-use strategies engineered for long-term consistency.
        </p>
      </div>

      <div className="relative rounded-3xl border border-slate-800/70 bg-slate-900/40 overflow-hidden">
        <ProductsBackground />

        <div className="relative p-6 md:p-10 lg:p-12 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-[1.1fr,0.9fr] gap-6 lg:gap-10 items-start"
          >
            <Card className="bg-slate-900/60 border-slate-800 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white text-xl md:text-2xl">
                  ✅ The Balanced Edge Strategies
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 leading-relaxed">
                <p>
                  A carefully crafted suite of three powerful algo strategies designed for balanced
                  performance across market conditions. Perfect for traders seeking systematic,
                  long-term returns without the hassle of constant monitoring.
                </p>

                <div className="mt-5">
                  <div className="text-slate-200 font-semibold mb-2">🔹 Strategies Included:</div>
                  <ul className="space-y-2 text-slate-300">
                    <li>
                      <span className="text-slate-100 font-medium">Nifty Max Buy</span> — Systematic
                      long entry strategy for optimal market participation.
                    </li>
                    <li>
                      <span className="text-slate-100 font-medium">Nifty Bearish Premium Pro</span> — Profits
                      from bearish market movements with advanced premium capture techniques.
                    </li>
                    <li>
                      <span className="text-slate-100 font-medium">Nifty Theta Pro</span> — Leverages time
                      decay and market-neutral opportunities for steady performance.
                    </li>
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-lg border border-emerald-600/40 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                    💸 Margin Required: ₹2,00,000
                  </span>
                  <span className="rounded-lg border border-cyan-600/40 bg-cyan-500/10 px-3 py-1 text-cyan-300">
                    📊 Subscription Price: ₹4,720 / Month / Lot
                  </span>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link to="/login" >
                    <Button className="rounded-2xl">Subscribe</Button>
                  </Link>


                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                ["Nifty Max Buy", "Optimized systematic long entries for trend participation."],
                ["Nifty Bearish Premium Pro", "Premium capture tactics for bearish phases."],
                ["Nifty Theta Pro", "Time-decay edge with market-neutral posture."],
              ].map(([title, desc]) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
                >
                  <div className="text-slate-100 font-semibold">{title}</div>
                  <div className="text-slate-300 text-sm mt-1">{desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="grid lg:grid-cols-[1.1fr,0.9fr] gap-6 lg:gap-10 items-start"
          >
            <Card className="bg-slate-900/60 border-slate-800 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white text-xl md:text-2xl">🚀 The Rangers Duo</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 leading-relaxed">
                <p>
                  A dynamic pair of strategies focused on directional market opportunities with
                  efficient capital usage.
                </p>

                <div className="mt-5">
                  <div className="text-slate-200 font-semibold mb-2">🔹 Strategies Included:</div>
                  <ul className="space-y-2 text-slate-300">
                    <li>
                      <span className="text-slate-100 font-medium">Call Rangers</span> — Captures bullish
                      market movements using a systematic approach.
                    </li>
                    <li>
                      <span className="text-slate-100 font-medium">Put Rangers</span> — Focused on bearish
                      market opportunities with disciplined strategy logic.
                    </li>
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-lg border border-emerald-600/40 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                    💸 Margin Required: ₹1,00,000
                  </span>
                  <span className="rounded-lg border border-cyan-600/40 bg-cyan-500/10 px-3 py-1 text-cyan-300">
                    📊 Subscription Price: ₹4,720 / Month / Lot
                  </span>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link to="/login" >
                    <Button className="rounded-2xl">Subscribe</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                ["Call Rangers", "Systematic upside capture with risk controls."],
                ["Put Rangers", "Disciplined downside strategy for bearish phases."],
              ].map(([title, desc]) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
                >
                  <div className="text-slate-100 font-semibold">{title}</div>
                  <div className="text-slate-300 text-sm mt-1">{desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <p className="text-xs text-slate-500 text-center mt-6">
        * All margins and subscription fees are indicative and may vary by broker and market conditions.
      </p>
    </section>
  );
}
