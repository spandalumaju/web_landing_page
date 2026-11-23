"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, CircleAlert, X } from "lucide-react";

type Tone = "success" | "error";
type ToastItem = { id: number; message: string; tone: Tone };

const ToastContext = createContext<{
  push: (message: string, tone?: Tone) => void;
} | null>(null);

let nextToastId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const remove = useCallback((id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const push = useCallback((message: string, tone: Tone = "success") => {
    const id = nextToastId++;
    setItems((current) => [...current.slice(-2), { id, message, tone }]);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-5 right-5 z-[120] flex w-[min(92vw,360px)] flex-col gap-2"
        aria-live="polite"
        aria-atomic="false"
      >
        {items.map((item) => (
          <ToastCard key={item.id} item={item} onDismiss={() => remove(item.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 4200);
    return () => window.clearTimeout(timer);
  }, [onDismiss]);

  const Icon = item.tone === "success" ? CheckCircle2 : CircleAlert;

  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-start gap-3 rounded-[16px] border px-4 py-3 text-[12px] shadow-[0_18px_50px_rgba(11,18,13,0.16)] backdrop-blur-md ${
        item.tone === "success"
          ? "border-matcha-deep/20 bg-[#f8fff3]/95 text-ink"
          : "border-[#b42318]/20 bg-[#fff7f5]/95 text-[#7a1b12]"
      }`}
    >
      <Icon
        size={16}
        className={`mt-0.5 shrink-0 ${
          item.tone === "success" ? "text-matcha-deep" : "text-[#b42318]"
        }`}
        aria-hidden="true"
      />
      <p className="min-w-0 flex-1 leading-relaxed">{item.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Tutup notifikasi"
        className="shrink-0 text-muted transition-colors hover:text-ink"
      >
        <X size={13} aria-hidden="true" />
      </button>
    </div>
  );
}

export function useAdminToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useAdminToast harus dipakai di dalam ToastProvider.");
  }
  return context;
}
