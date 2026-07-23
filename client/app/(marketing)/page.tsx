import LandingPage from "./(landingPage)/page";
import Footer from "./footer/page";
import Navbar from "./navbar/page";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
}
