"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SPORT_LABELS } from "@/lib/sport-meta";
import type { SportKey, Venue } from "@/types";
import { MdSportsHandball } from "react-icons/md";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const SPORT_OPTIONS = Object.entries(SPORT_LABELS) as [SportKey, string][];

type FormState = {
  sport: SportKey | "";
  venueId: string; // "" means no specific venue
  format: string;
  level: string;
  stateTag: string;
  startsAt: string; // datetime-local value
  endsAt: string; // datetime-local value
  capacity: string; // kept as string while typing, parsed on submit
};

const initialState: FormState = {
  sport: "",
  venueId: "",
  format: "",
  level: "",
  stateTag: "",
  startsAt: "",
  endsAt: "",
  capacity: "10",
};

export function CreateGameForm({ venues }: { venues: Venue[] }) {
  const { isSignedIn, getToken } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-10 text-center shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-3xl text-primary">
          <MdSportsHandball />
        </div>
        <h2 className="text-lg font-bold text-gray-800">Sign in to host a game</h2>
        <p className="max-w-sm text-sm text-gray-500">
          You need an account so players can see who&apos;s running the game and message you.
        </p>
        <SignInButton mode="modal">
          <button className="rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-md transition-transform duration-300 hover:scale-[1.02]">
            Sign In
          </button>
        </SignInButton>
      </div>
    );
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (!form.sport) return setErrorMessage("Pick a sport.");
    if (!form.format.trim()) return setErrorMessage("Format is required (e.g. \"Doubles · Regular\").");
    if (!form.level.trim()) return setErrorMessage("Skill level is required.");
    if (!form.startsAt || !form.endsAt) return setErrorMessage("Start and end time are required.");

    const startsAt = new Date(form.startsAt);
    const endsAt = new Date(form.endsAt);
    if (endsAt <= startsAt) return setErrorMessage("End time has to be after the start time.");

    const capacity = Number(form.capacity);
    if (!Number.isInteger(capacity) || capacity < 2 || capacity > 50) {
      return setErrorMessage("Capacity has to be a whole number between 2 and 50.");
    }

    setStatus("submitting");
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sport: form.sport,
          format: form.format.trim(),
          level: form.level.trim(),
          stateTag: form.stateTag.trim() || undefined,
          startsAt: startsAt.toISOString(),
          endsAt: endsAt.toISOString(),
          capacity,
          venueId: form.venueId || undefined,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}) as { error?: unknown });
        const message =
          typeof body.error === "string" ? body.error : "Couldn't create the game — check the form and try again.";
        throw new Error(message);
      }

      const game = (await res.json()) as { id: string };
      router.push(`/games/${game.id}`);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="sport">Sport</Label>
          <Select value={form.sport} onValueChange={(v) => update("sport", v as SportKey)}>
            <SelectTrigger id="sport" className="w-full">
              <SelectValue placeholder="Choose a sport" />
            </SelectTrigger>
            <SelectContent>
              {SPORT_OPTIONS.map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="venue">Venue (optional)</Label>
          <Select value={form.venueId} onValueChange={(v) => update("venueId", v)}>
            <SelectTrigger id="venue" className="w-full">
              <SelectValue placeholder="No specific venue" />
            </SelectTrigger>
            <SelectContent>
              {venues.map((venue) => (
                <SelectItem key={venue.id} value={venue.id}>
                  {venue.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="format">Format</Label>
          <Input
            id="format"
            value={form.format}
            onChange={(e) => update("format", e.target.value)}
            placeholder="Doubles · Regular"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="level">Skill level</Label>
          <Input
            id="level"
            value={form.level}
            onChange={(e) => update("level", e.target.value)}
            placeholder="Beginner - Professional"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="startsAt">Starts</Label>
          <Input
            id="startsAt"
            type="datetime-local"
            value={form.startsAt}
            onChange={(e) => update("startsAt", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="endsAt">Ends</Label>
          <Input
            id="endsAt"
            type="datetime-local"
            value={form.endsAt}
            onChange={(e) => update("endsAt", e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            min={2}
            max={50}
            value={form.capacity}
            onChange={(e) => update("capacity", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="stateTag">State tag (optional)</Label>
          <Input
            id="stateTag"
            value={form.stateTag}
            onChange={(e) => update("stateTag", e.target.value)}
            placeholder="MH"
          />
        </div>
      </div>

      {errorMessage && (
        <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{errorMessage}</p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="h-13 w-full rounded-full bg-primary text-base font-bold text-white hover:bg-primary disabled:opacity-60"
      >
        {status === "submitting" ? "Creating..." : "Host This Game"}
      </Button>
    </form>
  );
}
