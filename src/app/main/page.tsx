"use client";

import { Calendar } from "@/app/main/_components/Calendar";
import { MoodInput } from "@/app/main/_components/MoodInput";
import { Moods } from "@/app/main/_components/Moods";
import { useMoodData } from "@/app/main/_hooks/useMoodData";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { Mood } from "@/shared/types/mood";
import { useState } from "react";

export default function Page() {
  const { addMood, getMoodsByDate, moods } = useMoodData();
  const [showBottomSheet, setShowBottomSheet] = useState(true);

  const onMoodCreate = (mood: Mood) => {
    addMood(mood);
    setShowBottomSheet(false);
  };

  return (
    <main className="bg-white px-5 py-6 flex flex-col flex-1 max-h-screen pb-20">
      <div className="flex-1 shrink-0 flex flex-col gap-3 min-h-0">
        <MoodInput onCreateMood={(mood) => addMood(mood)} />
        <Moods moods={getMoodsByDate(new Date())} />
      </div>

      <div className="mt-auto justify-center flex">
        <Calendar moods={moods} />
      </div>

      <BottomSheet
        visible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
      >
        <MoodInput onCreateMood={(mood) => onMoodCreate(mood)} />
      </BottomSheet>
    </main>
  );
}
