"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FaChessKnight } from "react-icons/fa6";
import { GiSoccerBall, GiCricketBat, GiShuttlecock } from "react-icons/gi";
import { MdPool, MdMyLocation } from "react-icons/md";
import { TbDisc } from "react-icons/tb";

/* ------------------------------------------------------------------ */
/*  Types — this is the shape your API / DB should return.            */
/*  Nothing sport-specific is hardcoded beyond the icon lookup below,  */
/*  so adding a new sport later is a one-line change.                 */
/* ------------------------------------------------------------------ */

type SportKey = "football" | "cricket" | "badminton" | "chess" | "carrom" | "swimming";

type VenueRecord = {
  id: string;
  name: string;
  sport: SportKey;
  latitude: number;
  longitude: number;
  goingCount: number;
  href: string;
};

// Same record, plus the on-screen position we derive from real coordinates.
type MapPin = VenueRecord & {
  distanceKm: number;
  top: number;
  left: number;
};

const SPORT_ICONS: Record<SportKey, React.ReactNode> = {
  football: <GiSoccerBall />,
  cricket: <GiCricketBat />,
  badminton: <GiShuttlecock />,
  chess: <FaChessKnight />,
  carrom: <TbDisc />,
  swimming: <MdPool />,
};

const SPORT_LABELS: Record<SportKey, string> = {
  football: "Football",
  cricket: "Cricket",
  badminton: "Badminton",
  chess: "Chess",
  carrom: "Carrom",
  swimming: "Swimming",
};

// Used only if the browser has no location for us — center of Vile Parle, Mumbai.
const FALLBACK_LOCATION = { latitude: 19.1075, longitude: 72.8263 };

// How many real-world km the map card's radius represents. Venues further
// than this still show, clamped to the edge, so the map never looks empty.
const MAP_RADIUS_KM = 8;

/* ------------------------------------------------------------------ */
/*  Data source — replace the try body with a real call once your API */
/*  route / DB exists. The mock array is only the catch-fallback so    */
/*  the section still renders meaningfully in the meantime.           */
/* ------------------------------------------------------------------ */

async function fetchNearbyVenues(lat: number, lng: number): Promise<VenueRecord[]> {
  try {
    const res = await fetch(
      `/api/venues/nearby?lat=${lat}&lng=${lng}&radiusKm=${MAP_RADIUS_KM}`,
    );
    if (!res.ok) throw new Error("nearby venues request failed");
    return (await res.json()) as VenueRecord[];
  } catch {
    return MOCK_VENUES;
  }
}

const MOCK_VENUES: VenueRecord[] = [
  { id: "s1", name: "Vile Parle Turf Club", sport: "football", latitude: 19.1017, longitude: 72.8342, goingCount: 8, href: "/venues/vile-parle-turf" },
  { id: "s2", name: "Chakala Sports Arena", sport: "cricket", latitude: 19.1136, longitude: 72.8593, goingCount: 14, href: "/venues/chakala-arena" },
  { id: "s3", name: "Juhu Badminton Court", sport: "badminton", latitude: 19.1076, longitude: 72.8262, goingCount: 4, href: "/venues/juhu-badminton" },
  { id: "s4", name: "Powai Lake Club", sport: "swimming", latitude: 19.1176, longitude: 72.906, goingCount: 6, href: "/venues/powai-lake" },
  { id: "s5", name: "BKC Chess Circle", sport: "chess", latitude: 19.0669, longitude: 72.8679, goingCount: 3, href: "/venues/bkc-chess" },
  { id: "s6", name: "Kalina Carrom Club", sport: "carrom", latitude: 19.0805, longitude: 72.8478, goingCount: 5, href: "/venues/kalina-carrom" },
];

/* ------------------------------------------------------------------ */
/*  Geo helpers — turn (lat, lng) pairs into an on-map (top%, left%)   */
/* ------------------------------------------------------------------ */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function project(
  user: { latitude: number; longitude: number },
  point: { latitude: number; longitude: number },
) {
  const kmPerDegLat = 110.574;
  const kmPerDegLng = 111.32 * Math.cos((user.latitude * Math.PI) / 180);

  const dxKm = (point.longitude - user.longitude) * kmPerDegLng;
  const dyKm = (point.latitude - user.latitude) * kmPerDegLat; // north = positive
  const distanceKm = Math.sqrt(dxKm * dxKm + dyKm * dyKm);

  // Clamp far-away venues to the edge of the map instead of hiding them.
  const scale = distanceKm > MAP_RADIUS_KM ? MAP_RADIUS_KM / distanceKm : 1;

  const left = 50 + ((dxKm * scale) / MAP_RADIUS_KM) * 42;
  const top = 50 - ((dyKm * scale) / MAP_RADIUS_KM) * 42; // screen y grows downward

  return { distanceKm, top: clamp(top, 6, 94), left: clamp(left, 6, 94) };
}

function formatDistance(km: number) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

