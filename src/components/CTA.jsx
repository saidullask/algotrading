import React from "react";
import { Button } from "./CradComponent";
import DemoSlideOver from "./DemoSlideOver";
import { Link } from "react-router-dom";
export default function CTA() {
  const [open, setOpen] = React.useState(false);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-cyan-600/10 to-indigo-600/10" />
      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16 rounded-3xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Launch your next trade with confidence
            </h3>
            <p className="text-slate-300 mt-2">
              Join thousands of active traders using C-Tech tools every day.
            </p>
          </div>
          <div className="flex gap-4">
             <Link to="/singup">
              <Button className="rounded-2xl px-6 py-3 text-base">Create Account</Button>
            </Link>
            

            {/* This opens the right-side popup */}
            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              className="rounded-2xl border-slate-700 text-slate-300 hover:text-white px-6 py-3 text-base"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Slide-over lives here so it overlays the page */}
      <DemoSlideOver open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
