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
     OPEN ANIMATION (CINEMATIC)
  ========================== */
  useEffect(() => {
    if (!open) return;

    gsap.set(containerRef.current, {
      clipPath: "polygon(0 0,100% 0,100% 0,0 0)",
      skewY: -6,
      scaleY: 1.15,
      transformOrigin: "top center",
    });

    gsap.to(containerRef.current, {
      clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
      skewY: 0,
      scaleY: 1,
      duration: 1.3,
      ease: "power4.out",
    });

    gsap.fromTo(
      itemsRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.96,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.14,
        delay: 0.45,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, [open]);

  /* =========================
     CLOSE ANIMATION (PRO EXIT)
  ========================== */
  const closeWithAnimation = (callback?: () => void) => {
    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
        callback?.();
      },
    });

    tl.to(itemsRef.current, {
      opacity: 0,
      y: -30,
      scale: 0.95,
      stagger: {
        each: 0.06,
        from: "end",
      },
      duration: 0.5,
      ease: "power2.in",
    });

    tl.to(
      containerRef.current,
      {
        clipPath: "polygon(0 0,100% 0,100% 0,0 0)",
        skewY: -6,
        scaleY: 1.1,
        duration: 1.1,
        ease: "power4.inOut",
      },
      "-=0.15"
    );
  };

  const handleItemClick = (id: string) => {
    closeWithAnimation(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    });
  };

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white"
    >
      {/* Close */}
      <button
        onClick={() => closeWithAnimation()}
        className="absolute top-6 right-6 opacity-80 hover:opacity-100 transition"
      >
        <X size={32} />
      </button>

      {/* Nav Items */}
      <ul className="flex flex-col gap-10 text-3xl font-semibold">
        {navItems.map((item, i) => (
          <li
            key={item}
            ref={(el) => (itemsRef.current[i] = el!)}
            onClick={() => handleItemClick(item)}
            className="relative cursor-pointer group"
          >
            {/* Text */}
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
              {t(item)}
            </span>

            {/* Cinematic underline mask */}
            <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100" />

            {/* subtle glow */}
            <span className="absolute inset-0 -z-10 opacity-0 blur-xl bg-white/10 transition-opacity duration-300 group-hover:opacity-100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponsiveNavBar;
