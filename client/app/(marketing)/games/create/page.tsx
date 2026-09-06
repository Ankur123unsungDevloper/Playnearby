import { getVenues } from "@/lib/api";
import { CreateGameForm } from "@/components/CreateGameForm";

export default async function CreateGamePage() {
  // Venues fetched server-side so the form has options to pick from
  // immediately — no client-side loading state just to populate a dropdown.
  const venues = await getVenues().catch(() => []);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-16 mt-15">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Host a Game</h1>
        <p className="mt-1 text-gray-500">
          Set the details, and nearby players will see it show up instantly.
        </p>
      </div>

      <CreateGameForm venues={venues} />
    </div>
  );
}
