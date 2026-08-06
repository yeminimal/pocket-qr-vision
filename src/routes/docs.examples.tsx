import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { codeExamples as page } from "@/content/docs";

export const Route = createFileRoute("/docs/examples")({
  head: () => ({
    ...seo({
      title: "Code Examples - Seeqr Docs",
      description: "Copy-paste Seeqr snippets for cURL, Node.js, React and Python.",
      path: "/docs/examples",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
