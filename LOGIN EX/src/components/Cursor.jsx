import { useEffect, useRef, useState } from 'react';
import useMouse from '../hooks/useMouse';

const interactiveSelectors = 'a, button, input, textarea, select, label';

function Cursor() {
  const { x, y } = useMouse();
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(interactiveSelectors));
    const enter = () => setHovered(true);
    const leave = () => setHovered(false);

    nodes.forEach((node) => {
      node.addEventListener('mouseenter', enter);
      node.addEventListener('mouseleave', leave);
    });

    return () => {
      nodes.forEach((node) => {
        node.removeEventListener('mouseenter', enter);
        node.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  useEffect(() => {
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${x}px, ${y}px) scale(${hovered ? 1.45 : 1})`;
    }
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [x, y, hovered]);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

export default Cursor;
