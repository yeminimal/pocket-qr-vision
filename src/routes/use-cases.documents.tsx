import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { documents as page } from "@/content/use-cases";

export const Route = createFileRoute("/use-cases/documents")({
  head: () => ({
    ...seo({
      title: "Document QR Verification - Seeqr",
      description: "Read QR codes on invoices, certificates and permits straight from a scan or photo.",
      path: "/use-cases/documents",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
