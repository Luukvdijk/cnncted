import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/CaseCard";
import { CtaBlock } from "@/components/CtaBlock";
import { Dot } from "@/components/Dot";
import { FadeIn } from "@/components/FadeIn";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale } from "@/content";

export async function generateMetadata({ params }: PageProps<"/[lang]/work">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).nav.work };
}

// Alternating wide and narrow tiles, the narrow ones dropped a little lower.
const layout = [
  { col: "md:col-span-7", media: "aspect-[4/5] md:aspect-[5/6]", offset: "" },
  { col: "md:col-span-5", media: "aspect-[4/5]", offset: "md:mt-48" },
  { col: "md:col-span-5", media: "aspect-[4/5] md:aspect-[4/5]", offset: "md:mt-24" },
  { col: "md:col-span-7", media: "aspect-[3/2]", offset: "md:mt-72" },
];

export default async function WorkPage({ params }: PageProps<"/[lang]/work">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <PageShell lang={lang}>
      <section className="pt-36 pb-16 md:pt-52 md:pb-24">
        <div className="wrap grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal as="h1" immediate className="display md:col-span-7">
            {t.workPage.title}
            <Dot />
          </Reveal>
          <FadeIn className="lead text-grey md:col-span-5">{t.workPage.sub}</FadeIn>
        </div>
      </section>

      <section className="pb-12">
        <div className="wrap grid gap-x-8 gap-y-20 md:grid-cols-12">
          {t.cases.map((c, i) => {
            const l = layout[i % layout.length];
            return (
              <FadeIn key={c.slug} className={`${l.col} ${l.offset}`}>
                <CaseCard
                  c={c}
                  lang={lang}
                  viewLabel={t.work.view}
                  sizes="(min-width: 768px) 55vw, 100vw"
                  mediaClassName={l.media}
                />
              </FadeIn>
            );
          })}
        </div>
      </section>

      <CtaBlock lang={lang} t={t.cta} />
    </PageShell>
  );
}
