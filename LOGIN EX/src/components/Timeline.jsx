import { motion } from 'framer-motion';

const timeline = [
  { title: 'Report', details: 'Citizens submit incidents through mobile or web channels.' },
  { title: 'AI Analysis', details: 'AI classifies risk, urgency, and geographical impact.' },
  { title: 'Government', details: 'Officials receive alerts and streamline response workflows.' },
  { title: 'Resolved', details: 'Outcomes are tracked and performance is measured continuously.' },
];

function Timeline() {
  return (
    <section id="timeline" className="space-y-10 py-12">
      <div className="max-w-3xl space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-300/90">Vision path</p>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          The civic workflow from alert to resolution.
        </h2>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.2)]">
        <div className="absolute left-10 top-8 h-[calc(100%-4rem)] w-px bg-gradient-to-b from-sky-400/80 to-violet-500/20" />
        <div className="grid gap-8 pl-16">
          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.14, duration: 0.7, ease: 'easeOut' }}
              className="relative"
            >
              <div className="absolute left-[-1.375rem] top-2 h-5 w-5 rounded-full border border-slate-200/80 bg-slate-950/95 shadow-[0_0_20px_rgba(59,130,246,0.16)]" />
              <span className="text-sm uppercase tracking-[0.35em] text-sky-300/90">Step {index + 1}</span>
              <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{item.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
