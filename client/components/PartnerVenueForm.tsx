"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SPORT_LABELS } from "@/lib/sport-meta";
import { detectCoordinatesFromAddress } from "@/lib/geocode";
import type { SportKey } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const ALL_SPORTS = Object.keys(SPORT_LABELS) as SportKey[];

const AMENITIES = [
  "Parking",
  "Restroom",
  "Drinking Water",
  "Changing Rooms",
  "Floodlights",
  "First Aid",
  "Equipment Rental",
  "Seating Area",
  "Cafeteria",
  "WiFi",
];

// Fallback if the typed address can't be geocoded — Mumbai center, so
// submission never hard-fails just because the address didn't match.
const FALLBACK_COORDS = { latitude: 19.076, longitude: 72.8777 };

type FormState = {
  name: string;
  fullAddress: string;
  address: string; // short/display address
  sports: SportKey[];
  amenities: string[];
  description: string;
  otherVenuesOwned: string;
  openTime: string;
  closeTime: string;
  imageUrl: string;
};

const emptyForm: FormState = {
  name: "",
  fullAddress: "",
  address: "",
  sports: [],
  amenities: [],
  description: "",
  otherVenuesOwned: "",
  openTime: "09:00",
  closeTime: "22:00",
  imageUrl: "",
};

export function PartnerVenueForm() {
  const { isSignedIn, getToken } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<"idle" | "geocoding" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [geocodeNote, setGeocodeNote] = useState<string | null>(null);

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-10 text-center shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <h2 className="text-lg font-bold text-gray-800">Sign in to list your venue</h2>
        <p className="max-w-sm text-sm text-gray-500">
          We&apos;ll link this listing to your account so you can manage it later.
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

  function toggleSport(sport: SportKey) {
    setForm((f) => ({
      ...f,
      sports: f.sports.includes(sport) ? f.sports.filter((s) => s !== sport) : [...f.sports, sport],
    }));
  }

  function toggleAmenity(amenity: string) {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(amenity)
        ? f.amenities.filter((a) => a !== amenity)
        : [...f.amenities, amenity],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setGeocodeNote(null);

    if (!form.name.trim()) return setErrorMessage("Venue name is required.");
    if (!form.fullAddress.trim()) return setErrorMessage("Full address is required.");
    if (!form.address.trim()) return setErrorMessage("A short display address is required.");
    if (form.sports.length === 0) return setErrorMessage("Pick at least one sport.");
    if (!form.description.trim()) return setErrorMessage("A description is required.");
    if (!form.openTime || !form.closeTime) return setErrorMessage("Opening and closing time are required.");

    setStatus("geocoding");
    let coords = FALLBACK_COORDS;
    try {
      coords = await detectCoordinatesFromAddress(form.fullAddress);
    } catch {
      setGeocodeNote(
        "Couldn't pinpoint that exact address on the map — using an approximate city location for now. You can refine this later.",
      );
    }

    setStatus("submitting");
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/venues`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: form.name.trim(),
          fullAddress: form.fullAddress.trim(),
          address: form.address.trim(),
          latitude: coords.latitude,
          longitude: coords.longitude,
          images: form.imageUrl.trim() ? [form.imageUrl.trim()] : [],
          sports: form.sports,
          amenities: form.amenities,
          description: form.description.trim(),
          otherVenuesOwned: form.otherVenuesOwned.trim() || undefined,
          openTime: form.openTime,
          closeTime: form.closeTime,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}) as { error?: unknown });
        throw new Error(typeof body.error === "string" ? body.error : "Couldn't submit your venue.");
      }

      const venue = (await res.json()) as { _id: string };
      router.push(`/venues/${venue._id}`);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const busy = status === "geocoding" || status === "submitting";

  return (
    <form
      id="venue-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:p-8"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Venue name</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="FerroHub Sports | Millers"
        />
      </div>

      {/* 1. Address — two distinct values */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="fullAddress">Full address</Label>
        <p className="text-xs text-gray-500">
          The complete address, exactly as you&apos;d write it for a delivery or a taxi driver.
        </p>
        <textarea
          id="fullAddress"
          value={form.fullAddress}
          onChange={(e) => update("fullAddress", e.target.value)}
          rows={3}
          placeholder="Dr. Babasaheb Ambedkar School and College, PL Lokhande Marg, next to Chembur Railway Station, Chembur West, Mumbai, Maharashtra 400089"
          className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="address">Short / display address</Label>
        <p className="text-xs text-gray-500">
          A shorter version shown on venue cards and search results.
        </p>
        <Input
          id="address"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          placeholder="Chamundi Hotel Compound, Andheri, Mumbai"
        />
      </div>

      {/* 2. Sports available */}
      <div className="flex flex-col gap-2">
        <Label>Sports available</Label>
        <div className="flex flex-wrap gap-2">
          {ALL_SPORTS.map((sport) => {
            const active = form.sports.includes(sport);
            return (
              <button
                key={sport}
                type="button"
                onClick={() => toggleSport(sport)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {SPORT_LABELS[sport]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Amenities */}
      <div className="flex flex-col gap-2">
        <Label>Amenities</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {AMENITIES.map((amenity) => {
            const active = form.amenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                  active ? "bg-primary/10 text-primary ring-1 ring-primary" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {amenity}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Description */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={4}
          placeholder="Tell players what makes this venue worth coming to — surface type, court count, lighting, coaching available, etc."
          className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      {/* 5. Other venues owned */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="otherVenuesOwned">Other venues you own (optional)</Label>
        <Input
          id="otherVenuesOwned"
          value={form.otherVenuesOwned}
          onChange={(e) => update("otherVenuesOwned", e.target.value)}
          placeholder="e.g. Also run Green Turf Grounds in Malad"
        />
      </div>

      {/* 6. Timing */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="openTime">Opens at</Label>
          <Input
            id="openTime"
            type="time"
            value={form.openTime}
            onChange={(e) => update("openTime", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="closeTime">Closes at</Label>
          <Input
            id="closeTime"
            type="time"
            value={form.closeTime}
            onChange={(e) => update("closeTime", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="imageUrl">Photo URL (optional)</Label>
        <p className="text-xs text-gray-500">
          No file upload yet — paste a link to a photo for now.
        </p>
        <Input
          id="imageUrl"
          value={form.imageUrl}
          onChange={(e) => update("imageUrl", e.target.value)}
          placeholder="https://..."
        />
      </div>

      {geocodeNote && (
        <p className="rounded-xl bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-700">{geocodeNote}</p>
      )}
      {errorMessage && (
        <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{errorMessage}</p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={busy}
        className="h-13 w-full rounded-full bg-primary text-base font-bold text-white hover:bg-primary disabled:opacity-60"
      >
        {status === "geocoding" ? "Finding your venue on the map..." : status === "submitting" ? "Submitting..." : "Submit Venue"}
      </Button>
    </form>
  );
}
