import React from "react";
import { Button, CardHeader, CardTitle, CardContent } from "./CradComponent";

export default function PlanCardBig({ plan, price, features = [], highlight }) {
  return (
    <div
      className={`mx-3 min-w-[300px] sm:min-w-[360px] md:min-w-[420px] rounded-3xl ${
        highlight
          ? "border-emerald-500/60 shadow-emerald-500/20 shadow-xl"
          : "border-slate-800"
      } border bg-slate-900/50`}
    >
      <CardHeader>
        <CardTitle className="text-white flex items-baseline justify-between">
          <span>{plan}</span>
          <span className="text-2xl md:text-4xl font-extrabold">
            ₹{price}
            <span className="text-sm md:text-lg text-slate-400 font-medium">/mo</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300">
              <span className="inline-block w-5 h-5 mt-0.5 bg-emerald-500/30 rounded-md" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full mt-6 rounded-2xl">Choose {plan}</Button>
      </CardContent>
    </div>
  );
}
