"use client";
import React, { useLayoutEffect, useRef } from "react";
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
  const textLinesRef = useRef<HTMLParagraphElement[]>([]);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const titleTriggerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
  const title = titleTriggerRef.current;
  const imageContainer = imgContainerRef.current;
  const image = imgRef.current;

  if (!title || !imageContainer || !image) return;

  const isMobile = window.matchMedia("(max-width: 1023px)").matches;


  const ctx = gsap.context(() => {
    const textLines = textLinesRef.current.filter(Boolean);

    // مهم:
    // نجيب الكروت من داخل الـ component نفسه
    // بدل selector عام على الصفحة
    const cards = gsap.utils.toArray<HTMLElement>(
      ".stat-card",
      sectionRef.current!
    );

    // ==========================================
    // INITIAL STATES
    // ==========================================

    // TEXT
    gsap.set(textLines, {
      yPercent: 105,
    });

    // IMAGE CONTAINER
    //
    // opacity: 0
    // حتى الصورة لا تظهر نهائيًا قبل بداية animation
    //
    // scale صغير لكن ليس صغيرًا جدًا
    // حتى لا تصبح الحركة مبالغ فيها
    gsap.set(imageContainer, {
  opacity: 0,
  scale: 0.88,

  clipPath:
    "polygon(" +
    "0% 100%, " +
    "18% 82%, " +
    "36% 100%, " +
    "54% 82%, " +
    "72% 100%, " +
    "100% 78%, " +
    "100% 100%, " +
    "0% 100%" +
    ")",

  transformOrigin: "50% 100%",
  transformPerspective: 1200,
});

    // IMAGE INSIDE
    gsap.set(image, {
  scale: 1.18,
  yPercent: 8,
  transformOrigin: "50% 100%",
});

    // CARDS
    gsap.set(cards, {
      opacity: 0,
      y: 35,
      scale: 0.96,
    });

    // ==========================================
    // MAIN TIMELINE
    // ==========================================

    const tl = gsap.timeline({
      defaults: {
        overwrite: "auto",
      },

      scrollTrigger: {
        // استخدم الـ content نفسه بدل العنوان
        trigger: sectionRef.current,

        // يبدأ أسرع بكثير
        start: "top 72%",

        once: true,

        invalidateOnRefresh: true,
      },
    });

    // ==========================================
    // 1 — TEXT
    // ==========================================

    tl.to(textLines, {
      yPercent: 0,
      duration: 0.85,
      stagger: 0.12,
      ease: "power4.out",
    });

    // ==========================================
// 2 — IMAGE
// ==========================================

const imageReveal = () => {
  tl.to(
    imageContainer,
    {
      opacity: 1,
      scale: 1,

      clipPath:
        "polygon(" +
        "0% 0%, " +
        "100% 0%, " +
        "100% 100%, " +
        "0% 100%" +
        ")",

      duration: 0.95,
      ease: "power4.out",
    },
    "+=0.12"
  );

  tl.to(
    image,
    {
      scale: 1,
      yPercent: 0,
      duration: 0.95,
      ease: "power3.out",
    },
    "<"
  );
};

if (!isMobile) {
  imageReveal();
}

if (isMobile) {
  gsap.to(imageContainer, {
    opacity: 1,
    scale: 1,

    clipPath:
      "polygon(" +
      "0% 0%, " +
      "100% 0%, " +
      "100% 100%, " +
      "0% 100%" +
      ")",

    duration: 0.95,
    ease: "power4.out",

    scrollTrigger: {
      trigger: imageContainer,
      start: "top 78%",
      once: true,
      invalidateOnRefresh: true,
    },
  });

  gsap.to(image, {
    scale: 1,
    yPercent: 0,
    duration: 0.95,
    ease: "power3.out",

    scrollTrigger: {
      trigger: imageContainer,
      start: "top 78%",
      once: true,
      invalidateOnRefresh: true,
    },
  });
}
    // ==========================================
    // 3 — CARDS
    // ==========================================
    //
    // مهم جدًا:
    // هنا الكروت تبدأ بعد انتهاء الصورة فعلًا
    //

    if (!isMobile) {
  // ==========================================
  // DESKTOP — نفس الترتيب القديم
  // ==========================================

  tl.to(
    cards,
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.55,
      stagger: 0.09,
      ease: "back.out(1.35)",
    },
    "+=0.08"
  );
}


if (isMobile) {
  gsap.to(cards, {
    opacity: 1,
    y: 0,
    scale: 1,

    duration: 0.55,
    stagger: 0.09,
  ease: "back.out(1.35)",

    scrollTrigger: {
      trigger: cards[0],
      start: "top 85%",
      once: true,
      invalidateOnRefresh: true,
    },
  });
}


    // ==========================================
    // 4 — IMAGE FLOAT
    // ==========================================

    const floatingTween = gsap.to(imageContainer, {
      y: 7,
      rotation: 0.25,
      duration: 3.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: true,
    });

    // يبدأ فقط بعد انتهاء الـ cards
    tl.call(() => {
      floatingTween.play();
    });

    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {
      floatingTween.kill();
    };
  }, sectionRef);

  return () => {
    ctx.revert();
  };
}, []);
  return (
    <main

      id="about"
      className="w-full px-6 sm:px-10 md:px-15 py-20 text-white"
    >
      {/* Title */}
      <div
        ref={titleTriggerRef}
        className="w-full flex justify-center mb-3 relative"
      >
        <AnimatedTitle
          title={t("title")}
          className="text-orange-400"
        />
      </div>

      {/* Content */}
      {/* Content */}
      <div
  ref={sectionRef}
  className="relative flex flex-col lg:flex-row items-center justify-between gap-24 max-w-7xl mx-auto"
>

        {/* Glow */}
        <div
          className="
absolute
right-0
top-1/2
-translate-y-1/2
w-[550px]
h-[550px]
bg-orange-500/15
blur-[120px]
rounded-full
pointer-events-none
"
        />

        {/* LEFT */}
        <section
          ref={textRef}
          className="flex-1 max-w-2xl z-20"
        >
          <div className="text-gray-300 leading-relaxed text-lg md:text-xl space-y-6">

            <div className="about-line-mask overflow-hidden">
              <p
                ref={(el) => {
                  if (el) textLinesRef.current[0] = el;
                }}
                className="about-line"
              >
                I am a Front-End Developer specialized in React.js, Next.js and
                modern web technologies, passionate about creating high-performance,
                scalable and visually engaging web applications.
              </p>
            </div>

            <div className="about-line-mask overflow-hidden">
              <p
                ref={(el) => {
                  if (el) textLinesRef.current[1] = el;
                }}
                className="about-line"
              >
                Combining strong technical skills with a background in Italian
                Language Studies, I bring analytical thinking, adaptability and
                effective communication to every team and environment.
              </p>
            </div>

            <div className="about-line-mask overflow-hidden">
              <p
                ref={(el) => {
                  if (el) textLinesRef.current[2] = el;
                }}
                className="about-line"
              >
                My focus is building intuitive user experiences, writing clean
                maintainable code and continuously improving my skills to deliver
                modern digital solutions with real business value.
              </p>
            </div>

          </div>

          {/* Cards */}
          <div
            className="
  grid
  grid-cols-1
  sm:grid-cols-2
  gap-4
  mt-10
  relative
  z-30
  "
          >

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
    origin-center
    rounded-3xl
    w-[280px]
    h-[460px]
    md:w-[320px]
    md:h-[520px]
    lg:-mt-12
    shadow-lg
    will-change-transform
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
          <div className="imageGlow" />
          <Image
            ref={imgRef}
            src={myImg2}
            alt="Yousef Amr"
            fill
            sizes="(max-width:768px) 280px, 320px"
            className="object-cover will-change-transform"
          />
        </section>
      </div>
    </main>
  );
}

export default AboutMe;
