export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "Unsupported file type. Please upload a JPG, PNG, or WebP image.";
  }
  if (file.size > MAX_FILE_BYTES) {
    return "Image is larger than 10 MB. Please choose a smaller file.";
  }
  return null;
}

export function isUrl(value: string): boolean {
  try {
    const u = new URL(value.trim());
    return /^(https?|ftp):$/i.test(u.protocol);
  } catch {
    return false;
  }
}
