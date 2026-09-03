"use client";

import { useState } from "react";

import {
  Command,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"

export function SendQueryDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="w-full h-10 rounded-lg py-3 text-lg font-bold text-primary shadow-md transition-transform duration-300 hover:scale-[1.02]"
      >
        Send Query
      </Button>

      {open && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-lg shadow-xl">
            <Command className="rounded-lg border">
              <CommandList className="max-h-100 overflow-y-auto rounded-t-lg border-b">
                <div className="flex flex-row justify-between">
                  <h3 className="pb-6 font-bold md:text-2xl text-xl">
                    Send a Query
                  </h3>
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </Button>
                </div>
                <CommandSeparator />
                <CommandItem className="flex flex-col px-2 py-1.5">
                    <label htmlFor="query">
                      Your Query
                    </label>
                    <Textarea
                      id="query"
                      placeholder="Eg: Can I bring a friend along?"
                      className="w-full h-50 rounded-md border border-gray-300 p-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <span className="text-xs text-muted-foreground ml-auto mt-2">
                      Maximum 300 characters
                    </span>
                </CommandItem>
              </CommandList>
              <CommandSeparator />
              <div className="flex justify-end p-3">
                <Button
                  variant="outline"
                  className="uppercase tracking-widest ml-auto border py-3 px-6 rounded-2xl font-bold disabled:bg-surface disabled:text-mute_text disabled:border-surface disabled:shadow-none bg-primary border-primary text-white shadow-[0_4px_0_0_#00914E] active:shadow-none active:translate-y-1"
                >
                  Send Query
                </Button>
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}