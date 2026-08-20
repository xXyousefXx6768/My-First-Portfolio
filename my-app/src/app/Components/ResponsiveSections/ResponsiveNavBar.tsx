"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { X } from "lucide-react";
import { useTranslations } from "../../lib/i18n-provider";

interface NavItem {
  key: string;
  target: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

const ResponsiveNavBar: React.FC<Props> = ({
  open,
  onClose,
  navItems,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  const t = useTranslations("navbar");

  /* =====================================================
     OPEN ANIMATION
  ===================================================== */

  useEffect(() => {
    if (!open || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, {
        yPercent: 100,
        skewY: 6,
        transformOrigin: "bottom center",
      });

      gsap.set(itemsRef.current, {
        y: 70,
        opacity: 0,
        filter: "blur(8px)",
      });

      const tl = gsap.timeline({
        defaults: {
          overwrite: "auto",
        },
      });

      // Menu entrance
      tl.to(containerRef.current, {
        yPercent: 0,
        skewY: 0,
        duration: 1.15,
        ease: "expo.out",
      });

      // Items entrance
      tl.to(
        itemsRef.current,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.55"
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [open]);

  /* =====================================================
     HOVER ANIMATION
  ===================================================== */

  useEffect(() => {
    if (!open) return;

    const cleanups: (() => void)[] = [];

    itemsRef.current.forEach((el) => {
      if (!el) return;

      const text = el.querySelector<HTMLElement>(".nav-text");
      const line = el.querySelector<HTMLElement>(".nav-line");
      const glow = el.querySelector<HTMLElement>(".nav-glow");

      if (!text || !line || !glow) return;

      const enter = () => {
        gsap.killTweensOf([text, line, glow]);

        const tl = gsap.timeline({
          defaults: {
            overwrite: "auto",
            ease: "power3.out",
          },
        });

        // Text
        tl.to(
          text,
          {
            y: -6,
            color: "#f97316",
            letterSpacing: "0.025em",
            duration: 0.45,
            ease: "power4.out",
          },
          0
        );

        // Thin line
        tl.to(
          line,
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.55,
            ease: "expo.out",
          },
          0.05
        );

        // Subtle glow
        tl.to(
          glow,
          {
            opacity: 0.45,
            scale: 1.08,
            duration: 0.45,
            ease: "power2.out",
          },
          0
        );
      };

      const leave = () => {
        gsap.killTweensOf([text, line, glow]);

        const tl = gsap.timeline({
          defaults: {
            overwrite: "auto",
          },
        });

        // Text back to white
        tl.to(
          text,
          {
            y: 0,
            color: "#ffffff",
            letterSpacing: "0em",
            duration: 0.4,
            ease: "power3.inOut",
          },
          0
        );

        // Line disappears
        tl.to(
          line,
          {
            scaleX: 0,
            opacity: 0,
            duration: 0.35,
            ease: "power3.inOut",
          },
          0
        );

        // Glow disappears
        tl.to(
          glow,
          {
            opacity: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0
        );
      };

      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);

      cleanups.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [open]);

  /* =====================================================
     CLOSE ANIMATION
  ===================================================== */

  const closeWithAnimation = (target?: string) => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      defaults: {
        overwrite: "auto",
      },

      onComplete: () => {
        onClose();

        // Scroll AFTER menu completely closes
        if (target) {
          requestAnimationFrame(() => {
            const section = document.getElementById(target);

            if (section) {
              gsap.to(window, {
                duration: 1.25,
                scrollTo: {
                  y: section,
                  offsetY: 100,
                },
                ease: "power4.inOut",
              });
            }
          });
        }
      },
    });

    // Text exit
    tl.to(itemsRef.current, {
      y: -45,
      opacity: 0,
      filter: "blur(8px)",
      stagger: 0.07,
      duration: 0.5,
      ease: "power3.in",
    });

    // Menu collapse
    tl.to(
      containerRef.current,
      {
        yPercent: 100,
        skewY: -5,
        duration: 0.85,
        ease: "expo.inOut",
      },
      "-=0.25"
    );
  };

  /* =====================================================
     CLOSE BUTTON
  ===================================================== */

  const handleClose = () => {
    closeWithAnimation();
  };

  /* =====================================================
     RENDER
  ===================================================== */

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      className="
        fixed
        inset-0
        z-[9999]
        bg-black
        flex
        flex-col
        items-center
        justify-center
        text-white
        overflow-hidden
      "
    >
      {/* =================================================
          BACKGROUND GLOW
      ================================================= */}

      <div
        className="
          absolute
          w-[500px]
          h-[500px]
          bg-orange-500/10
          rounded-full
          blur-[150px]
          pointer-events-none
        "
      />

      {/* =================================================
          CLOSE BUTTON
      ================================================= */}

      <button
        onClick={handleClose}
        aria-label="Close menu"
        className="
          absolute
          top-6
          right-6
          text-white/60
          hover:text-orange-500
          transition-colors
          duration-300
          z-20
        "
      >
        <X size={32} strokeWidth={1.5} />
      </button>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <ul
        className="
          relative
          flex
          flex-col
          gap-12
          text-4xl
          md:text-5xl
          font-semibold
        "
      >
        {navItems.map((item, i) => (
          <li
            key={item.key}
            ref={(el) => {
              if (el) {
                itemsRef.current[i] = el;
              }
            }}
            onClick={() => closeWithAnimation(item.target)}
            className="
              relative
              cursor-pointer
              w-fit
              group
            "
          >
            {/* =================================================
                TEXT
            ================================================= */}

            <span
              className="
                nav-text
                block
                relative
                z-10
                text-white
                will-change-transform
              "
            >
              {t(item.key)}
            </span>

            {/* =================================================
                THIN ANIMATED LINE
            ================================================= */}

            <span
              className="
                nav-line
                absolute
                left-0
                -bottom-3
                h-[1px]
                w-full
                bg-orange-500
                origin-left
                scale-x-0
                opacity-0
                will-change-transform
              "
            />

            {/* =================================================
                SUBTLE GLOW
            ================================================= */}

            <span
              className="
                nav-glow
                absolute
                inset-0
                -z-10
                opacity-0
                scale-100
                blur-2xl
                bg-orange-500/20
                pointer-events-none
                will-change-transform
              "
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponsiveNavBar;
