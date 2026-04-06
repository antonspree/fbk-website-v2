export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export interface CompressResult {
  file: File;
  originalSizeKB: number;
  compressedSizeKB: number;
}

/**
 * Komprimiert ein Bild clientseitig via Canvas API und gibt eine WebP-Datei zurück.
 * Behält das Seitenverhältnis bei. Standard: max 1920×1920px, Qualität 0.85.
 */
export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<CompressResult> {
  const { maxWidth = 1920, maxHeight = 1920, quality = 0.85 } = options;

  const originalSizeKB = Math.round(file.size / 1024);

  const bitmap = await createImageBitmap(file);

  let { width, height } = bitmap;
  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Canvas toBlob fehlgeschlagen"))),
      "image/webp",
      quality
    );
  });

  const baseName = file.name.replace(/\.[^.]+$/, "");
  const compressedFile = new File([blob], `${baseName}.webp`, { type: "image/webp" });
  const compressedSizeKB = Math.round(compressedFile.size / 1024);

  return { file: compressedFile, originalSizeKB, compressedSizeKB };
}
