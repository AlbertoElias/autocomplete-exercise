import { useCallback, useEffect, useRef } from "react";

type DebouncedFunction<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;

export default function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number): DebouncedFunction<T> {
  const ref = useRef<number>();

  useEffect(() => {
    return () => clearTimeout(ref.current);
  }, []);

  const debounce = useCallback((...args: Parameters<T>) => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => fn(...args), delay);
  }, [fn, delay]);

  return debounce;
}