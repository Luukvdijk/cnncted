"use client";

import { useRef, type ElementType } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/** Rises and fades in once when scrolled into view. */
export function FadeIn({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
}: {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 56 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.3,
        ease: "expo.out",
        delay,
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      },
    );
  });

  return (
    <Tag ref={ref} data-fade className={className}>
      {children}
    </Tag>
  );
}
