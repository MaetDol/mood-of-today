import { useDragHandler } from "@/shared/hooks/useDragHandler";
import { useState } from "react";

interface Props {
  circles: {
    color: string;
    name: string;
    id: number;
  }[];
  onChange?: (idx: number) => void;
}

export function SlideCircles({ circles, onChange }: Props) {
  const [idx, setIdx] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const updateIdx = (i: number) => {
    setIdx(i);
    onChange?.(i);
  };

  const { dragHandlers, isDragging } = useDragHandler({
    onDragging: (xMove) => {
      setTranslateX((prev) => prev + xMove);
    },
    onClick: () => {
      const i = idx + 1;
      if (i >= circles.length) {
        updateIdx(0);
        return;
      }

      updateIdx(i);
    },
    onDragStop: () => {
      const i = idx + Math.round(-translateX / 48);
      setTranslateX(0);

      if (i < 0) {
        updateIdx(0);
        return;
      }

      if (i >= circles.length) {
        updateIdx(circles.length - 1);
        return;
      }

      updateIdx(i);
    },
  });

  const currentX = 12 - idx * 48;

  return (
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
        {circles.map((circle, i) => (
          <div
            key={circle.id}
            style={{ transform: idx !== i ? "scale(0.95)" : "" }}
            className={`rounded-full w-[40px] h-[40px] transition-transform ${circle.color}`}
          />
        ))}
      </div>
    </div>
  );
}
