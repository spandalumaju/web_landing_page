import { SchoolMark } from "@/components/site/school-mark";

export function ImagePlaceholder({
  label = "Dokumentasi sekolah",
  className = "",
  dark = false,
}: {
  label?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden ${
        dark
          ? "bg-[radial-gradient(circle_at_top,rgba(183,227,156,0.18),transparent_58%),linear-gradient(135deg,#163722,#0b120d)] text-cream"
          : "bg-[radial-gradient(circle_at_top,rgba(183,227,156,0.45),transparent_60%),linear-gradient(145deg,#f7fbf2,#e7f2df)] text-matcha-deep"
      } ${className}`}
      aria-hidden="true"
    >
      <span
        className={`absolute -right-10 -top-10 h-36 w-36 rounded-full border ${
          dark ? "border-cream/10" : "border-matcha-deep/10"
        }`}
      />
      <span
        className={`absolute -bottom-16 -left-12 h-44 w-44 rounded-full border ${
          dark ? "border-cream/10" : "border-matcha-deep/10"
        }`}
      />
      <SchoolMark className="relative h-16 w-16 opacity-90 sm:h-20 sm:w-20" />
      <span
        className={`relative mt-3 max-w-[24ch] text-center font-display text-[10px] font-semibold leading-relaxed tracking-[0.04em] ${
          dark ? "text-cream/70" : "text-matcha-deep/75"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
