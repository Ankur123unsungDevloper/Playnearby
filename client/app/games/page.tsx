"use client";

import Link from "next/link";
import { useCityRedirect } from "@/hooks/use-city-redirect";
import { AppNavbar } from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";

export default function GamesLocationGate() {
  const message = useCityRedirect("/games");

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AppNavbar />
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="text-sm font-semibold text-gray-500">{message}</p>
        </div>
        {/* Manual escape hatch — in case geolocation hangs or the browser never resolves the prompt */}
        <Link href="/mumbai/games" className="text-xs font-semibold text-primary underline underline-offset-2">
          Skip and browse Mumbai instead
        </Link>
      </div>
      <AppFooter />
    </div>
  );
}