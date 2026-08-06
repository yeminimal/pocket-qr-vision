import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { vsAwsRekognition as page } from "@/content/pages";

export const Route = createFileRoute("/vs/aws-rekognition")({
  head: () => ({
    ...seo({
      title: "Seeqr vs AWS Rekognition - QR Scanning Compared",
      description: "On-device QR decoding with no AWS setup, compared with Rekognition's broad vision features.",
      path: "/vs/aws-rekognition",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
