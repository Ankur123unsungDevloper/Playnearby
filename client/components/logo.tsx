import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image src="/light_logo.svg" alt="Logo" width={260} height={200} />
    </div>
  );
}