/* ------------------------------------------------------------------ */
/*  useUserLocation — wraps the browser geolocation API                */
/* ------------------------------------------------------------------ */

type LocationStatus = "loading" | "granted" | "denied" | "unsupported";

function useUserLocation() {
  // Lazy initializer decides "unsupported" up front if there's no geolocation
  // API at all, so the mount effect below never needs to call setState
  // synchronously just to report a status that was already knowable at
  // render time.
  const [status, setStatus] = useState<LocationStatus>(() =>
    typeof navigator !== "undefined" && "geolocation" in navigator ? "loading" : "unsupported",
  );
  const [coords, setCoords] = useState(FALLBACK_LOCATION);

  const locate = useCallback(() => {
    if (!("geolocation" in navigator)) return; // already reflected in initial state
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setStatus("granted");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60_000 },
    );
  }, []);

  // Mount effect only *subscribes* to the geolocation result via async
  // callbacks above — it doesn't call setState directly in its own body.
  useEffect(() => {
    locate();
  }, [locate]);

  // Manual "locate me" button — this setState call is fine because it runs
  // inside an event handler, not inside an effect.
  const refresh = () => {
    setStatus("loading");
    locate();
  };

  return { status, coords, refresh };
}

/* ------------------------------------------------------------------ */
/*  Hand-drawn map illustration (pure SVG, no map-tile / API usage)   */
/* ------------------------------------------------------------------ */

