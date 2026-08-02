import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { blogIndex as page } from "@/content/pages";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    ...seo({
      title: "Blog — Seeqr",
      description: "Practical writing on QR codes, quishing and building lightweight software for low-end devices.",
      path: "/blog",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
