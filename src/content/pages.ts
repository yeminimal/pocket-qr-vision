import type { ContentPage } from "@/components/site/PageShell";

export const pricing: ContentPage = {
  eyebrow: "Pricing",
  h1: "Free to scan. Simple to build on.",
  intro:
    "The scanner is free forever. Pay only when you need the API for your own product.",
  sections: [
    {
      type: "pricing",
      tiers: [
        {
          name: "Free",
          price: "$0",
          note: "For everyday scanning",
          features: [
            "Unlimited in-browser scans",
            "Phishing and risk signals",
            "Works offline",
            "100 API requests / month",
            "Community support",
          ],
          cta: { label: "Start scanning", to: "/app" },
        },
        {
          name: "Developer",
          price: "$19/mo",
          note: "For apps and internal tools",
          featured: true,
          features: [
            "25,000 API requests / month",
            "10 requests / second",
            "Safety scoring on every request",
            "NPM SDK with TypeScript types",
            "Email support",
          ],
          cta: { label: "Get an API key", to: "/support" },
        },
        {
          name: "Business",
          price: "Custom",
          note: "For high volume and compliance needs",
          features: [
            "Volume pricing above 250,000 requests",
            "Higher rate limits",
            "Priority support with response targets",
            "Invoicing and procurement paperwork",
            "Custom data-handling agreements on request",
          ],
          cta: { label: "Talk to us", to: "/support" },
        },
      ],
    },
    {
      type: "table",
      heading: "Compare plans",
      columns: ["", "Free", "Developer", "Business"],
      rows: [
        ["In-browser scanning", "Unlimited", "Unlimited", "Unlimited"],
        ["API requests / month", "100", "25,000", "Custom"],
        ["Rate limit", "1 / sec", "10 / sec", "Custom"],
        ["Safety scoring", "yes", "yes", "yes"],
        ["SDK access", "yes", "yes", "yes"],
        ["Email support", "no", "yes", "yes"],
        ["Invoicing", "no", "no", "yes"],
      ],
    },
    {
      type: "faq",
      heading: "Pricing questions",
      items: [
        { q: "Is the scanner really free?", a: "Yes. In-browser scanning costs nothing and requires no account, because decoding runs on your device." },
        { q: "What happens if I exceed my API quota?", a: "Requests return a 429 with a Retry-After header. You can upgrade at any time and the new limit applies immediately." },
        { q: "Can I cancel anytime?", a: "Yes. Plans are monthly and cancel at the end of the current period." },
        { q: "Do you offer a free trial of Developer?", a: "The free tier lets you build and test against the same API. Reach out if you need a short higher-volume trial." },
      ],
    },
    {
      type: "cta",
      heading: "Start free, upgrade when you ship",
      primary: { label: "Scan for free", to: "/app" },
      secondary: { label: "Read the API docs", to: "/docs/api" },
    },
  ],
};

export const about: ContentPage = {
  eyebrow: "About",
  h1: "Built for the phones everyone actually uses",
  intro:
    "Seeqr started from a simple gap: powerful QR tools assume a recent phone with a good camera and a fast connection. Most of the world does not have that.",
  sections: [
    {
      type: "prose",
      heading: "Why we built it",
      paragraphs: [
        "Google Lens and native camera scanners work well — until your phone is three generations old, your storage is full, or the code you need to read is a screenshot someone sent you. Then the standard advice is to install another app, which is exactly what a low-end device cannot afford.",
        "Seeqr is a single lightweight page that decodes a QR code from an image, on the device, with no install and no account. It loads fast on slow connections and keeps working offline.",
      ],
    },
    {
      type: "list",
      heading: "What we care about",
      items: [
        "Accessibility on entry-level hardware and slow networks",
        "Privacy by architecture, not by policy — the image never leaves the device",
        "Honest safety information instead of a false sense of certainty",
        "A tiny bundle, kept small on purpose",
      ],
    },
    {
      type: "cta",
      heading: "Try Seeqr on your device",
      primary: { label: "Scan for free", to: "/app" },
      secondary: { label: "See the features", to: "/features" },
    },
  ],
};

