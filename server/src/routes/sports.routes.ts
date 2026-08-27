import { Router } from "express";

const router = Router();

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
