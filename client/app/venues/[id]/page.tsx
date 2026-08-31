import Link from "next/link";
import { notFound } from "next/navigation";

import {
  MdStar,
} from "react-icons/md";
import { BiShareAlt } from "react-icons/bi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

import {
  getVenueById,
  getGames
} from "@/lib/api";

import { GameCard } from "@/components/GameCard";
import { AppNavbar } from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";
import { VenueGallery } from "@/components/VenueGallery";

import {
  SPORT_ICONS,
  SPORT_LABELS
} from "@/lib/sport-meta";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";


export default async function VenueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const venue = await getVenueById(id).catch(() => null);
  if (!venue) notFound();

  // ?venueId= query param on GET /api/games if the games table grows large.
  const allGames = await getGames().catch(() => []);
  const gamesHere = allGames.filter((g) => g.venue?.id === venue.id);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AppNavbar />

      <div>
        <main className="flex justify-center mx-4 lg:mx-20">
          <div className="grid grid-cols-1 w-full justify-items-center">
            <div className="w-full col-span-1 pb-10 px-2 md:px-0">
              <div className="mt-6">
                <Breadcrumb className="ml-5 cursor-pointer">
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
                      <BreadcrumbPage>{venue.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="w-full mt-8">
                <div className="flex flex-col justify-between w-full">
                  <div className="grid w-full md:h-24 grid-flow-row-dense grid-cols-3 grid-rows-2 gap-y-1 md:gap-y-0 md:gap-x-5">
                    <div className="w-full relative text-wrap col-span-3">
                      <h1 className="md:font-bold md:text-[32px] md:leading-9 font-bold text-[24px] leading-9  text-typography md:whitespace-nowrap whitespace-normal md:line-clamp-1 line-clamp-2">
                        {venue.name}
                      </h1>
                    </div>
                    <div className="flex items-center w-full col-span-3 md:col-span-2">
                      <div className="flex flex-col w-full sm:items-center sm:justify-start sm:flex-row">
                        <div className="text-[#515455] font-medium text-md"></div>
                        <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-green-100 px-3 py-1.5 mt-2 md:mt-0 sm:ml-2 sm:mr-8 text-sm font-semibold text-green-700">
                          <MdStar className="text-base" />
                          {venue.rating.toFixed(2)}
                          <span className="text-green-700/70">({venue.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full col-span-3  mt-3 space-x-2 md:mt-0 sm:col-span-2 md:col-span-1">
                      <div className="flex flex-col items-center justify-start w-full space-y-3">
                        <div className="w-full">
                          <div>
                            <Button className="w-full h-12 px-3 py-2 font-semibold text-white border_radius bg-primary">
                              Book Now
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-row items-center w-full gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 flex items-center justify-center h-12 gap-2 px-3 font-semibold text-black border-2 cursor-pointer hover:bg-surface border_radius border_container"
                          >
                            <BiShareAlt />
                            <span>Share</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="flex-1 h-12 px-3 py-2 font-semibold text-sm md:text-md border-primary border text-primary rounded-md bg-white"
                          >
                            Bulk/corporate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid w-full grid-cols-1 gap-2 mt-6 md:gap-x-5 md:grid-cols-3">
                  <VenueGallery venueName={venue.name} />
                  <div className="w-full border_radius z-0 md:row-span-2 md:mt-14">
                    <div className="flex flex-col">
                      <div className="flex flex-col p-4 border border_radius border-primary">
                        <h2 className="font-semibold text-md md:text-lg">
                          Timing
                        </h2>
                        <div className="mt-2 leading-1">
                          Open 9:00 AM - 10:00 PM
                        </div>
                      </div>
                      <div className="flex flex-col h-auto p-4 mt-5 border border_radius border-primary">
                        <div className="font-semibold text-md md:text-lg">
                          Location
                        </div>

                        <h2 className="flex items-center gap-1">
                          {venue.address}
                        </h2>

                        <div className="w-full mt-3 overflow-hidden rounded-md">
                          <iframe
                            src={`https://www.google.com/maps?q=${encodeURIComponent(
                              venue.address
                            )}&output=embed`}
                            width="100%"
                            height="250"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Venue Location"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full border_radius md:row-span-5 md:col-span-2">
                    <div className="p-6 mt-4 border border_radius border-primary">
                      <div className="flex flex-col justify-start md:items-center md:flex-row">
                        <h2 className="font-semibold text-md md:text-lg">
                          Sports Available
                        </h2>
                      </div>
                      <div className="grid items-center w-full grid-cols-3 gap-5 mt-5 sm:gap-6 sm:grid-cols-5 lg:gap-6 xl:grid-cols-7 border_container">
                        <div className="flex flex-row gap-2">
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
                    </div>
                    <div className="flex flex-col mt-5 md:mt-5">
                      <div className="p-6 border border_radius border-primary">
                        <h3 className="text-lg font-bold text-gray-800">Amenities</h3>
                        <div className="grid grid-cols-2 gap-2 mt-5 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
                          <IoCheckmarkCircleSharp className="text-primary h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col items-start w-full mt-5">
                        <div className="w-full p-5 border border_radius border-primary">
                          <div className="font-semibold text-shadow-md">About Venue</div>
                          {/* <h3>{venue.description}</h3> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start pb-5 mt-5">
                      <div className="w-full p-5 border border_radius border-primary">
                        <h3 className="font-semibold text-md">
                          Related To {venue.name} | {venue.address}
                        </h3>
                        <div className="flex items-center justify-start mt-5 text-sm md:text-md line-clamp-7">
                          <div>
                            <span className="related_links leading-6">
                              <Link href="/venues" className="hover:text-primary">
                                View all venues in Mumbai
                              </Link>
                              <Link href="/venues" className="hover:text-primary">
                                View all venues in Mumbai
                              </Link>
                              <Link href="/venues" className="hover:text-primary">
                                View all venues in Mumbai
                              </Link>
                              <Link href="/venues" className="hover:text-primary">
                                View all venues in Mumbai
                              </Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Upcoming games here ({gamesHere.length})
                </h2>
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
        </main>
      </div>

      <AppFooter />
    </div>
  );
}