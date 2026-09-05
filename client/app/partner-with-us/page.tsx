import { MdGroups, MdEventAvailable, MdOutlinePayments } from "react-icons/md";
import { AppNavbar } from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";
import { PartnerVenueForm } from "@/components/PartnerVenueForm";

const VALUE_PROPS = [
  {
    icon: <MdGroups />,
    title: "Reach more players",
    body: "Your venue shows up to nearby players actively looking for a place to play, not just people who already knew you existed.",
  },
  {
    icon: <MdEventAvailable />,
    title: "Fill more empty slots",
    body: "Hosted games at your venue bring in groups, not just individuals — more of your available time gets booked.",
  },
  {
    icon: <MdOutlinePayments />,
    title: "Zero listing fees",
    body: "Listing your venue is free. There's no cost to get discovered.",
  },
];

export default function PartnerWithUsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AppNavbar />

      {/* Pitch */}
      <div className="relative overflow-hidden bg-primary py-16 text-white">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/4 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-4 text-center sm:px-6">
          <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-sm">
            For Venue Owners
          </span>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Partner With PlayNearby</h1>
          <p className="max-w-xl text-white/85">
            List your court, turf, or table and let nearby players find you.
          </p>
          <a
            href="#venue-form"
            className="mt-2 flex w-fit items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-primary shadow-md transition-transform duration-300 hover:scale-[1.03]"
          >
            List Your Venue
          </a>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className="rounded-3xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
                {v.icon}
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-800">{v.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{v.body}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">List Your Venue</h2>
          <p className="mt-1 text-gray-500">Fill in the details below — it takes about two minutes.</p>
        </div>

        <PartnerVenueForm />
      </main>

      <AppFooter />
    </div>
  );
}
