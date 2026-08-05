import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Dropzone } from "@/components/qr/Dropzone";
import { ResultCard } from "@/components/qr/ResultCard";
import { ErrorState } from "@/components/qr/ErrorState";
import { ReviewPrompt, reviewPromptIsCoolingDown } from "@/components/qr/ReviewPrompt";
import { UpgradeBanner } from "@/components/qr/UpgradeBanner";
import { validateImageFile } from "@/lib/qr/validate";
import { decodeQrFromFile } from "@/lib/qr/decode";
import {
  clearSharedImageFlag,
  consumeSharedImage,
  hasSharedImageFlag,
  registerServiceWorker,
} from "@/lib/pwa";

type Status =
  | { kind: "idle" }
  | { kind: "scanning" }
  | { kind: "success"; data: string }
  | { kind: "error"; message: string };

export function Scanner() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [showReview, setShowReview] = useState(false);
  const handledShare = useRef(false);

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
      if (!reviewPromptIsCoolingDown()) setShowReview(true);
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong while scanning.",
      });
    }
  };

  useEffect(() => {
    registerServiceWorker();
  }, []);

  // Auto-scan an image shared into Seeqr from the OS share sheet.
  useEffect(() => {
    if (handledShare.current || !hasSharedImageFlag()) return;
    handledShare.current = true;
    void (async () => {
      const file = await consumeSharedImage();
      clearSharedImageFlag();
      if (file) await handleFile(file);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    setShowReview(false);
    setStatus({ kind: "idle" });
  };

  return (
    <div className="w-full">
      <div aria-live="polite">
        {status.kind === "idle" && <Dropzone onFile={handleFile} />}

        {status.kind === "scanning" && (
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-8 text-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm font-medium text-foreground">Decoding</p>
            <p className="font-mono text-xs text-muted-foreground">reading pixels on device</p>
          </div>
        )}

        {status.kind === "success" && (
          <div className="space-y-4">
            <ResultCard data={status.data} onReset={reset} />
            <UpgradeBanner />
          </div>
        )}

        {status.kind === "error" && <ErrorState message={status.message} onReset={reset} />}
      </div>

      {showReview && status.kind === "success" && (
        <ReviewPrompt onClose={() => setShowReview(false)} />
      )}
    </div>
  );
}
