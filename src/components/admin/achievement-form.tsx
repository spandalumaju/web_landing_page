"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle, Save, X } from "lucide-react";
import type { AchievementRecord } from "@/lib/db/schema";
import type { AchievementFormState } from "@/lib/validation/achievements";
import { achievementLevels } from "@/lib/validation/achievements";
import { useAdminToast } from "@/components/admin/toast";

export type AchievementFormValues = Pick<
  AchievementRecord,
  | "id"
  | "title"
  | "recipient"
  | "level"
  | "year"
  | "category"
  | "featured"
  | "sortOrder"
>;

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[13px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-matcha-deep";
const labelClass =
  "mb-1.5 block font-display text-[11px] font-semibold tracking-[-0.01em] text-ink-soft";

function SubmitButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full gloss-button px-4 py-2.5 font-display text-[12px] font-semibold text-cream transition-colors disabled:opacity-60"
    >
      {pending ? (
        <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />
      ) : (
        <Save size={14} aria-hidden="true" />
      )}
      {pending ? "Menyimpan..." : editing ? "Simpan perubahan" : "Tambah prestasi"}
    </button>
  );
}

export function AchievementForm({
  action,
  achievement,
  onSaved,
  onCancel,
}: {
  action: (
    state: AchievementFormState,
    formData: FormData,
  ) => Promise<AchievementFormState>;
  achievement?: AchievementFormValues;
  onSaved?: () => void;
  onCancel?: () => void;
}) {
  const [state, formAction] = useActionState(action, {});
  const toast = useAdminToast();
  const handled = useRef(false);
  const editing = Boolean(achievement);

  useEffect(() => {
    if (!state.success || handled.current) {
      return;
    }
    handled.current = true;
    toast.push(state.message || "Prestasi disimpan.");
    onSaved?.();
  }, [onSaved, state, toast]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-[11px] text-matcha-deep">
            {editing ? "Edit prestasi" : "Prestasi baru"}
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.03em] text-ink">
            {editing ? achievement?.title : "Catat pencapaian"}
          </h2>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            aria-label="Tutup form"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink xl:hidden"
          >
            <X size={15} aria-hidden="true" />
          </button>
        )}
      </div>

      <div>
        <label htmlFor="title" className={labelClass}>
          Nama prestasi
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={achievement?.title}
          className={inputClass}
          placeholder="Juara 1 Olimpiade Matematika"
        />
      </div>

      <div>
        <label htmlFor="recipient" className={labelClass}>
          Penerima / tim
        </label>
        <input
          id="recipient"
          name="recipient"
          defaultValue={achievement?.recipient}
          className={inputClass}
          placeholder="Nama siswa, tim, atau regu"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="level" className={labelClass}>
            Tingkat
          </label>
          <select
            id="level"
            name="level"
            defaultValue={achievement?.level ?? "Kabupaten"}
            className={inputClass}
          >
            {achievementLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year" className={labelClass}>
            Tahun
          </label>
          <input
            id="year"
            name="year"
            type="number"
            min={2000}
            max={2100}
            required
            defaultValue={achievement?.year ?? new Date().getFullYear()}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className={labelClass}>
          Kategori
        </label>
        <select
          id="category"
          name="category"
          defaultValue={achievement?.category ?? "Akademik"}
          className={inputClass}
        >
          <option value="Akademik">Akademik</option>
          <option value="Non-akademik">Non-akademik</option>
        </select>
      </div>

      <div className="rounded-[16px] border border-line bg-white/70 p-3">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label htmlFor="sortOrder" className={labelClass}>
              Urutan tampil
            </label>
            <input
              id="sortOrder"
              name="sortOrder"
              type="number"
              min={0}
              max={9999}
              defaultValue={achievement?.sortOrder ?? 0}
              className={inputClass}
            />
          </div>
          <label className="flex min-h-[42px] flex-1 items-center gap-2 rounded-xl border border-line bg-white px-3 text-[11px] text-ink-soft">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={achievement?.featured ?? false}
              className="h-4 w-4 accent-[#2f5d3b]"
            />
            Unggulan
          </label>
        </div>
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-xl border border-[#b42318]/20 bg-[#b42318]/5 px-3.5 py-2.5 text-[12px] text-[#8a1c14]"
        >
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-2 border-t border-line pt-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-line px-4 py-2.5 text-[12px] font-medium text-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            Batal
          </button>
        )}
        <SubmitButton editing={editing} />
      </div>
    </form>
  );
}
