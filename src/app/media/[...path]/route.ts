import fs from "node:fs/promises";
import path from "node:path";
import { mediaContentType, resolveMediaPath } from "@/lib/media";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: parts } = await params;
  const filePath = resolveMediaPath(parts);
  if (!filePath) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const info = await fs.stat(filePath);
    if (!info.isFile() || info.size > 12 * 1024 * 1024) {
      return new Response("Not found", { status: 404 });
    }

    const body = await fs.readFile(filePath);
    const contentType = mediaContentType(filePath);
    if (!contentType) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(new Uint8Array(body), {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(body.byteLength),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        "Content-Disposition": `inline; filename="${path.basename(filePath)}"`,
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
