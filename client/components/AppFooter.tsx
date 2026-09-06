import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaXTwitter
} from "react-icons/fa6";

import Logo from "./logo";

export function AppFooter() {
  return (
    <footer className="mt-auto w-full border-t border-black/5 bg-gray-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-10 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
          <Logo />
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-col h-full mt-16 mb-8 font-semibold text-center md:text-left md:font-medium justify-self-center md:mt-0 md:mb-0">
          <Link href="/aboutus" className="mb-8 md:mb-6">
            About Us
          </Link>
          <Link href="/blog" className="mb-8 md:mb-6">
            Blog
          </Link>
          <Link href="/contact" className="mb-8 md:mb-6">
            Contact
          </Link>
          <Link href="/careers" className="mb-8 md:mb-6">
            Careers
          </Link>
          <Link href="/partner-with-us" className="mb-8 md:mb-6">
            Partner With Us
          </Link>
          <Link href="/buy-gift-card" className="mb-8 md:mb-6">
            Buy Gift Cards
          </Link>
        </div>
        <div className="flex justify-center gap-12 md:self-start md:gap-6 md:mb-0">
          <Link
            href="https://www.instagram.com/playnearby.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition-colors hover:text-gray-700"
          >
            <FaInstagram className="w-6 h-6" />
          </Link>
          <Link
            href="https://www.facebook.com/playnearby.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition-colors hover:text-gray-700"
          >
            <FaFacebookF className="w-6 h-6" />
          </Link>
          <Link
            href="https://www.linkedin.com/company/playnearby/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition-colors hover:text-gray-700"
          >
            <FaLinkedin className="w-6 h-6" />
          </Link>
          <Link
            href="https://www.twitter.com/playnearby/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition-colors hover:text-gray-700"
          >
            <FaXTwitter className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
