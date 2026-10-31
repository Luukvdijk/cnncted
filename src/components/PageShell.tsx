import { ViewTransition } from "react";
import { getDictionary, type Locale } from "@/content";
import { Footer } from "./Footer";

/** Every page: content plus footer, sliding in as one piece on navigation. */
export function PageShell({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  const t = getDictionary(lang);
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div id="top">
        <main>{children}</main>
        <Footer lang={lang} t={t} />
      </div>
    </ViewTransition>
  );
}
