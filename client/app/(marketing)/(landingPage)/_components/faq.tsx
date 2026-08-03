"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MdOutlineSupportAgent } from "react-icons/md";

/* ------------------------------------------------------------------ */
/*  Data — swap for CMS content later if you want FAQs editable        */
/*  without a redeploy                                                 */
/* ------------------------------------------------------------------ */

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    id: "item-1",
    question: "How do I find games near me?",
    answer:
      "Turn on location access and PlayNearby shows live games and venues sorted by distance, right from the home page. You can filter by sport, skill level, and time to narrow things down.",
  },
  {
    id: "item-2",
    question: "Can I host my own game?",
    answer:
      "Yes — tap \"Host a Game\" on any sport page, pick a venue, set the skill level and slot count, and it's instantly visible to nearby players. You can manage RSVPs and cancel or reschedule anytime before it fills up.",
  },
  {
    id: "item-3",
    question: "What happens if a game gets cancelled?",
    answer:
      "If the host cancels, everyone who joined gets a notification immediately and any booking fee is refunded automatically to your wallet within 24 hours.",
  },
  {
    id: "item-4",
    question: "What is Hearts and how do I earn it?",
    answer:
      "Hearts reflects your reliability and sportsmanship — you earn it by showing up to games you join, hosting well-attended sessions, and getting positive ratings from other players. Higher Hearts unlocks priority slots in popular games.",
  },
  {
    id: "item-5",
    question: "How do venue bookings work?",
    answer:
      "Pick a venue, choose an available time slot, and pay securely in-app. You'll get a confirmation with directions and the venue's contact details, and can cancel for a full refund up to 2 hours before your slot.",
  },
  {
    id: "item-6",
    question: "Is PlayNearby free to use?",
    answer:
      "Browsing games, joining public sessions, and hosting are all free. You only pay when you book a paid venue slot — PlayNearby doesn't add any extra platform fee on top of the venue's listed price.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                 */
/* ------------------------------------------------------------------ */

const FAQ = () => {
  return (
    <div className="flex w-full items-center justify-center text-center mt-15">
      <div className="flex w-full max-w-7xl flex-col gap-10 rounded-4xl bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.1)] md:p-14">
        <div className="flex w-full flex-col items-start gap-2 text-left">
          <span className="rounded-full bg-[#78F190] px-3 py-1 text-xs font-bold text-primary">
            FAQ
          </span>
          <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
          <p className="text-sm text-gray-500 md:text-base">
            Everything you need to know about finding games, hosting, and booking venues.
          </p>
        </div>

        <Accordion type="single" collapsible defaultValue="item-1" className="w-full text-left">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-b border-black/5 last:border-none"
            >
              <AccordionTrigger className="py-5 text-left text-base font-semibold text-gray-800 transition-colors hover:text-primary hover:no-underline md:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-gray-500 md:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Still-have-questions CTA */}
        <div className="flex w-full flex-col items-center justify-between gap-4 rounded-3xl bg-[#78F190]/20 p-6 text-left md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl text-white">
              <MdOutlineSupportAgent />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">Still have questions?</h3>
              <p className="text-sm text-gray-500">
                Our support team usually replies within a few hours.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="w-full shrink-0 rounded-xl bg-primary px-6 py-3 text-center text-sm font-bold text-white shadow-md transition-transform duration-300 hover:scale-[1.02] md:w-auto"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;