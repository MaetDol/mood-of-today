"use client";

import { useLocalStorageState } from "@/shared/hooks/useLocalStorageState";
import { localStorageService } from "@/shared/services/localStorageService";
import { Mood } from "@/shared/types/mood";

export function useMoodData() {
  const [moods, setMoods] = useLocalStorageState<Mood[]>(
    localStorageService.Key.MOODS,
    []
  );

  const addMood = (mood: Mood) => {
    setMoods([...moods, mood]);
  };

  return { moods, addMood };
}
