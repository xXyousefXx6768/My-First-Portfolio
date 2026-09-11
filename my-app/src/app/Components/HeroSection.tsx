"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import myImg from "../assets/my img1.png";
import TextType from "@/components/TextType";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCode } from "@fortawesome/free-solid-svg-icons";
import { faSquareLinkedin, faSquareGithub, faSquareInstagram, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "../lib/i18n-provider";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  startAnimation: boolean;
}

function HeroSection({
  startAnimation,
}: HeroSectionProps) {
  const imgRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");

  useEffect(() => {
  if (!startAnimation) return;

  const imageElement = imgRef.current;
  const textElement = textRef.current;

  if (!imageElement || !textElement) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      delay: 0.3,
    });

    /* =========================
       🎬 UNIQUE IMAGE REVEAL
    ==========================*/

    tl.fromTo(
      imageElement,
      {
        opacity: 0,
        scale: 0,
        rotate: 8,
        filter: "blur(40px)",
        clipPath: "circle(0% at 50% 50%)",
        force3D: true,
      },
      {
        opacity: 1,
        scale: 1.05,
        rotate: -2,
        filter: "blur(10px)",
        clipPath: "circle(150% at 50% 50%)",
        duration: 1.8,
        ease: "expo.out",
        force3D: true,
      }
    )

      // Settle effect
      .to(imageElement, {
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        force3D: true,
      });

    /* =========================
       🎬 TEXT CINEMATIC REVEAL
    ==========================*/

    tl.fromTo(
      textElement,
      {
        opacity: 0,
        y: 40,
        filter: "blur(12px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.4,
      },
      "-=1.4"
    );

    const children = Array.from(textElement.children);

    tl.from(
      children,
      {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
      },
      "-=1"
    );

    /* =========================
       🌊 FLOATING MICRO MOTION
    ==========================*/

    gsap.to(imageElement, {
      y: "+=10",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    /* =========================
       📜 PARALLAX
    ==========================*/

    gsap.to(imageElement, {
      yPercent: -6,
      ease: "none",
      scrollTrigger: {
        trigger: imageElement,
        scrub: true,
      },
    });
  });

  return () => ctx.revert();
}, [startAnimation]);



  useEffect(() => {
  const card = imageCardRef.current;

  if (!card) return;

  const borders = gsap.utils.toArray<HTMLElement>(
    ".hero-hover-border",
    card
  );



  const image = card.querySelector("img") as HTMLImageElement | null;

  if (borders.length !== 4 || !image) return;

  const top = borders[0];
  const bottom = borders[1];
  const left = borders[2];
  const right = borders[3];

  // =========================================================
  // INITIAL STATE
  // =========================================================

  // Horizontal borders
  gsap.set([top, bottom], {
    scaleX: 0,
    scaleY: 1,
    transformOrigin: "left center",
    autoAlpha: 1,
  });

  // Vertical borders
  gsap.set([left, right], {
    scaleX: 1,
    scaleY: 0,
    transformOrigin: "center top",
    autoAlpha: 1,
  });

  // Inner border


  // Image
  gsap.set(image, {
    scale: 1,
    transformOrigin: "center center",
  });

  // =========================================================
// SHOW
// =========================================================

const showBorders = () => {
  gsap.killTweensOf([
    top,
    bottom,
    left,
    right,
    image,
    card,
  ]);

  // IMAGE SCALE
  gsap.to(image, {
    scale: 1.1,
    duration: 0.7,
    ease: "power3.out",
    overwrite: "auto",
  });

  // TOP
  gsap.to(top, {
    scaleX: 1,
    duration: 0.5,
    ease: "expo.out",
    overwrite: "auto",
  });

  // RIGHT
  gsap.to(right, {
    scaleY: 1,
    duration: 0.5,
    delay: 0.08,
    ease: "expo.out",
    overwrite: "auto",
  });

  // BOTTOM
  gsap.to(bottom, {
    scaleX: 1,
    duration: 0.5,
    delay: 0.16,
    ease: "expo.out",
    overwrite: "auto",
  });

  // LEFT
  gsap.to(left, {
    scaleY: 1,
    duration: 0.5,
    delay: 0.24,
    ease: "expo.out",
    overwrite: "auto",
  });
};

// =========================================================
// HIDE
// =========================================================

const hideBorders = () => {
  gsap.killTweensOf([
    top,
    bottom,
    left,
    right,
    image,
  ]);

  // IMAGE
  gsap.to(image, {
    scale: 1,
    duration: 0.6,
    ease: "power3.out",
    overwrite: "auto",
  });

  // LEFT
  gsap.to(left, {
    scaleY: 0,
    duration: 0.35,
    ease: "power3.inOut",
    overwrite: "auto",
  });

  // BOTTOM
  gsap.to(bottom, {
    scaleX: 0,
    duration: 0.35,
    ease: "power3.inOut",
    overwrite: "auto",
  });

  // RIGHT
  gsap.to(right, {
    scaleY: 0,
    duration: 0.35,
    ease: "power3.inOut",
    overwrite: "auto",
  });

  // TOP
  gsap.to(top, {
    scaleX: 0,
    duration: 0.35,
    ease: "power3.inOut",
    overwrite: "auto",
  });
};
  // =========================================================
// 3D TILT
// =========================================================

const handlePointerMove = (e: PointerEvent) => {
  // Desktop mouse only
  if (e.pointerType !== "mouse") return;

  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY =
    ((x / rect.width) - 0.5) * 20;

  const rotateX =
    ((y / rect.height) - 0.5) * -20;

  gsap.to(card, {
    rotateY,
    rotateX,
    duration: 0.35,
    ease: "power2.out",
    transformPerspective: 1200,
    transformStyle: "preserve-3d",
    overwrite: "auto",
  });
};

const resetTilt = () => {
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.55,
    ease: "power3.out",
    overwrite: "auto",
  });
};

