"use client";

import Logo from "@/components/logo";

import Link from "next/link";

import {
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaApple,
  FaGooglePlay,
  FaChessKnight,
} from "react-icons/fa6";
import {
  GiSoccerBall,
  GiCricketBat
} from "react-icons/gi";
import { MdArrowForwardIos } from "react-icons/md";

/* ------------------------------------------------------------------ */
/*  Link data — one place to edit the whole footer's link map          */
/* ------------------------------------------------------------------ */

const linkGroups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "partner With Us", href: "/partnerwithus" },
      { label: "Buy Gift Card", href: "/buygiftcard" },
    ],
  },
];

const socials = [
  { icon: <FaInstagram />, href: "https://instagram.com", label: "Instagram" },
  { icon: <FaXTwitter />, href: "https://x.com", label: "X (Twitter)" },
  { icon: <FaFacebookF />, href: "https://facebook.com", label: "Facebook" },
  { icon: <FaLinkedinIn />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <FaYoutube />, href: "https://youtube.com", label: "YouTube" },
];

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */

export default function AppFooter() {

  return (
    <footer className="relative mt-20 w-full overflow-hidden rounded-t-[3rem] bg-[#0B1F14] text-white">
      {/* decorative glow + faint watermark sport icons */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[#78F190]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-20 h-56 w-56 rounded-full bg-[#78F190]/10 blur-3xl" />
      <GiSoccerBall className="pointer-events-none absolute right-10 top-10 text-8xl text-white/5" />
      <FaChessKnight className="pointer-events-none absolute bottom-24 left-[38%] text-7xl text-white/5" />
      <GiCricketBat className="pointer-events-none absolute bottom-10 right-[20%] text-8xl text-white/5" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 pb-10 pt-16 md:px-10">
        {/* Top area */}
        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-5 lg:col-span-2 items-start justify-center">
            <Logo />
          </div>

          {/* Link columns */}
          {linkGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-5 lg:col-span-3 items-center justify-center">
              <div className="flex flex-col gap-6 justify-start">
                <h4 className="text-lg font-bold uppercase tracking-wide text-white/50">
                  {group.title}
                </h4>
                <ul className="flex flex-col gap-3 items-start">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-sm text-white/75 transition-colors duration-300 hover:text-[#78F190]"
                      >
                        {link.label}
                        <MdArrowForwardIos className="text-[9px] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* App download + socials row */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
              Get the app
            </span>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 transition-colors duration-300 hover:bg-white/10"
              >
                <FaApple className="text-xl" />
                <span className="text-left text-xs leading-tight">
                  Download on the
                  <br />
                  <span className="text-sm font-bold">App Store</span>
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 transition-colors duration-300 hover:bg-white/10"
              >
                <FaGooglePlay className="text-xl" />
                <span className="text-left text-xs leading-tight">
                  Get it on
                  <br />
                  <span className="text-sm font-bold">Google Play</span>
                </span>
              </a>
            </div>
          </div>

          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#78F190] hover:text-[#0B1F14]"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom legal bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row">
          <span>&copy; {new Date().getFullYear()} PlayNearby. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-white/70">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white/70">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="transition-colors hover:text-white/70">
              Sitemap
            </Link>
          </div>
          <span>Made with care in Mumbai 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
}