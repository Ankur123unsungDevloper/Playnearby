import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lng = req.nextUrl.searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }

  // Nominatim's usage policy requires a descriptive User-Agent identifying
  // the app. Browsers refuse to let client-side fetch() set that header at
  // all — routing this through a server-side Route Handler is specifically
  // so this request can actually comply with that policy.
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
    { headers: { "User-Agent": "PlayNearby/1.0 (development)" } },
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Reverse geocoding failed" }, { status: 502 });
  }

  const data = await res.json();
  const address = data.address ?? {};
  const city: string | undefined =
    address.city ?? address.town ?? address.municipality ?? address.state_district ?? address.county;

  if (!city) {
    return NextResponse.json({ error: "Could not determine city from this location" }, { status: 404 });
  }

  return NextResponse.json({ city });
}
