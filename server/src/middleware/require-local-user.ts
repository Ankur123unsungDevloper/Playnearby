import type { NextFunction, Request, Response } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import { User } from "../models/User.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      localUser?: InstanceType<typeof User>;
    }
  }
}

// The Clerk webhook (routes/webhooks.routes.ts) is the primary way users get
// synced into MongoDB. This is a safety net for the rare case a request
// beats that webhook.
export async function requireLocalUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);
      const name = `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || "Player";
      user = await User.create({ clerkId: userId, name, avatarUrl: clerkUser.imageUrl });
    }
    req.localUser = user;
    next();
  } catch (err) {
    next(err);
  }
}
