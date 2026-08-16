import type { GameSession } from "@/types";

export type StatusVariant = "slots" | "booked" | "going" | "cancelled";

export function getGameStatusDisplay(
  game: Pick<GameSession, "status" | "capacity" | "participants">,
): { variant: StatusVariant; text: string } {
  const joined = game.participants.length;
  const remaining = game.capacity - joined;

  if (game.status === "cancelled") {
    return { variant: "cancelled", text: "CANCELLED" };
  }
  if (game.status === "full" || remaining <= 0) {
    return { variant: "booked", text: "FULL" };
  }
  if (remaining <= 3) {
    return { variant: "slots", text: `Only ${remaining} Slot${remaining === 1 ? "" : "s"}` };
  }
  return { variant: "going", text: `${joined} Going` };
}
