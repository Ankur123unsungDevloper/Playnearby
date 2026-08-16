"use client";

import { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export function CarouselRow({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/*
        overflow-x-auto forces overflow-y to clip too, which cuts off the
        hover lift + drop shadow. Padding the track vertically (not just
        horizontally) gives the shadow room to breathe instead of being cropped.
      */}
      <div
        ref={trackRef}
        className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-2 py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Scroll left"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-lg text-black/70 shadow-sm transition-all duration-300 hover:-translate-x-0.5 hover:bg-primary hover:text-white"
        >
          <MdChevronLeft />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Scroll right"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-lg text-black/70 shadow-sm transition-all duration-300 hover:translate-x-0.5 hover:bg-primary hover:text-white"
        >
          <MdChevronRight />
        </button>
      </div>
    </div>
  );
}
