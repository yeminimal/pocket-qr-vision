import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { vsGoogleVision as page } from "@/content/pages";

export const Route = createFileRoute("/vs/google-vision")({
  head: () => ({
    ...seo({
      title: "Seeqr vs Google Cloud Vision - QR Scanning Compared",
      description: "A focused on-device QR decoder versus a general cloud vision API. See which fits your job.",
      path: "/vs/google-vision",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
