import { motion } from 'framer-motion';
import { ShieldCheck, Bell, BarChart3, MapPin } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const features = [
  {
    title: 'AI Reports',
    description: 'Automated incident analysis and citizen sentiment summaries powered by predictive AI.',
    icon: ShieldCheck,
  },
  {
    title: 'Complaint Tracking',
    description: 'Unified case management with intelligent categorization and citizen follow-up.',
    icon: MapPin,
  },
  {
    title: 'Emergency Alerts',
    description: 'Instant notifications with geo-targeted response coordination and escalation workflows.',
    icon: Bell,
  },
  {
    title: 'Analytics',
    description: 'City-level dashboards with KPI trends, heatmaps, and operational benchmarks.',
    icon: BarChart3,
  },
];

function Features() {
  return (
    <section id="features" className="space-y-10 py-12">
      <div className="max-w-3xl space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-300/90">Platform capabilities</p>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Comprehensive civic intelligence designed for modern governance.
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Tilt key={feature.title} glareEnable={true} glareMaxOpacity={0.12} perspective={1200} tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={450}>
              <motion.article
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.65, ease: 'easeOut' }}
                className="glow-border group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.2)]"
              >
                <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-br from-sky-500/10 via-violet-500/5 to-transparent opacity-60" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900/80 text-sky-300 shadow-[0_0_30px_rgba(59,130,246,0.18)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
                  </div>
                </div>
              </motion.article>
            </Tilt>
          );
        })}
      </div>
    </section>
  );
}

export default Features;
