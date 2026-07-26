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
        "z-50 bg-white fixed top-0 flex items-center justify-center w-full pt-2 pl-5",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div
        className={cn(
          "overflow-hidden transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
          searchScrolled
          ? "opacity-100"
          : "opacity-0"
        )}
      >
          <Search />
      </div>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 relative left-80">
        <ActionButton />
      </div>
    </div>
  );
};

export default Navbar;
