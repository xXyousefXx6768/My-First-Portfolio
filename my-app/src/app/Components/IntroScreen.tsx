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
    ease: "power2.out",
  }
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

strokes.forEach((path)=>{

let length = Number(path.dataset.length);

if(!length){

length = path.getTotalLength();

path.dataset.length = String(length);

}

gsap.set(path,{
strokeDasharray:length,
strokeDashoffset:length
});

});

gsap.set(
[
".logo-svg",
".logo-wing-fill",
".logo-body-fill",
".tito-text"
],
{
opacity:0
}
);

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

tl.to(".logo-svg",{
  opacity:1,
  scale:1,
  duration:.3
});

tl.to(".logo-wing-stroke",{
  strokeDashoffset:0,
  duration:1.4,
  ease:"power2.inOut"
});

tl.to(".logo-wing-fill",{
  opacity:1,
  duration:.35
},"<70%");

tl.to(".logo-body-stroke",{
  strokeDashoffset:0,
  duration:1.8,
  ease:"power2.inOut"
},"-=.15");

tl.to(".logo-body-fill",{
  opacity:1,
  duration:.4
},"<80%");

// ==========================================
// LOGO CINEMATIC SHINE
// START ONLY AFTER LOGO IS FULLY DRAWN
// ==========================================

// ==========================================
// LOGO — SUBTLE CINEMATIC ILLUMINATION
// START ONLY AFTER LOGO IS FULLY DRAWN
// ==========================================



// Start with a very subtle glow
tl.to(".logo-svg", {
  filter: `
    brightness(1.08)
    drop-shadow(0 0 5px rgba(255,120,0,.18))
    drop-shadow(0 0 14px rgba(255,100,0,.08))
  `,
  duration: 0.5,
  ease: "power2.out",
});

// Gentle cinematic breathing
tl.to(".logo-svg", {
  filter: `
    brightness(1.14)
    drop-shadow(0 0 7px rgba(255,140,20,.25))
    drop-shadow(0 0 18px rgba(255,100,0,.12))
  `,
  duration: 0.7,
  ease: "sine.inOut",
});

// Return slightly
tl.to(".logo-svg", {
  filter: `
    brightness(1.08)
    drop-shadow(0 0 5px rgba(255,120,0,.18))
    drop-shadow(0 0 14px rgba(255,100,0,.08))
  `,
  duration: 0.7,
  ease: "sine.inOut",
});
// ==========================================
// CINEMATIC TITO GLITCH REVEAL
// ==========================================

// ==========================================
// CINEMATIC TITO GLITCH REVEAL
// ==========================================

const letters = gsap.utils.toArray<HTMLElement>(".tito-letter");
const fills = gsap.utils.toArray<HTMLElement>(".tito-fill");


// ==========================================
// TITO — INTERNAL COLOR FILL
// ==========================================

gsap.set(fills, {
  clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
  opacity: 0,
});

gsap.set(
  [".glitch-line", ".glitch-red", ".glitch-cyan"],
  {
    opacity: 0,
    x: 0,
    y: 0,
    scaleX: 0,
    scaleY: 1,
    skewX: 0,
  }
);

// ==========================================
// TITO — CINEMATIC REVEAL INITIAL STATE
// ==========================================

gsap.set(".tito-text", {
  opacity: 0,
  y: 18,
  scale: 0.96,
  scaleY: 0.72,
  filter: "blur(12px)",
  transformOrigin: "50% 50%",
  willChange: "transform, filter, opacity",
});

gsap.set(letters, {
  opacity: 0,
  x: 0,
  y: 8,
  scaleX: 0.92,
  scaleY: 0.85,
  filter: "blur(5px)",
  transformOrigin: "50% 50%",
  willChange: "transform, filter, opacity",
});

// ==========================================
// 1 — CINEMATIC FADE IN
// ==========================================

// ==========================================
// 1 — TITO ENERGY IGNITION
// ==========================================

tl.to(".tito-text", {
  opacity: 0.35,
  y: 10,
  scale: 0.985,
  scaleY: 0.88,
  filter: "blur(6px)",
  duration: 0.12,
  ease: "power2.out",
});

tl.to(".tito-text", {
  opacity: 1,
  y: 0,
  scale: 1,
  scaleY: 1,
  filter: "blur(0px)",
  duration: 0.22,
  ease: "expo.out",
});

