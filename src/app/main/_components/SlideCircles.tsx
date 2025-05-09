import { useDragHandler } from "@/shared/hooks/useDragHandler";
import { useState } from "react";

interface Props {
  circles: {
    color: string;
    name: string;
    id: number;
  }[];
  onChange?: (idx: number) => void;
  showBubbleLabel?: boolean;
}

export function SlideCircles({ circles, onChange, showBubbleLabel }: Props) {
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
    <div className="relative">
      <span
        className={`absolute bottom-[calc(100%_+_16px)] left-1/2 -translate-x-1/2 whitespace-nowrap
      bg-black/60 px-3 py-1 rounded text-white font-bold animate-bubble
      delay-200 transition-opacity duration-300 ${
        showBubbleLabel ? "opacity-100" : "opacity-0"
      }
      `}
      >
        {circles[idx].name}
        <span className="bg-black/50 block w-3 h-3 rounded-full absolute top-[calc(100%_+_4px)] left-1/2 translate-x-[-24px] animate-bubble2" />
      </span>

      <div className="w-[64px] overflow-hidden relative" {...dragHandlers}>
        <div className="absolute h-full left-0 top-0 shadow-[0_0_16px_2px] shadow-white z-1" />
        <div className="absolute h-full right-0 top-0 shadow-[0_0_16px_2px] shadow-white z-1" />
        <div
          className={`flex gap-2 w-fit ${
            isDragging ? "transition-none" : "transition-transform"
          }`}
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
    </div>
  );
}
