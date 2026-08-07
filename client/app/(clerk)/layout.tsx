"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type AuthMode = "sign-in" | "sign-up";

const COPY: Record<AuthMode, { heading: string; subtext: string }> = {
  "sign-in": {
    heading: "Welcome back to Playnearby",
    subtext: "Log in to get back to your dashboard!",
  },
  "sign-up": {
    heading: "Join Playnearby",
    subtext: "Create your profile and start finding players nearby!",
  },
};

type Player = {
  id: number;
  sport: string;
  emoji: string;
  message: string;
  top: string;
  left: string;
  color: string; // tailwind bg-* class
  bubblePos: "top" | "bottom";
};

const NEARBY_PLAYERS: Player[] = [
  { id: 1, sport: "Tennis", emoji: "🎾", message: "I'm available! 👍", top: "14%", left: "74%", color: "bg-[#FFD97A]", bubblePos: "top" },
  { id: 2, sport: "Football", emoji: "⚽", message: "Hey!", top: "28%", left: "26%", color: "bg-[#8FD9C4]", bubblePos: "top" },
  { id: 3, sport: "Volleyball", emoji: "🏐", message: "I'm always in!", top: "56%", left: "10%", color: "bg-[#7AD9FF]", bubblePos: "bottom" },
  { id: 4, sport: "Basketball", emoji: "🏀", message: "At 7?", top: "78%", left: "22%", color: "bg-[#FFB37A]", bubblePos: "top" },
  { id: 5, sport: "Badminton", emoji: "🏸", message: "Wanna play today?", top: "72%", left: "70%", color: "bg-[#FF9FA8]", bubblePos: "bottom" },
];

const ClerkLayout = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  /** Force the copy instead of auto-detecting from the URL. */
  variant?: AuthMode;
}) => {
  // Drives the staggered "detecting players" reveal on load.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const pathname = usePathname();
  const mode: AuthMode = variant ?? (pathname?.includes("sign-up") ? "sign-up" : "sign-in");
  const { heading, subtext } = COPY[mode];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-white">
      {/* Left — nearby players map */}
      <div className="relative h-full bg-primary hidden lg:flex items-center justify-center overflow-hidden">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#78f190] opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#78f190] opacity-10 blur-3xl" />

        {/* stylized map backdrop: roads, a park, a waterline */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 400 800"
          preserveAspectRatio="none"
        >
          <path d="M-20,550 C40,500 60,600 20,680 C-10,730 -30,650 -20,550 Z" fill="#7AD9FF" opacity="0.12" />
          <path d="M300,60 C380,40 420,120 360,170 C300,210 250,150 260,100 C265,75 280,65 300,60 Z" fill="#78f190" opacity="0.15" />
          <path d="M40,300 C90,280 120,330 90,370 C60,400 10,370 20,330 C25,310 30,305 40,300 Z" fill="#78f190" opacity="0.1" />
          <path d="M-10,120 C120,90 220,180 410,140" stroke="#fff" strokeWidth="5" opacity="0.18" fill="none" strokeLinecap="round" />
          <path d="M-10,260 C140,300 260,220 410,280" stroke="#fff" strokeWidth="4" opacity="0.15" fill="none" strokeLinecap="round" />
          <path d="M60,-10 C40,150 120,300 90,500 C70,620 130,700 100,810" stroke="#fff" strokeWidth="4" opacity="0.15" fill="none" strokeLinecap="round" />
          <path d="M340,-10 C300,150 360,300 320,480 C290,600 350,700 330,810" stroke="#fff" strokeWidth="3" opacity="0.12" fill="none" strokeLinecap="round" />
          <path d="M-10,480 C120,440 240,520 410,470" stroke="#fff" strokeWidth="3" opacity="0.12" fill="none" strokeLinecap="round" />
          <path d="M-10,640 C140,600 260,680 410,630" stroke="#fff" strokeWidth="3" opacity="0.1" fill="none" strokeLinecap="round" />
        </svg>

        {/* live status badge */}
        <div className="absolute top-10 left-10 flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#78f190] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#78f190]" />
          </span>
          <span className="text-xs font-medium tracking-wide text-white/90">
            Scanning nearby courts
          </span>
        </div>

        <div className="relative flex flex-col items-center gap-10">
          <div className="relative aspect-square w-100 max-w-[88%]">
            {/* "you", centered */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <span className="absolute -inset-4 rounded-full bg-[#78f190]/30 motion-safe:animate-ping" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-[#78f190] to-primary ring-4 ring-white shadow-2xl">
                <svg viewBox="0 0 24 24" className="h-14 w-14 text-white" fill="currentColor">
                  <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.5c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z" />
                </svg>
              </div>
              <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-white/90">
                You
              </span>
            </div>

            {/* nearby players, each with a floating chat bubble */}
            {NEARBY_PLAYERS.map((p, i) => (
              <div
                key={p.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 motion-reduce:duration-0 ${
                  mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                style={{ top: p.top, left: p.left, transitionDelay: `${300 + i * 220}ms` }}
              >
                <div className="flex flex-col items-center">
                  {p.bubblePos === "top" && (
                    <span className="-mb-1 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-800 shadow-md">
                      {p.message}
                    </span>
                  )}

                  <div className="relative flex h-16 w-16 items-center justify-center">
                    <span className={`absolute inset-0 rounded-full opacity-40 motion-safe:animate-ping ${p.color}`} />
                    <span className={`relative flex h-16 w-16 items-center justify-center rounded-full text-2xl ring-4 ring-white shadow-lg shadow-black/20 ${p.color}`}>
                      {p.emoji}
                    </span>
                  </div>

                  {p.bubblePos === "bottom" && (
                    <span className="-mt-1 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-800 shadow-md">
                      {p.message}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="max-w-xs text-center text-sm text-white/70">
            <span className="font-semibold text-white">12 people</span> are playing nearby right now — find your match.
          </p>
        </div>
      </div>

      {/* Right — auth form */}
      <div className="h-full flex flex-col items-center justify-center px-4 py-16 lg:py-0">
        <div
          key={mode}
          className={`text-center space-y-4 pt-0 lg:pt-16 transition-all duration-700 motion-reduce:duration-0 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <h1 className="font-bold text-3xl text-primary tracking-tight">
            {heading}
          </h1>
          <p className="text-base text-[#1f7a3d]">{subtext}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ClerkLayout;