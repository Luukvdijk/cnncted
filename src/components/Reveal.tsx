"use client";

import { useRef, type ElementType } from "react";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Heading whose words rise out of their lines. Plays when scrolled into view,
 * or straight away with `immediate` (used above the fold).
 */
export function Reveal({
  as: Tag = "h2",
  className = "",
  children,
  delay = 0,
  immediate = false,
  id,
}: {
  as?: ElementType;
  className?: string;
  children: React.ReactNode;
  delay?: number;
  immediate?: boolean;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }
      const split = SplitText.create(el, {
        type: "lines,words",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { autoAlpha: 1 });
          return gsap.from(self.words, {
            yPercent: 120,
            duration: 1.15,
            ease: "expo.out",
            stagger: 0.05,
            delay,
            scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
          });
        },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
