"use client";

import Link from "next/link";
import {
  usePathname,
  useRouter
} from "next/navigation";
import Logo from "./logo";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  useClerk,
  useUser
} from "@clerk/nextjs";

import {
  LogOut,
  User
} from "lucide-react";
import { FaHandsHelping, FaUserFriends } from "react-icons/fa";

const NAV_LINKS = [
  { href: "/games", label: "Games" },
  { href: "/venues", label: "Venues" },
  { href: "/communities", label: "Communities" },
  { href: "/play-requests", label: "Play Requests" },
];

function getInitials(name?: string | null) {
  if (!name) return "U";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function AppNavbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/90 backdrop-blur-md uppercase text-xl font-semibold">
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
        <div className="flex flex-row items-center gap-3">
          <Button
            variant="ghost"
            className=""
            asChild
          >
            <Link href="/partner-with-us" className="flex flex-col lg:flex-row items-center cursor-pointer">
              <FaUserFriends className="size-8 m-auto shrink-0" />
              <span className="ml-2 uppercase text-xl font-semibold tracking-[10%] whitespace-nowrap text-main">Partner</span>
            </Link>
          </Button>

          <div className="flex shrink-0 items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="rounded-full outline-none transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label="Open profile menu"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20 transition hover:ring-primary hover:scale-105">
                    <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? "Your profile"} />
                    <AvatarFallback className="bg-primary font-semibold text-white">
                      {getInitials(user?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-52">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer bg-background text-on_background group flex w-full font-semibold border-none items-center px-6 py-3 mt-3 text-sm hover:bg-surface">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/help&support" className="cursor-pointer bg-background text-on_background group flex w-full font-semibold border-none items-center px-6 py-3 mt-3 text-sm hover:bg-surface">
                    <FaHandsHelping className="mr-2 h-4 w-4" />
                    Help & Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600 group flex w-full font-semibold border-none items-center px-6 py-3 mt-3 text-sm hover:bg-surface"
                  onClick={() => signOut(() => router.push("/"))}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
