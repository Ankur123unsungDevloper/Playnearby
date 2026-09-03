import Link from "next/link";
import { notFound } from "next/navigation";

import { MdStar } from "react-icons/md";
import { BiShareAlt } from "react-icons/bi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

import { getVenueById, getGames } from "@/lib/api";

import { GameCard } from "@/components/GameCard";
import { AppNavbar } from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";
import { VenueGallery } from "@/components/VenueGallery";

import { SPORT_ICONS, SPORT_LABELS } from "@/lib/sport-meta";
import { cn } from "@/lib/utils";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

// Shared card style so Timing / Location / Sports / Amenities / About /
// Related all read as one consistent family instead of six separately
// styled boxes — neutral border, primary color reserved for accents
// (headers, icons, badges) rather than outlining every single box in green.
const CARD = "rounded-2xl border-2 bg-white p-5 shadow-sm";

export default async function VenueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const venue = await getVenueById(id).catch(() => null);
  if (!venue) notFound();

  // TODO: swap for a `?venueId=` query param on GET /api/games once the
  // games table grows large enough that filtering client-side isn't cheap.
  const allGames = await getGames().catch(() => []);
  const gamesHere = allGames.filter((g) => g.venue?.id === venue.id);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AppNavbar />

      <main className="flex flex-col justify-center mx-4 lg:mx-20">
        <div className="grid w-full grid-cols-1  justify-items-center">
          <div className="w-full col-span-1 pb-10 px-2 md:px-0">
            <Breadcrumb className="mt-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/venues">Mumbai</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">{venue.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="w-full mt-8">
              <div className="flex flex-col justify-between w-full">
                <div className="grid w-full md:h-24 grid-flow-row-dense grid-cols-3 grid-rows-2 gap-y-1 md:gap-y-0 md:gap-x-5 ">
                  <div className="w-full relative text-wrap col-span-3">
                    <h1 className="md:font-bold md:text-[32px] md:leading-9 font-bold text-[24px] leading-9  text-typography md:whitespace-nowrap whitespace-normal md:line-clamp-1 line-clamp-2">
                      {venue.name}
                    </h1>
                  </div>
                  <div className="flex items-center w-full col-span-3 md:col-span-2">
                    <div className="flex flex-col w-full sm:items-center sm:justify-start sm:flex-row gap-x-2">
                      <div className=" text-[#515455] font-medium text-md ">
                        location
                      </div>
                      <div className="flex w-fit items-center gap-1.5 rounded-sm bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700">
                        <MdStar className="text-base" />
                        {venue.rating.toFixed(2)}
                        <span className="text-green-700/70">
                          ({venue.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row w-full col-span-3 mt-3 space-x-2 md:mt-0 sm:col-span-2 md:col-span-1">
                    <div className="flex flex-col items-center justify-start w-full space-y-3">
                      <div className="flex w-full flex-col gap-2 md:w-64 md:shrink-0">
                        <Button className="h-12 w-full bg-primary font-semibold text-white hover:bg-primary/90">
                          Book Now
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            className="flex h-11 flex-1 items-center justify-center gap-2 border-2 font-semibold text-gray-700 hover:bg-gray-50"
                          >
                            <BiShareAlt />
                            Share
                          </Button>
                          <Button
                            variant="outline"
                            className="h-11 flex-1 border-2 border-primary font-semibold text-primary hover:text-primary/50 hover:bg-primary/5"
                          >
                            Bulk / Corporate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid w-full grid-cols-1 gap-2 mt-6 md:gap-x-5 md:grid-cols-3">
                <div className="hidden w-full row-span-1 bg-opacity-50 border_radius backdrop-blur-lg bg-surface md:block md:col-span-2">
                  <div className="overflow-hidden aspect-video rounded-md w-full">
                    <VenueGallery venueName={venue.name} />
                  </div>
                </div>
                <div className="w-full border_radius z-0 md:row-span-2 md:mt-14">
                  <div className="flex flex-col">
                    <div className={cn(CARD, "border-primary")}>
                      <h2 className="text-base font-bold text-gray-900">Timing</h2>
                      <p className="mt-1 text-sm text-gray-600">
                        Open 9:00 AM – 10:00 PM
                      </p>
                    </div>

                    <div className={cn(CARD, "mt-5 border-primary")}>
                      <h2 className="text-base font-bold text-gray-900">Location</h2>
                      <p className="mt-1 text-sm text-gray-600">
                        {venue.address}
                      </p>

                      <div className="mt-3 overflow-hidden rounded-xl">
                        <iframe
                          src={`https://www.google.com/maps?q=${encodeURIComponent(
                            venue.address
                          )}&output=embed`}
                          width="100%"
                          height="220"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Venue Location"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full border_radius md:row-span-5 md:col-span-2">
                  <div className={CARD}>
                    <h2 className="text-base font-bold text-gray-900">Sports Available</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {venue.sports.map((sport) => (
                        <span
                          key={sport}
                          className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary"
                        >
                          {SPORT_ICONS[sport]}
                          {SPORT_LABELS[sport]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={cn(CARD, "mt-5")}>
                    <h2 className="text-base font-bold text-gray-900">Amenities</h2>
                    <div className="mt-4 grid grid-cols-2 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <IoCheckmarkCircleSharp className="h-4 w-4 shrink-0 text-primary" />
                        {/* Amenity list not wired up yet — placeholder row kept from your version */}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className={cn(CARD, "mt-5")}>
                      <h2 className="text-base font-bold text-gray-900">About Venue</h2>
                      {/* <p className="mt-2 text-sm text-gray-600">{venue.description}</p> */}
                    </div>
                    <div className={cn(CARD, "mt-5")}>
                      <h2 className="text-base font-bold text-gray-900">
                        Related to {venue.name} · {venue.address}
                      </h2>
                      <div className="mt-3 flex flex-col gap-2 text-sm">
                        <Link href="/venues" className="text-gray-600 transition-colors hover:text-primary">
                          View all venues in Mumbai
                        </Link>
                        <Link href="/venues" className="text-gray-600 transition-colors hover:text-primary">
                          Similar venues nearby
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="md:hidden"></div> */}
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-10">
              <h2 className="text-lg font-bold text-gray-800">Upcoming games here ({gamesHere.length})</h2>
              {gamesHere.length === 0 ? (
                <div className="rounded-3xl bg-white p-10 text-center text-gray-500 shadow-sm">
                  No open games at this venue yet.{" "}
                  <Link href="/games/create" className="font-bold text-primary underline underline-offset-2">
                    Host one here
                  </Link>
                  .
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {gamesHere.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gallery + sidebar (timing, location) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="md:col-span-2">
          </div>

          <div className="flex flex-col gap-5">

            
          </div>
        </div>

        {/* Sports, amenities, about, related — one consistent column */}
        <div className="flex flex-col gap-5">



        </div>

        {/* Upcoming games */}
      </main>

      <AppFooter />
    </div>
  );
}