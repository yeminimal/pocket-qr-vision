import { useRef, useState, type DragEvent } from "react";
import { Upload } from "lucide-react";
import { ACCEPTED_TYPES, MAX_FILES } from "@/lib/qr/validate";

interface DropzoneProps {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
}

export function Dropzone({ onFiles, disabled }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hover, setHover] = useState(false);

  const pick = () => inputRef.current?.click();

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(false);
    if (disabled) return;
    const files = Array.from(e.dataTransfer.files ?? []);
    if (files.length) onFiles(files);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Upload up to ${MAX_FILES} images with QR codes`}
      aria-disabled={disabled}
      onClick={pick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          pick();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setHover(true);
      }}
      onDragLeave={() => setHover(false)}
      onDrop={onDrop}
      className={[
        "group mx-auto flex cursor-pointer flex-col items-center justify-center gap-5",
        "min-h-[200px] w-full rounded-2xl border-2 border-dashed p-8 text-center sm:h-[300px] sm:max-w-[300px] lg:h-[400px] lg:max-w-[400px]",
        "transition-all duration-300 ease-out",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        hover
          ? "border-primary bg-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]"
          : "border-border hover:border-input hover:bg-accent/60",
        disabled ? "pointer-events-none opacity-60" : "",
      ].join(" ")}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED_TYPES.join(",")}
        className="sr-only"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) onFiles(files);
          e.target.value = "";
        }}
      />
      <Upload className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
      <div className="space-y-2">
        <p className="text-[15px] font-light tracking-[-0.02em] text-foreground">
          Drag up to {MAX_FILES} photos or click to browse
        </p>
        <p className="font-mono text-xs tracking-[0.02em] text-muted-foreground">
          JPG, PNG, WEBP. 10MB per file.
        </p>
      </div>
    </div>
  );
}
