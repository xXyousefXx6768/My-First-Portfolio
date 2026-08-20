"use client";
import React, { useLayoutEffect, useMemo, useRef } from "react";
import {
  FaCode,
  FaPaintBrush,
  FaServer,
  FaDatabase,
  FaRocket,
  FaTools,
  FaProjectDiagram,
  FaBrain,
  FaUsersCog,
  FaRobot,
} from "react-icons/fa";




import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./custom-sections/AnimatedTitle";
import { useTranslations } from "../lib/i18n-provider";

gsap.registerPlugin(ScrollTrigger);

// ======================
// Theme Colors
// ======================

const themes = {
  orange: "rgba(255,140,0,.9)",
  pink: "rgba(255,0,150,.9)",
  blue: "rgba(0,120,255,.9)",
  green: "rgba(0,255,120,.9)",
  yellow: "rgba(255,255,0,.9)",
  cyan: "rgba(0,255,255,.9)",
};


export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Refs لجميع الكروت
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const t = useTranslations("services");

  // ======================
  // Services Data
  // ======================

  const services = useMemo(

    () => [
      {
        title: t("items.0.title"),
        desc: t("items.0.desc"),
        icon: (
          <FaCode
            className="text-orange-400 text-4xl parallax-l will-change-transform"
            data-depth="30"
          />
        ),
        theme: themes.orange,
      },

      {
        title: t("items.1.title"),
        desc: t("items.1.desc"),
        icon: (
          <FaPaintBrush
            className="text-pink-400 text-4xl parallax-l will-change-transform"
            data-depth="30"
          />
        ),
        theme: themes.pink,
      },

      {
        title: t("items.2.title"),
        desc: t("items.2.desc"),
        icon: (
          <FaServer
            className="text-blue-400 text-4xl parallax-l will-change-transform"
            data-depth="30"
          />
        ),
        theme: themes.blue,
      },

      {
        title: t("items.3.title"),
        desc: t("items.3.desc"),
        icon: (
          <FaDatabase
            className="text-green-400 text-4xl parallax-l will-change-transform"
            data-depth="30"
          />
        ),
        theme: themes.green,
      },

      {
        title: t("items.4.title"),
        desc: t("items.4.desc"),
        icon: (
          <FaRocket
            className="text-yellow-400 text-4xl parallax-l will-change-transform"
            data-depth="30"
          />
        ),
        theme: themes.yellow,
      },

      {
        title: t("items.5.title"),
        desc: t("items.5.desc"),
        icon: (
          <FaTools
            className="text-cyan-300 text-4xl parallax-l will-change-transform"
            data-depth="30"
          />
        ),
        theme: themes.cyan,
      },

      {
  title: "System Development",
  desc: "Building scalable web-based systems tailored to real business needs.",
  icon: (
    <FaProjectDiagram
      className="text-purple-400 text-4xl parallax-l will-change-transform"
      data-depth="30"
    />
  ),
  theme: "rgba(168,85,247,.9)",
},

{
  title: "AI Integration",
  desc: "Integrating AI-powered features into modern web applications and business systems.",
  icon: (
    <FaBrain
      className="text-violet-400 text-4xl parallax-l will-change-transform"
      data-depth="30"
    />
  ),
  theme: "rgba(139,92,246,.9)",
},

{
  title: "CRM Systems",
  desc: "Building customer management systems to organize data, sales and business operations.",
  icon: (
    <FaUsersCog
      className="text-sky-400 text-4xl parallax-l will-change-transform"
      data-depth="30"
    />
  ),
  theme: "rgba(14,165,233,.9)",
},

{
  title: "Automation & Workflows",
  desc: "Automating repetitive business processes to improve efficiency and reduce manual work.",
  icon: (
    <FaRobot
      className="text-emerald-400 text-4xl parallax-l will-change-transform"
      data-depth="30"
    />
  ),
  theme: "rgba(16,185,129,.9)",
},



    ],
    [t]
  );

  // ======================
