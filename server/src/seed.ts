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

  // Clear out previous seed runs so re-running this doesn't pile up duplicates
  await Promise.all([
    Venue.deleteMany({}),
    GameSession.deleteMany({}),
    PlayRequest.deleteMany({}),
  ]);

  const demoUsers = [
    { clerkId: "seed_demo_host", name: "Ankur", avatarUrl: "https://github.com/shadcn.png", hearts: 485 },
    { clerkId: "seed_demo_buddy", name: "Riya", avatarUrl: "https://i.pravatar.cc/80?img=32", hearts: 210 },
    { clerkId: "seed_demo_sam", name: "Sam", avatarUrl: "https://i.pravatar.cc/80?img=5", hearts: 340 },
    { clerkId: "seed_demo_neha", name: "Neha", avatarUrl: "https://i.pravatar.cc/80?img=47", hearts: 1120 },
  ];

  const users = [];
  for (const u of demoUsers) {
    users.push(
      await User.findOneAndUpdate({ clerkId: u.clerkId }, u, { upsert: true, new: true }),
    );
  }
  const [host, buddy, sam, neha] = users;

  const venuesData = [
    {
      name: "FerroHub Sports | Millers",
      address: "16/A, Millers Rd, above Metro Station, Mumbai",
      latitude: 19.1017, longitude: 72.8342,
      rating: 3.83, reviewCount: 6, featured: true,
      images: ["/venues/chess.jpg"], sports: ["chess", "cricket"],
    },
    {
      name: "Depot18 - Sports",
      address: "Chamundi Hotel Compound, Andheri, Mumbai",
      latitude: 19.1136, longitude: 72.8593,
      rating: 4.44, reviewCount: 18, featured: true,
      images: ["/venues/chess.jpg"], sports: ["football", "badminton", "tennis"],
    },
    {
      name: "Terra Arena",
      address: "M.G. Railway Colony, Powai, Mumbai",
      latitude: 19.1176, longitude: 72.906,
      rating: 3.64, reviewCount: 14, featured: true,
      images: ["/venues/chess.jpg"], sports: ["football", "table_tennis", "badminton", "cricket"],
    },
    {
      name: "Wellness Sports Inc",
      address: "#1, Bhavya Plaza, Bandra West, Mumbai",
      latitude: 19.0596, longitude: 72.8295,
      rating: 4.5, reviewCount: 8, featured: false,
      images: ["/venues/chess.jpg"], sports: ["tennis"],
    },
    {
      name: "PLAY4ALL Arena",
      address: "Juhu Tara Rd, Juhu, Mumbai",
      latitude: 19.1075, longitude: 72.8263,
      rating: 4.1, reviewCount: 22, featured: true,
      images: ["/venues/chess.jpg"], sports: ["football", "cricket"],
    },
    {
      name: "Smash Court Badminton",
      address: "LBS Marg, Kurla West, Mumbai",
      latitude: 19.0728, longitude: 72.8826,
      rating: 4.28, reviewCount: 31, featured: false,
      images: ["/venues/chess.jpg"], sports: ["badminton", "table_tennis"],
    },
    {
      name: "Chembur Chess & Carrom Club",
      address: "Diamond Garden Rd, Chembur, Mumbai",
      latitude: 19.0522, longitude: 72.9005,
      rating: 4.62, reviewCount: 11, featured: false,
      images: ["/venues/chess.jpg"], sports: ["chess", "carrom"],
    },
    {
      name: "Aqua Sports Complex",
      address: "Santacruz East, Mumbai",
      latitude: 19.0822, longitude: 72.8412,
      rating: 3.95, reviewCount: 9, featured: false,
      images: ["/venues/chess.jpg"], sports: ["swimming"],
    },
    {
      name: "Green Turf Grounds",
      address: "Malad West, Mumbai",
      latitude: 19.1868, longitude: 72.8489,
      rating: 4.05, reviewCount: 27, featured: true,
      images: ["/venues/chess.jpg"], sports: ["football", "cricket"],
    },
    {
      name: "Elite Tennis Academy",
      address: "Goregaon East, Mumbai",
      latitude: 19.1653, longitude: 72.8526,
      rating: 4.7, reviewCount: 15, featured: false,
      images: ["/venues/chess.jpg"], sports: ["tennis", "badminton"],
    },
  ];

  const venues = [];
  for (const v of venuesData) {
    venues.push(await Venue.create(v));
  }

  const hoursFromNow = (h: number) => new Date(Date.now() + h * 60 * 60 * 1000);
  const hosts = [host, buddy, sam, neha];

  const gamesData = [
    { sport: "chess", format: "Doubles · Regular", level: "Amateur - Professional", stateTag: "MH", capacity: 4, startsAt: hoursFromNow(26), endsAt: hoursFromNow(28), venueId: venues[0]._id, hostId: hosts[0]._id },
    { sport: "football", format: "7 A Side · Regular", level: "Beginner - Professional", capacity: 14, startsAt: hoursFromNow(30), endsAt: hoursFromNow(31), venueId: venues[1]._id, hostId: hosts[1]._id },
    { sport: "badminton", format: "Singles · Regular", level: "Intermediate", capacity: 2, startsAt: hoursFromNow(20), endsAt: hoursFromNow(21), venueId: venues[1]._id, hostId: hosts[2]._id },
    { sport: "cricket", format: "Box Cricket", level: "Beginner - Professional", capacity: 12, startsAt: hoursFromNow(48), endsAt: hoursFromNow(50), venueId: venues[4]._id, hostId: hosts[0]._id },
    { sport: "table_tennis", format: "Singles · Regular", level: "Amateur", capacity: 2, startsAt: hoursFromNow(15), endsAt: hoursFromNow(16), venueId: venues[5]._id, hostId: hosts[3]._id },
    { sport: "carrom", format: "Doubles · Casual", level: "Beginner - Professional", stateTag: "MH", capacity: 4, startsAt: hoursFromNow(18), endsAt: hoursFromNow(19), venueId: venues[6]._id, hostId: hosts[1]._id },
    { sport: "swimming", format: "Freestyle Practice", level: "Intermediate", capacity: 6, startsAt: hoursFromNow(40), endsAt: hoursFromNow(41), venueId: venues[7]._id, hostId: hosts[2]._id },
    { sport: "football", format: "5 A Side · Regular", level: "Amateur - Professional", capacity: 10, startsAt: hoursFromNow(60), endsAt: hoursFromNow(61), venueId: venues[8]._id, hostId: hosts[3]._id },
    { sport: "tennis", format: "Singles · Regular", level: "Advanced", capacity: 2, startsAt: hoursFromNow(24), endsAt: hoursFromNow(25), venueId: venues[9]._id, hostId: hosts[0]._id },
    { sport: "badminton", format: "Doubles · Regular", level: "Beginner - Professional", capacity: 4, startsAt: hoursFromNow(36), endsAt: hoursFromNow(37), venueId: venues[9]._id, hostId: hosts[1]._id },
  ];

  for (const g of gamesData) {
    await GameSession.create(g);
  }

  await PlayRequest.create({
    requesterId: host._id,
    recipientId: buddy._id,
    gameType: "badminton",
    preferredLocation: "society_clubhouse",
    message: "Up for badminton this weekend?",
  });

  console.log(`Seeded ${users.length} users, ${venues.length} venues, ${gamesData.length} games, 1 play request.`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
