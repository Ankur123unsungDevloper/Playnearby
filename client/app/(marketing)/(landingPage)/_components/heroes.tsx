"use client";

import { useState } from "react";
import { FaLocationDot, FaChessKnight } from "react-icons/fa6";
import { GiSoccerBall, GiCricketBat, GiShuttlecock } from "react-icons/gi";
import { MdPool, MdMyLocation } from "react-icons/md";
import { TbDisc } from "react-icons/tb";

/* ------------------------------------------------------------------ */
/*  Types + data                                                      */
/* ------------------------------------------------------------------ */

type Spot = {
  id: string;
  name: string;
  sport: string;
  icon: React.ReactNode;
  top: number; // % from top of the map card
  left: number; // % from left of the map card
  distance: string;
  going: number;
  href: string;
};

const spots: Spot[] = [
  {
    id: "s1",
    name: "Vile Parle Turf Club",
    sport: "Football",
    icon: <GiSoccerBall />,
    top: 42,
    left: 32,
    distance: "1.2 km",
    going: 8,
    href: "/venues/vile-parle-turf",
  },
  {
    id: "s2",
    name: "Chakala Sports Arena",
    sport: "Cricket",
    icon: <GiCricketBat />,
    top: 21,
    left: 42,
    distance: "2.8 km",
    going: 14,
    href: "/venues/chakala-arena",
  },
  {
    id: "s3",
    name: "Juhu Badminton Court",
    sport: "Badminton",
    icon: <GiShuttlecock />,
    top: 50,
    left: 24,
    distance: "0.6 km",
    going: 4,
    href: "/venues/juhu-badminton",
  },
  {
    id: "s4",
    name: "Powai Lake Club",
    sport: "Swimming",
    icon: <MdPool />,
    top: 12,
    left: 64,
    distance: "6.4 km",
    going: 6,
    href: "/venues/powai-lake",
  },
  {
    id: "s5",
    name: "BKC Chess Circle",
    sport: "Chess",
    icon: <FaChessKnight />,
    top: 63,
    left: 57,
    distance: "4.1 km",
    going: 3,
    href: "/venues/bkc-chess",
  },
  {
    id: "s6",
    name: "Kalina Carrom Club",
    sport: "Carrom",
    icon: <TbDisc />,
    top: 68,
    left: 39,
    distance: "3.5 km",
    going: 5,
    href: "/venues/kalina-carrom",
  },
];

// "You are here" — centered roughly among the nearest cluster of pins
const userPoint = { top: 36, left: 33 };

/* ------------------------------------------------------------------ */
/*  Hand-drawn map illustration (pure SVG, no map-tile / API usage)   */
/* ------------------------------------------------------------------ */

