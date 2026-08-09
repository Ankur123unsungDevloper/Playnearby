"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Home, Building2, Trees, Plus, AlertTriangle } from "lucide-react";

/* ---------- shared bits ---------- */

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-primary/10 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-1 text-xl font-bold text-primary">{value}</p>
    </div>
  );
}

/* ---------- Overview ---------- */

export function OverviewSection() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Profile Overview"
        description="This is what nearby players see when they find you."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Matches Played" value="24" />
        <StatCard label="Play Requests" value="8 pending" />
        <StatCard label="Member Since" value="Jan 2026" />
      </div>

      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Keep this up to date so players can find and recognize you.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" defaultValue="Ananya Verma" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="city">City / Locality</Label>
            <Input id="city" placeholder="e.g. Andheri West, Mumbai" />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell nearby players a bit about yourself..." rows={3} />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button className="rounded-full bg-primary hover:bg-primary/90">Save changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

/* ---------- Sports & Skill ---------- */

const SPORTS = [
  { name: "Badminton", emoji: "🏸", type: "Indoor" },
  { name: "Table Tennis", emoji: "🏓", type: "Indoor" },
  { name: "Volleyball", emoji: "🏐", type: "Indoor" },
  { name: "Yoga", emoji: "🧘‍♀️", type: "Indoor" },
  { name: "Tennis", emoji: "🎾", type: "Outdoor" },
  { name: "Football", emoji: "⚽", type: "Outdoor" },
  { name: "Basketball", emoji: "🏀", type: "Outdoor" },
  { name: "Running", emoji: "🏃‍♀️", type: "Outdoor" },
] as const;

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

