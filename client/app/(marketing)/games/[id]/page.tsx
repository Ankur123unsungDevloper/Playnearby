import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { FaRegClock } from "react-icons/fa";
import { TfiLocationPin } from "react-icons/tfi";
import { FaLocationArrow, FaArrowRight } from "react-icons/fa";

import { getGameById, getGames, getVenues } from "@/lib/api";
import { formatGameDate, formatGameTimeRange } from "@/lib/format";
import { SPORT_LABELS } from "@/lib/sport-meta";

import { JoinGameButton } from "@/components/JoinGameButton";
import { SectionHeader } from "@/components/SectionHeader";
import { CarouselRow } from "@/components/CarouselRow";
import { GameCard } from "@/components/GameCard";
import { SendQueryDialog } from "@/components/SendQueryDialog";

import {
  Avatar,
  AvatarImage
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

export default async function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const game = await getGameById(id).catch(() => null);
  if (!game) notFound();

  const joinedCount = game.participants.length;
  const spotsLeft = Math.max(game.capacity - joinedCount - 1, 0); // -1 for the host, who always has a spot
  const players = [game.host, ...game.participants.map((p) => p.user)];

  const [games, venues] = await Promise.all([getGames(), getVenues()]);
  const venuesNearby = venues.filter((v) => v.sports.includes(game.sport)).slice(0, 3);

  return (
    <div className="bg-surface print:hidden pb-40 text-main box-border mt-15">
      <main className="flex flex-col">
        <div className="max-w-page p-4 md:px-0 md:mx-12 md:pt-6 xxl:w-[1440px] xxl:px-0 xl:mx-12 xxl:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[auto_360px] gap-x-6 w-full relative">
            <div className="flex flex-col space-y-6 min-w-[320px] overflow-hidden mb-6">
              <section className="bg-white rounded-3xl overflow-hidden p-6 border-2 shadow-sm">
                <div className="border p-6 rounded-2xl">
                  {players.map((player) => (
                    <div key={player.id}>
                      <Image
                        width={84}
                        height={84}
                        src={player.avatarUrl ?? "/default-avatar.png"}
                        alt={game.host.name}
                        className="aspect-square float-right rounded-full overflow-hidden object-cover"
                      />
                    </div>
                  ))}
                  <h1 className="font-bold text-2xl">
                    {SPORT_LABELS[game.sport]}
                  </h1>
                  <p className="mt-2 text-mute_text">
                    Hosted by {game.host.name} 
                  </p>
                  <div className="mt-8 flex gap-x-4 items-start">
                    <FaRegClock
                      className="w-6 h-6 aspect-square object-contain m-1"
                    />
                    <div className="space-y-2">
                      <h2 className="font-bold text-xl">
                        {formatGameDate(game.startsAt)}
                      </h2>
                      <p>
                        {formatGameTimeRange(game.startsAt, game.endsAt)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-x-4 items-start md:w-4/5">
                    <TfiLocationPin
                      className="w-6 h-6 aspect-square object-contain m-1"
                    />
                    <div className="space-y-4">
                      {game.venue && (
                        <p>
                          {game.venue.address}
                        </p>
                      )}
                      <Button
                        variant="outline"
                        className="w-45 h-15 border border-main rounded-xl text-lg flex items-center gap-x-2 px-4 py-3 cursor-pointer uppercase font-bold">
                        Show in Map
                        <FaLocationArrow className="w-26 h-26" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="py-6">
                  <Tabs defaultValue="gameInstructions" className="flex gap-x-13 border-b mb-8">
                    <TabsList variant="line" className="w-1/2 h-full text-lg mb-10">
                      <TabsTrigger
                        value="gameInstructions"
                        className="text-xl font-semibold"
                      >
                        Game Instructions
                      </TabsTrigger>
                      <TabsTrigger
                        value="queries"
                        className="text-xl font-semibold"
                      >
                        Queries
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="gameInstructions">Make changes to your gameInstructions here.</TabsContent>
                    <TabsContent value="queries">Change your queries here.</TabsContent>
                  </Tabs>
                  <div className="pt-6 border-t mt-6 md:flex gap-x-6">
                    <h3 className="font-bold md:max-w-46 mb-6 md:mb-0 text-xl">
                      Personal Message from {game.host.name}
                    </h3>
                    <span>
                      message
                    </span>
                  </div>
                </div>
              </section>
              <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-12 rounded-xl py-10 mt-10 border-2 bg-white p-5 shadow-sm">
                <div className="flex w-full flex-col items-center gap-4">
                  <SectionHeader title="Similar Games" href="/games" label="See All Games" />
                  {games.length === 0 ? (
                    <p className="text-sm text-gray-500">No open games right now — be the first to host one.</p>
                  ) : (
                    <CarouselRow>
                      {games.map((g) => (
                        <div key={g.id} className="w-100 flex-none snap-start">
                          <GameCard game={g} />
                        </div>
                      ))}
                    </CarouselRow>
                  )}
                </div>
              </div>  
            </div>
            <div className="flex flex-col space-y-6 md:max-w-90 w-full mb-6 md:sticky top-25 h-fit">
              <div className="w-full rounded-3xl bg-white p-6 space-y-6 max-h-96 overflow-auto no-scrollbar border-2 shadow-sm">
                <p className="text-lg font-bold text-gray-800">
                  Playing ({players.length}/{game.capacity})
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {players.map((player, i) => (
                    <Avatar key={player.id} className="flex items-center gap-3">
                      <AvatarImage
                        src={player.avatarUrl ?? "/default-avatar.png"}
                        alt={game.host.name}
                        className="rounded-full object-cover"
                      />
                      <div className="flex flex-col space-y-1">
                        <span className="font-medium text-gray-800">{game.host.name}</span>
                        {i === 0 && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                            Host
                          </span>
                        )}
                      </div>
                    </Avatar>
                  ))}
                </div>
              </div>
              <div className="w-full rounded-3xl bg-white p-6 space-y-6 max-h-96 overflow-auto no-scrollbar border-2 shadow-sm">
                  <div>
                    <p className="text-sm text-gray-500">Spots left</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {spotsLeft} / {game.capacity - 1}
                    </p>
                  </div>
                <JoinGameButton gameId={game.id} isFull={game.status !== "open"} />
                <SendQueryDialog />
              </div>
              <div className="w-full rounded-3xl bg-white p-6 space-y-6 max-h-96 overflow-auto no-scrollbar border-2 shadow-sm">
                <p className="text-base font-bold text-gray-800">
                  {SPORT_LABELS[game.sport]} Venues Nearby
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {venuesNearby.length === 0 ? (
                    <p className="text-sm text-gray-500">No other venues for this sport yet.</p>
                      ) : (
                        venuesNearby.map((venue) => (
                      <Link
                        key={venue.id}
                        href={`/venues/${venue.id}`}
                        className="flex items-center gap-3 rounded-2xl p-2 transition-colors bg-green-100 hover:bg-gray-50"
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                          <Image
                            src={venue.images[0] ?? "/venues/placeholder.jpg"}
                            alt={venue.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-green-700">{venue.name}</p>
                          <p className="truncate text-xs text-green-700/70">{venue.address}</p>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="uppercase flex items-center justify-center gap-x-2 font-bold border w-full h-10 py-3 rounded-lg shadow-[0_4px_0_0_#D6DCD9] active:shadow-none active:translate-y-1"
                >
                  <Link href="/venues" className="uppercase flex items-center justify-center gap-x-2 font-bold">
                    See All Venues <FaArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
