"use client";

import { Calendar } from "@/app/main/_components/Calendar";
import { MoodInput } from "@/app/main/_components/MoodInput";
import { Moods } from "@/app/main/_components/Moods";
import { useMoodData } from "@/app/main/_hooks/useMoodData";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { Mood } from "@/shared/types/mood";
import { useEffect, useState } from "react";

export default function Page() {
  const { addMood, getMoodsByDate, moods } = useMoodData();
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(true);
  const showBottomSheet = () => {
    setIsShowBottomSheet(true);
  };
  const closeBottomSheet = () => {
    setIsShowBottomSheet(false);
  };

  const [currentPage, setCurrentPage] = useState<
    | {
        year: number;
        month: number;
      }
    | undefined
  >();
  useEffect(() => {
    if (!currentPage) return;
    setCurrentPage(undefined);
  }, [currentPage?.month, currentPage?.year]);

  const onMoodCreate = (mood: Mood) => {
    addMood(mood);
    closeBottomSheet();
    setCurrentPage({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });
  };

  const [focusedDate, setFocusedDate] = useState<{
    year: number;
    month: number;
    date: number;
  }>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  });

  const focusDate = (year: number, month: number, date: number) => {
    setFocusedDate({
      year,
      month,
      date,
    });
  };

  const targetDate = new Date(
    focusedDate.year,
    focusedDate.month - 1,
    focusedDate.date
  );
  const moodsByDate = getMoodsByDate(targetDate);

  return (
    <main className="bg-white px-5 py-6 flex flex-col flex-1 max-h-screen pb-32 relative">
      <div className="flex-1 shrink-0 flex flex-col gap-3 min-h-0">
        <Moods moods={moodsByDate} />
      </div>

      <div className="mt-auto justify-center flex">
        <Calendar
          moods={moods}
          currentPage={currentPage}
          onChangeFocusedDate={focusDate}
        />
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <button
          className="bg-slate-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-[32px]"
          onClick={() => showBottomSheet()}
        >
          +
        </button>
      </div>

      <BottomSheet
        visible={isShowBottomSheet}
        onClose={() => closeBottomSheet()}
      >
        <MoodInput
          onCreateMood={(mood) => onMoodCreate(mood)}
          isShowMoodLabel={isShowBottomSheet}
        />
      </BottomSheet>
    </main>
  );
}
