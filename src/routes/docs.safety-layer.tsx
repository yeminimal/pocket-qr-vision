import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { safetyLayer as page } from "@/content/docs";

export const Route = createFileRoute("/docs/safety-layer")({
  head: () => ({
    ...seo({
      title: "Safety Layer - Seeqr Docs",
      description: "How Seeqr scores decoded links: levels, signals and the limits of automated risk detection.",
      path: "/docs/safety-layer",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
