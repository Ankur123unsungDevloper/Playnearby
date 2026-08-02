// import Endless from "./_components/endless";
import AboutUs from "./_components/aboutUs";
import Blogs from "./_components/blogs";
import FavSport from "./_components/favSport";
import Features from "./_components/features";
import Heading from "./_components/heading";
import Heroes from "./_components/heroes";
import Services from "./_components/services";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center md:justify-start text-center w-full h-full mt-15">
      <Heading />
      <Heroes />
      <Features />
      <Services />
      <FavSport />
      {/*<Endless />*/}
      <Blogs />
      <AboutUs />
    </div>
  );
}

export default LandingPage;