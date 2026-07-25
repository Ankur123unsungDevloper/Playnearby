import LandingPage from "./(landingPage)/page";
import Footer from "./footer/page";
import Navbar from "./navbar/page";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center w-full h-full">
        <Navbar />
        <LandingPage />
        <Footer />
      </div>
    </div>
  );
}
