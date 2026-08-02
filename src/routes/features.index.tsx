import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { featuresOverview as page } from "@/content/features";

export const Route = createFileRoute("/features/")({
  head: () => ({
    ...seo({
      title: "Features — Seeqr QR Scanner",
      description: "Image-based QR detection, phishing checks and fully private in-browser decoding. See everything Seeqr does.",
      path: "/features",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
