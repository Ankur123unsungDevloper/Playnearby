import Link from "next/link";

import { getGames } from "@/lib/api";
import { cityLabel } from "@/lib/geocode";

import { GameCard } from "@/components/GameCard";
import { AppNavbar } from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";


export default async function CityGamesPage({
  params,
  searchParams,
}: {
  params: Promise<{ city: string }>;
  searchParams: Promise<{ sport?: string }>;
}) {
  const { city } = await params;
  const { sport } = await searchParams;

  // NOTE: not actually filtered by city yet — Venue/GameSession don't have
  // a `city` field in the backend, so this shows all games regardless of
  // the detected city. The header below is honest about the city context;
  // real filtering needs that schema addition as a next step.
  const games = await getGames({ sport });

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AppNavbar />

      <div className="w-full flex flex-row bg-primary py-4 text-white">
        <div className="flex w-full max-w-7xl items-center justify-center gap-4 px-4 sm:px-6">
          <div className="flex w-full flex-col gap-2 px-4 sm:px-6 items-center justify-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl">Games in {cityLabel(city)}</h1>
            <p className="max-w-xl text-white/85">Pick a sport, pick a time, show up and play.</p>
          </div>
          <div className="flex w-full flex-row gap-2 px-2 sm:px-4 items-center justify-end">
            <Link
              href="/games/create"
              className="rounded-xl w-40 h-10 items-center justify-center bg-[#78f19080] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform duration-300 hover:scale-[1.02]"
            >
              + Host a Game
            </Link>
          </div>
        </div>
        
      </div>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6">
        {games.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-white py-20 text-center shadow-sm">
            <p className="text-gray-500">No open games right now — be the first to host one.</p>
            <Link href="/games/create" className="font-bold text-primary underline underline-offset-2">
              Host a Game
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </main>

      <AppFooter />
    </div>
  );
}
