"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Swiper reads the DOM/window, so it has to live in a Client Component.
// The parent page stays an async Server Component and just renders this.
export function VenueGallery({ venueName }: { venueName: string }) {
  return (
    <div className="hidden w-full row-span-1 bg-opacity-50 border_radius backdrop-blur-lg bg-surface md:block md:col-span-2">
      <div className="overflow-hidden aspect-video rounded-md w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={false}
          className="w-full h-full"
        >
          <SwiperSlide className="relative">
            <Image src="/images/banner-1.jpg" alt={venueName} fill className="object-cover" />
          </SwiperSlide>

          <SwiperSlide>
            <Image src="/images/banner-1.jpg" alt={venueName} fill className="object-cover" />
          </SwiperSlide>

          <SwiperSlide>
            <Image src="/images/banner-1.jpg" alt={venueName} fill className="object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}