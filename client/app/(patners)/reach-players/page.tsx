import { AppNavbar } from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";

import Heading from "../_components/heading";
import Hero from "../_components/hero";

export default function PartnerWithUsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AppNavbar />
      <Heading />
      <Hero />
      <AppFooter />
    </div>
  );
}
