"use client";

class LocalStorageService {
  public readonly Key = {
    MOODS: "moods",
  } as const;

  public setItem(
    key: LocalStorageService["Key"][keyof LocalStorageService["Key"]],
    value: any
  ) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T | null {
    if (typeof window === "undefined") {
      return null;
    }
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}

export const localStorageService = new LocalStorageService();
