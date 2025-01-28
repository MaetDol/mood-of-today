"use client";

import { SlideCircles } from "@/app/main/_components/SlideCircles";
import { Mood } from "@/shared/types/mood";
import { useRef } from "react";

// 색깔 다시 정할 필요가 있음
const Emotions = [
  {
    color: "bg-emerald-500",
    name: "즐거움",
    id: 1,
  },
  {
    color: "bg-sky-700",
    name: "우울",
    id: 2,
  },
  {
    color: "bg-fuchsia-300",
    name: "행복",
    id: 3,
  },
  {
    color: "bg-red-500",
    name: "분노",
    id: 4,
  },
  {
    color: "bg-slate-500",
    name: "평온함",
    id: 5,
  },
  {
    color: "bg-orange-400",
    name: "불안함",
    id: 6,
  },
];

interface Props {
  onCreateMood: (mood: Mood) => void;
}

export function MoodInput({ onCreateMood }: Props) {
  const moodRef = useRef<(typeof Emotions)[number]>(null);
  const handleInput: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const mood = moodRef.current;
    const target = e.target;
    if (!mood) {
      return;
    }

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    if (e.key !== "Enter") {
      return;
    }

    const value = target.value.trim();
    if (!value) {
      return;
    }

    const isComposing = e.nativeEvent.isComposing;
    if (isComposing) {
      return;
    }

    onCreateMood({
      id: Date.now(),
      name: value,
      moodId: mood.id,
      createdAt: new Date(),
    });
    target.value = "";
  };

  const handleChangeMood = (idx: number) => {
    moodRef.current = Emotions[idx];
  };

  return (
    <div className="flex items-center gap-4 shrink-0">
      <SlideCircles circles={Emotions} onChange={handleChangeMood} />
      <input
        className="px-3 py-2 rounded-full border border-slate-400
          w-[200px] placeholder:slate-400 "
        placeholder="왜 그런 기분이 들었나요?"
        onKeyDown={handleInput}
      />
    </div>
  );
}
