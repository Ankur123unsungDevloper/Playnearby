import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatarUrl: { type: String },
    hearts: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
