import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="flex flex-row items-center justify-center bg-[#3BEA5E] text-white w-full h-full">
      <div className="flex flex-col items-start justify-center w-192.25 h-full p-4 text-start">
        <h2 className="text-6xl font-bold">
          Find Local Players.<br/>Join Games.<br/>Build Friendships.
        </h2>
        <h4 className="text-4xl font-normal max-w-150">
          Connect with nearby players for Chess, Carrom, Cards, Badminton, Table Tennis, Cricket and more.
        </h4>
        <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-4 relative right-60">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded w-30"
          >
            Find Players
          </Button>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded w-30"
          >
            Create Match
          </Button>
        </div>
      </div>
      <div className="absolute right-0 flex h-full w-full items-center justify-center p-4">
        <div className="z-10 flex h-10 w-100 items-center rounded-lg border border-white/20 bg-white/15 px-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
          <FaMapMarkerAlt className="text-xl text-white" />
          <Input
            type="text"
            placeholder="Search nearby games..."
            className="
              w-full
              border-0
              bg-transparent
              shadow-none
              focus-visible:ring-0
              focus-visible:ring-offset-0
              focus-visible:border-0
              focus:outline-none
              text-white
              placeholder:text-white/80
              text-2xl
            "
          />
        </div>
      </div>
      <div className="w-146 h-full flex items-center justify-center relative bottom-4">
        <Image
          src="/hero.svg"
          alt="Hero Image"
          width={450}
          height={250}
          className="w-full h-full p-4"
        />
      </div>
    </div>
  );
}
