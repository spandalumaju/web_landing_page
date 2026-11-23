"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Newspaper, Trophy, MessageSquareText } from "lucide-react";

const items = [
  { label: "Ringkasan", href: "/admin", icon: LayoutDashboard },
  { label: "Guru", href: "/admin/guru", icon: Users },
  { label: "Berita", href: "/admin/berita", icon: Newspaper },
  { label: "Prestasi", href: "/admin/prestasi", icon: Trophy },
  { label: "Kritik & Saran", href: "/admin/kritik-saran", icon: MessageSquareText },
];

export function AdminNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi admin"
      className={mobile ? "flex gap-1 overflow-x-auto" : "space-y-1"}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[12px] transition-colors ${
              mobile ? "shrink-0" : ""
            } ${
              active
                ? "bg-matcha-deep text-cream"
                : "text-ink-soft hover:bg-matcha-soft/70 hover:text-ink"
            }`}
          >
            <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
            <span className="font-display font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
