import { useState } from "react";
import { Copy, Check, ExternalLink, ShieldCheck, Share2, Type, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SafetyBadge } from "@/components/qr/SafetyBadge";
import { checkUrlSafety, type SafetyReport } from "@/lib/qr/safety";
import { isUrl } from "@/lib/qr/validate";

export interface ScanResult {
  fileName: string;
  codes: string[];
  error?: string;
}

function CodeRow({ label, data }: { label: string; data: string }) {
  const [copied, setCopied] = useState(false);
  const [report, setReport] = useState<SafetyReport | null>(null);
  const [checking, setChecking] = useState(false);
  const url = isUrl(data);
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(data);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable
    }
  };

  const check = async () => {
    setChecking(true);
    try {
      setReport(await checkUrlSafety(data));
    } finally {
      setChecking(false);
    }
  };

  const share = async () => {
    try {
      await navigator.share({ text: data, url: url ? data : undefined });
    } catch {
      // user cancelled
    }
  };

  return (
    <div className="rounded-2xl glass-panel p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <span className="label-caps text-muted-foreground">{label}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-muted px-2 py-1 text-[11px] font-light text-muted-foreground">
          {url ? <LinkIcon className="h-3 w-3" /> : <Type className="h-3 w-3" />}
          {url ? "URL" : "Text"}
        </span>
      </div>

      <p className="mt-3 break-all font-mono text-sm text-foreground">{data}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Button onClick={copy} variant="secondary" className="min-h-11 gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
        {url && (
          <>
            <Button onClick={check} className="min-h-11 gap-2" disabled={checking}>
              <ShieldCheck className="h-4 w-4" />
              Scan URL for viruses
            </Button>
            <Button asChild variant="outline" className="min-h-11 gap-2">
              <a href={data} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Open
              </a>
            </Button>
          </>
        )}
        {canShare && (
          <Button onClick={share} variant="ghost" className="min-h-11 gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        )}
      </div>

      {(checking || report) && (
        <div className="animate-in fade-in mt-5 duration-300">
          <SafetyBadge report={report} loading={checking} detailed />
        </div>
      )}
    </div>
  );
}

export function ResultList({ results }: { results: ScanResult[] }) {
  return (
    <div className="space-y-4">
      {results.map((result, index) => {
        const position = index + 1;
        if (result.error || !result.codes.length) {
          return (
            <div
              key={`${result.fileName}-${index}`}
              className="animate-in fade-in rounded-2xl glass-panel p-6 duration-300 sm:p-8"
            >
              <span className="label-caps text-muted-foreground">
                {position}. {result.fileName}
              </span>
              <p className="mt-2 text-sm text-muted-foreground">
                {result.error ?? "No QR code detected."}
              </p>
            </div>
          );
        }
        return result.codes.map((code, codeIndex) => (
          <CodeRow
            key={`${result.fileName}-${codeIndex}`}
            label={
              result.codes.length > 1
                ? `${position}. ${result.fileName} #${codeIndex + 1}`
                : `${position}. ${result.fileName}`
            }
            data={code}
          />
        ));
      })}
    </div>
  );
}
