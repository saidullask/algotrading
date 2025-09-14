import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CardBackground3D } from "../../components/loginComponent";
import { Button, Card, CardContent } from "../../components/CradComponent";
import logo from "../../assets/prime_logo_ctechalgo.png";
import Footer from "../../components/Footer";
import { Authservices } from "../../services/AuthServices";
import Config from "../../config";

export default function Login() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const currentUser = Authservices.currentUserValue ?? null;
    if (currentUser) navigate(Config.dahboardUrl);
  }, [navigate]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    try {
      setSubmitting(true);
      const res = await Authservices.loginWithPassword(form.email, form.password);
      if (res?.isSuccess) {
        navigate("/dashboard/index");
      } else {
        setError(res?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    /* Fluid type so UI looks right from phones to 4K */
    <div className="min-h-[100svh] bg-slate-950 text-slate-100 [font-size:clamp(14px,0.95vw,18px)]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-800/60 pt-[env(safe-area-inset-top)]">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 md:gap-3 min-w-0">
            <img
              src={logo}
              alt="C-Tech Algo"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain shrink-0 select-none
                         filter brightness-[1.05] contrast-[1.05] saturate-[1.05]
                         [filter:drop-shadow(0_1px_8px_rgba(56,189,248,0.22))]"
              draggable="false"
            />
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919876543210?text=Hello%20C-Tech%20Algo%20Team"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="rounded-2xl bg-emerald-500 text-white hover:bg-emerald-600">
                Connect With Us
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <section className="relative mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 pb-[env(safe-area-inset-bottom)]">
          {/* Center the card and add responsive vertical padding */}
          <div className="min-h-[calc(100svh-4rem)] grid place-items-center py-8 sm:py-12 lg:py-16">
            <Card
              className="
                w-full
                max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl
                border-slate-800/70 rounded-2xl overflow-hidden relative bg-slate-900/60
                shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]
              "
            >
              {/* Ambient 3D background */}
              <div className="absolute inset-0 -z-0 opacity-60">
                <CardBackground3D />
              </div>
              <div className="absolute inset-0 pointer-events-none -z-[1] bg-gradient-to-br from-slate-950/40 via-slate-900/30 to-slate-950/40" />

              <CardContent className="relative p-5 sm:p-6 md:p-8">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold"
                >
                  Welcome back
                </motion.h1>
                <p className="text-slate-300/90 mt-1">
                  Sign in to continue to your trading dashboard.
                </p>

                <form onSubmit={onSubmit} className="mt-6 space-y-5">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      autoComplete="email"
                      placeholder="you@company.com"
                      className="
                        w-full rounded-xl bg-slate-800/80 text-slate-200
                        border border-slate-700 placeholder-slate-400
                        px-4 py-3 outline-none transition
                        focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500
                      "
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-sm text-slate-300 mb-1.5">Password</label>
                      <button
                        type="button"
                        onClick={() => setShowPw((s) => !s)}
                        className="text-xs text-slate-300 hover:text-white"
                      >
                        {showPw ? "Hide" : "Show"}
                      </button>
                    </div>
                    <input
                      type={showPw ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={onChange}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="
                        w-full rounded-xl bg-slate-950/60 text-slate-100
                        border border-slate-800 placeholder-slate-500
                        px-4 py-3 outline-none
                        focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500
                      "
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="inline-flex items-center gap-2 select-none">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={form.remember}
                        onChange={onChange}
                        className="accent-emerald-500 h-4 w-4 rounded"
                      />
                      <span className="text-slate-200">Remember me</span>
                    </label>
                    <Link to="/reset" className="text-cyan-400 hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  {error && (
                    <div className="rounded-lg border border-rose-700/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full rounded-2xl py-3 md:py-3.5 text-base"
                    disabled={submitting}
                  >
                    {submitting ? "Signing in..." : "Sign in"}
                  </Button>
                </form>

                <div className="mt-6 text-sm text-slate-300">
                  Don’t have an account?{" "}
                  <Link to="/singup" className="text-emerald-400 hover:underline">
                    Create one
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
