import React from "react";
import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <div className="sticky top-0 z-30 h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <Search className="h-4 w-4" />
          <input
            className="bg-transparent outline-none text-sm placeholder:text-slate-500"
            placeholder="Search symbols, strategies…"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-2 hover:bg-slate-900">
            <Bell className="h-4 w-4 text-slate-300" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30" />
            <span className="hidden sm:block text-sm text-slate-300">Trader</span>
          </div>
        </div>
      </div>
    </div>
  );
}
