import jsQR from "jsqr";

const MAX_DIMENSION = 1600;

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

export async function decodeQrFromFile(file: File): Promise<string> {
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

  const imageData = ctx.getImageData(0, 0, w, h);
  const result = jsQR(imageData.data, w, h, { inversionAttempts: "attemptBoth" });
  if (!result || !result.data) {
    throw new Error("No QR code found in the image. Try a clearer photo.");
  }
  return result.data;
}
