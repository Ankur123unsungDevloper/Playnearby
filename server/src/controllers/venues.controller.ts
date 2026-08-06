import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

// Same haversine approach the frontend's Heroes.tsx uses client-side for
// projecting pins onto the map — done here in SQL so we only pull venues
// actually within range instead of loading the whole table into memory.
//
// This needs no PostGIS extension, just plain math — fine at this scale.
// If the venues table grows into the tens of thousands of rows, revisit
// with PostGIS + a proper spatial index.
export async function getNearbyVenues(req: Request, res: Response) {
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);
  const radiusKm = Number(req.query.radiusKm ?? 8);

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return res.status(400).json({ error: "lat and lng query params are required" });
  }

  const venues = await prisma.$queryRaw`
    SELECT * FROM (
      SELECT *,
        (
          6371 * acos(
            cos(radians(${lat})) * cos(radians(latitude)) *
            cos(radians(longitude) - radians(${lng})) +
            sin(radians(${lat})) * sin(radians(latitude))
          )
        ) AS "distanceKm"
      FROM "Venue"
    ) sub
    WHERE "distanceKm" <= ${radiusKm}
    ORDER BY "distanceKm" ASC
  `;

  res.json(venues);
}

export async function listVenues(req: Request, res: Response) {
  const sport = typeof req.query.sport === "string" ? req.query.sport : undefined;

  const venues = await prisma.venue.findMany({
    where: sport ? { sports: { has: sport as never } } : undefined,
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
  });

  res.json(venues);
}

export async function getVenueById(req: Request, res: Response) {
  const venue = await prisma.venue.findUnique({ where: { id: req.params.id } });
  if (!venue) {
    return res.status(404).json({ error: "Venue not found" });
  }
  res.json(venue);
}
