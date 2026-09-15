"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "../lib/i18n-provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareLinkedin,
  faSquareGithub,
  faSquareInstagram,
  faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const t = useTranslations("footer");
const icons = [
  {
    icon: faSquareLinkedin,
    link: "https://www.linkedin.com/in/yousef-amr-66873224b",
  },
  {
    icon: faSquareGithub,
    link: "https://github.com/xXyousefXx6768",
  },
  {
    icon: faSquareInstagram,
    link: "https://www.instagram.com/yousef_amr24",
  },
  {
    icon: faSquareFacebook,
    link: "https://www.facebook.com/share/1DMa2oSiss/",
  },
];
  useEffect(() => {
    const footer = footerRef.current;

if (!footer) return;


    const ctx = gsap.context(() => {
      /* ==========================================
         HELPERS
      ========================================== */

      const reveal = (
         element: Element | string | null,
        from: gsap.TweenVars,
        to: gsap.TweenVars,
        start = "top 88%"
      ) => {
        if (!element) return;

        gsap.set(element, from);

        gsap.to(element, {
          ...to,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: "play none none none",
            once: true,
          },
        });
      };

      /* ==========================================
         TOP LINE
      ========================================== */

      reveal(
        ".footer-top-line",
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "expo.out",
        },
        "top 92%"
      );

      /* ==========================================
         EYEBROW
      ========================================== */

      reveal(
        ".footer-eyebrow",
        {
          opacity: 0,
          x: -30,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "power3.out",
        }
      );

      /* ==========================================
         MAIN TITLE
         EACH LINE HAS ITS OWN SCROLLTRIGGER
      ========================================== */

      const titleLine1 = footer.querySelector(".footer-title-line-1");
     const titleLine2 = footer.querySelector(".footer-title-line-2");

      reveal(
        titleLine1,
        {
          y: 100,
          opacity: 0,
          rotateX: -35,
          transformOrigin: "50% 100%",
          filter: "blur(12px)",
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.15,
          ease: "expo.out",
        },
        "top 90%"
      );


      reveal(
        titleLine2,
        {
          y: 120,
          opacity: 0,
          rotateX: -40,
          transformOrigin: "50% 100%",
          filter: "blur(14px)",
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "expo.out",
        },
        "top 88%"
      );

      /* ==========================================
         DESCRIPTION
      ========================================== */

      reveal(
        ".footer-description",
        {
          opacity: 0,
          y: 35,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
        },
        "top 90%"
      );

      /* ==========================================
         SERVICES
      ========================================== */

      const serviceItems = gsap.utils.toArray<HTMLElement>(
        ".footer-service-item"
      );

      serviceItems.forEach((item) => {
        reveal(
          item,
          {
            opacity: 0,
            x: 30,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "power3.out",
          },
          "top 92%"
        );

        const line = item.querySelector(".footer-service-line");
        const text = item.querySelector(".footer-service-text");

        item.addEventListener("mouseenter", () => {
          gsap.to(line, {
            width: "100%",
            duration: 0.35,
            ease: "power3.out",
          });

          gsap.to(text, {
            x: 7,
            color: "#f97316",
            duration: 0.3,
            ease: "power3.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(line, {
            width: "0%",
            duration: 0.3,
            ease: "power3.inOut",
          });

          gsap.to(text, {
            x: 0,
            clearProps: "color",
            duration: 0.3,
            ease: "power3.out",
          });
        });
      });

      /* ==========================================
         NAVIGATION
      ========================================== */

      const navItems = gsap.utils.toArray<HTMLElement>(
        ".footer-nav-item"
      );

      navItems.forEach((item, index) => {
        reveal(
          item,
          {
            opacity: 0,
            y: 22,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            delay: index * 0.04,
          },
          "top 92%"
        );

        const arrow = item.querySelector(
          ".footer-nav-arrow"
        );

        item.addEventListener("mouseenter", () => {
          gsap.to(arrow, {
            x: 5,
            opacity: 1,
            duration: 0.25,
            ease: "power3.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(arrow, {
            x: 0,
            opacity: 0.35,
            duration: 0.25,
            ease: "power3.out",
          });
        });
      });

      /* ==========================================
         DIVIDER
      ========================================== */

      reveal(
        ".footer-divider",
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 1,
          ease: "expo.out",
        },
        "top 92%"
      );

      /* ==========================================
         META
      ========================================== */

      reveal(
        ".footer-meta",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
        },
        "top 92%"
      );

      /* ==========================================
   SOCIAL LINKS
========================================== */

const socialItems = gsap.utils.toArray<HTMLElement>(
  ".footer-social-item"
);

