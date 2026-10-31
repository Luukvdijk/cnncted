import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { Dot } from "@/components/Dot";
import { FadeIn } from "@/components/FadeIn";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale, site } from "@/content";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).nav.contact };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const c = t.contact;

  return (
    <PageShell lang={lang}>
      <section className="pt-36 pb-28 md:pt-52 md:pb-40">
        <div className="wrap">
          <Reveal as="h1" immediate className="display max-w-[11ch]">
            {c.title}
            <Dot />
          </Reveal>
          <FadeIn as="p" delay={0.3} className="lead mt-10 max-w-xl text-grey">
            {c.sub}
          </FadeIn>

          <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-8">
            <FadeIn delay={0.4} className="lg:col-span-7">
              <ContactForm t={c} />
            </FadeIn>

            <FadeIn as="aside" delay={0.5} className="lg:col-span-4 lg:col-start-9">
              <dl className="grid gap-0 lg:sticky lg:top-32">
                <Detail term={c.details.email}>
                  <a href={`mailto:${site.email}`} className="link-line">
                    {site.email}
                  </a>
                </Detail>
                <Detail term={c.details.call}>
                  <Button href={site.calendly} variant="lime" external className="mt-2">
                    {c.details.callLabel}
                  </Button>
                </Detail>
                <Detail term={c.details.location}>{t.footer.location}</Detail>
                <Detail term={c.details.reply}>{c.details.replyValue}</Detail>
                <Detail term={t.footer.social}>
                  <span className="flex gap-5">
                    <a href={site.instagram} target="_blank" rel="noreferrer" className="link-line">
                      Instagram
                    </a>
                    <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-line">
                      LinkedIn
                    </a>
                  </span>
                </Detail>
              </dl>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Detail({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-6 last:border-b">
      <dt className="meta">{term}</dt>
      <dd className="mt-1.5 text-[1.2rem] font-semibold tracking-[-0.02em]">{children}</dd>
    </div>
  );
}
