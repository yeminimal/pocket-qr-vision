import { createFileRoute, Link } from "@tanstack/react-router";
import { Sections, type Section } from "@/components/site/Sections";
import { faqJsonLd, seo, SITE_URL } from "@/lib/site";

const TITLE = "Seeqr — Scan QR Codes from Images, Free & Private";
const DESCRIPTION =
  "Upload any screenshot or photo and decode its QR code instantly in your browser. No camera, no app, no uploads — works on low-end devices and offline.";

const sections: Section[] = [
  {
    type: "stats",
    items: [
      { icon: "bolt", value: "<1s", label: "Typical decode time" },
      { icon: "lock", value: "0", label: "Images uploaded" },
      { icon: "clock", value: "100%", label: "Works offline" },
      { icon: "chart", value: "Free", label: "Unlimited scanning" },
    ],
  },
  {
    type: "steps",
    heading: "How it works",
    sub: "Three steps, no account, no install.",
    items: [
      { title: "Upload an image", body: "Drag a screenshot in or pick a JPG, PNG or WebP from your device." },
      { title: "Decode on device", body: "Seeqr reads the pixels in your browser — the file never leaves your phone." },
      { title: "Verify and act", body: "Review the destination and safety signals, then copy, open or share it." },
    ],
  },
  {
    type: "cards",
    heading: "Why people use Seeqr",
    sub: "Built for the phones and connections most QR tools ignore.",
    items: [
      { icon: "upload", title: "No camera needed", body: "Read codes from screenshots, chat forwards and PDFs.", to: "/features/qr-detection" },
      { icon: "shield", title: "Phishing checks", body: "See the real destination and risk signals before you tap.", to: "/features/phishing-detection" },
      { icon: "lock", title: "Fully private", body: "Decoding happens locally. Nothing is uploaded or stored.", to: "/features/privacy-first" },
      { icon: "bolt", title: "Tiny and fast", body: "Loads on slow networks and runs on entry-level devices." },
      { icon: "clock", title: "Offline capable", body: "Keeps decoding once the page has loaded." },
      { icon: "chart", title: "API and SDK", body: "Add the same detection to your own product.", to: "/docs/api" },
    ],
  },
  {
    type: "cards",
    heading: "Where it fits",
    cols: 4,
    items: [
      { icon: "card", title: "Payments", body: "Verify a payment code before money moves.", to: "/use-cases/payments" },
      { icon: "document", title: "Documents", body: "Read invoice and certificate codes.", to: "/use-cases/documents" },
      { icon: "package", title: "Shipping", body: "Decode labels from customer photos.", to: "/use-cases/ecommerce" },
      { icon: "ticket", title: "Ticketing", body: "Check tickets sent as screenshots.", to: "/use-cases/events" },
    ],
  },
  {
    type: "faq",
    heading: "Frequently asked questions",
    items: [
      { q: "Is Seeqr free?", a: "Yes. In-browser scanning is unlimited and free, with no account required." },
      { q: "Do I need to install anything?", a: "No. Seeqr is a web page — open it and scan." },
      { q: "Are my images uploaded?", a: "No. The image is decoded in your browser and never sent to a server." },
      { q: "Which files can I use?", a: "JPG, PNG and WebP images up to 10 MB." },
      { q: "Does it work without internet?", a: "Yes, once the page has loaded decoding continues offline." },
      { q: "Can I use it in my own app?", a: "Yes — the API and NPM SDK expose the same detection and safety layer." },
    ],
  },
  {
    type: "cta",
    heading: "Scan your first code now",
    sub: "Free, private and instant — on any device.",
    primary: { label: "Scan for free", to: "/app" },
    secondary: { label: "Explore features", to: "/features" },
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo({ title: TITLE, description: DESCRIPTION, path: "/" }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Seeqr",
          url: SITE_URL,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
      ...faqJsonLd(sections),
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      <div className="border-b border-border bg-primary-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">
            Free QR scanner for every device
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Scan QR codes from images — no camera, no app, no uploads
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {DESCRIPTION}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/app"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Scan for free
            </Link>
            <Link
              to="/docs/getting-started"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-primary px-6 text-sm font-medium text-primary transition-colors hover:bg-background"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </div>
      <Sections sections={sections} />
    </main>
  );
}