function HandDrawnMap() {
  return (
    <svg
      viewBox="0 0 960 540"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <rect x="0" y="0" width="960" height="540" fill="#DCF1FB" />

      <path
        d="M170,0 C130,70 90,150 130,230 C165,300 120,360 100,430 C85,480 110,510 150,540
           L960,540 L960,0 Z"
        fill="#F5EFE1"
      />
      <path
        d="M170,0 C130,70 90,150 130,230 C165,300 120,360 100,430 C85,480 110,510 150,540"
        fill="none"
        stroke="#C8BFA6"
        strokeWidth="2.5"
        strokeDasharray="1 7"
        strokeLinecap="round"
      />

      <path
        d="M780,0 C755,55 800,120 840,165 C878,206 858,280 895,320 L960,320 L960,0 Z"
        fill="#DCF1FB"
      />
      <path
        d="M780,0 C755,55 800,120 840,165 C878,206 858,280 895,320"
        fill="none"
        stroke="#B9DCEC"
        strokeWidth="2"
        strokeDasharray="1 6"
      />

      <ellipse cx="845" cy="235" rx="55" ry="70" fill="#C7E9D2" opacity="0.9" />
      {[...Array(10)].map((_, i) => (
        <circle key={i} cx={815 + ((i * 37) % 90)} cy={190 + ((i * 53) % 130)} r="5.5" fill="#6FBE87" />
      ))}

      <path
        d="M230,540 C280,440 310,340 275,250 C245,175 300,110 370,55"
        fill="none"
        stroke="#F2B84B"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M232,538 C282,438 312,338 277,248 C247,173 302,108 372,53"
        fill="none"
        stroke="#F2B84B"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M370,55 C470,40 560,60 640,20"
        fill="none"
        stroke="#F2B84B"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M300,300 C400,320 470,270 560,300 C630,325 690,300 760,330"
        fill="none"
        stroke="#CBC2AC"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 5"
      />
      <path
        d="M320,180 C360,240 340,300 380,360 C410,405 400,460 440,510"
        fill="none"
        stroke="#CBC2AC"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 5"
      />

      <text
        x="480"
        y="470"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontSize="30"
        fill="#B8AE93"
      >
        Mumbai
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail panel shown for the active pin                              */
/* ------------------------------------------------------------------ */

function DetailPanel({ spot }: { spot: MapPin | null }) {
  return (
    <div key={spot?.id ?? "placeholder"} className="relative animate-[fadeSlide_0.4s_ease]">
      {spot ? (
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-3xl text-primary shadow-sm">
              {SPORT_ICONS[spot.sport]}
            </div>
            <h3 className="mt-4 text-xl font-bold text-white">{SPORT_LABELS[spot.sport]}</h3>
            <p className="mt-1 text-base font-semibold text-white/85">{spot.name}</p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="-rotate-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary shadow-sm">
                📍 {formatDistance(spot.distanceKm)} away
              </span>
              <span className="rotate-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary shadow-sm">
                {spot.goingCount} going now
              </span>
            </div>
          </div>

          <a
            href={spot.href}
            className="mt-6 flex w-full items-center justify-center rounded-full bg-white py-3 text-sm font-bold text-primary shadow-md transition-transform duration-300 hover:scale-[1.02] hover:cursor-pointer"
          >
            View Games Here
          </a>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-3xl text-primary shadow-sm">
            <MdMyLocation />
          </div>
          <h3 className="text-lg font-bold text-white">Explore what&apos;s near you</h3>
          <p className="text-sm font-medium text-white/85">
            Tap a pin on the map to see live games and venues around you.
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Heroes                                                             */
/* ------------------------------------------------------------------ */

const Heroes = () => {
  const { status, coords, refresh } = useUserLocation();

  const [venues, setVenues] = useState<VenueRecord[] | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Fetch venues whenever we have a coordinate to search around —
  // this runs once on the fallback location, then again if the user grants access.
  // Both state updates happen inside .then() continuations (not synchronously
  // in the effect body) so React treats this purely as "subscribe to an
  // async result," not "set state directly during the effect."
  useEffect(() => {
    let cancelled = false;

    Promise.resolve()
      .then(() => {
        if (!cancelled) setVenues(null);
      })
      .then(() => fetchNearbyVenues(coords.latitude, coords.longitude))
      .then((data) => {
        if (!cancelled) setVenues(data);
      });

    return () => {
      cancelled = true;
    };
  }, [coords.latitude, coords.longitude]);

  const pins: MapPin[] = useMemo(() => {
    if (!venues) return [];
    return venues
      .map((v) => ({ ...v, ...project(coords, v) }))
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [venues, coords]);

  const active = pins.find((p) => p.id === activeId) ?? null;
  const isLocating = status === "loading" || venues === null;

  return (
    <section className="flex w-full flex-col items-center">
      <style>{`
        @keyframes pinFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="flex w-full max-w-7xl flex-col gap-6 rounded-4xl bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.1)] mt-15 md:p-8">
        <div className="w-full text-left">
          <h2 className="text-2xl font-bold text-gray-800">Explore Nearby</h2>
          <p className="mt-1 text-sm text-gray-500 md:text-base">
            See live games and venues around your actual location, updated in real time.
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch justify-center gap-6 lg:flex-row">
          {/* Map card */}
          <div className="relative aspect-6/5 w-full overflow-hidden rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] lg:aspect-auto lg:h-105 lg:w-3/5">
            <HandDrawnMap />

          {/* Distance rings, centered on the user, purely decorative */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25" />

          {/* Locate-me button */}
          <button
            onClick={refresh}
            title="Use my current location"
            className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-colors ${
              status === "granted" ? "bg-blue-500 text-white" : "bg-white/90 text-gray-600 hover:text-blue-500"
            }`}
          >
            <MdMyLocation />
          </button>

          {/* Locating overlay */}
          {isLocating && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-md">
                Finding games near you…
              </span>
            </div>
          )}

          {/* "You are here" marker — always the visual center, since pins are projected relative to it */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 -m-2 rounded-full bg-blue-400/40 animate-ping" />
            <span className="relative block h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-md" />
          </div>

          {/* Location pins, positioned from real coordinates — each one is a
              branded sport-icon badge instead of a generic red map-pin, so
              you can tell what's there before even hovering */}
          {pins.map((spot, i) => {
            const isActive = activeId === spot.id;
            return (
              <button
                key={spot.id}
                onClick={() => setActiveId(isActive ? null : spot.id)}
                style={{ top: `${spot.top}%`, left: `${spot.left}%`, animationDelay: `${i * 0.25}s` }}
                className="group absolute -translate-x-1/2 -translate-y-full animate-[pinFloat_3s_ease-in-out_infinite]"
              >
                <div className="flex flex-col items-center drop-shadow-[0_6px_8px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-base transition-all duration-300 ${
                      isActive ? "scale-110 bg-primary text-white" : "bg-white text-primary"
                    }`}
                  >
                    {SPORT_ICONS[spot.sport]}
                  </div>
                  <div
                    className={`-mt-1 h-0 w-0 border-x-8 border-t-8 border-x-transparent ${
                      isActive ? "border-t-primary" : "border-t-white"
                    }`}
                  />
                </div>
                <span
                  className={`pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-black/80 px-2.5 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
                    isActive ? "opacity-100" : ""
                  }`}
                >
                  {spot.name}
                </span>
              </button>
            );
          })}

          {/* Permission banner */}
          {(status === "denied" || status === "unsupported") && (
            <div className="absolute bottom-3 left-1/2 z-10 w-[92%] -translate-x-1/2 rounded-xl bg-white/95 px-3 py-2 text-center text-xs font-medium text-gray-600 shadow-md">
              {status === "denied"
                ? "Location access denied — showing venues near Mumbai."
                : "Your browser doesn't support location — showing venues near Mumbai."}{" "}
              <button onClick={refresh} className="font-bold text-primary underline underline-offset-2">
                Try again
              </button>
            </div>
          )}
          </div>

          {/* Detail panel */}
          <div className="relative flex w-full flex-col overflow-hidden rounded-3xl bg-primary p-6 lg:h-105 lg:w-2/5">
            {/* subtle dot texture + soft blobs so it isn't a flat color fill */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1.5px, transparent 1.5px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-white/10" />
            <DetailPanel spot={active} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heroes;