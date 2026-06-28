import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A boolean that auto-resets to `false` after `duration` ms — for "Copied!"-style
 * transient feedback. Re-triggering restarts the timer instead of stacking timers,
 * and the pending timeout is cleared on unmount to avoid a state update after unmount.
 */
export function useTimedFlag(duration = 2000): [boolean, () => void] {
  const [flag, setFlag] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setFlag(true);
    timerRef.current = setTimeout(() => {
      setFlag(false);
      timerRef.current = null;
    }, duration);
  }, [duration]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return [flag, trigger];
}
