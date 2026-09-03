"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { detectCitySlug } from "@/lib/geocode";

const DEFAULT_CITY = "mumbai";
const STORAGE_KEY = "playnearby_city";

export function useCityRedirect(pathSuffix: string) {
  const router = useRouter();
  const [message, setMessage] = useState("Finding your location…");

  useEffect(() => {
    const cached = sessionStorage.getItem(STORAGE_KEY);
    if (cached) {
      router.replace(`/${cached}${pathSuffix}`);
      return;
    }

    if (!("geolocation" in navigator)) {
      router.replace(`/${DEFAULT_CITY}${pathSuffix}`);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          setMessage("Figuring out your city…");
          const city = await detectCitySlug(pos.coords.latitude, pos.coords.longitude);
          sessionStorage.setItem(STORAGE_KEY, city);
          router.replace(`/${city}${pathSuffix}`);
        } catch {
          router.replace(`/${DEFAULT_CITY}${pathSuffix}`);
        }
      },
      () => router.replace(`/${DEFAULT_CITY}${pathSuffix}`),
      { enableHighAccuracy: true, timeout: 8000 },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return message;
}
