export type Media =
  | { type: "image"; src: string; alt: string; width: number; height: number }
  | { type: "video"; src: string; poster: string; alt: string; width: number; height: number };

export type Case = {
  slug: string;
  sector: string;
  title: string;
  summary: string;
  client: string;
  services: string[];
  year: string;
  cover: Media;
  /** Plays on hover in work cards. */
  hoverVideo?: string;
  challenge: string;
  approach: string;
  createdTitle: string;
  gallery: Media[];
  behindTheScenes?: { title: string; text: string; media: Media[] };
  result: string;
};

export type Service = {
  name: string;
  text: string;
  items: string[];
};

export type Dictionary = {
  meta: { title: string; description: string };
  nav: { work: string; services: string; about: string; contact: string; cta: string; menu: string; close: string };
  hero: { before: string; words: string[]; sub: string; primary: string; secondary: string; reel: string };
  statement: string;
  work: { title: string; sub: string; all: string; view: string; more: string };
  services: { title: string; sub: string; list: Service[] };
  process: { title: string; steps: { name: string; text: string }[] };
  numbers: { value: string; label: string; text: string }[];
  quote: { text: string; by: string };
  cta: { title: string; sub: string; primary: string; secondary: string };
  footer: { tagline: string; site: string; contact: string; social: string; location: string; rights: string; top: string };
  workPage: { title: string; sub: string };
  casePage: { back: string; client: string; sector: string; services: string; year: string; challenge: string; approach: string; result: string; next: string };
  about: {
    title: string;
    intro: string;
    story: { title: string; text: string }[];
    teamTitle: string;
    teamSub: string;
    team: { name: string; role: string; photo: Media }[];
    valuesTitle: string;
    values: { name: string; text: string }[];
  };
  contact: {
    title: string;
    sub: string;
    fields: { name: string; company: string; email: string; website: string; need: string; budget: string; message: string; messagePlaceholder: string };
    needs: string[];
    budgets: string[];
    send: string;
    sent: { title: string; text: string };
    concept: string;
    details: { email: string; call: string; callLabel: string; location: string; reply: string; replyValue: string };
  };
  cases: Case[];
};
