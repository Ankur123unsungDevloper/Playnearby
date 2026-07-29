"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { MdArrowForwardIos, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaChessKnight, FaRocket, FaLocationDot } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";
import {
  GiSoccerBall,
  GiShuttlecock,
  GiCricketBat,
  GiTennisRacket,
  GiPingPongBat,
} from "react-icons/gi";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Player = {
  name: string;
  avatar: string;
};

type SlotStatus = "slots" | "booked" | "going";

type GameSession = {
  id: string;
  format: string; // "Doubles · Regular"
  sportIcon: React.ReactNode;
  image: string; // e.g. "/games/chess.png" — identifies the sport visually
  host: Player;
  joined: Player[]; // players who joined (host is shown first)
  level: string; // "Amateur - Professional"
  stateTag?: string; // "MH"
  hearts: number;
  date: string;
  time: string;
  location: string;
  distance: string;
  status: SlotStatus;
  statusText: string; // "Only 2 Slots" / "BOOKED" / "5/6 Going"
  href: string;
};

type Venue = {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  address: string;
  distance: string;
  featured?: boolean;
  sports: React.ReactNode[]; // icons for playable sports
  href: string;
};

/* ------------------------------------------------------------------ */
/*  Mock data — swap these with real data from your API               */
/* ------------------------------------------------------------------ */

const games: GameSession[] = [
  {
    id: "g1",
    format: "Doubles · Regular",
    sportIcon: <FaChessKnight />,
    image: "/games/chess.png",
    host: { name: "Ankur", avatar: "https://github.com/shadcn.png" },
    joined: [
      { name: "Ishtartha", avatar: "https://i.pravatar.cc/80?img=12" },
      { name: "Riya", avatar: "https://i.pravatar.cc/80?img=32" },
    ],
    level: "Amateur - Professional",
    stateTag: "MH",
    hearts: 134,
    date: "Tue, 28 Jul 2026",
    time: "07:00 PM - 08:00 PM",
    location: "Dr. Rajkumar Badminton Court",
    distance: "4.17",
    status: "slots",
    statusText: "Only 2 Slots",
    href: "/games/chess",
  },
  {
    id: "g2",
    format: "Regular",
    sportIcon: <GiShuttlecock />,
    image: "/games/badminton.png",
    host: { name: "Neha", avatar: "https://i.pravatar.cc/80?img=47" },
    joined: [{ name: "Sam", avatar: "https://i.pravatar.cc/80?img=5" }],
    level: "Beginner - Professional",
    hearts: 1991,
    date: "Tue, 28 Jul 2026",
    time: "07:00 PM - 08:00 PM",
    location: "Social Grid Turfpark",
    distance: "6.96",
    status: "slots",
    statusText: "Only 1 Slot",
    href: "/games/badminton",
  },
  {
    id: "g3",
    format: "7 A Side · Regular",
    sportIcon: <GiSoccerBall />,
    image: "/games/football.png",
    host: { name: "TurfX", avatar: "https://i.pravatar.cc/80?img=15" },
    joined: [
      { name: "A", avatar: "https://i.pravatar.cc/80?img=21" },
      { name: "B", avatar: "https://i.pravatar.cc/80?img=22" },
      { name: "C", avatar: "https://i.pravatar.cc/80?img=23" },
      { name: "D", avatar: "https://i.pravatar.cc/80?img=24" },
    ],
    level: "Beginner - Professional",
    hearts: 44652,
    date: "Tue, 28 Jul 2026",
    time: "08:00 PM - 09:00 PM",
    location: "Tiger 5 Dairy Circle",
    distance: "4.43",
    status: "going",
    statusText: "5 Going",
    href: "/games/football",
  },
  {
    id: "g4",
    format: "Regular",
    sportIcon: <GiCricketBat />,
    image: "/games/cricket.png",
    host: { name: "CiTi Smashers", avatar: "https://i.pravatar.cc/80?img=8" },
    joined: [
      { name: "P1", avatar: "https://i.pravatar.cc/80?img=9" },
      { name: "P2", avatar: "https://i.pravatar.cc/80?img=10" },
    ],
    level: "Beginner - Professional",
    hearts: 48826,
    date: "Tue, 28 Jul 2026",
    time: "08:00 PM - 09:00 PM",
    location: "PLAY4ALL ARENA",
    distance: "4.61",
    status: "booked",
    statusText: "BOOKED",
    href: "/games/cricket",
  },
];

