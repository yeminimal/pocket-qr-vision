import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, RotateCcw, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/qr/Dropzone";
import { FilePreviewGrid, type PickedFile } from "@/components/qr/FilePreviewGrid";
import { ResultList, type ScanResult } from "@/components/qr/ResultList";
import { ErrorState } from "@/components/qr/ErrorState";
import { ReviewPrompt, reviewPromptIsCoolingDown } from "@/components/qr/ReviewPrompt";
import { UpgradeBanner } from "@/components/qr/UpgradeBanner";
import { MAX_FILES, validateImageFile } from "@/lib/qr/validate";
import { decodeQrCodesFromFile } from "@/lib/qr/decode";
import {
  clearSharedImageFlag,
  consumeSharedImage,
  hasSharedImageFlag,
  registerServiceWorker,
} from "@/lib/pwa";

type Phase =
  | { kind: "idle" }
  | { kind: "scanning"; current: number; total: number }
  | { kind: "done"; results: ScanResult[] };

export function Scanner() {
  const [files, setFiles] = useState<PickedFile[]>([]);
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [error, setError] = useState<string | null>(null);
  const [showReview, setShowReview] = useState(false);
  const handledShare = useRef(false);

  const addFiles = useCallback((incoming: File[]) => {
    setError(null);
    setPhase({ kind: "idle" });
    setFiles((current) => {
      const room = MAX_FILES - current.length;
      if (room <= 0) {
        setError(`You can scan up to ${MAX_FILES} photos at a time.`);
        return current;
      }
      const accepted: PickedFile[] = [];
      for (const file of incoming.slice(0, room)) {
        const problem = validateImageFile(file);
        if (problem) {
          setError(`${file.name}: ${problem}`);
          continue;
        }
        accepted.push({
          id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
          file,
          previewUrl: URL.createObjectURL(file),
        });
      }
      if (incoming.length > room) {
        setError(`Only the first ${MAX_FILES} photos were added.`);
      }
      return [...current, ...accepted];
    });
  }, []);

  const removeFile = (id: string) => {
    setFiles((current) => {
      const target = current.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return current.filter((f) => f.id !== id);
    });
  };

  const scanAll = useCallback(
    async (queue: PickedFile[]) => {
      if (!queue.length) return;
      setError(null);
      const results: ScanResult[] = [];
      for (let i = 0; i < queue.length; i += 1) {
        setPhase({ kind: "scanning", current: i + 1, total: queue.length });
        const item = queue[i];
        try {
          const codes = await decodeQrCodesFromFile(item.file);
          results.push({ fileName: item.file.name, codes });
        } catch (err) {
          results.push({
            fileName: item.file.name,
            codes: [],
            error: err instanceof Error ? err.message : "Could not read this image.",
          });
        }
      }
      setPhase({ kind: "done", results });
      if (results.some((r) => r.codes.length) && !reviewPromptIsCoolingDown()) {
        setShowReview(true);
      }
    },
    [],
  );

  useEffect(() => {
    registerServiceWorker();
  }, []);

  // Auto scan an image shared into Seeqr from the OS share sheet.
  useEffect(() => {
    if (handledShare.current || !hasSharedImageFlag()) return;
    handledShare.current = true;
    void (async () => {
      const file = await consumeSharedImage();
      clearSharedImageFlag();
      if (!file) return;
      const picked: PickedFile = {
        id: `shared-${Date.now()}`,
        file,
        previewUrl: URL.createObjectURL(file),
      };
      setFiles([picked]);
      await scanAll([picked]);
    })();
  }, [scanAll]);

  const reset = () => {
    files.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    setFiles([]);
    setError(null);
    setShowReview(false);
    setPhase({ kind: "idle" });
  };

  const scanning = phase.kind === "scanning";
  const progress = scanning ? Math.round((phase.current / phase.total) * 100) : 0;

  return (
    <div className="w-full space-y-6">
      <div aria-live="polite" className="space-y-6">
        {phase.kind !== "done" && <Dropzone onFiles={addFiles} disabled={scanning} />}

        {phase.kind !== "done" && (
          <FilePreviewGrid files={files} onRemove={removeFile} disabled={scanning} />
        )}

        {error && phase.kind !== "done" && (
          <p role="status" className="text-sm text-warning">
            {error}
          </p>
        )}

        {phase.kind === "idle" && files.length > 0 && (
          <Button onClick={() => scanAll(files)} className="min-h-12 w-full gap-2 text-[15px]">
            <ScanLine className="h-4 w-4" />
            Scan {files.length === 1 ? "1 photo" : `all ${files.length} photos`}
          </Button>
        )}

        {scanning && (
          <div className="rounded-2xl glass-panel p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <p className="text-sm font-light text-foreground">
                Scanning {phase.current} of {phase.total}...
              </p>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              reading pixels on device
            </p>
          </div>
        )}

        {phase.kind === "done" && (
          <div className="space-y-4">
            {phase.results.every((r) => !r.codes.length) ? (
              <ErrorState
                message="No QR code was found in the photos you uploaded. Try a clearer, closer shot."
                onReset={reset}
              />
            ) : (
              <>
                <ResultList results={phase.results} />
                <div className="flex justify-end">
                  <Button onClick={reset} variant="ghost" className="min-h-11 gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Scan more photos
                  </Button>
                </div>
                <UpgradeBanner />
              </>
            )}
          </div>
        )}
      </div>

      {showReview && phase.kind === "done" && (
        <ReviewPrompt onClose={() => setShowReview(false)} />
      )}
    </div>
  );
}
