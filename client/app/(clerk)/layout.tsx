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
  name: string;
  sport: string;
  emoji: string;
  top: string;
  left: string;
  color: string; // tailwind bg-* class
};

const NEARBY_PLAYERS: Player[] = [
  { id: 1, name: "Priya", sport: "Badminton", emoji: "🏸", top: "20%", left: "70%", color: "bg-[#FF9F7A]" },
  { id: 2, name: "Meera", sport: "Tennis", emoji: "🎾", top: "65%", left: "75%", color: "bg-[#78F190]" },
  { id: 3, name: "Ananya", sport: "Basketball", emoji: "🏀", top: "72%", left: "25%", color: "bg-[#FFD97A]" },
  { id: 4, name: "Fatima", sport: "Pickleball", emoji: "🏓", top: "25%", left: "20%", color: "bg-[#7AD9FF]" },
  { id: 5, name: "Kavya", sport: "Football", emoji: "⚽", top: "12%", left: "48%", color: "bg-[#FF7AA8]" },
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
      {/* Left — live radar map */}
      <div className="relative h-full bg-primary hidden lg:flex items-center justify-center overflow-hidden">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#78f190] opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#78f190] opacity-10 blur-3xl" />

        {/* faint map grid, like streets on a city map */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

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

        <div className="relative flex flex-col items-center gap-8">
          <div className="relative aspect-square w-180 max-w-[85%]">
            {/* distance rings */}
            {[100, 75, 50, 25].map((size) => (
              <div
                key={size}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                style={{ width: `${size}%`, height: `${size}%` }}
              />
            ))}

            {/* rotating radar sweep */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full rounded-full overflow-hidden motion-safe:animate-spin"
              style={{ animationDuration: "6s" }}
            >
              <div
                className="h-full w-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(120,241,144,0.35), transparent 35%)",
                }}
              />
            </div>

            {/* "you" pin, center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="absolute -inset-3 rounded-full bg-[#78f190]/40 motion-safe:animate-ping" />
              <span
                className="absolute -inset-6 rounded-full bg-[#78f190]/20 motion-safe:animate-ping"
                style={{ animationDelay: "0.6s" }}
              />
              <div className="relative h-4 w-4 rounded-full bg-white ring-4 ring-[#78f190]" />
              <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold text-white/90">
                You
              </span>
            </div>

            {/* nearby players, revealed as "detected" one by one */}
            {NEARBY_PLAYERS.map((p, i) => (
              <div
                key={p.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 motion-reduce:duration-0 ${
                  mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                style={{ top: p.top, left: p.left, transitionDelay: `${300 + i * 220}ms` }}
              >
                <div className="relative flex h-15 w-15 items-center justify-center">
                  <span className={`absolute inset-0 rounded-full opacity-40 motion-safe:animate-ping ${p.color}`} />
                  <span className={`relative flex h-15 w-15 items-center justify-center rounded-full text-lg shadow-lg shadow-black/20 ${p.color}`}>
                    {p.emoji}
                  </span>
                </div>
              </div>
            ))}

            {/* one detected match surfaced as a detail card */}
            <div
              className={`absolute w-40 rounded-xl bg-white/95 px-3 py-2 shadow-xl transition-all duration-700 motion-reduce:duration-0 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ top: "4%", left: "72%", transitionDelay: "900ms" }}
            >
              <p className="text-xs font-semibold text-gray-900">Priya · Badminton</p>
              <p className="text-[11px] text-gray-500">0.8 km away · Intermediate</p>
            </div>
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