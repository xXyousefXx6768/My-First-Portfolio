"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { supabase } from "@/utils/SupaBase/ServerClient";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaReact, FaBootstrap, FaPhp, FaLaravel, FaHtml5 
} from "react-icons/fa";
import {
  SiJavascript, SiFramer, SiTailwindcss, SiCss3, SiZap,
  SiVite, SiFirebase, SiRedux
} from "react-icons/si";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import AnimatedTitle from "./custom sections/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);


interface Project {
  id: number | string;
  name: string;
  desc: string;
  image?: string;
  tech?: string[];
  preview?: string;
  github?: string;
  created_at?: string;
}

const TechIcon: React.FC<{ name: string }> = ({ name }) => {
  const key = name?.toLowerCase() || "";
  const iconProps = "w-4 h-4";

  if (key.includes("react")) return <FaReact className={`text-cyan-400 ${iconProps}`} />;
  if (key.includes("bootstrap")) return <FaBootstrap className={`text-purple-400 ${iconProps}`} />;
  if (key.includes("javascript")) return <SiJavascript className={`text-yellow-300 ${iconProps}`} />;
  if (key.includes("framer")) return <SiFramer className={`text-blue-500 ${iconProps}`} />;
  if (key.includes("css")) return <SiCss3 className={`text-blue-400 ${iconProps}`} />;
  if (key.includes("tailwind")) return <SiTailwindcss className={`text-cyan-300 ${iconProps}`} />;
  if (key.includes("php")) return <FaPhp className={`text-indigo-300 ${iconProps}`} />;
  if (key.includes("laravel")) return <FaLaravel className={`text-red-400 ${iconProps}`} />;
  if (key.includes("gsap")) return <SiZap className={`text-green-400 ${iconProps}`} />;
  if (key.includes("vite")) return <SiVite className={`text-violet-400 ${iconProps}`} />;
  if (key.includes("firebase")) return <SiFirebase className={`text-yellow-400 ${iconProps}`} />;
  if (key.includes("redux")) return <SiRedux className={`text-purple-400 ${iconProps}`} />;
  if (key.includes("html")) return <FaHtml5 className={`text-orange-400 ${iconProps}`} />;

  return <div className="w-3 h-3 rounded-full bg-gray-300" />;
};

