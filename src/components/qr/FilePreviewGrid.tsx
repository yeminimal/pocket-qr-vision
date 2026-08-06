import { X } from "lucide-react";
import { formatBytes } from "@/lib/qr/validate";

export interface PickedFile {
  id: string;
  file: File;
  previewUrl: string;
}

export function FilePreviewGrid({
  files,
  onRemove,
  disabled,
}: {
  files: PickedFile[];
  onRemove: (id: string) => void;
  disabled?: boolean;
}) {
  if (!files.length) return null;

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {files.map((item, index) => (
        <li
          key={item.id}
          style={{ animationDelay: `${index * 50}ms` }}
          className="animate-in fade-in slide-in-from-bottom-2 group relative overflow-hidden rounded-2xl border border-border bg-card duration-300"
        >
          <img
            src={item.previewUrl}
            alt={item.file.name}
            className="aspect-square w-full object-cover"
          />
          <div className="p-3">
            <p className="truncate text-xs font-medium text-foreground">{item.file.name}</p>
            <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
              {formatBytes(item.file.size)}
            </p>
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              aria-label={`Remove ${item.file.name}`}
              className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
