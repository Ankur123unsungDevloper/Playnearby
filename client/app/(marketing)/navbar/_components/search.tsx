import { Input } from "@/components/ui/input";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Search() {
  return (
    <div className="flex flex-row items-center justify-between w-full h-full">
      <div className="z-10 flex h-10 w-100 items-center rounded-lg overflow-hidden border border-primary/20 bg-primary/15 px-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
          <FaMapMarkerAlt className="text-xl text-primary" />
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
              text-primary
              placeholder:text-primary/80
              text-2xl
              rounded-lg
            "
          />
        </div>
    </div>
  );
}
