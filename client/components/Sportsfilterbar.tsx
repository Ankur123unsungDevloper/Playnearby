"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { IoIosArrowDown } from "react-icons/io";

const SPORT_CATEGORIES = [
  {
    id: "racquet",
    label: "Racquet Sports",
    sports: [
      { key: "tennis", label: "Tennis", emoji: "🎾" },
      { key: "table_tennis", label: "Table Tennis", emoji: "🏓" },
      { key: "badminton", label: "Badminton", emoji: "🏸" },
    ],
  },
  {
    id: "team",
    label: "Team Sports",
    sports: [
      { key: "football", label: "Football", emoji: "⚽" },
      { key: "cricket", label: "Cricket", emoji: "🏏" },
    ],
  },
  {
    id: "fitness",
    label: "Fitness",
    sports: [{ key: "swimming", label: "Swimming", emoji: "🏊" }],
  },
  {
    id: "recreation",
    label: "Recreation",
    sports: [
      { key: "chess", label: "Chess", emoji: "♟️" },
      { key: "carrom", label: "Carrom", emoji: "🎯" },
    ],
  },
] as const;

// Get all valid sport keys
type SportKey =
  (typeof SPORT_CATEGORIES)[number]["sports"][number]["key"];

type CategoryId = (typeof SPORT_CATEGORIES)[number]["id"];

export function SportsFilterBar() {
  const [selected, setSelected] = useState<SportKey[]>([]);

  const toggleCategory = (categoryId: CategoryId) => {
    const category = SPORT_CATEGORIES.find(
      (c) => c.id === categoryId
    )!;

    const keys = category.sports.map((s) => s.key);

    const allSelected = keys.every((k) => selected.includes(k));

    setSelected((prev) =>
      allSelected
        ? prev.filter((k) => !keys.includes(k))
        : Array.from(new Set([...prev, ...keys]))
    );
  };

  const categoryCheckedState = (
    categoryId: CategoryId
  ): boolean | "indeterminate" => {
    const category = SPORT_CATEGORIES.find(
      (c) => c.id === categoryId
    )!;

    const keys = category.sports.map((s) => s.key);

    const count = keys.filter((k) => selected.includes(k)).length;

    if (count === 0) return false;
    if (count === keys.length) return true;

    return "indeterminate";
  };

  const reset = () => setSelected([]);

  const apply = () => {
    // Your filter logic here
    console.log(selected);
  };

  const triggerLabel =
    selected.length === 0 ? "" : `(${selected.length} Selected)`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-64 h-10 justify-between gap-2 rounded-lg bg-[#78f19080] text-white font-normal text-sm">
          All Sports
          <IoIosArrowDown className="size-5 font-bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-105" align="end">
        <Accordion
          type="multiple"
          defaultValue={["racquet"]}
          className="px-4 overflow-y-auto"
        >
          {SPORT_CATEGORIES.map((category) => (
            <AccordionItem
              key={category.id}
              value={category.id}
            >
              <AccordionTrigger className="flex gap-x-3 font-bold text-gray-800 hover:no-underline items-center **:data-[slot=accordion-trigger-icon]:size-6 **:data-[slot=accordion-trigger-icon]:text-gray-800">
                <Checkbox
                  checked={categoryCheckedState(category.id)}
                  onCheckedChange={() =>
                    toggleCategory(category.id)
                  }
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Select all ${category.label}`}
                />
                {category.label}
                <span className="text-sm font-normal text-muted-foreground">
                  {triggerLabel}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                aaaaaa
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex items-center justify-end gap-2 border-t py-2 mr-3">
          <Button
            variant="outline"
            onClick={reset}
            disabled={selected.length === 0}
            className="px-4 py-1 font-medium text-black border-2 border-black rounded-sm disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
          >
            Reset
          </Button>
          <Button
            onClick={apply}
            className="px-4 py-1 font-medium text-white border-2 rounded-sm border-primary bg-primary"
          >
            Apply
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}