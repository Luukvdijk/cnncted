import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBlock } from "@/components/CtaBlock";
import { Dot } from "@/components/Dot";
import { FadeIn } from "@/components/FadeIn";
import { Media } from "@/components/Media";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale } from "@/content";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).nav.about };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const a = t.about;

  return (
    <PageShell lang={lang}>
      <section className="pt-36 md:pt-52">
        <div className="wrap">
          <Reveal as="h1" immediate className="display max-w-[12ch]">
            {a.title}
            <Dot />
          </Reveal>
          <FadeIn as="p" delay={0.3} className="lead mt-12 max-w-2xl text-grey md:mt-16 md:ml-[41.6%]">
            {a.intro}
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="wrap grid gap-5 md:grid-cols-12 md:gap-6">
          <FadeIn className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] md:col-span-7">
            <Image src="/media/sport-squad.jpg" alt="Players sitting together on the pitch between drills" fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
          </FadeIn>
          <FadeIn delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] md:col-span-5 md:mt-32">
            <Image src="/media/hospitality-sparkler.jpg" alt="Bottle service with a sparkler at a bar" fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover" />
          </FadeIn>
        </div>
      </section>

      <section className="pb-24 md:pb-36">
        <div className="wrap grid gap-14 md:grid-cols-2 md:gap-8">
          {a.story.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <h2 className="h3">
                {s.title}
                <Dot />
              </h2>
              <p className="lead mt-5 max-w-xl text-grey">{s.text}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="pb-24 md:pb-36">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <Reveal className="h2 md:col-span-7">
              {a.teamTitle}
              <Dot />
            </Reveal>
            <p className="lead text-grey md:col-span-5">{a.teamSub}</p>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 md:mt-20 md:gap-6">
            {a.team.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.1} className={i === 1 ? "md:mt-28" : ""}>
                <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-mist">
                  <Media item={p.photo} sizes="(min-width: 640px) 50vw, 100vw" />
                </div>
                <h3 className="h3 mt-6">
                  {p.name}
                  <Dot />
                </h3>
                <p className="meta mt-2 text-base">{p.role}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-2 md:px-4">
        <div className="on-dark rounded-[2rem] bg-ink py-20 text-paper md:rounded-[2.5rem] md:py-32">
          <div className="wrap">
            <Reveal className="h2">
              {a.valuesTitle}
              <Dot />
            </Reveal>
            <ul className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
              {a.values.map((v, i) => (
                <FadeIn as="li" key={v.name} delay={i * 0.1} className="border-t border-line-light pt-6">
                  <span aria-hidden="true" className="block size-5 rounded-full bg-lime" />
                  <h3 className="h3 mt-8">{v.name}</h3>
                  <p className="mt-3 max-w-xs text-[1.05rem] text-paper/70">{v.text}</p>
                </FadeIn>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBlock lang={lang} t={t.cta} />
    </PageShell>
  );
}
