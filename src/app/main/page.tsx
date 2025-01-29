"use client";

import { Calendar } from "@/app/main/_components/Calendar";
import { MoodInput } from "@/app/main/_components/MoodInput";
import { useEmotions } from "@/app/main/_hooks/useEmotions";
import { useMoodData } from "@/app/main/_hooks/useMoodData";

export default function Page() {
  const { addMood, moods } = useMoodData();
  const Emotions = useEmotions();

  return (
    <main className="bg-white px-5 py-6 flex flex-col flex-1 max-h-screen">
      <div className="flex-1 shrink-0 flex flex-col gap-3 min-h-0">
        <MoodInput onCreateMood={(mood) => addMood(mood)} />

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
      </div>

      <div className="mt-auto justify-center flex">
        <Calendar />
      </div>
    </main>
  );
}
