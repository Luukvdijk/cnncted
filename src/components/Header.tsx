"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/content";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { useScrollControl } from "./SmoothScroll";

export function Header({ lang, t }: { lang: string; t: Dictionary["nav"] }) {
  const pathname = usePathname();
  const scroll = useScrollControl();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${lang}/work`, label: t.work },
    { href: `/${lang}#services`, label: t.services },
    { href: `/${lang}/about`, label: t.about },
    { href: `/${lang}/contact`, label: t.contact },
  ];

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 160 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (open) scroll.stop();
    else scroll.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, scroll]);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-50 transition-[translate,background-color,box-shadow] duration-500 ease-(--ease-out-expo) ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled && !open ? "bg-paper/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : ""}`}
      >
        <div className="wrap flex h-[72px] items-center justify-between md:h-[84px]">
          <Logo href={`/${lang}`} />

          <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
            {links.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative inline-flex items-center gap-2 text-[1.05rem] font-semibold tracking-[-0.02em]"
              >
                <span
                  aria-hidden="true"
                  className={`size-2 rounded-full bg-lime-deep transition-transform duration-500 ease-(--ease-out-expo) ${
                    isActive(link.href) ? "scale-100" : "scale-0 group-hover:scale-100"
                  }`}
                />
                {link.label}
              </Link>
            ))}
            <Button href={`/${lang}/contact`} variant="ink" className="text-[0.95rem]">
              {t.cta}
            </Button>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-10 inline-flex h-11 items-center gap-2.5 rounded-full bg-ink px-4 text-sm font-semibold text-paper md:hidden"
          >
            <span className={`size-2 rounded-full bg-lime transition-transform duration-500 ${open ? "scale-150" : ""}`} />
            {open ? t.close : t.menu}
          </button>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would trap position:fixed children. */}
      <div
        id="mobile-menu"
        className={`on-lime fixed inset-0 z-40 flex flex-col bg-lime px-5 pt-28 pb-10 transition-[clip-path] duration-700 ease-(--ease-out-expo) md:hidden ${
          open ? "[clip-path:circle(150%_at_calc(100%-3rem)_2.5rem)]" : "pointer-events-none [clip-path:circle(0%_at_calc(100%-3rem)_2.5rem)]"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[clamp(3rem,15vw,5rem)] leading-[1] font-extrabold tracking-[-0.06em] transition-[opacity,translate] duration-700 ease-(--ease-out-expo)"
              style={{
                transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                opacity: open ? 1 : 0,
                translate: open ? "0 0" : "0 40px",
              }}
            >
              {link.label}
              <span className="dot" aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
