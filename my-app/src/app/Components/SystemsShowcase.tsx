"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SystemsShowcase = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const introRef = useRef<HTMLDivElement | null>(null);
  const craftRef = useRef<HTMLDivElement | null>(null);
  const websiteRef = useRef<HTMLDivElement | null>(null);
  const webAppRef = useRef<HTMLDivElement | null>(null);
  const systemsRef = useRef<HTMLDivElement | null>(null);
  const crmRef = useRef<HTMLDivElement | null>(null);
  const aiRef = useRef<HTMLDivElement | null>(null);
  const finalRef = useRef<HTMLDivElement | null>(null);

  const systemLinesRef = useRef<SVGPathElement[]>([]);
  const crmItemsRef = useRef<HTMLDivElement[]>([]);
  const aiNodesRef = useRef<HTMLDivElement[]>([]);

  const usersValueRef = useRef<HTMLParagraphElement | null>(null);
  const leadsValueRef = useRef<HTMLParagraphElement | null>(null);
  const conversionValueRef = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
  if (!sectionRef.current || !frameRef.current) return;

  const ctx = gsap.context(() => {
    const section = sectionRef.current!;
    const frame = frameRef.current!;

    /*
     * =====================================================
     * MASTER SCROLL CONFIG
     * =====================================================
     *
     * الـ section كله يتحكم فيه Timeline واحد.
     * كل Phase لها Timeline مستقل.
     *
     * لا يوجد Snap.
     * لا يوجد onEnter/onLeave يغير حالة العناصر فجأة.
     * كل شيء reversible بشكل طبيعي مع الـ scroll back.
     */

    const END_DISTANCE = 6200;

    /* =====================================================
       HELPERS
    ===================================================== */

    const qs = <T extends Element>(
      root: Element | null,
      selector: string
    ): T | null => {
      if (!root) return null;
      return root.querySelector(selector) as T | null;
    };

    const qsa = <T extends Element>(
      root: Element | null,
      selector: string
    ): T[] => {
      if (!root) return [];
      return Array.from(root.querySelectorAll(selector)) as T[];
    };

    const drawSVG = (paths: SVGPathElement[]) => {
      paths.forEach((path) => {
        let length = Number(path.dataset.length);

        if (!length) {
          length = path.getTotalLength();
          path.dataset.length = String(length);
        }

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });
    };

    /* =====================================================
       FRAME INITIAL STATE
    ===================================================== */

    gsap.set(frame, {
      width: "100%",
      height: "3.5rem",
      maxWidth: "80rem",
      maxHeight: "3.5rem",
      borderRadius: "9999px",
      borderWidth: 1,
      borderColor: "rgba(249,115,22,.25)",
      backgroundColor: "#000000",
      overflow: "hidden",
      perspective: 1400,
      transformStyle: "preserve-3d",
      force3D: true,
    });

    /* =====================================================
       PANELS
    ===================================================== */

    const panels = [
      introRef.current,
      craftRef.current,
      websiteRef.current,
      webAppRef.current,
      systemsRef.current,
      crmRef.current,
      aiRef.current,
      finalRef.current,
    ].filter(Boolean) as HTMLDivElement[];

    /*
     * مهم:
     *
     * مفيش visibility:hidden هنا.
     * كل panel يفضل موجود في الـDOM
     * والتحكم يكون بالـopacity + clipPath + transform.
     *
     * ده يمنع مشكلة إن panel يفضل hidden
     * أثناء الـforward animation.
     */

    gsap.set(panels, {
      opacity: 0,
      clipPath: "inset(100% 0 0 0)",
      z: -500,
      rotateX: 55,
      rotateY: 0,
      yPercent: 10,
      transformOrigin: "50% 100%",
      force3D: true,
      backfaceVisibility: "hidden",
    });

    /* =====================================================
       SCROLL HINT
    ===================================================== */

    gsap.set(hintRef.current, {
      opacity: 1,
      y: 0,
    });

    const scrollArrow = qsa<SVGPathElement>(
      hintRef.current,
      ".scroll-draw"
    );

    drawSVG(scrollArrow);

    /*
     * الـloop ده خارج الـmaster timeline
     * لكنه لا يؤثر على الـscroll position.
     */

    const hintFloat = gsap.to(".scroll-hint-arrow", {
      y: 6,
      opacity: 0.55,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    /* =====================================================
       INTRO ELEMENTS
    ===================================================== */

    const introItems = qsa<HTMLElement>(
      introRef.current,
      "[data-intro]"
    );

    const introStroke = qsa<SVGPathElement>(
      introRef.current,
      ".draw-path"
    );

    drawSVG(introStroke);

    gsap.set(introItems, {
      opacity: 0,
      y: 35,
      z: -150,
      rotateX: 70,
      filter: "blur(8px)",
    });

    /* =====================================================
       CRAFT
    ===================================================== */

    const craftItems = qsa<HTMLElement>(
      craftRef.current,
      "[data-craft]"
    );

    const craftIcons = qsa<SVGElement>(
      craftRef.current,
      ".craft-icon"
    );

    const craftPaths = qsa<SVGPathElement>(
      craftRef.current,
      ".craft-draw"
    );

    const craftArrow = qsa<SVGPathElement>(
      craftRef.current,
      ".craft-arrow"
    );

    drawSVG(craftPaths);
    drawSVG(craftArrow);

    gsap.set(craftItems, {
      opacity: 0,
      y: 25,
      z: -180,
      rotateX: 75,
      filter: "blur(10px)",
    });

    gsap.set(craftIcons, {
      opacity: 0,
      scale: 0.75,
      rotate: -12,
    });

    /* =====================================================
       WEBSITE
    ===================================================== */

    const websiteLabel = qs<HTMLElement>(
      websiteRef.current,
      "[data-website-label]"
    );

    const websiteTitle = qs<HTMLElement>(
      websiteRef.current,
      "[data-website-title]"
    );

    const websiteSub = qs<HTMLElement>(
      websiteRef.current,
      "[data-website-sub]"
    );

    const websiteLine = qs<SVGPathElement>(
      websiteRef.current,
      ".website-line"
    );

    const websiteIcons = qsa<SVGPathElement>(
      websiteRef.current,
      ".website-draw"
    );

    if (websiteLine) drawSVG([websiteLine]);
    drawSVG(websiteIcons);

    gsap.set(
      [websiteLabel, websiteTitle, websiteSub].filter(Boolean),
      {
        opacity: 0,
        y: 30,
        z: -160,
        rotateX: 70,
        filter: "blur(9px)",
      }
    );

    /* =====================================================
       WEB APPS
    ===================================================== */

    const webAppLabel = qs<HTMLElement>(
      webAppRef.current,
      "[data-webapp-label]"
    );

    const webAppTitle = qs<HTMLElement>(
      webAppRef.current,
      "[data-webapp-title]"
    );

    const webAppSub = qs<HTMLElement>(
      webAppRef.current,
      "[data-webapp-sub]"
    );

    const webAppIcons = qsa<SVGPathElement>(
      webAppRef.current,
      ".webapp-draw"
    );

    const webAppRing = qs<SVGCircleElement>(
      webAppRef.current,
      ".webapp-ring"
    );

    drawSVG(webAppIcons);

    if (webAppRing) {
      const len = 2 * Math.PI * 42;

      gsap.set(webAppRing, {
        strokeDasharray: len,
        strokeDashoffset: len,
      });
    }

    gsap.set(
      [webAppLabel, webAppTitle, webAppSub].filter(Boolean),
      {
        opacity: 0,
        y: 30,
        z: -170,
        rotateX: 70,
        filter: "blur(9px)",
      }
    );

    /* =====================================================
       SYSTEMS
    ===================================================== */

    const systemsTitle = qs<HTMLElement>(
      systemsRef.current,
      "[data-systems-title]"
    );

    const systemsSub = qs<HTMLElement>(
      systemsRef.current,
      "[data-systems-sub]"
    );

    const coreEl = qs<HTMLElement>(
      systemsRef.current,
      "[data-core]"
    );

    const systemDraw = qsa<SVGPathElement>(
      systemsRef.current,
      ".system-draw"
    );

    const systemNodeDraw = qsa<SVGCircleElement>(
      systemsRef.current,
      ".system-node"
    );

    drawSVG(systemDraw);

    gsap.set(systemNodeDraw, {
      scale: 0,
      transformOrigin: "50% 50%",
    });

    gsap.set(
      [systemsTitle, systemsSub].filter(Boolean),
      {
        opacity: 0,
        y: 30,
        z: -170,
        rotateX: 70,
        filter: "blur(10px)",
      }
    );

    if (coreEl) {
      gsap.set(coreEl, {
        opacity: 0,
        scale: 0.5,
        rotate: -25,
      });
    }

    /* =====================================================
       CRM
    ===================================================== */

    const crmTitle = qs<HTMLElement>(
      crmRef.current,
      "[data-crm-title]"
    );

    const crmSubtitle = qs<HTMLElement>(
      crmRef.current,
      "[data-crm-sub]"
    );

    const crmChart = qsa<SVGPathElement>(
      crmRef.current,
      ".crm-draw"
    );

    const crmChartDots = qsa<SVGCircleElement>(
      crmRef.current,
      ".crm-dot"
    );

    drawSVG(crmChart);

    gsap.set(crmChartDots, {
      scale: 0,
      transformOrigin: "50% 50%",
    });

    gsap.set(
      [crmTitle, crmSubtitle].filter(Boolean),
      {
        opacity: 0,
        y: 20,
        filter: "blur(8px)",
    });

    const crmItems = crmItemsRef.current.filter(Boolean);

    gsap.set(crmItems, {
      opacity: 0,
      y: 20,
      z: -80,
      rotateX: 30,
    });

    if (usersValueRef.current) {
      usersValueRef.current.innerText = "0";
    }

    if (leadsValueRef.current) {
      leadsValueRef.current.innerText = "0";
    }

    if (conversionValueRef.current) {
      conversionValueRef.current.innerText = "0%";
    }

    /* =====================================================
       AI
    ===================================================== */

    const aiTitle = qs<HTMLElement>(
      aiRef.current,
      "[data-ai-title]"
    );

    const aiSub = qs<HTMLElement>(
      aiRef.current,
      "[data-ai-sub]"
    );

    const aiCore = qs<HTMLElement>(
      aiRef.current,
      "[data-ai-core]"
    );

    const aiPaths = qsa<SVGPathElement>(
      aiRef.current,
      ".ai-draw"
    );

    const aiCircles = qsa<SVGCircleElement>(
      aiRef.current,
      ".ai-circle"
    );

    drawSVG(aiPaths);

    gsap.set(aiCircles, {
      scale: 0,
      transformOrigin: "50% 50%",
    });

    const aiNodes = aiNodesRef.current.filter(Boolean);

    gsap.set(aiNodes, {
      opacity: 0,
      scale: 0,
    });

    gsap.set(
      [aiTitle, aiSub].filter(Boolean),
      {
        opacity: 0,
        y: 25,
        filter: "blur(10px)",
      }
    );

    if (aiCore) {
      gsap.set(aiCore, {
        opacity: 0,
        scale: 0.5,
      });
    }

    /* =====================================================
       FINAL
    ===================================================== */

    const finalItems = qsa<HTMLElement>(
      finalRef.current,
      "[data-final]"
    );

    const finalPaths = qsa<SVGPathElement>(
      finalRef.current,
      ".final-draw"
    );

    drawSVG(finalPaths);

    gsap.set(finalItems, {
      opacity: 0,
      y: 25,
      z: -160,
      rotateX: 70,
      filter: "blur(10px)",
    });

    /* =====================================================
       MASTER TIMELINE
    ===================================================== */

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        overwrite: "auto",
      },
    });

    /* =====================================================
       OPEN FRAME
    ===================================================== */

    tl.to(
      section,
      {
        padding: 0,
        height: "100vh",
        minHeight: "100vh",
        duration: 0.7,
        ease: "power3.inOut",
      },
      0
    );

    tl.to(
      frame,
      {
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: 0,
        borderWidth: 0,
        borderColor: "transparent",
        duration: 0.7,
        ease: "power3.inOut",
      },
      0
    );

    tl.to(
      hintRef.current,
      {
        opacity: 0,
        y: 10,
        duration: 0.25,
        ease: "power2.out",
      },
      0.03
    );

    /* =====================================================
       HELPER:
       ENTER / EXIT EACH PHASE
    ===================================================== */

    const enterPhase = (
      phase: HTMLElement,
      duration = 0.9
    ) => {
      const phaseTl = gsap.timeline();

      phaseTl.to(phase, {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        z: 0,
        rotateX: 0,
        rotateY: 0,
        yPercent: 0,
        duration,
        ease: "expo.out",
      });

      return phaseTl;
    };

    const exitPhase = (
      phase: HTMLElement,
      rotateY = -18
    ) => {
      const phaseTl = gsap.timeline();

      phaseTl.to(phase, {
        opacity: 0,
        clipPath: "inset(100% 0 0 0)",
        z: -600,
        rotateY,
        rotateX: -16,
        yPercent: -8,
        duration: 0.8,
        ease: "power4.inOut",
      });

      return phaseTl;
    };

    /* =====================================================
       PHASE 01 — INTRO
    ===================================================== */

    const introTl = gsap.timeline();

    introTl.add(enterPhase(introRef.current!, 0.95));

    introTl.to(
      introItems,
      {
        opacity: 1,
        y: 0,
        z: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.09,
        ease: "expo.out",
      },
      "<+=0.08"
    );

    introTl.to(
      introStroke,
      {
        strokeDashoffset: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      },
      "<+=0.1"
    );

    introTl.to(
      ".intro-orange-word",
      {
        color: "#ffffff",
        duration: 0.35,
        ease: "power2.inOut",
      },
      "+=0.1"
    );

    introTl.to(
      ".intro-orange-word",
      {
        color: "#f97316",
        scaleX: 1.08,
        duration: 0.4,
        ease: "power2.out",
      }
    );

    /*
     * HOLD
     *
     * مهم عشان المستخدم يلحق يشوف المرحلة
     */
    introTl.to({}, { duration: 0.35 });

    introTl.add(exitPhase(introRef.current!, 12));

    tl.add(introTl);

    /* =====================================================
       PHASE 02 — CRAFT
    ===================================================== */

    const craftTl = gsap.timeline();

    /*
     * Background يبدأ مع الـphase
     * ويفضل موجود أثناء الـphase بالكامل.
     */

    craftTl.to(
      frame,
      {
        backgroundColor: "rgba(249,115,22,0.11)",
        duration: 0.55,
        ease: "power2.inOut",
      },
      0
    );

    craftTl.to(
      ".craft-orb",
      {
        opacity: 0.9,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      0
    );

    craftTl.add(enterPhase(craftRef.current!, 0.95), 0.05);

    craftTl.to(
      craftItems,
      {
        opacity: 1,
        y: 0,
        z: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.75,
        stagger: 0.08,
        ease: "expo.out",
      },
      "<+=0.08"
    );

    craftTl.to(
      craftIcons,
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.35,
        stagger: 0.12,
        ease: "back.out(1.7)",
      },
      "<+=0.08"
    );

    craftTl.to(
      craftPaths,
      {
        strokeDashoffset: 0,
        duration: 0.8,
        stagger: 0.16,
        ease: "power3.out",
      },
      "<+=0.08"
    );

    craftTl.to(
      craftArrow,
      {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: "power4.inOut",
      },
      "<+=0.15"
    );

    craftTl.fromTo(
      ".craft-arrow-head",
      {
        opacity: 0,
        scale: 0,
        transformOrigin: "50% 50%",
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "back.out(2)",
      },
      "-=0.2"
    );

    craftTl.to(
      ".craft-highlight",
      {
        color: "#ffffff",
        letterSpacing: "0.08em",
        duration: 0.35,
        ease: "power2.out",
      },
      "-=0.2"
    );

    craftTl.to(
      ".craft-highlight",
      {
        color: "#f97316",
        letterSpacing: "0.01em",
        duration: 0.45,
        ease: "power2.inOut",
      }
    );

    craftTl.to({}, { duration: 0.6 });

    craftTl.add(exitPhase(craftRef.current!, -18));

    /*
     * الخلفية ترجع للأسود في نهاية craft فقط.
     */

    craftTl.to(
      frame,
      {
        backgroundColor: "#000000",
        duration: 0.75,
        ease: "power3.inOut",
      },
      "<+=0.05"
    );

    craftTl.to(
      ".craft-orb",
      {
        opacity: 0,
        scale: 1.4,
        duration: 0.65,
        ease: "power3.inOut",
      },
      "<"
    );

    tl.add(craftTl);

    /* =====================================================
       PHASE 03 — WEBSITES
    ===================================================== */

    const websiteTl = gsap.timeline();

    websiteTl.add(enterPhase(websiteRef.current!, 0.95));

    if (websiteLabel) {
      websiteTl.to(
        websiteLabel,
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "expo.out",
        },
        "<+=0.08"
      );
    }

    if (websiteTitle) {
      websiteTl.to(
        websiteTitle,
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "expo.out",
        },
        "<+=0.08"
      );
    }

    websiteTl.to(
      websiteIcons,
      {
        strokeDashoffset: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      },
      "<+=0.05"
    );

    if (websiteLine) {
      websiteTl.to(
        websiteLine,
        {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "<+=0.08"
      );
    }

    if (websiteSub) {
      websiteTl.to(
        websiteSub,
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "power3.out",
        },
        "<+=0.12"
      );
    }

    websiteTl.to(
      ".website-word-highlight",
      {
        color: "#f97316",
        scaleX: 1.06,
        duration: 0.35,
        ease: "power2.out",
      },
      "-=0.2"
    );

    websiteTl.to({}, { duration: 0.35 });

    websiteTl.add(exitPhase(websiteRef.current!, -35));

    tl.add(websiteTl);

    /* =====================================================
       PHASE 04 — WEB APPS
    ===================================================== */

    const webAppTl = gsap.timeline();

    webAppTl.add(enterPhase(webAppRef.current!, 0.95));

    if (webAppLabel) {
      webAppTl.to(
        webAppLabel,
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "expo.out",
        },
        "<+=0.08"
      );
    }

    if (webAppTitle) {
      webAppTl.to(
        webAppTitle,
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "expo.out",
        },
        "<+=0.06"
      );
    }

    if (webAppRing) {
      webAppTl.to(
        webAppRing,
        {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power3.out",
        },
        "<+=0.1"
      );
    }

    webAppTl.to(
      webAppIcons,
      {
        strokeDashoffset: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      },
      "<+=0.12"
    );

    if (webAppSub) {
      webAppTl.to(
        webAppSub,
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "power3.out",
        },
        "<+=0.08"
      );
    }

    webAppTl.to(
      ".webapp-highlight",
      {
        color: "#ffffff",
        duration: 0.25,
        ease: "power2.out",
      },
      "+=0.05"
    );

    webAppTl.to(
      ".webapp-highlight",
      {
        color: "#f97316",
        duration: 0.35,
        ease: "power2.out",
      }
    );

    webAppTl.to({}, { duration: 0.5 });

    webAppTl.add(exitPhase(webAppRef.current!, 35));

    tl.add(webAppTl);

    /* =====================================================
       PHASE 05 — SYSTEMS
    ===================================================== */

    const systemsTl = gsap.timeline();

    systemsTl.add(enterPhase(systemsRef.current!, 0.95));

    systemsTl.to(
      systemDraw,
      {
        strokeDashoffset: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      },
      "<+=0.1"
    );

    systemsTl.to(
      systemNodeDraw,
      {
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "back.out(2)",
      },
      "<+=0.15"
    );

    if (coreEl) {
      systemsTl.to(
        coreEl,
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.75,
          ease: "back.out(1.7)",
        },
        "<+=0.1"
      );
    }

    if (systemsTitle) {
      systemsTl.to(
        systemsTitle,
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "expo.out",
        },
        "<+=0.08"
      );
    }

    if (systemsSub) {
      systemsTl.to(
        systemsSub,
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out",
        },
        "<+=0.1"
      );
    }

    systemsTl.to(
      ".systems-highlight",
      {
        color: "#f97316",
        letterSpacing: "0.08em",
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.1"
    );

    systemsTl.to(
      systemsRef.current,
      {
        scale: 1.04,
        duration: 0.35,
        ease: "power2.out",
      }
    );

    systemsTl.to(
      systemsRef.current,
      {
        scale: 1,
        duration: 0.35,
        ease: "power2.inOut",
      }
    );

    systemsTl.to({}, { duration: 0.45 });

    systemsTl.add(exitPhase(systemsRef.current!, -22));

    tl.add(systemsTl);

    /* =====================================================
       PHASE 06 — CRM
    ===================================================== */

    const crmTl = gsap.timeline();

    crmTl.add(enterPhase(crmRef.current!, 0.95));

    if (crmTitle) {
      crmTl.to(
        crmTitle,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "expo.out",
        },
        "<+=0.08"
      );
    }

    if (crmSubtitle) {
      crmTl.to(
        crmSubtitle,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power3.out",
        },
        "<+=0.06"
      );
    }

    crmTl.to(
      crmItems,
      {
        opacity: 1,
        y: 0,
        z: 0,
        rotateX: 0,
        duration: 0.65,
        stagger: 0.11,
        ease: "expo.out",
      },
      "<+=0.1"
    );

    const users = { v: 0 };
    const leads = { v: 0 };
    const conv = { v: 0 };

    crmTl.to(
      users,
      {
        v: 1248,
        duration: 0.7,
        ease: "expo.out",
        onUpdate: () => {
          if (usersValueRef.current) {
            usersValueRef.current.innerText =
              Math.round(users.v).toLocaleString();
          }
        },
      },
      "<+=0.08"
    );

    crmTl.to(
      leads,
      {
        v: 384,
        duration: 0.65,
        ease: "expo.out",
        onUpdate: () => {
          if (leadsValueRef.current) {
            leadsValueRef.current.innerText =
              Math.round(leads.v).toLocaleString();
          }
        },
      },
      "<"
    );

    crmTl.to(
      conv,
      {
        v: 92,
        duration: 0.65,
        ease: "expo.out",
        onUpdate: () => {
          if (conversionValueRef.current) {
            conversionValueRef.current.innerText =
              `${Math.round(conv.v)}%`;
          }
        },
      },
      "<"
    );

    crmTl.to(
      crmChart,
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power3.out",
      },
      "<+=0.08"
    );

    crmTl.to(
      crmChartDots,
      {
        scale: 1,
        duration: 0.35,
        stagger: 0.1,
        ease: "back.out(2)",
      },
      "<+=0.35"
    );

    crmTl.to(
      ".crm-highlight",
      {
        color: "#ffffff",
        duration: 0.3,
        ease: "power2.out",
      }
    );

    crmTl.to(
      ".crm-highlight",
      {
        color: "#f97316",
        duration: 0.35,
        ease: "power2.out",
      }
    );

    crmTl.to({}, { duration: 0.55 });

    crmTl.add(exitPhase(crmRef.current!, 22));

    tl.add(crmTl);

    /* =====================================================
       PHASE 07 — AI
    ===================================================== */

    const aiTl = gsap.timeline();

    aiTl.add(enterPhase(aiRef.current!, 0.95));

    aiTl.to(
      aiPaths,
      {
        strokeDashoffset: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
      },
      "<+=0.08"
    );

    aiTl.to(
      aiCircles,
      {
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "back.out(2)",
      },
      "<+=0.1"
    );

    aiTl.to(
      aiNodes,
      {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.08,
        ease: "back.out(2)",
      },
      "<+=0.1"
    );

    if (aiCore) {
      aiTl.to(
        aiCore,
        {
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: "back.out(1.8)",
        },
        "<+=0.05"
      );
    }

    if (aiTitle) {
      aiTl.to(
        aiTitle,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "expo.out",
        },
        "<+=0.08"
      );
    }

    if (aiSub) {
      aiTl.to(
        aiSub,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power3.out",
        },
        "<+=0.1"
      );
    }

    aiTl.to(
      aiNodes,
      {
        x: (i) => Math.cos(i * 1.25) * 34,
        y: (i) => Math.sin(i * 1.25) * 34,
        duration: 0.8,
        stagger: 0.02,
        ease: "power2.out",
      }
    );

    aiTl.to(
      ".ai-highlight",
      {
        color: "#ffffff",
        duration: 0.25,
      }
    );

    aiTl.to(
      ".ai-highlight",
      {
        color: "#f97316",
        duration: 0.35,
      }
    );

    aiTl.to({}, { duration: 0.55 });

    aiTl.add(exitPhase(aiRef.current!, -18));

    tl.add(aiTl);

    /* =====================================================
       PHASE 08 — FINAL
    ===================================================== */

    const finalTl = gsap.timeline();

    finalTl.add(enterPhase(finalRef.current!, 1));

    finalTl.to(
      finalItems,
      {
        opacity: 1,
        y: 0,
        z: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.75,
        stagger: 0.08,
        ease: "expo.out",
      },
      "<+=0.08"
    );

    finalTl.to(
      finalPaths,
      {
        strokeDashoffset: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      },
      "<+=0.05"
    );

    finalTl.to(
      ".final-highlight",
      {
        color: "#ffffff",
        scaleX: 0.96,
        duration: 0.3,
      }
    );

    finalTl.to(
      ".final-highlight",
      {
        color: "#f97316",
        scaleX: 1.04,
        duration: 0.4,
        ease: "power2.out",
      }
    );

    finalTl.to(
      finalRef.current,
      {
        scale: 1.025,
        duration: 0.45,
        ease: "power2.out",
      }
    );

    finalTl.to(
      finalRef.current,
      {
        scale: 1,
        duration: 0.45,
        ease: "power2.inOut",
      }
    );

    /*
     * Hold final state.
     * عشان لما توصل لآخر section ما يحصلش exit مفاجئ.
     */
    finalTl.to({}, { duration: 0.6 });

    tl.add(finalTl);

    /* =====================================================
       BACKGROUND MOTION
       مربوطة بنفس الـmaster timeline
       بدل ScrollTriggers منفصلة.
    ===================================================== */

    tl.to(
      ".systems-grid",
      {
        backgroundPosition: "120px 80px",
        duration: 2,
        ease: "none",
      },
      0
    );

    tl.to(
      ".systems-orb-left",
      {
        x: 180,
        y: -120,
        duration: 2,
        ease: "none",
      },
      0
    );

    tl.to(
      ".systems-orb-right",
      {
        x: -160,
        y: 100,
        duration: 2,
        ease: "none",
      },
      0
    );

    /*
     * لأن background tweens فوق كلها duration قصير بالنسبة
     * للـtimeline، نمدهم لحد نهاية الـmaster timeline.
     */

    gsap.set(
      [
        ".systems-grid",
        ".systems-orb-left",
        ".systems-orb-right",
      ],
      {
        willChange: "transform",
      }
    );

    /*
     * =====================================================
     * SINGLE SCROLLTRIGGER
     * =====================================================
     *
     * هنا النقطة المهمة:
     *
     * - no snap
     * - no onEnter reset
     * - no onLeave reset
     * - no visibility manipulation
     * - الـtimeline نفسها هي الحالة الوحيدة للحركة
     */

    const scrollTrigger = ScrollTrigger.create({
  trigger: section,
  start: "top top",
  end: `+=${END_DISTANCE}`,

  pin: true,
  pinSpacing: true,
  anticipatePin: 1,

  scrub: 0.5,

  animation: tl,

  invalidateOnRefresh: true,
  fastScrollEnd: false,

  onEnterBack: () => {
    gsap.set(section, {
      padding: 0,
      minHeight: "100vh",
      height: "100vh",
    });

    gsap.set(frame, {
      width: "100%",
      height: "100%",
      maxWidth: "100%",
      maxHeight: "100%",
      borderRadius: 0,
      borderWidth: 0,
      borderColor: "transparent",
      backgroundColor: "#000000",
    });

    gsap.set(hintRef.current, {
      autoAlpha: 0,
    });
  },

  onLeave: () => {
    gsap.set(frame, {
      borderWidth: 1,
      borderColor: "rgba(249,115,22,.45)",
      boxShadow:
        "inset 0 0 0 1px rgba(249,115,22,.15), 0 0 45px rgba(249,115,22,.08)",
    });

    gsap.set(hintRef.current, {
      autoAlpha: 0,
    });
  },

  onLeaveBack: () => {
    gsap.set(section, {
      padding: "1.75rem",
      minHeight: "100vh",
      height: "auto",
    });

    gsap.set(frame, {
      width: "100%",
      height: "3.5rem",
      maxWidth: "80rem",
      maxHeight: "3.5rem",
      borderRadius: "9999px",
      borderWidth: 1,
      borderColor: "rgba(249,115,22,.25)",
      backgroundColor: "#000000",
      boxShadow: "none",
    });

    gsap.set(hintRef.current, {
      autoAlpha: 1,
    });
  },
});

    /*
     * =====================================================
     * REFRESH
     * =====================================================
     */

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      hintFloat.kill();
      scrollTrigger.kill();
      tl.kill();
    };
  }, sectionRef);

  return () => ctx.revert();
}, []);

  const addSystemLine = (el: SVGPathElement | null) => {
  if (el && !systemLinesRef.current.includes(el)) {
    systemLinesRef.current.push(el);
  }
};

  const addCRMItem = (el: HTMLDivElement | null) => {
    if (el && !crmItemsRef.current.includes(el)) {
      crmItemsRef.current.push(el);
    }
  };

  const addAINode = (el: HTMLDivElement | null) => {
    if (el && !aiNodesRef.current.includes(el)) {
      aiNodesRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-screen
        w-full
        p-7
        md:p-10
        overflow-hidden
        bg-transparent
        text-white
        flex
        items-center
        justify-center
      "
    >
      {/* =====================================================
          FRAME
      ===================================================== */}

      <div
        ref={frameRef}
        className="
          relative
          w-full
          max-w-7xl
          h-14
          md:h-16
          rounded-full
          border
          border-orange-500/25
          overflow-hidden
          bg-black
        "
      >
        {/* =====================================================
            SCROLL HINT
        ===================================================== */}

        <div
          ref={hintRef}
          className="
            absolute
            inset-0
            z-[50]
            pointer-events-none
            flex
            items-center
            justify-center
            gap-3
            text-gray-300
          "
        >
          {/* SVG MOUSE */}
          <svg
            className="
              scroll-hint-icon
              scroll-hint-arrow
              w-5
              h-7
              md:w-6
              md:h-8
              shrink-0
            "
            viewBox="0 0 24 32"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="4"
              y="2"
              width="16"
              height="28"
              rx="8"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-orange-500"
            />

            <path
              d="M12 7V13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="scroll-draw text-orange-500"
            />

            <path
              d="M9 18L12 21L15 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="scroll-draw text-gray-400"
            />
          </svg>

          <span
            className="
              text-[10px]
              md:text-xs
              uppercase
              tracking-[0.3em]
              md:tracking-[0.35em]
              whitespace-nowrap
            "
          >
            Scroll to play
          </span>
        </div>

        {/* =====================================================
            BACKGROUND
        ===================================================== */}

        <div
          className="
            systems-orb-left
            absolute
            left-[-15%]
            top-[15%]
            w-[45vw]
            h-[45vw]
            max-w-[520px]
            max-h-[520px]
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
            w-[42vw]
            h-[42vw]
            max-w-[480px]
            max-h-[480px]
            rounded-full
            bg-red-500/10
            blur-[140px]
            pointer-events-none
          "
        />

        <div
          className="
            craft-orb
            absolute
            left-1/2
            top-1/2
            w-[60vw]
            h-[60vw]
            max-w-[700px]
            max-h-[700px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-orange-500/[0.09]
            blur-[130px]
            opacity-0
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

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div
          className="
            relative
            z-10
            w-full
            h-full
            mx-auto
            px-5
            sm:px-8
            md:px-12
            lg:px-16
          "
        >
          {/* =================================================
              PHASE 01 — INTRO
          ================================================= */}

          <div
            ref={introRef}
            className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              text-center
              px-6
            "
          >
            <p
              data-intro
              className="
                text-[10px]
                sm:text-xs
                md:text-base
                uppercase
                tracking-[0.3em]
                md:tracking-[0.45em]
                text-orange-400
                mb-5
                md:mb-8
              "
            >
              More than websites
            </p>

            <h2
              data-intro
              className="
                text-[clamp(2.4rem,8vw,6.5rem)]
                font-black
                leading-[0.85]
                tracking-[-0.06em]
                whitespace-nowrap
              "
            >
              I DON'T JUST
            </h2>

            <div
              data-intro
              className="
                relative
                mt-1
                md:mt-2
              "
            >
              <h2
                className="
                  text-[clamp(2.6rem,9vw,6.5rem)]
                  font-black
                  leading-[0.85]
                  tracking-[-0.06em]
                  text-orange-500
                "
              >
                <span className="intro-orange-word">BUILD.</span>
              </h2>

              <svg
                className="
                  absolute
                  left-1/2
                  -bottom-5
                  md:-bottom-7
                  -translate-x-1/2
                  w-[70%]
                  h-4
                  md:h-6
                  overflow-visible
                "
                viewBox="0 0 300 20"
                fill="none"
              >
                <path
                  className="draw-path"
                  d="M5 14C80 2 190 2 295 13"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p
              data-intro
              className="
                mt-9
                md:mt-12
                max-w-2xl
                text-xs
                md:text-sm
                lg:text-base
                text-gray-500
                tracking-[0.08em]
                leading-7
              "
            >
              I design digital experiences that become useful products,
              connected workflows, and systems that actually move a business
              forward.
            </p>
          </div>

          {/* =================================================
              PHASE 02 — IDEAS → CODE
          ================================================= */}

          <div
            ref={craftRef}
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              text-center
              px-5
            "
          >
            <div className="relative w-full max-w-5xl">
              <span
                data-craft
                className="
                  block
                  text-[9px]
                  md:text-xs
                  tracking-[0.35em]
                  uppercase
                  text-gray-300/70
                "
              >
                PROCESS / DELIVERY
              </span>

              <h3
                data-craft
                className="
                  mt-4
                  md:mt-6
                  text-[clamp(2.2rem,7vw,5.2rem)]
                  font-black
                  leading-[0.9]
                  tracking-[-0.065em]
                "
              >
                <span className="craft-highlight">IDEAS</span>
                <span className="mx-3 md:mx-6 text-orange-500">→</span>
                <span>CODE</span>
              </h3>

              <p
                data-craft
                className="
                  mt-6
                  md:mt-8
                  max-w-3xl
                  mx-auto
                  text-xs
                  md:text-base
                  text-gray-300/75
                  leading-6
                  md:leading-8
                "
              >
                I translate business intent into clean architecture,
                reliable implementation, and production-ready systems.
                <span className="text-white">
                  {" "}
                  Every decision has a purpose.
                </span>
              </p>

              {/* BIG SVG ARROW */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  my-8
                  md:my-10
                "
              >
                <svg
                  viewBox="0 0 500 80"
                  className="
                    w-[60vw]
                    max-w-[420px]
                    h-auto
                    overflow-visible
                  "
                  fill="none"
                >
                  <path
                    className="craft-arrow"
                    d="M15 40C120 40 220 40 390 40"
                    stroke="#f97316"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <path
                    className="craft-arrow"
                    d="M360 18L390 40L360 62"
                    stroke="#f97316"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    className="craft-arrow-head"
                    d="M390 40L360 18M390 40L360 62"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* ICONS */}

              <div
                className="
                  grid
                  grid-cols-3
                  gap-3
                  md:gap-8
                  max-w-3xl
                  mx-auto
                "
              >
                {/* CONCEPT */}

                <div className="flex flex-col items-center gap-3">
                  <div
                    className="
                      w-12
                      h-12
                      md:w-16
                      md:h-16
                      rounded-2xl
                      border
                      border-orange-500/20
                      bg-orange-500/[0.04]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <svg
                      className="craft-icon w-6 h-6 md:w-8 md:h-8"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        className="craft-draw"
                        d="M20 5C12 5 7 10 7 17C7 22 10 25 13 28V34H27V28C30 25 33 22 33 17C33 10 28 5 20 5Z"
                        stroke="#f97316"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        className="craft-draw"
                        d="M14 34H26M16 38H24"
                        stroke="#f97316"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <span
                    data-craft
                    className="
                      text-[9px]
                      md:text-xs
                      tracking-[0.3em]
                      uppercase
                      text-gray-400
                    "
                  >
                    Concept
                  </span>
                </div>

                {/* BUILD */}

                <div className="flex flex-col items-center gap-3">
                  <div
                    className="
                      w-12
                      h-12
                      md:w-16
                      md:h-16
                      rounded-2xl
                      border
                      border-orange-500/20
                      bg-orange-500/[0.04]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <svg
                      className="craft-icon w-6 h-6 md:w-8 md:h-8"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        className="craft-draw"
                        d="M14 10L6 20L14 30"
                        stroke="#f97316"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        className="craft-draw"
                        d="M26 10L34 20L26 30"
                        stroke="#f97316"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        className="craft-draw"
                        d="M23 6L17 34"
                        stroke="#fff"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <span
                    data-craft
                    className="
                      text-[9px]
                      md:text-xs
                      tracking-[0.3em]
                      uppercase
                      text-gray-400
                    "
                  >
                    Build
                  </span>
                </div>

                {/* SHIP */}

                <div className="flex flex-col items-center gap-3">
                  <div
                    className="
                      w-12
                      h-12
                      md:w-16
                      md:h-16
                      rounded-2xl
                      border
                      border-orange-500/20
                      bg-orange-500/[0.04]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <svg
                      className="craft-icon w-6 h-6 md:w-8 md:h-8"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        className="craft-draw"
                        d="M20 5L24 15L35 20L24 25L20 35L16 25L5 20L16 15L20 5Z"
                        stroke="#f97316"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        className="craft-draw"
                        d="M29 7V11M27 9H31"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <span
                    data-craft
                    className="
                      text-[9px]
                      md:text-xs
                      tracking-[0.3em]
                      uppercase
                      text-gray-400
                    "
                  >
                    Ship
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              PHASE 03 — WEBSITES
          ================================================= */}

          <div
            ref={websiteRef}
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              text-center
              px-5
            "
          >
            <div className="relative w-full max-w-6xl">
              <span
                data-website-label
                className="
                  block
                  text-[9px]
                  md:text-xs
                  tracking-[0.35em]
                  uppercase
                  text-gray-500
                "
              >
                01 / DIGITAL EXPERIENCE
              </span>

              <div className="relative mt-4 md:mt-6">
                <h3
                  data-website-title
                  className="
                    text-[clamp(2.8rem,9.5vw,7rem)]
                    font-black
                    leading-[0.85]
                    tracking-[-0.07em]
                    whitespace-nowrap
                  "
                >
                  WEB
                  <span className="website-word-highlight text-white">
                    SITES
                  </span>
                </h3>

                <svg
                  className="
                    absolute
                    -bottom-5
                    md:-bottom-8
                    left-1/2
                    -translate-x-1/2
                    w-[70%]
                    h-5
                    md:h-8
                  "
                  viewBox="0 0 400 30"
                  fill="none"
                >
                  <path
                    className="website-line"
                    d="M10 15C100 4 300 4 390 15"
                    stroke="#f97316"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p
                data-website-sub
                className="
                  mt-10
                  md:mt-14
                  text-xs
                  md:text-base
                  text-gray-500
                  tracking-[0.08em]
                  leading-7
                  max-w-2xl
                  mx-auto
                "
              >
                Interfaces built to communicate,
                <span className="text-gray-300"> convert attention, </span>
                and make a product feel as strong as the technology behind it.
              </p>

              <div
                className="
                  mt-8
                  md:mt-10
                  flex
                  justify-center
                  gap-5
                  md:gap-9
                "
              >
                {/* Browser */}

                <svg
                  className="
                w-7
                h-7
                md:w-10
                md:h-10
                  "
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <rect
                    className="website-draw"
                    x="5"
                    y="8"
                    width="38"
                    height="30"
                    rx="4"
                    stroke="#f97316"
                    strokeWidth="1.7"
                  />

                  <path
                    className="website-draw"
                    d="M5 16H43"
                    stroke="#f97316"
                    strokeWidth="1.7"
                  />

                  <circle
                    className="website-draw"
                    cx="11"
                    cy="12"
                    r="1"
                    stroke="#fff"
                    strokeWidth="1.3"
                  />

                  <circle
                    className="website-draw"
                    cx="16"
                    cy="12"
                    r="1"
                    stroke="#fff"
                    strokeWidth="1.3"
                  />
                </svg>

                {/* Mobile */}

                <svg
                  className="w-7 h-7 md:w-10 md:h-10"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <rect
                    className="website-draw"
                    x="13"
                    y="5"
                    width="22"
                    height="38"
                    rx="4"
                    stroke="#f97316"
                    strokeWidth="1.7"
                  />

                  <path
                    className="website-draw"
                    d="M20 38H28"
                    stroke="#fff"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Globe */}

                <svg
                  className="w-7 h-7 md:w-10 md:h-10"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <circle
                    className="website-draw"
                    cx="24"
                    cy="24"
                    r="17"
                    stroke="#f97316"
                    strokeWidth="1.7"
                  />

                  <path
                    className="website-draw"
                    d="M7 24H41M24 7C30 13 30 35 24 41M24 7C18 13 18 35 24 41"
                    stroke="#fff"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* =================================================
              PHASE 04 — WEB APPS
          ================================================= */}

          <div
            ref={webAppRef}
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              text-center
              px-5
            "
          >
            <div className="relative w-full max-w-5xl">
              <span
                data-webapp-label
                className="
                  block
                  text-[9px]
                  md:text-xs
                  tracking-[0.35em]
                  uppercase
                  text-gray-500
                "
              >
                02 / APPLICATION
              </span>

              <h3
                data-webapp-title
                className="
                  mt-5
                  text-[clamp(2.7rem,9vw,7rem)]
                  font-black
                  leading-[0.85]
                  tracking-[-0.07em]
                "
              >
                <span className="webapp-highlight text-orange-500">
                  WEB
                </span>{" "}
                APPS
              </h3>

              <p
                data-webapp-sub
                className="
                  mt-7
                  max-w-2xl
                  mx-auto
                  text-xs
                  md:text-base
                  text-gray-500
                  leading-7
                "
              >
                From dashboards to complex workflows,
                <span className="text-gray-300">
                  {" "}
                  every interaction is designed around a real user action.
                </span>
              </p>

              {/* APP ARCHITECTURE */}

              <div
                className="
                  relative
                  mt-9
                  md:mt-12
                  mx-auto
                  w-[min(78vw,500px)]
                  aspect-[16/8]
                  border
                  border-white/10
                  rounded-2xl
                  bg-white/[0.02]
                  overflow-hidden
                "
              >
                <svg
                  viewBox="0 0 560 280"
                  className="absolute inset-0 w-full h-full"
                  fill="none"
                >
                  <circle
                    ref={(el) => {
                      if (el) {
                        const len = 2 * Math.PI * 42;
                        el.style.strokeDasharray = String(len);
                      }
                    }}
                    className="webapp-ring"
                    cx="280"
                    cy="140"
                    r="42"
                    stroke="#f97316"
                    strokeWidth="2"
                  />

                  <path
                    className="webapp-draw"
                    d="M280 98V60M280 182V220M238 140H200M322 140H360"
                    stroke="#f97316"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  <path
                    className="webapp-draw"
                    d="M250 110L215 75M310 110L345 75M250 170L215 205M310 170L345 205"
                    stroke="rgba(255,255,255,.55)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  <rect
                    className="webapp-draw"
                    x="240"
                    y="100"
                    width="80"
                    height="80"
                    rx="16"
                    stroke="#f97316"
                    strokeWidth="1.3"
                  />

                  <path
                    className="webapp-draw"
                    d="M260 135L275 150L300 125"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* =================================================
              PHASE 05 — SYSTEMS
          ================================================= */}

          <div
            ref={systemsRef}
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              text-center
              px-5
            "
          >
            <div className="relative w-full max-w-5xl">
              <svg
                viewBox="0 0 700 420"
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  w-[82vw]
                  max-w-[620px]
                  h-auto
                  pointer-events-none
                "
                fill="none"
              >
                <path
                  ref={addSystemLine}
                  className="system-draw"
                  d="M350 210H100"
                  stroke="rgba(249,115,22,.65)"
                  strokeWidth="1.5"
                />

                <path
                  ref={addSystemLine}
                  className="system-draw"
                  d="M350 210H600"
                  stroke="rgba(249,115,22,.65)"
                  strokeWidth="1.5"
                />

                <path
                  ref={addSystemLine}
                  className="system-draw"
                  d="M350 210L180 70"
                  stroke="rgba(255,255,255,.22)"
                  strokeWidth="1.2"
                />

                <path
                  ref={addSystemLine}
                  className="system-draw"
                  d="M350 210L520 70"
                  stroke="rgba(255,255,255,.22)"
                  strokeWidth="1.2"
                />

                <path
                  ref={addSystemLine}
                  className="system-draw"
                  d="M350 210L180 350"
                  stroke="rgba(255,255,255,.22)"
                  strokeWidth="1.2"
                />

                <path
                  ref={addSystemLine}
                  className="system-draw"
                  d="M350 210L520 350"
                  stroke="rgba(255,255,255,.22)"
                  strokeWidth="1.2"
                />

                <circle
                  className="system-node"
                  cx="100"
                  cy="210"
                  r="6"
                  fill="#f97316"
                />

                <circle
                  className="system-node"
                  cx="600"
                  cy="210"
                  r="6"
                  fill="#f97316"
                />

                <circle
                  className="system-node"
                  cx="180"
                  cy="70"
                  r="5"
                  fill="#fff"
                />

                <circle
                  className="system-node"
                  cx="520"
                  cy="70"
                  r="5"
                  fill="#fff"
                />

                <circle
                  className="system-node"
                  cx="180"
                  cy="350"
                  r="5"
                  fill="#fff"
                />

                <circle
                  className="system-node"
                  cx="520"
                  cy="350"
                  r="5"
                  fill="#fff"
                />
              </svg>

              <div
                data-core
                className="
                  relative
                  z-10
                  mx-auto
                  w-24
                  h-24
                  md:w-32
                  md:h-32
                  rounded-full
                  border
                  border-orange-500/50
                  flex
                  items-center
                  justify-center
                  bg-black/70
                  shadow-[0_0_50px_rgba(249,115,22,.12)]
                "
              >
                <div
                  className="
                    absolute
                    inset-3
                    md:inset-4
                    rounded-full
                    border
                    border-orange-500/20
                  "
                />

                <span className="text-lg md:text-2xl font-black text-orange-500">
                  CORE
                </span>
              </div>

              <h3
                data-systems-title
                className="
                  mt-20
                  md:mt-28
                  text-[clamp(2.6rem,9vw,6.5rem)]
                  font-black
                  leading-[0.85]
                  tracking-[-0.07em]
                "
              >
                <span className="systems-highlight">SYSTEMS</span>
              </h3>

              <p
                data-systems-sub
                className="
                  mt-5
                  max-w-2xl
                  mx-auto
                  text-xs
                  md:text-base
                  text-gray-500
                  leading-7
                "
              >
                Websites are only one layer.
                <span className="text-gray-300">
                  {" "}
                  I connect interfaces, data, logic, users, and automation
                  into one coherent digital architecture.
                </span>
              </p>
            </div>
          </div>

          {/* =================================================
              PHASE 06 — CRM
          ================================================= */}

          <div
            ref={crmRef}
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              px-4
              md:px-8
            "
          >
            <div
              className="
                w-full
                max-w-4xl
                rounded-2xl
                md:rounded-3xl
                border
                border-white/10
                bg-white/[0.035]
                backdrop-blur-xl
                overflow-hidden
                shadow-2xl
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-4
                  md:px-7
                  py-4
                  border-b
                  border-white/10
                "
              >
                <div>
                  <span
                    data-crm-title
                    className="
                      text-orange-500
                      font-black
                      text-sm
                      md:text-base
                    "
                  >
                    CRM
                  </span>

                  <span
                    data-crm-sub
                    className="
                      ml-2
                      md:ml-3
                      text-[9px]
                      md:text-xs
                      text-gray-500
                    "
                  >
                    MANAGEMENT SYSTEM
                  </span>
                </div>

                <span
                  className="
                    text-[9px]
                    md:text-xs
                    text-green-400
                  "
                >
                  ● ONLINE
                </span>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-3
                  gap-3
                  md:gap-4
                  p-4
                  md:p-6
                "
              >
                <div
                  ref={addCRMItem}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    p-4
                    md:p-5
                    bg-black/30
                  "
                >
                  <p className="text-[9px] md:text-xs text-gray-500">
                    USERS
                  </p>

                  <p
                    ref={usersValueRef}
                    className="
                      mt-2
                      text-2xl
                      md:text-3xl
                      font-bold
                    "
                  >
                    0
                  </p>
                </div>

                <div
                  ref={addCRMItem}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    p-4
                    md:p-5
                    bg-black/30
                  "
                >
                  <p className="text-[9px] md:text-xs text-gray-500">
                    LEADS
                  </p>

                  <p
                    ref={leadsValueRef}
                    className="
                      mt-2
                      text-2xl
                      md:text-3xl
                      font-bold
                      crm-highlight
                    "
                  >
                    0
                  </p>
                </div>

                <div
                  ref={addCRMItem}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    p-4
                    md:p-5
                    bg-black/30
                  "
                >
                  <p className="text-[9px] md:text-xs text-gray-500">
                    CONVERSION
                  </p>

                  <p
                    ref={conversionValueRef}
                    className="
                      mt-2
                      text-2xl
                      md:text-3xl
                      font-bold
                    "
                  >
                    0%
                  </p>
                </div>
              </div>

              {/* CHART */}

              <div
                className="
                  mx-4
                  md:mx-6
                  mb-4
                  md:mb-6
                  h-32
                  md:h-40
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  overflow-hidden
                "
              >
                <svg
                  viewBox="0 0 700 160"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    className="crm-draw"
                    d="M0 130C70 118 90 120 150 105C220 88 245 112 300 80C355 48 390 70 440 55C500 38 535 58 580 35C625 15 655 25 700 10"
                    stroke="#f97316"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <circle
                    className="crm-dot"
                    cx="150"
                    cy="105"
                    r="4"
                    fill="#f97316"
                  />

                  <circle
                    className="crm-dot"
                    cx="300"
                    cy="80"
                    r="4"
                    fill="#f97316"
                  />

                  <circle
                    className="crm-dot"
                    cx="440"
                    cy="55"
                    r="4"
                    fill="#f97316"
                  />

                  <circle
                    className="crm-dot"
                    cx="580"
                    cy="35"
                    r="4"
                    fill="#f97316"
                  />

                  <circle
                    className="crm-dot"
                    cx="700"
                    cy="10"
                    r="4"
                    fill="#fff"
                  />
                </svg>
              </div>

              <div
                ref={addCRMItem}
                className="
                  mx-4
                  md:mx-6
                  mb-5
                  md:mb-6
                  min-h-16
                  md:h-20
                  rounded-xl
                  border
                  border-white/10
                  flex
                  items-center
                  px-4
                  md:px-5
                "
              >
                <div className="w-2 h-2 rounded-full bg-orange-500 mr-4 shrink-0" />

                <span
                  className="
                    text-[10px]
                    md:text-sm
                    text-gray-400
                    leading-5
                  "
                >
                  Customer activity • Real-time data • Automated workflow
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              PHASE 07 — AI
          ================================================= */}

          <div
            ref={aiRef}
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              text-center
              px-5
            "
          >
            <div className="relative w-full max-w-5xl">
              <svg
                viewBox="0 0 700 400"
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  w-[82vw]
                  max-w-[620px]
                  h-auto
                "
                fill="none"
              >
                <path
                  className="ai-draw"
                  d="M350 200L180 80L100 180L190 300L350 200"
                  stroke="rgba(249,115,22,.4)"
                  strokeWidth="1.2"
                />

                <path
                  className="ai-draw"
                  d="M350 200L520 80L600 180L510 300L350 200"
                  stroke="rgba(249,115,22,.4)"
                  strokeWidth="1.2"
                />

                <path
                  className="ai-draw"
                  d="M180 80L520 80M100 180L600 180M190 300L510 300"
                  stroke="rgba(255,255,255,.15)"
                  strokeWidth="1"
                />

                <circle
                  className="ai-circle"
                  cx="350"
                  cy="200"
                  r="65"
                  stroke="#f97316"
                  strokeWidth="1.5"
                />

                <circle
                  className="ai-circle"
                  cx="180"
                  cy="80"
                  r="5"
                  fill="#f97316"
                />

                <circle
                  className="ai-circle"
                  cx="520"
                  cy="80"
                  r="5"
                  fill="#f97316"
                />

                <circle
                  className="ai-circle"
                  cx="100"
                  cy="180"
                  r="4"
                  fill="#fff"
                />

                <circle
                  className="ai-circle"
                  cx="600"
                  cy="180"
                  r="4"
                  fill="#fff"
                />

                <circle
                  className="ai-circle"
                  cx="190"
                  cy="300"
                  r="5"
                  fill="#f97316"
                />

                <circle
                  className="ai-circle"
                  cx="510"
                  cy="300"
                  r="5"
                  fill="#f97316"
                />
              </svg>

              {/* EXTRA NODES */}

              <div
                ref={addAINode}
                className="
                  absolute
                  left-[18%]
                  top-[30%]
                  w-2
                  h-2
                  rounded-full
                  bg-orange-500
                "
              />

              <div
                ref={addAINode}
                className="
                  absolute
                  right-[18%]
                  top-[30%]
                  w-2
                  h-2
                  rounded-full
                  bg-orange-400
                "
              />

              <div
                ref={addAINode}
                className="
                  absolute
                  left-[14%]
                  bottom-[30%]
                  w-3
                  h-3
                  rounded-full
                  bg-white/70
                "
              />

              <div
                ref={addAINode}
                className="
                  absolute
                  right-[14%]
                  bottom-[30%]
                  w-3
                  h-3
                  rounded-full
                  bg-orange-500
                "
              />

              {/* CORE */}

              <div
                ref={addAINode}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  w-24
                  h-24
                  md:w-36
                  md:h-36
                  rounded-full
                  bg-orange-500/[0.03]
                "
              />

              <div
                data-ai-core
                className="
                  relative
                  z-10
                  mx-auto
                  w-28
                  h-28
                  md:w-40
                  md:h-40
                  rounded-full
                  border
                  border-orange-500/40
                  bg-black/60
                  flex
                  items-center
                  justify-center
                  shadow-[0_0_70px_rgba(249,115,22,.10)]
                "
              >
                <div
                  className="
                    absolute
                    inset-3
                    md:inset-5
                    rounded-full
                    border
                    border-orange-500/20
                  "
                />

                <div
                  className="
                    absolute
                    inset-8
                    md:inset-12
                    rounded-full
                    border
                    border-orange-500/30
                  "
                />

                <span
                  className="
                    text-3xl
                    md:text-5xl
                    font-black
                    ai-highlight
                    text-orange-500
                  "
                >
                  AI
                </span>
              </div>

              <h3
                data-ai-title
                className="
                  mt-20
                  md:mt-32
                  text-[clamp(2.3rem,6vw,4.3rem)]
                  font-black
                  leading-[0.9]
                  tracking-[-0.06em]
                "
              >
                INTELLIGENCE
                <br />
                <span className="text-orange-500">IN MOTION.</span>
              </h3>

              <p
                data-ai-sub
                className="
                  mt-5
                  max-w-2xl
                  mx-auto
                  text-xs
                  md:text-base
                  text-gray-500
                  leading-7
                "
              >
                AI becomes useful when it connects to the system around it.
                <span className="text-gray-300">
                  {" "}
                  Automation, decision support, intelligent workflows, and
                  real integrations.
                </span>
              </p>
            </div>
          </div>

          {/* =================================================
              PHASE 08 — FINAL
          ================================================= */}

          <div
            ref={finalRef}
            className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              text-center
              px-5
            "
          >
            <p
              data-final
              className="
                text-[10px]
                md:text-base
                uppercase
                tracking-[0.35em]
                md:tracking-[0.5em]
                text-gray-500
                mb-6
                md:mb-8
              "
            >
              That's what I build
            </p>

            <h3
              data-final
              className="
                text-[clamp(3.3rem,12vw,9rem)]
                font-black
                leading-[0.82]
                tracking-[-0.07em]
              "
            >
              DIGITAL
              <br />

              <span className="final-highlight text-orange-500 inline-block">
                SYSTEMS.
              </span>
            </h3>

            <p
              data-final
              className="
                mt-8
                md:mt-10
                max-w-2xl
                text-[10px]
                md:text-sm
                text-gray-500
                tracking-[0.2em]
                md:tracking-[0.35em]
                leading-6
              "
            >
              WEB APPS • CRM • AI • AUTOMATION
            </p>

            <p
              data-final
              className="
                mt-5
                max-w-xl
                text-xs
                md:text-base
                text-gray-400
                leading-6
                md:leading-7
              "
            >
              Not isolated pages.
              <span className="text-white"> Connected experiences.</span>
              <br />
              Not just features.
              <span className="text-orange-500"> Complete systems.</span>
            </p>

            <svg
              data-final
              className="
                mt-8
                md:mt-10
                w-24
                md:w-36
                h-5
              "
              viewBox="0 0 140 20"
              fill="none"
            >
              <path
                className="final-draw"
                d="M5 10H135"
                stroke="#f97316"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <path
                className="final-draw"
                d="M120 4L135 10L120 16"
                stroke="#f97316"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemsShowcase;