// ==========================================
// 3 — LETTERS MATERIALIZE
// ==========================================

tl.to(
  letters,
  {
    opacity: 1,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    filter: "blur(0px)",
    duration: 0.22,
    stagger: {
      each: 0.045,
      from: "random",
    },
    ease: "power3.out",
  },
  "-=0.18"
);

// ==========================================
// 3 — RGB SPLIT
// ==========================================

// الأحمر
tl.to(
  letters,
  {
    x: -5,
    skewX: -8,
    scaleX: 0.94,
    duration: 0.12,
    stagger: {
      each: 0.035,
      from: "random",
    },
    ease: "power4.out",

    onStart: () => {
      letters.forEach((letter) => {
      letter.style.textShadow = `
  -5px 0 0 rgba(255,0,60,.75),
  5px 0 0 rgba(0,220,255,.75),
  0 0 14px rgba(255,120,0,.35)
`;
      });
    },
  }
);

// ==========================================
// 4 — GLITCH SNAP
// ==========================================

tl.to(letters, {
x: 6,
skewX: 7,
scaleX: 1.04,

  duration: 0.11,

  stagger: {
    each: 0.025,
    from: "random",
  },

  ease: "power4.inOut",
});

// ==========================================
// 5 — HORIZONTAL DIGITAL JITTER
// ==========================================

tl.to(letters, {
x: -3,
y: 1,
skewX: -4,

  duration: 0.08,

  stagger: {
    each: 0.018,
    from: "random",
  },

  ease: "none",
});

// ==========================================
// 6 — SECOND RGB HIT
// ==========================================

tl.to(letters, {
  x: 4,
y: -1,
skewX: 5,
scaleX: 0.98,

  duration: 0.09,

  stagger: {
    each: 0.02,
    from: "random",
  },

  ease: "none",
});

// ==========================================
// 7 — GLITCH BREAK
// ==========================================

tl.to(letters, {
  x: 0,
  y: 0,
  skewX: 0,
  scaleX: 1,

  duration: 0.18,

  stagger: {
    each: 0.025,
    from: "random",
  },

  ease: "power4.out",
});

// ==========================================
// 8 — SECONDARY FLICKER
// ==========================================

tl.to(
  ".tito-text",
  {
    opacity: 0.35,
    duration: 0.07,
    ease: "none",
  }
);

tl.to(".tito-text", {
  opacity: 1,
  duration: 0.12,
  ease: "none",
});

tl.to(".tito-text", {
  opacity: 0.55,
  duration: 0.055,
  ease: "none",
});

tl.to(".tito-text", {
  opacity: 1,
  duration: 0.16,
  ease: "power2.out",
});

// ==========================================
// 9 — REMOVE RGB DISTORTION
// ==========================================

tl.to(letters, {
  x: 0,
  y: 0,
  skewX: 0,
  scaleX: 1,

  duration: 0.25,

  stagger: {
    each: 0.025,
    from: "start",
  },

  ease: "expo.out",

  onComplete: () => {
    letters.forEach((letter) => {
      letter.style.textShadow = "none";
    });
  },
});

// ==========================================
// 10 — FINAL CINEMATIC SETTLE
// ==========================================

tl.to(".tito-text", {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)",
  duration: 0.4,
  ease: "expo.out",
});


// ==========================================
// ULTRA FAST CINEMATIC GLITCH
// ==========================================

const glitchLetters = gsap.utils.toArray<HTMLElement>(".tito-letter");

// ------------------------------------------
// INITIAL STATE
// ------------------------------------------

gsap.set(".glitch-line", {
  opacity: 0,
  scaleX: 0,
  scaleY: 1,
  x: 0,
  y: 0,
});

gsap.set(
  [".glitch-red", ".glitch-cyan"],
  {
    opacity: 0,
    x: 0,
    y: 0,
    scaleX: 1,
    skewX: 0,
  }
);

// ==========================================
// GLITCH HIT #1
// ==========================================

// الشريط نفسه شبه invisible
tl.to(
  ".glitch-line",
  {
    opacity: 0.18,
    scaleX: 1.1,
    scaleY: 1.8,
    x: -10,
    duration: 0.035,
    ease: "none",
  },
  "-=0.18"
);

