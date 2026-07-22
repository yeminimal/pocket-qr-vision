import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, QrCode, ShieldCheck, Zap, WifiOff } from "lucide-react";
import { Dropzone } from "@/components/qr/Dropzone";
import { ResultCard } from "@/components/qr/ResultCard";
import { ErrorState } from "@/components/qr/ErrorState";
import { Paywall } from "@/components/qr/Paywall";
import { checkScanLimit, recordScan } from "@/server/usage";
import { validateImageFile } from "@/lib/qr/validate";
import { decodeQrFromFile } from "@/lib/qr/decode";
import ogImage from "@/assets/og-image.jpg.asset.json";

const SITE_URL = "https://pocket-qr-vision.lovable.app";
const OG_IMAGE_URL = `${SITE_URL}${ogImage.url}`;
const TITLE = "Scan QR Codes from Photos — Free, Private, No App";
const DESCRIPTION =
  "Upload any photo with a QR code and decode it instantly in your browser. 100% private, works offline, no app or sign-up needed.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:width", content: "1216" },
      { property: "og:image:height", content: "640" },
      { property: "og:image:alt", content: "QR Scan — Scan QR codes from photos in your browser" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Index,
});

type Status =
  | { kind: "idle" }
  | { kind: "scanning" }
  | { kind: "success"; data: string }
  | { kind: "error"; message: string };

function Index() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [showPaywall, setShowPaywall] = useState(false);
  const [remainingScans, setRemainingScans] = useState<number | null>(null);
  
  // Generate a simple device fingerprint
  const getFingerprint = () => {
    let fp = localStorage.getItem('seeqr_fingerprint');
    if (!fp) {
      fp = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('seeqr_fingerprint', fp);
    }
    return fp;
  };

  const handleFile = async (file: File) => {
    const validationError = validateImageFile(file);
    if (validationError) {
      setStatus({ kind: "error", message: validationError });
      return;
    }
    setStatus({ kind: "scanning" });
    try {
      const fingerprint = getFingerprint();
      const check = await checkScanLimit({ data: { fingerprint } });
      
      if (!check.allowed) {
        setStatus({ kind: "idle" });
        setShowPaywall(true);
        return;
      }

      const data = await decodeQrFromFile(file);
      
      const record = await recordScan({ data: { fingerprint } });
      setRemainingScans(record.remaining);
      
      setStatus({ kind: "success", data });
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong while scanning.",
      });
    }
  };

  const reset = () => setStatus({ kind: "idle" });

  return (
    <main className="min-h-dvh bg-background">
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-4 py-8 sm:py-12">
        <header className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <QrCode className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">QR Scan</p>
            <p className="text-xs text-muted-foreground">Private, in-browser decoding</p>
          </div>
        </header>

        <section className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Decode a QR code from any image
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Upload a photo and we'll read the QR for you. You have {remainingScans !== null ? <strong className="text-primary">{remainingScans}</strong> : '5'} free scans remaining before needing to unlock unlimited access.
          </p>
        </section>

        <div className="space-y-4">
          {status.kind === "idle" && <Dropzone onFile={handleFile} />}

          {status.kind === "scanning" && (
            <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-10 text-center">
              <Loader2 className="h-7 w-7 animate-spin text-primary" />
              <p className="text-sm font-medium text-foreground">Decoding…</p>
              <p className="text-xs text-muted-foreground">Reading the image on your device</p>
            </div>
          )}

          {status.kind === "success" && <ResultCard data={status.data} onReset={reset} />}

          {status.kind === "error" && (
            <ErrorState message={status.message} onReset={reset} />
          )}

          {showPaywall && <Paywall onClose={() => setShowPaywall(false)} />}
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          <Feature icon={<ShieldCheck className="h-4 w-4" />} title="100% private">
            Images stay on your phone.
          </Feature>
          <Feature icon={<Zap className="h-4 w-4" />} title="Fast & light">
            Tiny bundle, low-end friendly.
          </Feature>
          <Feature icon={<WifiOff className="h-4 w-4" />} title="Works offline">
            No internet required to decode.
          </Feature>
        </ul>

        <footer className="mt-auto pt-10 text-center text-xs text-muted-foreground">
          Built for devices that can't run Google Lens.
        </footer>
      </div>
    </main>
  );
}

function Feature({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2 text-primary">
        {icon}
        <span className="text-sm font-medium text-foreground">{title}</span>
      </div>
      <p className="text-xs text-muted-foreground">{children}</p>
    </li>
  );
}
