// import Bento from "./_components/bento";
// import Endless from "./_components/endless";
import Features from "./_components/features";
import Heading from "./_components/heading";
import Heroes from "./_components/heroes";
import Services from "./_components/services";
// import Heroine from "./_components/heroine";
// import IgnoreTools from "./_components/ignoretools";
// import Partner from "./_components/partner";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center md:justify-start text-center w-full h-full mt-15">
      <Heading />
      <Heroes />
      <Features />
      <Services />
      {/*<Bento />
      <Endless />
      <Heroine /> */}
    </div>
  );
}

export default LandingPage;