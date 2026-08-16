import { getVenues } from "@/lib/api";
import { VenueCard } from "@/components/VenueCard";

export default async function VenuesPage() {
  const venues = await getVenues();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-16 mt-15">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">All Venues</h1>
        <p className="mt-1 text-gray-500">Find a court, turf, or table near you and book a slot.</p>
      </div>

      {venues.length === 0 ? (
        <p className="text-gray-500">No venues listed yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
}