export const support: ContentPage = {
  eyebrow: "Support",
  h1: "Get help with Seeqr",
  intro: "Answers to the most common issues, plus how to reach us for anything else.",
  sections: [
    {
      type: "faq",
      heading: "Troubleshooting",
      items: [
        { q: "No QR code found in my image", a: "Crop tighter around the code, avoid heavy glare, and use the highest-resolution version you have. Very small or blurred codes may not carry enough detail to decode." },
        { q: "My file was rejected", a: "Seeqr accepts JPG, PNG and WebP up to 10 MB. Screenshots in HEIC need converting first — most phones can export a JPG from the photo app." },
        { q: "The result looks like random text", a: "Not every QR code holds a link. Wi-Fi credentials, vCards and payment payloads are structured text and will look unusual but are valid." },
        { q: "Nothing happens after I pick a file", a: "Reload the page and try again. If it persists on an older browser, updating the browser usually resolves it." },
        { q: "How do I get an API key?", a: "Contact us with your expected volume and we will set up your key and plan." },
      ],
    },
    {
      type: "prose",
      heading: "Contact us",
      paragraphs: [
        "Email support@tryseeqr.com with a description of the problem, your browser and device, and a screenshot if it helps. We reply to every message.",
        "For security reports, please include steps to reproduce and do not share third-party data.",
      ],
    },
    {
      type: "cta",
      heading: "Back to scanning",
      primary: { label: "Open the scanner", to: "/app" },
      secondary: { label: "Read the docs", to: "/docs" },
    },
  ],
};

export const vsGoogleVision: ContentPage = {
  eyebrow: "Comparison",
  h1: "Seeqr vs Google Cloud Vision",
  intro:
    "Cloud Vision is a broad image-understanding API. Seeqr does one thing — QR codes from images — with no upload and no billing setup.",
  sections: [
    {
      type: "table",
      heading: "At a glance",
      columns: ["", "Seeqr", "Google Cloud Vision"],
      rows: [
        ["Scope", "QR codes from images", "General image analysis"],
        ["Runs on device", "yes", "no"],
        ["Works offline", "yes", "no"],
        ["Account required to scan", "no", "yes"],
        ["Cloud project & billing setup", "no", "yes"],
        ["Link safety signals", "yes", "no"],
        ["Free everyday use", "Unlimited in browser", "Monthly free units, then per-request"],
      ],
    },
    {
      type: "prose",
      heading: "When to choose which",
      paragraphs: [
        "Pick Cloud Vision when you need labels, OCR, faces, landmarks or moderation across arbitrary images at scale inside Google Cloud.",
        "Pick Seeqr when the job is reading QR codes from screenshots and photos, you want the image to stay on the device, or you need something that works on a budget phone with no setup.",
      ],
    },
    {
      type: "cta",
      heading: "Compare it yourself",
      primary: { label: "Scan an image free", to: "/app" },
      secondary: { label: "Read the API docs", to: "/docs/api" },
    },
  ],
};

export const vsAwsRekognition: ContentPage = {
  eyebrow: "Comparison",
  h1: "Seeqr vs AWS Rekognition",
  intro:
    "Rekognition is an AWS-native computer-vision service. Seeqr is a focused QR decoder that runs in the browser and ships as a small SDK.",
  sections: [
    {
      type: "table",
      heading: "At a glance",
      columns: ["", "Seeqr", "AWS Rekognition"],
      rows: [
        ["Scope", "QR codes from images", "Objects, text, faces, moderation"],
        ["Runs on device", "yes", "no"],
        ["Works offline", "yes", "no"],
        ["AWS account & IAM setup", "no", "yes"],
        ["Time to first result", "Seconds", "Cloud setup required"],
        ["Link safety signals", "yes", "no"],
        ["Bundle for client apps", "Small SDK", "Server-side SDKs"],
      ],
    },
    {
      type: "prose",
      heading: "When to choose which",
      paragraphs: [
        "Rekognition makes sense when your pipeline already lives in AWS and you need broad vision features across large volumes of media.",
        "Seeqr makes sense when you want QR decoding in a product or workflow quickly, without moving user images to a third-party service.",
      ],
    },
    {
      type: "cta",
      heading: "See the difference in one scan",
      primary: { label: "Scan an image free", to: "/app" },
      secondary: { label: "Explore the SDK", to: "/docs/sdk" },
    },
  ],
};

