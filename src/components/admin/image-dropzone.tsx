"use client";

import { useId, useRef, useState } from "react";
import { ImagePlus, LoaderCircle, Trash2, UploadCloud } from "lucide-react";
import { uploadImage, type UploadFolder } from "@/lib/upload-client";

type SharedProps = {
  folder: UploadFolder;
  label: string;
  hint?: string;
  className?: string;
  disabled?: boolean;
  compact?: boolean;
  onChange?: (value: string | string[] | null) => void;
};

type SingleProps = SharedProps & {
  multiple?: false;
  name: string;
  value?: string | null;
  aspect?: string;
};

type MultipleProps = SharedProps & {
  multiple: true;
  name: string;
  value?: string[];
  maxFiles?: number;
};

export function ImageDropzone(props: SingleProps | MultipleProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState("");

  const isMultiple = props.multiple === true;
  const maxFiles = isMultiple ? (props.maxFiles ?? 6) : 1;
  const initialValue = isMultiple ? (props.value ?? []) : props.value ?? "";
  const [urls, setUrls] = useState<string[]>(
    Array.isArray(initialValue) ? initialValue : initialValue ? [initialValue] : [],
  );

  const emit = (next: string[]) => {
    setUrls(next);
    if (props.multiple) {
      props.onChange?.(next);
    } else {
      props.onChange?.(next[0] ?? null);
    }
  };

  const handleFiles = async (files: FileList | File[]) => {
    if (props.disabled) {
      return;
    }

    const remaining = Math.max(0, maxFiles - urls.length);
    const selected = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, remaining);

    if (selected.length === 0) {
      if (remaining === 0) {
        setError(`Maksimal ${maxFiles} gambar.`);
      }
      return;
    }

    setError("");
    setUploading((value) => value + selected.length);

    const uploaded: string[] = [];
    for (const file of selected) {
      try {
        const url = await uploadImage(file, props.folder);
        uploaded.push(url);
      } catch (uploadError) {
        setError(
          uploadError instanceof Error
            ? uploadError.message
            : "Gambar gagal diunggah.",
        );
      } finally {
        setUploading((value) => Math.max(0, value - 1));
      }
    }

    if (uploaded.length > 0) {
      emit([...urls, ...uploaded].slice(0, maxFiles));
    }
  };

  const remove = (url: string) => {
    emit(urls.filter((item) => item !== url));
  };

  const openPicker = () => {
    if (!props.disabled) {
      inputRef.current?.click();
    }
  };

  const dropzoneClass = `group relative flex ${props.compact ? "min-h-[144px] gap-1.5 px-2 py-3" : "min-h-28 gap-2 px-4 py-5"} w-full flex-col items-center justify-center rounded-[18px] border border-dashed text-center transition-colors ${
    dragging
      ? "border-matcha-deep bg-matcha-soft"
      : "border-line-strong bg-white/60 hover:border-matcha-deep hover:bg-white"
  } ${props.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`;

  if (!isMultiple) {
    const current = urls[0] ?? "";
    return (
      <div className={props.className}>
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="font-display text-[12px] font-semibold text-ink">
            {props.label}
          </p>
          {current && (
            <button
              type="button"
              onClick={() => remove(current)}
              disabled={props.disabled}
              className="inline-flex items-center gap-1 text-[11px] text-muted transition-colors hover:text-[#8a1c14]"
            >
              <Trash2 size={12} aria-hidden="true" />
              Hapus
            </button>
          )}
        </div>

        {current ? (
          <div
            className="relative overflow-hidden rounded-[18px] border border-line bg-white"
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              void handleFiles(event.dataTransfer.files);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current}
              alt=""
              className={`w-full object-cover ${props.aspect ?? "aspect-[16/10]"}`}
            />
            <button
              type="button"
              onClick={openPicker}
              disabled={props.disabled}
              className="absolute inset-x-3 bottom-3 inline-flex items-center justify-center gap-2 rounded-full bg-ink/80 px-3 py-2 text-[11px] font-medium text-cream backdrop-blur-sm transition-colors hover:bg-ink"
            >
              <ImagePlus size={13} aria-hidden="true" />
              {props.compact ? "Ganti" : "Ganti gambar"}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={openPicker}
            disabled={props.disabled}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              void handleFiles(event.dataTransfer.files);
            }}
            className={dropzoneClass}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-matcha-soft text-matcha-deep">
              <UploadCloud size={18} aria-hidden="true" />
            </span>
            {props.compact ? (
              <span className="text-[11px] font-medium leading-tight text-ink">
                Unggah foto
              </span>
            ) : (
              <>
                <span className="text-[12px] font-medium text-ink">
                  Tarik gambar ke sini atau klik untuk memilih
                </span>
                <span className="text-[11px] text-muted">
                  JPG, PNG, WebP, AVIF · maks. 8 MB
                </span>
              </>
            )}
          </button>
        )}

        {uploading > 0 && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-matcha-deep">
            <LoaderCircle size={12} className="animate-spin" aria-hidden="true" />
            Mengunggah gambar...
          </p>
        )}
        {props.hint && !error && (
          <p className="mt-2 text-[11px] leading-relaxed text-muted">{props.hint}</p>
        )}
        {error && (
          <p role="alert" className="mt-2 text-[11px] text-[#8a1c14]">
            {error}
          </p>
        )}

        {current && <input type="hidden" name={props.name} value={current} />}
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          data-image-input={props.name}
          className="sr-only"
          onChange={(event) => {
            if (event.target.files) {
              void handleFiles(event.target.files);
            }
            event.target.value = "";
          }}
        />
      </div>
    );
  }

  return (
    <div className={props.className}>
      <div className="mb-2 flex items-end justify-between gap-3">
        <div>
          <p className="font-display text-[12px] font-semibold text-ink">
            {props.label}
          </p>
          <p className="mt-0.5 text-[11px] text-muted">
            {urls.length}/{maxFiles} gambar
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {urls.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="group relative overflow-hidden rounded-[14px] border border-line bg-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt=""
              className="aspect-square w-full object-cover"
            />
            <button
              type="button"
              onClick={() => remove(url)}
              className="absolute right-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink/80 text-cream opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              aria-label={`Hapus gambar ${index + 1}`}
            >
              <Trash2 size={12} aria-hidden="true" />
            </button>
          </div>
        ))}

        {urls.length < maxFiles && (
          <button
            type="button"
            onClick={openPicker}
            disabled={props.disabled}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              void handleFiles(event.dataTransfer.files);
            }}
            className={dropzoneClass}
          >
            {uploading > 0 ? (
              <LoaderCircle size={18} className="animate-spin text-matcha-deep" aria-hidden="true" />
            ) : (
              <ImagePlus size={18} className="text-matcha-deep" aria-hidden="true" />
            )}
            <span className="text-[11px] font-medium text-ink">
              {uploading > 0 ? "Mengunggah..." : "Tambah gambar"}
            </span>
          </button>
        )}
      </div>

      {props.hint && !error && (
        <p className="mt-2 text-[11px] leading-relaxed text-muted">{props.hint}</p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-[11px] text-[#8a1c14]">
          {error}
        </p>
      )}

      {urls.map((url) => (
        <input key={`hidden-${url}`} type="hidden" name={props.name} value={url} />
      ))}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple
        data-image-input={props.name}
        className="sr-only"
        onChange={(event) => {
          if (event.target.files) {
            void handleFiles(event.target.files);
          }
          event.target.value = "";
        }}
      />
    </div>
  );
}
