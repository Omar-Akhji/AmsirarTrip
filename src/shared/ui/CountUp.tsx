"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end?: number;
  duration?: number;
  separator?: boolean;
  className?: string;
}

function CountUp({
  end = 0,
  duration = 1500,
  separator = true,
  className = "",
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const to = Number(end) || 0;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(from + (to - from) * progress);
      setValue(current);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration]);

  const formatted = separator ? value.toLocaleString() : String(value);

  return (
    <span className={className} aria-live="polite">
      {formatted}
    </span>
  );
}

export default CountUp;
