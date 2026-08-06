import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { ecommerce as page } from "@/content/use-cases";

export const Route = createFileRoute("/use-cases/ecommerce")({
  head: () => ({
    ...seo({
      title: "E-commerce & Shipping QR Scanning - Seeqr",
      description: "Decode tracking labels and return codes from customer screenshots without leaving the ticket.",
      path: "/use-cases/ecommerce",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
