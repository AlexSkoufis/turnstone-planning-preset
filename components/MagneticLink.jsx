"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Anchor that drifts slightly toward the pointer on fine-pointer devices.
 * Purely decorative motion: no effect on touch or with reduced motion.
 */
export default function MagneticLink({ strength = 0.28, children, ...props }) {
  const ref = useRef(null);

  const canMove = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMove = (event) => {
    if (!canMove()) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.5, ease: "power3.out" });
  };

  const handleLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
  };

  return (
    <a ref={ref} onPointerMove={handleMove} onPointerLeave={handleLeave} {...props}>
      {children}
    </a>
  );
}
