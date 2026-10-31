"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/** A lime bubble that follows the pointer over anything with `data-cursor="label"`. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    let active = false;

    const onMove = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const target = (e.target as Element | null)?.closest?.("[data-cursor]");
      const next = target?.getAttribute("data-cursor") ?? "";
      if (!!next !== active) {
        active = !!next;
        gsap.to(el, { scale: active ? 1 : 0, duration: 0.5, ease: "expo.out", overwrite: "auto" });
      }
      if (next) setLabel(next);
    };
    const onLeave = () => {
      active = false;
      gsap.to(el, { scale: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ transform: "scale(0)" }}
      className="pointer-events-none fixed top-0 left-0 z-[60] -mt-12 -ml-12 hidden size-24 items-center justify-center rounded-full bg-lime text-[0.95rem] font-bold tracking-[-0.02em] text-ink [@media(pointer:fine)]:flex"
    >
      {label}
    </div>
  );
}
