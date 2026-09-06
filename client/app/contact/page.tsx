import AppFooter from "@/components/AppFooter";
import { AppNavbar } from "@/components/AppNavbar";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <AppNavbar />
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Contact <span className="text-blue-600">Us</span>
        </h1>
        <p className="mt-3 text-2xl">
          Get in touch with us for any inquiries or support.
        </p>
        <div className="mt-6">
          <a
            href="mailto:info@playnearby.in"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Send us an email
          </a>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}