const venues: Venue[] = [
  {
    id: "v1",
    name: "FerroHub Sports | Millers",
    image: "/venues/chess.jpg",
    rating: 3.83,
    reviews: 6,
    address: "16/A, Millers Rd, above Metro Station, Mumbai",
    distance: "2.41",
    featured: true,
    sports: [<FaChessKnight key="chess" />, <GiCricketBat key="cricket" />],
    href: "/venues/chess",
  },
  {
    id: "v2",
    name: "Depot18 - Sports",
    image: "/venues/chess.jpg",
    rating: 4.44,
    reviews: 18,
    address: "Chamundi Hotel Compound, Mumbai",
    distance: "2.84",
    featured: true,
    sports: [<GiSoccerBall key="soc" />, <GiShuttlecock key="bad" />, <GiTennisRacket key="ten" />],
    href: "/venues/depot18",
  },
  {
    id: "v3",
    name: "Terra Arena",
    image: "/venues/chess.jpg",
    rating: 3.64,
    reviews: 14,
    address: "M.G. Railway Colony, Mumbai",
    distance: "3.17",
    featured: true,
    sports: [<GiSoccerBall key="soc2" />, <GiPingPongBat key="pp" />, <GiShuttlecock key="bad2" />, <GiCricketBat key="cr2" />],
    href: "/venues/terra-arena",
  },
  {
    id: "v4",
    name: "Wellness Sports Inc",
    image: "/venues/chess.jpg",
    rating: 4.5,
    reviews: 8,
    address: "#1, Bhavya Plaza, 2nd Floor, Mumbai",
    distance: "0.46",
    sports: [<GiTennisRacket key="ten2" />],
    href: "/venues/wellness",
  },
];

/* ------------------------------------------------------------------ */
/*  Avatar group — host first, up to `max` shown, then a +N bubble    */
/* ------------------------------------------------------------------ */

