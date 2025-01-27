"use client";

import { SlideCircles } from "@/app/main/_components/SlideCircles";
import { useDragHandler } from "@/shared/hooks/useDragHandler";
import { useState } from "react";

const Emotions = [
  {
    color: "bg-sky-700",
    name: "우울",
    id: 1,
  },
  {
    color: "bg-sky-700",
    name: "우울",
    id: 2,
  },
  {
    color: "bg-sky-700",
    name: "우울",
    id: 3,
  },
  {
    color: "bg-sky-700",
    name: "우울",
    id: 4,
  },
  {
    color: "bg-sky-700",
    name: "우울",
    id: 5,
  },
  {
    color: "bg-sky-700",
    name: "우울",
    id: 6,
  },
];

export default function Page() {
  return (
    <main className="bg-white px-5 py-6">
      <div className="flex items-center gap-4">
        <SlideCircles circles={Emotions} />
        <input
          className="px-3 py-2 rounded-full border border-slate-400
          w-[200px]
        placeholder:slate-400
        "
          placeholder="왜 그런 기분이 들었나요?"
        />
      </div>
    </main>
  );
}
