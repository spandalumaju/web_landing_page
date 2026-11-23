import Image from "next/image";

export function SchoolMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logos/smpn2ambulu.png"
      alt=""
      width={512}
      height={512}
      sizes="64px"
      className={`object-contain ${className}`}
      aria-hidden="true"
    />
  );
}
