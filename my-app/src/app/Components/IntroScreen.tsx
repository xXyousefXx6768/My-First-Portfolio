"use client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoSVG from "./custom-sections/LogoSvg";
import React, {  useLayoutEffect, useRef } from "react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);
interface IntroScreenProps {
  onComplete: () => void;
}

function IntroScreen({ onComplete }: IntroScreenProps) {
  const introRef = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {

  const ctx = gsap.context(() => {
const tl = gsap.timeline({
  paused: true,
  defaults: {
    ease: "power3.out",
  },
});


  const stars1 = gsap.to(".stars-layer",{

y:-120,

duration:20,

repeat:-1,

ease:"none"

});

const stars2 = gsap.to(".stars-layer-2",{

y:-220,

duration:12,

repeat:-1,

ease:"none"

});

 const strokes = gsap.utils.toArray<SVGPathElement>(
  ".logo-wing-stroke,.logo-body-stroke"
);

strokes.forEach((path) => {
  let length = Number(path.dataset.length);

  if (!length) {
    length = path.getTotalLength();

    path.dataset.length = String(length);
  }

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length
  });
});

const fills = gsap.utils.toArray<HTMLElement>(".tito-fill");



gsap.set(
  [
    ".logo-svg",
    ".logo-wing-fill",
    ".logo-body-fill",
  ],
  {
    opacity: 0,
  }
);

gsap.set(".logo-svg", {
  opacity: 0,
  scale: 1,
});

gsap.set(".logo-wing-fill", {
  opacity: 0,
});

gsap.set(".logo-body-fill", {
  opacity: 0,
});

gsap.set(".tito-text", {
  opacity: 1,
  y: 0,
  scale: 1,
  transformOrigin: "50% 50%",
});

gsap.set(".tito-letter", {
  opacity: 0,
  y: 14,
  x: 0,
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  filter: "blur(7px)",
  textShadow: "none",
  transformOrigin: "50% 50%",
});

gsap.set(".tito-fill", {
  opacity: 0,
});

gsap.set(".subtitle", {
  opacity: 0,
  y: 16,
  filter: "blur(7px)",
});

gsap.set(
  [
    ".glitch-red",
    ".glitch-cyan",
    ".glitch-line",
  ],
  {
    opacity: 0,
  }
);

// TITO container
gsap.set(".tito-text", {
  opacity: 1,
  y: 0,
  scale: 1,
  transformOrigin: "50% 50%",
});

// TITO letters
gsap.set(".tito-letter", {
  opacity: 0,
  y: 14,
  x: 0,
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  filter: "blur(7px)",
  textShadow: "none",
  transformOrigin: "50% 50%",
  willChange: "transform, opacity, filter",
});

// TITO fills
gsap.set(".tito-fill", {
  opacity: 0,
});

// ==========================================
// LOGO SHINE — INITIAL STATE
// ==========================================

gsap.set(".logo-svg", {
  filter: `
    brightness(1)
    drop-shadow(0 0 0 rgba(255,120,0,0))
  `,
  willChange: "filter",
});

// =========================================================
// INTRO MASTER TIMELINE
// FAST / CINEMATIC / ZERO DEAD TIME
// =========================================================

// =========================================================
// 01 — LOGO DRAW
// FULL DRAW FIRST — NO PREMATURE REVEAL
// =========================================================

tl.to(".logo-svg", {
  opacity: 1,
  duration: 0.2,
  ease: "power2.out",
});

// ---------------------------------------------------------
// WING DRAW
// ---------------------------------------------------------

tl.to(".logo-wing-stroke", {
  strokeDashoffset: 0,
  duration: 1.15,
  ease: "power2.inOut",
});

// Wing fill ONLY after wing is fully drawn
tl.to(".logo-wing-fill", {
  opacity: 1,
  duration: 0.3,
  ease: "power2.out",
});

// ---------------------------------------------------------
// BODY DRAW
// ---------------------------------------------------------

tl.to(
  ".logo-body-stroke",
  {
    strokeDashoffset: 0,
    duration: 1.35,
    ease: "power2.inOut",
  },
  "-=0.2"
);

// Body fill ONLY after body draw
tl.to(".logo-body-fill", {
  opacity: 1,
  duration: 0.3,
  ease: "power2.out",
});

// =========================================================
// 02 — LOGO SHINE
// ORIGINAL CINEMATIC FEEL
// =========================================================

tl.to(
  ".logo-svg",
  {
    filter: `
      brightness(1.08)
      drop-shadow(0 0 5px rgba(255,120,0,.18))
      drop-shadow(0 0 14px rgba(255,100,0,.08))
    `,
    duration: 0.5,
    ease: "power2.out",
  },
  "-=0.1"
);

tl.to(
  ".logo-svg",
  {
    filter: `
      brightness(1.14)
      drop-shadow(0 0 7px rgba(255,140,20,.25))
      drop-shadow(0 0 18px rgba(255,100,0,.12))
    `,
    duration: 0.7,
    ease: "sine.inOut",
  }
);

tl.to(
  ".logo-svg",
  {
    filter: `
      brightness(1.08)
      drop-shadow(0 0 5px rgba(255,120,0,.18))
      drop-shadow(0 0 14px rgba(255,100,0,.08))
    `,
    duration: 0.7,
    ease: "sine.inOut",
  }
);

// =========================================================
// 03 — TITO MATERIALIZE
// ORIGINAL STYLE / FULL REVEAL
// =========================================================

tl.to(
  ".tito-letter",
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.24,
    stagger: {
      each: 0.075,
      from: "center",
    },
    ease: "expo.out",
  },
  "-=0.08"
);

// =========================================================
// 04 — RGB GLITCH
// =========================================================

tl.to(
  ".tito-letter",
  {
    x: (i) => (i % 2 === 0 ? -7 : 7),
    y: (i) => (i % 2 === 0 ? 2 : -2),
    skewX: (i) => (i % 2 === 0 ? -12 : 12),
    scaleX: (i) => (i % 2 === 0 ? 0.95 : 1.05),

    textShadow: (i) =>
      i % 2 === 0
        ? "-7px 0 rgba(255,0,70,.9), 6px 0 rgba(0,240,255,.65), 0 0 18px rgba(255,120,0,.25)"
        : "7px 0 rgba(0,240,255,.9), -6px 0 rgba(255,0,70,.65), 0 0 18px rgba(255,120,0,.25)",

    duration: 0.085,

    stagger: {
      each: 0.02,
      from: "center",
    },

    ease: "none",
  },
  "-=0.1"
);

// ---------------------------------------------------------
// GLITCH SETTLE
// ---------------------------------------------------------

tl.to(".tito-letter", {
  x: 0,
  y: 0,
  skewX: 0,
  scaleX: 1,
  textShadow: "none",
  duration: 0.14,
  stagger: {
    each: 0.025,
    from: "center",
  },
  ease: "power3.out",
});

// =========================================================
// 05 — STRONG GLITCH HIT
// =========================================================

tl.set(
  [
    ".glitch-red",
    ".glitch-cyan",
    ".glitch-line",
  ],
  {
    opacity: 1,
  },
  "-=0.03"
);

// Red layer
tl.to(
  ".glitch-red",
  {
    x: -12,
    skewX: -18,
    opacity: 1,
    duration: 0.055,
    ease: "none",
  },
  "<"
);

// Cyan layer
tl.to(
  ".glitch-cyan",
  {
    x: 12,
    skewX: 18,
    opacity: 1,
    duration: 0.055,
    ease: "none",
  },
  "<"
);

// Main text hit
tl.to(
  ".tito-text",
  {
    x: 3,
    skewX: -3,
    duration: 0.055,
    ease: "none",
  },
  "<"
);

// GLITCH SCAN LINES
tl.to(
  ".glitch-line",
  {
    opacity: 1,
    scaleX: 1.25,
    scaleY: 2,
    x: () => gsap.utils.random(-15, 15),
    y: () => gsap.utils.random(-8, 8),
    duration: 0.05,
    stagger: 0,
    ease: "none",
  },
  "<"
);

// =========================================================
// 06 — COLOR SNAP
// =========================================================

tl.set(
  fills,
  {
    opacity: 1,
    color: "#ff6a00",
    clipPath: "inset(0 0% 0 0)",
    filter: "none",
  },
  "<"
);

tl.set(
  ".tito-base",
  {
    opacity: 0,
  },
  "<"
);

// Kill glitch immediately
tl.set(
  [
    ".glitch-red",
    ".glitch-cyan",
    ".glitch-line",
  ],
  {
    opacity: 0,
    x: 0,
    y: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  }
);

// =========================================================
// 07 — SUBTITLE
// ORIGINAL CINEMATIC REVEAL
// =========================================================

tl.fromTo(
  ".subtitle",
  {
    opacity: 0,
    y: 18,
    filter: "blur(8px)",
  },
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.45,
    ease: "power3.out",
  },
  "-=0.02"
);

