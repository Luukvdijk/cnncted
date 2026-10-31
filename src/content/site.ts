export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];

export const site = {
  email: "info@cnnctedmedia.com",
  calendly: "https://calendly.com/cnnctedmedia-info/new-meeting",
  instagram: "https://www.instagram.com/cnncted.media/",
  linkedin: "https://www.linkedin.com/company/cnncted-media/",
  showreel: { src: "/media/showreel.mp4", poster: "/media/showreel-poster.jpg" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