function AvatarGroup({
  host,
  joined,
  max = 3,
}: {
  host: Player;
  joined: Player[];
  max?: number;
}) {
  const all = [host, ...joined];
  const visible = all.slice(0, max);
  const remaining = all.length - visible.length;

  return (
    <div className="flex items-center">
      {visible.map((p, i) => (
        <Avatar
          key={p.name + i}
          style={{ transitionDelay: `${i * 60}ms`, zIndex: visible.length - i }}
          className={`h-8 w-8 border-2 border-white shadow-sm transition-transform duration-300 hover:z-10 hover:scale-110 ${
            i > 0 ? "-ml-3" : ""
          }`}
        >
          <AvatarImage src={p.avatar} alt={p.name} />
          <AvatarFallback className="text-[10px]">
            {p.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
      {remaining > 0 && (
        <div className="-ml-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black/70 text-[11px] font-semibold text-white">
          +{remaining}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Status badge (slots left / booked / going)                        */
/* ------------------------------------------------------------------ */

function StatusBadge({ status, text }: { status: SlotStatus; text: string }) {
  if (status === "booked") {
    return (
      <span className="rounded-md bg-white px-3 py-1 text-xs font-bold text-primary shadow-sm">
        {text}
      </span>
    );
  }
  if (status === "slots") {
    return (
      <span className="flex items-center gap-1 rounded-full bg-[#78F190] px-2.5 py-1 text-xs font-semibold text-primary shadow-sm">
        <FaRocket className="text-[10px]" />
        {text}
      </span>
    );
  }
  return (
    <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
      {text}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Section header with "See all" link                                */
/* ------------------------------------------------------------------ */

function SectionHeader({ title, href, label }: { title: string; href: string; label: string }) {
  return (
    <div className="flex w-full items-center justify-between px-5">
      <h4 className="text-2xl font-bold text-black">{title}</h4>
      <Link
        href={href}
        className="group flex items-center gap-1.5 text-base font-semibold text-primary transition-colors hover:text-primary/80"
      >
        {label}
        <MdArrowForwardIos className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Generic scroll-snap carousel row with prev/next controls          */
/* ------------------------------------------------------------------ */

function CarouselRow({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/*
        overflow-x-auto forces overflow-y to clip too, which was cutting off
        the hover lift + drop shadow and making it look like a flat smear
        under the cards. Padding the track vertically (not just horizontally)
        gives the shadow room to breathe instead of being cropped.
      */}
      <div
        ref={trackRef}
        className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-2 py-6 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
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

/* ------------------------------------------------------------------ */
/*  Game card                                                          */
/* ------------------------------------------------------------------ */

function GameCard({ game }: { game: GameSession }) {
  return (
    <Card
      onClick={() => (window.location.href = game.href)}
      className="group relative h-80 w-130 flex-none snap-start overflow-hidden rounded-3xl border-0 bg-primary p-0 shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(0,0,0,0.16)] hover:cursor-pointer"
    >
      {/* soft glow accent on hover */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Faint sport icon, opposite corner from the image */}
      <div className="pointer-events-none absolute right-2 top-4 text-7xl text-white/15 transition-all duration-500 group-hover:scale-110 group-hover:text-white/25">
        {game.sportIcon}
      </div>

      {/* Sport image — identifies the game at a glance, sits like a sticker in the corner */}
      <div className="pointer-events-none absolute bottom-10 left-10 h-45 w-50 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3">
        <Image
          src={game.image}
          alt={game.format}
          width={140}
          height={140}
          className="h-full w-full object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]"
        />
      </div>

      <CardContent className="relative flex w-full h-full flex-col justify-between p-5">
        {/* Top row: format tag + status */}
        <div className="flex max-w-[70%] items-center justify-between gap-2">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {game.format}
          </span>
        </div>

        {/* Middle: avatars + level */}
        <div className="flex flex-col w-full gap-2 pr-16 relative bottom-10">
          <div className="flex w-full items-center justify-between gap-2">
            <AvatarGroup host={game.host} joined={game.joined} />
            <StatusBadge status={game.status} text={game.statusText} />
          </div>
          <div className="flex flex-wrap w-full items-center gap-2">
            <span className="rounded-md bg-[#78F190] px-2 py-1 text-[11px] font-semibold text-primary">
              {game.level}
            </span>
            {game.stateTag && (
              <span className="rounded-md bg-black/60 px-2 py-1 text-[11px] font-semibold text-white">
                {game.stateTag}
              </span>
            )}
          </div>
          <h3 className="text-sm font-medium text-white/90">
            {game.host.name} &middot; {game.hearts.toLocaleString()} Hearts
          </h3>
        </div>

        {/* Bottom: date/time + location */}
        <div className="flex flex-col items-center justify-center gap-1.5 border-t border-white/15 pt-3">
          <span className="text-[16px] font-semibold text-white">
            {game.date}, {game.time}
          </span>
          <div className="flex items-center gap-1.5">
            <FaSearchLocation className="shrink-0 text-xl text-white/80" />
            <span className="truncate text-[13px] text-white/80">{game.location}</span>
            <span className="shrink-0 text-xs font-medium text-white">
              (~{game.distance} Kms)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Venue card                                                         */
/* ------------------------------------------------------------------ */

function VenueCard({ venue }: { venue: Venue }) {
  const visibleSports = venue.sports.slice(0, 3);
  const extraSports = venue.sports.length - visibleSports.length;

  return (
    <Card
      onClick={() => (window.location.href = venue.href)}
      className="group relative h-70 w-130 flex-none snap-start overflow-hidden rounded-3xl bg-primary p-0 shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(0,0,0,0.16)] hover:cursor-pointer"
    >
      <CardContent className="flex h-full w-full flex-col p-3">
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={venue.image}
            alt={venue.name}
            width={400}
            height={220}
            className="h-40 w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Sport icon chips — games playable at this venue */}
          <div className="absolute left-2 top-30 flex items-center">
            {visibleSports.map((icon, i) => (
              <div
                key={i}
                style={{ zIndex: visibleSports.length - i }}
                className={`flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-black/60 text-sm text-white backdrop-blur-sm ${
                  i > 0 ? "-ml-2" : ""
                }`}
              >
                {icon}
              </div>
            ))}
            {extraSports > 0 && (
              <div className="-ml-2 flex h-7 items-center justify-center rounded-full border border-white/40 bg-black/60 px-2 text-[11px] font-semibold text-white backdrop-blur-sm">
                +{extraSports} more
              </div>
            )}
          </div>

          {venue.featured && (
            <div className="absolute bottom-3 right-3 rounded-xl bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              FEATURED
            </div>
          )}
        </div>

        {/* Details */}
        <div className="mt-8 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-lg font-bold text-white">{venue.name}</h3>
            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
              {venue.rating.toFixed(2)} <span className="text-green-700/70">({venue.reviews})</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <FaLocationDot className="shrink-0 text-xs text-white/80" />
            <span className="truncate text-[13px] text-white/80">{venue.address}</span>
            <span className="shrink-0 text-xs font-medium text-white">
              (~{venue.distance} Kms)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */

const Services = () => {
  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-12 rounded-xl py-10 mt-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <div className="flex w-full flex-col items-center gap-4">
        <SectionHeader title="Discover Games" href="/games" label="See All Games" />
        <CarouselRow>
          {games.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </CarouselRow>
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        <SectionHeader title="Book Venues" href="/venues" label="See All Venues" />
        <CarouselRow>
          {venues.map((v) => (
            <VenueCard key={v.id} venue={v} />
          ))}
        </CarouselRow>
      </div>
    </div>
  );
};

export default Services;