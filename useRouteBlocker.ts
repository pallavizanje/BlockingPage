// hooks/useRouteBlocker.ts
import { useCallback, useEffect } from "react";
import { useBlocker } from "react-router-dom";

export const useRouteBlocker = (
  when: boolean,
  onConfirm: (proceed: () => void, cancel: () => void) => void
) => {
  const blocker = useBlocker(when);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const proceed = () => blocker.proceed();
      const cancel = () => blocker.reset();
      onConfirm(proceed, cancel);
    }
  }, [blocker, onConfirm]);
};
