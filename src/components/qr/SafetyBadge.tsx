import { AlertCircle, ShieldCheck, ShieldX, Loader2 } from "lucide-react";
import { threatCopy, type SafetyReport } from "@/lib/qr/safety";

const styles = {
  safe: { icon: ShieldCheck, cls: "text-success border-success/30 bg-success/10" },
  suspicious: { icon: AlertCircle, cls: "text-warning border-warning/30 bg-warning/10" },
  malicious: { icon: ShieldX, cls: "text-destructive border-destructive/30 bg-destructive/10" },
} as const;

export function SafetyBadge({
  report,
  loading,
  detailed = false,
}: {
  report?: SafetyReport | null;
  loading?: boolean;
  detailed?: boolean;
}) {
  if (loading) {
    return (
      <span className="inline-flex items-center gap-2 glass-panel rounded-xl bg-muted px-3 py-1.5 text-xs font-light text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Checking link
      </span>
    );
  }
  if (!report) return null;

  const { icon: Icon, cls } = styles[report.level];
  const copy = threatCopy(report.level);

  if (!detailed) {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-light ${cls}`}
      >
        <Icon className="h-3.5 w-3.5" />
        {copy.label}
      </span>
    );
  }

  return (
    <div className={`rounded-2xl border p-6 ${cls}`}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="min-w-0">
          <p className="text-[15px] font-light tracking-[-0.02em]">{report.headline}</p>
          <p className="mt-1 text-sm text-muted-foreground">{copy.note}</p>
          <ul className="mt-4 space-y-1.5">
            {report.signals.map((signal) => (
              <li key={signal} className="text-sm leading-relaxed text-muted-foreground">
                - {signal}
              </li>
            ))}
          </ul>
          {report.host && (
            <p className="mt-4 font-mono text-xs tracking-[0.02em] text-muted-foreground">
              host: {report.host}
            </p>
          )}
          <p className="mt-2 font-mono text-xs tracking-[0.02em] text-muted-foreground">
            checked on device against Seeqr link heuristics
          </p>
        </div>
      </div>
    </div>
  );
}
