import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Dropzone } from "@/components/qr/Dropzone";
import { ResultCard } from "@/components/qr/ResultCard";
import { ErrorState } from "@/components/qr/ErrorState";
import { validateImageFile } from "@/lib/qr/validate";
import { decodeQrFromFile } from "@/lib/qr/decode";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/app")({
  head: () =>
    seo({
      title: "Scan a QR Code from an Image — Seeqr",
      description:
        "Upload a screenshot or photo and decode the QR code instantly in your browser. Free, private, no camera or app needed.",
      path: "/app",
    }),
  component: ScanPage,
});

type Status =
  | { kind: "idle" }
  | { kind: "scanning" }
  | { kind: "success"; data: string }
  | { kind: "error"; message: string };

function ScanPage() {
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

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Scan a QR code from an image
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Upload a screenshot or photo and Seeqr decodes it on your device. Nothing is uploaded.
      </p>

      <div className="mt-8 space-y-4" aria-live="polite">
        {status.kind === "idle" && <Dropzone onFile={handleFile} />}

        {status.kind === "scanning" && (
          <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-10 text-center">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
            <p className="text-sm font-medium">Decoding…</p>
            <p className="text-xs text-muted-foreground">Reading the image on your device</p>
          </div>
        )}

        {status.kind === "success" && (
          <ResultCard data={status.data} onReset={() => setStatus({ kind: "idle" })} />
        )}

        {status.kind === "error" && (
          <ErrorState message={status.message} onReset={() => setStatus({ kind: "idle" })} />
        )}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Supported formats: JPG, PNG and WebP up to 10 MB.
      </p>
    </main>
  );
}
