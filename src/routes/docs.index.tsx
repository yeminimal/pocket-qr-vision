import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { docsHub as page } from "@/content/docs";

export const Route = createFileRoute("/docs")({
  head: () => ({
    ...seo({
      title: "Documentation — Seeqr",
      description: "Guides, API reference, SDK docs and code examples for building with Seeqr QR detection.",
      path: "/docs",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
