import { useState, useEffect } from "react";
import { fmt } from "../../lib/investment-utils";

interface AnimCounterProps {
  value: number;
  duration?: number;
}

export function AnimCounter({ value, duration = 1000 }: AnimCounterProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const from = display;
    const to = value;

    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(step);
      else setDisplay(to);
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{fmt(display)}</span>;
}
