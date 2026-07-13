import { useEffect, useState } from 'react';

export default function useScroll() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setPosition(window.scrollY);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return position;
}
