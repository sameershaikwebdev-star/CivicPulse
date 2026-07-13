import { useEffect, useState } from 'react';

export default function useMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0, hovered: false });

  useEffect(() => {
    const handleMove = (event) => {
      setMouse({ x: event.clientX, y: event.clientY, hovered: mouse.hovered });
    };

    const handleEnter = () => setMouse((prev) => ({ ...prev, hovered: true }));
    const handleLeave = () => setMouse((prev) => ({ ...prev, hovered: false }));

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseenter', handleEnter);
    window.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouse.hovered]);

  return mouse;
}
