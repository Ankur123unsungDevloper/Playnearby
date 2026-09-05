import type { GameSession, PlayerSummary, Venue } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { error?: string });
    throw new Error(body.error ?? `Request to ${path} failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = any;

function normalizePlayer(raw: Raw): PlayerSummary | null {
  if (!raw) return null;
  return {
    id: raw._id ?? raw.id,
    name: raw.name,
    avatarUrl: raw.avatarUrl ?? null,
    hearts: raw.hearts,
  };
}

function normalizeVenue(raw: Raw): Venue {
  return {
    id: raw._id ?? raw.id,
    name: raw.name,
    fullAddress: raw.fullAddress ?? raw.address,
    address: raw.address,
    latitude: raw.latitude,
    longitude: raw.longitude,
    rating: raw.rating,
    reviewCount: raw.reviewCount,
    featured: raw.featured,
    images: raw.images ?? [],
    sports: raw.sports ?? [],
    amenities: raw.amenities ?? [],
    description: raw.description ?? "",
    otherVenuesOwned: raw.otherVenuesOwned,
    openTime: raw.openTime ?? "09:00",
    closeTime: raw.closeTime ?? "22:00",
    ownerId: raw.ownerId,
    status: raw.status,
    createdAt: raw.createdAt,
    distanceKm: raw.distanceKm,
  };
}

function normalizeGame(raw: Raw): GameSession {
  return {
    id: raw._id ?? raw.id,
    sport: raw.sport,
    format: raw.format,
    level: raw.level,
    stateTag: raw.stateTag ?? null,
    startsAt: raw.startsAt,
    endsAt: raw.endsAt,
    capacity: raw.capacity,
    status: raw.status,
    host: normalizePlayer(raw.hostId ?? raw.host) as PlayerSummary,
    venue: raw.venueId || raw.venue ? normalizeVenue(raw.venueId ?? raw.venue) : null,
    participants: (raw.participants ?? []).map((p: Raw) => ({
      id: p._id ?? p.id,
      joinedAt: p.joinedAt,
      user: normalizePlayer(p.userId ?? p.user) as PlayerSummary,
    })),
  };
}

export async function getVenues(params?: { sport?: string }) {
  const qs = params?.sport ? `?sport=${encodeURIComponent(params.sport)}` : "";
  const raw = await apiFetch<Raw[]>(`/api/venues${qs}`);
  return raw.map(normalizeVenue);
}

export async function getNearbyVenues(lat: number, lng: number, radiusKm = 8) {
  const raw = await apiFetch<Raw[]>(`/api/venues/nearby?lat=${lat}&lng=${lng}&radiusKm=${radiusKm}`);
  return raw.map(normalizeVenue);
}

export async function getVenueById(id: string) {
  const raw = await apiFetch<Raw>(`/api/venues/${id}`);
  return normalizeVenue(raw);
}

export async function getGames(params?: { sport?: string }) {
  const qs = params?.sport ? `?sport=${encodeURIComponent(params.sport)}` : "";
  const raw = await apiFetch<Raw[]>(`/api/games${qs}`);
  return raw.map(normalizeGame);
}

export async function getGameById(id: string) {
  const raw = await apiFetch<Raw>(`/api/games/${id}`);
  return normalizeGame(raw);
}
