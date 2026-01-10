"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import myImg2 from "../assets/my img2.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./custom-sections/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

function AboutMe() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const titleTriggerRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
  if (
    !titleTriggerRef.current ||
    !textRef.current ||
    !imgRef.current ||
    !imgContainerRef.current
  ) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleTriggerRef.current,
        start: "bottom 78%",
        once: true,
      },
      defaults: {
        ease: "power3.out",
      },
    });

    /* TEXT */
    tl.fromTo(
      textRef.current,
      {
        y: 40,
        opacity: 0,
        filter: "blur(6px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
      }
    );

    /* IMAGE REVEAL */
    tl.fromTo(
      imgRef.current,
      {
        scale: 1.25,
        y: -80,
        opacity: 0,
        clipPath: "inset(100% 0 0 0)",
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        clipPath: "inset(0% 0 0 0)",
        duration: 1.1,
      },
      "-=0.55"
    );

    /* IMAGE SHADOW */
    tl.to(
      imgContainerRef.current,
      {
        boxShadow:
          "0 20px 55px rgba(230,72,0,0.22), 0 8px 22px rgba(0,0,0,0.3)",
        duration: 0.8,
      },
      "-=0.6"
    );

    /* GLOW */
    tl.to(
      ".big-shadow",
      {
        opacity: 1,
        duration: 1,
      },
      "-=0.7"
    );
  });

  return () => ctx.revert();
}, []);

  return (
    <main
      ref={sectionRef}
      className="w-full px-6 sm:px-10 md:px-16 py-24 text-white"
    >
      {/* TITLE */}
      <div ref={titleTriggerRef} className="w-full flex justify-center mb-16 relative">
        <AnimatedTitle title="About Me" className="text-orange-400" />
      </div>

      {/* CONTENT */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-16">

        {/* BIG GLOW */}
        <div
          className="big-shadow absolute right-1/2 md:right-10 translate-x-1/2 md:translate-x-0
          w-[320px] h-[320px] md:w-[450px] md:h-[450px]
          bg-gradient-to-r from-red-800 to-orange-500/30
          rounded-full blur-[140px] opacity-0 pointer-events-none"
        />

        {/* TEXT */}
        <section className="max-w-xl z-10">
          <p
            ref={textRef}
            className="text-gray-300 leading-relaxed text-lg md:text-xl"
          >
            👋 Hi, I’m{" "}
            <span className="text-orange-400">Yousef Amr</span>, also known as
            Tito — a passionate Full-Stack Developer who loves turning ideas into
            interactive, functional, and visually appealing web experiences...
          </p>
        </section>

        {/* IMAGE */}
        <section
  ref={imgContainerRef}
  className="
    relative overflow-hidden rounded-2xl
    w-[240px] h-[420px]
    md:w-[260px] md:h-[460px]
    shadow-lg shadow-orange-700/10
    z-[5]
    will-change-transform
  "
>
          <Image
  ref={imgRef}
  src={myImg2}
  alt="Yousef Amr"
  fill
  sizes="(max-width: 768px) 260px, 460px"
  className="object-cover will-change-transform"
  priority={false}
/>

        </section>
      </div>
    </main>
  );
}

export default AboutMe;
