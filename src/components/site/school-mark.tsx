export function SchoolMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="20"
        cy="20"
        r="19"
        stroke="currentColor"
        strokeOpacity="0.28"
      />
      <path
        d="M10 29V20a10 10 0 0 1 20 0v9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M20 10v19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.55"
      />
      <circle cx="20" cy="20" r="2.5" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}
