import { Button } from "@/components/ui/button";

export default function ActionButton() {
  return (
    <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-4">
      <Button
        size="lg"
        className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded w-30"
      >
        Login
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="border-primary text-primary hover:text-[#3BEA5E] font-bold py-2 px-4 rounded w-30"
      >
        Logout
      </Button>
    </div>
  );
}
