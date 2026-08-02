import type { ContentPage } from "@/components/site/PageShell";

const finalCta = {
  type: "cta" as const,
  heading: "Ready to build with Seeqr?",
  sub: "Start on the free tier — no card required.",
  primary: { label: "Get an API key", to: "/pricing" },
  secondary: { label: "See code examples", to: "/docs/examples" },
};

export const docsHub: ContentPage = {
  eyebrow: "Documentation",
  h1: "Seeqr documentation",
  intro: "Everything you need to scan codes in the app or wire Seeqr detection into your own product.",
  primary: { label: "Start here", to: "/docs/getting-started" },
  sections: [
    {
      type: "cards",
      heading: "Browse the docs",
      items: [
        { icon: "upload", title: "Getting started", body: "Your first scan and your first API request in a few minutes.", to: "/docs/getting-started" },
        { icon: "chart", title: "API documentation", body: "Endpoints, request and response shapes, errors and rate limits.", to: "/docs/api" },
        { icon: "bolt", title: "SDK (NPM package)", body: "Install the client and decode in a few lines of TypeScript.", to: "/docs/sdk" },
        { icon: "shield", title: "Safety layer", body: "How risk signals are produced and how to read the score.", to: "/docs/safety-layer" },
        { icon: "document", title: "Code examples", body: "Ready-to-paste snippets for the browser, Node.js and cURL.", to: "/docs/examples" },
        { icon: "lock", title: "Privacy model", body: "What runs locally, what runs on the API, and what is stored.", to: "/features/privacy-first" },
      ],
    },
    finalCta,
  ],
};

export const gettingStarted: ContentPage = {
  eyebrow: "Docs",
  h1: "Getting started",
  intro: "Scan your first code in the browser, then make your first API call.",
  primary: { label: "Open the scanner", to: "/app" },
  sections: [
    {
      type: "steps",
      heading: "Scan in the app",
      items: [
        { title: "Open the scanner", body: "Go to the scan page — nothing to install and no account needed." },
        { title: "Choose an image", body: "Drag a screenshot in or tap to pick a JPG, PNG or WebP up to 10 MB." },
        { title: "Review the result", body: "Check the decoded value and safety signals, then copy, open or share it." },
      ],
    },
    {
      type: "code",
      heading: "Your first API request",
      sub: "Send an image URL or base64 payload and get the decoded value back.",
      code: `curl https://api.tryseeqr.com/v1/scan \\
  -H "Authorization: Bearer $SEEQR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "image_url": "https://example.com/ticket.png" }'`,
    },
    {
      type: "code",
      heading: "Example response",
      code: `{
  "decoded": "https://pay.example.com/i/8812",
  "format": "qr_code",
  "kind": "url",
  "safety": {
    "score": 72,
    "level": "caution",
    "signals": ["redirect_chain", "new_domain"]
  }
}`,
    },
    {
      type: "list",
      heading: "Next steps",
      items: [
        "Read the API reference for every field and error code",
        "Install the SDK if you work in TypeScript or Node.js",
        "Learn how the safety score is calculated before you act on it",
      ],
    },
    finalCta,
  ],
};

export const apiDocs: ContentPage = {
  eyebrow: "Docs",
  h1: "API documentation",
  intro: "A single JSON endpoint for decoding codes from images, with optional safety analysis.",
  primary: { label: "Get an API key", to: "/pricing" },
  sections: [
    {
      type: "prose",
      heading: "Base URL and authentication",
      paragraphs: [
        "All requests go to https://api.tryseeqr.com/v1 over HTTPS. Authenticate with a bearer token in the Authorization header. Keys are secret — keep them on your server, never in client-side code.",
      ],
    },
    {
      type: "table",
      heading: "Endpoints",
      columns: ["Endpoint", "Method", "Purpose"],
      rows: [
        ["/v1/scan", "POST", "Decode a QR code from an image URL or base64 payload"],
        ["/v1/safety", "POST", "Score an already-decoded URL"],
        ["/v1/usage", "GET", "Current period request count and remaining quota"],
      ],
    },
    {
      type: "table",
      heading: "Request body — POST /v1/scan",
      columns: ["Field", "Type", "Notes"],
      rows: [
        ["image_url", "string", "Publicly reachable image URL. One of image_url or image_base64 is required."],
        ["image_base64", "string", "Base64-encoded JPG, PNG or WebP, up to 10 MB decoded."],
        ["safety", "boolean", "Defaults to true. Set false to skip link analysis."],
      ],
    },
    {
      type: "table",
      heading: "Errors",
      columns: ["Status", "Code", "Meaning"],
      rows: [
        ["400", "invalid_image", "The payload was not a supported image or was unreadable"],
        ["401", "invalid_key", "Missing or revoked API key"],
        ["404", "no_code_found", "The image contained no detectable QR code"],
        ["413", "image_too_large", "Decoded image exceeded 10 MB"],
        ["429", "rate_limited", "Quota or per-second limit exceeded; retry after the header value"],
      ],
    },
    {
      type: "prose",
      heading: "Rate limits",
      paragraphs: [
        "Free keys allow 100 requests per month and 1 request per second. Paid plans raise both limits; every response includes X-RateLimit-Remaining and Retry-After headers so you can back off cleanly.",
      ],
    },
    finalCta,
  ],
};

