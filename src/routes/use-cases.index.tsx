import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { useCasesHub as page } from "@/content/use-cases";

export const Route = createFileRoute("/use-cases")({
  head: () => ({
    ...seo({
      title: "QR Scanner Use Cases — Seeqr",
      description: "Payments, documents, shipping and ticketing: where reading QR codes from images saves time.",
      path: "/use-cases",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
