import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { SPORT_ICONS } from "@/lib/sport-meta";
import type { Venue } from "@/types";

export function VenueCard({ venue }: { venue: Venue }) {
  const visibleSports = venue.sports.slice(0, 3);
  const extraSports = venue.sports.length - visibleSports.length;
  const image = venue.images[0] ?? "/venues/placeholder.jpg";

  return (
    <Link
      href={`/venues/${venue.id}`}
      className="group relative block h-70 w-full overflow-hidden rounded-3xl bg-primary shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(0,0,0,0.16)]"
    >
      <div className="flex h-full w-full flex-col p-3">
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={venue.name}
            width={400}
            height={220}
            className="h-40 w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Sport icon chips — games playable at this venue */}
          <div className="absolute left-2 top-30 flex items-center">
            {visibleSports.map((sport, i) => (
              <div
                key={sport}
                style={{ zIndex: visibleSports.length - i }}
                className={`flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-black/60 text-sm text-white backdrop-blur-sm ${
                  i > 0 ? "-ml-2" : ""
                }`}
              >
                {SPORT_ICONS[sport]}
              </div>
            ))}
            {extraSports > 0 && (
              <div className="-ml-2 flex h-7 items-center justify-center rounded-full border border-white/40 bg-black/60 px-2 text-[11px] font-semibold text-white backdrop-blur-sm">
                +{extraSports} more
              </div>
            )}
          </div>

          {venue.featured && (
            <div className="absolute bottom-3 right-3 rounded-xl bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              FEATURED
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-lg font-bold text-white">{venue.name}</h3>
            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
              {venue.rating.toFixed(2)} <span className="text-green-700/70">({venue.reviewCount})</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <FaLocationDot className="shrink-0 text-xs text-white/80" />
            <span className="truncate text-[13px] text-white/80">{venue.address}</span>
            {venue.distanceKm !== undefined && (
              <span className="shrink-0 text-xs font-medium text-white">
                (~{venue.distanceKm.toFixed(2)} Kms)
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
