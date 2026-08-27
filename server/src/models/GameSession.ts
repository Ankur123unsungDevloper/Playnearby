import { Schema, model, Types } from "mongoose";

const participantSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    joinedAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const gameSessionSchema = new Schema(
  {
    sport: { type: String, required: true },
    format: { type: String, required: true },
    level: { type: String, required: true },
    stateTag: { type: String },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    capacity: { type: Number, default: 10 },
    status: {
      type: String,
      enum: ["open", "full", "cancelled", "completed"],
      default: "open",
    },
    venueId: { type: Schema.Types.ObjectId, ref: "Venue" },
    hostId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // Embedded, not a separate collection — no game will realistically have
    // thousands of players, so this stays simple instead of needing a join.
    participants: { type: [participantSchema], default: [] },
  },
  { timestamps: true },
);

export type ParticipantDoc = { _id: Types.ObjectId; userId: Types.ObjectId; joinedAt: Date };

export const GameSession = model("GameSession", gameSessionSchema);
