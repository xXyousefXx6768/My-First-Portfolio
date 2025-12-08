"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import myImg2 from "../assets/my img2.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AboutMe() {
   const titleRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Big shadow (external element)
    const bigShadowEl = document.querySelector(
      ".big-shadow"
    ) as HTMLElement | null;

    if (bigShadowEl) gsap.set(bigShadowEl, { opacity: 0 });
    if (imgContainerRef.current) gsap.set(imgContainerRef.current, { boxShadow: "none" });

    // TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imgContainerRef.current || titleRef.current,
        start: "top 85%",
      },
    });

    triggers.push(tl.scrollTrigger!);

    // --- TITLE REVEAL ---
    tl.fromTo(
      titleRef.current,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1., ease: "power3.out" }
    );

    // --- TEXT AFTER TITLE ---
    tl.fromTo(
      textRef.current,
      { y: 40, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out",
      },
      "+=0.2"
    );

    // --- IMAGE REVEAL ---
    tl.fromTo(
      imgRef.current,
      {
        scale: 1.35,
        y: -120,
        opacity: 0,
        clipPath: "inset(100% 0 0 0)",
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        clipPath: "inset(0% 0 0 0)",
        duration: 1.7,
        ease: "power3.out",
      },
      "+=0.05"
    );

    // --- IMAGE SHADOW ---
    tl.to(
      imgContainerRef.current,
      {
        boxShadow:
          "0 18px 50px rgba(230,72,0,0.18), 0 8px 20px rgba(0,0,0,0.25)",
        duration: 0.9,
        ease: "power3.out",
      },
      "+=0.12"
    );

    // --- BIG SHADOW ---
    if (bigShadowEl) {
      tl.to(
        bigShadowEl,
        { opacity: 1, duration: 1.5, ease: "power3.out" },
        "+=0.08"
      );
    }

    // CLEANUP — only kill this component's triggers
    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);
  return (
    <main className="flex flex-col md:flex-row w-full justify-center md:justify-around items-center px-8 md:px-16 py-20 text-white gap-12 md:gap-4">
      {/* TEXT SECTION */}
      <section className="max-w-xl">
        <div className="absolute top-200 left-18 w-[450px] h-[450px] bg-gradient-to-r from-yellow-700 to-orange-500/30 rounded-full blur-[180px] opacity-65"></div>
        <div className=" big-shadow absolute top-200 right-18 w-[450px] h-[450px] bg-gradient-to-r from-red-800 to-orange-500/30 rounded-full blur-[120px] opacity-50"></div>

        <div className="overflow-hidden inline-block mb-3">
          <h3 ref={titleRef} className="font-bold text-3xl md:text-4xl text-orange-400">
            About me
          </h3>
        </div>

        <p ref={textRef} className="text-gray-300 leading-relaxed text-lg">
          👋 Hi, I’m Yousef Amr, also known as Tito — a passionate Full-Stack Developer
          who loves turning ideas into interactive, functional, and visually appealing
          web experiences...
        </p>
      </section>

      {/* IMAGE SECTION  */}
      <section
        ref={imgContainerRef}
        className="relative overflow-hidden rounded-2xl w-[260px] h-[460px] shadow-lg shadow-orange-700/20"
      >
        
        <Image
          ref={imgRef}
          src={myImg2}
          alt="my image"
          fill
          className="object-contain relative z-10"
          priority
        />
      </section>
    </main>
  );
}

export default AboutMe;
