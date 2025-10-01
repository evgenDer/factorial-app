import { useCallback, useEffect, useState } from "react";

export function useOfficeStorage(key: string, defaultValue: string) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    OfficeRuntime.storage.getItem(key).then((stored) => {
      if (stored !== undefined && stored !== null) {
        setValue(stored);
      }
    });
  }, [key]);

  const setStorageValue = useCallback(
    async (newValue: string) => {
      setValue(newValue);
      await OfficeRuntime.storage.setItem(key, newValue);
    },
    [key]
  );

  return [value, setStorageValue] as const;
}
