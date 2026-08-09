"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { User, Trophy, CalendarClock, MapPin, History, Settings } from "lucide-react";

export type ProfileSection =
  | "overview"
  | "sports"
  | "availability"
  | "locations"
  | "history"
  | "settings";

const NAV_ITEMS: { id: ProfileSection; label: string; icon: typeof User }[] = [
  { id: "overview", label: "Overview", icon: User },
  { id: "sports", label: "Sports & Skill", icon: Trophy },
  { id: "availability", label: "Availability", icon: CalendarClock },
  { id: "locations", label: "Locations", icon: MapPin },
  { id: "history", label: "Play History", icon: History },
  { id: "settings", label: "Account Settings", icon: Settings },
];

function getInitials(name?: string | null) {
  if (!name) return "U";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default function ProfileSidebar({
  active,
  onChange,
}: {
  active: ProfileSection;
  onChange: (section: ProfileSection) => void;
}) {
  const { user } = useUser();

  return (
    <aside className="flex w-full flex-col gap-4 lg:w-72 lg:shrink-0">
      {/* mini profile card */}
      <div className="rounded-2xl border border-primary/10 bg-white p-5 text-center shadow-sm">
        <Avatar className="mx-auto h-20 w-20 ring-4 ring-primary/15">
          <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? "Your profile"} />
          <AvatarFallback className="bg-primary text-xl font-semibold text-white">
            {getInitials(user?.fullName)}
          </AvatarFallback>
        </Avatar>
        <h2 className="mt-3 truncate text-base font-bold text-gray-900">
          {user?.fullName ?? "Your Name"}
        </h2>
        <p className="truncate text-sm text-gray-500">
          {user?.primaryEmailAddress?.emailAddress ?? "you@example.com"}
        </p>
        <Badge className="mt-3 bg-primary/10 text-primary hover:bg-primary/10">
          Intermediate Player
        </Badge>
        <Button
          size="sm"
          variant="outline"
          className="mt-4 w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white"
          onClick={() => onChange("overview")}
        >
          Edit Profile
        </Button>
      </div>

      {/* section nav */}
      <nav className="rounded-2xl border border-primary/10 bg-white p-2 shadow-sm">
        <ul className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <li key={id} className="shrink-0 lg:shrink">
                <button
                  onClick={() => onChange(id)}
                  className={cn(
                    "flex w-full items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-primary")} />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}