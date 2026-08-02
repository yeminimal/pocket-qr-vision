import type { ContentPage } from "@/components/site/PageShell";

const cta = {
  type: "cta" as const,
  heading: "Try it with your own image",
  sub: "Free, private, and instant.",
  primary: { label: "Scan for free", to: "/app" },
  secondary: { label: "See pricing", to: "/pricing" },
};

export const useCasesHub: ContentPage = {
  eyebrow: "Use cases",
  h1: "Where Seeqr fits",
  intro:
    "Anywhere a QR code arrives as an image instead of on a wall, Seeqr saves a device, a step, or a costly mistake.",
  primary: { label: "Scan for free", to: "/app" },
  sections: [
    {
      type: "cards",
      heading: "Popular use cases",
      items: [
        { icon: "card", title: "Payment verification", body: "Confirm a payment code's destination before sending money.", to: "/use-cases/payments" },
        { icon: "document", title: "Document verification", body: "Read codes embedded in invoices, certificates and IDs.", to: "/use-cases/documents" },
        { icon: "package", title: "E-commerce & shipping", body: "Decode labels and return codes from customer screenshots.", to: "/use-cases/ecommerce" },
        { icon: "ticket", title: "Event ticketing", body: "Validate tickets sent as images when a scanner gun is unavailable.", to: "/use-cases/events" },
      ],
      cols: 4,
    },
    cta,
  ],
};

export const payments: ContentPage = {
  eyebrow: "Use case",
  h1: "Payment QR verification",
  intro:
    "Payment codes are the highest-stakes QR codes people scan — and the ones fraudsters target most. Seeqr shows the destination before money moves.",
  primary: { label: "Verify a code", to: "/app" },
  sections: [
    {
      type: "prose",
      heading: "The problem",
      paragraphs: [
        "A payment code forwarded in a chat looks identical to a legitimate one. Fraudsters replace codes on invoices, cover stickers on terminals, and send lookalike payment pages that mirror a real brand.",
        "Because the payload is not human-readable, the first moment a payer sees the destination is usually after their banking app has already opened.",
      ],
    },
    {
      type: "list",
      heading: "How Seeqr helps",
      items: [
        "Decode the code from the screenshot you were sent, without opening it",
        "See the full destination host and any redirect hops",
        "Get flagged when a domain imitates a bank or wallet brand",
        "Copy the value into your own records before paying",
      ],
    },
    {
      type: "faq",
      heading: "Questions",
      items: [
        { q: "Does Seeqr process payments?", a: "No. Seeqr only decodes and inspects the code — it never initiates a transaction." },
        { q: "Can Seeqr guarantee a payment code is genuine?", a: "No. It surfaces the information you need to judge, and flags known risk patterns. Always confirm unexpected requests through a trusted channel." },
      ],
    },
    cta,
  ],
};

export const documents: ContentPage = {
  eyebrow: "Use case",
  h1: "Document verification",
  intro:
    "Invoices, certificates, permits and IDs increasingly carry a QR code that points to an authoritative record. Seeqr reads those codes from a scan or photo of the page.",
  primary: { label: "Scan a document", to: "/app" },
  sections: [
    {
      type: "list",
      heading: "Typical workflows",
      items: [
        "Finance teams checking supplier invoice codes against the issuer's domain",
        "HR verifying credential and certificate codes from applicant PDFs",
        "Front-desk staff reading permit codes on printed paperwork",
        "Anyone confirming a code on a document photographed with a phone",
      ],
    },
    {
      type: "prose",
      heading: "Why images, not cameras",
      paragraphs: [
        "Documents usually arrive digitally. Printing a PDF just to scan its code with a phone wastes time and introduces errors. Seeqr reads the page image you already have, including screenshots taken at an angle or with uneven lighting.",
      ],
    },
    cta,
  ],
};

export const ecommerce: ContentPage = {
  eyebrow: "Use case",
  h1: "E-commerce and shipping",
  intro:
    "Support teams receive label photos and return codes as attachments all day. Seeqr turns them into text without leaving the ticket.",
  primary: { label: "Try a label", to: "/app" },
  sections: [
    {
      type: "list",
      heading: "What teams use it for",
      items: [
        "Reading tracking codes from customer photos of a shipping label",
        "Decoding return authorisation codes sent as screenshots",
        "Checking that a marketplace listing code points to the expected domain",
        "Verifying promotional codes on printed inserts before a campaign goes live",
      ],
    },
    {
      type: "steps",
      heading: "A typical support flow",
      items: [
        { title: "Customer attaches a photo", body: "Usually a phone shot of a label or packing slip." },
        { title: "Agent uploads it to Seeqr", body: "The value is decoded locally in the browser in under a second." },
        { title: "Agent pastes the value", body: "Straight into the carrier lookup or the ticket record." },
      ],
    },
    cta,
  ],
};

export const events: ContentPage = {
  eyebrow: "Use case",
  h1: "Event ticketing",
  intro:
    "When a ticket arrives as a screenshot and the scanner gun is busy, dead, or missing, a phone with a browser is enough.",
  primary: { label: "Scan a ticket", to: "/app" },
  sections: [
    {
      type: "list",
      heading: "At the door",
      items: [
        "Decode ticket codes from attendee screenshots and forwarded images",
        "Keep working when venue Wi-Fi drops — decoding is offline",
        "Run on staff phones without installing anything",
        "Copy the ticket ID straight into your check-in system",
      ],
    },
    {
      type: "prose",
      heading: "Pairing with your check-in system",
      paragraphs: [
        "Seeqr decodes the value; your ticketing platform decides whether it is valid and unused. For high-volume gates, the API lets you decode server-side and hand the value directly to your validation endpoint.",
      ],
    },
    cta,
  ],
};
