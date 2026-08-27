import type { Request, Response } from "express";
import { z } from "zod";
import { GameSession } from "../models/GameSession.js";

export async function listGames(req: Request, res: Response) {
  const sport = typeof req.query.sport === "string" ? req.query.sport : undefined;
  const filter: Record<string, unknown> = { status: "open" };
  if (sport) filter.sport = sport;

  const games = await GameSession.find(filter)
    .sort({ startsAt: 1 })
    .populate("hostId", "name avatarUrl hearts")
    .populate("venueId")
    .populate("participants.userId", "name avatarUrl");

  res.json(games);
}

export async function getGameById(req: Request, res: Response) {
  const game = await GameSession.findById(req.params.id)
    .populate("hostId", "name avatarUrl hearts")
    .populate("venueId")
    .populate("participants.userId", "name avatarUrl");

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }
  res.json(game);
}

const createGameSchema = z.object({
  sport: z.enum(["football", "cricket", "badminton", "chess", "carrom", "swimming", "tennis", "table_tennis"]),
  format: z.string().min(1),
  level: z.string().min(1),
  stateTag: z.string().optional(),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  capacity: z.number().int().min(2).max(50).default(10),
  venueId: z.string().optional(),
});

export async function createGame(req: Request, res: Response) {
  const parsed = createGameSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  if (!req.localUser) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const game = await GameSession.create({
    ...parsed.data,
    startsAt: new Date(parsed.data.startsAt),
    endsAt: new Date(parsed.data.endsAt),
    hostId: req.localUser._id,
  });

  res.status(201).json(game);
}

export async function joinGame(req: Request, res: Response) {
  if (!req.localUser) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const game = await GameSession.findById(req.params.id);
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }
  if (game.status !== "open") {
    return res.status(409).json({ error: "This game isn't open to new players" });
  }

  const userId = req.localUser._id.toString();
  const alreadyJoined = game.participants.some((p) => p.userId.toString() === userId);
  if (alreadyJoined) {
    return res.status(200).json(game);
  }
  if (game.participants.length >= game.capacity) {
    return res.status(409).json({ error: "Game is already full" });
  }

  game.participants.push({ userId: req.localUser._id, joinedAt: new Date() } as never);
  if (game.participants.length >= game.capacity) {
    game.status = "full";
  }
  await game.save();

  res.status(201).json(game);
}

export async function leaveGame(req: Request, res: Response) {
  if (!req.localUser) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const game = await GameSession.findById(req.params.id);
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  const userId = req.localUser._id.toString();
  game.participants = game.participants.filter((p) => p.userId.toString() !== userId) as never;
  if (game.status === "full") game.status = "open";
  await game.save();

  res.status(204).send();
}
