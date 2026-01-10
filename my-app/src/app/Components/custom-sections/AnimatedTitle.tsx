"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  title: string;
  className?: string;
}

export default function AnimatedTitle({ title, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // split characters
    const letters = title.split("");

    titleRef.current.innerHTML = letters
      .map(
        (l) =>
          `<span class="inline-block opacity-0 translate-y-[120%]">${l === " " ? "&nbsp;" : l}</span>`
      )
      .join("");

    const spans = Array.from(titleRef.current.querySelectorAll("span"));

    const center = Math.floor(spans.length / 2);
    const timingCurve = spans.map((_, i) => Math.abs(i - center) * 0.05);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    tl.to(spans, {
      y: "0%",
      opacity: 1,
      ease: "power3.out",
      stagger: {
        from: "center",
        amount: 0.1,
      },
      delay: (i) => timingCurve[i],
    });

    return () => tl.scrollTrigger?.kill();
  }, [title]);

  return (
    <section
      ref={containerRef}
      className={`w-full py-28 flex items-center justify-center ${className}`}
    >
      {/* Wrapper that hides overflow */}
      <div className="overflow-hidden">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold tracking-tight text-orange-400 select-none"
        ></h2>
      </div>
    </section>
  );
}
