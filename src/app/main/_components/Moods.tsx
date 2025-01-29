"use client";

import { useEmotions } from "@/app/main/_hooks/useEmotions";
import { Mood } from "@/shared/types/mood";

interface Props {
  moods: Mood[];
}

export function Moods({ moods }: Props) {
  const Emotions = useEmotions();

  return (
    <ol className="ml-4 overflow-auto flex flex-col gap-2">
      {moods.map((mood) => (
        <li key={mood.id} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full ${
              Emotions.find((it) => it.id === mood.moodId)?.color ?? ""
            }`}
          />
          {mood.name}
        </li>
      ))}
    </ol>
  );
}
