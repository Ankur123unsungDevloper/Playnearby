import Logo from "@/components/logo";
import ActionButton from "./_components/actionbutton";
import Search from "./_components/search";

export default function Navbar() {
  return (
    <div className="flex flex-row items-center justify-between w-full h-full p-2 gap-100">
      <Logo />
      <Search />
      <ActionButton />
    </div>
  );
}
