"use client";

import { useDragHandler } from "@/shared/hooks/useDragHandler";
import { useState } from "react";

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

      if (i > 6) {
        setIdx(6);
        return;
      }

      setIdx(i);
    },
  });

  const currentX = 12 - idx * 48;

  return (
    <main>
      <div className="w-[64px] overflow-hidden" {...dragHandlers}>
        <div
          className="flex gap-2 w-fit transition-transform"
          style={{
            transform: isDragging
              ? `translateX(${currentX + translateX}px)`
              : `translateX(${currentX}px)`,
          }}
        >
          <div className="rounded-full w-[40px] h-[40px] bg-sky-700"></div>
          <div className="rounded-full w-[40px] h-[40px] bg-sky-700"></div>
          <div className="rounded-full w-[40px] h-[40px] bg-sky-700"></div>
          <div className="rounded-full w-[40px] h-[40px] bg-sky-700"></div>
          <div className="rounded-full w-[40px] h-[40px] bg-sky-700"></div>
          <div className="rounded-full w-[40px] h-[40px] bg-sky-700"></div>
          <div className="rounded-full w-[40px] h-[40px] bg-sky-700"></div>
        </div>
      </div>
    </main>
  );
}
