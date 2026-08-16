import Image from "next/image";
import { notFound } from "next/navigation";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { getVenueById } from "@/lib/api";
import { SPORT_ICONS, SPORT_LABELS } from "@/lib/sport-meta";

export default async function VenueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const venue = await getVenueById(id).catch(() => null);
  if (!venue) notFound();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-16 mt-15">
      <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-gray-100">
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
            <FaStar className="text-xs" />
            {venue.rating.toFixed(2)}
            <span className="text-green-700/70">({venue.reviewCount} reviews)</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <FaLocationDot />
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

      {/* Booking isn't wired up yet — see server/README.md's "not built yet" list */}
      <div className="rounded-3xl bg-[#78F190]/20 p-6">
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
    </div>
  );
}
