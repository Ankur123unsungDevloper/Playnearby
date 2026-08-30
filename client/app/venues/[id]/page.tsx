import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MdArrowBack, MdStar, MdOutlineLocationOn } from "react-icons/md";
import { getVenueById, getGames } from "@/lib/api";
import { GameCard } from "@/components/GameCard";
import { AppNavbar } from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";
import { SPORT_ICONS, SPORT_LABELS } from "@/lib/sport-meta";

export default async function VenueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const venue = await getVenueById(id).catch(() => null);
  if (!venue) notFound();

  // No dedicated "games at this venue" endpoint yet — filtering the full
  // list here is fine at this project's scale; revisit with a
  // ?venueId= query param on GET /api/games if the games table grows large.
  const allGames = await getGames().catch(() => []);
  const gamesHere = allGames.filter((g) => g.venue?.id === venue.id);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AppNavbar />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6">
        <Link
          href="/venues"
          className="flex w-fit items-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-primary"
        >
          <MdArrowBack /> Back to all venues
        </Link>

        <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-gray-200">
          <Image
            src={venue.images[0] ?? "/venues/placeholder.jpg"}
            alt={venue.name}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
          {venue.featured && (
            <div className="absolute bottom-4 right-4 rounded-xl bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              FEATURED
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-800">{venue.name}</h1>
            <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700">
              <MdStar className="text-base" />
              {venue.rating.toFixed(2)}
              <span className="text-green-700/70">({venue.reviewCount} reviews)</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <MdOutlineLocationOn />
            {venue.address}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
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

        {/* Booking isn't wired up yet — flagged honestly, not faked */}
        <div className="rounded-3xl bg-primary/10 p-6">
          <h2 className="text-lg font-bold text-gray-800">Want to book this venue?</h2>
          <p className="mt-1 text-sm text-gray-600">
            Online booking is coming soon. For now, reach out directly to check availability.
          </p>
          <button
            disabled
            className="mt-4 cursor-not-allowed rounded-full bg-primary/50 px-6 py-3 text-sm font-bold text-white"
          >
            Book This Venue (Coming Soon)
          </button>
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
      </main>

      <AppFooter />
    </div>
  );
}
