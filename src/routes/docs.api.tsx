import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { apiDocs as page } from "@/content/docs";

export const Route = createFileRoute("/docs/api")({
  head: () => ({
    ...seo({
      title: "API Documentation — Seeqr",
      description: "Endpoints, request and response shapes, error codes and rate limits for the Seeqr QR scanning API.",
      path: "/docs/api",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
