export function citySlug(city: string): string {
  return city.trim().toLowerCase().replace(/\s+/g, "-");
}

export function cityLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Calls our own Route Handler (app/api/reverse-geocode) rather than
// Nominatim directly — see that route for why.
export async function detectCitySlug(lat: number, lng: number): Promise<string> {
  const res = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`);
  if (!res.ok) throw new Error("Could not detect city");
  const data = await res.json();
  return citySlug(data.city);
}
// Add this function to your existing lib/geocode.ts (alongside citySlug,
// cityLabel, detectCitySlug — don't remove those).

export async function detectCoordinatesFromAddress(
  address: string,
): Promise<{ latitude: number; longitude: number }> {
  const res = await fetch(`/api/geocode-address?address=${encodeURIComponent(address)}`);
  if (!res.ok) throw new Error("Could not find coordinates for this address");
  return res.json();
}
