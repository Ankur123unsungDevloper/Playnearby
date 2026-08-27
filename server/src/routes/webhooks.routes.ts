import express, { Router } from "express";
import { Webhook } from "svix";
import { User } from "../models/User.js";

const router = Router();

type ClerkUserEvent = {
  type: "user.created" | "user.updated" | "user.deleted" | string;
  data: { id: string; first_name?: string | null; last_name?: string | null; image_url?: string };
};

router.post("/clerk", express.raw({ type: "application/json" }), async (req, res) => {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "CLERK_WEBHOOK_SECRET is not configured" });
  }

  const wh = new Webhook(secret);
  let event: ClerkUserEvent;

  try {
    event = wh.verify(req.body, {
      "svix-id": req.header("svix-id") ?? "",
      "svix-timestamp": req.header("svix-timestamp") ?? "",
      "svix-signature": req.header("svix-signature") ?? "",
    }) as ClerkUserEvent;
  } catch {
    return res.status(400).json({ error: "Invalid webhook signature" });
  }

  const d = event.data;
  const name = `${d.first_name ?? ""} ${d.last_name ?? ""}`.trim() || "Player";

  switch (event.type) {
    case "user.created":
    case "user.updated":
      await User.findOneAndUpdate(
        { clerkId: d.id },
        { clerkId: d.id, name, avatarUrl: d.image_url },
        { upsert: true },
      );
      break;
    case "user.deleted":
      await User.deleteOne({ clerkId: d.id });
      break;
  }

  res.json({ received: true });
});

export default router;
