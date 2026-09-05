"use client";

import Link from "next/link";
import {
  usePathname
} from "next/navigation";


import Logo from "@/components/logo";

const NAV_LINKS = [
  { href: "/games", label: "Games" },
  { href: "/venues", label: "Venues" },
  { href: "/communities", label: "Communities" },
  { href: "/play-requests", label: "Play Requests" },
];


export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 backdrop-blur-md uppercase text-xl font-semibold">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 transition-colors ${
                  active ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        
      </div>
    </header>
  );
}
