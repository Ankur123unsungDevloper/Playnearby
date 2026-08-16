import { getGames } from "@/lib/api";
import { GameCard } from "@/components/GameCard";

export default async function GamesPage() {
  const games = await getGames();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-16 mt-15">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">All Games</h1>
        <p className="mt-1 text-gray-500">Open games near you, sorted by when they start.</p>
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
