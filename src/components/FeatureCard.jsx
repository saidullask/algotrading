import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./CradComponent";

function Feature({ title, desc, icon }) {
  return (
    <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-slate-100">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-slate-400">{desc}</CardContent>
    </Card>
  );
}

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20" id="features">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Powerful, by Design</h2>
        <p className="text-slate-400 mt-3">Built for speed, reliability, and clarity in volatile markets.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Feature title="Auto-Trading Engine" desc="Execute entries, exits, and risk rules automatically with millisecond latency." icon={<span className="inline-block w-9 h-9 rounded-2xl bg-emerald-500/20" />} />
        <Feature title="3D Market Visuals" desc="See momentum, ranges, and liquidity zones in an interactive 3D chart." icon={<span className="inline-block w-9 h-9 rounded-2xl bg-cyan-500/20" />} />
        <Feature title="Bank-Grade Security" desc="OAuth 2.0, hardware keys, and encrypted credentials by default." icon={<span className="inline-block w-9 h-9 rounded-2xl bg-indigo-500/20" />} />
      </div>
    </section>
  );
}
