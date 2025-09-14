// src/components/Performance.jsx
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

/* -------------------- helpers -------------------- */
const fmtINR = (n) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const chips = [
  { key: "7d", label: "Week", days: 7 },
  { key: "15d", label: "15 Days", days: 15 },
  { key: "1m", label: "Month", days: 30 },
  { key: "3m", label: "3 Months", days: 90 },
  { key: "1y", label: "Year", days: 365 },
  { key: "45d", label: "Last 45 Days", days: 45 },
];

const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6;
const isTradingDay = (d) => d.getDay() >= 1 && d.getDay() <= 5; // Mon..Fri

function startOfWeekMonday(d) {
  const dd = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = dd.getDay();
  const diff = day === 0 ? -6 : 1 - day; // move back to Monday
  dd.setDate(dd.getDate() + diff);
  dd.setHours(0, 0, 0, 0);
  return dd;
}

function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

/* -------------------- 3D background -------------------- */
function FloatingSpheres() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.15;
  });
  const spheres = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        key: i,
        pos: [
          Math.cos((i / 14) * Math.PI * 2) * (2.5 + Math.random() * 2.5),
          (Math.random() - 0.5) * 2.2,
          (Math.random() - 0.5) * 3,
        ],
        color: i % 2 === 0 ? "#10b981" : "#06b6d4",
        emissive: i % 2 === 0 ? "#064e3b" : "#0e7490",
      })),
    []
  );
  return (
    <group ref={ref}>
      {spheres.map((s) => (
        <mesh key={s.key} position={s.pos}>
          <sphereGeometry args={[0.24, 24, 24]} />
          <meshStandardMaterial
            color={s.color}
            emissive={s.emissive}
            emissiveIntensity={0.3}
            metalness={0.4}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------- demo data -------------------- */
function buildSeries(totalDays) {
  const arr = [];
  const now = new Date();
  for (let i = 0; i < totalDays; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, 0);

    // Generate only for weekdays; weekends are placeholders
    let pl = 0;
    let charges = 0;
    if (isTradingDay(date)) {
      const base = (Math.random() - 0.45) * 1500;
      const vol = Math.random() * 0.6 + 0.7;
      pl = Math.round(base * vol * 100) / 100;
      charges = Math.round((50 + Math.random() * 120) * 100) / 100;
    }
    arr.push({ date, pl, charges });
  }
  return arr.reverse();
}

/* -------------------- CSV Download -------------------- */
function downloadCSV(rows) {
  const header = "Date,Realized P/L,Charges,Net\n";
  const body = rows
    .map((r) => {
      const d = r.date.toISOString().slice(0, 10);
      return `${d},${r.pl},${r.charges},${(r.pl - r.charges).toFixed(2)}`;
    })
    .join("\n");
  const blob = new Blob([header + body], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "performance_statement.csv";
  a.click();
  URL.revokeObjectURL(url);
}

/* -------------------- tooltip -------------------- */
function useTooltip() {
  const [tip, setTip] = useState({
    visible: false,
    x: 0,
    y: 0,
    positive: true,
    text: "",
    date: "",
  });

  const show = (e, { positive, text, date }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 6,
      positive,
      text,
      date,
    });
  };
  const move = (e) => {
    setTip((t) => ({ ...t, x: e.clientX, y: e.clientY - 10 }));
  };
  const hide = () => setTip((t) => ({ ...t, visible: false }));

  const node = tip.visible ? (
    <div
      className={`pointer-events-none fixed z-[60] -translate-x-1/2 -translate-y-full rounded-md border px-2.5 py-1 text-xs shadow-xl
        ${
          tip.positive
            ? "bg-emerald-900/80 border-emerald-500/40 text-emerald-100"
            : "bg-rose-900/80 border-rose-500/40 text-rose-100"
        }`}
      style={{ left: tip.x, top: tip.y }}
    >
      <div className="font-medium">{tip.text}</div>
      <div className="text-[10px] opacity-80">{tip.date}</div>
    </div>
  ) : null;

  return { tipNode: node, show, move, hide };
}

/* -------------------- section -------------------- */
export default function Performance() {
  const [series, setSeries] = useState(() => buildSeries(365));
  const [chip, setChip] = useState("45d");
  const { tipNode, show, move, hide } = useTooltip();

  // live drift
  useEffect(() => {
    const id = setInterval(() => {
      setSeries((prev) =>
        prev.map((r) => {
          if (!isTradingDay(r.date)) return r;
          const drift = (Math.random() - 0.5) * 300;
          const pl = Math.round((r.pl + drift) * 100) / 100;
          const chg = Math.max(
            10,
            Math.round((r.charges + (Math.random() - 0.5) * 10) * 100) / 100
          );
          return { ...r, pl, charges: chg };
        })
      );
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // filter range
  const days = chips.find((c) => c.key === chip)?.days ?? 45;
  const filtered = series.slice(-days);

  // compute KPIs from trading days only
  const realized = filtered
    .filter((r) => isTradingDay(r.date))
    .reduce((a, b) => a + b.pl, 0);
  const charges = filtered
    .filter((r) => isTradingDay(r.date))
    .reduce((a, b) => a + b.charges, 0);
  const net = realized - charges;

  // group by week (Mon..Fri visible dots; grey placeholders fill grid)
  const weeks = useMemo(() => {
    if (filtered.length === 0) return [];

    // find first monday <= first date
    const first = startOfWeekMonday(filtered[0].date);
    // find last sunday >= last date (we’ll still show only Mon..Fri as active)
    const last = addDays(startOfWeekMonday(filtered[filtered.length - 1].date), 6);

    const daysAll = [];
    for (let d = new Date(first); d <= last; d.setDate(d.getDate() + 1)) {
      const dd = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const found = filtered.find((x) => x.date.toDateString() === dd.toDateString());
      if (found) daysAll.push(found);
      else daysAll.push({ date: dd, pl: 0, charges: 0 }); // pad
    }

    // slice into weeks (7)
    const out = [];
    for (let i = 0; i < daysAll.length; i += 7) {
      const bucket = daysAll.slice(i, i + 7);
      out.push(bucket);
    }
    return out;
  }, [filtered]);

  return (
    <section id="performance" className="relative overflow-hidden py-16 md:py-20">
      {/* 3D background */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
          <ambientLight intensity={0.45} />
          <pointLight position={[4, 4, 6]} intensity={1.1} color={"#22d3ee"} />
          <pointLight position={[-4, -2, -6]} intensity={0.9} color={"#10b981"} />
          <Suspense fallback={null}>
            <FloatingSpheres />
            <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>
      <div className="absolute inset-0 -z-[9] bg-gradient-to-b from-slate-950/85 via-slate-900/70 to-slate-950/90" />

      {/* Tooltip portal */}
      {tipNode}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* ====== Added section heading ====== */}
        <div className="mb-5">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Performance</h2>
        </div>

        {/* top controls */}
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 overflow-hidden">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-4 sm:px-6 py-4">
            <div className="text-white font-medium">Profit and Loss Details</div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs self-center text-slate-400 mr-1">Date Range:</span>
              {chips.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setChip(c.key)}
                  className={`rounded-lg px-3 py-1.5 text-sm border transition ${
                    chip === c.key
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                      : "border-slate-700 bg-slate-800/60 text-slate-300 hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => downloadCSV(filtered)}
                className="rounded-2xl px-3 py-2 text-sm font-medium border border-cyan-500 bg-cyan-500/10 text-cyan-300 hover:text-white"
              >
                DOWNLOAD P/L STATEMENT
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="p-4 sm:p-6">
              <div className="text-slate-400 text-xs mb-1">Realized P/L</div>
              <div
                className={`text-lg sm:text-xl font-semibold ${
                  realized >= 0 ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {realized >= 0 ? "+" : ""}₹{fmtINR(realized)}
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="text-slate-400 text-xs mb-1">Total Charges</div>
              <div className="text-lg sm:text-xl font-semibold text-slate-200">
                ₹{fmtINR(charges)}
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="text-slate-400 text-xs mb-1">Net Realized P/L</div>
              <div
                className={`text-lg sm:text-xl font-semibold ${
                  net >= 0 ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {net >= 0 ? "+" : ""}₹{fmtINR(net)}
              </div>
            </div>
          </div>

          {/* range label */}
          <div className="px-4 sm:px-6 pt-4 bg-slate-950/40">
            <div className="w-full flex justify-center">
              <div className="text-[11px] sm:text-xs text-slate-300 bg-slate-800/70 border border-slate-700 rounded-full px-2 py-0.5">
                {filtered.length > 0 &&
                  `${filtered[0].date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })} - ${filtered[filtered.length - 1].date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}`}
              </div>
            </div>
          </div>

          {/* weekly heatmap (Mon..Fri active) */}
          <div className="p-4 sm:p-6 bg-slate-950/40">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {weeks.map((wk, i) => {
                const mon = wk[0];
                const weekPnL = wk
                  .filter((d) => isTradingDay(d.date))
                  .reduce((a, b) => a + (b.pl - b.charges), 0);

                const headLabel =
                  mon?.date &&
                  mon.date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  });

                const daysMonToFri = [0, 1, 2, 3, 4].map((off) => wk[off]);

                return (
                  <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[11px] text-slate-400">{headLabel}</div>
                      <div
                        className={`text-[11px] font-medium ${
                          weekPnL >= 0 ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        ₹{fmtINR(weekPnL)}
                      </div>
                    </div>

                    {/* 5 trading-day row + 3 filler rows to match card height */}
                    <div className="grid grid-cols-5 gap-2">
                      {daysMonToFri.map((d, j) => {
                        const net = d ? d.pl - d.charges : 0;
                        const active = d && isTradingDay(d.date);
                        const positive = net >= 0;
                        const dateStr = d?.date.toLocaleDateString("en-GB", {
                          weekday: "short",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        });

                        return (
                          <div
                            key={j}
                            onMouseEnter={(e) =>
                              active &&
                              show(e, {
                                positive,
                                text: `${positive ? "+" : "-"}₹${fmtINR(Math.abs(net))}`,
                                date: dateStr,
                              })
                            }
                            onMouseMove={active ? move : undefined}
                            onMouseLeave={hide}
                            className={`h-5 rounded-full ${
                              active
                                ? positive
                                  ? "bg-emerald-500/80"
                                  : "bg-rose-500/80"
                                : "bg-slate-700/30"
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* grey rows for visual depth */}
                    <div className="mt-2 grid grid-cols-5 gap-2">
                      {Array.from({ length: 10 }).map((_, k) => (
                        <div key={k} className="h-5 rounded-full bg-slate-800/40" />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* legend */}
            <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500/80" />
              <span>Gain</span>
              <span className="inline-block h-2 w-2 rounded-full bg-rose-500/80 ml-3" />
              <span>Loss</span>
              <span className="ml-auto text-[11px] text-slate-500">
                Hover a dot to see day-wise net (Realized P/L − Charges). Weekends are hidden.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