// RGB layers تظهر للحظة
tl.to(
  ".glitch-red",
  {
    opacity: 0.7,
    x: -14,
    skewX: -12,
    scaleX: 1.04,
    duration: 0.035,
    ease: "none",
  },
  "<"
);

tl.to(
  ".glitch-cyan",
  {
    opacity: 0.7,
    x: 14,
    skewX: 12,
    scaleX: 0.96,
    duration: 0.035,
    ease: "none",
  },
  "<"
);

// ==========================================
// HARD SNAP
// ==========================================

tl.to(
  glitchLetters,
  {
    x: (i) => (i % 2 === 0 ? -9 : 9),
    y: (i) => (i % 2 === 0 ? 3 : -3),
    skewX: (i) => (i % 2 === 0 ? -10 : 10),
    scaleX: (i) => (i % 2 === 0 ? 0.91 : 1.09),

    duration: 0.025,

    stagger: {
      each: 0.008,
      from: "random",
    },

    ease: "none",
  },
  "<"
);

// ==========================================
// GLITCH CUT
// ==========================================

tl.set(".glitch-line", {
  opacity: 0,
  scaleX: 0.5,
});

tl.set(
  [".glitch-red", ".glitch-cyan"],
  {
    opacity: 0,
  }
);

// ==========================================
// GLITCH HIT #2
// ==========================================

tl.to(
  glitchLetters,
  {
    x: (i) => (i % 2 === 0 ? 12 : -12),
    y: (i) => (i % 2 === 0 ? -4 : 4),
    skewX: (i) => (i % 2 === 0 ? 14 : -14),
    scaleX: (i) => (i % 2 === 0 ? 1.12 : 0.88),

    duration: 0.028,

    stagger: {
      each: 0.006,
      from: "random",
    },

    ease: "none",
  }
);

// RGB دوبل
tl.to(
  ".glitch-red",
  {
    opacity: 0.8,
    x: -18,
    skewX: -16,
    scaleX: 1.08,
    duration: 0.025,
    ease: "none",
  },
  "<"
);

tl.to(
  ".glitch-cyan",
  {
    opacity: 0.8,
    x: 18,
    skewX: 16,
    scaleX: 0.92,
    duration: 0.025,
    ease: "none",
  },
  "<"
);

// ==========================================
// INSTANT COLLAPSE
// ==========================================

tl.set(
  [".glitch-red", ".glitch-cyan"],
  {
    opacity: 0,
    x: 0,
    skewX: 0,
  }
);

// ==========================================
// FINAL MICRO DISTORTION
// ==========================================

tl.to(
  glitchLetters,
  {
    x: (i) => (i % 2 === 0 ? -4 : 4),
    y: (i) => (i % 2 === 0 ? 1 : -1),
    skewX: (i) => (i % 2 === 0 ? -5 : 5),
    scaleX: (i) => (i % 2 === 0 ? 0.97 : 1.03),

    duration: 0.02,

    stagger: {
      each: 0.004,
      from: "random",
    },

    ease: "none",
  }
);

// ==========================================
// CLEAN SNAP BACK
// ==========================================

tl.to(
  glitchLetters,
  {
    x: 0,
    y: 0,
    scaleX: 1,
    skewX: 0,

    duration: 0.12,

    stagger: {
      each: 0.008,
      from: "random",
    },

    ease: "expo.out",
  }
);

// تأكيد أن كل عناصر الجليتش اختفت
tl.set(
  [".glitch-line", ".glitch-red", ".glitch-cyan"],
  {
    opacity: 0,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    skewX: 0,
  }
);

tl.to(".tito-letter", {
  x: 0,
  y: 0,
  scaleX: 1,
  skewX: 0,

  duration: 0.18,

  stagger: {
    each: 0.018,
    from: "random",
  },

  ease: "expo.out",
});





// ==========================================
// TITO — FINAL EXPANSION
// ==========================================

tl.to(".tito-text", {
  letterSpacing: "32px",
  duration: 0.15,
  force3D: false,
  ease: "power2.out"
});

// ==========================================
// TITO — AWWWARDS LIQUID COLOR PASS
// RICH ORANGE LIQUID FLOW
// ==========================================


