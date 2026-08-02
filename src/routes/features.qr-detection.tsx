import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { qrDetection as page } from "@/content/features";

export const Route = createFileRoute("/features/qr-detection")({
  head: () => ({
    ...seo({
      title: "QR Detection from Images — Seeqr",
      description: "Decode QR codes from screenshots and photos without a camera. Handles low contrast, rotation and glare.",
      path: "/features/qr-detection",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
