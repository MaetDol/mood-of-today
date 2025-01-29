"use client";

import { SlideCircles } from "@/app/main/_components/SlideCircles";
import { useEmotions } from "@/app/main/_hooks/useEmotions";
import { Mood } from "@/shared/types/mood";
import { useRef } from "react";

interface Props {
  onCreateMood: (mood: Mood) => void;
}

export function MoodInput({ onCreateMood }: Props) {
  const Emotions = useEmotions();
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
