export const SITE_URL = "https://tryseeqr.vercel.app";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export function seo(opts: { title: string; description: string; path: string; type?: string }) {
  const url = `${SITE_URL}${opts.path === "/" ? "" : opts.path}`;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: opts.type ?? "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export type NavItem = { label: string; to: string; description?: string };

export const primaryNav: { label: string; to?: string; items?: NavItem[] }[] = [
  { label: "Home", to: "/" },
  {
    label: "Features",
    items: [
      { label: "Overview", to: "/features", description: "Everything Seeqr does" },
      { label: "QR Detection", to: "/features/qr-detection", description: "How decoding works" },
      {
        label: "Phishing Detection",
        to: "/features/phishing-detection",
        description: "Check links before you click",
      },
      { label: "Privacy First", to: "/features/privacy-first", description: "Nothing leaves your device" },
    ],
  },
  {
    label: "Docs",
    items: [
      { label: "Getting Started", to: "/docs/getting-started", description: "Your first scan" },
      { label: "Safety Layer", to: "/docs/safety-layer", description: "Risk scoring" },
    ],
  },
  { label: "Scan URL", to: "/scanner" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
];

export const footerColumns: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { label: "Scan QR codes", to: "/" },
      { label: "Scan a URL", to: "/scanner" },
      { label: "Features", to: "/features" },
    ],
  },
  {
    title: "Use cases",
    items: [
      { label: "Payment verification", to: "/use-cases/payments" },
      { label: "Document verification", to: "/use-cases/documents" },
      { label: "E-commerce & shipping", to: "/use-cases/ecommerce" },
      { label: "Event ticketing", to: "/use-cases/events" },
    ],
  },
  {
    title: "Guides",
    items: [
      { label: "Getting started", to: "/docs/getting-started" },
      { label: "Safety layer", to: "/docs/safety-layer" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Support", to: "/support" },
      { label: "vs Google Vision", to: "/vs/google-vision" },
      { label: "vs AWS Rekognition", to: "/vs/aws-rekognition" },
    ],
  },
];

export function faqJsonLd(sections: { type: string; items?: unknown }[]) {
  const faq = sections.find((s) => s.type === "faq") as
    | { items: { q: string; a: string }[] }
    | undefined;
  if (!faq) return [];
  return [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.items.map((i) => ({
          "@type": "Question",
          name: i.q,
          acceptedAnswer: { "@type": "Answer", text: i.a },
        })),
      }),
    },
  ];
}
