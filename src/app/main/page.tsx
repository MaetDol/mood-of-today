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
    <main>
      <SlideCircles circles={Emotions} />
    </main>
  );
}