// =========================================================
// 08 — MICRO SETTLE
// =========================================================

tl.to(
  [".logo-svg", ".tito-text"],
  {
    scale: 0.985,
    duration: 0.12,
    ease: "power2.out",
  }
);

tl.to(
  [".logo-svg", ".tito-text"],
  {
    scale: 1,
    duration: 0.18,
    ease: "power2.out",
  }
);
// =========================================================
// 09 — ENERGY BUILD
// يبدأ فورًا بدون waiting
// =========================================================

tl.to(
  ".logo-glow",
  {
    scale: 1.7,
    opacity: 0.5,
    duration: 0.35,
    ease: "power2.out",
  },
  "<"
);

tl.to(
  ".logo-glow",
  {
    scale: 2.8,
    opacity: 0.8,
    duration: 0.35,
    ease: "power3.in",
  }
);

tl.to(
  ".logo-glow",
  {
    scale: 7,
    opacity: 1,
    duration: 0.3,
    ease: "expo.in",
  }
);

// =========================================================
// 11 — TRANSITION WASH
// يبدأ أثناء الـ burst
// =========================================================

gsap.set(".transition-wash", {
  autoAlpha: 0,
});

gsap.set(".transition-sweep", {
  autoAlpha: 0,
  xPercent: -160,
});

