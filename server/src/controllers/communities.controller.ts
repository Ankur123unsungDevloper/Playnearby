import type { Request, Response } from "express";
import { z } from "zod";
import { Community } from "../models/Community.js";

export async function listCommunities(_req: Request, res: Response) {
  const communities = await Community.find().populate("createdBy", "name avatarUrl");
  res.json(communities);
}

const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  location: z.string().optional(),
});

export async function createCommunity(req: Request, res: Response) {
  if (!req.localUser) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const community = await Community.create({
    ...parsed.data,
    createdBy: req.localUser._id,
    members: [req.localUser._id],
  });

  res.status(201).json(community);
}

export async function joinCommunity(req: Request, res: Response) {
  if (!req.localUser) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const community = await Community.findById(req.params.id);
  if (!community) {
    return res.status(404).json({ error: "Community not found" });
  }

  const userId = req.localUser._id.toString();
  if (!community.members.some((m) => m.toString() === userId)) {
    community.members.push(req.localUser._id as never);
    await community.save();
  }

  res.json(community);
}
