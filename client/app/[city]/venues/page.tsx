import Link from "next/link";
import { getVenues } from "@/lib/api";
import { VenueCard } from "@/components/VenueCard";
import { AppNavbar } from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";
import { cityLabel } from "@/lib/geocode";
import { SportsFilterBar } from "@/components/Sportsfilterbar";
import { Input } from "@/components/ui/input";

export default async function CityVenuesPage({
  params,
  searchParams,
}: {
  params: Promise<{ city: string }>;
  searchParams: Promise<{ sport?: string }>;
}) {
  const { city } = await params;
  const { sport } = await searchParams;

  // Same caveat as the games page — not city-filtered on the backend yet.
  const venues = await getVenues({ sport });

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AppNavbar />

      <div className="flex flex-row w-full bg-primary py-4 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 sm:px-6 items-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Venues in {cityLabel(city)}</h1>
          <p className="max-w-xl text-white/85">Courts, turfs, and tables ready to play on.</p>
        </div>
        <div className="mx-auto flex w-full flex-row gap-2 px-2 sm:px-4 items-center justify-center">
          <div>
            <Input
              placeholder="Search venues..."
              className="w-64 h-10 justify-between gap-2 rounded-lg bg-[#78f19080] text-white font-normal text-sm"
            />
          </div>
          <div>
            <SportsFilterBar />
          </div>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6">

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
