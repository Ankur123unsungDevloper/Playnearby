import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");
  if (!address) {
    return NextResponse.json({ error: "address is required" }, { status: 400 });
  }

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(address)}&limit=1`,
    { headers: { "User-Agent": "PlayNearby/1.0 (development)" } },
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Geocoding failed" }, { status: 502 });
  }

  const results = await res.json();
  if (!Array.isArray(results) || results.length === 0) {
    return NextResponse.json({ error: "Could not find coordinates for this address" }, { status: 404 });
  }

  const { lat, lon } = results[0];
  return NextResponse.json({ latitude: Number(lat), longitude: Number(lon) });
}
