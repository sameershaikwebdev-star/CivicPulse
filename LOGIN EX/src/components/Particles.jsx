import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

function Particles() {
  const gradientRef = useRef(null);
  const blobs = useMemo(
    () => [
      { x: '12%', y: '28%', size: 260, color: 'rgba(59, 130, 246, 0.22)' },
      { x: '80%', y: '10%', size: 210, color: 'rgba(168, 85, 247, 0.18)' },
      { x: '55%', y: '70%', size: 180, color: 'rgba(99, 102, 241, 0.14)' },
    ],
    []
  );

  useEffect(() => {
    const update = () => {
      const blur = Math.round((window.scrollY / window.innerHeight) * 30);
      if (gradientRef.current) gradientRef.current.style.filter = `blur(${blur}px)`;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div ref={gradientRef} className="absolute inset-0 opacity-80" />
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: index * 0.14, ease: 'easeOut' }}
          className="absolute rounded-full blur-3xl"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: blob.color,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_24%),radial-gradient(circle_at_100px_100px,_rgba(99,102,241,0.08),_transparent_30%),linear-gradient(180deg,_rgba(2,6,23,0.75),_rgba(3,6,19,0.95))] opacity-80" />
    </div>
  );
}

export default Particles;
