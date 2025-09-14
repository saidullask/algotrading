import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/prime_logo_ctechalgo.png";
import { Button } from "../components/CradComponent";
import TypingText from "../components/TypingText";
import WaveAnimation from "../components/WaveAnimation";
import YouTubeCard from "../components/YouTubeCard";
import Features from "../components/FeatureCard";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Performance from "../components/Performance";
import Footer from "../components/Footer";
import AboutPerformanceSection from "../components/LiveProfitShowcase";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 md:gap-3 min-w-0">
            <img
              src={logo}
              alt="CTechAlgo"
              className="h-14 md:h-16 w-auto object-contain shrink-0 select-none
              filter brightness-[1.05] contrast-[1.05] saturate-[1.05]
              [filter:drop-shadow(0_1px_8px_rgba(56,189,248,0.22))]"
              draggable="false"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Products</a>
            <a href="#performance" className="hover:text-white">Performance</a>
            <a href="/documentation" className="hover:text-white">Docs</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                Sign in
              </Button>
            </Link>
            <a
              href="https://wa.me/918334933238?text=Hello%20C-Tech%20Algo%20Team"
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

      <main>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <div className="flex flex-col justify-center">
                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
                >
                  Trade Smarter with{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                    C-Tech Algo
                  </span>
                </motion.h1>

                <TypingText
                  text="Long-Term Consistency, Zero Stress, Beyond Guesswork."
                  className="mt-4 text-slate-300 text-lg leading-relaxed"
                />

                <p className="mt-1 text-slate-400 text-sm leading-relaxed max-w-lg">
                  At CTech Algo, we transform your trading journey by offering ready-to-use,
                  professionally developed algorithmic strategies built for consistent performance.
                  You don’t need to worry about developing or managing your own strategies — simply
                  subscribe to our tested, data-driven solutions and let them work for you. Whether
                  you are an experienced trader or an emerging market enthusiast, our systematic
                  strategies help you trade with confidence, removing stress and guesswork from the
                  process.
                </p>

                <div className="-mt-1">
                  <WaveAnimation />
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link to="/documentation">
                    <Button className="rounded-2xl px-6 py-3 text-base bg-emerald-500 text-white hover:bg-emerald-600 transition">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/strategy">
                    <Button
                      variant="outline"
                      className="rounded-2xl border-slate-700 text-slate-300 hover:text-white px-6 py-3 text-base"
                    >
                      View Strategies
                    </Button>
                  </Link>
                </div>

                <div className="mt-4 text-sm text-slate-400">
                  SEBI compliant • Bank-grade security • 24×7 Support
                </div>
              </div>

              <div className="flex">
                <YouTubeCard
                  className="h-full"
                  videoId="kUMe1FH4CHE"
                  title="C-Tech Algo — quick tour"
                />
              </div>
            </div>
          </div>
        </div>

        <AboutPerformanceSection />
        <Performance />
        <Pricing />
        <Features />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
