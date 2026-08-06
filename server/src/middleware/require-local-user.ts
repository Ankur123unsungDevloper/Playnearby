import type { NextFunction, Request, Response } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import { prisma } from "../lib/prisma.js";

// Augments Express's Request type so downstream handlers get a typed
// `req.localUser` instead of `any`.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      localUser?: Awaited<ReturnType<typeof prisma.user.upsert>>;
    }
  }
}

// Must run *after* requireAuth() from @clerk/express, so getAuth(req) already
// has a userId to work with.
//
// The Clerk webhook (routes/webhooks.routes.ts) is the primary way users get
// synced into Postgres, firing the moment someone signs up. This upsert is
// just a safety net for the rare race where a request reaches the API before
// that webhook has been processed — it guarantees routes never crash on a
// missing local User row.
export async function requireLocalUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const clerkUser = await clerkClient.users.getUser(userId);
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: {
        clerkId: userId,
        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || "Player",
        avatarUrl: clerkUser.imageUrl,
      },
    });
    req.localUser = user;
    next();
  } catch (err) {
    next(err);
  }
}
