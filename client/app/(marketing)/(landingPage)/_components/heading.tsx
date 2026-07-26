"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHeadingSearchScrolled } from "@/hooks/use-heading-search-scrolled";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdSearch } from "react-icons/md";

const Heading = () => {
  const searchScrolled = useHeadingSearchScrolled();

  return (
    <div className="flex flex-row items-center justify-center bg-[#3BEA5E] text-white w-full min-h-180">
      <div className="flex flex-col items-start justify-center w-650 h-full p-4 text-start relative left-10 bottom-15">
        <h2 className="text-[90px] font-bold leading-tight">
          Find Local Players.
          <br />
          Join Games.
          <br />
          Build Friendships.
        </h2>
        <h4 className="text-5xl font-normal max-w-200 pt-5">
          Connect with nearby players for Chess, Carrom, Cards, Badminton, Table Tennis, Cricket and more.
        </h4>
        <div className="flex flex-row items-center justify-center w-full h-full pt-5 gap-4 relative right-50">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary text-white text-xl font-bold py-2 px-4 rounded-lg w-50 h-15"
          >
            Find Players
          </Button>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary text-white text-xl font-bold py-2 px-4 rounded-lg w-50 h-15"
          >
            Create Match
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "absolute left-1/2 z-20 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
          searchScrolled
          ? "opacity-0 -translate-y-6"
          : "opacity-100 translate-y-0"
        )}
      >
        <div className="z-20 flex h-12 w-120 items-center rounded-lg border border-white/20 bg-white/15 px-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
          <FaMapMarkerAlt className="text-2xl text-white" />
          <Input
            type="text"
            placeholder="Search nearby games..."
            className="
              w-full
              border-0
              bg-transparent
              shadow-none
              focus-visible:ring-0
              focus-visible:ring-offset-0
              focus-visible:border-0
              focus:outline-none
              text-white
              placeholder:text-white/80
              placeholder:text-xl
              text-2xl
            "
          />
          <MdSearch className="text-4xl text-white text-bold" />
        </div>
        <div
          id="heading-search"
          className="absolute top-full h-px w-full"
        />
      </div>
      <div className="w-540 h-150 flex items-center justify-center relative bottom-10">
        <Image
          src="/heading.svg"
          alt="Heading Image"
          width={650}
          height={500}
          className="w-full h-full pr-4"
        />
      </div>
    </div>
  );
};

export default Heading;
