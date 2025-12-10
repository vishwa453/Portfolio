import { useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook that returns a throttled version of a callback function
 * @param callback - The function to throttle
 * @param delay - The delay in milliseconds (default: 100ms)
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 100
): (...args: Parameters<T>) => void {
  const lastRun = useRef(Date.now());
  const callbackRef = useRef(callback);

  // Keep callback reference up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        callbackRef.current(...args);
        lastRun.current = now;
      }
    },
    [delay]
  );
}