tl.to(
  ".transition-wash",
  {
    autoAlpha: 1,
    duration: 0.12,
    ease: "power1.out",
  },
  "-=0.12"
);

tl.to(
  ".transition-sweep",
  {
    autoAlpha: 1,
    xPercent: 190,
    duration: 0.42,
    ease: "power3.inOut",
  },
  "<"
);

// =========================================================
// 12 — CONTENT EXIT
// =========================================================

tl.to(
  [
    ".logo-svg",
    ".tito-text",
    ".subtitle",
  ],
  {
    opacity: 0,
    scale: 0.985,
    y: -4,
    duration: 0.3,
    ease: "power2.inOut",
  },
  "<+=0.04"
);

// =========================================================
// 13 — CLEAN EXIT
// =========================================================

tl.to(
  ".transition-wash",
  {
    autoAlpha: 0,
    duration: 0.22,
    ease: "power2.out",
  },
  "-=0.08"
);

tl.to(
  ".transition-sweep",
  {
    autoAlpha: 0,
    duration: 0.16,
    ease: "power2.out",
  },
  "-=0.16"
);

// =========================================================
// 14 — REMOVE INTRO
// =========================================================

tl.set(introRef.current, {
  opacity: 0,
  pointerEvents: "none",
});

tl.call(() => {
  gsap.killTweensOf(".stars-layer");
  gsap.killTweensOf(".stars-layer-2");

  onComplete();

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
});

tl.play();
 });
return () => {
    ctx.revert();
};

}, []);

  return (
  <div
    ref={introRef}
    className="
    fixed
    inset-0
    z-[99999]
    overflow-hidden
    bg-[#090909]
    flex
    items-center
    justify-center
    "
  >
    {/* Background */}
    <div className="absolute inset-0 bg-[#090909]" />

    {/* Aurora */}
    <div
      className="
      aurora
      absolute
      inset-0
      opacity-40
      "
    />

    <div className="stars-layer   will-change-transform" />
<div className="stars-layer-2    will-change-transform" />

    {/* Grid */}
    <div
      className="
      absolute
      inset-0
      opacity-[0.03]
      bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)]
      bg-[size:60px_60px]
      "
    />

    {/* Glow */}
    <div
      className="
      logo-glow
      will-change-transform
      absolute
      w-[350px]
      h-[350px]
      rounded-full
      bg-orange-500/15
      blur-[90px]
      "
    />

    {/* Center Content */}
    <div className="relative z-20 flex flex-col items-center">

    <div className="relative">

  <LogoSVG
    className="
      logo-svg
      will-change-transform
      w-[150px]
      md:w-[220px]
    "
  />



