import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRocket } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";
import { SPORT_ICONS, SPORT_IMAGES } from "@/lib/sport-meta";
import { formatGameDate, formatGameTimeRange } from "@/lib/format";
import { getGameStatusDisplay, type StatusVariant } from "@/lib/game-status";
import type { GameSession, PlayerSummary } from "@/types";

/* Host first, then joined players, capped at `max` visible + a "+N" bubble */
function AvatarGroup({
  host,
  joined,
  max = 3,
}: {
  host: PlayerSummary;
  joined: PlayerSummary[];
  max?: number;
}) {
  const all = [host, ...joined];
  const visible = all.slice(0, max);
  const remaining = all.length - visible.length;

  return (
    <div className="flex items-center">
      {visible.map((p, i) => (
        <Avatar
          key={p.id}
          style={{ zIndex: visible.length - i }}
          className={`h-8 w-8 border-2 border-white shadow-sm transition-transform duration-300 hover:z-10 hover:scale-110 ${
            i > 0 ? "-ml-3" : ""
          }`}
        >
          <AvatarImage src={p.avatarUrl ?? undefined} alt={p.name} />
          <AvatarFallback className="text-[10px]">{p.name.slice(0, 2).toUpperCase()}</AvatarFallback>
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

function StatusBadge({ variant, text }: { variant: StatusVariant; text: string }) {
  if (variant === "booked") {
    return <span className="rounded-md bg-white px-3 py-1 text-xs font-bold text-primary shadow-sm">{text}</span>;
  }
  if (variant === "cancelled") {
    return (
      <span className="rounded-md bg-red-500/80 px-3 py-1 text-xs font-bold text-white shadow-sm">{text}</span>
    );
  }
  if (variant === "slots") {
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

export function GameCard({ game }: { game: GameSession }) {
  const status = getGameStatusDisplay(game);
  const joinedUsers = game.participants.map((p) => p.user);

  return (
    // The whole card IS the link now — real <a> under the hood, so the URL
    // changes, back/forward works, middle-click opens a new tab, and it's
    // reachable by keyboard/screen readers. Previously this was an onClick
    // handler doing window.location.href, none of which held true.
    <Link
      href={`/games/${game.id}`}
      className="group relative block h-80 w-full overflow-hidden rounded-3xl bg-primary shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(0,0,0,0.16)]"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="pointer-events-none absolute -bottom-4 -left-4 text-7xl text-white/15 transition-all duration-500 group-hover:scale-110 group-hover:text-white/25">
        {SPORT_ICONS[game.sport]}
      </div>

      <div className="pointer-events-none absolute right-2 top-4 h-45 w-50 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3">
        <Image
          src={SPORT_IMAGES[game.sport]}
          alt={game.format}
          width={140}
          height={140}
          className="h-full w-full object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]"
        />
      </div>

      <div className="relative flex h-full w-full flex-col justify-between p-5">
        <div className="flex max-w-[70%] items-center justify-between gap-2">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {game.format}
          </span>
        </div>

        <div className="relative bottom-10 flex w-full flex-col gap-2 pr-16">
          <div className="flex w-full items-center justify-between gap-2">
            <AvatarGroup host={game.host} joined={joinedUsers} />
            <StatusBadge variant={status.variant} text={status.text} />
          </div>
          <div className="flex w-full flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#78F190] px-2 py-1 text-[11px] font-semibold text-primary">
              {game.level}
            </span>
            {game.stateTag && (
              <span className="rounded-md bg-black/60 px-2 py-1 text-[11px] font-semibold text-white">
                {game.stateTag}
              </span>
            )}
          </div>
          <h3 className="relative top-20 text-sm font-medium text-white/90">
            {game.host.name} &middot; {(game.host.hearts ?? 0).toLocaleString()} Hearts
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center gap-1.5 border-t border-white/15 pt-3">
          <span className="text-[16px] font-semibold text-white">
            {formatGameDate(game.startsAt)}, {formatGameTimeRange(game.startsAt, game.endsAt)}
          </span>
          <div className="flex items-center gap-1.5">
            <FaSearchLocation className="shrink-0 text-xl text-white/80" />
            <span className="truncate text-[13px] text-white/80">
              {game.venue?.name ?? "Location to be announced"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
