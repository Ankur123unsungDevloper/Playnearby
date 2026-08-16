import type { GameSession, Venue } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    // Games/venues change often (new hosts, people joining, slots filling) —
    // no-store keeps list/detail pages honest rather than serving stale data
    // from Next's default fetch cache. Revisit with real revalidation
    // (tags + revalidatePath on write routes) once traffic makes this matter.
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { error?: string });
    throw new Error(body.error ?? `Request to ${path} failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export function getVenues(params?: { sport?: SportKeyLike }) {
  const qs = params?.sport ? `?sport=${encodeURIComponent(params.sport)}` : "";
  return apiFetch<Venue[]>(`/api/venues${qs}`);
}

export function getNearbyVenues(lat: number, lng: number, radiusKm = 8) {
  return apiFetch<Venue[]>(`/api/venues/nearby?lat=${lat}&lng=${lng}&radiusKm=${radiusKm}`);
}

export function getVenueById(id: string) {
  return apiFetch<Venue>(`/api/venues/${id}`);
}

export function getGames(params?: { sport?: SportKeyLike }) {
  const qs = params?.sport ? `?sport=${encodeURIComponent(params.sport)}` : "";
  return apiFetch<GameSession[]>(`/api/games${qs}`);
}

export function getGameById(id: string) {
  return apiFetch<GameSession>(`/api/games/${id}`);
}

// Loosely typed so callers can pass a plain string (e.g. from a URL query
// param) without fighting the SportKey union at the call site.
type SportKeyLike = string;
