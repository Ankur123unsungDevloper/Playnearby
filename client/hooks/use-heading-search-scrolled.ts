"use client";

import { useEffect, useState } from "react";

export function useHeadingSearchScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const trigger = document.getElementById("heading-search");

      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();

      setScrolled(rect.top <= 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrolled;
}