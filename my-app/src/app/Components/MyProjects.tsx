"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { supabase } from "@/utils/SupaBase/ServerClient";
import gsap from "gsap";
import { useParams } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaReact, FaBootstrap, FaPhp, FaLaravel, FaHtml5
} from "react-icons/fa";
import {
  SiJavascript, SiFramer, SiTailwindcss, SiCss3, SiZap,
  SiVite, SiFirebase, SiRedux
} from "react-icons/si";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import AnimatedTitle from "./custom-sections/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);


interface Project {
  id: number | string;
  name: string | Record<string, string>;
  desc: string | Record<string, string>;
  image: string | null;
  tech: string[];
  preview: string | null;
  github: string | null;
  created_at: string;
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
  const [loading, setLoading] = useState(true);
  const [activeProj, setActiveProj] = useState<Project | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectsSectionRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const params = useParams();
const localeParam = params.locale;
  const locale = Array.isArray(localeParam)
    ? localeParam[0] || "en"
    : localeParam || "en";
  // Project card refs index
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  //-----------------------------------
  // 1) FETCH PROJECTS
  //-----------------------------------
  //-----------------------------------
// 1) FETCH PROJECTS
//-----------------------------------
useEffect(() => {
  let mounted = true;

  const fetchProjects = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("projects")
      .select(
        "id, name, desc, image, tech, preview, github, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch projects:", error);

      if (mounted) {
        setProjects([]);
        setLoading(false);
      }

      return;
    }

  if (mounted) {
  setProjects((data as Project[]) ?? []);
  setLoading(false);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}
  };

  fetchProjects();

  return () => {
    mounted = false;
  };
}, []);

  //-----------------------------------
// 2) IMAGE LOADING / LAYOUT REFRESH
//-----------------------------------
//-----------------------------------
// 2) IMAGE LOADING / LAYOUT REFRESH
//-----------------------------------
useEffect(() => {
  if (!projects.length) return;

  const section = containerRef.current;

  if (!section) return;

  const images = section.querySelectorAll("img");

  if (!images.length) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return;
  }

  let loaded = 0;

  const refresh = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  };

  const handleLoad = () => {
    loaded++;

    if (loaded >= images.length) {
      refresh();
    }
  };

  images.forEach((img) => {
    if (img.complete) {
      loaded++;
    } else {
      img.addEventListener("load", handleLoad);
    }
  });

  // لو كل الصور كانت loaded بالفعل
  if (loaded === images.length) {
    refresh();
  }

  return () => {
    images.forEach((img) => {
      img.removeEventListener("load", handleLoad);
    });
  };
}, [projects]);



//-----------------------------------
// 3) CARD REVEAL ANIMATION
//-----------------------------------
useEffect(() => {
  if (!projects.length) return;
  if (!projectsSectionRef.current) return;

  const section = projectsSectionRef.current;

  const ctx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".project-card");

    if (!cards.length) return;

    // --------------------------------
    // INITIAL STATE
    // --------------------------------
    gsap.set(cards, {
      opacity: 0,
      y: 70,
      scale: 0.94,
      rotateX: 8,

      // 🔥 COMPLEX MASK
      clipPath:
        "polygon(" +
        "0% 0%, " +
        "15% 0%, " +
        "8% 20%, " +
        "28% 20%, " +
        "20% 40%, " +
        "40% 40%, " +
        "32% 60%, " +
        "52% 60%, " +
        "44% 80%, " +
        "64% 80%, " +
        "56% 100%, " +
        "0% 100%" +
        ")",

      transformPerspective: 1000,
      transformOrigin: "center bottom",
      force3D: true,
    });

    // --------------------------------
    // CREATE TRIGGER FOR EACH CARD
    // --------------------------------
    cards.forEach((card) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,

        // 🔥 REMOVE MASK
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
          trigger: card,

          // نفس التوقيت القديم بالضبط
          start: "top 84%",

          once: true,

          invalidateOnRefresh: true,

          refreshPriority: 1,
        },
      });
    });

    // --------------------------------
    // FORCE REFRESH AFTER LAYOUT
    // --------------------------------
    const refresh = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    };

    refresh();

    // --------------------------------
    // REFRESH WHEN IMAGES CHANGE LAYOUT
    // --------------------------------
    const images = section.querySelectorAll("img");

    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", refresh);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", refresh);
      });
    };
  }, section);

  return () => {
    ctx.revert();
  };
}, [projects]);
  //-----------------------------------
  // 3) OPEN MODAL
  //-----------------------------------
  const openProj = (proj: Project) => {
  const card = cardRefs.current[String(proj.id)];

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

  const getTranslated = (
  field: string | Record<string, string> | null | undefined,
  locale: string
) => {
  if (!field) return "";

  if (typeof field === "string") {
    return field;
  }

  return field[locale] || field.en || "";
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
    <main

  className="relative w-full px-6 md:px-16 py-20 text-white"
>
      <AnimatedTitle title="My Projects" className="text-orange-400" />

       <div

className="
absolute
left-1/2
top-1/2
-translate-x-1/2
-translate-y-1/2
w-[700px]
h-[700px]
bg-orange-500/10
blur-[220px]
rounded-full
pointer-events-none
"
      />

      {loading && (
  <div

   className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3].map((item) => (
      <div
        key={item}
        className="h-[420px] rounded-2xl bg-white/5 border border-white/10 animate-pulse"
      />
    ))}
  </div>
)}

