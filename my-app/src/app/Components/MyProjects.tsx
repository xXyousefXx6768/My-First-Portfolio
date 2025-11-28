"use client";
import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/utils/SupaBase/ServerClient";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function MyProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [activeProj, setActiveProj] = useState<any | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) return console.error(error);
      setProjects(data || []);
    };
    fetchProjects();
  }, []);

  // Card Entrance Animation (Awwwards style)
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".project-card");

    gsap.set(cards, {
      opacity: 0,
      y: 120,
      rotateX: 25,
      scale: 0.85,
      filter: "blur(12px)",
    });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
    });
  }, [projects]);

  // Modal Animation
  useEffect(() => {
    if (activeProj && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.6, y: 100, rotateX: 15, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0)",
          duration: 0.8,
          ease: "power4.out",
        }
      );
    }
  }, [activeProj]);

  return (
    <main ref={containerRef} className="w-full px-8 md:px-16 py-24 text-white">
      <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-12">
        My Projects
      </h2>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="project-card relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 
                     shadow-[0_0_30px_rgba(255,80,0,0.15)]
                     hover:scale-[1.03] hover:-translate-y-2 
                     transition-all duration-300 cursor-pointer group"
          >
            {/* Image */}
            {proj.image && (
              <img
                src={proj.image}
                alt={proj.name}
                className="rounded-xl mb-4 w-full h-48 object-cover"
              />
            )}

            <h3 className="text-2xl font-semibold text-orange-300 mb-3">
              {proj.name}
            </h3>

            {/* Description — 3 lines */}
            <p className="text-gray-300 text-sm line-clamp-3 mb-3">
              {proj.desc}
            </p>

            {/* TECH STACK */}
            {proj.tech && (
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.tech.map((t: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-orange-600/20 text-orange-300 rounded-full border border-orange-700/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Read More */}
            <button
              onClick={() => setActiveProj(proj)}
              className="text-orange-400 hover:text-orange-300 text-sm mt-2"
            >
              Read more →
            </button>
          </div>
        ))}
      </div>

      {/* MODAL — Project Full Details */}
      {activeProj && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 px-4">
          <div
            ref={modalRef}
            className="bg-white/10 border border-white/20 p-8 rounded-3xl w-full max-w-5xl flex gap-8 flex-col md:flex-row"
          >
            {/* Image */}
            <img
              src={activeProj.image}
              alt={activeProj.name}
              className="w-full md:w-1/2 rounded-xl object-cover"
            />

            {/* Right side */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-orange-300 mb-4">
                {activeProj.name}
              </h2>

              <p className="text-gray-200 leading-relaxed mb-4">
                {activeProj.desc}
              </p>

              {/* Links */}
              <div className="flex flex-col gap-2 mt-4">
                {activeProj.preview && (
                  <a
                    href={activeProj.preview}
                    className="text-orange-400 hover:text-orange-300 text-sm"
                    target="_blank"
                  >
                    Live Preview →
                  </a>
                )}
                {activeProj.github && (
                  <a
                    href={activeProj.github}
                    className="text-orange-400 hover:text-orange-300 text-sm"
                    target="_blank"
                  >
                    GitHub Repo →
                  </a>
                )}
              </div>

              {/* Close */}
              <button
                onClick={() => setActiveProj(null)}
                className="mt-6 px-4 py-2 bg-orange-600 rounded-lg hover:bg-orange-500 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MyProjects;
