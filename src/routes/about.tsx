import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { about as page } from "@/content/pages";

export const Route = createFileRoute("/about")({
  head: () => ({
    ...seo({
      title: "About Seeqr - Built for Low-End Devices",
      description: "Why we built a QR scanner that works on budget phones, slow networks and without a camera.",
      path: "/about",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
