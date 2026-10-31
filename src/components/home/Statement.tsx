"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";

/** A big sentence that inks itself in, word by word, as you scroll past. */
export function Statement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const split = SplitText.create(el, { type: "words" });
      gsap.fromTo(
        split.words,
        { color: "#c9ccc4" },
        {
          color: "#0e0e10",
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 42%", scrub: true },
        },
      );
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <section className="py-28 md:py-44">
      <div className="wrap">
        <p
          ref={ref}
          className="max-w-[26ch] text-[clamp(2rem,4.6vw,4.9rem)] leading-[1.02] font-bold tracking-[-0.045em] md:ml-[16.6%]"
        >
          {text}
        </p>
      </div>
    </section>
  );
}
