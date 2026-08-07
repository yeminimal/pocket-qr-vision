import jsQR from "jsqr";

const MAX_DIMENSION = 1600;
const MAX_CODES_PER_IMAGE = 12;

async function fileToBitmap(file: File): Promise<{
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
}> {
  if (typeof createImageBitmap === "function") {
    const bmp = await createImageBitmap(file);
    return {
      width: bmp.width,
      height: bmp.height,
      draw: (ctx, w, h) => ctx.drawImage(bmp, 0, 0, w, h),
    };
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not load image."));
      el.src = url;
    });
    return {
      width: img.naturalWidth,
      height: img.naturalHeight,
      draw: (ctx, w, h) => ctx.drawImage(img, 0, 0, w, h),
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Decodes every QR code found in an image.
 * jsQR returns one code per pass, so each found code is masked out and the
 * image is re-scanned until nothing new appears.
 */
export async function decodeQrCodesFromFile(file: File): Promise<string[]> {
  const src = await fileToBitmap(file);
  if (!src.width || !src.height) {
    throw new Error("Image appears to be empty or corrupted.");
  }

  const scale = Math.min(1, MAX_DIMENSION / Math.max(src.width, src.height));
  const w = Math.max(1, Math.round(src.width * scale));
  const h = Math.max(1, Math.round(src.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  src.draw(ctx, w, h);

  const found: string[] = [];

  /** Scans one region repeatedly, masking each hit so the next pass finds a new code. */
  const sweep = (rx: number, ry: number, rw: number, rh: number) => {
    if (rw < 24 || rh < 24) return;
    for (let pass = 0; pass < MAX_CODES_PER_IMAGE; pass += 1) {
      if (found.length >= MAX_CODES_PER_IMAGE) return;
      const imageData = ctx.getImageData(rx, ry, rw, rh);
      const result = jsQR(imageData.data, rw, rh, { inversionAttempts: "attemptBoth" });
      if (!result || !result.data) return;

      if (!found.includes(result.data)) found.push(result.data);

      const points = Object.values(result.location) as { x: number; y: number }[];
      const xs = points.map((p) => p.x + rx);
      const ys = points.map((p) => p.y + ry);
      const pad = 4;
      const x0 = Math.max(0, Math.min(...xs) - pad);
      const y0 = Math.max(0, Math.min(...ys) - pad);
      const x1 = Math.min(w, Math.max(...xs) + pad);
      const y1 = Math.min(h, Math.max(...ys) + pad);
      if (x1 - x0 < 2 || y1 - y0 < 2) return;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    }
  };

  // Full frame first, then a 3x3 overlapping tile sweep so small or low
  // contrast codes that the full-frame pass misses still get picked up.
  sweep(0, 0, w, h);

  const grid = 3;
  const tw = Math.floor(w / grid);
  const th = Math.floor(h / grid);
  const overlapX = Math.floor(tw * 0.2);
  const overlapY = Math.floor(th * 0.2);
  for (let row = 0; row < grid && found.length < MAX_CODES_PER_IMAGE; row += 1) {
    for (let col = 0; col < grid && found.length < MAX_CODES_PER_IMAGE; col += 1) {
      const x0 = Math.max(0, col * tw - overlapX);
      const y0 = Math.max(0, row * th - overlapY);
      const x1 = Math.min(w, (col + 1) * tw + overlapX);
      const y1 = Math.min(h, (row + 1) * th + overlapY);
      sweep(x0, y0, x1 - x0, y1 - y0);
    }
  }

  return found;
}

/** Single-code convenience wrapper. Throws when nothing is found. */
export async function decodeQrFromFile(file: File): Promise<string> {
  const codes = await decodeQrCodesFromFile(file);
  if (!codes.length) {
    throw new Error("No QR code found in the image. Try a clearer photo.");
  }
  return codes[0];
}
