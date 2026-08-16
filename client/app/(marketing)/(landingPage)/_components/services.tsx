import { getGames, getVenues } from "@/lib/api";
import { GameCard } from "@/components/GameCard";
import { VenueCard } from "@/components/VenueCard";
import { CarouselRow } from "@/components/CarouselRow";
import { SectionHeader } from "@/components/SectionHeader";

// No "use client" here on purpose — this can be a Server Component now that
// GameCard/VenueCard navigate via <Link> instead of an onClick handler.
// Only CarouselRow (which needs useRef for the scroll buttons) is a Client
// Component; Server Components are allowed to render Client Components as
// children, so this composition is fine.
const Services = async () => {
  // Fetched in parallel — no reason to wait for games before starting the
  // venues request.
  const [games, venues] = await Promise.all([getGames(), getVenues()]);

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-12 rounded-xl py-10 mt-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <div className="flex w-full flex-col items-center gap-4">
        <SectionHeader title="Discover Games" href="/games" label="See All Games" />
        {games.length === 0 ? (
          <p className="text-sm text-gray-500">No open games right now — be the first to host one.</p>
        ) : (
          <CarouselRow>
            {games.map((g) => (
              <div key={g.id} className="w-130 flex-none snap-start">
                <GameCard game={g} />
              </div>
            ))}
          </CarouselRow>
        )}
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        <SectionHeader title="Book Venues" href="/venues" label="See All Venues" />
        {venues.length === 0 ? (
          <p className="text-sm text-gray-500">No venues listed yet.</p>
        ) : (
          <CarouselRow>
            {venues.map((v) => (
              <div key={v.id} className="w-130 flex-none snap-start">
                <VenueCard venue={v} />
              </div>
            ))}
          </CarouselRow>
        )}
      </div>
    </div>
  );
};

export default Services;
