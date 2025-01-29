"use client";

import { localStorageService } from "@/shared/services/localStorageService";
import { useState } from "react";

export function useLocalStorageState<T>(
  key: (typeof localStorageService.Key)[keyof typeof localStorageService.Key],
  defaultValue: T
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    return localStorageService.getItem<T>(key) ?? defaultValue;
  });

  const setItem = (value: T) => {
    setState(value);
    localStorageService.setItem(key, value);
  };

  return [state, setItem] as const;
}
