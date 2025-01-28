"use client";

import { Calendar } from "@/app/main/_components/Calendar";
import { SlideCircles } from "@/app/main/_components/SlideCircles";
import { useRef, useState } from "react";

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
] 

type Mood = {
  id: number;
  name: string;
  moodId: number;
}

export default function Page() {

  const moodRef = useRef<typeof Emotions[number]>(null);
  const [moods, setMoods] = useState<Mood[]>([]);
  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      setMoods((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: e.target.value as any,
          moodId: moodRef.current.id,
        },
      ]);
      e.target.value = '';
  }

  const handleChangeMood = (idx: number) => {
    moodRef.current = Emotions[idx];
  }

  return (
    <main className="bg-white px-5 py-6 flex flex-col flex-1">
      <div className="flex-1 shrink-0 flex flex-col gap-3">
        <div className="flex items-center gap-4 shrink-0">
          <SlideCircles circles={Emotions} onChange={handleChangeMood} />
          <input
            className="px-3 py-2 rounded-full border border-slate-400
          w-[200px]
        placeholder:slate-400
        "
            placeholder="왜 그런 기분이 들었나요?"
          />
        </div>

        <ol className="ml-4 overflow-auto">
          <li className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-400" />산 아이스크림이
            녹아있었음
          </li>
        </ol>
      </div>

      <div className="mt-auto justify-center flex">
        <Calendar />
      </div>
    </main>
  );
}
