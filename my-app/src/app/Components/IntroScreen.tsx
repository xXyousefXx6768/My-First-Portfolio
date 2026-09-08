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
// TITO — CINEMATIC MATERIALIZE
// STAGE 01
// ==========================================

// نحتفظ بـ fills لأننا هنستخدمها لاحقًا
const fills = gsap.utils.toArray<HTMLElement>(".tito-fill");

// ------------------------------------------
// INITIAL STATE
// ------------------------------------------

gsap.set(".tito-text", {
  opacity: 1,
  y: 0,
  scale: 1,
  scaleY: 1,
  filter: "none",
  clipPath: "none",
  transformOrigin: "50% 50%",
  willChange: "transform, opacity, filter",
});

gsap.set(".tito-base", {
  opacity: 1,
  color: "#ffffff",
});

gsap.set(fills, {
  opacity: 0,
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
  willChange: "transform, opacity, filter",
});

// ------------------------------------------
// CENTER → OUT MATERIALIZE
// ------------------------------------------

tl.to(".tito-letter", {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
  duration: 0.24,
  stagger: {
    each: 0.075,
    from: "center",
  },
  ease: "expo.out",
});

// ------------------------------------------
// RGB DIGITAL ARRIVAL
// ------------------------------------------

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
  "-=0.12"
);

// ------------------------------------------
// GLITCH SETTLE
// ------------------------------------------

tl.to(".tito-letter", {
  x: 0,
  skewX: 0,
  textShadow: "none",
  duration: 0.14,
  stagger: {
    each: 0.025,
    from: "center",
  },
  ease: "power3.out",
});

// ------------------------------------------
// FINAL WHITE LOCK
// ------------------------------------------

tl.set(".tito-text", {
  opacity: 1,
  y: 0,
  scale: 1,
  filter: "none",
});

tl.set(".tito-base", {
  opacity: 1,
  color: "#ffffff",
});

tl.set(fills, {
  opacity: 0,
});
// ==========================================
// STAGE 2 — CINEMATIC GLITCH + COLOR SNAP
// ==========================================

// تجهيز طبقات الجليتش
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

// ------------------------------
// GLITCH HIT #1 — بداية التشويش
// ------------------------------
tl.to(".glitch-red", {
  opacity: 0.75,
  x: -5,
  skewX: -10,
  duration: 0.045,
  ease: "none",
});

tl.to(".glitch-cyan", {
  opacity: 0.65,
  x: 5,
  skewX: 8,
  duration: 0.045,
  ease: "none",
}, "<");

tl.to(".tito-text", {
  x: 2,
  skewX: -2,
  duration: 0.045,
  ease: "none",
}, "<");


// ------------------------------
// CUT
// ------------------------------
tl.set(
  [
    ".glitch-red",
    ".glitch-cyan",
    ".tito-text",
  ],
  {
    x: 0,
    skewX: 0,
  }
);

tl.set(
  [
    ".glitch-red",
    ".glitch-cyan",
  ],
  {
    opacity: 0,
  }
);


// ------------------------------
// GLITCH HIT #2 — أسرع وأقوى
// ------------------------------
tl.to(".glitch-red", {
  opacity: 1,
  x: -14,
  y: 3,
  skewX: -20,
  scaleX: 1.08,
  duration: 0.04,
  ease: "none",
});

tl.to(".glitch-cyan", {
  opacity: 1,
  x: 14,
  y: -3,
  skewX: 18,
  scaleX: 0.94,
  duration: 0.04,
  ease: "none",
}, "<");

tl.to(".tito-text", {
  x: () => gsap.utils.random(-6, 6),
  y: () => gsap.utils.random(-3, 3),
  skewX: () => gsap.utils.random(-6, 6),
  duration: 0.04,
  ease: "none",
}, "<");



tl.to(
  ".glitch-line",
  {
    opacity: 0.95,
    scaleX: 1.35,
    scaleY: 2.2,
    x: () => gsap.utils.random(-18, 18),
    y: () => gsap.utils.random(-10, 10),
    duration: 0.04,
    ease: "none",
    stagger: 0, // كلهم مع بعض
  },
  "<"
);

