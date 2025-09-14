import { Link } from "react-router-dom";
import { Facebook, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300">
      <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-b from-emerald-500/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h4 className="text-white font-semibold mb-4 tracking-tight">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refundpolicy"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/subscriptioncancellationpolicy"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Subscription & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/termcondition"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Term & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 md:flex md:flex-col md:items-center">
            <h4 className="text-white font-semibold mb-4 tracking-tight">Follow Us</h4>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/40 hover:border-emerald-500/60 hover:bg-emerald-500/10 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/40 hover:border-emerald-500/60 hover:bg-emerald-500/10 transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/40 hover:border-emerald-500/60 hover:bg-emerald-500/10 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-4 md:justify-self-end md:text-right">
            <h4 className="text-white font-semibold mb-4 tracking-tight">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:support@ctechalgo.in"
                  className="hover:text-emerald-400 transition-colors"
                >
                  support@ctechalgo.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+911234567890"
                  className="hover:text-emerald-400 transition-colors"
                >
                  +91 12345 67890
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/80" />

      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} C-Tech Algo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
