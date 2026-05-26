import { useRef, useState, type DragEvent } from "react";
import { Upload, ImageIcon } from "lucide-react";
import { ACCEPTED_TYPES } from "@/lib/qr/validate";

interface DropzoneProps {
  onFile: (file: File) => void;
  disabled?: boolean;
}

export function Dropzone({ onFile, disabled }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hover, setHover] = useState(false);

  const pick = () => inputRef.current?.click();

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload an image with a QR code"
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
        "group relative flex flex-col items-center justify-center gap-4",
        "rounded-2xl border-2 border-dashed bg-card p-10 text-center",
        "transition-colors cursor-pointer min-h-[280px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        hover ? "border-primary bg-accent" : "border-border hover:border-primary/60",
        disabled ? "opacity-60 pointer-events-none" : "",
      ].join(" ")}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        {hover ? <ImageIcon className="h-7 w-7" /> : <Upload className="h-7 w-7" />}
      </div>
      <div className="space-y-1">
        <p className="text-base font-medium text-foreground">
          Tap to upload, or drag an image here
        </p>
        <p className="text-sm text-muted-foreground">
          JPG, PNG, or WebP · up to 10&nbsp;MB
        </p>
      </div>
    </div>
  );
}