// GSAP Animation
// ======================
useLayoutEffect(() => {
  if (!sectionRef.current) return;

  const ctx = gsap.context(() => {
    const cards = cardsRef.current.filter(Boolean);

    if (!cards.length) return;

    const fullMask =
      "polygon(" +
      "0% 0%, " +
      "100% 0%, " +
      "100% 100%, " +
      "0% 100%" +
      ")";

    const initialMask =
      "polygon(" +
      "50% 0%, " +
      "58% 8%, " +
      "68% 4%, " +
      "72% 14%, " +
      "84% 10%, " +
      "82% 22%, " +
      "94% 28%, " +
      "88% 38%, " +
      "100% 50%, " +
      "88% 62%, " +
      "94% 72%, " +
      "82% 78%, " +
      "84% 90%, " +
      "72% 86%, " +
      "68% 96%, " +
      "58% 92%, " +
      "50% 100%, " +
      "42% 92%, " +
      "32% 96%, " +
      "28% 86%, " +
      "16% 90%, " +
      "18% 78%, " +
      "6% 72%, " +
      "12% 62%, " +
      "0% 50%, " +
      "12% 38%, " +
      "6% 28%, " +
      "18% 22%, " +
      "16% 10%, " +
      "28% 14%, " +
      "32% 4%, " +
      "42% 8%" +
      ")";

    // ==========================================
    // INITIAL STATE
    // ==========================================

    gsap.set(cards, {
      opacity: 0,
      y: 90,
      scale: 0.88,
      rotationX: 14,
      filter: "blur(10px)",
      clipPath: initialMask,
      transformOrigin: "50% 100%",
      transformPerspective: 1200,
      force3D: true,
      willChange: "transform, opacity, filter, clip-path",
    });

    // ==========================================
    // EACH CARD HAS ITS OWN SCROLL TRIGGER
    // ==========================================

    cards.forEach((card, index) => {
      const isFirstRow = index < 3;

      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        filter: "blur(0px)",
        clipPath: fullMask,

        duration: 0.9,

        delay: isFirstRow
          ? index * 0.12
          : (index - 3) * 0.12,

        ease: "expo.out",

        scrollTrigger: {
          trigger: card,

          // الكارت نفسه لازم يقرب من الشاشة
          start: "top 82%",

          once: true,

          invalidateOnRefresh: true,

          fastScrollEnd: true,
        },
      });
    });

    // ==========================================
    // REFRESH AFTER LAYOUT
    // ==========================================

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, sectionRef);

  return () => {
    ctx.revert();
  };
}, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;

    const rect = card.getBoundingClientRect();



    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width - 0.5) * 2;
    const percentY = (y / rect.height - 0.5) * 2;

    const quick = (card as any)._quick;

    quick.rotateX(percentY * -12);
    quick.rotateY(percentX * 12);

    quick.layers.forEach((layer: HTMLElement) => {
      const depth = Number(layer.dataset.depth || 20);

      quick.xSetters.get(layer)(percentX * depth);
      quick.ySetters.get(layer)(percentY * depth);
    });

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };


  const handleHover = (card: HTMLElement, color: string) => {

    const layers = card.querySelectorAll(".parallax-l");

    gsap.to(card, {
      "--maskColor": color,
      "--maskSize": "160%",
      scale: 1.07,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(layers, {
      scale: 1.25,
      filter: `drop-shadow(0 0 15px ${color})`,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleLeave = (card: HTMLElement) => {
   const quick = (card as any)._quick;

if(!quick) return;

    gsap.to(card, {
      "--maskColor": "rgba(0,0,0,1)",
      "--maskSize": "0%",
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });

    quick.rotateX(0);
    quick.rotateY(0);

    quick.layers.forEach((layer: HTMLElement) => {
      quick.xSetters.get(layer)(0);
      quick.ySetters.get(layer)(0);

      gsap.to(layer, {
        scale: 1,
        filter: "drop-shadow(0 0 0 transparent)",
        duration: 0.35,
        overwrite: "auto",
      });
    });
  };

  return (
    <section

      id="services"
      className="
      relative
      w-full
      px-6
      md:px-16
      py-24
      text-white
      [content-visibility:auto]
      [contain:layout_paint]
      "
    >
      <AnimatedTitle
        title={t("title")}
        className="text-orange-400"
      />

      <div
        className="
        absolute
        left-[-150px]
        top-[30%]
        w-[400px]
        h-[400px]
        rounded-full
        bg-orange-500/10
        blur-[180px]
        pointer-events-none
        "
      />

      <div
        className="
        absolute
        right-[-150px]
        bottom-[10%]
        w-[350px]
        h-[350px]
        rounded-full
        bg-red-500/10
        blur-[160px]
        pointer-events-none
        "
      />

      <div   ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:col-span-1 gap-10">
                {services.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              if (!el) return;

              cardsRef.current[i] = el;

              gsap.set(el,{
transformPerspective:1000,
transformStyle:"preserve-3d"
})

              // أنشئ الـ quickTo مرة واحدة فقط
            if((el as any)._quick){
    return;
}

              const rotateX = gsap.quickTo(el, "rotateX", {
                duration: 0.25,
                ease: "power2.out",
              });

              const rotateY = gsap.quickTo(el, "rotateY", {
                duration: 0.25,
                ease: "power2.out",
              });

            const layers = [...el.querySelectorAll<HTMLElement>(".parallax-l")];

              const xSetters = new Map<
                HTMLElement,
                (value: number) => void
              >();

              const ySetters = new Map<
                HTMLElement,
                (value: number) => void
              >();

              layers.forEach((layer) => {
                xSetters.set(
                  layer,
                  gsap.quickTo(layer, "x", {
                    duration: 0.25,
                    ease: "power2.out",
                  })
                );

                ySetters.set(
                  layer,
                  gsap.quickTo(layer, "y", {
                    duration: 0.25,
                    ease: "power2.out",
                  })
                );
              });

              (el as any)._quick = {
                rotateX,
                rotateY,
                layers,
                xSetters,
                ySetters,
              };
            }}
            className="
            service-card
            relative
            p-8
            rounded-3xl
            border
            border-white/10
            bg-black/40
            backdrop-blur-xl

            cursor-pointer
            transform-gpu
            will-change-transform
            "
            style={
              {
                "--maskColor": "rgba(0,0,0,1)",
                "--maskSize": "0%",
                backgroundImage: `
                  radial-gradient(
                    circle at var(--x) var(--y),
                    var(--maskColor) var(--maskSize),
                    rgba(0,0,0,.4) 100%
                  )
                `,
                transformStyle: "preserve-3d",
                willChange: "transform",
              } as React.CSSProperties
            }
            onMouseMove={handleMove}
            onMouseEnter={(e) =>
              handleHover(e.currentTarget, s.theme)
            }
            onMouseLeave={(e) =>
              handleLeave(e.currentTarget)
            }
          >
            <div
              className="
              parallax-l
              mb-4
              will-change-transform
              "
              data-depth="35"
            >
              {s.icon}
            </div>

            <h3
              className="
              parallax-l
              text-xl
              font-semibold
              mb-3
              opacity-90
              will-change-transform
              "
              data-depth="18"
            >
              {s.title}
            </h3>

            <p
              className="
              parallax-l
              text-gray-300
              text-sm
              leading-relaxed
              opacity-80
              will-change-transform
              "
              data-depth="10"
            >
              {s.desc}
            </p>
      </div>
       ))}
      </div>
    </section>
  );
}
