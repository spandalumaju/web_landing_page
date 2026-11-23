type TelegramFeedback = {
  name?: string | null;
  contact?: string | null;
  category: string;
  message: string;
  createdAt: Date;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendFeedbackToTelegram(
  feedback: TelegramFeedback,
): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    return {
      ok: false,
      error: "TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID belum dikonfigurasi.",
    };
  }

  const category = feedback.category.toUpperCase();
  const lines = [
    "<b>Kritik &amp; Saran baru</b>",
    `Kategori: <b>${escapeHtml(category)}</b>`,
    `Nama: ${escapeHtml(feedback.name?.trim() || "Anonim")}`,
    feedback.contact?.trim()
      ? `Kontak: ${escapeHtml(feedback.contact.trim())}`
      : null,
    "",
    escapeHtml(feedback.message.trim()),
    "",
    `Waktu: ${feedback.createdAt.toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    })} WIB`,
  ].filter(Boolean);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join("\n"),
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      },
    );

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as {
        description?: string;
      } | null;
      return {
        ok: false,
        error: payload?.description ?? `Telegram HTTP ${response.status}`,
      };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Gagal menghubungi Telegram.",
    };
  }
}
