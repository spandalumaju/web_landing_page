"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { CheckCircle2, Image as ImageIcon, LoaderCircle, Save } from "lucide-react";
import { ImageDropzone } from "@/components/admin/image-dropzone";
import { useAdminToast } from "@/components/admin/toast";
import type { SiteImageRow } from "@/lib/db/queries/site-images";
import {
  siteImageGroupLabels,
  type SiteImageGroup,
} from "@/lib/site-images/slots";
import type { SiteImagesFormState } from "@/app/admin/(protected)/gambar/actions";

const groups: SiteImageGroup[] = ["hero", "profile", "facilities", "gallery"];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full gloss-button px-5 py-3 font-display text-[12px] font-semibold text-cream disabled:opacity-60"
    >
      {pending ? (
        <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />
      ) : (
        <Save size={14} aria-hidden="true" />
      )}
      {pending ? "Menyimpan..." : "Simpan gambar situs"}
    </button>
  );
}

export function SiteImagesManager({
  rows,
  action,
}: {
  rows: SiteImageRow[];
  action: (
    state: SiteImagesFormState,
    formData: FormData,
  ) => Promise<SiteImagesFormState>;
}) {
  const [state, formAction] = useActionState(action, {});
  const toast = useAdminToast();
  const router = useRouter();
  const lastSuccess = useRef<SiteImagesFormState | null>(null);

  useEffect(() => {
    if (!state.success || lastSuccess.current === state) {
      return;
    }
    lastSuccess.current = state;
    toast.push(state.message || "Gambar situs disimpan.");
    router.refresh();
  }, [router, state, toast]);

  const byGroup = (group: SiteImageGroup) =>
    rows.filter((row) => row.group === group);

  return (
    <form action={formAction}>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-[11px] text-matcha-deep">Media</p>
          <h1 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-ink">
            Gambar situs
          </h1>
          <p className="mt-2 max-w-[58ch] text-[13px] leading-relaxed text-muted">
            Kelola foto utama, profil, fasilitas, dan galeri dari satu tempat.
            Kosongkan slot jika belum ada dokumentasi resmi.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {state.success && (
            <span className="hidden items-center gap-1.5 text-[11px] text-matcha-deep sm:inline-flex">
              <CheckCircle2 size={13} aria-hidden="true" />
              Tersimpan
            </span>
          )}
          <SubmitButton />
        </div>
      </div>

      {state.error && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-[#b42318]/20 bg-[#b42318]/5 px-4 py-3 text-[12px] text-[#8a1c14]"
        >
          {state.error}
        </p>
      )}

      <div className="mt-8 space-y-8">
        {groups.map((group) => (
          <section key={group}>
            <div className="flex items-center gap-2">
              <ImageIcon size={15} className="text-matcha-deep" aria-hidden="true" />
              <h2 className="font-display text-lg font-semibold text-ink">
                {siteImageGroupLabels[group]}
              </h2>
              <span className="rounded-full bg-matcha-soft px-2 py-0.5 text-[10px] text-matcha-deep">
                {byGroup(group).filter((row) => row.url).length}/{byGroup(group).length}
              </span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {byGroup(group).map((row) => (
                <div
                  key={row.key}
                  className="rounded-[20px] border border-line bg-cream p-4"
                >
                  <ImageDropzone
                    name={`image:${row.key}`}
                    folder="posts"
                    label={row.label}
                    value={row.url || null}
                    aspect="aspect-[16/10]"
                    hint="Rasio lanskap 16:10 direkomendasikan."
                  />
                  <label
                    htmlFor={`alt:${row.key}`}
                    className="mt-3 block font-display text-[11px] font-semibold text-ink-soft"
                  >
                    Teks alternatif
                    <input
                      id={`alt:${row.key}`}
                      name={`alt:${row.key}`}
                      defaultValue={row.alt}
                      maxLength={220}
                      className="mt-1.5 h-10 w-full rounded-xl border border-line bg-white px-3 text-[12px] font-normal text-ink outline-none transition-colors focus:border-matcha-deep"
                      placeholder="Deskripsi singkat untuk aksesibilitas dan SEO"
                    />
                  </label>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="sticky bottom-4 z-10 mt-8 flex justify-end">
        <div className="flex items-center gap-3 rounded-full border border-white/70 bg-cream/90 px-4 py-2 shadow-[0_18px_50px_rgba(24,56,35,0.14)] backdrop-blur-xl">
          <span className="hidden text-[11px] text-muted sm:inline">
            Perubahan berlaku untuk halaman publik
          </span>
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
