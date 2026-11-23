"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Send } from "lucide-react";
import {
  feedbackCategories,
  type FeedbackFormState,
} from "@/lib/validation/feedback";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-[13px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-matcha-deep";
const labelClass =
  "mb-2 block font-display text-[11px] font-semibold tracking-[-0.01em] text-ink-soft";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 gloss-button rounded-full px-6 py-4 font-display text-[12px] font-semibold tracking-[-0.01em] text-cream transition-colors disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      <Send size={14} aria-hidden="true" />
      {pending ? "Mengirim..." : "Kirim kritik & saran"}
    </button>
  );
}

export function FeedbackForm({
  action,
}: {
  action: (
    state: FeedbackFormState,
    formData: FormData,
  ) => Promise<FeedbackFormState>;
}) {
  const [state, formAction] = useActionState(action, {});

  if (state.success) {
    return (
      <div className="gloss-card rounded-[24px] p-7 sm:p-9">
        <CheckCircle2
          size={30}
          className="text-matcha-deep"
          aria-hidden="true"
        />
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
          Pesan terkirim.
        </h2>
        <p className="mt-2 max-w-[42ch] text-[13px] leading-relaxed text-ink-soft">
          Terima kasih. Pesan Anda sudah masuk ke panel pengelola sekolah.
          Jika kanal notifikasi aktif, pengelola juga menerima pemberitahuan.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-5 inline-flex rounded-full border border-matcha-deep/25 bg-white/60 px-4 py-2.5 font-display text-[11px] font-semibold tracking-[-0.01em] text-matcha-deep transition-colors hover:bg-matcha-deep hover:text-cream"
        >
          Kirim pesan lain
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nama <span className="text-muted/60">(opsional)</span>
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className={inputClass}
            placeholder="Nama Anda"
          />
        </div>
        <div>
          <label htmlFor="contact" className={labelClass}>
            Email / WhatsApp <span className="text-muted/60">(opsional)</span>
          </label>
          <input
            id="contact"
            name="contact"
            autoComplete="email"
            className={inputClass}
            placeholder="Kontak yang bisa dihubungi"
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className={labelClass}>
          Jenis pesan
        </label>
        <select id="category" name="category" className={inputClass}>
          {feedbackCategories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Pesan
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={6}
          className={`${inputClass} resize-y`}
          placeholder="Tulis kritik, saran, atau masukan untuk sekolah..."
        />
        <p className="mt-1.5 text-[11px] text-muted">
          Minimal 10 karakter. Maksimal 2.000 karakter.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 accent-[#2f5d3b]"
        />
        <span className="text-[11px] leading-relaxed text-ink-soft">
          Saya setuju pesan ini dibaca oleh pengelola sekolah dan diteruskan ke
          kanal Telegram internal sekolah.
        </span>
      </label>

      {state.error && (
        <p
          role="alert"
          className="rounded-xl border border-[#b42318]/20 bg-[#b42318]/5 px-4 py-3 text-[12px] text-[#8a1c14]"
        >
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
