"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { X } from "lucide-react";
import { useTranslations } from "../../lib/i18n-provider";

interface Props {
  open: boolean;
  onClose: () => void;
  navItems: string[];
}

const ResponsiveNavBar: React.FC<Props> = ({ open, onClose, navItems }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const t = useTranslations("navbar");

  /* =========================
      OPEN – AWWWARDS STYLE
  ========================== */
  useEffect(() => {
    if (!open) return;

    gsap.set(containerRef.current, {
      yPercent: 100,
      skewY: 6,
      transformOrigin: "bottom center",
    });

    gsap.set(itemsRef.current, {
      y: 60,
      opacity: 0,
      filter: "blur(8px)",
    });

    const tl = gsap.timeline();

    tl.to(containerRef.current, {
      yPercent: 0,
      skewY: 0,
      duration: 1.3,
      ease: "expo.out",
    });

    tl.to(
      itemsRef.current,
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.12,
        duration: 1,
        ease: "power4.out",
      },
      "-=0.5"
    );
  }, [open]);

  /* =========================
      EXIT – SMOOTH COLLAPSE
  ========================== */
  const closeWithAnimation = (callback?: () => void) => {
    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
        callback?.();
      },
    });

    tl.to(itemsRef.current, {
      y: -40,
      opacity: 0,
      filter: "blur(6px)",
      stagger: 0.08,
      duration: 0.6,
      ease: "power3.in",
    });

    tl.to(
      containerRef.current,
      {
        yPercent: 100,
        skewY: -4,
        duration: 1,
        ease: "expo.inOut",
      },
      "-=0.3"
    );
  };

  /* =========================
      HOVER – AWWWARDS FEEL
  ========================== */
  useEffect(() => {
    itemsRef.current.forEach((el) => {
      if (!el) return;

      const text = el.querySelector(".nav-text");
      const line = el.querySelector(".nav-line");
      const glow = el.querySelector(".nav-glow");

      if (!text || !line || !glow) return;

      const enter = () => {
        gsap.to(text, {
          y: -8,
          duration: 0.4,
          ease: "power3.out",
        });

        gsap.to(line, {
          scaleX: 1,
          duration: 0.5,
          ease: "expo.out",
        });

        gsap.to(glow, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const leave = () => {
        gsap.to(text, {
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        });

        gsap.to(line, {
          scaleX: 0,
          duration: 0.3,
          ease: "power2.in",
        });

        gsap.to(glow, {
          opacity: 0,
          duration: 0.25,
        });
      };

      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);

      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    });
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white"
    >
      <button
        onClick={() => closeWithAnimation()}
        className="absolute top-6 right-6 opacity-70 hover:opacity-100 transition"
      >
        <X size={32} />
      </button>

      <ul className="flex flex-col gap-16 text-4xl md:text-5xl font-semibold">
        {navItems.map((item, i) => (
          <li
            key={item}
            ref={(el) => (itemsRef.current[i] = el!)}
            onClick={() =>
              closeWithAnimation(() =>
                document
                  .getElementById(item)
                  ?.scrollIntoView({ behavior: "smooth" })
              )
            }
            className="relative cursor-pointer"
          >
            <span className="nav-text block relative z-10">
              {t(item)}
            </span>

            <span className="nav-line absolute left-0 -bottom-2 h-[2px] w-full bg-white origin-left scale-x-0" />

            <span className="nav-glow absolute inset-0 -z-10 opacity-0 blur-3xl bg-white/20" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponsiveNavBar;