{!loading && projects.length === 0 && (
  <div className="py-20 text-center text-gray-400">
    No projects available.
  </div>
)}

      {/* GRID */}
      {!loading && projects.length > 0 && (
      <div ref={(el) => {
    containerRef.current = el;
    projectsSectionRef.current = el;
  }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj) => (
          <article
  key={proj.id}
  ref={(el: HTMLElement | null) => {
    cardRefs.current[String(proj.id)] = el;
  }}
  className="
    project-card
    relative
    p-6
    min-h-[470px]
    rounded-2xl
    bg-black/30
    backdrop-blur-xl
    border
    border-white/10
    shadow-[0_6px_25px_rgba(0,0,0,0.35)]
    hover:shadow-[0_12px_35px_rgba(255,120,50,0.20)]
    hover:-translate-y-2
    hover:scale-[1.03]
    transition-transform
    transition-shadow
    duration-300
    cursor-pointer
    overflow-hidden
    before:absolute
    before:inset-0
    before:pointer-events-none
    before:bg-gradient-to-br
    before:from-orange-500/5
    before:to-transparent
    before:rounded-2xl
  "
>
            {proj.image && (
<div className="project-image relative w-full h-52 mb-3 overflow-hidden rounded-xl">
  <Image
  src={proj.image}
  alt={getTranslated(proj.name, locale)}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover shadow-lg shadow-black/40"
  loading="lazy"
  unoptimized
/>
  </div>
)}

            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent mb-2">
             {getTranslated(proj.name, locale)}
            </h3>

            <p className="text-gray-300 text-sm line-clamp-3 mb-3">
              {getTranslated(proj.desc, locale)}
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
              onClick={() => { console.log("BUTTON CLICKED"); openProj(proj); }}
              className="
              relative
              z-10
              mt-4
              flex items-center
              gap-2 px-4 py-2
              bg-black/40 text-white border
              border-white/20 rounded-xl
              hover:bg-black/60 transition cursor-pointer"
            >
              Read More
              <FiExternalLink className="w-4 h-4" />
            </button>
          </article>
              ))}
      </div>
)}


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
            className="relative z-50 bg-white/6 border border-white/10 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-6 opacity-0 pointer-events-auto sm:w-4 max-w-[95vw]"
            role="dialog"
            aria-modal="true"
            aria-label={getTranslated(activeProj.name, locale)}
          >
            <div className="md:w-1/2 w-full rounded-xl flex items-center overflow-hidden">
            {activeProj.image && (
  <div className="relative w-full h-80 rounded-lg overflow-hidden">
    <Image
  src={activeProj.image}
  alt={getTranslated(activeProj.name, locale)}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover rounded-lg"
  loading="eager"
  unoptimized
/>
  </div>
)}
            </div>

            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-orange-300 mb-3">
              {getTranslated(activeProj.name, locale)}
              </h3>

              <p className="text-gray-200 mb-4 leading-relaxed">
               {getTranslated(activeProj.desc, locale)}
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
