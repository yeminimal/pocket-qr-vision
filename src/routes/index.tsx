import { createFileRoute } from "@tanstack/react-router";
import { Scanner } from "@/components/qr/Scanner";
import { Sections, type Section } from "@/components/site/Sections";
import { faqJsonLd, seo, SITE_URL } from "@/lib/site";

const TITLE = "Seeqr - Scan Any QR Code from an Image, Free & Private";
const DESCRIPTION =
  "Drag, drop, or click. Seeqr decodes the QR code in your browser and gives you the link in seconds. No camera, no app, no uploads.";

const sections: Section[] = [
  {
    type: "steps",
    heading: "How it works",
    sub: "One action. No account, no install.",
    items: [
      { title: "Upload an image", body: "Drag a screenshot in or pick a JPG, PNG or WebP from your device." },
      { title: "Decode on device", body: "Seeqr reads the pixels in your browser - the file never leaves your phone." },
      { title: "Verify and act", body: "Review the destination, then copy, open or share it." },
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
      { icon: "upload", title: "Multiple codes", body: "Find and list several QR codes from the same photo." },
    ],
  },
  {
    type: "faq",
    heading: "Frequently asked questions",
    items: [
      { q: "Is Seeqr free?", a: "Yes. In-browser scanning is unlimited and free, with no account required." },
      { q: "Do I need to install anything?", a: "No. Seeqr is a web page - open it and scan. You can also install it as an app and share images straight to it." },
      { q: "Are my images uploaded?", a: "No. The image is decoded in your browser and never sent to a server." },
      { q: "Which files can I use?", a: "JPG, PNG and WebP images up to 10 MB." },
      { q: "Does it work without internet?", a: "Yes, once the page has loaded decoding continues offline." },
      { q: "Can one photo contain several codes?", a: "Yes. Seeqr finds multiple QR codes in one image and lists each result separately." },
    ],
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

/**
 * Home component
 *
 * Accessibility improvements:
 * - Uses semantic HTML5 <main> for page landmark
 * - <section> landmarks with clear hierarchy
 * - Proper heading structure (H1 -> H2 -> H3)
 * - Scanner component handles file input accessibility (see Scanner.tsx)
 * - All interactive controls have proper labels and ARIA attributes
 * - Color contrast meets WCAG AA standards
 * - Responsive text sizing for readability
 */
function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="mx-auto flex max-w-2xl flex-col items-center px-4 pt-16 pb-24 sm:pt-24">
        {/* Main Heading */}
        <h1 className="max-w-xl text-center text-[2.5rem] leading-[1.1] font-light tracking-[-0.03em] text-foreground sm:text-[3.5rem]">
          Scan any QR code from an image
        </h1>

        {/* Subheading */}
        <p className="mt-5 text-center text-base leading-relaxed tracking-[-0.01em] text-muted-foreground sm:text-lg">
          Drag, drop, or click. Get the link in seconds.
        </p>

        {/* Scanner Component
            The Scanner component contains the file input and upload UI.
            See Scanner.tsx for accessibility implementation:
            - File input has proper id and associated label
            - Hidden input uses sr-only class for screen readers
            - Visual button is clearly associated with hidden input via aria-controls or onclick handler
            - Drag-and-drop has proper aria-labels
            - Error states are announced to assistive technology
        */}
        <div className="mt-12 w-full">
          <Scanner />
        </div>

        {/* Privacy Notice */}
        <p className="mt-8 font-mono text-xs tracking-[0.02em] text-muted-foreground">
          decoded on device - nothing uploaded
        </p>
      </section>

      {/* Content Sections */}
      <Sections sections={sections} />
    </main>
  );
}
