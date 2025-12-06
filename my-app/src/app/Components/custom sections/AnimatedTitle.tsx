"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  title: string;
  className?: string;
}

export default function AnimatedTitle({ title, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const splitRef = useRef<HTMLDivElement | null>(null);

  const splitText = (text: string) =>
    text.split("").map((letter, index) => (
      <span key={index} className="inline-block overflow-hidden">
        <span className="inline-block translate-y-[-150%] will-change-transform">
          {letter === " " ? "\u00A0" : letter}
        </span>
      </span>
    ));

  useLayoutEffect(() => {
    if (!containerRef.current || !splitRef.current) return;

    const letters = Array.from(splitRef.current.querySelectorAll("span > span"));

    const center = Math.floor(letters.length / 2);
    const staggerOrder = letters
      .map((el, i) => ({ el, dist: Math.abs(i - center) }))
      .sort((a, b) => a.dist - b.dist)
      .map((i) => i.el);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.19,
        },
      });

      tl.fromTo(
        staggerOrder,
        { y: "-150%" },
        {
          y: "0%",
          ease: "power3.out",
          stagger: 0.28,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className={`w-full py-28 flex items-center justify-center ${className}`}
    >
    
      <div
        className="
          relative inline-block
          transition-all duration-300
          hover:scale-[1.02]
          hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]
          before:content-['']
          before:absolute
          before:left-0
          before:bottom-[-6px]
          before:h-[2px]
          before:w-0
          before:bg-current
          before:transition-all
          before:duration-300
          hover:before:w-full
        "
      >
        <h2 className="text-5xl md:text-7xl font-light tracking-tight select-none">
          <div ref={splitRef}>{splitText(title)}</div>
        </h2>
      </div>
    </section>
  );
}
