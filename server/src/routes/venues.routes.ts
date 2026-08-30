import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { asyncHandler } from "../utils/async-handler.js";
import { getNearbyVenues, listVenues, getVenueById, createVenue } from "../controllers/venues.controller.js";

const router = Router();

router.get("/nearby", asyncHandler(getNearbyVenues));
router.get("/", asyncHandler(listVenues));
router.get("/:id", asyncHandler(getVenueById));
router.post("/", requireAuth(), asyncHandler(createVenue));

export default router;
