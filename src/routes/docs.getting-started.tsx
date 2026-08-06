import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { gettingStarted as page } from "@/content/docs";

export const Route = createFileRoute("/docs/getting-started")({
  head: () => ({
    ...seo({
      title: "Getting Started - Seeqr Docs",
      description: "Scan your first QR code and make your first Seeqr API request in a few minutes.",
      path: "/docs/getting-started",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
