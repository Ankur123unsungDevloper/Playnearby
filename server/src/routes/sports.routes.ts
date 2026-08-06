import { Router } from "express";

const router = Router();

// Static for now — mirrors the SportKey union already used in FavSport.tsx,
// Services.tsx, and Heroes.tsx. Move to a real DB table later if sports need
// admin-editable metadata (custom images, descriptions, ordering, etc.).
const SPORTS = [
  { id: "football", name: "Football" },
  { id: "cricket", name: "Cricket" },
  { id: "badminton", name: "Badminton" },
  { id: "chess", name: "Chess" },
  { id: "carrom", name: "Carrom" },
  { id: "swimming", name: "Swimming" },
];

router.get("/", (_req, res) => res.json(SPORTS));

export default router;
