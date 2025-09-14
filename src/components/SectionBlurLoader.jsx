
import React, { useId } from "react";

export default function SectionBlurLoader({
  loading = false,
  text = "Loading…",
  children,
  accent = "emerald",
  dimOpacity = 0.45,
  blurClass = "blur-[1.5px] brightness-90",
  showText = true,
  size = 64,
  className = "",
}) {
  const tones = {
    emerald: { stroke: "#34d399", g1: "#34d399", g2: "#10b981" },
    cyan: { stroke: "#22d3ee", g1: "#22d3ee", g2: "#06b6d4" },
    rose: { stroke: "#fb7185", g1: "#fb7185", g2: "#f43f5e" },
    amber: { stroke: "#f59e0b", g1: "#f59e0b", g2: "#d97706" },
  };
  const c = tones[accent] ?? tones.emerald;

  return (
    <div className={`relative ${className}`} aria-busy={loading} aria-live="polite">
      <div className={loading ? `pointer-events-none select-none ${blurClass}` : ""}>
        {children}
      </div>

      {loading && (
        <div
          className="absolute inset-0 z-30 grid place-items-center cursor-wait"
          style={{ background: `rgba(2, 6, 23, ${dimOpacity})` }} 
        >
          <div className="flex flex-col items-center gap-3">
            <CandlesLoader size={size} stroke={c.stroke} g1={c.g1} g2={c.g2} />
            {showText && (
              <div className="text-xs tracking-wide text-slate-300">
                {text}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


function CandlesLoader({ size = 64, stroke = "#34d399", g1 = "#34d399", g2 = "#10b981" }) {
  const gradId = useId(); 

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="status"
      aria-label="Loading"
      className="drop-shadow-[0_0_18px_rgba(52,211,153,0.25)]"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={g1} />
          <stop offset="100%" stopColor={g2} />
        </linearGradient>
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            #candle-a, #candle-b, #candle-c, #wick-a, #wick-b, #wick-c { animation: none !important; }
          }
        `}</style>
      </defs>

      <line x1="6" y1="54.5" x2="58" y2="54.5" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" />

      <Wick id="wick-a" x={18} y1={20} y2={52} stroke={stroke}>
        <animate attributeName="y1" values="24;18;24" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="y2" values="50;52;50" dur="1.2s" repeatCount="indefinite" />
      </Wick>
      <CandleBody id="candle-a" x={14} baseY={52} width={8} height={20} grad={`url(#${gradId})`}>
        <animate attributeName="y" values="36;32;36" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="height" values="16;20;16" dur="1.2s" repeatCount="indefinite" />
      </CandleBody>

      <Wick id="wick-b" x={32} y1={14} y2={52} stroke={stroke}>
        <animate attributeName="y1" values="14;20;14" dur="1.05s" begin="0.15s" repeatCount="indefinite" />
        <animate attributeName="y2" values="52;50;52" dur="1.05s" begin="0.15s" repeatCount="indefinite" />
      </Wick>
      <CandleBody id="candle-b" x={28} baseY={52} width={8} height={26} grad={`url(#${gradId})`}>
        <animate attributeName="y" values="26;30;26" dur="1.05s" begin="0.15s" repeatCount="indefinite" />
        <animate attributeName="height" values="26;22;26" dur="1.05s" begin="0.15s" repeatCount="indefinite" />
      </CandleBody>

      <Wick id="wick-c" x={46} y1={26} y2={52} stroke={stroke}>
        <animate attributeName="y1" values="28;24;28" dur="1.35s" begin="0.25s" repeatCount="indefinite" />
        <animate attributeName="y2" values="52;50;52" dur="1.35s" begin="0.25s" repeatCount="indefinite" />
      </Wick>
      <CandleBody id="candle-c" x={42} baseY={52} width={8} height={14} grad={`url(#${gradId})`}>
        <animate attributeName="y" values="38;36;38" dur="1.35s" begin="0.25s" repeatCount="indefinite" />
        <animate attributeName="height" values="14;16;14" dur="1.35s" begin="0.25s" repeatCount="indefinite" />
      </CandleBody>
    </svg>
  );
}

function Wick({ id, x, y1, y2, stroke, children }) {
  return (
    <line
      id={id}
      x1={x}
      x2={x}
      y1={y1}
      y2={y2}
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.1))" }}
    >
      {children}
    </line>
  );
}

function CandleBody({ id, x, baseY, width, height, grad, children }) {
  return (
    <rect
      id={id}
      x={x}
      y={baseY - height}
      width={width}
      height={height}
      rx="2"
      fill={grad}
      stroke="rgba(0,0,0,0.2)"
      strokeWidth="0.5"
      style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.35))" }}
    >
      {children}
    </rect>
  );
}
