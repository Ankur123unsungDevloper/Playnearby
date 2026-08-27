import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./db.js";
import { User } from "./models/User.js";
import { Venue } from "./models/Venue.js";
import { GameSession } from "./models/GameSession.js";
import { PlayRequest } from "./models/PlayRequest.js";

async function main() {
  await connectDB();
  console.log("Seeding...");

  const host = await User.findOneAndUpdate(
    { clerkId: "seed_demo_host" },
    { clerkId: "seed_demo_host", name: "Ankur", avatarUrl: "https://github.com/shadcn.png", hearts: 485 },
    { upsert: true, new: true },
  );
  const buddy = await User.findOneAndUpdate(
    { clerkId: "seed_demo_buddy" },
    { clerkId: "seed_demo_buddy", name: "Riya", avatarUrl: "https://i.pravatar.cc/80?img=32", hearts: 210 },
    { upsert: true, new: true },
  );

  const venue = await Venue.create({
    name: "FerroHub Sports | Millers",
    address: "16/A, Millers Rd, above Metro Station, Mumbai",
    latitude: 19.1017,
    longitude: 72.8342,
    rating: 3.83,
    reviewCount: 6,
    featured: true,
    images: ["/venues/chess.jpg"],
    sports: ["chess", "cricket"],
  });

  await GameSession.create({
    sport: "chess",
    format: "Doubles · Regular",
    level: "Amateur - Professional",
    stateTag: "MH",
    capacity: 4,
    startsAt: new Date(Date.now() + 26 * 60 * 60 * 1000),
    endsAt: new Date(Date.now() + 28 * 60 * 60 * 1000),
    venueId: venue._id,
    hostId: host._id,
  });

  await PlayRequest.create({
    requesterId: host._id,
    recipientId: buddy._id,
    gameType: "badminton",
    preferredLocation: "society_clubhouse",
    message: "Up for badminton this weekend?",
  });

  console.log("Seeded 2 users, 1 venue, 1 game, 1 play request.");
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
