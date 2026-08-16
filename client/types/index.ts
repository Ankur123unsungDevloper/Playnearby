export type SportKey =
  | "football"
  | "cricket"
  | "badminton"
  | "chess"
  | "carrom"
  | "swimming"
  | "tennis"
  | "table_tennis";

export type Venue = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  images: string[];
  sports: SportKey[];
  createdAt: string;
  // Only present when returned from /api/venues/nearby
  distanceKm?: number;
};

export type PlayerSummary = {
  id: string;
  name: string;
  avatarUrl: string | null;
  hearts?: number;
};

export type GameParticipant = {
  id: string;
  user: PlayerSummary;
  joinedAt: string;
};

export type GameStatus = "open" | "full" | "cancelled" | "completed";

export type GameSession = {
  id: string;
  sport: SportKey;
  format: string;
  level: string;
  stateTag?: string | null;
  startsAt: string;
  endsAt: string;
  capacity: number;
  status: GameStatus;
  host: PlayerSummary;
  venue: Venue | null;
  participants: GameParticipant[];
};
