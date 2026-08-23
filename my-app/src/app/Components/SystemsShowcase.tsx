"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SystemsShowcase = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const introRef = useRef<HTMLDivElement | null>(null);
  const websiteRef = useRef<HTMLDivElement | null>(null);
  const webAppRef = useRef<HTMLDivElement | null>(null);
  const systemsRef = useRef<HTMLDivElement | null>(null);
  const crmRef = useRef<HTMLDivElement | null>(null);
  const aiRef = useRef<HTMLDivElement | null>(null);
  const finalRef = useRef<HTMLDivElement | null>(null);

  const systemLinesRef = useRef<HTMLDivElement[]>([]);
  const crmItemsRef = useRef<HTMLDivElement[]>([]);
  const aiNodesRef = useRef<HTMLDivElement[]>([]);

  const usersValueRef = useRef<HTMLParagraphElement | null>(null);
  const leadsValueRef = useRef<HTMLParagraphElement | null>(null);
  const conversionValueRef = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const END_DISTANCE = 1200; // ✅ أقل سكرول: كل “نقلة” تاخد جزء واضح بسرعة

      const systemLines = systemLinesRef.current.filter(Boolean);
      const crmItems = crmItemsRef.current.filter(Boolean);
      const aiNodes = aiNodesRef.current.filter(Boolean);

      gsap.set(frameRef.current, {
        perspective: 1200,
        transformStyle: "preserve-3d",
      });

      gsap.set(
        [
          introRef.current,
          websiteRef.current,
          webAppRef.current,
          systemsRef.current,
          crmRef.current,
          aiRef.current,
          finalRef.current,
          ...systemLines,
          ...crmItems,
          ...aiNodes,
        ],
        {
          force3D: true,
          backfaceVisibility: "hidden",
        }
      );

      const introItems = gsap.utils.toArray<HTMLElement>(
        introRef.current?.querySelectorAll("p,h2") ?? []
      );

      const websiteLabel = websiteRef.current?.querySelector("span") as HTMLElement | null;
      const websiteTitle = websiteRef.current?.querySelector("h3") as HTMLElement | null;
      const websiteRule = websiteRef.current?.querySelector(".mt-5") as HTMLElement | null;

      const webappLabel = webAppRef.current?.querySelector("span") as HTMLElement | null;
      const webappTitle = webAppRef.current?.querySelector("h3") as HTMLElement | null;
      const webappSub = webAppRef.current?.querySelector("p") as HTMLElement | null;

      const systemsTitle = systemsRef.current?.querySelector("h3") as HTMLElement | null;
      const coreText = systemsRef.current?.querySelector("span") as HTMLElement | null;
      const coreEl = (coreText?.parentElement as HTMLElement | null) ?? null;

      const finalItems = gsap.utils.toArray<HTMLElement>(
        finalRef.current?.querySelectorAll("p,h3,span") ?? []
      );

      const setPanelHidden = (el: HTMLElement | null) => {
        if (!el) return;
        gsap.set(el, {
          autoAlpha: 1,
          clipPath: "inset(0 0 100% 0)",
          transformOrigin: "50% 100%",
          z: -420,
          rotateX: 68,
          rotateY: 0,
          yPercent: 10,
        });
        gsap.set(el, { opacity: 1, visibility: "hidden" });
      };

      const setPanelVisible = (el: HTMLElement | null) => {
        if (!el) return;
        gsap.set(el, { visibility: "visible" });
      };

      setPanelHidden(introRef.current);
      setPanelHidden(websiteRef.current);
      setPanelHidden(webAppRef.current);
      setPanelHidden(systemsRef.current);
      setPanelHidden(crmRef.current);
      setPanelHidden(aiRef.current);
      setPanelHidden(finalRef.current);

      gsap.set(introItems, {
        opacity: 1,
        y: 28,
        z: -120,
        rotateX: 85,
        rotateY: -18,
        transformOrigin: "50% 100%",
      });

      if (websiteLabel) gsap.set(websiteLabel, { y: 16, z: -80, rotateX: 70, rotateY: -25 });
      if (websiteTitle) gsap.set(websiteTitle, { y: 18, z: -160, rotateX: 80, rotateY: -35 });
      if (websiteRule) gsap.set(websiteRule, { scaleX: 0, transformOrigin: "50% 50%" });

      if (webappLabel) gsap.set(webappLabel, { y: 16, z: -80, rotateX: 70, rotateY: 25 });
      if (webappTitle) gsap.set(webappTitle, { y: 18, z: -160, rotateX: 80, rotateY: 35 });
      if (webappSub) gsap.set(webappSub, { y: 14, z: -80, rotateX: 65, rotateY: 18 });

      gsap.set(systemLines, {
        opacity: 1,
        scaleX: 0,
        transformOrigin: "0% 50%",
      });

      if (coreEl) {
        gsap.set(coreEl, {
          clipPath: "circle(0% at 50% 50%)",
          scale: 0.85,
          rotateZ: -12,
          z: -80,
        });
      }
      if (systemsTitle) gsap.set(systemsTitle, { y: 24, z: -140, rotateX: 80, rotateY: -25 });

      gsap.set(crmItems, {
        autoAlpha: 0,
        y: 18,
        z: -60,
        rotateX: 25,
        transformOrigin: "50% 100%",
      });

      if (usersValueRef.current) usersValueRef.current.innerText = "0";
      if (leadsValueRef.current) leadsValueRef.current.innerText = "0";
      if (conversionValueRef.current) conversionValueRef.current.innerText = "0%";

      gsap.set(aiNodes, { autoAlpha: 0, scale: 0, z: -80 });

      gsap.set(finalItems, {
        y: 18,
        z: -140,
        rotateX: 85,
        rotateY: 12,
        transformOrigin: "50% 100%",
      });

      // ✅ رجوع للشكل الطبيعي بعد الـ pin
      const clearFullscreen = () => {
        gsap.set(frameRef.current, {
          clearProps: "width,height,maxWidth,maxHeight,borderRadius,borderWidth,borderColor",
        });
        gsap.set(section, { clearProps: "padding,height" });
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${END_DISTANCE}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          // ✅ كل “سكروول/وقفة” يقف على ستيب واضح (مرحلة)
          snap: {
            snapTo: 1 / 6, // 7 مراحل => 6 انتقالات
            duration: { min: 0.12, max: 0.35 },
            delay: 0.02,
            ease: "power1.inOut",
          },

          onLeave: clearFullscreen,
          onLeaveBack: clearFullscreen,

          // ✅ لو رجعت من تحت، ثبّت fullscreen فورًا عشان مفيش فلاش
          onEnterBack: () => {
            gsap.set(section, { padding: 0, height: "100vh" });
            gsap.set(frameRef.current, {
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: 0,
              borderWidth: 0,
            });
          },
        },
      });

      /* ==========================================
         ✅ FULLSCREEN عند بداية الـ pin (طول + عرض)
      ========================================== */
      tl.to(section, { padding: 0, height: "100vh", duration: 0.4, ease: "power2.inOut" }, 0);

      tl.to(
        frameRef.current,
        {
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          borderRadius: 0,
          borderWidth: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(".systems-grid", { opacity: 0.07, duration: 0.14, yoyo: true, repeat: 1, ease: "none" }, 0.05);

      /* ==========================================
         INTRO IN
      ========================================== */
      tl.add(() => setPanelVisible(introRef.current), 0.01);

      tl.to(introRef.current, {
        visibility: "visible",
        clipPath: "inset(0 0 0% 0)",
        z: 0,
        rotateX: 0,
        rotateY: 0,
        yPercent: 0,
        duration: 0.9,
        ease: "expo.out",
      });

      tl.to(
        introItems,
        {
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "expo.out",
        },
        "<+=0.05"
      );

      /* ==========================================
         INTRO → WEBSITES
      ========================================== */
      tl.add(() => setPanelVisible(websiteRef.current), "+=0.12");

      tl.to(
        introItems,
        {
          y: -22,
          z: -220,
          rotateX: -35,
          rotateY: 12,
          duration: 0.55,
          stagger: 0.04,
          ease: "power3.inOut",
        },
        "+=0.05"
      );

      tl.to(
        introRef.current,
        {
          z: -520,
          rotateX: -35,
          rotateY: 10,
          yPercent: -10,
          clipPath: "inset(100% 0 0 0)",
          duration: 0.65,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(introRef.current, { visibility: "hidden" });
          },
        },
        "<"
      );

      tl.to(
        websiteRef.current,
        {
          visibility: "visible",
          clipPath: "inset(0 0 0% 0)",
          z: 0,
          rotateX: 0,
          rotateY: 0,
          yPercent: 0,
          duration: 0.9,
          ease: "expo.out",
        },
        "<+=0.15"
      );

      if (websiteLabel) tl.to(websiteLabel, { y: 0, z: 0, rotateX: 0, rotateY: 0, duration: 0.6, ease: "expo.out" }, "<+=0.08");
      if (websiteTitle) tl.to(websiteTitle, { y: 0, z: 0, rotateX: 0, rotateY: 0, duration: 0.8, ease: "expo.out" }, "<+=0.04");
      if (websiteRule) tl.to(websiteRule, { scaleX: 1, duration: 0.5, ease: "power3.out" }, "<+=0.1");

      /* ==========================================
         WEBSITES → WEB APPS
      ========================================== */
      tl.add(() => setPanelVisible(webAppRef.current), "+=0.08");

      tl.to(
        websiteRef.current,
        {
          z: -560,
          rotateY: -38,
          rotateX: -12,
          yPercent: -6,
          clipPath: "inset(100% 0 0 0)",
          duration: 0.75,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(websiteRef.current, { visibility: "hidden" });
          },
        },
        "+=0.05"
      );

      tl.to(
        webAppRef.current,
        {
          visibility: "visible",
          clipPath: "inset(0 0 0% 0)",
          z: 0,
          rotateX: 0,
          rotateY: 0,
          yPercent: 0,
          duration: 0.9,
          ease: "expo.out",
        },
        "<+=0.18"
      );

      if (webappLabel) tl.to(webappLabel, { y: 0, z: 0, rotateX: 0, rotateY: 0, duration: 0.6, ease: "expo.out" }, "<+=0.06");
      if (webappTitle) tl.to(webappTitle, { y: 0, z: 0, rotateX: 0, rotateY: 0, duration: 0.8, ease: "expo.out" }, "<+=0.04");
      if (webappSub) tl.to(webappSub, { y: 0, z: 0, rotateX: 0, rotateY: 0, duration: 0.65, ease: "expo.out" }, "<+=0.02");

      /* ==========================================
         WEB APPS → SYSTEMS
      ========================================== */
      tl.add(() => setPanelVisible(systemsRef.current), "+=0.08");

      tl.to(
        webAppRef.current,
        {
          z: -560,
          rotateY: 38,
          rotateX: -12,
          yPercent: -8,
          clipPath: "inset(100% 0 0 0)",
          duration: 0.7,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(webAppRef.current, { visibility: "hidden" });
          },
        },
        "+=0.05"
      );

      tl.to(
        systemsRef.current,
        {
          visibility: "visible",
          clipPath: "inset(0 0 0% 0)",
          z: 0,
          rotateX: 0,
          rotateY: 0,
          yPercent: 0,
          duration: 0.95,
          ease: "expo.out",
        },
        "<+=0.18"
      );

      tl.to(systemLines, { scaleX: 1, duration: 0.65, stagger: 0.08, ease: "power3.out" }, "<+=0.05");

      if (coreEl) {
        tl.to(coreEl, { clipPath: "circle(100% at 50% 50%)", scale: 1, rotateZ: 0, z: 0, duration: 0.7, ease: "expo.out" }, "<+=0.1");
      }

      if (systemsTitle) {
        tl.to(systemsTitle, { y: 0, z: 0, rotateX: 0, rotateY: 0, duration: 0.8, ease: "expo.out" }, "<+=0.05");
      }

      tl.to(systemsRef.current, { scale: 1.03, duration: 0.25, ease: "power2.out" });
      tl.to(systemsRef.current, { scale: 1, duration: 0.25, ease: "power2.inOut" });

      /* ==========================================
         SYSTEMS → CRM
      ========================================== */
      tl.add(() => setPanelVisible(crmRef.current), "+=0.06");

      tl.to(
        systemsRef.current,
        {
          z: -620,
          rotateY: -22,
          rotateX: -18,
          yPercent: -8,
          clipPath: "inset(100% 0 0 0)",
          duration: 0.7,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(systemsRef.current, { visibility: "hidden" });
          },
        },
        "+=0.05"
      );

      tl.to(
        crmRef.current,
        {
          visibility: "visible",
          clipPath: "inset(0 0 0% 0)",
          z: 0,
          rotateX: 0,
          rotateY: 0,
          yPercent: 0,
          scale: 1,
          duration: 0.95,
          ease: "expo.out",
        },
        "<+=0.18"
      );

      tl.to(crmItems, { autoAlpha: 1, y: 0, z: 0, rotateX: 0, duration: 0.55, stagger: 0.12, ease: "expo.out" }, "<+=0.05");

      const users = { v: 0 };
      const leads = { v: 0 };
      const conv = { v: 0 };

      tl.to(
        users,
        {
          v: 1248,
          duration: 0.65,
          ease: "expo.out",
          onUpdate: () => {
            if (usersValueRef.current) usersValueRef.current.innerText = Math.round(users.v).toLocaleString();
          },
        },
        "<+=0.05"
      );

      tl.to(
        leads,
        {
          v: 384,
          duration: 0.6,
          ease: "expo.out",
          onUpdate: () => {
            if (leadsValueRef.current) leadsValueRef.current.innerText = Math.round(leads.v).toLocaleString();
          },
        },
        "<"
      );

      tl.to(
        conv,
        {
          v: 92,
          duration: 0.62,
          ease: "expo.out",
          onUpdate: () => {
            if (conversionValueRef.current) conversionValueRef.current.innerText = `${Math.round(conv.v)}%`;
          },
        },
        "<"
      );

      tl.to(crmRef.current, { yPercent: -2, scale: 1.02, duration: 0.22, ease: "power2.out" });
      tl.to(crmRef.current, { yPercent: 0, scale: 1, duration: 0.22, ease: "power2.inOut" });

      /* ==========================================
         CRM → AI
      ========================================== */
      tl.add(() => setPanelVisible(aiRef.current), "+=0.06");

      tl.to(crmRef.current, {
        z: -620,
        rotateY: 22,
        rotateX: -18,
        yPercent: -8,
        clipPath: "inset(100% 0 0 0)",
        duration: 0.7,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(crmRef.current, { visibility: "hidden" });
        },
      });

      tl.to(aiRef.current, { visibility: "visible", clipPath: "inset(0 0 0% 0)", z: 0, rotateX: 0, rotateY: 0, yPercent: 0, scale: 1, duration: 0.95, ease: "expo.out" }, "<+=0.18");

      tl.to(aiNodes, { autoAlpha: 1, scale: 1, z: 0, duration: 0.45, stagger: 0.08, ease: "back.out(2.2)" }, "<+=0.05");

      tl.to(aiNodes, {
        x: (i) => Math.cos(i * 1.25) * 34,
        y: (i) => Math.sin(i * 1.25) * 34,
        duration: 0.7,
        stagger: 0.02,
        ease: "power2.out",
      });

      tl.to(aiRef.current, { scale: 1.06, duration: 0.25, ease: "power2.out" });
      tl.to(aiRef.current, { scale: 1, duration: 0.25, ease: "power2.inOut" });

      /* ==========================================
         AI → FINAL
      ========================================== */
      tl.add(() => setPanelVisible(finalRef.current), "+=0.05");

      tl.to(aiRef.current, {
        z: -640,
        rotateY: -18,
        rotateX: -18,
        yPercent: -10,
        clipPath: "inset(100% 0 0 0)",
        duration: 0.75,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(aiRef.current, { visibility: "hidden" });
        },
      });

      tl.to(finalRef.current, { visibility: "visible", clipPath: "inset(0 0 0% 0)", z: 0, rotateX: 0, rotateY: 0, yPercent: 0, scale: 1, duration: 1.05, ease: "expo.out" }, "<+=0.18");

      tl.to(finalItems, { y: 0, z: 0, rotateX: 0, rotateY: 0, duration: 0.85, stagger: 0.06, ease: "expo.out" }, "<+=0.05");

      /* ==========================================
         BACKGROUND MOVEMENT
      ========================================== */
      gsap.to(".systems-grid", {
        backgroundPosition: "120px 80px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${END_DISTANCE}`,
          scrub: true,
        },
      });

      gsap.to(".systems-orb-left", {
        x: 180,
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${END_DISTANCE}`,
          scrub: true,
        },
      });

      gsap.to(".systems-orb-right", {
        x: -160,
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${END_DISTANCE}`,
          scrub: true,
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addSystemLine = (el: HTMLDivElement | null) => {
    if (el && !systemLinesRef.current.includes(el)) systemLinesRef.current.push(el);
  };

  const addCRMItem = (el: HTMLDivElement | null) => {
    if (el && !crmItemsRef.current.includes(el)) crmItemsRef.current.push(el);
  };

  const addAINode = (el: HTMLDivElement | null) => {
    if (el && !aiNodesRef.current.includes(el)) aiNodesRef.current.push(el);
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-screen
        w-full
        p-7 md:p-10
        overflow-hidden
        bg-transparent
        text-white
        flex
        items-center
        justify-center
      "
    >
      <div
        ref={frameRef}
        className="
          relative
          w-full
          max-w-7xl
          h-[min(820px,calc(100vh-5rem))]
          md:h-[min(820px,calc(100vh-6rem))]
          rounded-[32px]
          border
          border-orange-500/25
          overflow-hidden
          bg-black
        "
      >
        {/* BACKGROUND */}
        <div
          className="
            systems-orb-left
            absolute
            left-[-15%]
            top-[20%]
            w-[420px]
            h-[420px]
            rounded-full
            bg-orange-500/10
            blur-[140px]
            pointer-events-none
          "
        />
        <div
          className="
            systems-orb-right
            absolute
            right-[-15%]
            bottom-[5%]
            w-[380px]
            h-[380px]
            rounded-full
            bg-red-500/10
            blur-[140px]
            pointer-events-none
          "
        />
        <div
          className="
            systems-grid
            absolute
            inset-0
            opacity-[0.045]
            pointer-events-none
            bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)]
            bg-[size:80px_80px]
          "
        />

        {/* CONTENT */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12">
          {/* SCENE 01 — INTRO */}
          <div ref={introRef} className="absolute inset-0 flex flex-col gap-2 md:gap-3 items-center justify-center text-center">
            <p className="text-xs md:text-base uppercase tracking-[0.35em] md:tracking-[0.45em] text-orange-400 mb-6 md:mb-8">
              More than websites
            </p>
            <h2 className="text-[clamp(3rem,11vw,8rem)] font-black leading-[0.9] tracking-[-0.05em]">I DON'T JUST</h2>
            <h2 className="text-[clamp(3rem,11vw,8rem)] font-black leading-[0.9] tracking-[-0.05em] text-orange-500">BUILD.</h2>
          </div>

          {/* SCENE 02 — WEBSITES */}
          <div ref={websiteRef} className="absolute inset-0 flex items-center justify-center">
            <div className="relative text-center">
              <span className="absolute -top-10 left-0 text-[10px] md:text-xs tracking-[0.35em] md:tracking-[0.4em] text-gray-500">
                01 / DIGITAL EXPERIENCE
              </span>
              <h3 className="text-[clamp(3.2rem,12vw,9rem)] font-black leading-[0.92] tracking-[-0.06em] whitespace-nowrap">WEBSITES</h3>
              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
            </div>
          </div>

          {/* SCENE 03 — WEB APPS */}
          <div ref={webAppRef} className="absolute inset-0 flex items-center justify-center">
            <div className="relative text-center">
              <span className="absolute -top-10 left-0 text-[10px] md:text-xs tracking-[0.35em] md:tracking-[0.4em] text-gray-500">
                02 / APPLICATION
              </span>
              <h3 className="text-[clamp(3.2rem,12vw,9rem)] font-black leading-[0.92] tracking-[-0.06em] whitespace-nowrap text-orange-500">
                WEB APPS
              </h3>
              <p className="mt-5 md:mt-6 text-xs md:text-base tracking-[0.18em] md:tracking-[0.25em] text-gray-500 uppercase">
                Interfaces that work.
              </p>
            </div>
          </div>

          {/* SCENE 04 — SYSTEMS */}
          <div ref={systemsRef} className="absolute inset-0 flex items-center justify-center">
            <div ref={addSystemLine} className="absolute w-[65%] h-px bg-orange-500/60 origin-left" />
            <div ref={addSystemLine} className="absolute w-[45%] h-px rotate-90 bg-orange-500/40 origin-left" />
            <div ref={addSystemLine} className="absolute w-[40%] h-px rotate-[35deg] bg-white/20 origin-left" />
            <div ref={addSystemLine} className="absolute w-[40%] h-px -rotate-[35deg] bg-white/20 origin-left" />

            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border border-orange-500/50 flex items-center justify-center bg-black/60">
              <div className="absolute inset-3 rounded-full border border-orange-500/20" />
              <span className="text-xl md:text-2xl font-black text-orange-500">CORE</span>
            </div>

            <h3 className="absolute mt-[240px] md:mt-[270px] text-[clamp(3rem,11vw,8rem)] font-black leading-[0.95] tracking-[-0.06em]">
              SYSTEMS
            </h3>
          </div>

          {/* SCENE 05 — CRM */}
          <div ref={crmRef} className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden shadow-2xl">
              <div ref={addCRMItem} className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-white/10">
                <div>
                  <span className="text-orange-500 font-bold">CRM</span>
                  <span className="ml-3 text-[10px] md:text-xs text-gray-500">MANAGEMENT SYSTEM</span>
                </div>
                <span className="text-[10px] md:text-xs text-green-400">● ONLINE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 md:p-6">
                <div ref={addCRMItem} className="rounded-xl border border-white/10 p-5 bg-black/30">
                  <p className="text-xs text-gray-500">USERS</p>
                  <p ref={usersValueRef} className="mt-2 text-3xl font-bold">1,248</p>
                </div>

                <div ref={addCRMItem} className="rounded-xl border border-white/10 p-5 bg-black/30">
                  <p className="text-xs text-gray-500">LEADS</p>
                  <p ref={leadsValueRef} className="mt-2 text-3xl font-bold text-orange-500">384</p>
                </div>

                <div ref={addCRMItem} className="rounded-xl border border-white/10 p-5 bg-black/30">
                  <p className="text-xs text-gray-500">CONVERSION</p>
                  <p ref={conversionValueRef} className="mt-2 text-3xl font-bold">92%</p>
                </div>
              </div>

              <div ref={addCRMItem} className="mx-5 md:mx-6 mb-6 h-20 rounded-xl border border-white/10 flex items-center px-5">
                <div className="w-2 h-2 rounded-full bg-orange-500 mr-4" />
                <span className="text-xs md:text-sm text-gray-400">
                  Customer activity • Real-time data • Automated workflow
                </span>
              </div>
            </div>
          </div>

          {/* SCENE 06 — AI */}
          <div ref={aiRef} className="absolute inset-0 flex items-center justify-center">
            <div ref={addAINode} className="absolute w-3 h-3 rounded-full bg-orange-500 -translate-x-40 -translate-y-20" />
            <div ref={addAINode} className="absolute w-2 h-2 rounded-full bg-orange-400 translate-x-40 -translate-y-24" />
            <div ref={addAINode} className="absolute w-3 h-3 rounded-full bg-orange-500 -translate-x-44 translate-y-24" />
            <div ref={addAINode} className="absolute w-2 h-2 rounded-full bg-orange-400 translate-x-44 translate-y-20" />
            <div ref={addAINode} className="absolute w-2 h-2 rounded-full bg-white/70 -translate-x-24 translate-y-0" />
            <div ref={addAINode} className="absolute w-2 h-2 rounded-full bg-white/70 translate-x-24 translate-y-0" />

            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border border-orange-500/40 bg-orange-500/[0.03] flex items-center justify-center">
              <div className="absolute inset-4 rounded-full border border-orange-500/20" />
              <div className="absolute inset-10 rounded-full border border-orange-500/30" />
              <span className="text-4xl md:text-5xl font-black text-orange-500">AI</span>
            </div>

            <div className="absolute mt-[260px] md:mt-[300px] text-center">
              <h3 className="text-[clamp(2.5rem,6.5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.05em]">AI SYSTEMS</h3>
              <p className="mt-4 text-gray-500 tracking-[0.25em] md:tracking-[0.3em] text-[10px] md:text-xs uppercase">
                Intelligence • Automation • Integration
              </p>
            </div>
          </div>

          {/* SCENE 07 — FINAL */}
          <div ref={finalRef} className="absolute inset-0 flex flex-col gap-2 md:gap-3 items-center justify-center text-center">
            <p className="text-xs md:text-base uppercase tracking-[0.35em] md:tracking-[0.5em] text-gray-500 mb-6 md:mb-8">
              That's what I build
            </p>
            <h3 className="text-[clamp(3.2rem,12vw,9rem)] font-black leading-[0.9] tracking-[-0.06em]">
              DIGITAL
              <br />
              <span className="text-orange-500">SYSTEMS.</span>
            </h3>
            <p className="mt-8 md:mt-10 text-gray-500 text-[10px] md:text-sm tracking-[0.25em] md:tracking-[0.35em]">
              WEB APPS • CRM • AI • AUTOMATION
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemsShowcase;
