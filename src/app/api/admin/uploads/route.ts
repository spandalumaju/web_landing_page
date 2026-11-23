import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { getSession } from "@/lib/auth/session";
import {
  detectImageExtension,
  MAX_IMAGE_BYTES,
  UPLOAD_FOLDERS,
  UPLOAD_ROOT,
} from "@/lib/media";

export const runtime = "nodejs";

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    return jsonError("Sesi admin tidak valid.", 401);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_IMAGE_BYTES + 1_000_000) {
    return jsonError("Ukuran gambar melebihi batas 8 MB.", 413);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonError("Data unggahan tidak valid.", 400);
  }

  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "posts");

  if (!(file instanceof File) || file.size === 0) {
    return jsonError("Pilih file gambar terlebih dahulu.", 400);
  }
  if (!UPLOAD_FOLDERS.has(folder)) {
    return jsonError("Folder unggahan tidak dikenal.", 400);
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return jsonError("Ukuran gambar maksimal 8 MB.", 413);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const extension = detectImageExtension(buffer);
  if (!extension) {
    return jsonError("Format gambar harus JPG, PNG, WebP, atau AVIF.", 415);
  }

  const targetDir = path.join(UPLOAD_ROOT, folder);
  const filename = `${randomUUID()}.${extension}`;
  const targetPath = path.join(targetDir, filename);

  try {
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(targetPath, buffer, { flag: "wx" });
  } catch {
    return jsonError("Gambar gagal disimpan. Coba lagi.", 500);
  }

  return Response.json({
    url: `/media/${folder}/${filename}`,
    width: null,
    height: null,
  });
}
