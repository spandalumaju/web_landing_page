"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Trash2, TriangleAlert } from "lucide-react";
import { useAdminToast } from "@/components/admin/toast";

export function DeleteButton({
  onConfirm,
  title,
  description,
  successMessage = "Data dihapus.",
  label = "Hapus data",
}: {
  onConfirm: () => Promise<{ success?: boolean; error?: string }>;
  title: string;
  description: string;
  successMessage?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const confirmRef = useRef<HTMLButtonElement>(null);
  const toast = useAdminToast();
  const router = useRouter();

  useEffect(() => {
    if (!open) {
      return;
    }

    confirmRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !pending) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, pending]);

  const confirm = () => {
    startTransition(async () => {
      const result = await onConfirm();
      if (result.error) {
        toast.push(result.error, "error");
        return;
      }
      setOpen(false);
      toast.push(successMessage);
      router.refresh();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={label}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-[#b42318]/40 hover:bg-[#b42318]/5 hover:text-[#8a1c14]"
      >
        <Trash2 size={14} aria-hidden="true" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/45 p-4 backdrop-blur-[2px]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !pending) {
              setOpen(false);
            }
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
            className="w-full max-w-md rounded-[24px] border border-white/70 bg-cream p-6 shadow-[0_30px_90px_rgba(11,18,13,0.24)]"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#b42318]/8 text-[#b42318]">
              <TriangleAlert size={20} aria-hidden="true" />
            </span>
            <h2
              id="delete-dialog-title"
              className="mt-4 font-display text-xl font-semibold tracking-[-0.03em] text-ink"
            >
              {title}
            </h2>
            <p
              id="delete-dialog-description"
              className="mt-2 text-[13px] leading-relaxed text-ink-soft"
            >
              {description}
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={pending}
                className="rounded-full border border-line px-4 py-2.5 text-[12px] font-medium text-ink-soft transition-colors hover:border-line-strong hover:text-ink disabled:opacity-50"
              >
                Batal
              </button>
              <button
                ref={confirmRef}
                type="button"
                onClick={confirm}
                disabled={pending}
                className="inline-flex items-center gap-2 rounded-full bg-[#8a1c14] px-4 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#6f150f] disabled:opacity-60"
              >
                {pending ? (
                  <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />
                ) : (
                  <Trash2 size={14} aria-hidden="true" />
                )}
                {pending ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
