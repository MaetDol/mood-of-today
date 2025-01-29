"use client";

import { useLocalStorageState } from "@/shared/hooks/useLocalStorageState";
import { localStorageService } from "@/shared/services/localStorageService";
import { Mood } from "@/shared/types/mood";

export function useMoodData() {
  const [moods, setMoods] = useLocalStorageState<Mood[]>({
    key: localStorageService.Key.MOODS,
    defaultValue: [],
    onLoadData: (data) =>
      data.map((it) => ({ ...it, createdAt: new Date(it.createdAt) })),
  });

  const addMood = (mood: Mood) => {
    setMoods([...moods, mood]);
  };

  return { moods, addMood };
}
