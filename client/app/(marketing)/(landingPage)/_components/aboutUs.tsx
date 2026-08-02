import CommunityGallery from "@/components/CommunityGallery";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <div className="flex items-center justify-center text-center w-full h-full mt-15">
      <div className="flex flex-row items-center justify-between w-full h-full max-w-7xl p-4 md:p-14 bg-white rounded-4xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] gap-10">
        <div className="flex flex-col w-full h-full items-center justify-center text-center max-w-md">
          <CommunityGallery />
        </div>
        <div className="flex flex-col w-full h-full items-center justify-center max-w-131.5 gap-4">
          <h2 className=" text-left self-stretch font-bold leading-[1.58] text-main text-2xl ">About Us</h2>
          <p className="text-base leading-normal text-[#758a70] self-stretch">
            We are a team of passionate individuals dedicated to providing the best services and solutions to our clients.
          </p>
          <div className="flex flex-row items-center justify-start w-full h-full pt-5 gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary text-white text-xl font-bold py-2 px-4 rounded w-50 h-13"
            >
              Read Our Story
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white font-bold py-2 px-4 rounded w-50 h-13"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;