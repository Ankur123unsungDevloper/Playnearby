"use client";

import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type JoinStatus = "idle" | "loading" | "joined" | "error";

export function JoinGameButton({ gameId, isFull }: { gameId: string; isFull: boolean }) {
  const { isSignedIn, getToken } = useAuth();
  const [status, setStatus] = useState<JoinStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (isFull) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-full bg-gray-200 py-3 text-sm font-bold text-gray-500"
      >
        Game Full
      </button>
    );
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button className="w-full rounded-full bg-primary py-3 text-sm font-bold text-white shadow-md transition-transform duration-300 hover:scale-[1.02]">
          Sign in to Join
        </button>
      </SignInButton>
    );
  }

  if (status === "joined") {
    return (
      <button
        disabled
        className="w-full cursor-default rounded-full bg-primary/60 py-3 text-sm font-bold text-white"
      >
        You&apos;re In 🎉
      </button>
    );
  }

  async function handleJoin() {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/games/${gameId}/join`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}) as { error?: string });
        throw new Error(body.error ?? "Couldn't join this game");
      }
      setStatus("joined");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleJoin}
        disabled={status === "loading"}
        className="w-full rounded-full bg-primary py-3 text-sm font-bold text-white shadow-md transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "loading" ? "Joining..." : "Join This Game"}
      </button>
      {status === "error" && (
        <p className="text-center text-xs font-medium text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
