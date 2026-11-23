"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { LockKeyhole, Mail } from "lucide-react";
import type { LoginState } from "./actions";
import { Turnstile } from "@/components/security/turnstile";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-full gloss-button px-5 py-3.5 font-display text-[12px] font-semibold tracking-[-0.01em] text-cream transition-colors  disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Memeriksa..." : "Masuk ke panel"}
    </button>
  );
}

export function LoginForm({
  action,
  turnstileSiteKey,
}: {
  action: (state: LoginState, formData: FormData) => Promise<LoginState>;
  turnstileSiteKey?: string;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-display text-[12px] font-semibold tracking-[-0.01em] text-ink-soft"
        >
          Email admin
        </label>
        <div className="relative">
          <Mail
            size={15}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            className="w-full rounded-xl border border-line bg-white py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition-colors focus:border-matcha-deep"
            placeholder="admin@sekolah.sch.id"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block font-display text-[12px] font-semibold tracking-[-0.01em] text-ink-soft"
        >
          Password
        </label>
        <div className="relative">
          <LockKeyhole
            size={15}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-xl border border-line bg-white py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition-colors focus:border-matcha-deep"
            placeholder="••••••••••••"
          />
        </div>
      </div>

      <Turnstile siteKey={turnstileSiteKey} action="admin_login" />

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
