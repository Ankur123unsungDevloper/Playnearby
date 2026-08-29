import Link from "next/link";
import { getVenues } from "@/lib/api";
import { VenueCard } from "@/components/VenueCard";
import { AppNavbar } from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";
import { SPORT_LABELS } from "@/lib/sport-meta";
import type { SportKey } from "@/types";

export default async function VenuesPage({
  searchParams,
}: {
  searchParams: Promise<{ sport?: string }>;
}) {
  const { sport } = await searchParams;
  const venues = await getVenues({ sport });

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AppNavbar />

      <div className="w-full bg-primary py-14 text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 sm:px-6">
          <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-sm">
            {venues.length} venue{venues.length === 1 ? "" : "s"} listed
          </span>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Book a Venue Near You</h1>
          <p className="max-w-xl text-white/85">Courts, turfs, and tables ready to play on.</p>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/venues"
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              !sport ? "bg-primary text-white" : "bg-white text-gray-600 shadow-sm hover:bg-gray-100"
            }`}
          >
            All Sports
          </Link>
          {(Object.entries(SPORT_LABELS) as [SportKey, string][]).map(([key, label]) => (
            <Link
              key={key}
              href={`/venues?sport=${key}`}
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
            {sport ? SPORT_LABELS[sport as SportKey] : "All"} Venues
          </h2>
          <Link
            href="/venues/create"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform duration-300 hover:scale-[1.02]"
          >
            + Add Venue
          </Link>
        </div>

        {venues.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-white py-20 text-center shadow-sm">
            <p className="text-gray-500">No venues listed yet.</p>
            <Link href="/venues/create" className="font-bold text-primary underline underline-offset-2">
              Add the first one
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </main>

      <AppFooter />
    </div>
  );
}
