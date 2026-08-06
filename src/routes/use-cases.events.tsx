import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { faqJsonLd, seo } from "@/lib/site";
import { events as page } from "@/content/use-cases";

export const Route = createFileRoute("/use-cases/events")({
  head: () => ({
    ...seo({
      title: "Event Ticket QR Scanning - Seeqr",
      description: "Validate ticket codes from attendee screenshots on any staff phone, even offline.",
      path: "/use-cases/events",
    }),
    scripts: faqJsonLd(page.sections),
  }),
  component: () => <PageShell page={page} />,
});
