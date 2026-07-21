"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Logo from "../assets/Logo.png";
import en from "../assets/united-states.png";
import de from "../assets/germany.png";
import { useTranslations } from "../lib/i18n-provider";
import { createPortal } from "react-dom";
import { Menu } from "lucide-react";
import ResponsiveNavBar from "./ResponsiveSections/ResponsiveNavBar";

gsap.registerPlugin(ScrollToPlugin);

interface NavBarProps {
  startAnimation: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  startAnimation,
}) => {
  const navRefs = useRef<HTMLLIElement[]>([]);
  const navContainerRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  const  navItems = [
  { key: "home", target: "home" },
  { key: "about", target: "about" },
  { key: "services", target: "services" },
  { key: "projects", target: "projects" },
  { key: "skills", target: "skills" },
];

  const t = useTranslations("navbar");
  const router = useRouter();
  const pathname = usePathname();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const langBtnRef = useRef<HTMLButtonElement | null>(null);


  const languages = [
    { code: "en", label: "EN", image: en },
    { code: "de", label: "DE", image: de },
  ];

  const currentLocale = pathname.split("/")[1] || "en";
  const currentLang = languages.find((l) => l.code === currentLocale);

  /* ===============================
     ✅ DESKTOP HOVER (كما هو)
  ===============================*/
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

  /* ===============================
     ✅ NAVBAR ENTRANCE + SCROLL BEHAVIOR
  ===============================*/
  useEffect(() => {
    if (!navContainerRef.current) return;
    if (!startAnimation) return;
 
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.2,
      });

      // Navbar container entrance
      tl.fromTo(
        navContainerRef.current,
        { y: -80, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2 }
      )

      // Logo entrance
      .fromTo(
        logoRef.current,
        { scale: 0.6, opacity: 0, rotate: -10 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1 },
        "-=0.8"
      )

      // Nav items stagger
      .from(
        navRefs.current,
        { y: -20, opacity: 0, stagger: 0.12, duration: 0.8 },
        "-=0.8"
      )

      // Right side
      .fromTo(
        rightRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "-=0.8"
      );
    });

    // ✅ Hide on scroll down / Show on scroll up
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (!navContainerRef.current) return;

      if (currentScroll > lastScroll && currentScroll > 80) {
        // scrolling down
        gsap.to(navContainerRef.current, {
          y: -120,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        // scrolling up
        gsap.to(navContainerRef.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [startAnimation]);

  const splitText = (text: string = "") =>
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

  const scrollToSection = (sectionId: string) => {
  gsap.to(window, {
    duration: 1.5,
    scrollTo: {
      y: `#${sectionId}`,
      offsetY: 120, // ارتفاع الناف بار
    },
    ease: "power4.inOut",
  });
};

  return (
    <>
      <nav
        ref={navContainerRef}
        className="navbar-container group text-white"
      >
        {/* Shine */}
        <div className="shine-wrapper">
          <div className="navbar-shine"></div>
        </div>

        {/* Logo */}
        <div ref={logoRef} className="logo-container">
          <Image src={Logo} alt="logo" priority />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-10">

          {navItems.map((item, i) => (
  <li
    key={item.key}
    ref={(el) => (navRefs.current[i] = el!)}
    onClick={() => scrollToSection(item.target)}
    className="relative cursor-pointer overflow-hidden"
  >
    <span className="inline-block">
      {splitText(t(item.key))}
    </span>

    <span className="underline absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 scale-x-0" />
  </li>
))}
        </ul>

        {/* Right */}
        <div ref={rightRef} className="flex items-center gap-4">
          <button
            ref={langBtnRef}
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="lang-btn flex items-center gap-2"
          >
            <Image src={currentLang!.image} alt="lang" width={18} height={18} />
            {currentLocale.toUpperCase()}
          </button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

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