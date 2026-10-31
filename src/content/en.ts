import type { Dictionary, Media } from "./types";

const img = (src: string, alt: string, width: number, height: number): Media => ({
  type: "image",
  src: `/media/${src}`,
  alt,
  width,
  height,
});

const vid = (name: string, alt: string): Media => ({
  type: "video",
  src: `/media/${name}.mp4`,
  poster: `/media/${name}-poster.jpg`,
  alt,
  width: 1280,
  height: 720,
});

export const en: Dictionary = {
  meta: {
    title: "Cnncted | Creative marketing agency, Amsterdam",
    description:
      "Cnncted builds the whole online presence of ambitious brands: strategy, content, social and growth, made by one team from Amsterdam.",
  },
  nav: {
    work: "work",
    services: "services",
    about: "about",
    contact: "contact",
    cta: "let's talk",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    before: "we connect brands with their",
    words: ["guests", "fans", "crowd", "customers"],
    sub: "Cnncted is a creative marketing agency from Amsterdam. We build your whole online presence: strategy, content, social and growth, made by one team that's on set, in the edit and on your numbers.",
    primary: "see our work",
    secondary: "start a project",
    reel: "Showreel: a road rally in Italy, a car interior and a violinist on stage at the Diversity Sport Awards",
  },
  statement:
    "Most brands don't need more posts. They need a reason to be followed. We find that reason, shoot it, post it, push it and measure it, until yours is the brand people look for.",
  work: {
    title: "selected work",
    sub: "Four worlds, one way of working. Every frame shot by our own crew.",
    all: "all work",
    view: "view",
    more: "see every project",
  },
  services: {
    title: "everything your brand needs online, connected",
    sub: "Hire us for one part or hand us the whole thing. Most partners start with content and grow into all four.",
    list: [
      {
        name: "strategy & brand",
        text: "Who you are, who you're for and why they should care. Positioning, identity and a plan that ties every post to a goal.",
        items: ["Positioning", "Visual identity", "Creative direction", "Content strategy"],
      },
      {
        name: "content & production",
        text: "Photo and video built around one creative idea, shot by our own crew and made for the platform it lands on.",
        items: ["Photography", "Video production", "Social-first content", "Campaign concepts"],
      },
      {
        name: "social & community",
        text: "Day-to-day channel management that turns content into a following, and a following into demand.",
        items: ["Platform management", "Community and engagement", "Captions and copy", "Monthly reporting"],
      },
      {
        name: "paid & growth",
        text: "Paid social and amplification that puts the work in front of the right people, with numbers you can actually read.",
        items: ["Meta, TikTok and Google ads", "Influencer collaborations", "Campaign amplification", "Performance reporting"],
      },
    ],
  },
  process: {
    title: "from first idea to last number",
    steps: [
      {
        name: "position",
        text: "We learn the brand, the room and the audience, and decide how you should be seen before a single frame is shot.",
      },
      { name: "create", text: "Photography, video and campaigns that bring that position to life." },
      {
        name: "amplify",
        text: "The work goes out where it counts, organic and paid, to the people who should see it.",
      },
      { name: "grow", text: "We track what works, fix what doesn't and build on it, month after month." },
    ],
  },
  numbers: [
    { value: "4", label: "disciplines", text: "Strategy, content, social and growth under one roof." },
    { value: "1", label: "team", text: "The people who plan the shoot are the ones holding the camera." },
    { value: "0", label: "handoffs", text: "No chain of freelancers between your brief and the result." },
  ],
  quote: {
    text: "Cnncted understood the room before they ever picked up a camera.",
    by: "Hospitality client, Amsterdam",
  },
  cta: {
    title: "let's get connected",
    sub: "Tell us about your brand and where you want it to go. We reply within one business day.",
    primary: "start a project",
    secondary: "book a call",
  },
  footer: {
    tagline: "A creative marketing agency for brands that want to be seen. Strategy, content, social and growth, connected.",
    site: "Site",
    contact: "Contact",
    social: "Social",
    location: "Amsterdam, NL",
    rights: "Cnncted",
    top: "back to top",
  },
  workPage: {
    title: "the work",
    sub: "Hospitality, sport, lifestyle and culture. Different rooms, same approach: be there, shoot it right, make it travel.",
  },
  casePage: {
    back: "all work",
    client: "Client",
    sector: "Sector",
    services: "What we did",
    year: "Year",
    challenge: "The challenge",
    approach: "Our approach",
    result: "The result",
    next: "next project",
  },
  about: {
    title: "built by people who'd rather be on set",
    intro:
      "Cnncted started with a camera, a pitch and a belief that brands deserve more than an agency that never leaves the office. Today we run the whole picture for the brands we work with: strategy, content, social and growth.",
    story: [
      {
        title: "why these worlds",
        text: "Restaurants, clubs, teams and events live or die by how they're seen before anyone walks in. That's a creative problem, not a marketing checklist, and it's the one we like solving most.",
      },
      {
        title: "where we're going",
        text: "Content is where we started, not where we stop. We want to be the partner that owns a brand's entire online presence, from the first idea to the numbers at the end of the month.",
      },
    ],
    teamTitle: "the crew",
    teamSub: "Small and hands-on. The people who plan the shoot are the ones holding the camera.",
    team: [
      {
        name: "Floris",
        role: "Founder and creative direction",
        photo: img("team-floris.jpg", "Floris filming pitch-side with a gimbal", 1584, 2400),
      },
      {
        name: "Joshua",
        role: "Photography and film",
        photo: img("team-joshua.jpg", "Joshua shooting with a telephoto lens from pitch level", 1152, 2048),
      },
    ],
    valuesTitle: "how we work",
    values: [
      { name: "small by design", text: "No account managers between you and the people doing the work." },
      { name: "on site, not in a meeting", text: "We're there for the shoot, in the edit and still around a month later." },
      { name: "fast when it matters", text: "Same-week turnarounds when the moment won't wait." },
    ],
  },
  contact: {
    title: "let's get connected",
    sub: "Tell us about your brand and what you need. We reply within one business day.",
    fields: {
      name: "Your name",
      company: "Company",
      email: "Email",
      website: "Website or Instagram",
      need: "What do you need?",
      budget: "Monthly budget",
      message: "Tell us more",
      messagePlaceholder: "Where is your brand now, and where do you want it to be?",
    },
    needs: ["Strategy & brand", "Content & production", "Social & community", "Paid & growth", "All of it", "Not sure yet"],
    budgets: ["Under €2.5k", "€2.5k to €5k", "€5k to €10k", "€10k+"],
    send: "send message",
    sent: { title: "message received", text: "Thanks. We'll get back to you within one business day." },
    concept: "Concept: this form doesn't send anything yet.",
    details: {
      email: "Email",
      call: "Prefer to talk?",
      callLabel: "Book a call",
      location: "Studio",
      reply: "Reply time",
      replyValue: "Within one business day",
    },
  },
  cases: [
    {
      slug: "hospitality",
      sector: "Hospitality",
      title: "plated, poured, impossible to skip",
      summary: "Menu photography and nightlife content for a fine-dining kitchen and bar.",
      client: "Fine-dining kitchen and bar, Amsterdam",
      services: ["Photography", "Content", "Social"],
      year: "2025 to now",
      cover: img("hospitality-dessert.jpg", "Plated dessert at a fine-dining kitchen", 1600, 2400),
      challenge:
        "The food was already exceptional. The content around it wasn't: inconsistent, dimly lit and easy to scroll past on a feed built for split-second decisions.",
      approach:
        "We spent service nights on site, shooting plates as they left the pass and the room as it filled up, and paired the menu photography with nightlife content from the bar. One team, one visual language for both.",
      createdTitle: "menu photography. bar content. one feed.",
      gallery: [
        img("hospitality-dessert.jpg", "Plated dessert with a quenelle and cocoa dust", 1600, 2400),
        img("hospitality-sparkler.jpg", "Bottle service with a sparkler at the bar", 1351, 2400),
      ],
      result: "An ongoing content partnership covering the kitchen, the bar and the room. Still running.",
    },
    {
      slug: "sport",
      sector: "Sport",
      title: "off the pitch is half the story",
      summary: "Match-day and behind-the-scenes content for a first-team squad.",
      client: "First-team squad and youth academy",
      services: ["Photography", "Video", "Content"],
      year: "2025 to now",
      cover: img("sport-keeper-dive.jpg", "Goalkeeper mid-air in a diving save", 1519, 2048),
      challenge:
        "Match highlights already existed. What was missing was the culture around the team: training, the sideline and the moments in between that make a following feel personal.",
      approach:
        "We embedded with the squad across training and match days. Long lens on the sideline, gimbal on the pitch, catching the action and everything around it.",
      createdTitle: "match action. training days. the in-between.",
      gallery: [
        img("sport-sprint-bw.jpg", "Black and white shot of a player sprinting in training", 1152, 2048),
        img("sport-squad.jpg", "Players sitting together on the pitch between drills", 2048, 1287),
        img("sport-strike-blur.jpg", "Motion-blurred player striking the ball", 1152, 2048),
        img("sport-run.jpg", "Player laughing mid-run on the training pitch", 1152, 2048),
        img("sport-keeper-sit.jpg", "Goalkeeper sitting on the pitch with the ball", 1152, 2048),
        img("sport-portrait.jpg", "Player portrait in training kit", 1152, 2048),
        img("sport-laugh.jpg", "Player laughing with his hands on his head", 1152, 2048),
      ],
      behindTheScenes: {
        title: "shot from the sideline, not the stands",
        text: "Long lenses and gimbal rigs, positioned pitch-side for every session, not just match day.",
        media: [
          img("team-floris.jpg", "Cnncted crew filming pitch-side with a gimbal", 1584, 2400),
          img("team-joshua.jpg", "Cnncted crew shooting with a telephoto lens from pitch level", 1152, 2048),
        ],
      },
      result: "A growing library of match and behind-the-scenes content, used across the club's channels and in sponsor reporting.",
    },
    {
      slug: "lifestyle",
      sector: "Lifestyle & automotive",
      title: "built for people who move fast",
      summary: "On-the-road content for a lifestyle and automotive audience.",
      client: "Lifestyle and automotive audience",
      services: ["Video", "Content", "Social"],
      year: "2025",
      cover: img("lifestyle-rally.jpg", "Sports cars lined up at a road rally in an Italian town", 2048, 1152),
      hoverVideo: "/media/lifestyle-road.mp4",
      challenge:
        "Automotive content is full of studio turntables and stock b-roll. This had to feel lived in, shot where the story actually happens.",
      approach:
        "We shot on location, behind the wheel and along a road rally, following the story instead of staging it. Fast setups, natural light, cut for feed-first platforms.",
      createdTitle: "on the road, not in the studio",
      gallery: [
        vid("lifestyle-road", "Cars at a road rally and a driver behind the wheel"),
        img("lifestyle-driver.jpg", "Driver in a convertible sports car", 2048, 1152),
        img("lifestyle-rally.jpg", "Crowd watching sports cars at a road rally", 2048, 1152),
      ],
      result: "Content cut fast and shipped while the story was still relevant.",
    },
    {
      slug: "events",
      sector: "Events & culture",
      title: "the room, the crowd, the night",
      summary: "Festival, awards and nightlife coverage that captures culture as it happens.",
      client: "Festivals, award shows and nightlife venues",
      services: ["Photography", "Video", "Content"],
      year: "2025",
      cover: img("events-festival.jpg", "Crowd in front of a festival stage", 2048, 1152),
      hoverVideo: "/media/events-stage.mp4",
      challenge:
        "Live events move fast. The best moment happens once, and there's no retake for a crowd reaction or a song.",
      approach:
        "We cover the full arc of the night: the stage, the crowd, the performance and the room after hours, shot to be edited and posted while the event is still trending.",
      createdTitle: "the stage. the crowd. the after-hours.",
      gallery: [
        img("events-festival.jpg", "Wide shot of a festival crowd and stage", 2048, 1152),
        vid("events-stage", "Violinist performing at the Diversity Sport Awards"),
        img("events-night.jpg", "Guests laughing at a nightlife event", 1600, 2400),
        img("events-violin.jpg", "Violinist on stage under green and purple lights", 2048, 1152),
      ],
      result: "Same-week recap content, delivered while people were still talking about it.",
    },
  ],
};
