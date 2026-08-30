import Link from "next/link";
import { notFound } from "next/navigation";
import { MdArrowBack, MdOutlineLocationOn, MdOutlineCalendarToday } from "react-icons/md";
import { getGameById } from "@/lib/api";
import { AppNavbar } from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";
import { SPORT_ICONS, SPORT_LABELS } from "@/lib/sport-meta";
import { formatGameDate, formatGameTimeRange } from "@/lib/format";
import { JoinGameButton } from "@/components/JoinGameButton";

export default async function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const game = await getGameById(id).catch(() => null);
  if (!game) notFound();

  const joinedCount = game.participants.length;
  const spotsLeft = Math.max(game.capacity - joinedCount - 1, 0); // -1 for the host, who always has a spot
  const players = [game.host, ...game.participants.map((p) => p.user)];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AppNavbar />

      <div className="w-full bg-primary py-14 text-white">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4 sm:px-6">
          <Link
            href="/games"
            className="flex w-fit items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            <MdArrowBack /> Back to all games
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur-sm">
              {SPORT_ICONS[game.sport]}
            </div>
            <div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                {game.format}
              </span>
              <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                {SPORT_LABELS[game.sport]} with {game.host.name}
              </h1>
            </div>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/90">
            <span className="flex items-center gap-1.5">
              <MdOutlineCalendarToday />
              {formatGameDate(game.startsAt)}, {formatGameTimeRange(game.startsAt, game.endsAt)}
            </span>
            {game.venue && (
              <span className="flex items-center gap-1.5">
                <MdOutlineLocationOn />
                <Link href={`/venues/${game.venue.id}`} className="underline underline-offset-2 hover:text-white">
                  {game.venue.name}
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto grid w-full max-w-4xl flex-1 gap-6 px-4 py-10 sm:px-6 md:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">
              Who&apos;s playing ({players.length}/{game.capacity})
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {players.map((player, i) => (
                // eslint-disable-next-line @next/next/no-img-element
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

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">Details</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-400">Skill level</dt>
                <dd className="font-semibold text-gray-800">{game.level}</dd>
              </div>
              <div>
                <dt className="text-gray-400">Format</dt>
                <dd className="font-semibold text-gray-800">{game.format}</dd>
              </div>
              {game.stateTag && (
                <div>
                  <dt className="text-gray-400">Region</dt>
                  <dd className="font-semibold text-gray-800">{game.stateTag}</dd>
                </div>
              )}
              <div>
                <dt className="text-gray-400">Status</dt>
                <dd className="font-semibold capitalize text-gray-800">{game.status}</dd>
              </div>
            </dl>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="sticky top-20 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm text-gray-500">Spots left</p>
              <p className="text-2xl font-bold text-gray-800">
                {spotsLeft} / {game.capacity - 1}
              </p>
            </div>
            <JoinGameButton gameId={game.id} isFull={game.status !== "open"} />

            {game.venue && (
              <Link
                href={`/venues/${game.venue.id}`}
                className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3 transition-colors hover:bg-gray-100"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg text-primary">
                  <MdOutlineLocationOn />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-800">{game.venue.name}</p>
                  <p className="truncate text-xs text-gray-500">{game.venue.address}</p>
                </div>
              </Link>
            )}
          </div>
        </aside>
      </main>

      <AppFooter />
    </div>
  );
}
