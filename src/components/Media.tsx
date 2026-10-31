"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Media as MediaItem } from "@/content";

/** Muted loop that only plays while it's on screen. */
export function InViewVideo({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className={className}
    />
  );
}

export function Media({
  item,
  sizes,
  className = "",
  priority = false,
}: {
  item: MediaItem;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  if (item.type === "video") {
    return <InViewVideo src={item.src} poster={item.poster} label={item.alt} className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <Image
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      sizes={sizes}
      priority={priority}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
