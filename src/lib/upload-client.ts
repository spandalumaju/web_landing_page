const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

export type UploadFolder = "posts" | "educators";

export async function uploadImage(
  file: File,
  folder: UploadFolder,
): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Format gambar harus JPG, PNG, WebP, atau AVIF.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Ukuran gambar maksimal 8 MB.");
  }

  const body = new FormData();
  body.set("file", file);
  body.set("folder", folder);

  const response = await fetch("/api/admin/uploads", {
    method: "POST",
    body,
    headers: { "x-requested-with": "admin" },
  });

  let payload: { url?: string; error?: string } = {};
  try {
    payload = (await response.json()) as { url?: string; error?: string };
  } catch {
    // The response may be empty on a reverse-proxy error.
  }

  if (!response.ok || !payload.url) {
    throw new Error(payload.error || "Gambar gagal diunggah.");
  }

  return payload.url;
}
