import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, QrCode, ShieldCheck, Zap, WifiOff } from "lucide-react";
import { Dropzone } from "@/components/qr/Dropzone";
import { ResultCard } from "@/components/qr/ResultCard";
import { ErrorState } from "@/components/qr/ErrorState";
import { validateImageFile } from "@/lib/qr/validate";
import { decodeQrFromFile } from "@/lib/qr/decode";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QR Scan — Decode QR codes from any image" },
      {
        name: "description",
        content:
          "Free, private QR code scanner. Upload an image and decode the QR instantly in your browser. Works on low-end phones, no app required.",
      },
      { property: "og:title", content: "QR Scan — Decode QR codes from any image" },
      {
        property: "og:description",
        content:
          "Upload a photo of a QR code and decode it instantly. Runs entirely on your device — your images never leave your phone.",
      },
    ],
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

  const handleFile = async (file: File) => {
    const validationError = validateImageFile(file);
    if (validationError) {
      setStatus({ kind: "error", message: validationError });
      return;
    }
    setStatus({ kind: "scanning" });
    try {
      const data = await decodeQrFromFile(file);
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
            Upload a photo and we'll read the QR for you. Everything happens on your device —
            no uploads, no accounts, no tracking.
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
