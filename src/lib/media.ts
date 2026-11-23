import path from "node:path";

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const UPLOAD_ROOT = path.join(process.cwd(), "data", "uploads");

export const UPLOAD_FOLDERS = new Set(["posts", "educators"]);

const IMAGE_CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
};

export function detectImageExtension(buffer: Buffer): string | null {
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return "jpg";
  }

  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "png";
  }

  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "webp";
  }

  if (buffer.length >= 12 && buffer.toString("ascii", 4, 8) === "ftyp") {
    const brand = buffer.toString("ascii", 8, 12);
    if (brand === "avif" || brand === "avis") {
      return "avif";
    }
  }

  return null;
}

export function mediaContentType(filePath: string): string | null {
  const extension = path.extname(filePath).slice(1).toLowerCase();
  return IMAGE_CONTENT_TYPES[extension] ?? null;
}

export function resolveMediaPath(parts: string[]): string | null {
  if (parts.length === 0) {
    return null;
  }

  const resolved = path.resolve(UPLOAD_ROOT, ...parts);
  if (resolved !== UPLOAD_ROOT && !resolved.startsWith(`${UPLOAD_ROOT}${path.sep}`)) {
    return null;
  }
  return resolved;
}

export function isSafeMediaUrl(value: string): boolean {
  if (value.startsWith("/images/")) {
    return /^\/images\/[A-Za-z0-9][A-Za-z0-9/_-]*\.(jpe?g|png|webp|avif)$/i.test(
      value,
    );
  }

  return /^\/media\/(posts|educators)\/[0-9a-f-]{36}\.(jpe?g|png|webp|avif)$/i.test(
    value,
  );
}
