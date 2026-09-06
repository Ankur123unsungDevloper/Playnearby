import { Navbar } from "../_components/navbar/page";
import Heading from "../_components/heading";
import Hero from "../_components/hero";
import { Footer } from "../_components/footer/page";

export default function PartnerWithUsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <Heading />
      <Hero />
      <Footer />
    </div>
  );
}
