import Image from "next/image";
import type { Dictionary } from "@/content";
import { FadeIn } from "./FadeIn";

export function Quote({ t }: { t: Dictionary["quote"] }) {
  return (
    <section className="px-2 md:px-4">
      <div className="grid overflow-hidden rounded-[2rem] bg-mist md:grid-cols-12 md:rounded-[2.5rem]">
        <div className="relative aspect-[4/3] md:col-span-5 md:aspect-auto md:min-h-[38rem]">
          <Image
            src="/media/sport-run.jpg"
            alt="Player laughing mid-run on the training pitch"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        <FadeIn className="flex flex-col justify-center gap-10 p-8 md:col-span-7 md:p-16 lg:p-24">
          <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-full bg-ink text-5xl leading-none font-extrabold text-lime">
            <span className="translate-y-3">“</span>
          </span>
          <blockquote>
            <p className="text-[clamp(1.9rem,3.8vw,3.9rem)] leading-[1.02] font-bold tracking-[-0.045em]">{t.text}</p>
          </blockquote>
          <p className="meta text-base">{t.by}</p>
        </FadeIn>
      </div>
    </section>
  );
}
