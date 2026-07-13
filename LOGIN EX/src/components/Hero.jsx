import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Tilt } from 'react-parallax-tilt';
import { ArrowRight, Sparkles } from 'lucide-react';
import EarthScene from './Earth';

function Hero() {
  const gradientRef = useRef(null);

  return (
    <section id="home" className="relative overflow-hidden rounded-[2rem] border border-slate-800/70 bg-slate-950/70 p-6 shadow-neon sm:p-10">
      <div className="pointer-events-none absolute -top-16 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-500/20 via-violet-500/10 to-transparent blur-3xl" />
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex items-center gap-3 rounded-full bg-slate-900/70 px-4 py-2 text-sm uppercase tracking-[0.3em] text-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.14)]"
          >
            <Sparkles className="h-4 w-4" />
            AI civic intelligence for safer cities
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              CivicPulse
              <span className="block mt-4 text-2xl font-medium text-slate-400 sm:text-3xl">
                Real-time alerts, AI insights, and civic trust for modern cities.
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="space-y-4"
          >
            <p className="max-w-xl text-base leading-8 text-slate-300">
              Monitor reports, route alerts, and deliver analytics across every neighborhood with a premium AI platform built for civic resilience.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="glow-button inline-flex items-center gap-3 rounded-2xl border border-slate-700/80 bg-slate-900/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-sky-400">
                Get started
              </button>
              <button className="glow-button inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500/70 to-violet-500/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_32px_rgba(59,130,246,0.28)] transition hover:scale-[1.02]">
                Request demo
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.85, ease: 'easeOut' }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {['AI Reports', 'Complaint Tracking', 'Emergency Alerts', 'Predictive Analytics'].map((item) => (
              <div key={item} className="glow-border rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.2)] backdrop-blur-2xl">
                <h3 className="text-sm uppercase tracking-[0.3em] text-sky-300/90">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Powered by smart detection, real-time correlation, and intuitive dashboards.
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/60 p-4 shadow-[0_0_80px_rgba(59,130,246,0.12)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_26%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.18),_transparent_28%)]" />
            <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-slate-950/90 to-transparent" />
            <Canvas
              camera={{ position: [0, 0, 3.8], fov: 40 }}
              style={{ height: '520px', width: '100%' }}
            >
              <EarthScene />
            </Canvas>
            <div className="absolute bottom-6 left-6 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-300 shadow-sm shadow-slate-950/40">
              <p className="text-sky-300">Live civic signals</p>
              <p className="mt-1 text-sm text-slate-400">Dynamic alerts, incident correlation, and predictive visibility.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
