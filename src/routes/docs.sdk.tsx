import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { sdkDocs as page } from "@/content/docs";

export const Route = createFileRoute("/docs/sdk")({
  head: () => ({
    ...seo({
      title: "SDK & NPM Package - Seeqr Docs",
      description: "Install the Seeqr TypeScript client and decode QR codes in the browser or on your server.",
      path: "/docs/sdk",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
