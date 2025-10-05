"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function NavBar() {
  const navRefs = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    navRefs.current.forEach((el) => {
      const topLetters = el.querySelectorAll(".letter-top") as NodeListOf<HTMLElement>;
      const bottomLetters = el.querySelectorAll(".letter-bottom") as NodeListOf<HTMLElement>;
      const underline = el.querySelector(".underline") as HTMLElement;

      if (!topLetters || !bottomLetters || !underline) return;

      const animateWave = (enter = true) => {
        if (enter) {
          // الكلمة الأساسية تنزل تحت
          gsap.to(topLetters, {
            y: "100%",
            duration: 0.4,
            ease: "power3.inOut",
            stagger: 0.03,
          });

          // النسخة التانية تنزل من فوق (-100% → 0)
          gsap.to(bottomLetters, {
            y: "0%",
            duration: 0.4,
            ease: "power3.inOut",
            stagger: 0.03,
          });

          // الخط يترسم
          gsap.fromTo(
            underline,
            { scaleX: 0 },
            { scaleX: 1, transformOrigin: "left", duration: 0.4, ease: "expo.out" }
          );
        } else {
          // رجّع النسخة الأساسية مكانها
          gsap.to(topLetters, {
            y: "0%",
            duration: 0.4,
            ease: "power3.inOut",
            stagger: 0.03,
          });

          // النسخة التانية تطلع تاني فوق
          gsap.to(bottomLetters, {
            y: "-100%",
            duration: 0.4,
            ease: "power3.inOut",
            stagger: 0.03,
          });

          // الخط يختفي
          gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "expo.in" });
        }
      };

      el.addEventListener("mouseenter", () => animateWave(true));
      el.addEventListener("mouseleave", () => animateWave(false));
    });
  }, []);

  const navItems = ["Home", "About", "Services", "Projects", "Contact"];

  // تقسيم الحروف لنسختين (top + bottom)
  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="relative inline-block overflow-hidden">
        {/* النسخة الأساسية */}
        <span className="letter-top block">{char}</span>
        {/* النسخة اللي هتنزل من فوق */}
        <span className="letter-bottom block absolute top-0 left-0 -translate-y-full">
          {char}
        </span>
      </span>
    ));

  return (
    <nav className="flex flex-row justify-between w-full p-5">
      <div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#FA6E00] to-[#E60026] bg-clip-text text-transparent">
          Yousef
        </h2>
      </div>
      <section className="items-center flex">
        <ul className="flex flex-row items-center justify-between gap-10">
          {navItems.map((item, i) => (
            <li
              key={i}
              ref={(el) => (navRefs.current[i] = el!)}
              className="relative cursor-pointer overflow-hidden"
            >
              <span className="inline-block">{splitText(item)}</span>
              <span className="underline absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 scale-x-0"></span>
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
}

export default NavBar;
