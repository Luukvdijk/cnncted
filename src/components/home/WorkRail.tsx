"use client";

import Link from "next/link";
import { useRef } from "react";
import { CaseCard } from "@/components/CaseCard";
import { Dot } from "@/components/Dot";
import { Reveal } from "@/components/Reveal";
import type { Case, Dictionary } from "@/content";
import { gsap, useGSAP } from "@/lib/gsap";

/** Selected work: on desktop the section pins and the cards travel sideways. */
export function WorkRail({ lang, t, cases }: { lang: string; t: Dictionary["work"]; cases: Case[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current;
        if (!el) return;
        const distance = () => el.scrollWidth - window.innerWidth;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} className="on-dark overflow-hidden bg-ink text-paper lg:flex lg:h-svh lg:flex-col">
      <div className="wrap flex flex-wrap items-end justify-between gap-6 pt-24 lg:pt-24">
        <div>
          <Reveal className="h2">
            {t.title}
            <Dot />
          </Reveal>
          <p className="lead mt-5 max-w-md text-paper/70">{t.sub}</p>
        </div>
        <Link href={`/${lang}/work`} className="link-line text-lg font-semibold">
          {t.all} →
        </Link>
      </div>

      <div
        ref={track}
        className="mt-12 flex snap-x snap-mandatory scroll-px-[clamp(1rem,4vw,3.5rem)] gap-5 overflow-x-auto px-[clamp(1rem,4vw,3.5rem)] pb-24 [scrollbar-width:none] lg:mt-auto lg:w-max lg:snap-none lg:gap-8 lg:overflow-visible lg:pb-[6vh]"
      >
        {cases.map((c) => {
          const landscape = c.cover.width > c.cover.height;
          return (
            <CaseCard
              key={c.slug}
              c={c}
              lang={lang}
              viewLabel={t.view}
              sizes="(min-width: 1024px) 50vw, 85vw"
              className={`shrink-0 snap-start ${landscape ? "w-[85vw] sm:w-[34rem] lg:w-[calc((100svh-28rem)*1.5)]" : "w-[78vw] sm:w-[24rem] lg:w-[calc((100svh-28rem)*0.8)]"}`}
              mediaClassName={landscape ? "aspect-[3/2]" : "aspect-[4/5]"}
              titleClassName="text-[clamp(1.35rem,1.9vw,1.85rem)]"
            />
          );
        })}
        <Link
          href={`/${lang}/work`}
          data-cursor={t.view}
          className="on-lime group flex aspect-square w-[70vw] shrink-0 snap-start flex-col justify-between rounded-full bg-lime p-10 text-ink sm:w-[22rem] lg:w-[calc(100svh-30rem)] lg:self-center"
        >
          <span className="mt-[18%] text-center text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.95] font-extrabold tracking-[-0.05em]">
            {t.more}
          </span>
          <span aria-hidden="true" className="mx-auto mb-[12%] text-4xl transition-transform duration-500 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
