import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";

const KEY = "seeqr-review-dismissed-at";
const COOLDOWN_MS = 48 * 60 * 60 * 1000;

export function reviewPromptIsCoolingDown() {
  if (typeof window === "undefined") return true;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return false;
  const at = Number(raw);
  return Number.isFinite(at) && Date.now() - at < COOLDOWN_MS;
}

function markDismissed() {
  try {
    window.localStorage.setItem(KEY, String(Date.now()));
  } catch {
    // storage unavailable — nothing to persist
  }
}

/** Gentle post-decode review ask. Appears ~2.5s after a successful scan. */
export function ReviewPrompt({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    markDismissed();
    setVisible(false);
    onClose();
  };

  const rate = (value: number) => {
    setRating(value);
    setSent(true);
    markDismissed();
    setTimeout(() => {
      setVisible(false);
      onClose();
    }, 1400);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Rate Seeqr"
      className="animate-in fade-in slide-in-from-bottom-2 fixed inset-x-4 bottom-4 z-50 mx-auto max-w-sm rounded-2xl border border-border bg-card p-6 shadow-sm duration-300 sm:inset-x-auto sm:right-6"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Dismiss"
        className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>

      {sent ? (
        <p className="pr-8 text-sm text-foreground">Thanks — that helps a lot.</p>
      ) : (
        <>
          <p className="pr-8 text-[15px] font-semibold tracking-[-0.02em] text-foreground">
            How was that scan?
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Optional, one tap. It helps us keep Seeqr fast.
          </p>

          <div className="mt-4 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => rate(value)}
                aria-label={`${value} star${value > 1 ? "s" : ""}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Star
                  className={`h-5 w-5 ${value <= rating ? "fill-current text-primary" : ""}`}
                />
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={close}
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Not now
            </button>
            <a
              href="/support"
              className="text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              Send feedback
            </a>
          </div>
        </>
      )}
    </div>
  );
}
