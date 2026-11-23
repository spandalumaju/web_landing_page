export function SchoolBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex h-28 w-28 flex-col items-center justify-center rounded-full bg-matcha-deep text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_18px_45px_rgba(24,56,35,0.2)] sm:h-32 sm:w-32 ${className}`}
      aria-hidden="true"
    >
      <span className="absolute inset-2 rounded-full border border-cream/20" />
      <span className="font-display text-lg font-semibold leading-none tracking-[-0.02em]">
        SMPN 2
      </span>
      <span className="eyebrow mt-1.5 text-[11px] text-cream/70">
        Ambulu
      </span>
    </div>
  );
}