export const blogIndex: ContentPage = {
  eyebrow: "Blog",
  h1: "Notes on QR codes, safety and lightweight software",
  intro: "Practical writing about scanning, quishing and building for low-end devices.",
  sections: [
    {
      type: "cards",
      heading: "Latest posts",
      items: [
        {
          icon: "shield",
          title: "The complete guide to QR phishing (quishing)",
          body: "How QR-based scams work, where they show up, and the checks that actually protect you.",
          to: "/blog/qr-phishing-guide",
        },
      ],
      cols: 2,
    },
    {
      type: "cta",
      heading: "Scan safely today",
      primary: { label: "Open the scanner", to: "/app" },
      secondary: { label: "How detection works", to: "/features/phishing-detection" },
    },
  ],
};

export const quishingGuide: ContentPage = {
  eyebrow: "Guide",
  h1: "The complete guide to QR phishing (quishing)",
  intro:
    "QR codes hide their destination by design. That single property is what makes them such an effective phishing vehicle — and what makes a verification step so valuable.",
  sections: [
    {
      type: "prose",
      heading: "What quishing is",
      paragraphs: [
        "Quishing is phishing delivered through a QR code. Instead of a visible link a victim could inspect, the attacker supplies a pattern of squares. The destination is only revealed after the phone has already opened it.",
        "The technique bypasses many habits people were taught about links: hover to preview, read the domain, look for https. None of them apply to a printed square on a parking meter.",
      ],
    },
    {
      type: "cards",
      heading: "Where you will meet it",
      items: [
        { icon: "card", title: "Payment stickers", body: "A fake code pasted over a legitimate one on a terminal, meter or donation sign." },
        { icon: "document", title: "Fake invoices", body: "A PDF that looks like a supplier bill, with a code pointing to the attacker's payment page." },
        { icon: "package", title: "Delivery notices", body: "A card claiming a missed parcel, asking for a small redelivery fee." },
        { icon: "ticket", title: "Chat forwards", body: "A code forwarded through a group with an urgent story attached." },
      ],
      cols: 2,
    },
    {
      type: "list",
      heading: "How to protect yourself",
      items: [
        "Decode the code before opening it, and read the full destination host",
        "Be suspicious of any code that arrives unexpectedly and asks for money or a login",
        "Check for lookalike domains — swapped letters, extra words, unusual endings",
        "Prefer typing a known address or using the organisation's official app",
        "Look for physical tampering: a sticker over another code is a strong warning sign",
        "Never enter card details or passwords on a page you reached only through a QR code",
      ],
    },
    {
      type: "prose",
      heading: "What tools can and cannot do",
      paragraphs: [
        "A scanner that shows the destination and flags risky patterns removes the blind tap, which is where most quishing succeeds. That is a meaningful improvement over a camera that opens links automatically.",
        "No tool can promise a link is safe. Treat risk signals as a prompt to slow down and verify through a channel you already trust.",
      ],
    },
    {
      type: "faq",
      heading: "Frequently asked",
      items: [
        { q: "Is it dangerous to just scan a QR code?", a: "Scanning alone reveals a destination. The risk comes from opening that destination and interacting with it." },
        { q: "Can a QR code install malware by itself?", a: "Not on its own. It can lead you to a page that asks you to install something — that download is the real risk." },
        { q: "How do I report a malicious code?", a: "Report it to the organisation being impersonated and, where the code is physical, to the site owner so they can remove it." },
      ],
    },
    {
      type: "cta",
      heading: "Check a code before you tap it",
      primary: { label: "Scan for free", to: "/app" },
      secondary: { label: "See the safety layer", to: "/docs/safety-layer" },
    },
  ],
};
