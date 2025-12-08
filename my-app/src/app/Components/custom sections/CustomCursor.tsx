"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const tailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const tail = tailRef.current!;

    // ================== Cursor Styles ==================
    Object.assign(dot.style, {
      position: "fixed",
      width: "26px",        // ⬆️ أكبر من قبل
      height: "26px",
      borderRadius: "50%",
      background: "#FFD54A", // ⬅️ اللون الأصفر
      pointerEvents: "none",
      zIndex: "99999",
      willChange: "transform",
      mixBlendMode: "difference",
      boxShadow: "0 0 25px rgba(255,213,74,0.95)", // ⬅️ glow أصفر
    });

    Object.assign(ring.style, {
      position: "fixed",
      width: "85px",        // ⬆️ أكبر
      height: "85px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "99998",
      border: "2px solid rgba(255,213,74,0.7)", // ⬅️ أصفر
      willChange: "transform",
      mixBlendMode: "difference",
    });

    // Tail effect
    Object.assign(tail.style, {
      position: "fixed",
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      background: "rgba(255,213,74,0.20)", // ⬅️ أصفر فاتح
      pointerEvents: "none",
      zIndex: "99990",
      willChange: "transform, opacity",
      mixBlendMode: "difference",
      filter: "blur(14px)",
      opacity: "0.7",
    });

    // ================== Smooth Follows ==================
    const dotX = gsap.quickTo(dot, "x", { duration: 0.15 });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15 });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.28 });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.28 });

    const tailX = gsap.quickTo(tail, "x", { duration: 0.35 });
    const tailY = gsap.quickTo(tail, "y", { duration: 0.35 });

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      dotX(x - 13); // centered
      dotY(y - 13);

      ringX(x - 50); // ring خلف الدوت (مش centered)
      ringY(y - 50);

      tailX(x - 22);
      tailY(y - 22);
    };

    window.addEventListener("mousemove", onMove as EventListener);

    // ================== Hover Interactions ==================
    const interactives = document.querySelectorAll(
      "a, button, [role='button'], .service-card, .project-card, [data-hover]"
    );

    interactives.forEach((el) => {
      el.addEventListener(
        "pointerenter",
        (() => {
          gsap.to(ring, { width: 110, height: 110, duration: 0.25 });
          gsap.to(dot, { scale: 1.35, duration: 0.18 });
          gsap.to(tail, { opacity: 1, scale: 1.4, duration: 0.3 });
        }) as EventListener
      );

      el.addEventListener(
        "pointerleave",
        (() => {
          gsap.to(ring, { width: 85, height: 85, duration: 0.25 });
          gsap.to(dot, { scale: 1, duration: 0.18 });
          gsap.to(tail, { opacity: 0.7, scale: 1, duration: 0.3 });
        }) as EventListener
      );
    });

    return () => {
      window.removeEventListener("mousemove", onMove as EventListener);
    };
  }, []);

  return (
    <>
      <div ref={tailRef} />
      <div ref={ringRef} />
      <div ref={dotRef} />
    </>
  );
}
