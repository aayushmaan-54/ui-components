"use client";
import { useEffect, useRef } from "react";
import "./style.css";


export default function RadialBinaryBg() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      containerRef.current.style.mask = `radial-gradient(circle at ${x}% ${y}%, black 100px, transparent 200px)`;
      containerRef.current.style.webkitMask = `radial-gradient(circle at ${x}% ${y}%, black 100px, transparent 200px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="bg-container">
        <div
          ref={containerRef}
          className="bg-inner radial-bg"
        >
        </div>
      </div>
    </>
  );
}
