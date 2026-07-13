import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
  { value: 15000, label: 'Complaints' },
  { value: 98, label: 'Resolved' , suffix: '%'},
  { value: 500, label: 'Cities' },
  { value: 24, label: 'Monitoring', suffix: '/7' },
];

function Stats() {
  return (
    <section id="stats" className="space-y-8 py-12">
      <div className="max-w-3xl space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-300/90">Performance snapshot</p>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Measurable civic impact across cities and operations.
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.12, duration: 0.7, ease: 'easeOut' }}
            key={stat.label}
            className="glow-border rounded-[2rem] border border-white/10 bg-slate-950/75 px-8 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.16)]"
          >
            <p className="text-5xl font-semibold text-white">
              <CountUp end={stat.value} duration={2.5} separator="," />
              <span className="text-sky-300">{stat.suffix || ''}</span>
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.28em] text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
