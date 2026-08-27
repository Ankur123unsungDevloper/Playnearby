import { Schema, model } from "mongoose";

const communitySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String }, // e.g. society/clubhouse name
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: { type: [{ type: Schema.Types.ObjectId, ref: "User" }], default: [] },
  },
  { timestamps: true },
);

export const Community = model("Community", communitySchema);
