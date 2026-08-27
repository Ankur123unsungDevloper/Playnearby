import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { requireLocalUser } from "../middleware/require-local-user.js";
import { listCommunities, createCommunity, joinCommunity } from "../controllers/communities.controller.js";

const router = Router();

router.get("/", listCommunities);
router.post("/", requireAuth(), requireLocalUser, createCommunity);
router.post("/:id/join", requireAuth(), requireLocalUser, joinCommunity);

export default router;