socialItems.forEach((item, index) => {
  reveal(
    item,
    {
      opacity: 0,
      y: 35,
      scale: 0.75,
      rotate: index % 2 === 0 ? -8 : 8,
      filter: "blur(8px)",
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      duration: 0.8,
      delay: index * 0.08,
      ease: "back.out(1.5)",
    },
    "top 92%"
  );

  const icon = item.querySelector(".footer-social-icon");
  const glow = item.querySelector(".footer-social-glow");

  item.addEventListener("mouseenter", () => {
    gsap.to(item, {
      y: -8,
      scale: 1.08,
      duration: 0.35,
      ease: "expo.out",
    });

    gsap.to(icon, {
      rotate: 8,
      scale: 1.08,
      color: "#fb923c",
      filter:
        "drop-shadow(0 0 12px rgba(249,115,22,0.65))",
      duration: 0.35,
      ease: "power3.out",
    });

    gsap.to(glow, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(item, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "expo.out",
    });

    gsap.to(icon, {
      rotate: 0,
      scale: 1,
      color: "#ff6000",
      filter: "none",
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(glow, {
      opacity: 0,
      scale: 0.75,
      duration: 0.35,
      ease: "power3.out",
    });
  });
});
      /* ==========================================
         CLOSING STATEMENT
         DIFFERENT ANIMATION
      ========================================== */

      reveal(
        ".footer-closing",
        {
          opacity: 0,
          y: 70,
          scale: 0.94,
          filter: "blur(14px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "expo.out",
        },
        "top 90%"
      );

      /* ==========================================
         AMBIENT MOTION
      ========================================== */

      gsap.to(".footer-orb", {
        scale: 1.18,
        opacity: 0.42,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="
        relative
        w-full
        mt-24
        overflow-hidden
        bg-[#0d0d10]
        text-white
        border-t
        border-white/[0.06]
      "
    >
      {/* ==========================================
          AMBIENT GLOW
      ========================================== */}

      <div
        className="
          footer-orb
          absolute
          top-[-180px]
          left-1/2
          -translate-x-1/2
          w-[420px]
          h-[420px]
          rounded-full
          bg-orange-500/[0.07]
          blur-[140px]
          pointer-events-none
        "
      />

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div
        className="
          relative
          max-w-6xl
          mx-auto
          px-6
          md:px-10
          py-12
          md:py-16
        "
      >

        {/* TOP LINE */}
        <div className="relative mb-8 md:mb-10">
          <div className="h-px w-full bg-white/[0.05]" />

          <div
            className="
              footer-top-line
              absolute
              inset-x-0
              top-0
              h-px
              bg-gradient-to-r
              from-orange-500
              via-orange-400/70
              to-transparent
            "
          />
        </div>

        {/* ==========================================
            TOP GRID
        ========================================== */}

        <div className="grid lg:grid-cols-[1.4fr_.6fr] gap-10 lg:gap-16">

          {/* ========================================
              MAIN STATEMENT
          ======================================== */}

          <div>
            <div
              className="
                footer-eyebrow
                flex
                items-center
                gap-3
                mb-5
                text-[9px]
                md:text-[10px]
                uppercase
                tracking-[0.3em]
                text-orange-400
              "
            >
              <span className="w-6 h-px bg-orange-500" />
              {t("eyebrow")}
            </div>

            <div
              className="
                [perspective:1200px]
                overflow-visible
              "
            >
              <h2
                className="
                  footer-title-line-1
                  text-[clamp(2.35rem,6vw,5.8rem)]
                  font-black
                  uppercase
                  leading-[0.84]
                  tracking-[-0.065em]
                  will-change-transform
                "
              >
                {t("titleLine1")}
              </h2>

              <div className="mt-3 md:mt-5 overflow-visible">
                <h2
                  className="
                    footer-title-line-2
                    text-[clamp(2.35rem,6vw,5.8rem)]
                    font-black
                    uppercase
                    leading-[0.84]
                    tracking-[-0.065em]
                    text-orange-500
                    will-change-transform
                  "
                >
                  {t("titleLine2")}
                </h2>
              </div>
            </div>

            <div className="max-w-xl mt-7 md:mt-8">
              <p
                className="
                  footer-description
                  text-xs
                  md:text-sm
                  lg:text-base
                  text-gray-400
                  leading-6
                  md:leading-7
                "
              >
                {t("description")}
              </p>
            </div>
          </div>

          {/* ========================================
              NAV + SERVICES
          ======================================== */}

          <div className="grid grid-cols-2 gap-8 lg:pt-8">

            {/* NAVIGATION */}

            <div>
              <div
                className="
                  mb-4
                  text-[9px]
                  md:text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-gray-500
                "
              >
                {t("navigationTitle")}
              </div>

              <nav className="space-y-3">

                {[
                  ["home", "#home"],
                  ["about", "#about"],
                  ["skills", "#skills"],
                  ["services", "#services"],
                  ["projects", "#projects"],
                  ["contact", "#contact"],
                ].map(([key, href]) => (
                  <a
                    key={key}
                    href={href}
                    className="
                      footer-nav-item
                      flex
                      items-center
                      justify-between
                      gap-3
                      w-full
                      text-xs
                      md:text-sm
                      text-gray-400
                      group
                    "
                  >
                    <span>
                      {t(`nav.${key}`)}
                    </span>

                    <span
                      className="
                        footer-nav-arrow
                        opacity-35
                        text-orange-500
                      "
                    >
                      →
                    </span>
                  </a>
                ))}

              </nav>
            </div>

            {/* SERVICES */}

            <div>
              <div
                className="
                  mb-4
                  text-[9px]
                  md:text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-gray-500
                "
              >
                {t("servicesTitle")}
              </div>

              <div className="space-y-4">

                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="
                      footer-service-item
                      relative
                      w-fit
                      cursor-default
                    "
                  >
                    <span
                      className="
                        footer-service-text
                        text-xs
                        md:text-sm
                        text-gray-400
                        block
                      "
                    >
                      {t(`service${item}`)}
                    </span>

                    <span
                      className="
                        footer-service-line
                        absolute
                        left-0
                        bottom-[-4px]
                        w-0
                        h-px
                        bg-orange-500
                      "
                    />
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            DIVIDER
        ========================================== */}

        <div className="relative mt-12 md:mt-16">
          <div className="h-px w-full bg-white/[0.06]" />

          <div
            className="
              footer-divider
              absolute
              inset-x-0
              top-0
              h-px
              bg-gradient-to-r
              from-orange-500/70
              via-orange-400/30
              to-transparent
            "
          />
        </div>

        {/* ==========================================
            META
        ========================================== */}

        <div
          className="
            footer-meta
            mt-5
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-3
            text-[8px]
            md:text-[10px]
            uppercase
            tracking-[0.18em]
          "
        >
          <span className="text-gray-500">
            {t("stack")}
          </span>

          <span className="text-gray-600">
            {t("signature")}
          </span>
        </div>

        {/* ==========================================
    SOCIAL LINKS
========================================== */}

<div className="mt-14 md:mt-18">
  <div
    className="
      mb-6
      text-[9px]
      md:text-[10px]
      uppercase
      tracking-[0.28em]
      text-gray-500
    "
  >
    SOCIALS
  </div>

  <div
    className="
      flex
      items-center
      justify-between
      w-full
      max-w-3xl
      mx-auto
      px-2
      sm:px-6
      md:px-0
    "
  >
    {icons.map((item, index) => (
      <a
        key={index}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Social link ${index + 1}`}
        className="
          footer-social-item
          relative
          group
          flex
          items-center
          justify-center
          w-16
          h-16
          sm:w-18
          sm:h-18
          md:w-20
          md:h-20
          will-change-transform
        "
      >
        {/* Glow */}
        <span
          className="
            footer-social-glow
            absolute
            inset-0
            rounded-full
            bg-orange-500/10
            blur-xl
            opacity-0
            scale-75
            pointer-events-none
          "
        />

        {/* Outer Ring */}
        <span
          className="
            absolute
            inset-0
            rounded-full
            border
            border-orange-500/10
            transition-colors
            duration-300
            group-hover:border-orange-500/40
          "
        />

        {/* Inner Ring */}
        <span
          className="
            absolute
            inset-[6px]
            rounded-full
            border
            border-white/[0.04]
            group-hover:border-orange-400/20
            transition-colors
            duration-300
          "
        />

        {/* Icon */}
        <FontAwesomeIcon
          icon={item.icon}
          className="
            footer-social-icon
            relative
            z-10
            text-[2rem]
            sm:text-[2.2rem]
            md:text-[2.6rem]
            text-orange-500
            will-change-transform
          "
        />

        {/* Hover Dot */}
        <span
          className="
            absolute
            -top-1
            right-1
            w-2
            h-2
            rounded-full
            bg-orange-500
            opacity-0
            scale-0
            group-hover:opacity-100
            group-hover:scale-100
            transition-all
            duration-300
            shadow-[0_0_10px_rgba(249,115,22,0.8)]
          "
        />
      </a>
    ))}
  </div>
</div>

        {/* ==========================================
            CLOSING
        ========================================== */}

        <div className="mt-12 md:mt-16 overflow-visible">
          <p
            className="
              footer-closing
              max-w-3xl
              text-[clamp(1.2rem,2.5vw,2rem)]
              font-medium
              tracking-[-0.03em]
              leading-tight
              text-gray-300
            "
          >
            {t("closing")}
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
