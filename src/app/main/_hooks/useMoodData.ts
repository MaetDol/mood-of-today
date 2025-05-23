"use client";

import { useLocalStorageState } from "@/shared/hooks/useLocalStorageState";
import { localStorageService } from "@/shared/services/localStorageService";
import { Mood } from "@/shared/types/mood";

export function useMoodData() {
  const [moods, setMoods] = useLocalStorageState<Mood[]>({
    key: localStorageService.Key.MOODS,
    defaultValue: [],
    onLoadData: (data) =>
      data
        .map((it) => ({ ...it, createdAt: new Date(it.createdAt) }))
        .toSorted((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
  });

  const addMood = (mood: Mood) => {
    setMoods([mood, ...moods]);
  };

  const getMoodsByDate = (date: Date) => {
    return moods.filter(
      ({ createdAt }) =>
        createdAt.getDate() === date.getDate() &&
        createdAt.getMonth() === date.getMonth() &&
        createdAt.getFullYear() === date.getFullYear()
    );
  };

  return {
    getMoodsByDate,
    moods,
    addMood,
  };
}