// ==========================================
// 03 — ENERGY COLLAPSE
// ==========================================

tl.to(".tito-text", {
  textShadow: `
    0 0 3px rgba(255,170,70,.75),
    0 0 10px rgba(255,120,0,.60),
    0 0 25px rgba(255,90,0,.38),
    0 0 55px rgba(255,60,0,.20)
  `,
  filter: "brightness(1.08)",
  duration: 0.10,
});

// ==========================================
// 04 — CINEMATIC BREATH
// ==========================================

tl.to(".tito-text", {
  textShadow: `
    0 0 5px rgba(255,190,100,.85),
    0 0 15px rgba(255,130,20,.65),
    0 0 35px rgba(255,100,0,.42),
    0 0 75px rgba(255,70,0,.20)
  `,

  filter: "brightness(1.16)",

  duration: 0.20,

  ease: "sine.inOut"
});


// ==========================================
// 05 — FINAL AWWWARDS LOCK
// ==========================================

tl.to(".tito-text", {
  textShadow: `
    0 0 3px rgba(255,150,50,.65),
    0 0 9px rgba(255,110,0,.45),
    0 0 22px rgba(255,80,0,.28),
    0 0 50px rgba(255,50,0,.14)
  `,

  filter: "brightness(1.04)",

  duration: 0.22,

  ease: "power2.out"
});

// ==========================================
// TITO — CINEMATIC GLOW IGNITION
// START IMMEDIATELY AFTER EXPANSION
// ==========================================



tl.to(".tito-text", {
  textShadow: `
    0 0 10px rgba(255,120,0,.45),
    0 0 28px rgba(255,120,0,.30),
    0 0 65px rgba(255,120,0,.16)
  `,
  duration: 0.22,
  ease: "power2.out"
});

// ==========================================
// TITO — GLOW BREATH
// ==========================================

tl.to(".tito-text", {
  textShadow: `
    0 0 16px rgba(255,120,0,.70),
    0 0 42px rgba(255,120,0,.48),
    0 0 95px rgba(255,120,0,.28)
  `,
  filter: "brightness(1.16)",
  duration: 0.14,
});

tl.to(".tito-text", {
 textShadow: `
    0 0 7px rgba(255,120,0,.32),
    0 0 22px rgba(255,120,0,.20),
    0 0 50px rgba(255,120,0,.10)
  `,
  duration: 0.14,
  ease: "sine.inOut"
});

tl.to(".tito-text", {
textShadow: `
    0 0 13px rgba(255,120,0,.58),
    0 0 35px rgba(255,120,0,.38),
    0 0 80px rgba(255,120,0,.20)
  `,
  duration: 0.12,
  ease: "sine.inOut"
});




tl.to(".light-sweep", {
  x: "250%",
  duration: 0.55,
  ease: "power3.inOut"
});

tl.from(
  ".subtitle",
  {
    y: 40,
    opacity: 0,
    duration: 0.8,
    force3D:true
  },
  "-=0.6"
);



tl.to(
[
 ".logo-svg",
 ".tito-text",
 ".tito-reflection"
],
{
 scale:1.1,
 duration:1,
 ease:"power2.out"
}
);

fills.forEach((fill) => {

  // ==========================================
  // TITO — FAST ORANGE LIQUID FILL
  // ==========================================

  gsap.set(fill, {
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
    filter: `
      brightness(1.08)
      saturate(1.35)
      drop-shadow(0 0 6px rgba(255,120,0,.28))
    `,
  });

  // 01 — FAST IGNITION
  tl.to(fill, {
    opacity: 1,
    clipPath: "inset(0 65% 0 0)",
    duration: 0.07,
    ease: "none",
  });

  // 02 — FAST LIQUID FLOW
  tl.to(fill, {
    clipPath: "inset(0 0% 0 0)",
    duration: 0.18,
    ease: "none",
  });

  // 03 — QUICK SETTLE
  tl.to(fill, {
    clipPath: "inset(0 -2% 0 -1%)",
    filter: `
      brightness(1.18)
      saturate(1.45)
      drop-shadow(0 0 9px rgba(255,120,0,.38))
    `,
    duration: 0.04,
    ease: "none",
  });

});


