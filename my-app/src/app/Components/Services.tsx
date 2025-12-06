"use client";
import React, { useEffect, useRef } from "react";
import {
  FaCode,
  FaPaintBrush,
  FaServer,
  FaDatabase,
  FaRocket,
  FaTools,
} from "react-icons/fa";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./custom sections/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

// Color themes
const themes = {
  orange: "rgba(255,140,0,0.9)",
  pink: "rgba(255,0,150,0.9)",
  blue: "rgba(0,120,255,0.9)",
  green: "rgba(0,255,120,0.9)",
  yellow: "rgba(255,255,0,0.9)",
  cyan: "rgba(0,255,255,255,0.9)",
};

const services = [
  {
    title: "Full-Stack Web Development",
    desc: "Building fast, scalable apps using React, Next.js, Node.js & Laravel.",
    icon: <FaCode className="text-orange-400 text-4xl parallax-l" data-depth="30" />,
    theme: themes.orange,
  },
  {
    title: "Front-End UI/UX Crafting",
    desc: "Pixel-perfect, animated UIs using Tailwind, GSAP & Framer Motion.",
    icon: <FaPaintBrush className="text-pink-400 text-4xl parallax-l" data-depth="30" />,
    theme: themes.pink,
  },
  {
    title: "Back-End & API Architecture",
    desc: "Secure, optimized REST APIs using Node.js & Laravel.",
    icon: <FaServer className="text-blue-400 text-4xl parallax-l" data-depth="30" />,
    theme: themes.blue,
  },
  {
    title: "Database Optimization",
    desc: "Relational & NoSQL DB design, indexing & performance tuning.",
    icon: <FaDatabase className="text-green-400 text-4xl parallax-l" data-depth="30" />,
    theme: themes.green,
  },
  {
    title: "Performance & SEO",
    desc: "Core Web Vitals, caching, and full SEO optimization.",
    icon: <FaRocket className="text-yellow-400 text-4xl parallax-l" data-depth="30" />,
    theme: themes.yellow,
  },
  {
    title: "Maintenance & Support",
    desc: "Bug fixes, refactoring, and long-term project support.",
    icon: <FaTools className="text-cyan-300 text-4xl parallax-l" data-depth="30" />,
    theme: themes.cyan,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".service-card");
    if (!cards) return;

    // Initial reveal animation
    gsap.from(cards, {
      opacity: 0,
      y: 40,
      scale: 0.9,
      rotateX: 15,
      filter: "blur(10px)",
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  // PARALLAX MOVEMENT
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width - 0.5) * 2;
    const percentY = (y / rect.height - 0.5) * 2;

    // Card tilt
    gsap.to(card, {
      rotateY: percentX * 12,
      rotateX: percentY * -12,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });

    // 3D parallax layers
    const layers = card.querySelectorAll(".parallax-l");
    layers.forEach((layer: any) => {
      const depth = layer.getAttribute("data-depth");
      gsap.to(layer, {
        x: percentX * depth,
        y: percentY * depth,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    // Update mask spot
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  const handleHover = (card: HTMLElement, color: string) => {
    gsap.to(card, {
      "--maskColor": color,
      "--maskSize": "160%",
      scale: 1.07,
      duration: 0.35, // ← بدون تأخير
      ease: "power3.out",
    });

    gsap.to(card.querySelector(".parallax-l"), {
      scale: 1.25,
      filter: `drop-shadow(0 0 15px ${color})`,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleLeave = (card: HTMLElement) => {
    gsap.to(card, {
      "--maskColor": "rgba(0,0,0,1)",
      "--maskSize": "0%",
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
    });

    const layers = card.querySelectorAll(".parallax-l");
    gsap.to(layers, {
      x: 0,
      y: 0,
      scale: 1,
      filter: "drop-shadow(0 0 0 transparent)",
      duration: 0.35,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="w-full px-6 md:px-16 py-24 text-white relative"
    >
     <AnimatedTitle title="Services" className="text-orange-400" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((s, i) => (
          <div
            key={i}
            className="service-card p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl cursor-pointer relative"
            style={{
              "--maskColor": "rgba(0,0,0,1)",
              "--maskSize": "0%",
              backgroundImage: `
                radial-gradient(
                  circle at var(--x) var(--y),
                  var(--maskColor) var(--maskSize),
                  rgba(0,0,0,0.4) 100%
                )
              `,
              transformStyle: "preserve-3d",
            } as any}
            onMouseMove={handleMove}
            onMouseEnter={(e) => handleHover(e.currentTarget, s.theme)}
            onMouseLeave={(e) => handleLeave(e.currentTarget)}
          >
            <div className="parallax-l mb-4" data-depth="35">{s.icon}</div>

            <h3 className="parallax-l text-xl font-semibold mb-3 opacity-90" data-depth="18">
              {s.title}
            </h3>

            <p className="parallax-l text-gray-300 text-sm leading-relaxed opacity-80" data-depth="10">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
