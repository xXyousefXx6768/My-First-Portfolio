"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import Logo from "../assets/Logo.png";
import en from "../assets/united-states.png";
import de from "../assets/germany.png";
import { useTranslations } from "../lib/i18n-provider";
import { createPortal } from "react-dom";
import { Menu } from "lucide-react";
import ResponsiveNavBar from "./ResponsiveSections/ResponsiveNavBar";

const NavBar: React.FC = () => {
  const navRefs = useRef<HTMLLIElement[]>([]);
  const t = useTranslations("navbar");
  const router = useRouter();
  const pathname = usePathname();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const langBtnRef = useRef<HTMLButtonElement | null>(null);

  const navItems = ["home", "about", "services", "projects", "skills"];

  const languages = [
    {
      code: "en",
      label: "EN",
      image: en,
    },
    {
      code: "de",
      label: "DE",
      image: de,
    },
  ];

  const currentLocale = pathname.split("/")[1] || "en";
  const currentLang = languages.find((l) => l.code === currentLocale);

  /* ========= Desktop hover (كما هو) ========= */
  useEffect(() => {
    navRefs.current.forEach((el) => {
      if (!el) return;

      const top = el.querySelectorAll(".letter-top");
      const bottom = el.querySelectorAll(".letter-bottom");
      const underline = el.querySelector(".underline");

      const enter = () => {
        gsap.to(top, { y: "100%", stagger: 0.03, duration: 0.35 });
        gsap.to(bottom, { y: "0%", stagger: 0.03, duration: 0.35 });
        gsap.to(underline, { scaleX: 1, duration: 0.4, ease: "expo.out" });
      };

      const leave = () => {
        gsap.to(top, { y: "0%", stagger: 0.03, duration: 0.35 });
        gsap.to(bottom, { y: "-100%", stagger: 0.03, duration: 0.35 });
        gsap.to(underline, { scaleX: 0, duration: 0.3 });
      };

      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
  }, []);

  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="relative inline-block overflow-hidden">
        <span className="letter-top block">{char}</span>
        <span className="letter-bottom absolute top-0 left-0 block -translate-y-full">
          {char}
        </span>
      </span>
    ));

  const switchLocale = (locale: string) => {
    router.push(pathname.replace(`/${currentLocale}`, `/${locale}`));
    setIsLangOpen(false);
  };

  return (
    <>
      <nav className="navbar-container group text-white">
        {/* Shine */}
        <div className="shine-wrapper">
          <div className="navbar-shine"></div>
        </div>

        {/* Logo */}
        <div className="logo-container">
          <Image src={Logo} alt="logo" priority />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-10">
          {navItems.map((item, i) => (
            <li
              key={item}
              ref={(el) => (navRefs.current[i] = el!)}
              className="relative cursor-pointer overflow-hidden"
            >
              <span className="inline-block">{splitText(t(item))}</span>
              <span className="underline absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 scale-x-0" />
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Language */}
          <button
            ref={langBtnRef}
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="lang-btn flex items-center gap-2"
          >
            <Image src={currentLang!.image} alt="lang" width={18} height={18} />
            {currentLocale.toUpperCase()}
          </button>

          {/* Burger (small only) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Language Dropdown */}
      {isLangOpen &&
        createPortal(
          <ul
            className="lang-menu fixed z-[99999]"
            style={{
              top:
                (langBtnRef.current?.getBoundingClientRect().bottom ?? 0) + 8,
              left: langBtnRef.current?.getBoundingClientRect().left ?? 0,
            }}
          >
            {languages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className="lang-item flex items-center gap-2"
              >
                <Image src={lang.image} alt={lang.code} width={18} height={18} />
                {lang.label}
              </li>
            ))}
          </ul>,
          document.body
        )}

      {/* Responsive Nav (small screens only) */}
      <div className="md:hidden">
        <ResponsiveNavBar
          open={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          navItems={navItems}
        />
      </div>
    </>
  );
};

export default NavBar;
