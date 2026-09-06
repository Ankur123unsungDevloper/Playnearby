/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useHeadingSearchScrolled } from "@/hooks/use-heading-search-scrolled";
import { useSearchQuery } from "@/hooks/use-search-query";

import { cn } from "@/lib/utils";

import {
  FaMapMarkerAlt,
  FaStar,
  FaPlay
} from "react-icons/fa";
import { MdSearch } from "react-icons/md";

const avatarSeeds = [12, 32, 47, 5, 22, 18];

const stickerChips = [
  { emoji: "⚽", label: "24 football games today", bg: "bg-[#FFE29A]", rotate: "-rotate-6", pos: "left-0 top-2 sm:-left-4" },
  { emoji: "♟️", label: "Chess Club · 12 online", bg: "bg-[#FFC5C5]", rotate: "rotate-3", pos: "right-0 top-1/2 -translate-y-1/2 sm:right-45" },
  { emoji: "🏸", label: "3 badminton courts free", bg: "bg-[#C5E8FF]", rotate: "rotate-6", pos: "bottom-0 left-10 sm:-bottom-2" },
];

const Heading = () => {
  const searchScrolled = useHeadingSearchScrolled();
  const { query, setQuery } = useSearchQuery();

  return (
    <div className="relative w-full overflow-hidden bg-linear-to-b from-[#F3FFF2] to-[#EAFBEA]">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes chipFloat { 0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); } 50% { transform: translateY(-8px) rotate(var(--r, 0deg)); } }
        @keyframes blobDrift { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(20px, -15px) scale(1.05); } }
        .fade-up { opacity: 0; animation: fadeUp 0.7s ease forwards; }
      `}</style>
      <div className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-[#78F190]/50 blur-[70px] animate-[blobDrift_9s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -right-16 top-40 h-72 w-72 rounded-full bg-[#FFE29A]/60 blur-[70px] animate-[blobDrift_11s_ease-in-out_infinite]" style={{ animationDelay: "1s" }} />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#C5E8FF]/60 blur-[70px] animate-[blobDrift_10s_ease-in-out_infinite]" style={{ animationDelay: "2s" }} />

      <span className="pointer-events-none absolute left-[8%] top-[14%] text-2xl text-primary/40">✦</span>
      <span className="pointer-events-none absolute left-[46%] top-[8%] text-lg text-[#FFB84D]/60">✦</span>
      <span className="pointer-events-none absolute right-[6%] top-[60%] text-2xl text-primary/30">✦</span>

      <div className="pointer-events-none absolute -right-32 top-1/2 hidden h-[85%] w-[68%] -translate-y-1/2 lg:block">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 55% 50%, rgba(120,241,144,0.4) 0%, rgba(120,241,144,0.18) 35%, rgba(120,241,144,0) 68%)",
          }}
        />
        <div className="absolute inset-[8%]">
          <Image
            src="/heading.svg"
            alt="Football, chess, table tennis and cricket equipment"
            fill
            sizes="68vw"
            className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
            priority
          />
        </div>

        {stickerChips.map((chip) => (
          <div
            key={chip.label}
            style={{ "--r": chip.rotate.includes("-") ? "-6deg" : "6deg" } as React.CSSProperties}
            className={cn(
              "pointer-events-auto absolute flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-bold text-gray-800 shadow-lg animate-[chipFloat_4s_ease-in-out_infinite]",
              chip.bg,
              chip.rotate,
              chip.pos,
            )}
          >
            <span className="text-base">{chip.emoji}</span>
            {chip.label}
          </div>
        ))}
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-14 px-6 py-16 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-24">
        
        <div className="relative z-10 flex w-full flex-col items-start gap-5 text-start lg:max-w-140">
          <span
            className="fade-up flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-gray-700 shadow-sm"
            style={{ animationDelay: "0.05s" }}
          >
            👋 Hey! Ready to play something today?
          </span>

          <h1
            className="fade-up text-4xl font-extrabold leading-[1.1] text-gray-900 sm:text-5xl md:text-6xl"
            style={{ animationDelay: "0.15s" }}
          >
            Find Local Players.
            <br />
            Join Games.
            <br />
            <span className="relative inline-block">
              <span
                className="absolute inset-x-0 bottom-1 h-4 -rotate-1 bg-[#FFE29A]"
                aria-hidden
              />
              <span className="relative text-primary">Build Friendships.</span>
            </span>
          </h1>

          <p
            className="fade-up max-w-md text-base text-gray-600 sm:text-lg"
            style={{ animationDelay: "0.25s" }}
          >
            Chess, Carrom, Cards, Badminton, Table Tennis, Cricket and more — pick a sport,
            pick a time, and show up to play with people who actually want to play too.
          </p>

          <div
            className="fade-up flex w-full flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.45s" }}
          >
            <Button
              asChild
              size="lg"
              className="h-13 w-full rounded-lg bg-primary text-base font-bold text-white shadow-[0_10px_24px_rgba(120,241,144,0.5)] transition-transform duration-300 hover:scale-[1.03] hover:bg-primary sm:w-auto sm:px-8"
            >
              <Link href="/games">Find Players</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group h-13 w-full rounded-lg border-2 border-gray-200 bg-white text-base font-bold text-gray-700 transition-colors duration-300 hover:bg-gray-50 sm:w-auto sm:px-6"
            >
              <Link href="/how-it-works" className="flex items-center justify-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <FaPlay className="ml-0.5 text-[10px]" />
                </span>
                See How It Works
              </Link>
            </Button>
          </div>

          <div
            className="fade-up flex items-center gap-3 pt-1"
            style={{ animationDelay: "0.55s" }}
          >
            <div className="flex items-center">
              {avatarSeeds.slice(0, 4).map((seed, i) => (
                <img
                  key={seed}
                  src={`https://i.pravatar.cc/64?img=${seed}`}
                  alt=""
                  className={`h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm ${i > 0 ? "-ml-2.5" : ""}`}
                />
              ))}
              <div className="-ml-2.5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-primary text-[10px] font-bold text-white shadow-sm">
                2k+
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-xs text-[#FFB84D]" />
                ))}
                <span className="ml-1 text-xs font-semibold text-gray-700">4.8/5</span>
              </div>
              <span className="text-xs text-gray-500">Loved by players across Mumbai</span>
            </div>
          </div>
        </div>

        <div className="relative z-0 w-full max-w-100 lg:hidden">
          <div className="relative aspect-square w-full">
            <div className="absolute inset-6 rounded-full bg-primary/15" />
            <div className="absolute inset-14 rounded-full bg-primary/20" />
            <div className="absolute inset-0">
              <Image
                src="/heading.svg"
                alt="Football, chess, table tennis and cricket equipment"
                fill
                sizes="90vw"
                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6">
        <div
          className={cn(
            "fade-up pointer-events-auto w-full max-w-xl transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
            searchScrolled ? "pointer-events-none -translate-y-4 opacity-0" : "",
          )}
          style={{ animationDelay: "0.35s" }}
        >
          <div className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/20 backdrop-blur-[60px] shadow-[0_8px_32px_rgba(255,255,255,0.2)_inset,0_8px_32px_rgba(0,0,0,0.15)] p-2 pl-5">
            <FaMapMarkerAlt className="shrink-0 text-lg text-primary" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try &apos;badminton near Andheri&apos;..."
              className="w-full border-0 bg-transparent text-base text-gray-800 shadow-none placeholder:text-gray-400 focus:outline-none focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <button
              aria-label="Search"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-xl text-white transition-transform duration-300 hover:scale-110"
            >
              <MdSearch />
            </button>
          </div>
          
          <div id="heading-search" className="relative top-full h-px w-full" />
        </div>
      </div>
    </div>
  );
};

export default Heading;