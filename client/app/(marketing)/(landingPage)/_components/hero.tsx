import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-row items-center justify-center bg-[#3BEA5E] text-white w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-full p-4 text-start">
        <h2 className="text-6xl font-bold">
          Find Local Players.<br />Join Games.<br />Build Friendships.
        </h2>
        <h4 className="text-4xl font-normal">Connect with nearby players for Chess, Carrom, Cards, Badminton, Table Tennis, Cricket and more.</h4>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <Image src="/hero.svg" alt="Hero Image" width={500} height={300} className="w-full h-full p-4" />
      </div>
    </div>
  );
}
