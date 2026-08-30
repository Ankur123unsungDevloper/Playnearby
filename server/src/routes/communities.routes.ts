import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { requireLocalUser } from "../middleware/require-local-user.js";
import { asyncHandler } from "../utils/async-handler.js";
import { listCommunities, createCommunity, joinCommunity } from "../controllers/communities.controller.js";

const router = Router();

router.get("/", asyncHandler(listCommunities));
router.post("/", requireAuth(), requireLocalUser, asyncHandler(createCommunity));
router.post("/:id/join", requireAuth(), requireLocalUser, asyncHandler(joinCommunity));

export default router;
