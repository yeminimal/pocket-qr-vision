import { useRef, useState, type DragEvent } from "react";
import { Upload } from "lucide-react";
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
        "group mx-auto flex cursor-pointer flex-col items-center justify-center gap-5",
        "min-h-[320px] w-full rounded-2xl border-2 border-dashed p-8 text-center sm:h-[400px] sm:max-w-[400px]",
        "transition-colors duration-200",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        hover ? "border-input bg-accent" : "border-border hover:border-input hover:bg-accent/60",
        disabled ? "pointer-events-none opacity-60" : "",
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
      <Upload className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-foreground" />
      <div className="space-y-2">
        <p className="text-[15px] font-medium tracking-[-0.01em] text-foreground">
          Drag your image here or click to browse
        </p>
        <p className="font-mono text-xs tracking-[0.02em] text-muted-foreground">
          JPG · PNG · WEBP — up to 10MB
        </p>
      </div>
    </div>
  );
}
