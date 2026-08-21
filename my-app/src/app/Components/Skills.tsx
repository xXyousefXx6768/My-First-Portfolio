"use client";
import React, { useState, useLayoutEffect, useRef } from "react";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaPhp,
  FaLaravel,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiTypescript,
  SiFirebase,
  SiRedux,
  SiVite,
  SiFramer,
  SiZap,
} from "react-icons/si";
import AnimatedTitle from "./custom-sections/AnimatedTitle";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "../lib/i18n-provider";
gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.ReactElement;
  color: string;
  index?: number;
}

const skills: Skill[] = [
    { name: "React JS", icon: <FaReact className="text-sky-400" />, color: "#38bdf8" },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, color: "#facc15" },
    { name: "HTML", icon: <FaHtml5 className="text-orange-500" />, color: "#f97316" },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500" />, color: "#3b82f6" },
    { name: "Tailwind", icon: <SiTailwindcss className="text-sky-500" />, color: "#0ea5e9" },
    { name: "Bootstrap", icon: <FaBootstrap className="text-purple-600" />, color: "#9333ea" },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600" />, color: "#2563eb" },
    { name: "PHP", icon: <FaPhp className="text-indigo-600" />, color: "#4f46e5" },
    { name: "Laravel", icon: <FaLaravel className="text-red-600" />, color: "#dc2626" },
    { name: "Git & GitHub", icon: <FaGithub className="text-gray-700" />, color: "#374151" },
    { name: "GSAP", icon: <SiZap className="text-green-500" />, color: "#22c55e" },
    { name: "Firebase", icon: <SiFirebase className="text-yellow-500" />, color: "#eab308" },
    { name: "Redux", icon: <SiRedux className="text-purple-500" />, color: "#a855f7" },
    { name: "Vite", icon: <SiVite className="text-violet-500" />, color: "#8b5cf6" },
    { name: "Figma", icon: <FaFigma className="text-pink-500" />, color: "#ec4899" },
    { name: "Framer Motion", icon: <SiFramer className="text-fuchsia-600" />, color: "#c026d3" },
]

 const Skills: React.FC = () => {



  const t = useTranslations("skills");
  return (
   <section className="relative py-16 px-6 text-center
 ">

      <div
  className="
  absolute
  left-0
  top-1/2
  -translate-y-1/2
  w-[350px]
  h-[350px]
  bg-orange-500/10
  blur-[140px]
  rounded-full
  pointer-events-none
  "
/>

<div
  className="
  absolute
  right-0
  bottom-0
  w-[250px]
  h-[250px]
  bg-yellow-500/10
  blur-[120px]
  rounded-full
  pointer-events-none
  "
/>

      <AnimatedTitle title={t("title")} className="text-orange-400" />




      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 place-items-center">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Skills;

const SkillCard: React.FC<{ skill: Skill; index: number }> = React.memo(
({
  skill,
  index,
}: {
  skill: Skill;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const glowRef = useRef<HTMLDivElement>(null);

const xTo = useRef<((v:number)=>void)|null>(null);

const yTo = useRef<((v:number)=>void)|null>(null);

  useLayoutEffect(() => {
    if (!cardRef.current || !iconRef.current || !textRef.current) return;
        const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        invalidateOnRefresh:false,
        once:true,
        fastScrollEnd:true
      },
      delay:index*.06, // 🔥 Stagger animation
    });

    tl.fromTo(
      iconRef.current,
      {
       opacity:0,
       scale:.8,
        rotate: -20,
      },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 0.6,
        ease: "power3.out",
      }
    );

    tl.fromTo(
      textRef.current,
      {
        y: 10,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      },
      "-=0.35"
    );
     }, cardRef);

    return () => ctx.revert();
  }, []);


    const handleMouseMove = (
  e: React.MouseEvent<HTMLDivElement>
) => {
  if (!glowRef.current) return;

  const rect = e.currentTarget.getBoundingClientRect();

 const x = e.clientX - rect.left - 48;

const y = e.clientY - rect.top - 48;


xTo.current = gsap.quickTo(glowRef.current,"x",{
duration:.15,
ease:"none"
});

yTo.current = gsap.quickTo(glowRef.current,"y",{
duration:.15,
ease:"none"
});

xTo.current?.(x);

yTo.current?.(y);
};
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={()=>
gsap.to(glowRef.current,{
opacity:.5,
duration:.2
})
}
     onMouseLeave={()=>
gsap.to(glowRef.current,{
opacity:0,
duration:.25
})
}
      className="relative w-40 h-40 backdrop-blur-xl bg-black/40 dark:bg-black/50 border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer will-change-transform transition-transform duration-300 hover:scale-[1.03]"
      style={{ "--glow-color": skill.color } as React.CSSProperties}
    >
    <div
ref={glowRef}
style={{
background:skill.color,
willChange:"transform,opacity"
}}
className="
absolute
w-24
h-24
rounded-full
blur-2xl
pointer-events-none
opacity-0
"
/>

      <div className="absolute inset-0  pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-10" />
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 via-white/5 to-transparent opacity-20 skew-y-[-8deg]" />
      </div>

      <div className="relative flex flex-col items-center space-y-2 z-10">
        <div ref={iconRef} className="text-5xl will-change-transform" style={{ color: skill.color }}>
          {skill.icon}
        </div>
        <p ref={textRef} className="text-sm font-semibold will-change-transform" style={{ color: skill.color }}>
          {skill.name}
        </p>
      </div>
    </div>
  );
});
