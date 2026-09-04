"use client";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Show,
  useClerk,
  useUser
} from "@clerk/nextjs";

import {
  LogOut,
  User
} from "lucide-react";
import { FaHandsHelping } from "react-icons/fa";

function getInitials(name?: string | null) {
  if (!name) return "U";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function ActionButton() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    // No w-full/h-full here — this component should size to its content,
    // not stretch to fill the navbar. Stretching was pushing the avatar
    // all the way to the edge in your screenshot.
    <div className="flex items-center gap-3">
      <Show when="signed-out">
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-white hover:border-primary text-white hover:text-primary font-bold py-2 px-4 rounded w-30"
        >
          <Link href="/sign-in">Login</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white font-bold py-2 px-4 rounded w-30"
        >
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </Show>

      <Show when="signed-in">
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
      </Show>
    </div>
  );
}