export const sdkDocs: ContentPage = {
  eyebrow: "Docs",
  h1: "SDK (NPM package)",
  intro: "A small TypeScript client for the browser and Node.js, with types for every response field.",
  primary: { label: "See examples", to: "/docs/examples" },
  sections: [
    { type: "code", heading: "Install", code: `npm install @seeqr/client` },
    {
      type: "code",
      heading: "Decode an image on the server",
      code: `import { Seeqr } from "@seeqr/client";

const seeqr = new Seeqr({ apiKey: process.env.SEEQR_API_KEY! });

const result = await seeqr.scan({ imageUrl: "https://example.com/ticket.png" });

if (result.safety.level === "danger") {
  throw new Error("Refusing to follow a high-risk QR destination");
}

console.log(result.decoded);`,
    },
    {
      type: "code",
      heading: "Decode locally in the browser",
      sub: "The local decoder needs no API key and never uploads the image.",
      code: `import { decodeLocal } from "@seeqr/client/browser";

const input = document.querySelector("input[type=file]") as HTMLInputElement;

input.addEventListener("change", async () => {
  const file = input.files?.[0];
  if (!file) return;
  const { decoded } = await decodeLocal(file);
  console.log(decoded);
});`,
    },
    {
      type: "list",
      heading: "Good to know",
      items: [
        "Ships ESM and CJS builds with full TypeScript types",
        "No native dependencies — runs in edge runtimes and workers",
        "Errors are typed, so you can branch on no_code_found vs rate_limited",
        "Keep server keys server-side; use decodeLocal for anything client-facing",
      ],
    },
    finalCta,
  ],
};

export const safetyLayer: ContentPage = {
  eyebrow: "Docs",
  h1: "Safety layer",
  intro: "How Seeqr turns a decoded link into a score you can act on.",
  primary: { label: "Read about phishing", to: "/features/phishing-detection" },
  sections: [
    {
      type: "table",
      heading: "Levels",
      columns: ["Level", "Score", "Suggested handling"],
      rows: [
        ["safe", "80–100", "No suspicious signals found; proceed with normal care"],
        ["caution", "40–79", "Show the full destination and ask the user to confirm"],
        ["danger", "0–39", "Block automatic navigation and require an explicit override"],
      ],
    },
    {
      type: "table",
      heading: "Signals",
      columns: ["Signal", "What it means"],
      rows: [
        ["redirect_chain", "The link passes through one or more redirects before its destination"],
        ["lookalike_domain", "The host closely resembles a well-known brand or bank domain"],
        ["insecure_scheme", "The destination uses http:// or a non-standard port"],
        ["new_domain", "The domain was registered very recently"],
        ["credential_form", "The landing page asks for a password or payment details"],
      ],
    },
    {
      type: "prose",
      heading: "Limitations",
      paragraphs: [
        "The score is a heuristic aid, not a verdict. A safe level means no known signals matched — it is not a promise that a destination is trustworthy, and a danger level can occasionally flag a legitimate link.",
        "Treat the safety layer as one input in your own review flow, and keep a human confirmation step for anything involving money or credentials.",
      ],
    },
    finalCta,
  ],
};

export const codeExamples: ContentPage = {
  eyebrow: "Docs",
  h1: "Code examples",
  intro: "Copy-paste snippets for the most common integrations.",
  primary: { label: "API reference", to: "/docs/api" },
  sections: [
    {
      type: "code",
      heading: "cURL",
      code: `curl https://api.tryseeqr.com/v1/scan \\
  -H "Authorization: Bearer $SEEQR_API_KEY" \\
  -F image=@./invoice.png`,
    },
    {
      type: "code",
      heading: "Node.js (fetch)",
      code: `const res = await fetch("https://api.tryseeqr.com/v1/scan", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.SEEQR_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ image_url: imageUrl }),
});

if (!res.ok) throw new Error(\`Seeqr error: \${res.status}\`);
const { decoded, safety } = await res.json();`,
    },
    {
      type: "code",
      heading: "React file input",
      code: `import { useState } from "react";
import { decodeLocal } from "@seeqr/client/browser";

export function ScanField() {
  const [value, setValue] = useState("");

  return (
    <input
      type="file"
      accept="image/*"
      onChange={async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const { decoded } = await decodeLocal(file);
        setValue(decoded);
      }}
    />
  );
}`,
    },
    {
      type: "code",
      heading: "Python",
      code: `import os, requests

res = requests.post(
    "https://api.tryseeqr.com/v1/scan",
    headers={"Authorization": f"Bearer {os.environ['SEEQR_API_KEY']}"},
    json={"image_url": image_url},
    timeout=15,
)
res.raise_for_status()
print(res.json()["decoded"])`,
    },
    finalCta,
  ],
};
