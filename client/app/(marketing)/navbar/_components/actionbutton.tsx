import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ActionButton() {
  return (
    <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-4">
      <Button
        size="lg"
        className="bg-primary hover:bg-white hover:border-primary text-white hover:text-primary font-bold py-2 px-4 rounded w-30"
      >
        <Link href="/sign-in">
          Login
        </Link>
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-white font-bold py-2 px-4 rounded w-30"
      >
        <Link href="/sign-out">
          Logout
        </Link>
      </Button>
    </div>
  );
}
