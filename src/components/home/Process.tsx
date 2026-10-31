"use client";

import { useRef } from "react";
import { Dot } from "@/components/Dot";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/content";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export function Process({ t }: { t: Dictionary["process"] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-step]", { autoAlpha: 1 });
        return;
      }
      const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-steps]", start: "top 80%", once: true } });
      tl.fromTo("[data-track]", { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "expo.inOut" }).fromTo(
        "[data-step]",
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.12 },
        "-=1.2",
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-2 md:px-4">
      <div className="on-lime rounded-[2rem] bg-lime py-24 text-ink md:rounded-[2.5rem] md:py-36">
        <div className="wrap">
          <Reveal className="h2 max-w-[12ch]">
            {t.title}
            <Dot />
          </Reveal>

          <ol data-steps className="relative mt-16 grid gap-12 md:mt-24 md:grid-cols-4 md:gap-8">
            <span aria-hidden="true" data-track className="absolute top-[11px] right-0 left-0 hidden h-0.5 origin-left bg-ink md:block" />
            {t.steps.map((step, i) => (
              <li key={step.name} data-step className="relative [.js_&]:invisible">
                <span aria-hidden="true" className="relative block size-6 rounded-full border-2 border-ink bg-lime" />
                <p className="mt-8 text-[clamp(3.5rem,6vw,5.5rem)] leading-[0.8] font-extrabold tracking-[-0.06em]">0{i + 1}</p>
                <h3 className="h3 mt-5">{step.name}</h3>
                <p className="mt-3 max-w-xs text-[1.05rem] leading-snug text-ink/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
