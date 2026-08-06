import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { quishingGuide as page } from "@/content/pages";

export const Route = createFileRoute("/blog/qr-phishing-guide")({
  head: () => ({
    ...seo({
      title: "The Complete Guide to QR Phishing (Quishing) - Seeqr",
      description: "How QR phishing works, where it appears, and the checks that actually protect you.",
      path: "/blog/qr-phishing-guide",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
