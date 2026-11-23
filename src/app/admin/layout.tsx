import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Admin — SMP Negeri 2 Ambulu",
    template: "%s — Admin SMPN 2 Ambulu",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh bg-[#f3f5ef] text-ink">{children}</div>;
}
