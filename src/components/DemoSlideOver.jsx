import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function DemoSlideOver({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[70] bg-slate-900/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Right panel */}
          <motion.aside
            className="fixed right-0 top-0 z-[80] h-full w-full sm:max-w-md bg-slate-950 border-l border-slate-800/70 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/70">
              <h3 className="text-lg font-semibold text-white">Book a Demo</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-slate-800/60 text-slate-300"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <p className="text-sm text-slate-400">
                Tell us a bit about you. We’ll schedule a 15–20 min walkthrough of C-Tech Algo.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thanks! We’ll contact you shortly.");
                  onClose?.();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Aman Sharma"
                    className="w-full rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Email</label>
                    <input
                      required
                      type="email"
                      placeholder="you@company.com"
                      className="w-full rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      className="w-full rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Preferred Time</label>
                    <input
                      type="time"
                      className="w-full rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1">Message (optional)</label>
                  <textarea
                    rows={4}
                    placeholder="Any specific strategies or markets you want to see?"
                    className="w-full rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-emerald-500 text-white px-4 py-2.5 font-medium hover:opacity-90"
                >
                  Request Demo
                </button>
              </form>

              <p className="text-[11px] text-slate-500">
                By submitting, you agree to our privacy policy and allow us to contact you regarding this request.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
