import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { payments as page } from "@/content/use-cases";

export const Route = createFileRoute("/use-cases/payments")({
  head: () => ({
    ...seo({
      title: "Payment QR Verification — Seeqr",
      description: "Check where a payment QR code leads before you send money. Decode it privately from a screenshot.",
      path: "/use-cases/payments",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
