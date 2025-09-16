import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Automatically navigates to `to` after `delayMs` milliseconds when mounted.
 * If `to` is falsy, it does nothing.
 */
export default function useAutoAdvance(to?: string, delayMs = 3000) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!to) return;
    const id = window.setTimeout(() => {
      try {
        navigate(to);
      } catch (e) {
        // ignore navigation errors
      }
    }, delayMs);
    return () => window.clearTimeout(id);
  }, [to, delayMs, navigate]);
}
