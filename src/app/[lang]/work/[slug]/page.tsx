import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Dot } from "@/components/Dot";
import { FadeIn } from "@/components/FadeIn";
import { Media } from "@/components/Media";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale, locales } from "@/content";

export function generateStaticParams() {
  return locales.flatMap((lang) => getDictionary(lang).cases.map((c) => ({ slug: c.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const c = getDictionary(lang).cases.find((x) => x.slug === slug);
  return c ? { title: c.sector, description: c.summary } : {};
}

export default async function CasePage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const index = t.cases.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const c = t.cases[index];
  const next = t.cases[(index + 1) % t.cases.length];
  const l = t.casePage;
  const cover = c.cover.type === "video" ? c.cover.poster : c.cover.src;

  return (
    <PageShell lang={lang}>
      <section className="pt-32 md:pt-44">
        <div className="wrap">
          <Link href={`/${lang}/work`} className="link-line text-base font-semibold">
            ← {l.back}
          </Link>
          <Reveal as="h1" immediate className="display mt-10 max-w-[12ch] md:mt-14">
            {c.title}
            <Dot />
          </Reveal>
          <FadeIn as="dl" className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-6 md:mt-16 md:grid-cols-4">
            <Fact term={l.client} value={c.client} />
            <Fact term={l.sector} value={c.sector} />
            <Fact term={l.services} value={c.services.join(", ")} />
            <Fact term={l.year} value={c.year} />
          </FadeIn>
        </div>

        <div className="wrap mt-10 md:mt-14">
          <ViewTransition name={`case-${c.slug}`} share="morph" default="none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-ink-soft sm:aspect-[16/10] lg:aspect-[16/8]">
              <Image src={cover} alt={c.cover.alt} fill priority sizes="100vw" className="object-cover object-[50%_42%]" />
            </div>
          </ViewTransition>
        </div>
      </section>

      <section className="py-24 md:py-36">
        <div className="wrap grid gap-14 md:grid-cols-12 md:gap-8">
          <FadeIn className="md:col-span-5">
            <h2 className="h3">
              {l.challenge}
              <Dot />
            </h2>
            <p className="lead mt-5 text-grey">{c.challenge}</p>
          </FadeIn>
          <FadeIn delay={0.1} className="md:col-span-6 md:col-start-7">
            <h2 className="h3">
              {l.approach}
              <Dot />
            </h2>
            <p className="lead mt-5 text-grey">{c.approach}</p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24 md:pb-36">
        <div className="wrap">
          <Reveal className="h2 max-w-[16ch]">
            {c.createdTitle}
          </Reveal>
          <div className="mt-14 columns-1 gap-5 sm:columns-2 md:mt-20 md:gap-6">
            {c.gallery.map((m, i) => (
              <FadeIn key={`${m.src}-${i}`} className="mb-5 break-inside-avoid md:mb-6">
                <div className="overflow-hidden rounded-[1.25rem] bg-mist" style={{ aspectRatio: `${m.width} / ${m.height}` }}>
                  <Media item={m} sizes="(min-width: 640px) 50vw, 100vw" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {c.behindTheScenes && (
        <section className="px-2 pb-24 md:px-4 md:pb-36">
          <div className="grid gap-10 rounded-[2rem] bg-mist p-6 md:grid-cols-12 md:rounded-[2.5rem] md:p-12 lg:p-16">
            <FadeIn className="md:col-span-4 md:self-center">
              <h2 className="h2 text-[clamp(2.2rem,4vw,4rem)]">
                {c.behindTheScenes.title}
                <Dot />
              </h2>
              <p className="lead mt-6 text-grey">{c.behindTheScenes.text}</p>
            </FadeIn>
            <div className="grid grid-cols-2 gap-4 md:col-span-8 md:gap-6">
              {c.behindTheScenes.media.map((m) => (
                <FadeIn key={m.src} className="overflow-hidden rounded-[1.25rem]" >
                  <div className="aspect-[4/5]">
                    <Media item={m} sizes="(min-width: 768px) 30vw, 50vw" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-2 md:px-4">
        <div className="on-lime rounded-[2rem] bg-lime px-6 py-20 md:rounded-[2.5rem] md:px-12 md:py-28 lg:px-16">
          <h2 className="h3">
            {l.result}
            <Dot />
          </h2>
          <FadeIn as="p" className="mt-8 max-w-[22ch] text-[clamp(2rem,4.6vw,4.6rem)] leading-[1] font-bold tracking-[-0.045em]">
            {c.result}
          </FadeIn>
        </div>
      </section>

      <section className="py-24 md:py-36">
        <div className="wrap">
          <Link
            href={`/${lang}/work/${next.slug}`}
            data-cursor={t.work.view}
            className="group grid items-end gap-8 border-t-2 border-ink pt-8 md:grid-cols-12"
          >
            <div className="md:col-span-8">
              <span className="meta text-base">
                {l.next}: {next.sector}
              </span>
              <span className="h2 mt-4 block transition-colors duration-500 group-hover:text-grey">
                {next.title}
                <Dot />
              </span>
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-[1.25rem] md:col-span-4">
              <Image
                src={next.cover.type === "video" ? next.cover.poster : next.cover.src}
                alt=""
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover transition-[scale] duration-[1400ms] ease-(--ease-out-expo) group-hover:scale-105"
              />
            </div>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

function Fact({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="meta">{term}</dt>
      <dd className="mt-1 text-[1.05rem] font-semibold tracking-[-0.015em]">{value}</dd>
    </div>
  );
}
