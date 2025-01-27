"use client";

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
  const [idx, setIdx] = useState(0);

  const [translateX, setTranslateX] = useState(0);

  const { dragHandlers, isDragging } = useDragHandler({
    onDragging: (xMove) => {
      setTranslateX((prev) => prev + xMove);
    },
    onDragStop: () => {
      const i = idx + Math.round(-translateX / 48);
      setTranslateX(0);

      if (i < 0) {
        setIdx(0);
        return;
      }

      if (i >= Emotions.length) {
        setIdx(Emotions.length - 1);
        return;
      }

      setIdx(i);
    },
  });

  const currentX = 12 - idx * 48;

  return (
    <main>
      <div className="w-[64px] overflow-hidden relative" {...dragHandlers}>
        <div className="absolute h-full left-0 top-0 shadow-[0_0_16px_2px] shadow-white z-1" />
        <div className="absolute h-full right-0 top-0 shadow-[0_0_16px_2px] shadow-white z-1" />
        <div
          className="flex gap-2 w-fit transition-transform"
          style={{
            transform: isDragging
              ? `translateX(${currentX + translateX}px)`
              : `translateX(${currentX}px)`,
          }}
        >
          {Emotions.map((emotion, i) => (
            <div
              key={emotion.id}
              style={{ transform: idx !== i ? "scale(0.95)" : "" }}
              className={`rounded-full w-[40px] h-[40px] transition-transform ${emotion.color}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
