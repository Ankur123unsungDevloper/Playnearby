import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-col items-start justify-center w-125 h-full">
      <Image src="/light_logo.svg" alt="Logo" width={260} height={200} />
    </div>
  );
}