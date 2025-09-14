import React, { useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/** Single candle (body + wick) */
function Candle({ x, open, close, high, low }) {
  const bodyH = Math.max(0.01, Math.abs(close - open));
  const center = (open + close) / 2;
  const wickH = Math.max(0.01, high - low);
  const bull = close >= open;

  return (
    <group position={[x, 0, 0]}>
      {/* wick */}
      <mesh position={[0, low + wickH / 2, 0]}>
        <boxGeometry args={[0.03, wickH, 0.03]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* body */}
      <mesh position={[0, center, 0]}>
        <boxGeometry args={[0.25, bodyH, 0.25]} />
        <meshStandardMaterial
          color={bull ? "#10b981" : "#ef4444"}
          roughness={0.35}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

/** Full 3D chart with gentle motion */
function Chart() {
  const candles = useMemo(() => {
    const arr = [];
    let p = 2.2;
    for (let i = 0; i < 60; i++) {
      const v = 0.25 + Math.random() * 0.6;
      const dir = Math.random() > 0.5 ? 1 : -1;
      const open = p;
      const change = dir * v * Math.random();
      const close = Math.max(0.35, open + change);
      const high = Math.max(open, close) + Math.random() * 0.3;
      const low = Math.min(open, close) - Math.random() * 0.3;
      p = close;
      arr.push({ open, close, high, low });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.scene.rotation.y = Math.sin(t * 0.15) * 0.15;
  });

  return (
    <group position={[0, -1.4, 0]}>
      {/* glass plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 7]} />
        <meshStandardMaterial color="#0b1220" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* grid lines */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.7 - 0.2, -0.15]}>
          <boxGeometry args={[18, 0.005, 0.01]} />
          <meshBasicMaterial color="#1f2a44" />
        </mesh>
      ))}

      {candles.map((c, i) => (
        <Candle key={i} x={i * 0.3 - 8.7} {...c} />
      ))}

      {/* lights */}
      <pointLight position={[0, 4, 3]} intensity={1.1} color="#38bdf8" />
      <pointLight position={[0, 3, -3]} intensity={0.8} color="#22c55e" />
      <ambientLight intensity={0.35} />
    </group>
  );
}

export default function Trading3D() {
  return (
    <div className="h-[420px] w-full rounded-2xl border border-slate-800/70 bg-slate-900/40 p-2 shadow-2xl">
      <Canvas camera={{ position: [0, 2.2, 7], fov: 42 }} shadows>
        <Suspense fallback={null}>
          <Chart />
          <OrbitControls enablePan={false} minDistance={5} maxDistance={10} />
        </Suspense>
      </Canvas>
    </div>
  );
}
