import { useState } from "react";
import { Copy, ExternalLink, Share2, RotateCcw, Check, Link as LinkIcon, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isUrl } from "@/lib/qr/validate";

interface ResultCardProps {
  data: string;
  onReset: () => void;
}

export function ResultCard({ data, onReset }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
  const url = isUrl(data);
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(data);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore — surface nothing scary
    }
  };

  const share = async () => {
    if (!canShare) return;
    try {
      await navigator.share({ text: data, url: url ? data : undefined });
    } catch {
      // user cancelled
    }
  };

  return (
    <section
      aria-live="polite"
      className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="mb-4 flex items-center gap-2">
        <Badge variant={url ? "default" : "secondary"} className="gap-1">
          {url ? <LinkIcon className="h-3 w-3" /> : <Type className="h-3 w-3" />}
          {url ? "URL" : "Text"}
        </Badge>
        <button
          onClick={() => setShowRaw((v) => !v)}
          className="ml-auto text-xs text-muted-foreground underline-offset-4 hover:underline focus-visible:underline"
        >
          {showRaw ? "Show formatted" : "Show raw"}
        </button>
      </div>

      <div className="mb-6 rounded-lg bg-muted p-4">
        <p
          className={[
            "break-all text-foreground",
            showRaw ? "font-mono text-sm" : "text-base",
          ].join(" ")}
        >
          {data}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={copy} variant="secondary" className="min-h-11 gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
        {url && (
          <Button asChild className="min-h-11 gap-2">
            <a href={data} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Open
            </a>
          </Button>
        )}
        {canShare && (
          <Button onClick={share} variant="outline" className="min-h-11 gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        )}
        <Button onClick={onReset} variant="ghost" className="ml-auto min-h-11 gap-2">
          <RotateCcw className="h-4 w-4" />
          Scan another
        </Button>
      </div>
    </section>
  );
}
