import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SafetyBadge } from "@/components/qr/SafetyBadge";
import { checkUrlSafety, type SafetyReport } from "@/lib/qr/safety";
import { seo } from "@/lib/site";

const TITLE = "Check a URL for Scams and Malware - Seeqr";
const DESCRIPTION =
  "Paste any link and Seeqr checks it for phishing, spoofed brands, shorteners and malware patterns. Runs on your device in seconds.";

export const Route = createFileRoute("/scanner")({
  head: () => seo({ title: TITLE, description: DESCRIPTION, path: "/scanner" }),
  component: UrlScannerPage,
});

function UrlScannerPage() {
  const [url, setUrl] = useState("");
  const [report, setReport] = useState<SafetyReport | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = url.trim();
    if (!value) return;
    setLoading(true);
    setReport(null);
    try {
      setReport(await checkUrlSafety(value));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-24">
      <span className="label-caps text-muted-foreground">Link safety</span>
      <h1 className="mt-4 text-[2.25rem] leading-[1.1] tracking-[-0.03em] text-foreground sm:text-[3rem]">
        Check a URL before you tap it
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground">
        Paste a link from a QR code, a message or an email. Seeqr inspects the address for
        phishing patterns, spoofed brands, hidden redirects and malware markers.
      </p>

      <form onSubmit={submit} className="mt-10 space-y-4">
        <label htmlFor="url" className="label-caps block text-muted-foreground">
          Paste URL to scan
        </label>
        <input
          id="url"
          type="text"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/verify"
          className="min-h-12 w-full rounded-2xl glass-panel px-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        />
        <Button type="submit" disabled={loading} className="min-h-12 w-full gap-2 text-[15px]">
          <ShieldCheck className="h-4 w-4" />
          Check URL
        </Button>
      </form>

      {(loading || report) && (
        <div className="animate-in fade-in mt-8 duration-300">
          <SafetyBadge report={report} loading={loading} detailed />
        </div>
      )}

      <p className="mt-10 font-mono text-xs tracking-[0.02em] text-muted-foreground">
        checks run locally. nothing about your links is uploaded or stored.
      </p>
    </main>
  );
}
