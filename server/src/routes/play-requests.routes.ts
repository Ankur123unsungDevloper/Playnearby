import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { requireLocalUser } from "../middleware/require-local-user.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  createPlayRequest,
  listMyPlayRequests,
  respondToPlayRequest,
  cancelPlayRequest,
} from "../controllers/play-requests.controller.js";

const router = Router();

router.use(requireAuth(), requireLocalUser);

router.post("/", asyncHandler(createPlayRequest));
router.get("/", asyncHandler(listMyPlayRequests));
router.post("/:id/respond", asyncHandler(respondToPlayRequest));
router.post("/:id/cancel", asyncHandler(cancelPlayRequest));

export default router;
