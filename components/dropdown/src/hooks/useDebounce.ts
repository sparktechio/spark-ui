import {useEffect, useState} from "react";

export interface UseDebounceProps<T> {
  value: T;
  debounceMs: number;
  onChange?: (value: T) => void;
}

export const useDebounce = <T,>(
  {
    value,
    debounceMs,
    onChange,
  }: UseDebounceProps<T>
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      if (onChange) {
        onChange(value);
      }
    }, debounceMs);
    return () => clearTimeout(handler);
  }, [value, debounceMs]);

  return debouncedValue;
};