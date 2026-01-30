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
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".cert-card");

    gsap.set(cards, {
      opacity: 0,
      y: 80,
      scale: 0.9,
      rotateY: 15,
      filter: "blur(10px)",
    });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.18,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });
  }, []);

  // Modal Animation
  useEffect(() => {
    if (!modalRef.current) return;

    if (activeImg) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [activeImg]);

  return (
    <section className="w-full px-6 md:px-16 py-24 text-white">
         <div className="w-full flex justify-center mb-16 relative">
                <AnimatedTitle title=" My Certificates" className="text-orange-400" />
              </div>
     <div className="absolute top-1520 right-14 w-[480px] h-[450px] bg-gradient-to-r from-yellow-500/60 to-orange-500/30 rounded-full blur-[120px] opacity-50"></div>
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
