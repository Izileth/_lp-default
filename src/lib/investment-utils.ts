import type { InvestmentParams, InvestmentResult, ChartDataPoint} from "../types/investment";

export const IR_TABLE = [
  { months: 6, rate: 0.225 },
  { months: 12, rate: 0.200 },
  { months: 24, rate: 0.175 },
  { months: Infinity, rate: 0.150 },
];

export const CDI = 10.4;

export function getIRRate(m: number): number {
  return (IR_TABLE.find((r) => m <= r.months) || IR_TABLE[IR_TABLE.length - 1]).rate;
}

export function calcInvestment({
  inicial,
  aporte,
  meses,
  taxaAnual,
  tipo,
}: InvestmentParams): InvestmentResult {
  const rate = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
  let s = inicial;
  for (let i = 0; i < meses; i++) s = s * (1 + rate) + aporte;
  const totalInvestido = inicial + aporte * meses;
  const juros = s - totalInvestido;
  const ir = tipo === "CDB" ? juros * getIRRate(meses) : 0;
  return { bruto: s, liquido: s - ir, totalInvestido, juros, ir };
}

export function buildChartData(
  inicial: number,
  aporte: number,
  meses: number,
  taxaAnual: number
): ChartDataPoint[] {
  const rate = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
  const pts: ChartDataPoint[] = [{ m: 0, v: inicial }];
  let s = inicial;
  const step = Math.max(1, Math.floor(meses / 48));
  for (let i = step; i <= meses; i += step) {
    const lastPoint = pts[pts.length - 1];
    const prev = lastPoint.m;
    for (let j = prev; j < i; j++) s = s * (1 + rate) + aporte;
    pts.push({ m: i, v: s });
  }
  const lastPoint = pts[pts.length - 1];
  if (lastPoint.m < meses) {
    const prev = lastPoint.m;
    for (let j = prev; j < meses; j++) s = s * (1 + rate) + aporte;
    pts.push({ m: meses, v: s });
  }
  return pts;
}

export const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const fmtN = (v: number) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
