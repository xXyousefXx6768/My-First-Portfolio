"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import myImg2 from "../assets/my img2.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./custom-sections/AnimatedTitle";
import { useTranslations } from "../lib/i18n-provider";

gsap.registerPlugin(ScrollTrigger);

function AboutMe() {
  const t = useTranslations("about");

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const titleTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !titleTriggerRef.current ||
      !textRef.current ||
      !imgRef.current ||
      !imgContainerRef.current
    )
      return;

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
        "-=0.7"
      );

      tl.to(
        imgContainerRef.current,
        {
          boxShadow:
            "0 20px 55px rgba(230,72,0,0.22), 0 8px 22px rgba(0,0,0,0.3)",
          duration: 0.8,
        },
        "-=0.7"
      );

      tl.to(".big-shadow", {
        opacity: 1,
        duration: 1,
      });

      gsap.to(imgContainerRef.current, {
        y: 12,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={sectionRef}
      id="about"
      className="w-full px-6 sm:px-10 md:px-16 py-24 text-white"
    >
      {/* Title */}
      <div
        ref={titleTriggerRef}
        className="w-full flex justify-center mb-10 relative"
      >
        <AnimatedTitle
          title={t("title")}
          className="text-orange-400"
        />
      </div>

      {/* Content */}
      {/* Content */}
<div className="relative flex flex-col lg:flex-row items-center justify-between gap-24 max-w-7xl mx-auto">

  {/* Glow */}
  <div
    className="
    big-shadow
    absolute
    right-1/2
    lg:right-20
    translate-x-1/2
    lg:translate-x-0
    w-[400px]
    h-[400px]
    bg-gradient-to-r
    from-red-800
    to-orange-500/30
    rounded-full
    blur-[160px]
    opacity-0
    pointer-events-none
    -z-10
    "
  />

  {/* LEFT */}
  <section
    ref={textRef}
    className="flex-1 max-w-2xl z-20"
  >
    <p className="text-gray-300 leading-relaxed text-lg md:text-xl">
      I am a Front-End Developer specialized in React.js, Next.js and
      modern web technologies, passionate about creating high-performance,
      scalable and visually engaging web applications.

      <br />
      <br />

      Combining strong technical skills with a background in Italian
      Language Studies, I bring analytical thinking, adaptability and
      effective communication to every team and environment.

      <br />
      <br />

      My focus is building intuitive user experiences, writing clean
      maintainable code and continuously improving my skills to deliver
      modern digital solutions with real business value.
    </p>

    {/* Cards */}
    <div className="grid grid-cols-2 gap-4 mt-10 relative z-30">

      <div
        className="
        stat-card
        bg-white/5
        backdrop-blur-md
        border
        border-orange-500/10
        rounded-xl
        p-5
        hover:border-orange-500/40
        hover:-translate-y-1
        transition-all
        duration-300
        "
      >
        <h3 className="text-orange-500 text-2xl font-bold">
          React & Next.js
        </h3>

        <p className="text-gray-400 text-sm mt-2">
          Modern Front-End Development
        </p>
      </div>

      <div
        className="
        stat-card
        bg-white/5
        backdrop-blur-md
        border
        border-orange-500/10
        rounded-xl
        p-5
        hover:border-orange-500/40
        hover:-translate-y-1
        transition-all
        duration-300
        "
      >
        <h3 className="text-orange-500 text-2xl font-bold">
          Responsive UI
        </h3>

        <p className="text-gray-400 text-sm mt-2">
          Mobile First Design Approach
        </p>
      </div>

      <div
        className="
        stat-card
        bg-white/5
        backdrop-blur-md
        border
        border-orange-500/10
        rounded-xl
        p-5
        hover:border-orange-500/40
        hover:-translate-y-1
        transition-all
        duration-300
        "
      >
        <h3 className="text-orange-500 text-2xl font-bold">
          3 Languages
        </h3>

        <p className="text-gray-400 text-sm mt-2">
          Arabic • English • Deutch
        </p>
      </div>

      <div
        className="
        stat-card
        bg-white/5
        backdrop-blur-md
        border
        border-orange-500/10
        rounded-xl
        p-5
        hover:border-orange-500/40
        hover:-translate-y-1
        transition-all
        duration-300
        "
      >
        <h3 className="text-orange-500 text-2xl font-bold">
          Available
        </h3>

        <p className="text-gray-400 text-sm mt-2">
          Open For Opportunities
        </p>
      </div>

    </div>
  </section>

  {/* RIGHT IMAGE */}
  <section
    ref={imgContainerRef}
    className="
    relative
    overflow-hidden
    rounded-3xl
    w-[280px]
    h-[460px]
    md:w-[320px]
    md:h-[520px]
    lg:-mt-12
    shadow-lg
    shadow-orange-700/10
    z-20
    "
  >
    <div
      className="
      absolute
      inset-0
      bg-orange-500/20
      blur-[90px]
      scale-110
      rounded-full
      -z-10
      "
    />

    <Image
      ref={imgRef}
      src={myImg2}
      alt="Yousef Amr"
      fill
      sizes="(max-width:768px) 280px, 320px"
      className="object-cover"
    />
  </section>
</div>
    </main>
  );
}

export default AboutMe;