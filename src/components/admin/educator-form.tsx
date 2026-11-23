"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle, Save, X } from "lucide-react";
import type { EducatorRecord } from "@/lib/db/schema";

export type EducatorFormValues = Pick<
  EducatorRecord,
  | "id"
  | "name"
  | "role"
  | "unit"
  | "photo"
  | "quote"
  | "level"
  | "sortOrder"
  | "published"
>;
import type { EducatorFormState } from "@/lib/validation/educators";
import { levelOptions, unitOptions } from "@/lib/validation/educators";
import { ImageDropzone } from "@/components/admin/image-dropzone";
import { useAdminToast } from "@/components/admin/toast";

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
      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full gloss-button px-4 py-2.5 font-display text-[12px] font-semibold text-cream transition-colors disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />
      ) : (
        <Save size={14} aria-hidden="true" />
      )}
      {pending ? "Menyimpan..." : editing ? "Simpan perubahan" : "Tambah pendidik"}
    </button>
  );
}

export function EducatorForm({
  action,
  educator,
  onSaved,
  onCancel,
}: {
  action: (
    state: EducatorFormState,
    formData: FormData,
  ) => Promise<EducatorFormState>;
  educator?: EducatorFormValues;
  onSaved?: () => void;
  onCancel?: () => void;
}) {
  const [state, formAction] = useActionState(action, {});
  const toast = useAdminToast();
  const handled = useRef(false);
  const editing = Boolean(educator);

  useEffect(() => {
    if (!state.success || handled.current) {
      return;
    }
    handled.current = true;
    toast.push(state.message || "Data pendidik disimpan.");
    onSaved?.();
  }, [onSaved, state, toast]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-[11px] text-matcha-deep">
            {editing ? "Edit pendidik" : "Pendidik baru"}
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.03em] text-ink">
            {editing ? educator?.name : "Tambahkan ke direktori"}
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

      <div className="flex gap-3">
        <ImageDropzone
          name="photo"
          folder="educators"
          label="Foto"
          value={educator?.photo ?? null}
          aspect="aspect-[3/4]"
          className="w-[116px] shrink-0"
          compact
          hint=""
        />
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <label htmlFor="name" className={labelClass}>
              Nama lengkap
            </label>
            <input
              id="name"
              name="name"
              required
              defaultValue={educator?.name}
              className={inputClass}
              placeholder="Nama pendidik"
            />
          </div>
          <div>
            <label htmlFor="role" className={labelClass}>
              Jabatan
            </label>
            <input
              id="role"
              name="role"
              required
              defaultValue={educator?.role}
              className={inputClass}
              placeholder="Guru Matematika"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="unit" className={labelClass}>
            Unit kerja
          </label>
          <input
            id="unit"
            name="unit"
            required
            list="unit-options"
            defaultValue={educator?.unit ?? "Dewan Guru"}
            className={inputClass}
          />
          <datalist id="unit-options">
            {unitOptions.map((unit) => (
              <option key={unit} value={unit} />
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor="level" className={labelClass}>
            Level
          </label>
          <select
            id="level"
            name="level"
            defaultValue={educator?.level ?? 4}
            className={inputClass}
          >
            {levelOptions.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="quote" className={labelClass}>
          Kutipan kartu
        </label>
        <textarea
          id="quote"
          name="quote"
          rows={3}
          defaultValue={educator?.quote}
          className={`${inputClass} resize-y`}
          placeholder="Kutipan singkat saat kartu dibalik..."
        />
        <p className="mt-1 text-[10px] text-muted">Maksimal 500 karakter.</p>
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
              defaultValue={educator?.sortOrder ?? 0}
              className={inputClass}
            />
          </div>
          <label className="flex min-h-[42px] flex-1 items-center gap-2 rounded-xl border border-line bg-white px-3 text-[11px] text-ink-soft">
            <input
              type="checkbox"
              name="published"
              defaultChecked={educator?.published ?? true}
              className="h-4 w-4 accent-[#2f5d3b]"
            />
            Tampil di situs
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
