import { Dot } from "@/components/Dot";
import { FadeIn } from "@/components/FadeIn";
import type { Dictionary } from "@/content";

export function Numbers({ t }: { t: Dictionary["numbers"] }) {
  return (
    <section className="py-28 md:py-40">
      <div className="wrap grid gap-14 md:grid-cols-3 md:gap-8">
        {t.map((n, i) => (
          <FadeIn key={n.label} delay={i * 0.1} className="border-t-2 border-ink pt-6">
            <p className="text-[clamp(8rem,17vw,16rem)] leading-[0.78] font-extrabold tracking-[-0.08em]">{n.value}</p>
            <h3 className="h3 mt-6">
              {n.label}
              <Dot />
            </h3>
            <p className="meta mt-3 max-w-xs text-base">{n.text}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
