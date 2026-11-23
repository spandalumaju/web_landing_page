export function isTurnstileConfigured(): boolean {
  return Boolean(
    process.env.TURNSTILE_SECRET_KEY &&
      process.env.TURNSTILE_SITE_KEY,
  );
}

export async function verifyTurnstile(
  token: string | null | undefined,
  remoteIp: string,
): Promise<{ ok: boolean; error?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const siteKey = process.env.TURNSTILE_SITE_KEY;

  if (!secret || !siteKey) {
    return { ok: true };
  }

  if (!token) {
    return { ok: false, error: "Verifikasi keamanan belum selesai." };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
      remoteip: remoteIp,
    });
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        cache: "no-store",
        signal: AbortSignal.timeout(6000),
      },
    );

    if (!response.ok) {
      return { ok: false, error: "Verifikasi keamanan sedang tidak tersedia." };
    }

    const result = (await response.json()) as { success?: boolean };
    return result.success
      ? { ok: true }
      : { ok: false, error: "Verifikasi keamanan gagal. Coba lagi." };
  } catch {
    return { ok: false, error: "Verifikasi keamanan gagal. Coba lagi." };
  }
}
