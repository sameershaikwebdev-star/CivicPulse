import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Stats', href: '#stats' },
  { label: 'Timeline', href: '#timeline' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl bg-slate-950/70 shadow-xl shadow-slate-950/10' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-100/85">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-neon">
            CP
          </span>
          CivicPulse
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group text-sm text-slate-200 transition hover:text-white"
            >
              <span className="relative inline-flex items-center gap-2">
                {link.label}
                <span className="absolute bottom-[-0.25rem] left-0 h-[2px] w-full scale-x-0 bg-sky-400 transition-all duration-300 group-hover:scale-x-100" />
              </span>
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-600/60 bg-slate-900/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-100 transition hover:border-sky-400 hover:text-white"
          >
            Launch
            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-600/60 bg-slate-900/70 text-slate-100 transition hover:border-sky-400 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-t border-slate-800/60 bg-slate-950/95 text-slate-100 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-700/70 bg-slate-900/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-sky-400"
              >
                Launch CivicPulse
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
