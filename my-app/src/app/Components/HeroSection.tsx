'use client';
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import myImg from "../assets/my img1.png";
import TextType from "@/components/TextType";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareLinkedin, faSquareGithub, faSquareInstagram, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "../lib/i18n-provider";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");

  useEffect(() => {
    if (!imgRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.3,
      });

      /* =========================
         🎬 UNIQUE IMAGE REVEAL
      ==========================*/

      tl.fromTo(
        imgRef.current,
        {
          opacity: 0,
          scale: 0,
          rotate: 8,
          filter: "blur(40px)",
          clipPath: "circle(0% at 50% 50%)",
        },
        {
          opacity: 1,
          scale: 1.05,
          rotate: -2,
          filter: "blur(10px)",
          clipPath: "circle(150% at 50% 50%)",
          duration: 1.8,
          ease: "expo.out",
        }
      )

      // settle effect
      .to(
        imgRef.current,
        {
          scale: 1,
          rotate: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        }
      );

      /* =========================
         🎬 TEXT CINEMATIC REVEAL
      ==========================*/

      tl.fromTo(
        textRef.current,
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

      const children = Array.from(textRef.current.children);

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

      gsap.to(imgRef.current, {
        y: "+=10",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* =========================
         📜 PARALLAX
      ==========================*/

      gsap.to(imgRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: imgRef.current,
          scrub: true,
        },
      });

    });

    return () => ctx.revert();
  }, []);

  const icons = [
    { icon: faSquareLinkedin, link: "https://www.linkedin.com/in/yousef-amr-66873224b", color: "#ff6000" },
    { icon: faSquareGithub, link: "https://github.com/xXyousefXx6768", color: "#ff6000" },
    { icon: faSquareInstagram, link: "https://www.instagram.com/yousef_amr24", color: "#ff6000" },
    { icon: faSquareFacebook, link: "https://www.facebook.com/share/1DMa2oSiss/", color: "#ff6000" },
  ];

  return (
   <section className="relative overflow-visible flex flex-col-reverse md:flex-row items-center justify-around gap-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-20">

      {/* Background unchanged */}
      <div className="absolute top-30 left-18 w-[450px] h-[450px] bg-gradient-to-r from-yellow-500/60 to-orange-500/30 rounded-full blur-[180px] opacity-10"></div>
      <div className="absolute top-30 right-18 w-[450px] h-[450px] bg-gradient-to-r from-yellow-500/60 to-orange-500/30 rounded-full blur-[120px] opacity-50"></div>
      <div className="light-blob"></div>

      {/* LEFT TEXT */}
      <div ref={textRef} className="flex flex-col z-10 text-white md:w-1/2">

        <p className="text-gray-400 text-lg">{t("greeting")}</p>
        <h1 className="text-5xl font-bold text-orange-500">{t("name")}</h1>
        <h2 className="text-3xl ml-4 font-semibold text-gray-200 mt-2">
          {t("nickname")}
        </h2>

        <TextType
          text={t("roles")}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor
          cursorCharacter="|"
          className="text-3xl font-semibold text-gray-200 mt-2"
        />

        <div className="flex gap-2 mt-6">
          {icons.map((item, index) => (
            <a key={index} href={item.link} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={item.icon} size="2xl" style={{ color: item.color }} />
            </a>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <button className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] text-white py-2 px-5 rounded">
            {t("hire")}
          </button>

          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/cv.pdf";
              link.download = "Yousef_Amr_CV.pdf";
              link.click();
            }}
            className="border border-gray-500 text-gray-300 font-semibold py-2 px-5 rounded hover:bg-gray-700 transition"
          >
            {t("download")}
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div ref={imgRef} className="relative z-10 md:w-1/2 flex justify-center">
        <div className="relative group w-fit">
          <Image
            src={myImg}
            alt="my img"
            width={300}
            height={300}
            priority
            sizes="(max-width: 768px) 220px, 300px"
            className="rounded-3xl object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover borders unchanged */}
          <span className="absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500 group-hover:w-full"></span>
          <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500 group-hover:w-full"></span>
          <span className="absolute top-0 left-0 w-[3px] h-0 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full transition-all duration-500 group-hover:h-full"></span>
          <span className="absolute top-0 right-0 w-[3px] h-0 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full transition-all duration-500 group-hover:h-full"></span>
        </div>
      </div>

    </section>
  );
}

export default HeroSection;