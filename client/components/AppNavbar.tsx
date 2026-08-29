"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { GiShuttlecock } from "react-icons/gi";

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
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg text-white">
            <GiShuttlecock />
          </div>
          <span className="text-lg font-black tracking-tight text-gray-900">PlayNearby</span>
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
          <Link
            href="/games/create"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-transform duration-300 hover:scale-[1.03] sm:block"
          >
            + Host a Game
          </Link>
          {/* <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
                Sign In
              </button>
            </SignInButton>
          </SignedOut> */}
        </div>
      </div>
    </header>
  );
}
