import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  const mouse = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const pos = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const enter = () => setHover(true);
    const leave = () => setHover(false);

    window.addEventListener("mousemove", move);

    document
      .querySelectorAll("a,button,.card")
      .forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (dot.current) {
        dot.current.style.transform = `translate(${mouse.current.x}px,${mouse.current.y}px) translate(-50%,-50%)`;
      }

      if (ring.current) {
        ring.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%) scale(${
          hover ? 1.8 : 1
        })`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [hover]);

  return (
    <>
      {/* Small Dot */}
      <div
  ref={dot}
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "20px",
    height: "20px",
    background: "red",
    borderRadius: "50%",
    zIndex: 2147483647,
    pointerEvents: "none",
  }}
/>

      {/* Ring */}
      <div
        ref={ring}
        style={{
          position: "fixed",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "2px solid rgba(96,165,250,.8)",
          background: "rgba(59,130,246,.08)",
          backdropFilter: "blur(4px)",
          pointerEvents: "none",
          transition: "transform .18s ease",
          boxShadow: "0 0 30px rgba(59,130,246,.7)",
          zIndex: 99998,
        }}
      />
    </>
  );
}