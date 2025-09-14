import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
export  function FloatingPoints({ count = 220 }) {
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

export function TwistedRibbon() {
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

export  function CardBackground3D() {
    return (
        <Canvas
            camera={{ position: [0, 0, 4.2], fov: 50 }}
            className="absolute inset-0"
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[2, 2, 3]} intensity={1.1} color={"#22d3ee"} />
            <pointLight position={[-3, -1, -3]} intensity={0.8} color={"#10b981"} />
            <Suspense fallback={null}>
                <TwistedRibbon />
                <FloatingPoints />
                <OrbitControls enablePan={false} enableZoom={false} />
            </Suspense>
        </Canvas>
    );
}