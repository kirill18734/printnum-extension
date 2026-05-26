import { useState, useEffect } from "react";

export function useStorageState(key: string, initialValue: string[]) {
  const [state, setState] = useState<string[]>(initialValue);

  // Загружаем данные при старте popup
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get([key], (result) => {
        if (result[key]) {
          setState(result[key]);
        }
      });
    }
  }, [key]);

  // Переключатель элемента
  const toggleItem = (item: string) => {
    setState((prev) => {
      const newValue = prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item];

      // Сохраняем в память расширения
      if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.local.set({ [key]: newValue });
      }

      return newValue;
    });
  };

  return [state, toggleItem] as const;
}
