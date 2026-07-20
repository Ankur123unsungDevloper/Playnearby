import LandingPage from "./(landingPage)/page";
import Footer from "./footer/page";
import Navbar from "./navbar/page";

export default function Home() {
  return (
    <div>
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
}
