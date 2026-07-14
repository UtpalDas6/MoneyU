"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`text-sm transition ${
        active ? "text-foreground font-medium" : "text-muted hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
