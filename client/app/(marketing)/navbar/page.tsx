"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { useHeadingSearchScrolled } from "@/hooks/use-heading-search-scrolled";
import { cn } from "@/lib/utils";

import Logo from "@/components/logo";
import ActionButton from "./_components/actionbutton";
import Search from "./_components/search";

const Navbar = () => {
  const scrolled = useScrollTop();
  const searchScrolled = useHeadingSearchScrolled();

  return (
    <div
      className={cn(
        "z-50 bg-white fixed top-0 left-0 flex items-center justify-between w-full px-5 py-2",
        scrolled && "border-b shadow-sm"
      )}
    >
      {/* Left: logo, fixed size, never shrinks */}
      <div className="flex-none">
        <Logo />
      </div>

      {/* Center: search, fades in on scroll, ignores clicks while hidden */}
      <div
        className={cn(
          "flex-1 flex justify-center overflow-hidden px-4 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
          searchScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Search />
      </div>

      {/* Right: auth buttons / avatar, fixed size, never shrinks */}
      <div className="flex-none flex items-center gap-x-2">
        <ActionButton />
      </div>
    </div>
  );
};

export default Navbar;