// ✅ COLOR SNAP DURING GLITCH (not after)
tl.set(
  fills,
  {
    opacity: 1,
    color: "#ff6a00",
    clipPath: "none",
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
// ------------------------------
// CUT
// ------------------------------
tl.set(
  [
    ".glitch-red",
    ".glitch-cyan",
    ".glitch-line",
  ],
  {
    opacity: 0,
  }
);

tl.set(".tito-text", {
  x: 0,
  skewX: 0,
});


// ==========================================
// COLOR SNAP
// اللون يتغير فجأة أثناء الجليتش
// ==========================================



// ------------------------------
// AFTER-SNAP GLITCH
// ------------------------------
tl.to(".tito-text", {
  x: -3,
  skewX: 3,
  duration: 0.035,
  ease: "none",
});

tl.to(".tito-text", {
  x: 3,
  skewX: -3,
  duration: 0.035,
  ease: "none",
});


// ------------------------------
// GLITCH COLLAPSE
// ------------------------------
tl.to(
  [
    ".glitch-red",
    ".glitch-cyan",
    ".glitch-line",
  ],
  {
    opacity: 0,
    x: 0,
    skewX: 0,
    scaleX: 1,
    duration: 0.07,
    ease: "power2.out",
  }
);

tl.to(".tito-text", {
  x: 0,
  skewX: 0,
  duration: 0.08,
  ease: "power2.out",
});
// ==========================================
// STAGE 3 — CINEMATIC SETTLE
// TITO PRESENCE LOCK
// ==========================================

// بداية الـ settle:
// ضغط بسيط جدًا من غير ما الحروف تتحرك لوحدها
tl.to(".tito-text", {
  scaleX: 0.985,
  scaleY: 0.99,
  y: -1,
  duration: 0.16,
  ease: "power2.out",
});

// ==========================================
// MICRO EXPANSION
// ==========================================

tl.to(".tito-text", {
  scaleX: 1,
  scaleY: 1,
  y: 0,
  duration: 0.28,
  ease: "power2.out",
});

// ==========================================
// CINEMATIC PRESENCE
// ==========================================

tl.to(".tito-text", {
  filter: `
    brightness(1.05)
    drop-shadow(0 0 6px rgba(255,120,0,.10))
    drop-shadow(0 0 18px rgba(255,100,0,.05))
  `,
  duration: 0.22,
  ease: "power2.out",
});

// ==========================================
// LOCK
// ==========================================

tl.to(".tito-text", {
  filter: "none",
  duration: 0.28,
  ease: "power2.inOut",
});

// ==========================================
// STAGE 4 — COLOR CONFIRM
// اللون اتغير بالفعل أثناء الـ GLITCH
// ==========================================

tl.set(fills, {
  opacity: 1,
  color: "#ff6a00",
  clipPath: "inset(0 0% 0 0)",
  filter: "none",
});

tl.set(".tito-base", {
  opacity: 0,
});

// ==========================================
// STAGE 5 — COLOR LOCK + REFLECTION
// ==========================================

// ------------------------------------------
// 01 — ORANGE COLOR LOCK
// ------------------------------------------

// نثبت الـ TITO باللون البرتقالي
// من غير زيادة في الـ glow
tl.set(fills, {
  opacity: 1,
  clipPath: "inset(0 0% 0 0)",
  filter: "none",
});

// ------------------------------------------
// 02 — CLEAN WHITE BASE
// ------------------------------------------

// نخلي الـ base موجود تحته
// عشان اللون يفضل نضيف ومش يحصل flicker
tl.set(".tito-base", {
  opacity: 0,
});

// ------------------------------------------
// 03 — SUBTLE COLOR PRESENCE
// ------------------------------------------

tl.to(".tito-text", {
  filter: `
    brightness(1.06)
    drop-shadow(0 0 6px rgba(255,120,0,.14))
    drop-shadow(0 0 18px rgba(255,100,0,.06))
  `,
  duration: 0.22,
  ease: "power2.out",
});

// ------------------------------------------
// 04 — REFLECTION PREP
// ------------------------------------------

// الـ reflection نفسه مش ظاهر عندك في JSX حاليًا،
// لذلك لا نضيف عنصر وهمي أو نحرّك selector غير موجود.
// المرحلة الحالية تثبت اللون فقط.
tl.set(".tito-text", {
  scaleX: 1,
  scaleY: 1,
  y: 0,
});

// ------------------------------------------
// 05 — COLOR LOCK
// ------------------------------------------

tl.to(".tito-text", {
  filter: `
    brightness(1.03)
    drop-shadow(0 0 4px rgba(255,120,0,.10))
    drop-shadow(0 0 12px rgba(255,100,0,.04))
  `,
  duration: 0.30,
  ease: "sine.inOut",
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

tl.to(".logo-glow", {
  scale: 8,
  opacity: 1,
  duration: 0.35,
  ease: "expo.in",
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
// LIGHT SWEEP TRANSITION (AWWWARDS-LIKE, LIGHTWEIGHT)
// No clip-path. Just opacity + transform.
// ==========================================

gsap.set(".transition-wash", { autoAlpha: 0 });
gsap.set(".transition-sweep", { autoAlpha: 0, xPercent: -160 });

tl.to(
  ".transition-wash",
  {
    autoAlpha: 1,
    duration: 0.18,
    ease: "power1.out",
  },
  "+=0.02"
);

tl.to(
  ".transition-sweep",
  {
    autoAlpha: 1,
    xPercent: 190,
    duration: 0.55,
    ease: "power3.inOut",
  },
  "<"
);

// Pull content slightly back + fade for cinematic handoff
tl.to(
  [".logo-svg", ".tito-text", ".subtitle"],
  {
    opacity: 0,
    scale: 0.985,
    y: -6,
    duration: 0.42,
    ease: "power2.inOut",
  },
  "<+=0.06"
);

// Fade overlays out (reveals the site cleanly)
tl.to(
  ".transition-wash",
  {
    autoAlpha: 0,
    duration: 0.35,
    ease: "power2.inOut",
  },
  "-=0.16"
);

tl.to(
  ".transition-sweep",
  {
    autoAlpha: 0,
    duration: 0.22,
    ease: "power2.out",
  },
  "-=0.20"
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
