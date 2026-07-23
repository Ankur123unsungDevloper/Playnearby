import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Image src="/light_logo.svg" alt="Logo" width={200} height={100} />
    </div>
  );
}