function HandDrawnMap() {
  return (
    <svg
      viewBox="0 0 960 540"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      {/* Sea base */}
      <rect x="0" y="0" width="960" height="540" fill="#DCF1FB" />

      {/* Landmass */}
      <path
        d="M170,0 C130,70 90,150 130,230 C165,300 120,360 100,430 C85,480 110,510 150,540
          L960,540 L960,0 Z"
        fill="#F5EFE1"
      />
      <path
        d="M170,0 C130,70 90,150 130,230 C165,300 120,360 100,430 C85,480 110,510 150,540"
        fill="none"
        stroke="#C8BFA6"
        strokeWidth="2.5"
        strokeDasharray="1 7"
        strokeLinecap="round"
      />

      {/* Creek / bay carved into the top-right */}
      <path
        d="M780,0 C755,55 800,120 840,165 C878,206 858,280 895,320 L960,320 L960,0 Z"
        fill="#DCF1FB"
      />
      <path
        d="M780,0 C755,55 800,120 840,165 C878,206 858,280 895,320"
        fill="none"
        stroke="#B9DCEC"
        strokeWidth="2"
        strokeDasharray="1 6"
      />

      {/* Mangrove park patch near the creek */}
      <ellipse cx="845" cy="235" rx="55" ry="70" fill="#C7E9D2" opacity="0.9" />
      {[...Array(10)].map((_, i) => (
        <circle
          key={i}
          cx={815 + ((i * 37) % 90)}
          cy={190 + ((i * 53) % 130)}
          r="5.5"
          fill="#6FBE87"
        />
      ))}

      {/* Sketchy roads */}
      <path
        d="M230,540 C280,440 310,340 275,250 C245,175 300,110 370,55"
        fill="none"
        stroke="#F2B84B"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M232,538 C282,438 312,338 277,248 C247,173 302,108 372,53"
        fill="none"
        stroke="#F2B84B"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M370,55 C470,40 560,60 640,20"
        fill="none"
        stroke="#F2B84B"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M300,300 C400,320 470,270 560,300 C630,325 690,300 760,330"
        fill="none"
        stroke="#CBC2AC"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 5"
      />
      <path
        d="M320,180 C360,240 340,300 380,360 C410,405 400,460 440,510"
        fill="none"
        stroke="#CBC2AC"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 5"
      />

      {/* Decorative hand-lettered label */}
      <text
        x="480"
        y="470"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontSize="30"
        fill="#B8AE93"
      >
        Mumbai
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail panel shown for the active pin                              */
/* ------------------------------------------------------------------ */

function DetailPanel({ spot }: { spot: Spot | null }) {
  return (
    <div key={spot?.id ?? "placeholder"} className="animate-[fadeSlide_0.4s_ease]">
      {spot ? (
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 text-3xl text-primary shadow-sm">
              {spot.icon}
            </div>
            <h3 className="mt-4 text-xl font-bold text-primary">{spot.sport}</h3>
            <p className="mt-1 text-base font-semibold text-primary/80">{spot.name}</p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-primary">
                📍 {spot.distance} away
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-primary">
                {spot.going} going now
              </span>
            </div>
          </div>

          <a
            href={spot.href}
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-md transition-transform duration-300 hover:scale-[1.02] hover:cursor-pointer"
          >
            View Games Here
          </a>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 text-3xl text-primary shadow-sm">
            <MdMyLocation />
          </div>
          <h3 className="text-lg font-bold text-primary">Explore what&apos;s near you</h3>
          <p className="text-sm font-medium text-primary/80">
            Tap a pin on the map to see live games and venues around you.
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Heroes                                                             */
/* ------------------------------------------------------------------ */

const Heroes = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = spots.find((s) => s.id === activeId) ?? null;

  return (
    <section className="w-full">
      {/* keyframes for the floating pins + the panel's fade-in — scoped, no tailwind config edits needed */}
      <style>{`
        @keyframes pinFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="mx-auto flex w-full flex-col items-center justify-center gap-6 px-4 mt-15 lg:flex-row">
        {/* Map card */}
        <div className="relative w-full overflow-hidden rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] lg:aspect-auto lg:h-105 lg:w-3/5">
          <HandDrawnMap />

          {/* "You are here" marker */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${userPoint.top}%`, left: `${userPoint.left}%` }}
          >
            <span className="absolute inset-0 -m-2 rounded-full bg-blue-400/40 animate-ping" />
            <span className="relative block h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-md" />
          </div>

          {/* Location pins */}
          {spots.map((spot, i) => {
            const isActive = activeId === spot.id;
            return (
              <button
                key={spot.id}
                onClick={() => setActiveId(isActive ? null : spot.id)}
                style={{
                  top: `${spot.top}%`,
                  left: `${spot.left}%`,
                  animationDelay: `${i * 0.25}s`,
                }}
                className="group absolute -translate-x-1/2 -translate-y-full animate-[pinFloat_3s_ease-in-out_infinite]"
              >
                <FaLocationDot
                  className={`text-3xl drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:scale-125 ${
                    isActive ? "scale-125 text-primary" : "text-red-500"
                  }`}
                />
                {/* Hover / active tooltip */}
                <span
                  className={`pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-black/80 px-2.5 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
                    isActive ? "opacity-100" : ""
                  }`}
                >
                  {spot.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="relative flex w-90 flex-col overflow-hidden rounded-3xl bg-[#78F190] p-6 lg:h-105 lg:w-2/5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15" />
          <DetailPanel spot={active} />
        </div>
      </div>
    </section>
  );
};

export default Heroes;