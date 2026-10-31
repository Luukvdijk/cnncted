import { site, type Dictionary } from "@/content";
import { Button } from "./Button";
import { Dot } from "./Dot";
import { FadeIn } from "./FadeIn";
import { Reveal } from "./Reveal";

export function CtaBlock({ lang, t }: { lang: string; t: Dictionary["cta"] }) {
  return (
    <section className="py-28 md:py-44">
      <div className="wrap">
        <Reveal className="display max-w-[11ch]">
          {t.title}
          <Dot />
        </Reveal>
        <FadeIn className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:items-end">
          <p className="lead max-w-lg text-grey md:col-span-5">{t.sub}</p>
          <div className="flex flex-col gap-6 md:col-span-7 md:items-end">
            <div className="flex flex-wrap gap-3">
              <Button href={`/${lang}/contact`} variant="ink">
                {t.primary}
              </Button>
              <Button href={site.calendly} variant="line" external>
                {t.secondary}
              </Button>
            </div>
            <a
              href={`mailto:${site.email}`}
              className="link-line text-[clamp(1.4rem,2.6vw,2.4rem)] font-bold tracking-[-0.04em]"
            >
              {site.email}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
