import { Router } from "express";
import { getNearbyVenues, listVenues, getVenueById } from "../controllers/venues.controller.js";

const router = Router();

// Order matters — /nearby must be registered before /:id, or Express will
// treat "nearby" as an :id value and hit getVenueById instead.
router.get("/nearby", getNearbyVenues);
router.get("/", listVenues);
router.get("/:id", getVenueById);

export default router;
