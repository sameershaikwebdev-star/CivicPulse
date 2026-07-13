import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github } from 'lucide-react';

function Footer() {
  return (
    <footer className="relative border-t border-slate-800/70 bg-slate-950/80 py-12 text-slate-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-sky-500/0 via-sky-500/30 to-violet-500/0" />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-300/90">Stay in sync</p>
          <h3 className="text-3xl font-semibold text-white sm:text-4xl">CivicPulse is building modern civic AI for tomorrow’s cities.</h3>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-4"
        >
          {[
            { icon: Twitter, label: 'Twitter', href: '#' },
            { icon: Linkedin, label: 'LinkedIn', href: '#' },
            { icon: Github, label: 'GitHub', href: '#' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-700/60 bg-slate-900/80 text-slate-100 transition hover:border-sky-400 hover:text-white"
              aria-label={item.label}
            >
              <item.icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-6 text-center text-sm text-slate-500 lg:px-8">
        <p>© 2026 CivicPulse. Built for civic operations, trust, and intelligent response.</p>
      </div>
    </footer>
  );
}

export default Footer;
