import Image from "next/image";

export function DispendikMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logos/dispendik-jember.png"
      alt="Dinas Pendidikan Kabupaten Jember"
      width={512}
      height={512}
      sizes="64px"
      className={`object-contain ${className}`}
    />
  );
}
