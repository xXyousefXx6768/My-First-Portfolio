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

  // ✅ Detect mode:
  // - touch: real phone/tablet
  // - small: small viewport but still mouse (responsive desktop)
  // - desktop: default
  useEffect(() => {
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const mqHoverNone = window.matchMedia("(hover: none)");
    const mqSmall = window.matchMedia("(max-width: 640px)");

    const update = () => {
      const isTouch = mqCoarse.matches && mqHoverNone.matches;
      const isSmall = mqSmall.matches;

      setMode(isTouch ? "touch" : isSmall ? "small" : "desktop");
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

  // Navbar hover (desktop/small only)
  useEffect(() => {
    if (mode === "touch") return;

    const navbar = document.querySelector(".navbar-container");
    const enterNavbar = () => setIsOverNavbar(true);
    const leaveNavbar = () => setIsOverNavbar(false);

    navbar?.addEventListener("mouseenter", enterNavbar);
navbar?.addEventListener("mouseleave", leaveNavbar);
navbar?.addEventListener("pointerleave", leaveNavbar);

    return () => {
      navbar?.removeEventListener("mouseenter", enterNavbar);
      navbar?.removeEventListener("mouseleave", leaveNavbar);
      navbar?.removeEventListener("pointerleave", leaveNavbar);
    };
  }, [mode]);

  // Apply look based on mode + navbar hover
  useEffect(() => {
  if (!dotRef.current || !ringRef.current || !tailRef.current) return;

  const dot = dotRef.current;
  const ring = ringRef.current;
  const tail = tailRef.current;

  // --- TOUCH ---
  if (mode === "touch") {
    gsap.set(ring, { autoAlpha: 0 });
    gsap.set(tail, { autoAlpha: 0 });

    gsap.set(dot, {
      autoAlpha: 0,
      background: "rgba(255,140,40,0.95)",
      boxShadow: "0 0 12px rgba(255,140,40,0.55)",
    });

    dot.style.mixBlendMode = "normal";
    ring.style.mixBlendMode = "normal";
    tail.style.mixBlendMode = "normal";

    return;
  }

  // --- SMALL ---
  if (mode === "small") {
    gsap.set(dot, {
      autoAlpha: 1,
      scale: 1,
    });

    gsap.set(ring, {
      autoAlpha: 1,
      scale: 1,
    });

    gsap.set(tail, {
      autoAlpha: 0,
    });

    dot.style.mixBlendMode = "normal";
    ring.style.mixBlendMode = "normal";

    gsap.to(dot, {
      background: "rgba(255,140,40,0.95)",
      boxShadow: "0 0 14px rgba(255,140,40,0.55)",
      duration: 0.2,
      overwrite: "auto",
    });

    gsap.to(ring, {
      borderColor: "rgba(255,140,40,0.45)",
      width: 46,
      height: 46,
      duration: 0.2,
      overwrite: "auto",
    });

    return;
  }

  // --- DESKTOP ---
gsap.set(dot, {
  autoAlpha: 1,
  scale: 1,
});

gsap.set(ring, {
  autoAlpha: 1,
  scale: 1,
  width: 85,
  height: 85,
  borderColor: "rgba(255,213,74,0.7)",
  backgroundColor: "transparent",
});

gsap.set(tail, {
  autoAlpha: 0.7,
  scale: 1,
  backgroundColor: "rgba(255,140,40,0.10)",
});

dot.style.mixBlendMode = "normal";

// X-Ray base effect
ring.style.mixBlendMode = "difference";
tail.style.mixBlendMode = "normal";

gsap.to(dot, {
  background: "rgba(255,140,40,0.95)",
  boxShadow: "0 0 16px rgba(255, 140, 40, 0.12)",
  duration: 0.25,
  overwrite: "auto",
});

gsap.to(ring, {
  width: 85,
  height: 85,
  borderColor: "rgba(255, 115, 0, 0.58)",
  backgroundColor: "rgba(255,255,255,0.03)",
  duration: 0.3,
  ease: "power3.out",
  overwrite: "auto",
});

gsap.to(tail, {
  backgroundColor: "rgba(249, 120, 8, 0.24)",
  duration: 0.3,
  overwrite: "auto",
});
}, [isOverNavbar, mode]);

  // Movement + interactions
  useEffect(() => {
    if (!dotRef.current || !ringRef.current || !tailRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const tail = tailRef.current;

    const dotSize = mode === "small" ? 14 : mode === "touch" ? 12 : 26;

    Object.assign(dot.style, {
      position: "fixed",
      width: `${dotSize}px`,
      height: `${dotSize}px`,
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "99999",
      willChange: "transform",
    });

    Object.assign(ring.style, {
      position: "fixed",
      width: "85px",
      height: "85px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "99998",
      border: "2px solid rgba(255,213,74,0.7)",
      willChange: "transform",
    });

    Object.assign(tail.style, {
      position: "fixed",
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "99990",
      willChange: "transform, opacity",
      filter: "blur(14px)",
    });

    const dotDur = mode === "touch" ? 0.03 : mode === "small" ? 0.08 : 0.15;
    const ringDur = mode === "small" ? 0.14 : 0.28;
    const tailDur = 0.35;

    const dotX = gsap.quickTo(dot, "x", { duration: dotDur });
    const dotY = gsap.quickTo(dot, "y", { duration: dotDur });

    const ringX = gsap.quickTo(ring, "x", { duration: ringDur });
    const ringY = gsap.quickTo(ring, "y", { duration: ringDur });

    const tailX = gsap.quickTo(tail, "x", { duration: tailDur });
    const tailY = gsap.quickTo(tail, "y", { duration: tailDur });

    const moveTo = (x: number, y: number) => {
  dotX(x - dotSize / 2);
  dotY(y - dotSize / 2);

  if (mode === "desktop") {
    const ringSize = 85;
    const tailSize = 45;

    ringX(x - ringSize / 2);
    ringY(y - ringSize / 2);

    tailX(x - tailSize / 2);
    tailY(y - tailSize / 2);
  } else if (mode === "small") {
    const ringSize = 46;

    ringX(x - ringSize / 2);
    ringY(y - ringSize / 2);
  }
};

    const onMouseMove = (e: MouseEvent) => {
      if (mode === "touch") return;
      moveTo(e.clientX, e.clientY);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (mode !== "touch") return;
      const t = e.touches[0];
      if (!t) return;
      gsap.to(dot, { autoAlpha: 1, duration: 0.08, ease: "none" });
      moveTo(t.clientX, t.clientY);
    };

    const onPointerMove = (e: PointerEvent) => {
  if (mode === "touch") return;
  // لما pointer يكون mouse أو pen
  if (e.pointerType === "mouse" || e.pointerType === "pen") {
    moveTo(e.clientX, e.clientY);
  }
};

window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
    window.removeEventListener("pointermove", onPointerMove);
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
