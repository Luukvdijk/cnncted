"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { Dot } from "@/components/Dot";
import { site, type Dictionary } from "@/content";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export function Hero({ lang, t }: { lang: string; t: Dictionary["hero"] }) {
  const root = useRef<HTMLElement>(null);
  const box = useRef<HTMLSpanElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");
      let current = 0;
      const fit = () => box.current && gsap.set(box.current, { width: words[current].offsetWidth });
      fit();
      gsap.set(words.slice(1), { yPercent: 115, autoAlpha: 1 });

      if (reduce) {
        gsap.set("[data-hero-in], [data-hero-line]", { autoAlpha: 1 });
        return;
      }

      // Entrance: headline lines rise, then copy and reel follow.
      const intro = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
      intro
        .fromTo("[data-hero-line]", { yPercent: 115, autoAlpha: 1 }, { yPercent: 0, duration: 1.4, stagger: 0.09 })
        .fromTo("[data-hero-in]", { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 }, "-=1.05");

      // The rotating word: slide out, slide in, the lime box resizes to fit.
      const cycle = gsap.timeline({ repeat: -1, delay: 2.6 });
      words.forEach((word, i) => {
        const next = words[(i + 1) % words.length];
        cycle
          .to(word, { yPercent: -115, duration: 0.75, ease: "expo.inOut" })
          .fromTo(next, { yPercent: 115 }, { yPercent: 0, duration: 0.75, ease: "expo.inOut", immediateRender: false }, "<")
          .to(box.current, { width: () => next.offsetWidth, duration: 0.75, ease: "expo.inOut" }, "<")
          .call(() => {
            current = (i + 1) % words.length;
          })
          .to({}, { duration: 1.9 });
      });

      // The reel opens up to full bleed as it scrolls into place.
      const scroll = { trigger: "[data-reel]", start: "top 92%", end: "top 8%", scrub: true };
      gsap.fromTo(
        "[data-reel]",
        { clipPath: "inset(0% 3.5% 0% 3.5% round 2rem)" },
        { clipPath: "inset(0% 0% 0% 0% round 0rem)", ease: "none", scrollTrigger: scroll },
      );
      gsap.fromTo("[data-reel] video", { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: scroll });

      window.addEventListener("resize", fit);
      return () => window.removeEventListener("resize", fit);
    },
    { scope: root },
  );

  // Pause the reel for people who ask for less motion.
  useEffect(() => {
    if (prefersReducedMotion()) video.current?.pause();
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <section ref={root} className="relative pt-32 md:pt-44">
      <div className="wrap">
        <h1 className="display text-[clamp(3rem,9vw,10.5rem)]">
          <span className="sr-only">
            {t.before} {t.words.slice(0, -1).join(", ")} and {t.words.at(-1)}.
          </span>
          <span aria-hidden="true">
            <span className="split-line block">
              <span data-hero-line className="block">
                {t.before.split(" ").slice(0, 3).join(" ")}
              </span>
            </span>
            <span className="split-line block">
              <span data-hero-line className="block">
                {t.before.split(" ").slice(3).join(" ")}{" "}
                <span
                  ref={box}
                  className="relative inline-block h-[0.98em] translate-y-[0.06em] overflow-hidden rounded-[0.14em] bg-lime align-bottom"
                >
                  {/* Sizer keeps the box's height before JS measures it. */}
                  <span className="invisible inline-block px-[0.1em] whitespace-nowrap">{t.words[0]}</span>
                  {t.words.map((word, i) => (
                    <span
                      key={word}
                      data-word
                      className={`absolute top-0 left-0 inline-block px-[0.1em] whitespace-nowrap ${i === 0 ? "" : "invisible"}`}
                    >
                      {word}
                    </span>
                  ))}
                </span>
                <Dot />
              </span>
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <p data-hero-in className="lead max-w-xl text-grey md:col-span-6">
            {t.sub}
          </p>
          <div data-hero-in className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
            <Button href={`/${lang}/work`} variant="ink">
              {t.primary}
            </Button>
            <Button href={`/${lang}/contact`} variant="line">
              {t.secondary}
            </Button>
          </div>
        </div>
      </div>

      <div data-hero-in className="mt-16 md:mt-24">
        <div data-reel className="relative h-[72svh] overflow-hidden bg-ink md:h-auto md:aspect-video md:max-h-[100svh] md:w-full">
          <video
            ref={video}
            src={site.showreel.src}
            poster={site.showreel.poster}
            autoPlay
            muted
            loop
            playsInline
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-label={t.reel}
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={toggle}
            className="absolute bottom-5 left-5 inline-flex items-center gap-2.5 rounded-full bg-paper/90 px-4 py-2.5 text-sm font-semibold backdrop-blur md:bottom-8 md:left-8"
          >
            <span className={`size-2 rounded-full bg-lime-deep ${playing ? "animate-pulse" : ""}`} aria-hidden="true" />
            {playing ? "pause showreel" : "play showreel"}
          </button>
        </div>
      </div>
    </section>
  );
}
