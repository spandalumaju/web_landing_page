export function SectionLabel({
  index,
  children,
  dark = false,
  onMatcha = false,
}: {
  index: string;
  children: React.ReactNode;
  dark?: boolean;
  onMatcha?: boolean;
}) {
  if (onMatcha) {
    return (
      <div className="flex items-center gap-3 text-cream">
        <span className="eyebrow">{index}</span>
        <span className="h-1 w-1 rounded-full bg-cream/70" />
        <span className="eyebrow text-cream/85">{children}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-3 ${
        dark ? "text-matcha-light" : "text-matcha-deep"
      }`}
    >
      <span className="eyebrow">{index}</span>
      <span className="h-1 w-1 rounded-full bg-current opacity-70" />
      <span className={`eyebrow ${dark ? "text-cream/75" : "text-muted"}`}>
        {children}
      </span>
    </div>
  );
}
