"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdChevronLeft, MdChevronRight, MdArrowForwardIos } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";

/* ------------------------------------------------------------------ */
/*  Types + data — swap for your CMS/API response later                */
/* ------------------------------------------------------------------ */

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: { name: string; avatar: string };
  date: string;
  readTime: string;
  href: string;
};

const blogs: Blog[] = [
  {
    id: "b1",
    title: "5 Warm-Up Drills Every Weekend Footballer Should Know",
    excerpt:
      "Cut your injury risk and feel sharper from kickoff with this quick pre-match routine our coaches swear by.",
    category: "Football",
    image: "/blogs/football-warmup.jpg",
    author: { name: "Ankur Sharma", avatar: "https://github.com/shadcn.png" },
    date: "24 Jul 2026",
    readTime: "4 min read",
    href: "/blog/football-warmup-drills",
  },
  {
    id: "b2",
    title: "How to Find the Right Skill-Level Game Near You",
    excerpt:
      "Playing too far above or below your level kills the fun fast. Here's how PlayNearby matches you better.",
    category: "Guide",
    image: "/blogs/skill-matching.jpg",
    author: { name: "Riya Kapoor", avatar: "https://i.pravatar.cc/80?img=32" },
    date: "19 Jul 2026",
    readTime: "3 min read",
    href: "/blog/find-right-skill-level",
  },
  {
    id: "b3",
    title: "Inside Mumbai's Most Underrated Turf Courts",
    excerpt:
      "We visited five hidden-gem venues across the city — here's which ones are actually worth the trip.",
    category: "Venues",
    image: "/blogs/turf-courts.jpg",
    author: { name: "Sam Verma", avatar: "https://i.pravatar.cc/80?img=5" },
    date: "12 Jul 2026",
    readTime: "6 min read",
    href: "/blog/mumbai-turf-courts",
  },
  {
    id: "b4",
    title: "Chess Openings That Actually Work for Beginners",
    excerpt:
      "Skip the memorization overload — these three openings will get you through your first 20 rated games.",
    category: "Chess",
    image: "/blogs/chess-openings.jpg",
    author: { name: "Neha Iyer", avatar: "https://i.pravatar.cc/80?img=47" },
    date: "05 Jul 2026",
    readTime: "5 min read",
    href: "/blog/chess-openings-beginners",
  },
];

/* ------------------------------------------------------------------ */
/*  Carousel row — same scroll-snap pattern used across the site       */
/* ------------------------------------------------------------------ */

function CarouselRow({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/*
        overflow-x-auto forces overflow-y to clip too, which cuts off the
        hover lift + drop shadow. Padding the track vertically (not just
        horizontally) gives the shadow room to breathe instead of being cropped.
      */}
      <div
        ref={trackRef}
        className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-2 py-6 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Scroll left"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-lg text-black/70 shadow-sm transition-all duration-300 hover:-translate-x-0.5 hover:bg-primary hover:text-white"
        >
          <MdChevronLeft />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Scroll right"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-lg text-black/70 shadow-sm transition-all duration-300 hover:translate-x-0.5 hover:bg-primary hover:text-white"
        >
          <MdChevronRight />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Blog card — image on top, clean content panel below                */
/* ------------------------------------------------------------------ */

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Card
      onClick={() => (window.location.href = blog.href)}
      className="group relative w-90 flex-none snap-start overflow-hidden rounded-3xl border border-black/5 bg-white p-0 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)] hover:cursor-pointer"
    >
      <CardContent className="flex h-full flex-col p-0">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="360px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-[#78F190] px-3 py-1 text-[11px] font-bold text-primary shadow-sm">
            {blog.category}
          </span>
        </div>

        {/* Text content */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-primary">
            {blog.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">{blog.excerpt}</p>

          <div className="mt-auto flex items-center justify-between gap-2 border-t border-black/5 pt-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                <AvatarFallback className="text-[10px]">
                  {blog.author.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold text-gray-800">{blog.author.name}</span>
                <span className="text-[11px] text-gray-400">{blog.date}</span>
              </div>
            </div>

            <span className="flex items-center gap-1 text-[11px] font-medium text-gray-400">
              <FaRegClock className="text-[10px]" />
              {blog.readTime}
            </span>
          </div>
        </div>

        {/* Read more affordance, slides in on hover */}
        <div className="flex items-center gap-1.5 px-5 pb-5 text-sm font-semibold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
          Read Article
          <MdArrowForwardIos className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Blogs                                                              */
/* ------------------------------------------------------------------ */

const Blogs = () => {
  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center rounded-4xl bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.1)] mt-15">
      <div className="flex w-full items-center justify-between pb-6">
        <h2 className="text-2xl font-bold text-gray-800">Latest Blogs</h2>
        <Link
          href="/blog"
          className="group flex items-center gap-1.5 text-base font-semibold text-primary transition-colors hover:text-primary/80"
        >
          See All Posts
          <MdArrowForwardIos className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <CarouselRow>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </CarouselRow>
    </div>
  );
};

export default Blogs;