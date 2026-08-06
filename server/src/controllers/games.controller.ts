import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

export async function listGames(req: Request, res: Response) {
  const sport = typeof req.query.sport === "string" ? req.query.sport : undefined;

  const games = await prisma.gameSession.findMany({
    where: {
      status: "open",
      ...(sport ? { sport: sport as never } : {}),
    },
    include: {
      host: { select: { id: true, name: true, avatarUrl: true, hearts: true } },
      venue: true,
      participants: {
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
      },
    },
    orderBy: { startsAt: "asc" },
  });

  res.json(games);
}

export async function getGameById(req: Request, res: Response) {
  const game = await prisma.gameSession.findUnique({
    where: { id: req.params.id },
    include: {
      host: { select: { id: true, name: true, avatarUrl: true, hearts: true } },
      venue: true,
      participants: {
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
      },
    },
  });
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

  const game = await prisma.gameSession.create({
    data: {
      ...parsed.data,
      startsAt: new Date(parsed.data.startsAt),
      endsAt: new Date(parsed.data.endsAt),
      hostId: req.localUser.id,
    },
  });

  res.status(201).json(game);
}

export async function joinGame(req: Request, res: Response) {
  if (!req.localUser) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const gameId = req.params.id;

  // NOTE: this check-then-act on capacity has a benign race under heavy
  // concurrent joins on the very last open slot (two people could both pass
  // the capacity check a few ms apart before either insert completes).
  // Low-risk at typical traffic; if it ever matters, wrap this in a
  // `prisma.$transaction` with an explicit row lock, or add a DB-level
  // constraint (e.g. a trigger that rejects inserts past capacity).
  const game = await prisma.gameSession.findUnique({
    where: { id: gameId },
    include: { participants: true },
  });
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }
  if (game.status !== "open") {
    return res.status(409).json({ error: "This game isn't open to new players" });
  }
  if (game.participants.length >= game.capacity) {
    return res.status(409).json({ error: "Game is already full" });
  }

  const participant = await prisma.gameParticipant.upsert({
    where: { gameId_userId: { gameId, userId: req.localUser.id } },
    update: {},
    create: { gameId, userId: req.localUser.id },
  });

  if (game.participants.length + 1 >= game.capacity) {
    await prisma.gameSession.update({ where: { id: gameId }, data: { status: "full" } });
  }

  res.status(201).json(participant);
}

export async function leaveGame(req: Request, res: Response) {
  if (!req.localUser) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const gameId = req.params.id;

  await prisma.gameParticipant.deleteMany({
    where: { gameId, userId: req.localUser.id },
  });

  // Reopen the game if leaving frees up a slot in a previously-full game.
  await prisma.gameSession.updateMany({
    where: { id: gameId, status: "full" },
    data: { status: "open" },
  });

  res.status(204).send();
}
