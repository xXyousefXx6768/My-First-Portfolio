"use client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Image from "next/image";
import LogoSVG from "./custom-sections/LogoSvg";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface IntroScreenProps {
  onComplete: () => void;
}

function IntroScreen({ onComplete }: IntroScreenProps) {
  const introRef = useRef<HTMLDivElement>(null);


useEffect(() => {
  const tl = gsap.timeline();

 const strokes =
document.querySelectorAll<SVGPathElement>(
".logo-wing-stroke,.logo-body-stroke"
);

strokes.forEach((path) => {
  const length = path.getTotalLength();

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
    opacity: 1,
  });
});

gsap.set(".logo-wing-fill",{
  opacity:0,
});

gsap.set(".logo-body-fill",{
  opacity:0,
});

  gsap.set(".logo-wing", {
  opacity: 0,
  y: -30,
});

gsap.set(".logo-body", {
  opacity: 0,
  y: 40,
});

tl.to(".logo-wing", {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "expo.out",
});

tl.to(
  ".logo-body",
  {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "expo.out",
  },
  "-=0.5"
);

tl.to(".logo-svg",{
  opacity:1,
  duration:.01
});

tl.to(".logo-wing-stroke",{
  strokeDashoffset:0,
  duration:1.4,
  ease:"power3.out"
});

tl.to(".logo-wing-fill",{
  opacity:1,
  duration:.4,
},"-=.2");

tl.to(".logo-wing-stroke",{
  opacity:0,
  duration:.3
});

tl.to(".logo-body-stroke",{
  strokeDashoffset:0,
  duration:1.7,
  ease:"power3.out"
});

tl.to(".logo-body-fill",{
  opacity:1,
  duration:.5,
},"-=.2");

tl.to(".logo-body-stroke",{
  opacity:0,
  duration:.3
});
tl.from(".logo-glow",{
  scale:.3,
  opacity:0,
  duration:1.5,
  ease:"expo.out"
},"-=1");

tl.to(".logo-svg",{
  scale:1.06,
  duration:1,
  yoyo:true,
  repeat:1,
});

tl.to(".tito-text",{
  opacity:1,
  duration:.01
});
tl.to(".tito-text",{
  letterSpacing:"32px",
  duration:1.3
});

tl.from(".tito-letter",{
  scale:.3,
  opacity:0,
  filter:"blur(12px)",
  stagger:.08,
  duration:1.1,
  ease:"expo.out"
});



tl.from(".tito-reflection", {
  opacity: 0,
  y: -20,
  duration: 1,
}, "-=1");

tl.to(".light-sweep",{
  x:"250%",
  duration:1.2,
  ease:"power3.inOut"
});

tl.to(".tito-letter",{
  z:300,
  stagger:0.03,
  duration:1
});

tl.to(".tito-letter",{
  z:500,
  stagger:.04,
  duration:1.2
});

tl.to(".tito-text",{
  scale:8,
  duration:1.8,
  ease:"expo.inOut"
});

tl.to(
  [
    ".logo-img",
    ".tito-text",
    ".tito-reflection"
  ],
  {
    scale:1.1,
    duration:1,
    ease:"power2.out"
  }
);

tl.to(".tito-reflection",{
  opacity:0,
  duration:.8
});

tl.to(".tito-text", {
  textShadow:
    `
    0 0 10px rgba(255,120,0,.5),
    0 0 30px rgba(255,120,0,.4),
    0 0 80px rgba(255,120,0,.25)
    `,
  duration: 1.5,
});

tl.from(
  ".subtitle",
  {
    y: 40,
    opacity: 0,
    duration: 0.8,
  },
  "-=0.6"
);

tl.to(".logo-glow", {
  scale: 1.4,
  duration: 2,
  ease: "power2.out",
}, "-=1");



tl.to(".cinematic-mask",{
  clipPath:
  "ellipse(150% 150% at 50% 50%)",
  duration:1.8,
  ease:"expo.inOut"
});

tl.to(introRef.current,{
  opacity:0,
  duration:.2,
  onComplete:()=>{
    onComplete();

    setTimeout(()=>{
      ScrollTrigger.refresh();
    },300);
  }
});
return () => {
    tl.kill();
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
      absolute
      w-[350px]
      h-[350px]
      rounded-full
      bg-orange-500/20
      blur-[120px]
      "
    />

    {/* Center Content */}
    <div className="relative z-20 flex flex-col items-center">

      <LogoSVG
  className="
  logo-svg
  opacity-0
  w-[150px]
  md:w-[220px]
  "
/>

      <div className="relative mt-8">

  <h1
    className="
    tito-text
    opacity-0
    text-7xl
    md:text-[9rem]
    font-black
    tracking-[18px]
    uppercase
    "
  >
    {"TITO".split("").map((letter, index) => (
      <span
        key={index}
        className="tito-letter inline-block"
      >
        {letter}
      </span>
    ))}
  </h1>

  <h1
    className="
    tito-reflection
    opacity-0
    absolute
    left-0
    right-0
    top-full
    text-7xl
    md:text-[9rem]
    font-black
    tracking-[18px]
    text-white/20
    uppercase
    scale-y-[-1]
    blur-sm
    pointer-events-none
    "
  >
    TITO
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
        Frontend Developer
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

    <div className="cinematic-mask" />
  </div>
);
}

export default IntroScreen;