// ==========================================
// TITO — FINAL ORANGE LOCK
// KEEP THE WHOLE WORD ORANGE
// ==========================================

tl.set(fills, {
  opacity: 1,
  clipPath: "inset(0 0% 0 0)",
  filter: `
    brightness(1.08)
    saturate(1.35)
    drop-shadow(0 0 6px rgba(255,120,0,.28))
  `,
});



// ==========================================
// LOGO GLOW — CINEMATIC BREATHING
// ==========================================

tl.to(".logo-glow", {
  scale: 1.25,
  opacity: 0.55,
  duration: 0.65,
  ease: "sine.inOut",
});

tl.to(".logo-glow", {
  scale: 1.05,
  opacity: 0.28,
  duration: 0.55,
  ease: "sine.inOut",
});

tl.to(".logo-glow", {
  scale: 1.4,
  opacity: 0.7,
  duration: 0.8,
  ease: "sine.inOut",
});

tl.to(
[
 ".logo-svg",
 ".tito-text",
 ".tito-reflection",
 ".subtitle"
],
{
 scale:.92,
 opacity:.8,
 duration:.8,
 ease:"power2.out"
}
);

tl.to(".logo-glow",{
 scale:2.2,
 opacity:.9,
 duration:.7,
 ease:"power2.out"
});



// ==========================================
// PHASE 5 — CINEMATIC LANDING
// KEEP CONTENT COMPLETELY STATIC
// ==========================================

// المحتوى يثبت تمامًا قبل بداية الـ mask
tl.set(
  [
    ".logo-svg",
    ".tito-text",
    ".subtitle",
  ],
  {
    y: 0,
    scale: 1,
    opacity: 1,
    filter: "none",
  }
);

// ==========================================
// ORANGE ENERGY BURST
// ==========================================

tl.to(".logo-glow", {
  scale: 3,
  opacity: 0.95,
  duration: 0.25,
  ease: "power4.in",
});

// ==========================================
// FULL SCREEN ORANGE ENERGY
// ==========================================

tl.to(".logo-glow", {
  scale: 8,
  opacity: 1,
  duration: 0.35,
  ease: "expo.in",
});

// ==========================================
// CINEMATIC WAVE MASK
// ==========================================

// Initial state
gsap.set(".cinematic-mask", {
  clipPath: "ellipse(0% 0% at 50% 50%)",
  opacity: 1,
  scale: 1,
  transformOrigin: "50% 50%",
  background: "#ff6500",
});

// ==========================================
// WAVE EXPANSION
// ==========================================

tl.to(".cinematic-mask", {
  clipPath: "ellipse(75% 65% at 50% 50%)",
  duration: 0.35,
  ease: "power3.in",
});
// ==========================================
// FULL SCREEN COVER
// ==========================================

tl.to(".cinematic-mask", {
  clipPath: "ellipse(100% 100% at 50% 50%)",
  duration: 0.35,
  ease: "expo.inOut",
});

// ==========================================
// FINAL OVERFLOW
// ==========================================

tl.to(".cinematic-mask", {
  scale: 1.35,
  duration: 0.25,
  ease: "power4.in",
});
// ==========================================
// ENERGY COLLAPSE
// ==========================================

tl.to(
  ".logo-glow",
  {
    scale: 4,
    opacity: 0,
    duration: 0.8,
    ease: "power4.out",
  },
  "-=0.55"
);

// ==========================================
// INTRO EXIT
// ONLY NOW REMOVE THE INTRO
// ==========================================

tl.set(introRef.current, {
  opacity: 0,
  pointerEvents: "none",
});

tl.call(() => {
  gsap.killTweensOf(".stars-layer");
  gsap.killTweensOf(".stars-layer-2");

  onComplete();

  setTimeout(() => {
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

  <h1
  className="
    tito-text
    will-change-transform
    opacity-0
    text-7xl
    md:text-[9rem]
    font-black
    tracking-[18px]
    uppercase
    flex
  "
>
  {"TITO".split("").map((letter, index) => (
    <span
      key={index}
      className="
        tito-letter
        relative
        inline-block
        overflow-hidden
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
  will-change-[clip-path,filter]
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

    <div className="
    cinematic-mask
    absolute
    inset-0 z-[99990]
    pointer-events-none" />
  </div>
);
}

export default IntroScreen;