export function SportsSkillsSection() {
  const [selected, setSelected] = useState<string[]>(["Badminton", "Yoga"]);
  const [skill, setSkill] = useState<(typeof SKILL_LEVELS)[number]>("Intermediate");

  const toggleSport = (name: string) => {
    setSelected((prev) => (prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]));
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Sports & Skill Level"
        description="Pick every game you're up for — this drives who you get matched with."
      />

      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle>Preferred Games</CardTitle>
          <CardDescription>Indoor and outdoor, mix and match as many as you like.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {SPORTS.map((sport) => {
              const isSelected = selected.includes(sport.name);
              return (
                <button
                  key={sport.name}
                  onClick={() => toggleSport(sport.name)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    isSelected
                      ? "border-primary bg-primary text-white shadow-sm"
                      : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary"
                  )}
                >
                  <span>{sport.emoji}</span>
                  {sport.name}
                  <span className={cn("text-xs", isSelected ? "text-white/70" : "text-gray-400")}>
                    · {sport.type}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle>Skill Level</CardTitle>
          <CardDescription>Be honest — it makes for a much better match.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="inline-flex rounded-full border border-primary/15 bg-primary/5 p-1">
            {SKILL_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => setSkill(level)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                  skill === level ? "bg-primary text-white shadow-sm" : "text-gray-600 hover:text-primary"
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- Availability ---------- */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIME_SLOTS = [
  { label: "Morning", time: "6 AM – 10 AM" },
  { label: "Afternoon", time: "12 PM – 4 PM" },
  { label: "Evening", time: "5 PM – 9 PM" },
];

export function AvailabilitySection() {
  const [days, setDays] = useState<string[]>(["Sat", "Sun"]);
  const [slots, setSlots] = useState<string[]>(["Evening"]);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Availability"
        description="Tell other players when you're usually free to play."
      />

      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle>Days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => toggle(days, setDays, day)}
                className={cn(
                  "h-11 w-14 rounded-xl border text-sm font-semibold transition-colors",
                  days.includes(day)
                    ? "border-primary bg-primary text-white shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary"
                )}
              >
                {day}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle>Time of Day</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          {TIME_SLOTS.map((slot) => {
            const isSelected = slots.includes(slot.label);
            return (
              <button
                key={slot.label}
                onClick={() => toggle(slots, setSlots, slot.label)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-colors",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 bg-white hover:border-primary/40"
                )}
              >
                <p className={cn("font-semibold", isSelected ? "text-primary" : "text-gray-800")}>
                  {slot.label}
                </p>
                <p className="text-xs text-gray-500">{slot.time}</p>
              </button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- Locations ---------- */

const LOCATION_ICONS = { Home, "Society Clubhouse": Building2, "Local Ground": Trees } as const;

export function LocationsSection() {
  const [locations, setLocations] = useState([
    { name: "Home", enabled: true, note: "" },
    { name: "Society Clubhouse", enabled: true, note: "Green Valley Society" },
    { name: "Local Ground", enabled: false, note: "" },
  ]);

  const toggleLocation = (name: string) => {
    setLocations((prev) => prev.map((l) => (l.name === name ? { ...l, enabled: !l.enabled } : l)));
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Playing Locations"
        description="Choose where you're comfortable meeting other players."
      />

      <div className="flex flex-col gap-3">
        {locations.map((loc) => {
          const Icon = LOCATION_ICONS[loc.name as keyof typeof LOCATION_ICONS];
          return (
            <Card key={loc.name} className="border-primary/10">
              <CardContent className="flex items-center gap-4 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900">{loc.name}</p>
                  <p className="truncate text-xs text-gray-500">{loc.note || "No details added"}</p>
                </div>
                <Switch checked={loc.enabled} onCheckedChange={() => toggleLocation(loc.name)} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button variant="outline" className="w-fit rounded-full border-dashed border-primary text-primary hover:bg-primary/5">
        <Plus className="mr-1 h-4 w-4" />
        Add another location
      </Button>
    </div>
  );
}

/* ---------- Play History ---------- */

const HISTORY = [
  { sport: "Badminton", emoji: "🏸", withWhom: "Priya S.", date: "Aug 4, 2026", location: "Society Clubhouse", status: "Completed" },
  { sport: "Tennis", emoji: "🎾", withWhom: "Meera K.", date: "Aug 10, 2026", location: "Local Ground", status: "Upcoming" },
  { sport: "Yoga", emoji: "🧘‍♀️", withWhom: "Community Group", date: "Jul 28, 2026", location: "Home", status: "Completed" },
  { sport: "Basketball", emoji: "🏀", withWhom: "Ananya R.", date: "Jul 20, 2026", location: "Local Ground", status: "Cancelled" },
] as const;

const STATUS_STYLES: Record<string, string> = {
  Completed: "bg-primary/10 text-primary",
  Upcoming: "bg-blue-50 text-blue-600",
  Cancelled: "bg-gray-100 text-gray-500",
};

export function HistorySection() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="Play History" description="Your past and upcoming matches, all in one place." />

      <div className="flex flex-col gap-3">
        {HISTORY.map((item, i) => (
          <Card key={i} className="border-primary/10">
            <CardContent className="flex items-center gap-4 py-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl">
                {item.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">
                  {item.sport} with {item.withWhom}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {item.date} · {item.location}
                </p>
              </div>
              <Badge className={cn("shrink-0 hover:bg-current", STATUS_STYLES[item.status])}>
                {item.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------- Account Settings ---------- */

export function SettingsSection() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="Account Settings" description="Control notifications and your account." />

      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col divide-y divide-gray-100">
          {[
            { label: "Email notifications", desc: "Play requests and match confirmations" },
            { label: "Push notifications", desc: "Real-time alerts on your phone" },
            { label: "Show my profile to nearby players", desc: "Turn off to go invisible in search" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{row.label}</p>
                <p className="text-xs text-gray-500">{row.desc}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-red-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-4 w-4" />
            Danger Zone
          </CardTitle>
          <CardDescription>Deleting your account removes your profile and history permanently.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="destructive" className="rounded-full">
            Delete account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}