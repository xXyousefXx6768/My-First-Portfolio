"use client";
import React, { useState, useEffect, useRef } from "react";
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
gsap.registerPlugin(ScrollTrigger);
interface Skill {
  name: string;
  icon: JSX.Element;
  color: string;
  index?: number

}

 const Skills: React.FC = () => {
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
  ];

  return (
    <section className="py-16 px-6 text-center">
      <div className="absolute top-430 left-50 w-[450px] h-[450px] bg-gradient-to-r from-yellow-500/60 to-orange-500/30 rounded-full blur-[120px] opacity-50"></div>
      <div className="absolute top-500 right-48 w-[450px] h-[450px] bg-gradient-to-r from-yellow-500/60 to-orange-500/30 rounded-full blur-[120px] opacity-50"></div>
      
      
      <AnimatedTitle title="My Skills" className="text-orange-400" />

      

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 place-items-center">
        {skills.map((skill, index) => (
          <SkillCard key ={index} skill={skill} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Skills;

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current || !iconRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
      },
      delay: index * 0.15, // 🔥 Stagger animation
    });

    tl.fromTo(
      iconRef.current,
      {
        scale: 0,
        opacity: 0,
        filter: "blur(6px)",
        rotate: -20,
      },
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
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
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-40 h-40 backdrop-blur-xl bg-black/40 dark:bg-black/50 border border-white/10 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
      style={{ "--glow-color": skill.color } as React.CSSProperties}
    >
      {isHovered && (
        <div
          className="absolute w-24 h-24 rounded-full blur-2xl opacity-50 pointer-events-none transition-transform duration-150"
          style={{
            background: `var(--glow-color)`,
            left: pos.x - 48,
            top: pos.y - 48,
          }}
        />
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-10" />
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 via-white/5 to-transparent opacity-20 skew-y-[-8deg]" />
      </div>

      <div className="relative flex flex-col items-center space-y-2 z-10">
        <div ref={iconRef} className="text-5xl" style={{ color: skill.color }}>
          {skill.icon}
        </div>
        <p ref={textRef} className="text-sm font-semibold" style={{ color: skill.color }}>
          {skill.name}
        </p>
      </div>
    </div>
  );
};
