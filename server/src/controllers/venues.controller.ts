import type { Request, Response } from "express";
import { z } from "zod";
import { Venue } from "../models/Venue.js";

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Distance computed in JS after fetching, rather than a MongoDB geospatial
// index — simplest option, plenty fast at this project's scale. Revisit
// with a real 2dsphere index if the venues table ever grows into the
// thousands of rows.
export async function getNearbyVenues(req: Request, res: Response) {
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);
  const radiusKm = Number(req.query.radiusKm ?? 8);

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return res.status(400).json({ error: "lat and lng query params are required" });
  }

  const venues = await Venue.find().lean();
  const withDistance = venues
    .map((v) => ({ ...v, distanceKm: haversineKm(lat, lng, v.latitude, v.longitude) }))
    .filter((v) => v.distanceKm <= radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  res.json(withDistance);
}

export async function listVenues(req: Request, res: Response) {
  const sport = typeof req.query.sport === "string" ? req.query.sport : undefined;
  const filter = sport ? { sports: sport } : {};
  const venues = await Venue.find(filter).sort({ featured: -1, rating: -1 });
  res.json(venues);
}

export async function getVenueById(req: Request, res: Response) {
  const venue = await Venue.findById(req.params.id);
  if (!venue) {
    return res.status(404).json({ error: "Venue not found" });
  }
  res.json(venue);
}

const createVenueSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  featured: z.boolean().default(false),
  images: z.array(z.string()).default([]),
  sports: z.array(z.string()).min(1),
});

export async function createVenue(req: Request, res: Response) {
  const parsed = createVenueSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const venue = await Venue.create(parsed.data);
  res.status(201).json(venue);
}
