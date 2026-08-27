import { useCallback, useEffect, useRef, useState } from "react";

function useChapterScroll(count) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const touchStartYRef = useRef(0);
  const lastWheelTimeRef = useRef(0);

  activeRef.current = active;

  const goToChapter = useCallback((index) => {
    const clamped = Math.max(0, Math.min(count - 1, index));
    setActive(clamped);
    window.scrollTo({
      top: clamped * window.innerHeight,
      behavior: "smooth"
    });
  }, [count]);

  useEffect(() => {
    // Sync active chapter on scroll
    const sync = () => {
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const targetChapter = Math.max(0, Math.min(count - 1, Math.round(scrollPos / window.innerHeight)));
      setActive(targetChapter);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });

    // Smooth Mouse Wheel chapter stepping
    const handleWheel = (e) => {
      // Check if target is an internal scrollable element with remaining scroll
      let el = e.target;
      let hasInternalScroll = false;
      while (el && el !== document.body && el !== document.documentElement) {
        if (el.scrollHeight > el.clientHeight + 4 && (el.classList?.contains("textblock-panel") || el.classList?.contains("hero-stage-card"))) {
          const atTop = el.scrollTop <= 2 && e.deltaY < 0;
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2 && e.deltaY > 0;
          if (!atTop && !atBottom) {
            hasInternalScroll = true;
            break;
          }
        }
        el = el.parentElement;
      }

      if (hasInternalScroll) return;

      const now = Date.now();
      if (Math.abs(e.deltaY) > 18 && now - lastWheelTimeRef.current > 380) {
        lastWheelTimeRef.current = now;
        const dir = e.deltaY > 0 ? 1 : -1;
        const current = activeRef.current;
        const next = Math.max(0, Math.min(count - 1, current + dir));
        if (next !== current) {
          goToChapter(next);
        }
      }
    };

    // Keyboard navigation (Arrow keys & Page up/down)
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target?.tagName)) return;

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        const next = Math.min(count - 1, activeRef.current + 1);
        goToChapter(next);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const next = Math.max(0, activeRef.current - 1);
        goToChapter(next);
      }
    };

    // Mobile touch gestures
    const handleTouchStart = (e) => {
      if (e.touches?.[0]) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e) => {
      if (e.changedTouches?.[0]) {
        const diffY = touchStartYRef.current - e.changedTouches[0].clientY;
        if (Math.abs(diffY) > 40) {
          const dir = diffY > 0 ? 1 : -1;
          const next = Math.max(0, Math.min(count - 1, activeRef.current + dir));
          goToChapter(next);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [count, goToChapter]);

  return { active, goToChapter };
}

export { useChapterScroll };
