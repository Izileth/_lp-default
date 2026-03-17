import { motion } from "framer-motion";
import type { ChartDataPoint } from "../../types/investment";
import { fmtN } from "../../lib/investment-utils";

interface SparklineProps {
  data: ChartDataPoint[] | null;
  accent?: string;
}

export function Sparkline({ data, accent = "#4F46E5" }: SparklineProps) {
  if (!data || data.length < 2) return null;
  const W = 700, H = 220, pad = { l: 60, r: 16, t: 16, b: 40 };
  const vs = data.map(d => d.v), ms = data.map(d => d.m);
  const [minV, maxV] = [Math.min(...vs), Math.max(...vs)];
  const [minM, maxM] = [Math.min(...ms), Math.max(...ms)];
  
  const sx = (m: number) => pad.l + ((m - minM) / (maxM - minM || 1)) * (W - pad.l - pad.r);
  const sy = (v: number) => pad.t + (1 - (v - minV) / (maxV - minV || 1)) * (H - pad.t - pad.b);
  
  const pathD = data.map((d, i) => `${i ? "L" : "M"}${sx(d.m)},${sy(d.v)}`).join(" ");
  const areaD = `${pathD} L${sx(maxM)},${H - pad.b} L${sx(minM)},${H - pad.b}Z`;
  
  const yTicks = Array.from({ length: 5 }, (_, i) => minV + (maxV - minV) * i / 4);
  const xTicks = Array.from({ length: 5 }, (_, i) => minM + (maxM - minM) * i / 4);
  
  const lastPoint = data[data.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="aG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {yTicks.map((v, i) => (
        <g key={i}>
          <line x1={pad.l} x2={W - pad.r} y1={sy(v)} y2={sy(v)} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
          <text x={pad.l - 8} y={sy(v) + 4} textAnchor="end" fontSize="10" fill="#9ca3af" fontFamily="monospace">
            {v >= 1000 ? `${(v / 1000).toFixed(0)}K` : fmtN(v)}
          </text>
        </g>
      ))}
      {xTicks.map((m, i) => (
        <text key={i} x={sx(m)} y={H - pad.b + 18} textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="monospace">{Math.round(m)}m</text>
      ))}
      <path d={areaD} fill="url(#aG)" />
      <motion.path d={pathD} fill="none" stroke={accent} strokeWidth="2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }} />
      <circle cx={sx(lastPoint.m)} cy={sy(lastPoint.v)} r="4" fill={accent} />
      <circle cx={sx(lastPoint.m)} cy={sy(lastPoint.v)} r="8" fill={accent} fillOpacity="0.2" />
    </svg>
  );
}
