import { notFound } from "next/navigation";
import { CtaBlock } from "@/components/CtaBlock";
import { Hero } from "@/components/home/Hero";
import { Numbers } from "@/components/home/Numbers";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Statement } from "@/components/home/Statement";
import { WorkRail } from "@/components/home/WorkRail";
import { PageShell } from "@/components/PageShell";
import { Quote } from "@/components/Quote";
import { getDictionary, isLocale } from "@/content";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <PageShell lang={lang}>
      <Hero lang={lang} t={t.hero} />
      <Statement text={t.statement} />
      <WorkRail lang={lang} t={t.work} cases={t.cases} />
      <Services t={t.services} />
      <Process t={t.process} />
      <Numbers t={t.numbers} />
      <Quote t={t.quote} />
      <CtaBlock lang={lang} t={t.cta} />
    </PageShell>
  );
}
