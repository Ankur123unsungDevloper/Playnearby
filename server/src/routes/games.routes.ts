import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { requireLocalUser } from "../middleware/require-local-user.js";
import { asyncHandler } from "../utils/async-handler.js";
import { listGames, getGameById, createGame, joinGame, leaveGame } from "../controllers/games.controller.js";

const router = Router();

router.get("/", asyncHandler(listGames));
router.get("/:id", asyncHandler(getGameById));
router.post("/", requireAuth(), requireLocalUser, asyncHandler(createGame));
router.post("/:id/join", requireAuth(), requireLocalUser, asyncHandler(joinGame));
router.delete("/:id/join", requireAuth(), requireLocalUser, asyncHandler(leaveGame));

export default router;
