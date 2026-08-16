import { FaChessKnight } from "react-icons/fa6";
import {
  GiSoccerBall,
  GiCricketBat,
  GiShuttlecock,
  GiTennisRacket,
  GiPingPongBat,
} from "react-icons/gi";
import { MdPool } from "react-icons/md";
import { TbDisc } from "react-icons/tb";
import type { SportKey } from "@/types";

export const SPORT_ICONS: Record<SportKey, React.ReactNode> = {
  football: <GiSoccerBall />,
  cricket: <GiCricketBat />,
  badminton: <GiShuttlecock />,
  chess: <FaChessKnight />,
  carrom: <TbDisc />,
  swimming: <MdPool />,
  tennis: <GiTennisRacket />,
  table_tennis: <GiPingPongBat />,
};

// Decorative sticker-style images used on GameCard — purely a frontend asset,
// the backend has no concept of these. Drop matching files in /public/games/.
export const SPORT_IMAGES: Record<SportKey, string> = {
  football: "/games/football.png",
  cricket: "/games/cricket.png",
  badminton: "/games/badminton.png",
  chess: "/games/chess.png",
  carrom: "/games/carrom.png",
  swimming: "/games/swimming.png",
  tennis: "/games/tennis.png",
  table_tennis: "/games/table-tennis.png",
};

export const SPORT_LABELS: Record<SportKey, string> = {
  football: "Football",
  cricket: "Cricket",
  badminton: "Badminton",
  chess: "Chess",
  carrom: "Carrom",
  swimming: "Swimming",
  tennis: "Tennis",
  table_tennis: "Table Tennis",
};
