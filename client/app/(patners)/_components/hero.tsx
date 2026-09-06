import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

import {
  MdGroups,
  MdEventAvailable,
  MdOutlinePayments
} from "react-icons/md";


const VALUE_PROPS = [
  {
    icon: <MdGroups className="h-30 w-30 text-white" />,
    title: "Reach more players",
    body: "Your venue shows up to nearby players actively looking for a place to play, not just people who already knew you existed.",
    link: "/reach-players",
  },
  {
    icon: <MdEventAvailable className="h-30 w-30 text-white" />,
    title: "Fill more empty slots",
    body: "Hosted games at your venue bring in groups, not just individuals — more of your available time gets booked.",
    link: "/partner-with-us#form",
  },
  {
    icon: <MdOutlinePayments className="h-30 w-30 text-white" />,
    title: "Zero listing fees",
    body: "Listing your venue is free. There's no cost to get discovered.",
    link: "/partner-with-us#form",
  },
];


const Hero = () => {
  return (
    <div className="flex flex-col w-full p-20 relative bottom-50">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {VALUE_PROPS.map((v) => (
          <Card
            key={v.title}
            className="
              relative mx-auto w-full h-full max-w-sm overflow-hidden rounded-3xl pt-0 shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(0,0,0,0.18)] "
          >
            {/* Image Overlay */}
            <div className="flex items-center justify-center w-full h-40 bg-linear-to-b from-primary/80 to-transparent z-10">
              {v.icon}
            </div>
            <CardHeader className="flex-1">
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle className="text-xl font-bold">{v.title}</CardTitle>
              <CardDescription className="text-muted-foreground flex-1">
                {v.body}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                asChild
                className="w-full h-10 shadow-md hover:shadow-lg transition-shadow"
              >
                <Link href={v.link} className="w-full">
                  Know More
                </Link>
              </Button>
            </CardFooter>
            {/* Bottom inner shadow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/30" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Hero;
