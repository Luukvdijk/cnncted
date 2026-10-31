"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Dot } from "@/components/Dot";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/content";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

const visuals = [
  { src: "/media/team-floris.jpg", alt: "Floris directing a shoot pitch-side" },
  { src: "/media/hospitality-dessert.jpg", alt: "Plated dessert shot for a fine-dining kitchen" },
  { src: "/media/events-night.jpg", alt: "Guests laughing at a nightlife event" },
  { src: "/media/sport-keeper-dive.jpg", alt: "Goalkeeper mid-air in a diving save" },
];

/**
 * The four disciplines on one line: it draws itself as you scroll and lights
 * up each node it reaches. That line is the "connected" in Cnncted.
 */
export function Services({ t }: { t: Dictionary["services"] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-line-fill]", { scaleY: 1 });
        return;
      }
      gsap.fromTo(
        "[data-line-fill]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-line]", start: "top 55%", end: "bottom 55%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-service]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className="scroll-mt-24 py-28 md:py-40">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12">
          <Reveal className="h2 md:col-span-8">
            {t.title}
            <Dot />
          </Reveal>
          <p className="lead text-grey md:col-span-4 md:self-end">{t.sub}</p>
        </div>

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12">
          <ol data-line className="relative lg:col-span-7">
            <span aria-hidden="true" className="absolute top-3 bottom-3 left-[11px] w-0.5 bg-line" />
            <span aria-hidden="true" data-line-fill className="absolute top-3 bottom-3 left-[11px] w-0.5 origin-top bg-ink" />
            {t.list.map((s, i) => (
              <li key={s.name} data-service className="relative pb-16 pl-14 last:pb-0 md:pl-20 md:pb-24">
                <span
                  aria-hidden="true"
                  className={`absolute top-2 left-0 size-6 rounded-full border-2 border-ink transition-[background-color,scale] duration-500 ease-(--ease-out-expo) ${
                    i <= active ? "scale-110 bg-lime" : "bg-paper"
                  }`}
                />
                <span className="meta">0{i + 1}</span>
                <h3 className="mt-1 text-[clamp(2.1rem,4.4vw,4rem)] leading-[0.95] font-extrabold tracking-[-0.05em]">
                  {s.name}
                </h3>
                <p className="lead mt-5 max-w-xl text-grey">{s.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <li key={item} className="rounded-full border border-line px-4 py-2 text-[0.9rem] font-medium">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-mist">
              {visuals.map((v, i) => (
                <Image
                  key={v.src}
                  src={v.src}
                  alt={i === active ? v.alt : ""}
                  fill
                  sizes="40vw"
                  className={`object-cover transition-[opacity,scale] duration-1000 ease-(--ease-out-expo) ${
                    i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  }`}
                />
              ))}
              <span className="absolute bottom-5 left-5 rounded-full bg-paper px-4 py-2 text-sm font-semibold">
                0{active + 1} {t.list[active].name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
