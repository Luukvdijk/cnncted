"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

type ScrollControl = { stop: () => void; start: () => void };

const ScrollContext = createContext<ScrollControl>({ stop: () => {}, start: () => {} });

/** Pause or resume smooth scrolling (e.g. while the mobile menu is open). */
export function useScrollControl() {
  return useContext(ScrollContext);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenis = useRef<Lenis | null>(null);
  const control = useMemo<ScrollControl>(
    () => ({ stop: () => lenis.current?.stop(), start: () => lenis.current?.start() }),
    [],
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({ duration: 1.15, anchors: true, autoRaf: false });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.current = instance;

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  // New page: jump to the top (or to the hash target) before the triggers measure.
  useEffect(() => {
    const target = window.location.hash ? document.querySelector(window.location.hash) : null;
    if (lenis.current) {
      lenis.current.scrollTo(target instanceof HTMLElement ? target : 0, { immediate: true, force: true });
    } else if (target) {
      target.scrollIntoView();
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <ScrollContext.Provider value={control}>{children}</ScrollContext.Provider>;
}
