"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";

import Logo from "@/components/logo";
import ActionButton from "./_components/actionbutton";
import Search from "./_components/search";


const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-white fixed top-0 flex items-center w-full p-1 gap-x-8",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <Search />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 relative left-20">
        <ActionButton />
      </div>
    </div>
  );
};

export default Navbar;
