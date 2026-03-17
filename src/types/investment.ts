export type InvestmentType = "CDB" | "LCI" | "LCA";
export type RentMode = "cdi" | "anual";
export type Unidade = "meses" | "anos";

export interface InvestmentParams {
  inicial: number;
  aporte: number;
  meses: number;
  taxaAnual: number;
  tipo: InvestmentType;
}

export interface InvestmentResult {
  bruto: number;
  liquido: number;
  totalInvestido: number;
  juros: number;
  ir: number;
}

export interface ChartDataPoint {
  m: number;
  v: number;
}

export interface ComparisonResult {
  comp: Record<string, InvestmentResult & { taxa: number }>;
  best: string;
  rates: Record<string, number>;
}
