"use client";

import { localStorageService } from "@/shared/services/localStorageService";
import { useEffect, useState } from "react";

export function useLocalStorageState<T>(
  key: (typeof localStorageService.Key)[keyof typeof localStorageService.Key],
  defaultValue: T
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(defaultValue);

  // Hydration miss-match 를 막기 위해 useEffect 사용
  useEffect(() => {
    setState(localStorageService.getItem<T>(key) ?? defaultValue);
  }, []);

  const setItem = (value: T) => {
    setState(value);
    localStorageService.setItem(key, value);
  };

  return [state, setItem] as const;
}
