import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { requireLocalUser } from "../middleware/require-local-user.js";
import { listGames, getGameById, createGame, joinGame, leaveGame } from "../controllers/games.controller.js";

const router = Router();

router.get("/", listGames);
router.get("/:id", getGameById);
router.post("/", requireAuth(), requireLocalUser, createGame);
router.post("/:id/join", requireAuth(), requireLocalUser, joinGame);
router.delete("/:id/join", requireAuth(), requireLocalUser, leaveGame);

export default router;
