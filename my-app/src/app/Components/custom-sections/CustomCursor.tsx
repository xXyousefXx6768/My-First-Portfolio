"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CursorMode = "desktop" | "small" | "touch";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const tailRef = useRef<HTMLDivElement | null>(null);

  const [isOverNavbar, setIsOverNavbar] = useState(false);
  const [mode, setMode] = useState<CursorMode>("desktop");

  // =========================================================
  // DETECT DEVICE / POINTER MODE
  // =========================================================

  useEffect(() => {
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const mqHoverNone = window.matchMedia("(hover: none)");
    const mqSmall = window.matchMedia("(max-width: 640px)");

    const update = () => {
      const isTouch =
        mqCoarse.matches && mqHoverNone.matches;

      const isSmall = mqSmall.matches;

      setMode(
        isTouch
          ? "touch"
          : isSmall
          ? "small"
          : "desktop"
      );
    };

    update();

    mqCoarse.addEventListener?.("change", update);
    mqHoverNone.addEventListener?.("change", update);
    mqSmall.addEventListener?.("change", update);

    return () => {
      mqCoarse.removeEventListener?.("change", update);
      mqHoverNone.removeEventListener?.("change", update);
      mqSmall.removeEventListener?.("change", update);
    };
  }, []);

  // =========================================================
  // NAVBAR HOVER
  // =========================================================

  useEffect(() => {
    if (mode === "touch") {
      setIsOverNavbar(false);
      return;
    }

    const navbar =
      document.querySelector(".navbar-container");

    if (!navbar) return;

    const enterNavbar = () => {
      setIsOverNavbar(true);
    };

    const leaveNavbar = () => {
      setIsOverNavbar(false);
    };

    navbar.addEventListener(
      "mouseenter",
      enterNavbar
    );

    navbar.addEventListener(
      "mouseleave",
      leaveNavbar
    );

    return () => {
      navbar.removeEventListener(
        "mouseenter",
        enterNavbar
      );

      navbar.removeEventListener(
        "mouseleave",
        leaveNavbar
      );
    };
  }, [mode]);

  // =========================================================
  // LOOK / APPEARANCE
  // =========================================================

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const tail = tailRef.current;

    if (!dot || !ring || !tail) return;

    // =======================================================
    // TOUCH
    // =======================================================

    if (mode === "touch") {
      gsap.killTweensOf([dot, ring, tail]);

      gsap.set(ring, {
        autoAlpha: 0,
      });

      gsap.set(tail, {
        autoAlpha: 0,
      });

      gsap.set(dot, {
        autoAlpha: 0,
        scale: 1,
        backgroundColor:
          "rgba(255,140,40,0.95)",
        boxShadow:
          "0 0 14px rgba(255,140,40,0.55)",
      });

      dot.style.mixBlendMode = "normal";
      ring.style.mixBlendMode = "normal";
      tail.style.mixBlendMode = "normal";

      return;
    }

    // =======================================================
    // SMALL
    // =======================================================

    if (mode === "small") {
      gsap.killTweensOf([dot, ring, tail]);

      gsap.set(dot, {
        autoAlpha: 1,
        scale: 1,
        backgroundColor:
          "rgba(255,140,40,0.95)",
        boxShadow:
          "0 0 14px rgba(255,140,40,0.55)",
      });

      gsap.set(ring, {
        autoAlpha: 1,
        scale: 1,
        width: 46,
        height: 46,
        borderColor:
          "rgba(255,140,40,0.45)",
        backgroundColor: "transparent",
      });

      gsap.set(tail, {
        autoAlpha: 0,
      });

      dot.style.mixBlendMode = "normal";
      ring.style.mixBlendMode = "normal";
      tail.style.mixBlendMode = "normal";

      return;
    }

    // =======================================================
    // DESKTOP
    // =======================================================

    gsap.set(dot, {
      autoAlpha: 1,
      scale: 1,
      backgroundColor:
        "rgba(255,140,40,0.95)",
    });

    gsap.set(ring, {
      autoAlpha: 1,
      scale: 1,
      width: 85,
      height: 85,
      borderColor:
        "rgba(255,213,74,0.7)",
      backgroundColor:
        "rgba(255,255,255,0.03)",
    });

    gsap.set(tail, {
      autoAlpha: 0.7,
      scale: 1,
      backgroundColor:
        "rgba(249,120,8,0.24)",
    });

    dot.style.mixBlendMode = "normal";

    // X-RAY
    ring.style.mixBlendMode = "difference";
    tail.style.mixBlendMode = "normal";

    // -------------------------------------------------------
    // NAVBAR HOVER
    // -------------------------------------------------------

    if (isOverNavbar) {
      gsap.to(dot, {
        backgroundColor:
          "rgba(255,140,40,0.98)",
        boxShadow:
          "0 0 22px rgba(255,140,40,0.65)",
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });

      gsap.to(ring, {
        width: 105,
        height: 105,
        borderColor:
          "rgba(255,255,255,0.9)",
        backgroundColor:
          "rgba(255,255,255,0.05)",
        boxShadow:
          "0 0 28px rgba(255,140,40,0.12), inset 0 0 18px rgba(255,255,255,0.08)",
        duration: 0.35,
        ease: "expo.out",
        overwrite: "auto",
      });

      gsap.to(tail, {
        backgroundColor:
          "rgba(249,120,8,0.3)",
        duration: 0.3,
        overwrite: "auto",
      });
    } else {
      gsap.to(dot, {
        backgroundColor:
          "rgba(255,140,40,0.95)",
        boxShadow:
          "0 0 16px rgba(255,140,40,0.12)",
        duration: 0.25,
        overwrite: "auto",
      });

      gsap.to(ring, {
        width: 85,
        height: 85,
        borderColor:
          "rgba(255,213,74,0.7)",
        backgroundColor:
          "rgba(255,255,255,0.03)",
        boxShadow: "none",
        duration: 0.35,
        ease: "expo.out",
        overwrite: "auto",
      });

      gsap.to(tail, {
        backgroundColor:
          "rgba(249,120,8,0.24)",
        duration: 0.3,
        overwrite: "auto",
      });
    }
  }, [isOverNavbar, mode]);

  // =========================================================
  // MOVEMENT
  // =========================================================

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const tail = tailRef.current;

    if (!dot || !ring || !tail) return;

    const dotSize =
      mode === "small"
        ? 14
        : mode === "touch"
        ? 16
        : 26;

    // -------------------------------------------------------
    // BASE STYLES
    // -------------------------------------------------------

    Object.assign(dot.style, {
      position: "fixed",
      width: `${dotSize}px`,
      height: `${dotSize}px`,
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "99999",
      willChange: "transform, opacity",
      left: "0px",
      top: "0px",
    });

    Object.assign(ring.style, {
      position: "fixed",
      width: "85px",
      height: "85px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "99998",
      border:
        "1.5px solid rgba(255,213,74,0.7)",
      background:
        "rgba(255,255,255,0.03)",
      left: "0px",
      top: "0px",
      willChange:
        "transform, width, height, opacity",
      backdropFilter: "blur(1px)",
    });

    Object.assign(tail.style, {
      position: "fixed",
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "99990",
      left: "0px",
      top: "0px",
      willChange:
        "transform, opacity",
      filter: "blur(14px)",
    });

    // -------------------------------------------------------
    // DURATIONS
    // -------------------------------------------------------

    const dotDur =
      mode === "touch"
        ? 0.05
        : mode === "small"
        ? 0.08
        : 0.15;

    const ringDur =
      mode === "small"
        ? 0.14
        : 0.28;

    const tailDur = 0.35;

    // -------------------------------------------------------
    // QUICK MOVERS
    // -------------------------------------------------------

    const dotX = gsap.quickTo(dot, "x", {
      duration: dotDur,
      ease: "power3.out",
    });

    const dotY = gsap.quickTo(dot, "y", {
      duration: dotDur,
      ease: "power3.out",
    });

    const ringX = gsap.quickTo(ring, "x", {
      duration: ringDur,
      ease: "power3.out",
    });

    const ringY = gsap.quickTo(ring, "y", {
      duration: ringDur,
      ease: "power3.out",
    });

    const tailX = gsap.quickTo(tail, "x", {
      duration: tailDur,
      ease: "power2.out",
    });

    const tailY = gsap.quickTo(tail, "y", {
      duration: tailDur,
      ease: "power2.out",
    });

    // -------------------------------------------------------
    // MOVE
    // -------------------------------------------------------

    const moveTo = (
      x: number,
      y: number
    ) => {
      // DOT
      dotX(x - dotSize / 2);
      dotY(y - dotSize / 2);

      // DESKTOP
      if (mode === "desktop") {
        ringX(x - 42.5);
        ringY(y - 42.5);

        tailX(x - 22.5);
        tailY(y - 22.5);
      }

      // SMALL
      if (mode === "small") {
        ringX(x - 23);
        ringY(y - 23);
      }

      // TOUCH
      if (mode === "touch") {
        // في الموبايل الدوت فقط
        dotX(x - dotSize / 2);
        dotY(y - dotSize / 2);
      }
    };

    // -------------------------------------------------------
    // TOUCH SHOW / HIDE
    // -------------------------------------------------------

    let hideTimer: ReturnType<
      typeof setTimeout
    > | null = null;

    const showTouchDot = () => {
      if (mode !== "touch") return;

      if (hideTimer) {
        clearTimeout(hideTimer);
      }

      gsap.to(dot, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.08,
        ease: "none",
        overwrite: "auto",
      });
    };

    const hideTouchDot = () => {
      if (mode !== "touch") return;

      if (hideTimer) {
        clearTimeout(hideTimer);
      }

      hideTimer = setTimeout(() => {
        gsap.to(dot, {
          autoAlpha: 0,
          scale: 0.7,
          duration: 0.18,
          ease: "power2.out",
          overwrite: "auto",
        });
      }, 120);
    };

    // -------------------------------------------------------
    // POINTER EVENTS
    // -------------------------------------------------------

    const onPointerDown = (
      e: PointerEvent
    ) => {
      if (mode !== "touch") return;

      if (e.pointerType !== "touch") {
        return;
      }

      showTouchDot();

      moveTo(
        e.clientX,
        e.clientY
      );
    };

    const onPointerMove = (
      e: PointerEvent
    ) => {
      // TOUCH
      if (mode === "touch") {
        if (e.pointerType !== "touch") {
          return;
        }

        showTouchDot();

        moveTo(
          e.clientX,
          e.clientY
        );

        return;
      }

      // MOUSE / PEN
      if (
        e.pointerType === "mouse" ||
        e.pointerType === "pen"
      ) {
        moveTo(
          e.clientX,
          e.clientY
        );
      }
    };

    const onPointerUp = (
      e: PointerEvent
    ) => {
      if (mode !== "touch") return;

      if (e.pointerType !== "touch") {
        return;
      }

      hideTouchDot();
    };

    const onPointerCancel = (
      e: PointerEvent
    ) => {
      if (mode !== "touch") return;

      if (e.pointerType !== "touch") {
        return;
      }

      hideTouchDot();
    };

    window.addEventListener(
      "pointerdown",
      onPointerDown,
      { passive: true }
    );

    window.addEventListener(
      "pointermove",
      onPointerMove,
      { passive: true }
    );

    window.addEventListener(
      "pointerup",
      onPointerUp,
      { passive: true }
    );

    window.addEventListener(
      "pointercancel",
      onPointerCancel,
      { passive: true }
    );

    // -------------------------------------------------------
    // CLEANUP
    // -------------------------------------------------------

    return () => {
      window.removeEventListener(
        "pointerdown",
        onPointerDown
      );

      window.removeEventListener(
        "pointermove",
        onPointerMove
      );

      window.removeEventListener(
        "pointerup",
        onPointerUp
      );

      window.removeEventListener(
        "pointercancel",
        onPointerCancel
      );

      if (hideTimer) {
        clearTimeout(hideTimer);
      }

      gsap.killTweensOf([
        dot,
        ring,
        tail,
      ]);
    };
  }, [mode]);

  return (
    <>
      <div ref={tailRef} />
      <div ref={ringRef} />
      <div ref={dotRef} />
    </>
  );
}