</div>

     <div
  className="
  relative
  inline-block
  mt-8
  [perspective:3000px]
  "
>
  {/* Cinematic Glitch Distortion */}

<div
  className="
    glitch-red
    absolute
    inset-0
    pointer-events-none
    z-20
    opacity-0
    text-7xl
    md:text-[9rem]
    font-black
    tracking-[18px]
    uppercase
    text-red-500
    mix-blend-screen
    will-change-transform
  "
>
  TITO
</div>

<div
  className="
    glitch-cyan
    absolute
    inset-0
    pointer-events-none
    z-20
    opacity-0
    text-7xl
    md:text-[9rem]
    font-black
    tracking-[18px]
    uppercase
    text-cyan-400
    mix-blend-screen
    will-change-transform
  "
>
  TITO
</div>

  <div
  className="
    glitch-line
    absolute
    left-0
    top-1/2
    -translate-y-1/2
    h-[2px]
    w-full
    bg-orange-300
    pointer-events-none
    z-[50]
    opacity-0
    origin-left
    shadow-[0_0_8px_rgba(255,140,40,.8)]
  "
/>

<div
  className="
    glitch-line
    absolute
    left-0
    top-[42%]
    h-[2px]
    w-full
    bg-white/60
    pointer-events-none
    z-[50]
    opacity-0
    origin-left
    shadow-[0_0_10px_rgba(0,240,255,.55)]
  "
/>

<div
  className="
    glitch-line
    absolute
    left-0
    top-[58%]
    h-[2px]
    w-full
    bg-red-500/60
    pointer-events-none
    z-[50]
    opacity-0
    origin-left
    shadow-[0_0_10px_rgba(255,0,70,.55)]
  "
/>
<h1
  className="
    tito-text
    will-change-transform
    opacity-0
    text-7xl
    md:text-[9rem]
    font-black
    tracking-[18px]
    leading-none
    uppercase
    flex
   overflow-visible
  "
>
  {"TITO".split("").map((letter, index) => (
    <span
      key={index}
      className="
        tito-letter
        relative
        inline-block

      "
    >
      {/* Original Letter */}
      <span className="tito-base block">
        {letter}
      </span>

      {/* Internal Color Fill */}
    <span
  className="
    tito-fill
    absolute
    inset-0
    block
    text-orange-500
    pointer-events-none
    will-change-[clip-path]
  "
>
        {letter}
      </span>
    </span>
  ))}
</h1>


</div>
      <p
        className="
        subtitle
        opacity-0
        mt-5
        text-orange-400
        tracking-[6px]
        uppercase
        text-sm
        md:text-base
        "
      >
        Full-stack Developer
      </p>
    </div>

    <div
  className="
  light-sweep
  absolute
  inset-0
  pointer-events-none
  "
/>

{/* LIGHT TRANSITION OVERLAYS (NO CLIP-PATH) */}
<div
  className="
    transition-wash
    absolute
    inset-0
    z-[99990]
    pointer-events-none
    opacity-0
    bg-[radial-gradient(circle_at_50%_45%,rgba(249,115,22,0.28),transparent_55%),linear-gradient(115deg,rgba(249,115,22,0.18),transparent_70%)]
  "
/>

<div
  className="
    transition-sweep
    absolute
    -inset-y-[35%]
    left-[-35%]
    w-[70%]
    rotate-[-12deg]
    z-[99995]
    pointer-events-none
    opacity-0
    mix-blend-screen
    will-change-transform
    bg-[linear-gradient(90deg,transparent,rgba(249,115,22,0.85),rgba(255,255,255,0.75),rgba(249,115,22,0.85),transparent)]
  "
/>

  </div>
);
}

export default IntroScreen;
