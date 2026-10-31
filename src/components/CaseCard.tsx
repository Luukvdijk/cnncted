"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, ViewTransition } from "react";
import type { Case } from "@/content";
import { Dot } from "./Dot";

/** A project tile. Its cover morphs into the case page hero on click. */
export function CaseCard({
  c,
  lang,
  viewLabel,
  sizes,
  mediaClassName = "aspect-[4/5]",
  titleClassName = "",
  className = "",
}: {
  c: Case;
  lang: string;
  viewLabel: string;
  sizes: string;
  mediaClassName?: string;
  titleClassName?: string;
  className?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const cover = c.cover.type === "video" ? c.cover.poster : c.cover.src;

  return (
    <Link
      href={`/${lang}/work/${c.slug}`}
      data-cursor={viewLabel}
      className={`group block ${className}`}
      onMouseEnter={() => video.current?.play().catch(() => {})}
      onMouseLeave={() => video.current?.pause()}
    >
      <ViewTransition name={`case-${c.slug}`} share="morph" default="none">
        <div className={`relative overflow-hidden rounded-[1.25rem] bg-ink-soft ${mediaClassName}`}>
          <Image
            src={cover}
            alt={c.cover.alt}
            fill
            sizes={sizes}
            className="object-cover transition-[scale] duration-[1400ms] ease-(--ease-out-expo) group-hover:scale-[1.05]"
          />
          {c.hoverVideo && (
            <video
              ref={video}
              src={c.hoverVideo}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          <span className="absolute top-4 left-4 flex gap-1.5 text-[0.8rem] font-semibold text-ink">
            <span className="rounded-full bg-paper px-3.5 py-1.5">{c.sector}</span>
            <span className="rounded-full bg-paper/80 px-3.5 py-1.5 backdrop-blur">{c.year}</span>
          </span>
        </div>
      </ViewTransition>
      <h3 className={`h3 mt-5 ${titleClassName}`}>
        {c.title}
        <Dot />
      </h3>
      <p className="meta mt-2 max-w-md">{c.summary}</p>
    </Link>
  );
}
