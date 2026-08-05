import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

/** Quiet, dismissible-by-navigation upsell shown under a decoded result. */
export function UpgradeBanner() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-semibold tracking-[-0.02em] text-foreground">
            Scan more at once
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Premium adds batch uploads, PDF scanning and link safety checks.
          </p>
        </div>
      </div>
      <Link
        to="/pricing"
        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-2xl border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
      >
        See premium
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
