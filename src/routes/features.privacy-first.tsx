import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { privacyFirst as page } from "@/content/features";

export const Route = createFileRoute("/features/privacy-first")({
  head: () => ({
    ...seo({
      title: "Privacy-First QR Scanning - Seeqr",
      description: "Seeqr decodes in your browser. Your images are never uploaded, stored or shared with anyone.",
      path: "/features/privacy-first",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
