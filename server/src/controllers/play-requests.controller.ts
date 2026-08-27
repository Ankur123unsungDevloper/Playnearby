import type { Request, Response } from "express";
import { z } from "zod";
import { PlayRequest } from "../models/PlayRequest.js";

const createSchema = z.object({
  recipientId: z.string().min(1),
  gameType: z.enum(["football", "cricket", "badminton", "chess", "carrom", "swimming", "tennis", "table_tennis"]),
  preferredLocation: z.enum(["home", "society_clubhouse", "local_ground"]).optional(),
  message: z.string().max(500).optional(),
});

export async function createPlayRequest(req: Request, res: Response) {
  if (!req.localUser) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  if (parsed.data.recipientId === req.localUser._id.toString()) {
    return res.status(400).json({ error: "You can't send a play request to yourself." });
  }

  const request = await PlayRequest.create({
    requesterId: req.localUser._id,
    recipientId: parsed.data.recipientId,
    gameType: parsed.data.gameType,
    preferredLocation: parsed.data.preferredLocation,
    message: parsed.data.message,
  });

  res.status(201).json(request);
}

export async function listMyPlayRequests(req: Request, res: Response) {
  if (!req.localUser) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const [sent, received] = await Promise.all([
    PlayRequest.find({ requesterId: req.localUser._id })
      .populate("recipientId", "name avatarUrl")
      .sort({ createdAt: -1 }),
    PlayRequest.find({ recipientId: req.localUser._id })
      .populate("requesterId", "name avatarUrl")
      .sort({ createdAt: -1 }),
  ]);

  res.json({ sent, received });
}

const respondSchema = z.object({ status: z.enum(["accepted", "declined"]) });

export async function respondToPlayRequest(req: Request, res: Response) {
  if (!req.localUser) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const parsed = respondSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const request = await PlayRequest.findById(req.params.id);
  if (!request) {
    return res.status(404).json({ error: "Play request not found" });
  }
  if (request.recipientId.toString() !== req.localUser._id.toString()) {
    return res.status(403).json({ error: "Only the recipient can respond to this request" });
  }
  if (request.status !== "pending") {
    return res.status(409).json({ error: "This request has already been responded to" });
  }

  request.status = parsed.data.status;
  request.respondedAt = new Date();
  await request.save();

  res.json(request);
}

export async function cancelPlayRequest(req: Request, res: Response) {
  if (!req.localUser) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const request = await PlayRequest.findById(req.params.id);
  if (!request) {
    return res.status(404).json({ error: "Play request not found" });
  }
  if (request.requesterId.toString() !== req.localUser._id.toString()) {
    return res.status(403).json({ error: "Only the requester can cancel this request" });
  }

  request.status = "cancelled";
  request.respondedAt = new Date();
  await request.save();

  res.status(204).send();
}
