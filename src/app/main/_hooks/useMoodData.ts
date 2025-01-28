import { Mood } from "@/shared/types/mood";
import { useState } from "react";

export function useMoodData() {
  const [moods, setMoods] = useState<Mood[]>([]);

  const addMood = (mood: Mood) => {
    setMoods((prev) => [...prev, mood]);
  };

  return { moods, addMood };
}
