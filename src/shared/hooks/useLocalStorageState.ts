"use client";

import { localStorageService } from "@/shared/services/localStorageService";
import { useEffect, useState } from "react";

export function useLocalStorageState<T>({
  defaultValue,
  key,
  onLoadData = (val) => val,
}: {
  key: (typeof localStorageService.Key)[keyof typeof localStorageService.Key];
  defaultValue: T;
  onLoadData?: (data: T) => T;
}): [T, (value: T) => void] {
  const [state, setState] = useState<T>(defaultValue);

  // Hydration miss-match 를 막기 위해 useEffect 사용
  useEffect(() => {
    const value = localStorageService.getItem<T>(key);
    if (!value) {
      setState(defaultValue);
      return;
    }

    setState(onLoadData(value));
  }, []);

  const setItem = (value: T) => {
    setState(value);
    localStorageService.setItem(key, value);
  };

  return [state, setItem] as const;
}
