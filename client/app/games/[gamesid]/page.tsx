/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { FaSearchLocation } from "react-icons/fa";
import { getGameById } from "@/lib/api";
import { SPORT_ICONS, SPORT_LABELS } from "@/lib/sport-meta";
import { formatGameDate, formatGameTimeRange } from "@/lib/format";
import { JoinGameButton } from "@/components/JoinGameButton";

export default async function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const game = await getGameById(id).catch(() => null);
  if (!game) notFound();

  const joinedCount = game.participants.length;
  const spotsLeft = Math.max(game.capacity - joinedCount, 0);
  const players = [game.host, ...game.participants.map((p) => p.user)];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-16 mt-15">
      <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-white shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
        <div className="pointer-events-none absolute -right-6 -top-6 flex h-40 w-40 items-center justify-center text-8xl text-white/10">
          {SPORT_ICONS[game.sport]}
        </div>

        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
          {game.format}
        </span>
        <h1 className="mt-4 text-3xl font-bold">
          {SPORT_LABELS[game.sport]} with {game.host.name}
        </h1>
        <p className="mt-2 text-white/85">{game.level}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span>{formatGameDate(game.startsAt)}</span>
          <span>&middot;</span>
          <span>{formatGameTimeRange(game.startsAt, game.endsAt)}</span>
        </div>
        {game.venue && (
          <div className="mt-2 flex items-center gap-2 text-sm text-white/85">
            <FaSearchLocation />
            {game.venue.name} — {game.venue.address}
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <h2 className="text-lg font-bold text-gray-800">
            Who&apos;s playing ({joinedCount + 1}/{game.capacity})
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            {players.map((player, i) => (
              <div key={player.id} className="flex items-center gap-3">
                <img
                  src={player.avatarUrl ?? "/default-avatar.png"}
                  alt={player.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="font-medium text-gray-800">{player.name}</span>
                {i === 0 && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    Host
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div>
            <p className="text-sm text-gray-500">Spots left</p>
            <p className="text-2xl font-bold text-gray-800">
              {spotsLeft} / {game.capacity}
            </p>
          </div>
          <JoinGameButton gameId={game.id} isFull={game.status !== "open"} />
        </div>
      </div>
    </div>
  );
}
