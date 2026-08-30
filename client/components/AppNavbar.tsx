"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";

const NAV_LINKS = [
  { href: "/games", label: "Games" },
  { href: "/venues", label: "Venues" },
  { href: "/communities", label: "Communities" },
  { href: "/play-requests", label: "Play Requests" },
];

export function AppNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          
        </div>
      </div>
    </header>
  );
}
