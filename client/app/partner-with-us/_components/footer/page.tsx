import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-black/5 bg-gray-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-10 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-bold text-gray-800">PlayNearby</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
          <Link href="/games" className="transition-colors hover:text-primary">
            Games
          </Link>
          <Link href="/venues" className="transition-colors hover:text-primary">
            Venues
          </Link>
          <Link href="/communities" className="transition-colors hover:text-primary">
            Communities
          </Link>
          <Link href="/play-requests" className="transition-colors hover:text-primary">
            Play Requests
          </Link>
        </div>
      </div>
    </footer>
  );
}
