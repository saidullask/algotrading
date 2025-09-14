import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Subtle, smooth animated profit line
function ProfitLine({ color = "#34d399" }) {
  const lineRef = useRef();
  const N = 150;
  const span = 7;
  const stepX = span / (N - 1);

  const positions = React.useMemo(() => {
    const arr = new Float32Array(N * 3);
    let offset = Math.random() * Math.PI * 2;
    for (let i = 0; i < N; i++) {
      const x = i * stepX - span / 2;
      const y = Math.sin(i * 0.11 + offset) * 0.29 + Math.cos(i * 0.07 + offset) * 0.08;
      arr[i * 3 + 0] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = 0;
    }
    return arr;
  }, []);

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} linewidth={2} />
    </line>
  );
}

// Badge for about section
function TrustBadge({ label, accent }) {
  return (
    <div className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${accent} border-emerald-400 bg-emerald-500/10`}>
      {label}
    </div>
  );
}

// Main About Section
export default function AboutPerformanceSection({ aboutRef }) {
  return (
    <section
      ref={aboutRef}
      id="about"
      className="relative py-24 px-2 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex justify-center items-center"
    >
      <div className="max-w-5xl w-full mx-auto">

        {/* Header Title */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            About CTech Algo
          </h2>
          <div className="mt-4 flex flex-wrap gap-3 items-center justify-center">
            <TrustBadge label="SEBI Compliant" accent="text-emerald-300" />
            <TrustBadge label="Bank-Grade Security" accent="text-cyan-300" />
            <TrustBadge label="24×7 Support" accent="text-indigo-200" />
            <TrustBadge label="Auto-Trade Certified" accent="text-emerald-300" />
          </div>
        </div>

        <div className="relative rounded-3xl bg-slate-900/90 shadow-2xl overflow-hidden border border-slate-800">
          {/* 3D Chart Thin Banner (not overwhelming) */}
          <div className="absolute top-0 left-0 right-0 h-[60px] md:h-[80px] z-0 opacity-70">
            <Canvas camera={{ position: [0, 0, 6.5], fov: 35 }}>
              <ambientLight intensity={0.2} />
              <ProfitLine />
              <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 via-transparent to-slate-900/5"></div>
          </div>

          {/* Main Card Content */}
          <div className="relative z-10 p-6 md:p-14 flex flex-col md:flex-row gap-10 items-center md:items-stretch">
            {/* Left: Main trading claim and values */}
            <div className="flex-[2] flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Trade With Confidence Powered by Technology
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                <span className="font-bold text-emerald-400">CTech Algo</span> empowers traders and investors with robust, professionally engineered algorithmic strategies. Designed for long-term consistency and lower stress, our ready-to-use systems eliminate human bias and guesswork. Just subscribe and let proven, data-driven logic work for you—while you focus on your next move.
                <br /><br />
                Whether seasoned or new, benefit from strategic automation, live analytics, and uncompromising institutional-grade security and uptime. It’s trading, but smarter and safer.
              </p>
              <div className="flex flex-wrap gap-3 mt-auto">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-emerald-400 text-base">+58.2% winrate</span>
                  <span className="text-xs text-slate-400"> / tested live</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-rose-400 text-base">-7.9% drawdown</span>
                  <span className="text-xs text-slate-400">/ peak </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-cyan-300 text-base">11ms latency</span>
                  <span className="text-xs text-slate-400">/ execution</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-indigo-300 text-base">99.7% uptime</span>
                  <span className="text-xs text-slate-400">/ 1yr rolling</span>
                </div>
              </div>
            </div>
            {/* Right: Why Us */}
            <div className="w-full md:w-[340px] flex-shrink-0 flex flex-col justify-center">
              <div className="bg-gradient-to-b from-emerald-500/30 to-cyan-500/10 rounded-xl p-8 shadow-lg flex flex-col h-full justify-between">
                <h4 className="text-lg font-bold text-white mb-2">Why Choose Us?</h4>
                <ul className="list-none text-slate-200 text-base space-y-2 mb-4">
                  <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-emerald-400 rounded-full" /> Professional automation, zero bias</li>
                  <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-cyan-400 rounded-full" /> Real-time performance dashboards</li>
                  <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-emerald-300 rounded-full" /> Bank-level security and compliance</li>
                  <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-indigo-300 rounded-full" /> Support by real trading specialists</li>
                  <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-cyan-300 rounded-full" /> Adaptive, always-improving logic</li>
                </ul>
                <div className="text-sm text-slate-400">Ready to experience the next level in systematic trading?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// How to use:
// const aboutRef = useRef();
// <button onClick={() => aboutRef.current?.scrollIntoView({behavior: "smooth"})}>About</button>
// <AboutPerformanceSection aboutRef={aboutRef} />
