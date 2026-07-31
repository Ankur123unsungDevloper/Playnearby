"use client";

import Link from "next/link";
import Image from "next/image";
import { FaChessKnight } from "react-icons/fa6";
import {
  GiSoccerBall,
  GiCricketBat,
  GiShuttlecock
} from "react-icons/gi";
import { MdPool } from "react-icons/md";
import { TbDisc } from "react-icons/tb";

/* ------------------------------------------------------------------ */
/*  Types + data                                                      */
/* ------------------------------------------------------------------ */

type Sport = {
  id: string;
  name: string;
  image: string; // e.g. "/sports/football.jpg"
  icon: React.ReactNode;
  href: string;
};

const sports: Sport[] = [
  { id: "football", name: "Football", image: "/sports/football.jpg", icon: <GiSoccerBall />, href: "/games?sport=football" },
  { id: "cricket", name: "Cricket", image: "/sports/cricket.jpg", icon: <GiCricketBat />, href: "/games?sport=cricket" },
  { id: "badminton", name: "Badminton", image: "/sports/badminton.jpg", icon: <GiShuttlecock />, href: "/games?sport=badminton" },
  { id: "chess", name: "Chess", image: "/sports/chess.jpg", icon: <FaChessKnight />, href: "/games?sport=chess" },
  { id: "carrom", name: "Carrom", image: "/sports/carrom.jpg", icon: <TbDisc />, href: "/games?sport=carrom" },
  { id: "swimming", name: "Swimming", image: "/sports/swimming.jpg", icon: <MdPool />, href: "/games?sport=swimming" },
];

/* ------------------------------------------------------------------ */
/*  Sport card                                                        */
/* ------------------------------------------------------------------ */

function SportCard({ sport }: { sport: Sport }) {
  return (
    <Link
      href={sport.href}
      className="group relative block aspect-3/4 w-full overflow-hidden rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_32px_rgba(0,0,0,0.2)]"
    >
      {/* Photo */}
      <Image
        src={sport.image}
        alt={sport.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient so the name always reads clean over any photo */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

      {/* Sport icon chip, top-right */}
      <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary">
        {sport.icon}
      </div>

      {/* Name */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-base font-bold text-white transition-transform duration-500 group-hover:-translate-y-1 md:text-lg">
          {sport.name}
        </h3>
        <div className="h-0.5 w-0 rounded-full bg-[#78F190] transition-all duration-500 group-hover:w-10" />
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  FavSport                                                           */
/* ------------------------------------------------------------------ */

const FavSport = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center md:justify-start mt-15">
      <div className="flex w-full max-w-7xl flex-col items-center justify-center rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <div className="w-full pb-6 text-left">
          <h4 className="text-2xl font-bold text-black">Popular Sports</h4>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {sports.map((s) => (
            <SportCard key={s.id} sport={s} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavSport;