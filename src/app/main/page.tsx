"use client";

import { Calendar } from "@/app/main/_components/Calendar";
import { MoodInput } from "@/app/main/_components/MoodInput";
import { useState } from "react";

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

type Mood = {
  id: number;
  name: string;
  moodId: number;
};

export default function Page() {
  const [moods, setMoods] = useState<Mood[]>([]);

  const addMood = (mood: Mood) => {
    setMoods((prev) => [...prev, mood]);
  };

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
