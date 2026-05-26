import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message: string;
  onReset: () => void;
}

export function ErrorState({ message, onReset }: ErrorStateProps) {
  return (
    <section
      role="alert"
      aria-live="assertive"
      className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 sm:p-8"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <div className="flex-1">
          <h2 className="text-base font-semibold text-foreground">Couldn't scan that image</h2>
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
          <Button onClick={onReset} variant="outline" className="mt-4 min-h-11 gap-2">
            <RotateCcw className="h-4 w-4" />
            Try another image
          </Button>
        </div>
      </div>
    </section>
  );
}
