"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Layout — 5 fixed slots on a 760x620 design canvas, ordered so that */
/*  index i -> i+1 traces the actual physical loop of the collage:     */
/*  top-left -> top-right -> DOWN to bottom-right -> across to         */
/*  bottom-middle -> bottom-left -> UP back to top-left. Rotating the  */
/*  photo-to-slot assignment through this order is what makes each     */
/*  photo travel "to the next one, then down, then next, then up."    */
/* ------------------------------------------------------------------ */

type Slot = { top: number; left: number; width: number; height: number };

const slots: Slot[] = [
  { top: 7.3, left: 12.5, width: 30.3, height: 37.1 }, // 0: top-left portrait
  { top: 8.9, left: 47.4, width: 43.4, height: 45.2 }, // 1: top-right hero
  { top: 69.4, left: 69.1, width: 22.4, height: 30.6 }, // 2: bottom-right (down from hero)
  { top: 69.4, left: 40.8, width: 25, height: 30.6 }, // 3: bottom-middle
  { top: 69.4, left: 12.5, width: 25, height: 30.6 }, // 4: bottom-left (then back up to 0)
];

const ROTATE_MS = 3800; // how long each photo rests in its slot
const TRANSITION_MS = 900; // how long the glide + lift/settle takes

/* ------------------------------------------------------------------ */
/*  Data — swap `src` for real community photos                        */
/* ------------------------------------------------------------------ */

type Photo = { id: string; src: string; alt: string };

const photos: Photo[] = [
  { id: "p1", src: "/community/photo1.jpg", alt: "Community group on the steps" },
  { id: "p2", src: "/community/photo1.jpg", alt: "Group photo in front of Vidhana Soudha" },
  { id: "p3", src: "/community/photo1.jpg", alt: "Cyclists group" },
  { id: "p4", src: "/community/photo1.jpg", alt: "Indoor turf group photo" },
  { id: "p5", src: "/community/photo1.jpg", alt: "Cricket practice session" },
];

/* ------------------------------------------------------------------ */
/*  Decorative green accents — alive on their own gentle float/rotate, */
/*  independent of the photo conveyor, fixed to their design spots     */
/* ------------------------------------------------------------------ */

function SwirlAccent({ vertical }: { vertical?: boolean }) {
  return (
    <svg
      viewBox={vertical ? "0 0 60 190" : "0 0 230 110"}
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <rect width="100%" height="100%" fill="#33C481" />
      {vertical ? (
        <path
          d="M12,-10 C-8,40 58,70 28,120 C8,160 58,180 38,210"
          stroke="#FFFFFF"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
      ) : (
        <path
          d="M-20,80 C40,45 100,120 160,70 C200,40 220,80 250,50"
          stroke="#FFFFFF"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
      )}
    </svg>
  );
}

function DiagonalAccent() {
  return (
    <svg viewBox="0 0 60 50" className="h-full w-full">
      <g stroke="#9BE8AE" strokeWidth="6" strokeLinecap="round">
        <line x1="6" y1="44" x2="24" y2="6" />
        <line x1="20" y1="44" x2="38" y2="6" />
        <line x1="34" y1="44" x2="52" y2="6" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  CommunityGallery                                                    */
/* ------------------------------------------------------------------ */

const CommunityGallery = () => {
  const [offset, setOffset] = useState(0);
  const [lifted, setLifted] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      // brief "pick up" pulse right as the move starts, then settle back down
      setLifted(true);
      setOffset((o) => (o + 1) % slots.length);
      const settle = setTimeout(() => setLifted(false), TRANSITION_MS);
      return () => clearTimeout(settle);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div className="mt-15 flex w-full flex-col items-center justify-center">
      <div className="w-full pb-6 text-left" style={{ maxWidth: 760 }}>
        <h2 className="text-2xl font-bold text-gray-800">Our Community</h2>
      </div>

      <style>{`
        @keyframes accentFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
      `}</style>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative mx-auto aspect-[760/620] w-full max-w-[760px]"
      >
        {/* Decorative accents — float gently on their own, don't join the photo cycle */}
        <div
          className="absolute left-[2%] top-[1%] h-[8%] w-[8%] [animation:accentFloat_5s_ease-in-out_infinite]"
        >
          <DiagonalAccent />
        </div>
        <div
          className="absolute left-[12.5%] top-[48.4%] h-[17.7%] w-[30.3%] overflow-hidden rounded-3xl shadow-[0_8px_20px_rgba(0,0,0,0.12)] [animation:accentFloat_6s_ease-in-out_infinite]"
          style={{ animationDelay: "0.6s" }}
        >
          <SwirlAccent />
        </div>
        <div
          className="absolute left-[92.5%] top-[69.4%] h-[30.6%] w-[6%] overflow-hidden rounded-3xl shadow-[0_8px_20px_rgba(0,0,0,0.12)] [animation:accentFloat_7s_ease-in-out_infinite]"
          style={{ animationDelay: "1.2s" }}
        >
          <SwirlAccent vertical />
        </div>

        {/* Photos — each keeps the same DOM node; only its slot (position/size)
            changes, so the CSS transition is what makes it glide to the next
            slot instead of jump-cutting. The `lifted` pulse briefly scales +
            deepens the shadow right as the move kicks off, then eases back
            flat once it settles — a little "picked up and placed down" beat
            instead of a flat rectangle tween. */}
        {photos.map((photo, i) => {
          const slotIndex = (i + offset) % slots.length;
          const slot = slots[slotIndex];
          const isHero = slotIndex === 1;

          return (
            <div
              key={photo.id}
              style={{
                top: `${slot.top}%`,
                left: `${slot.left}%`,
                width: `${slot.width}%`,
                height: `${slot.height}%`,
                transitionDuration: `${TRANSITION_MS}ms`,
                transitionTimingFunction: "cubic-bezier(0.34, 1.2, 0.4, 1)",
              }}
              className={`absolute overflow-hidden rounded-3xl transition-all ${
                isHero ? "z-20" : "z-10"
              } ${
                lifted
                  ? "scale-[1.04] shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
                  : "scale-100 shadow-[0_10px_24px_rgba(0,0,0,0.15)]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 760px) 90vw, 380px"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityGallery;