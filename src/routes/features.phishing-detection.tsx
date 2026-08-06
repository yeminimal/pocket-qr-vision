import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { phishingDetection as page } from "@/content/features";

export const Route = createFileRoute("/features/phishing-detection")({
  head: () => ({
    ...seo({
      title: "QR Phishing Detection - Seeqr",
      description: "See where a QR code leads before you tap. Seeqr flags redirects, lookalike domains and insecure links.",
      path: "/features/phishing-detection",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
