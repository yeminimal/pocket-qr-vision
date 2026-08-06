import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { support as page } from "@/content/pages";

export const Route = createFileRoute("/support")({
  head: () => ({
    ...seo({
      title: "Support & Help - Seeqr",
      description: "Troubleshooting for failed scans, unsupported files and API keys, plus how to reach the team.",
      path: "/support",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
