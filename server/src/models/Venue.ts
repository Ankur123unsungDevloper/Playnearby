import { Schema, model } from "mongoose";

const venueSchema = new Schema(
  {
    name: { type: String, required: true },

    // Two distinct address values, per the partner form:
    // - fullAddress: the complete address exactly as the owner typed it
    //   (used for maps/directions/geocoding)
    // - address: a short, human-friendly display version shown on cards
    //   and listings (e.g. "Chamundi Hotel Compound, Andheri, Mumbai")
    fullAddress: { type: String, required: true },
    address: { type: String, required: true },

    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },

    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    images: { type: [String], default: [] },
    sports: { type: [String], required: true },

    amenities: { type: [String], default: [] },
    description: { type: String, required: true },
    otherVenuesOwned: { type: String }, // optional free text

    openTime: { type: String, required: true }, // "09:00"
    closeTime: { type: String, required: true }, // "22:00"

    ownerId: { type: Schema.Types.ObjectId, ref: "User" },

    // Not enforced/filtered anywhere yet — added as groundwork for a future
    // moderation flow. Every venue currently shows publicly regardless of
    // this value, since there's no admin review UI to ever move it out of
    // "pending" otherwise.
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true },
);

export const Venue = model("Venue", venueSchema);
