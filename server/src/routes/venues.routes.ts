import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { requireLocalUser } from "../middleware/require-local-user.js";
import { getNearbyVenues, listVenues, getVenueById, createVenue } from "../controllers/venues.controller.js";

const router = Router();

router.get("/nearby", getNearbyVenues);
router.get("/", listVenues);
router.get("/:id", getVenueById);
router.post("/", requireAuth(), requireLocalUser, createVenue);

export default router;
