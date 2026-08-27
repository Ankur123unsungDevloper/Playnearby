import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { requireLocalUser } from "../middleware/require-local-user.js";
import {
  createPlayRequest,
  listMyPlayRequests,
  respondToPlayRequest,
  cancelPlayRequest,
} from "../controllers/play-requests.controller.js";

const router = Router();

router.use(requireAuth(), requireLocalUser);

router.post("/", createPlayRequest);
router.get("/", listMyPlayRequests);
router.post("/:id/respond", respondToPlayRequest);
router.post("/:id/cancel", cancelPlayRequest);

export default router;
