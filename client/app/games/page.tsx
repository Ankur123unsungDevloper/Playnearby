import Link from "next/link";
import { getGames } from "@/lib/api";
import { GameCard } from "@/components/GameCard";

export default async function GamesPage() {
  const games = await getGames();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-16 mt-15">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Games</h1>
          <p className="mt-1 text-gray-500">Open games near you, sorted by when they start.</p>
        </div>
        <Link
          href="/games/create"
          className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-transform duration-300 hover:scale-[1.02]"
        >
          + Host a Game
        </Link>
      </div>

      {games.length === 0 ? (
        <p className="text-gray-500">No open games right now — be the first to host one.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}