export default function MyProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProj, setActiveProj] = useState<Project | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Project card refs index
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  //-----------------------------------
  // 1) FETCH PROJECTS
  //-----------------------------------
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data) setProjects(data as Project[]);
    };

    fetchProjects();
  }, []);

  //-----------------------------------
  // 2) CARD REVEAL ANIMATION
  //-----------------------------------
  useEffect(() => {
    if (!containerRef.current || projects.length === 0) return;

    const cards = containerRef.current.querySelectorAll(".project-card");
    const triggers: ScrollTrigger[] = [];

    gsap.killTweensOf(cards);

    gsap.set(cards, {
      opacity: 0,
      y: 60,
      rotateX: 12,
      scale: 0.96,
      filter: "blur(8px)",
    });

    const anim = gsap.to(cards, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0)",
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
      },
    });

    // store this only trigger
    triggers.push(anim.scrollTrigger!);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [projects]);

  //-----------------------------------
  // 3) OPEN MODAL
  //-----------------------------------
  const openProj = (proj: Project) => {
    const card = cardRefs.current[proj.id];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    setOriginRect(rect);
    setActiveProj(proj);

    setTimeout(() => {
      const modal = modalRef.current;
      if (!modal) return;

      gsap.set(modal, {
        position: "fixed",
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        opacity: 0,
        borderRadius: "20px",
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(
        ".backdrop-awww",
        {
          opacity: 1,
          backdropFilter: "blur(8px)",
          duration: 0.45,
        },
        0
      );

      tl.to(
        modal,
        {
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          width: "90vw",
          maxWidth: "900px",
          height: "auto",
          borderRadius: "28px",
          opacity: 1,
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          duration: 0.75,
        },
        0
      );

      tl.to(modal, { scale: 1.03, duration: 0.15 })
        .to(modal, { scale: 1, duration: 0.15 });

      tl.from(
        modal.querySelectorAll("img, h3, p, a, button"),
        {
          opacity: 0,
          y: 20,
          filter: "blur(6px)",
          duration: 0.45,
          stagger: 0.08,
        },
        "-=0.4"
      );
    }, 30);
  };

  
  const closeModal = () => {
    if (!modalRef.current || !originRect) {
      return setActiveProj(null);
    }

    const modal = modalRef.current;

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => setActiveProj(null),
    });

    tl.to(".backdrop-awww", {
      opacity: 0,
      backdropFilter: "blur(0px)",
      duration: 0.3,
    });

    tl.to(modal, {
      top: originRect.top,
      left: originRect.left,
      xPercent: 0,
      yPercent: 0,
      width: originRect.width,
      height: originRect.height,
      opacity: 0,
      duration: 0.55,
      borderRadius: "20px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    });
  };

    const renderTech = (tech: string[] = []) => (
    <div className="flex flex-wrap gap-2 mb-4">
      {tech.map((t, i) => (
        <span
          key={i}
          className="flex items-center gap-2 px-3 py-1 text-xs bg-white/5 border border-white/10 text-orange-300 rounded-full backdrop-blur-sm"
        >
          <TechIcon name={t} />
          <span className="select-none">{t}</span>
        </span>
      ))}
    </div>
  );

 
  return (
    <main ref={containerRef} className="w-full px-6 md:px-16 py-20 text-white">
      <AnimatedTitle title="My Projects" className="text-orange-400" />

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj) => (
          <article
            key={proj.id}
           ref={(el: HTMLElement | null) => {
  cardRefs.current[String(proj.id)] = el;
}}     
            className="project-card p-5 rounded-2xl bg-[#0f0f0f]/60 backdrop-blur-xl border border-white/10 shadow-[0_6px_25px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_35px_rgba(255,120,50,0.20)] hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          >
            {proj.image && (
              <img
                src={proj.image}
                alt={proj.name}
                className="rounded-xl mb-3 align-middle w-full h-44 object-cover shadow-lg shadow-black/40"
              />
            )}

            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent mb-2">
              {proj.name}
            </h3>

            <p className="text-gray-300 text-sm line-clamp-3 mb-3">
              {proj.desc}
            </p>

            {proj.tech && renderTech(proj.tech)}

            <div className="flex gap-3 mt-3">
              {proj.preview && (
                <a
                  href={proj.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-300 hover:text-orange-400"
                >
                  <FiExternalLink className="w-5 h-5" />
                </a>
              )}

              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
                
              )}
              
            </div>
            <button
              onClick={() => openProj(proj)}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-black/40 text-white border border-white/20 rounded-xl hover:bg-black/60 transition cursor-pointer"
            >
              Read More
              <FiExternalLink className="w-4 h-4" />
            </button>
          </article>
        ))}
      </div>

      {/* MODAL */}
      {activeProj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-awww opacity-0 pointer-events-auto"
            onClick={closeModal}
          />

          {/* MODAL WINDOW */}
          <div
            ref={modalRef}
            className="relative z-50 bg-white/6 border border-white/10 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-6 opacity-0 pointer-events-auto max-w-[95vw]"
            role="dialog"
            aria-modal="true"
            aria-label={activeProj.name}
          >
            <div className="md:w-1/2 w-full rounded-xl flex items-center overflow-hidden">
              {activeProj.image && (
                <img
                  src={activeProj.image}
                  alt={activeProj.name}
                  className="w-full h-80 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-orange-300 mb-3">
                {activeProj.name}
              </h3>

              <p className="text-gray-200 mb-4 leading-relaxed">
                {activeProj.desc}
              </p>

              {activeProj.tech && renderTech(activeProj.tech)}

              <div className="flex gap-4 mt-4 items-center">
                {activeProj.preview && (
                  <a
                    href={activeProj.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600/20 text-orange-300 border border-orange-700/20"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    Live Preview
                  </a>
                )}

                {activeProj.github && (
                  <a
                    href={activeProj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-200 border border-white/8"
                  >
                    <FiGithub className="w-4 h-4" />
                    GitHub
                  </a>
                )}

                <button
                  onClick={closeModal}
                  className="ml-auto px-4 py-2 bg-orange-600 rounded-lg hover:bg-orange-500 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