// =========================================================
// DESKTOP
// =========================================================

const handlePointerEnter = (e: PointerEvent) => {
  if (e.pointerType === "mouse") {
    showBorders();
  }
};

const handlePointerLeave = (e: PointerEvent) => {
  if (e.pointerType === "mouse") {
    hideBorders();
    resetTilt();
  }
};

// =========================================================
// MOBILE / TOUCH
// =========================================================

const handlePointerDown = (e: PointerEvent) => {
  if (e.pointerType !== "touch") return;

  showBorders();

  // Small cinematic 3D tilt
  gsap.to(card, {
    rotateY: -8,
    rotateX: 4,
    scale: 1.03,
    duration: 0.45,
    ease: "power3.out",
    transformPerspective: 1200,
    transformStyle: "preserve-3d",
    overwrite: "auto",
  });
};

const handlePointerUp = (e: PointerEvent) => {
  if (e.pointerType !== "touch") return;

  // رجوع تدريجي
  gsap.to(card, {
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    duration: 0.65,
    ease: "expo.out",
    overwrite: "auto",
  });

  // خلي الإطار ظاهر لحظة
  gsap.delayedCall(1.5, hideBorders);
};

const handlePointerCancel = (e: PointerEvent) => {
  if (e.pointerType !== "touch") return;

  resetTilt();
  hideBorders();
};
  // =========================================================
  // EVENTS
  // =========================================================

  card.addEventListener(
    "pointerenter",
    handlePointerEnter
  );

  card.addEventListener(
    "pointerleave",
    handlePointerLeave
  );

  card.addEventListener(
    "pointermove",
    handlePointerMove
  );

  card.addEventListener(
    "pointerdown",
    handlePointerDown
  );

  card.addEventListener(
    "pointerup",
    handlePointerUp
  );

  card.addEventListener(
    "pointercancel",
    handlePointerCancel
  );

  // =========================================================
  // CLEANUP
  // =========================================================

  return () => {
    card.removeEventListener(
      "pointerenter",
      handlePointerEnter
    );

    card.removeEventListener(
      "pointerleave",
      handlePointerLeave
    );

    card.removeEventListener(
      "pointermove",
      handlePointerMove
    );

    card.removeEventListener(
      "pointerdown",
      handlePointerDown
    );

    card.removeEventListener(
      "pointerup",
      handlePointerUp
    );

    card.removeEventListener(
      "pointercancel",
      handlePointerCancel
    );

    gsap.killTweensOf([
      top,
      bottom,
      left,
      right,
      image,
      card,
    ]);
  };
}, []);

  const icons = [
    { icon: faSquareLinkedin, link: "https://www.linkedin.com/in/yousef-amr-66873224b", color: "#ff6000" },
    { icon: faSquareGithub, link: "https://github.com/xXyousefXx6768", color: "#ff6000" },
    { icon: faSquareInstagram, link: "https://www.instagram.com/yousef_amr24", color: "#ff6000" },
    { icon: faSquareFacebook, link: "https://www.facebook.com/share/1DMa2oSiss/", color: "#ff6000" },
  ];

  return (
   <section
className="
relative
overflow-visible
flex
flex-col-reverse
lg:flex-row
items-center
justify-between
gap-12
lg:gap-32
xl:gap-44
2xl:gap-56
w-full
max-w-7xl
mx-auto
px-6
md:px-10
py-14
md:py-24
"
>

      {/* Background unchanged */}
      <div
className="
absolute
right-0
top-1/2
-translate-y-1/2
w-[500px]
h-[500px]
bg-orange-500/20
blur-[180px]
rounded-full
pointer-events-none
"
/>

      {/* LEFT TEXT */}
      <div
  ref={textRef}
  className="
flex
flex-col
z-10
text-white
w-full
lg:w-[75%]
text-left
items-start
"
>

        <p className="text-gray-400 text-lg">{t("greeting")}</p>
        <h1
className="
text-4xl
sm:text-5xl
lg:text-6xl
font-bold
text-orange-500
tracking-wide
leading-none
">
  {t("name")}
  </h1>
        <h2  >
          {t("nickname")}
        </h2>

        <TextType
          text={t("roles")}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor
          cursorCharacter="|"
         className="
  text-xl
  sm:text-2xl
  lg:text-3xl
  font-semibold
  text-gray-200
  mt-2
  min-h-[60px]
  w-full
  max-w-[500px]
  whitespace-nowrap
"
        />

        <div className="flex gap-2 mt-2">
          {icons.map((item, index) => (
            <a key={index} href={item.link} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={item.icon} size="2xl" style={{ color: item.color }} />
            </a>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <button
          onClick={() => {
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
           className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] text-white py-2 px-5 rounded">
            {t("hire")}
          </button>

          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/cv.pdf";
              link.download = "Yousef_Amr_CV.pdf";
              link.click();
            }}
            className="border border-gray-500 text-gray-300
            font-semibold py-2 px-5 rounded hover:bg-gray-700 transition"
          >
            {t("download")}
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div
  ref={imgRef}
  className="relative z-10 lg:w-[45%]  flex justify-center"
>
        <div
  ref={imageCardRef}
  className="
  relative
  group
  w-fit
  [perspective:1200px]
"
>

<div
className="
absolute
inset-0
translate-x-4
translate-y-4
rounded-3xl
border
border-orange-500/30
bg-orange-500/5
- z-10
"
/>

          <Image
            src={myImg}
            style={{
  transformStyle: "preserve-3d",
}}
            alt="my img"
            width={300}
            height={300}
            priority
            sizes="(max-width: 768px) 220px, 300px"
          className="
  rounded-3xl
  object-cover
"
          />



        <div
  className="
    hero-inner-border
    absolute
    inset-3
    rounded-[30px]
    border
    border-orange-500/20
  "
/>

          {/* TOP */}
<span
  className="
    hero-hover-border
    absolute
    top-0
    left-0
    w-full
    h-[3px]
    bg-gradient-to-r
    from-orange-500
    to-orange-600
    rounded-full
    origin-left
  "
/>

{/* BOTTOM */}
<span
  className="
    hero-hover-border
    absolute
    bottom-0
    left-0
    w-full
    h-[3px]
    bg-gradient-to-r
    from-orange-500
    to-orange-600
    rounded-full
    origin-left
  "
/>

{/* LEFT */}
<span
  className="
    hero-hover-border
    absolute
    top-0
    left-0
    w-[3px]
    h-full
    bg-gradient-to-b
    from-orange-500
    to-orange-600
    rounded-full
    origin-top
  "
/>

{/* RIGHT */}
<span
  className="
    hero-hover-border
    absolute
    top-0
    right-0
    w-[3px]
    h-full
    bg-gradient-to-b
    from-orange-500
    to-orange-600
    rounded-full
    origin-top
  "
/>


<div
className="
absolute
- left-12
bottom-8
px-4
py-2
rounded-xl
bg-black/60
backdrop-blur-xl
border
border-orange-500/20
text-white
text-sm
font-medium
flex
items-center
gap-2
"
style={{
  transform: "translateZ(60px)"
}}
>
  <FontAwesomeIcon icon={faCode} className="text-orange-500" />
  Full-Stack Engineer
</div>


        </div>
      </div>

    </section>
  );
}

export default HeroSection;
