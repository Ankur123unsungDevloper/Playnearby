import {
  Users,
  MapPinned,
  Trophy,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    title: "Find Local Players",
    description:
      "Discover nearby people who love the same sports and indoor games as you.",
    icon: Users,
    primary: true,
  },
  {
    title: "Nearby Matches",
    description:
      "Explore ongoing games around your location and join instantly.",
    icon: MapPinned,
    primary: false,
  },
  {
    title: "Create Your Match",
    description:
      "Host public or private matches and invite nearby players effortlessly.",
    icon: Trophy,
    primary: false,
  },
  {
    title: "Chat & Build Friendships",
    description:
      "Message players, create groups, and grow your local gaming community.",
    icon: MessageCircle,
    primary: true,
  },
];

const Features = () => {
  return (
    <div className="relative overflow-hidden bg-background py-32">
      {/* Background Blur */}
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-green-300/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-8">
        {/* Heading */}
        <div className="mb-20 text-center">
          <h2 className="text-6xl font-bold">
            Why Choose{" "}
            <span className="text-primary">PlayNearby?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground">
            Everything you need to discover local players,
            organize matches, and make meaningful
            friendships through sports.
          </p>
        </div>
        {/* Cards */}
        <div className="grid gap-10 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`
                  group relative overflow-hidden rounded-[32px] border
                  ${
                    feature.primary
                      ? "border-primary/20 bg-primary text-white"
                      : "border-border bg-[#78F190] text-foreground"
                  }
                  p-10 shadow-[0_20px_40px_rgba(0,0,0,0.08),0_40px_80px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-4 hover:rotate-[0.5deg] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15),0_60px_100px_rgba(0,0,0,0.08)]
                `}
              >
                {/* Glass Reflection */}
                <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-white/15 blur-3xl transition-all duration-700 group-hover:scale-150" />
                {/* Top Accent */}
                <div
                  className={`
                    absolute left-0 top-0 h-1 w-full
                    ${
                      feature.primary
                        ? "bg-white/70"
                        : "bg-primary"
                    }
                  `}
                />
                {/* Icon */}
                <div
                  className={`
                    flex h-20 w-20 items-center justify-center rounded-3xl shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1
                    ${
                      feature.primary
                        ? "bg-white text-primary"
                        : "bg-primary text-white"
                    }
                  `}
                >
                  <Icon size={36} strokeWidth={2.2} />
                </div>
                {/* Title */}
                <h3 className="mt-10 text-4xl font-bold">
                  {feature.title}
                </h3>
                {/* Description */}
                <p
                  className={`mt-5 text-lg leading-8 ${
                    feature.primary
                      ? "text-white/85"
                      : "text-muted-foreground"
                  }`}
                >
                  {feature.description}
                </p>
                {/* Bottom Glow */}
                <div
                  className={`
                    absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full
                    ${
                      feature.primary
                        ? "bg-[#78F190]"
                        : "bg-primary"
                    }
                  `}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;