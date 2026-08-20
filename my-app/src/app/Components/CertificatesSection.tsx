"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./custom-sections/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

interface Cert {
  id: number;
  img: string;
}

const certs: Cert[] = [
  { id: 1, img: "/Raya.jpg" },
  { id: 2, img: "/WebMasters.webp" },
  { id: 3, img: "/Neuronetix.webp" },
];

export default function CertificatesSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [activeImg, setActiveImg] = useState<string | null>(null);

  // Scroll Animation
  // Scroll Animation
useEffect(() => {
  if (!containerRef.current) return;

  const container = containerRef.current;
  const cards = container.querySelectorAll<HTMLElement>(".cert-card");

  if (!cards.length) return;

  const ctx = gsap.context(() => {

    // ==========================================
    // INITIAL STATE
    // ==========================================

    gsap.set(cards, {
      opacity: 0,
      y: 80,
      scale: 0.9,
      rotateY: 15,
      filter: "blur(10px)",

      // 🔥 Complex geometric mask
      clipPath:
        "polygon(" +
        "50% 42%, " +
        "58% 36%, " +
        "64% 42%, " +
        "72% 38%, " +
        "68% 48%, " +
        "82% 50%, " +
        "68% 54%, " +
        "74% 64%, " +
        "62% 58%, " +
        "58% 68%, " +
        "50% 58%, " +
        "42% 68%, " +
        "38% 58%, " +
        "26% 64%, " +
        "32% 54%, " +
        "18% 50%, " +
        "32% 48%, " +
        "26% 38%, " +
        "36% 42%, " +
        "42% 36%" +
        ")",

      transformOrigin: "50% 50%",
      transformPerspective: 1200,
      force3D: true,
      willChange: "transform, opacity, filter, clip-path",
    });

    // ==========================================
    // FINAL MASK
    // ==========================================

    const finalMask =
      "polygon(" +
      "0% 0%, " +
      "12% 2%, " +
      "25% 0%, " +
      "38% 2%, " +
      "50% 0%, " +
      "62% 2%, " +
      "75% 0%, " +
      "88% 2%, " +
      "100% 0%, " +
      "98% 18%, " +
      "100% 32%, " +
      "98% 50%, " +
      "100% 68%, " +
      "98% 82%, " +
      "100% 100%, " +
      "88% 98%, " +
      "75% 100%, " +
      "62% 98%, " +
      "50% 100%, " +
      "38% 98%, " +
      "25% 100%, " +
      "12% 98%, " +
      "0% 100%, " +
      "2% 82%, " +
      "0% 68%, " +
      "2% 50%, " +
      "0% 32%, " +
      "2% 18%" +
      ")";

    // ==========================================
    // MAIN TIMELINE
    // ==========================================

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,

        // 🔒 نفس التوقيت القديم
        start: "top 75%",

        // 🔒 نفس السلوك القديم
        once: true,
      },
    });

    // ==========================================
    // CERTIFICATE REVEAL
    // ==========================================

    tl.to(cards, {
      onStart: () => {
  cards.forEach((card, i) => {
    gsap.to(card, {
      rotationZ: i % 2 === 0 ? -1.5 : 1.5,
      duration: 0.25,
      ease: "power2.out",
    });
  });
},
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      clipPath: finalMask,

      // 🔒 نفس التوقيت القديم
      duration: 1.2,

      // 🔥 stagger موجود أصلًا
      stagger: 0.18,

      ease: "power4.out",
    });

    // ==========================================
    // MICRO GLITCH / SETTLE
    // ==========================================

    tl.to(
      cards,
      {
        scale: 1.015,
        duration: 0.12,
        stagger: 0.035,
        ease: "power2.out",
      },
      "-=0.18"
    );

    tl.to(cards, {
      scale: 1,
      duration: 0.25,
      stagger: 0.035,
      ease: "back.out(1.2)",
    });

  }, container);

  return () => {
    ctx.revert();
  };
}, []);

  return (
    <section
  className="
  relative
  overflow-hidden
  w-full
  px-6
  md:px-16
  py-24
  text-white
  "
>
         <div className="w-full flex justify-center mb-16 relative">
                <AnimatedTitle title=" My Certificates" className="text-orange-400" />
              </div>

<div
  className="
  absolute
  right-0
  top-1/2
  -translate-y-1/2
  w-[450px]
  h-[450px]
  bg-orange-500/10
  rounded-full
  blur-[180px]
  "
/>


      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {certs.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setActiveImg(cert.img)}
            className="cert-card group relative rounded-2xl overflow-hidden
            bg-white/5 backdrop-blur-xl border border-white/10
            shadow-[0_10px_40px_rgba(0,0,0,0.4)]
            hover:shadow-[0_20px_50px_rgba(255,120,50,0.25)]
            transition-all duration-500 cursor-pointer"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-orange-500/10 to-yellow-400/10 blur-2xl"></div>

            <div className="relative overflow-hidden">
              <Image
                src={cert.img}
                alt="certificate"
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <span className="absolute inset-0 rounded-2xl border border-orange-500/0 group-hover:border-orange-400/40 transition duration-500"></span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeImg && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
          onClick={() => setActiveImg(null)}
        >
          <div
            ref={modalRef}
            className="relative max-w-5xl w-[35%] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImg}
              alt="certificate"
              width={200}
              height={300}
              className="w-full h-auto object-contain rounded-2xl"
            />

            {/* Close Button */}
            <button
              onClick={() => setActiveImg(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white px-4 py-2 rounded-full transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
