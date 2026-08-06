import type { ContentPage } from "@/components/site/PageShell";

const finalCta = {
  type: "cta" as const,
  heading: "Scan your first QR code now",
  sub: "No sign-up, no install, no camera required.",
  primary: { label: "Scan for free", to: "/app" },
  secondary: { label: "Read the docs", to: "/docs/getting-started" },
};

export const featuresOverview: ContentPage = {
  eyebrow: "Features",
  h1: "Everything Seeqr does, in one place",
  intro:
    "Seeqr reads QR codes from screenshots and photos, checks the destination before you open it, and never sends your image anywhere.",
  primary: { label: "Try it free", to: "/app" },
  sections: [
    {
      type: "cards",
      heading: "Core capabilities",
      items: [
        {
          icon: "upload",
          title: "Image-based QR detection",
          body: "Upload a screenshot or photo and get the decoded value instantly - no camera permission needed.",
          to: "/features/qr-detection",
        },
        {
          icon: "shield",
          title: "Phishing & risk checks",
          body: "Seeqr inspects the decoded link for lookalike domains, redirects and suspicious patterns before you tap.",
          to: "/features/phishing-detection",
        },
        {
          icon: "lock",
          title: "Privacy-first by design",
          body: "Decoding happens in your browser. Your images are never uploaded, stored or logged.",
          to: "/features/privacy-first",
        },
        {
          icon: "bolt",
          title: "Built for low-end devices",
          body: "A tiny bundle that runs on budget Android phones, old iPhones and slow connections.",
        },
        {
          icon: "clock",
          title: "Works offline",
          body: "Once loaded, Seeqr keeps decoding with no network connection at all.",
        },
        {
          icon: "chart",
          title: "Developer API & SDK",
          body: "Drop the same detection into your own product with a REST endpoint or an NPM package.",
          to: "/docs/api",
        },
      ],
    },
    {
      type: "steps",
      heading: "How a scan works",
      items: [
        { title: "Upload", body: "Pick a screenshot or photo, or drag it onto the dropzone." },
        { title: "Decode", body: "The image is rendered to a canvas and decoded locally in milliseconds." },
        { title: "Verify & act", body: "See the value, review the safety signals, then copy, open or share." },
      ],
    },
    finalCta,
  ],
};

export const qrDetection: ContentPage = {
  eyebrow: "Feature",
  h1: "QR detection from any image",
  intro:
    "Screenshots, WhatsApp forwards, PDFs turned into photos, printed posters shot at an angle - Seeqr decodes them all without a camera.",
  primary: { label: "Scan an image", to: "/app" },
  sections: [
    {
      type: "prose",
      heading: "Why image scanning matters",
      paragraphs: [
        "Most QR codes people receive today arrive as an image, not on a wall. A payment code lands in a chat, a ticket arrives as a screenshot, an invoice QR sits inside a PDF. Camera-only scanners force an awkward workaround: open the image on one screen and scan it with another device.",
        "Seeqr removes that step. You upload the image you already have and get the decoded value immediately.",
      ],
    },
    {
      type: "list",
      heading: "What Seeqr handles",
      items: [
        "JPG, PNG and WebP images up to 10 MB",
        "Low-contrast, inverted and slightly rotated codes",
        "Photos of screens, including moiré and glare",
        "Large images - automatically downscaled before decoding for speed",
        "URLs, plain text, Wi-Fi strings, vCards and payment payloads",
      ],
    },
    {
      type: "faq",
      heading: "Common questions",
      items: [
        {
          q: "Do I need to grant camera access?",
          a: "No. Seeqr never requests camera permission - it only reads the file you choose.",
        },
        {
          q: "What if no code is found?",
          a: "You get a clear message and can retry with a sharper or larger crop of the image.",
        },
        {
          q: "How fast is it?",
          a: "Typical decodes finish in well under a second, even on entry-level phones.",
        },
      ],
    },
    finalCta,
  ],
};

export const phishingDetection: ContentPage = {
  eyebrow: "Feature",
  h1: "Know where a QR code leads before you tap",
  intro:
    "Quishing attacks hide malicious links inside ordinary-looking codes. Seeqr shows you the destination and flags the patterns attackers rely on.",
  primary: { label: "Check a code", to: "/app" },
  sections: [
    {
      type: "cards",
      heading: "Signals Seeqr surfaces",
      items: [
        { icon: "shield", title: "Full destination", body: "The complete decoded URL, never a shortened preview that hides the real host." },
        { icon: "clock", title: "Redirect chains", body: "Link shorteners and multi-hop redirects are called out so you know where you actually land." },
        { icon: "lock", title: "Lookalike domains", body: "Characters swapped to imitate a bank or brand are highlighted for review." },
        { icon: "check", title: "Insecure transport", body: "Plain http:// destinations and unusual ports are flagged before you open them." },
      ],
      cols: 2,
    },
    {
      type: "prose",
      heading: "A verification step, not a guarantee",
      paragraphs: [
        "Seeqr's safety layer is designed to slow down the moment where most QR fraud succeeds: the reflex tap. It gives you the information a careful person would want before opening a link.",
        "It is not a replacement for your own judgement, an antivirus product, or your organisation's security tooling. If a code arrives unexpectedly and asks for money or credentials, treat it as suspicious regardless of what any scanner says.",
      ],
    },
    {
      type: "faq",
      heading: "About QR phishing",
      items: [
        {
          q: "What is quishing?",
          a: "Phishing delivered through a QR code. Because the destination is not human-readable, victims cannot see the link before opening it.",
        },
        {
          q: "Where do these codes usually appear?",
          a: "Stickers over legitimate codes on parking meters and posters, fake invoices, delivery notices and chat forwards.",
        },
        {
          q: "What should I do if a code looks risky?",
          a: "Do not open it. Reach the organisation through a channel you already trust, such as their app or a number you have on file.",
        },
      ],
    },
    finalCta,
  ],
};

export const privacyFirst: ContentPage = {
  eyebrow: "Feature",
  h1: "Your images never leave your device",
  intro:
    "Seeqr decodes entirely in your browser. There is no upload step, no queue, no server-side copy of your screenshot.",
  primary: { label: "Try it free", to: "/app" },
  sections: [
    {
      type: "prose",
      heading: "How in-browser decoding works",
      paragraphs: [
        "When you choose a file, Seeqr renders it onto a canvas inside the page and reads the pixel data directly. The decoding library runs as part of the page you already downloaded, so the image never travels over the network.",
        "This page is maintained by the Seeqr team to answer common privacy questions about the app. It describes how the scanner behaves today; it is not an independent certification or audit.",
      ],
    },
    {
      type: "list",
      heading: "What this means in practice",
      items: [
        "Images are not uploaded, stored or shared with third parties",
        "Decoded values stay in the page and are cleared when you scan again or close the tab",
        "No account is required to scan",
        "The scanner keeps working with no network connection once the page has loaded",
      ],
    },
    {
      type: "prose",
      heading: "Questions about your data",
      paragraphs: [
        "If you have a privacy question that is not answered here, contact us through the support page and we will respond directly.",
      ],
    },
    finalCta,
  ],
};
