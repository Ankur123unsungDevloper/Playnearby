import { Schema, model } from "mongoose";

const venueSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    images: { type: [String], default: [] },
    sports: { type: [String], required: true },
  },
  { timestamps: true },
);

export const Venue = model("Venue", venueSchema);
