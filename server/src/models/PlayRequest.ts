import { Schema, model } from "mongoose";

const playRequestSchema = new Schema(
  {
    requesterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    gameType: { type: String, required: true },
    preferredLocation: {
      type: String,
      enum: ["home", "society_clubhouse", "local_ground"],
    },
    message: { type: String },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "cancelled"],
      default: "pending",
    },
    respondedAt: { type: Date },
  },
  { timestamps: true },
);

export const PlayRequest = model("PlayRequest", playRequestSchema);
