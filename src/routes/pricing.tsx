import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { pricing as page } from "@/content/pages";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    ...seo({
      title: "Pricing - Seeqr QR Scanner & API",
      description: "Free unlimited in-browser scanning. Simple monthly plans when you need the Seeqr API.",
      path: "/pricing",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
