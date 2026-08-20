"use client";

import { FC, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type LenisScrollProviderProps = {
  children: React.ReactNode;
};

const LenisScrollProvider: FC<LenisScrollProviderProps> = ({
  children,
}) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.4,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    // ---------------------------------------
    // LENIS → SCROLLTRIGGER
    // ---------------------------------------

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    // ---------------------------------------
    // GSAP TICKER → LENIS
    // ---------------------------------------

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // Prevent GSAP's lag smoothing from
    // creating a delay between Lenis and GSAP.
    gsap.ticker.lagSmoothing(0);

    // ---------------------------------------
    // CLEANUP
    // ---------------------------------------

    return () => {
      lenis.off("scroll", handleScroll);

      gsap.ticker.remove(update);

      lenis.destroy();

      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
};

export default LenisScrollProvider;
