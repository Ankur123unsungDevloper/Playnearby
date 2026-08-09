"use client";

import { useState } from "react";
import ProfileSidebar, { ProfileSection } from "./_components/profileSidebar";
import {
  OverviewSection,
  SportsSkillsSection,
  AvailabilitySection,
  LocationsSection,
  HistorySection,
  SettingsSection,
} from "./_components/profileSections";
import Navbar from "../navbar/page";
import Footer from "../footer/page";

export default function ProfilePage() {
  const [active, setActive] = useState<ProfileSection>("overview");

  return (
    // pt-28 clears your fixed navbar — adjust to match its actual rendered height.
    <div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-28 lg:flex-row lg:items-start lg:px-6">
        <Navbar />
        <ProfileSidebar active={active} onChange={setActive} />

        <main className="min-w-0 flex-1">
          {active === "overview" && <OverviewSection />}
          {active === "sports" && <SportsSkillsSection />}
          {active === "availability" && <AvailabilitySection />}
          {active === "locations" && <LocationsSection />}
          {active === "history" && <HistorySection />}
          {active === "settings" && <SettingsSection />}
        </main>
      </div>
      <Footer />
    </div>
  );
}