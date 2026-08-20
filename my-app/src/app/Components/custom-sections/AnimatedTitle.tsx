"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  title: string;
  className?: string;
}

export default function AnimatedTitle({
  title,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const words = useMemo(() => title.split(" "), [title]);

  useLayoutEffect(() => {
    if (!titleRef.current || !containerRef.current) return;

    titleRef.current.innerHTML = words
      .map(
        (word) => `
      <span class="word">
        ${word
          .split("")
          .map(
            (letter) => `
            <span class="letter-wrapper">
              <span class="letter">
                ${letter}
              </span>
            </span>
          `
          )
          .join("")}
      </span>
    `
      )
      .join("");

    const letters = gsap.utils.toArray<HTMLElement>(
      ".letter",
      titleRef.current
    );

    gsap.set(letters, {
  y: 90,
  opacity: 0,
  scale: 1.15,
  filter: "blur(10px)",
});

    gsap.set(".title-mask", {
      scaleX: 0,
      transformOrigin: "left center",
    });

    

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(".title-mask", {
      scaleX: 1,
      duration: 0.8,
      ease: "power4.out",
    });

   tl.to(
  letters,
  {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    ease: "expo.out",
    duration: 1.4,
    stagger: {
      each: 0.04,
      from: "center",
    },
  },
  "-=0.35"
);

    

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, [words]);

  return (
    <section
      ref={containerRef}
      className={`w-full py-32 flex justify-center items-center ${className}`}
    >
      <div className="relative overflow-hidden">

        <div className=" absolute inset-0 pointer-events-none" />


        <h2
          ref={titleRef}
          className="
          text-5xl
          md:text-7xl
          xl:text-8xl
          font-bold
          text-orange-400
          tracking-tight
          leading-[1.15]
          text-center
          select-none
          "
        />
      </div>
    </section>
  );
}