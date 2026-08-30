import Link from "next/link";
import { getGames } from "@/lib/api";
import { GameCard } from "@/components/GameCard";
import { AppNavbar } from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";
import { SPORT_LABELS } from "@/lib/sport-meta";
import type { SportKey } from "@/types";

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<{ sport?: string }>;
}) {
  const { sport } = await searchParams;
  const games = await getGames({ sport });

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AppNavbar />

      <div className="w-full bg-primary py-14 text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 sm:px-6">
          <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-sm">
            {games.length} open game{games.length === 1 ? "" : "s"}
          </span>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Find a Game to Join</h1>
          <p className="max-w-xl text-white/85">Pick a sport, pick a time, show up and play.</p>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/games"
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              !sport ? "bg-primary text-white" : "bg-white text-gray-600 shadow-sm hover:bg-gray-100"
            }`}
          >
            All Sports
          </Link>
          {(Object.entries(SPORT_LABELS) as [SportKey, string][]).map(([key, label]) => (
            <Link
              key={key}
              href={`/games?sport=${key}`}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                sport === key ? "bg-primary text-white" : "bg-white text-gray-600 shadow-sm hover:bg-gray-100"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            {sport ? SPORT_LABELS[sport as SportKey] : "All"} Games
          </h2>
          <Link
            href="/games/create"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform duration-300 hover:scale-[1.02]"
          >
            + Host a Game
          </Link>
        </div>

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