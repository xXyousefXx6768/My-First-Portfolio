"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import Logo from "../assets/Logo.png";
import { useTranslations } from "../lib/i18n-provider";
import { createPortal } from "react-dom";



const NavBar: React.FC = () => {
  const navRefs = useRef<HTMLLIElement[]>([]);
  const t = useTranslations("navbar");
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const langBtnRef = useRef<HTMLButtonElement | null>(null);


  const navItems: string[] = ["home", "about", "services", "projects", "skills"];
  const languages = [
    { code: "en", label: "EN" },
    { code: "de", label: "DE" },
    { code: "ar", label: "AR" },
  ];

  const currentLocale = pathname.split("/")[1] || "en";

  useEffect(() => {
    navRefs.current.forEach((el) => {
      if (!el) return;
      const topLetters = el.querySelectorAll(".letter-top");
      const bottomLetters = el.querySelectorAll(".letter-bottom");
      const underline = el.querySelector(".underline") as HTMLElement;

      const animateWave = (enter = true) => {
        if (enter) {
          gsap.to(topLetters, { y: "100%", duration: 0.4, ease: "power3.inOut", stagger: 0.03 });
          gsap.to(bottomLetters, { y: "0%", duration: 0.4, ease: "power3.inOut", stagger: 0.03 });
          gsap.fromTo(
            underline,
            { scaleX: 0 },
            { scaleX: 1, transformOrigin: "left", duration: 0.4, ease: "expo.out" }
          );
        } else {
          gsap.to(topLetters, { y: "0%", duration: 0.4, ease: "power3.inOut", stagger: 0.03 });
          gsap.to(bottomLetters, { y: "-100%", duration: 0.4, ease: "power3.inOut", stagger: 0.03 });
          gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "expo.in" });
        }
      };

      el.addEventListener("mouseenter", () => animateWave(true));
      el.addEventListener("mouseleave", () => animateWave(false));
    });
  }, []);

  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="relative inline-block overflow-hidden">
        <span className="letter-top block">{char}</span>
        <span className="letter-bottom block absolute top-0 left-0 -translate-y-full">{char}</span>
      </span>
    ));

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <nav className="navbar-container group text-white ">
      <div className="shine-wrapper">
    <div className="navbar-shine"></div>
  </div>
      <div className="logo-container">
        <Image src={Logo} alt="logo" className="object-contain" loading="lazy" />
      </div>
      <ul className="flex flex-row items-center justify-between  gap-10">
        {navItems.map((item, i) => (
          <li
            key={i}
            ref={(el) => (navRefs.current[i] = el!)}
            className="relative cursor-pointer overflow-hidden"
          >
            <span className="inline-block">{splitText(t(item))}</span>
            <span className="underline absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 scale-x-0"></span>
          </li>
        ))}
      </ul>

      <div className="flex items-center  gap-4">
        {/* Language Switcher */}
      <div className="relative">
  <button
  ref={langBtnRef}
  onClick={() => setIsOpen(!isOpen)}
  className="lang-btn"
>
  {currentLocale.toUpperCase()}
</button>


  {isOpen && (
  <ul
  className="lang-menu absolute z-[9999]"
  style={{
    top: "110%",
    left: 0,
    width: langBtnRef.current
      ? `${langBtnRef.current.offsetWidth}px`
      : "auto",
  }}
>

    {languages.map((lang) => (
      <li
        key={lang.code}
        onClick={() => switchLocale(lang.code)}
        className={`lang-item ${currentLocale === lang.code ? "active" : ""}`}
      >
        {lang.label}
      </li>
    ))}
  </ul>
)}


</div>

        {/* Contact Button */}
        <button className="contact-btn">{t("contact")}</button>
      </div>
    </nav>
  );
};

export default NavBar;
