import Image from "next/image";
import Link from "next/link";
import { site, type Dictionary } from "@/content";

export function Footer({ lang, t }: { lang: string; t: Dictionary }) {
  const f = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark overflow-hidden bg-ink text-paper">
      <div className="wrap grid gap-12 pt-20 pb-10 md:grid-cols-12 md:pt-28">
        <div className="md:col-span-5">
          <Image src="/media/logo-mark.png" alt="" width={56} height={56} className="size-14 rounded-full ring-1 ring-line-light" />
          <p className="lead mt-6 max-w-sm text-paper/80">{f.tagline}</p>
        </div>

        <FooterCol title={f.site} className="md:col-span-2 md:col-start-7">
          <FooterLink href={`/${lang}/work`}>{t.nav.work}</FooterLink>
          <FooterLink href={`/${lang}#services`}>{t.nav.services}</FooterLink>
          <FooterLink href={`/${lang}/about`}>{t.nav.about}</FooterLink>
          <FooterLink href={`/${lang}/contact`}>{t.nav.contact}</FooterLink>
        </FooterCol>

        <FooterCol title={f.contact} className="md:col-span-2">
          <FooterLink href={`mailto:${site.email}`}>{site.email}</FooterLink>
          <FooterLink href={site.calendly} external>
            {t.cta.secondary}
          </FooterLink>
          <span className="text-paper/60">{f.location}</span>
        </FooterCol>

        <FooterCol title={f.social} className="md:col-span-2">
          <FooterLink href={site.instagram} external>
            Instagram
          </FooterLink>
          <FooterLink href={site.linkedin} external>
            LinkedIn
          </FooterLink>
        </FooterCol>
      </div>

      <div className="wrap" aria-hidden="true">
        <p className="pb-[0.06em] text-[23.4vw] leading-[0.8] font-extrabold tracking-[-0.075em] select-none 2xl:text-[23.4rem]">
          cnncted<span className="dot" />
        </p>
      </div>

      <div className="border-t border-line-light">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-paper/60">
          <span>
            © {year} {f.rights}
          </span>
          <a href="#top" className="link-line text-paper">
            {f.top} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="text-sm text-paper/50">{title}</h2>
      <div className="mt-4 flex flex-col items-start gap-2 text-[1.05rem] font-medium">{children}</div>
    </div>
  );
}

function FooterLink({ href, external, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className="link-line" {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className="link-line">
      {children}
    </Link>
  );
}
